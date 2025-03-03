<template>
    <div>
        <!-- Dialog for Invoice Form -->
        <v-card class="card-shadow mb-4" rounded="lg" width="700px">
            <v-card-title class="bg-green-500 text-white text-center py-4">
                <h2>ໃບຮັບເງິນ</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="invoiceForm" v-model="valid">
                    <!-- ✅ ใช้ Quotation Code จาก Local Storage (readonly) -->
                     <div style="display: flex;">

                         <v-text-field  style="width: 20%;"  label="Code" outlined dense v-model="invoice.quotation_code"
                         readonly></v-text-field>
                         <v-text-field  style="width: 80%;" label="ຫົວຂໍ້" outlined dense v-model="invoice.topic"></v-text-field>
                        </div>
                    <v-row>


                        <!-- File Upload -->
                        <v-file-input  style="width: 100%;"  v-model="invoice.document_1" outlined dense label="ອັບໂຫຼດເອກກະສານ"
                            accept=".pdf, image/*" show-size required></v-file-input>
                        <!-- ✅ Dropdown เลือกลูกค้า (Customer) -->
                        <v-select label="ເລືອກລູກຄ້າ" outlined dense v-model="invoice.customer_id" :items="customerList"
                            item-text="customerName" item-value="id">
                        </v-select> 
                        <!-- <v-text-field label="Token" outlined dense v-model="invoice.toKen"></v-text-field> -->
                        <v-text-field label="ວັນທີເຂົ້າ" outlined dense type="date" v-model="invoice.datee"></v-text-field>
                        <v-text-field label="ວັນທີຄົບກໍານົດ" outlined dense type="date"
                            v-model="invoice.due_date"></v-text-field>
                        <!-- <v-text-field label="Reference Number" outlined dense
                        v-model="invoice.reference_number"></v-text-field> -->
                        <!-- <v-text-field label="Lek Bai Sung" outlined dense v-model="invoice.lek_bai_sung"></v-text-field> -->
                        <!-- <v-text-field label="Quotation" outlined dense v-model="invoice.quotation"></v-text-field> -->
                        
                        
                        <!-- ✅ Dropdown เลือก Type (Bouang) -->
                        <v-select label="ເລືອກເບື້ອງ" outlined dense v-model="invoice.type_id" :items="bouangList"
                        item-text="nameOfBouang" item-value="key_id"></v-select>
                        
                        <v-text-field label="ຈໍານວນ" outlined dense v-model="invoice.num" @input="calculateTotal"></v-text-field>
                        
                        <!-- ✅ Dropdown for Unit -->
                        <v-select label="ຫົວໜ່ວຍ" outlined dense v-model="invoice.unit" :items="unitList"></v-select>
                        
                        <v-text-field label="ລາຄາ" outlined dense type="number" v-model="invoice.amount_money" @input="calculateTotal"></v-text-field>
                        <v-select label="ສະກຸນເງິນ" outlined dense v-model="invoice.currency" :items="currencyList"></v-select>
                        <v-text-field style="width: 100%;" label="ລາຄາທັງໝົດ" readonly outlined dense v-model="invoice.totalMoney"></v-text-field>
                        <v-text-field style="width: 100%;" label="ໝາຍເຫດ" outlined dense
                            v-model="invoice.note"></v-text-field>
                        <v-textarea style="width: 100%;" label="ພິມລາຍລະອຽດ" outlined dense
                            v-model="invoice.description"></v-textarea>
                    </v-row>
                    <!-- Save Button -->
                    <v-btn :loading="loading_processing" color="primary" @click="saveInvoice">
                        Save Invoice
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            quotation_code: localStorage.getItem("quotation_code") || "", // ✅ ดึงจาก Local Storage ถ้ามีค่า
            valid: false,
            loading_processing: false,
            customerList: [], // ✅ เก็บข้อมูลลูกค้าจาก API
            bouangList: [], // ✅ เก็บข้อมูลจาก API
            unitList: ["ອັນ", "ໂຕນ", "ລິດ", "ຄັ້ງ"], // ✅ Static unit list
            currencyList: ["LAK", "USD", "THB"], // ✅ Static unit list
            invoice: {
                document_1: null,
                customer_id: "",
                toKen: localStorage.getItem("toKen"),
                topic: "",
                currency: "",
                datee: "",
                due_date: "",
                reference_number: "0",
                lek_bai_sung: "0",
                amount_money: "",
                quotation: "0",
                description: "",
                note: "",
                type_id: "",
                num: "",
                unit: "",
                totalMoney: "",
                quotation_code: "",
            },
        };
    },
    mounted() {
        // ✅ ดึงค่าจาก Local Storage เมื่อคอมโพเนนต์โหลด
        this.invoice.quotation_code = localStorage.getItem("quotation_code") || "";
        this.getBouangAll();
        this.getAllCustomer();
    },

    methods: {
        
        calculateTotal() {
            const num = parseFloat(this.invoice.num) || 0;
            const amount_money = parseFloat(this.invoice.amount_money) || 0;
            this.invoice.totalMoney = (num * amount_money).toFixed(2);
        },
        async getAllCustomer() {
            try {
                const response = await this.$axios.$post("getAllCustomer", {
                    toKen: localStorage.getItem("toKen"),
                });

                if (response?.status === "00" && response?.data) {
                    this.customerList = response.data; // ✅ อัปเดต dropdown ลูกค้า
                } else {
                    Swal.fire({
                        title: "ແຈ້ງເຕືອນ",
                        text: response?.message || "ບໍ່ສາມາດດຶງລູກຄ້າ",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "Error fetching customers",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        },
        async getBouangAll() {
            try {
                const response = await this.$axios.$post("/getBouangAll.service", {
                    toKen: localStorage.getItem("toKen"),
                });

                if (response?.status === "00" && response?.data) {
                    this.bouangList = response.data; // ✅ อัปเดต dropdown
                } else {
                    Swal.fire({
                        title: "ແຈ້ງເຕືອນ",
                        text: response?.message || "ບໍ່ສາມາດດຶງຂໍ້ມູນ",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "Error fetching data",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        },
        async saveInvoice() {
            if (!this.$refs.invoiceForm.validate()) return;

            try {
                const formdata = new FormData();

                // ตรวจสอบไฟล์ก่อนอัปโหลด
                if (this.invoice.document_1 && this.invoice.document_1 instanceof File) {
                    formdata.append("document_1", this.invoice.document_1);
                } else {
                    formdata.append("document_1", new Blob(), "empty-file");
                }

                // เพิ่มฟิลด์ข้อมูลทั้งหมดลงใน FormData
                Object.keys(this.invoice).forEach((key) => {
                    if (key !== "document_1") {
                        formdata.append(key, this.invoice[key]);
                    }
                });

                this.loading_processing = true;

                // ส่งข้อมูลไปยัง API
                const response = await this.$axios.$post(
                    "http://khounkham.com/api-prod/v1/truck/DeptMustReceivedInsert.service",
                    formdata
                );

                if (response?.status === "00") {
                    Swal.fire({
                        title: "ສຳເລັດ",
                        text: "ບັນທຶກຂໍ້ມູນສຳເລັດ!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });

                    this.clearForm();
                } else {
                    Swal.fire({
                        title: "ແຈ້ງເຕືອນ",
                        text: response?.message || "Error occurred",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "Failed to save data",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading_processing = false;
            }
        },

        clearForm() {
            this.invoice = {
                document_1: null,
                customer_id: "",
                toKen: localStorage.getItem("toKen"),
                topic: "",
                currency: "",
                datee: "",
                due_date: "",
                reference_number: "",
                lek_bai_sung: "",
                amount_money: "",
                quotation: "",
                description: "",
                note: "",
                type_id: "",
                num: "",
                unit: "",
                totalMoney: "",
                quotation_code: localStorage.getItem("quotation_code"),
            };
        },
    },
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>

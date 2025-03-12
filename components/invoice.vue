<template>
    <div>
        <!-- Dialog for Invoice Form -->
        <v-card class="card-shadow mb-4" rounded="lg" width="100%">

            <v-card-text>
                <v-form ref="invoiceForm" v-model="valid">
                    <!-- ✅ ใช้ Quotation Code จาก Local Storage (readonly) -->
                    <v-row>
                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-code-tags</v-icon>
                            <span>KKT-code</span>
                            <v-text-field outlined dense v-model="invoice.quotation_code" readonly></v-text-field>
                        </v-col>



                        <v-col cols="12" md="4" sm="6">
                            <v-icon color="black">mdi-comment-processing-outline</v-icon>
                            <span>ຫົວຂໍ້</span>
                            <v-text-field outlined dense v-model="invoice.topic"></v-text-field>
                        </v-col>


                        <v-col cols="12" md="4" sm="6">
                            <v-icon color="black">mdi-note-text</v-icon>
                            <span>ໝາຍເຫດ</span>

                            <v-text-field style="width: 100%;" outlined dense v-model="invoice.note"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="selection" cols="12" md="2" sm="6">
                            <span>
                                <v-icon color="black">mdi-account</v-icon>
                                ລູກຄ້າ

                                <!-- ✅ Dropdown เลือกลูกค้า (Customer) -->
                                <v-select label="ເລືອກລູກຄ້າ" outlined dense v-model="invoice.customer_id"
                                    :items="customerList" item-text="customerName" item-value="id">
                                </v-select>

                            </span>
                            <v-btn to="customer" style="background-color: blue;width: 10px;">
                                <v-icon color="white">mdi-plus</v-icon>
                            </v-btn>
                        </v-col>



                        <v-col class="selection" cols="12" md="2" sm="6">
                            <span>
                                <v-icon color="black">mdi-account</v-icon>
                                ບ້ວງ

                                <!-- ✅ Dropdown เลือก Type (Bouang) -->
                                <v-select label="ເລືອກບ້ວງ" outlined dense v-model="invoice.type_id" :items="bouangList"
                                    item-text="nameOfBouang" item-value="key_id"></v-select>

                            </span>
                            <v-btn to="customer" style="background-color: blue;width: 10px;">
                                <v-icon color="white">mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-file-document-plus</v-icon>
                            <span>ອັບໂຫຼດເອກກະສານ</span>
                            <!-- File Upload -->
                            <v-file-input style="width: 100%;" v-model="invoice.document_1" outlined dense
                                accept=".pdf, image/*" show-size required></v-file-input>
                        </v-col>
                  




                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-sort-calendar-ascending</v-icon>
                            <span>ວັນທີເຂົ້າ</span>

                            <!-- <v-text-field label="Token" outlined dense v-model="invoice.toKen"></v-text-field> -->
                            <v-text-field outlined dense type="date" v-model="invoice.datee"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-clipboard-text-clock</v-icon>

                            <span>ວັນທີຄົບກໍານົດ</span>

                            <v-text-field outlined dense type="date" v-model="invoice.due_date"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-numeric</v-icon>

                            <span>ຈໍານວນ</span>

                            <v-text-field outlined dense v-model="invoice.num" @input="calculateTotal"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-application-edit-outline</v-icon>

                            <span>ຫົວໜ່ວຍ</span>

                            <!-- ✅ Dropdown for Unit -->
                            <v-select label="ຫົວໜ່ວຍ" outlined dense v-model="invoice.unit" :items="unitList"></v-select>
                        </v-col>
                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-cash</v-icon>

                            <span>ລາຄາ</span>

                            <v-text-field outlined dense type="number" v-model="invoice.amount_money"
                                @input="calculateTotal"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-currency-usd</v-icon>

                            <span>ສະກຸນເງິນ</span>

                            <v-select label="ສະກຸນເງິນ" outlined dense v-model="invoice.currency" :items="currencyList"></v-select>
                        </v-col>

                        <v-col cols="12" md="2" sm="6">
                            <v-icon color="black">mdi-cash-multiple</v-icon>

                            <span>ລາຄາທັງໝົດ</span>

                            <v-text-field style="width: 100%;" readonly outlined dense
                                v-model="invoice.totalMoney"></v-text-field>

                        </v-col>
                        <v-col style="align-items: center;" cols="12" md="8" sm="6">
                            <v-icon color="black">mdi-comment</v-icon>
                            <span>ພິມລາຍລະອຽດ</span>

                            <v-textarea style="width: 100%;" label="ພິມລາຍລະອຽດ" outlined dense
                                v-model="invoice.description"></v-textarea>
                        </v-col>
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

.selection {
    display: flex;
    align-items: center;
    margin-right: 10px;
}
</style>

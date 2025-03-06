<template>
    <div>
        <!-- Table for Invoice List -->
        <v-card class="card-shadow mb-4" rounded="lg" width="800px">
            <v-card-title class="bg-green-500 text-white text-center py-4">
                <h2>ລາຍການໃບຮຽກເກັບເງິນ</h2>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="invoiceArray" item-value="name" dense class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark @click="addRow">ເພີ່ມລາຍການ</v-btn>
                        </v-toolbar>
                    </template>

                    <!-- Quotation Code -->
                    <template v-slot:item.quotation_code="{ item }">
                        <v-text-field v-model="item.quotation_code" dense outlined readonly></v-text-field>
                    </template>


                    <!-- Customer Dropdown -->
                    <template v-slot:item.listName="{ item }">
                        <v-select v-model="item.listName" :items="customerList" item-value="customerName" item-text="customerName" dense
                            outlined label="ເລືອກລູກຄ້າ"></v-select>
                    </template>
                    <!-- Number -->
                    <template v-slot:item.num="{ item }">
                        <v-text-field v-model="item.num" dense outlined type="number"
                            @input="calculateTotal(item)"></v-text-field>
                    </template>

                    <!-- Amount of Money -->
                    <template v-slot:item.amount_money="{ item }">
                        <v-text-field v-model="item.amount_money" dense outlined type="number"
                            @input="calculateTotal(item)"></v-text-field>
                    </template>

                    <!-- Total Money (Auto-Calculated) -->
                    <template v-slot:item.totalMooney="{ item }">
                        <v-text-field v-model="item.totalMooney" dense outlined readonly></v-text-field>
                    </template>

                    <!-- Actions -->
                    <template v-slot:item.actions="{ item }">
                        <v-btn color="red" dark small @click="removeRow(item)">ລຶບ</v-btn>
                    </template>
                </v-data-table>

                <!-- Submit Button -->
                <v-btn :loading="loading_processing" color="primary" class="mt-4" block @click="saveInvoice">
                    ບັນທຶກຂໍ້ມູນ
                </v-btn>
            </v-card-text>

        </v-card>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            loading_processing: false,
            quotation_code: "", // ✅ ดึงค่าจาก Local Storage
            invoiceArray: [],
            headers: [
                { text: "Code", value: "quotation_code" },
                { text: "ເລືອກລູກຄ້າ", value: "listName" },
                { text: "ຈໍານວນ", value: "num" },
                { text: "ລາຄາ", value: "amount_money" },
                { text: "ລາຄາທັງໝົດ", value: "totalMooney" },
                { text: "", value: "actions", sortable: false },
            ],
            customerList: [], // ✅ เก็บข้อมูลลูกค้าจาก API

        };
    },

    mounted() {
        // ✅ ดึงค่า `quotation_code` จาก Local Storage เมื่อโหลดหน้า
        this.quotation_code = localStorage.getItem("quotation_code") || "";

        // ✅ เพิ่มแถวแรกอัตโนมัติ พร้อมใส่ค่า `quotation_code`
        this.addRow();

        this.getAllCustomer();

    },

    methods: {
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
        addRow() {
            // ✅ ใช้ค่า `quotation_code` จาก Local Storage ทุกครั้งที่เพิ่มแถว
            this.invoiceArray.push({
                quotation_code: this.quotation_code,
                listName: "",
                num: "",
                amount_money: "",
                totalMooney: "0.00",
            });
        },

        removeRow(item) {
            this.invoiceArray = this.invoiceArray.filter(i => i !== item);
        },

        // ✅ Auto-calculate `totalMooney` with decimals
        calculateTotal(item) {
            const num = parseFloat(item.num) || 0;
            const amount_money = parseFloat(item.amount_money) || 0;
            item.totalMooney = (num * amount_money).toFixed(2); // Ensure decimal precision
        },

        async saveInvoice() {
            try {
                this.loading_processing = true;

                const response = await this.$axios.$post(
                    "http://khounkham.com/api-prod/v1/truck/InsertNameListArray.service",
                    this.invoiceArray
                );

                if (response?.status === "00") {
                    Swal.fire({
                        title: "ສຳເລັດ",
                        text: "ບັນທຶກຂໍ້ມູນສຳເລັດ!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });

                    this.invoiceArray = []; // รีเซ็ตข้อมูล
                    this.addRow(); // ✅ เพิ่มแถวแรกใหม่หลังจากบันทึก
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
    },
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>

<template>
    <div>
        <!-- Dialog for Invoice Form -->
        <v-card class="card-shadow mb-4" rounded="lg" width="700px">
            <v-card-title class="bg-green-500 text-white text-center py-4">
                <h2>ໃບຮັບເງິນ</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="invoiceForm" v-model="valid">
                    <!-- File Upload -->
                    <v-file-input v-model="invoice.document_1" outlined dense label="Upload PDF or Picture"
                        accept=".pdf, image/*" show-size required></v-file-input>

                    <v-text-field label="Customer ID" outlined dense v-model="invoice.customer_id"></v-text-field>
                    <v-text-field label="Token" outlined dense v-model="invoice.toKen"></v-text-field>
                    <v-text-field label="Topic" outlined dense v-model="invoice.topic"></v-text-field>
                    <v-text-field label="Currency" outlined dense v-model="invoice.currency"></v-text-field>
                    <v-text-field label="Date" outlined dense type="date" v-model="invoice.datee"></v-text-field>
                    <v-text-field label="Due Date" outlined dense type="date" v-model="invoice.due_date"></v-text-field>
                    <v-text-field label="Reference Number" outlined dense v-model="invoice.reference_number"></v-text-field>
                    <v-text-field label="Lek Bai Sung" outlined dense v-model="invoice.lek_bai_sung"></v-text-field>
                    <v-text-field label="Amount of Money" outlined dense type="number"
                        v-model="invoice.amount_money"></v-text-field>
                    <v-text-field label="Quotation" outlined dense v-model="invoice.quotation"></v-text-field>
                    <v-textarea label="Description" outlined dense v-model="invoice.description"></v-textarea>
                    <v-text-field label="Note" outlined dense v-model="invoice.note"></v-text-field>
                    <v-text-field label="Type ID" outlined dense v-model="invoice.type_id"></v-text-field>
                    <v-text-field label="Number" outlined dense v-model="invoice.num"></v-text-field>
                    <v-text-field label="Unit" outlined dense v-model="invoice.unit"></v-text-field>
                    <v-text-field label="Total Money" outlined dense v-model="invoice.totalMoney"></v-text-field>
                    <v-text-field label="Quotation Code" outlined dense v-model="invoice.quotation_code"></v-text-field>

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
            valid: false,
            loading_processing: false,
            invoice: {
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
                quotation_code: "",
            },
        };
    },
    methods: {
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
                quotation_code: "",
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

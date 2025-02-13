<template>
    <div>
        <!-- Dialog for Invoice Form -->
        <v-card class="card-shadow mb-4" rounded="lg" width="700px">
            <v-card-title class="orange--text white--text">
                ໃບຮັບເງິນ
            </v-card-title>
            <v-card-text>
                <v-form ref="invoiceForm" v-model="valid">
                    <v-text-field v-model="invoice.date" label="Date" type="date" required></v-text-field>
                    <v-text-field v-model="invoice.invoice_code" label="Invoice Code" required></v-text-field>
                    <v-text-field v-model="invoice.quotation_code" label="Quotation Code" required></v-text-field>
                    <v-text-field v-model="invoice.amount_of_money" label="Amount of Money" type="number"
                        required></v-text-field>
                    <v-file-input v-model="invoice.pdfandpic" label="Upload PDF or Picture" accept=".pdf, image/*"
                        required></v-file-input>
                    <v-textarea v-model="invoice.detail" label="Detail" required></v-textarea>
                    <v-btn :loading="loading_processing" color="primary" @click="saveInvoice">Save Invoice</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            valid: false,
            loading_processing: false,
            invoice: {
                date: '',
                invoice_code: '',
                quotation_code: '',
                amount_of_money: '',
                pdfandpic: null,  // Fix: Set to null instead of ''
                detail: '',
            }
        };
    },
    methods: {
        async saveInvoice() {
            const formdata = new FormData();
            formdata.append("date", this.invoice.date || "0000-00-00");
            formdata.append("invoice_code", this.invoice.invoice_code);
            formdata.append("quotation_code", this.invoice.quotation_code);
            formdata.append("amount_of_money", this.invoice.amount_of_money);
            formdata.append("detail", this.invoice.detail);

            // 🔹 ตรวจสอบว่ามีไฟล์ไหม ถ้ามีให้แนบไฟล์ ถ้าไม่มีให้แนบ Blob เปล่าๆ
            if (this.invoice.pdfandpic && this.invoice.pdfandpic instanceof File) {
                formdata.append("pdfandpic", this.invoice.pdfandpic); // ส่งไฟล์ปกติ
            } else {
                formdata.append("pdfandpic", new Blob(), "empty-file"); // ส่งไฟล์เปล่าในรูปแบบ binary
            }

            formdata.append("toKen", localStorage.getItem("toKen"));

            this.loading_processing = true;

            try {
                const response = await this.$axios.$post(
                    "http://khounkham.com/api-prod/v1/truck/InvoiceDeptInsert.service",
                    formdata
                );

                this.clearForm();
                Swal.fire({
                    title: "Success!",
                    text: "Data has been saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "Error",
                    text: error.message || "Failed to save data",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading_processing = false;
            }
        }


        ,
        clearForm() {
            this.invoice = {
                date: '',
                invoice_code: '',
                quotation_code: '',
                amount_of_money: '',
                pdfandpic: null, // Fix: Reset to null
                detail: '',
            };
        }
    }
};

</script>

<style scoped>
.card-shadow {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>

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
                    <template v-slot:item.listName="{ item }">
                        <v-text-field v-model="item.listName" dense outlined></v-text-field>
                    </template>
                    <template v-slot:item.num="{ item }">
                        <v-text-field v-model="item.num" dense outlined></v-text-field>
                    </template>

                    <template v-slot:item.amount_money="{ item }">
                        <v-text-field v-model="item.amount_money" dense outlined></v-text-field>
                    </template>

                    <template v-slot:item.totalMooney="{ item }">
                        <v-text-field v-model="item.totalMooney" dense outlined disabled></v-text-field>
                    </template>

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
            invoiceArray: [
            { listName: "list", quotation_code: "KKt-2", num: "", amount_money: "", totalMooney: "", selectedCurrency: "", selectedUnit : ""},
               
            ],
            headers: [
                { text: "Quotation Code", value: "quotation_code" },
                { text: "listName", value: "listName" },
                { text: "Number", value: "num" },
                { text: "Amount of Money", value: "amount_money" },
                { text: "Total Money", value: "totalMooney" },
                { text: "Actions", value: "actions", sortable: false },
            ],
        };
    },
    methods: {
        addRow() {
            this.invoiceArray.push({  quotation_code: "KKt-2",listName: "", num: "", amount_money: "", totalMooney: "" });
        },
        removeRow(item) {
            this.invoiceArray = this.invoiceArray.filter(i => i !== item);
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

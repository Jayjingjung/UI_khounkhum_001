<template>
    <v-card class="card-shadow mb-4" rounded="lg" width="700px">
        <!-- Header -->
        <v-card-title class="orange--text white--text">
            ໃບຮັບເງິນ
        </v-card-title>

        <!-- Content -->
        <v-card-text>
            <v-row>
                <!-- Date Picker -->
                <v-col>
                    <v-icon color="black">mdi-calendar-range</v-icon>
                    <span>ວັນທີ</span>
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="formattedDate"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field dense outlined v-model="formattedDate" required label="ວັນທີ"
                                append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="formattedDate" no-title scrollable
                            @input="$refs.menu.save(formattedDate)">
                            <v-spacer></v-spacer>
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <!-- PDF File Input -->
                <v-col>
                    <v-icon color="black">mdi-file-pdf-box</v-icon>
                    <span>ອັບໂຫຼດເອກະສານ</span>
                    <v-file-input label="ອັບໂຫຼດເອກະສານ" outlined dense prepend-icon="mdi-file-pdf"
                        v-model="pdfandpic"></v-file-input>
                </v-col>
            </v-row>

            <!-- Amount of Money -->
            <v-row>
                <v-col cols="12">
                    <v-icon size="55" color="black">mdi-cash-plus</v-icon>
                    <span>ຈຳນວນຂອງເງິນ</span>
                    <v-text-field label="ພິມຈຳນວນຂອງເງິນ" style="font-size: 28px; font-weight: bold;" outlined dense
                        v-model="formattedInputMoney" :rules="[v => !!v || 'Required field']"></v-text-field>
                    <span v-if="inputExceedsLimit" style="color: red; font-weight: bold;">
                        ຫຼາຍເກັບໄປ
                    </span>
                </v-col>
            </v-row>

            <!-- Detail -->
            <v-row>
                <v-col>
                    <v-textarea label="ພິມລາຍລະອຽດ" outlined dense v-model="detail"></v-textarea>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- Actions -->
        <v-card-actions>
            <v-btn :disabled="inputExceedsLimit" @click="saveinvoice" color="green" dark>
                ບັນທຶກ
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            formattedDate: "",
            pdfandpic: null,
            formattedInputMoney: "",
            detail: "",
            menu: false,
            selectedQuotationCode: "",
            loading_processing: false,
        };
    },
    computed: {
        inputExceedsLimit() {
            return Number(this.formattedInputMoney.replace(/,/g, "")) > 100000000; // Example limit
        },
    },
    mounted() {
        const query = this.$route.query;
        if (query.quotation_code && query.total_money) {
            this.selectedQuotationCode = query.quotation_code;
            this.formattedInputMoney = query.total_money.toString();
        }
    },

    methods: {
        async saveinvoice() {
            const formdata = new FormData();
            formdata.append("date", this.formattedDate || "0000-00-00");
            formdata.append("detail", this.detail);
            formdata.append("pdfandpic", this.pdfandpic);
            formdata.append("amount_of_money", this.formattedInputMoney.replace(/,/g, ""));
            formdata.append("quotation_code", this.selectedQuotationCode);
            formdata.append("toKen", localStorage.getItem("toKen"));

            this.loading_processing = true;

            try {
                const response = await this.$axios.$post("http://khounkham.com/api-prod/v1/truck/InvoiceDeptInsert.service", formdata);
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
        },

    },
};
</script>

<style scoped>
/* Add custom styles for alignment and design */
</style>
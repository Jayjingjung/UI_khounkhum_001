<template>
    <div>
        <v-card width="800" class="card-shadow mb-4 mx-auto" rounded="lg">
            <v-card-title style="display:flex;background-color:thistle;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="InvoiceDeptInsert">
                    <v-icon color="#D8BFD8">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ລາຍລະອຽດໃບຮັບເງິນ
                <v-spacer></v-spacer>
            </v-card-title>
            <h3 style="margin-top: 15px;" justify="center" align="center"> <v-icon
                    color="black">mdi-file-pdf-box</v-icon>ເອກກະສານ</h3>
            <div style="width: 125px;margin-left: 50px;">
                <v-text-field readonly label="ເລກໃບຮັບເງິນ" outlined dense v-model="invoice_code"></v-text-field>
            </div>
            <div style="width: 125px;margin-left: 50px;">
                <v-text-field readonly label="ເລກໃບສະເໜີ" outlined dense v-model="quotation_code"></v-text-field>
            </div>
            <v-card-text justify="center" align="center">
                <iframe v-if="pdfandpic" :src="pdfandpic" width="100%" height="800px" frameborder="0"></iframe>
            </v-card-text>
            <v-row style="margin-left: 20px;">
                <v-col>
                    <v-text-field label="amount_of_money" outlined dense v-model="amount_of_money"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="dept_total" outlined dense v-model="dept_total"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="ພິມລາຍລະອຽດ" outlined dense v-model="detail"></v-text-field>
                </v-col>
            </v-row>
            <div style="display: flex; justify-content: center; align-items: center; height: 10vh">
                <v-btn @click="updat" style="background-color: green; width: 30%;color: white;">
                    ເເກ່ໄຂ
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    data() {
        return {
            search: '',
            pdfandpic: '',
            key_id: '',
            nameRules: [(v) => !!v || ''],
            invoice_code: '',
            quotation_code: '',
            detail: "",
            amount_of_money: "", // Raw amount of money data
            dept_total: "", // Raw amount of money data
            dialog: false,
            formattedDate: "",
            formattedDateand: "",
            pdfandpic: null,
            report_listitemOffice: [],
            menu: false,
            loading_processing: false,
        };
    },
    mounted() {
        if (this.$route.query.key_id) {
            this.listCarOffice(this.$route.query.key_id); // Use the correct method name
        }
    },
    computed: {
        formattedMoney: {
            get() {
                // Return the formatted amount with commas
                return this.amount_of_money
                    ? this.amount_of_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '';
            },
            set(value) {
                // Remove commas when user enters the value
                this.amount_of_money = value.replace(/,/g, '');
            },
        },
    },
    methods: {
        async updat(invoice_code) {
            const formdata = new FormData();
            // Append form fields to FormData
            formdata.append('date', this.formattedDate || '0000-00-00');
            formdata.append('detail', this.detail);
            formdata.append('pdfandpic', this.document_1); // Assuming this.document_1 contains the file
            formdata.append('amount_of_money', this.amount_of_money);
            formdata.append('dept_total', this.dept_total);
            formdata.append('toKen', localStorage.getItem("toKen"));
            formdata.append('key_id', this.$route.query.key_id);
            formdata.append('invoice_code', this.invoice_code);
            formdata.append('quotation_code', this.quotation_code);
            this.loading_processing = true;
            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/UpdateInvoiceDept.service', formdata);
                console.log("Response:", data);
                // Check if the update was successful
                if (data.status === "00") {
                    // SweetAlert2 success notification after saving
                    Swal.fire({
                        title: 'Success!',
                        text: data.message || 'Data has been saved successfully!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    // Optionally clear form data here
                    this.onClearData();
                } else {
                    // SweetAlert2 warning notification if the status is not "00"
                    Swal.fire({
                        title: 'Warning',
                        text: data.message || 'There was an issue with updating the data.',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                // SweetAlert2 error notification
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'Failed to save data',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },
        onClearData() {
            // Clear form fields after successful save
            this.formattedDate = '';
            this.detail = '';
            this.document_1 = null;
            this.amount_of_money = '';
            this.invoice_code = '';
            this.quotation_code = '';
        },
        async listCarOffice(key_id) {
            try {
                this.loading_processing = true; // Start loading indicator
                const response = await this.$axios.$post("/listOfInvoiceDept.service", {
                    toKen: localStorage.getItem("toKen"), // Get the token from localStorage
                    key_id: key_id, // Pass key_id in the request body
                });

                if (response?.status === "00" && response.data.length > 0) {
                    const details = response.data.find(item => item.key_id === key_id) || {}; // Find the exact key_id
                    this.report_listitemOffice = [details]; // Store the matched data as a single-item array
                    this.pdfandpic = details.pdfandpic || "";
                    this.invoice_code = details.invoice_code || "";
                    this.amount_of_money = details.amount_of_money || "";
                    this.dept_total = details.dept_total || "";
                    this.formattedDate = details.date_invoice || "";
                    this.detail = details.detail || "";
                    this.quotation_code = details.quotation_code || "";
                } else {
                    this.report_listitemOffice = []; // Clear the data if status is not "00"
                    Swal.fire({
                        icon: "warning",
                        text: response?.message || "No data found.",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: error.message || "An error occurred while fetching the data.",
                });
                console.error(error);
            } finally {
                this.loading_processing = false; // Stop loading indicator
            }
        }
        ,
        async storyDeptMustReceived(key_id) {
            try {
                this.loading_processing = true; // Start loading indicator
                // Retrieve key_id dynamically, if needed
                const response = await this.$axios.$post("/SearchingDeptMustReceived.service", {
                    toKen: localStorage.getItem("toKen"), // Get the token from localStorage
                    customer_id: customer_id,
                    currency: currency,
                    startDate: startDate,
                    endDate: endDate,
                });
                // Check the response status
                if (response?.status === "00") {

                } else {
                    this.report_listitemOffice = []; // Clear the data if status is not "00"
                    Swal.fire({
                        icon: "warning",
                        text: response?.message || "No data found.",
                    });
                }
            } catch (error) {
                // Handle any errors during the API call
                Swal.fire({
                    icon: "error",
                    text: error.message || "An error occurred while fetching the data.",
                });
                console.error(error);
            } finally {
                this.loading_processing = false; // Stop loading indicator
            }
        },
    },
};
</script>
<template>
    <div>
        <!-- Button to trigger dialog -->
        <div style="display: flex;">
            <v-card style="width: 100%;" class="card-shadow mb-4" rounded="lg">
                <v-card-title style="display:flex;background-color:#24ab70;color:white">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="receivedAll">
                        <v-icon color="#24ab70">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    ໃບເກັບເງິນ
                    <v-spacer></v-spacer>
                </v-card-title>
                <!-- <v-btn style="margin-top: 20px;margin-left: 20px;" @click="dialog1 = true" color="primary">
                    <v-icon>
                        mdi-plus
                    </v-icon>ເພື່ມໃບເກັບເງິນໃໜ່
                </v-btn> -->
                <v-btn style="margin-top: 20px;margin-left: 20px;" @click="dialog2 = true" color="primary">
                    <v-icon>
                        mdi-eye
                    </v-icon>ປະວັດຈາຍເງິ່ນລຸກຄ້າ
                </v-btn>
                <!-- <v-card class="card-shadow mb-4" rounded="lg"> -->
                <v-card-title class="header-title1">
                    <div class="search-print">
                        <v-text-field placeholder="ຄົ້ນຫາ..." v-model="search" rounded background-color="#e1e1e1"
                            prepend-inner-icon="mdi-magnify">
                        </v-text-field>
                        <!-- <v-btn color="#e1e1e1" class="card-shadow print-btn" @click="print">
                                <v-icon>mdi-printer</v-icon> ພີມລາຍງານທັງໝົດ
                            </v-btn> -->
                    </div>
                    <div style="width: 100%;">
                        <!-- <v-data-table :items="report_listitemOffice" :headers="filteredHeaders" :items-per-page="50"
                                :search="search">
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.invoice_code }}</td>
                                        <td>{{ item.quotation_code }}</td>
                                        <td>{{ item.amount_of_money ?
                                            item.amount_of_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                                            }}</td>
                                        <td>{{ item.detail }}</td>
                                        <td>{{ item.date_invoice }}</td>
                                        <td>
                                            <v-btn style="height: 100%;width: 200px;" small color="#0059c8"
                                                class="white--text card-shadow" @click="viewview(item?.key_id)">
                                                ເບິ່ງເເລະເເກ້ໄຂ
                                                <v-icon size="30" color="white">mdi-file-edit</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
</v-data-table> -->
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ເລກບິນ</th>
                                    <th>ລາຍລະອຽດ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in groupedReportItems" :key="item.quotation_code">
                                    <td>{{ item.quotation_code }}</td>
                                    <td>
                                        <v-btn color="primary" class="white--text"
                                            @click="handleQuotationClick(item.quotation_code)">
                                            ເບິ່ງລາຍລະອຽດຂອງ {{ item.quotation_code }}
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Modal to show filtered list -->
                        <v-dialog v-model="dialog" max-width="800px">
                            <v-card>
                                <v-card-title class="text-h6">
                                    ລາຍລະອຽດສໍາລັບລະຫັດ : {{ selectedQuotationCode }}
                                </v-card-title>
                                <v-card-text>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>ລະຫັດໃບເກັບເງິນ</th>
                                                <th>ວັນທີ</th>
                                                <th>ລາຍລະອຽດ</th>
                                                <th>ຈໍາ​ນວນ​ເງິນ​</th>
                                                <th>ເບິ່ງ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in filteredItems" :key="item.key_id">
                                                <td>{{ item.invoice_code }}</td>
                                                <td>{{ item.date_invoice }}</td>
                                                <td>{{ item.detail }}</td>
                                                <td>{{ item.amount_of_money }}</td>
                                                <td>
                                                    <v-btn style="height: 100%;width: 200px;" small color="#0059c8"
                                                        class="white--text card-shadow" @click="viewview(item?.key_id)">
                                                        ເບິ່ງເເລະເເກ້ໄຂ
                                                        <v-icon size="30" color="white">mdi-file-edit</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="text-right mt-4">
                                        <strong>ຍອດລວມ: {{ totalAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                            ',')  }}</strong>
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text @click="dialog = false">ປິດ</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </v-card-title>
                <!-- </v-card> -->
            </v-card>
        </div>
        <v-dialog v-model="dialog2" max-width="800px">
            <v-card class="card-shadow mb-4" rounded="lg" width="800px">



                <v-card-title style="display:flex;background-color:#24ab70;color:white">

                    <v-spacer></v-spacer>
                    ປະວັດຈາຍເງິ່ນລຸກຄ້າ
                    <v-spacer></v-spacer>

                </v-card-title>
                <div class="search-print">
                    <v-col cols="12" md="8" sm="8">

                        <v-text-field placeholder="ຄົ້ນຫາ..." v-model="search" rounded background-color="#e1e1e1"
                            prepend-inner-icon="mdi-magnify">
                        </v-text-field>
                    </v-col>


                    <!-- <v-btn color="#e1e1e1" class="card-shadow print-btn" @click="print">
                            <v-icon>mdi-printer</v-icon> ພີມລາຍງານທັງໝົດ
                        </v-btn> -->
                </div>
                <v-card class="card-shadow mb-4" rounded="lg">
                    <v-card-title class="header-title1">


                        <v-col cols="12" md="4" sm="6" style="justify-self: center;">
                            <v-icon color="black">mdi-account</v-icon>
                            <span>ລູກຄ້າ</span>
                            <v-select style="width: 250px;" outlined dense label="ລູກຄ້າ" v-model="customer_id"
                                :items="customer_data_list" item-text="customerName" item-value="id" />
                        </v-col>
                        <v-col cols="12" md="4" sm="6" style="justify-self: center;">
                            <v-btn color="primary" @click="liststorycustomer">
                                Send ບ້ວງ
                            </v-btn>
                        </v-col>
                    </v-card-title>
                    <!-- Total Amount Display -->
                    <v-container class="pa-md-12">
                        <v-text-field outlined dense readonly class="mx-auto" density="compact" label="ລວມ"
                            :value="amount_money" max-width="300" persistent-placeholder prefix="LAK"
                            variant="outlined" />
                    </v-container>

                    <v-data-table :items="report_liststorycustomer" :headers="filteredliststorycustomer"
                        :items-per-page="50" :search="search">
                        <template v-slot:item="{ item }">
                            <tr>

                                <td>{{ item.customerName }}</td>
                                <td>{{ item.amount_money ?
                                    item.amount_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                                    }}</td>
                                <td>{{ item.money_y_luea ?
                                    item.money_y_luea.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                                    }}</td>
                                <td>{{ item.currency }}</td>
                                <td>{{ item.money_T_jaiy ?
                                    item.money_T_jaiy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                                    }}</td>
                                <td>{{ item.date }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>

            </v-card>
        </v-dialog>
        <!-- Dialog for Invoice Form -->
        <v-dialog v-model="dialog1" max-width="800px">
            <v-card class="card-shadow mb-4" rounded="lg" width="800px">
                <v-card-title class="orange--text white--text">
                    ໃບເກັບເງິນ
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <!-- Date Picker -->
                        <v-col>
                            <v-icon color="black">mdi-calendar-range</v-icon>
                            <span>ວັນທີ</span>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="formattedDate" transition="scale-transition" offset-y
                                min-width="auto">
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
                            <span>ອັບໂຫຼດເອກກະສານ</span>
                            <v-file-input label="ອັບໂຫຼດເອກກະສານ" outlined dense prepend-icon="mdi-file-pdf"
                                v-model="pdfandpic"></v-file-input>
                        </v-col>


                    </v-row>

                    <!-- Amount of money -->
                    <div justify="center" align="center">

                        <v-col cols="12" md="4" sm="6">
                            <v-icon size="55" color="black">mdi-cash-plus</v-icon>
                            <span>ຈຳນວນຂອງເງິນ</span>
                            <div style="display: flex;">
                                <!-- Display formatted amount -->
                                <v-text-field label="ພິມຈຳນວນຂອງເງິນ"
                                    style="font-size: 28px; font-weight: bold; width: 210px;" outlined dense
                                    v-model="formattedMoney" :rules="[v => !!v || 'Required field']">
                                </v-text-field>
                            </div>
                        </v-col>
                    </div>






                    <v-textarea label="ພິມລາຍລະອຽດ" outlined dense v-model="detail">
                        <v-icon color="black">mdi-file-document-outline</v-icon>
                        <span>detail</span>
                    </v-textarea>




                </v-card-text>

                <v-card-actions>
                    <v-btn @click="onstore_dept_Must_received" color="green" dark>
                        ບັນທຶກ
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            report_listitemOffice: [
                // Add your API data here
            ],
            dialog: false,
            selectedQuotationCode: null,
            filteredItems: [],
            search: '',
            amount_money: '',
            key_id: null,
            detail: "",
            amount_of_money: "", // Raw amount of money data
            dialog1: false,
            dialog2: false,
            formattedDate: "",
            pdfandpic: null,
            customer_data_list: [],
            report_liststorycustomer: [], // Customer's report history
            customer_id: '',
            report_listitemOffice: [],
            filteredliststorycustomer: [
                { text: 'ຊື່ລູກຄ້າ', value: 'customerName' },
                { text: 'ຈຳນວນ_ເງິນ', value: 'amount_money' },
                { text: 'ລາຄາ', value: 'money_y_luea' },
                { text: 'ສະກຸນເງິນ', value: 'currency' },



                { text: 'ເງິນທີຈ່າຍ', value: 'money_T_jaiy' },
                { text: 'ວັນ', value: 'date' },

            ],
            menu: false,
            loading_processing: false,
            filteredHeaders: [
                { text: 'ເລກບິນໃບເກັບເງິນ', value: 'quotation_code' },
                { text: 'ເລກບິນ', value: 'quotation_code' },


                { text: 'ລາຄາ', value: 'amount_money' },
                { text: 'ລາຍລະດຽດ', value: 'detail' },

                { text: 'ວັນ', value: 'due_date' },
                { text: 'ເບິ່ງເເລະເເກ້ໄຂ', value: '' },
            ],
        };
    },
    mounted() {
        this.listCarOffice(); // Fetch car office data on component mount
        this.onGetCustomerList(); // Fetch Bouang data when component is mounted

    },

    computed: {
        groupedReportItems() {
            const uniqueCodes = new Map();
            this.report_listitemOffice.forEach((item) => {
                if (!uniqueCodes.has(item.quotation_code)) {
                    uniqueCodes.set(item.quotation_code, item);
                }
            });
            return Array.from(uniqueCodes.values());
        },
        totalAmount() {
            return this.filteredItems.reduce((sum, item) => {
                return sum + parseFloat(item.amount_of_money || 0);
            }, 0).toFixed(2); // Ensures the total has 2 decimal places
        },
        headers() {
            return [
                { text: "Quotation Code", value: "quotation_code" },
                { text: "Actions", value: "actions", sortable: false },
            ];
        },
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
        handleQuotationClick(quotationCode) {
            this.selectedQuotationCode = quotationCode;
            this.filteredItems = this.report_listitemOffice.filter(
                (item) => item.quotation_code === quotationCode
            );
            this.dialog = true;
        },
        async onGetCustomerList() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('getAllCustomer', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response?.status === '00') {
                    this.customer_data_list = response?.data;
                }
                this.loading_processing = false;
            } catch (error) {
                this.loading_processing = false;
                console.error(error);
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'Unknown error occurred',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        viewview(key_id) {
            this.$router.push({ path: '/viewInvoiceDeptInsert', query: { key_id: key_id } });
        },

        save() {
            // You will send the raw `amount_of_money` to the API
            console.log(this.amount_of_money); // This is the raw value without commas
            // Send this value to your API
        },

        async onstore_dept_Must_received() {
            try {
                const response = await this.$axios.$post("/GenInvoiceCodeINV.service");
                if (response?.status === "00") {
                    const invoice_code = response.data[0]?.invoice_code_out;
                    this.save(invoice_code); // Call save with the generated code
                }
            } catch (error) {
                console.error("Error generating quotation code:", error);
            }
        },

        async save(invoice_code) {
            const formdata = new FormData();
            formdata.append("date", this.formattedDate || "0000-00-00");
            formdata.append("detail", this.detail);
            formdata.append("pdfandpic", this.pdfandpic);
            formdata.append("amount_of_money", this.amount_of_money);
            formdata.append("invoice_code", invoice_code);
            formdata.append("quotation_code", this.$route.query.quotation_code);
            formdata.append("toKen", localStorage.getItem("toKen"));

            this.loading_processing = true;
            try {
                const data = await this.$axios.$post(
                    "http://khounkham.com/api-prod/v1/truck/InvoiceDeptInsert.service",
                    formdata
                );
                this.onClearData(); // Clear form data after saving
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
        print() {
            window.print(); // This triggers the browser's print dialog
        },
        onClearData() {
            this.formattedDate = "";
            this.detail = "";
            this.pdfandpic = null;
            this.amount_of_money = "";
        },
        // Fetch customer's report history

        async liststorycustomer() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/DeptMustReceivedHistoryCustomer.service', {
                    customer_id: this.customer_id,
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API Response:', response); // Log the API response

                if (response?.status === '00') {
                    this.report_liststorycustomer = response?.data || []; // Ensure it's always an array
                    this.amount_money = response?.footer_amount?.amount_money_T_jaiy_pai_leo_total || '0'; // Save the total amount
                } else {
                    this.report_liststorycustomer = [];
                    this.amount_money = '0'; // Reset amount on failure
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        async listCarOffice() {
            try {
                this.loading_processing = true; // Start loading indicator

                // Retrieve key_id dynamically, if needed
                const key_id = this.key_id || localStorage.getItem("key_id"); // Ensure key_id is defined

                const response = await this.$axios.$post("/listOfInvoiceDept.service", {
                    toKen: localStorage.getItem("toKen"), // Get the token from localStorage
                    key_id: key_id, // Pass key_id in the request body
                });

                // Check the response status
                if (response?.status === "00") {
                    this.report_listitemOffice = response.data || []; // Assign data if status is "00"
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

<style scoped>
.card-shadow {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.mb-4 {
    margin-bottom: 1.5rem;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}
</style>
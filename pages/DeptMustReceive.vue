<template>
    <div>




        <v-dialog v-model="dialog" max-width="800px">

            <v-card class="card-shadow " rounded="lg" width="800px">
                <v-card-title class="orange--text white--text">
                    ລວມຍອດທີ່ຈ່າຍໄປເເລ້ວ
                </v-card-title>

                <v-card-text style="justify-content: center; align-items: center;">

                    <v-row>



                        <v-col cols="12" md="4" sm="6">
                            <v-icon color="black">mdi-account</v-icon>
                            <span>ລູກຄ້າ</span>
                            <div class="selection">
                                <v-autocomplete style="width: 400px;" outlined dense label="-ເລືອກລູກຄ້າ-"
                                    :items="customer_data_list" item-text="customerName" item-value="id"
                                    @change="onGetCustomerDetails">
                                </v-autocomplete>

                            </div>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                            <v-icon color="black">mdi-currency-usd</v-icon>
                            <span>ສະກຸນເງິນ</span>
                            <v-select v-model="selectedCurrency" :items="['LAK', 'THB', 'USD']" label="-ເລືອກສະກຸນເງິນ-"
                                outlined dense style="width: 400px;"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4" sm="6">
                            <v-icon color="black">mdi-calendar-range</v-icon>

                            <span>ວັນທີ</span>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="formattedDate" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field style="margin-right: 30px;" dense outlined v-model="formattedDate"
                                        required label="ວັນທີ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="formattedDate" no-title scrollable
                                    @input="$refs.menu.save(formattedDate)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                            <v-icon color="black">mdi-calendar-range</v-icon>
                            <span>ວັນທີ</span>

                            <v-menu ref="endmenu" v-model="endmenu" :close-on-content-click="false"
                                :return-value.sync="formattedDateand" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field style="margin-right: 30px;" dense outlined v-model="formattedDateand"
                                        required label="ວັນທີ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="formattedDateand" no-title scrollable
                                    @input="$refs.endmenu.save(formattedDateand)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>

                    <div style="display: flex; justify-content: center; align-items: center; height: 10vh">
                        <v-btn @click="onGetshowdata_table" style="background-color: green; width: 30%;color: white;">
                            <!-- <v-icon color="white">mdi-plus</v-icon> -->

                            ບັນທຶກ
                        </v-btn>
                    </div>

                    <v-col cols="12" md="4" sm="6" justify="start">


                        <div>
                            <p>ລວຍຍອດທີ່ຈ່າຍໄປເເລ້ວ {{ amount_money_T_jaiy_pai_leo_total }}</p>
                        </div>

                    </v-col>
                </v-card-text>
            </v-card>
        </v-dialog>










        <v-btn style="margin-top: 20px;margin-left: 20px;" @click="dialog = true" color="primary">
            <v-icon>
                mdi-account-search
            </v-icon>ຄົ້ນຫາ ຍອດລວມທີ່ຈ່າຍລູກຄ້າ
        </v-btn>


        <v-card variant="outlined" class="card-shadow mb-4" rounded="lg">
            <v-card-title style="display:flex;background-color:#E74848;color:white" class="header-title1">
                <spen style="margin-left: 20px;margin-right: 20px;">
                    ໃບສະເໝີລາຄາ
                </spen>
                <div class="search-print">
                    <v-text-field placeholder="ຄົ້ນຫາ..." v-model="search" rounded background-color="#e1e1e1"
                        prepend-inner-icon="mdi-magnify">
                    </v-text-field>

                    <v-btn color="#e1e1e1" class="card-shadow print-btn" @click="print">
                        <v-icon>mdi-printer</v-icon> ພີມລາຍງານທັງໝົດ
                    </v-btn>

                    <!-- <v-btn color="#1F7087" class="card-shadow print-btn" to="/testt-v-card-pdf">
                        <v-icon></v-icon> 
                    </v-btn> -->
                </div>

                <div style="width: 100%;">

                    <v-data-table :items="report_listitemOffice" :headers="filteredHeaders" :items-per-page="50"
                        :search="search">
                        <template v-slot:item="{ item }">
                            <tr>
                                <!-- <td>{{ item.customer_id }}</td> -->
                                <td>{{ item.quotation_code }}</td>
                                <!-- <td>{{ item.customerName }}</td>s -->
                                <!-- <td>{{ item.reference_number }}</td> -->
                                <td>{{ item.typeName }}</td>
                                <td>{{ item.topic }}</td>
                                <td>{{ item.unit ? item.unit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                                    }}</td>
                                <td>{{ item.amount_money ?
                                    item.amount_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '' }}</td>
                                <td>{{ item.totalMoney ? item.totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') : '' }}</td>

                                <td>{{ item.num }}</td>
                                <!-- Currency with Conditional Styling -->
                                <td :style="currencyStyle(item.currency)">
                                    {{ item.currency }}
                                </td>

                                <!-- <td>
                               
                                    <a v-if="item.document_1" @click="viewerpdf(item.document_1)" target="_blank">
                                        ເບິ່ງ ເອກະສານ 1
                                    </a>
                                </td>
                                <td>
                           
                                    <a v-if="item.document_2" @click="viewerpdf(item.document_2)" target="_blank">
                                        ເບິ່ງ ເອກະສານ 2
                                    </a>
                                </td> -->
                                <!-- <td>{{ item.status_wait_approve }}</td> -->
                                <!-- <td>{{ item.quotation }}</td> -->
                                <!-- <td>{{ item.description }}</td> -->
                                <td>{{ item.note }}</td>
                                <td>{{ item.date }}</td>
                                <td>{{ item.due_date }}</td>
                                <td>
                                    <v-btn style="height: 100%;width: 100%;" small color="#0059c8"
                                        class="white--text card-shadow" @click="viewview(item?.key_id)">
                                        <v-icon size="30" color="white">mdi-eye</v-icon>
                                    </v-btn>
                                </td>
                                <!-- <td v-if="item.status_wait_approve === 'N'">
                                    <v-btn style="height: 100%;width: 100%;" small color="#0059c8"
                                        class="white--text card-shadow" @click="conform(item?.key_id)">
                                        <v-icon size="30" color="white">mdi-content-save-check</v-icon>
                                    </v-btn>
                                </td> -->
                                <!-- <td v-if="item.status_wait_approve !== 'Y'">
                                      
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn style="height: 40px; width: 50px;" small color="#0085e3"
                                                    class="white--text card-shadow" v-bind="attrs" v-on="on">
                                                    <v-icon size="30" color="white">mdi-arrow-down-drop-circle</v-icon>
                                                </v-btn>
                                            </template>
                <v-list>


                    <v-list-item style="margin-bottom: 20px;" @click="viewup(item?.key_id)">
                        <v-list-item-icon>
                            <v-icon size="50" color="blue">mdi-table-edit</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Update</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="viewdelete(item?.key_id)">
                        <v-list-item-icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
                </td> -->

                            </tr>
                        </template>
                    </v-data-table>

                    <!-- Displaying Total -->
                    <!-- <div style="text-align: right; margin-top: 20px;">
                        <strong>ລວຍຍອດ: {{ totalAmount }}</strong>
                    </div> -->
                </div>
            </v-card-title>
        </v-card>
        <!-- PDF Dialog Viewer -->
        <v-dialog v-model="pdfDialog" max-width="800px">
            <v-card>
                <v-card-title>
                    PDF Viewer
                </v-card-title>
                <v-card-text>
                    <iframe :src="pdfUrl" width="100%" height="500px"></iframe>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="pdfDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>

</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {
            search: '',
            customer_data_list: [],
            customer_name: '',
            customer_mobile: '',
            customer_id: null,
            loading_processing: false,
            comment: '',
            endDate: '',
            updateEndDate: '',
            due_date_menu: false,
            pdfUrl: '',
            report_listitemOffice: [],
            filteredHeaders:
                [
                    // { text: 'Customer ID', value: 'customer_id' }, 
                    { text: 'ເລກໃບສະເໜີ', value: 'quotation_code' },
                    // { text: 'Customer Name', value: 'customerName' },
                    // { text: 'ເລກ ອ້າງອິງ', value: 'reference_number' },
                    { text: 'ປະເພດ', value: 'typeName' },
                    { text: 'ຫົວຂໍ', value: 'topic' },
                    { text: 'ຈໍານວນ', value: 'unit' },
                    { text: 'ລາຄາ', value: 'amount_money' },
                    { text: 'ຫົວນວຍ', value: 'num' },
                    { text: 'ລາຄາທັງໝົດ', value: 'totalMoney' },
                    { text: 'ສະກຸນເງິນ', value: 'currency' },
                    // { text: 'ເອກະສານ 1', value: 'document_1' },
                    // { text: 'ເອກະສານ 2', value: 'document_2' },
                    // { text: 'Status', value: 'status_wait_approve' },
                    // { text: 'Quotation', value: 'quotation' },
                    // { text: 'Description', value: 'description' },
                    { text: 'ໝາຍເຫດ', value: 'note' },
                    { text: 'ວັນ', value: 'date' },
                    { text: 'Due ວັນ', value: 'due_date' },
                ],
            selectedCurrency: '',
            selectedunit: '',
            document_1: null,
            document_2: null,
            dialog: false,
            customer_id: '',
            pdfDialog: false, // Controls the visibility of the PDF dialog
            quotation_code: '',
            topic: '',
            type_id: '',
            currency: 'LAK,THB,USD',
            reference_number: '',
            lek_bai_sung: '',
            amount_money: '',
            quotation: '',
            description: '',
            note: '',
            num: '',
            type_id: '',
            loading_processing: false,
            date: '',
            due_date: '',
            menu: '',
            toto: '0',
            formattedDate: "",
            formattedDateand: "",
            startDateMenu: '',
            formatteddue_date: '',
            updateStartDate: '',
            startDate: '',
            endDateMenu: '',
            buang_data_list: [],
            totalMoney: '',
            unit: '', // Add the unit data property here
            selectedCurrency: '', // Add selected currency if needed
            selectedunit: '', // Add selected unit if needed
        };
    },
    mounted() {
        this.onGetCustomerList(); // Fetch customer list on component mount
        this.onGetbuang(); // Fetch customer list on component mount
        this.listCarOffice(); // Fetch customer list on component mount
        this.onGetshowdata_table(); // Fetch truck data when component is mounted
    },
    watch: {
        // Watch changes in unit and amount_money
        unit() {
            this.calculateTotal();
        },
        amount_money() {
            this.calculateTotal();
        },
    },

    computed: {


        // Formatted displayAmountMoney with unit and currency
        displayAmountMoney: {
            get() {
                return this.formattedAmountMoney
                    ? `${this.formattedAmountMoney}`
                    : '';
            },
            set(value) {
                // Allow decimal numbers and remove commas for raw value
                this.amount_money = value.replace(/[^0-9.]/g, '');
            }
        },
        // Formatted unit with commas
        formattedUnit() {
            return this.unit
                ? this.unit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
        },
        // Formatted displayUnit with unit and currency
        displayUnit: {
            get() {
                return this.formattedUnit
                    ? `${this.formattedUnit}`
                    : '';
            },
            set(value) {
                // Allow decimal numbers and remove commas for raw value
                this.unit = value.replace(/[^0-9.]/g, '');
            }
        },
    },
    methods: {

        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                let data = {
                    startDate: this.formattedDate,

                    endDate: this.formattedDateand,
                    currency: this.selectedCurrency,
                    customer_id: this.customer_id,

                };
                const response = await this.$axios.$post('SearchingDeptMustReceived.service', data);
                console.log('API response:', response);
                if (response?.status === '00' && response?.footer_amount) {
                    this.footer_amount = response.footer_amount;
                    this.amount_money_T_jaiy_pai_leo_total = this.footer_amount.amount_money_T_jaiy_pai_leo_total;

                    console.log("Amount:", this.amount_money_T_jaiy_pai_leo_total);

                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
            }
        },
        // Calculate the total money
        calculateTotal() {
            // Parse the values as floats, accounting for decimal numbers
            const unit = parseFloat(this.unit) || 0;
            const amountMoney = parseFloat(this.amount_money) || 0;

            // Multiply the values and format the result with commas and decimals
            this.totalMoney = (unit * amountMoney).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        viewup(key_id) {
            this.$router.push({ path: '/editRE', query: { key_id: key_id } });
        },
        viewview(key_id) {
            this.$router.push({ path: '/viewREA', query: { key_id: key_id } });
        },
        currencyStyle(currency) {
            if (currency === 'USD') {
                return 'color: red;';
            } else if (currency === 'LAK') {
                return 'color: green;';
            } else if (currency === 'THB') {
                return 'color: blue;';
            }
            return '';
        },
        setCurrency(value) {
            this.currency = value;
        },
        onGetCustomerDetails(id) {
            const data = this.customer_data_list.find(el => el.id === id);
            if (data) {
                this.customer_name = data.customerName;
                this.customer_mobile = data.mobile;
                this.customer_id = id;
            }
        },
        onGetbuangDetails(key_id) {
            let data = this.buang_data_list.filter((el) => el.key_id === key_id);
            this.buang_send_buang = data[0]?.key_id;
            this.bouang = data[0]?.key_id; // Assign province to company
        },
        // Method to fetch all customers
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
        async onGetbuang() {
            try {
                this.loading_processing = true
                await this.$axios.$post('/getBouangAll.service',

                    {

                        toKen: localStorage.getItem('toKen'),


                    }).then((data) => {
                        if (data?.status == '00') {
                            this.buang_data_list = data?.data
                            this.loading_processing = false
                            console.log('buang:', this.buang_data_list)
                        } else {
                            this.loading_processing = false
                            swal.fire({
                                title: 'ແຈ້ງເຕືອນ',
                                text: data?.message,
                                icon: 'info',
                                allowOutsideClick: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK',
                            })
                        }
                    })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        // Print function
        print() {
            window.print(); // Simple print functionality
        },

        async onstore_dept_Must_received() {
            try {
                const response = await this.$axios.$post('/GenQuotationCodeKKT.service');
                console.log("inv:", response);

                if (response?.status === "00") {
                    const quotation_code = response.data[0]?.kkt_code;
                    this.quotation_code = quotation_code; // Set the quotation_code in data

                    // Call save with the quotation_code

                    this.save(quotation_code);
                    // SweetAlert2 success notification after quotation code generation
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Error generating quotation code:", error);
            }

        },

        async save(quotation_code) {
            const formdata = new FormData();

            formdata.append('customer_id', this.customer_id);
            formdata.append('topic', this.topic);
            formdata.append('type_id', this.bouang);
            formdata.append('currency', this.selectedCurrency);
            formdata.append('datee', this.formattedDate || '0000-00-00');
            formdata.append('due_date', this.formatteddue_date || '0000-00-00');
            formdata.append('reference_number', this.reference_number);
            formdata.append('lek_bai_sung', this.lek_bai_sung);
            formdata.append('quotation', this.quotation);
            formdata.append('document_1', this.document_1);
            formdata.append('document_2', this.document_2);
            formdata.append('description', this.comment);
            formdata.append('note', this.note);
            formdata.append('toKen', localStorage.getItem("toKen"));
            formdata.append('num', this.selectedunit);
            formdata.append('amount_money', this.amount_money);
            formdata.append('unit', this.unit);
            formdata.append('totalMoney', this.totalMoney);
            formdata.append('quotation_code', quotation_code);

            this.loading_processing = true;

            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/DeptMustReceivedInsert.service', formdata);
                console.log("Response:", data);

                // Optionally clear form data here
                this.onClearData();

                // SweetAlert2 success notification after saving
                Swal.fire({
                    title: 'Success!',
                    text: 'Data has been saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });

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
            // Clear your form fields here
            this.customer_id = '';
            this.topic = '';
            this.bouang = '';
            this.selectedCurrency = '';
            this.formattedDate = '';
            this.formatteddue_date = '';
            this.reference_number = '';
            this.lek_bai_sung = '';
            this.quotation = '';
            this.document_1 = null;
            this.document_2 = null;
            this.comment = '';
            this.note = '';
            this.selectedunit = '';
            this.amount_money = '';
            this.unit = '';
            this.totalMoney = '';
        },
        // Method to view PDF in a dialog
        viewerpdf(pdf) {
            if (pdf) {
                this.pdfUrl = pdf;
                this.pdfDialog = true; // Open the PDF dialog
            }
        },
        // Method to check the file name length for document_1
        checkFileName1() {
            if (this.document_1 && this.document_1.name.length > 100) {
                alert('The text is too long');
                this.document_1 = null;
                this.pdfDialog = false; // Close PDF dialog when document_1 is cleared
            }
        },
        // Method to check the file name length for document_2
        checkFileName2() {
            if (this.document_2 && this.document_2.name.length > 100) {
                alert('The text is too long');
                this.document_2 = "";
                this.pdfDialog = false; // Close PDF dialog when document_2 is cleared
            }
        },
        // Clear both documents and close the PDF viewer
        onClearData() {
            this.document_1 = null;
            this.document_2 = "";
            this.pdfDialog = false; // Close the PDF dialog when documents are cleared
        },
        async listCarOffice() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/listDeptMustReceivedAll.service', {

                    toKen: localStorage.getItem('toKen'),
                    // bound: this.bound,
                    // bouang: this.selectedBuang,
                    // company: this.company,
                    // type: this.selectedProduct,
                    // classofdocs: this.classofdocs,
                    // userIdoffinanceial: this.userIdoffinanceial // Pass the selected userIdoffinanceial value here
                });

                console.log('API Response:', response);  // Log the API response

                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || []; // Ensure it's always an array
                } else {
                    this.report_listitemOffice = [];
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


        async conform(key_id) {
            try {
                // Show confirmation dialog
                const result = await swal.fire({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                });

                if (result.isConfirmed) {
                    // Call API to delete item if confirmed
                    const response = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/AcceptTheReqDeptMustReceive.service', {
                        // action: 'delete',
                        key_id: key_id,
                        toKen: localStorage.getItem('toKen'),


                    });

                    if (response && response.status === '00') {
                        swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        this.listCarOffice(); // Refresh the list
                    } else {
                        swal.fire(
                            'Failed!',
                            'There was an error deleting your file.',
                            'error'
                        );
                    }
                }
            } catch (error) {
                // Handle errors
                this.$toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
                console.error(error);
            }

        },

    },
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.print-btn {
    margin-left: 10px;
}

.search-print {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
}
</style>

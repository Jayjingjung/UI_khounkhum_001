<template>
    <div>
        <div justify="center" align="center">
            <!-- <v-img src="path-to-image.jpg" alt="Header Image" height="200px"></v-img> Add an image if needed -->

            <v-card style="width: 1200px;" class="card-shadow mb-4" rounded="lg">


                <v-card-title style="display:flex;background-color:#00E676;color:white">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="DeptMustReceive">
                        <v-icon color="#E74848">mdi-arrow-left</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>
                    ໃບສະເໝີລາຄາ
                    <v-spacer></v-spacer>

                </v-card-title>



                <div class="main-content">
                    <!-- Customer Selection -->
                    <!-- <v-card> -->



                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-account</v-icon>
                        <span>ລູກຄ້າ</span>
                        <span>: {{ customerName }}</span> <!-- Display selected customer name -->
                        <div class="selection">
                            <v-autocomplete outlined dense label="-ເລືອກລູກຄ້າ-" :items="customer_data_list"
                                item-text="customerName" item-value="id" @change="onGetCustomerDetails">
                            </v-autocomplete>

                        </div>
                    </v-col>


                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-cash</v-icon>

                        <span>ສະກຸນເງິນ</span>

                        <div class="currency-selection">
                            <div justify="center" align="center">
                                <v-btn style="width: 80px;font-size: 25px "
                                    :class="{ 'selected-currency': selectedCurrency === 'LAK' }"
                                    @click="selectedCurrency = 'LAK'">
                                    LAK
                                </v-btn>
                                <v-btn style="width: 80px;font-size: 25px "
                                    :class="{ 'selected-currency': selectedCurrency === 'USD' }"
                                    @click="selectedCurrency = 'USD'">
                                    USD
                                </v-btn>
                                <v-btn style="width: 80px;font-size: 25px "
                                    :class="{ 'selected-currency': selectedCurrency === 'THB' }"
                                    @click="selectedCurrency = 'THB'">
                                    THB
                                </v-btn>
                            </div>
                        </div>

                    </v-col>
                    <!-- <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-document-outline</v-icon>

                        <span>ໃບສະເໜີລາຄາເລກທີ</span>

                        <v-text-field label="ພີມໃບສະເໜີລາຄາເລກທີ" outlined dense v-model="quotation"></v-text-field>
                    </v-col> -->
                    <!-- </v-card> -->
                </div>
                <div class="main-content">
                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-calendar-range</v-icon>

                        <span>ວັນທີ</span>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                            :return-value.sync="formattedDate" transition="scale-transition" offset-y min-width="auto">
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


                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-calendar-range</v-icon>
                        <span>ວັນທີຄົບກໍານົດ</span>
                        <v-menu ref="due_date_menu" v-model="due_date_menu" :close-on-content-click="false"
                            :return-value.sync="formatteddue_date" transition="scale-transition" offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="formatteddue_date" required
                                    label="ພີມວັນທີຄົບກໍານົດ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="formatteddue_date" no-title scrollable
                                @input="$refs.due_date_menu.save(formatteddue_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </v-col>

                    <!-- <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-document-outline</v-icon>

                        <span>ໃບສັ່ງເລກທີ</span>
                        <v-text-field label="ພີມໃບສັ່ງເລກທີ" outlined dense v-model="lek_bai_sung"
                            :rules="[v => !!v || 'Required field']"></v-text-field>
                    </v-col> -->
                </div>

                <div class="footer-content">

                    <!-- <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-document-outline</v-icon>

                        <span>ການອ້າງອີງ</span>
                        <v-text-field label="ພີມການອ້າງອີງ" outlined dense v-model="reference_number"></v-text-field>
                    </v-col> -->
                    <!-- Customer Selection -->

                    <v-col cols="12" md="4" sm="6">
                        <div style="margin-right: 10px;">
                            <v-icon color="black">mdi-file-document-outline</v-icon>

                            <span>ຫົວຂໍ</span>

                            <v-text-field label="ພິມຫົວຂໍ" outlined dense v-model="topic"></v-text-field>
                        </div>
                    </v-col>



                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-account</v-icon>
                        <span>ປະເພດ</span>
                        <span>: {{ typeName }}</span> <!-- Display selected customer name -->

                        <div class="selection">
                            <v-autocomplete outlined dense label="-ປະເພດ-" :items="buang_data_list"
                                item-text="nameOfBouang" item-value="key_id" @change="onGetbuangDetails">
                            </v-autocomplete>

                        </div>
                    </v-col>


                </div>

                <div justify="center" align="center">


                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-pdf-box</v-icon>
                        <span>ອັບໂຫຼດເອກກະສານ1</span>
                        <v-file-input style="margin-right: 30px;" ref="fileInput1" label="ອັບໂຫຼດເອກກະສານ1" outlined
                            dense prepend-icon="mdi-file-pdf" append-inner-icon="mdi-file-pdf"
                            background-color="#f5f5f5" v-model="document_1" @change="checkFileName1">
                        </v-file-input>
                    </v-col>


                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-pdf-box</v-icon>
                        <span>ອັບໂຫຼດເອກກະສານ1</span>


                        <v-card-text>
                            <iframe v-if="document_1" :src="document_1" width="100%" height="500px"
                                frameborder="0"></iframe>
                        </v-card-text>
                    </v-col>
                </div>

                <div class="footer-content">



                    <v-col cols="12" md="4" sm="6">
                        <div style="margin-right: 10px;">
                            <v-icon size="55" color="black">mdi-tape-measure</v-icon>

                            <span>ຫົວໜ່ວຍ</span>

                            <div class="currency-selection">
                                <div justify="center" align="center">
                                    <v-btn style="width: 70px;font-size: 20px "
                                        :class="{ 'selected-currency': selectedunit === 'ອັນ' }"
                                        @click="selectedunit = 'ອັນ'">
                                        ອັນ
                                    </v-btn>
                                    <v-btn style="width: 70px;font-size: 20px "
                                        :class="{ 'selected-currency': selectedunit === 'ໂຕນ' }"
                                        @click="selectedunit = 'ໂຕນ'">
                                        ໂຕນ
                                    </v-btn>
                                    <v-btn style="width: 70px;font-size: 20px "
                                        :class="{ 'selected-currency': selectedunit === 'ລິດ' }"
                                        @click="selectedunit = 'ລິດ'">
                                        ລິດ
                                    </v-btn>
                                    <v-btn style="width: 70px;font-size: 20px "
                                        :class="{ 'selected-currency': selectedunit === 'ຄັ້ງ' }"
                                        @click="selectedunit = 'ຄັ້ງ'">
                                        ຄັ້ງ
                                    </v-btn>
                                </div>
                            </div>

                        </div>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                        <v-icon size="55" color="black">mdi-ticket-confirmation</v-icon>
                        <span>ຈໍານວນ</span>
                        <div style="display: flex;">
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 210px;" label="ພີມ" outlined
                                dense v-model="displaynum" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 20px;" outlined dense
                                v-model="selectedunit" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                        </div>
                    </v-col>

                    <!-- Customer Selection -->







                </div>
                <v-row justify="center" align="center">
                    <v-col cols="12" md="4" sm="6">
                        <v-icon size="55" color="black">mdi-cash</v-icon>
                        <span style="font-size: 24px;">ລາຄາ</span>
                        <div style="display: flex;">
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 210px;" label="ພີມລາຄາ"
                                outlined dense v-model="displayAmountMoney" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 40px;" outlined dense
                                v-model="selectedCurrency" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 60px;" outlined dense
                                v-model="selectedunit" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                        <v-icon size="55" color="black">mdi-cash-plus</v-icon>
                        <span>ລາຄາທັງໝົດ</span>
                        <div class="selection">
                            <div style="display: flex;">
                                <v-text-field style="font-size: 28px; font-weight: bold;" label="ລາຄາທັງໝົດ" outlined
                                    dense v-model="totalMoney" readonly>
                                </v-text-field>
                                <v-text-field style="font-size: 28px; font-weight: bold; width: 100px;" outlined dense
                                    v-model="selectedCurrency" :rules="[v => !!v || 'Required field']">
                                </v-text-field>
                            </div>
                        </div>
                    </v-col>
                </v-row>


                <!-- Additional Fields -->
                <v-textarea style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;"
                    label="ຄໍາອະທິບາຍ" v-model="comment" outlined dense :rules="[v => !!v || 'Comment is required']"
                    rows="8" auto-grow>
                </v-textarea>

                <!-- Additional Fields -->
                <v-textarea
                    style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;width: 800px;"
                    label="ໝາຍເຫດ" v-model="note" outlined dense :rules="[v => !!v || 'Comment is required']" rows="4"
                    auto-grow>
                </v-textarea>

                <div>

                    <v-data-table :headers="headers" :items="deptList" item-key="key_id" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Department List</v-toolbar-title>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.key_id="{ item }">
                            <span>{{ item.key_id }}</span>
                        </template>
                        <template v-slot:item.listName="{ item }">
                            <span>{{ item.listName }}</span>
                        </template>
                        <template v-slot:item.quotation_code="{ item }">
                            <span>{{ item.quotation_code }}</span>
                        </template>
                        <template v-slot:item.amount="{ item }">
                            <span>{{ item.amount }}</span>
                        </template>
                        <template v-slot:item.price="{ item }">
                            <span>{{ item.price }}</span>
                        </template>
                        <template v-slot:item.totalPrice="{ item }">
                            <span>{{ item.totalPrice }}</span>
                        </template>
                    </v-data-table>

                </div>
                <div
                    style="display: flex; justify-content: center; align-items: center; height: 10vh">
                    <v-btn @click="confarm" style="background-color: green; width: 30%;color: white;">

                        ບັນທຶກ
                    </v-btn>
                </div>
            </v-card>






        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {
            search: '',
            USER_ROLE: '', // Initialize USER_ROLE in data
            FOR_DOCUMENT_ADMIN: false, // Initialize FOR_DOCUMENT_ADMIN in data
            customer_data_list: [],
            customer_name: '',
            customer_mobile: '',

            customer_id: null,
            loading_processing: false,
            comment: '',
            customer_data_list: [], // This should be populated with customer data
            customerName: '', // For displaying customer name
            customer_id: '', // To store selected customer ID
            due_date_menu: false,
            pdfUrl: '',
            report_listitemOffice: [],

            selectedCurrency: '',
            selectedunit: '',
            document_1: null,
            deptList: [],

            headers: [
                { text: 'Key ID', value: 'key_id' },
                { text: 'List Name', value: 'listName' },
                { text: 'Quotation Code', value: 'quotation_code' },
                { text: 'Amount', value: 'amount' },
                { text: 'Price', value: 'price' },
                { text: 'Total Price', value: 'totalPrice' },
            ],
            typeName: '',
            checkFileName1: '',
            pdfDialog: false, // Controls the visibility of the PDF dialog
            quotation_code: '',
            topic: '',
            type_id: '',
            currency: '',
            reference_number: '0',
            lek_bai_sung: '0',
            amount_money: '',
            quotation: '0',
            description: '',
            note: '',
            num: '',
            type_id: '',
            loading_processing: false,
            date: '',
            due_date: '',
            menu: '',
            toto: '0',
            formattedDate: null,
            formatteddue_date: '',
            buang_data_list: [],
            totalMoney: '',
            unit: '', // Add the unit data property here
            selectedCurrency: '', // Add selected currency if needed
            selectedunit: '', // Add selected unit if needed
        };
    },
    mounted() {
        if (this.$route.query.key_id) {
            this.onGetData(this.$route.query.key_id); // Use the correct method name

            this.onGetbuang(); // Fetch customer list on component mount
            this.onGetCustomerList(); // Fetch customer list on component mount

        }

    },
    watch: {
        // Watch changes in unit and amount_money
        num() {
            this.calculateTotal();
        },
        amount_money() {
            this.calculateTotal();
        },
    },

    computed: {
        formattedAmountMoney() {
            return this.amount_money !== null && this.amount_money !== undefined
                ? this.amount_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
        },
        // Formatted displayAmountMoney with num and currency
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
        // Formatted num with commas
        formattednum() {
            return this.num
                ? this.num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
        },
        // Formatted displaynum with num and currency
        displaynum: {
            get() {
                return this.formattednum
                    ? `${this.formattednum}`
                    : '';
            },
            set(value) {
                // Allow decimal numbers and remove commas for raw value
                this.num = value.replace(/[^0-9.]/g, '');
            }
        },
    },
    methods: {
        async confarm() {
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
            // Set loading to true when processing starts
            this.loading_processing = true;

            // Call API to delete the item if confirmed
            const response = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/AcceptTheReqDeptMustReceive.service', {
                key_id: this.$route.query.key_id, // Send key_id from route query
                toKen: localStorage.getItem('toKen') // Send token from localStorage
            });

            // Check if the API response is successful
            if (response?.status === '00') {
                this.customer_data_list = response?.data; // Update customer data list
            }

            // Stop the loading indicator
            this.loading_processing = false;

            // Show success message
            await swal.fire({
                title: 'Deleted!',
                text: 'Your item has been deleted.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        }
    } catch (error) {
        // Stop the loading indicator in case of an error
        this.loading_processing = false;

        // Log the error
        console.error(error);

        // Show error message
        await swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: error.message || 'Unknown error occurred',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });

        // Call the listCarOffice method after the error
        this.listCarOffice();
    }
}
,

        
            // Calculate the total money
            calculateTotal() {
                // Parse the values as floats, accounting for decimal numbers
                const num = parseFloat(this.num) || 0;
                const amountMoney = parseFloat(this.amount_money) || 0;

                // Multiply the values and format the result with commas and decimals
                this.totalMoney = (num * amountMoney).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        async onGetData(key_id) {
                try {
                    const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listDeptMustReceiveddetail.service', {
                        key_id: key_id
                    });
                    if (data?.status === "00") {
                        const details = data?.data[0] || {};
                        this.customerName = details.customerName || "";
                        this.formattedDate = details.date || "";
                        this.formatteddue_date = details.due_date || "";
                        this.topic = details.topic || "";
                        this.typeName = details.typeName || "";
                        this.bouang = details.type_id || "";
                        this.customer_id = details.customer_id || "";
                        this.selectedunit = details.unit || "";
                        this.selectedCurrency = details.currency || "";
                        this.displaynum = details.num || "";
                        this.displayAmountMoney = details.amount_money || "";
                        this.totalMoney = details.totalMoney || "";

                        this.note = details.note || "";
                        this.comment = details.description || "";
                        this.document_1 = details.document_1 || "";
                        this.quotation_code = details.quotation_code || "";


                    }

                    this.onGetindexData()
                }
                catch (error) {

                    console.log(error);
                }
            }
        ,
        async onGetindexData() {
                try {
                    // Ensure that `quotation_code` is available
                    if (!this.quotation_code) {
                        throw new Error("Quotation code is not available.");
                    }

                    // Send `quotation_code` to the API
                    const response = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listNameOfDept.service', {
                        quotation_code: this.quotation_code
                    });

                    if (response?.status === "00") {
                        // Store the fetched data in deptList to display in UI
                        this.deptList = response?.data || [];
                        console.log('Data fetched successfully:', this.deptList);
                    } else {
                        // Handle case where API response status is not "00"
                        console.error('Failed to fetch data. API response status:', response?.status);
                    }
                } catch (error) {
                    // Log any errors that occur during the process
                    console.error('Error while fetching data:', error.message);
                }
            }


        ,
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




        async updat(quotation_code) {
                const formdata = new FormData();

                // Append form fields to FormData
                formdata.append('document_1', this.document_1);
                formdata.append('customer_id', this.customer_id);
                formdata.append('toKen', localStorage.getItem("toKen"));
                formdata.append('topic', this.topic);
                formdata.append('currency', this.selectedCurrency);
                formdata.append('datee', this.formattedDate || '0000-00-00');
                formdata.append('due_date', this.formatteddue_date || '0000-00-00');
                formdata.append('reference_number', this.reference_number);
                formdata.append('lek_bai_sung', this.lek_bai_sung);
                formdata.append('amount_money', this.amount_money);
                formdata.append('quotation', this.quotation);
                formdata.append('description', this.comment);
                formdata.append('num', this.selectedunit);
                formdata.append('unit', this.unit);
                formdata.append('totalMoney', this.totalMoney);
                // formdata.append('quotation_code', quotation_code);

                // Append key_id from route query
                formdata.append('note', this.note);
                formdata.append('type_id', this.bouang);
                formdata.append('key_id', this.$route.query.key_id);

                this.loading_processing = true;

                try {
                    const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/DeptMustReceivedUpdate.service', formdata);
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

                this.comment = '';
                this.note = '';
                this.selectedunit = '';
                this.amount_money = '';
                this.unit = '';
                this.totalMoney = '';
            },
            // Method to view PDF in a dialog



            // Clear both documents and close the PDF viewer




        },
    };
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.selected-currency {
    /* background-color: rgb(16, 38, 160); */
    color: rgb(228, 18, 18);
}

.header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #e0e0e0;
    background-color: #d81313;
    color: white;
    padding: 10px;
}

.search-print {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.print-btn {
    margin-left: 10px;
}

.main-content,
.footer-content {
    display: flex;
    flex-wrap: wrap;
    margin-left: 12px;
}

.selection {
    display: flex;
    align-items: center;
    margin-right: 10px;
}


.currency-selection {
    display: flex;
    /* align-items: center; */

    gap: 10px;
    margin-right: 10px;

}

@media (max-width: 768px) {
    .search-print {
        flex-direction: column;
        width: 100%;
    }

    .main-content,
    .footer-content {
        flex-direction: column;
        margin-left: 0;
    }

    .selection,
    .currency-selection {
        flex-direction: column;
        /* align-items: center; */

    }
}
</style>

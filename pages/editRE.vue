<template>
    <div>
        <div>
            <v-card class="card-shadow mb-4" rounded="lg">


                <v-card-title style="display:flex;background-color:#9e62d7;color:white">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="receivedAll">
                        <v-icon color="#9e62d7">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    ເເກ້ລາຍງານ
                    <v-spacer></v-spacer>
                </v-card-title>
                <div style="display: flex;justify-content: space-between;">


                    <v-card style="width: 100%;">


                        <div class="main-content">
                            <!-- Customer Selection -->
                            <!-- <v-card> -->



                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-account</v-icon>
                                <span>ລູກຄ້າ</span>
                                <!-- <v-autocomplete outlined dense label="-ເລືອກລູກຄ້າ-" :items="customer_data_list"
                                item-text="customerName" item-value="id" @change="onGetCustomerDetails">
                            </v-autocomplete> -->

                                <v-text-field label="-ເລືອກລູກຄ້າ-" outlined dense
                                    v-model="REDetail.customerName"></v-text-field>
                            </v-col>


                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-cash</v-icon>
                                <span>ສະກຸນເງິນ</span>
                                <div class="currency-selection">
                                    <v-btn v-for="currencyOption in currencyOptions" :key="currencyOption"
                                        :style="getCurrencyButtonStyle(currencyOption)"
                                        @click="setCurrency(currencyOption)">
                                        {{ currencyOption }}
                                    </v-btn>
                                </div>
                            </v-col>


                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-document-outline</v-icon>

                                <span>ໃບສະເໜີລາຄາເລກທີ</span>

                                <v-text-field label="ພີມໃບສະເໜີລາຄາເລກທີ" outlined dense
                                    v-model="REDetail.quotation"></v-text-field>
                            </v-col>
                            <!-- </v-card> -->
                        </div>
                        <div class="main-content">
                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-calendar-range</v-icon>
                                <span>ວັນທີ</span>
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                    :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field dense outlined v-model="REDetail.date" required label="ວັນທີ"
                                            append-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
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
                                    :return-value.sync="due_date" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field dense outlined v-model="REDetail.due_date" required
                                            label="ພີມວັນທີຄົບກໍານົດ" append-icon="mdi-calendar" v-bind="attrs"
                                            v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="due_date" no-title scrollable
                                        @input="$refs.due_date_menu.save(formatteddue_date)">
                                        <v-spacer></v-spacer>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-document-outline</v-icon>

                                <span>ໃບສັ່ງເລກທີ</span>
                                <v-text-field label="ພີມໃບສັ່ງເລກທີ" outlined dense v-model="REDetail.lek_bai_sung"
                                    :rules="[v => !!v || 'Required field']"></v-text-field>
                            </v-col>
                        </div>

                        <div class="footer-content">

                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-document-outline</v-icon>

                                <span>ການອ້າງອີງ</span>
                                <v-text-field label="ພີມການອ້າງອີງ" outlined dense
                                    v-model="REDetail.reference_number"></v-text-field>
                            </v-col>
                            <!-- Customer Selection -->

                            <v-col cols="12" md="4" sm="6">
                                <div style="margin-right: 10px;">
                                    <v-icon color="black">mdi-file-document-outline</v-icon>

                                    <span>ຫົວຂໍ</span>

                                    <v-text-field label="ພິມຫົວຂໍ" outlined dense
                                        v-model="REDetail.topic"></v-text-field>
                                </div>
                            </v-col>



                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-account</v-icon>
                                <span>ປະເພດ</span>
                                <div class="selection">

                                    <!-- <v-autocomplete outlined dense label="-ປະເພດ-" :items="buang_data_list"
                                item-text="nameOfBouang" item-value="key_id" @change="onGetbuangDetails">
                            </v-autocomplete> -->

                                    <v-text-field label="-ປະເພດ-" outlined dense
                                        v-model="REDetail.typeName"></v-text-field>

                                </div>
                            </v-col>


                        </div>

                        <v-row style="display: flex;justify-content: space-evenly;">
                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-pdf-box</v-icon>
                                <span>ອັບໂຫຼດເອກກະສານ1</span>
                                <!-- {{ document_1 }} -->

                                <v-card-text>
                                    <iframe v-if="document_1" :src="REDetail.document_1" width="100%" height="500px"
                                        frameborder="0"></iframe>
                                </v-card-text>
                            </v-col>

                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-pdf-box</v-icon>
                                <span>ອັບໂຫຼດເອກກະສານ2</span>
                                <!-- {{ document_2 }} -->
                                <v-card-text>
                                    <iframe v-if="document_2" :src="REDetail.document_2" width="100%" height="500px"
                                        frameborder="0"></iframe>
                                </v-card-text>

                            </v-col>
                        </v-row>



                        <div justify="center" align="center">
                            <v-col cols="12" md="4" sm="6">
                                <v-icon size="55" color="black">mdi-cash</v-icon>

                                <span style="font-size: 24px;">ລາຄາ</span>
                                <div class="selection">

                                    <v-text-field style="font-size: 28px; font-weight: bold;" label="ພີມລາຄາ" outlined
                                        dense v-model="displayAmountMoney"
                                        :rules="[v => !!v || 'Required field']"></v-text-field>

                                    <v-btn style="color: red;margin-top: -30px;">
                                        {{ currency }}
                                    </v-btn>
                                </div>
                            </v-col>
                        </div>


                        <!-- Additional Fields -->
                        <v-textarea
                            style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;width: auto;"
                            label="ຄໍາອະທິບາຍ" v-model="REDetail.description" outlined dense
                            :rules="[v => !!v || 'Description is required']" rows="8" auto-grow></v-textarea>

                        <v-textarea
                            style="font-size : 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;width: auto;"
                            label="ໝາຍເຫດ" v-model="REDetail.note" outlined dense
                            :rules="[v => !!v || 'Note is required']" rows="4" auto-grow></v-textarea>
                    </v-card>
                    <v-card style="width: 100%;border: red;">
                        <div class="main-content">
                            <!-- Customer Selection -->
                            <!-- <v-card> -->



                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-account</v-icon>
                                <span>ລູກຄ້າ</span>
                                <div class="selection">
                                    <v-autocomplete outlined dense label="-ເລືອກລູກຄ້າ-" :items="customer_data_list"
                                        item-text="customerName" item-value="id" @change="onGetCustomerDetails">
                                    </v-autocomplete>
                                    <v-btn to="customer" style="background-color: blue;margin-top: -30px;">
                                        <v-icon color="white">mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>


                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-cash</v-icon>

                                <span>ສະກຸນເງິນ</span>

                                <div class="currency-selection">
                                    <div justify="center" align="center">
                                        <v-btn style="width: auto;"
                                            :class="{ 'selected-currency': selectedCurrency === 'LAK' }"
                                            @click="selectedCurrency = 'LAK'">
                                            LAK
                                        </v-btn>
                                        <v-btn style="width: auto;"
                                            :class="{ 'selected-currency': selectedCurrency === 'USD' }"
                                            @click="selectedCurrency = 'USD'">
                                            USD
                                        </v-btn>
                                        <v-btn style="width: auto;"
                                            :class="{ 'selected-currency': selectedCurrency === 'THB' }"
                                            @click="selectedCurrency = 'THB'">
                                            THB
                                        </v-btn>
                                    </div>
                                </div>

                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-document-outline</v-icon>

                                <span>ໃບສະເໜີລາຄາເລກທີ</span>

                                <v-text-field label="ພີມໃບສະເໜີລາຄາເລກທີ" outlined dense
                                    v-model="quotation"></v-text-field>
                            </v-col>
                            <!-- </v-card> -->
                        </div>
                        <div class="main-content">
                            <v-col cols="12" md="4" sm="6">
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

                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-document-outline</v-icon>

                                <span>ໃບສັ່ງເລກທີ</span>
                                <v-text-field label="ພີມໃບສັ່ງເລກທີ" outlined dense v-model="lek_bai_sung"
                                    :rules="[v => !!v || 'Required field']"></v-text-field>
                            </v-col>
                        </div>

                        <div class="footer-content">

                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-document-outline</v-icon>

                                <span>ການອ້າງອີງ</span>
                                <v-text-field label="ພີມການອ້າງອີງ" outlined dense
                                    v-model="reference_number"></v-text-field>
                            </v-col>
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
                                <div class="selection">
                                    <v-autocomplete outlined dense label="-ປະເພດ-" :items="buang_data_list"
                                        item-text="nameOfBouang" item-value="key_id" @change="onGetbuangDetails">
                                    </v-autocomplete>
                                    <v-btn to="customer" style="background-color: blue;margin-top: -30px;">
                                        <v-icon color="white">mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                            </v-col>


                        </div>

                        <v-row justify="center" align="center">
                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-pdf-box</v-icon>
                                <span>ອັບໂຫຼດເອກກະສານ1</span>
                                <v-file-input style="margin-right: 30px;" ref="fileInput1" label="ອັບໂຫຼດເອກກະສານ1"
                                    outlined dense prepend-icon="mdi-file-pdf" append-inner-icon="mdi-file-pdf"
                                    background-color="#f5f5f5" v-model="document_1" @change="checkFileName1">
                                </v-file-input>
                            </v-col>

                            <v-col cols="12" md="4" sm="6">
                                <v-icon color="black">mdi-file-pdf-box</v-icon>
                                <span>ອັບໂຫຼດເອກກະສານ2</span>
                                <v-file-input style="margin-right: 30px;" ref="fileInput2" label="ອັບໂຫຼດເອກກະສານ2"
                                    outlined dense prepend-icon="mdi-file-pdf" append-inner-icon="mdi-file-pdf"
                                    background-color="#f5f5f5" v-model="document_2" @change="checkFileName2">
                                </v-file-input> </v-col>
                        </v-row>



                        <v-row justify="center" align="center">
                            <v-col cols="12" md="4" sm="6">
                                <v-icon size="55" color="black">mdi-cash</v-icon>
                                <span style="font-size: 24px;">ລາຄາ</span>

                                <v-text-field style="font-size: 28px; font-weight: bold;" label="ພີມລາຄາ" outlined dense
                                    v-model="displayAmountMoney" :rules="[v => !!v || 'Required field']"></v-text-field>



                            </v-col>

                            <!-- <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-document-outline</v-icon>
                        <span>ລວຍລາຄາ</span>
                        <v-text-field label="ພີມລວຍລາຄາ" outlined dense v-model="ພີມລວຍລາຄາ"></v-text-field>
                    </v-col> -->
                        </v-row>


                        <!-- Additional Fields -->
                        <v-textarea style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;"
                            label="ຄໍາອະທິບາຍ" v-model="comment" outlined dense
                            :rules="[v => !!v || 'Comment is required']" rows="8" auto-grow>
                        </v-textarea>

                        <!-- Additional Fields -->
                        <v-textarea
                            style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;width: 800px;"
                            label="ໝາຍເຫດ" v-model="note" outlined dense :rules="[v => !!v || 'Comment is required']"
                            rows="4" auto-grow>
                        </v-textarea>
                    </v-card>

                </div>

                <div style="display: flex; justify-content: center; align-items: center; height: 10vh">
                    <v-btn @click="onstore_dept_Must_received"
                        style="background-color: green; width: 30%;color: white;">
                        <!-- <v-icon color="white">mdi-plus</v-icon> -->

                        ບັນທຶກ
                    </v-btn>
                </div>

            </v-card>

        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            search: '',
            checkFileName1: '',
            checkFileName2: '',
            customer_data_list: [],
            customer_name: '',
            customer_mobile: '',
            customer_id: null,
            loading_processing: false,
            comment: '',
            due_date_menu: false,
            selectedCurrency: '',
            document_1: null,
            document_2: null,
            customer_id: '',
            pdfDialog: false, // Controls the visibility of the PDF dialog

            topic: '',
            type_id: '',
            currency: '',
            reference_number: '',
            lek_bai_sung: '',
            amount_money: '',
            quotation: '',
            description: '',
            note: '',
            date: '',
            due_date: '',
            menu: '',
            toto: '0',
            formattedDate: null,
            formatteddue_date: '',
            buang_data_list: [],
            description: "", // Bind to description field
            note: "", // Bind to note field
            customer_data_list: [],
            // other data properties
            amount_money: '', // Initialize with your amount money value
            selectedCurrency: '',
            REDetail: '',
            currency: "LAK", // Default currency
            currencyOptions: ["LAK", "USD", "THB"], // List of currency options
        };
    },
    computed: {
        formattedAmountMoney() {
            // Format amount_money with commas for thousands separator
            return this.amount_money
                ? this.amount_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
        },
        displayAmountMoney: {
            get() {
                return this.formattedAmountMoney ? `${this.formattedAmountMoney} ${this.selectedCurrency}` : '';
            },
            set(value) {
                // Remove currency and commas to set the raw value back
                this.amount_money = value
                    .replace(/[^0-9]/g, '') // Remove non-numeric characters
                    .replace(/,/g, ''); // Remove commas
            }
        }
    },
    mounted() {
        if (this.$route.query.key_id) {
            this.onGetData(this.$route.query.key_id); // Use the correct method name
        }
        this.onGetCustomerList(); // Fetch customer list on component mount
        this.onGetbuang(); // Fetch customer list on component mount

    },

    methods: {
        onGetCustomerDetails(id) {
            const data = this.customer_data_list.find(el => el.id === id);
            if (data) {
                this.customer_name = data.customerName;
                this.customer_mobile = data.mobile;
                this.customer_id = id;
            }
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
        onGetbuangDetails(key_id) {
            let data = this.buang_data_list.filter((el) => el.key_id === key_id);
            this.buang_send_buang = data[0]?.key_id;
            this.bouang = data[0]?.key_id; // Assign province to company
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
        async onGetData(key_id) { // Ensure this method is defined
            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listDeptMustReceiveddetail.service', {
                    key_id: key_id
                });
                if (data?.status === "00") {
                    this.REDetail = data?.data[0];
                    // Initialize the fields with the data from the API
                    // this.customerName = this.REDetail.customerName || "";
                    // this.typeName = this.REDetail.typeName || "";
                    // this.topic = this.REDetail.topic || "";
                    // this.type_id = this.REDetail.type_id || "";
                    // this.currency = this.REDetail.currency || "";
                    // this.date = this.REDetail.date || "";
                    // this.due_date = this.REDetail.due_date || "";
                    // this.date_create = this.REDetail.date_create || "";
                    // this.status_wait_approve = this.REDetail.status_wait_approve || "";
                    // this.reference_number = this.REDetail.reference_number || "";
                    // this.lek_bai_sung = this.REDetail.lek_bai_sung || "";
                    this.amount_money = this.REDetail.amount_money || "";
                    // this.quotation = this.REDetail.quotation || "";
                    this.document_1 = this.REDetail.document_1 || "";
                    this.document_2 = this.REDetail.document_2 || "";
                    // this.description = this.REDetail.description || "";
                    // this.note = this.REDetail.note || "";
                    // this.userId = this.REDetail.userId || "";
                } else {
                    swal.fire({
                        icon: 'error',
                        text: 'Failed to fetch car details',
                    });
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message
                });
                console.log(error);
            }
        },

        async onstore_dept_Must_received() {
            const formdata = new FormData();

            formdata.append('customer_id', this.customer_id);
            formdata.append('topic', this.topic);
            formdata.append('type_id', this.bouang);
            formdata.append('currency', this.selectedCurrency);
            formdata.append('datee', this.formattedDate ? this.formattedDate : '0000-00-00');
            formdata.append('due_date', this.formatteddue_date ? this.formatteddue_date : '0000-00-00');
            formdata.append('reference_number', this.reference_number);
            formdata.append('lek_bai_sung', this.lek_bai_sung);
            formdata.append('amount_money', this.amount_money);
            formdata.append('quotation', this.quotation); // Ensure no duplicate key
            formdata.append('document_1', this.document_1);
            formdata.append('document_2', this.document_2);
            formdata.append('description', this.comment); // Changed from 'quotation' to 'description'
            formdata.append('note', this.note);
            formdata.append('toKen', localStorage.getItem("toKen"));
            formdata.append('key_id', this.REDetail.key_id)


            this.loading_processing = true;
            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/DeptMustReceivedUpdate.service', formdata);
                console.log("Response:", data);
                // Optionally clear form data here
                this.onClearData();
            } catch (error) {
                console.error("Error:", error);
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'Unknown error occurred',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },
        getCurrencyButtonStyle(currencyOption) {
            return {
                backgroundColor: this.currency === currencyOption ? 'red' : 'transparent',
                color: this.currency === currencyOption ? 'white' : 'black'
            };
        },
        setCurrency(currencyOption) {
            this.currency = currencyOption;
        }

    },
};
</script>


<style scoped>
.card-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
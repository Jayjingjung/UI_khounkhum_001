<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <v-card class="card-shadow mb-6" rounded="lg">
            <v-card-title style="background-color:#E57373">
                <div style="display:flex;justify-content:space-between;width:100%">
                    <span class="white--text">ລາຍລະອຽດຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ</span>
                    <!-- <v-btn color="#fff" @click="showModalAddexchang = true" elevation="0" rounded>
                        <v-icon color="#568fb3">mdi-plus</v-icon>
                        <span style="color: #568fb3;">ເພີ່ມຂໍ້ມູນ</span>
                    </v-btn> -->
                </div>
                <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text>
                <div style="width:100%;display:flex;justify-content:start" class="pt-4">
                    <div class="d-flex align-center">
                        <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                            :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="start_date" no-title scrollable
                                @input="$refs.start_menu.save(start_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="d-flex align-center pl-2">
                        <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                            :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="ml-2 pt-1">
                        <v-btn color="#90A4AE" class="white--text" elevation="0"
                            @click="onSearchallowance"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="mt-2 ml-4" style="width:300px">
                        <v-text-field label="ຄົ້ນຫາ..." rounded background-color="#f5f5f5" append-icon="mdi-magnify"
                            v-model="search"></v-text-field>
                    </div>
                </div>
                <div class="py-2">
                    <span>ທັງໝົດ:
                        <span class="green--text" style="font-size: 12pt; font-weight: bold">
                            {{ allowance_data_list.length.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                        </span>
                    </span>
                </div>

                <v-data-table :headers="allowance_table_headers" :items="allowance_data_list" :search="search">
                    <template v-slot:item="row">
                        <tr :style="{ 'background-color': row?.item?.totalDay >= '7' ? '#FFCDD2' : '#fff' }"
                            @mouseover="active = row?.index" @mouseleave="active = ''">
                            <td>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    {{ row.item.h_VICIVLE_BRANCHTYPE }}: {{ row.item.h_VICIVLE_NUMBER }}
                                </div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    {{ row.item.f_CAR_TYPE }}: {{ row.item.f_BRANCH }}
                                </div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    ວັນທີປະຕິບັດງານ: {{ row.item.out_DATE }} - {{ row.item.in_DATE }}
                                </div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    ສະຖານທີຮັບ - ສົ່ງ: {{ row.item.province }} - {{ row.item.detail }}
                                </div>
                            </td>
                            <td>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    ຊື່: {{ row.item.staft_NAME }} {{ row.item.staft_SURNAME }}
                                </div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    ຄ່າເບ້ຍລ້ຽງທັງໝົດ: {{ row.item.staff_BIALIENG_FRIST }} {{ row.item.staff_Cur }}
                                </div>
                                <div class="py-1 green--text" style="display:flex;flex-direction:column">
                                    ຄ່າເບ້ຍລ້ຽງທີ່ຊໍາລະແລ້ວ: {{ row.item.staff_BIALIENG }} {{ row.item.staff_Cur }}
                                </div>
                                <div class="py-1 red--text" style="display:flex;flex-direction:column">
                                    ຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ: {{ row.item.staff_BIALINEG_KANGJAIY }} {{ row.item.staff_Cur }}
                                </div>

                            </td>

                            <td>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    ຊື່: {{ row.item.staft_NAME02 }} {{ row.item.staft_SURNAME02 }}
                                </div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    ຄ່າເບ້ຍລ້ຽງທັງໝົດ: {{ row.item.staff02_payAll }} {{ row.item.staff_Cur }}
                                </div>
                                <div class="py-1 green--text" style="display:flex;flex-direction:column">
                                    ຄ່າເບ້ຍລ້ຽງທີ່ຊໍາລະແລ້ວ: {{ row.item.staff02_beforepay }} {{ row.item.staff_Cur }}
                                </div>
                                <div class="py-1 red--text" style="display:flex;flex-direction:column">
                                    ຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ: {{ row.item.staff02_notpay }} {{ row.item.staff_Cur }}
                                </div>
                            </td>
                            <td>
                                <v-btn color="#7CB342" small @click="
                                    onGetDataForUpdatestaft1(
                                        row.item.h_VICIVLE_NUMBER,
                                        row.item.h_VICIVLE_BRANCHTYPE,
                                        row.item.f_BRANCH,
                                        row.item.f_CAR_TYPE,
                                        row.item.currency,
                                        row.item.staff_Cur,
                                        row.item.staffPaystatus01,
                                        row.item.staffPaystatus02,
                                        row.item.lahudPoyLod,
                                        row.item.staft_NAME02,
                                        row.item.staft_SURNAME02,
                                        row.item.staft_ID02,
                                        row.item.staff02_payAll,
                                        row.item.staff02_beforepay,
                                        row.item.staff02_notpay,
                                        row.item.staff_BIALIENG,
                                        row.item.staff_BIALIENG_FRIST,
                                        row.item.staff_BIALINEG_KANGJAIY,
                                        row.item.out_DATE,
                                        row.item.in_DATE,
                                        row.item.staft_ID,
                                        row.item.staft_NAME,
                                        row.item.staft_SURNAME,
                                        row.item.province,
                                        row.item.detail,
                                    )
                                    ">
                                    <span class="white--text">ຊໍາລະຄ່າເບ້ຍລ້ຽງ</span>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <!-- Modal Update staff -->
        <v-dialog v-model="showModalupdatestaft1" persistent width="850">
            <v-card>
                <v-card-title style="display:flex;background-color:#E57373;color:white">

                    <v-spacer></v-spacer>
                    ຊໍາລະຄ່າເບ້ຍລ້ຽງ
                    <v-spacer></v-spacer>
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="onCloseDialogAdd">
                        <v-icon color="#E57373">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-container>
                    <v-card-text>
                        <div style="width:100%;display:flex" class="mt-2 ">
                            <v-spacer></v-spacer>
                            <div class="d-flex align-center pl-2">
                                <div class="d-flex align-center pl-2" style="width: 258px;">
                                    <v-menu ref="now_menu" v-model="now_menu" :close-on-content-click="false"
                                        :return-value.sync="now_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="now_date" required label="ວັນທີຈ່າຍ"
                                                append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="now_date" no-title scrollable
                                            @input="$refs.now_menu.save(now_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>
                            </div>
                        </div>


                        <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                            <v-row style="font-size: 18px;">
                                <v-col cols="6" style="width:100%">
                                    <span><b>{{ h_VICIVLE_BRANCHTYPE }}: {{ h_VICIVLE_NUMBER }}</b></span>
                                </v-col>
                                <v-col cols="6" class="px-2" style="width:100%">
                                    <span><b> {{ f_CAR_TYPE }}: {{ f_BRANCH }}</b></span>
                                </v-col>
                            </v-row>
                        </div>
                        <div class="py-1" style="display:flex;flex-direction:row;justify-content:space-between">
                            <v-row style="font-size: 16px;">
                                <v-col cols="6" style="width:100%">
                                    <span>ວັນທີປະຕິບັດງານ: {{ out_DATE }} - {{ in_DATE }}</span>
                                </v-col>
                                <v-col cols="6" class="px-2" style="width:100%">
                                    <span>ສະຖານທີ່ຮັບ - ສົ່ງ: {{ province }} - {{ detail }}</span>
                                </v-col>
                            </v-row>
                        </div>


                        <div class="py-2"><v-divider></v-divider></div>
                        <div class="row" style="font-size: 14px;">
                            <div class="col-6" v-if="staff_BIALINEG_KANGJAIY != '0'">
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    <span><b>ຊື່ຄົນຂັບລົດ 1: </b> {{ staft_NAME }} {{ staft_SURNAME }}</span>
                                </div>
                                <div style="display:flex;flex-direction:column">
                                    <span><b>ຄ່າເບ້ຍລ້ຽງທັງໝົດ: </b> {{ staff_BIALIENG_FRIST }} {{ staff_Cur }}</span>
                                </div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    <span class="green--text"><b>ຄ່າເບ້ຍລ້ຽງທີ່ຊໍາລະແລ້ວ: </b> {{ staff_BIALIENG }} {{
                                        staff_Cur
                                    }}</span>
                                </div>
                                <div style="display:flex;flex-direction:column">
                                    <span class="red--text"><b>ຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ: </b> {{ staff_BIALINEG_KANGJAIY }}
                                        {{
                                            staff_Cur }}</span>
                                </div>
                                <div style="height: 10px;"></div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    <v-text-field label="ປ້ອນຈໍານວນເງິນເບ້ຍລ້ຽງ" outlined dense
                                        v-model="amount_staff1"></v-text-field>
                                </div>

                            </div>

                            <div class="col-6" v-if="staff02_notpay != '0'">
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    <span><b>ຊື່ຄົນຂັບລົດ 2: </b> {{ staft_NAME02 }} {{ staft_SURNAME02 }}</span>
                                </div>
                                <div style="display:flex;flex-direction:column">
                                    <span><b>ຄ່າເບ້ຍລ້ຽງທັງໝົດ: </b> {{ staff02_payAll }} {{ staff_Cur }}</span>
                                </div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    <span class="green--text"><b>ຄ່າເບ້ຍລ້ຽງທີ່ຊໍາລະແລ້ວ: </b> {{ staff02_beforepay }} {{
                                        staff_Cur
                                    }}</span>
                                </div>
                                <div style="display:flex;flex-direction:column">
                                    <span class="red--text"><b>ຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ: </b> {{ staff02_notpay }}
                                        {{
                                            staff_Cur }}</span>
                                </div>
                                <div style="height: 10px;"></div>
                                <div class="py-1" style="display:flex;flex-direction:column">
                                    <v-text-field label="ປ້ອນຈໍານວນເງິນເບ້ຍລ້ຽງ" outlined dense
                                        v-model="amount_staft2"></v-text-field>
                                </div>

                            </div>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- <v-btn color="red" @click="showModalUpdateuser = false">
                            <v-icon color="white">mdi-close</v-icon>
                            <span class="white--text">ຍົກເລິກ</span>
                        </v-btn> -->
                        <v-btn color="#7CB342" @click="onCheckMoneyPayment">
                            <v-icon color="white">mdi-check</v-icon>
                            <span class="white--text">ຊໍາລະ</span>
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-card>
        </v-dialog>

        <!-- Modal Update staff -->
        <!-- <v-dialog v-model="showModalupdatestaft2" persistent width="400">
            <v-card>
                <v-container>
                    <v-row>
                        <v-col class="pl-3">
                            <h3>ຊໍາລະຄ່າເບ້ຍລ້ຽງ</h3>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon class="mt-2 mr-2"
                            @click="showModalupdatestaft2 = false"><v-icon>mdi-close</v-icon></v-btn>
                    </v-row>
                    <Height />
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-menu ref="now_menu1" v-model="now_menu1" :close-on-content-click="false"
                            :return-value.sync="now_date1" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="now_date1" required label="ວັນທີຈ່າຍ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="now_date1" no-title scrollable @input="$refs.now_menu1.save(now_date1)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>

                        <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                            <v-row>
                                <v-col cols="6" style="width:100%">
                                    <span>{{ h_VICIVLE_BRANCHTYPE_staft2 }}: {{ h_VICIVLE_NUMBER_staft2 }}</span>
                                </v-col>
                                <v-col cols="6" class="px-2" style="width:100%">
                                    <span>{{ f_CAR_TYPE_staft2 }}: {{ f_BRANCH_staft2 }}</span>
                                </v-col>
                            </v-row>
                        </div>
                        <div class="py-1" style="display:flex;flex-direction:column">
                            <span>ວັນທີປະຕິບັດງານ: {{ out_DATE_staft2 }} - {{ in_DATE_staft2 }}</span>

                        </div>
                        <div class="" style="display:flex;flex-direction:column">
                            <span>ສະຖານທີ່ຮັບ - ສົ່ງ: {{ province_staft2 }} - {{ detail_staft2 }}</span>

                        </div>
                        <div class="py-1"><v-divider></v-divider></div>
                        <div class="py-1" style="display:flex;flex-direction:column">
                            <span><b>ຊື່ຄົນຂັບລົດ 2: </b> {{ staft_NAME02_staft2 }} {{ staft_SURNAME02_staft2 }} </span>
                        </div>
                        <div class="py-1" style="display:flex;flex-direction:column">
                            <span><b>ຄ່າເບ້ຍລ້ຽງທັງໝົດ: </b> {{ staff02_payAll_staft2 }} {{ staff_Cur_staft2 }}</span>
                        </div>
                        <div class="py-1" style="display:flex;flex-direction:column">
                            <span class="green--text"><b>ຄ່າເບ້ຍລ້ຽງທີ່ຊໍາລະແລ້ວ: </b> {{ staff02_beforepay_staft2 }} {{ staff_Cur_staft2
                            }}</span>
                        </div>
                        <div class="py-1" style="display:flex;flex-direction:column">
                            <span class="red--text"><b>ຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ: </b> {{ staff02_notpay_staft2 }} {{
                                staff_Cur_staft2 }}</span>
                        </div>

                        <div class="py-2" style="display:flex;flex-direction:column">
                            <v-text-field label="ປ້ອນຈໍານວນເງິນເບ້ຍລ້ຽງ" outlined dense v-model="amount_staff2"></v-text-field>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                     <v-btn color="red" @click="showModalUpdateuser = false">
                            <v-icon color="white">mdi-close</v-icon>
                            <span class="white--text">ຍົກເລິກ</span>
                        </v-btn> -->
        <!-- <v-btn color="#0B9BDF" @click="onCheckMoneyPayment2">
                            <v-icon color="white">mdi-check</v-icon>
                            <span class="white--text">ຊໍາລະ</span>
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-card>
        </v-dialog> -->
    </div>
</template>

<script>
import swal from 'sweetalert2'
import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
            showModalAddexchang: false,
            loading_processing: false,
            showModalupdatestaft1: false,
            showModalupdatestaft2: false,
            allowance_data_list: [],
            allowance_table_headers: [
                { text: 'ຂໍ້ມູນລົດ', value: 'car' },
                { text: 'ພະນັກງານຂັບຜູ້ທີ 1', value: 'saff1' },
                // { text: '', value: '' },

                { text: 'ພະນັກງານຂັບຜູ້ທີ 2', value: 'staff2' },

                { text: '', value: '' },
            ],
            //insert 
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            now_menu: false,
            now_date: null,
            // now_menu1: false,
            // now_date1: null,

            amount_staff1: '0',
            amount_staft2: '0',

            staffPaystatus01: '',
            staffPaystatus02: '',
            staft_ID02: '',
            staft_NAME02: '',
            staft_SURNAME02: '',
            staff_BIALIENG: '',
            staff_BIALIENG_FRIST: '',
            staff_BIALINEG_KANGJAIY: '',
            staff02_payAll: '',
            staff02_beforepay: '',
            staff02_notpay: '',
            staft_ID: '',
            staft_NAME: '',
            staft_SURNAME: '',
            totalDebt1: '',
            price_total1: '',
            search: '',


            //update
            lahudPoyLod: '',

            //search
            Exchang_search: '',
            //delet
            key_for_delete: '',
            loading_processing: false,
            // validations
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],

        }
    },
    watch: {
        amount_staff1: function (newValue) {
            const result = newValue?.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            this.amount_staff1 = result;
        },
        amount_staft2: function (newValue) {
            const result = newValue?.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            this.amount_staft2 = result;
        },
    },
    mounted() {
        this.onSearchallowance()
        this.onGetInvoiceBillNo()
    },

    methods: {
        onSearchallowance() {
            try {
                this.loading_processing = true;
                let data = {
                    startDate: this.start_date,
                    endDate: this.end_date
                }
                this.$axios.$post('/listPaymentStaff.service', data).then((data) => {
                    console.log("allReport:", data)
                    if (data?.data) {

                        this.allowance_data_list = data?.data
                        this.loading_processing = false
                        // this.onCheckAlert()
                    } else {
                        this.allowance_data_list = []
                        this.loading_processing = false
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        },
        onGetInvoiceBillNo() {
            this.loading_processing = true
            try {
                this.$axios.$post('/gernerateID.service').then((data) => {
                    console.log("bill", data)
                    // this.inVoiceBillNo = data?.data[0]?.invoice_ID;
                    // this.inVoiceDate = data?.data[0]?.printDate;
                    this.now_date = data?.data[0]?.printDate;
                    this.loading_processing = false
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },

        onCloseDialogAdd() {
            this.onClearData()
            this.showModalupdatestaft1 = false
        },

        onClearData() {
            this.amount_staff1 = '0'
            this.amount_staft2 = '0'
        },

        // onCloseDialogupdate() {
        //     this.showModalupdateexchang = false
        // },




        // async onInsertexchangInfo() {
        //     try {
        //         let data = {
        //             exchangeDate: this.end_date,
        //             txn_Usd: this.ins_txn_Usd,
        //             txn_Thb: this.ins_txn_Thb,
        //             txn_Cny: this.ins_txn_Cny,
        //             userId: localStorage.getItem('USER_ID'),
        //         }
        //         console.log('send:', data)
        //         if (
        //             this.ins_txn_Usd == '' ||
        //             this.ins_txn_Thb == '' ||
        //             this.ins_txn_Cny == ''
        //         ) {
        //             if (this.ins_txn_Usd == '') {
        //                 this.usd_mess = 'ກະລຸນາປ້ອນສະກຸນເງິນໂດລ້າ'
        //             } else {
        //                 this.usd_mess = ''
        //             }
        //             if (this.ins_txn_Thb == '') {
        //                 this.thb_mess = 'ກະລຸນາປ້ອນສະກຸນເງິນບາດ'
        //             } else {
        //                 this.thb_mess = ''
        //             }
        //             if (this.ins_txn_Cny == '') {
        //                 this.cny_mess = 'ກະລຸນາປ້ອນສະກຸນເງິນຢວນ'
        //             } else {
        //                 this.cny_mess = ''
        //             }
        //             // if (this.ins_pro_url == null) {
        //             //   this.pro_url_mess = 'ກະລຸນາເລືອກຮູບ'
        //             // } else {
        //             //   this.pro_url_mess = ''
        //             // }
        //         } else {
        //             this.loading_processing = true
        //             await this.$axios.$post('/storeExchange.service', data).then((data) => {
        //                 if (data?.status == '00') {
        //                     this.loading_processing = false
        //                     this.showModalAddexchang = false
        //                     console.log('exchang_list:', data)
        //                     swal.fire({
        //                         title: 'ສຳເລັດ',
        //                         icon: 'success',
        //                         allowOutsideClick: false,
        //                         showConfirmButton: false,
        //                         timer: 1000,
        //                     })
        //                     this.onGetexchangList()
        //                     this.onClearData()
        //                 } else {
        //                     this.showModalAddexchang = false
        //                     this.loading_processing = false
        //                     swal.fire({
        //                         title: 'ແຈ້ງເຕືອນ',
        //                         text: data?.message,
        //                         icon: 'info',
        //                         allowOutsideClick: false,
        //                         confirmButtonColor: '#3085d6',
        //                         confirmButtonText: 'OK',
        //                     })
        //                 }
        //             })
        //         }
        //     } catch (error) {
        //         this.showModalAddexchang = false
        //         this.loading_processing = false
        //         swal.fire({
        //             title: 'ແຈ້ງເຕືອນ',
        //             text: error,
        //             icon: 'error',
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             confirmButtonText: 'OK',
        //         })
        //     }
        // },

        onGetDataForUpdatestaft1(
            h_VICIVLE_NUMBER,
            h_VICIVLE_BRANCHTYPE,
            f_BRANCH,
            f_CAR_TYPE,
            currency,
            staff_Cur,
            staffPaystatus01,
            staffPaystatus02,
            lahudPoyLod,
            staft_NAME02,
            staft_SURNAME02,
            staft_ID02,
            staff02_payAll,
            staff02_beforepay,
            staff02_notpay,
            staff_BIALIENG,
            staff_BIALIENG_FRIST,
            staff_BIALINEG_KANGJAIY,
            out_DATE,
            in_DATE,
            staft_ID,
            staft_NAME,
            staft_SURNAME,
            province,
            detail
        ) {
            this.h_VICIVLE_NUMBER = h_VICIVLE_NUMBER
            this.h_VICIVLE_BRANCHTYPE = h_VICIVLE_BRANCHTYPE
            this.f_BRANCH = f_BRANCH
            this.f_CAR_TYPE = f_CAR_TYPE
            this.currency = currency
            this.staff_Cur = staff_Cur
            this.staffPaystatus01 = staffPaystatus01
            this.staffPaystatus02 = staffPaystatus02
            this.lahudPoyLod = lahudPoyLod
            this.staff02_payAll = staff02_payAll
            this.staff02_beforepay = staff02_beforepay
            this.staff02_notpay = staff02_notpay
            this.staft_NAME02 = staft_NAME02
            this.staft_SURNAME02 = staft_SURNAME02
            this.staft_ID02 = staft_ID02
            this.staff_BIALIENG = staff_BIALIENG
            this.staff_BIALIENG_FRIST = staff_BIALIENG_FRIST
            this.staff_BIALINEG_KANGJAIY = staff_BIALINEG_KANGJAIY
            this.out_DATE = out_DATE
            this.in_DATE = in_DATE
            this.staft_ID = staft_ID
            this.staft_NAME = staft_NAME
            this.staft_SURNAME = staft_SURNAME
            this.province = province
            this.detail = detail
            this.showModalupdatestaft1 = true
        },

        onGetDataForUpdatestaft2(
            h_VICIVLE_NUMBER,
            h_VICIVLE_BRANCHTYPE,
            f_BRANCH,
            f_CAR_TYPE,
            currency,
            staff_Cur,
            staffPaystatus01,
            staffPaystatus02,
            lahudPoyLod,
            staft_NAME02,
            staft_SURNAME02,
            staft_ID02,
            staff02_payAll,
            staff02_beforepay,
            staff02_notpay,
            staff_BIALIENG,
            staff_BIALIENG_FRIST,
            staff_BIALINEG_KANGJAIY,
            out_DATE,
            in_DATE,
            staft_ID,
            staft_NAME,
            staft_SURNAME,
            province,
            detail
        ) {
            this.h_VICIVLE_NUMBER_staft2 = h_VICIVLE_NUMBER
            this.h_VICIVLE_BRANCHTYPE_staft2 = h_VICIVLE_BRANCHTYPE
            this.f_BRANCH_staft2 = f_BRANCH
            this.f_CAR_TYPE_staft2 = f_CAR_TYPE
            this.currency_staft2 = currency
            this.staff_Cur_staft2 = staff_Cur
            this.staffPaystatus01_staft2 = staffPaystatus01
            this.staffPaystatus02_staft2 = staffPaystatus02
            this.lahudPoyLod_staft2 = lahudPoyLod
            this.staff02_payAll_staft2 = staff02_payAll
            this.staff02_beforepay_staft2 = staff02_beforepay
            this.staff02_notpay_staft2 = staff02_notpay
            this.staft_NAME02_staft2 = staft_NAME02
            this.staft_SURNAME02_staft2 = staft_SURNAME02
            this.staft_ID02_staft2 = staft_ID02
            this.staff_BIALIENG_staft2 = staff_BIALIENG
            this.staff_BIALIENG_FRIST_staft2 = staff_BIALIENG_FRIST
            this.staff_BIALINEG_KANGJAIY_staft2 = staff_BIALINEG_KANGJAIY
            this.out_DATE_staft2 = out_DATE
            this.in_DATE_staft2 = in_DATE
            this.staft_ID_staft2 = staft_ID
            this.staft_NAME_staft2 = staft_NAME
            this.staft_SURNAME_staft2 = staft_SURNAME
            this.province_staft2 = province
            this.detail_staft2 = detail
            this.showModalupdatestaft2 = true
        },

        onCheckMoneyPayment() {
            // this.print()
            // return
            const debt = parseFloat(this.staff_BIALINEG_KANGJAIY?.split(',').join('')) - parseFloat(this.amount_staff1?.split(',').join(''))
            this.totalDebt1 = debt?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            const total = parseFloat(this.staff_BIALIENG?.split(',').join('')) + parseFloat(this.amount_staff1?.split(',').join(''))
            this.price_total1 = total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            const debt2 = parseFloat(this.staff02_notpay?.split(',').join('')) - parseFloat(this.amount_staft2?.split(',').join(''))
            this.totalDebt2 = debt2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            const total2 = parseFloat(this.staff02_payAll?.split(',').join('')) + parseFloat(this.amount_staft2?.split(',').join(''))
            this.price_total2 = total2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            if (this.cash === true) {
                if (!this.$refs.form.validate()) {
                    return null;
                }
            }
            if (this.transfer === true) {
                if (!this.$refs.form1.validate()) {
                    return null;
                }
            }


            if (parseFloat(this.amount_staff1?.split(',').join('')) > parseFloat(this.staff_BIALINEG_KANGJAIY?.split(',').join(''))) {
                swal.fire({
                    icon: 'warning',
                    text: 'ຈຳນວນເງິນທີ່ຊຳລະຫຼາຍກວ່າເງິນຕົວຈີງ'
                })
                return
            }


            if (parseFloat(this.amount_staft2?.split(',').join('')) > parseFloat(this.staff02_notpay?.split(',').join(''))) {
                swal.fire({
                    icon: 'warning',
                    text: 'ຈຳນວນເງິນທີ່ຊຳລະຫຼາຍກວ່າເງິນຕົວຈີງ'
                })
                return
            }

            swal.fire({
                icon: 'question',
                text: `ທ່ານຕ້ອງການຄ່າເບ້ຍລ້ຽງບໍ ?`,
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ຕົກລົງ',
                cancelButtonText: 'ຍົກເລີກ'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.onUpdatestaff1()
                }
            })

            // if (parseFloat(this.staff_BIALINEG_KANGJAIY?.split(',').join('')) > parseFloat(this.amount_staff1?.split(',').join(''))) {
            //     swal.fire({
            //         icon: 'question',
            //         text: `ເງິນທີ່ຊຳລະໜ້ອຍກວ່າເງິນຕົວຈີງ. ທ່ານຕ້ອງການຕິດໜີ້ບໍ ? ເງິນທີ່ຕິດໜີ້: ${debt?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            //         // text: `ເງິນທີ່ຊຳລະໜ້ອຍກວ່າເງິນຕົວຈີງ. ທ່ານຕ້ອງການຕິດໜີ້ບໍ ? ເງິນທີ່ຕິດໜີ້: ${total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            //         showCancelButton: true,
            //         allowOutsideClick: false,
            //         confirmButtonColor: '#3085d6',
            //         cancelButtonColor: '#d33',
            //         confirmButtonText: 'ຕົກລົງ',
            //         cancelButtonText: 'ຍົກເລີກ'
            //     }).then((result) => {
            //         if (result.isConfirmed) {
            //             this.onUpdatestaff1()
            //         }
            //     })
            // } else {
            //     swal.fire({
            //         icon: 'question',
            //         text: `ທ່ານຕ້ອງການຊຳລະແທ້ບໍ ?`,
            //         showCancelButton: true,
            //         allowOutsideClick: false,
            //         confirmButtonColor: '#3085d6',
            //         cancelButtonColor: '#d33',
            //         confirmButtonText: 'ຕົກລົງ',
            //         cancelButtonText: 'ຍົກເລີກ'
            //     }).then((result) => {
            //         if (result.isConfirmed) {
            //             this.onUpdatestaff1()
            //         }
            //     })
            // }



            // if (parseFloat(this.staff02_notpay?.split(',').join('')) > parseFloat(this.amount_staft2?.split(',').join(''))) {
            //     swal.fire({
            //         icon: 'question',
            //         text: `ເງິນທີ່ຊຳລະໜ້ອຍກວ່າເງິນຕົວຈີງ. ທ່ານຕ້ອງການຕິດໜີ້ບໍ ? ເງິນທີ່ຕິດໜີ້: ${debt?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            //         // text: `ເງິນທີ່ຊຳລະໜ້ອຍກວ່າເງິນຕົວຈີງ. ທ່ານຕ້ອງການຕິດໜີ້ບໍ ? ເງິນທີ່ຕິດໜີ້: ${total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            //         showCancelButton: true,
            //         allowOutsideClick: false,
            //         confirmButtonColor: '#3085d6',
            //         cancelButtonColor: '#d33',
            //         confirmButtonText: 'ຕົກລົງ',
            //         cancelButtonText: 'ຍົກເລີກ'
            //     }).then((result) => {
            //         if (result.isConfirmed) {
            //             this.onUpdatestaff1()
            //         }
            //     })
            // } else {

            // }


        },

        // onCheckMoneyPayment2() {
        //     // this.print()
        //     // return
        //     const debt = parseFloat(this.staff02_notpay_staft2?.split(',').join('')) - parseFloat(this.amount_staff2?.split(',').join(''))
        //     this.totalDebt2 = debt
        //     const total = parseFloat(this.staff02_payAll_staft2?.split(',').join('')) + parseFloat(this.amount_staff2?.split(',').join(''))
        //     this.price_total2 = total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        //     if (this.cash === true) {
        //         if (!this.$refs.form.validate()) {
        //             return null;
        //         }
        //     }
        //     if (this.transfer === true) {
        //         if (!this.$refs.form1.validate()) {
        //             return null;
        //         }
        //     }
        //     if (parseFloat(this.amount_staff2?.split(',').join('')) > parseFloat(this.staff02_notpay_staft2?.split(',').join(''))) {
        //         swal.fire({
        //             icon: 'warning',
        //             text: 'ຈຳນວນເງິນທີ່ຊຳລະຫຼາຍກວ່າເງິນຕົວຈີງ'
        //         })
        //         return
        //     }
        //     if (parseFloat(this.staff02_notpay_staft2?.split(',').join('')) > parseFloat(this.amount_staff2?.split(',').join(''))) {
        //         swal.fire({
        //             icon: 'question',
        //             text: `ເງິນທີ່ຊຳລະໜ້ອຍກວ່າເງິນຕົວຈີງ. ທ່ານຕ້ອງການຕິດໜີ້ບໍ ? ເງິນທີ່ຕິດໜີ້: ${debt?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        //             showCancelButton: true,
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             cancelButtonColor: '#d33',
        //             confirmButtonText: 'ຕົກລົງ',
        //             cancelButtonText: 'ຍົກເລີກ'
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 this.onUpdatestaff2()
        //             }
        //         })
        //     } else {
        //         swal.fire({
        //             icon: 'question',
        //             text: `ທ່ານຕ້ອງການຊຳລະແທ້ບໍ ?`,
        //             showCancelButton: true,
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             cancelButtonColor: '#d33',
        //             confirmButtonText: 'ຕົກລົງ',
        //             cancelButtonText: 'ຍົກເລີກ'
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 this.onUpdatestaff2()
        //             }
        //         })
        //     }
        // },

        async onUpdatestaff1() {
            try {
                let data = {
                    key_Id: this.lahudPoyLod,
                    payDate: this.now_date,
                    staffID01: this.staft_ID,
                    staffID02: this.staft_ID02,
                    payAmount_NotPay01: this.totalDebt1,
                    payAmount_NotPay02: this.totalDebt2,
                    payAmount_Pay01: this.price_total1,
                    payAmount_Pay02: this.price_total2,
                    payAmount_TotalPay01: this.staff_BIALIENG_FRIST,
                    payAmount_TotalPay02: this.staff02_payAll,
                    payAmount_status01: this.totalDebt1 == 0 ? 'done' : 'not-pay',
                    payAmount_status02: this.totalDebt2 == 0 ? 'done' : 'not-pay',
                }
                this.loading_processing = true
                await this.$axios.$post('/paymentStaff.service', data).then((data) => {
                    console.log('updateSatatu:', data)
                    if (data?.status == '00') {
                        this.loading_processing = false
                        this.onSearchallowance()
                        this.showModalupdatestaft1 = false
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        })
                        this.onSearchallowance()
                        this.onClearData()
                    } else {
                        this.loading_processing = false
                        this.showModalupdatestaft1 = false
                        swal.fire({
                            title: 'ແຈ້ງເຕືອນ',
                            text: data?.message,
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK',
                        })
                    }
                })
            } catch (error) {
                this.loading_processing = false
                this.showModalupdatestaft1 = false
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

        // async onUpdatestaff2() {
        //     try {
        //         let data = {
        //             payDate: this.now_date1,
        //             staffID01: this.staft_ID_staft2,
        //             staffID02: this.staft_ID02_staft2,
        //             payAmount_NotPay01: this.staff_BIALINEG_KANGJAIY_staft2,
        //             payAmount_NotPay02: this.totalDebt2,
        //             payAmount_Pay01: this.staff_BIALIENG_staft2,
        //             payAmount_Pay02: this.price_total2,
        //             payAmount_TotalPay01: this.staff_BIALIENG_FRIST_staft2,
        //             payAmount_TotalPay02: this.staff02_payAll_staft2,
        //             payAmount_status01: this.staff_BIALINEG_KANGJAIY_staft2 === 0 ? 'done' : 'not-pay',
        //             payAmount_status02: this.totalDebt2_staft2 === 0 ? 'done' : 'not-pay',
        //         }
        //         this.loading_processing = true
        //         await this.$axios.$post('/updateExchange.service', data).then((data) => {
        //             console.log('updateSatatu:', data)
        //             if (data?.status == '00') {
        //                 this.loading_processing = false
        //                 this.onGetexchangList()
        //                 this.showModalupdatestaft1 = false
        //                 this.up_txn_Usd = ''
        //                 swal.fire({
        //                     title: 'ສຳເລັດ',
        //                     icon: 'success',
        //                     allowOutsideClick: false,
        //                 })
        //             } else {
        //                 this.loading_processing = false
        //                 this.showModalupdatestaft1 = false
        //                 swal.fire({
        //                     title: 'ແຈ້ງເຕືອນ',
        //                     text: data?.message,
        //                     icon: 'error',
        //                     allowOutsideClick: false,
        //                     confirmButtonColor: '#3085d6',
        //                     confirmButtonText: 'OK',
        //                 })
        //             }
        //         })
        //     } catch (error) {
        //         this.loading_processing = false
        //         this.showModalupdatestaft1 = false
        //         swal.fire({
        //             title: 'ແຈ້ງເຕືອນ',
        //             text: error,
        //             icon: 'error',
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             confirmButtonText: 'OK',
        //         })
        //     }
        // },

        // askBeforeDeleteexchangInfo(key_Id) {
        //     this.key_for_delete = key_Id
        //     console.log(key_Id)
        //     swal
        //         .fire({
        //             text: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ',
        //             icon: 'question',
        //             showCancelButton: true,
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             cancelButtonColor: '#d33',
        //             confirmButtonText: 'OK',
        //             cancelButtonText: 'No'
        //         })
        //         .then((result) => {
        //             if (result.isConfirmed) {
        //                 this.onDeleteexchang()
        //             }
        //         })
        // },
        // async onDeleteexchang() {
        //     try {
        //         let data = {
        //             key_Id: this.key_for_delete,
        //         }
        //         this.loading_processing = true
        //         await this.$axios.$post('/delExchange.service', data).then((data) => {
        //             if (data?.status == '00') {
        //                 this.loading_processing = false
        //                 this.onGetexchangList()
        //                 swal.fire({
        //                     title: 'ສຳເລັດ',
        //                     icon: 'success',
        //                     allowOutsideClick: false,
        //                 })
        //             } else {
        //                 this.loading_processing = false
        //                 swal.fire({
        //                     title: 'ແຈ້ງເຕືອນ',
        //                     text: data?.message,
        //                     icon: 'error',
        //                     allowOutsideClick: false,
        //                     confirmButtonColor: '#3085d6',
        //                     confirmButtonText: 'OK',
        //                 })
        //             }
        //         })
        //     } catch (error) {
        //         this.loading_processing = false
        //         swal.fire({
        //             title: 'ແຈ້ງເຕືອນ',
        //             text: error,
        //             icon: 'error',
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             confirmButtonText: 'OK',
        //         })
        //     }
        // },
        // onCloseModalUpdateLoca() {
        //     this.modalUpdateLoca = false
        //     this.in_details = ''
        //     this.in_province = ''
        // },
    }
}
</script>

<style lang="scss" scoped></style>
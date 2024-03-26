<template>
    <div>
        <v-card class="card-shadow" rounded="lg">
            <v-card-title style="background-color:#E57373;color:white">
                <div style="display:flex;align-items:center;width:100%">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="operation-list">
                        <v-icon color="#E57373">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <span>ແກ້ໄຂໃບປະຕິບັດງານ</span>
                    <v-spacer></v-spacer>
                </div>

            </v-card-title>
            <v-card-text class="pt-6 pa-6">
                <!-- <v-divider class="mx-4"></v-divider> -->
                <div class="pa-4 d-flex align-center pt-5">
                    <div style="width:100%">
                        <v-menu readonly ref="start_go_menu" v-model="start_go_menu" :close-on-content-click="false"
                            :return-value.sync="performanceReDate" transition="scale-transition" offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <span>ວັນທີກັບ</span>
                                <v-text-field v-model="performanceReDate" solo flat background-color="#f5f5f5" dense
                                    required placeholder="ເລືອກວັນທີກັບ" prepend-inner-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="performanceReDate" no-title scrollable
                                @input="$refs.start_go_menu.save(performanceReDate)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>


                    <div style="width:100%" class="pl-2">
                        <span>ລາຄາ</span>
                        <v-text-field readonly solo flat background-color="#f5f5f5" dense placeholder="ລາຄາ"
                            v-model="proAmount"></v-text-field>
                    </div>
                    <div style="width:100%" class="pl-2">
                        <span>ລາຄາລວມ</span>
                        <v-text-field readonly solo flat background-color="#f5f5f5" dense placeholder="ຈຳນວນ"
                            v-model="proTotalAmount"></v-text-field>
                    </div>
                    <div style="width:100%" class="pl-2">
                        <span>ສະກຸນເງິນ</span>
                        <v-select placeholder="ເລືອກສະກຸນເງິນ" style="width:100%" class="pl-2" readonly flat solo dense
                            background-color="#f5f5f5" :items="currency_items" v-model="currency"></v-select>
                    </div>
                    <div style="width:100%" class="pl-2">
                        <span>ນໍ້າໜັກ</span>
                        <v-text-field readonly solo flat background-color="#f5f5f5" dense placeholder="ລາຄາລວມ"
                            v-model="proSize" append-icon="mdi-format-title"></v-text-field>
                    </div>
                </div>
                <v-divider class="mx-4"></v-divider>
                <div class=" pa-4">

                    <div class="text-center mb-5">
                        <span style="color: black ;font-size:18px; ; font-weight:bold">ຄ່າສິ້ນເປືອງ ງວດ 1
                        </span>
                    </div>
                    <div class="text-center">
                        <span style="color: red ;font-size:15px">ຄ່າສິ້ນເປືອງ ງວດ 1 ບໍ່ສາມາດເເກ້ໄດ້
                        </span>
                    </div>

                    <div style="width:100%" class="pt-4">
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <span>ຄ່າຊິງມະຫາໄຊ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າຊິງມະຫາໄຊ" v-model="performanceJumPho"></v-text-field>

                            </div>
                           
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າຕຳລວດ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense placeholder="ຄ່າຕຳລວດ"
                                    v-model="performanceFeePolish"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ" v-model="per_PA"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າດ່ານຫວຽດຂາກັບ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າດ່ານຫວຽດຂາກັບ" v-model="performanceovervn"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ" v-model="performanceovertime"></v-text-field>
                            </div>

                            <!-- <div style="width:100%" class="pl-2">
                                <span>ຄ່າໃບຊິງ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense placeholder="ຄ່າໃບຊິງ"
                                    v-model="performanceFeeTaxung"></v-text-field>
                            </div> -->
                            <div style="width:100%" class="pl-2">
                                <span>ຄ່າຊິງນາອິນ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າຊິງນາອິນ" v-model="performancepassport"></v-text-field>
                            </div>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <span>ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ"
                                    v-model="performanceFeeTaxung"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າໃບຊິງ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense placeholder="ຄ່າໃບຊິງ"
                                    v-model="performanceFeeSing"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <span>ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ"
                                    v-model="performanceFeeSaPhan"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າລົງເກືອ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າລົງເກືອ" v-model="performanceFeeOutContainer"></v-text-field>
                            </div>

                            <!-- 
                            <div style="width:100%">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="performanceFeeYoktu"></v-text-field>
                            </div> -->

                            <div style="width:100%" class="pl-2">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າລ່ວງເວລາ" v-model="performanceFeeYoktu"></v-text-field>
                            </div>

                            <!-- <div style="width:100%" class="pl-2">
                                <span>ຄ່າເອົາຕູ້ອອກຈາກດ່ານລາວ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ຄ່າເອົາຕູ້ອອກຈາກດ່ານລາວ"
                                    v-model="performanceFeeOutContainer"></v-text-field>
                            </div>
                            <div style="width:100%" class="pl-2">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="performanceOvertime"></v-text-field>
                            </div> -->
                            <!-- <div style="width:100%" class="pl-2"></div> -->
                           
                            <div style="width:100%" class="pl-2">
                                <span>ອື່ນໆ</span>
                                <v-text-field readonly solo flat background-color="#fcd59d" dense
                                    placeholder="ອື່ນໆ" v-model="performancevaccine"></v-text-field>
                            </div>
                        </div>
                        
                        

                    </div>
                </div>
                <v-divider class="mx-4"></v-divider>
                <v-divider class="mx-4"></v-divider>
                <div class=" pa-4">
                    <div class="text-center mb-5">
                        <span style="color: black ;font-size:18px; ; font-weight:bold">ຄ່າສິ້ນເປືອງ ງວດ 2</span>

                    </div>
                    <div class="text-center">
                        <span style="color: green ;font-size:16px">ເພີ່ມ ຄ່າສິ້ນເປືອງ ງວດ 2
                        </span>
                    </div>
                    <div style="width:100%" class="pt-4">
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <span>ຄ່າຊິງມະຫາໄຊ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense placeholder="ຄ່າຊິງມະຫາໄຊ"
                                    v-model="formattedadd_feeOvertime1"></v-text-field>

                            </div>
                            <div style="width:100% " class="px-2">
                                <span>ຄ່າຕຳລວດ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense placeholder="ຄ່າຕຳລວດ"
                                    v-model="formattedadd_feeJumPo2"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense
                                    placeholder="ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ" v-model="formattedadd_feePolish3"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າດ່ານຫວຽດຂາກັບ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense placeholder="ຄ່າດ່ານຫວຽດຂາກັບ"
                                    v-model="formattedadd_feeTaxung4"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense
                                    placeholder="ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ" v-model="formattedadd_feeTiew5"></v-text-field>
                            </div>

                            <!-- <div style="width:100%" class="pl-2">
                                <span>ຄ່າໃບຊິງ</span>
                                <v-text-field  solo flat background-color="#d4ebff" dense placeholder="ຄ່າໃບຊິງ"
                                    v-model="performanceFeeTaxung"></v-text-field>
                            </div> -->
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <span>ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense
                                    placeholder="ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ" v-model="formattedadd_feesing"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າໃບຊິງ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense placeholder="ຄ່າໃບຊິງ"
                                    v-model="formattedadd_feesaphan"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <span>ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense
                                    placeholder="ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ" v-model="formattedadd_feeyoktu"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າລົງເກືອ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense placeholder="ຄ່າລົງເກືອ"
                                    v-model="formattedadd_feecontrainer"></v-text-field>
                            </div>

                            <!-- 
                            <div style="width:100%">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field readonly solo flat background-color="#d4ebff" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="performanceFeeYoktu"></v-text-field>
                            </div> -->

                            <div style="width:100%" class="pl-2">
                                <span>ຄ່າລ່ວງເວລາ 2</span>
                                <v-text-field solo flat background-color="#d4ebff" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="formattedadd_feepayang"></v-text-field>
                            </div>

                            <!-- <div style="width:100%" class="pl-2">
                                <span>ຄ່າເອົາຕູ້ອອກຈາກດ່ານລາວ</span>
                                <v-text-field readonly solo flat background-color="#d4ebff" dense
                                    placeholder="ຄ່າເອົາຕູ້ອອກຈາກດ່ານລາວ"
                                    v-model="performanceFeeOutContainer"></v-text-field>
                            </div>
                            <div style="width:100%" class="pl-2">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field readonly solo flat background-color="#d4ebff" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="performanceOvertime"></v-text-field>
                            </div> -->
                            <!-- <div style="width:100%" class="pl-2"></div> -->
                        </div>

                    </div>
                </div>
                <v-divider class="mx-4"></v-divider>
            </v-card-text>

            <v-card-actions class="pr-10 pb-8">
                <v-spacer></v-spacer>
                <v-btn @click="onUpdate" width="200" color="#1db733" class="card-shadow">
                    <span class="white--text pl-2">ເພີ່ມຄ່າສິ້ນເປືອງ ງວດ 2 </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            currency_items: ['LAK', 'USD', 'THB', 'CNY'],
            currency: '',
            loading_processing: false,
            start_go_menu: false,
            end_menu: false,
            start_go_date: null,
            l_id: '',
            performanceBillNo: '',
            performanceReDate: '',
            performanceTotal: '',
            performanceOvertime: '',
            performanceJumPho: '',
            performanceFeePolish: '',
            performanceFeeTaxung: '',
            performanceFeeTiew: '',
            performanceovervn: '',
            performanceBoderLak20: '',
            performancePassport: '',
            performancevaccine: '',
            performanceFeeSing: '',
            performanceFeeSaPhan: '0',
            performanceFeeYoktu: '',
            performanceFeeOutContainer: '',
            performancedate: '',
            feeUnit: '',
            feeTotal: '',
            currency: '',
            proAmount: '',

            proTotalAmount: '',
            proSize: '',
            per_PA: '',
            performancefe_PAYANG: '',

            add_feeOvertime1: '',
            add_feeJumPo2: '',
            add_feePolish3: '',
            add_feeTaxung4: '',
            add_feeTiew5: '',

            add_feesing: '',
            add_feesaphan: '',
            add_feeyoktu: '',
            add_feecontrainer: '',
            add_feepayang: ''
        }
    },
    watch: {
        proAmount: function (newValue) {
            // Remove commas and spaces from the input value
            const value = parseFloat(newValue?.replace(/[, ]/g, ''));
            const total = value * parseFloat(this.proSize);

            if (!isNaN(total)) {
                this.proTotalAmount = total.toLocaleString(undefined, { maximumFractionDigits: 2 });
            }

            // Update proAmount with the input value
            this.proAmount = newValue;
        },
        // proSize: function (newValue) {
        //     // Remove commas and spaces from the input value
        //     const size = parseFloat(newValue?.replace(/[, ]/g, ''));
        //     const amount = parseFloat(this.proAmount?.replace(/[, ]/g, ''));

        //     let total = size * amount;

        //     if (!isNaN(total)) {
        //         this.proTotalAmount = total.toLocaleString(undefined, { maximumFractionDigits: 2 });
        //     }

        //     // Update proSize with the input value
        //     this.proSize = newValue;
        // },
    },

    computed: {
    formattedadd_feeOvertime1: {
      get() {
        if (!this.add_feeOvertime1) return '';
        return this.add_feeOvertime1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feeOvertime1 = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feeJumPo2: {
      get() {
        if (!this.add_feeJumPo2) return '';
        return this.add_feeJumPo2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feeJumPo2 = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feePolish3: {
      get() {
        if (!this.add_feePolish3) return '';
        return this.add_feePolish3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feePolish3 = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feeTaxung4: {
      get() {
        if (!this.add_feeTaxung4) return '';
        return this.add_feeTaxung4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feeTaxung4 = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feeTiew5: {
      get() {
        if (!this.add_feeTiew5) return '';
        return this.add_feeTiew5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feeTiew5 = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feesing: {
      get() {
        if (!this.add_feesing) return '';
        return this.add_feesing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feesing = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feesaphan: {
      get() {
        if (!this.add_feesaphan) return '';
        return this.add_feesaphan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feesaphan = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feeyoktu: {
      get() {
        if (!this.add_feeyoktu) return '';
        return this.add_feeyoktu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feeyoktu = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },
    formattedadd_feecontrainer: {
      get() {
        if (!this.add_feecontrainer) return '';
        return this.add_feecontrainer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feecontrainer = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },

    formattedadd_feepayang: {
      get() {
        if (!this.add_feepayang) return '';
        return this.add_feepayang.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      set(value) {
        this.add_feepayang = value.replace(/,/g, '').replace(/\D/g, '');
      }
    },

  },


    mounted() {
        this.onGetDataListForPrint()
    },
    methods: {
        onGetDataListForPrint() {
            try {
                let data = {
                    performanceBillNo: this.$route?.query?.key,
                    toKen: localStorage.getItem("toKen")

                }
                console.log("datadend:", data)
                this.$axios.$post('/showPerformanceByNo.service', data).then((data) => {
                    if (data?.status === '00') {
                        this.performancedate = data?.data[0]?.performancedate
                        this.proAmount = data?.data[0]?.price
                        this.currency = data?.data[0]?.currency
                        this.proSize = data?.data[0]?.proSize
                        this.performanceReDate = data?.data[0].performanceReDate
                        this.performanceTotal = data?.data[0].performanceTotal
                        this.performanceovertime = data?.data[0].performanceovertime
                        this.performanceJumPho = data?.data[0].performancejumpho
                        this.performanceFeePolish = data?.data[0].performancefeepolish
                        this.performanceFeeTaxung = data?.data[0].performancefeetaxung
                        this.performanceFeeTiew = data?.data[0].performancefeetiew
                        this.performanceovervn = data?.data[0].performanceovervn
                        this.performanceBoderLak20 = data?.data[0].performanceboderlak20
                        this.performancepassport = data?.data[0].performancepassport
                        this.performancevaccine = data?.data[0].performancevaccine
                        this.performanceFeeSing = data?.data[0].performancefeesing
                        this.performanceFeeSaPhan = data?.data[0].performancefeesaphan
                        this.performanceFeeYoktu = data?.data[0].performancefeeyoktu
                        this.performanceFeeOutContainer = data?.data[0].performancefeeoutcontainer
                        this.per_PA = data?.data[0]?.performancefe_PAYANG

                        this.add_feeOvertime1 = data ?. data[0].add_feeOvertime1
                        this.add_feeJumPo2 = data ?. data[0].add_feeJumPo2
                        this.add_feePolish3 = data ?. data[0].add_feePolish3
                        this.add_feeTaxung4 = data ?. data[0].add_feeTaxung4
                        this.add_feeTiew5 = data ?. data[0].add_feeTiew5

                        this.add_feesing = data ?. data[0].add_feesing
                        this.add_feesaphan = data ?. data[0].add_feesaphan
                        this.add_feeyoktu = data ?. data[0].add_feeyoktu
                        this.add_feecontrainer = data ?. data[0].add_feecontrainer
                        this.add_feepayang= data ?. data[0].add_feepayang


                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        onUpdate() {
            try {
                let data = {
                    // performanceReDate: this.performanceReDate ? this.performanceReDate : 0,
                    // performanceTotal: this.performance_data[0]?.total_PRICE,
                    // performanceOvertime: this.performanceOvertime ? this.performanceOvertime : 0,
                    // performanceJumPho: this.performanceJumPho ? this.performanceJumPho : 0,
                    // performanceFeePolish: this.performanceFeePolish ? this.performanceFeePolish : 0,
                    // performanceFeeTaxung: this.performanceFeeTaxung ? this.performanceFeeTaxung : 0,
                    // performanceFeeTiew: this.performanceFeeTiew ? this.performanceFeeTiew : 0,
                    // performanceOverVN: this.performanceOverVN ? this.performanceOverVN : 0,
                    // performanceBoderLak20: this.performanceBoderLak20 ? this.performanceBoderLak20 : 0,
                    // performancePassport: this.performancePassport ? this.performancePassport : 0,
                    // performanceVaccine: this.performanceVaccine ? this.performanceVaccine : 0,
                    // performanceFeeSing: this.performanceFeeSing ? this.performanceFeeSing : 0,
                    // performanceFeeSaPhan: this.performanceFeeSaPhan ? this.performanceFeeSaPhan : 0,
                    // performanceFeeYoktu: this.performanceFeeYoktu ? this.performanceFeeYoktu : 0,
                    // performanceFeeOutContainer: this.performanceFeeOutContainer ? this.performanceFeeOutContainer : 0,
                    lAHUD_POYLOD: this.lAHUD_POYLOD ,
                    per_PA: this.$route?.query?.key,
                    // this.per_PA ? this.per_PA : 0,
                    
                    key_id: this.$route?.query?.key,
                    // currency: this.currency,
                    // total_PRICE: this.proTotalAmount,
                    // proAmount: this.proAmount,
                    // proSize: this.proSize,
                    
                    add_feeOvertime1  :  this.add_feeOvertime1  ? this.add_feeOvertime1 : 0,
                    add_feeJumPo2 :  this.add_feeJumPo2  ? this.add_feeJumPo2 : 0,
                    add_feePolish3 :this.add_feePolish3  ? this.add_feePolish3 : 0,
                    add_feeTaxung4 :this.add_feeTaxung4  ? this.add_feeTaxung4 : 0,
                    add_feeTiew5  :  this.add_feeTiew5  ? this.add_feeTiew5 : 0,
                    add_feesing   : this.add_feesing  ? this.add_feesing : 0,
                    add_feesaphan  :  this.add_feesaphan  ? this.add_feesaphan : 0,
                    add_feeyoktu   :  this.add_feeyoktu  ? this.add_feeyoktu : 0,
                    add_feecontrainer  :  this.add_feecontrainer  ? this.add_feecontrainer : 0,
                    add_feepayang  :   this.add_feepayang ? this.add_feepayang : 0,
                     toKen: localStorage.getItem("toKen")

                }
                this.$axios.$post('/updatePerformanceAllTxn.service', data).then((data) => {
                    swal.fire({
                        icon: 'success',
                        text: 'ສຳເລັດ'
                    })

                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style></style>
<template>
    <div>
        <v-card style="width:1800px;height:800px;">
            <div>

                <v-row>
                    <!-- ຂໍ້ມູນພະນັກງານຂັບລົດ -->
                    <v-col cols="12" md="3">
                        <v-card :to="{ name: 'create-expense' }" height="100" elevation="2" rounded="lg" width="310px"
                            style="border: 1px solid rgb(221, 5, 245);">
                            <v-card-text>
                                <div class="d-flex align-center">
                                    <v-icon style="color: rgb(221, 5, 245);"
                                        size="55">mdi-account-box-edit-outline</v-icon>
                                    <div class="pl-5 pb-5 pt-5 pr-5">
                                        <span
                                            style="font-size: 17pt; font-weight: bold;">ລາຍຮັບ-ລາຍຈ່າຍອື່ນໆ</span><br />
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- ຂໍ້ມູນພະນັກງານຂັບລົດ -->
                    <v-col cols="12" md="3">
                        <div v-if="USER_ROLE === 'USER' || USER_ROLE === 'ADMIN'">

                            <v-card to="/allowance_2" height="100" elevation="2" rounded="lg" width="310px"
                                style="border: 1px solid rgb(224, 0, 105) ;">
                                <v-badge :content="TOTAL_total_BL" color="error">
                                    <v-card-text>
                                        <div class="d-flex align-center">
                                            <v-icon color="#e00069" size="55">mdi-account-cash</v-icon>
                                            <div class="pl-5 pb-5 pt-5 pr-5">
                                                <span style="font-size: 18pt;font-weight: bold;">ໜີ້ຕ້ອງສົງ</span><br />
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-badge>
                            </v-card>
                        </div>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div v-if="USER_ROLE === 'USER' || USER_ROLE === 'ADMIN'">

                            <v-card to="/screwdriver" height="100" elevation="2" rounded="lg" width="310px"
                                style="border: 1px solid rgb(224, 0, 105) ;">
                            
                                    <v-card-text>
                                        <div class="d-flex align-center">
                                            <v-icon color="#e00069" size="55">mdi-toolbox</v-icon>
                                            <div class="pl-5 pb-5 pt-5 pr-5">
                                                <span style="font-size: 18pt;font-weight: bold;">ໜີ້ອາໄລ</span><br />
                                            </div>
                                        </div>
                                    </v-card-text>
                              
                            </v-card>
                        </div>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-card to="./purchase_order_paper" height="100" elevation="2" rounded="lg" width="310px"
                            style="border: 1px solid rgb(255, 153, 51);">
                            <v-card-text>
                                <div class="d-flex align-center">
                                    <v-icon color="orange" size="55">mdi-clipboard-check</v-icon>

                                    <div class="pl-5 pb-5 pt-5 pr-5">
                                        <span
                                            style="font-size: 17pt;font-weight: bold;">ລາຍການອາໄລ່ລໍຖ້າຊື້</span><br />
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
             
                    <v-col cols="12" md="3">

                        <v-card :to="{ name: 'report-expense' }" height="100" elevation="2" rounded="lg" width="310px"
                            style="border: 1px solid rgb(139, 12, 156);">
                            <v-card-text>
                                <div style="margin-top: -10px;" class="d-flex align-center">
                                    <v-icon color="#8b0c9c" size="55">mdi mdi-cash-clock</v-icon>

                                    <div class="pl-5 pb-5 pt-5 pr-5">
                                        <span style="font-size: 17pt;font-weight: bold;">ລາຍງານຮັບ - ລາຍຈ່າຍ
                                            ອື່ນໆ</span><br />
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>

                    </v-col>
                    <v-col cols="12" md="3">

                        <v-card :to="{ name: 'report-flex-car' }" height="100" elevation="2" rounded="lg" width="310px"
                            style="border: 1px solid rgb(139, 12, 156);">
                            <v-card-text>
                                <div style="margin-top: -10px;" class="d-flex align-center">
                                    <v-icon color="#8b0c9c" size="55">mdi mdi-truck-alert</v-icon>

                                    <div class="pl-5 pb-5 pt-5 pr-5">
                                        <span style="font-size: 17pt;font-weight: bold;">ປະວັດການເບີກທອນອາໄລ
                                            ຂອງລົດ</span><br />
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>

                    </v-col>
                    <v-col cols="12" md="3">
                        <div v-if="USER_ROLE === 'USER'|| USER_ROLE === 'ADMIN'">

                            <v-badge :content="TOTAL_total_PayOil" color="error">
                                <v-card :to="{ name: 'getgass' }" height="100" elevation="2" rounded="lg" width="310px"
                                    style="border: 1px solid rgb(224, 0, 105) ;">
                                    <v-card-text>
                                        <div class="d-flex align-center">
                                            <v-icon color="#e00069" size="55">mdi-gas-station
                                                mdi:gas-station

                                            </v-icon>

                                            <div class="pl-5 pb-5 pt-5 pr-5">
                                                <span style="font-size: 17pt;font-weight: bold;">ໜີ້ນໍ້າມັນ</span><br />
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-badge>
                        </div>
                    </v-col>

                    <!-- ຮັບເງິນຍ້ອນຫຼັງ -->
                    <v-col cols="12" md="3">
                        <div v-if="USER_ROLE === 'USER' || USER_ROLE === 'ADMIN'">
                            <v-badge :content="TOTAL_totalOwe" color="error">
                                <v-card :to="{ name: 'payment-debt' }" height="100" elevation="2" rounded="lg"
                                    width="310px" style="border: 1px solid rgb(93,199,0);">
                                    <v-card-text>
                                        <div class="d-flex align-center">

                                            <v-icon color="success" size="55">mdi-currency-usd</v-icon>

                                            <div class="pl-5 pb-5 pt-5 pr-5">
                                                <span
                                                    style="font-size: 18pt;font-weight: bold;">ຮັບເງິນຍ້ອນຫຼັງ</span><br />
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-badge>
                        </div>

                    </v-col>

                    <!-- ອອກໃບຮຽກເກັບເງິນ -->
                    <v-col cols="12" md="3">
                        <div v-if="USER_ROLE === 'USER' || USER_ROLE === 'ADMIN'">
                        <!-- <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'FINANCE'"> -->
                        <v-badge :content="TOTAL_INVOICE" color="teal">
                            <v-card :to="{ name: 'invoice-list' }" height="100" elevation="2" rounded="lg" width="310px"
                                style="border: 1px solid rgb(93,199,0);">
                                <v-card-text>
                                    <div class="d-flex align-center">
                                        <v-badge :content="TOTAL_FORMANCE" color="error">
                                            <v-icon color="green" size="55">mdi-hand-extended</v-icon>
                                        </v-badge>
                                        <div class="pl-5 pb-5 pt-5 pr-5">
                                            <span
                                                style="font-size: 18pt;font-weight: bold;">ອອກໃບຮຽກເກັບເງິນ</span><br />
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-badge>
                        </div>
                        <!-- </div> -->

                    </v-col>

                    <!-- ຮັບເງິນ -->
                    <v-col cols="12" md="3">
                        <div v-if="USER_ROLE === 'USER'|| USER_ROLE === 'ADMIN'">
                            <v-badge :content="TOTAL_INVOICE" color="error">

                                <v-card :to="{ name: 'payment' }" height="100%" width="310px" elevation="2" rounded="lg"
                                    style="border: 1px solid rgb(93,199,0);">
                                    <v-card-text>
                                        <div class="d-flex align-center">
                                            <!-- <v-badge :content="TOTAL_payStatus" color="error">  </v-badge> -->
                                            <v-icon color="success" size="55">mdi-cash-100</v-icon>

                                            <div class="pl-5 pb-5 pt-5 pr-5">
                                                <span style="font-size: 18pt;font-weight: bold;">ຮັບເງິນ</span><br />
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-badge>
                        </div>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div style="width: 100%;">

                            <v-card :to="{ name: 'reportStockDayWeek' }" height="100%" width="310px" elevation="2"
                                rounded="lg" style="border: 1px solid rgb(93,199,0);">
                                <v-card-text>
                                    <div class="d-flex align-center">

                                        <v-icon color="success" size="55">mdi-file-replace</v-icon>

                                        <div class="pl-5 pb-5 pt-5 pr-5">
                                            <span style="font-size: 18pt;font-weight: bold;">ລາຍງານ ສາງ
                                                ວດປ</span><br />
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                 


                </v-row>
            </div>

        </v-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            USER_ID: '',
            USER_NAME: '',
            USER_ROLE: '',
            TOTAL: '',
            TOTAL_INVOICE: '',
            TOTAL_FORMANCE: '',
            total_PayOil: '',
            TOTAL_payStatus: '',
            TOTAL_totalOwe: '',
            TOTAL_notiDetails: '',
            TOTAL_total_PayOil: '',
            TOTAL_total_BL: '',
            loading_processing: false,
        }
    },
    mounted() {
        this.total_count()
        this.USER_ID = localStorage.getItem('USER_ID')
        this.USER_NAME = localStorage.getItem('USER_NAME')
        this.USER_ROLE = localStorage.getItem('USER_ROLE')


    },
    methods: {
        total_count() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/getNotiTab3.service'
                    , {
                        toKen: localStorage.getItem('toKen'),

                    }
                ).then((data) => {
                    this.loading_processing = false
                    this.TOTAL = data?.totalRow
                    this.TOTAL_INVOICE = data?.notiInvoice
                    this.TOTAL_FORMANCE = data?.notiPerForMance
                    this.TOTAL_payStatus = data?.payStatus
                    this.TOTAL_notiDetails = data?.notiDetails
                    this.TOTAL_totalOwe = data?.totalOwe
                    this.TOTAL_total_PayOil = data?.total_PayOil
                    this.TOTAL_total_BL = data?.total_BL
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

        onCleck() {


        }


    }
}

</script>
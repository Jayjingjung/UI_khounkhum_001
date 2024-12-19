<template>
    <div>
        <!-- ປະທານ -->
        <v-row>
            <!-- <v-col cols="12" md="3">
                <div>
                    <v-card to="/re01akasarn1" height="100" elevation="2" rounded="lg" width="310px"
                        style="border: 1px solid rgb(222, 222, 222);">
                        <v-card-text>
                            <div class="d-flex align-center">
                                <v-icon color="orange" size="55">mdi-application-import</v-icon>
                                <div class="pl-5 pb-5 pt-5 pr-5">
                                    <span style="font-size: 17pt; font-weight: bold;">ເອກະສານ</span><br />

                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col> -->
            <v-col cols="12" md="3">
                <div>
                    <v-card to="/dashbord_new" height="100" elevation="2" rounded="lg" width="310px"
                        style="border: 1px solid rgb(222, 222, 222);">
                        <v-card-text>
                            <div class="d-flex align-center">
                                <v-icon color="orange" size="55">mdi-plus</v-icon>
                                <div class="pl-5 pb-5 pt-5 pr-5">
                                    <span style="font-size: 17pt; font-weight: bold;">5555</span><br />

                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>

            </v-col>
        </v-row>

        <!-- ປະທານ -->
        <v-row>
            <v-col cols="12" md="3">
                <div>
                    <v-card to="/DeptMustReceive" height="100" elevation="2" rounded="lg" width="310px"
                        style="border: 1px solid rgb(222, 222, 222);">
                        <v-card-text>
                            <div class="d-flex align-center">
                                <v-icon color="orange" size="55">mdi-receipt-send-outline</v-icon>
                                <div class="pl-5 pb-5 pt-5 pr-5">
                                    <span style="font-size: 17pt; font-weight: bold;">ໃບສະເໜີ</span><br />

                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>

            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12" md="3">
                <div>
                    <v-card @click="navigateToStoneAdmin" height="100" elevation="2" rounded="lg" width="310px"
                        style="border: 1px solid rgb(222, 222, 222);">
                        <v-card-text>
                            <div class="d-flex align-center">
                                <v-icon color="orange" size="55">mdi-excavator</v-icon>
                                <div class="pl-5 pb-5 pt-5 pr-5">
                                    <span style="font-size: 17pt; font-weight: bold;">ບໍ່ຕ່າງໆ</span><br />
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>

        <!-- ປະທານ -->
        <!-- <v-row>
            <v-col cols="12" md="3">
                <div>
                    <v-card to="/stone_admin" height="100" elevation="2" rounded="lg" width="310px"
                        style="border: 1px solid rgb(222, 222, 222);">
                        <v-card-text>
                            <div class="d-flex align-center">
                                <v-icon color="orange" size="55">mdi-landslide</v-icon>
                                <div class="pl-5 pb-5 pt-5 pr-5">
                                    <span style="font-size: 17pt; font-weight: bold;">ບໍ່ຫີນ</span><br />
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>  -->
    </div>
</template>
<script>
export default {
    // middleware: 'auth',  // ใช้ middleware นี้ในหน้า dashboard,hk
    data() {
        return {
            USER_ID: '',
            USER_NAME: '',
            USER_ROLE: '',
            TOTAL: '',
            TOTAL_INVOICE: '',
            TOTAL_FORMANCE: '',
            TOTAL_payStatus: '',
            TOTAL_totalOwe: '',
            TOTAL_notiDetails: '',
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
        navigateToStoneAdmin() {
            // เมื่อคลิกปุ่ม, นำทางไปยัง 'stone_admin.vue' พร้อมกับส่ง query userRole
            this.$router.push({ name: 'stone_admin', query: { userRole: 'FOR_DOCUMENT_ADMIN' } });
        },
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
    }
}

</script>

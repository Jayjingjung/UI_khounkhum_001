<template>
  <div>

    <v-row>
      <!-- ຂໍ້ມູນຫົວລົດ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <v-card to="/cars_14" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(41, 0, 245);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="indigo" size="55">mdi-truck</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ຂໍ້ມູນຫົວລົດ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>


      </v-col>

      <!-- ຂໍ້ມູນຫາງລົດ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <v-card to="/cars_footer" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(41, 0, 245);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="indigo" size="55">mdi-truck-trailer</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 18pt;font-weight: bold;">ຂໍ້ມູນຫາງລົດ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>





      <!-- ຂໍ້ມູນພະນັກງານຂັບລົດ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <v-card to="/employee" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(41, 0, 245);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="indigo" size="55">mdi-account-tie</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ຂໍ້ມູນພະນັກງານຂັບລົດ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <!-- ລາຍຮັບ-ລາຍຈ່າຍອື່ນໆ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <v-card to="create-expense" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(41, 0, 245);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="indigo" size="55">mdi-account-box-edit-outline</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ລາຍຮັບ-ລາຍຈ່າຍອື່ນໆ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>


    </v-row>


    <v-row>

      <!-- ອອກໃບປ່ອຍລົດ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <v-badge :content="TOTAL_notiDetails" color="teal">
            <v-card to="/leave-cars-list" height="100" elevation="2" rounded="lg" width="310px"
              style="border: 1px solid rgb(93,199,0);">
              <v-card-text>
                <div class="d-flex align-center">
                  <v-icon color="green" size="55">mdi-clipboard-check</v-icon>
                  <div class="pl-5 pb-5 pt-5 pr-5">
                    <span style="font-size: 18pt; font-weight: bold;">ອອກໃບປ່ອຍລົດ</span><br />
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-badge>
        </div>
      </v-col>


      <!-- ອອກໃບປະຕີບັດງານ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <v-badge color="error" :content='TOTAL_FORMANCE'>
            <v-card to="/operation-list" height="100" width="310px" elevation="2" rounded="lg"
              style="border: 1px solid rgb(93,199,0);">
              <v-card-text>
                <div class="d-flex align-center">
                  <v-badge :content="TOTAL_notiDetails" color="teal">
                    <v-icon color="green" size="55">mdi-file-send</v-icon>
                  </v-badge>
                  <div class="pl-5 pb-5 pt-5 pr-5">
                    <span style="font-size: 18pt;font-weight: bold;">ອອກໃບປະຕີບັດງານ</span><br />
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-badge>
        </div>
      </v-col>

      <!-- ອອກໃບຮຽກເກັບເງິນ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'FINANCE'">
          <v-badge :content="TOTAL_INVOICE" color="error">
            <v-card to="/invoice-list" height="100" elevation="2" rounded="lg" width="310px"
              style="border: 1px solid rgb(93,199,0);">
              <v-card-text>
                <div class="d-flex align-center">
                  <v-badge :content="TOTAL_FORMANCE" color="teal">
                    <v-icon color="green" size="55">mdi-hand-extended</v-icon>
                  </v-badge>
                  <div class="pl-5 pb-5 pt-5 pr-5">
                    <span style="font-size: 18pt;font-weight: bold;">ອອກໃບຮຽກເກັບເງິນ</span><br />
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-badge>
        </div>

      </v-col>
      <!-- ຮັບເງິນ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'FINANCE'" style="width: 100%;">
          <v-badge :content="TOTAL_INVOICE" color="error">

            <v-card to="/payment" height="100%" width="310px" elevation="2" rounded="lg"
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


    </v-row>


    <v-row>
      <!-- ຮັບເງິນຍ້ອນຫຼັງ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'FINANCE'">
          <v-badge :content="TOTAL_totalOwe" color="error">
            <v-card to="/payment-debt" height="100" elevation="2" rounded="lg" width="310px"
              style="border: 1px solid rgb(93,199,0);">
              <v-card-text>
                <div class="d-flex align-center">

                  <v-icon color="success" size="55">mdi-currency-usd</v-icon>

                  <div class="pl-5 pb-5 pt-5 pr-5">
                    <span style="font-size: 18pt;font-weight: bold;">ຮັບເງິນຍ້ອນຫຼັງ</span><br />
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-badge>
        </div>

      </v-col>

      <!-- ເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ -->
      <v-col>
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'FINANCE'">

          <v-card to="/allowance_2" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(93,199,0);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="success" size="55">mdi-account-cash</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 18pt;font-weight: bold;">ເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>

        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'ADMIN'">
          <v-card to="getgass" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(93,199,0);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="success" size="55">mdi-gas-station
                  mdi:gas-station

                </v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ໜີ້ນໍ້າມັນ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>




      <!-- ປະທານ -->

      <v-col cols="12" md="3">

        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <!-- <v-card to="./report/dashboard" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(222, 222, 222);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="orange" size="55">mdi-poll</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt; font-weight: bold;">ຫາຍງານສະລຸມ</span><br />

                </div>
              </div>
            </v-card-text>
          </v-card> -->
        </div>

      </v-col>

    </v-row>


    <!-- ຂໍ້ມູນພະນັກງານຂັບລົດ -->
    <v-row>
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'ADMIN'">
          <v-card to="./repair/repair" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(255, 153, 51);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="orange" size="55">mdi-cogs</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ສ້ອມເເປງ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'ADMIN'">
          <v-card to="./wareHouse/warehouse" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(255, 153, 51);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="orange" size="55">mdi-warehouse</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ສາງອາໄລ່</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>





      <!-- ບັນຊີລາຍຈ່າຍ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'ADMIN'">
          <v-card to="./accountExpense/account-expense" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(255, 153, 51);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="orange" size="55">mdi-clipboard-check</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ບັນຊີລາຍຈ່າຍ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

    </v-row>
    <!-- ຂໍ້ມູນພະນັກງານຂັບລົດ -->
    <v-row>


      <!-- ລາຍຈ່າຍ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'ADMIN'">
          <v-card to="report_customers" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(139, 12, 156);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="#8b0c9c" size="55">mdi-basket-check</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ລາຍງານລູກຄ້າ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <!-- ປະທານ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'ADMIN'">
          <v-card to="report_staft" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(139, 12, 156);">
            <v-card-text>
              <div style="margin-top: -10px;" class="d-flex align-center">
                <v-icon color="#8b0c9c" size="55">mdi-card-account-details-star</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ລາຍງານພະນັກງານຂັບລົດ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <!-- ປະທານ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">
          <v-card to="report-expense" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(139, 12, 156);">
            <v-card-text>
              <div style="margin-top: -10px;" class="d-flex align-center">
                <v-icon color="#8b0c9c" size="55">mdi mdi-cash-clock</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ລາຍງານຮັບ - ລາຍຈ່າຍ ອື່ນໆ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <!-- ລາຍຈ່າຍ -->

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'USER'">

        </div>
      </v-col> -->
    </v-row>

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

    onCleck() {


    }


  }
}

</script>

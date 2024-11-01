<template>
  <div>

    <v-row>
      <!-- ຂໍ້ມູນຫົວລົດ -->
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'">
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
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'">
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
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'|| USER_ROLE === 'BOR-HIN-KHUAT'">
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
        <div v-if="USER_ROLE === 'ADMIN' || USER_ID === 'ADMIN'">
          <v-card to="/homepagehr" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-clipboard-text</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt; font-weight: bold;">HR VT</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'">
          <v-card to="/locame" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-clipboard-text<</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt; font-weight: bold;">location</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col> -->
      <!-- ລາຍຮັບ-ລາຍຈ່າຍອື່ນໆ -->


    </v-row>



    <!-- ອອກໃບປ່ອຍລົດ -->
    <v-row>
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'">
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
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'">
          <v-badge color="teal" :content='TOTAL_FORMANCE'>
            <v-card to="/operation-list" height="100" width="310px" elevation="2" rounded="lg"
              style="border: 1px solid rgb(93,199,0);">
              <v-card-text>
                <div class="d-flex align-center">
                  <v-badge :content="TOTAL_notiDetails" color="error">
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
    </v-row>


    <!-- ປະທານ -->
    <v-row>

      <v-col cols="12" md="3">

        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'">
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
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'INVENTORY' || USER_ROLE === 'INVENANSFINANCE' || USER_ROLE === 'BOR-HIN-KHUAT'">
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
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'INVENTORY'|| USER_ROLE === 'INVENANSFINANCE'|| USER_ROLE === 'BOR-HIN-KHUAT'">
          <v-card to="./wareHouse/warehouse" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(255, 153, 51);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon color="orange" size="55">mdi-warehouse</v-icon>

                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt;font-weight: bold;">ສາງອາໄຫຼ່</span><br />
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
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'FINANCE'">
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
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'FINANCE' || USER_ROLE === 'BOR-HIN-KHUAT'">
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

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'">
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
      </v-col> -->
      <!-- ລາຍຈ່າຍ -->

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'USER'">

        </div>
      </v-col> -->
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'ADMIN' ||USER_ROLE === 'ACCOUNT_POYLOD'|| USER_ROLE === 'INVENTORY'|| USER_ROLE === 'INVENANSFINANCE'|| USER_ROLE === 'FINANCE'|| USER_ROLE === 'BOR-HIN-KHUAT'">
          <v-card to="./accountExpense/ix-account" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid rgb(221, 5, 245);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-clipboard-text</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5">
                  <span style="font-size: 17pt; font-weight: bold;">ລວມບັນຊີ</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
  
      <v-col cols="12" md="3">
          <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN' || USER_ROLE === 'FINANCE'|| USER_ROLE === 'BOR-HIN-KHUAT'|| USER_ROLE == 'INVENANSFINANCE'">
            <v-card to="/reportbaisner" height="100" elevation="2" rounded="lg" width="310px"
              style="border: 1px solid  rgba(191, 0, 0, 0.8);">
              <v-card-text>
                <div class="d-flex align-center">
                  <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-folder-multiple-outline</v-icon>
                  <div class="pl-5 pb-5 pt-5 pr-5 ">
                    <span style="font-size: 18pt;font-weight: bold;">ລາຍງານສະເໜີ</span><br />
                    <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
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

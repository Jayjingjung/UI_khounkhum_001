<template>
  <div>

    <v-row>
      <!-- ລົດບໍລິຫານ -->
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="./HR/carindek_hr" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-car</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ລົດບໍລິຫານ</span><br />
                
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <!-- ລາຍຮັບ-ລາຍຈ່າຍອື່ນໆ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="./HR/itemhr" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-package-variant-closed</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ອຸປະກອນຫ້ອງການ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'|| USER_NAME === 'mai_ud'">
          <v-card to="./HR/akasarn" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-application-import</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ເອກກະສານ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
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

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/mining" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-image-filter-hdr</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ລາຍງານການຄຸດເຈາະ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/signature" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-pen</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">signature</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col> -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/receivedAll" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-receipt-send-outline</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">receivedAll</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/ExchangeRate" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55"></v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ExchangeRate</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col> -->

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/testt-v-card-pdf" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55"></v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">test</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
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
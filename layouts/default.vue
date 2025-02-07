<template>
  <v-app dark>
    <v-app-bar
      v-if="USER_ROLE == 'USER' || USER_ROLE == 'ADMIN' || USER_ROLE === 'FINANCE'|| USER_ROLE === 'FINANCE_TK' || USER_ROLE === 'ACCOUNT_POYLOD'"
      style="width: 1850px;" fixed app color="#E57373" class="mt-2">
      style="width: 100%;" fixed app color="#E57373" class="mt-2">
      <v-dialog v-model="loading_processing" persistent width="55">
        <v-card width="55" height="55" class="pt-3 pl-3">
          <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
        </v-card>
      </v-dialog>

      <v-btn class="mx-2" fab dark small color="white">
        <img @click="onGoTo" class="mx-auto" src="../assets/images/logo01.png" width="80" />
      </v-btn>
      <!-- menu ຈັດການຂໍ້ມູນພື້ນຖານ -->
      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-icon color="#fff" size="18">mdi-hammer-wrench</v-icon>
            ຈັດການຂໍ້ມູນພື້ນຖານ
            <v-icon color="#fff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="customer" elevation="0" block><span
              class="black--text">ເພີ່ມລູກຄ້າ</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="employee" elevation="0" block><span
              class="black--text">ເພີ່ມພະນັກງານຂັບລົດ</span><v-spacer></v-spacer></v-btn>

          <v-btn v-if="USER_ROLE !== 'FINANCE' && USER_ROLE !== 'USER'" color="white" to="user" elevation="0"
            block><span class="black--text">ເພີ່ມຜູ້ເຂົ້າໃຊ້</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="products" elevation="0" block><span
              class="black--text">ເພີ່ມສິນຄ້າ</span><v-spacer></v-spacer></v-btn>
          <v-btn color="white" to="locations" elevation="0" block><span
              class="black--text">ເພີ່ມສະຖານທີຈັດສົ່ງ</span><v-spacer></v-spacer></v-btn>
          <!-- <v-btn v-if="USER_ROLE !== 'USER'" color="white" to="exchang" elevation="0" block><span
              class="black--text">ເພີ່ມອັດຕາການແລກປ່ຽນ</span><v-spacer></v-spacer></v-btn> -->

          <v-btn color="white" to="morfai" elevation="0" block><span
              class="black--text">ເພີ່ມຍີ່ຫໍ້ໝໍ້ໄຟ</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="create-expense-type" elevation="0" block><span class="black--text">ປະເພດລາຍຮັບ -
              ລາຍຈ່າຍ</span><v-spacer></v-spacer></v-btn>
          <!-- <v-btn v-if="USER_ROLE !=='USER'" color="white" to="create-expense" elevation="0" block><span
              class="black--text">ເພີ່ມລາຍຈ່າຍ</span><v-spacer></v-spacer></v-btn> -->

          <!-- Gas -->

          <v-btn color="white" to="insert _gas" elevation="0" block><span
              class="black--text">ເພີ່ມສະຖານີປໍານໍ້າມັນ</span><v-spacer></v-spacer></v-btn>

          <!-- Gas -->
        </v-list>
      </v-menu>


      <!-- <v-btn color="white" class="ml-2" to="cars_14"><v-icon color="#999" size="18">mdi-car</v-icon><span
          class="black--text">ຂໍ້ມູນລົດ</span></v-btn> -->


      <!-- menu for only Financial  -->
      <v-menu v-if="USER_ROLE !== 'ADMIN' && USER_ROLE !== 'USER'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">

            <v-tab>
              <v-icon color="#fff" size="18">mdi-currency-usd</v-icon>
              ຈັດການກ່ຽວກັບລາຍຮັບ - ລາຍຈ່າຍ
            </v-tab>

            <v-icon color="#fff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="create-expense-type" elevation="0" block><span class="black--text">ເພີ່ມປະເພດລາຍຮັບ -
              ລາຍຈ່າຍ</span><v-spacer></v-spacer></v-btn>
          <v-btn color="white" to="create-expense" elevation="0" block><span class="black--text">ເພີ່ມລາຍຮັບ -
              ລາຍຈ່າຍ</span><v-spacer></v-spacer></v-btn>
        </v-list>
      </v-menu>
      <!-- menu for only Financial  -->

      <!-- menu ຂໍ້ມູນລົດ -->
      <v-menu v-if="USER_ROLE !== 'FINANCE'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-icon color="#fff" size="18">mdi-car-outline</v-icon> ຂໍ້ມູນລົດ
            <v-icon color="#fff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn block color="white" class="text-left" elevation="0" style="border-radius: 0px" to="/cars_14">
            ຂໍ້ມູນຫົວລົດ
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn block color="white" elevation="0" style="border-radius: 0px" to="/cars_footer">
            ຂໍ້ມູນຫາງລົດ
            <v-spacer></v-spacer>
          </v-btn>
        </v-list>
      </v-menu>

      <!-- menu ສ້າງໃບບິນ -->
      <v-menu offset-y v-if="USER_ROLE !== 'FINANCE'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">

            <v-tab>
              <v-icon color="#fff" size="18">mdi-text-box-check-outline</v-icon>
              ສ້າງໃບບິນ
              <!-- <v-badge color="#FF3D00" v-if="TOTAL!= '0'" :content='TOTAL' >
              </v-badge> -->
            </v-tab>

            <v-icon color="#fff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <div v-if="USER_ROLE !== 'ACCOUNT_POYLOD'">
            <v-btn v-if="USER_ROLE !== 'FINANCE'" block color="white" class="text-left" elevation="0"
              style="border-radius: 0px" to="/leave-cars-list">
              ອອກໃບປ່ອຍລົດ
              <v-chip class="ma-2" x-small color="teal" text-color="white" v-if="TOTAL_notiDetails != '0'">
                {{ TOTAL_notiDetails }}
              </v-chip>
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn v-if="USER_ROLE !== 'FINANCE'" color="white" block elevation="0" style="border-radius: 0px"
              to="/operation-list">
              ອອກໃບປະຕີບັດງານ
              <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_FORMANCE != '0'">
                {{ TOTAL_FORMANCE }}
              </v-chip>
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
              to="/invoice-list">
              ອອກໃບຮຽກເກັບເງິນ
              <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_INVOICE != '0'">
                {{ TOTAL_INVOICE }}
              </v-chip>
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
              to="/payment">
              ຮັບເງິນ
              <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_payStatus != '0'">
                {{ TOTAL_payStatus }}
              </v-chip>
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
              to="/payment-debt">
              ຮັບເງິນຍ້ອນຫຼັງ
              <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_totalOwe != '0'">
                {{ TOTAL_totalOwe }}
              </v-chip>
              <v-spacer></v-spacer>
            </v-btn>
            <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
              to="/allowance">
              ເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ
              <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_totalOwe != '0'">
                {{ TOTAL_totalOwe }}
              </v-chip>
              <v-spacer></v-spacer>
            </v-btn>
          </div>
        </v-list>
      </v-menu>

      <!-- <v-btn color="white" to="leave_cars" class="ml-2"><v-icon color="#999" size="18">mdi-car-arrow-right</v-icon><span
          class="black--text">ປ່ອຍລົດ</span></v-btn>  -->

      <!-- menu ລາຍງານ -->
      <v-menu style="height: 200px;" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="white" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-icon color="#fff" size="18">mdi-poll</v-icon>
            ລາຍງານ
            <v-icon color="#fff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
            to="/income_empeanses_car">
            1. ລາຍງານລາຍຮັບ - ລາຍຈ່າຍຂອງລົດ
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'FINANCE' || USER_ROLE !== 'USER'" color="white" block elevation="0"
            style="border-radius: 0px" to="/report_leave_cars">
            2. ລາຍງານໃບປ່ອຍລົດ
            <v-chip class="ma-2" x-small color="teal" text-color="white" v-if="TOTAL_notiDetails != '0'">
              {{ TOTAL_notiDetails }}
            </v-chip>
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'FINANCE' || USER_ROLE !== 'USER'" color="white" block elevation="0"
            style="border-radius: 0px" to="/report_operation">
            3. ລາຍງານໃບປະຕິບັດງານ
            <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_FORMANCE != '0'">
              {{ TOTAL_FORMANCE }}
            </v-chip>
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
            to="/report_invoice">
            4. ລາຍງານໃບຮຽກເກັບເງິນ
            <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_INVOICE != '0'">
              {{ TOTAL_INVOICE }}
            </v-chip>
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
            to="/report-payment">
            5. ລາຍງານໃບບິນຮັບເງິນ
            <v-chip class="ma-2" x-small color="red" text-color="white" v-if="TOTAL_payStatus != '0'">
              {{ TOTAL_payStatus }}
            </v-chip>
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
            to="/report-income">
            6. ລາຍງານລາຍຮັບ
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'USER'" color="white" block class="text-left" elevation="0"
            style="border-radius: 0px" to="/report_customers">
            7. ລາຍງານລູກຄ້າ
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
            to="/report_products">
            8. ລາຍງານສິນຄ້າ
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn color="white" block elevation="0" style="border-radius: 0px" to="/report_staft">
            9. ລາຍງານພະນັກງານຂັບລົດ
            <v-spacer></v-spacer>
          </v-btn>
          <v-btn v-if="USER_ROLE !== 'USER'" color="white" block elevation="0" style="border-radius: 0px"
            to="/report-customer-debt">
            10. ລາຍງານລູກຄ້າຕິດໜີ້
            <v-spacer></v-spacer>
          </v-btn>
          
          <v-btn v-if="USER_ROLE !== 'USER' "  color="white" block elevation="0" style="border-radius: 0px"
            to="/report-expense">
            11. ລາຍງານລາຍຮັບ - ລາຍຈ່າຍອື່ນໆ
            <v-spacer></v-spacer>
          </v-btn>
        </v-list>
      </v-menu>


      <v-spacer />
      <v-btn style="width: auto;" rounded elevation="0" text>
        <v-icon color="#fff">mdi-account</v-icon>
        <span class="white--text">{{ USER_NAME }}</span>
      </v-btn>


      <v-chip style="width: auto;" v-if="TOTAL_branchName">{{ branchDisplayName }}</v-chip>

      <v-btn style="background-color: #f44336;width: 100px; margin-left: 20px; " rounded @click="onLogOut" text
        elevation="0">
        <v-icon color="white">mdi-power</v-icon>
      </v-btn>



    </v-app-bar>
    <!-- <div v-if="USER_ROLE == 'FOR_DOCUMENT'" >
      <v-btn style =" background-color: blueviolet;width: 100px; margin-left: 20px; margin-top: 20px; " rounded @click="
      onLogOut" text elevation="0">
      <v-icon color="white">mdi-power</v-icon>
      </v-btn>
    </div> -->
    <div style="display: flex;">

      <div
        v-if="USER_ROLE == 'FOR_DOCUMENT_ADMIN' || USER_ROLE == 'BOR-HIN-KHUAT' || USER_ROLE == 'FOR_DOCUMENT' || USER_NAME == 'borhinkuad-konengua' || USER_ROLE == 'borhinkuad-sykhoun' || USER_ROLE == 'borhinkuad-tha' || USER_ROLE == 'borhinkuad-xiengkong' || USER_ROLE == 'INVENANSFINANCE'">
        <v-btn style="background-color: #f44336;width: 100px; margin-left: 20px; margin-top: 20px; " rounded
          @click="onLogOut" text elevation="0">
          <v-icon color="white">mdi-power</v-icon>
        </v-btn>
      </div>



      <div style="margin-top: 15px;margin-left: 15px;"
        v-if="USER_NAME == 'borhinkuad-konengua' || USER_ROLE == 'BOR-HIN-KHUAT' || USER_ROLE == 'borhinkuad-sykhoun' || USER_ROLE == 'borhinkuad-tha' || USER_ROLE == 'borhinkuad-xiengkong'">
        <v-chip style="width: auto;font-size: 25px;height: 50px;" v-if="TOTAL_branchName">{{ branchDisplayName
          }}</v-chip>
      </div>
    </div>



    <div class="content mt-5">
      <v-main class="bg pl-10 mr-10 ml-1 d-flex justify-center align-vertical">
        <div class="content mt-10">
          <Nuxt />

        </div>

      </v-main>
    </div>


  </v-app>
</template>

<script>

import swal from 'sweetalert2'
export default {
  data() {
    return {
      USER_ID: '',
      USER_NAME: '',
      USER_ROLE: '',
      TOTAL: '',
      TOTAL_INVOICE: '',
      TOTAL_FORMANCE: '',
      TOTAL_branchName: '',
      TOTAL_payStatus: '',
      TOTAL_totalOwe: '',
      TOTAL_notiDetails: '',
      loading_processing: false,
      getNotiTab3: {}
    }
  },
  computed: {
    branchDisplayName() {
      switch (this.TOTAL_branchName) {
        case 'Thakhaek':
          return 'ທ່າເເຂກ';
        case 'XiengKhouang':
          return 'ຊຽງຂວາງ';
        case 'vientiane':
          return 'ວຽງຈັນ';
        case 'Savannakhet':
          return 'ສະຫວັນນະເຂດ';
        default:
          return this.TOTAL_branchName;
      }
    }
  },
  mounted() {
    this.USER_ID = localStorage.getItem('USER_ID');
    this.USER_NAME = localStorage.getItem('USER_NAME');
    this.USER_ROLE = localStorage.getItem('USER_ROLE');
    this.total_count();
  },
  methods: {
    onPrint() {
      window.print();
    },
    onGoTo() {
      this.$router.push('/homepage');
    },
    onLogOut() {
      localStorage.clear();
      this.$router.push('/');
    },
    async total_count() {
      try {
        this.loading_processing = true;
        const data = await this.$axios.$post('/getNotiTab3.service', {
          toKen: localStorage.getItem('toKen')
        });
        this.loading_processing = false;
        this.TOTAL = data?.totalRow || '';
        this.TOTAL_INVOICE = data?.notiInvoice || '';
        this.TOTAL_FORMANCE = data?.notiPerForMance || '';
        this.TOTAL_branchName = data?.branchName || '';
        this.TOTAL_payStatus = data?.payStatus || '';
        this.TOTAL_notiDetails = data?.notiDetails || '';
        this.TOTAL_totalOwe = data?.totalOwe || '';
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          icon: 'error',
          text: error.message || 'An error occurred'
        });
        console.error(error);
      }
    }
  }
};
</script>
<style lang="scss">
.bg {
  background-color: white;
}

.cont {
  // padding-left: 70px;
  // padding-right: 85px;
  padding-top: 0px
}
</style>

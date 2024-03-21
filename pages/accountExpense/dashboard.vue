<template>
  <v-container>
    <!-- ໃບລາຍງານ -->
    <p class="font-size-25px back--text font-weight-bold text-center ">
      ລາຍງານ ກໍາໄລ ຂາດທຶນ
    </p>
    <v-row class="fill-height" align ="center" justify="center">
      <div class=" mr-10 ml-10 mb-10">
        <v-card class="mt-10 mr-10 ml-10 w-200 " elevation="2" rounded="lg">


          <v-btn class="-mt8 bb" fab dark color="orange">
            <v-icon color="white" size="66"> mdi-cash</v-icon>
          </v-btn>
          <p class="text-center -t8">ລາຍຮັບທັງໝົດ</p>

          <div class="mr-5 ml-10 " style="display:flex">
            <p>ທັງໝົດ : </p>
            <v-tab> </v-tab>
            <h1 class="green--text text-center"> {{ groupPayCarData.amount_Done }}LAK</h1>
          </div>

        </v-card>
        <v-card class="mt-10 mr-10 ml-10 w-200 " elevation="2" rounded="lg">


          <v-btn class="-mt8 bb" fab dark color="blue">
            <v-icon color="white" size="66">mdi-cash-plus </v-icon>
          </v-btn>
          <p class="text-center -t8">ລາຍຈ່າຍທັງໝົດ</p>

          <div class="mr-5 ml-10 " style="display:flex">
            <p>ທັງໝົດ :</p>
            <v-tab></v-tab>
            <h1 class="green--text text-center "> {{ groupPayCarData.amount_NoDone }} LAK</h1>


          </div>
          <p class="text-center fs-15-red">ລວມຄ່ານໍ້າມັນເເລະເບ້ຍລ້ຽງ</p>

        </v-card>
        <v-card class="mt-10 mr-10 ml-10 w-200 " elevation="2" rounded="lg">


          <v-btn class="-mt8 bb" fab dark color="green ">
            <v-icon color="white" size="60">mdi-account-cash</v-icon>
          </v-btn>
          <p class="text-center -t8 ">ກໍາໄລ</p>

          <div class="mr-5 ml-10 " style="display:flex">
            <p>ທັງໝົດ :</p>
            <v-tab></v-tab>
            <h1 class="green--text text-center "> {{ groupPayCarData.amt_Done }} LAK</h1>
          </div>


        </v-card>
        <v-card class="mt-10 mr-10 ml-10 w-200 " elevation="2" rounded="lg">


          <v-btn class="-mt8 bb" fab dark color="green ">
            <v-icon color="white" size="60">mdi-account-cash</v-icon>
          </v-btn>
          <p class="text-center -t8 ">ຂາດທຶນ</p>

          <div class="mr-5 ml-10 " style="display:flex" >
            <p >ທັງໝົດ :</p>
            <v-tab></v-tab>
            <h1 class="red--text text-center"> {{ groupPayCarData.amt_Done }} LAK</h1>
          </div>


        </v-card>
      </div>


    </v-row>







    <!-- Data -->
    <div style="width:100%;display:flex" class="pt-2">

      <div class="d-flex align-center">
        <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false" :return-value.sync="start_date"
          transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ" append-icon="mdi-calendar"
              readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="start_date" no-title scrollable @input="$refs.start_menu.save(start_date)">
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
      </div>
      <div class="d-flex align-center pl-2">
        <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false" :return-value.sync="end_date"
          transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ" append-icon="mdi-calendar"
              readonly v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
          </template>
          <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">

          </v-date-picker>
        </v-menu>
      </div>
      <div class="ml-2 pt-1">
        <v-btn color="#90A4AE" elevation="0" class="white--text" @click="onSearcReport">
          <v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ
        </v-btn>
      </div>


    </div>

    <p class="font-size-25px back--text font-weight-bold text-center mb-10 mt-10">
      ລາຍງານລວມ
    </p>
    <v-row style="display:flex" class="fill-height flex-n" align="center" justify="center">

      <v-col class="gi1 nl-1 mr-1 mt-1 mb-1 ">
        <v-col class="bg-w">
          <p class="font-size-19px">ລາຍງານການປ່ອຍລົດ</p>
          <v-col style="display:flex " v-if="groupAData">

            <v-col>
              <p class="fs-15 ">ໃບບິນທັງໝົດ : </p>
              <p class="fs-15">ອອກໃບປະຕິບັບງານເເລ້ວ :</p>
              <p class="fs-15">ຍັງບໍ່ອອກໃບປະຕິບັບງານ :</p>
            </v-col>

            <v-col>
              <p class="g20 mb-10">{{ groupAData.amt_All }}</p>
              <p class="g20 mb-10">{{ groupAData.amount_Done }}</p>
              <p class="g20 ">{{ groupAData.amt_NoDone }}</p>

            </v-col>
          </v-col>

          <v-divider class="my-4 "></v-divider>

          <p class="fs-15">ຍອດທີຈ້າຍເເລ້ວ :
            <!-- Display other properties of groupAData similarly -->
          <p class="g20"> {{ groupAData.amt_Done }}</p>
          </p>
          <v-divider></v-divider>
          <p class="fs-15">ຍອດຄົງຄາງທີຕ້ອງຈາຍເປັນເງີນ :
            <!-- Display other properties of groupAData similarly -->

          <p class="r20">{{ groupAData.amount_NoDone }}</p>
          </p>

          <v-row justify="end"> <v-col cols="12" md="6" align="right"> <v-btn color="#00A3FF" elevation="0"
                class="white--text " to="/report_leave_cars">ລາຍລະອຽດ</v-btn></v-col></v-row>


        </v-col>

      </v-col>
      <v-col class="gi2 nl-1 mr-1 mt-1 mb-1 ">
        <v-col class="bg-w">
          <p class="font-size-19px">ລາຍງານໃບປະຕິບັດງານ</p>
          <v-col style="display:flex " v-if="groupBData">

            <v-col>
              <p class="fs-15 ">ອອກໃບເກັບເງິນທັງໝົດ :</p>
              <p class="fs-15">ອອກໃບເກັບເງິນສໍາເເລ້ວ :</p>
              <p class="fs-15">ຍັງບໍ່ອອກໃບເກັບເງິນ :</p>
            </v-col>

            <v-col>
              <p class="g20 mb-10">{{ groupBData.amt_All }}</p>
              <p class="g20 mb-10">{{ groupBData.amount_Done }}</p>
              <p class="g20">{{ groupBData.amt_NoDone }}</p>

            </v-col>
          </v-col>

          <v-divider class="my-4"></v-divider>

          <p class="fs-15">ລາຍຮັບຖັງໝົດ :
            <!-- Display other properties of groupAData similarly -->
          <p class="g20"> {{ groupBData.amt_Done }}</p>
          </p>
          <v-divider></v-divider>
          <p class="fs-15">ລາຍຮັບທີຍັງ :
            <!-- Display other properties of groupAData similarly -->
          <p class="r20">{{ groupBData.amount_NoDone }}</p>
          </p>

          <v-row justify="end"> <v-col cols="12" md="6" align="right"> <v-btn color="#00A3FF" elevation="0"
                class="white--text " to="/report_leave_cars">ລາຍລະອຽດ</v-btn></v-col></v-row>


        </v-col>

      </v-col>

      <v-col class="gi3 nl-1 mr-1 mt-1 mb-1 ">
        <v-col class="bg-w">
          <p class="font-size-19px">ລາຍງານໃບຮຽກເກັບເງິນ</p>
          <v-col style="display:flex " v-if="groupCData">

            <v-col>
              <p class="fs-15 ">ໃບຮຽກເກັບເງິນທັງໝົດ : </p>
              <p class="fs-15">ໃບຮຽກເກັບເງິນທີ່ໄດ້ເງິນ :</p>
              <p class="fs-15">ໃບຮຽກເກັບເງິນທີ່ລໍຊໍາລະ :</p>
            </v-col>

            <v-col>
              <p class="g20 mb-10">{{ groupCData.amt_All }}</p>
              <p class="g20 mb-10">{{ groupCData.amount_Done }}</p>
              <p class="g20">{{ groupCData.amt_NoDone }}</p>

            </v-col>
          </v-col>

          <v-divider class="my-4"></v-divider>

          <p class="fs-15">ເກັບເງິນໄດ້ :
            <!-- Display other properties of groupAData similarly -->
          <p class="g20"> {{ groupCData.amt_Done }}</p>
          </p>
          <v-divider></v-divider>
          <p class="fs-15">ລໍຖ້າສໍາລະ :
            <!-- Display other properties of groupAData similarly -->

          <p class="r20">{{ groupCData.amount_NoDone }}</p>
          </p>

          <v-row justify="end"> <v-col cols="12" md="6" align="right"> <v-btn color="#00A3FF" elevation="0"
                class="white--text " to="/report_invoice">ລາຍລະອຽດ</v-btn></v-col></v-row>


        </v-col>

      </v-col>
      <v-col class="gi4 nl-1 mr-1 mt-1 mb-1 ">
        <v-col class="bg-w">
          <p class="font-size-19px">ລາຍງານໃບບິນຮັບເງິນ</p>
          <v-col style="display:flex " v-if="groupDData">

            <v-col>
              <p class="fs-15 ">ໃບບິນຮັບເງິນທັງໝົດ : </p>
              <p class="fs-15">ໃບບິນທີສໍາລະ :</p>
              <p class="fs-15">ຄ່າງສໍາລະ :</p>
            </v-col>

            <v-col>
              <p class="g20 mb-10">{{ groupDData.amt_All }}</p>
              <p class="g20 mb-10">{{ groupDData.amount_Done }}</p>
              <p class="g20 ">{{ groupDData.amt_NoDone }}</p>

            </v-col>
          </v-col>

          <v-divider class="my-4 "></v-divider>

          <p class="fs-15">ເກັບເງິນໄດ້ເເລ້ວ :
            <!-- Display other properties of groupAData similarly -->
          <p class="g20"> {{ groupDData.amt_Done }}</p>
          </p>
          <v-divider></v-divider>
          <p class="fs-15">ຄ່າງສໍາລະ :
            <!-- Display other properties of groupAData similarly -->

          <p class="r20">{{ groupDData.amount_NoDone }}</p>
          </p>

          <v-row justify="end"> <v-col cols="12" md="6" align="right"> <v-btn color="#00A3FF" elevation="0"
                class="white--text " to="/payment">ລາຍລະອຽດ</v-btn></v-col></v-row>


        </v-col>

      </v-col>


    </v-row>

    <v-divider class="my-4 mt-10 mb-10"></v-divider>
    <v-card class="mt-5 mb-10 fs25">
      <v-row class="fill-height" align="center" justify="center">
        <div class="mt-10 mr-10 ml-10 mb-10">
          <v-card class="mt-10 mr-10 ml-10 w-100 ">


            <v-btn class="-mt8 bb" fab dark color="orange">
              <v-icon color="white" size="66"> mdi-cash</v-icon>
            </v-btn>
            <p class="text-center -t8">ໂຕເລກລາຍຮັບຂອງລົດ</p>

            <div class="mr-5 ml-10 " style="display:flex">
              <p>ລາຍຮັບທັງໝົດ :</p>


              <p class="green--text text-center ">{{ groupPayCarData.amount_Done }}</p>



            </div>
            <p class="text-center fs-15-red">ທີຍັງບໍ່ໄດ້ຕັດລາຍຈ່າຍ</p>
          </v-card>
          <v-card class="mt-10 mr-10 ml-10 w-100 ">


            <v-btn class="-mt8 bb" fab dark color="blue">
              <v-icon color="white" size="66">mdi-cash-plus </v-icon>
            </v-btn>
            <p class="text-center -t8">ໂຕເລກທີຈ່າຍຈິງ</p>

            <div class="mr-5 ml-10 " style="display:flex">
              <p>ທັງໝົດ :</p>


              <p class="green--text text-center ">{{ groupPayCarData.amount_NoDone }}</p>

            </div>
            <p class="text-center fs-15-red">ໂຕເລກທີລູກຄ້າຈ່າຍເເລ້ວ</p>

          </v-card>
          <v-card class="mt-10 mr-10 ml-10 w-100 ">


            <v-btn class="-mt8 bb" fab dark color="green ">
              <v-icon color="white" size="60">mdi-account-cash</v-icon>
            </v-btn>
            <p class="text-center -t8 ">ໂຕເລກທີລໍຖ້າສໍາລະຈາກລູກຄ້າ</p>

            <div class="mr-5 ml-10 " style="display:flex">
              <p>ທັງໝົດ :</p>

              <p class="green--text text-center ">{{ groupPayCarData.amt_Done }}</p>



            </div>
            <p class="text-center fs-15-red">ໂຕເລກທີລູກຄ້າຕ້ອງສໍາລະຕໍ່</p>

          </v-card>
        </div>

        <div class="mt-10 mr-10 ml-10 mb-10">
          <v-card class="mt-10 mr-10 ml-10 w-100 ">


            <v-btn class="-mt8 bb" fab dark color=" red">
              <v-icon color="white" size="55">mdi-cash-multiple</v-icon>
            </v-btn>
            <p class="text-center -t8">ລາຍຈ່າຍເບ້ຍລ້ຽງທັງໝົດ</p>

            <div class="mr-5 ml-10 " style="display:flex">
              <p>ລາຍຈ່າຍທັງໝົດ :</p>


              <p class="green--text text-center ">{{ groupPayStaffData.amount_Done }}</p>
            </div>
            <p class="text-center fs-15-red">ບໍ່ລວມຄ່ານໍ້າມັນ</p>

          </v-card>
          <v-card class="mt-10 mr-10 ml-10 w-100 ">


            <v-btn class="-mt8 bb" fab dark color="red">
              <v-icon color="white" size="66">mdi-cash-minus</v-icon>
            </v-btn>
            <p class="text-center -t8">ຍອດທີຈ້າຍເເລ້ວ</p>

            <div class="mr-5 ml-10 " style="display:flex">
              <p>ທັງໝົດ :</p>

              <p class="green--text text-center ">{{ groupPayStaffData.amount_NoDone
              }}</p>

            </div>
            <p class="text-center fs-15-red">ທີຈ່າຍໃຫ້ພະນັກງານ</p>

          </v-card>
          <v-card class="mt-10 mr-10 ml-10 w-100 ">


            <v-btn class="-mt8 bb" fab dark color="red">
              <v-icon color="white" size="60">mdi-cash-multiple</v-icon>
            </v-btn>
            <p class="text-center -t8">ຍອດຄົງຄາງທີຕ້ອງຈາຍ</p>

            <div class="mr-5 ml-10 " style="display:flex">
              <p>ທັງໝົດ : </p>



              <p class="green--text text-center ">{{ groupPayStaffData.amt_Done }}</p>

            </div>
            <p class="text-center fs-15-red">ໂຕເລກທີລໍຖ້າສໍາລະໃຫ້ພະນັກງານ</p>

          </v-card>

        </div>
      </v-row>
    </v-card>

    <v-divider class="my-4 mt-10 mb-10"></v-divider>

    <p class="font-size-25px back--text font-weight-bold text-center mb-10 mt-10">
      ລາຍງານສະຖານະລົດ
    </p>
    <v-row class="fill-height mb-10" align="center" justify="center">
      <v-col class="gi5 nl-1 mr-1 mt-1 mb-1 ">
        <v-card class=" text-center ">
          <p>ຫົວລົດ ທ້າຍລົດ ທີຍັງວ່າງ</p>
          <v-card style="display:flex ">

            <v-col class="fs-15 mr-10 ml-10">
              <p>ຫົວລົດ :</p>
              <p>ທ້າຍລົດ :</p>


            </v-col>
            <v-col>
              <p class="green--text text-center ">{{ groupCarFreeData.headCarTotal
              }}</p>

              <p class="green--text text-center ">{{ groupCarFreeData.footerCarTotal
              }}</p>

              <v-row> <v-col cols="12" md="6" align="right"> <v-btn color="#00A3FF" elevation="0" class="white--text "
                    to="/report-payment">ລາຍລະອຽດ</v-btn></v-col></v-row>
            </v-col>


          </v-card>
        </v-card>
      </v-col>
      <v-col class="gi6 nl-1 mr-1 mt-1 mb-1">
        <v-card class=" text-center ">

          <p>ຫົວລົດ ທ້າຍລົດ ທີກໍາລັງໃຊງານເເລ້ວ</p>
          <v-card style="display:flex ">

            <v-col class="fs-15 mr-10 ml-10">
              <p>ຫົວລົດ :</p>
              <p>ທ້າຍລົດ :</p>


            </v-col>
            <v-col>
              <p class="green--text text-center ">{{ groupCarNoFreeData.headCarTotal
              }}</p>

              <p class="green--text text-center ">{{ groupCarNoFreeData.footerCarTotal
              }}</p>

              <v-row> <v-col cols="12" md="6" align="right"> <v-btn color="#00A3FF" elevation="0" class="white--text "
                    to="/report-payment">ລາຍລະອຽດ</v-btn></v-col></v-row>
            </v-col>


          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {
      start_date: "",
      end_date: "",
      start_menu: false, // Add this line
      end_menu: false, // And this line
      loading_processing: false,
      staft_data_list: [],
      amountDone: null, // Added from second snippet
      amountNoDone
        : null, // Added from second snippet

      nameRules: [
        v => !!v || 'Field is required',
        // Add other rules here if necessary
      ],


      groupAData: {},
      groupBData: {},
      groupCData: {},
      groupDData: {},
      groupPayCarData: {},
      groupPayStaffData: {},
      groupCarNoFreeData: {},
      groupCarFreeData: {},

      // other data properties...
    };
  },
  mounted() {
    this.onSearcReport();
  },
  methods: {
    edit(key) {
      // Navigate to /dashboard with parameters
      this.$router.push({
        path: '/dashboard',
        query: {
          key: key,
          startDate: this.start_date,
          endDate: this.end_date
        }
      });
    },
    onSearcReport() {
      this.loading_processing = true;
      try {
        let data = {
          startDate: this.start_date,
          endDate: this.end_date
        };
        this.$axios.$post('/DashBoard', data).then((response) => {
          if (response?.status === '00') {
            this.groupAData = response.groupA?.[0] || {};
            this.groupBData = response.groupB?.[0] || {};
            this.groupCData = response.groupC?.[0] || {};
            this.groupDData = response.groupD?.[0] || {};
            this.groupPayCarData = response.groupPayCar?.[0] || {};
            this.groupPayStaffData = response.groupPayStaff?.[0] || {};
            this.groupCarFreeData = response.groupCarFree?.[0] || {};
            this.groupCarNoFreeData = response.groupCarNoFree?.[0] || {};
            ;

            // Add any additional handling for the response here
          } else {
            // Handle the case where the data is not in the expected format
          }
          this.loading_processing = false;
        }).catch((error) => {
          this.loading_processing = false;
          swal.fire({
            icon: 'error',
            text: error.message || 'An error occurred'
          });
        });
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          icon: 'error',
          text: error.message || 'An error occurred'
        });
      }
    }
    // ... add any other methods here
  }
};

</script>
<style scoped>
.font-size-25px {
  font-size: 25px !important;
  font-weight: 400;
  text-align: center;
}

.fs25 {
  font-size: 25px !important;
  font-weight: 400;

}

.custom-font-18px {
  font-size: 18px !important;
}

.font-size-19px {
  font-size: 19px !important;
  font-weight: 400;
  text-align: center;
}

.fs-15 {
  font-size: 15px !important;
  font-weight: 100;
  text-align: start;
}

.fs-15-red {
  font-size: 15px !important;
  font-weight: 100;
  text-align: start;
  color: red;
}

.rounded {
  border-radius: 15px;
}

.w-100 {
  width: 400px;

}

.h-80 {
  width: 80px;
}

.-mt8 {
  margin-left: -35px;
  /* Moves the element 20px to the left */
  margin-top: -25px;
  /* Moves the element 10px upwards */

}

.-t8 {
  margin-top: -40px;
  /* Moves the element 10px upwards */

}

.gi1 {
  background-image: linear-gradient(#ec5355, #ae4c9e);
  border-radius: 10px;
}

.gi2 {
  background-image: linear-gradient(#F175E7, #b64dee);
  border-radius: 10px;
}

.gi3 {
  background-image: linear-gradient(#C001B9, #A104D5);
  border-radius: 10px;
}

.gi4 {
  background-image: linear-gradient(#3664FF, #03AFEC);
  border-radius: 10px;
}

.gi5 {
  background-image: linear-gradient(#08B19C, #08B19C);
  border-radius: 10px;
}

.gi6 {
  background-image: linear-gradient(#4EB29C, #97D717);
  border-radius: 10px;
}

.bg-w {
  background: rgb(255, 255, 255);
  border-radius: 10px;
}


.bb {
  width: 80px;
  /* Adjust width as needed */
  height: 80px;
  /* Adjust height as needed */

}

.r20 {
  font-size: 20px !important;
  font-weight: 100;
  text-align: end;
  color: red;
}

.g20 {
  font-size: 20px !important;
  font-weight: 100;
  text-align: end;
  color: green;
}
</style>
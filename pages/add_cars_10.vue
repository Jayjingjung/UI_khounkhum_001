<template>
  <div>
    <!-- General car info -->
    <v-card color="pl-10 pr-10" elevation="0">
      <v-row class="pa-2">
        <!-- <v-btn fab small color="indigo" to="cars_10">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn> -->
        <v-btn fab small width="30" elevation="0" height="30" color="#338ABF" to="cars_10">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <span class="top">ເພີ່ມຂໍ້ມູນລົດ 10 ລໍ້</span>
      </v-row>
      <Height />
      <Height />
      <v-card class="">
        <v-card-title>ຂໍ້ມູນລົດ:</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" md="4" sm="4">
              <v-text-field label="ເລກທະບຽນລົດ" outlined dense v-model="ins_plateNo"></v-text-field>
            </v-col>
            <v-col cols="6" md="4" sm="4"><v-text-field label="ຍີ່ຫໍ້ລົດ" outlined dense
                v-model="ins_modelNo"></v-text-field></v-col><v-col cols="6" md="4" sm="4">
              <v-text-field label="ລົດປີ" outlined dense v-model="ins_year"></v-text-field>
            </v-col>
          </v-row>
          <div class="margintop">
            <v-row>
              <v-col cols="6" md="4" sm="4">
                <v-text-field label="ປະເພດລົດ" outlined dense v-model="ins_vehiName"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="4"><v-text-field label="ເລກຈັກ" outlined dense
                  v-model="ins_engNo"></v-text-field></v-col><v-col cols="6" md="4" sm="4">
                <v-text-field label="ເລກຖັງ" outlined dense v-model="ins_chassNo"></v-text-field></v-col>
            </v-row>
          </div>
          <div class="margintop">
            <v-row>
              <v-col cols="6" md="4" sm="4">
                <v-text-field label="ເລກປະກັນໄພ" outlined dense v-model="ins_idId"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="4"><v-text-field label="ວັນທີປະກັນໄພໝົດ" outlined dense
                  v-model="ins_dateExpIs"></v-text-field></v-col>
              <v-col cols="6" md="4" sm="4"><v-text-field label="ວັນທີເຕັກນິກໝົດ" outlined dense
                  v-model="ins_dateExpTep"></v-text-field></v-col>
            </v-row>
          </div>
          <div class="margintop">
            <v-row>
              <v-col cols="6" md="4" sm="4">
                <v-radio-group inline v-model="ins_glass">
                  <v-row class="pl-4">
                    <span>ນໍ້າມັນລົດໃຊ້</span>
                    <Width />
                    <v-radio label="ແອັດຊັງ" value="ແອັດຊັງ"></v-radio>
                    <Width />
                    <v-radio label="ກະຊວນ" value="ກະຊວນ"></v-radio>
                  </v-row>
                </v-radio-group>
              </v-col>
              <v-col cols="6" md="4" sm="4">
                <!-- <v-file-input label="ອັບໂຫຼດຮູູບລົດ" outlined dense></v-file-input> -->
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <Height />
      <Height />
      <v-card elevation="1">
        <v-card-title>ຂໍ້ມູນຢາງລົດ:</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" md="4" sm="4">
              <Height />
              <Height />
              <Height />
              <Height />
              <!-- Left -->
              <div class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_L01"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_L01Exp"></v-text-field>
              </div>
              <div style="padding-top: 50px" class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Lout01"></v-text-field>
                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Lout01_Exp"></v-text-field>
              </div>
              <div class="d-flex" style="margin-top: -20px">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Lin01"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Lin01_Exp"></v-text-field>
              </div>
              <div style="padding-top: 10px" class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Lout02"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Lout02_Exp"></v-text-field>
              </div>
              <div style="margin-top: -20px" class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Lin02"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Lin02_Exp"></v-text-field>
              </div>
            </v-col>
            <v-col>
              <div class="text-center">
                <img class="mx-auto" src="../assets/images/head10.png" width="300" height="450" />
              </div>
            </v-col>
            <!-- Right -->
            <v-col cols="6" md="4" sm="4">
              <Height />
              <Height />
              <Height />
              <Height />
              <div class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Ro1"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Ro1Exp"></v-text-field>
              </div>

              <!-- /////////////////////////////// -->
              <div style="padding-top: 50px" class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Rout01"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Rout01_Exp"></v-text-field>
              </div>
              <div style="margin-top: -20px" class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Rin01"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Rin01_Exp"></v-text-field>
              </div>
              <div class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Rout02"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Rout02_Exp"></v-text-field>
              </div>
              <div style="margin-top: -20px" class="d-flex">
                <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="ins_Rin02"></v-text-field>

                <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="ins_Rin02_Exp"></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" elevation="0">
          <v-icon color="white">mdi-close</v-icon>
          <span class="white--text">ຍົກເລິກ</span>
        </v-btn>
        <v-btn color="#338ABF" elevation="0" @click="onInserTruct">
          <v-icon color="white">mdi-check</v-icon>
          <span class="white--text">ບັນທຶກ</span>
        </v-btn>
      </v-card-actions>

      <Height />
      <Height />
      <Height />
    </v-card>
    <Height />
    <Height />
    <Height />
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      //insert
      ins_plateNo: '',
      ins_modelNo: '',
      ins_vehiName: '',
      ins_engNo: '',
      ins_chassNo: '',
      ins_year: '',
      ins_idId: '',
      ins_dateExpIs: '',
      ins_glass: '',
      ins_dateExpTep: '',
      ins_userId: '',
      //head R L
      ins_L01: '',
      ins_L01Exp: '',
      ins_Ro1: '',
      ins_Ro1Exp: '',
      //Left
      ins_Lin01: '',
      ins_Lin01_Exp: '',
      ins_Lin02: '',
      ins_Lin02_Exp: '',
      ins_Lin03: '',
      ins_Lin03_Exp: '',
      ins_Lout01: '',
      ins_Lout01_Exp: '',
      ins_Lout02: '',
      ins_Lout02_Exp: '',
      ins_Lout03: '',
      ins_Lout03_Exp: '',
      //right
      ins_Rin01: '',
      ins_Rin01_Exp: '',
      ins_Rin02: '',
      ins_Rin02_Exp: '',
      ins_Rin03: '',
      ins_Rin03_Exp: '',
      ins_Rout01: '',
      ins_Rout01_Exp: '',
      ins_Rout02: '',
      ins_Rout02_Exp: '',
      ins_Rout03: '',
      ins_Rout03_Exp: '',
    }
  },
  methods: {
    async onInserTruct() {
      try {
        let data = {
          plateNo: this.ins_plateNo,
          modelNo: this.ins_modelNo,
          vehiName: this.ins_vehiName,
          engNo: this.ins_engNo,
          chassNo: this.ins_chassNo,
          year: this.ins_year,
          isId: this.ins_idId,
          dateExpIs: this.ins_dateExpIs,
          glass: this.ins_glass,
          dateExpTep: this.ins_dateExpTep,
          userId: localStorage.getItem('USER_ID'),
          l01: this.ins_L01,
          l01Exp: this.ins_L01Exp,
          r01: this.ins_Ro1,
          r01Exp: this.ins_Ro1Exp,
          lIn01: this.ins_Lin01,
          lIn01Exp: this.ins_Lin01_Exp,
          lIn02: this.ins_Lin02,
          lIn02Exp: this.ins_Lin02_Exp,
          lIn03: '',
          lIn03Exp: '',
          lOut01: this.ins_Lout01,
          lOut01Exp: this.ins_Lout01_Exp,
          lOut02: this.ins_Lout02,
          lOut02Exp: this.ins_Lout02_Exp,
          lOut03: '',
          lOut03Exp: '',
          rIn01: this.ins_Rin01,
          rIn01Exp: this.ins_Rin01_Exp,
          rIn02: this.ins_Rin02,
          rIn02Exp: this.ins_Rin02_Exp,
          rIn03: '',
          rIn03Exp: '',
          rOut01: this.ins_Rout01,
          rOut01Exp: this.ins_Rout01_Exp,
          rOut02: this.ins_Rout02,
          rOut02Exp: this.ins_Rout02_Exp,
          rOut03: '',
          rOut03Exp: '',
        }

        if (
          this.ins_plateNo == '' ||
          this.ins_modelNo == '' ||
          this.ins_vehiName == '' ||
          this.ins_engNo == '' ||
          this.ins_chassNo == '' ||
          this.ins_year == '' ||
          this.ins_idId == '' ||
          this.ins_dateExpIs == '' ||
          this.ins_glass == '' ||
          this.ins_dateExpTep == '' ||
          this.ins_L01 == '' ||
          this.ins_L01Exp == '' ||
          this.ins_Lin01 == '' ||
          this.ins_Lin01_Exp == '' ||
          this.ins_Lin02 == '' ||
          this.ins_Lin02_Exp == '' ||
          this.ins_Lout01 == '' ||
          this.ins_Lout01_Exp == '' ||
          this.ins_Lout02 == '' ||
          this.ins_Lout02_Exp == '' ||
          this.ins_Ro1 == '' ||
          this.ins_Ro1Exp == '' ||
          this.ins_Rin01 == '' ||
          this.ins_Rin01_Exp == '' ||
          this.ins_Rin02 == '' ||
          this.ins_Rin02_Exp == '' ||
          this.ins_Rout01 == '' ||
          this.ins_Rout01_Exp == '' ||
          this.ins_Rout02 == '' ||
          this.ins_Rout02_Exp == ''
        ) {
          swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ',
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
        } else {
          console.log('send:', data)
          await this.$axios.$post('StoreTruck', data).then((data) => {
            console.log(data)
            if (data?.status == '00') {
              swal.fire({
                title: 'ສຳເລັດ',
                icon: 'success',
                allowOutsideClick: false,

              })
            } else {
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
        }
      } catch (error) {
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
  },
}
</script>
<style lang="scss">
.margintop {
  margin-top: -30px;
}

.top {
  margin-top: 5px;
  margin-left: 10px;
}

.centers {
  justify-content: center;
  background-color: red;
  justify-items: center;
}
</style>

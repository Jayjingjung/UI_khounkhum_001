<template>
  <div class="pt-5">
    <v-card class="x">

      <v-dialog v-model="loading_processing" persistent width="55">
        <v-card width="55" height="55" class="pt-3 pl-3">
          <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
        </v-card>
      </v-dialog>

      <v-card class="card-shadow mx-auto" style="height:100%;overflow-x: auto;">
        <v-card-title style="display:flex;background-color:#E57373;color:white">
          <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="carindek_hr">
            <v-icon color="#E57373">mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          ແບບຟອມເພີ່ມ ຂໍ້ມູນ ລົດບໍລິຫານ
          <v-spacer></v-spacer>
        </v-card-title>


        <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
          <v-form v-model="valid" lazy-validation ref="form">
            <v-row>
              <height />

              <v-col cols="3" align="center" class="mt-4">
                <v-card class="text-center" max-width="300px">
                  <img :src="imagePreview" height="220px" cover>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="3" md="2" sm="2">
                    <v-file-input label="ອັບໂຫຼດຮູບ" outlined dense prepend-icon="mdi-camera"
                      append-inner-icon="mdi-card-account-details" background-color="#f5f5f5" v-model="imageaddcar"
                      @change="previewImage"></v-file-input>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ປ້າຍທະບຽນລົດ" dense outlined background-color="#f5f5f5"
                      v-model="license_plate"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ຊື່ລະຫັດຫມໍ້ໄຟ" dense outlined background-color="#f5f5f5"
                      v-model="battery_code_name"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ບ່ອນນັ່ງຜູ້ໂດຍສານ" dense outlined background-color="#f5f5f5"
                      v-model="sitPosition_amount"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" md="2" sm="2">
                    <v-menu v-model="licensePlateEndDateMenu" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y>
                      <template v-slot:activator="{ on }">
                        <v-text-field dense outlined v-model="formattedLicensePlateEndDate" label="ວັນໝົດອາຍຸ ໃບທະບຽນ"
                          readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="license_plate_end" no-title scrollable
                        @input="updateLicensePlateEndDate"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-menu v-model="licensePlateStartDateMenu" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y>
                      <template v-slot:activator="{ on }">
                        <v-text-field dense outlined v-model="formattedLicensePlateStartDate" label="ວັນອອກໃບທະບຽນ"
                          readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="license_plate_start" no-title scrollable
                        @input="updateLicensePlateStartDate"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ປ້ອນລົດປີ" dense outlined background-color="#f5f5f5"
                      v-model="car_year"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ປະເພດລົດ" dense outlined background-color="#f5f5f5"
                      v-model="car_type"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ປ້ອນຍີ່ຫໍ້ລົດ" dense outlined background-color="#f5f5f5"
                      v-model="car_brand"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ເລກຈັກ" dense outlined background-color="#f5f5f5"
                      v-model="lekJuk"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* serial_tire_second" dense outlined background-color="#f5f5f5"
                      v-model="serial_tire_second"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ເລກຖັງ" dense outlined background-color="#f5f5f5"
                      v-model="lekThung"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ສີລົດ" dense outlined background-color="#f5f5f5"
                      v-model="carColor"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ໄຟໜ້າ" dense outlined background-color="#f5f5f5"
                      v-model="font_light"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ໄຟຫລັງ" dense outlined background-color="#f5f5f5"
                      v-model="back_light"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ແວ່ນ ເບີ່ງທາງຫລັງ" dense outlined background-color="#f5f5f5"
                      v-model="millor_back"></v-text-field>
                  </v-col>
                  <v-col cols="3" md="2" sm="2">
                    <v-text-field label="* ແວ່ນ ເບີ່ງທາງຂ້າງ" dense outlined background-color="#f5f5f5"
                      v-model="millor_side"></v-text-field>
                  </v-col>
                </v-row>



              </v-col>
            </v-row>
            <v-card class="card-shadow mx-auto">
              <v-card-title style="display:flex;background-color:#E57373;color:white">
               
                <v-spacer></v-spacer>
                ແບບຟອມເພີ່ມ ຂໍ້ມູນ ລົດບໍລິຫານ
                <v-spacer></v-spacer>

              </v-card-title>
              <v-row>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ເລກໄມລ໌ປັດຈຸບັນ" dense outlined background-color="#f5f5f5"
                    v-model="car_mileage_now"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* cc ຄວາມແຮງລົດຫົວໜ່ວຍ ເປັນ
" dense outlined background-color="#f5f5f5" v-model="cc"></v-text-field>
                </v-col>

                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateLeanGia" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLLeanGia" label="ລີນເກຍ" readonly
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="leanGia" no-title scrollable
                      @input="updateLicensePlateLeanGia"></v-date-picker>
                  </v-menu>
                </v-col>


                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateLeanFuengThaiy" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="leanFuengThaiy" label="leanFuengThaiy" readonly
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="leanFuengThaiy" no-title scrollable
                      @input="updateLicensePlateLeanFuengThaiy"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-select label="* ນໍ້າມັນ" dense outlined background-color="#f5f5f5" v-model="oil"
                    :items="oilOptions">
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ເລກປະກັນໄພລາວ" dense outlined background-color="#f5f5f5"
                    v-model="insurance_Lao"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ເລກປະກັນໄພຫວຽດ" dense outlined background-color="#f5f5f5"
                    v-model="insurance_viet"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ເລກປະກັນໄພໄທ" dense outlined background-color="#f5f5f5"
                    v-model="insurance_thai"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ນໍ້າໜັກລົດລວມ" dense outlined background-color="#f5f5f5"
                    v-model="total_weigh_car"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateInsurance_Lao_expireDate" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLicensePlateInsurance_Lao_expireDate"
                        label="ວັນໝົດອາຍຸ ປະກັນໄພລາວ " readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="insurance_Lao_expireDate" no-title scrollable
                      @input="updateLicensePlateInsurance_Lao_expireDate"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateInsurance_viet_expireDate" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLicensePlateInsurance_viet_expireDate"
                        label="ວັນໝົດອາຍຸ ປະກັນໄພຫວຽດ" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="insurance_viet_expireDate" no-title scrollable
                      @input="updateLicensePlateInsurance_viet_expireDate"></v-date-picker>
                  </v-menu>
                </v-col>


                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateInsurance_thai_expireDate" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLicensePlateInsurance_thai_expireDate"
                        label=" ວັນໝົດອາຍຸ ປະກັນໄພໄທ " readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="insurance_thai_expireDate" no-title scrollable
                      @input="updateLicensePlateInsurance_thai_expireDate"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateTechnic_check_dateStart" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLTechnic_check_dateStart"
                        label="ວັນທີ ໃບກວດກາເຕັກນິກລ່າສູດ " readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="technic_check_dateStart" no-title scrollable
                      @input="updateLicensePlateTechnic_check_dateStart"></v-date-picker>
                  </v-menu>
                </v-col>

              </v-row>
              <v-row>

                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateTechnic_check_dateEnd" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLTechnic_check_dateEnd"
                        label="ວັນທີ ໃບກວດກາເຕັກນິກ ຄັ້ງຕໍ່ໄປ" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="technic_check_dateEnd" no-title scrollable
                      @input="updateLicensePlateTechnic_check_dateEnd"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ລຸ້ນ ຫຼີ ໂມເດວ" dense outlined background-color="#f5f5f5"
                    v-model="car_model"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ຊື່ເຈົ້າຂອງລົດ" dense outlined background-color="#f5f5f5"
                    v-model="owner_car"></v-text-field>
                </v-col>

                <v-col cols="3" md="2" sm="2">
                  <v-select label="* ພວງມະໄລ" dense outlined background-color="#f5f5f5" v-model="steering_wheel"
                    :items="steering_wheelOptions"></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" md="2" sm="2">
                  <v-select label="* ເປັນລົດທີ່" dense outlined background-color="#f5f5f5" v-model="dao"
                    :items="daoOptions"></v-select>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ຄວາມກວາ້ງຂອງລົດ" dense outlined background-color="#f5f5f5"
                    v-model="wide"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ຄວາມຍາວຂອງລົດ" dense outlined background-color="#f5f5f5"
                    v-model="longg"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ຄວາມສູງ ຂອງລົດ" dense outlined background-color="#f5f5f5"
                    v-model="tall"></v-text-field>
                </v-col>
              </v-row>
              <v-row>

                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ລະຫັດຢາງເບື້ອງຂວາຕີນຫຼັງ" dense outlined background-color="#f5f5f5"
                    v-model="serial_wheel_right_back"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ລະຫັດຢາງເບື້ອງຂວາຕີນໜ້າ" dense outlined background-color="#f5f5f5"
                    v-model="serial_wheel_right_font"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ລະຫັດຢາງເບື້ອງຊາ້ຍຕີນຫຼັງ
                      " dense outlined background-color="#f5f5f5" v-model="serial_wheel_left_back"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ລະຫັດຢາງເບື້ອງຊາ້ຍຕີນໜ້າ" dense outlined background-color="#f5f5f5"
                    v-model="serial_wheel_left_font"></v-text-field>
                </v-col>

                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlateLean" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLLean" label="ນໍ້າມັນເຄື່ອງ" readonly
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="lean" no-title scrollable @input="updateLicensePlateLean"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-text-field label="* ເລກຕັງຊິດ(ໜັງສືຜ່ານແດນ)" dense outlined background-color="#f5f5f5"
                    v-model="tungsitnumber"></v-text-field>
                </v-col>
                <v-col cols="3" md="2" sm="2">
                  <v-menu v-model="licensePlatetungsitDateExpire" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field dense outlined v-model="formattedLtungsitDateExpire"
                        label="ວັນໝົດອາຍຸຕັງຊິດ(ໜັງສືຜ່ານແດນ)" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="tungsitDateExpire" no-title scrollable
                      @input="updateLicensePlatetungsitDateExpire"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="3" md="2" sm="2">
                  <v-text-field style="width: 180px;" label="* ວັນທີປຽນເລກໄມລ໌ປັດ ລາສຸດ" dense outlined
                    background-color="#df941b" v-model="lekmai_next"></v-text-field>
                </v-col>

                <!-- Date for "ວັນທີ່ປ່ຽນນ້ຳມັນເຄື່ອງ" -->
                <v-col cols="3" md="2" sm="2">
                  <v-menu ref="menu" v-model="dateChangeLeeanMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="dateChangeLeean" label="* ວັນທີ່ປ່ຽນນ້ຳມັນເຄື່ອງ" dense outlined
                        background-color="#df941b" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateChangeLeean" @input="dateChangeLeeanMenu = false"
                      scrollable></v-date-picker>
                  </v-menu>
                </v-col>

                <!-- Date for "ວັນທີປ່ຽນນ້ຳມັນເຄື່ອງຄັ້ງຕໍ່ໄປ" -->
                <v-col cols="3" md="2" sm="2">
                  <v-menu ref="menuNext" v-model="dateChangeLeeanNextMenu" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="dateChangeLeeanNext" label="* ວັນທີປ່ຽນນ້ຳມັນເຄື່ອງຄັ້ງຕໍ່ໄປ" dense
                        outlined background-color="#df941b" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateChangeLeeanNext" @input="dateChangeLeeanNextMenu = false"
                      scrollable></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row justify="end">
                <v-btn class="mr-4" width="130" color="success" @click="onInserEmpInfo">ບັນທຶກ</v-btn>
              </v-row>
            </v-card>
          </v-form>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      url: null,
      image: null,
      imagePreview: '',
      licensePlatetungsitDateExpire: '',
      formattedLtungsitDateExpire: '',
      lekmai_next: '',
      license_plate: null,
      battery_code_name: null,
      license_plate_end: null,
      license_plate_start: null,
      car_year: null,
      car_type: null,
      car_brand: null,
      serial_tire_second: null,
      lekJuk: null,
      lekThung: null,
      carColor: null,
      font_light: null,
      back_light: null,
      millor_back: null,
      millor_side: null,
      car_mileage_now: null,
      cc: null,
      licensePlateLeanFuengThaiy: false,

      LicenseLean: '',
      daoOptions: ["ຍັງດາວຢູ່", "ລົດທີ່ບໍ່ດາວ"],
      steering_wheelOptions: ["ພວງມະໄລຊ້າຍ", "ພວງມະໄລຂວາ"],
      oilOptions: ["ແອັດຊັງ", "ລົດໄຟຟ້າ", "ກະຊວນ"], // Updated options      toKen: '',
      insurance_Lao: '0',
      insurance_thai: '0',
      insurance_viet: '0',
      insurance_viet_expireDate: null,

      insurance_thai_expireDate: null,
      insurance_Lao_expireDate: null,
      technic_check_dateStart: null,
      technic_check_dateEnd: null,
      total_weigh_car: null,
      oil: null,
      car_model: null,
      lean: null,
      owner_car: null,
      steering_wheel: null,
      dao: null,
      wide: null,


      longg: null,
      tall: null,
      sitPosition_amount: null,
      serial_wheel_left_font: null,
      serial_wheel_left_back: null,
      serial_wheel_right_font: null,
      serial_wheel_right_back: null,
      imageaddcar: null,
      leanGia: null,
      leanFuengThaiy: null,
      url: null,
      /////////////
      em_userId: null,
      loading_processing: false,
      //message empty

      valid: true,
      nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],

      formattedLicensePlateInsurance_Lao_expireDate: '',
      formattedLicensePlateInsurance_viet_expireDate: '',
      formattedLicensePlateInsurance_thai_expireDate: '',
      formattedLTechnic_check_dateStart: '',
      formattedLLeanGia: '',
      formattedLTechnic_check_dateEnd: '',
      licensePlateInsurance_Lao_expireDate: '',
      licensePlateInsurance_viet_expireDate: '',
      licensePlateInsurance_thai_expireDate: '',
      licensePlateTechnic_check_dateStart: '',
      licensePlateTechnic_check_dateEnd: '',
      licensePlateLeanGia: '',
      licensePlateEndDateMenu: '',
      licensePlateLean: '',
      licensePlateStartDateMenu: '',
      formattedLicensePlateEndDate: '',
      formattedLicensePlateStartDate: '',
      formattedLLean: '',


      tungsitDateExpire: '',
      tungsitnumber: '',
      dateChangeLeean: '',              // v-model for dateChangeLeean
      dateChangeLeeanNext: '',          // v-model for dateChangeLeeanNext
      dateChangeLeeanMenu: false,       // Menu toggle for dateChangeLeean
      dateChangeLeeanNextMenu: false,   // Menu toggle for dateChangeLeeanNext

    }
  },
  methods: {
    previewImage() {
      const file = this.imageaddcar;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview = '';
      }
    },
    updateLicensePlateEndDate(val) {
      this.formattedLicensePlateEndDate = val
      this.licensePlateEndDateMenu = false
    },
    updateLicensePlateLean(val) {
      this.formattedLLean = val
      this.licensePlateLean = false
    },
    updateLicensePlatetungsitDateExpire(val) {
      this.formattedLtungsitDateExpire = val
      this.licensePlatetungsitDateExpire = false
    },
    updateLicensePlateStartDate(val) {
      this.formattedLicensePlateStartDate = val
      this.licensePlateStartDateMenu = false
    },

    updateLicensePlateInsurance_Lao_expireDate(val) {
      this.formattedLicensePlateInsurance_Lao_expireDate = val
      this.licensePlateInsurance_Lao_expireDate = false
    },
    updateLicensePlateInsurance_viet_expireDate(val) {
      this.formattedLicensePlateInsurance_viet_expireDate = val
      this.licensePlateInsurance_viet_expireDate = false
    },
    updateLicensePlateInsurance_thai_expireDate(val) {
      this.formattedLicensePlateInsurance_thai_expireDate = val
      this.licensePlateInsurance_thai_expireDate = false
    },
    updateLicensePlateTechnic_check_dateStart(val) {
      this.formattedLTechnic_check_dateStart = val
      this.licensePlateTechnic_check_dateStart = false
    },
    updateLicensePlateTechnic_check_dateEnd(val) {
      this.formattedLTechnic_check_dateEnd = val
      this.licensePlateTechnic_check_dateEnd = false
    },
    updateLicensePlateLeanGia(val) {
      this.formattedLLeanGia = val
      this.licensePlateLeanGia = false
    },
    updateLicensePlateLeanGia(val) {
      this.leanFuengThaiy = val
      this.licensePlateLeanGia = false
    },
    updateLicensePlateLeanFuengThaiy(val) {
      this.leanFuengThaiy = val;
      this.licensePlateLeanFuengThaiy = false;
    },
    onGetEmpImage(file) {
      if (file) {
        this.url = URL.createObjectURL(this.imageaddcar)
        console.log(this.url)
      } else {
        this.url = null
      }

    },


    async onInserEmpInfo() {
      if (!this.$refs.form.validate()) return null
      try {
        const formdata = new FormData();
        formdata.append('files', this.imageaddcar)
        formdata.append('date_change_lean_next', this.dateChangeLeeanNext ? this.dateChangeLeeanNext : "2030-03-03")
        formdata.append('date_change_lean', this.dateChangeLeean ? this.dateChangeLeean : "2030-03-03")
        formdata.append('lekmai_next', this.lekmai_next)
        formdata.append('license_plate', this.license_plate)
        formdata.append('serial_tire_second', this.serial_tire_second)
        formdata.append('battery_code_name', this.battery_code_name)
        formdata.append('license_plate_end', this.license_plate_end ? this.license_plate_end : "2030-03-03")
        formdata.append('license_plate_start', this.license_plate_start ? this.license_plate_start : "2030-03-03")
        formdata.append('car_year', this.car_year)
        formdata.append('car_type', this.car_type)
        formdata.append('car_brand', this.car_brand)
        formdata.append('lekJuk', this.lekJuk)
        formdata.append('lekThung', this.lekThung)
        formdata.append('carColor', this.carColor)
        formdata.append('font_light', this.font_light)
        formdata.append('back_light', this.back_light)
        formdata.append('millor_back', this.millor_back)
        formdata.append('millor_side', this.millor_side)
        formdata.append('car_mileage_now', this.car_mileage_now)
        formdata.append('cc', this.cc)
        formdata.append('leanGia', this.leanGia ? this.leanGia : "2030-03-03")
        formdata.append('leanFuengThaiy', this.leanFuengThaiy ? this.leanFuengThaiy : "2030-03-03")
        formdata.append('toKen', localStorage.getItem("toKen"))
        formdata.append('insurance_Lao', this.insurance_Lao)
        formdata.append('insurance_thai', this.insurance_thai)
        formdata.append('insurance_viet', this.insurance_viet)
        formdata.append('insurance_viet_expireDate', this.insurance_viet_expireDate ? this.insurance_viet_expireDate : "2030-03-03")
        formdata.append('insurance_thai_expireDate', this.insurance_thai_expireDate ? this.insurance_thai_expireDate : "2030-03-03")
        formdata.append('insurance_Lao_expireDate', this.insurance_Lao_expireDate ? this.insurance_Lao_expireDate : "2030-03-03")
        formdata.append('technic_check_dateStart', this.technic_check_dateStart ? this.technic_check_dateStart : "2030-03-03")
        formdata.append('technic_check_dateEnd', this.technic_check_dateEnd ? this.technic_check_dateEnd : "2030-03-03")
        formdata.append('total_weigh_car', this.total_weigh_car)
        formdata.append('oil', this.oil);
        formdata.append('car_model', this.car_model)
        formdata.append('owner_car', this.owner_car)
        formdata.append('steering_wheel', this.steering_wheel === "ພວງມະໄລຊາ້ຍ" ? "ພວງມະໄລຊາ້ຍ" : "ພວງມະໄລຂວາ")
        formdata.append('dao', this.dao);
        formdata.append('wide', this.wide);
        formdata.append('longg', this.longg)
        formdata.append('tall', this.tall)
        formdata.append('sitPosition_amount', this.sitPosition_amount)
        formdata.append('serial_wheel_left_font', this.serial_wheel_left_font)
        formdata.append('serial_wheel_left_back', this.serial_wheel_left_back)
        formdata.append('serial_wheel_right_font', this.serial_wheel_right_font)
        formdata.append('serial_wheel_right_back', this.serial_wheel_right_back)


        formdata.append('lean', this.lean ? this.lean : "2030-03-03")
        formdata.append('tungsitnumber', this.tungsitnumber)
        formdata.append('tungsitDateExpire', this.tungsitDateExpire ? this.tungsitDateExpire : "2030-03-03")
       
       
        formdata.append('serial_tire_second', this.serial_tire_second)
        formdata.append('lekmai_next', this.lekmai_next)
        formdata.append('date_change_lean', this.date_change_lean)
        formdata.append('date_change_lean_next', this.date_change_lean_next)
        formdata.append('leanGiaNextday', this.leanGiaNextday)


     

        this.loading_processing = true
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/insertCarOffice.service', formdata);
        console.log("Response:", data);
        if (data?.status == "00") {
          this.loading_processing = false;
          swal.fire({
            title: 'ສຳເລັດ',
            icon: 'success',
            allowOutsideClick: false,
          });
          if (typeof this.onClearData === 'function') {
            this.onClearData();
          } else {
            console.error("onClearData is not a function");
          }
        } else {
          this.loading_processing = false;
          swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: data?.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
      // window.location.reload();

    },
    onClearData() {
      console.log("Clearing data...");
      // Define your method to clear data here
    },
  },
}
</script>
<style lang="scss">
.margintops {
  margin-top: -25px;
}

.top {
  margin-top: 5px;
  margin-left: 10px;
}

.tops {
  margin-top: -25px;
  font-size: 14px;
}

.preview-image {
  width: 220px;
  height: 220px;
}

.x {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgb(255, 255, 255);
}
</style>

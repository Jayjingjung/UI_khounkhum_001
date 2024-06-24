<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>

    <v-card class="card-shadow mx-auto" width="1600">
      <v-card-title style="display:flex;background-color:#E57373;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="hrindex">
          <v-icon color="#E57373">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        ແບບຟອມ ອັບເດດ ຂໍ້ມູນ ລົດບໍລິຫານ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <height />
            <v-col cols="3" align="center" class="mt-4">
              <v-card class="text-center" max-width="500px">
                <img :src="carDetail.img" height="220px" cover>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-row>
                <v-col>
                  <v-file-input :rules="nameRules" label="ອັບໂຫຼດຮູບ" outlined dense prepend-icon="mdi-camera"
                    append-inner-icon="mdi-card-account-details" background-color="#f5f5f5"
                    v-model="img"></v-file-input>
                </v-col>
                <v-col>
                  <v-text-field label="* ປ້າຍທະບຽນລົດ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.license_plate"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ຊື່ລະຫັດຫມໍ້ໄຟ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.battery_code_name"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ບ່ອນນັ່ງຜູ້ໂດຍສານ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.sitPosition_amount"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-menu  v-model="licensePlateEndDateMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.license_plate_end" label="ວັນໝົດອາຍຸ ໃບທະບຽນ" readonly
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="license_plate_end" no-title scrollable
                      @input="updateLicensePlateEndDate"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-menu v-model="licensePlateStartDateMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.license_plate_start" label="ວັນອອກໃບທະບຽນ" readonly
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="carDetail.license_plate_start" no-title scrollable
                      @input="updateLicensePlateStartDate"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ປ້ອນລົດປີ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.car_year"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ປະເພດລົດ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.car_type"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ປ້ອນຍີ່ຫໍ້ລົດ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.car_brand"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ເລກຈັກ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.lekJuk"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ເລກຖັງ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.lekThung"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ສີລົດ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.carColor"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ໄຟໜ້າ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.font_light"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ໄຟຫລັງ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.back_light"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ແວ່ນ ເບີ່ງທາງຫລັງ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.millor_back"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ແວ່ນ ເບີ່ງທາງຂ້າງ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.millor_side"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ເລກໄມລ໌ປັດຈຸບັນ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.car_mileage_now"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* cc ຄວາມແຮງລົດຫົວໜ່ວຍ ເປັນ
" dense outlined background-color="#f5f5f5" v-model="carDetail.cc"></v-text-field>
                </v-col>

                <v-col>
                  <v-menu v-model="licensePlateLeanGia" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.leanGia" label="ລີນເກຍ" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="carDetail.leanGia" no-title scrollable
                      @input="updateLicensePlateLeanGia"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-select label="* ນໍ້າມັນ" dense outlined background-color="#f5f5f5" v-model="carDetail.oil"
                    :items="oilOptions">
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ເລກປະກັນໄພລາວ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.insurance_Lao"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ເລກປະກັນໄພຫວຽດ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.insurance_viet"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ເລກປະກັນໄພໄທ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.insurance_thai"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field label="* ນໍ້າໜັກລົດລວມ" dense outlined background-color="#f5f5f5"
                    v-model="carDetail.total_weigh_car"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-menu v-model="licensePlateInsurance_Lao_expireDate" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.insurance_Lao_expireDate"
                        label="ວັນໝົດອາຍຸ ປະກັນໄພລາວ " readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="carDetail.insurance_Lao_expireDate" no-title scrollable
                      @input="updateLicensePlateInsurance_Lao_expireDate"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col>
                  <v-menu v-model="licensePlateInsurance_viet_expireDate" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.insurance_viet_expireDate"
                        label="ວັນໝົດອາຍຸ ປະກັນໄພຫວຽດ" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="carDetail.insurance_viet_expireDate" no-title scrollable
                      @input="updateLicensePlateInsurance_viet_expireDate"></v-date-picker>
                  </v-menu>
                </v-col>


                <v-col>
                  <v-menu v-model="licensePlateInsurance_thai_expireDate" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.insurance_thai_expireDate"
                        label=" ວັນໝົດອາຍຸ ປະກັນໄພໄທ " readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="carDetail.insurance_thai_expireDate" no-title scrollable
                      @input="updateLicensePlateInsurance_thai_expireDate"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <v-menu v-model="licensePlateTechnic_check_dateStart" :close-on-content-click="false"
                    :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.technic_check_dateStart" label="ວັນທີ ໃບກວດກາເຕັກນິກລ່າສູດ "
                        readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="carDetail.technic_check_dateStart" no-title scrollable
                      @input="updateLicensePlateTechnic_check_dateStart"></v-date-picker>
                  </v-menu>
                </v-col>

              </v-row>
              <v-row>

                <v-col>
                  <v-menu v-model="licensePlateTechnic_check_dateEnd" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="carDetail.technic_check_dateEnd" label="ວັນທີ ໃບກວດກາເຕັກນິກ ຄັ້ງຕໍ່ໄປ"
                        readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="carDetail.technic_check_dateEnd" no-title scrollable
                      @input="updateLicensePlateTechnic_check_dateEnd"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-row>


                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ລຸ້ນ ຫຼີ ໂມເດວ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.car_model"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ຊື່ເຈົ້າຂອງລົດ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.owner_car"></v-text-field>
                  </v-col>

                  <v-col cols="6" md="3" sm="3">
                    <v-select label="* ພວງມະໄລ" dense outlined background-color="#f5f5f5" v-model="carDetail.steering_wheel"
                      :items="steering_wheelOptions"></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6" md="3" sm="3">
                    <v-select label="* ເປັນລົດທີ່" dense outlined background-color="#f5f5f5" v-model="carDetail.dao"
                      :items="daoOptions"></v-select>
                  </v-col>
                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ຄວາມກວາ້ງຂອງລົດ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.wide"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ຄວາມຍາວຂອງລົດ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.longg"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ຄວາມສູງ ຂອງລົດ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.tall"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>

                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ລະຫັດຢາງເບື້ອງຂວາຕີນຫຼັງ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.serial_wheel_right_back"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ລະຫັດຢາງເບື້ອງຂວາຕີນໜ້າ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.serial_wheel_right_font"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ລະຫັດຢາງເບື້ອງຊາ້ຍຕີນຫຼັງ
" dense outlined background-color="#f5f5f5" v-model="carDetail.serial_wheel_left_back"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="3" sm="3">
                    <v-text-field label="* ລະຫັດຢາງເບື້ອງຊາ້ຍຕີນໜ້າ" dense outlined background-color="#f5f5f5"
                      v-model="carDetail.serial_wheel_left_font"></v-text-field>
                  </v-col>

                  <v-col>
                    <v-menu v-model="licensePlateLean" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y>
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="carDetail.lean" label="ນໍ້າມັນເຄື່ອງ" readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="carDetail.lean" no-title scrollable @input="updateLicensePlateLean"></v-date-picker>
                    </v-menu>

                   

                  </v-col>
                </v-row>

              </v-row>
              <!-- <v-row>
                <v-col>
                  <v-textarea v-model="details" label="ລາຍລະອຽດເພີ່ມເຕີມ" background-color="#f5f5f5" outlined></v-textarea>
                </v-col>
              </v-row> -->
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-btn class="mr-4" width="130" color="success" @click="onupdateInserEmpInfo">ບັນທຶກ</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
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
      img:null,
      license_plate: null,
      battery_code_name: null,
      license_plate_end: null,
      license_plate_start: null,
      car_year: null,
      car_type: null,
      car_brand: null,
      lekJuk: null,
      lekThung: null,
      carColor: null,
      font_light: null,
      back_light: null,
      millor_back: null,
      millor_side: null,
      car_mileage_now: null,
      cc: null,
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
      url: null,
      /////////////
      em_userId: null,
      loading_processing: false,
      //message empty
      carDetail: '',
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
    }
  },
  mounted() {
    if (this.$route.query.keyId) {
      this.ongetData(this.$route.query.keyId);
    }
  },
  methods: {

    async ongetData(keyId) {
      try {
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listCarOfficeDetailById.service', {
          keyId: keyId
        });
        if (data?.status === "00") {
          this.carDetail = data?.data[0];
        } else {
          swal.fire({
            icon: 'error',
            text: 'Failed to fetch car details',
          });
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error
        });
        console.log(error);
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

    onGetEmpImage(file) {
      if (file) {
        this.url = URL.createObjectURL(this.imageaddcar)
        console.log(this.url)
      } else {
        this.url = null
      }

    },


    async onupdateInserEmpInfo() {
      if (!this.$refs.form.validate()) return null
      try {
        const formdata = new FormData();
        formdata.append('files', this.img)
        formdata.append('license_plate', this.carDetail.license_plate)
        formdata.append('battery_code_name', this.carDetail.battery_code_name)
        formdata.append('license_plate_end', this.carDetail.license_plate_end ? this.carDetail.license_plate_end : '0000-00-00')
        formdata.append('license_plate_start', this.carDetail.license_plate_start ? this.carDetail.license_plate_start : '0000-00-00')
        formdata.append('car_year', this.carDetail.car_year)
        formdata.append('car_type', this.carDetail.car_type)
        formdata.append('car_brand', this.carDetail.car_brand)
        formdata.append('lekJuk', this.carDetail.lekJuk)
        formdata.append('lekThung', this.carDetail.lekThung)
        formdata.append('carColor', this.carDetail.carColor)
        formdata.append('font_light', this.carDetail.font_light)
        formdata.append('back_light', this.carDetail.back_light)
        formdata.append('millor_back', this.carDetail.millor_back)
        formdata.append('millor_side', this.carDetail.millor_side)
        formdata.append('car_mileage_now', this.carDetail.car_mileage_now)
        formdata.append('cc', this.carDetail.cc)
        formdata.append('leanGia', this.carDetail.leanGia ? this.carDetail.leanGia : '0000-00-00')
        formdata.append('insurance_Lao', this.carDetail.insurance_Lao)
        formdata.append('insurance_thai', this.carDetail.insurance_thai)
        formdata.append('insurance_viet', this.carDetail.insurance_viet)
        formdata.append('insurance_viet_expireDate', this.carDetail.insurance_viet_expireDate ? this.carDetail.insurance_viet_expireDate : '0000-00-00')
        formdata.append('insurance_thai_expireDate', this.carDetail.insurance_thai_expireDate ? this.carDetail.insurance_thai_expireDate : '0000-00-00')
        formdata.append('insurance_Lao_expireDate', this.carDetail.insurance_Lao_expireDate ? this.carDetail.insurance_Lao_expireDate : '0000-00-00')
        formdata.append('technic_check_dateStart', this.carDetail.technic_check_dateStart ? this.carDetail.technic_check_dateStart : '0000-00-00')
        formdata.append('technic_check_dateEnd', this.carDetail.technic_check_dateEnd ? this.carDetail.technic_check_dateEnd : '0000-00-00')
        formdata.append('total_weigh_car', this.carDetail.total_weigh_car)
        
        
        formdata.append('car_model', this.carDetail.car_model)
        
        formdata.append('owner_car', this.carDetail.owner_car)
        formdata.append('steering_wheel', this.carDetail.steering_wheel === "ພວງມະໄລຊາ້ຍ" ? "ພວງມະໄລຊາ້ຍ" : "ພວງມະໄລຂວາ")
        formdata.append('dao', this.carDetail.dao=== "ຍັງດາວຢູ່" ? "YES" : "NO");
        formdata.append('oil', this.carDetail.oil);
        formdata.append('wide', this.carDetail.wide);
        formdata.append('longg', this.carDetail.longg)
        formdata.append('tall', this.carDetail.tall)
        formdata.append('sitPosition_amount', this.carDetail.sitPosition_amount)
        formdata.append('serial_wheel_left_font', this.carDetail.serial_wheel_left_font)
        formdata.append('serial_wheel_left_back', this.carDetail.serial_wheel_left_back)
        formdata.append('serial_wheel_right_font', this.carDetail.serial_wheel_right_font)
        formdata.append('serial_wheel_right_back', this.carDetail.serial_wheel_right_back)
        formdata.append('KEY_ID', this.carDetail.key_ID)
        
        formdata.append('lean', this.carDetail.lean ? this.carDetail.lean : '0000-00-00')


        formdata.append('toKen', localStorage.getItem("toKen"))

        this.loading_processing = true
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/UpdateCarOffice.service', formdata);
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
      window.location.reload();

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
</style>

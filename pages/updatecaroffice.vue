<template>
  <div>

    <!-- File Input for Image -->



    <v-col align="center" class="mt-4">
      <v-card class="text-center" max-width="500px">
        <!-- Display img only if available -->
        <img v-if="img" :src="img" height="220px" cover>
      </v-card>
    </v-col>
    <v-col align="center" class="mt-4">
      <v-col align="center" class="mt-4">
        ກວດເບິ່ງລົດຂົບ 1 ເດືອນ
        <v-icon :color="leanStyle" size="40px" @click="sendDateToAPI">
          mdi-bell-alert
        </v-icon>
      </v-col>

    </v-col>



    <!-- License Plate -->
    <div style="display: flex;">


      <v-card class="card-shadow mx-auto" width="50%">
        <v-card-title style="display:flex;background-color:#E57373;color:white">

          <v-spacer></v-spacer>
          ລົດ
          <v-spacer></v-spacer>
        </v-card-title>
        <v-col cols="12">
          <v-row>
            <!-- <v-col>
                <v-file-input style="width: 180px;" :rules="nameRules" label="ອັບໂຫຼດຮູບ" outlined dense
                  prepend-icon="mdi-camera" append-inner-icon="mdi-card-account-details" background-color="#f5f5f5"
                  v-model="img"></v-file-input>
              </v-col> -->
            <v-col>
              <v-text-field style="width: 180px;" label="* ປ້າຍທະບຽນລົດ" dense outlined background-color="#f5f5f5"
                v-model="license_plate"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ປ້ອນລົດປີ" dense outlined background-color="#f5f5f5"
                v-model="car_year"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ປະເພດລົດ" dense outlined background-color="#f5f5f5"
                v-model="car_type"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ປ້ອນຍີ່ຫໍ້ລົດ" dense outlined background-color="#f5f5f5"
                v-model="car_brand"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ເລກຈັກ" dense outlined background-color="#f5f5f5"
                v-model="lekJuk"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ເລກຖັງ" dense outlined background-color="#f5f5f5"
                v-model="lekThung"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ສີລົດ" dense outlined background-color="#f5f5f5"
                v-model="carColor"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ໄຟໜ້າ" dense outlined background-color="#f5f5f5"
                v-model="font_light"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ໄຟຫລັງ" dense outlined background-color="#f5f5f5"
                v-model="back_light"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ແວ່ນ ເບີ່ງທາງຫລັງ" dense outlined background-color="#f5f5f5"
                v-model="millor_back"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ແວ່ນ ເບີ່ງທາງຂ້າງ" dense outlined background-color="#f5f5f5"
                v-model="millor_side"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* cc ຄວາມແຮງລົດຫົວໜ່ວຍ ເປັນ
         " dense outlined background-color="#f5f5f5" v-model="cc"></v-text-field>
            </v-col>



            <v-col cols="6" md="3" sm="3">
              <v-select style="width: 180px;" label="* ນໍ້າມັນ" dense outlined background-color="#f5f5f5" v-model="oil"
                :items="oilOptions">
              </v-select>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ລຸ້ນ ຫຼີ ໂມເດວ" dense outlined background-color="#f5f5f5"
                v-model="car_model"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ນໍ້າໜັກລົດລວມ" dense outlined background-color="#f5f5f5"
                v-model="total_weigh_car"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ຊື່ລະຫັດຫມໍ້ໄຟ" dense outlined background-color="#f5f5f5"
                v-model="battery_code_name"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ບ່ອນນັ່ງຜູ້ໂດຍສານ" dense outlined background-color="#f5f5f5"
                v-model="sitPosition_amount"></v-text-field>
            </v-col>



            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ຄວາມກວາ້ງຂອງລົດ" dense outlined background-color="#f5f5f5"
                v-model="wide"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ຄວາມຍາວຂອງລົດ" dense outlined background-color="#f5f5f5"
                v-model="longg"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ຄວາມສູງ ຂອງລົດ" dense outlined background-color="#f5f5f5"
                v-model="tall"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ຊື່ເຈົ້າຂອງລົດ" dense outlined background-color="#f5f5f5"
                v-model="owner_car"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-select style="width: 180px;" label="* ພວງມະໄລ" dense outlined background-color="#f5f5f5"
                v-model="steering_wheel" :items="steering_wheelOptions"></v-select>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-select style="width: 180px;" label="* ເປັນລົດທີ່" dense outlined background-color="#f5f5f5"
                v-model="dao" :items="daoOptions"></v-select>
            </v-col>

          </v-row>

        </v-col>
      </v-card>
      <v-card class="card-shadow mx-auto" width="50%">
        <v-card-title style="display:flex;background-color:#E57373;color:white">

          <v-spacer></v-spacer>
          ປະກັນໄພ ເເລະ ວັນທີຄົບກໍານົດ
          <v-spacer></v-spacer>
        </v-card-title>
        <v-col cols="12">
          <v-row>

            <v-col>
              <v-menu v-model="licensePlateStartDateMenu" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="license_plate_start" label="ວັນອອກໃບທະບຽນ"
                    readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="license_plate_start" no-title scrollable
                  @input="updateLicensePlateStartDate"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu v-model="licensePlateEndDateMenu" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="license_plate_end"
                    label="ວັນໝົດອາຍຸ ໃບທະບຽນ" readonly v-on="on"
                    :style="{ backgroundColor: technicCheckDateColor_license_plate_end }"></v-text-field>
                </template>
                <v-date-picker v-model="license_plate_end" no-title scrollable
                  @input="updateLicensePlateEndDate"></v-date-picker>
              </v-menu>
            </v-col>




            <v-col>
              <v-menu v-model="licensePlateInsurance_Lao_expireDate" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="insurance_Lao_expireDate"
                    label="ວັນໝົດອາຍຸ ປະກັນໄພລາວ " readonly v-on="on"
                    :style="{ backgroundColor: technicCheckDateColor_insurance_Lao_expireDate }"></v-text-field>
                </template>
                <v-date-picker v-model="insurance_Lao_expireDate" no-title scrollable
                  @input="updateLicensePlateInsurance_Lao_expireDate"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col>
              <v-text-field style="width: 180px;" label="* ເລກປະກັນໄພລາວ" dense outlined background-color="#f5f5f5"
                v-model="insurance_Lao"></v-text-field>
            </v-col>

            <v-col>
              <v-menu v-model="licensePlateInsurance_viet_expireDate" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="insurance_viet_expireDate"
                    label="ວັນໝົດອາຍຸ ປະກັນໄພຫວຽດ" readonly v-on="on"
                    :style="{ backgroundColor: technicCheckDateColor_insurance_viet_expireDate }"></v-text-field>
                </template>
                <v-date-picker v-model="insurance_viet_expireDate" no-title scrollable
                  @input="updateLicensePlateInsurance_viet_expireDate"></v-date-picker>
              </v-menu>
            </v-col>


            <v-col>
              <v-text-field style="width: 180px;" label="* ເລກປະກັນໄພຫວຽດ" dense outlined background-color="#f5f5f5"
                v-model="insurance_viet"></v-text-field>
            </v-col>
            <v-col>
              <v-menu v-model="licensePlateInsurance_thai_expireDate" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="insurance_thai_expireDate"
                    label=" ວັນໝົດອາຍຸ ປະກັນໄພໄທ " readonly v-on="on"
                    :style="{ backgroundColor: technicCheckDateColor_insurance_thai_expireDate }"></v-text-field>
                </template>
                <v-date-picker v-model="insurance_thai_expireDate" no-title scrollable
                  @input="updateLicensePlateInsurance_thai_expireDate"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-text-field style="width: 180px;" label="* ເລກປະກັນໄພໄທ" dense outlined background-color="#f5f5f5"
                v-model="insurance_thai"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>



            <v-col>
              <v-text-field style="width: 180px;" label="* ເລກໄມລ໌ປັດຈຸບັນ" dense outlined background-color="#f5f5f5"
                v-model="car_mileage_now"></v-text-field>
            </v-col>

            <v-col>
              <v-text-field style="width: 180px;" label="* ເລກໄມປ່ຽນນ້ຳມັນເຄື່ອງຄັ້ງຕໍ່ໄປ" dense outlined
                background-color="#df941b" v-model="lekmai_next"></v-text-field>
            </v-col>
            <!-- <v-col>
              <v-menu v-model="licensePlateLean" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="lean" label="ນໍ້າມັນເຄື່ອງ" readonly
                    v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="lean" no-title scrollable @input="updateLicensePlateLean"></v-date-picker>
              </v-menu>
            </v-col> -->

            <v-col>
              <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="displayDateChangeLeean" label="* ວັນທີ່ປ່ຽນນ້ຳມັນເຄື່ອງ" style="width: 180px;"
                    dense outlined v-bind="attrs" v-on="on" readonly></v-text-field>
                </template>
                <v-date-picker v-model="dateChangeLeean" @input="menu1 = false"
                  :max="new Date().toISOString().substr(0, 10)" no-title></v-date-picker>
              </v-menu>
            </v-col>

            <v-col>
              <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="displayDateChangeLeeanNext" label="* ວັນທີປ່ຽນນ້ຳມັນເຄື່ອງຄັ້ງຕໍ່ໄປ"
                    style="width: 180px;" dense outlined v-bind="attrs" v-on="on" readonly></v-text-field>
                </template>
                <v-date-picker v-model="dateChangeLeeanNext" @input="menu2 = false" no-title></v-date-picker>
              </v-menu>
            </v-col>






            <v-col>
              <v-menu v-model="licensePlateLeanGia" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="leanGia" label="ລີນເກຍ" readonly
                    v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="leanGia" no-title scrollable @input="updateLicensePlateLeanGia"></v-date-picker>
              </v-menu>
            </v-col>


            <v-col>
              <v-menu v-model="licensePlateTechnic_check_dateStart" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="technic_check_dateStart"
                    label="ວັນທີ ໃບກວດກາເຕັກນິກລ່າສູດ " readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="technic_check_dateStart" no-title scrollable
                  @input="updateLicensePlateTechnic_check_dateStart"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu v-model="licensePlateTechnic_check_dateEnd" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="technic_check_dateEnd"
                    label="ວັນທີ ໃບກວດກາເຕັກນິກ ຄັ້ງຕໍ່ໄປ" readonly v-on="on"
                    :style="{ backgroundColor: technicCheckDateColor }">
                  </v-text-field>
                </template>
                <v-date-picker v-model="technic_check_dateEnd" no-title scrollable
                  @input="updateLicensePlateTechnic_check_dateEnd">
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>

              <v-menu v-model="licensePlateTungsitDateExpire" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y>
                <template v-slot:activator="{ on }">
                  <v-text-field dense outlined style="width: 180px;" v-model="tungsitDateExpire"
                    label="ວັນໝົດອາຍຸຕັງຊິດ(ໜັງສືຜ່ານແດນ)" readonly v-on="on"
                    :style="{ backgroundColor: technicCheckDateColor_tungsitDateExpire }"></v-text-field>
                </template>
                <v-date-picker v-model="tungsitDateExpire" no-title scrollable
                  @input="updateLicensePlateTungsitDateExpire"></v-date-picker>
              </v-menu>
            </v-col>

          </v-row>
        </v-col>
      </v-card>
    </div>
    <div style="display: flex;">

      <v-card class="card-shadow mx-auto" width="1600">
        <v-card-title style="display:flex;background-color:#E57373;color:white">

          <v-spacer></v-spacer>
          ລະຫັດຢາງ ລົດ
          <v-spacer></v-spacer>
        </v-card-title>

        <v-col cols="12">


          <v-row>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ລະຫັດຢາງເບື້ອງຂວາຕີນຫຼັງ" dense outlined
                background-color="#f5f5f5" v-model="serial_wheel_right_back"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ລະຫັດຢາງເບື້ອງຂວາຕີນໜ້າ" dense outlined
                background-color="#f5f5f5" v-model="serial_wheel_right_font"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ລະຫັດຢາງເບື້ອງຊາ້ຍຕີນຫຼັງ
" dense outlined background-color="#f5f5f5" v-model="serial_wheel_left_back"></v-text-field>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ລະຫັດຢາງເບື້ອງຊາ້ຍຕີນໜ້າ" dense outlined
                background-color="#f5f5f5" v-model="serial_wheel_left_font"></v-text-field>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ລະຫັດຢາງ ສໍາຮອງ" dense outlined background-color="#f5f5f5"
                v-model="serial_tire_second"></v-text-field>
            </v-col>



            <v-col cols="6" md="3" sm="3">
              <v-text-field style="width: 180px;" label="* ເລກຕັງຊິດ(ໜັງສືຜ່ານແດນ)" dense outlined
                background-color="#f5f5f5" v-model="tungsitnumber"></v-text-field>
            </v-col>

          </v-row>

          <v-btn class="mr-4" width="130" style="background-color: gray;color: aliceblue;" @click="updat">ບັນທຶກ</v-btn>

          <!-- <v-row>
                <v-col>
                  <v-textarea v-model="details" label="ລາຍລະອຽດເພີ່ມເຕີມ" background-color="#f5f5f5" outlined></v-textarea>
                </v-col>
              </v-row> -->
        </v-col>
      </v-card>
      <v-card class="card-shadow mx-auto" width="1600">
        <v-card-title style="display:flex;background-color:#E57373;color:white">

          <v-spacer></v-spacer>

          <v-btn style="margin-left: 20px;" @click="dialog = true" color="primary">
            <v-icon>
              mdi-plus
            </v-icon>ເພື່ມປະວັດການໃຊນໍ້າມັນ
          </v-btn>

          <v-spacer></v-spacer>

        </v-card-title>


        <v-container>
          <v-card>
            <v-card-title>
              <h3>ປະຫວັດການໃຊ້ນໍ້າມັນ</h3>
            </v-card-title>
            <!-- Display Total Price Paid -->
            <div class="mb-4">
              <v-alert type="info" border="left" elevation="2">
                ລວມຄ່ານໍ້າມັນທີ່ຊຳລະແລ້ວ: {{ totalPricePaidOil?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                  ',') }} ກີບ
              </v-alert>
            </div>
            <v-card-text>
              <v-data-table :headers="headers" :items="oilHistory" :items-per-page="5" dense class="elevation-1"
                :loading="loading">
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>ປະຫວັດ</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="fetchOilHistory">Refresh</v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item.price="{ item }">
                  {{ formatCurrency(item.price) }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <!-- <v-btn color="blue" @click="navigateTodelete(item.key_id)">delete</v-btn> -->
                  <!-- <v-btn color="red" @click="deleteRecord(item.key_id)">Delete</v-btn> -->
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-container>

        <v-dialog v-model="dialog" max-width="750px">

          <v-card justify="center" align="center" class="card-shadow mb-4" rounded="lg" width="1250px">
            <v-card-title class="orange--text white--text mb-10">
              ນໍ້າມັນ ເເລະ ເລກໄມ
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" md="3" sm="3">
                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                    offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined style="width: 180px;" v-model="dateFill" label="ວັນທີໃຊ" readonly
                        v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateFill" no-title scrollable @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field style="width: 180px;" label="* ເລກໄມທີໃຊນໍ້າມັນ" dense outlined
                    background-color="#f5f5f5" v-model="lekmai"></v-text-field>
                </v-col>
                <v-col cols="6" md="3" sm="3">
                  <v-text-field style="width: 180px;" label="* ເປັນເງິນ" dense outlined background-color="#f5f5f5"
                    v-model="price"></v-text-field>
                </v-col>
              </v-row>
              <div
                style="display: flex; justify-content: center; align-items: center;margin-top: 15px;margin-bottom: 15px;">
                <v-btn style="background-color: #24ab70; color: aliceblue;" @click="saveadd">ເພີ້ມ</v-btn>
              </div>
            </v-card-text>
          </v-card>


        </v-dialog>


        <!-- <v-row>
                <v-col>
                  <v-textarea v-model="details" label="ລາຍລະອຽດເພີ່ມເຕີມ" background-color="#f5f5f5" outlined></v-textarea>
                </v-col>
              </v-row> -->

      </v-card>
    </div>
    <!-- Add more fields for other data -->


  </div>
</template>
<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {
      menu: false,
      dateFill: "",
      lekmai: "",
      price: "",
      lean: {},
      dialog: false,
      img: '',         // For displaying the image URL
      file: null,      // For handling the uploaded file
      license_plate: '',
      battery_code_name: '',
      license_plate_start: '',
      license_plate_end: '',
      car_year: '',
      car_type: '',
      car_brand: '',
      carColor: '',
      steering_wheel: '',
      total_weigh_car: '',
      wide: '',
      longg: '',

      dateChangeLeean: '',
      dateChangeLeeanNext: '',
      menu2: '',
      menu1: '',
      menu: false,
      dateFill: null,
      lekmaisainummun: '',
      oilformoney: '',

      headers: [
        { text: "ລຳດັບ", value: "id" },
        { text: "ວັນທີ", value: "dateFill" },
        { text: "ເລກໄມ", value: "lekmai" },
        { text: "ເປັນເງິນ", value: "price" },
        { text: "ເລກໄມທີຫ່າງກັນ", value: "lekmai_dif" },
        { text: "ປະຕິບັດ", value: "actions", sortable: false },
      ],
      oilHistory: [],
      loading: false,
      tall: '',
      sitPosition_amount: '',
      serial_wheel_left_font: '',
      serial_wheel_left_back: '',
      serial_wheel_right_font: '',
      serial_wheel_right_back: '',
      key_ID: '',
      technic_check_dateStart: '',
      technic_check_dateEnd: '',
      car_model: '',
      tungsitnumber: '',
      owner_car: '',
      font_light: '',
      back_light: '',
      millor_back: '',
      millor_side: '',
      car_mileage_now: '',
      cc: '',
      leanGia: '',
      insurance_Lao: '',
      totalPricePaidOil: "0", // Default value
      insurance_thai: '',
      insurance_viet: '',
      insurance_viet_expireDate: '',
      insurance_thai_expireDate: '',
      insurance_Lao_expireDate: '',
      technic_check_dateStart: '',
      technic_check_dateEnd: '',
      dao: '',
      oil: '',
      tungsitDateExpire: '',
      lean: '',
      lekmai_next: '',
      lekThung: '',
      lekJuk: '',
      serial_tire_second: '0',
      dateChangeLeeanNext: '0',
      tungsitnumber: '0',
      lean_STATUS: 'NOT',

      dateChangeLeean: '',
      daoOptions: ["ຍັງດາວຢູ່", "ລົດທີ່ບໍ່ດາວ"],
      steering_wheelOptions: ["ພວງມະໄລຊ້າຍ", "ພວງມະໄລຂວາ"],
      oilOptions: ["ແອັດຊັງ", "ລົດໄຟຟ້າ", "ກະຊວນ"],

      toKen: localStorage.getItem("toKen"), // Token for API request

      // Validation rules
      nameRules: [(v) => !!v || 'This field is required'],
      dateRules: [(v) => !!v || 'Date is required'],
      // Loading state
      loading_processing: false,
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
      licensePlateTungsitDateExpire: false,
      licensePlateEndDateMenu: '',
      licensePlateLean: '',
      licensePlateStartDateMenu: '',
      formattedLicensePlateEndDate: '',
      formattedLicensePlateStartDate: '',
      formattedLLean: '',
      formattedLTungsitDateExpire: '',
      formattedDates: {
        insurance_Lao: '',
        insurance_viet: '',
        insurance_thai: '',
        technic_check_start: '',
        technic_check_end: '',
        leanGia: '',
        tungsitDateExpire: '',
        license_plate_start: '',
        license_plate_end: ''
      }
    };

  },
  mounted() {
    if (this.$route.query.keyId) {
      this.ongetData(this.$route.query.keyId);
    }
  },
  computed: {
    displayDateChangeLeean() {
      // If dateChangeLeean is "2040-04-04", show "0000-00-00", otherwise show the actual date
      return this.dateChangeLeean === "2040-04-04" ? "0000-00-00" : this.dateChangeLeean;
    },
    // Computed property for the second date
    displayDateChangeLeeanNext() {
      return this.dateChangeLeeanNext === "2040-04-04" ? "0000-00-00" : this.dateChangeLeeanNext;
    },
    leanStyle() {
      if (this.lean_STATUS === 'NOT') {
        return 'green';
      } else if (this.lean_STATUS === 'E') {
        return 'red';
      }
      return 'gray'; // Default color if status is not 'NOT' or 'E'
    },
    technicCheckDateColor() {
      if (!this.technic_check_dateEnd) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.technic_check_dateEnd);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },
    technicCheckDateColor_license_plate_end() {
      if (!this.license_plate_end) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.license_plate_end);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },
    technicCheckDateColor_leanGia() {
      if (!this.leanGia) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.leanGia);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },
    technicCheckDateColor_tungsitDateExpire() {
      if (!this.tungsitDateExpire) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.tungsitDateExpire);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (isNaN(checkDate)) return 'white'; // Handle invalid date

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },

    technicCheckDateColor_license_plate_start() {
      if (!this.license_plate_start) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.license_plate_start);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },
    technicCheckDateColor_insurance_Lao_expireDate() {
      if (!this.insurance_Lao_expireDate) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.insurance_Lao_expireDate);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },
    technicCheckDateColor_insurance_viet_expireDate() {
      if (!this.insurance_viet_expireDate) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.insurance_viet_expireDate);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },
    technicCheckDateColor_insurance_thai_expireDate() {
      if (!this.insurance_thai_expireDate) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.insurance_thai_expireDate);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },
    technicCheckDateColor_technic_check_dateStart() {
      if (!this.technic_check_dateStart) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(this.technic_check_dateStart);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'red';
      } else {
        return 'white';
      }
    },

  },
  methods: {
    formatCurrency(value) {
      return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
    },
    async fetchOilHistory() {
      this.loading = true;

      const url = "http://khounkham.com/api-prod/v1/truck/ListHisFillOill.service";
      const payload = {
        key_id: this.$route.query.keyId, // Replace with the actual key_id or make it dynamic
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched Oil History:", result);
        this.totalPricePaidOil = result.sumFooter?.totalPricePaidOil || "0"; // Set total price
        this.oilHistory = result.data || []; // Adjust based on API response format
      } catch (error) {
        console.error("Error fetching oil history:", error);
        this.$toast.error("ບໍ່ສາມາດໂຫຼດຂໍ້ມູນ");
      } finally {
        this.loading = false;
      }
    },
    navigateToUpdate(keyId) {
      const url = `http://localhost:3200/ldb-logistic/updatecaroffice?keyId=${keyId}`;
      window.location.href = url; // Redirect to the new page
    },
    created() {
      this.fetchOilHistory(); // Fetch data on component creation
    },
    async deleteRecord(key_id) {
      const confirmDelete = confirm("Are you sure you want to delete this record?");
      if (!confirmDelete) return;

      const url = "http://khounkham.com/api-prod/v1/truck/DelHisOil.service";
      const payload = { key_id };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (result.success) {
          this.$toast.success("ລຶບສຳເລັດ");
          this.fetchOilHistory(); // Refresh data after deletion
        } else {
          this.$toast.error("ລຶບບໍ່ສຳເລັດ");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        this.$toast.error("ມີບັນຫາໃນການລຶບຂໍ້ມູນ");
      }
    },
    async saveadd() {
      // Validate input
      if (!this.dateFill || !this.lekmai || !this.price) {
        this.$toast.error("ກະລຸນາຕື່ມຂໍ້ມູນທຸກຊ່ອງ!");
        return;
      }

      const payload = {
        key_id: this.$route.query.keyId, // Example key_id, replace with your dynamic value if needed
        price: this.price,
        lekmai: this.lekmai,
        dateFill: this.dateFill,
      };

      const url = "http://khounkham.com/api-prod/v1/truck/InsertOil.service";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Insert successful:", result);

        // Reset the form
        this.dateFill = "";
        this.lekmai = "";
        this.price = "";

        // Notify the user
        this.$toast.success("ຂໍ້ມູນຖືກບັນທືກສຳເລັດ!");
      } catch (error) {
        console.error("Insert failed:", error);
        this.$toast.error("ມີບັນຫາໃນການບັນທືກຂໍ້ມູນ");
      }
    },
    async sendDateToAPI(keyId) {
      try {
        // Get the current date (year, month, and day)
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
        const day = String(today.getDate()).padStart(2, '0');

        // Format lean as '2040/4/04'
        const lean = `${year}-${month}-${day}`;

        // Make the API request
        const response = await this.$axios.post(
          'http://khounkham.com/api-prod/v1/truck/UpdateNoticeCaofficeStatus.service',
          {
            keyId: this.$route.query.keyId,
            lean: lean,
          }
        );
        // Handle the response
        if (response?.status === 200) {
          this.$swal.fire({
            icon: 'success',
            text: 'Date successfully sent!',
          });

        } else {
          this.$swal.fire({
            icon: 'error',
            text: 'Failed to send the date',
          });
        }
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          text: 'An error occurred while sending the date',
        });
        console.error(error);

      }

    },
    getDateColor(date) {
      if (!date) return 'white';
      const currentDate = new Date();
      const checkDate = new Date(date);
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);

      if (currentDate > checkDate) {
        return 'red';
      } else if (oneMonthLater > checkDate) {
        return 'orange'; // Change to orange for near expiration
      } else {
        return 'white';
      }
    },
    async ongetData(keyId) {
      try {
        const response = await this.$axios.$post(
          'http://khounkham.com/api-prod/v1/truck/listCarOfficeDetailById.service',
          {
            keyId: keyId,
          }
        );

        if (response.status === '00') {
          const detail = response.data[0];

          // Assigning data from API to v-models
          this.img = detail.img || '';
          this.license_plate = detail.license_plate || '';
          this.battery_code_name = detail.battery_code_name || '';
          this.license_plate_end = detail.license_plate_end || '';
          this.license_plate_start = detail.license_plate_start || '';
          this.car_year = detail.car_year || '';
          this.car_type = detail.car_type || '';
          this.car_brand = detail.car_brand || '';
          this.lekJuk = detail.lekJuk || '';
          this.lekThung = detail.lekThung || '';
          this.carColor = detail.carColor || '';
          this.font_light = detail.font_light || '';
          this.back_light = detail.back_light || '';
          this.millor_back = detail.millor_back || '';
          this.millor_side = detail.millor_side || '';
          this.car_mileage_now = detail.car_mileage_now || '';
          this.cc = detail.cc || '';
          this.leanGia = detail.leanGia || '';
          this.lekmai_next = detail.lekmai_next || '';
          this.insurance_Lao = detail.insurance_Lao || '';
          this.insurance_thai = detail.insurance_thai || '';
          this.insurance_viet = detail.insurance_viet || '';
          this.insurance_viet_expireDate = detail.insurance_viet_expireDate || '';
          this.insurance_thai_expireDate = detail.insurance_thai_expireDate || '';
          this.insurance_Lao_expireDate = detail.insurance_Lao_expireDate || '';
          this.technic_check_dateStart = detail.technic_check_dateStart || '';
          this.technic_check_dateEnd = detail.technic_check_dateEnd || '';
          this.total_weigh_car = detail.total_weigh_car || '';
          this.car_model = detail.car_model || '';
          this.tungsitnumber = detail.tungsitnumber || '';
          this.owner_car = detail.owner_car || '';
          this.steering_wheel = detail.steering_wheel || '';
          this.dao = detail.dao || '';
          this.oil = detail.oil || '';
          this.wide = detail.wide || '';
          this.longg = detail.longg || '';
          this.tall = detail.tall || '';
          this.sitPosition_amount = detail.sitPosition_amount || '';
          this.serial_wheel_left_font = detail.serial_wheel_left_font || '';
          this.serial_wheel_left_back = detail.serial_wheel_left_back || '';
          this.serial_wheel_right_font = detail.serial_wheel_right_font || '';
          this.serial_wheel_right_back = detail.serial_wheel_right_back || '';
          this.lean = detail.lean || '';
          this.tungsitDateExpire = detail.tungsitDateExpire || '';
          this.dateChangeLeean = detail.dateChangeLeean || '';
          this.dateChangeLeeanNext = detail.dateChangeLeeanNext || '';
          this.license_STATUS = detail.license_STATUS || '';
          this.tungsit_STATUS = detail.tungsit_STATUS || '';
          this.dao = detail.dao || '';
          this.serial_tire_second = detail.serial_tire_second || '';
          this.lean_STATUS = detail.lean_STATUS || '';
        } else {
          swal.fire({
            icon: 'error',
            text: 'Failed to fetch car details',
          });
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error.message || error,
        });
      }
    }
    ,

    async updat() {
      // Validation check (basic example)
      if (!this.license_plate || !this.car_brand) {
        swal.fire({
          icon: 'warning',
          text: 'Please fill in the required fields.',
        });
        return;
      }

      const formdata = new FormData();

      // Append form fields to FormData
      // formdata.append('files', this.img)
      formdata.append('license_plate', this.license_plate)
      formdata.append('battery_code_name', this.battery_code_name)
      formdata.append('license_plate_end', this.license_plate_end)
      formdata.append('license_plate_start', this.license_plate_start)
      formdata.append('car_year', this.car_year)
      formdata.append('car_type', this.car_type)
      formdata.append('car_brand', this.car_brand)
      formdata.append('lekJuk', this.lekJuk)
      formdata.append('lekThung', this.lekThung)
      formdata.append('carColor', this.carColor)
      // formdata.append('carDetail', this.carDetail)
      formdata.append('font_light', this.font_light)
      formdata.append('back_light', this.back_light)
      formdata.append('millor_back', this.millor_back)
      formdata.append('millor_side', this.millor_side)
      formdata.append('car_mileage_now', this.car_mileage_now)
      formdata.append('cc', this.cc)
      formdata.append('leanGia', this.leanGia)
      formdata.append('insurance_Lao', this.insurance_Lao)
      formdata.append('insurance_thai', this.insurance_thai)
      formdata.append('insurance_viet', this.insurance_viet)
      formdata.append('insurance_viet_expireDate', this.insurance_viet_expireDate)
      formdata.append('insurance_thai_expireDate', this.insurance_thai_expireDate)
      formdata.append('insurance_Lao_expireDate', this.insurance_Lao_expireDate)
      formdata.append('technic_check_dateStart', this.technic_check_dateStart)
      formdata.append('technic_check_dateEnd', this.technic_check_dateEnd)
      formdata.append('total_weigh_car', this.total_weigh_car)
      formdata.append('car_model', this.car_model)
      formdata.append('owner_car', this.owner_car)
      formdata.append('steering_wheel', this.steering_wheel === "ພວງມະໄລຊາ້ຍ" ? "ພວງມະໄລຊາ້ຍ" : "ພວງມະໄລຂວາ")
      formdata.append('dao', this.dao === "ຍັງດາວຢູ່" ? "YES" : "NO");
      formdata.append('oil', this.oil);
      formdata.append('wide', this.wide);
      formdata.append('longg', this.longg)
      formdata.append('tall', this.tall)
      formdata.append('sitPosition_amount', this.sitPosition_amount)
      formdata.append('serial_wheel_left_font', this.serial_wheel_left_font)
      formdata.append('serial_wheel_left_back', this.serial_wheel_left_back)
      formdata.append('serial_wheel_right_font', this.serial_wheel_right_font)
      formdata.append('serial_wheel_right_back', this.serial_wheel_right_back)
      // formdata.append('lean', this.lean ? this.lean : '0000-00-00')

      formdata.append('date_change_lean_next', this.dateChangeLeeanNext ? this.dateChangeLeeanNext : '2040-04-04')
      formdata.append('date_change_lean', this.dateChangeLeean ? this.dateChangeLeean : '2040-04-04')
      formdata.append('lekmai_next', this.lekmai_next)
      formdata.append('serial_tire_second', this.serial_tire_second ? this.serial_tire_second : '2040-04-04')
      formdata.append('tungsitDateExpire', this.tungsitDateExpire)
      formdata.append('tungsitnumber', this.tungsitnumber)



      formdata.append('KEY_ID', this.$route.query.keyId);
      formdata.append('toKen', localStorage.getItem("toKen"))
      // ... append other fields

      // Set loading state
      this.loading_processing = true;

      try {
        const response = await this.$axios.$post(
          'http://khounkham.com/api-prod/v1/truck/UpdateCarOffice.service',
          formdata,
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //     'Authorization': `Bearer ${this.toKen}` // Assuming you need to send the token
          //   }
          // }
        );

        if (response.status === '00') {
          swal.fire({
            icon: 'success',
            text: 'Car details updated successfully!',
          });
          // Optionally reset the form or redirect
        } else {
          swal.fire({
            icon: 'error',
            text: 'Failed to update car details',
          });
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error.message || 'An error occurred while updating car details.',
        });
      } finally {
        // Reset loading state
        this.loading_processing = false;
      }
    }
    ,

    updateLicensePlateEndDate(val) {
      this.formattedLicensePlateEndDate = val
      this.licensePlateEndDateMenu = false
    },
    updateLicensePlateEndDate(value) {
      this.license_plate_end = value;

    },



    updateLicensePlateLean(val) {
      this.formattedLLean = val
      this.licensePlateLean = false
    },
    // updateLicensePlateLean(value) {
    //   this.lean = value;
    // },
    updateLicensePlateLeanGia(val) {
      this.formattedLLeanGia = val
      this.licensePlateLeanGia = false
    },
    // updateLicensePlateLeanGia(value) {
    //   this.leanGia = value;
    // },





    updateLicensePlateTungsitDateExpire(val) {
      this.tungsitDateExpire = val;
      this.licensePlateTungsitDateExpire = false;
    },

    updateLicensePlateStartDate(val) {
      this.formattedLicensePlateStartDate = val
      this.licensePlateStartDateMenu = false
    },
    updateLicensePlateStartDate(value) {
      this.license_plate_start = value;
    },
    updateLicensePlateInsurance_Lao_expireDate(val) {
      this.formattedLicensePlateInsurance_Lao_expireDate = val
      this.licensePlateInsurance_Lao_expireDate = false
    },
    updateLicensePlateInsurance_Lao_expireDate(value) {
      this.insurance_Lao_expireDate = value;
    },
    updateLicensePlateInsurance_viet_expireDate(val) {
      this.formattedLicensePlateInsurance_viet_expireDate = val
      this.licensePlateInsurance_viet_expireDate = false
    },
    updateLicensePlateInsurance_viet_expireDate(value) {
      this.insurance_viet_expireDate = value;
    },
    updateLicensePlateInsurance_thai_expireDate(val) {
      this.formattedLicensePlateInsurance_thai_expireDate = val
      this.licensePlateInsurance_thai_expireDate = false
    },
    updateLicensePlateInsurance_thai_expireDate(value) {
      this.insurance_thai_expireDate = value;
    },
    updateLicensePlateTechnic_check_dateStart(val) {
      this.formattedLTechnic_check_dateStart = val
      this.licensePlateTechnic_check_dateStart = false
    },
    updateLicensePlateTechnic_check_dateStart(value) {
      this.technic_check_dateStart = value;
    },
    updateLicensePlateTechnic_check_dateEnd(val) {
      this.formattedLTechnic_check_dateEnd = val
      this.licensePlateTechnic_check_dateEnd = false
    },



  },
};
</script>

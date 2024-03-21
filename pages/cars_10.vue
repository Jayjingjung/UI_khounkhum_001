<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" md="6" sm="4">
        <v-btn color="#E57373" elevation="0" to="add_cars_10">
          <v-icon color="white">mdi-plus</v-icon>
          <span class="white--text">ເພີ່ມຂໍ້ມູນລົດ 10 ລໍ້</span>
        </v-btn>
      </v-col>
      <v-col class="black--text">
        <v-text-field label="ຄົ້ນຫາ..." dense prepend-inner-icon="mdi-magnify" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-divider />
    <v-card height="10" elevation="0"></v-card>
    <span class="">ທັງໝົດ: {{ truck_data_list.length }}</span>
    <v-card height="10" elevation="0"></v-card>
    <v-card elevation="2">
      <v-data-table :headers="truck_table_headers" :items="truck_data_list">
        <template v-slot:item="row">
          <tr>
            <td>9898</td>
            <td>{{ row.item.plateNo }}</td>
            <td>{{ row.item.modelNo }}</td>
            <td>{{ row.item.vehiName }}</td>
            <td>{{ row.item.engNo }}</td>
            <td>{{ row.item.chassNo }}</td>

            <td class="pa-1">
              <v-btn color="#338ABF" elevation="0" small @click="
                onGetDataForUpdate(
                  row.item.vehiName,
                  row?.item?.chassNo,
                  row?.item?.dateExpIs,
                  row?.item?.dateExpTep,
                  row?.item?.engNo,
                  row?.item?.glass,
                  row?.item?.id,
                  row?.item?.isId,
                  row?.item?.modelNo,
                  row?.item?.plateNo,
                  row?.item?.userId,
                  row?.item?.year,
                  row?.item?.r01,
                  row?.item?.r01Exp,
                  row?.item?.rIn01,
                  row?.item?.rIn01Exp,
                  row?.item?.rIn02,
                  row?.item?.rIn02Exp,
                  row?.item?.rOut01,
                  row?.item?.rOut01Exp,
                  row?.item?.rOut02,
                  row?.item?.rOut02Exp,

                  row?.item?.l01,
                  row?.item?.l01Exp,
                  row?.item?.lIn01,
                  row?.item?.lIn01Exp,
                  row?.item?.lIn02,
                  row?.item?.lIn02Exp,
                  row?.item?.lOut01,
                  row?.item?.lOut01Exp,
                  row?.item?.lOut02,
                  row?.item?.lOut02Exp
                )
                ">
                <v-icon color="white">mdi-pencil</v-icon>
                <span class="white--text">ແກ້ໄຂ</span>
              </v-btn>
            </td>
            <td>
              <v-btn color="#338ABF" elevation="0" small @click="
                onViewTruckInfo(
                  row.item.vehiName,
                  row?.item?.chassNo,
                  row?.item?.dateExpIs,
                  row?.item?.dateExpTep,
                  row?.item?.engNo,
                  row?.item?.glass,
                  row?.item?.id,
                  row?.item?.isId,
                  row?.item?.modelNo,
                  row?.item?.plateNo,
                  row?.item?.userId,
                  row?.item?.year,
                  row?.item?.r01,
                  row?.item?.r01Exp,
                  row?.item?.rIn01,
                  row?.item?.rIn01Exp,
                  row?.item?.rIn02,
                  row?.item?.rIn02Exp,
                  row?.item?.rOut01,
                  row?.item?.rOut01Exp,
                  row?.item?.rOut02,
                  row?.item?.rOut02Exp,

                  row?.item?.l01,
                  row?.item?.l01Exp,
                  row?.item?.lIn01,
                  row?.item?.lIn01Exp,
                  row?.item?.lIn02,
                  row?.item?.lIn02Exp,
                  row?.item?.lOut01,
                  row?.item?.lOut01Exp,
                  row?.item?.lOut02,
                  row?.item?.lOut02Exp
                )
                ">
                <v-icon color="white">mdi-pencil</v-icon>
                <span class="white--text">ເບີ່ງ</span>
              </v-btn>
            </td>
            <td>
              <v-btn class="red pr-6" elevation="0" small @click="askBeforeDeleteTruct(row.item.id)">
                <v-icon color="white">mdi-delete</v-icon>
                <span class="white--text">ລຶບ</span>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <!-- Dialog Update Truct -->
    <v-dialog v-model="showDialogUpdate" persistent scrollable max-width="1600">
      <v-card color="pl-10 pt-4 pr-10">
        <div class="d-flex pb-2">
          <span>ແກ້ໄຂຂໍ້ມູນລົດ</span>
          <v-spacer />
          <v-btn icon @click="showDialogUpdate = false" class="ml-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card-text class="pt-4">
          <!-- cars info -->
          <v-card>
            <v-card-title>ຂໍ້ມູນລົດ:</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" md="4" sm="4">
                  <v-text-field label="ເລກທະບຽນລົດ" outlined dense v-model="up_plateNo"></v-text-field>
                </v-col>
                <v-col cols="6" md="4" sm="4"><v-text-field label="ຍີ່ຫໍ້ລົດ" outlined dense
                    v-model="up_modelNo"></v-text-field></v-col><v-col cols="6" md="4" sm="4">
                  <v-text-field label="ລົດປີ" outlined dense v-model="up_year"></v-text-field>
                </v-col>
              </v-row>
              <div class="margintop">
                <v-row>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ປະເພດລົດ" outlined dense v-model="up_vehiName"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="4" sm="4"><v-text-field label="ເລກຈັກ" outlined dense
                      v-model="up_engNo"></v-text-field></v-col><v-col cols="6" md="4" sm="4">
                    <v-text-field label="ເລກຖັງ" outlined dense v-model="up_chassNo"></v-text-field></v-col>
                </v-row>
              </div>
              <div class="margintop">
                <v-row>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ເລກປະກັນໄພ" outlined dense v-model="up_idId"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="4" sm="4"><v-text-field label="ວັນທີປະກັນໄພໝົດ" outlined dense
                      v-model="up_dateExpIs"></v-text-field></v-col>
                  <v-col cols="6" md="4" sm="4"><v-text-field label="ວັນທີເຕັກນິກໝົດ" outlined dense
                      v-model="up_dateExpTep"></v-text-field></v-col>
                </v-row>
              </div>
              <v-row>
                <v-col cols="6" md="4" sm="4">
                  <v-radio-group inline v-model="up_glass">
                    <v-row class="pl-4">
                      <span>ນໍ້າມັນລົດໃຊ້</span>
                      <Width />
                      <v-radio label="ແອັດຊັງ" value="ແອັດຊັງ" class="mt-1"></v-radio>
                      <Width />
                      <v-radio label="ກະຊວນ" value="ກະຊວນ"></v-radio>
                    </v-row>
                  </v-radio-group>
                </v-col>
                <v-col cols="6" md="4" sm="4">
                  <!-- <v-file-input label="ອັບໂຫຼດຮູູບລົດ" outlined dense></v-file-input> -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <Height />
          <Height />
          <!-- <h3>ຢາງລົດ:</h3> -->
          <v-card elevation="2">
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
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_L01"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_L01Exp"></v-text-field>
                  </div>
                  <div style="padding-top: 50px" class="d-flex">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Lout01"></v-text-field>
                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Lout01_Exp"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top: -20px">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Lin01"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Lin01_Exp"></v-text-field>
                  </div>
                  <div style="padding-top: 10px" class="d-flex">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Lout02"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Lout02_Exp"></v-text-field>
                  </div>
                  <div style="margin-top: -20px" class="d-flex">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Lin02"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Lin02_Exp"></v-text-field>
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
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Ro1"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Ro1Exp"></v-text-field>
                  </div>

                  <!-- /////////////////////////////// -->
                  <div style="padding-top: 50px" class="d-flex">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Rout01"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Rout01_Exp"></v-text-field>
                  </div>
                  <div style="margin-top: -20px" class="d-flex">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Rin01"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Rin01_Exp"></v-text-field>
                  </div>
                  <div class="d-flex">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Rout02"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Rout02_Exp"></v-text-field>
                  </div>
                  <div style="margin-top: -20px" class="d-flex">
                    <v-text-field outlined dense label="ລະຫັດຢາງລົດ" v-model="up_Rin02"></v-text-field>

                    <v-text-field outlined dense label="ວັນທີປ່ຽນຢາງ" v-model="up_Rin02_Exp"></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <Height />
          <Height />
          <Height />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" elevation="0" @click="showDialogUpdate = false">
            <v-icon color="white">mdi-close</v-icon>
            <span class="white--text">ຍົກເລິກ</span>
          </v-btn>
          <v-btn color="#338ABF" elevation="0" @click="onUpdateCarsInfo">
            <v-icon color="white">mdi-check</v-icon>
            <span class="white--text">ແກ້ໄຂ</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog View Truct Data -->
    <v-dialog v-model="showDialogViewTruct" persistent scrollable max-width="1600">
      <v-card color="pl-10 pt-4 pr-10">
        <div class="d-flex pb-2">
          <span>ຂໍ້ມູນລົດ 10 ລໍ້</span>
          <v-spacer />
          <v-btn icon @click="showDialogViewTruct = false" class="ml-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card-text class="pt-4">
          <!-- cars info -->
          <v-card>
            <v-card-title>ຂໍ້ມູນລົດ:</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" md="4" sm="4">
                  <v-text-field label="ເລກທະບຽນລົດ" outlined dense v-model="up_plateNo" readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="4" sm="4"><v-text-field label="ຍີ່ຫໍ້ລົດ" outlined dense readonly
                    v-model="up_modelNo"></v-text-field></v-col><v-col cols="6" md="4" sm="4">
                  <v-text-field label="ລົດປີ" outlined dense readonly v-model="up_year"></v-text-field>
                </v-col>
              </v-row>
              <div class="margintop">
                <v-row>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ປະເພດລົດ" outlined dense readonly v-model="up_vehiName"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="4" sm="4"><v-text-field label="ເລກຈັກ" outlined dense readonly
                      v-model="up_engNo"></v-text-field></v-col><v-col cols="6" md="4" sm="4">
                    <v-text-field label="ເລກຖັງ" outlined dense readonly v-model="up_chassNo"></v-text-field></v-col>
                </v-row>
              </div>
              <div class="margintop">
                <v-row>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ເລກປະກັນໄພ" outlined dense readonly v-model="up_idId"></v-text-field>
                  </v-col>
                  <v-col cols="6" md="4" sm="4"><v-text-field label="ວັນທີປະກັນໄພໝົດ" outlined dense readonly
                      v-model="up_dateExpIs"></v-text-field></v-col>
                  <v-col cols="6" md="4" sm="4"><v-text-field label="ວັນທີເຕັກນິກໝົດ" outlined dense readonly
                      v-model="up_dateExpTep"></v-text-field></v-col>
                </v-row>
              </div>
              <v-row>
                <v-col cols="6" md="4" sm="4">
                  <v-radio-group inline v-model="up_glass">
                    <v-row class="pl-4">
                      <span>ນໍ້າມັນລົດໃຊ້</span>
                      <Width />
                      <v-radio label="ແອັດຊັງ" value="ແອັດຊັງ" class="mt-1"></v-radio>
                      <Width />
                      <v-radio label="ກະຊວນ" value="ກະຊວນ"></v-radio>
                    </v-row>
                  </v-radio-group>
                </v-col>
                <v-col cols="6" md="4" sm="4">
                  <!-- <v-file-input label="ອັບໂຫຼດຮູູບລົດ" outlined dense></v-file-input> -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <Height />
          <Height />
          <!-- <h3>ຢາງລົດ:</h3> -->
          <v-card elevation="2">
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
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_L01"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_L01Exp"></v-text-field>
                  </div>
                  <div style="padding-top: 50px" class="d-flex">
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Lout01"></v-text-field>
                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Lout01_Exp"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top: -20px">
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Lin01"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Lin01_Exp"></v-text-field>
                  </div>
                  <div style="padding-top: 10px" class="d-flex">
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Lout02"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Lout02_Exp"></v-text-field>
                  </div>
                  <div style="margin-top: -20px" class="d-flex">
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Lin02"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Lin02_Exp"></v-text-field>
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
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Ro1"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Ro1Exp"></v-text-field>
                  </div>

                  <!-- /////////////////////////////// -->
                  <div style="padding-top: 50px" class="d-flex">
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Rout01"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Rout01_Exp"></v-text-field>
                  </div>
                  <div style="margin-top: -20px" class="d-flex">
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Rin01"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Rin01_Exp"></v-text-field>
                  </div>
                  <div class="d-flex">
                    <v-text-field outlined readonly dense label="ລະຫັດຢາງລົດ" v-model="up_Rout02"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Rout02_Exp"></v-text-field>
                  </div>
                  <div style="margin-top: -20px" class="d-flex">
                    <v-text-field outlined dense readonly label="ລະຫັດຢາງລົດ" v-model="up_Rin02"></v-text-field>

                    <v-text-field outlined dense readonly label="ວັນທີປ່ຽນຢາງ" v-model="up_Rin02_Exp"></v-text-field>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <Height />
          <Height />
          <Height />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      loading_processing: false,
      showDialogUpdate: false,
      showDialogViewTruct: false,
      truck_table_headers: [
        { text: 'ຮູບ', value: 'customerID' },
        { text: 'ທະບຽນລົດ', value: 'plateNo' },
        { text: 'ຍີ່ຫໍ້ລົດ', value: 'modelNo' },
        { text: 'ປະເພດລົດ', value: 'vehiName' },
        { text: 'ເລກຈັກ', value: 'engNo' },
        { text: 'ເລກຖັງ', value: 'chassNo' },
        { text: '', value: 'phone2' },
        { text: 'ຈັດການ', value: 'phone2' },
        { text: '', value: 'phone2' },
      ],
      truck_data_list: [],
      //upert
      up_key_update: '',
      up_plateNo: '',
      up_modelNo: '',
      up_vehiName: '',
      up_engNo: '',
      up_year: '',
      up_idId: '',
      up_dateExpIs: '',
      up_glass: '',
      up_chassNo: '',
      up_dateExpTep: '',
      up_userId: '',
      //head R L
      up_L01: '',
      up_L01Exp: '',
      up_Ro1: '',
      up_Ro1Exp: '',
      //Left
      up_Lin01: '',
      up_Lin01_Exp: '',
      up_Lin02: '',
      up_Lin02_Exp: '',
      up_Lin03: '',
      up_Lin03_Exp: '',
      up_Lout01: '',
      up_Lout01_Exp: '',
      up_Lout02: '',
      up_Lout02_Exp: '',
      up_Lout03: '',
      up_Lout03_Exp: '',
      //right
      up_Rin01: '',
      up_Rin01_Exp: '',
      up_Rin02: '',
      up_Rin02_Exp: '',
      up_Rin03: '',
      up_Rin03_Exp: '',
      up_Rout01: '',
      up_Rout01_Exp: '',
      up_Rout02: '',
      up_Rout02_Exp: '',
      up_Rout03: '',
      up_Rout03_Exp: '',
      key_for_delete_truct: '',
    }
  },
  mounted() {
    this.onGetTruckList()
  },
  methods: {
    async onUpdateCarsInfo() {
      try {
        let data = {
          id: this.up_key_update,
          plateNo: this.up_plateNo,
          modelNo: this.up_modelNo,
          vehiName: this.up_vehiName,
          engNo: this.up_engNo,
          chassNo: this.up_chassNo,
          year: this.up_year,
          isId: this.up_idId,
          dateExpIs: this.up_dateExpIs,
          glass: this.up_glass,
          dateExpTep: this.up_dateExpTep,
          userId: this.up_userId,
          l01: this.up_L01,
          l01Exp: this.up_L01Exp,
          r01: this.up_Ro1,
          r01Exp: this.up_Ro1Exp,
          lIn01: this.up_Lin01,
          lIn01Exp: this.up_Lin01_Exp,
          lIn02: this.up_Lin02,
          lIn02Exp: this.up_Lin02_Exp,
          lIn03: '',
          lIn03Exp: '',
          lOut01: this.up_Lout01,
          lOut01Exp: this.up_Lout01_Exp,
          lOut02: this.up_Lout02,
          lOut02Exp: this.up_Lout02_Exp,
          lOut03: '',
          lOut03Exp: '',
          rIn01: this.up_Rin01,
          rIn01Exp: this.up_Rin01_Exp,
          rIn02: this.up_Rin02,
          rIn02Exp: this.up_Rin02_Exp,
          rIn03: '',
          rIn03Exp: '',
          rOut01: this.up_Rout01,
          rOut01Exp: this.up_Rout01_Exp,
          rOut02: this.up_Rout02,
          rOut02Exp: this.up_Rout02_Exp,
          rOut03: '',
          rOut03Exp: '',
        }
        this.loading_processing = true
        await this.$axios.$post('/UpdateTruck', data).then((data) => {
          if (data?.status == '00') {
            this.onGetTruckList()
            this.showDialogUpdate = false
            this.loading_processing = false
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1000,
            })
          } else {
            this.loading_processing = false
            swal.fire({
              title: 'ແຈ້ງເຕືອນ',
              text: data?.message,
              icon: 'info',
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            })
          }
        })
      } catch (error) {
        this.loading_processing = false
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
    onGetDataForUpdate(
      vehiNameder,
      chassNo,
      dateExpIs,
      dateExpTep,
      engNo,
      glass,
      id,
      isId,
      modelNo,
      plateNo,
      userId,
      year,
      r01,
      r01Exp,
      rIn01,
      rIn01Exp,
      rIn02,
      rIn02Exp,
      rOut01,
      rOut01Exp,
      rOut02,
      rOut02Exp,
      l01,
      l01Exp,
      lIn01,
      lIn01Exp,
      lIn02,
      lIn02Exp,
      lOut01,
      lOut01Exp,
      lOut02,
      lOut02Exp
    ) {
      console.log(dateExpTep)
      this.up_vehiName = vehiNameder
      this.up_chassNo = chassNo
      this.up_dateExpIs = dateExpIs
      this.up_dateExpTep = dateExpTep
      this.up_engNo = engNo
      this.up_glass = glass
        ; (this.up_key_update = id), (this.up_userId = userId)
      this.up_idId = isId
      this.up_modelNo = modelNo
      this.up_plateNo = plateNo
      this.up_year = year
      this.up_Ro1 = r01
      this.up_Ro1Exp = r01Exp
      this.up_Rin01 = rIn01
      this.up_Rin01_Exp = rIn01Exp
      this.up_Rin02 = rIn02
      this.up_Rin02_Exp = rIn02Exp
      this.up_Rout01 = rOut01
      this.up_Rout01_Exp = rOut01Exp
      this.up_Rout02 = rOut02
      this.up_Rout02_Exp = rOut02Exp
      this.up_L01 = l01
      this.up_L01Exp = l01Exp
      this.up_Lin01 = lIn01
      this.up_Lin01_Exp = lIn01Exp
      this.up_Lin02 = lIn02
      this.up_Lin02_Exp = lIn02Exp
      this.up_Lout01 = lOut01
      this.up_Lout01_Exp = lOut01Exp
      this.up_Lout02 = lOut02
      this.up_Lout02_Exp = lOut02Exp

      this.showDialogUpdate = true
    },
    onViewTruckInfo(
      vehiNameder,
      chassNo,
      dateExpIs,
      dateExpTep,
      engNo,
      glass,
      id,
      isId,
      modelNo,
      plateNo,
      userId,
      year,
      r01,
      r01Exp,
      rIn01,
      rIn01Exp,
      rIn02,
      rIn02Exp,
      rOut01,
      rOut01Exp,
      rOut02,
      rOut02Exp,
      l01,
      l01Exp,
      lIn01,
      lIn01Exp,
      lIn02,
      lIn02Exp,
      lOut01,
      lOut01Exp,
      lOut02,
      lOut02Exp
    ) {
      console.log(dateExpTep)
      this.up_vehiName = vehiNameder
      this.up_chassNo = chassNo
      this.up_dateExpIs = dateExpIs
      this.up_dateExpTep = dateExpTep
      this.up_engNo = engNo
      this.up_glass = glass
        ; (this.up_key_update = id), (this.up_userId = userId)
      this.up_idId = isId
      this.up_modelNo = modelNo
      this.up_plateNo = plateNo
      this.up_year = year
      this.up_Ro1 = r01
      this.up_Ro1Exp = r01Exp
      this.up_Rin01 = rIn01
      this.up_Rin01_Exp = rIn01Exp
      this.up_Rin02 = rIn02
      this.up_Rin02_Exp = rIn02Exp
      this.up_Rout01 = rOut01
      this.up_Rout01_Exp = rOut01Exp
      this.up_Rout02 = rOut02
      this.up_Rout02_Exp = rOut02Exp
      this.up_L01 = l01
      this.up_L01Exp = l01Exp
      this.up_Lin01 = lIn01
      this.up_Lin01_Exp = lIn01Exp
      this.up_Lin02 = lIn02
      this.up_Lin02_Exp = lIn02Exp
      this.up_Lout01 = lOut01
      this.up_Lout01_Exp = lOut01Exp
      this.up_Lout02 = lOut02
      this.up_Lout02_Exp = lOut02Exp

      this.showDialogViewTruct = true
    },
    async onGetTruckList() {
      try {
        this.loading_processing = true
        await this.$axios.$post('getAllTruck').then((data) => {
          console.log('truck_list:', data)
          if (data?.data == null || data?.data == '') {
            this.truck_data_list = []
            this.loading_processing = false
            this.loading_processing = false
          } else {
            this.truck_data_list = data?.data
            this.loading_processing = false
            this.loading_processing = false
          }
        })
      } catch (error) {
        this.loading_processing = false
        console.log(error)
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
    askBeforeDeleteTruct(key) {
      this.key_for_delete_truct = key
      console.log(key)
      swal
        .fire({
          title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ ?',
          icon: 'question',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.onDeleteTruck()
          }
        })
    },
    async onDeleteTruck() {
      try {
        try {
          let data = {
            id: this.key_for_delete_truct,
          }
          this.loading_processing = true
          await this.$axios.$post('DeleteTruck', data).then((data) => {
            if (data?.status == '00') {
              this.loading_processing = false
              swal.fire({
                title: 'ສຳເລັດ',
                icon: 'success',
                allowOutsideClick: false,

              })
              this.onGetTruckList()
            } else {
              this.loading_processing = false
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
        } catch (error) {
          this.loading_processing = false
          swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: error,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
        }
      } catch (error) { }
    },
    async onUpdateTruct() {
      try {
        let data = {
          id: '3',
          plateNo: '1235',
          modelNo: '1235',
          vehiName: '1235',
          engNo: '1235',
          chassNo: 'v',
          year: '1235',
          isId: '1235',
          dateExpIs: '1235',
          glass: '1235',
          dateExpTep: '1235',
          userId: '1235',
          l01: '1235',
          l01Exp: '1235',
          r01: '1235',
          r01Exp: '1235',
          lIn01: '1235',
          lIn01Exp: '1235',
          lIn02: '1235',
          lIn02Exp: '1235',
          lIn03: '',
          lIn03Exp: '',
          lOut01: '1235',
          lOut01Exp: '1235',
          lOut02: '1235',
          lOut02Exp: '1235',
          lOut03: '',
          lOut03Exp: '',
          rIn01: '1235',
          rIn01Exp: '1235',
          rIn02: '1235',
          rIn02Exp: '1235',
          rIn03: '',
          rIn03Exp: '',
          rOut01: '1235',
          rOut01Exp: '1235',
          rOut02: '1235',
          rOut02Exp: '1235',
          rOut03: '',
          rOut03Exp: '',
        }
        await this.$axios.$post('DeleteTruck', data).then((data) => {
          console.log(data)
        })
      } catch (errir) { }
    },
  },
}
</script>

<template>
  <div class="pt-0">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDialogUpStatus" max-width="300">
      <v-card height="220">
        <div class="d-flex align-center pa-2 px-4">
          <h3>ສະຖານະລົດ</h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDialogUpStatus = false"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-divider></v-divider>
        <div class="pa-4 pt-6">
          <v-select outlined dense label="ເລືອກສະຖານະລົດ"></v-select>
        </div>
        <div class="text-center px-4">
          <v-btn color="primary" block>ອັບເດດ</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-card class="card-shadow" rounded="lg" style="border:0.2px solid #e0e0e0;border-radius:3px">
      <v-card-title style="background-color:#E57373" class="white--text">
        ຂໍ້ມູນຫົວລົດ
      </v-card-title>
      <v-card-text>
        <div style="display:flex;height: 90px;">
          <div class="d-flex align-center">
            <h3>ທັງໝົດ: {{ truck_data_list.length }}</h3>
          </div>
          <div style="display:flex;align-items:center" class="ml-4">
            <div>
              <v-btn dark color="#E57373" to="add_cars_14" class="card-shadow" rounded>
                <v-icon color="white">mdi-plus</v-icon>
                <span class="white--text">ເພີ່ມຂໍ້ມູນ</span>
              </v-btn>

            </div>
            <v-btn class="ml-2 card-shadow" outlined color="green" rounded to="/head_update_history">
              <v-icon>mdi-history</v-icon>
              <span>ປະຫວັດການແກ້ໄຂຂໍ້ມູນ</span>
            </v-btn>
            <div class="pt-8 ml-4" style="width: 500px;">
              <v-text-field background-color="#f5f5f5" solo flat dense label="ຄົ້ນຫາ..." v-model="search"
                prepend-inner-icon="mdi-magnify" clearable> </v-text-field>
            </div>

          </div>
        </div>

        <v-data-table :headers="truck_table_headers" :items="truck_data_list" :search="search" class="mt-4">
          <template v-slot:item="row">
            <tr v-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'W'"
              style="background-color:#FFF59D">
              <td>
                <v-avatar>
                  <img :src="row.item.imageTruck">
                </v-avatar>
              </td>
              <td>{{ row.item.h_VICIVLE_NUMBER }}</td>
              <td>{{ row.item.h_VICIVLE_BRANCH }}</td>
              <td>{{ row.item.h_VICIVLE_BRANCHTYPE }}</td>
              <td>{{ row.item.h_VICIVLE_GALATY }}</td>
              <td>{{ row.item.h_VICIVLE_DATE_GALATY }}</td>
              <td>{{ row.item.h_VICIVLE_YEARLEVEL }}</td>
              <td v-if="row?.item.h_STATUS === 'Y'" style="color:#55CE63"><v-icon color="#55CE63">mdi-check</v-icon>
                ວ່າງ
              </td>
              <td v-else class="red--text"><v-icon color="red">mdi-close</v-icon> ບໍ່ວ່າງ</td>
              <td><v-btn small color="#FFB74D" class="white--text card-shadow" @click="edit(row?.item?.key_id)"><v-icon
                    color="white">mdi-pencil</v-icon>ແກ້ໄຂ</v-btn></td>
              <td><v-btn small color="#90A4AE" class="white--text card-shadow" @click="view(row?.item?.key_id)"><v-icon
                    color="white">mdi-magnify</v-icon>ເບີ່ງ</v-btn></td>
              <td><v-btn small color="red" class="white--text card-shadow"
                  @click="askBeforeDeleteTruct(row?.item?.key_id)"><v-icon color="white">mdi-delete </v-icon>ລຶບ</v-btn>
              </td>
              <td v-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'W'"><v-icon color="#FBC02D"
                  font-size="10px">mdi-alert-outline</v-icon>
              </td>
              <td v-else-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'E'" class="red--text"><v-icon
                  color="#F4511E">mdi-alert-circle</v-icon> </td>
              <td v-else class="red--text"><v-icon color="#4CAF50">mdi-circle</v-icon> </td>
            </tr>
            <tr v-else-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'E'"
              style="background-color:#FFCDD2">
              <td>
                <v-avatar>
                  <img :src="row.item.imageTruck">
                </v-avatar>
              </td>
              <td>{{ row.item.h_VICIVLE_NUMBER }}</td>
              <td>{{ row.item.h_VICIVLE_BRANCH }}</td>
              <td>{{ row.item.h_VICIVLE_BRANCHTYPE }}</td>
              <td>{{ row.item.h_VICIVLE_GALATY }}</td>
              <td>{{ row.item.h_VICIVLE_DATE_GALATY }}</td>
              <td>{{ row.item.h_VICIVLE_YEARLEVEL }}</td>
              <td v-if="row?.item.h_STATUS === 'Y'" style="color:#55CE63"><v-icon color="#55CE63">mdi-check</v-icon>
                ວ່າງ
              </td>
              <td v-else class="red--text"><v-icon color="red">mdi-close</v-icon> ບໍ່ວ່າງ</td>
              <td><v-btn small color="#FFB74D" class="white--text card-shadow" @click="edit(row?.item?.key_id)"><v-icon
                    color="white">mdi-pencil</v-icon>ແກ້ໄຂ</v-btn></td>
              <td><v-btn small color="#90A4AE" class="white--text card-shadow" @click="view(row?.item?.key_id)"><v-icon
                    color="white">mdi-magnify</v-icon>ເບີ່ງ</v-btn></td>
              <td><v-btn small color="red" class="white--text card-shadow"
                  @click="askBeforeDeleteTruct(row?.item?.key_id)"><v-icon color="white">mdi-delete </v-icon>ລຶບ</v-btn>
              </td>
              <td v-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'W'"><v-icon color="#FBC02D"
                  font-size="10px">mdi-alert-outline</v-icon>
              </td>
              <td v-else-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'E'" class="red--text"><v-icon
                  color="#F4511E">mdi-alert-circle</v-icon> </td>
              <td v-else class="red--text"><v-icon color="#4CAF50">mdi-circle</v-icon> </td>
            </tr>
            <tr v-else>
              <td>
                <v-avatar>
                  <img :src="row.item.imageTruck">
                </v-avatar>
              </td>
              <td>{{ row.item.h_VICIVLE_NUMBER }}</td>
              <td>{{ row.item.h_VICIVLE_BRANCH }}</td>
              <td>{{ row.item.h_VICIVLE_BRANCHTYPE }}</td>
              <td>{{ row.item.h_VICIVLE_GALATY }}</td>
              <td>{{ row.item.h_VICIVLE_DATE_GALATY }}</td>
              <td>{{ row.item.h_VICIVLE_YEARLEVEL }}</td>
              <td v-if="row?.item.h_STATUS === 'Y'" style="color:#55CE63"><v-icon color="#55CE63">mdi-check</v-icon>
                ວ່າງ
              </td>
              <td v-else class="red--text"><v-icon color="red">mdi-close</v-icon> ບໍ່ວ່າງ</td>
              <td><v-btn small color="#FFB74D" class="white--text card-shadow" @click="edit(row?.item?.key_id)"><v-icon
                    color="white">mdi-pencil</v-icon>ແກ້ໄຂ</v-btn></td>
              <td><v-btn small color="#90A4AE" class="white--text card-shadow" @click="view(row?.item?.key_id)"><v-icon
                    color="white">mdi-magnify</v-icon>ເບີ່ງ</v-btn></td>
              <td><v-btn small color="red" class="white--text card-shadow"
                  @click="askBeforeDeleteTruct(row?.item?.key_id)"><v-icon color="white">mdi-delete </v-icon>ລຶບ</v-btn>
              </td>
              <td v-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'W'"><v-icon color="#ff9200"
                  font-size="10px">mdi-alert-outline</v-icon>
              </td>
              <td v-else-if="row?.item.toBatRowStatus && row?.item.toBatRowtabienLod === 'E'" class="red--text"><v-icon
                  color="#F4511E">mdi-alert-circle</v-icon> </td>
              <td v-else class="red--text"><v-icon color="#4CAF50">mdi-circle</v-icon> </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      showAlert: false,
      search: '',
      showDialogUpStatus: false,
      loading_processing: false,
      showDialogUpdate: false,
      showDialogViewTruct: false,
      truck_table_headers: [
        { text: 'ຮູບພາບ', value: '' },
        { text: 'ທະບຽນລົດ', value: 'h_VICIVLE_NUMBER' },
        { text: 'ຍີ່ຫໍ້ລົດ', value: 'h_VICIVLE_BRANCH' },
        { text: 'ປະເພດລົດ', value: 'h_VICIVLE_BRANCHTYPE' },
        { text: 'ເລກປະກັນໄພ', value: 'h_VICIVLE_GALATY' },
        { text: 'ວັນທີປະກັນໄພໝົດ', value: 'h_VICIVLE_DATE_GALATY' },
        { text: 'ລົດປີ', value: 'h_VICIVLE_YEARLEVEL' },
        { text: 'ສະຖານະລົດ', value: 'status' },
        { text: '', value: '' },
        { text: '', value: '' },
        { text: '', value: '' },
        { text: '', value: '' },
      ],
      nameRules: [(v) => !!v || ''],
      truck_data_list: [],
      data_alert: [],
      key_for_delete_truct: '',

    }
  },
  watch: {
    truck_data_list: function () {
      if (this.truck_data_list?.length > 0) {
        this.truck_data_list?.map((list) => {
          if (parseFloat(list?.kim_KM) >= parseFloat(list?.h_LEK_NUMMUNKHG)) {
            this.data_alert.push(list?.h_VICIVLE_NUMBER?.split('"').join())
            this.showAlert = true
          }
        })
      } else {
        this.showAlert = false
      }
    }
  },
  mounted() {
    this.onGetTruckList()
  },
  methods: {
    edit(key) {
      // this.$router.push({path: '/edit_cars_head', params: {key: 'he'}});
      this.$router.push({ path: '/edit_cars_head', query: { key: key } })
    },
    view(key) {
      // this.$router.push({path: '/edit_cars_head', params: {key: 'he'}});
      this.$router.push({ path: '/view-cars-heads', query: { key: key } })
    },
    onGetDataForUpdateStatus() {
      this.showDialogUpStatus = true
    },

    onViewnoti() {
      try {
        this.loading_processing = true;
        this.$axios.$post('/noti.service').then((data) => {
          this.loading_processing = false
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
      lOut02Exp,
      lIn03,
      lIn03Exp,
      lOut03,
      lOut03Exp,
      rIn03,
      rIn03Exp,
      rOut03,
      rOut03Exp,


      tRUCK_NO,
      tRUCK_SERIAL,
      tRUCK_MOFAI,
      tRUCK_FAITHAIY,
      tRUCK_VENKHANG,
      tRUCK_PAKUNPHAI,
      tRUCK_LEKTHUNG,
      tRUCK_BUNGTHOM,
      tRUCK_FAIKHANG,
      tRUCK_LEKYANGLOD,
      tRUCK_PAKUNPHAI_DATE,
      tRUCK_GPRS,
      tRUCK_JANLARK,
      tRUCK_VENMONGNAR,
      tRUCK_TANGSIT,
      tRUCK_FOYPUDNUMFON,
      tRUCK_FAINAR,
      tRUCK_VENMONGLG,
      bACK_TRUCK_THABIENLOD,
      bACK_TRUCK_PAO3,
      bACK_TRUCK_SO,
      bACK_TRUCK_BGTOM,
      bACK_TRUCK_LEKKUNZEE,
      bACK_TRUCK_PAO4,
      bACK_TRUCK_PHABUD,
      bACK_TRUCK_PAO1,
      bACK_TRUCK_KORKC,
      bACK_TRUCK_FAIKHANG,
      bACK_TRUCK_PAO2,
      bACK_TRUCK_LOCKTU,
      bACK_TRUCK_FAITHAIY
    ) {
      this.key_for_hide = rIn03
      this.up_Lin03 = lIn03
      this.up_Lin03_Exp = lIn03Exp
      this.up_Lout03 = lOut03
      this.up_Lout03_Exp = lOut03Exp
      this.up_Rin03 = rIn03
      this.up_Rin03_Exp = rIn03Exp
      this.up_Rout03 = rOut03
      this.up_Rout03_Exp = rOut03Exp
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


      this.tRUCK_NO = tRUCK_NO
      this.tRUCK_SERIAL = tRUCK_SERIAL
      this.tRUCK_MOFAI = tRUCK_MOFAI
      this.tRUCK_FAITHAIY = tRUCK_FAITHAIY
      this.tRUCK_VENKHANG = tRUCK_VENKHANG
      this.tRUCK_PAKUNPHAI = tRUCK_PAKUNPHAI
      this.tRUCK_LEKTHUNG = tRUCK_LEKTHUNG
      this.tRUCK_BUNGTHOM = tRUCK_BUNGTHOM
      this.tRUCK_FAIKHANG = tRUCK_FAIKHANG
      this.tRUCK_LEKYANGLOD = tRUCK_LEKYANGLOD
      this.tRUCK_PAKUNPHAI_DATE = tRUCK_PAKUNPHAI_DATE
      this.tRUCK_GPRS = tRUCK_GPRS
      this.tRUCK_JANLARK = tRUCK_JANLARK
      this.tRUCK_VENMONGNAR = tRUCK_VENMONGNAR
      this.tRUCK_TANGSIT = tRUCK_TANGSIT
      this.tRUCK_FOYPUDNUMFON = tRUCK_FOYPUDNUMFON
      this.tRUCK_FAINAR = tRUCK_FAINAR
      this.tRUCK_VENMONGLG = tRUCK_VENMONGLG
      this.bACK_TRUCK_THABIENLOD = bACK_TRUCK_THABIENLOD
      this.bACK_TRUCK_PAO3 = bACK_TRUCK_PAO3
      this.bACK_TRUCK_SO = bACK_TRUCK_SO
      this.bACK_TRUCK_BGTOM = bACK_TRUCK_BGTOM
      this.bACK_TRUCK_LEKKUNZEE = bACK_TRUCK_LEKKUNZEE
      this.bACK_TRUCK_PAO4 = bACK_TRUCK_PAO4
      this.bACK_TRUCK_PHABUD = bACK_TRUCK_PHABUD
      this.bACK_TRUCK_PAO1 = bACK_TRUCK_PAO1
      this.bACK_TRUCK_KORKC = bACK_TRUCK_KORKC
      this.bACK_TRUCK_FAIKHANG = bACK_TRUCK_FAIKHANG
      this.bACK_TRUCK_PAO2 = bACK_TRUCK_PAO2
      this.bACK_TRUCK_LOCKTU = bACK_TRUCK_LOCKTU
      this.bACK_TRUCK_FAITHAIY = bACK_TRUCK_FAITHAIY

      this.saiystay = saiystay
      this.galick = galick
      this.leanGia = leanGia
      this.leanFuengThaiy = leanFuengThaiy
      this.pha_But = pha_But
      this.showDialogViewTruct = true
    },

    async onGetTruckList() {
      try {
        this.loading_processing = true
        await this.$axios.$post('listVicicleHeader.service', {

          toKen: localStorage.getItem('toKen'),

        }
        ).then((data) => {
          console.log('all_truck_list:', data)
          if (data?.data == null || data?.data == '') {
            this.truck_data_list = []
            this.loading_processing = false
          } else {
            this.truck_data_list = data?.data
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
            key_id: this.key_for_delete_truct,
          }
          this.loading_processing = true
          await this.$axios.$post('DelVicicleHeaderByID.service', data).then((data) => {
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

  },
}
</script>

<template>
  <div>
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-card class="card-shadow mb-6" rounded="lg">
      <v-card-title style="background-color:#E57373">
        <div class="d-flex align-center px-4" style="background-color:#f5f5f5;height:50px;border-radius:3px">
          <div>
            <v-btn color="#E57373" to="add_employee" elevation="0" rounded>
              <v-icon color="white">mdi-plus</v-icon>
              <span class="white--text">ເພີ່ມຂໍ້ມູນ</span>
            </v-btn>
          </div>
          <div class="mt-2 ml-4" style="width:300px">
            <v-text-field label="ຄົ້ນຫາ..." rounded background-color="#fff" append-icon="mdi-magnify"
              v-model="emp_search"></v-text-field>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="py-2">
          <span class="">ທັງໝົດ:
            <span class="green--text" style="font-size: 12pt; font-weight: bold">{{
      emp_data_list.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }}</span></span>
        </div>
        <v-data-table :headers="emp_table_headers" :items="emp_data_list" :search="emp_search">
          <template v-slot:item="row">
            <tr>
              <td><v-avatar>
                  <img :src="row.item.imageStaff">
                </v-avatar></td>
              <td>{{ row.item.staftId }}</td>
              <td>{{ row.item.name }} {{ row.item.surname }}</td>
              <td>{{ row.item.vaillage }}</td>
              <td>{{ row.item.district }}</td>
              <td>{{ row.item.province }}</td>
              <td>{{ row.item.gender }}</td>
              <!-- <td>{{ row.item.genderStatus }}</td> -->

              <td>
                <v-btn color="#FFB74D" small @click="
      onGetDataForUpdate(
        row.item.id,
        row.item.imageStaff,
        row.item.staftId,
        row.item.name,
        row.item.surname,
        row.item.vaillage,
        row.item.district,
        row.item.province,
        row.item.gender,
        row.item.genderStatus,
        row.item.idCard,
        row.item.licenceId,
        row.item.licenceExp,
        row.item.mobile,
        row.item.mobile1,
        row.item.verBy
      )
      ">
                  <v-icon color="white">mdi-pencil</v-icon>
                  <span class="white--text">ແກ້ໄຂ</span>
                </v-btn>
              </td>
              <!-- <td>
              <v-btn color="#338ABF" small @click="
                onViewEmployeeInfo(
                  row.item.staftId,
                  row.item.name,
                  row.item.surname,
                  row.item.vaillage,
                  row.item.district,
                  row.item.province,
                  row.item.gender,
                  row.item.genderStatus,
                  row.item.idCard,
                  row.item.licenceId,
                  row.item.licenceExp,
                  row.item.mobile,
                  row.item.mobile1,
                  row.item.verBy,
                  row.item.dateTime,
                  row.item.userId
                )
                ">
                <v-icon color="white">mdi-magnify</v-icon>
                <span class="white--text">ເບີ່ງ</span>
              </v-btn>
            </td> -->
              <td>
                <v-btn class="red" small @click="askBeforeDeleteCusInfo(row.item.id)">
                  <v-icon color="white">mdi-delete</v-icon>
                  <span class="white--text">ລຶບ</span>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>

    </v-card>
    <!-- Modal Update Employee -->
    <v-dialog v-model="showModalUpdateEmployee" persistent width="950">
      <v-card>
        <v-card-title style="display:flex;background-color:#E57373;color:white">

          <v-spacer></v-spacer>
          ແກ້ໄຂຂໍ້ມູນພະນັກງານ
          <v-spacer></v-spacer>
          <v-btn fab elevation="0" dark width="30" height="30" small color="white"
            @click="showModalUpdateEmployee = false">
            <v-icon color="#E57373">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-avatar size="175"> <img :src="imageStaffold" cover height="160px" width="160px">
                </v-avatar>

                <v-text-field label="" outlined dense readonly v-model="imageStaffold"
                  style="display: none;"></v-text-field>
              </v-col>
              <v-col cols="9">
                <v-row>
                  <v-col cols="6" md="5" sm="5">
                    <v-text-field label="ລະຫັດພະນັກງານ" outlined dense readonly v-model="up_emp_id"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col clos="6" md="7" sm="7">
                    <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera" v-model="imageStaff"
                      id="file-field" @change="onGetEmpImage"></v-file-input>
                    <div class="tops">
                      <span class="red--text">{{ id_mess }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ຊື່" outlined dense v-model="up_emp_name"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ນາມສະກຸນ" outlined dense v-model="up_emp_surname"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="6" md="4" sm="4">
                    <v-radio-group inline v-model="up_emp_gender">
                      <v-row class="pl-3">
                        <span class="mt-1">ເພດ:</span>
                        <Width />
                        <v-radio label="ຊາຍ" value="ຊາຍ" class="mt-1"></v-radio>
                        <Width />
                        <v-radio label="ຍິງ" value="ຍິງ"></v-radio>
                      </v-row>
                    </v-radio-group>
                    <div class="tops">
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ບ້ານ" outlined dense v-model="up_emp_village"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ເມືອງ" outlined dense v-model="up_emp_dist"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ແຂວງ" outlined dense v-model="up_emp_province"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                </v-row>
                <v-row>

                  <!-- <v-col cols="6" md="4" sm="4">
                    <v-text-field label="ສະຖານະ" outlined dense v-model="up_emp_gen_status"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col> -->

                </v-row>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="6" md="4" sm="4">
                <v-text-field label="ເລກທີໃບຂັບຂີ່" outlined dense v-model="up_emp_licence_id"></v-text-field>
                <div class="tops">
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4">
                <v-text-field label="ໃບຂັບຂີ່ອອກທີ" outlined dense v-model="up_emp_verBy"></v-text-field>
                <div class="tops">
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4">
                <v-text-field label="ໃບຂັບຂີ່ໝົດອາຍຸ" outlined dense v-model="up_emp_licence_exp_date"></v-text-field>
                <div class="tops">
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4">
                <v-text-field label="ເບີໂທ1" outlined dense type="number" v-model="up_emp_mobile"></v-text-field>
                <div class="tops">
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4">
                <v-text-field label="ເບີໂທ2" outlined dense type="number" v-model="up_emp_mobile1"></v-text-field>
                <div class="tops">
                </div>
              </v-col>
            </v-row>

            <!-- <div class="margintops">
              <v-row>
                <v-col cols="6" md="4" sm="4">
                  <v-text-field label="ເບີໂທ2" outlined dense></v-text-field>
                </v-col>
                <v-col cols="6" md="4" sm="4">
                  <v-file-input
                    label="ອັບໂຫຼດຮູູບ"
                    outlined
                    dense
                  ></v-file-input>
                </v-col>
                <v-col cols="6" md="4" sm="4"> </v-col>
              </v-row>
            </div> -->
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#DE3333" @click="showModalUpdateEmployee = false"><v-icon color="white">mdi-close</v-icon>
              <span class="white--text">ຍົກເລິກ</span>
            </v-btn>
            <v-btn color="#FFB74D" @click="onUpdateEmpInfo"><v-icon color="white">mdi-check</v-icon> <span
                style="color: white;">ແກ້ໄຂ</span>
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Modal View Employee Details -->
    <v-dialog v-model="showModalEmployeeDetails" persistent width="800">
      <v-card>
        <v-container>
          <v-row class="pl-4 pr-4">
            <v-col class="pl-3">
              <h3>ຂໍ້ມູນເພີ່ມເຕີມ</h3>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn icon class="mt-2 mr-2" @click="showModalEmployeeDetails = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-row>
          <Height />
          <v-divider></v-divider>
          <Height />
          <Height />
          <v-card-text>
            <v-card elevation="1" class="pl-5"><v-row>
                <v-col cols="12" md="6" sm="4">
                  <span><span class="boldtext">ລະຫັດພະນັກງານ: </span>{{ up_emp_id }}</span>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <span><span class="boldtext">ຊື່ ແລະ ນາມສະກຸນ:</span>
                    {{ up_emp_name }} {{ up_emp_surname }}</span>
                </v-col>
              </v-row>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4">
                  <span><span class="boldtext">ບ້ານ:</span>
                    {{ up_emp_village }}</span>
                </v-col>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ເມືອງ:</span>
                    {{ up_emp_dist }}</span>
                </v-col>
              </v-row>
            </v-card>

            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ແຂວງ:</span>
                    {{ up_emp_province }}</span></v-col><v-col cols="12" md="6" sm="4">
                  <span><span class="boldtext">ເພດ:</span>:
                    {{ up_emp_gender }}</span></v-col>
              </v-row>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ສະຖານະ:</span>
                    {{ up_emp_gen_status }}</span></v-col>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ເລກບັດປະຈຳຕົວ:</span>
                    {{ up_emp_id_card }}</span></v-col>
              </v-row>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ເລກທີໃບຂັບຂີ່:</span>
                    {{ up_emp_licence_id }}</span>
                </v-col>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ໃບຂັບຂີ່ໝົດອາຍຸ:</span>
                    {{ up_emp_licence_exp_date }}</span></v-col>
              </v-row>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-5">
              <div>
                <v-row>
                  <v-col cols="6" md="4" sm="4"><span><span class="boldtext">ເບີໂທ1:</span>
                      {{ up_emp_mobile }}</span>
                  </v-col>
                  <v-col cols="6" md="4" sm="4"><span><span class="boldtext">ເບີໂທ2:</span>
                      {{ up_emp_mobile1 }}</span>
                  </v-col>
                  <v-col cols="6" md="4" sm="4"><span><span class="boldtext">ລະຫັດຜູ້ສ້າງ:</span>
                      {{ up_created_emp_id }}</span>
                  </v-col>
                </v-row>
              </div>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ໃບຂັບຂີ່ອອກທີ:</span>
                    {{ up_emp_verBy }}</span>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <!-- <span
                    >
                    <span class="boldtext">ວັນທີເພີ່ມພ/ງ:</span>
                    {{ up_emp_dateTime }}</span
                  > -->
                </v-col>
              </v-row>
            </v-card>
          </v-card-text>
          <Height />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#DE3333" @click="showModalEmployeeDetails = false"><v-icon color="white">mdi-close</v-icon>
              <span class="white--text">ປິດ</span>
            </v-btn>
          </v-card-actions>
          <Height />
          <v-divider></v-divider>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {
      showModalUpdateEmployee: false,
      showModalEmployeeDetails: false,
      loading_processing: false,
      up_emp_menu: false,
      emp_table_headers: [
        { text: 'ຮູບພາບ', value: '' },
        { text: 'ລະຫັດ', value: 'staftId' },
        { text: 'ຊື່ ແລະ ນາມສະກຸນ', value: 'name surname' },
        { text: 'ບ້ານ', value: 'vaillage' },
        { text: 'ເມືອງ', value: 'licenceId' },
        { text: 'ແຂວງ', value: 'licenceExp' },
        { text: 'ເພດ', value: '' },
        // { text: 'ສະຖານະ', value: '' },
        { text: '', value: '' },
        // { text: '', value: '' },
        { text: '', value: '' },
      ],
      emp_data_list: [],
      //state update
      imagePreview: '',
      key_up_emp: '',
      up_emp_id: '',
      up_emp_name: '',
      up_emp_surname: '',
      up_emp_village: '',
      up_emp_dist: '',
      up_emp_province: '',
      up_emp_gender: '',
      up_emp_gen_status: '',
      up_emp_id_card: '',
      up_emp_licence_id: '',
      up_emp_licence_exp_date: '',
      up_emp_mobile: '',
      up_emp_mobile1: '',
      up_emp_verBy: '',
      imageStaff: null,
      url: null,
      ////////////////
      up_emp_dateTime: '',
      up_created_emp_id: '',
      emp_search: '',
    }
  },
  mounted() {
    this.onGetEmployeeList()
  },
  methods: {
    onGetEmpImage(file) {
      if (file) {
        this.url = URL.createObjectURL(this.imageStaff)
        console.log(this.url)
      } else {
        this.url = null
      }
    },

    async onGetEmployeeList() {
      try {
        this.loading_processing = true
        await this.$axios.$post('getChooseStaft01.service', {

          // Autorization: localStorage.getItem('toKen')
          toKen: localStorage.getItem('toKen'),
         

        }).then((data) => {
          console.log('staffList:', data)
          if (data?.data == null || data?.data == '') {
            this.loading_processing = false
            this.emp_data_list = []
          } else {
            this.loading_processing = false
            this.emp_data_list = data?.data
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
      key,
      imageStaff,
      id,
      name,
      surname,
      vill,
      dist,
      prov,
      gender,
      genStatus,
      idCard,
      licenceId,
      licence_exp_date,
      mobile,
      mobile1,
      verBy
    ) {
      this.key_up_emp = key
      this.imageStaff = imageStaff
      this.imageStaffold = imageStaff
      this.up_emp_id = id
      this.up_emp_name = name
      this.up_emp_surname = surname
      this.up_emp_village = vill
      this.up_emp_dist = dist
      this.up_emp_province = prov
      this.up_emp_gender = gender
      this.up_emp_gen_status = genStatus
      this.up_emp_id_card = idCard
      this.up_emp_licence_id = licenceId
      this.up_emp_licence_exp_date = licence_exp_date
      this.up_emp_mobile = mobile
      this.up_emp_mobile1 = mobile1
      this.up_emp_verBy = verBy
      this.showModalUpdateEmployee = true
    },

    // onViewEmployeeInfo(
    //   id,
    //   name,
    //   surname,
    //   vill,
    //   dist,
    //   prov,
    //   gender,
    //   genStatus,
    //   idCard,
    //   licenceId,
    //   licence_exp_date,
    //   mobile,
    //   mobile1,
    //   verBy,
    //   date,
    //   userId
    // ) {
    //   this.up_emp_id = id
    //   this.up_emp_name = name
    //   this.up_emp_surname = surname
    //   this.up_emp_village = vill
    //   this.up_emp_dist = dist
    //   this.up_emp_province = prov
    //   this.up_emp_gender = gender
    //   this.up_emp_gen_status = genStatus
    //   this.up_emp_id_card = idCard
    //   this.up_emp_licence_id = licenceId
    //   this.up_emp_licence_exp_date = licence_exp_date
    //   this.up_emp_mobile = mobile
    //   this.up_emp_mobile1 = mobile1
    //   this.up_emp_verBy = verBy
    //   this.up_emp_dateTime = date
    //   this.up_created_emp_id = userId
    //   this.showModalEmployeeDetails = true
    // },

    async onUpdateEmpInfo() {
      try {
        const formdata = new FormData();
        formdata.append('id', this.key_up_emp)
        formdata.append('files', this.imageStaff != null ? this.imageStaff : null)
        formdata.append('staftId', this.up_emp_id)
        formdata.append('name', this.up_emp_name)
        formdata.append('surname', this.up_emp_surname)
        formdata.append('idCard', this.up_emp_id_card)
        formdata.append('licenceId', this.up_emp_licence_id)
        formdata.append('verBy', this.up_emp_verBy)
        formdata.append('licenceExp', this.up_emp_licence_exp_date)
        formdata.append('vaillage', this.up_emp_village)
        formdata.append('district', this.up_emp_dist)
        formdata.append('province', this.up_emp_province)
        formdata.append('mobile', this.up_emp_mobile)
        formdata.append('gender', this.up_emp_gender)
        formdata.append('userId', localStorage.getItem('USER_ID'))
        formdata.append('mobile1', this.up_emp_mobile1)
        formdata.append('imageStaff', null)
        formdata.append(' toKen', localStorage.getItem("toKen"))
        

        
        


        // console.log(datas)
        this.loading_processing = true
        await this.$axios.$post('updateStaft'

        ,formdata).then((data) => {
          // console.log('send:', datas)
          if (data?.status == '00') {
            this.loading_processing = false
            this.onGetEmployeeList()
            this.showModalUpdateEmployee = false
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,
            })
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
    },
    askBeforeDeleteCusInfo(key) {
      this.key_up_emp = key
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
            this.onDeleteEmpInfo()
          }
        })
    },
    async onDeleteEmpInfo() {
      try {
        let data = {
          id: this.key_up_emp,
        }
        this.loading_processing = true
        await this.$axios.$post('DeleteStaft', data).then((data) => {
          if (data?.status == '00') {
            console.log(this.key_up_emp)
            this.loading_processing = false
            this.onGetEmployeeList()
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,

            })
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
    },
  },
}
</script>

<style lang="scss">
.tops {
  margin-top: -25px;
  font-size: 14px;
}

.boldtext {
  font-weight: bold;
}

.preview-image {
  width: 220px;
  height: 220px;
}

.margintops {
  margin-top: -20px;
}
</style>

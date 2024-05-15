<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>

    <v-card class="card-shadow mx-auto" width="900">
      <v-card-title style="display:flex;background-color:#E57373;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white " to="employee">
          <v-icon color="#E57373">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        ແບບຟອມເພີ່ມຂໍ້ມູນພະນັກງານຂັບລົດ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="900" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <!-- <v-col cols="3" class="text-center"> -->
            <height />
            <!-- <div class="text-center">
                <div v-if="imagePreview == ''">
                  <img src="../assets/images/profile.png" class="preview-image" v-on:click="openUpload" height="200px"
                    cover>
                </div>
                <div v-else>
                  <img v-bind:src="imagePreview" class="preview-image" v-on:click="openUpload" height="200px" cover>
                </div>
              </div> -->
            <!-- <input name="imageStaff" type="file" id="file-field" v-on:change="updagePreview" style="display: none;"> -->
            <!-- </v-col> -->
            <v-col cols="12">
              <v-row>
                <v-col clos="6" md="5" sm="5">
                  <v-text-field :rules="nameRules" label="ລະຫັດພະນັກງານ" outlined dense v-model="emp_id"></v-text-field>
                  <div class="tops">
                    <span class="red--text">{{ id_mess }}</span>
                  </div>
                </v-col>
                <v-col clos="6" md="7" sm="7">
                  <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera"
                    v-model="imageStaff"></v-file-input>
                  <div class="tops">
                    <span class="red--text">{{ id_mess }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>

                <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ຊື່" outlined dense v-model="emp_name"></v-text-field>
                  <div class="tops">
                    <span class="red--text">{{ name_mess }}</span>
                  </div>
                </v-col>
                <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ນາມສະກຸນ" outlined dense v-model="emp_surname"></v-text-field>
                  <div class="tops">
                    <span class="red--text">{{ sur_mess }}</span>
                  </div>
                </v-col>
                <v-col clos="6" md="4" sm="4">
                  <v-radio-group inline v-model="emp_gender" :rules="nameRules">
                    <v-row class="pl-3">
                      <span class="mt-1">ເພດ</span>
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
                <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ບ້ານເກີດ" outlined dense v-model="emp_village"></v-text-field>
                  <div class="tops">
                    <span class="red--text">{{ vill_mess }}</span>
                  </div>
                </v-col>
                <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ເມືອງ" outlined dense v-model="emp_district"></v-text-field>
                  <div class="tops">
                    <span class="red--text">{{ dist_mess }}</span>
                  </div>
                </v-col>
                <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ແຂວງ" outlined dense v-model="emp_province"></v-text-field>
                  <div class="tops">
                    <span class="red--text">{{ prov_mess }}</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>

                <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ສະຖານະ" outlined dense
                    v-model="emp_gender_status"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
                <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ເລກທີໃບຂັບຂີ່" outlined dense type="number"
                    v-model="emp_licens_number"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>

                <v-col>
                  <v-menu ref="empverby" v-model="empverby" :close-on-content-click="false"
                    :return-value.sync="emp_verby" transition="scale-transition" offset-y min-width="auto">

                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined v-model="emp_verby" background-color="#f5f5f5" required
                        label="* ໃບຂັບຂີ່ອອກທີ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                        :rules="nameRules"></v-text-field>
                    </template>

                    <v-date-picker v-model="emp_verby" no-title scrollable @input="$refs.empverby.save(emp_verby)">
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <!-- <v-col clos="6" md="4" sm="4">
                  <v-text-field :rules="nameRules" label="ໃບຂັບຂີ່ອອກທີ" outlined dense
                    v-model="emp_verby"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col> -->

              </v-row>
            </v-col>
          </v-row>
          <v-row>

            <v-col>
              <v-menu ref="emplicens_expire_date" v-model="emplicens_expire_date" :close-on-content-click="false"
                :return-value.sync="emp_licens_expire_date" transition="scale-transition" offset-y min-width="auto">

                <template v-slot:activator="{ on, attrs }">
                  <v-text-field dense outlined v-model="emp_licens_expire_date" background-color="#f5f5f5" required
                    label="* ໃບຂັບຂີ່ໝົດອາຍຸ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                    :rules="nameRules"></v-text-field>
                </template>

                <v-date-picker v-model="emp_licens_expire_date" no-title scrollable
                  @input="$refs.emplicens_expire_date.save(emp_licens_expire_date)">
                  <v-spacer></v-spacer>
                </v-date-picker>
              </v-menu>
            </v-col>

            <!-- <v-col clos="6" md="4" sm="4">
              <v-text-field :rules="nameRules" label="ໃບຂັບຂີ່ໝົດອາຍຸ" outlined dense
                v-model="emp_licens_expire_date"></v-text-field>
              <div class="tops">
              </div>
            </v-col> -->

            <v-col clos="6" md="4" sm="4">
              <v-text-field :rules="nameRules" label="ເບີໂທ1" outlined dense type="number"
                v-model="emp_mobile"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="4" sm="4">
              <v-text-field :rules="nameRules" label="ເບີໂທ2" outlined dense type="number"
                v-model="emp_mobile1"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
          </v-row>
        </v-form>
        <Height />
        <Height />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="onClearData">
            <v-icon color="white">mdi-close</v-icon>
            <span class="white--text">ລ້າງຂໍ້ມູນ</span>
          </v-btn>
          <v-btn color="#448AFF" @click="onInserEmpInfo">
            <v-icon color="white">mdi-check</v-icon>
            <span class="white--text">ບັນທຶກ</span>
          </v-btn>
        </v-card-actions>
        <Height />
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
      driver_licens_issued: false,
      driver_licens_expire: false,
      //inser state
      imagePreview: '',
      emp_id: '',
      emp_name: '',
      emp_surname: '',
      emplicens_expire_date: null,
      empverby: null,
      emp_village: '',
      emp_district: '',
      emp_province: '',
      emp_gender: 'ຊາຍ',
      emp_gender_status: '',
      emp_card_number: '',
      emp_licens_number: '',
      emp_licens_expire_date: '',
      emp_mobile: '',
      emp_mobile1: '',
      emp_verby: '',
      imageStaff: null,
      url: null,
      /////////////
      em_userId: '',
      loading_processing: false,
      //message empty

      valid: true,
      nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],
    }
  },
  methods: {
    // openUpload() {
    //   document.getElementById('file-field').click()
    // },

    // updagePreview(e, file) {
    //   var reader, files = e.target.files

    //   if (files.length === 0) {
    //     console.log('empty')
    //   }

    //   reader = new FileReader()

    //   reader.onload = (e) => {
    //     this.imagePreview = e.target.result
    //   }

    //   reader.readAsDataURL(files[0])
    // },

    onGetEmpImage(file) {
      if (file) {
        this.url = URL.createObjectURL(this.imageStaff)
        console.log(this.url)
      } else {
        this.url = null
      }

    },
    onClearData() {
      this.$refs.form.reset();
      setTimeout(() => this.emp_gender = 'ຊາຍ', 1000)
    },

    async onInserEmpInfo() {
      if (!this.$refs.form.validate()) return null
      try {
        const formdata = new FormData();
        formdata.append('files', this.imageStaff)
        formdata.append('staftId', this.emp_id)
        formdata.append('name', this.emp_name)
        formdata.append('surname', this.emp_surname)
        formdata.append('idCard', this.emp_card_number)
        formdata.append('licenceId', this.emp_licens_number)
        formdata.append('verBy', this.emp_verby)
        formdata.append('licenceExp', this.emp_licens_expire_date)
        formdata.append('vaillage', this.emp_village)
        formdata.append('district', this.emp_district)
        formdata.append('province', this.emp_province)
        formdata.append('mobile', this.emp_mobile)
        formdata.append('gender', this.emp_gender)
        formdata.append('userId', localStorage.getItem('USER_ID'))
        formdata.append('mobile1', this.emp_mobile1)
        formdata.append('toKen', localStorage.getItem("toKen"))

        this.loading_processing = true
        await this.$axios.$post('StoreStaft', formdata).then((data) => {
          if (data?.status == '00') {
            this.loading_processing = false
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,
            })
            this.onClearData()
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

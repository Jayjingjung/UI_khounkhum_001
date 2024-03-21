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
            <v-btn color="#E57373" @click="showModaladdmorfai = true" elevation="0" rounded>
              <v-icon color="white">mdi-plus</v-icon>
              <span class="white--text">ເພີ່ມຂໍ້ມູນ</span>
            </v-btn>
          </div>
          <div class="mt-2 ml-4" style="width:300px">
            <v-text-field label="ຄົ້ນຫາ..." rounded background-color="#fff" append-icon="mdi-magnify"
              v-model="morfai_search"></v-text-field>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="py-2">
          <span class="">ທັງໝົດ:
            <span class="green--text" style="font-size: 12pt; font-weight: bold">{{
              morfai_data_list.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }}</span></span>
        </div>
        <v-data-table :headers="morfai_table_headers" :items="morfai_data_list" :search="morfai_search">
          <template v-slot:item="row">
            <tr>
              <td><v-avatar>
                  <img :src="row.item.imageBatery">
                </v-avatar></td>
              <td>{{ row.item.batNo }}</td>
              <td>{{ row.item.modalMorfai }}</td>
              <td>{{ row.item.sizeMorfai }}</td>
              <td>{{ row.item.serviceLife }} ປີ</td>
              <td>
                <v-btn color="#FFB74D" small @click="
                  onGetDataForUpdate(
                    row.item.keyId,
                    row.item.imageBatery,
                    row.item.batNo,
                    row.item.modalMorfai,
                    row.item.sizeMorfai,
                    row.item.serviceLife
                  )
                  ">
                  <v-icon color="white">mdi-pencil</v-icon>
                  <span class="white--text">ແກ້ໄຂ</span>
                </v-btn>
              </td>
              <td>
                <v-btn class="red" small @click="askBeforeDeleteCusInfo(row.item.keyId)">
                  <v-icon color="white">mdi-delete</v-icon>
                  <span class="white--text">ລຶບ</span>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Modal add Morfai -->
    <v-dialog v-model="showModaladdmorfai" persistent width="400">
      <v-card>
        <v-card-title style="display:flex;background-color:#E57373;color:white">
          <v-spacer></v-spacer>
          ເພີ່ມຂໍ້ມູນໝໍ້ໄຟ
          <v-spacer></v-spacer>
          <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="showModaladdmorfai = false">
            <v-icon color="#E57373">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <Height />
                <v-row>
                  <v-col cols="12">
                    <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera" v-model="imagemorfai"
                      @change="onGetmorfaiImage"></v-file-input>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="ລະຫັດໝໍ້ໄຟ" outlined dense v-model="batNo"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="ຍີ່ຫໍ້" outlined dense v-model="modalMorfai"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="ຂະໝາດ" outlined dense v-model="sizeMorfai"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex align-center" style="width:100%">
                      <v-text-field label="ອາຍຸການໃຊ້ງານ" type="number" outlined dense
                        v-model="serviceLife"></v-text-field>
                      <div
                        style="height:40px;width:38px;margin-top:-26px;display:flex;align-items:center;justify-content:center;background-color:#E57373;margin-left:-1px">
                        <span class="white--text">ປີ</span>
                      </div>
                    </div>
                    <div class="tops">
                    </div>
                  </v-col>
                </v-row>
                <v-row>

                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#DE3333" @click="showModaladdmorfai = false"><v-icon color="white">mdi-close</v-icon>
              <span class="white--text">ຍົກເລິກ</span>
            </v-btn>
            <v-btn color="#448AFF" @click="onInsertmorfai"><v-icon color="white">mdi-check</v-icon><span
                style="color:white">ບັນທຶກ</span>
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Modal Update Morfai -->
    <v-dialog v-model="showModalUpdatemorfai" persistent width="600">
      <v-card>
        <v-card-title style="display:flex;background-color:#E57373;color:white">
          <v-spacer></v-spacer>
          ແກ້ໄຂຂໍ້ມູນໝໍ້ໄຟ
          <v-spacer></v-spacer>
          <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="showModalUpdatemorfai = false">
            <v-icon color="#E57373">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-card class="text-center" max-width="340">
                  <img :src="imageold" cover height="160px" width="160px">
                  <v-text-field label="" outlined dense readonly v-model="imageold" style="display: none;"></v-text-field>
                </v-card>
              </v-col>
              <v-col cols="8">
                <Height />
                <v-row>

                  <v-col cols="12" class="p-3">
                    <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera" v-model="imageupdatemorfai"
                      @change="onGetupdatemorfaiImage"></v-file-input>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="ລະຫັດໝໍ້ໄຟ" outlined dense readonly v-model="up_batno"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="ຍີ່ຫໍ້" outlined dense v-model="up_model"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                </v-row>
                <v-row>

                  <v-col cols="12">
                    <v-text-field label="ຂະໝາດ" outlined dense v-model="up_size"></v-text-field>
                    <div class="tops">
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex align-center" style="width:100%">
                      <v-text-field label="ອາຍຸການໃຊ້ງານ" type="number" outlined dense
                        v-model="up_service"></v-text-field>
                      <div
                        style="height:40px;width:38px;margin-top:-26px;display:flex;align-items:center;justify-content:center;background-color:#E57373;margin-left:-1px">
                        <span class="white--text">ປີ</span>
                      </div>
                    </div>
                    <div class="tops">
                    </div>
                  </v-col>
                </v-row>
                <v-row>

                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#DE3333" @click="showModalUpdatemorfai = false"><v-icon color="white">mdi-close</v-icon>
              <span class="white--text">ຍົກເລິກ</span>
            </v-btn>
            <v-btn color="#FFB74D" @click="onUpdatemorfaiInfo"><v-icon color="white">mdi-check</v-icon> <span
                style="color: white;"> ແກ້ໄຂ </span>
            </v-btn>
          </v-card-actions>
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
      showModalUpdatemorfai: false,
      showModaladdmorfai: false,
      loading_processing: false,
      up_emp_menu: false,
      morfai_table_headers: [
        { text: 'ຮູບພາບ', value: '' },
        { text: 'ລະຫັດ', value: 'staftId' },
        { text: 'ຍີ່ຫໍ້', value: 'name surname' },
        { text: 'ຂະໝາດ', value: 'vaillage' },
        { text: 'ອາຍຸການໃຊ້ງານ', value: 'licenceId' },
        //   { text: 'ແຂວງ', value: 'licenceExp' },
        //   { text: 'ເພດ', value: '' },
        //   { text: 'ສະຖານະ', value: '' },
        { text: '', value: '' },
        // { text: '', value: '' },
        { text: '', value: '' },
      ],
      morfai_data_list: [],
      //state update
      imagePreview: '',
      imagePreviewadd: '',
      imageadd: '',
      image: '',

      imageurl: null,
      imagemorfai: null,
      imageupdateurl: null,
      imageupdatemorfai: null,

      batNo: '',
      modalMorfai: '',
      sizeMorfai: '',
      serviceLife: '',

      keyID_update: '',
      up_batno: '',
      up_model: '',
      up_size: '',
      up_service: '',

      ///////
      del_keyid: '',
      morfai_search: '',
      

    }
  },
  mounted() {
    this.onGetmorfaiList()
  },
  methods: {

    onGetmorfaiImage(file) {
      if (file) {
        this.imageurl = URL.createObjectURL(this.imagemorfai)
        console.log(this.imageurl)
      } else {
        this.imageurl = null
      }
    },

    onGetupdatemorfaiImage(file) {
      if (file) {
        this.imageupdateurl = URL.createObjectURL(this.imageupdatemorfai)
        console.log(this.imageupdateurl)
      } else {
        this.imageupdateurl = null
      }
    },

    openUpload() {
      document.getElementById('file-field').click()
    },

    updagePreview(e, file) {
      var reader, files = e.target.files

      if (files.length === 0) {
        console.log('empty')
      }

      reader = new FileReader()

      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }

      reader.readAsDataURL(files[0])

      if (file) {
        this.image = URL.createObjectURL(this.image)
        console.log(this.image)
      } else {
        this.image = null
      }
    },

    async onGetmorfaiList() {
      try {
        this.loading_processing = true
     
        await this.$axios.$post('getBateryAll', {
                    // Autorization: localStorage.getItem('toKen')
                    toKen: localStorage.getItem('toKen'),
                    keyId:""


                }).then((data) => {
          if (data?.status == '00') {
            this.loading_processing = false
            console.log('getBateryAll:', data)
            this.morfai_data_list = data?.data
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

    async onInsertmorfai() {
      try {
        const formdata = new FormData();
        formdata.append('files', this.imagemorfai)
        formdata.append('batNo', this.batNo)
        formdata.append('modalMorfai', this.modalMorfai)
        formdata.append('sizeMorfai', this.sizeMorfai)
        formdata.append('serviceLife', this.serviceLife)
        formdata.append('toKen', localStorage.getItem("toKen"))

        if (
          // this.user_id == '' ||
          this.batNo == '' ||
          this.modalMorfai == '' ||
          this.sizeMorfai == '' ||
          this.serviceLife == '' 
          // this.toKen == ''
        ) {
          if (this.batNo == '') {
            this.id_mess = 'ກະລຸນາປ້ອນລະຫັດ'
          } else {
            this.id_mess = ''
          }
          if (this.modalMorfai == '') {
            this.name_mess = 'ກະລຸນາປ້ອນຍີ່ຫໍ້'
          } else {
            this.name_mess = ''
          }
          if (this.sizeMorfai == '') {
            this.password_mess = 'ກະລຸນາປ້ອນຂະໜາດ'
          }
          else {
            this.password_mess = ''
          }

          if (this.serviceLife == '') {
            this.level_mess = 'ກະລຸນາປ້ອນອາຍຸການໃຊ້ງານ'
          }
          else {
            this.level_mess = ''
          }
        } else {
          this.loading_processing = true;
          await this.$axios.$post('/saveBatery', formdata, {
          }).then((data) => {
            if (data?.status == '00') {
              this.loading_processing = false
              this.showModaladdmorfai = false
              console.log('Batery:', data)
              swal.fire({
                title: 'ສຳເລັດ',
                icon: 'success',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1000,
              })
              this.onGetmorfaiList()
              // this.onClearData()
            } else {
              this.showModaladdmorfai = false
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
        }
      } catch (error) {
        this.showModaladdmorfai = false
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
      keyId,
      imageBatery,
      batNo,
      modalMorfai,
      sizeMorfai,
      serviceLife,

    ) {
      this.keyID_update = keyId
      this.imageold = imageBatery
      this.imageupdatemorfai = imageBatery
      this.up_batno = batNo
      this.up_model = modalMorfai
      this.up_size = sizeMorfai
      this.up_service = serviceLife
      this.showModalUpdatemorfai = true


    },

    async onUpdatemorfaiInfo() {
      try {
        const formdata = new FormData();
        formdata.append('files', this.imageupdatemorfai != null ? this.imageupdatemorfai : this.imageold)
        formdata.append('batNo', this.up_batno)
        formdata.append('modalMorfai', this.up_model)
        formdata.append('sizeMorfai', this.up_size)
        formdata.append('serviceLife', this.up_service)
        formdata.append('imageBatery', null)
        formdata.append('keyId', this.keyID_update)
        formdata.append('toKen', localStorage.getItem("toKen"))

        // console.log(datas)
        this.loading_processing = true
        await this.$axios.$post('/updateBatery', formdata).then((data) => {
          console.log('send:', data)
          if (data?.status == '00') {
            this.loading_processing = false
            this.onGetmorfaiList()
            this.showModalUpdatemorfai = false
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
      this.del_keyid = key
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
          keyId: this.del_keyid,
        }
        this.loading_processing = true
        await this.$axios.$post('/DelBatery', data).then((data) => {
          if (data?.status == '00') {
            console.log(this.del_keyid)
            this.loading_processing = false
            this.onGetmorfaiList()
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
  width: 160px;
  height: 150px;
}

.preview-image1 {
  width: 150px;
  height: 130px;
}

.preview-imageadd {
  width: 150px;
  height: 130px;
}

.margintops {
  margin-top: -20px;
}
</style>
  
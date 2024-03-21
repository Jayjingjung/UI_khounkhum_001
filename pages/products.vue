<template>
  <div>
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>


    <v-card class="card-shadow" rounded="lg">
      <v-card-title style="background-color:#E57373">
        <div class="d-flex align-center px-4" style="background-color:#f5f5f5;height:50px;border-radius:3px">
          <div>
            <v-btn color="#E57373" @click="showModalAddProduct = true" rounded elevation="0">
              <v-icon color="white">mdi-plus</v-icon>
              <span class="white--text">ເພີ່ມສິນຄ້າ</span>
            </v-btn>
          </div>
          <div class="mt-2 pl-4" style="width:300px">
            <v-text-field label="ຄົ້ນຫາ..." rounded background-color="#fff" append-icon="mdi-magnify"
              v-model="search_products"></v-text-field>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="py-2">
          <span class="">ທັງໝົດ:
            <span class="green--text" style="font-size: 12pt; font-weight: bold">{{
      products_data_list.length
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }}</span></span>
        </div>
        <v-data-table :headers="products_table_headers" :items="products_data_list" :search="search_products">
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.proId }}</td>
              <!-- <td>{{ row.item.proUrl }}</td> -->
              <!-- <td>
              <img class="mx-auto" src="../assets/images/logo.png" width="50" />
            </td> -->
              <td>{{ row.item.proName }}</td>
              <td>{{ row.item.proType }}</td>
              <!-- <td>{{ row.item.userId }}</td>
            <td>{{ row.item.proDateTime }}</td> -->
              <td>
                <v-btn color="#FFB74D" elevation="0" small @click="
      onGetDataForUpdate(
        row.item.id,
        row.item.proId,
        row.item.proName,
        row.item.proType
      )
      ">
                  <v-icon color="white">mdi-pencil</v-icon>
                  <span class="white--text">ແກ້ໄຂ</span>
                </v-btn>
              </td>
              <td>
                <v-btn class="red" elevation="0" small @click="askBeforeDeleteCusInfo(row.item.id)">
                  <v-icon color="white">mdi-delete</v-icon>
                  <span class="white--text">ລຶບ</span>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>

    </v-card>
    <!-- Modal add products -->
    <v-dialog v-model="showModalAddProduct" persistent width="400">
      <v-card>
        <v-card-title style="display:flex;background-color:#E57373;color:white">
          <v-spacer></v-spacer>
          ເພີ່ມຂໍ້ມູນສິນຄ້າ
          <v-spacer></v-spacer>
          <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="onCloseDialogAdd">
            <v-icon color="#E57373">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container>
          <v-card-text>
            <v-text-field label="ລະຫັດສິນຄ້າ" outlined dense v-model="ins_pro_id"></v-text-field>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_id_mess }}</span>
            </div>
            <v-text-field label="ຊື່ສິນຄ້າ" outlined dense v-model="ins_pro_name"></v-text-field>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_name_mess }}</span>
            </div>
            <v-text-field label="ປະເພດສິນຄ້າ" outlined dense v-model="ins_pro_type"></v-text-field>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_type_mess }}</span>
            </div>
            <!-- <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense v-model="ins_pro_image"
              @change="onGetEmpImage"></v-file-input>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_url_mess }}</span>
            </div> -->
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="onClearData">
              <v-icon color="white">mdi-close</v-icon>
              <span class="white--text">clear ຂໍ້ມູນ</span>
            </v-btn>
            <v-btn color="#448AFF" @click="onInsertProdInfo">
              <v-icon color="white">mdi-check</v-icon>
              <span class="white--text">ບັນທຶກ</span>
            </v-btn>
            <!-- <v-btn color="primary" block @click="onInsertProdInfo">
              ບັນທຶກ
            </v-btn> -->
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Modal Update products -->
    <v-dialog v-model="showModalUpdateProd" persistent width="400">
      <v-card>
        <v-card-title style="display:flex;background-color:#E57373;color:white">
          <v-spacer></v-spacer>
          ແກ້ໄຂຂໍ້ມູນສິນຄ້າ
          <v-spacer></v-spacer>
          <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="showModalUpdateProd = false">
            <v-icon color="#E57373">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container>
          <Height />
          <v-card-text>
            <v-text-field label="ລະຫັດສິນຄ້າ" outlined dense v-model="ins_pro_id"></v-text-field>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_id_mess }}</span>
            </div>
            <v-text-field label="ຊື່ສິນຄ້າ" outlined dense v-model="ins_pro_name"></v-text-field>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_name_mess }}</span>
            </div>
            <v-text-field label="ປະເພດສິນຄ້າ" outlined dense v-model="ins_pro_type"></v-text-field>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_type_mess }}</span>
            </div>
            <!-- <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense v-model="ins_pro_image"
              @change="onGetEmpImage"></v-file-input>
            <div class="tops">
              <span class="red--text pl-1">{{ pro_url_mess }}</span>
            </div> -->
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red" @click="showModalUpdateProd = false">
              <v-icon color="white">mdi-close</v-icon>
              <span class="white--text">ຍົກເລິກ</span>
            </v-btn>
            <v-btn color="#FFB74D" @click="onUpdateProd">
              <v-icon color="white">mdi-check</v-icon>
              <span class="white--text">ແກ້ໄຂ</span>
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
      showModalAddProduct: false,
      loading_processing: false,
      products_table_headers: [
        { text: 'ລະຫັດສິນຄ້າ', value: 'proId' },
        // { text: 'ຮູບສິນຄ້າ', value: 'proUrl' },
        { text: 'ຊື່ສິນຄ້າ', value: 'proName' },
        { text: 'ປະເພດສິນຄ້າ', value: 'proType' },
        // { text: 'ລະຫັດຜູ້ສ້າງ', value: 'userId' },
        // { text: 'ເວລາສ້າງ', value: 'proDateTime' },
        { text: '', value: '' },
        { text: '', value: '' },
      ],
      products_data_list: [],
      //insert data
      ins_pro_id: '',
      ins_pro_name: '',
      ins_pro_type: '',
      ins_pro_image: null,
      ins_pro_url: null,
      //search data
      search_products: '',
      //message when empty data
      pro_id_mess: '',
      pro_name_mess: '',
      pro_type_mess: '',
      pro_url_mess: '',
      //delete data
      key_delete_pro: '',
      //update
      showModalUpdateProd: false,
      key_update_prod: '',
    }
  },
  mounted() {
    this.onGetProductsList()
  },
  methods: {
    onGetEmpImage(file) {
      if (file) {
        this.ins_pro_url = URL.createObjectURL(this.ins_pro_image)
        console.log(this.ins_pro_url)
      } else {
        this.ins_pro_url = null
      }
    },
    onGetDataForUpdate(key, id, name, type) {
      this.key_update_prod = key
      this.ins_pro_id = id
      this.ins_pro_name = name
      this.ins_pro_type = type
      this.showModalUpdateProd = true
    },
    onCloseDialogAdd() {
      this.onClearData()
      this.showModalAddProduct = false
    },
    async onGetProductsList() {
      try {
        this.loading_processing = true
        await this.$axios.$post('getAllProduct', {

          // Autorization: localStorage.getItem('toKen')
          toKen: localStorage.getItem('toKen'),


        }).then((data) => {
          if (data?.data == null || data?.data == '') {
            this.products_data_list = []
            this.loading_processing = false
            console.log('products_list:', data)
          } else {
            this.products_data_list = data?.data
            this.loading_processing = false
            console.log('products_list:', data)
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
    async onDeleteProInfo() {
      try {
        let data = {
          id: this.key_delete_pro,
        }
        this.loading_processing = true
        await this.$axios.$post('DeleteCustomer', data).then((data) => {
          if (data?.status == '00') {
            this.loading_processing = false
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,

            })
            this.onGetProductsList()
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
    onClearData() {
      this.pro_id_mess = ''
      this.pro_name_mess = ''
      this.pro_type_mess = ''
      this.pro_url_mess = null
      this.ins_pro_id = ''
      this.ins_pro_name = ''
      this.ins_pro_type = ''
      this.ins_pro_image = null
      this.ins_pro_url = null
    },
    async onInsertProdInfo() {
      try {
        let data = {
          proId: this.ins_pro_id,
          proName: this.ins_pro_name,
          proType: this.ins_pro_type,
          proUrl: this.ins_pro_url,
          userId: localStorage.getItem('USER_ID'),
          toKen: localStorage.getItem("toKen")
        }
        console.log('send:', data)
        if (
          this.ins_pro_id == '' ||
          this.ins_pro_name == '' ||
          this.ins_pro_type == '' ||
          this.ins_pro_url == ''
        ) {
          if (this.ins_pro_id == '') {
            this.pro_id_mess = 'ກະລຸນາປ້ອນລະຫັດ'
          } else {
            this.pro_id_mess = ''
          }
          if (this.ins_pro_name == '') {
            this.pro_name_mess = 'ກະລຸນາປ້ອນຊື່'
          } else {
            this.pro_name_mess = ''
          }
          if (this.ins_pro_type == '') {
            this.pro_type_mess = 'ກະລຸນາປ້ອນປະເພດ'
          } else {
            this.pro_type_mess = ''
          }
          // if (this.ins_pro_url == null) {
          //   this.pro_url_mess = 'ກະລຸນາເລືອກຮູບ'
          // } else {
          //   this.pro_url_mess = ''
          // }
        } else {
          this.loading_processing = true
          await this.$axios.$post('StoreProduct', data).then((data) => {
            if (data?.status == '00') {
              this.loading_processing = false
              this.showModalAddProduct = false
              console.log('products_list:', data)
              swal.fire({
                title: 'ສຳເລັດ',
                icon: 'success',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1000,
              })
              this.onGetProductsList()
              this.onClearData()
            } else {
              this.showModalAddProduct = false
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
        this.showModalAddProduct = false
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
    async onUpdateProd() {
      try {
        let data = {
          id: this.key_update_prod,
          proId: this.ins_pro_id,
          proName: this.ins_pro_name,
          proType: this.ins_pro_type,
          proUrl: this.ins_pro_url != null ? this.ins_pro_url : null,
          userId: localStorage.getItem('USER_ID'),
          toKen: localStorage.getItem("toKen")

        }
        console.log('sendPro:', data)
        this.loading_processing = true
        await this.$axios.$post('UpdateProduct', data).then((data) => {
          if (data?.status == '00') {
            this.loading_processing = false
            this.showModalUpdateProd = false
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,

            })
            this.onGetProductsList()
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
      this.key_delete_pro = key
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
            this.onDeleteProd()
          }
        })
    },
    async onDeleteProd() {
      try {
        let data = {
          id: this.key_delete_pro,
        }
        this.loading_processing = true
        await this.$axios.$post('DeleteProduct', data).then((data) => {
          if (data?.status == '00') {
            this.loading_processing = false
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,

            })
            this.onGetProductsList()
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
ໍ

<style lang="scss">
.tops {
  margin-top: -25px;
  font-size: 12px;
}
</style>

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
            <v-btn color="#E57373" to="add_customer" elevation="0" rounded>
              <v-icon color="white">mdi-plus</v-icon>
              <span class="white--text">ເພີ່ມຂໍ້ມູນ</span>
            </v-btn>
          </div>
          <div class="black--text pt-2 ml-4" style="width:300px">
            <v-text-field label="ຄົ້ນຫາ..." rounded background-color="#fff" append-icon="mdi-magnify"
              v-model="customer_search"></v-text-field>
          </div>
          <v-spacer></v-spacer>

        </div>

      </v-card-title>
      <v-card-text>

        <div class="py-2">
          <span>ທັງໝົດ:
            <span class="green--text" style="font-size: 12pt; font-weight: bold">{{
              customer_data_list.length
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }}</span></span>
        </div>
        <v-data-table :headers="customer_table_headers" :items="customer_data_list" :search="customer_search">
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.customerId }}</td>
              <td>{{ row.item.customerName }}</td>
              <td>{{ row.item.vilage }}</td>
              <td>{{ row.item.district }}</td>
              <td>{{ row.item.province }}</td>
              <td>{{ row.item.mobile }}</td>
              <td>{{ row.item.mobile1 }}</td>
              <td>
                <v-btn color="#FFB74D" small elevation="0" @click="
                  onGetCusDataForUpdate(
                    row.item.id,
                    row.item.customerId,
                    row.item.customerName,
                    row.item.address,
                    row.item.vilage,
                    row.item.district,
                    row.item.province,
                    row.item.mobile,
                    row.item.mobile1,
                    row.item.email
                  )
                  ">
                  <v-icon color="white">mdi-pencil</v-icon>
                  <span class="white--text">ແກ້ໄຂ</span>
                </v-btn>
              </td>
              <!-- <td>
              <v-btn color="#338ABF" small elevation="0" @click="
                onGetCusDataForViewInfo(
                  row.item.customerId,
                  row.item.customerName,
                  row.item.address,
                  row.item.vilage,
                  row.item.district,
                  row.item.province,
                  row.item.mobile,
                  row.item.mobile1,
                  row.item.email
                )
                ">
                <v-icon color="white">mdi-magnify</v-icon>
                <span class="white--text">ເບີ່ງ</span>
              </v-btn>
            </td> -->
              <td>
                <v-btn class="red" small elevation="0" @click="askBeforeDeleteCusInfo(row.item.id)">
                  <v-icon color="white">mdi-delete</v-icon>
                  <span class="white--text">ລຶບ</span>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>

    </v-card>
    <!-- Dialog Update Customer -->
    <v-dialog v-model="showModalUpdateCustomer" persistent width="700">
      <v-card>
        <v-card-title style="display:flex;background-color:#E57373;color:white">

          <v-spacer></v-spacer>
          ແກ້ໄຂຂໍ້ມູນລູກຄ້າ
          <v-spacer></v-spacer>
          <v-btn fab elevation="0" dark width="30" height="30" small color="white"
            @click="showModalUpdateCustomer = false">
            <v-icon color="#E57373">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container>

          <Height />
          <v-card-text>
            <div>
              <v-row>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ລະຫັດລູກຄ້າ" outlined dense v-model="update_cus_id"></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ຊື່ລູກຄ້າ" outlined dense v-model="update_cus_name"></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div class="margintop">
              <v-row>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ທີ່ຢູ່" outlined dense v-model="update_cus_address"></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ບ້ານ" outlined dense v-model="update_cus_village"></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div class="margintop">
              <v-row>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ເມືອງ" outlined dense v-model="update_cus_district"></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ແຂວງ" outlined dense v-model="update_cus_province"></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="margintop">
              <v-row>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ເບີໂທ1" outlined dense type="number" v-model="update_cus_mobile"></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <v-text-field label="ເບີໂທ2" outlined dense type="number" v-model="update_cus_mobile1"></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div class="margintop">
              <v-row>
                <v-col>
                  <v-text-field label="ອີແມວ" outlined dense v-model="Update_cus_email"></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#DE3333" @click="showModalUpdateCustomer = false"><v-icon color="white">mdi-close</v-icon>
              <span class="white--text">ຍົກເລິກ</span>
            </v-btn>
            <v-btn color="#FFB74D" @click="onUpdateCusInfo"><v-icon color="white">mdi-check</v-icon><span
                style="color: white;">ແກ້ໄຂ</span>
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Dialog View Customer Details -->
    <v-dialog v-model="showModalViewCustomerInfo" persistent width="700">
      <v-card>
        <v-container>
          <v-row class="pl-4 pr-4">
            <v-col class="pl-3">
              <h3>ຂໍ້ມູນເພີ່ມເຕີມ</h3>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn icon class="mt-2 mr-2" @click="showModalViewCustomerInfo = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-row>
          <Height />
          <v-divider></v-divider>
          <Height />
          <Height />
          <v-card-text>
            <v-card elevation="1" class="pl-5"><v-row>
                <v-col cols="12" md="6" sm="4">
                  <span><span class="boldtext">ລະຫັດລູກຄ້າ: </span>{{ update_cus_id }}</span>
                </v-col>
                <v-col cols="12" md="6" sm="4">
                  <span><span class="boldtext">ຊື່: </span>
                    {{ update_cus_name }}</span>
                </v-col>
              </v-row>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4">
                  <span><span class="boldtext">ບ້ານ: </span>
                    {{ update_cus_village }}</span>
                </v-col>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ເມືອງ: </span>{{ update_cus_district }}</span>
                </v-col>
              </v-row>
            </v-card>

            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ແຂວງ: </span>{{ update_cus_province
                }}</span></v-col><v-col cols="12" md="6" sm="4"> </v-col>
              </v-row>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-5">
              <v-row>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ເບີໂທ1: </span>{{ update_cus_mobile
                }}</span></v-col>
                <v-col cols="12" md="6" sm="4"><span><span class="boldtext">ເບີໂທ2: </span>{{ update_cus_mobile1
                }}</span></v-col>
              </v-row>
            </v-card>
            <v-card elevation="1" class="mt-5 pl-8 pa-6">
              <div>
                <v-row>
                  <span><span class="boldtext">ທີ່ຢູ່: </span>{{ update_cus_address }}</span>
                </v-row>
              </div>
            </v-card>
            <v-card elevation="1" class="mt-2 pl-8 pa-6">
              <div>
                <v-row>
                  <span><span class="boldtext">ອີເມວ: </span>{{ Update_cus_email }}</span>
                </v-row>
              </div>
            </v-card>
          </v-card-text>
          <Height />
          <Height />
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#DE3333" @click="showModalViewCustomerInfo = false"><v-icon color="white">mdi-close</v-icon>
              <span class="white--text">ປິດ</span>
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- <v-btn @click="print">print</v-btn> -->

  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  data() {
    return {

      showModalUpdateCustomer: false,
      showModalViewCustomerInfo: false,
      loading_processing: false,
      customer_table_headers: [
        { text: 'ລະຫັດ', value: 'customerId' },
        { text: 'ຊື່ລູກຄ້າ', value: 'customerName' },
        { text: 'ບ້ານ', value: 'vilage' },
        { text: 'ເມືອງ', value: 'district' },
        { text: 'ແຂວງ', value: 'province' },
        { text: 'ເບີໂທ1', value: 'mobile' },
        { text: 'ເບີໂທ2', value: 'mobile1' },
        { text: '', value: '' },
        // { text: '', value: '' },
        { text: '', value: '' },
      ],
      // state update customer
      key_update_cusInfo: '',
      update_cus_id: '',
      update_cus_name: '',
      update_cus_address: '',
      update_cus_village: '',
      update_cus_district: '',
      update_cus_province: '',
      update_cus_mobile: '',
      update_cus_mobile1: '',
      Update_cus_email: '',
      //state view info
      customer_data_list: [],
      customer_search: '',
      key_for_delete_cusInfo: '',
    }
  },
  mounted() {
    this.onGetCustomerList()
  },
  methods: {
    print() {
      // Pass the element id here
      this.$htmlToPaper('section-to-print')
      // window.print()
    },

    async onGetCustomerList() {
      try {
       

        this.loading_processing = true;

        await this.$axios.$post('getAllCustomer', {

          toKen: localStorage.getItem('toKen'),

        }).then((data) => {

          if (data?.data == null || data?.data == '') {
            this.customer_data_list = [];
            this.loading_processing = false;
            console.log('customer_list:', data);
          } else {
            this.customer_data_list = data?.data;
            this.loading_processing = false;
            console.log('customer_list:', data);
          }
        });
      } catch (error) {
        this.loading_processing = false;
        console.log(error);

        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    }
    ,
    async onGetCusDataForUpdate(
      key,
      id,
      name,
      address,
      vill,
      dist,
      prov,
      mobile,
      mobile1,
      email
    ) {
      this.key_update_cusInfo = key
      this.update_cus_id = id
      this.update_cus_name = name
      this.update_cus_address = address
      this.update_cus_village = vill
      this.update_cus_district = dist
      this.update_cus_province = prov
      this.update_cus_mobile = mobile
      this.update_cus_mobile1 = mobile1
      this.Update_cus_email = email
      this.showModalUpdateCustomer = true
    },
    async onGetCusDataForViewInfo(
      id,
      name,
      address,
      vill,
      dist,
      prov,
      mobile,
      mobile1,
      email
    ) {
      this.update_cus_id = id
      this.update_cus_name = name
      this.update_cus_address = address
      this.update_cus_village = vill
      this.update_cus_district = dist
      this.update_cus_province = prov
      this.update_cus_mobile = mobile
      this.update_cus_mobile1 = mobile1
      this.Update_cus_email = email
      this.showModalViewCustomerInfo = true
    },
    askBeforeDeleteCusInfo(key) {
      this.key_for_delete_cusInfo = key
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
            this.onDeleteCusInfo()
          }
        })
    },
    async onDeleteCusInfo() {
      try {
        let data = {
          id: this.key_for_delete_cusInfo,

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
            this.onGetCustomerList()
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
    async onUpdateCusInfo() {
      try {
        let data = {
          id: this.key_update_cusInfo,
          customerId: this.update_cus_id,
          customerName: this.update_cus_name,
          address: this.update_cus_address,
          vilage: this.update_cus_village,
          district: this.update_cus_district,
          province: this.update_cus_province,
          mobile: this.update_cus_mobile,
          mobile1: this.update_cus_mobile1,
          email: this.Update_cus_email,
          toKen: localStorage.getItem("toKen")

        }
        this.loading_processing = true
        await this.$axios.$post('UpdateCustomer', data).then((data) => {

          this.onGetCustomerList()
          this.showModalUpdateCustomer = false
          if (data?.status == '00') {
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,
            })
            this.loading_processing = false
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
          text: data?.message,
          icon: error,
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

.boldtext {
  font-weight: bold;
}

.styels {
  margin-left: 50px;
}

.tflex {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.ldb-print {
  position: relative;
}

.ldb-print .ldb-text {
  position: absolute;
  top: 60px;
  width: 100%;
}

.fonts {
  font-family: 'Noto Sans Lao UI' !important;
}
</style>

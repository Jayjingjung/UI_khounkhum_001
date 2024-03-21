<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-card class="card-shadow mx-auto" width="1000">
      <v-card-title style="display:flex;background-color:#E57373;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="customer">
          <v-icon color="#E57373">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        ເພີ່ມຂໍ້ມູນລູກຄ້າ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <!-- <v-divider></v-divider> -->
      <Height />
      <Height />
      <v-form v-model="valid" lazy-validation ref="form">
        <div>
          <v-row>
            <v-col cols="6" md="4" sm="4">
              <v-text-field label="ປ້ອນລະຫັດລູກຄ້າ" outlined dense v-model="insert_cus_id"
                :rules="nameRules"></v-text-field>
            </v-col>
            <v-col cols="6" md="4" sm="4"><v-text-field :rules="nameRules" label="ປ້ອນຊື່ລູກຄ້າ" outlined dense
                v-model="insert_cus_name"></v-text-field>
            </v-col><v-col cols="6" md="4" sm="4">
              <v-text-field :rules="nameRules" label="ປ້ອນທີ່ຢູ່" outlined dense
                v-model="insert_cus_address"></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div class="margintops">
          <v-row>
            <v-col cols="6" md="4" sm="4">
              <v-text-field :rules="nameRules" label="ປ້ອນແຂວງ" outlined dense v-model="insert_cus_prov"></v-text-field>
            </v-col>
            <v-col cols="6" md="4" sm="4"><v-text-field :rules="nameRules" label="ປ້ອນເມືອງ" outlined dense
                v-model="insert_cus_dist"></v-text-field>
            </v-col><v-col cols="6" md="4" sm="4"><v-text-field :rules="nameRules" label="ປ້ອນບ້ານ" outlined dense
                v-model="insert_cus_village"></v-text-field> </v-col>
          </v-row>
        </div>
        <!-- <div class="margintops">
          <v-row>
            <v-col cols="6" md="4" sm="4">
              
              
            </v-col>
            <v-col cols="6" md="4" sm="4"></v-col><v-col cols="6" md="4" sm="4"> </v-col>
          </v-row>
        </div> -->
        <div class="margintops">
          <v-row>
            <v-col cols="6" md="4" sm="4">
              <v-text-field :rules="nameRules" label="ປ້ອນເບີໂທ1" outlined dense type="number" min="0"
                v-model="insert_cus_mobile"></v-text-field>
            </v-col>
            <v-col cols="6" md="4" sm="4"><v-text-field :rules="nameRules" label="ປ້ອນເບີໂທ2" outlined dense type="number"
                min="0" v-model="insert_cus_mobile1"></v-text-field>
            </v-col>
            <v-col cols="6" md="4" sm="4"><v-text-field :rules="nameRules" label="ປ້ອນອີແມວ" outlined dense
                v-model="insert_cus_email"></v-text-field>
            </v-col>

          </v-row>
        </div>
      </v-form>
      <v-card-actions>
        <v-btn color="red" @click="onClearCusInfo">
          <v-icon color="white">mdi-close</v-icon>
          <span class="white--text">ລ້າງຂໍ້ມູນ</span>
        </v-btn>
        <div style="width:20px"></div>
        <v-btn color="#448AFF" @click="onInsertCusIngo">
          <v-icon color="white">mdi-check</v-icon>
          <span class="white--text">ບັນທຶກ</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

      <Height />
      <Height />
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
      validCustomer1: true,
      loading_processing: false,
      insert_cus_id: '',
      insert_cus_name: '',
      insert_cus_address: '',
      insert_cus_village: '',
      insert_cus_dist: '',
      insert_cus_prov: '',
      insert_cus_mobile: '',
      insert_cus_mobile1: '',
      insert_cus_email: '',
      insert_branch: '',
      valid: true,
      nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],
    }
  },
  methods: {
    onClearCusInfo() {
      this.$refs.form.reset();

    },
    async onInsertCusIngo() {
      if (!this.$refs.form.validate()) return null
      // return;
      try {
        // if (this.$refs.formInsertCus.validate() == true) {
         

        let data = {
          
          customerId: this.insert_cus_id,
          customerName: this.insert_cus_name,
          address: this.insert_cus_address,
          vilage: this.insert_cus_village,
          district: this.insert_cus_dist,
          province: this.insert_cus_prov,
          mobile: this.insert_cus_mobile,
          mobile1: this.insert_cus_mobile1,
          email: this.insert_cus_email,
          toKen: localStorage.getItem("toKen")


        }
        this.loading_processing = true
        await this.$axios.$post('StoreCustomer',
         data).
         then((data) => {
          console.log('insertCusInfo:', data)
          if (data?.status == '00') {
            this.loading_processing = false
            this.onClearCusInfo()
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,
            })
          } else {
            this.loading_processing = false
            swal.fire({
              title: 'ເກີດຂໍ້ຜິດພາດ',
              text: data?.message,
              icon: 'error',
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            })
          }
        })

        // }
      } catch (error) {
        this.loading_processing = false
        swal.fire({
          title: 'ເກີດຂໍ້ຜິດພາດ',
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
.top {
  margin-top: 0px;
  margin-left: 10px;
}

.tops {
  margin-top: -25px;
  font-size: 14px;
}

.margintops {
  margin-top: -20px;
}
</style>

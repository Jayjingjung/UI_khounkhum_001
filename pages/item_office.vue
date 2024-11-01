<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>

    <v-card class="card-shadow mx-auto" width="1200">
      <v-card-title style="display:flex;background-color:#E57373;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="./HR/itemhr">
          <v-icon color="#E57373">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        ແບບຟອມເພີ່ມ ຂໍ້ມູນ ອຸປະກອນ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <height />

            <v-col cols="3" align="center" class="mt-4">
              <v-card class="text-center" max-width="300px">
                <img :src="imagePreview" height="220px" cover>
              </v-card>
            </v-col>
            <v-row>
              <v-col>
                <v-file-input label="ອັບໂຫຼດຮູບ" outlined dense prepend-icon="mdi-camera"
                  append-inner-icon="mdi-card-account-details" background-color="#f5f5f5" v-model="imageaddcar"
                  @change="previewImage"></v-file-input>
              </v-col>
              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ລະຫັດ" dense outlined background-color="#f5f5f5" v-model="code"></v-text-field>
              </v-col>
              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ຊື່
                        " dense outlined background-color="#f5f5f5" v-model="name"></v-text-field>
              </v-col>
              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ປະເພດ" dense outlined background-color="#f5f5f5"
                  v-model="group_type"></v-text-field>
              </v-col>
              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ເຈົ້າຂອງ" dense outlined background-color="#f5f5f5"
                  v-model="owner"></v-text-field>
              </v-col>
              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ຈໍານວນ" dense outlined background-color="#f5f5f5" v-model="formattedqty"></v-text-field>
              </v-col>

              <v-col cols="6" md="3" sm="3">
                <v-select label="* ສະກຸນເງີນ" dense outlined background-color="#f5f5f5" v-model="currency"
                  :items="currencies"></v-select>
              </v-col>


              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ພະແນກ" dense outlined background-color="#f5f5f5"
                  v-model="department"></v-text-field>
              </v-col>

              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ຢີ່ຫໍ້" dense outlined background-color="#f5f5f5" v-model="brand"></v-text-field>
              </v-col>

              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ລຸ້ນ" dense outlined background-color="#f5f5f5" v-model="model"></v-text-field>
              </v-col>


              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ສະຖານທີ" dense outlined background-color="#f5f5f5"
                  v-model="location_room"></v-text-field>
              </v-col>


              <v-col cols="6" md="3" sm="3">
                <v-menu v-model="licensePlatedate_getin" :close-on-content-click="false" :nudge-right="40"
                  transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="formattedLdate_getin" label="ວັນທີ ຮັບເຂົ້າ" readonly
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date_getin" no-title scrollable
                    @input="updateLicensePlatedate_getin"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6" md="3" sm="3">
                <v-menu v-model="licensePlatedate_getin1" :close-on-content-click="false" :nudge-right="40"
                  transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="formattedLdate_getin1" label="ວັນໝົດອາຍຸ" readonly
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dateExpire" no-title scrollable
                    @input="updateLicensePlatedate_getin1"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ອາຍຸ ການໃຊ້ງານ" dense outlined background-color="#f5f5f5" v-model="life_service"></v-text-field>
              </v-col>


              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ສີ" dense outlined background-color="#f5f5f5" v-model="colors"></v-text-field>
              </v-col>

              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ລາຄາ" dense outlined background-color="#f5f5f5"
                 v-model="formattedprice"></v-text-field>
              </v-col>

              <v-col cols="6" md="3" sm="3">
                <v-text-field label="* ຫົວໜ່ວຍ" dense outlined background-color="#f5f5f5" v-model="unit"></v-text-field>
              </v-col>
            </v-row>
          </v-row>
          <v-row justify="end">
            <v-btn class="mr-4" width="130" color="success" @click="onInserEmpInfo">ບັນທຶກ</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {
      loading_processing: false,
      valid: false,
      imageaddcar: null,
      imagePreview: '',
      code: '',
      name: '',
      group_type: '',
      owner: '',
      qty: '',
      currency: '',
      department: '',
      brand: '',
      model: '',
      location_room: '',
      date_getin: null,
      formattedLdate_getin: '',
      formattedLdate_getin1: '',
      licensePlatedate_getin: false, // Declare the property here
      licensePlatedate_getin1: false, // Declare the property here
      colors: '',
      price: '',
      unit: '',
      currencies: ['USD', 'LAK', 'THB'],
    };
  },
  computed: {
  formattedprice: {
    get() {
      if (!this.price) return '';
      return this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    set(value) {
      if (value == null) {
        this.price = '';
      } else {
        this.price = value.replace(/,/g, '').replace(/\D/g, '');
      }
    }
  },
  formattedqty: {
    get() {
      if (!this.qty) return '';
      return this.qty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    set(value) {
      if (value == null) {
        this.qty = '';
      } else {
        this.qty = value.replace(/,/g, '').replace(/\D/g, '');
      }
    }
  }
}
,
  methods: {
    previewImage() {
      const file = this.imageaddcar;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreview = '';
      }
    },
    updateLicensePlatedate_getin(val) {
      this.formattedLdate_getin = val;
      this.licensePlatedate_getin = false
    },
    updateLicensePlatedate_getin1(val) {
      this.formattedLdate_getin1 = val;
      this.licensePlatedate_getin1 = false
    },
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async onInserEmpInfo() {
      if (!this.$refs.form.validate()) return;

      try {
        const formdata = new FormData();
        formdata.append('files', this.imageaddcar);
        formdata.append('code', this.code);
        formdata.append('name', this.name);
        formdata.append('owner', this.owner);
        formdata.append('group_type', this.group_type);
        formdata.append('qty', this.qty);
        formdata.append('currency', this.currency);
        formdata.append('department', this.department);

    
        formdata.append('life_service', this.life_service);

        formdata.append('brand', this.brand);
        formdata.append('model', this.model);
        formdata.append('location_room', this.location_room);
        formdata.append('colors', this.colors);
        formdata.append('unit', this.unit);
        formdata.append('price', this.price);
        formdata.append('date_getin', this.date_getin ? this.date_getin : '0000-00-00');
        formdata.append('dateExpire ', this.dateExpire  ? this.dateExpire  : '0000-00-00');
        formdata.append('toKen', localStorage.getItem("toKen"));

        this.loading_processing = true;
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/insertAssetsOffice.service', formdata);
        console.log("Response:", data);

        if (data?.status === "00") {
          this.loading_processing = false;
          swal.fire({
            title: 'ສຳເລັດ',
            icon: 'success',
            allowOutsideClick: false,
          });
          this.onClearData();
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
          text: error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },
    onClearData() {
      this.imageaddcar = null;
      this.imagePreview = '';
      this.code = '';
      this.name = '';
      this.group_type = '';
      this.owner = '';
      this.qty = '';
      this.currency = '';
      this.department = '';
      this.brand = '';
      this.model = '';
      this.location_room = '';
      this.date_getin = null;
      this.formattedLdate_getin = '';
      this.formattedLdate_getin1 = '';
      this.licensePlatedate_getin = false;
      this.licensePlatedate_getin1 = false;
      this.colors = '';
      this.price = '';
      this.unit = '';
      this.$refs.form.reset();
    },
  },
};
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

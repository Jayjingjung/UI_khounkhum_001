<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-card class="card-shadow mx-auto" width="600">
      <v-card-title style="display:flex;background-color:#2bcc96; font-weight: bold;">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="$router.back()">
          <v-icon color="#2bcc96">mdi-arrow-left</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        {{ retedLabel }}
        <v-spacer></v-spacer>
      </v-card-title>

      <div>
        <div>
          <v-card-title v-if="village">
            <v-chip color="#2bcc96" dense class="font-weight-bold">
              {{ village }}
            </v-chip>
          </v-card-title>
        </div>
        <div :style="getButtonStyle()">
        </div>
      </div>
      <v-card-text class="pa-6 mx-auto" width="300" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <height />
            <v-file-input style="width: 100%;" label="ອັບໂຫຼດເອກກະສານ" dense append-inner-icon="mdi-file-pdf"
              background-color="#f5f5f5" v-model="files" multiple></v-file-input>
            <!-- <v-file-input style="width: 100%;" label="ອັບໂຫຼດເອກກະສານ" dense append-inner-icon="mdi-file-pdf"
              background-color="#f5f5f5" v-model="files"></v-file-input> -->

            <!-- Conditional rendering based on USER_NAME -->
            <!-- <v-text-field v-if="USER_NAME !== 'Geo-Explo'" style="width: 100%;" label="ເບີຮູເຈາະ" dense
              v-model="full_Name_Hole_number" /> -->
            <div class="mt-8" style="justify-content:space-between; ">
              <spen class="name">ເບີຮູເຈາະ</spen>
              <v-radio-group v-model="inputMethod" row>
                <v-radio label="ເລືອກຈາກລາຍການ" value="select"></v-radio>
                <v-radio label="ປ້ອນເອງ" value="textField"></v-radio>
              </v-radio-group>
            </div>
            <v-text-field v-if="inputMethod === 'textField'" outlined style="width: 100%;" label="ປ້ອນເບີຮູເຈາະ" dense
              v-model="full_Name_Hole_number"></v-text-field>
            <v-autocomplete v-if="inputMethod === 'select'" style="width: 100%;" v-model="full_Name_Hole_number"
              :items="itemOptions" label="ເລືອກຮູເຈາະ" outlined dense required></v-autocomplete>
            <!-- <v-autocomplete v-if="inputMethod === 'select'" v-model="full_Name_Hole_number" :items="itemOptions"
              label="ເລືອກຮູເຈາະ" outlined dense required></v-autocomplete> -->
            <!-- <v-text-field style="width: 100%;" label="ຊື່ເອກະສານ" outlined dense v-model="holeNumber"></v-text-field> -->
            <!-- <v-text-field v-if="USER_NAME !== 'Geo-Explo'" outlined style="width: 100%;" label="*  ຂໍ້ມູນ Collar" dense
              v-model="dataColler"></v-text-field> -->
          </v-row>
          <v-row justify="center">
            <v-btn class="mr-4 font-weight-bold" width="130" color="#2bcc96" @click="onInmining">ບັນທຶກ</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import pdf from 'vue-pdf';

export default {
  components: {
    pdf,
  },
  data() {
    return {
      valid: false,
      type: '',
      toKen: "c27bcc229bf00e6c1deb14b93d6fe80655f35371e4907d0431a23aa4f68b3d41",
      branch_id: '',
      selectedToken: '', // Add selectedToken to track selected button
      loading_processing: false,
      full_Name_Hole_number: "",
      dataColler: null,
      holeNumber: null,
      files: null,
      village: null,
      USER_NAME: localStorage.getItem('USER_NAME'), // Fetch the USER_NAME from localStorage
      inputMethod: 'select',
      itemOptions: [],
    };
  },
  mounted() {
    // รับค่า token และ label จาก query และแสดง
    const branch_id = this.$route.query.branch_id;
    const village = this.$route.query.village;
    if (branch_id && village) {
      this.branch_id = branch_id;
      this.village = village;
    }
    this.fetchItemOptions();
  },
  computed: {
    computedLabel() {
      return this.USER_NAME !== 'Geo-Explo'
        ? 'ຂໍ້ມູນເດີນສໍາຫຼວດ'
        : 'ຊື່ເຂດ';
    },
    retedLabel() {
      return this.USER_NAME !== 'Geo-Explo'
        ? 'ແບບຟອມ ເພີ່ມຮູເຈາະ'
        : 'ຂໍ້ມູນເດີນສໍາຫຼວດ';
    },
  },
  methods: {
    async fetchItemOptions() {
      try {
        const response = await this.$axios.$post('ShowAllListOfHole.service', {
          toKen: localStorage.getItem('toKen'),
          branch_id: this.branch_id,

        });
        this.itemOptions = response.data.map(item => item.full_Name_Hole_number) || [];
      } catch (error) {
        console.error("Error fetching item options:", error);
      }
    },
    getButtonStyle(token) {
      // Conditionally return the button style
      return {
        width: '150px',
        height: '40px',
        fontSize: '18px',
        backgroundColor: this.selectedToken === token ? '#2382dc' : '', // Set background color if selected
        color: this.selectedToken === token ? 'white' : 'black', // Change text color if selected
      };
    },
    async onInmining() {
      if (!this.$refs.form.validate()) return;

      try {
        const formdata = new FormData();

        // Append all files to FormData
        this.files.forEach(file => {
          formdata.append('files[]', file);
        });
        // formdata.append('files', this.files);
        formdata.append('full_Name_Hole_number', this.full_Name_Hole_number);
        formdata.append('holeNumber', this.holeNumber);
        formdata.append('dataColler', this.dataColler);
        formdata.append('toKen', this.toKen);
        formdata.append('branch_id', this.branch_id);
        this.loading_processing = true;
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/StoreDataHole.service', formdata);

        if (data?.status === "00") {
          this.loading_processing = false;
          swal.fire({
            title: 'ສຳເລັດ',
            icon: 'success',
            allowOutsideClick: false,
          });
          this.clearData();
          this.fetchItemOptions();

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
    clearData() {
      this.full_Name_Hole_number = "";
      this.holeNumber = "";
      this.dataColler = "";
      this.files = null;
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
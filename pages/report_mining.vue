<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>

    <v-card class="card-shadow mx-auto" width="800">
      <v-card-title style="display:flex;background-color:#0a3382;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="/mining">
          <v-icon color="#0a3382">mdi-arrow-left</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
{{retedLabel}}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <height />

            <v-col>
              <v-file-input style="width: 100%;" label="ອັບໂຫຼດເອກກະສານ" outlined dense prepend-icon="mdi-file-pdf"
                append-inner-icon="mdi-file-pdf" background-color="#f5f5f5" v-model="files"
                @change="previewImage"></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <!-- Conditional rendering based on USER_NAME -->
              <v-text-field 
                v-if="USER_NAME !== 'Geo-Explo'"
                style="width: 100%;" 
                label="ຊື່ເຕັມຮູເຈາະ" 
                dense 
                outlined 
                background-color="#99dbd2"
                v-model="full_Name_Hole_number" 
              />
            </v-col>
            <v-text-field 
              style="width: 50%;" 
              :label="computedLabel" 
              dense 
              outlined 
              background-color="#99dbd2"
              v-model="holeNumber"
            ></v-text-field>
      
            <!-- Conditional rendering based on USER_NAME -->
            <v-text-field 
              v-if="USER_NAME !== 'Geo-Explo'"
              style="width: 50%;" 
              label="*  ຂໍ້ມູນ Collar" 
              dense 
              outlined 
              background-color="#99dbd2"
              v-model="dataColler"
            ></v-text-field>
          </v-row>
          <v-row justify="center">
            <v-btn class="mr-4" width="130" color="success" @click="onInmining">ບັນທຶກ</v-btn>
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
      loading_processing: false,
      full_Name_Hole_number: "",
      dataColler: "",
      holeNumber: "",
      files: null,
      USER_NAME: localStorage.getItem('USER_NAME'), // Fetch the USER_NAME from localStorage
    };
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
    async onInmining() {
      if (!this.$refs.form.validate()) return;

      try {
        const formdata = new FormData();
        formdata.append('files', this.files);
        formdata.append('full_Name_Hole_number', this.full_Name_Hole_number);
        formdata.append('holeNumber', this.holeNumber);
        formdata.append('dataColler', this.dataColler);
        formdata.append('toKen', localStorage.getItem("toKen"));

        this.loading_processing = true;
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/StoreDataHole.service', formdata);

        if (data?.status === "00") {
          this.loading_processing = false;
          swal.fire({
            title: 'ສຳເລັດ',
            icon: 'success',
            allowOutsideClick: false,
          });

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

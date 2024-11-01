<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>

    <v-card class="card-shadow mx-auto" width="800">
      <v-card-title style="display:flex;background-color:#2bcc96;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="/mining">
          <v-icon color="#0a3382">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        {{ reLabel }}
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <v-col>
              <v-file-input style="width: 100%;" :label="computedLabel" outlined dense prepend-icon="mdi-file-pdf"
                append-inner-icon="mdi-file-pdf" background-color="#f5f5f5" v-model="files"
                @change="previewImage"></v-file-input>
            </v-col>
          </v-row>

          <v-col>
            <v-text-field label="* ປະເພດ ພິມເອງ" dense outlined background-color="#f5f5f5"
              v-model="type"></v-text-field>
          </v-col>
          <div v-if="USER_NAME !== 'Geo-Explo'">
            <v-row>
              <v-col>
                <v-select :items="dropdownItems"  dense outlined v-model="type" label="ປະເພດ" @change="updateConditionalItems"
                  autocomplete :menu-props="{ auto: true }"></v-select>
              </v-col>
            </v-row>
          </div>
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

export default {
  data() {
    return {
      loading_processing: false,
      USER_NAME: localStorage.getItem('USER_NAME'),

      files: null,
      type: '',
      valid: false,
      dropdownItems: ['ບົດວິພາກເຕັກນິກ', 'ບົດວິພາກເສດຖະກິດ'],
    };
  },
  computed: {
    computedLabel() {
      return this.USER_NAME === 'Geo-Explo'
        ? 'ບົດລາຍງານ'
        : 'ອັບໂຫຼດເອກກະສານ';
    },
    reLabel() {
      return this.USER_NAME === 'Geo-Explo'
        ? 'ບົດລາຍງານ'
        : 'ແບບຟອມ ຜົນການສໍາຫຼວດ'; // Customize this label based on your requirements
    },
  }
  ,
  methods: {
    async onInmining() {
      if (!this.$refs.form.validate()) return;

      try {
        const formdata = new FormData();
        formdata.append('files', this.files);
        formdata.append('type', this.type);
        formdata.append('toKen', localStorage.getItem("toKen"));
        this.loading_processing = true;
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/InsertResultOfSurvey.service', formdata);
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
    updateConditionalItems() {
      // Handle any additional logic when dropdown selection changes
    },
    previewImage() {
      // Handle image preview logic
    },
    onClearData() {
      this.files = null;
      this.type = '';
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
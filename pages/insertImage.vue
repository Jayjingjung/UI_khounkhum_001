<template>
  <v-card class="mx-auto" style="border-radius: 36px 1px 36px 2px;" width="630">
    <v-card-title style="display:flex;background-color:#2bcc96; border-radius:36px 0 36px  0;">
      <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="$router.back()">
        <v-icon color="#0a3382">mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div class="font-weight-bold">
        ອັບໂຫລດໄຟລ໌ພາບ
      </div>
      <v-spacer></v-spacer>
    </v-card-title>
    <div>
      <div>
        <v-card-title v-if="number">
          <v-chip color="#2bcc96" dense class="font-weight-bold">
            {{ number }}
          </v-chip>
        </v-card-title>
      </div>
      <div class="ml-8 red--text" style="font-size: 14px;">ໝາຍເຫດ: ຂະໜາດໄຟລ໌ລວມແມ່ນບໍ່ໃຫ້ເກີນ20MB(ຕໍ່ຄັ້ງ)</div>
    </div>
    <div class="ml-4">
      <!-- <v-text-field label="ເລືອກວັນທີ່" v-model="dateCreate" prepend-icon="mdi-calendar" readonly
      @click="datePicker = true" :style="{ width: '230px' }"></v-text-field> -->
      <v-text-field label="ເລືອກວັນທີ່" v-model="dateCreate" readonly @click="datePicker = true"
        :style="{ width: '230px' }">
        <template v-slot:prepend-inner>
          <v-icon style="color: #2bcc96;">mdi-calendar</v-icon>
        </template>
      </v-text-field>

      <v-dialog v-model="datePicker" width="290">
        <v-date-picker v-model="dateCreate" @input="datePicker = false"></v-date-picker>
      </v-dialog>
    </div>
    <v-card-title>
      <!-- <v-file-input label="ເລືອກໄຟລ໌ພາບ" v-model="imageaddcar" dense multiple show-size truncate-length="30"
        prepend-icon="mdi-file"></v-file-input> -->
      <v-file-input label="ເລືອກໄຟລ໌ພາບ" v-model="imageaddcar" dense multiple show-size truncate-length="30">
        <template v-slot:prepend-inner>
          <v-icon style="color: blue;">mdi-file</v-icon>
        </template>
      </v-file-input>
      <v-card-title>
      </v-card-title>
      <v-icon left color="yellow">mdi-folder</v-icon>
      <v-text-field label="ຊື່ໂຟນເດີ່" style="font-size:18px;" dense v-model="folderName"
        :rules="[v => !!v || 'ຕ້ອງປ້ອນ']"></v-text-field>
    </v-card-title>
    <v-card-text>
      <!-- Preview Uploaded Files -->
      <v-row v-if="imageaddcar && imageaddcar.length" class="mt-4">
        <v-col cols="12">
          <h4>ລາຍການໄຟລ໌ທີ່ເລືອກ</h4>
          <v-list dense>
            <v-list-item v-for="(file, index) in imageaddcar" :key="index">
              <v-list-item-content>
                <v-list-item-title>
                  {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="error" @click="removeFile(index)">mdi-close</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <!-- Upload Button -->
    <v-card-actions class="center-actions">
      <v-btn color="#00E676" style="font-size: 14px; font-weight: bold;" @click="uploadFiles"
        :disabled="!imageaddcar.length || !folderName">
        <v-icon left color="white">mdi-cloud-upload</v-icon>
        ບັນທືກການອັບໂຫລດ
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      picList: [],
      selectedPicGroup: null,
      dialog: false,
      fullPic: "",
      folderName: "",
      imageaddcar: [],
      startDate: "",
      endDate: "",
      number: "",
      dateCreate: null,
      datePicker: false,
      toKen: "tZl011U2nNs9AdvQDIStduuOIc8yWmxw",
      key_id:'',
    };
  },
  mounted() {
    // รับค่า token และ label จาก query และแสดง
    const key_id = this.$route.query.key_id;
    const number = this.$route.query.number;
    if (key_id && number) {
      this.key_id=key_id;
      this.number = number;
    }
  },
  methods: {
    removeFile(index) {
      this.imageaddcar.splice(index, 1); // Remove file from the list
    },
    async uploadFiles() {
      if (!this.imageaddcar || !this.imageaddcar.length || !this.folderName) {
        this.$toast.error('ກາລຸນາເລືອກໄຟ ແລະ ປ້ອນຊື່!');
        return;
      }
      const formData = new FormData();
      this.imageaddcar.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("folderName", this.folderName);
      formData.append('dateCreate', new Date(this.dateCreate).toLocaleDateString('en-CA'));
      formData.append('toKen', this.toKen);
      formData.append('key_id', this.key_id);
      try {
        const response = await axios.post(
          "http://khounkham.com/api-prod/v1/truck/StorePicOfBorHin.service",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // this.$toast.success('ອັບໂຫຼດສຳເລັດ')
        this.$toast.success('ອັບໂຫຼດສຳເລັດ', {
          timeout: 3000, // Duration in milliseconds
          customClass: 'custom-toast',
        });
        console.log("Response:", response.data);
        this.imageaddcar = []; // Clear file list after success
        this.folderName = ""; // Clear folder name
      } catch (error) {
        console.error("Error uploading files:", error);
        this.$toast.error('ອັບໂຫຼດລົ້ມເຫຼວ')
      }
    },
    showFullPic(pic) {
      this.fullPic = pic;
      this.dialog = true;
    },
  },
};
</script>

<style>
.custom-toast {
  font-size: 16px;
  /* Adjust the font size as needed */
  font-weight: bold;
}

.center-actions {
  display: flex;
  justify-content: center;
}
</style>

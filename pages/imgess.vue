<template>
  <v-row justify="center">
    <!-- File Upload Section -->
    <v-col cols="12" md="8">
      <v-card outlined>
        <v-card-title>
          <v-icon left>mdi-folder</v-icon>
          <v-text-field label="ຊື່ໂຟນເດີ" style="font-size: 28px; font-weight: bold; width: 210px;margin-top: 15px;" outlined dense
            v-model="folderName" :rules="[v => !!v || 'Required field']"></v-text-field>
        </v-card-title>
        <v-card-title>
          <v-icon left>mdi-upload</v-icon>
          ອັບໂຫລດໄຟລ໌
        </v-card-title>
        <v-card-text>
          <!-- File Input -->
          <v-file-input label="ເລືອກໄຟລ໌ (ຮອງຮັບຫຼາຍ​ໄຟລ​໌)" v-model="imageaddcar" outlined dense multiple show-size
            truncate-length="15" prepend-icon="mdi-file"></v-file-input>
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
        <v-card-actions>
          <v-btn color="primary" @click="uploadFiles" :disabled="!imageaddcar.length || !folderName">
            <v-icon left>mdi-cloud-upload</v-icon>
            อัปโหลดไฟล์
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-container>
      <!-- Button to Load Pictures -->
      <v-btn color="primary" @click="onGetPicList">Load Pictures</v-btn>

      <!-- List of Picture Groups -->
      <v-row v-if="picList.length" class="mt-4">
        <v-col v-for="(picGroup, index) in picList" :key="index" cols="12" sm="6" md="4">
          <!-- Show Pictures Button -->
          <v-btn block color="secondary" @click="showImages(picGroup)">
            {{ picGroup.folderName }} 
            {{ picGroup.dateCreate }} 
            <!-- {{ index + 1 }} -->
          </v-btn>

          <!-- Images List -->
          <v-row v-if="selectedPicGroup === picGroup" class="mt-2">
            <v-col v-for="(pic, i) in parsedPics(picGroup.pic)" :key="i" cols="12" sm="6" md="4">
              <v-img :src="pic" alt="Picture" max-width="100%" class="mb-2" @click="showFullPic(pic)"
                style="cursor: pointer;"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Full Picture Dialog -->
      <v-dialog v-model="dialog" max-width="1000px">
        <v-card>
          <v-img :src="fullPic" alt="Full Picture" max-width="100%"></v-img>
        </v-card>
      </v-dialog>
    </v-container>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      picList: [], // List of picture groups
      selectedPicGroup: null, // Currently selected picture group
      dialog: false, // State for the dialog
      fullPic: "", // URL of the currently selected full picture
      folderName: "", // Folder name for file upload
      imageaddcar: [], // Holds files for upload
      startDate: "", // Start date
      endDate: "", // End date
    };
  },
  methods: {
    removeFile(index) {
      this.imageaddcar.splice(index, 1); // Remove file from the list
    },
    async uploadFiles() {
      if (!this.imageaddcar || !this.imageaddcar.length || !this.folderName) {
        alert("กรุณาเลือกไฟล์และระบุชื่อโฟลเดอร์!");
        return;
      }
      const formData = new FormData();
      this.imageaddcar.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("folderName", this.folderName);
      formData.append("toKen", localStorage.getItem("toKen"));
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
        alert("อัปโหลดไฟล์สำเร็จ!");
        console.log("Response:", response.data);
        this.imageaddcar = []; // Clear file list after success
        this.folderName = ""; // Clear folder name
        this.onGetPicList(); // Refresh picture list
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("การอัปโหลดไฟล์ล้มเหลว!");
      }
    },
    async onGetPicList() {
      try {
        const response = await axios.post(
          "http://khounkham.com/api-prod/v1/truck/ShowPicOfBor.service",
          {
            toKen: localStorage.getItem("toKen"),
          }
        );
        if (response.data.status === "00") {
          this.picList = response.data.data; // Adjusted to store the full object
        } else {
          console.error("Error fetching pictures:", response.data.message);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    },
    parsedPics(picGroup) {
      const baseUrl = "http://khounkham.com/images/car/";
      return picGroup
        .replace("[", "")
        .replace("]", "")
        .split(", ")
        .map((filename) => {
          const trimmedFilename = filename.trim();
          return trimmedFilename.startsWith("http")
            ? trimmedFilename
            : `${baseUrl}${trimmedFilename}`;
        });
    },
    showImages(picGroup) {
      this.selectedPicGroup = this.selectedPicGroup === picGroup ? null : picGroup;
    },
    showFullPic(pic) {
      this.fullPic = pic;
      this.dialog = true;
    },
  },
};
</script>

<style>
/* Optional styling */
</style>

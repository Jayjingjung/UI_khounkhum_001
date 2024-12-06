<template>
  <v-container>
    <v-row justify="center">
      <!-- File Upload Section -->
      <v-col cols="12" md="8">
        <v-card outlined>
          <v-card-title>
            <v-icon left>mdi-upload</v-icon>
            อัปโหลดไฟล์
          </v-card-title>
          <v-card-text>
            <!-- File Input -->
            <v-file-input
              label="เลือกไฟล์ (รองรับหลายไฟล์)"
              v-model="imageaddcar"
              outlined
              dense
              multiple
              show-size
              truncate-length="15"
              prepend-icon="mdi-folder"
            ></v-file-input>

            <!-- Preview Uploaded Files -->
            <v-row v-if="imageaddcar.length" class="mt-4">
              <v-col cols="12">
                <h4>รายการไฟล์ที่เลือก</h4>
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
            <v-btn color="primary" @click="uploadFiles" :disabled="!imageaddcar.length">
              <v-icon left>mdi-cloud-upload</v-icon>
              อัปโหลดไฟล์
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageaddcar: [], // เก็บไฟล์ที่ผู้ใช้เลือก
    };
  },
  methods: {
    removeFile(index) {
      this.imageaddcar.splice(index, 1); // ลบไฟล์ออกจากลิสต์
    },
    async uploadFiles() {
      if (!this.imageaddcar.length) {
        alert("กรุณาเลือกไฟล์!");
        return;
      }

      const formData = new FormData();
      this.imageaddcar.forEach((file) => {
        formData.append("files", file);
      });
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
        this.imageaddcar = []; // ล้างลิสต์หลังอัปโหลดสำเร็จ
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("การอัปโหลดไฟล์ล้มเหลว!");
      }
    },
  },
};
</script>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติม */
</style>

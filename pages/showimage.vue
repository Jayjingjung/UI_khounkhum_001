<template>
  <v-container>
    <v-card outlined class="pa-5">
      <v-card-title class="font-weight-bold text-center">ອັບໂຫລດຮູບພາບ</v-card-title>
      <v-card-text>
        <v-file-input
          label="ເລືອກຮູບພາບ"
          v-model="selectedFiles"
          multiple
          outlined
          dense
          accept="image/*"
        ></v-file-input>
        <v-btn color="primary" class="mt-3" @click="uploadImages">
          ອັບໂຫລດ
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedFiles: [], // เก็บไฟล์ที่เลือก
      token: "ce71df4dc560de1e3e3d08a85db646710b493e3106c7af94ae10372d61f9eda8", // Token
    };
  },
  methods: {
    async uploadImages() {
      if (!this.selectedFiles.length) {
        alert("ກະລຸນາເລືອກຮູບພາບກ່ອນ");
        return;
      }

      try {
        const formData = new FormData();

        // เพิ่มไฟล์ลงใน FormData
        console.log(this.selectedFiles);
        this.selectedFiles.forEach((file) => {
          console.log("Adding file:", file.name);
          formData.append("files", file); // ใช้ชื่อฟิลด์ตามที่ Back-End ต้องการ
        });

        // เพิ่ม Token
        formData.append("toKen", this.token);

        // ส่งคำขอไปยัง API
        const response = await fetch(
          "http://khounkham.com/api-prod/v1/truck/StorePicOfBorHin.service",
          {
            method: "POST",
            body: formData,
          }
        );

        // ตรวจสอบสถานะการตอบกลับ
        if (response.ok) {
          const result = await response.json();
          alert("ອັບໂຫລດສຳເລັດ!");
          console.log("ผลลัพธ์:", result);
        } else {
          const error = await response.json();
          console.error("Error:", error);
          alert("ອັບໂຫລດລົ້ມເຫລວ: " + error.message);
        }
      } catch (err) {
        console.error("Error uploading images:", err);
        alert("ມີບັນຫາໃນການອັບໂຫລດ");
      }
    },
  },
};
</script>

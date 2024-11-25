<template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title class="font-weight-bold text-center">ສໄລດຮູບພາບ</v-card-title>
        <v-card-text>
          <v-carousel cycle hide-delimiters>
            <v-carousel-item
              v-for="(image, index) in images"
              :key="index"
              :src="image.pic"
            ></v-carousel-item>
          </v-carousel>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="fetchImages">ດຶງຮູບພາບໃຫມ່</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  ---
  
  <script>
  export default {
    data() {
      return {
        images: [], // เก็บรายการรูปภาพ
        token: "ce71df4dc560de1e3e3d08a85db646710b493e3106c7af94ae10372d61f9eda8", // Token
      };
    },
    methods: {
      async fetchImages() {
        try {
          const response = await this.$axios.$post(
            "http://khounkham.com/api-prod/v1/truck/ShowPicOfBor.service",
            {
              toKen: this.token,
            }
          );
  
          if (response.data) {
            this.images = response.data; // ดึงรายการรูปภาพจาก API
          } else {
            this.$toast.error("ບໍ່ພົບຂໍ້ມູນຮູບພາບ");
          }
        } catch (error) {
          console.error("Error fetching images:", error);
          this.$toast.error("ດຶງຮູບພາບລົ້ມເຫລວ");
        }
      },
    },
    mounted() {
      this.fetchImages(); // ดึงรูปภาพเมื่อโหลดหน้า
    },
  };
  </script>
  
  ---
  
  <style scoped>
  .v-carousel-item {
    height: 400px; /* กำหนดความสูงของภาพ */
  }
  </style>
  
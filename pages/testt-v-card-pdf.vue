<template>
    <v-container>
      <!-- Title -->
      <v-row justify="center" class="mb-4">
        <v-col cols="12" md="8">
          <h1 class="text-center">รายชื่อร้านค้า</h1>
        </v-col>
      </v-row>
  
      <!-- Search Bar -->
      <v-row justify="center" class="mb-4">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="search"
            label="ค้นหาร้านค้า"
            append-icon="mdi-magnify"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
  
      <!-- Data Table -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-data-table
            :headers="headers"
            :items="filteredShops"
            :items-per-page="5"
            dense
            outlined
          >
            <template v-slot:top>
              <v-btn color="primary" @click="addShop">
                เพิ่มร้านค้า
              </v-btn>
            </template>
  
            <template v-slot:item.actions="{ item }">
              <v-btn icon @click="editShop(item)">
                <v-icon color="blue">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteShop(item)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: "",
        headers: [
          { text: "ชื่อร้านค้า", value: "name" },
          { text: "เจ้าของร้าน", value: "owner" },
          { text: "เบอร์ติดต่อ", value: "phone" },
          { text: "ที่อยู่", value: "address" },
          { text: "จัดการ", value: "actions", sortable: false },
        ],
        shops: [
          { name: "ร้านค้า A", owner: "คุณสมชาย", phone: "020-12345678", address: "เวียงจันทน์" },
          { name: "ร้านค้า B", owner: "คุณสมหญิง", phone: "020-87654321", address: "หลวงพระบาง" },
          { name: "ร้านค้า C", owner: "คุณวิชัย", phone: "020-11223344", address: "ปากเซ" },
        ],
      };
    },
    computed: {
      filteredShops() {
        return this.shops.filter((shop) =>
          shop.name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      addShop() {
        alert("เพิ่มร้านค้าใหม่");
        // เขียนฟังก์ชันเพิ่มร้านค้าได้ตามต้องการ
      },
      editShop(shop) {
        alert(`แก้ไขร้านค้า: ${shop.name}`);
        // เขียนฟังก์ชันแก้ไขร้านค้าได้ตามต้องการ
      },
      deleteShop(shop) {
        const confirmDelete = confirm(`คุณต้องการลบร้านค้า ${shop.name} หรือไม่?`);
        if (confirmDelete) {
          this.shops = this.shops.filter((item) => item !== shop);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>
  
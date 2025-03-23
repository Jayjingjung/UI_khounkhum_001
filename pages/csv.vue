<template>
    <v-container>
      <v-btn @click="fetchApiData" color="primary" class="mb-4">Load Data</v-btn>
      
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [], // Stores API response
        headers: [
          { text: "ID", value: "id" },
          { text: "Name", value: "name" },
          { text: "Quantity", value: "quantity" },
          { text: "Status", value: "status" },
        ],
        borId: "94", // Example borId
      };
    },
    methods: {
      async fetchApiData() {
        try {
          const response = await this.$axios.$post(
            "http://khounkham.com/api-prod/v1/truck/ShowRockShipSample.service",
            { borId: this.borId }
          );
          this.items = response.data; // Adjust based on API response structure
        } catch (error) {
          console.error("API fetch error:", error);
        }
      },
    },
  }; 
  </script>
  
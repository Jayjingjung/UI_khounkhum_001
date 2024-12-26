<template>
    <div>
      <v-card>
        <v-card-title>Branch Management</v-card-title>
        <v-card-text>
          <v-form ref="branchForm" v-model="formValid">
            <v-text-field
              v-model="branchData.b_name"
              label="Branch Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="branchData.b_tel"
              label="Telephone"
              required
            ></v-text-field>
            <v-text-field
              v-model="branchData.location"
              label="Location"
              required
            ></v-text-field>
            <v-text-field
              v-model="branchData.email"
              label="Email"
              required
            ></v-text-field>
          </v-form>
          <v-btn color="primary" @click="addBranch">Add Branch</v-btn>
          <v-btn color="secondary" @click="updateBranch">Update Branch</v-btn>
        </v-card-text>
      </v-card>
  
      <v-card class="mt-5">
        <v-card-title>Branches</v-card-title>
        <v-data-table :headers="headers" :items="branches" item-value="key_id">
          <template v-slot:item.actions="{ item }">
            <v-btn color="error" @click="deleteBranch(item.key_id)">Delete</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formValid: false,
        branchData: {
          key_id: null,
          b_name: "",
          b_tel: "",
          location: "",
          email: "",
        },
        branches: [],
        headers: [
          { text: "Branch Name", value: "b_name" },
          { text: "Telephone", value: "b_tel" },
          { text: "Location", value: "location" },
          { text: "Email", value: "email" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    methods: {
      async fetchBranches() {
        try {
          const response = await this.$axios.$post("/getShowBranchNew2024.service", {
            toKen: localStorage.getItem("toKen"),
          });
          if (response?.status === "00") {
            this.branches = response.data;
          }
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      },
      async addBranch() {
        try {
          const response = await this.$axios.$post("/storeBranch.service", {
            toKen: localStorage.getItem("toKen"),
            b_name: this.branchData.b_name,
            b_tel: this.branchData.b_tel,
            location: this.branchData.location,
            email: this.branchData.email,
          });
          if (response?.status === "00") {
            this.fetchBranches();
            this.resetForm();
          }
        } catch (error) {
          console.error("Error adding branch:", error);
        }
      },
      async deleteBranch(key_id) {
        try {
          const response = await this.$axios.$post("/DelBranchs.service", {
            key_id,
          });
          if (response?.status === "00") {
            this.fetchBranches();
          }
        } catch (error) {
          console.error("Error deleting branch:", error);
        }
      },
      async updateBranch() {
        try {
          const response = await this.$axios.$post("/storeBranch.service", {
            key_id: this.branchData.key_id,
            toKen: localStorage.getItem("toKen"),
            b_name: this.branchData.b_name,
            b_tel: this.branchData.b_tel,
            location: this.branchData.location,
            email: this.branchData.email,
          });
          if (response?.status === "00") {
            this.fetchBranches();
            this.resetForm();
          }
        } catch (error) {
          console.error("Error updating branch:", error);
        }
      },
      resetForm() {
        this.branchData = {
          key_id: null,
          b_name: "",
          b_tel: "",
          location: "",
          email: "",
        };
      },
    },
    mounted() {
      this.fetchBranches();
    },
  };
  </script>
  
  <style scoped>
  .mt-5 {
    margin-top: 20px;
  }
  </style>

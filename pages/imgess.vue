<template>
    <v-col>
      <v-file-input
        label="ອັບໂຫຼດຮູບ"
        outlined
        dense
        prepend-icon="mdi-camera"
        append-inner-icon="mdi-card-account-details"
        background-color="#f5f5f5"
        v-model="imageaddcar"
        @change="previewImages"
        multiple
      ></v-file-input>
      <v-btn color="primary" @click="uploadFiles">Upload Files</v-btn>
    </v-col>
  </template>
  
<script>
import axios from 'axios'; // Make sure you have Axios installed

export default {
  data() {
    return {
      imageaddcar: [], // Holds the array of selected files
    };
  },
  methods: {
    previewImages() {
      if (this.imageaddcar.length) {
        this.imageaddcar.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log(`Preview image: ${e.target.result}`); // Do something with the image preview
          };
          reader.readAsDataURL(file);
        });
      }
    },
    async uploadFiles() {
      if (!this.imageaddcar.length) {
        alert('No files selected!');
        return;
      }

      const formData = new FormData();

      // Append each file to the FormData object
      this.imageaddcar.forEach((file, index) => {
        formData.append(`files[${index}]`, file); // Key as an array: files[0], files[1], etc.
      });

      try {
        const response = await axios.post('http://khounkham.com/api-prod/v1/truck/StorePicOfBorHin.service', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload successful:', response.data);
        alert('Files uploaded successfully!');
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload files.');
      }
    },
  },
};
</script>

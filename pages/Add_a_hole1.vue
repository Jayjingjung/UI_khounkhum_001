<template>
    <div>
      <h1>Add a Hole</h1>
      <!-- Display the token in the UI -->
      <p>Your token is: {{ token }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        token: ''
      };
    },
    created() {
      // Retrieve the token from query parameters when the component is created
      this.token = this.$route.query.token || '';
      console.log('Token:', this.token); // For debugging
    }
  };
  </script>
  
  <style scoped>
  /* Optional styling */
  p {
    font-size: 18px;
    color: #333;
  }
  </style>
  
<template>
  <v-app dark>
    <div>
      <appbarloginser />
    </div>
    <div
      v-if=" USER_NAME === 'over' ||userRole === 'HR' || userRole === 'FOR_DOCUMENT' || userRole === 'FOR_DOCUMENT_ADMIN' || userRole === 'BOR-HIN-KHUAT'">
      <appbarvt />
    </div>
    <div class="content mt-5">
      <v-main class="bg pl-10 mr-10 ml-1 d-flex justify-center align-vertical">
        <div class="content mt-10">
          <Nuxt />
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      userRole: null,
      sprit_role: null
    };
  },
  mounted() {
    // Retrieve user role from local storage
    this.userRole = localStorage.getItem("USER_ROLE");
    this.sprit_role = localStorage.getItem("USER_ROLE");
    this.USER_NAME = localStorage.getItem("USER_NAME");
  }
};
</script>

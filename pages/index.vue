<template>
  <div class="bgss">
    <v-row class="bgs" align="center">
      <v-col>
        <v-card width="400" class="mx-auto card-shadow" rounded="lg">
          <div class="text-center pt-6 pb-4" style="font-size:18pt">
            ຍິນດີເຂົ້າສູ່ລະບົບ
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field label="ຊື່ຜູ້ໃຊ້" prepend-icon="mdi-account" v-model="userName"></v-text-field>
            <v-text-field label="ລະຫັດຜ່ານ" placeholder="**********"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" prepend-icon="mdi-lock" v-model="password"
              :type="showPassword ? 'text' : 'password'" @click:append="onShowPassword"
              @keyup.enter="onLogin"></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <div style="display: flex; flex-direction: row; justify-content: center" class="px-10 pb-6">
            <v-btn :loading="loadingLogin" color="#50A54D" class="card-shadow mt-4 white--text" @click="onLogin">
              ເຂົ້າສູ່ລະບົບ
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import swal from 'sweetalert2';

export default {
  layout: 'blank',
  data() {
    return {
      showPassword: false,
      userName: '',
      password: '',
      loadingLogin: false,
    };
  },
  methods: {
    onShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async onLogin() {
      if (this.userName && this.password) {
        try {
          this.loadingLogin = true;
          const data = {
            user: this.userName,
            password: this.password,
          };
          const response = await this.$axios.$post('Login', data);
          if (response?.status === '00') {
            this.handleLoginSuccess(response?.data);
          } else {
            this.handleLoginError(response?.message);
          }
        } catch (error) {
          this.handleLoginError(error);
        }
      }
    },
    handleLoginSuccess(data) {
      localStorage.setItem('USER_ID', data?.staftId);
      localStorage.setItem('USER_NAME', data?.staftName);
      localStorage.setItem('USER_ROLE', data?.role);
      localStorage.setItem('DEPARTMENT', data?.department); // Added this line
      localStorage.setItem('toKen', data?.toKen);
      this.loadingLogin = false;

      const USER_ROLE = localStorage.getItem('USER_ROLE');
      const USER_NAME = localStorage.getItem('USER_NAME');

      if (USER_ROLE === 'FOR_DOCUMENT'||USER_ROLE === 'HR'||USER_ROLE=== 'FINANCE') {
        this.$router.push('/homepagehr');
      } else if (USER_NAME === 'sisnok' && USER_ROLE === 'FOR_DOCUMENT_ADMIN') {
        this.$router.push('/dashboard');
      } else if (USER_NAME === 'admin-bor-hin-khuad' && USER_ROLE === 'BOR-HIN-KHUAT') {
        this.$router.push('/stone_admin');
      } 
      else if (USER_NAME === 'NN') {
        this.$router.push('./HR/akasarn');
      }
      else if (USER_NAME === 'AdminProof' ) {
        this.$router.push('/confirm');
      }
      else if (['borhinkuad-konengua', 'borhinkuad-sykhoun', 'borhinkuad-tha', 'borhinkuad-xiengkong', 'Geo-Explo'].includes(USER_NAME)) {
        this.$router.push('/mining');
      } else {
        this.$router.push('/homepage');
      }
    },
    handleLoginError(message) {
      this.loadingLogin = false;
      swal.fire({
        title: 'ແຈ້ງເຕືອນ',
        text: message,
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    },
  },
};
</script>

<style scoped>
.bgss {
  background-color: #3992C8;
}

.bgs {
  background: linear-gradient(#3C98CE, #2171A1, #144D70);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
  background-image: url('../assets/images/tbg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

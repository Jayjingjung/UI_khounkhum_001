<template>
  <div class="bgss">
    <v-row class="bgs" align="center">
      <v-col>

        <v-card width="400" class="mx-auto card-shadow" rounded="lg">
          <div class="text-center pt-6 pb-4" style="font-size:18pt">ຍິນດີເຂົ້າສູ່ລະບົບ</div>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field label="ຊື່ຜູ້ໃຊ້" prepend-icon="mdi-account" v-model="userName"></v-text-field>
            <v-text-field label="ລະຫັດຜ່ານ" placeholder="**********"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" prepend-icon="mdi-lock" v-model="password"
              :type="showPassword ? 'text' : 'password'" @click:append="onShowpassword"
              @keyup.enter="onLogin"></v-text-field>

          </v-card-text>
          <v-divider></v-divider>
          <div style="display:flex;flex-direction:row;justify-content:center" class="px-10 pb-6">
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
import swal from 'sweetalert2'
export default {
  layout: 'blank',
  data() {
    return {
      showPassword: false,
      userName: '',
      password: '',
      loadingLogin: false,
    }
  },
  methods: {
    onShowpassword() {
      this.showPassword = !this.showPassword
    },
    async onLogin() {
      try {
        if (this.userName != '' && this.password != '' ) {
          let data = {
            user: this.userName,
            password: this.password,
          }
          this.loadingLogin = true
          await this.$axios.$post('Login', data).then((data) => {
            if (data?.status == '00') {
              console.log(data)
              localStorage.setItem('USER_ID', data?.data?.staftId)
              localStorage.setItem('USER_NAME', data?.data?.staftName)
              localStorage.setItem('USER_ROLE', data?.data?.role)
              localStorage.setItem('toKen', data?.data?.toKen)
              this.loadingLogin = false
              this.$router.push('/homepage')
            } else {
              this.loadingLogin = false
              swal.fire({
                title: 'ແຈ້ງເຕືອນ',
                text: data?.message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              })
            }
          })
        }
      } catch (error) {
        this.loadingLogin = false
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      }
    },
  },
}
</script>
<style scoped>
.bg {
  background-color: #3992C8;
}

.bgs {
  background: linear-gradient(#3C98CE, #2171A1, #144D70);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100VH;
  background-image: url('../assets/images/tbg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  
}


</style>
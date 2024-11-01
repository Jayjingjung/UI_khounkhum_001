<template>
    <div>
        <div v-if="carDetail">
            <v-card class="card-shadow mx-auto" width="1600">
                <v-card-title style="display:flex;background-color:#E57373;color:white">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="carindek_hr">
                        <v-icon color="#E57373">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    ແບບຟອມ ຂ່າຍລົດດາວ
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-form v-model="valid" ref="form" lazy-validation>

                    <v-card flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="3">
                                    <v-card class="text-center" max-width="344">
                                        <img :src="carDetail.img" height="220px" cover>
                                    </v-card>
                                </v-col>
                                <v-col cols="9">
                                    <v-row style="margin-top: 40px;">
                                        <v-col cols="6" md="4" sm="4">
                                            <v-file-input style="margin-top: 20px;" :rules="nameRules" label="files"
                                                outlined dense prepend-icon="mdi-file-outline"
                                                append-inner-icon="mdi-card-account-details" background-color="#f5f5f5"
                                                v-model="pdf"></v-file-input>
                                        </v-col>
                                        <v-col cols="6" md="4" sm="4">
                                            <span>ລາຄາຈ່າຍ</span>
                                            <v-text-field :rules="nameRules" label="ລາຄາຈ່າຍ" dense flat solo
                                            background-color="#f5f5f5" v-model="pricePaid"></v-text-field>
                                            <div class="tops"></div>
                                        </v-col>
                                        <v-col cols="6" md="4" sm="4">
                                            <span>ສະກຸນເງີນ</span>
                                            <v-text-field   :rules="nameRules" label="ສະກຸນເງີນ" dense flat solo
                                                background-color="#f5f5f5" v-model="cur"></v-text-field>
                                            <div class="tops"></div>
                                        </v-col>
                                        <!-- Add more fields here as needed -->
                                    </v-row>
                                   
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-row justify="end">
                        <v-btn style="margin-top: -30px;margin-bottom: -60px;margin-right: -60px;" class="mr-4" width="130" color="success" @click="onpayDAO">ບັນທຶກ</v-btn>
                    </v-row>
                </v-form>
            </v-card>
        </div>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            carDetail: null,
            carId:'',
            cur:'LAK',
            pricePaid:'',
            files:null,
        }
    },
    mounted() {
        if (this.$route.query.keyId) {
            this.ongetData(this.$route.query.keyId);
        }
    },
    methods: {
        async ongetData(keyId) {
            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listCarOfficeDetailById.service', {
                    keyId: keyId
                });
                if (data?.status === "00") {
                    this.carDetail = data?.data[0];
                } else {
                    swal.fire({
                        icon: 'error',
                        text: 'Failed to fetch car details',
                    });
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                });
                console.log(error);
            }
        },
        async onpayDAO() {
      if (!this.$refs.form.validate()) return null
      try {
        const formdata = new FormData();
        formdata.append('files', this.pdf)
        formdata.append('cur', this.cur)
        formdata.append('pricePaid', this.pricePaid)
        formdata.append('carId', this.carDetail.key_ID)
        formdata.append('toKen', localStorage.getItem("toKen"))

        this.loading_processing = true
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/PayLodDao.service', formdata);
        console.log("Response:", data);
        if (data?.status == "00") {
          this.loading_processing = false;
          swal.fire({
            title: 'ສຳເລັດ',
            icon: 'success',
            allowOutsideClick: false,
          });
          if (typeof this.onClearData === 'function') {
            this.onClearData();
          } else {
            console.error("onClearData is not a function");
          }
        } else {
          this.loading_processing = false;
          swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: data?.message,
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    //   window.location.reload();

    },
    },
}
</script>

<style></style>
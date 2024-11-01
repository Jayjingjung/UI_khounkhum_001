<template>
    <div class="pt-5">
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <v-card class="card-shadow mx-auto" width="1600">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="./HR/itemhr">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ແບບຟອມ ອັບເດດ ຂໍ້ມູນ ລົດບໍລິຫານ
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
                <v-form v-model="valid" lazy-validation ref="form">
                    <v-row>
                        <height />
                        <v-col cols="3" align="center" class="mt-4">
                            <v-card class="text-center" max-width="500px">
                                <img :src="carDetail?.img" height="220px" cover>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-row>
                                <v-col>
                                    <v-file-input :rules="nameRules" label="ອັບໂຫຼດຮູບ" outlined dense
                                        prepend-icon="mdi-camera" append-inner-icon="mdi-card-account-details"
                                        background-color="#f5f5f5" v-model="img"></v-file-input>
                                </v-col>
                                <v-col>
                                    <v-text-field label="* ລະຫັດ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.code"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ຊື່" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.name"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ປະເພດ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.group_type"></v-text-field>
                                </v-col>

                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ເຈົ້າຂອງ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.owner"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ຈໍານວນ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.qty"></v-text-field>
                                </v-col>
                                <!-- <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* branch_office" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.branch_office"></v-text-field>
                                </v-col> -->


                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ສະກຸນເງີນ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.currency"></v-text-field>
                                </v-col>

                                <!-- <p>{{ carDetail.currency }}</p>
                                <v-col cols="6" md="3" sm="3">
                                    <v-select label="* ສະກຸນເງີນ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.currency"></v-select>
                                </v-col> -->





                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ພະແນກ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.department"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ຢີ່ຫໍ້" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.brand"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ລຸ້ນ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.model"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ສະຖານທີ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.location_room"></v-text-field>
                                </v-col>

                                <v-menu v-model="licensePlateDate_getin" :close-on-content-click="false"
                                    :nudge-right="40" transition="scale-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="carDetail.date_getin" label="ວັນທີ ຮັບເຂົ້າ" readonly
                                            v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="carDetail.date_getin" no-title scrollable
                                        @input="updateLicensePlateDate_getin"></v-date-picker>
                                </v-menu>

                                <v-menu v-model="licensePlateDate_getin1" :close-on-content-click="false"
                                    :nudge-right="40" transition="scale-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="carDetail.dateExpire" label="ວັນທີໝົດອາຍູ" readonly
                                            v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="carDetail.dateExpire" no-title scrollable
                                        @input="updateLicensePlateDate_getin1"></v-date-picker>
                                </v-menu>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ອາຍຸການໃຊ້ງານ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.life_service"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ຫົວໜ່ວຍ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.unit"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ສີ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.colors"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ລາຄາ" dense outlined background-color="#f5f5f5"
                                        v-model="carDetail.price"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <p style="color: deeppink;margin-right: 20px;margin-top: 10px;font-size: 20px;">ກອນອັບເດດ
                            ຖຸກຄັງໃຫ້ ໃສ່
                            ຮູບພາບລົດ
                        </p>
                        <v-btn class="mr-4" width="130" style="background-color: gray;color: aliceblue;"
                            @click="onupdateInserEmpInfo">ບັນທຶກ</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            loading_processing: false,
            valid: false,
            carDetail: {
                img: '',
                code: '',

                formattedLDate_getin: '',
                name: '',
                date_getin: '', // Corrected property name from licensePlateDate_getin
                group_type: '',
                currency: null, // Ensure currency is defined here
                currencies: ['USD', 'LAK', 'THB'], // Ensure this array is correctly populated
                owner: '',
                qty: '',
                currency: '', // Ensure currency is defined here
                department: '',
                brand: '',
                model: '',
                location_room: '',
                unit: '',
                colors: '',
                price: '',
                key_id: '', // Ensure key_id is defined here
            },
            img: null,
            nameRules: [
                v => !!v || 'Image is required'
            ]
        }
    },


    mounted() {
        if (this.$route.query.key_id) {
            this.ongetData(this.$route.query.key_id);
        }
    },
    computed: {
        technicCheckDateColor_date_getin() {
            if (!this.carDetail.date_getin) return 'white';
            const currentDate = new Date();
            const checkDate = new Date(this.carDetail.date_getin);
            const oneMonthLater = new Date(currentDate);
            oneMonthLater.setMonth(currentDate.getMonth() + 1);

            if (currentDate > checkDate) {
                return 'red';
            } else if (oneMonthLater > checkDate) {
                return 'red';
            } else {
                return 'white';
            }
        },
    },
    methods: {
        async ongetData(key_id) {
            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listAssetsOfficeDetail.service', {
                    key_id: key_id
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
        updateLicensePlateDate_getin(val) {
            this.formattedLDate_getin = val
            this.licensePlateDate_getin = false
        },
        updateLicensePlateDate_getin(value) {
            this.carDetail.date_getin = value;
        },
        updateLicensePlateDate_getin1(val) {
            this.formattedLDate_getin1 = val
            this.licensePlateDate_getin1 = false
        },
        updateLicensePlateDate_getin1(value) {
            this.carDetail.dateExpire = value;
        },
        async onupdateInserEmpInfo() {
            if (!this.$refs.form.validate()) return null
            try {
                const formdata = new FormData();
                formdata.append('files', this.img)
                formdata.append('code', this.carDetail.code)
                formdata.append('name', this.carDetail.name)
                formdata.append('group_type', this.carDetail.group_type)

                formdata.append('owner', this.carDetail.owner)

                formdata.append('qty', this.carDetail.qty)

                // formdata.append('branch_office', this.carDetail.branch_office)

                formdata.append('currency', this.carDetail.currency);


                formdata.append('department', this.carDetail.department)

                formdata.append('brand', this.carDetail.brand)

                formdata.append('model', this.carDetail.model)

                formdata.append('location_room', this.carDetail.location_room)


                formdata.append('unit', this.carDetail.unit)

                formdata.append('colors', this.carDetail.colors)

                formdata.append('price', this.carDetail.price)
                formdata.append('key_id', this.carDetail.key_id)
                formdata.append('life_service  ', this.carDetail.life_service)


                formdata.append('date_getin', this.carDetail.date_getin ? this.carDetail.date_getin : '0000-00-00')
                formdata.append('dateExpire ', this.carDetail.dateExpire ? this.carDetail.dateExpire : '0000-00-00')
                formdata.append('toKen', localStorage.getItem("toKen"))

                this.loading_processing = true
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/UpdateAssetOffice.service', formdata);
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
        },

        onClearData() {
            console.log("Clearing data...");
            // Define your method to clear data here
        },
    },
}
</script>

<style lang="scss">
.margintops {
    margin-top: -25px;
}

.top {
    margin-top: 5px;
    margin-left: 10px;
}

.tops {
    margin-top: -25px;
    font-size: 14px;
}

.preview-image {
    width: 220px;
    height: 220px;
}

.red-background {
    background-color: red !important;
}
</style>

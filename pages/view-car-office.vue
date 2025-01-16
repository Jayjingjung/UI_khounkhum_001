<template>
    <div>
        <div>
            <v-card color="transparent" flat>
                <v-card-text>
                    <div v-if="carDetail">
                        <img :src="carDetail.img" style=" height: 240px; width: 300px; border-radius: 15px;"
                            alt="Car Image" />
                    </div>
                </v-card-text>
            </v-card>
        </div>
        <div style="display: flex;">
            <v-card
                style="width: 650px;height: 500px;background: #71d8ef;border-radius: 60px;font-family: 'Times New Roman', Times, serif;">
                <div v-if="carDetail">
                    <height></height>
                    <div style="margin-top: 30px;">
                        <p style="text-align: center;font-size: 24px;font-weight: 800;">
                            ໃບທະບຽນຍານພາຫະນະ</p>
                    </div>
                    <div style="font-weight: 400;">
                        <div style="display: flex;margin-left: 50px;margin-top: 30px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ຊື່:</p>
                            <p>{{ carDetail.owner_car }}</p>
                            <!-- <img :src="carDetail.img"
                                style="position: absolute;margin-left: 30px; height: 140px; width: 200px; border-radius: 15px;"
                                alt="Car Image" /> -->
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ປະເພດ:</p>
                            <p>{{ carDetail.car_type }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ເລກຖັງ:</p>
                            <p>{{ carDetail.lekThung }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ເລກຈັກ:</p>
                            <p style="margin-right: 70px;">{{ carDetail.lekJuk }}</p>
                            <p style="margin-right: 10px;"> ລົດປີ:</p>
                            <p>{{ carDetail.car_year }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ວັນອອກໃບທະບຽນ:</p>
                            <p style="margin-right: 35px;">{{ carDetail.license_plate_start }}</p>
                            <p style="margin-right: 10px;"> ວັນໜົດອາຍູໃບທະບຽນ:</p>
                            <p>{{ carDetail.license_plate_end }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ຍີ່ຫໍ້ລົດ:</p>
                            <p style="margin-right: 175px;">{{ carDetail.car_brand }}</p>
                            <p style="margin-right: 10px;"> ສີລົດ:</p>
                            <p>{{ carDetail.carColor }}</p>
                        </div>
                        <div v-if="carDetail">
                            <v-card class="mx-auto" width="300px" color="yellow">
                                <div style="text-align: center;font-size: 30px;font-weight: 600;">
                                    {{ carDetail.license_plate }}
                                </div>
                            </v-card>
                        </div>
                    </div>
                </div>
            </v-card>
            <v-card
                style="width: 650px;height: 500px;background:#bfd8d9;border-radius: 60px;font-family: 'Times New Roman', Times, serif;margin-left: 50px;">
                <div v-if="carDetail">
                    <height></height>
                    <div style="margin-top: 30px;">
                        <p style="text-align: center;font-size: 24px;font-weight: 800;">
                            ໃບຍັ້ງຍືນກ່ວດກ່າເຕັກນີກຍານພາຫະນະ</p>
                    </div>
                    <div style="font-weight: 400;">
                        <div style="display: flex;margin-left: 50px;margin-top: 30px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ອອກຊື່:</p>
                            <p>{{ carDetail.owner_car }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ປະເພດ:</p>
                            <p>{{ carDetail.car_type }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ຍີ່ຫໍ້ລົດ:</p>
                            <p style="margin-right: 175px;">{{ carDetail.car_brand }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ວັນອອກໃບທະບຽນ:</p>
                            <p style="margin-right: 35px;">{{ carDetail.technic_check_dateStart }}</p>
                            <p style="margin-right: 10px;"> ວັນໜົດອາຍູໃບທະບຽນ:</p>
                            <p>{{ carDetail.technic_check_dateEnd }}</p>
                        </div>
                    </div>
                    <div v-if="carDetail">
                        <v-card class="mx-auto" width="300px" color="yellow">
                            <div style="text-align: center;font-size: 30px;font-weight: 600;">
                                {{ carDetail.license_plate }}
                            </div>
                        </v-card>
                    </div>
                </div>
            </v-card>
            <v-card
                style="width: 400px;height: 500px;background:cornflowerblue ;border-radius: 20px;font-family: 'Times New Roman', Times, serif;margin-left: 20px;">
                <div v-if="carDetail">
                    <height></height>
                    <div style="margin-top: 30px;">
                        <p style="text-align: center;font-size: 24px;font-weight: 800;">
                            ປະກັນໄພລົດ ລາວ</p>
                    </div>
                    <div style="font-weight: 400;">
                        <div style="display: flex;margin-left: 50px;margin-top: 30px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ສະຖານະລົດ:</p>
                            <p>{{ carDetail.dao }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ລຸ້ນ ຫຼີ ໂມເດວ:</p>
                            <p>{{ carDetail.car_model }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ເລກໄມລ໌ປັດຈຸບັນ:</p>
                            <p>{{ carDetail.car_mileage_now }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ລະຫັດຢາງເບື້ອງຂວາຕີນຫຼັງ:</p>
                            <p>{{ carDetail.serial_wheel_right_back }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ລະຫັດຢາງເບື້ອງຂວາຕີນໜ້າ:</p>
                            <p>{{ carDetail.serial_wheel_right_font }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ລະຫັດຢາງເບື້ອງຊ້າຍຕີນຫຼັງ:</p>
                            <p>{{ carDetail.serial_wheel_left_back }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ລະຫັດຢາງເບື້ອງຊ້າຍຕີນໜ້າ:</p>
                            <p>{{ carDetail.serial_wheel_left_font }}</p>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
        <div style="display: flex; margin-top: 50px;">
            <v-card
                style="width: 700px;height: 500px;background: lightgray;border-radius: 60px;font-family: 'Times New Roman', Times, serif;">
                <div v-if="carDetail">
                    <div style="font-weight: 400;">
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <div style="margin-right: 10px;  font-size: 22px; font-weight: bold;"> ປະເພດ:</div>
                            <p style="margin-right: 175px;">{{ carDetail.car_type }}</p>
                            <di style="margin-right: 10px; font-size: 22px; font-weight: bold;"> CC:</di>
                            <p>{{ carDetail.cc }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ເລກຖັງ:</p>
                            <p style="margin-right: 125px;">{{ carDetail.lekThung }}</p>
                            <p> ເລກຈັກ:</p>
                            <p>{{ carDetail.lekJuk }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ຍີ່ຫໍ້ລົດ:</p>
                            <p style="margin-right: 175px;">{{ carDetail.car_brand }}</p>
                            <p style="margin-right: 10px;"> ສີລົດ:</p>
                            <p>{{ carDetail.carColor }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 5px;"> ຄວາມກວາ້ງຂອງລົດ:</p>
                            <p style="margin-right: 50px;">{{ carDetail.wide }}</p>
                            <p>ລະຫັດໜໍ້ໄຟ:</p>
                            <p>{{ carDetail.battery_code_name }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ຄວາມຍາວຂອງລົດ:</p>
                            <p style="margin-right: 80px;">{{ carDetail.longg }}</p>
                            <p>ຄວາມສູງ ຂອງລົດ:</p>
                            <p>{{ carDetail.tall }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;"> ນໍ້າມັນ:</p>
                            <p style="margin-right: 160px;">{{ carDetail.oil }}</p>
                            <p style="margin-right: 10px;"> ພວງມະໄລ:</p>
                            <p>{{ carDetail.steering_wheel }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;">ບ່ອນນັ່ງຜູ້ໂດຍສານ:</p>
                            <p style="margin-right: 120px;">{{ carDetail.sitPosition_amount }}</p>
                            <p>ນໍ້າໜັກລົດລວມ:</p>
                            <p>{{ carDetail.total_weigh_car }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;">ໄຟຫຼັງ:</p>
                            <p style="margin-right: 120px;">{{ carDetail.font_light }}</p>
                            <p>ໄຟໜ້າ:</p>
                            <p>{{ carDetail.back_light }}</p>
                        </div>
                        <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                            <p style="margin-right: 10px;">ເເວ່ນເບິ່ງທາງຫຼັງ:</p>
                            <p style="margin-right: 120px;">{{ carDetail.millor_back }}</p>
                            <p>ເເວ່ນເບິ່ງທາງຂ້າງ:</p>
                            <p>{{ carDetail.millor_side }}</p>
                        </div>
                    </div>
                </div>
            </v-card>
            <v-card color="transparent" flat
                style="width: 50%;height: 500px;border-radius: 20px;font-family: 'Times New Roman', Times, serif;margin-left: 20px;border-color: black;border: 2px;">
                <div v-if="carDetail">
                    <v-card color="#B0BEC5"> 
                        <div>
                            <p style="text-align: center;font-size: 24px;font-weight:bold;">
                                ປະກັນໄພລົດ(ໄທ)</p>
                        </div>
                        <div>
                            <div style="display: flex;margin-left: 50px;margin-top: 10px; font-size: 20px;">
                                <p style="font-weight: bold; font-size: 22px;"> ເລກປະກັນໄພ :</p>
                                <p style="margin-left: 10px;">{{ carDetail.insurance_thai }}</p>
                            </div>
                            <div style="display: flex;margin-left: 50px; font-size: 20px;">
                                <p style="font-weight: bold; font-size: 22px;"> ວັນໜົດອາຍູໃບທະບຽນ:</p>
                                <p style="margin-left: 10px;">{{ carDetail.insurance_thai_expireDate }}</p>
                            </div>
                        </div>
                    </v-card>
                    <v-card color="#81D4FA">
                        <div class="mt-3">
                            <p style="text-align: center;font-size: 24px;font-weight: bold;">
                                ປະກັນໄພລົດ(ລາວ)</p>
                        </div>
                        <div>
                            <div style="display: flex;margin-left: 50px;font-size: 20px;">
                                <p style="font-weight: bold; font-size: 22px;"> ເລກປະກັນໄພ:</p>
                                <p style="margin-left: 10px;">{{ carDetail.insurance_Lao }}</p>
                            </div>
                            <div style="display: flex;margin-left: 50px; font-size: 20px;">
                                <p style="font-weight: bold; font-size: 22px;"> ວັນໜົດອາຍູໃບທະບຽນ:</p>
                                <p style="margin-left: 10px;">{{ carDetail.insurance_Lao_expireDate }}</p>
                            </div>
                        </div>
                    </v-card>
                    <v-card color="#A7FFEB">
                        <div class="mt-3">
                            <p style="text-align: center;font-size: 24px;font-weight: 800;">
                                ປະກັນໄພລົດ(ຫວຽດ)</p>
                        </div>
                        <div>
                            <div style="display: flex;margin-left: 50px; font-size: 20px;">
                                <p style="font-weight: bold; font-size: 22px;"> ເລກປະກັນໄພ:</p>
                                <p style="margin-left: 10px;">{{ carDetail.insurance_viet }}</p>
                            </div>
                            <div style="display: flex;margin-left: 50px;margin-top: 5px; font-size: 20px;">
                                <p style="font-weight: bold; font-size: 22px;"> ວັນໜົດອາຍູໃບທະບຽນ:</p>
                                <p style="margin-left: 10px;">{{ carDetail.insurance_viet_expireDate }}</p>
                            </div>
                        </div>
                    </v-card>
                </div>
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
    },
}
</script>

<style>
.st0 {
    fill: #71d8ef;
}

.st1 {
    fill: #fff534;
}

.st2 {
    fill: #000000;
    font-size: 16px;
    font-family: Arial, sans-serif;
}

.st3 {
    fill: #000000;
    font-size: 24px;
    font-family: Arial, sans-serif;
}
</style>

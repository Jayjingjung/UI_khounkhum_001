<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="income_empeanses_car">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ລາຍງານລາຍຮັບ - ລາຍຈ່າຍຂອງລົດ
                <v-spacer></v-spacer>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                    <!-- <div class="row">
                        <div class="col-8">
                            <div class="d-flex align-center" style="width:100%">
                                <div class="d-flex align-center">
                                    <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                                        :return-value.sync="start_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມ"
                                                append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="start_date" no-title scrollable
                                            @input="$refs.start_menu.save(start_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>
                                <div class="d-flex align-center pl-2">
                                    <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                                        :return-value.sync="end_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ"
                                                append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="end_date" no-title scrollable
                                            @input="$refs.end_menu.save(end_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>

                                <div style="margin-top:-25px" class="ml-2">
                                    <v-btn color="green" class="white--text" elevation="0"
                                        @click="onSearcReport"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                                </div>
                            </div>
                        </div>

                    </div> -->
                    <div style="display:flex;justify-content:space-between;width:100%">
                        <div style="width:100%;border-radius:5px" class="mr-6 pa-4">
                            <div class=" d-flex align-center" style="">
                                <div style="width:100%">
                                    <span>ທະບຽນລົດ</span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="carTabienLod"></v-text-field>
                                </div>
                                <!-- <div style="width:100%" class="pl-2">
                            <span>ຫາງລົດ</span>
                            <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                v-model="carModel"></v-text-field>
                        </div> -->
                                <div style="width:100%" class="pl-2">
                                    <span>ປະເພດລົດ</span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="carType"></v-text-field>
                                </div>
                                <div style="width:100%" class="pl-2">
                                    <span>ຍີ່ຫໍ້ລົດ</span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="carModel"></v-text-field>
                                </div>
                                <!-- <div style="width:100%" class="pl-2">
                            <span>ວັນທີໃບຂັບຂີ່ໝົດອາຍຸ</span>
                            <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                v-model="licenceExp"></v-text-field>
                        </div> -->

                            </div>
                            <h3>ລາຍລະອຽດຂອງແຕ່ລະທ່ຽວ</h3>
                            <v-data-table :items="car_data_list" :headers="car_headers" :search="search">
                                <template v-slot:item="row">
                                    <tr>
                                        <td><span>{{ row?.index + 1 }}</span></td>
                                        <td><span>{{ row?.item?.outDate }}</span> - <span class="ml-2">{{ row?.item?.inDate
                                        }}</span></td>
                                        <td>{{ row?.item?.totalRow }} </td>
                                        <td>{{ row?.item?.totalFuel }} </td>

                                        <td>{{ row?.item?.proName }} </td>
                                        <td>{{ row?.item?.plName }}
                                        </td>
                                        <td class="green--text">{{
                                            row?.item?.carGive?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                                        <td >{{
                                            row?.item?.totalPriceNummun?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                                        <td >{{
                                            row?.item?.totalBialieng?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                                        <td class="red--text">{{row?.item?.carPay?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                                        <td class="">{{
                                            row?.item?.kumLaiy?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                                        <!-- <td class="red--text">
                                        <v-btn small color="#1976D2" class="white--text card-shadow"
                                            @click="edit(row?.item?.staffID)"><v-icon
                                                color="white">mdi-pencil</v-icon>ລາຍລະອຽດ</v-btn>

                                    </td> -->

                                        <!-- <td><span>{{ row?.item?.staft_NAME }}</span> <span class="ml-2">{{
                                        row?.item?.staft_SURNAME
                                    }}</span></td>
                                    <td>{{ row?.item?.out_DATE }}</td>
                                    <td>{{ row?.item?.in_DATE }}</td>
                                    <td class="red--text">{{ row?.item?.staff_BIALIENG_FRIST }} {{ row?.item?.staff_Cur }}</td>
                                    <td class="red--text">{{ row?.item?.staff_BIALIENG }} {{ row?.item?.staff_Cur }}</td>
                                    <td class="red--text">{{ row?.item?.staff_BIALINEG_KANGJAIY }} {{ row?.item?.staff_Cur }}</td> -->
                                    </tr>
                                </template>
                                <!-- sum footer -->
                                <template v-slot:body.append>
                                    <tr>
                                        <td> </td>
                                        <td><b>ລວມທັງໝົດ:</b></td>
                                        <td>
                                            <b>
                                                <h3 class="black--text ">{{ totalRow }}</h3>
                                            </b>
                                        </td>
                                        <td>
                                            <b>
                                                <h3 class="black--text ">{{ totalFuel }}</h3>
                                            </b>
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            <b>
                                                <h3 class="green--text ">{{ carGiveTotal }}</h3>
                                            </b>
                                        </td>
                                        
                                        <td> <h3> {{ totalPriceNummun }}</h3></td>
                                        <td> <h3>{{ totalBialieng }} </h3></td>
                                        <td>
                                            <b>
                                                <h3 class="red--text ">{{ carPayTotal }}</h3>
                                            </b>
                                        </td>
                                        <td>
                                            <b>
                                                <h3 class="black--text ">{{ kumLaiyTotal }}</h3>
                                            </b>
                                        </td>
                                    </tr>
                                </template>

                            </v-data-table>
                        </div>
                    </div>
                    <div>

                    </div>
                </v-card-text>
            </v-form>
            <div
                style="position:fixed;top: 97%;left: 50%;transform: translate(-50%, -50%); width:100%;background-color:#f5f5f5;display:flex;justify-content:center;height:50px;align-items:center">
                <v-btn width="200" color="primary" class="card-shadow" @click="print">
                    <v-icon color="white">mdi-printer</v-icon>
                    <span class="white--text pl-2">ພີມລາຍງານ</span>
                </v-btn>
            </div>
        </v-card>
        <!-- style="display:none;" -->
        <!-- component for print -->
        <div style="display:none;">
            <div id="modalInvoice" style="font-size: 12px;">
                <v-row>
                    <v-col cols="3">
                        <img class="mx-auto" src="../assets/images/logo01.png" height="70px" cover />
                    </v-col>
                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                            <span style="font-size:14px"><b><Noti/> </b> </span>
                            <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining |
                                ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-col>
                </v-row>
                <br>

                <div class="text-center pb-10 font-weight-bold" style="display:flex;justify-content:center;font-size:12pt">
                    <h4>ລາຍງານຂໍ້ມູນລາຍຮັບ - ລາຍຈ່າຍຂອງລົດ</h4>
                </div> <br>
                <div style="display:flex;flex-direction:row;justify-content:space-between;" class="mt-4">
                    <div style="width:100%;display:flex;align-items:end"><span style="font-size:12px">ທະບຽນລົດ: {{
                        carTabienLod }} </span>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:100%;display:flex;align-items:end"><span style="font-size:12px">ປະເພດລົດ: {{ carType
                    }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12px">ຍີ່ຫໍ້ລົດ: {{ carModel }} </span>
                    </div>
                </div>
                <div> <br>
                    <div class="py-4 text-center">
                        <h3>ລາຍລະອຽດຂອງແຕ່ລະທ່ຽວ</h3>
                    </div>
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px; width: 30px;">ລ/ດ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ວັນທີໄປ - ວັນທີກັບ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ຈຳນວນທ່ຽວ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ຈຳນວນລິດນ້ຳມັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ສິນຄ້າ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ສະຖານທີ່</td>
                            <td style="border: 0.5px solid #999;padding:5px">ລາຍຮັບ </td>
                            <td style="border: 0.5px solid #999;padding:5px">ລາຍຈ່າຍ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ຍອດຄົງເຫຼືອ</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;" v-for="(item, i) in car_data_list" :key="i">
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                class="  text-center">
                                {{ i + 1 }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.outDate }} - {{ item?.inDate }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.totalRow }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.totalFuel }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.proName }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.plName }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{
                                item?.carGive?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{
                                item?.carPay?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{
                                item?.kumLaiy?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td colspan='5'
                                style="border: 0.5px solid #999;padding:5px; justify-content:end; text-align: end;">
                                <b>ລວມເງິນທັງໝົດ:</b>
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ carGiveTotal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ carPayTotal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ kumLaiyTotal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            // sumFooters:null,
            staftID: '',
            loading_processing: false,
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            search: '',
            car_data_list: [],
            car_headers: [
                { text: 'ລໍາດັບ', value: '' },
                { text: 'ວັນທີໄປ - ວັນທີກັບ', value: '' },
                { text: 'ຈຳນວນທ່ຽວ', value: '' },
                { text: 'ຈຳນວນລິດນ້ຳມັນ', value: '' },
                { text: 'ສິນຄ້າ', value: '' },
                { text: 'ສະຖານທີ', value: '' },
                { text: 'ລາຍຮັບ', value: '' },
                { text: 'ເງິນນ້ຳມັນ', value: '' },
                { text: 'ເບ້ຍລ້ຽງ', value: '' },
                { text: 'ລາຍຈ່າຍທັງໝົດ', value: '' },
                { text: 'ກຳໄລ', value: '' },
                // { text: '', value: '' }
            ],
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງເລືອກວັນທີ'],

            carTabienLod: '',
            carModel: '',
            carType: '',
            carGiveTotal: '',
            carPayTotal: '',
            kumLaiyTotal: '',


        }
    },
    mounted() {
        if (this.$route.query.key) {
            this.ongetData()
        }
    },
    methods: {
        async ongetData() {
            try {
                // this.loading_processing = true;
                await this.$axios.$post('/ReportGiveCarAllNo', { carLodNo: this.$route.query.key, startDate: this.$route.query.startDate, endDate: this.$route.query.endDate,toKen:localStorage.getItem("toKen") }).then((data) => {
                    // this.loading_processing = false;
                    console.log("dataUpd", data)
                    if (data?.data?.length > 0) {
                        this.car_data_list = data?.data;
                        this.carTabienLod = data?.data[0]?.carTabienLod;
                        this.carModel = data?.data[0]?.carModel,
                            this.carType = data?.data[0]?.carType,
                            this.carGiveTotal = data?.carGiveTotal,
                            this.carPayTotal = data?.carPayTotal,
                            this.kumLaiyTotal = data?.kumLaiyTotal,
                            this.totalFuel = data?.totalFuel,
                            this.totalRow = data?.totalRow,
                            this.totalPriceNummun = data?.totalPriceNummun,
                            this.totalBialieng = data?.totalBialieng,

                        this.carGiveTotal = data?.carGiveTotal,
                            this.carPayTotal = data?.carPayTotal,
                            this.kumLaiyTotal = data?.kumLaiyTotal
                    }
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
                this.loading_processing = false
                console.log(error)
            }
        },

        print() {
            const modal = document.getElementById("modalInvoice")
            const cloned = modal.cloneNode(true)
            let section = document.getElementById("print")
            if (!section) {
                section = document.createElement("div")
                section.id = "print"
                document.body.appendChild(section)
            }
            section.innerHTML = "";
            section.appendChild(cloned);
            window.print();
        },

        async onGetEmployeeList() {
            try {
                // this.loading_processing = true;
                await this.$axios.$post('getChooseStaft01.service', { key_id: this.$route.query.key }).then((data) => {
                    // this.loading_processing = false;
                    console.log("dataUpd", data)
                    // this.staft_data_list = data?.data;

                    this.name = data?.data[0]?.name;
                    this.surname = data?.data[0]?.surname,
                        this.mobile = data?.data[0]?.mobile,
                        this.mobile1 = data?.data[0]?.mobile1,
                        this.idCard = data?.data[0]?.idCard,
                        this.licenceExp = data?.data[0]?.licenceExp
                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
                this.loading_processing = false
                console.log(error)
            }
        },

        // onSearcReport() {

        //     this.loading_processing = true;
        //     try {
        //         let data = {
        //             staftID: this.$route?.query?.key
        //         }
        //         console.log("datadend:", data)
        //         // this.$axios.$post('/ReportStaff.service', data).then((data) => {
        //         this.$axios.$post('/listPaymentStaff.service', data).then((data) => {
        //             console.log("staft:", data)
        //             if (data?.status === '00') {
        //                 this.staft_data_list = data?.data;
        //                 this.loading_processing = false
        //             } else {
        //                 this.loading_processing = false
        //                 swal.fire({
        //                     icon: 'error',
        //                     text: data?.message
        //                 })
        //             }
        //         })
        //     } catch (error) {
        //         this.loading_processing = false
        //         swal.fire({
        //             icon: 'error',
        //             text: error
        //         })
        //         console.log(error)
        //     }
        // },
        // onGetEmployeeList(){
        //     this.loading_processing = true;
        //     try {
        //         let data = {
        //             staftID: this.$route?.query?.key
        //         }
        //         console.log("datadend:", data)
        //         // this.$axios.$post('/ReportStaff.service', data).then((data) => {
        //         this.$axios.$post('/getChooseStaft01.service', staftID).then((data) => {
        //             console.log("staft:", data)
        //             if (data?.status === '00') {
        //                 this.staft_data_list = data?.data;
        //                 this.loading_processing = false
        //             } else {
        //                 this.loading_processing = false
        //                 swal.fire({
        //                     icon: 'error',
        //                     text: data?.message
        //                 })
        //             }
        //         })
        //     } catch (error) {
        //         this.loading_processing = false
        //         swal.fire({
        //             icon: 'error',
        //             text: error
        //         })
        //         console.log(error)
        //     }
        // }
    }
}
</script>

<style>
@media screen {
    #print {
        display: none;
    }
}

@media print {
    @page {
        size: A4;
        margin: 1in;
    }

    body * {
        visibility: hidden;
    }

    #print,
    #print * {
        visibility: visible;

    }

    #print {
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0px;
    }
}
</style>
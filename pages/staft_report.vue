<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="report_staft">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ລາຍງານພະນັກງານ
                <v-spacer></v-spacer>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                    <div class="row">
                        <!-- <div class="col-8">
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
                        </div> -->

                    </div>
                    <div style="display:flex;justify-content:space-between;width:100%">
                        <div style="width:100%;border-radius:5px" class="mr-6 pa-4">
                            <div class=" d-flex align-center" style="">
                                <div style="width:100%">
                                    <span>ຊື່</span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="staffName"></v-text-field>
                                </div>
                                <div style="width:100%" class="pl-2">
                                    <span>ນາມສະກຸນ</span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="staffSurname"></v-text-field>
                                </div>
                                <div style="width:100%" class="pl-2">
                                    <span>ເລກໃບຂັບຂີ່ </span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="idCard"></v-text-field>
                                </div>
                                <div style="width:100%" class="pl-2">
                                    <span>ໃບຂັບຂີ່ທີ່ອອກ</span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="licenId"></v-text-field>
                                </div>
                                <div style="width:100%" class="pl-2">
                                    <span>ວັນທີໃບຂັບຂີ່ໝົດອາຍຸ</span>
                                    <v-text-field readonly flat solo dense background-color="#f5f5f5" placeholder="ປ້ອນລາຄາ"
                                        v-model="idCardExpried"></v-text-field>
                                </div>

                            </div>
                            <h3>ລາຍລະອຽດຂອງແຕ່ລະທ່ຽວ</h3>
                            <v-data-table :items="staft_data_list" :headers="staft_headers" :search="search">
                                <template v-slot:item="row">
                                    <tr >
                                        <td><span>{{ row?.index + 1 }}</span></td>
                                        <td><span>{{ row?.item?.startDate }}</span> - <span class="ml-2">{{
                                            row?.item?.endDate }}</span></td>
                                        <td>{{ row?.item?.headerNo }} </td>
                                        <td>{{ row?.item?.footerNo }}
                                        </td>
                                        <td>{{ row?.item?.proName }}
                                        </td>
                                        <td><span>{{ row?.item?.placeName }}</span> - <span class="ml-2">{{
                                            row?.item?.provinceName
                                        }}</span>
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
                <v-btn width="200" color="#1565C0" class="card-shadow" @click="print">
                    <v-icon color="white">mdi-printer</v-icon>
                    <span class="white--text pl-2">ພີມລາຍງານ</span>
                </v-btn>
            </div>
        </v-card>

        <!-- component for print  -->
        <div style="display:none;" >
            <div id="modalInvoice">
                <div class="text-center pb-10 font-weight-bold" style="display:flex;justify-content:center;font-size:18px">
                   <h5>ລາຍງານຂໍ້ມູນພະນັກງານ</h5></div>
                <div style="height:10px"></div>
                <!-- <div style="display:flex;justify-content:end;flex-direction:column;align-items:end">
                    <div style="display:flex;flex-direction:column;padding:10px;border-radius:3px;border:1px solid #999">

                        <span style="font-size:12pt">ເລກທີ: {{ name }}</span>
                        <span style="font-size:12pt">ວັນທີປ່ອຍ: {{ mobile }}</span>
                        <span style="font-size:12pt">ວັນທີກັບ: {{ licenceExp }}</span>
                    </div>
                </div> -->
                <!-- customer -->
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:100%;display:flex;align-items:end"><span style="font-size:12px">ຊື່ ແລະ ນາມສະກຸນ: {{
                        staffName }} {{ staffSurname }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12px">ເລກໃບຂັບຂີ່:  {{ idCard }}</span></div>

                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:100%;display:flex;align-items:end"><span style="font-size:12px">ໃບຂັບຂີ່ທີ່ອອກ: {{ licenId
                    }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12px">ວັນທີໃບຂັບຂີ່ໝົດອາຍຸ: {{ idCardExpried }} </span>
                    </div>
                </div>
                <div>
                    <div class="text-center pb-10 font-weight-bold" style="display:flex;justify-content:center;font-size:18px" >
                        <h5>ລາຍລະອຽດຂອງແຕ່ລະທ່ຽວ</h5>
                    </div>
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999; font-size:12px">
                            <td style="border: 0.5px solid #999;padding:5px; width: 30px;">ລ/ດ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ວັນທີໄປ - ວັນທີກັບ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ຫົວລົດ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ຫາງລົດ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ສິນຄ້າ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ສະຖານທີ</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999; font-size:12px" v-for="(item, i) in staft_data_list" :key="i" >
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                class="  text-center">
                                {{ i + 1 }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.startDate }} - {{ item?.endDate }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.headerNo }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.footerNo }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.proName }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ item?.placeName }} - {{ item?.provinceName }}</td>
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
            staftID: '',
            loading_processing: false,
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            search: '',
            staft_data_list: [],
            staft_headers: [
                { text: 'ລ/ດ', value: '' },
                { text: 'ວັນທີໄປ - ວັນທີກັບ', value: '' },
                { text: 'ຫົວລົດ', value: '' },
                { text: 'ຫາງລົດ', value: '' },
                { text: 'ສິນຄ້າ', value: '' },
                { text: 'ສະຖານທີ', value: '' },
                // { text: 'ເບ້ຍລ້ຽງທັງໝົດ', value: '' },
                // { text: '', value: '' }
            ],
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງເລືອກວັນທີ'],

            staffName: '',
            staffSurname: '',
            licenId: '',
            idCardExpried: '',
            idCard: '',

            h_VICIVLE_NUMBER: ''
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
                await this.$axios.$post('/ReportListStaffPayDetails', { staffID: this.$route.query.key }).then((data) => {
                    // this.loading_processing = false;
                    console.log("dataUpd", data)
                    this.staft_data_list = data?.data,
                    this.staffName = data?.staffName;
                    this.staffSurname = data?.staffSurname;
                    this.licenId = data?.licenId;
                    this.idCardExpried = data?.idCardExpried,
                    this.idCard = data?.idCard
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

        // async ongetData() {
        //     try {

        //         // this.loading_processing = true;
        //         await this.$axios.$post('/ReportListStaffPayDetails', { staffID: this.$route.query.key }).then((data) => {
        //             // this.loading_processing = false;
        //             console.log("dataUpd", data)
        //             this.staft_data_list = data?.data;
        //             this.staffName = data?.data[0]?.staffName;
        //             this.staffSurname = data?.data[0]?.staffSurname,
        //             this.idCard = data?.data[0]?.idCard,
        //             this.licenId = data?.data[0]?.licenId,
        //             this.idCardExpried = data?.data[0]?.idCardExpried
        //             // this.detail = data?.data[0]?.detail
        //         })
        //     } catch (error) {
        //         swal.fire({
        //             icon: 'error',
        //             text: error
        //         })
        //         this.loading_processing = false
        //         console.log(error)
        //     }
        // },

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


        // async onGetEmployeeList() {
        //     try {
        //         // this.loading_processing = true;
        //         await this.$axios.$post('getChooseStaft01.service', { key_id: this.$route.query.key }).then((data) => {
        //             // this.loading_processing = false;
        //             console.log("dataUpd", data)
        //             // this.staft_data_list = data?.data;

        //             this.name = data?.data[0]?.name;
        //             this.surname = data?.data[0]?.surname,
        //                 this.mobile = data?.data[0]?.mobile,
        //                 this.mobile1 = data?.data[0]?.mobile1,
        //                 this.idCard = data?.data[0]?.idCard,
        //                 this.licenceExp = data?.data[0]?.licenceExp
        //         })
        //     } catch (error) {
        //         swal.fire({
        //             icon: 'error',
        //             text: error
        //         })
        //         this.loading_processing = false
        //         console.log(error)
        //     }
        // },

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
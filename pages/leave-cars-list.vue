<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-4" rounded="lg">
            <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white">
                ລາຍການປ່ອຍລົດ
            </v-card-title>
            <v-card-text class="px-10 pb-10">
                <div class="py-4" style="display:flex;align-items:center">
                    <v-btn rounded color="#E57373" class="white--text card-shadow"
                        to="/leave-cars"><v-icon>mdi-plus</v-icon>ອອກໃບປ່ອຍລົດ</v-btn>
                    <div class="pl-4 ml-3 mr-3">
                        <h3>ທັງໝົດ: <span class="green--text">{{ report_leave_car_list?.length }}</span></h3>
                    </div>
                    

                    <v-btn color="#E57373" class="white--text card-shadow " style="width:190px "
                        to="/report_leave_cars"> <v-icon>mdi-chart-box-outline</v-icon>ເບິ່ງລາຍງານໃບປ່ອຍລົດ</v-btn>
                    
                </div>
                
                <div class="mt-2">

                    <v-data-table :items="report_leave_car_list" :headers="report_leave_car_header" :search="search">
                        <template v-slot:item="row">

                            <tr :style="{ 'background-color': row?.item?.totalDay >= '7' ? '#FFCDD2' : '#fff' }"
                                @mouseover="active = row?.index" @mouseleave="active = ''">
                                <td>{{ row?.item?.lahud_POYLOD }}</td>
                                <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                                <td>{{ row?.item?.f_CARD_NO }}</td>
                                <td>{{ moment(row?.item?.in_DATE).format('DD/MM/YYYY')}}</td>
                                <td>{{ row?.item?.staft_NAME }} <span>{{ row?.item?.staft_SURNAME }}</span></td>
                                <td>{{ row?.item?.staft_NAME1 }} <span>{{ row?.item?.staft_SURNAME1 }}</span></td>
                                <td class="green--text">{{ row?.item?.staff_BIALIENG_FRIST }} {{ row?.item?.staff_Curr }}
                                </td>
                                <td>{{ row?.item?.pro_NAME }}</td>

                                <!-- <td class="green--text">{{ row?.item?.total_price }} {{ row?.item?.currency }}</td> -->
                                <!-- <td><span class="blue--text">{{ row?.item?.product_SIZE }}</span> ໂຕນ</td> -->

                                <td class="red--text">
                                    <div class="d-flex">
                                        <v-btn small color="red" class="white--text card-shadow" block> <v-icon
                                                color="white" size="24">mdi-new-box</v-icon>
                                            <span class="white--text ml-2">ລໍຖ້າອອກໃບປະຕິບັດງານ</span>

                                            <v-spacer></v-spacer></v-btn>
                                    </div>
                                </td>
                                <td class="green--text">

                                    <div class="d-flex algin-center">
                                        <v-btn block small class="card-shadow" color="#FFB74D" @click="onPrintAgain(
                                            row?.item?.lahud_POYLOD,
                                            row?.item?.customer_ID,
                                            row?.item?.product_ID,
                                            row?.item?.product_AMOUNT,
                                            row?.item?.product_SIZE,
                                            row?.item?.product_DETAILS,
                                            row?.item?.product_FROM,//
                                            row?.item?.product_TO,//
                                            row?.item?.place_PD_FROM,
                                            row?.item?.place_PD_TO,
                                            row?.item?.staff_ID_NUM1,
                                            row?.item?.staff_ID_NUM2,
                                            row?.item?.staff_BIALIENG_FRIST,
                                            row?.item?.staff_BIALIENG,
                                            row?.item?.staff_BIALINEG_KANGJAIY,
                                            row?.item?.header_ID,
                                            row?.item?.footer_ID,
                                            row?.item?.out_DATE,
                                            row?.item?.in_DATE,
                                            row?.item?.laiyathang,
                                            row?.item?.sainummun,
                                            row?.item?.numnuklod,
                                            row?.item?.kongnarlod,
                                            row?.item?.khg_MUE_TIDLOD,
                                            row?.item?.kim_KILO,
                                            row?.item?.price, row?.item?.total_price,
                                            row?.item?.priceNamMun,
                                            row?.item?.currency, row?.item?.staff_Curr,
                                            row?.item?.h_VICIVLE_NUMBER, row?.item?.f_CARD_NO
                                        )"><v-icon color="white">mdi-pencil</v-icon>
                                            <span class="white--text">ແກ້ໄຂ</span><v-spacer></v-spacer></v-btn>
                                    </div>
                                </td>

                            </tr>
                        </template>
                    </v-data-table>
                </div>
            </v-card-text>
        </v-card>

    </div>
</template>

<script>
import swal from 'sweetalert2'
import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
            loading_processing: false,
            report_leave_car_header: [
                { text: 'ເລກບິນ', value: 'lahud_POYLOD' },
                { text: 'ທະບຽນຫົວ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ທະບຽນຫາງ', value: 'f_CARD_NO' },
                { text: 'ວັນທີກັບ', value: 'in_DATE' },
                { text: 'ຄົນຂັບ1', value: 'staft_NAME' },
                { text: 'ຄົນຂັບ2', value: 'staft_NAME1' },
                { text: 'ເບ້ຍລ້ຽງທັງໝົດ', value: 'staff_BIALIENG_FRIST' },
                { text: 'ຊື່ສິນຄ້າ', value: 'pro_NAME' },
                //{ text: 'ລາຄາ', value: 'total_price' },
                //{ text: 'ນໍ້າໜັກ', value: 'product_SIZE' },
                { text: 'ສະຖານະ', value: '' },
                { text: '', value: '' }
            ],
            report_leave_car_list: [],
        }
    },
    mounted() {
        this.onSearchLeaveCarReport()
    },
    methods: {
       
        onSearchLeaveCarReport() {
            try {
                this.loading_processing = true;

                this.$axios.$post('/v_popupDetails.service',{

                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    if (data?.status === "00") {
                        this.report_leave_car_list = data?.data
                        this.loading_processing = false
                        // this.onCheckAlert()
                    } else {
                        this.report_leave_car_list = []
                        this.loading_processing = false
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        },
        onPrintAgain(lahud_POYLOD,
            customer_ID,
            product_ID,
            product_AMOUNT,
            product_SIZE,
            product_DETAILS,
            detail_send,
            detail_recive,
            place_PD_FROM,
            place_PD_TO,
            staff_ID_NUM1,
            staff_ID_NUM2,
            staff_BIALIENG_FRIST,
            staff_BIALIENG,
            staff_BIALINEG_KANGJAIY,
            header_ID,
            footer_ID,
            out_DATE,
            in_DATE,
            laiyathang,
            sainummun,
            numnuklod,
            kongnarlod,
            khg_MUE_TIDLOD,
            kim_KILO, price, total_price, priceNamMun, currency, staff_Curr, plate, plate1) {
            this.$router.push({
                path: '/print_again', query: {
                    key: lahud_POYLOD, cusId: customer_ID,
                    proId: product_ID, proAmount: product_AMOUNT,
                    proWeight: product_SIZE, product_detail: product_DETAILS, detail_send: detail_send, detail_recive: detail_recive, place_from: place_PD_FROM,
                    place_to: place_PD_TO, staft_id1: staff_ID_NUM1, staft_id2: staff_ID_NUM2, bialieng: staff_BIALIENG_FRIST, bialieng1: staff_BIALIENG, bialieng2: staff_BIALINEG_KANGJAIY,
                    head_id: header_ID, footer_id: footer_ID, out_date: out_DATE, in_date: in_DATE, road: laiyathang, nummun: sainummun, car_weight: numnuklod, kongnarlod: kongnarlod, khg_meu_tidlod: khg_MUE_TIDLOD,
                    kim_kilo: kim_KILO, price: price, total_price: total_price, priceNamMun: priceNamMun, currency: currency, staff_Curr: staff_Curr, plate: plate, plate1: plate1
                }
            })
        }
    }
}
</script>

<style></style>
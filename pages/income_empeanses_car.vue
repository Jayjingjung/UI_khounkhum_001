<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white">ລາຍງານລາຍຮັບ -
                ລາຍຈ່າຍຂອງລົດ</v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                    <div class="row">
                        <div class="col-8">
                            <div class="d-flex align-center" style="width:100%">
                                <div class="d-flex align-center">
                                    <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                                        :return-value.sync="start_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="start_date" required
                                                label="ວັນທີເລີ່ມ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
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
                                            <v-text-field dense outlined v-model="end_date" required
                                                label="ວັນທີສຸດທ້າຍ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="end_date" no-title scrollable
                                            @input="$refs.end_menu.save(end_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>

                                <div style="margin-top:-25px" class="ml-2">
                                    <v-btn color="#90A4AE" class="white--text" elevation="0"
                                        @click="onSearcReport(); onSearchLeaveCarReport();"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="d-flex align-center">
                                <div class="" style="width: 400px;">
                                    <v-text-field background-color="#f5f5f5" solo flat dense label="ຄົ້ນຫາ..."
                                        v-model="search" prepend-inner-icon="mdi-magnify" clearable> </v-text-field>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style="margin-top:-15px">
                        <h3>ທັງໝົດ: <span class="green--text">{{ staft_data_list.length }}</span></h3>
                    </div>
                    <div>
                        <v-data-table :items="staft_data_list" :headers="staft_headers" :search="search">

                            <template v-slot:item="row">
                                <tr>
                                    <td><span>{{ row?.index + 1 }}</span></td>
                                    <td><span>{{ row?.item?.carTabienLod }}</span></td>
                                    <td>{{ row?.item?.carModel }}</td>
                                    <td>{{ row?.item?.carType }}</td>

                                    <td>{{ row?.item?.totalRow }}</td>
                                    <td>{{ row?.item?.totalFuel }}</td>
                                    <td class="green--text">{{
            row?.item?.carGive?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                    </td>
                                    <td>{{
            row?.item?.totalPriceNummun?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }}
                                    </td>

                                    <td class="red--text">{{
                row?.item?.carPay?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                    ',') }}
                                    </td>
                                    <td class="orgen--text">{{
            row?.item?.kumLaiy?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                                    <td class="red--text">
                                        <v-btn small color="primary" class="white--text card-shadow"
                                            @click="edit(row?.item?.carTabienLod)"><v-icon
                                                color="white">mdi-pencil</v-icon>ລາຍລະອຽດ</v-btn>

                                    </td>

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

                            <template v-slot:body.append>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><b>ລວມທັງໝົດ:</b></td>
                                    <td></td>
                                    <td v-if="sumFooters != null">
                                        <b>
                                            <h3 class="black--text ">{{ sumFooters[0]['sumTotalRow'] }}</h3>
                                        </b>
                                    </td>
                                    <td v-if="sumFooters != null">
                                        <b>
                                            <h3 class="black--text ">{{ sumFooters[0]['sumTotalFuel'] }}</h3>
                                        </b>
                                    </td>
                                    <td v-if="sumFooters != null">
                                        <b>
                                            <h3 class="green--text ">{{ sumFooters[0]['sumCarGive'] }}</h3>
                                        </b>
                                    </td>
                                    <td v-if="sumFooters != null"> <b>
                                            <h3>{{ sumFooters[0]['totalPriceNummun'] }} </h3>
                                        </b></td>

                                    <td v-if="sumFooter != null">
                                        <b>
                                            <h3 class="red--text ">{{ sumFooter.allLaiyJaiy }}</h3>
                                        </b>
                                    </td>
                                    <!-- ກຳໄລ -->
                                    <td v-if="sumFooter != null">
                                        <b>
                                            <h3 class="primary--text ">
                                                {{ sumAllIncome?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                            </h3>
                                        </b>
                                    </td>


                                </tr>
                                <tr>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td><b>ລາຍຮັບອື່ນໆ:</b></td>
                                    <td v-if="sumFooterPay != null">
                                        <b>
                                            <h3 class="green--text ">{{ sumFooterPay[0]['sumKumLaiy'] }}</h3>
                                        </b>
                                    </td>
                                    <td>
                                        <v-btn small color="success" class="card-shadow" style="width:110px"
                                            to="/report-expense"> <v-icon
                                                color="white">mdi-currency-usd</v-icon>ເບິ່ງລາຍລະອຽດ</v-btn>
                                    </td>
                                    <td><b>ລາຍຈ່າຍອື່ນໆ:</b></td>
                                    <td v-if="sumFooter != null">
                                        <b>
                                            <h3 class="red--text ">{{ sumFooter.laiJaiyOutFrist }}</h3>

                                        </b>
                                    </td>
                                    <td>
                                        <v-btn small color="error" class="card-shadow" style="width:110px"
                                            to="/report-expense"> <v-icon
                                                color="white">mdi-currency-usd</v-icon>ເບິ່ງລາຍລະອຽດ</v-btn>
                                    </td>

                                </tr>
                                <tr>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td>
                                        <b>ລວມລາຍຮັບ:</b>
                                    </td>
                                    <td v-if="countTotalAll != null">
                                        <b>
                                            <h3 class="green--text ">{{ countTotalAll }}</h3>
                                        </b>
                                    </td>
                                    <td> </td>
                                    <td>
                                        <b>ລວມລາຍຈ່າຍ:</b>
                                    </td>
                                    <td v-if="sumFooter != null">
                                        <b>
                                            <h3 class="red--text ">{{ sumFooter.laiJaiyOutTotal }}</h3>
                                        </b>
                                    </td>
                                </tr>
                            </template>




                        </v-data-table>
                    </div>
                </v-card-text>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            status: 'A',
            sumFooter: null,
            sumFooters: null,
            countTotalAll: null,
            loading_processing: false,
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            search: '',
            staft_data_list: [],
            staft_headers: [
                { text: 'ລ/ດ', value: '' },
                { text: 'ທະບຽນລົດ', value: '' },
                { text: 'ຍີ່ຫໍ້', value: '' },
                { text: 'ປະເພດລົດ', value: '' },
                { text: 'ຈຳນວນທ່ຽວ', value: '' },
                { text: 'ຈຳນວນລິດນ້ຳມັນ', value: '' },
                { text: 'ລາຍຮັບທັງໝົດ', value: '' },
                { text: 'ເງິນນ້ຳມັນ', value: '' },
                // { text: 'ຄ່າສິ້ນເປືອງ', value: '' },
                { text: 'ລາຍຈ່າຍທັງໝົດ', value: '' },
                { text: 'ກຳໄລ', value: '' },
                { text: '', value: '' }
            ],
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງເລືອກວັນທີ'],
        }
    },
    mounted() {
        this.onSearcReport()
        this.onSearchLeaveCarReport()
    },
    // ລາຍຈ່ານອື່ນໆ ບວກກັບລາຍຈ່າຍຂອງລົດທີ່ມາແຕ່ api
    computed: {
        sumAllIncome() {
            // console.log(this.countTotalAll.?split('.').join(''))
            // console.log(this.sumFooter.laiJaiyOutTotal.split('.').join(''))
            return parseFloat(this.countTotalAll?.split(',')?.join('')) - parseFloat(this.sumFooter?.laiJaiyOutTotal?.split(',')?.join(''));

        }
    },
    methods: {
        edit(key) {
            // this.$router.push({path: '/edit_cars_head', params: {key: 'he'}});
            this.$router.push({ path: '/report_income_empeanses_car', query: { key: key, startDate: this.start_date, endDate: this.end_date } })
        },
        onSearcReport() {

            this.loading_processing = true;
            try {
                let data = {
                    startDate: this.start_date,
                    endDate: this.end_date,
                    toKen: localStorage.getItem("toKen")

                }
                // this.$axios.$post('/ReportStaff.service', data).then((data) => {
                this.$axios.$post('/ReportGiveCarAll', data).then((data) => {
                    console.log("staft:", data)
                    if (data?.status === '00') {
                        this.staft_data_list = data?.data;

                        this.sumFooters = data?.sumFooter
                        this.sumFooterPay = data?.sumFooterPay
                        this.sumFooterPayCount = data?.sumFooterPayCount
                        this.countTotalAll = data?.countTotalAll


                        console.log("new data footer:", this.sumFooters)

                        this.loading_processing = false
                    } else {
                        this.loading_processing = false
                        swal.fire({
                            icon: 'error',
                            text: data?.message
                        })
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
        // api ຂ້າມໜ້າ ມາຈາກ ລາຍງານໃບປ່ອຍລົດ
        onSearchLeaveCarReport() {
            try {
                this.loading_processing = true;
                this.successList = 0
                this.waitingList = 0
                let data = {
                    startDate: this.start_date,
                    endDate: this.end_date,
                    status: this.status,
                    toKen: localStorage.getItem("toKen")

                }
                this.$axios.$post('/ListReportAll01.service', data).then((data) => {
                    console.log("allReport:", data)
                    if (data?.data) {
                        data.data.forEach(item => {
                            if (item.status === 'Y') {
                                this.successList += 1;
                            } else if (item.status === 'N') {
                                this.waitingList += 1;
                            }
                        });

                        this.report_leave_car_list = data?.data
                        this.sumFooter = data?.sumFooter
                        console.log("new data sum footer:", this.sumFooter)
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
    }
}
</script>

<style></style>
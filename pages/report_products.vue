<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white">ລາຍງານສິນຄ້າ</v-card-title>
            <v-card-text>
                <div class="d-flex align-center pt-4" style="width:100%">

                    <div class="d-flex align-center">
                        <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                            :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ"
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
                            :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div style="margin-top:-25px" class="ml-2">
                        <v-btn color="#90A4AE" class="white--text" elevation="0"
                            @click="onSearchLeaveCarReport"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                    </div>
                </div>
                <div style="margin-top:-15px">
                    <h3>ທັງໝົດ: <span class="green--text">{{ report_leave_car_list?.length }}</span></h3>
                </div>
                <div>
                    <v-data-table :items="report_leave_car_list" :headers="report_leave_car_header" >
                        <template v-slot:item="row">
                            <tr>

                                <td>{{ row?.item?.pro_NAME }}</td>
                                <td class="green--text">{{ row?.item?.total_price }} {{ row?.item?.currency }}</td>
                                <td>{{ row?.item?.customer_NAME }}</td>
                                <td>{{ row?.item?.province }} <span>{{ row?.item?.detail }}</span></td>
                                <td>{{ row?.item?.province1 }} <span>{{ row?.item?.detail1 }}</span></td>
                                <td>{{ moment(row?.item?.out_DATE ).format('DD/MM/YYYY') }}</td>
                                <td>{{ moment( row?.item?.in_DATE ).format('DD/MM/YYYY') }}</td>
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
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            report_leave_car_header: [

                { text: 'ຊື່ສິນຄ້າ', value: 'pro_NAME' },
                { text: 'ລາຄາທັງໝົດ', value: 'total_price' },
                { text: 'ຊື່ລູກຄ້າ', value: 'customer_NAME' },
                { text: 'ສະຖານທີສົ່ງ', value: 'province' },
                { text: 'ສະຖານທີຮັບ', value: 'province1' },
                { text: 'ວັນທີສົ່ງ', value: 'out_DATE' },
                { text: 'ວັນທີກັບ', value: 'in_DATE' },
            ],
            report_leave_car_list: []
        }
    },
    mounted(){
        this.onSearchLeaveCarReport()
    },
    methods: {
        onSearchLeaveCarReport() {
            try {
                this.loading_processing = true;
                let data = {
                    startDate: this.start_date,
                    toKen: localStorage.getItem("toKen"),

                    endDate: this.end_date
                }
                this.$axios.$post('/ListReportProduct.service', data).then((data) => {
                    this.report_leave_car_list = data?.data
                    this.loading_processing = false
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        }
    }
}
</script>

<style></style>
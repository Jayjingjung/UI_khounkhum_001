<template>
    <div>
        <v-card class="card-shadow" rounded="lg">
            <v-card-title
                style="border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white">ລາຍການໃບບິນສິນຄ້າ</v-card-title>
            <v-card-text class="px-8">
                <div style="display:flex;align-items:center" class="py-4">
                    <v-btn rounded color="#E57373" class="white--text card-shadow"
                        to="/create-invoice"><v-icon>mdi-plus</v-icon>ອອກໃບຮຽກເກັບເງິນ</v-btn>
                    <h3 class="ml-4">ທັງໝົດ: <span class="green--text">{{ report_invoice_list?.length }}</span></h3>
                    <v-tab></v-tab>
                    <v-btn color="#E57373" class="white--text card-shadow" style="width:190px "
                        to="/report_invoice"><v-icon>mdi-chart-box-outline</v-icon>ເບິ່ງລາຍງານໃບຮຽກເກັບເງິນ</v-btn>
                </div>
                <div style="" class="">
                    <v-data-table :items="report_invoice_list" :headers="report_invoice_headers" :search="search"
                        style="border-radius:5px">
                        <template v-slot:item="row">
                            <tr :style="{ 'color': row?.item?.totalDay >= '7' ? 'red' : 'black' }">
                                <td>{{ row?.item?.inVoiceID }}</td>
                                <td>{{ row?.item?.cusID }}</td>
                                <td>{{ row?.item?.cusName }}</td>
                                <!-- <td class="red--text">{{ row?.item?.row_Total?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }} {{ row?.item?.currency?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td> -->
                                <td class="green--text">{{ row?.item?.inVoiceAmount?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                    {{ row?.item?.currency?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                                <td>{{ moment(row?.item?.inVoiceDate).format('DD/MM/YYYY HH:mm:ss') }}</td>
                                <td v-if="row?.item?.inVoiceStatus === 'N'" class="red--text">
                                    <div class="d-flex algin-center">
                                        <v-btn small elevation="0" color="red" class="white--text" block>
                                            <v-icon color="white" size="20">mdi-new-box</v-icon>
                                            <span class="ml-2">ລໍຖ້າຊຳລະ</span>
                                            <v-spacer></v-spacer>
                                        </v-btn>
                                    </div>
                                </td>
                                <td v-else class="green--text">
                                    <div class="d-flex algin-center">
                                        <v-btn small elevation="0" color="green" class="white--text" block>
                                            <v-icon color="white">mdi-check-circle</v-icon>
                                            <span class="ml-2">ສຳເລັດ</span>
                                            <v-spacer></v-spacer>
                                        </v-btn>
                                    </div>
                                </td>
                                <td><v-btn small class="card-shadow white--text"
                                        @click="askBeforeRevert(row?.item?.inVoiceID)"
                                        color="red"><v-icon>mdi-reload</v-icon>ຍົກເລິກລາຍການ</v-btn></td>
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
            report_invoice_list: [],
            report_invoice_headers: [
                // { text: 'ເລືອກ', value: '' },
                { text: 'ເລກບິນ', value: 'inVoiceID' },
                { text: 'ລະຫັດລູກຄ້າ', value: 'cusID' },
                { text: 'ຊື່ລູກຄ້າ', value: 'cusName' },
                // { text: 'ລາຄາ', value: 'price' },
                { text: 'ລວມລາຄາທັງໝົດ', value: 'priceUnit' },
                { text: 'ວັນທີ', value: 'inVoiceDate' },
                { text: 'ສະຖານະ', value: 'inVoiceStatus' },
                { text: '', value: '' },

            ],
        }
    },
    mounted() {
        this.onGetAllInvoice()
    },
    methods: {
        askBeforeRevert(key) {
            swal
                .fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: 'ທ່ານຕ້ອງການຍົກເລິກແທ້ບໍ ?',
                    icon: 'question',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'ຍົກເລິກ',
                    confirmButtonText: 'ຕົກລົງ',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.onRevert(key)
                    }
                })
        },
        async onRevert(key) {
            this.loading_processing = true
            let data = {
                'inVoiceID': key
            }
            try {
                this.$axios.$post('/revertInvoiceByNo.service', data).then((data) => {
                    if (data?.status === '00') {
                        this.loading_processing = false
                        this.onGetAllInvoice()
                        swal.fire({
                            icon: 'success',
                            text: 'ສຳເລັດ'
                        })
                    } else {
                        this.loading_processing = false
                    }
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },
        async onGetAllInvoice() {
            this.loading_processing = true
            try {
                this.$axios.$post('/v_popupPerInVoice.service',{
                    toKen: localStorage.getItem("toKen")

                }).then((data) => {
                    this.loading_processing = false
                    this.report_invoice_list = data?.data;
                    // this.onCheckAlert()
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },
    }
}
</script>

<style></style>
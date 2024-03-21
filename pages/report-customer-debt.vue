<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <div style="display:flex;align-items:center;border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white"
                class="px-4 py-4">
                <span>ລາຍງານວິເຄາະອາຍຸໜີ້</span>
            </div>
            <div class="d-flex align-center pt-4 px-4" style="width:100%">

                <div class="d-flex align-center">
                    <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                        :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ"
                                prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="start_date" no-title scrollable @input="$refs.start_menu.save(start_date)">
                            <v-spacer></v-spacer>
                        </v-date-picker>
                    </v-menu>
                </div>
                <div class="d-flex align-center pl-2">
                    <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false" :return-value.sync="end_date"
                        transition="scale-transition" offset-y min-width="auto">
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
                    <v-btn color="#90A4AE" height="40" class="white--text" elevation="0"
                        @click="onGetAll"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="card-shadow"
                    @click="print"><v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ</v-btn>
            </div>
            <v-card-text>

                <div>
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" rowspan="2"
                                class="text-center font-weight-bold">ລຳດັບ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" rowspan="2"
                                class="font-weight-bold">ຊື່ລູກຄ້າ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" rowspan="2"
                                class="font-weight-bold text-center">ຈຳນວນມື້</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" rowspan="2"
                                class="font-weight-bold">ເລກທີບິນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" rowspan="2"
                                class="font-weight-bold">ວັນທີ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" colspan="5"
                                class="text-center font-weight-bold">ອາຍຸໜີ້</td>

                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" class="font-weight-bold">1-30
                                ວັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" class="font-weight-bold">31-60
                                ວັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" class="font-weight-bold">61-90
                                ວັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" class="font-weight-bold">
                                ເກີນກວ່າ 90 ວັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" class="font-weight-bold">
                                ລວມລາຄາທັງໝົດ</td>
                        </tr>
                        
                        <tr style="padding:5px;border: 0.5px solid #999;" v-for="(item, i) in this.report_payment_debt"
                            :key="i">
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" class="text-center">{{ i + 1 }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt">{{ item?.cusName }}</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt" class="text-center">{{
                                item?.calTotalDate }}</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt">
                                <div class="px-2 py-1" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.billNo }}
                                </div>
                                <!-- <div class="white--text">000</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt">
                                <div class="px-2 py-1" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ moment( d?.payDate ).format('DD/MM/YYYY')}}
                                </div>
                                <!-- <div class="white--text">000</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12pt">
                                <div class=" px-2 py-1 red--text" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck01?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold">{{ item?.sumFooter[0]?.sumPayAmount01?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12pt">
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck02?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold">{{ item?.sumFooter[0]?.sumPayAmount02?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12pt">
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck03?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold">{{ item?.sumFooter[0]?.sumPayAmount03?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12pt">
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck04?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold" >{{ item?.sumFooter[0]?.sumPayAmount04?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12pt">
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column">
                                    {{ item?.groupCurrDetails[0]?.lakCurr?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }} LAK
                                </div>
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column">
                                    {{ item?.groupCurrDetails[0]?.usdCurr?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }} USD
                                </div>
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column">
                                    {{ item?.groupCurrDetails[0]?.thbCurr?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }} THB
                                </div>
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column">
                                    {{ item?.groupCurrDetails[0]?.cnyCurr?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }} CNY
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold" >{{ item?.sumFooter[0]?.sumPayAmount04?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                        </tr>
                    </table>
                </div>
            </v-card-text>
        </v-card>
        <!-- component for print -->
        <div style="display:none;">
            <div id="modalInvoice">
                <v-row>
                    <v-col cols="3">
                        <img class="mx-auto" src="../assets/images/khounkham.png" height="70px" cover />
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
                <div class="text-center pb-10 pt-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:20px;padding-bottom: 30px;font-weight: bold;">
                    ລາຍງານໜີ້ຍັງຄ້າງ</div>
                <!-- <div style="width:100%" class="pr-2">
                    <div v-if="start_date != null" style="display:flex;justify-content: end;">ແຕ່ວັນທີ: {{ start_date }} - {{
                        end_date }}</div>
                    <div>ລາຍຮັບເງິນສົດ</div>
                </div> -->
                <div>
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" rowspan="2"
                                class="font-weight-bold">ຊື່ລູກຄ້າ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" rowspan="2"
                                class="font-weight-bold">ຈຳນວນມື້</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" rowspan="2"
                                class="font-weight-bold">ເລກທີບິນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" rowspan="2"
                                class="font-weight-bold">ວັນທີ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" colspan="4"
                                class="text-center font-weight-bold">ອາຍຸໜີ້</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" class="font-weight-bold">1-30
                                ວັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" class="font-weight-bold">31-60
                                ວັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" class="font-weight-bold">61-90
                                ວັນ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px" class="font-weight-bold">
                                ເກີນກວ່າ 90 ວັນ</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;" v-for="(item, i) in this.report_payment_debt"
                            :key="i">
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">{{ item?.cusName }}</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">{{ item?.calTotalDate }}</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">
                                <div class="px-2 py-1" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.billNo }}
                                </div>
                                <!-- <div class="white--text">000</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">
                                <div class="px-2 py-1" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ moment( d?.payDate ).format('DD/MM/YYYY') }}
                                </div>
                                <!-- <div class="white--text">000</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12px">
                                <div class=" px-2 py-1 red--text" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck01?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold">{{ item?.sumFooter[0]?.sumPayAmount01?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12px">
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column;"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck02?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                    <!-- <v-divider></v-divider> -->
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold"></div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12px">
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck03?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold">{{ item?.sumFooter[0]?.sumPayAmount03?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                            <td style="border: 0.5px solid #999;font-size:12px">
                                <div class="px-2 py-1 red--text" style="display:flex;flex-direction:column"
                                    v-for="(d, i) in item?.listOwePayDetails" :key="i">
                                    {{ d?.dayAmountCheck04?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                        d?.currency }}
                                </div>
                                <!-- <div style="border-top:0.5px solid #999" class="px-2 font-weight-bold" >{{ item?.sumFooter[0]?.sumPayAmount04?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</div> -->
                            </td>
                        </tr>

                    </table>
                    <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px; font-size: 12px">

                        <div
                            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                            <div>ຜູ້ສະຫຼຸບ</div>
                            <div style="height: 50px;"></div>
                            <div style="display:flex;justify-content:space-between">
                                .............................


                            </div>
                        </div>
                        <div
                            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px">
                            <div>ບັນຊີຂົນສົ່ງ</div>
                            <div style="height: 50px;"></div>
                            <div style="display:flex;justify-content:space-between">
                                ...............................


                            </div>
                        </div>
                        <div
                            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px;padding-right:20px">
                            <div>ບັນຊີຄັງເງິນ</div>
                            <div style="height: 50px;"></div>
                            <div style="display:flex;justify-content:space-between">
                                .............................


                            </div>
                        </div>
                        <div
                            style="width:1000px;display:flex;flex-direction:column;justify-content:center;align-items:center">
                            <div>ອຳນວຍການ</div>
                            <div style="height: 50px;"></div>
                            <div style="display:flex;justify-content:space-between">
                                ............................................


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
            report_payment_debt: [],
            loading_processing: false,
            sumAmountTotalGroup: [],
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
        }
    },
    mounted() {
        this.onGetAll()
    },
    methods: {
        onGetAll() {
            this.loading_processing = true
            let data = {
                startDate: this.start_date,
                toKen: localStorage.getItem("toKen"),

                endDate: this.end_date
            }
            try {
                this.$axios.$post('/OweReport.service', data).then((data) => {
                    this.report_payment_debt = data?.customerData ? data?.customerData : []
                    this.sumAmountTotalGroup = data?.sumAmountTotalGroup ? data?.sumAmountTotalGroup[0] : []
                    this.loading_processing = false
                })
            } catch (error) {
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
    }
}
</script>


<style lang="scss">
@media screen {
    #print {
        display: none;
    }
}

@media print {
    @page {
        size: A4;
        // margin: 1in;
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
}</style>
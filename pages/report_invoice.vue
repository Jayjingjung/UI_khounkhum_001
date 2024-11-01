<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <div style="display:flex;align-items:center;border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white"
                class="px-4">
                <span>ລາຍງານໃບຮຽກເກັບເງິນ</span>
                <v-spacer></v-spacer>
                <div style="width:300px">
                    <v-text-field placeholder="ຄົ້ນຫາ..." v-model="search" rounded background-color="#fff"
                        prepend-inner-icon="mdi-magnify"></v-text-field>
                </div>
            </div>
            <v-card-text>
                <div style="display:flex;align-items:center">
                    <div v-if="showAlert === true"
                        style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                        class="ml-2 pl-2 pr-10">
                        <v-icon color="red">mdi-alert-outline</v-icon>
                        <span class="ml-2 red--text">ລາຍການສີແດງຮອດກຳນົດແລ້ວ!</span>
                    </div>
                </div>
                <!-- ລວມບິນ -->
                <div style="width:100%;display:flex;justify-content:start" class="pt-4">
                    <div>
                        <h3>ທັງໝົດ: <span class="green--text">{{ report_invoice_list?.length }}</span></h3>
                        <!-- Display total number of invoices -->
                    </div>

                    <div class="ml-5 mr-5">
                        <h3>ໃບຮຽກເກັບເງິນທີ່ໄດ້ຮັບເງິນສໍາເລັດແລ້ວ: <span class="green--text">{{ successList }}</span>
                        </h3>
                        <!-- Display number of paid invoices -->
                    </div>

                    <div class="ml-10 mr-5">
                        <h3>ໃບຮຽກເກັບເງິນທີ່ລໍຖ້າຊໍາລະ: <span class="red--text">{{ waitingList }}</span></h3>
                        <!-- Display number of unpaid invoices -->
                    </div>
                </div>
                <!-- ລວມບິນ -->
                <div style="width:100%;display:flex;justify-content:start" class="pt-4">

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
                            <v-date-picker v-model="end_date" no-title scrollable
                                @input="$refs.end_menu.save(end_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="ml-2 pt-1">
                        <v-btn color="#90A4AE" class="white--text card-shadow"
                            @click="onGetAllInvoice"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <div style="width:600px" class="d-flex align-center">
                        <v-text-field placeholder="ຄົ້ນຫາ..." v-model="search" rounded background-color="#f5f5f5"
                            prepend-inner-icon="mdi-magnify"></v-text-field>
                        <div style="width: 50px;"></div>
                        <v-btn color="primary" class="card-shadow"
                            @click="prints"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
                    </div>
                </div>
                <v-divider></v-divider>
                <div style="border-radius:5px">
                    <v-data-table :items="report_invoice_list" :headers="report_invoice_headers" :search="search"
                        style="border-radius:5px">
                        <template v-slot:item="row">
                            <tr
                                :style="{ 'color': row?.item?.totalDay >= '7' && row?.item?.inVoiceStatus === 'N' ? 'red' : 'black' }">
                                <td>{{ row?.item?.inVoiceID }}</td>
                                <td>{{ row?.item?.cusID }}</td>
                                <td>{{ row?.item?.cusName }}</td>
                                <!-- <td>{{ row?.item?.row_Total?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}</td> -->
                                <!-- <td class="green--text">{{ row?.item?.priceUnit?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }} {{ row?.item?.currency }}</td> -->
                                <td class="green--text">{{ row?.item?.inVoiceAmount?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }} {{ row?.item?.currency }}</td>
                                <td>{{ moment(row?.item?.inVoiceDate).format('DD/MM/YYYY') }}</td>
                                <td v-if="row?.item?.inVoiceStatus === 'N'" class="red--text">
                                    <v-btn small color="red" class="white--text card-shadow align-center" block>
                                        <v-icon color="white" size="20">mdi-new-box</v-icon>
                                        <span class="text-wrap">ໃບຮຽກເກັບເງິນທີ່ລໍຖ້າຊໍາລະ</span>
                                    </v-btn>
                                </td>
                                <td v-else style="width:220px ">
                                    <v-btn small color="green" class="white--text card-shadow align-center" block>
                                        <v-icon color="white">mdi-check-circle</v-icon>
                                        <span>ຮັບເງິນສຳເລັດແລ້ວ</span>
                                    </v-btn>
                                </td>

                                <td><v-btn small color="primary" class="card-shadow"
                                        @click="onGetDatsForPrint(row?.item?.inVoiceID, row?.item?.cusName, row?.item?.cusID)"><v-icon>mdi-printer</v-icon>ພິມບິນຄືນ</v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </div>
            </v-card-text>
        </v-card>
        <!-- component for print -->
        <div style="display:none;">
            <div id="modalInvoice">
                <v-row>

                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                            <span style="font-size:14px"><b>
                                    <Noti />
                                </b> </span>
                            <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
                                |
                                ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-col>
                </v-row>
                <br>
                <div class="text-center pb-10 pt-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:18px"><b>ໃບຮຽກເກັບເງິນ
                        (invoice)
                    </b></div>
                <div style="display:flex;justify-content:end;flex-direction:column;align-items:end;padding-top:10px">
                    <div
                        style="border:0.5px solid #999;display:flex;flex-direction:column;padding:10px;border-radius:3px">
                        <span style="font-size:12pt">ເລກທີ: {{ data_header_print?.invoice_ID }}</span>
                        <span style="font-size:12pt">ວັນທີ: {{ data_header_print?.printDate }} </span>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:20px">
                    <div style="width:100%;display:flex;flex-direction:column">
                        <span>ລະຫັດລູກຄ້າ: {{ cusId }}</span>
                        <span>ຊື່ລູກຄ້າ: {{ cusName }}</span>
                    </div>
                    <div style="width:100%;display:flex;justify-content:space-between">
                        <span>ເລກປະຈຳຕົວຜູ້ເສຍພາສີ</span>
                        <span>(ສຳນັກງານໃຫຍ່)</span>
                    </div>
                </div>
                <div style="margin-top:20px; font-size: 12px">
                    <span>ຜູ້ຕິດຕໍ່:</span>
                </div>
                <div style="margin-top:20px">
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px">ລຳດັບ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ວັນທີສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ທະບຽນລົດ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ເລກ invoice</td>
                            <td style="border: 0.5px solid #999;padding:5px">ເລກອ້າງອີງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ໃບຂົນສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ລາຍການ</td>
                            <!-- <td style="border: 0.5px solid #999;padding:5px">ຈຳນວນ</td> -->
                            <td style="border: 0.5px solid #999;padding:5px">ລາຄາ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ລາຄາລວມ</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;" v-for="(d, i) in data_for_print" :key="i">
                            <td style="padding:5px;display:flex;justify-content:center;width:100%;align-items:center">{{
                                i +
                                1
                            }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ d?.outDate }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.viciCleNumber }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.inVoiceID }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.perID }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.laHudPoyLod }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.proType }}
                            </td>
                            <!-- <td style="border: 0.5px solid #999;padding:5px">{{ d?.proAmount }}</td> -->
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.priCE }} {{ d?.currency }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.totalPrice }} {{ d?.currency }}
                            </td>
                        </tr>
                        <tr style="padding:5px">
                            <td style="padding:5px" colspan="7"></td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ sum_total_print?.amountTotal }} {{ data_for_print[0]?.currency }}
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- <div style="display:flex;flex-direction:column;justify-content:end" class="pr-1 pt-4">
                    <div class="d-flex align-center pt-4" style="justify-content:end">
                        <span class="font-weight-bold" style="font-size:16pt">ລາຄາລວມທັງໝົດ:</span>
                        <div style="height:40px;border-radius:3px;width:300px;background-color:#000;font-size:18pt"
                            class="d-flex align-center pl-2 ml-2 red--text">
                            {{ inVoiceAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} </div>
                    </div>

                </div> -->
                <div>
                    ໝາຍເຫດ
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px">
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ເຊັນຜູ້ວ່າຈ້າງ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (..........................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:......................
                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ຜູ້ສະຫຼຸບ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (........................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:.....................
                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px">
                        <div>ບັນຊີຂົນສົ່ງ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (........................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:....................
                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px;padding-right:20px">
                        <div>ບັນຊີຄັງເງິນ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (......................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:....................
                        </div>
                    </div>
                    <div
                        style="width:1000px;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ທ່ານປະທານບໍລິສັດຄູນຄຳ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (...........................................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:........................................
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- component for print all invoices -->
        <div style="display:none">
            <div id="modalInvoices">
                <v-row>
                    <v-col cols="3">
                        <img class="mx-auto" src="../assets/images/logo01.png" height="70px" cover />
                    </v-col>
                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                            <span style="font-size:14px"><b>
                                    <Noti />
                                </b> </span>
                            <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
                                |
                                ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-col>
                </v-row>
                <br>

                <div class="text-center" style="display:flex;justify-content:center;font-size:20px;font-weight:bold">
                    ລາຍງານໃບບິນສິນຄ້າ</div>
                 <div style="padding-top:10px;padding-bottom: 20px;">
                    ທັງໝົດ: {{ report_invoice_list?.length }} ລາຍການ <span v-if="start_date !== null">ແຕ່ວັນທີ: {{
                        start_date }}
                        ຫາ {{ end_date }}</span>
                </div>



                <table
                    style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px">
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ລຳດັບ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ເລກບິນ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ລະຫັດລູກຄ້າ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຊື່ລູກຄ້າ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຈຳນວນທັງໝົດ</td>
                    </tr>
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                        v-for="(item, i) in report_invoice_list" :key="i">

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                            class=" font-weight-bold">{{ i + 1 }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.inVoiceID }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.cusID }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.cusName }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.inVoiceAmount?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }} {{ item?.currency }}</td>
                    </tr>
                </table>
                <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px">

                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ຜູ້ສະຫຼຸບ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            .............................


                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 12px">
                        <div>ບັນຊີຂົນສົ່ງ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ...............................


                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px;padding-right:20px; font-size: 12px">
                        <div>ບັນຊີຄັງເງິນ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            .............................


                        </div>
                    </div>
                    <div
                        style="width:1000px;display:flex;flex-direction:column;justify-content:center;align-items:center; font-size: 12px">
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
</template>

<script>
import swal from 'sweetalert2'
import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
            showAlert: false,
            loading_processing: false,
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            report_invoice_list: [],
            report_invoice_headers: [
                // { text: 'ເລືອກ', value: '' },
                { text: 'ເລກບິນ', value: 'inVoiceID' },
                { text: 'ລະຫັດລູກຄ້າ', value: 'cusID' },
                { text: 'ຊື່ລູກຄ້າ', value: 'cusName' },
                // { text: 'ຈຳນວນທັງໝົດ', value: 'row_Total' },
                { text: 'ລາຄາທັງໝົດ', value: 'priceUnit' },
                { text: 'ວັນທີ', value: 'price' },
                { text: 'ສະຖານະ', value: 'inVoiceStatus' },

                { text: '', value: '' },
            ],
            search: '',
            data_for_print: [],
            sum_total_print: [],
            data_header_print: [],
            cusName: '',
            cusId: '',
            successList: 0,
            waitingList: 0
        }
    },
    mounted() {
        this.onGetAllInvoice()
    },
    methods: {
        onCheckAlert() {
            this.report_invoice_list.map((list) => {
                if (list?.totalDay >= '7' && list?.inVoiceStatus === 'N') {
                    this.showAlert = true
                    return
                } else {
                    this.showAlert = false
                    return
                }
            })
        },
        async onGetAllInvoice() {
            this.loading_processing = true
            this.successList = 0
            this.waitingList = 0
            let data = {
                startDate: this.start_date,
                toKen: localStorage.getItem("toKen"),
                endDate: this.end_date
            }
            try {
                this.$axios.$post('/ViewInVoiceBlack.service', data).then((data) => {
                    this.loading_processing = false
                    this.report_invoice_list = data?.data;

                    // ສໍາເລັດ
                    for (let i = 0; i < data?.data?.length; i++) {
                        if (data?.data[i].inVoiceStatus === 'Y') {
                            this.successList = parseFloat(this.successList) + 1
                        } else {
                            this.waitingList = parseFloat(this.waitingList) + 1
                        }
                    }
                    this.onCheckAlert()
                    // ສໍາເລັດ
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
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
        prints() {
            const modal = document.getElementById("modalInvoices")
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
        async onGetDatsForPrint(key, cusName, cusId) {
            this.cusName = cusName;
            this.cusId = cusId;
            this.loading_processing = true;

            const data = {
                billNo: key,
                toKen: localStorage.getItem("toKen")
            };

            try {
                const response = await this.$axios.$post('/PintInvoiceByNo.service', data);

                if (response?.status === '00') {
                    console.log("dataForprint:", response);
                    // Check if these properties exist before accessing them
                    if (response.headerPrint && response.headerPrint.length > 0) {
                        this.data_header_print = response.headerPrint[0];
                    }
                    if (response.data) {
                        this.data_for_print = response.data;
                    }
                    if (response.sumTotal && response.sumTotal.length > 0) {
                        this.sum_total_print = response.sumTotal[0];
                    }
                    setTimeout(() => {
                        this.print();
                    }, 1000);
                } else {
                    // Handle scenarios where status is not '00'
                    console.error('Unexpected response status:', response?.status);
                }
            } catch (error) {
                // More robust error handling
                console.error('Error fetching print data:', error);
                // Handle specific error scenarios here if needed
            } finally {
                // Ensure loading state is turned off in both success and error scenarios
                this.loading_processing = false;
            }
        }

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
<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow" rounded="lg">
            <v-card-title style="background-color:#E57373">
                <div style="display:flex;width:100%;align-items:center">
                    <div class=" d-flex align-center">
                        <div>
                            <v-icon size="40" color="#fff">mdi-receipt-text-check</v-icon>
                        </div>
                        <div style="line-height: 16px;display:flex;flex-direction:column" class="pl-2 white--text">
                            <span style="font-size:14pt">ສ້າງບິນ</span>
                            <span>Invoice</span>
                        </div>

                    </div>
                    <v-spacer></v-spacer>
                    <v-text-field solo flat dense background-color="#fff" placeholder="ຄົ້ນຫາ..." v-model="search"
                        prepend-inner-icon="mdi-magnify"></v-text-field>
                </div>

            </v-card-title>

            <v-card-text class="pt-2">
                <div>
                    <span style="font-size:12pt">ທັງໝົດ: <span class="green--text">{{ report_peration_list?.length }}
                            ລາຍການ</span></span>
                </div>
                <v-btn color="primary" @click="selectAll">Select All</v-btn>

                <div style="width:100%;display:flex;justify-content:start" class="pt-4">

                    <div class="d-flex align-center">
                        <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                            :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="formattedStartDate" required
                                    label="ວັນທີເລີ່ມຕົ້ນ" append-icon="mdi-calendar" readonly v-bind="attrs"
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
                            :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="formattedEndDate" required label="ວັນທີສຸດທ້າຍ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="end_date" no-title scrollable
                                @input="$refs.end_menu.save(end_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>


                    <div class="ml-2 pt-1">
                        <v-btn color="#90A4AE" class="white--text" elevation="0" @click="() => { onGetAllPermance(); }">
                            <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
                        </v-btn>

                    </div>
                    <v-spacer></v-spacer>
                    <div style="width:600px" class="d-flex align-center">
                        <v-text-field placeholder="ຄົ້ນຫາດ້ວຍລະຫັດປ່ອຍລົດ..." v-model="search" rounded
                            background-color="#f5f5f5" prepend-inner-icon="mdi-magnify"></v-text-field>
                        <div style="width: 50px;"></div>
                        <v-btn color="primary" class="card-shadow"
                            @click="print"><v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ</v-btn>
                    </div>
                </div>
                <div>
                    <v-data-table :items="report_peration_list" :headers="report_operation_header" :search="search">
                        <template v-slot:item="row">
                            <tr
                                @click="onChooseForBill(row?.item?.performancebillno, row?.item?.customer_ID, row?.item?.currency)">
                                <td>
                                    <v-btn fab elevation="0" width="25" height="25" class="card-shadow" outlined
                                        color="green" small
                                        @click="onChooseForBill(row?.item?.performancebillno, row?.item?.customer_ID, row?.item?.currency)">
                                        <v-icon v-if="row?.item?.check === 'true'" color="green">mdi-check</v-icon>
                                    </v-btn>
                                </td>
                                <td>{{ row?.item?.key_ID }}</td>
                                <td>{{ row?.item?.performancebillno }}</td>
                                <td>{{ row?.item?.customer_ID }}</td>
                                <td>{{ row?.item?.customer_NAME }}</td>
                                <td>{{ row?.item?.pro_TYPE }}</td>
                                <td>{{ row?.item?.datePerformanceCreate }}</td>
                                <td class="green--text">{{ row?.item?.total_PRICE?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }}
                                    {{ row?.item?.currency }}</td>
                                <td v-if="row?.item?.status === 'N'" class="red--text "><v-btn small color="red"
                                        class="white--text card-shadow" block>
                                        <v-icon color="white" size="20">mdi-new-box</v-icon>
                                        <span class="ml-2">ລໍຖ້າສ້າງບິນ</span>
                                        <v-spacer></v-spacer>
                                    </v-btn></td>

                            </tr>
                        </template>
                    </v-data-table>
                    <div class="d-flex pb-2 pt-4" v-if="report_peration_list?.length > 0">
                        <v-spacer></v-spacer>
                        <v-btn color="#448AFF" width="200" class="white--text card-shadow" @click="onShowDialogInvoice">
                            ສ້າງໃບບິນ
                        </v-btn>
                    </div>
                </div>


                <v-snackbar :timeout="3000" v-model="showSnakbar" :value="true" elevation="0" centered color="orange">
                    <div class="d-flex align-center">
                        <v-icon color="white" size="40">mdi-alert-outline</v-icon>
                        <span style="font-size:14pt">ກະລຸນາເລືອກລາຍການກ່ອນ</span>
                    </div>
                </v-snackbar>
            </v-card-text>
        </v-card>

        <!-- dialog invoice -->
        <v-dialog v-model="invoice" fullscreen>
            <v-card class="mx-auto">
                <v-card-text>

                    <div style="display:flex;justify-content:center;flex-direction:column;align-items:center;border-radius:5px"
                        class="pt-10 px-10">
                        <div style="width:100%;border-radius:5px" class="pa-5 pb-10 card-shadow">
                            <div style="background-color:#E57373;color:white;height:50px;display:flex;align-items:center;border-radius:5px"
                                class="pl-4">
                                <h3>ລາຍການທີ່ເລືອກເພື່ອສ້າງບິນຮຽກເກັບເງິນ</h3>
                            </div>
                            <div class="d-flex align-center">
                                <div style="background-color:#f5f5f5;border-radius:3px"
                                    class="pr-10 pl-2 d-flex align-center py-2">
                                    <div>
                                        <v-icon size="40" color="#999">mdi-receipt-text-check</v-icon>
                                    </div>
                                    <div style="display:flex;flex-direction:column;line-height: 15px;">
                                        <span class="font-weight-bold">ສ້າງໃບບິນ</span>
                                        <span>Invoice</span>
                                    </div>
                                </div>
                                <v-spacer></v-spacer>
                                <div class="pt-4">
                                    <div style="width:100%;display:flex" class="mt-2 ">
                                        <v-spacer></v-spacer>
                                        <div class="d-flex align-center pl-2">
                                            <span><span class="font-weight-bold">ວັນທີອອກບິນ:</span></span>
                                            <div class="d-flex align-center pl-2" style="width: 258px;">
                                                <v-menu ref="end_menu" v-model="end_menu"
                                                    :close-on-content-click="false" :return-value.sync="end_date"
                                                    transition="scale-transition" offset-y min-width="auto">

                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field dense outlined v-model="end_date" required
                                                            append-icon="mdi-calendar" readonly v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="end_date" no-title scrollable
                                                        @input="$refs.end_menu.save(end_date)">
                                                        <v-spacer></v-spacer>
                                                    </v-date-picker>
                                                </v-menu>

                                            </div>
                                            <div class="d-flex align-center pl-2" style="width: 258px;">
                                                <!-- ວັນກຳນັດຈ່າຍຄັ້ງຖັດໄປ -->
                                                <v-menu ref="nextDatePayy" v-model="nextDatePayy"
                                                    :close-on-content-click="false" :return-value.sync="nextDatePay"
                                                    transition="scale-transition" offset-y min-width="auto">

                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field dense outlined v-model="nextDatePay" required
                                                            label="ເລືອກວັນກຳນົດຊຳລະ" append-icon="mdi-calendar"
                                                            readonly v-bind="attrs" v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="nextDatePay" no-title scrollable
                                                        @input="$refs.nextDatePayy.save(nextDatePay)">
                                                        <v-spacer></v-spacer>
                                                    </v-date-picker>
                                                </v-menu>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="pt-6">
                                <table
                                    style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%">
                                    <tr
                                        style="padding:5px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                            class="pa-1 font-weight-bold">ລະຫັດປ່ອຍລົດ</td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                            class="pa-1 font-weight-bold">ລະຫັດປະຕິບັດງານ</td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 font-weight-bold">ລະຫັດລູກຄ້າ</td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 font-weight-bold">ຊື່ລູກຄ້າ</td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 font-weight-bold">ເນື້ອໃນການຮັບສົ່ງ</td>

                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 font-weight-bold">ລາຄາລວມທັງໝົດ</td>
                                    </tr>
                                    <tr v-for="(d, i) in data_for_create_invoice" :key="i"
                                        style="padding:5px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                            class="pa-1 py-2 px-2">
                                            <div style="border:0.5px solid #999;height:30px;border-radius:3px;"
                                                class="d-flex align-center pl-2">{{ d?.leave_id }}</div>
                                        </td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                            class="pa-1 px-2">
                                            <div style="border:0.5px solid #999;height:30px;border-radius:3px"
                                                class="d-flex align-center pl-2">{{ d?.per_id }}</div>
                                        </td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 px-2">
                                            <div style="border:0.5px solid #999;height:30px;border-radius:3px"
                                                class="d-flex align-center pl-2">{{ d?.cus_id }}</div>
                                        </td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 px-2">
                                            <div style="border:0.5px solid #999;height:30px;border-radius:3px"
                                                class="d-flex align-center pl-2">{{ d?.cus_name }}</div>
                                        </td>
                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 px-2">
                                            <div style="border:0.5px solid #999;height:30px;border-radius:3px"
                                                class="d-flex align-center pl-2">{{ d?.details }}</div>
                                        </td>

                                        <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                            class="pa-1 px-2">
                                            <div style="border:0.5px solid #999;height:30px;border-radius:3px"
                                                class="d-flex align-center pl-2 green--text">{{ d?.total_price }} {{
                                                    d?.currency }}</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--  -->
                            <div class="d-flex align-center">
                                <div style="display:flex;justify-content:end;align-items:end">
                                    <v-btn color="red" outlined @click="onCloseDialog"
                                        class="white--text"><v-icon>mdi-close</v-icon>ປິດ</v-btn>
                                    <v-btn elevation="0" color="#448AFF" @click="onCreateInvoice"
                                        class="white--text ml-4"><v-icon>mdi-check-circle</v-icon>ສ້າງໃບບິນ</v-btn>
                                </div>

                                <v-spacer></v-spacer>

                                <div style="display:flex;flex-direction:column;justify-content:end" class="pr-1 pt-4">
                                    <div class="d-flex align-center pt-4" style="justify-content:end">
                                        <span class="font-weight-bold" style="font-size:16pt">ລາຄາລວມທັງໝົດ:</span>
                                        <div style="height:40px;border-radius:3px;width:300px;background-color:#000;font-size:18pt"
                                            class="d-flex align-center pl-2 ml-2 red--text">
                                            {{ sumTotalPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                                data_for_create_invoice[0]?.currency }}</div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>


                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- component for print  -->
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
                    style="display:flex;justify-content:center;font-size:20px">
                    <b>ໃບຮຽກເກັບເງິນ</b>
                </div>
                <div class="text-center pb-10 pt-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:20px">
                    <b>(invoice)</b>
                </div>
                <!-- ວັນທີໃນໃບຮຽກເກັບເງິນ -->

                <div class="text-center pb-10 pt-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:20px">
                    <span style="font-size:12px">ວັນທີ: {{ formattedStartDate
                        }}
                    </span>
                    <span style="font-size:12px">ຫາ ວັນທີ: {{ formattedEndDate
                        }} 
                    </span>


                </div>

                <div style="display:flex;justify-content:end;flex-direction:column;align-items:end;padding-top:50px">
                    <div
                        style="border:0.5px solid #999;display:flex;flex-direction:column;padding:10px;border-radius:3px">
                        <span style="font-size:12px">ເລກທີ: {{ data_for_print[0]?.inVoiceID }}</span>

                    </div>
                </div>
                <div
                    style="display:flex;flex-direction:row;justify-content:space-between;margin-top:20px; font-size:12px">
                    <div style="width:100%;display:flex;flex-direction:column">
                        <span>ລະຫັດລູກຄ້າ: {{ data_for_print[0]?.cusID }}</span>
                        <span>ຊື່ລູກຄ້າ: {{ data_for_print[0]?.cusName }}</span>
                    </div>
                    <div style="width:100%;display:flex;justify-content:space-between">
                        <span>ເລກປະຈຳຕົວຜູ້ເສຍພາສີ</span>
                        <span>(ສຳນັກງານໃຫຍ່)</span>
                    </div>
                </div>
                <div style="margin-top:10px; font-size:12px">
                    <span>ຜູ້ຕິດຕໍ່:</span>
                </div>
                <div style="margin-top:20px; font-size:12px">
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px">ລຳດັບ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ວັນທີສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ທະບຽນລົດ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ເລກອ້າງອີງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ໃບຂົນສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ລາຍການ</td>

                            <td style="border: 0.5px solid #999;padding:5px">ລາຄາລວມ</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;" v-for="(d, i) in data_for_print" :key="i">
                            <td style="padding:5px;display:flex;justify-content:center;width:100%;align-items:center">
                                {{ i + 1 }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ d?.outDate }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.viciCleNumber }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.perID }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.laHudPoyLod }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.proType }}
                            </td>

                            <td style="border: 0.5px solid #999;padding:5px">{{ d?.totalPrice }} {{ d?.currency }}
                            </td>
                        </tr>

                    </table>
                </div>

                <div style="display:flex;flex-direction:column;justify-content:end" class="pr-1 pt-4">
                    <div class="d-flex align-center pt-4" style="justify-content:end">
                        <span class="font-weight-bold" style="font-size:16pt">ລາຄາລວມທັງໝົດ:</span>
                        <div style="height:40px;border-radius:3px;width:300px;background-color:#000;font-size:18pt"
                            class="d-flex align-center pl-2 ml-2 red--text">
                            {{ sumTotalPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                                data_for_create_invoice[0]?.currency }}</div>
                    </div>

                </div>
                <div style="margin-top: 10px; font-size: 12px;">
                    ໝາຍເຫດ :
                </div>
                <!-- <div style="font-size:12pt">
                    ໝາຍເຫດ :
                </div> -->
                <div style="margin-top: 10px; font-size: 12px;">
                    ວັນກຳນົດຊຳລະ : {{ moment(nextDatePay).format('DD/MM/YYYY') }}
                    <!-- <span style="font-size:12px">ວັນກຳນົດຊຳລະ : {{ nextDatePay }}</span> -->
                </div>
                <div
                    style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px; font-size:12px">
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ເຊັນຜູ້ວ່າຈ້າງ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (.............................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:..........................
                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ຜູ້ສະຫຼຸບ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (.............................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:..........................
                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px">
                        <div>ບັນຊີຂົນສົ່ງ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (...............................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:..........................
                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px;padding-right:20px">
                        <div>ບັນຊີຄັງເງິນ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (.............................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:.........................
                        </div>
                    </div>
                    <div
                        style="width:1000px;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ທ່ານປະທານບໍລິສັດຄູນຄຳ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            (............................................)


                        </div>
                        <div style="margin-top:30px">
                            ວັນທີ:........................................
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import moment from 'moment'
export default {
    data() {
        return {
            nextDatePayy: false,
            nextDatePay: null,
            moment: moment,
            check: false,
            localCheck: '',
            localCheckCurr: '',
            end_menu: false,
            end_date: null,
            start_date: null,
            start_menu: false,
            search: '',
            invoice: false,
            loading_processing: false,
            data_for_create_invoice: [],
            report_peration_list: [],
            report_operation_header: [
                { text: 'ເລືອກ', value: '' },
                { text: 'ລະຫັດປະຕິບັດງານ', value: 'key_ID' },
                { text: 'ລະຫັດປ່ອຍລົດ', value: 'performancebillno' },
                { text: 'ລະຫັດລູກຄ້າ', value: 'customer_ID' },
                { text: 'ຊື່ລູກຄ້າ', value: 'customer_NAME' },
                { text: 'ເນື້ອໃນການຮັບສົ່ງ', value: 'pro_TYPE' },
                { text: 'ວັນທີອອກໃບປະຕິບັດງານ', value: 'datePerformanceCreate' },
                { text: 'ລາຄາທັງໝົດ', value: 'total_PRICE' },
                { text: 'ສະຖານະ', value: 'status' },
            ],
            sumQty: '',
            sumPrice: '',
            sumTotalPrice: '',
            inVoiceBillNo: '',
            formatDate: '',

            inVoiceDate: '',
            showAlert: '',
            showSnakbar: false,
            array_invoice: [],
            data_for_print: [],
            sum_total_print: [],
            data_header_print: []
        };
    },
    watch: {
        data_for_create_invoice: function () {
            if (this.data_for_create_invoice?.length !== 0) {
                const sumqty = this.data_for_create_invoice.reduce((a, o) => {
                    return parseFloat(a) + parseFloat(o?.qty?.split(',').join(''))
                }, 0)
                const sumprice = this.data_for_create_invoice.reduce((a, o) => {
                    return parseFloat(a) + parseFloat(o?.price?.split(',').join(''))
                }, 0)
                const sumtotalprince = this.data_for_create_invoice.reduce((a, o) => {
                    return parseFloat(a) + parseFloat(o?.total_price?.split(',').join(''))
                }, 0)
                this.sumQty = sumqty;
                this.sumPrice = sumprice;
                this.sumTotalPrice = sumtotalprince
            }
        },
    },
    computed: {
        formattedStartDate() {
            return this.start_date ? moment(this.start_date).format('YYYY-MM-DD') : '';
        },
        formattedEndDate() {
            return this.end_date ? moment(this.end_date).format('YYYY-MM-DD') : '';
        },
    },
    mounted() {
        this.onGetAllPermance();
        this.onGetInvoiceBillNo();
    },
    methods: {

        async onCreateInvoice() {
            this.loading_processing = true
            try {
                await this.$axios.$post('/CreateMoreInvoice.service', this.array_invoice).then((data) => {
                    this.onGetDatsForPrint()
                })
            } catch (error) {
                this.loading_processing = false
                console.log(error)

            }
        },

        async onGetDatsForPrint() {
            this.loading_processing = true; // Set loading to true at the start

            let data = {
                billNo: this.inVoiceBillNo,
                // toKen: localStorage.getItem("toKen")

            };

            try {
                const response = await this.$axios.$post('/PintInvoiceByNo.service', data);

                if (response?.status === '00') {
                    // Check if properties exist before accessing them
                    if (response.headerPrint && response.headerPrint.length > 0) {
                        this.data_header_print = response.headerPrint[0];
                    }
                    if (response.data) {
                        this.data_for_print = response.data;
                    }
                    if (response.sumTotal && response.sumTotal.length > 0) {
                        this.sum_total_print = response.sumTotal[0];
                    }

                    // Delay the print call by 1 second
                    setTimeout(() => {
                        this.print(); // Call print method here
                    }, 1000);

                } else {
                    console.error('Unexpected response status:', response?.status);
                }
            } catch (error) {
                console.error('Error fetching print data:', error);
            } finally {
                this.loading_processing = false; // Ensure loading is set to false in both success and error cases
            }


        },
        to_location() {
            window.location.href = '/invoice-list';
        },
        removeDataInvoice(index) {
            this.data_for_create_invoice.splice(index, 1)
        },
        selectAll() {
            for (const item of this.report_peration_list) {
                item.check = 'true';
            }
        },


        onChooseForBill(key, cusID, Curr) {
            if (this.data_for_create_invoice?.length === 0) {
                this.localCheck = cusID
                this.localCheckCurr = Curr
            }
            if (this.localCheck?.toString() !== cusID?.toString()) {
                Swal.fire({
                    icon: 'warning',
                    text: 'ບໍ່ສາມາດເລືອກລູກຄ້າຫຼາຍຄົນໃນໃບບິນດຽວກັນ !'
                })
                return
            }
            if (this.localCheckCurr?.toString() !== Curr?.toString()) {
                Swal.fire({
                    icon: 'warning',
                    text: 'ບໍ່ສາມາດເລືອກຫຼາຍສະກຸນເງິນໃນໃບບິນດຽວກັນ !'
                })
                return
            }
            const fillter = this.report_peration_list?.filter((el) => el.performancebillno === key);

            const objWithIdIndex = this.report_peration_list.findIndex((obj) => obj.performancebillno === key);
            if (this.report_peration_list[objWithIdIndex]?.check === 'true') {
                this.report_peration_list[objWithIdIndex].check = 'false'
            } else {
                this.report_peration_list[objWithIdIndex].check = 'true'
            }
            if (this.data_for_create_invoice?.length === 0) {
                this.data_for_create_invoice.push({
                    'leave_id': key, 'per_id': fillter[0]?.key_ID,
                    'cus_id': fillter[0]?.customer_ID,
                    'cus_name': fillter[0]?.customer_NAME,
                    'details': fillter[0]?.pro_TYPE, 'qty': fillter[0]?.product_AMOUNT,
                    'price': fillter[0]?.price, 'total_price': fillter[0]?.total_PRICE,
                    'status': fillter[0]?.status,
                    'currency': fillter[0]?.currency
                })
                this.array_invoice.push(
                    {
                        'cusID': fillter[0]?.customer_ID,
                        'cusName': fillter[0]?.customer_NAME,
                        'perID': fillter[0]?.performancebillno,
                        'proType': fillter[0]?.pro_TYPE,
                        'proAmount': fillter[0]?.product_AMOUNT,
                        'priCE': fillter[0]?.price,
                        'totalPrice': fillter[0]?.total_PRICE,
                        'inVoiceID': this.inVoiceBillNo,
                        'key_id': fillter[0]?.key_ID,

                        toKen: localStorage.getItem("toKen")


                    }
                )
            } else {
                const remove = this.data_for_create_invoice.filter((el) => el.leave_id === key);
                if (remove?.length > 0) {
                    const objWithIdIndex = this.data_for_create_invoice.findIndex((obj) => obj.leave_id === key);
                    this.data_for_create_invoice.splice(objWithIdIndex, 1);
                    this.array_invoice.splice(objWithIdIndex, 1);
                } else {
                    this.data_for_create_invoice.push({
                        'leave_id': key, 'per_id': fillter[0]?.key_ID,
                        'cus_id': fillter[0]?.customer_ID,
                        'cus_name': fillter[0]?.customer_NAME,
                        'details': fillter[0]?.pro_TYPE, 'qty': fillter[0]?.product_AMOUNT,
                        'price': fillter[0]?.price, 'total_price': fillter[0]?.total_PRICE,
                        'status': fillter[0]?.status,
                        'currency': fillter[0]?.currency
                    })
                    this.array_invoice.push(
                        {
                            'cusID': fillter[0]?.customer_ID,
                            'cusName': fillter[0]?.customer_NAME,
                            'perID': fillter[0]?.performancebillno,
                            'proType': fillter[0]?.pro_TYPE,
                            'proAmount': fillter[0]?.product_AMOUNT,
                            'priCE': fillter[0]?.price,
                            'totalPrice': fillter[0]?.total_PRICE,
                            'inVoiceID': this.inVoiceBillNo,
                            'key_id': fillter[0]?.key_ID
                        }
                    )
                }
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

            window.location.href = '/invoice-list';

        },

        onGetAllPermance() {
            this.loading_processing = true
            try {
                this.$axios.$post('/listGetPayment.service', {
                    toKen: localStorage.getItem("toKen"), startDate: this.start_date,
                    endDate: this.end_date,

                }).then((data) => {
                    if (data?.data) {
                        this.loading_processing = false
                        let push = { 'check': 'false' }
                        this.report_peration_list = data?.data?.map((list) => {
                            return { ...list, ...push }
                        })
                    } else {
                        this.report_peration_list = []
                        this.loading_processing = false
                    }
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },
        onGetInvoiceBillNo() {
            this.loading_processing = true


            try {
                this.$axios.$post('/gernerateID.service', { toKen: localStorage.getItem("toKen") }).then((data) => {
                    console.log("bill", data)
                    this.inVoiceBillNo = data?.data[0]?.invoice_ID;

                    this.end_date = data?.data[0]?.printDate;
                    this.loading_processing = false
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },
        onShowDialogInvoice() {
            if (this.data_for_create_invoice?.length > 0) {
                this.invoice = true;
                this.showAlert = false;
            } else {
                Swal.fire({
                    icon: 'warning',
                    text: 'ກະລຸນາເລືອກສິນຄ້າກ່ອນ !'
                });

            }

        },
        onCloseDialog() {
            this.invoice = false;
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
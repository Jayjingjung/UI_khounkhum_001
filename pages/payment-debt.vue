<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <div style="display:flex;flex-direction:row;justify-content:space-between" class="pb-5">
            <v-card class="card-shadow" rounded="lg" style="width:50%">
                <v-card-title style="background-color:#E57373;color:white">ຮັບເງິນຍ້ອນຫຼັງ</v-card-title>
                <v-card-text class="pt-6">
                    <div style="display:flex;justify-content:center;flex-direction:row;align-items:center">

                        <v-text-field outlined dense label="ປ້ອນເລກບິນສິນຄ້າ" v-model="invoice_id"
                            @keyup.enter="onGetDataForPayment"></v-text-field>

                        <div style="margin-top:-26px;margin-left:-3px">
                            <v-btn elevation="0" style="border-radius:0px" height="40" color="#90A4AE" class="white--text"
                                @click="onGetDataForPayment"><v-icon color="white">mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                        </div>
                        <div style="margin-top:-26px;border-left:1px solid white">
                            <v-btn elevation="0" style="border-radius:0px" height="40" color="#448AFF" class="white--text"
                                @click="showBillList = true">ເລືອກ<v-icon
                                    color="white">mdi-arrow-right-thin</v-icon></v-btn>
                        </div>
                    </div>
                    <div v-if="check_payment?.length > 0" style="margin-top:-20px">
                        <div style="display:flex;align-items:center">
                            <div style="display:flex;align-items:center">
                                <v-checkbox v-model="cash" @change="onCashChange('ເງິນສົດ')"></v-checkbox>
                                <span>ເງິນສົດ</span>
                            </div>
                            <div style="display:flex;align-items:center" class="ml-8">
                                <v-checkbox v-model="transfer" @change="onTransferChange('ເງິນໂອນ')"></v-checkbox>
                                <span>ເງິນໂອນ</span>
                            </div>
                        </div>
                        <div style="width:100%" v-if="cash === true">
                            <v-form v-model="valid" ref="form" lazy-validation>
                                <v-text-field prepend-inner-icon="mdi-cash" :rules="nameRules" outlined dense
                                    label="ຈຳນວນເງິນທີຊຳລະ" placeholder="ປ້ອນຈຳນວນເງິນທີຊຳລະ"
                                    v-model="amount"></v-text-field>
                                <div style="width:100%">
                                    <v-text-field outlined dense label="ເລກອ້າງອີງ" placeholder="ປ້ອນເລກອ້າງອີງ"
                                        v-model="trf_ref" :rules="nameRules"></v-text-field>
                                </div>
                            </v-form>
                        </div>
                        <div v-if="transfer === true">
                            <v-form v-model="valid1" lazy-validation ref="form1">
                                <div>

                                    <div style="width:100%">
                                        <v-select outlined label="ເລືອກທະນະຄານ" v-model="bankNamePayment" dense
                                            :items="bank_list" item-text="bankName" item-value="bankName"
                                            :rules="nameRules"></v-select>
                                    </div>
                                    <div style="width:100%">
                                        <v-text-field outlined dense label="ເລກອ້າງອີງ" placeholder="ປ້ອນເລກອ້າງອີງ"
                                            v-model="trf_ref" :rules="nameRules"></v-text-field>
                                    </div>
                                    <div style="width:100%">
                                        <v-text-field outlined dense label="ຈຳນວນເງິນ" placeholder="ປ້ອນຈຳນວນເງິນ"
                                            v-model="amount" :rules="nameRules"></v-text-field>
                                    </div>
                                </div>
                            </v-form>
                        </div>
                        <!-- ກຳນົດຊຳລະງວດຖັດໄປ -->
                        <v-menu ref="nextDatePayy" v-model="nextDatePayy" :close-on-content-click="false"
                            :return-value.sync="nextDatePay" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="nextDatePay" required
                                    label="ເລືອກວັນກຳນົດຊຳລະຄັ້ງຖັດໄປ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="nextDatePay" no-title scrollable
                                @input="$refs.nextDatePayy.save(nextDatePay)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="pt-4" v-if="check_payment?.length > 0" style="width:100%">
                        <v-btn elevation="0" block height="40" color="#4AAF41" class="white--text"
                            @click="onCheckMoneyPayment"><v-icon color="white">mdi-check</v-icon>ຊຳລະ</v-btn>
                    </div>
                    <div v-else class="pa-2"
                        style="background-color:#e0e0e0;border-radius:3px;display:flex;justify-content:center;align-items:center">
                        <v-icon color="red">mdi-cancel</v-icon>
                        <span style="font-size:12pt" class="ml-2 red--text">ບໍ່ມີຂໍ້ມູນ</span>
                    </div>

                </v-card-text>
            </v-card>

            <div style="width:20px"></div>
            <v-card class="card-shadow" style="width:100%" rounded="lg">
                <v-card-title style="background-color:#E57373;color:white">ລາຍການຄ້າງຊຳລະ </v-card-title>
                <v-card-text>
                    <div
                        style="width:100%;display:flex;flex-direction:column;padding:15px;border-radius:5px;margin-right:20px">
                        <table style="padding:2px;width:100%;border-radius:10px;border-collapse: collapse;" class="mt-4">
                            <tr style="padding:5px">

                                <td style="border: 0.5px solid #999;color:#000" class="pa-2 text-center">
                                    ເລກທີຊຳລະ</td>
                                <td style="border: 0.5px solid #999;color:#000" class="pa-2 text-center">
                                    ເລກບິນ</td>

                                <td style="border: 0.5px solid #999;color:#000" class="pa-2 text-center">
                                    ລະຫັດລູກຄ້າ</td>
                                <td style="border: 0.5px solid #999;color:#000" class="pa-2 ">
                                    ຊື່ລູກຄ້າ</td>
                                <td style="border: 0.5px solid #999;color:#000" class="pa-2 ">ລາຍລະອຽດ</td>
                                <!-- <td style="border: 0.5px solid #999;color:#000" class="pa-2 text-right">ລາຄາ</td> -->
                                <td style="border: 0.5px solid #999;color:#000" class="pa-2 text-right">ລາຄາລວມ</td>

                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                                v-for="(items, i) in check_payment" :key="i">


                                <td class="text-center"
                                    style="border: 0.5px solid #999;border-collapse: collapse;color:#000">
                                    {{ items?.billNo }}
                                </td>
                                <td class="text-center"
                                    style="border: 0.5px solid #999;border-collapse: collapse;color:#000">
                                    {{ items?.inVoiceID }}
                                </td>
                                <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                    class="pa-2 text-center">
                                    {{ items?.cusID }}
                                </td>
                                <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000" class="pa-2 ">
                                    {{ items?.cusName }}
                                </td>
                                <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000" class="pa-2 ">
                                    {{ items?.proType }}
                                </td>

                                <!-- <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                    class="pa-2 text-right">
                                    {{ items?.priCE }} {{ items?.currency }}
                                </td> -->
                                <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                    class="pa-2 text-right">
                                    {{ items?.totalPrice }} {{ items?.currency }}
                                </td>

                            </tr>

                            <tr>
                                <td style="border-collapse: collapse;color:#000" class="pa-2 text-right" colspan="5">
                                    ລາຄາລວມທັງໝົດ:</td>
                                <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                    class="pa-2 font-weight-bold text-right">{{
                                        sum?.amountTotal ? sum?.amountTotal?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0 }} {{
        check_payment[0]?.currency }}</td>

                            </tr>
                            <tr>
                                <td style="border-collapse: collapse;color:#000" class="pa-2 text-right" colspan="5">
                                    ຈຳນວນທີ່ຊຳລະແລ້ວ:</td>
                                <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                    class="pa-2 font-weight-bold green--text text-right">{{
                                        sum?.amountTotal ? sum?.sumPayamount?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0 }} {{
        check_payment[0]?.currency }}</td>

                            </tr>
                            <tr>
                                <td style="border-collapse: collapse;color:#000" class="pa-2 text-right" colspan="5">
                                    ຈຳນວນທີ່ຄ້າງຊຳລະ:</td>
                                <td style="border: 0.5px solid #999;border-collapse: collapse;color:#000"
                                    class="pa-2 font-weight-bold red--text text-right">{{
                                        sum?.sumNoPayAmount ? sum?.sumNoPayAmount?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0 }}
                                    {{ check_payment[0]?.currency }}
                                </td>

                            </tr>
                        </table>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <v-dialog v-model="showBillList" max-width="1000">
            <v-card>
                <v-card-title style="background-color:#E57373;color:white">
                    <div style="display:flex;align-items:center;width:100%">
                        <span>ລາຍການຄ້າງຊຳລະ <spa> ({{
                            report_invoice_list?.length.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }})</spa> ລາຍການ</span>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="showBillList = false"><v-icon color="white">mdi-close</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <div>
                        <v-data-table :items="report_invoice_list" :headers="report_invoice_headers" :search="search"
                            style="border-radius:5px">
                            <template v-slot:item="row">
                                <tr :style="{ 'color': row?.item?.totalDay >= '7' ? 'red' : 'black' }">

                                    <td>{{ row?.item?.billNo }}</td>
                                    <td>{{ row?.item?.invoiceNo }}</td>
                                    <td>{{ row?.item?.cusId }}</td>
                                    <td>{{ row?.item?.cusName }}</td>
                                    <td class="red--text">{{ row?.item?.noPayAmount?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }} {{ row?.item?.currency }}
                                    </td>
                                    <td class="red--text">
                                        <div class="d-flex algin-center" style="width:90px">
                                            <v-btn small color="red" class="white--text card-shadow" block>
                                                <v-icon color="white" size="20">mdi-new-box</v-icon>
                                                <span class="ml-2">ຄ້າງຊຳລະ</span>
                                                <v-spacer></v-spacer>
                                            </v-btn>
                                        </div>
                                    </td>
                                    <td><v-btn small color="#448AFF" class="card-shadow white--text"
                                            @click="onChoose(row?.item?.invoiceNo)"><v-icon
                                                color="white">mdi-check</v-icon>ເລືອກ</v-btn>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar :timeout="5000" v-model="showSnakbar" :value="true" elevation="0" centered color="orange">
            <div class="d-flex align-center">
                <v-icon color="white" size="40">mdi-alert-outline</v-icon>
                <span style="font-size:14pt">ຈຳນວນເງິນທີປ້ອນຫຼາຍກ່ວາຈຳນວນເງິນຕົວຈີງ</span>
            </div>
            <template v-slot:action="{ attrs }">
                <v-btn icon color="pink" text v-bind="attrs" @click="showSnakbar = false">
                    <v-icon color="white">mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
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
                    style="display:flex;justify-content:center;font-size:14px">
                    <b>ໃບບິນຮັບເງິນ</b>
                </div>
                <div class="text-center pb-10 pt-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:12px">
                    <b>RECIIPT</b>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;padding-top:20px">
                    <span style="font-size:12px">ເລກປະຈຳຕົວຜູ້ເສຍພາສີ</span>
                    <div style="width:50px"></div>
                    <span style="font-size:12px">(ສຳນັກງານໃຫຍ່)</span>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:10px;width:100%">
                    <div
                        style="width:100%;display:flex;flex-direction:column;border:0.5px solid #999;padding:5px;border-radius:3px;margin-right:50px">
                        <span style="font-size:12px">ລະຫັດລູກຄ້າ: {{ data_for_print_header?.cusId }}</span>
                        <span style="font-size:12px">ຊື່ລູກຄ້າ: {{ data_for_print_header?.cusName }}</span>
                        <span style="font-size:12px">{{ data_for_print_header?.location }}</span>
                    </div>
                    <div
                        style="width:50%;display:flex;flex-direction:column;justify-content:center;border:0.5px solid #999;padding:5px;border-radius:3px">
                        <span style="font-size:12px">ວັນທີ: {{ data_for_print_header?.printDate }}</span>
                        <span style="font-size:12px">ເລກທີບິນ: {{ data_for_print_header?.billNo }}</span>
                    </div>
                </div>

                <div style="margin-top:20px">
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">ລຳດັບ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">ລະຫັດສິນຄ້າ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">ລາຍລະອຽດ</td>
                            <!-- <td style="border: 0.5px solid #999;padding:5px;font-size:12pt">ລາຄາ</td> -->
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">
                                <div style="display:flex;justify-content:end">ລາຄາລວມ</div>
                            </td>
                        </tr>
                        <tr style="padding:5px;font-size:12pt;border: 0.5px solid #999;"
                            v-for="(d, i) in data_for_print_bill" :key="i">
                            <td
                                style="padding:5px;font-size:12pt;display:flex;justify-content:center;width:100%;align-items:center">
                                {{
                                    i + 1 }}</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px"> {{ d?.proId }} </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">{{ d?.proName_type }}</td>

                            <!-- <td style="border: 0.5px solid #999;padding:5px;font-size:12pt">{{
                                d?.proTotal?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{ d?.currency }}</td> -->
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">
                                <div style="display:flex;justify-content:end">{{
                                    d?.amountTotalS?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{ d?.currency }}</div>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:5px;font-size:12px" colspan="3">
                                <div style="display:flex;justify-content:end">ລາຄາລວມທັງໝົດ:</div>
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">
                                <div style="display:flex;justify-content:end">
                                    {{ data_for_print_footer?.totalAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }} {{ data_for_print_bill[0]?.currency }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style=";padding:5px;font-size:12px" colspan="3">
                                <div style="display:flex;justify-content:end">ຈຳນວນທີ່ຊຳລະແລ້ວ:</div>
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">
                                <div style="display:flex;justify-content:end"> {{
                                    data_for_print_footer?.sumPayamount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }} {{ data_for_print_bill[0]?.currency }}</div>

                            </td>
                        </tr>
                        <tr>
                            <td style="padding:5px;font-size:12px" colspan="3">
                                <div style="display:flex;justify-content:end">ຈຳນວນທີ່ຄ້າງຊຳລະ:</div>
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12px">
                                <div style="display:flex;justify-content:end">
                                    {{ data_for_print_footer?.sumNoPayAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }} {{ data_for_print_bill[0]?.currency }}</div>

                            </td>
                        </tr>
                        <!-- <tr>
                            <td style="padding:5px;font-size:12pt" colspan="3">
                                <div style="display:flex;justify-content:end">ຈຳນວນທີ່ຊຳລະ:</div>
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-size:12pt">
                                <div style="display:flex;justify-content:end">{{
                                    data_for_print_footer?.totalCashAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }} {{ data_for_print_bill[0]?.currency }}</div>
                            </td>
                        </tr> -->
                    </table>
                </div>
                <div style="margin-top: 10px; font-size: 12px;">
                    ປະເພດການຈ່າຍ : {{ typePayment }}
                </div>
                <div style="margin-top: 10px; font-size: 12px;">
                    ເລກອ້າງອີງ : {{ trf_ref }}
                </div>
                <div> <span> </span></div>
                <div style="margin-top: 10px; font-size: 12px;">
                    ໝາຍເຫດ:
                </div>
                <div style="font-size:12pt">
                    <span style="font-size:12px">ກຳນົດຊຳລະ : {{ data_for_print_header?.nextDatePay }}</span>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px">
                    <div style="width:100%;display:flex;flex-direction:column;justify-content:start;align-items:center">
                        <div style="font-size:12px">ບັນຊີຄັງເງິນ</div>

                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            ...........................................
                        </div>
                        <div style="margin-top:30px;font-size:12px">
                            ວັນທີ:......................................
                        </div>
                    </div>
                    <div style="width:100%;display:flex;flex-direction:column;justify-content:end;align-items:center">
                        <div style="font-size:12px">ທ່ານປະທານບໍລິສັດຄູນຄຳ</div>
                        <div style="display:flex;justify-content:space-between;margin-top:20px">
                            ............................................
                        </div>
                        <div style="margin-top:30px;font-size:12px">
                            ວັນທີ:........................................
                        </div>
                    </div>
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
            nextDatePayy: false,
            nextDatePay: null,
            showBillList: false,
            valid: true,
            valid1: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            loading_processing: false,
            invoice_id: '',
            payBill: '',
            cash: true,
            transfer: false,
            payment_list: [],

            bank_list: [],
            sum: [],
            amount: '',
            trf_ref: '',
            data_for_payment: [],
            check_payment: [],
            billNoAuto: '',
            billDateAuto: '',
            invoice_print: '',
            typePayment: 'ເງິນສົດ',
            bankNamePayment: '',
            data_for_print_bill: [],
            data_for_print_footer: '',
            data_for_print_header: {},
            showSnakbar: false,
            totalDebt: '',
            invoice_list: [],
            invoice_headers: [
                { text: 'ເລືອກ', value: '' },
                { text: 'ເລກບິນ', value: 'inVoiceID' },
                { text: 'ລະຫັດລູກຄ້າ', value: 'cusID' },
                { text: 'ຊື່ລູກຄ້າ', value: 'cusName' },
                { text: 'ຈຳນວນທັງໝົດ', value: 'row_Total' },
                { text: 'ລວມລາຄາ/ອັນ', value: 'price' },
                { text: 'ລວມລາຄາທັງໝົດ', value: 'priceUnit' },
                { text: 'ສະຖານະ', value: 'inVoiceStatus' },
                { text: '', value: '' },
            ],
            search: '',
            report_invoice_list: [],
            report_invoice_headers: [

                { text: 'ເລກທີຊຳລະ', value: 'inVoiceID' },
                { text: 'ເລກບິນ', value: 'inVoiceID' },
                { text: 'ລະຫັດລູກຄ້າ', value: 'cusID' },
                { text: 'ຊື່ລູກຄ້າ', value: 'cusName' },
                { text: 'ຈຳນວນຄ້າງຊຳລະ', value: 'priceUnit' },
                { text: 'ສະຖານະ', value: 'inVoiceStatus' },
                { text: 'ເລືອກ', value: '' },
            ],
        }
    },
    mounted() {
        this.onGetBank()
        this.onGetInvoiceList()
        // this.onGetBillNoAuto()

    },
    watch: {
        amount: function (newValue) {
            const result = newValue?.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            this.amount = result;
        },
    },
    methods: {
        onChoose(key) {
            console.log(key)
            this.showBillList = false
            this.invoice_id = key;
            this.onGetDataForPayment()
        },
        async onGetInvoiceList() {
            try {
                await this.$axios.$post('/v_popupPay.service').then((data) => {
                    this.report_invoice_list = data?.data
                })
            } catch (error) {
                console.log(error)
            }
        },
        onCashChange(type) {
            this.cash = true;
            this.transfer = false;
            this.typePayment = type;
            this.bankNamePayment = '';
            this.trf_ref = ''
        },
        onTransferChange(type) {
            this.cash = false;
            this.transfer = true;
            this.typePayment = type
        },
        async onGetBank() {
            try {
                await this.$axios.$post('/getListBank.service').then((data) => {
                    this.bank_list = data?.data;
                    this.onGetInvoiceList()
                })
            } catch (error) {
                console.log(error)
            }
        },
        async onGetDataForPayment() {
            this.loading_processing = true
            let data = {
                billNo: this.invoice_id
            }
            try {
                await this.$axios.$post('/viewPintBillBackByNo.service', data).then((data) => {
                    this.data_for_payment = data?.data[0];
                    this.invoice_print = data?.headerPrint[0]?.invoice_ID
                    this.check_payment = data?.data;
                    this.sum = data?.sumTotal[0]
                    this.loading_processing = false
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
        onGetDataForPrintBill(key) {
            try {
                let data = {
                    billNo: key
                    // billNo: 'VOICE-10024'
                }
                this.$axios.$post('/listBillPaymentByNoBlack.service', data).then((data) => {
                    this.data_for_print_bill = data?.details
                    this.data_for_print_footer = data?.footer[0]
                    this.data_for_print_header = data?.header[0]
                    setTimeout(() => {
                        this.onGetBillNoAuto()
                        this.onGetInvoiceList()
                        this.invoice_id = ''
                        this.check_payment = []
                        this.amount = ''
                        this.bankNamePayment = ''
                        this.trf_ref = ''
                        this.sum = []
                        this.loading_processing = false
                        this.print()
                    }, 1000);
                })
            } catch (error) {
                this.loading_processing = false
                console.log(error)
            }
        },
        onCheckMoneyPayment() {
            // this.print()
            // return
            const debt = parseFloat(this.sum?.sumNoPayAmount?.split(',').join('')) - parseFloat(this.amount?.split(',').join(''))
            this.totalDebt = debt
            if (this.cash === true) {
                if (!this.$refs.form.validate()) {
                    return null;
                }
            }
            if (this.transfer === true) {
                if (!this.$refs.form1.validate()) {
                    return null;
                }
            }
            if (parseFloat(this.amount?.split(',').join('')) > parseFloat(this.sum?.sumNoPayAmount?.split(',').join(''))) {
                swal.fire({
                    icon: 'warning',
                    text: 'ຈຳນວນເງິນທີ່ຊຳລະຫຼາຍກວ່າເງິນຕົວຈິງ'
                })
                return
            }
            if (parseFloat(this.sum?.sumNoPayAmount?.split(',').join('')) > parseFloat(this.amount?.split(',').join(''))) {
                swal.fire({
                    icon: 'question',
                    text: `ເງິນທີ່ຊຳລະໜ້ອຍກວ່າເງິນຕົວຈີງ. ທ່ານຕ້ອງການຕິດໜີ້ບໍ ? ເງິນທີ່ຕິດໜີ້: ${debt?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ຕົກລົງ',
                    cancelButtonText: 'ຍົກເລີກ'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.onSavePayment()
                    }
                })
            } else {
                swal.fire({
                    icon: 'question',
                    text: `ທ່ານຕ້ອງການຊຳລະແທ້ບໍ ?`,
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ຕົກລົງ',
                    cancelButtonText: 'ຍົກເລີກ'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.onSavePayment()
                    }
                })
            }
        },
        async onSavePayment() {
            this.loading_processing = true
            try {
                let data = {
                    billNo: this.data_for_payment?.billNo,
                    invoiceNo: this.data_for_payment?.inVoiceID,
                    paymentType: this.typePayment,
                    bankName: this.bankNamePayment,
                    refNo: this.trf_ref,
                    amount: this.sum?.sumNoPayAmount,
                    payAmount: this.amount,
                    status: this.totalDebt == 0 ? 'N' : 'O',
                    noPayAmount: this.totalDebt,
                    allPayAmountAll: this.sum?.sumPayamount,
                    nextDatePay: this.nextDatePay
                }
                this.$axios.$post('/storePayOwe.service', data).then((data) => {
                    this.onGetInvoiceList()
                    this.onGetDataForPrintBill(this.data_for_payment?.inVoiceID)
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },
        onGetBillNoAuto() {
            try {
                this.$axios.$post('/getBillNoForPay.service').then((data) => {
                    this.billNoAuto = data?.data[0]?.billNo;
                    this.billDateAuto = data?.data[0]?.payDate;
                })
            } catch (error) {
                console.log(error)
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
}</style>
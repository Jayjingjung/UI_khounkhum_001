<template>
  <div>
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-card class="card-shadow mb-6" rounded="lg">
      <!-- <div style="background-color:#568fb3;color:white" class="py-2 pl-4"></div> -->
      <v-card-title style="background-color:#E57373;color:white">ລາຍງານລາຍຮັບ</v-card-title>
      <v-card-text>
        <div class="d-flex align-center pt-4" style="width:100%">

          <div class="d-flex align-center">
            <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false" :return-value.sync="start_date"
              transition="scale-transition" offset-y min-width="auto">
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
                <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ" append-icon="mdi-calendar"
                  readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </div>
          <div style="margin-top:-25px" class="ml-2">
            <v-btn color="#90A4AE" height="40" class="white--text" elevation="0"
              @click="onGetIncomeAll"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="card-shadow" @click="print"><v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ</v-btn>
        </div>
        <v-divider></v-divider>
        <div style="display:flex;justify-content:space-between;width:100%" class="pt-4">
          <div style="width:100%" class="pr-2">
            <div class="pb-4 font-weight-bold">ລາຍຮັບເງິນສົດ</div>
            <table style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%">
              <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class=" font-weight-bold text-center">
                  ລ/ດ</td>
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class=" font-weight-bold">
                  ລະຫັດບິນ</td>
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class=" font-weight-bold">
                  ຊື່ລູກຄ້າ</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ວັນທີຊຳລະ</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ຈຳນວນເງິນ</td>


              </tr>
              <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                v-for="(item, i) in report_income_cash_list" :key="i">
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class="  text-center">
                  {{ i + 1 }}</td>

                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                  {{ item?.billNo }}</td>
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                  {{ item?.cusName }}</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" ">{{ item?.payDate }}</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" green--text">{{ item?.payAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                    item?.currency }}</td>


              </tr>
              <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">


                <td colspan="4"
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class="font-weight-bold">
                  <div style="width:100%;display:flex;justify-content:space-between">
                    <span>ລວມທັງໝົດ: <span class="green--text">{{ cash_total?.totalAmountPerTXNKIP }} LAK</span></span>
                    <span class="green--text">{{ cash_total?.totalAmountPerTXNUSD }} USD</span>
                    <span class="green--text">{{ cash_total?.totalAmountPerTXNTHB }} THB</span>
                    <span class="green--text">{{ cash_total?.totalAmountPerCNY }} CNY</span>
                  </div>
                </td>

              </tr>
            </table>
          </div>
          <div style="width:100%" class="pl-2">
            <div class="pb-4 font-weight-bold">ລາຍຮັບເງິນໂອນ</div>
            <table style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%">
              <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class=" font-weight-bold text-center">
                  ລ/ດ</td>
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class=" font-weight-bold">
                  ລະຫັດບິນ</td>
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class=" font-weight-bold">
                  ຊື່ລູກຄ້າ</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ວັນທີຊຳລະ</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ທະນະຄານ</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ເລກອ້າງອີງ</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ຈຳນວນເງິນ</td>


              </tr>
              <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                v-for="(item, i) in report_income_txn_list" :key="i">
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                  class="  text-center">
                  {{ i + 1 }}</td>

                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                  {{ item?.billNo }}</td>
                <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                  {{ item?.cusName }}</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" ">{{ item?.payDate }}</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" ">{{ item?.bankName }}</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" ">{{ item?.refNo }}</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" green--text">{{ item?.payAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                    item?.currency }}</td>


              </tr>
              <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">


                <td colspan="6"
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class="font-weight-bold">
                  <div style="width:100%;display:flex;justify-content:space-between">
                    <span>ລວມທັງໝົດ: <span class="green--text">{{ transfer_total?.totalAmountPerTXNKIP }}
                        LAK</span></span>
                    <span class="green--text">{{ transfer_total?.totalAmountPerTXNUSD }} USD</span>
                    <span class="green--text">{{ transfer_total?.totalAmountPerTXNTHB }} THB</span>
                    <span class="green--text">{{ transfer_total?.totalAmountPerCNY }} CNY</span>
                  </div>
                </td>

              </tr>
            </table>
          </div>
        </div>
        <v-divider class="mt-4"></v-divider>
        <div style="width:100%;display:flex;justify-content:space-between;border-radius:5px" class=" py-4 px-4 mt-2">
          <span style="font-size:14pt">ລວມທັງໝົດ: <span class="green--text" style="font-size:14pt">{{
            sumTotalPrice?.totalAmountAllLAK }} LAK</span></span>
          <span class="green--text" style="font-size:14pt">{{ sumTotalPrice?.totalAmountAllUSD }} USD</span>
          <span class="green--text" style="font-size:14pt">{{ sumTotalPrice?.totalAmountAllTHB }} THB</span>
          <span class="green--text" style="font-size:14pt">{{ sumTotalPrice?.totalAmountAllCNY }} CNY</span>
        </div>
        <!-- <div style="border-radius:5px;display:flex;justify-content:start" class="d-flex align-center py-4 pl-2">
          <h2>ລວມລາຍຮັບທັງໝົດ: <span class="green--text">{{ sumTotalPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
            ',') }}</span></h2>
        </div> -->
        <!-- <v-divider></v-divider> -->

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
          style="display:flex;justify-content:center;font-size:12pt;padding-bottom: 30px;font-weight: bold;">ລາຍງານລາຍຮັບ
        </div>
        <div style="width:100%" class="pr-2">
          <div v-if="start_date != null" style="display:flex;justify-content: end;">ແຕ່ວັນທີ: {{ start_date }} - {{
            end_date
          }}</div>
          <div>ລາຍຮັບເງິນສົດ</div>
          <table style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%">
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold text-center">
                ລ/ດ</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold">
                ລະຫັດບິນ</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold">
                ຊື່ລູກຄ້າ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ວັນທີຊຳລະ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ຈຳນວນເງິນ</td>


            </tr>
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
              v-for="(item, i) in report_income_cash_list" :key="i">
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class="  text-center">
                {{ i + 1 }}</td>

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                {{ item?.billNo }}</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                {{ item?.cusName }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" ">{{  moment(item?.payDate ).format('DD/MM/YYYY')}}</td>

              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" green--text">{{ item?.payAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                  item?.currency }}</td>


            </tr>
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">


              <td colspan="4"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class="font-weight-bold">
                <div style="width:100%;display:flex;justify-content:space-between">
                  <span>ລວມທັງໝົດ: <span class="green--text">{{ cash_total?.totalAmountPerTXNKIP }} LAK</span></span>
                  <span class="green--text">{{ cash_total?.totalAmountPerTXNUSD }} USD</span>
                  <span class="green--text">{{ cash_total?.totalAmountPerTXNTHB }} THB</span>
                  <span class="green--text">{{ cash_total?.totalAmountPerCNY }} CNY</span>
                </div>
              </td>

            </tr>
          </table>
        </div>
        <div style="width:100%" class="pl-2">
          <div class="pb-4 font-weight-bold" style="padding-top:30px">ລາຍຮັບເງິນໂອນ</div>
          <table style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%">
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold text-center">
                ລ/ດ</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold">
                ລະຫັດບິນ</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold">
                ຊື່ລູກຄ້າ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ວັນທີຊຳລະ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ທະນະຄານ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ເລກອ້າງອີງ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ຈຳນວນເງິນ</td>


            </tr>
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
              v-for="(item, i) in report_income_txn_list" :key="i">
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class="  text-center">
                {{ i + 1 }}</td>

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                {{ item?.billNo }}</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000" class=" ">
                {{ item?.cusName }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" ">{{ moment(item?.payDate ).format('DD/MM/YYYY')}}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" ">{{ item?.bankName }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" ">{{ item?.refNo }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" green--text">{{ item?.payAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{
                  item?.currency }}</td>


            </tr>
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">


              <td colspan="6"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class="font-weight-bold">
                <div style="width:100%;display:flex;justify-content:space-between">
                  <span>ລວມທັງໝົດ: <span class="green--text">{{ transfer_total?.totalAmountPerTXNKIP }}
                      LAK</span></span>
                  <span class="green--text">{{ transfer_total?.totalAmountPerTXNUSD }} USD</span>
                  <span class="green--text">{{ transfer_total?.totalAmountPerTXNTHB }} THB</span>
                  <span class="green--text">{{ transfer_total?.totalAmountPerCNY }} CNY</span>
                </div>
              </td>

            </tr>
          </table>
        </div>
        <div style="height: 30px;"></div>
        <span>ລວມທັງເງິນໂອນ-ສົດທັງໝົດ:</span>
        <div style="width:100%;display:flex;justify-content:space-between;border-radius:5px" class=" py-4 px-4 mt-2">
          <span style="font-size:14pt"> <span class="green--text" style="font-size:14pt">{{
            sumTotalPrice?.totalAmountAllLAK }} LAK</span></span>
          <span class="green--text" style="font-size:14pt">{{ sumTotalPrice?.totalAmountAllUSD }} USD</span>
          <span class="green--text" style="font-size:14pt">{{ sumTotalPrice?.totalAmountAllTHB }} THB</span>
          <span class="green--text" style="font-size:14pt">{{ sumTotalPrice?.totalAmountAllCNY }} CNY</span>
        </div>
        <div style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px">

          <div style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
            <div>ຜູ້ສະຫຼຸບ</div>
            <div style="height: 50px;"></div>
            <div style="display:flex;justify-content:space-between">
              ......................................


            </div>
          </div>
          <div
            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px">
            <div>ບັນຊີຂົນສົ່ງ</div>
            <div style="height: 50px;"></div>
            <div style="display:flex;justify-content:space-between">
              .....................................


            </div>
          </div>
          <div
            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px;padding-right:20px">
            <div>ບັນຊີຄັງເງິນ</div>
            <div style="height: 50px;"></div>
            <div style="display:flex;justify-content:space-between">
              .....................................


            </div>
          </div>
          <div style="width:1000px;display:flex;flex-direction:column;justify-content:center;align-items:center">
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
      loading_processing: false,
      end_menu: false,
      end_date: null,
      start_menu: false,
      start_date: null,
      report_income_txn_list: [],
      report_income_cash_list: [],
      total_by_cash: '',
      total_by_txn: '',
      sumTotalPrice: '',
      cash_total: [],
      transfer_total: []
    }
  },
  mounted() {
    this.onGetIncomeAll()
  },
  // watch: {
  //   report_expense_list: function () {
  //     const sum = this.report_expense_list?.reduce((a, o) => {
  //       return parseFloat(a) + parseFloat(o?.toTal?.split(',')?.join(''))
  //     }, 0)
  //     this.sumTotalPrice = sum

  //   },
  // },
  methods: {
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
    // onGetExpenseBySearch() {
    //   try {
    //     this.loading_processing = true;
    //     let data = {
    //       startDate: this.start_date,
    //       endDate: this.end_date
    //     }
    //     this.$axios.$post('/listTxnReportLaiHup.service', data).then((data) => {
    //       this.report_income_cash_list = data?.header[1]?.payByCash
    //       this.report_income_txn_list = data?.header[0]?.payByCash
    //       this.total_by_cash = data?.header[1]?.totalAmountPerTXN
    //       this.total_by_txn = data?.header[0]?.totalAmountPerTXN
    //       // this.sumTotalPrice = data?.totalAmountAll
    //       this.loading_processing = false
    //     })
    //   } catch (error) {
    //     this.loading_processing = false
    //     swal.fire({
    //       icon: 'error',
    //       text: error
    //     })
    //     console.log(error)
    //   }
    // },
    onGetIncomeAll() {
      try {

        this.loading_processing = true;
        let data = {
          startDate: this.start_date,
          toKen: localStorage.getItem("toKen"),

          endDate: this.end_date
        }
        this.$axios.$post('/listTxnReportLaiHupAll.service', data).then((data) => {
          // this.report_expense_list = data?.data
          this.loading_processing = false
          this.report_income_cash_list = data?.headerCash[0]?.payByCash
          this.cash_total = data?.headerCash[0]
          this.transfer_total = data?.headerFT[0]
          this.report_income_txn_list = data?.headerFT[0]?.payByFT
          this.total_by_cash = data?.headerCash[0]?.totalAmountPerTXN
          this.total_by_txn = data?.headerFT[0]?.totalAmountPerTXN
          this.sumTotalPrice = data
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
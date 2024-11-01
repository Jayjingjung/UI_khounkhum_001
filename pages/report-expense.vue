<template>
  <div>
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-card class="card-shadow" rounded="lg">
      <v-card-title style="background-color:#E57373" class="white--text">ລາຍງານຮັບ - ລາຍຈ່າຍ ອື່ນໆ</v-card-title>
      <v-card-text>
        <div class="d-flex align-center pt-4" style="width:100%">

          <div class="d-flex align-center">
            <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false" :return-value.sync="startDate"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field dense outlined :value="formattedStartDate" required label="ວັນທີເລີ່ມຕົ້ນ"
                  append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="startDate" no-title scrollable @input="$refs.start_menu.save(startDate)">
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="d-flex align-center pl-2">
            <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false" :return-value.sync="endDate"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field dense outlined :value="formattedEndDate" required label="ວັນທີສຸດທ້າຍ"
                  append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="endDate" no-title scrollable @input="$refs.end_menu.save(endDate)">
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </div>



          <div style="margin-top:-25px" class="ml-2">
            <v-btn color="deep-purple" class="white--text" elevation="0"
              @click="onGetAll"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
          </div>
          <!-- ເພີ່ມລາຍຈ່າຍ -->
          <div style="margin-top:-25px;width: auto;" class="ml-2">
            <v-btn to="/create-expense" color="#159fc7" class="white--text"
              elevation="0"><v-icon>mdi-cash-plus</v-icon>ເພີ່ມລາຍຮັບ - ລາຍຈ່າຍ</v-btn>
          </div>
          <!-- ເພີ່ມປະເພດລາຍຈ່າຍ -->
          <div style="margin-top:-25px ;width: auto;" class="ml-2">
            <v-btn to="/create-expense-type" color="#c72746" class="white--text"
              elevation="0"><v-icon>mdi-wallet-plus</v-icon>ເພີ່ມປະເພດຮັບ - ລາຍຈ່າຍ</v-btn>
          </div>

          <div style="margin-top:-25px" class="ml-2">
            <v-btn color="#f593b3" class="white--text"
              @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
          </div>
        </div>
        <div style="width:100%; display:flex; justify-content:start" class="ml-5">
          <div style="width: 20%;">

            <v-radio-group v-model="status" column>

              <v-radio label="ລາຍຈ່າຍ" color="red darken-3" value="PAY"></v-radio>

              <v-radio label="ລາຍຮັບ" color="success" value="INCOME"></v-radio>

              <v-radio label="ທັງໝົດ" color="primary" value="0"></v-radio>


            </v-radio-group>
          </div>

          <div>
            <div style="width:100%;display:flex;justify-content:center;margin-top: 20px;" class="pt-4">

              <div style="width: 400px;">
                <v-row>
                  <v-btn v-for="month in 12" :key="month" @click="setMonth(month)">{{ month }}</v-btn>
                </v-row>
              </div>
              <div style="width: 400px;">
                <v-row>
                  <v-btn v-for="year in availableYears" :key="year" @click="setYear(year)">{{ year
                    }}</v-btn>
                </v-row>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%">
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold text-center">
                ລ/ດ</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold">
                ຊື່ປະພດລາຍຮັບ - ລາຍຈ່າຍ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ປະເພດ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ວັນທີບັນທຶກ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ວັນທີໄດ້ລາຍຮັບຫຼືຈ່າຍອອກ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ຈຳນວນ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ລາຄາ/ອັນ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ເປັນເງິນລວມ</td>
            </tr>
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
              :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }"
              v-for="(item, i) in report_expense_list" :key="i">
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class="  text-center">
                {{ i + 1 }}</td>

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.exPType }}</td>
              <!-- ສະຖານະ -->
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.status === 'INCOME' ? 'ລາຍຮັບ' : (item?.status === 'PAY' ? 'ລາຍຈ່າຍ' : item?.status) }}
              </td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">{{
                  moment(item?.cdate).format('DD/MM/YYYY') }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">{{
                  moment(item?.expDate).format('DD/MM/YYYY') }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.perAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} LAK</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.toTal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} LAK</td>
            </tr>
            <!-- sum ລາຍຮັບ -->
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
              <td colspan="7"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:14pt"
                class="font-weight-bold text-right">
                ລວມລາຍຮັບທັງໝົດ:
              </td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:16pt"
                class="font-weight-bold green--text">
                {{ totalIncome?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} LAK
              </td>
            </tr>
            <!-- sum ລາຍຈ່າຍ -->
            <tr>
              <td colspan="7"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:14pt"
                class="font-weight-bold text-right">
                ລວມລາຍຈ່າຍທັງໝົດ:
              </td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:16pt"
                class="font-weight-bold red--text">
                {{ totalPay?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} LAK
              </td>
            </tr>
            <!-- sum ກຳໄລ -->
            <tr>
              <td colspan="7"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:14pt"
                class="font-weight-bold text-right">
                ກຳໄລ:
              </td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:16pt"
                class="font-weight-bold primary--text">
                {{ totalIncome_PayAll?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} LAK
              </td>
            </tr>
          </table>
        </div>
      </v-card-text>
    </v-card>
    <div style="display:none">
      <div id="modalInvoice">
        <Noti />


<v-row
    style="font-size:14px;margin-left: 50px;margin-top: 10px;display:flex;justify-content:start;flex-direction:column;align-items:start">


    <div>
        <span>ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,</span>
        <span> ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
        <span>ໂທລະສັບ: 020 92661111, 020 92 254 999 </span>
        <span> ອີເມວ: kounkham@Mining|ເວັບໄຊ: kounkham</span>
    </div>

</v-row>
        <br>
        <div class="text-center" style="display:flex;justify-content:center;font-size:22px;font-weight:bold">
          ລາຍງານ ລາຍຮັບເເລະລາຍຈ່າຍນອກ</div>
         <div style="padding-top:20px;padding-bottom: 10px;">
          ທັງໝົດ: {{ report_leave_car_list?.length }} ລາຍການ <span v-if="startDate !== null">ແຕ່ວັນທີ:
            {{ startDate }} ຫາ {{ endDate }}</span>
        </div>
        <div>
          <table style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%">
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:2px"
                class=" font-weight-bold text-center mr-2 ml-2">
                ລ/ດ</td>
              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                class=" font-weight-bold">
                ຊື່ປະພດລາຍຮັບ - ລາຍຈ່າຍ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ປະເພດ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ວັນທີບັນທຶກ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ວັນທີໄດ້ລາຍຮັບຫຼືຈ່າຍອອກ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ຈຳນວນ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ລາຄາ/ອັນ</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class=" font-weight-bold">ເປັນເງິນລວມ</td>
            </tr>
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
              :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }"
              v-for="(item, i) in report_expense_list" :key="i">
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:2px"
                class="  text-center mr-2 ml-2">
                {{ i + 1 }}</td>

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.exPType }}</td>
              <!-- ສະຖານະ -->

              <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.status === 'INCOME' ? 'ລາຍຮັບ' : (item?.status === 'PAY' ? 'ລາຍຈ່າຍ' : item?.status) }}
              </td>


              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">{{
                  moment(item?.cdate).format('DD/MM/YYYY') }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">{{
                  moment(item?.expDate).format('DD/MM/YYYY') }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.perAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} LAK</td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                :class="{ 'green--text': item?.status === 'INCOME', 'red--text': item?.status === 'PAY' }">
                {{ item?.toTal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} LAK</td>
            </tr>
            <!-- sum ລາຍຮັບ -->
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
              <td colspan="7"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:14pt"
                class="font-weight-bold text-right">
                ລວມລາຍຮັບທັງໝົດ:
              </td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:16pt"
                class="font-weight-bold green--text">
                {{ totalIncome }} LAK
              </td>
            </tr>
            <!-- sum ລາຍຈ່າຍ -->
            <tr>
              <td colspan="7"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:14pt"
                class="font-weight-bold text-right">
                ລວມລາຍຈ່າຍທັງໝົດ:
              </td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:16pt"
                class="font-weight-bold red--text">
                {{ totalPay }} LAK
              </td>
            </tr>
            <!-- sum ກຳໄລ -->
            <tr>
              <td colspan="7"
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:14pt"
                class="font-weight-bold text-right">
                ກຳໄລ:
              </td>
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;font-size:16pt"
                class="font-weight-bold primary--text">
                {{ totalIncome_PayAll }} LAK
              </td>
            </tr>
          </table>

          <div
            style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
            <div>ບັນຊີຂົນສົ່ງ</div>
            <div style="height: 50px;"></div>
            <div style="display:flex;justify-content:space-between">
              ...............................


            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2';
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      moment,
      loading_processing: false,
      end_menu: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startDateMenu: false,
      endDateMenu: false,
      item_id: null,
      loading_processing: false,
      availableYears: this.getYearsArray(),
      endDate: null,
      status: '0',
      start_menu: false,
      startDate: null,
      report_expense_list: [],
      report_expense_header: [
        { text: 'ລ/ດ', value: '' },
        { text: 'ຊື່ປະເພດລາຍຮັບ-ລາຍຈ່າຍ', value: 'exPType' },
        { text: 'ປະເພດ', value: 'status' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ/ອັນ', value: 'perAmount' },
        { text: 'ລາຄາລວມ', value: 'toTal' },
        { text: 'ວັນທີ', value: 'cdate' },
      ],
    }
  },

  computed: {
    formattedStartDate() {
      if (!this.startDate) return ''; // Return empty string if date is not set
      const dateObj = new Date(this.startDate);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formattedEndDate() {
      if (!this.endDate) return ''; // Return empty string if date is not set
      const dateObj = new Date(this.endDate);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formattedStartDate() {
      return this.formatDate(this.startDate);
    },
    formattedEndDate() {
      return this.formatDate(this.endDate);
    },
    ...mapGetters({
      truck_data_list: "truck_data_list",
      report_reportStockDayWeek: "report_reportStockDayWeek",
      report_reportStockDayWeek_item: "report_reportStockDayWeek_item",
      sumFooter: "sumFooter"
    }),
  },


  mounted() {
    this.onGetAll()
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    ...mapActions({
      reportStockDayWeek: "reportStockDayWeek",
      clearItemList: "clearItemList",
    }),
    setMonth(month) {
      // Update the startDate and endDate based on the selected month
      const currentYear = new Date().getFullYear();
      const start = new Date(currentYear, month - 1, 1);
      const end = new Date(currentYear, month, 0);
      this.startDate = start.toISOString().substr(0, 10);
      this.endDate = end.toISOString().substr(0, 10);
    },
    setYear(year) {
      // Update the startDate and endDate based on the selected year
      this.startDate = `${year}-01-01`;
      this.endDate = `${year}-12-31`;
    },
    getYearsArray() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear; i >= currentYear - 10; i--) {
        years.push(i);
      }
      return years;
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
    onGetAll() {
      try {
        let data = {
          startDate: this.startDate,
          endDate: this.endDate,
          status: this.status,
          toKen: localStorage.getItem("toKen")

        }
        this.loading_processing = true;
        this.$axios.$post('/getExpensesAll.service', data).then((data) => {
          this.report_expense_list = data?.data
          this.totalPay = data?.totalPay
          this.totalIncome = data?.totalIncome
          this.totalIncome_PayAll = data?.totalIncome_PayAll
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
    },
    // onGetExpenseBySearch() {
    //   try {

    //     let data = {
    //       startDate: this.startDate,
    //       endDate: this.endDate,
    //       status: this.status,
    //       toKen: localStorage.getItem("toKen")
    //     }
    //     this.loading_processing = true;
    //     this.$axios.$post('/getExpenses.service', data).then((data) => {

    //       this.report_expense_list = data?.data
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
    // }
  }
}
</script>

<style>
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
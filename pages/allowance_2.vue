<template>
  <div>


    <v-card style="width: 400px;" class="mt-10 mb-10 mr-10 ml-10">
      <div class="text-center">
        <p style="font-size: 20px;">5 ອັນດັບ ພະນັກງານຂັບລົດ ທີໄດ້ຖ້ຽວຫຼາຍ</p>
        <table class="text-center">
          <thead>
            <tr>
              <th>ລຳດັບ</th>
              <th style="width: 100px;">ຊື່ພະນັກງານ</th>
              <th style="width: 100px;">ນາມສະກຸນ</th>
              <th>ຈຳນວນເງິນ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in top5all" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td style="width: 100px;" class="text-center">{{ item.staffName }}</td>
              <td style="width: 100px;" class="text-center">{{ item.staffSurname }}</td>
              <td style="color: green; font-size: 18px;" class="text-center">{{ item.allTiew }}</td>
              <!-- Green text color and font size 18px -->
            </tr>
          </tbody>
        </table>
      </div>
    </v-card>

    <v-btn ref="btn1" value="1" @click="selectedCard = '1'" @mouseover="changeColor('	#009fff', $refs.btn1)"
      @mouseleave="changeColor('white', $refs.btn1)"
      style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);">
      <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-cash</v-icon>
      ເບ້ຍລ້ຽງ
    </v-btn>
    <v-btn ref="btn2" value="2" @click="selectedCard = '2'" @mouseover="changeColor('	#009fff', $refs.btn2)"
      @mouseleave="changeColor('white', $refs.btn2)"
      style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);">
      <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-screwdriver</v-icon>
      ອາໄລ
    </v-btn>
    <!-- <v-btn ref="btn3" value="3" @click="selectedCard = '3'" @mouseover="changeColor('	#009fff', $refs.btn3)"
      @mouseleave="changeColor('white', $refs.btn3)"
      style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);">
      <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-gas-station
        mdi:gas-station</v-icon>

      ນໍ້າມັນ
    </v-btn> -->
    <div v-if="selectedCard === '1'">
      <v-card class="card-shadow  mb-5" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
        <v-card-title style="background-color: #b722b7" class="white--text">
          ເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາ
        </v-card-title>
        <div class="ml-5 mt-10" style="display: flex; justify-content: flex-start;">
          <div v-if="sumFooter">
            <div style="display: flex; justify-content: flex-start;">
              <p>ລວມຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະທັງໝົດ: </p>
              <p style="font-size: 24px; margin-top: -8px;" class="text-red">{{ sumFooter.alltotalBialiengKangjaiy }}
              </p>
            </div>
          </div>
          <!-- Start Date Picker -->
          <div class="mr-5 ml-10" style="width: auto;">
            <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field v-model="formattedStartDate" label="ວັນ​ທີ່​ເລີ່ມ" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="startDate" no-title scrollable @input="updateStartDate"></v-date-picker>
            </v-menu>
          </div>
          <!-- End Date Picker -->
          <div class="mr-5 ml-5" style="width: auto;">
            <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40"
              transition="scale-transition" offset-y>
              <template v-slot:activator="{ on }">
                <v-text-field v-model="formattedEndDate" label="ວັນທີສິ້ນສຸດ" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="endDate" no-title scrollable @input="updateEndDate"></v-date-picker>
            </v-menu>
          </div>
          <div class="ml-2 pt-1 mr-5">
            <v-btn color="#90A4AE" background-color="#f5f5f5" class="white--text" elevation="0"
              @click="fetchReportFuel(); ontop5()">
              <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
            </v-btn>
          </div>

          <div class="ml-10 pt-1">
            <v-text-field v-model="search" label="Search" outlined dense></v-text-field>
          </div>
          <div style="margin-top:5px" class="ml-10">
            <v-btn color="#e91e63" class="white--text"
              @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
          </div>
        </div>
        <!-- Data Table -->

        <v-data-table v-if="dataLoaded" :headers="headers" :items="filteredGasReports" :items-per-page="10"
          class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>ລາຍລະອຽດຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-toolbar-title class="text-center">ເລືອກ​ທັງ​ຫມົດ
                <!-- Select All checkbox -->
                <v-checkbox v-model="selectAllCheckbox" @change="selectAll"
                  :indeterminate="selectAllIndeterminate"></v-checkbox>
              </v-toolbar-title>
            </v-toolbar>
          </template>

          <!-- Custom Cell Content - Circle Selection -->
          <template v-slot:item.circle="{ item }">
            <td v-if="item.status_fuel !== 'P'">
              <!-- Use a checkbox for circle selection -->
              <v-checkbox v-model="selectedItems" :value="item"></v-checkbox>
            </td>
          </template>
          <!-- Custom Cell Content -->
          <template v-slot:item.sen="{ item }">
            <td>
              <!-- Conditionally render the button based on status -->
              <v-btn v-if="item.status_fuel !== 'P'" @click="updateStatusFuelStation(item)" color="success">Send</v-btn>
            </td>
          </template>
          <!-- /Status Column -->


        </v-data-table>
        <!-- Data Table -->
        <!-- Data Table printer -->
        <div style="display:none">
          <div id="modalInvoice">
            <v-row>

              <Noti />
            </v-row>
            <br>



            <table class="table">
              <thead>
                <tr>
                  <th>ລ/ດ</th>
                  <th>ID</th>
                  <th>ຊື່</th>
                  <th>ຫົວລາກ</th>
                  <th>ຫາງລາກ</th>
                  <th>ສະຖານທີຮັບ</th>
                  <th>ສະຖານທີສົ່ງ</th>
                  <th>ຄ່າເບ້ຍລ້ຽງທີ່ຊໍາລະແລ້ວ</th>
                  <th>ຄ່າເບ້ຍລ້ຽງທັງໝົດ</th>
                  <th>ຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ</th>

                  <th>ວັນທີອອກໃບປອຍ</th>
                  <th>ວັນທີປະຕິບັດງານ</th>
                </tr>
              </thead>
              <tbody>
                <!-- Loop through your filteredGasReports and populate the table rows -->
                <tr v-for="(report, i) in filteredGasReports" :key="report.id">
                  <td
                    style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:2px"
                    class="  text-center mr-2 ml-2">{{ i + 1 }}</td>
                  <td>{{ report.lahudPoyLod }}</td>
                  <td>{{ report.staft_NAME }}</td>
                  <td>{{ report.h_VICIVLE_NUMBER }}</td>
                  <td>{{ report.f_BRANCH }}</td>
                  <td>{{ report.province }}</td>
                  <td>{{ report.detail }}</td>
                  <td>{{ report.staff_BIALIENG }}</td>
                  <td>{{ report.staff_BIALIENG_FRIST }}</td>
                  <td>{{ report.staff_BIALINEG_KANGJAIY }}</td>


                  <td>{{ formatDate(report.out_DATE) }}</td> <!-- Format the date here -->
                  <td>{{ formatDate(report.in_DATE) }}</td> <!-- Format the date here -->
                </tr>
              </tbody>
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
        <!-- Data Table printer -->
      </v-card>
    </div>
    <div v-if="selectedCard === '2'">
      <v-card class="card-shadow  mb-5" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
        <v-card-title style="background-color: #af565c" class="white--text">
          ໜີ້ທີຄ້າງຈ່າຍ ອາໄລ
        </v-card-title>

        <v-data-table :items-per-page="5" :headers="truck_table_headersv2" :items="filteredItemsv2" :search="search">
          <template v-slot:item="row">
            <tr>


              <td>{{ row?.item?.offer_CODE }}</td>
              <td>{{ row?.item?.pocode }}</td>
              <td>{{ row?.item?.item_name }}</td>
              <td>{{ row?.item?.qty_offer }}</td>
              <td>{{ row?.item?.total }}</td>
              <td>{{ row?.item?.paid }}</td>
              <td>{{ row?.item?.tid }}</td>
              <td>{{ row?.item?.shop_name }}</td>
              <td>{{ row?.item?.dateCreatePO }}</td>
              <td>{{ row?.item?.cur }}</td>
              <!-- <td>{{ row?.item?.timeToPay }}</td> -->
              <td>
                <v-btn small color="primary" class="card-shadow" @click="onSubmit(row.item.pocode, row.item.paid)">
                  <v-icon>mdi-currency-usd</v-icon>ສັງຈ່າຍ
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <div v-if="selectedCard === '3'">
      <div>
    <div class="ml-5" style="display: flex; justify-content: flex-start;">
      <div v-if="sumFooter">
        <h3 class="mb-5">ລວມ ທີກຽວກັບນໍ້າມັນ</h3>

        <div style="display: flex; justify-content: flex-start;">
          <p>ລວມລິດນໍ້າມັນທັງໝົດ: </p>
          <p class="text-red">{{ sumFooter.totalLidFuel }}</p>
        </div>

        <div style="display: flex; justify-content: flex-start;">
          <p>ລວມເງິນຄ້າງຈ່າຍນໍ້າມັນ: </p>
          <p class="text-red">{{ sumFooter.totalPriceFuel }}</p>
        </div>
      </div>
      <!-- Start Date Picker -->
      <div class="mr-5 ml-10" style="width: auto;">
        <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-text-field v-model="formattedStartDate" label="ວັນ​ທີ່​ເລີ່ມ" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title scrollable @input="updateStartDate"></v-date-picker>
        </v-menu>
      </div>
      <!-- End Date Picker -->
      <div class="mr-5 ml-5" style="width: auto;">
        <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
          offset-y>
          <template v-slot:activator="{ on }">
            <v-text-field v-model="formattedEndDate" label="ວັນທີສິ້ນສຸດ" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="endDate" no-title scrollable @input="updateEndDate"></v-date-picker>
        </v-menu>
      </div>
      <div class="ml-2 pt-1 mr-5">
        <v-btn color="#90A4AE" background-color="#f5f5f5" class="white--text" elevation="0" @click="fetchReportFuel3">
          <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
        </v-btn>
      </div>

      <div class="ml-10 pt-1">
        <v-text-field v-model="search" label="Search" outlined dense></v-text-field>
      </div>

      <div style="margin-top:5px" class="ml-10">
        <v-btn color="#e91e63" class="white--text" @click="print3"><v-icon>mdi-print3er</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
      </div>

    </div>

    <div class="ml-5" style="display: flex; justify-content: flex-start;">
      <div style="width:20%; display:flex; justify-content:start" class="ml-5 mt-10 mb-10">
        <div>
          <h3>ທັງໝົດ: <span class="pp--text">{{numDataRows     }}</span></h3>
        </div>
        
        <div class="ml-5 mr-1">
          <h3>ຄ້າງຈ່າຍ: <span class="red--text">{{ waitingList }}</span></h3>
        </div>
        <div class="ml-5 mr-1">
          <h3>ສໍາລະເເລ້ວ: <span class="green--text">{{ successList}}</span></h3>
        </div>
      </div>

      <div class="mt-2">
        <v-radio-group v-model="status" column>
          <v-radio label="ຍັງບໍ່ຈ່າຍ" color="red darken-3" value="P"></v-radio>
          <v-radio label="ຈ່າຍເເລ້ວ" color="success" value="UP"></v-radio>
        </v-radio-group>
      </div>
    </div>
    <!-- Data Table -->

    <v-data-table :headers3="headers3" :items="filteredGasReports3" :items-per-page="10" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ລາຍງານບິນນໍ້າມັນທັງໝົດ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-toolbar-title  class="text-center">ເລືອກ​ທັງ​ຫມົດ
            <!-- Select All checkbox -->
            <v-checkbox v-model="selectAllCheckbox" @change="selectAll"
              :indeterminate="selectAllIndeterminate"> </v-checkbox>
          </v-toolbar-title>


        </v-toolbar>
      </template>

      <!-- Custom Cell Content - Circle Selection -->
      <template v-slot:item.circle="{ item }">
        <td v-if="item.status_fuel !== 'P'">
          <!-- Use a checkbox for circle selection -->
          <v-checkbox v-model="selectedItems" :value="item"></v-checkbox>
        </td>
      </template>


      <!-- Status Column -->
      <template v-slot:item.status_fuel="{ item }">
        <span :style="{ color: getStatusColor(item.status_fuel) }">{{ getStatusText(item.status_fuel) }}</span>
      </template>

      <!-- Custom Cell Content -->
      <template v-slot:item.sen="{ item }">
        <td>
          <!-- Conditionally render the button based on status -->
          <v-btn v-if="item.status_fuel !== 'P'" @click="updateStatusFuelStation(item)" color="success">Send</v-btn>
        </td>
      </template>

    </v-data-table>
 
    <div style="display:none">
      <div id="modalInvoice3">
        <v-row>
          <v-col cols="3">
            <img class="mx-auto" src="../assets/images/logo01.png" height="90px" cover />
          </v-col>
          <v-col cols="9">
            <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">

              <span style="font-size:19px">

                <Noti />

              </span>

              <span style="font-size:18px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
              <span style="font-size:18px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
                |
                ເວັບໄຊ: kounkham</span>
            </div>
          </v-col>
        </v-row>
        <br>



        <table class="table">
          <thead>
            <tr>
              <th>ລ/ດ</th>
              <th>ID</th>
              <th>ຊື່ ປໍ້ານໍ້າມັນ</th>
              <th>ປ້າຍຫົວລົດ</th>
              <th>ລິດນໍ້າມັນ</th>
              <th>ລາຄານໍ້າມັນ</th>
              <th>ລວມເປັນເງິນ</th>
              <th>ແຂວງ</th>
              <th>ເມືອງ</th>
              <th>ບ້ານ</th>
              <th>ສະຖານະ</th>
              <th>ວັນທີຕື່ມນໍ້າມັນ</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through your filteredGasReports3 and populate the table rows -->
            <tr v-for="(report, i) in filteredGasReports3" :key="report.id">
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:2px"
                class="  text-center mr-2 ml-2">{{ i + 1 }}</td>
              <td>{{ report.del }}</td>
              <td>{{ report.pumpName }}</td>
              <td>{{ report.plateTruckHead }}</td>
              <td>{{ report.lidFuel }}</td>
              <td>{{ report.prizPerLid }}</td>
              <td>{{ report.totalPrizeFuelAll }}</td>
              <td>{{ report.province }}</td>
              <td>{{ report.district }}</td>
              <td>{{ report.village }}</td>
              <td>{{ getStatusText(report.status_fuel) }}</td> <!-- Use a method to get the status text -->
              <td>{{ formatDate(report.dateFillFuel) }}</td> <!-- Format the date here -->
            </tr>
          </tbody>
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
    <!-- Data Table print3er -->
  </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading_processing: false,
      successList: 0,
      waitingList: 0,
      selectedCard: '1',
      startDateMenu: false,
      startDate: null,
      formattedStartDate: null,
      endDateMenu: false,
      endDate: null,
      formattedEndDate: null,
      topFiveList: [],
      loading: true,

      gasReports: [], // Fetched gas reports data
      sumFooter: null, // Sum footer data
      all_statu: 0,
      search: '', // Initialize search variable
      status: null,
      selectedCircles: [],
      selectAllCheckbox: false, // Checkbox state for Select All
      selectedItems: [], // New property to store selected items
      initialGasReports: [], // Rename to avoid conflict with computed property
      dataLoaded: false, // Flag to track data loading status
      truck_table_headersv2: [

        { text: 'offer_CODE', value: 'offer_CODE' },
        { text: 'pocode', value: 'pocode' },
        { text: 'ລາໄລ', value: 'item_name' },
        { text: 'ຈໍານວນ', value: 'qty_offer' },
        { text: 'ຈໍານວນ', value: 'total' },
        { text: 'ຈໍານວນ', value: 'tid' },
        { text: 'ຈໍານວນ', value: 'shop_name' },
        { text: 'ຈໍານວນ', value: 'dateCreatePO' },
        { text: 'ຈໍານວນ', value: 'cur' },
        { text: 'ຈໍານວນ', value: 'timeToPay' },


      ],
      truck_data_listv2: [],
    };
  },
  mounted() {
    this.fetchReportFuel(); // Call the method to fetch report data
    this.ontop5();
    this.onGetshowdata_tablev2();
    


  },


  computed: {
    filteredItemsv2() {
      if (!Array.isArray(this.truck_data_listv2)) {
        return [];
      }
      return this.truck_data_listv2.filter(item =>
        item.statusNy === 'notjaiy'
      );
    },
    headers() {
      return [
        { text: 'circle', value: 'circle' },
        { text: 'ID', value: 'lahudPoyLod' },
        { text: 'ຊື່:', value: 'staft_NAME' },
        { text: 'ຫົວລາກ', value: 'h_VICIVLE_NUMBER' },
        { text: 'ຫາງລາກ', value: 'f_BRANCH' },
        { text: 'ສະຖານທີຮັບ', value: 'province' },
        { text: 'ສະຖານທີສົ່ງ:', value: 'detail' },
        { text: 'ຄ່າເບ້ຍລ້ຽງທີ່ຊໍາລະແລ້ວ:', value: 'staff_BIALIENG' },
        { text: 'ຄ່າເບ້ຍລ້ຽງທັງໝົດ:', value: 'staff_BIALIENG_FRIST' },
        { text: 'ຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະ:', value: 'staff_BIALINEG_KANGJAIY' },
        { text: 'ເງີນ', value: 'staff_Cur' },
        { text: 'ວັນທີອອກໃບປອຍ', value: 'out_DATE' },
        { text: 'ວັນທີປະຕິບັດງານ', value: 'in_DATE' },
        // { text: 'status_fuel', value: 'totalBialiengKangjaiy' },
        { text: 'ຈ່າຍ', value: 'sen' },
      ];


    },
    selectAllIndeterminate() {
      return this.selectedItems.length > 0 && this.selectedItems.length < this.filteredGasReports.length;
    },
    computedFilteredGasReports() { // Renamed computed property
      // Filter gasReports based on startDate, endDate, and search input
      let filteredReports = this.initialGasReports; // Use the renamed data property

      if (this.startDate && this.endDate) {
        filteredReports = filteredReports.filter(report => {
          const reportDate = new Date(report.dateFillFuel);
          return reportDate >= new Date(this.startDate) && reportDate <= new Date(this.endDate);
        });
      }

      if (this.search) {
        const searchKeyword = this.search.toLowerCase();
        filteredReports = filteredReports.filter(report =>
          report.del.toLowerCase().includes(searchKeyword) ||
          report.pumpName.toLowerCase().includes(searchKeyword) ||
          report.plateTruckHead.toLowerCase().includes(searchKeyword)
          // Add more fields to search as needed
        );
      }
      return filteredReports;
    },
  },

  methods: {
    changeColor(color, ref) {
      ref.$el.style.backgroundColor = color;
    },

    async fetchReportFuel() {
      try {
        this.dataLoaded = false; // Set loading flag to false before fetching data
        let data = {
          startDate: this.startDate,
          endDate: this.endDate,
          toKen: localStorage.getItem('toKen'),
        };
        const response = await this.$axios.$post('/listPaymentStaff.service', data);
        if (response?.data) {
          this.filteredGasReports = response.data;
          this.sumFooter = response.sumFooter;

          this.dataLoaded = true; // Set loading flag to true after fetching data
        } else {
          this.filteredGasReports = [];
        }
      } catch (error) {
        console.error('Error fetching report fuel data:', error);
        // Handle error message display or other logic here
      }
    },
    updateStartDate(date) {
      this.startDate = date;
      this.formattedStartDate = this.formatDate(date);
    },
    updateEndDate(date) {
      this.endDate = date;
      this.formattedEndDate = this.formatDate(date);
    },
    formatDate(date) {
      // Implement your date formatting logic here
      return date; // Placeholder for actual date formatting
    },

    // Select All method
    selectAll() {
      if (this.selectAllCheckbox) {
        this.selectedItems = [...this.filteredGasReports];
      } else {
        this.selectedItems = [];
      }
    },

    async updateStatusFuelStation() {
      if (this.selectedItems.length === 0) {
        console.error('No items selected for update.');
        return;
      }

      try {
        this.loading_processing = true;

        // Calculate the total of allofthem
        const totalAllofthem = this.selectedItems.reduce((total, item) => total + item.totalBialiengKangjaiy, 0);

        // Prepare data to send to the API
        const requestData = {
          keyIds: this.selectedItems.map(item => item.keyIds),
          dels: this.selectedItems.map(item => item.lahudPoyLod),
          allofthem: totalAllofthem, // Send the total directly

          toKen: localStorage.getItem('toKen'),
        };

        console.log('Request data:', requestData);

        // Make the API call to update the status
        const response = await this.$axios.$post('/paymentStaff.service', requestData);
        console.log('API response:', response);

        if (response?.status === '00') {
          console.log('Status updated successfully.');

          // Fetch report data again after status update
          await this.fetchReportFuel();
        } else {
          console.error('Failed to update status:', response?.message);

        }
      } catch (error) {
        console.error('Error updating status:', error);

      } finally {
        this.loading_processing = false;
        this.selectedItems = []; // Clear selected items after update
        this.selectAllCheckbox = false; // Clear Select All checkbox after update
      }


    },



    getStatusText(status) {
      if (status === 'P') {
        return 'ຈ່າຍເເລ້ວ'; // Return 'ຈ່າຍເເລ້ວ' for status 'P'
      } else if (status === 'UP') {
        return 'ຍັງບໍ່ຈ່າຍ'; // Return 'ຍັງບໍ່ຈ່າຍ' for status 'UP'
      } else {
        return ''; // Return empty string for other statuses (if needed)
      }
    },
    getStatusColor(status) {
      if (status === 'P') {
        return 'green'; // Return 'green' color for status 'P'
      } else if (status === 'UP') {
        return 'red'; // Return 'red' color for status 'UP'
      } else {
        return ''; // Return empty string for other statuses (if needed)
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

    formatDate(dateString) {
      if (!dateString) {
        return ''; // Return an empty string if dateString is undefined or null
      }
      const parts = dateString.split('-'); // Assuming dateString is in the format 'YYYY-MM-DD'
      if (parts.length !== 3) {
        console.error('Invalid date format:', dateString);
        return ''; // Return an empty string if dateString format is not as expected
      }
      const [year, month, day] = parts;

      return `${day}/${month}/${year}`;
    }
    ,

    updateEndDate(date) {

      this.endDate = date;
      this.formatEndDate();
      this.endDateMenu = false;
    },

    formatEndDate() {

      if (this.endDate) {
        const formattedDate = new Date(this.endDate).toLocaleDateString('en-GB');
        this.formattedEndDate = formattedDate;
      } else {
        this.formattedEndDate = null;
      }
    },
    ontop5() {
      try {
        this.loading_processing = true;
        let data = {
          startDate: this.startDate,
          endDate: this.endDate,
          toKen: localStorage.getItem("toKen")

        }
        this.$axios.$post('/TopFiveRanking.service', data).then((data) => {
          console.log("allReport:", data)
          if (data?.data) {

            this.top5all = data?.data
            this.loading_processing = false

          } else {
            this.top5all = []
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
    async onSubmit(pocode, paid) {
      try {
        const requestData = {
          toKen: localStorage.getItem('toKen'),
          pocode: pocode,
          paid: paid,
        };
        const response = await this.$axios.$post('/PayToShop.service', requestData);
        console.log('PayToShop API response:', response);

        if (response?.status === '00') {
          this.loading_processing = false;

          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your message here', // Customize the success message
            confirmButtonText: 'OK',
          });

          this.onGetshowdata_tablev2();

        }
      } catch (error) {
        console.error('PayToShop API error:', error);

      }
      window.location.reload();
    },
    async onGetshowdata_tablev2() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('ListShopsMustPay.service', {
          toKen: localStorage.getItem('toKen'),
        });
        console.log('API response:', response);
        if (response?.status === '00' && response?.data) {
          this.truck_data_listv2 = response.data;
        } else {
          this.showErrorAlert('Error', 'Failed to fetch data from the API');
        }
      } catch (error) {
        console.error('API error:', error);
        this.showErrorAlert('Error', 'Failed to fetch data from the API');
      } finally {
        this.loading_processing = false;
      }
    },

  }
};

</script>

<style>
.text-red {
  color: red;
}

.green--text {
  color: green;
}

.pp--text {
  color: rgb(197, 46, 202);
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

/* Style the table to have grid lines */
.table {
  border-collapse: collapse;
  width: 100%;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
  color: #333;
}
</style>
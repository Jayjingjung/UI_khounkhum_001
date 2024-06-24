<template>
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
        <v-btn color="#90A4AE" background-color="#f5f5f5" class="white--text" elevation="0" @click="fetchReportFuel">
          <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
        </v-btn>
      </div>

      <div class="ml-10 pt-1">
        <v-text-field v-model="search" label="Search" outlined dense></v-text-field>
      </div>

      <div style="margin-top:5px" class="ml-10">
        <v-btn color="#e91e63" class="white--text" @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
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

    <v-data-table :headers="headers" :items="filteredGasReports" :items-per-page="10" class="elevation-1">
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
      <!-- /Status Column -->
    </v-data-table>
    <!-- Data Table -->
    <!-- Data Table printer -->
    <div style="display:none">
      <div id="modalInvoice">
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
            <!-- Loop through your filteredGasReports and populate the table rows -->
            <tr v-for="(report, i) in filteredGasReports" :key="report.id">
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
    <!-- Data Table printer -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading_processing: false,
      successList: 0,
      waitingList: 0,
      startDateMenu: false,
      startDate: null,
      formattedStartDate: null,
      endDateMenu: false,
      endDate: null,
      formattedEndDate: null,
      gasReports: [], // Fetched gas reports data
      sumFooter: null, // Sum footer data
     
      search: '', // Initialize search variable
      status: null,
      selectedCircles: [],
      selectAllCheckbox: false, // Checkbox state for Select All
      selectedItems: [], // New property to store selected items
      all_statu: 0, // Initialize all_statu to 0
      gasReports: [], // Assuming this is where your data is stored


    };
  },

  mounted() {
    this.fetchReportFuel(); // Call the method to fetch report data
  },

  computed: {
    headers() {
      return [
        { text: 'circle', value: 'circle' },
        { text: 'ID', value: 'del' },
        { text: 'ຊື່ ປໍ້ານໍ້າມັນ', value: 'pumpName' },
        { text: 'ປ້າຍຫົວລົດ', value: 'plateTruckHead' },
        { text: 'ລິດນໍ້າມັນ', value: 'lidFuel' },
        { text: 'ລາຄານໍ້າມັນ', value: 'prizPerLid' },
        { text: 'ລວມເປັນເງິນ', value: 'totalPrizeFuelAll' },
        { text: 'ແຂວງ', value: 'province' },
        { text: 'ເມືອງ', value: 'district' },
        { text: 'ບ້ານ', value: 'village' },
        { text: 'ວັນທີຕື່ມນໍ້າມັນ', value: 'dateFillFuel' },
        { text: 'status_fuel', value: 'status_fuel' },
        { text: 'ຈ່າຍ', value: 'sen' },
      ];

    },
    numDataRows() {
      return this.gasReports.length;
    },
    allStatuCount() {
      let successCount = 0;
      let waitingCount = 0;

      this.gasReports.forEach(report => {
        if (report.status_fuel === 'P') {
          successCount++;
        } else if (report.status_fuel === 'UP') {
          waitingCount++;
        }
      });

      this.all_statu = successCount + waitingCount;

      return this.all_statu;
    },
    selectAllIndeterminate() {
      return this.selectedItems.length > 0 && this.selectedItems.length < this.filteredGasReports.length;
    },
    filteredGasReports() {
      // Filter gasReports based on startDate, endDate, and search input
      let filteredReports = this.gasReports;

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
    async fetchReportFuel() {
      try {
        this.loading_processing = true;
        this.successList = 0;
        this.waitingList = 0;
     

        let data = {
          startDate: this.startDate,
          endDate: this.endDate,
          toKen: localStorage.getItem('toKen'),
          status: this.status, // Use the selected status
        };
        const response = await this.$axios.$post('/ShowAllReportFuel.service', data);
        if (response?.data) {

          response.data.forEach(item => {
            if (item.status_fuel === 'UP') {
              this.waitingList++;
            } else if (item.status_fuel === 'P') {
              this.successList++;
            }
          });
          this.gasReports = response.data;
          this.report_leave_car_list = response.data;
          this.sumFooter = response.sumFooter;
          this.onCheckAlert();
     
        } else {
          this.gasReports = [];
          this.report_leave_car_list = [];

        }
      } catch (error) {
        console.error('Error fetching report fuel data:', error);
        // Handle error message display or other logic here
      }
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

        // Prepare data to send to the API
        const requestData = {
          keyIds: this.selectedItems.map(item => item.keyIds),
          dels: this.selectedItems.map(item => item.del),
          toKen: localStorage.getItem('toKen'),
        };

        console.log('Request data:', requestData);

        // Make the API call to update the status
        const response = await this.$axios.$post('/UpdateStatusFuelStation.service', requestData);
        console.log('API response:', response);

        if (response?.status === '00') {
          console.log('Status updated successfully.');

          // Fetch report data again after status update
          await this.fetchReportFuel();
        } else {
          console.error('Failed to update status:', response?.message);
          // Handle error message display or other logic here
        }
      } catch (error) {
        console.error('Error updating status:', error);
        // Handle error message display or other logic here
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
      // Assuming dateString is in the format "YYYY-MM-DD", you can adjust this format as needed
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    },

    updateStartDate(date) {
      // Update startDate and formattedStartDate
      this.startDate = date;
      this.formatStartDate();
      this.startDateMenu = false;
    },

    formatStartDate() {
      // Format startDate to desired display format
      if (this.startDate) {
        const formattedDate = new Date(this.startDate).toLocaleDateString('en-GB');
        this.formattedStartDate = formattedDate;
      } else {
        this.formattedStartDate = null;
      }
    },

    updateEndDate(date) {
      // Update endDate and formattedEndDate
      this.endDate = date;
      this.formatEndDate();
      this.endDateMenu = false;
    },

    formatEndDate() {
      // Format endDate to desired display format
      if (this.endDate) {
        const formattedDate = new Date(this.endDate).toLocaleDateString('en-GB');
        this.formattedEndDate = formattedDate;
      } else {
        this.formattedEndDate = null;
      }
    }
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
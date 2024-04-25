<template>
  <div>
    <div class="ml-5" style="display: flex; justify-content: flex-start;">
      <div v-if="sumFooter">
        <div style="display: flex; justify-content: flex-start;">
          <p>ລວມຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະທັງໝົດ: </p>
          <p style="font-size: 24px; margin-top: -8px;" class="text-red">{{ sumFooter.alltotalBialiengKangjaiy }}</p>
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
      all_statu: 0,
      search: '', // Initialize search variable
      status: null,
      selectedCircles: [],
      selectAllCheckbox: false, // Checkbox state for Select All
      selectedItems: [], // New property to store selected items
      filteredGasReports: [],
      dataLoaded: false, // Flag to track data loading status

    };
  },

  mounted() {
    this.fetchReportFuel(); // Call the method to fetch report data
  },

  computed: {
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
      if (!dateString) {
        return ''; // Return an empty string if dateString is undefined or null
      }
      const parts = dateString.split('-'); // Assuming dateString is in the format 'YYYY-MM-DD'
      if (parts.length !== 3) {
        console.error('Invalid date format:', dateString);
        return ''; // Return an empty string if dateString format is not as expected
      }
      const [year, month, day] = parts;
      // Construct the formatted date in the desired format, for example: DD/MM/YYYY
      return `${day}/${month}/${year}`;
    }
    ,

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
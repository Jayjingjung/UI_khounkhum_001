<template>
  <div>
    <div style="display: flex; overflow-x: auto; width: 1640px; margin-left: 10px;">
      <v-list style="display: flex; min-width: 1200px;" v-model="selectedCard">
        <v-btn ref="btn1" value="1" @click="selectedCard = '1'" @mouseover="changeColor('#FFE5FF', $refs.btn1)"
          @mouseleave="changeColor('white', $refs.btn1)"
          style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);">
          <v-icon style="color: rgb(#000000);" size="55">mdi-steering</v-icon>
          ຂໍ້ມູນລົດເບົາ
        </v-btn>

        <v-btn ref="btn2" value="2" @click="selectedCard = '2'" @mouseover="changeColor('#FFE5FF', $refs.btn2)"
          @mouseleave="changeColor('white', $refs.btn2)"
          style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);width: 200px;">
          <v-icon style="color: rgb(#000000)" size="55">mdi-car</v-icon>
          ລົດບໍລິຫານ [ລົດດາວ]
        </v-btn>

        <v-btn ref="btn3" value="3" @click="selectedCard = '3'" @mouseover="changeColor('#FFE5FF', $refs.btn3)"
          @mouseleave="changeColor('white', $refs.btn3)"
          style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);width: 230px;">
          <v-icon style="color: rgb(#000000)" size="55">mdi-car-wash</v-icon>
          ລາຍງານປະຫວັດ [ລົດດາວ]
        </v-btn>
      </v-list>
    </div>
    <div>
      <v-btn dark color="#685f40" to="caroffice" class="card-shadow mb-5 mt-5" rounded>
        <v-icon color="white">mdi-plus</v-icon>
        <span class="white--text">ເພີ່ມຂໍ້ມູນລົດເບົາ</span>
      </v-btn>
    </div>

    <v-card style="width:1800px;height:800px;">
      <div v-if="selectedCard === '1'">
        <v-card class="card-shadow mb-4" rounded="lg">
          <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#685f40;color:white">
            ລາຍການລົດ ບໍລິຫານ
          </v-card-title>
          <div class="mt-2">
            <v-data-table :items="report_listCarOffice" :headers="report_leave_caroffice_header" :search="search">
              <template v-slot:item="row">
                <tr>
                  <td>
                    <img :src="row.item.img" style="height: 100px; width: 100px;">
                  </td>
                  <td>{{ row?.item?.car_brand }}</td>
                  <td>{{ row?.item?.carColor }}</td>
                  <td>{{ row?.item?.car_type }}</td>
                  <td>{{ row?.item?.sitPosition_amount }}</td>
                  <td>{{ row?.item?.license_plate }}</td>
                  <td>{{ row?.item?.car_model }}</td>
                  <td>{{ row?.item?.owner_car }}</td>
                  <td>
                    <v-btn style="height: 40px;width: 90px;" small color="#b3da64" class="white--text card-shadow"
                      @click="view(row?.item?.key_ID)">
                      <v-icon size="30" color="white">mdi-car</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn style="height: 40px;width: 90px;" small color="#90A4AE" class="white--text card-shadow"
                      @click="viewup(row?.item?.key_ID)">
                      <v-icon size="30" color="white">mdi-table-edit</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-icon :style="getIconStyle(row.item)" size="40">mdi-circle</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </div>

      <div v-if="selectedCard === '2'">
        <v-card class="card-shadow mb-4" rounded="lg">
          <v-card-title style="border-bottom:0.5px solid #000000;background-color:#f1c232;color:white">
            ລາຍການ [ລົດດາວ]
          </v-card-title>
          <div class="mt-2">
            <v-data-table :items="report_listCarOfficeDAO" :headers="report_leave_caroffice_header_DAO"
              :search="search">
              <template v-slot:item="row">
                <tr>
                  <td>
                    <img :src="row.item.img" style="height: 100px; width: 100px;">
                  </td>
                  <td>{{ row?.item?.car_brand }}</td>
                  <td>{{ row?.item?.carColor }}</td>
                  <td>{{ row?.item?.car_type }}</td>
                  <td>{{ row?.item?.sitPosition_amount }}</td>
                  <td>{{ row?.item?.license_plate }}</td>
                  <td>{{ row?.item?.car_model }}</td>
                  <td>{{ row?.item?.owner_car }}</td>
                  <td>
                    <v-btn style="height: 40px;width: 90px;" small color="#b3da64" class="white--text card-shadow"
                      @click="viewDAO(row?.item?.key_ID)">
                      <v-icon size="30" color="white">mdi-car</v-icon>
                    </v-btn>
                  </td>
                  <!-- <td>
                    <v-btn style="height: 40px;width: 90px;"  small color="#90A4AE" class="white--text card-shadow" @click="viewDAOup(row?.item?.key_ID)">
                      <v-icon size="30" color="white">mdi-table-edit</v-icon>
                    </v-btn>
                  </td> -->

                </tr>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </div>
      <div v-if="selectedCard === '3'">
        <v-card class="card-shadow mb-4" rounded="lg">
          <v-card-title style="border-bottom:0.5px solid #000000;background-color:#27c8a8;color:white">
            ລາຍງານປະຫວັດ [ລົດດາວ]

          </v-card-title>
          <div class="mt-2">
            <div style="margin-top: 25px; display: flex;margin-left: 40px;">
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
              <div style="margin-left: 40px; ">
                <v-btn dark color="success" @click="listCarOfficeDAO2">
                  <v-icon size="30">mdi-magnify</v-icon>
                </v-btn>

              </div>
              <div class="ml-10 pt-1">
                <v-text-field v-model="search" label="Search" outlined dense></v-text-field>
              </div>
            </div>
            <v-data-table :items="report_listCarOfficeDAO2" :headers="report_leave_caroffice_header_DAO2"
              :search="search">
              <template v-slot:item="row">
                <tr>
                  <td>
                    <img :src="row.item.img" style="height: 100px; width: 100px;">
                  </td>
                  <td>
                    <!-- PDF viewer -->
                    <v-btn @click="viewPDF(row.item.pdfFile)" small color="primary">View PDF</v-btn>
                  </td>
                  <td>{{ row?.item?.license_plate }}</td>
                  <td>{{ row?.item?.pricePaid }}</td>
                  <td>{{ row?.item?.cur }}</td>
                  <td>{{ row?.item?.dateCreate }}</td>
                  <!-- <td>
                    <v-btn style="height: 40px;width: 90px;" small color="#b3da64" class="white--text card-shadow"
                      @click="downloadPdf(row?.item?.key_ID)">
                      <v-icon size="30" color="white"></v-icon>
                    </v-btn>
                  </td> -->
                </tr>
              </template>
            </v-data-table>

            <!-- Dialog for viewing PDF -->
            <v-dialog v-model="pdfDialog" max-width="800px">
              <v-card>
                <v-card-title class="headline">PDF Viewer</v-card-title>
                <v-card-text>
                  <iframe :src="pdfFileUrl" width="100%" height="800px" frameborder="0"></iframe>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="pdfDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCard: '1', // This will hold the selected card to display
      loading_processing: false,
      formattedStartDate: null,
    
      license_plate: '',
      report_leave_caroffice_header: [
        { text: 'ຮູບພາບ', value: 'img' },
        { text: 'ຍີ່ຫໍ້ລົດ', value: 'car_brand' },
        { text: 'ສີລົດ', value: 'carColor' },
        { text: 'ປະເພດລົດ', value: 'car_type' },
        { text: 'ບອນນັ່ງ', value: 'sitPosition_amount' },
        { text: 'ປ້າຍລົດ', value: 'license_plate' },
        { text: 'ລົດປີ', value: 'car_model' },
        { text: 'ເຈົ້າຂອງລົດ', value: 'owner_car' },
        { text: 'ລາຍລະອຽດ', value: '' },
        { text: 'ເເກ້ໄຂ', value: '' },
        { text: 'ສະຖານະ', value: '' },
      ],
      report_listCarOffice: [],
      report_leave_caroffice_header_DAO: [
        { text: 'ຮູບພາບ', value: 'img' },
        { text: 'ຍີ່ຫໍ້ລົດ', value: 'car_brand' },
        { text: 'ສີລົດ', value: 'carColor' },
        { text: 'ປະເພດລົດ', value: 'car_type' },
        { text: 'ບອນນັ່ງ', value: 'sitPosition_amount' },
        { text: 'ປ້າຍລົດ', value: 'license_plate' },
        { text: 'ລົດປີ', value: 'car_model' },
        { text: 'ເຈົ້າຂອງລົດ', value: 'owner_car' },
        { text: 'ລາຍລະອຽດ', value: '' },

      ],
      report_listCarOfficeDAO: [],

      report_leave_caroffice_header_DAO2: [
        { text: 'ຮູບພາບ', value: 'img' },
        { text: 'PDF', value: 'pdfFile' },
        { text: 'ປ້າຍລົດ', value: 'license_plate' },
        { text: 'ຈໍານວນເງີນ', value: 'pricePaid' },
        { text: 'ສະກຸນເງີນ', value: 'cur' },
        { text: 'ວັນທີ', value: 'dateCreate' }
      ],
      pdfDialog: false,
      pdfFileUrl: '',
      formattedStartDate: '', // Ensure this is defined if used
      formattedEndDate: '', // Ensure this is defined if used
      end_menu: false,
      endDate: null,
      startDate: null,
      startDateMenu: null,
      endDateMenu: null,
      search: '',
      start_date: null,
    };
  },
  mounted() {
    this.listCarOffice();
    this.listCarOfficeDAO();
    this.listCarOfficeDAO2();

  },
  methods: {
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
    },

    view(key_ID) {
      this.$router.push({ path: '/view-car-office', query: { keyId: key_ID } });
    },
    viewDAO(key_ID) {
      this.$router.push({ path: '/viewDAO-car-office', query: { keyId: key_ID } });
    },
    changeColor(color, ref) {
      ref.$el.style.backgroundColor = color;
    },
    listCarOffice() {
      try {
        this.loading_processing = true;
        this.$axios.$post('/listCarOffice.service', {
          toKen: localStorage.getItem('toKen'),
        }).then((data) => {
          if (data?.status === "00") {
            this.report_listCarOffice = data?.data;
            this.loading_processing = false;
          } else {
            this.report_listCarOffice = [];
            this.loading_processing = false;
          }
        });
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          icon: 'error',
          text: error,
        });
        console.log(error);
      }
    },
    listCarOfficeDAO() {
      try {
        this.loading_processing = true;
        this.$axios.$post('/listCarOfficeLodDao.service', {
          toKen: localStorage.getItem('toKen'),
        }).then((data) => {
          if (data?.status === "00") {
            this.report_listCarOfficeDAO = data?.data;
            this.loading_processing = false;
          } else {
            this.report_listCarOfficeDAO = [];
            this.loading_processing = false;
          }
        });
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          icon: 'error',
          text: error,
        });
        console.log(error);
      }
    },
    async listCarOfficeDAO2() {
      try {
        this.loading_processing = true;
        let data = {
          startDate: this.startDate,
          endDate: this.endDate,
          toKen: localStorage.getItem('toKen')
        };
        const response = await this.$axios.$post('/listCarThatPaid.service', data);
        if (response?.status === "00") {
          this.report_listCarOfficeDAO2 = response?.data;
        } else {
          this.report_listCarOfficeDAO2 = [];
        }
      } catch (error) {
        console.error('Error fetching report fuel data:', error);
        // Handle error message display or other logic here
      }
    },
    viewPDF(pdfUrl) {
      this.pdfFileUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
      this.pdfDialog = true;
    },
    downloadPdf(key_ID) {
      // Implement download logic
    },

    viewup(key_ID) {
      this.$router.push({ path: '/updatecaroffice', query: { keyId: key_ID } });
    },



    getIconStyle(item) {
      if (
        item.insurance_Lao_STATUS === 'E' ||
        item.insurance_thai_STATUS === 'E' ||
        item.insurance_viet_STATUS === 'E' ||
        item.technic_check_STATUS === 'E' ||
        item.lean_STATUS === 'E' ||
        item.license_STATUS === 'E'
      ) {
        return { color: 'red' };
      } else if (
        item.insurance_Lao_STATUS === 'NOT' &&
        item.insurance_thai_STATUS === 'NOT' &&
        item.insurance_viet_STATUS === 'NOT' &&
        item.technic_check_STATUS === 'NOT' &&
        item.lean_STATUS === 'NOT' &&
        item.license_STATUS === 'NOT'
      ) {
        return { color: 'green' };
      }
      return { color: 'transparent' };
    },
  },
};
</script>

<style>
.st0 {
  fill: #71d8ef;
}

.st1 {
  fill: #fff534;
}

.st2 {
  fill: #000000;
}

.custom-text-field {
  background-color: #f0f0f0;
  color: #000000;
}

.st10 {
  fill: #695e5d4d;
  stroke: black;
  /* Add border color */
  stroke-width: 1;
}

.st11 {
  fill: #ECBDD6;
}
</style>
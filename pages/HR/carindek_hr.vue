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

    <!-- <div>
      <v-btn dark color="#685f40" to="/reloddao" class="card-shadow mb-5 mt-5" rounded>
        <v-icon color="white">mdi-plus</v-icon>
        <span class="white--text">ເພີ່ມຂໍ້ມູນລົດເບົາ</span>
      </v-btn>
    </div> -->

    <v-card style="width:1800px;height:800px;">

      <div v-if="selectedCard === '1'">
        <v-card class="card-shadow mb-4" rounded="lg">
          <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#685f40;color:white">
            ລາຍການລົດ ບໍລິຫານ
            <v-row justify="center">
              <v-btn color="#f593b3" class="white--text"
                @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
            </v-row>
            <div class="pt-8 ml-4" style="width: 500px;">
              <v-text-field background-color="#f5f5f5" solo flat dense label="ຄົ້ນຫາ..." v-model="search"
                prepend-inner-icon="mdi-magnify" clearable> </v-text-field>
            </div>
          </v-card-title>
          <div class="mt-2">
            <v-data-table :items="report_listCarOffice" :headers="report_leave_caroffice_header" :search="search">
              <template v-slot:item="row">
                <tr>
                  <td>
                    <img :src="row.item.img" style="height: 100px; width: 80px;">
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
                  <!-- <td>
                    <v-btn style="height: 40px;width: 90px;" small color="#90A4AE" class="white--text card-shadow"
                      @click="viewdelete(row?.item?.key_ID)">
                      <v-icon size="30" color="white">mdi-delete</v-icon>
                    </v-btn>
                  </td> -->
                  <td>
                    <v-icon :style="getIconStyle(row.item)" size="40">mdi-bell-ring</v-icon>
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
                  <td>
                    <v-btn style="height: 40px;width: 90px;" small color="#90A4AE" class="white--text card-shadow"
                      @click="viewDAOup(row?.item?.key_ID)">
                      <v-icon size="30" color="white">mdi-table-edit</v-icon>
                    </v-btn>
                  </td>

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

                  <td>{{ row?.item?.license_plate }}</td>
                  <td>{{ row?.item?.pricePaid }}</td>
                  <td>{{ row?.item?.cur }}</td>
                  <td>{{ row?.item?.dateCreate }}</td>

                  <td>
                    <!-- PDF viewer button -->
                    <v-btn @click="viewPDF(row.item.pdfFile)" small color="primary">View PDF</v-btn>
                  </td>
                  <!-- <td>
                    <v-btn style="height: 40px; width: 90px;" small color="#b3da64" class="white--text card-shadow"
                      @click="downloadPdf(row?.item?.key_ID)">
                      <v-icon size="30" color="white"></v-icon>
                    </v-btn>
                  </td> -->
                </tr>
              </template>
            </v-data-table>

            <v-dialog v-model="pdfDialog" max-width="90%">
              <v-card>
                <v-card-title>
                  <span>PDF Viewer</span>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="pdfDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <pdf style="width: 100%; height: 800px;" frameborder="0" :src="pdfSrc"></pdf>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </div>
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
        <div class="text-center"
          style="display:flex;justify-content:center;font-size:19px;font-weight:bold;margin-top: 15px;">
          ລາຍງານ ລົດທັງໝົດ </div>
        <table
          style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px;margin-top: 10px;">
          <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ລຳດັບ</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ຮູບພາບ</td>

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ຍີ່ຫໍ້ລົດ</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ສີລົດ</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ປະເພດລົດ</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ບອນນັ່ງ</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ປ້າຍລົດ</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">ໂມເດວ</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold"> ເຈົ້າຂອງລົດ</td>

          </tr>
          <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
            v-for="(item, i) in report_listCarOffice" :key="i">

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
              class=" font-weight-bold">{{ i + 1 }}</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class="font-weight-bold">
              <img :src="item.img" :alt="item.item_name" style="width:50px; height:50px;">
            </td>

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">{{ item?.car_brand }}</td>
            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">{{ item?.carColor }}</td>

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">{{ item?.car_type }}</td>

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">{{ item?.sitPosition_amount }}</td>

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">{{ item?.license_plate }}</td>

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">{{ item?.car_model }}</td>

            <td
              style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
              class=" font-weight-bold">{{ item?.owner_car }}</td>
          </tr>
        </table>



      </div>


    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import pdf from 'vue-pdf';
export default {
  components: {
    pdf,
  },
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
        { text: 'ໂມເດວ', value: 'car_model' },
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
      pdfSrc: '',
      start_date: null,
    };
  },
  mounted() {
    this.listCarOffice();
    this.listCarOfficeDAO();
    this.listCarOfficeDAO2();

  },
  methods: {
    viewPDF(pdfFile) {
      // this.pdfSrc = pdfFile;
      // this.pdfDialog = true;
      window.open(pdfFile, '_blank');
    },
    downloadPdf(key_ID) {
      // Your download logic
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


    viewup(key_ID) {
      this.$router.push({ path: '/updatecaroffice', query: { keyId: key_ID } });
    },
    async viewdelete(key_ID) {
      try {
        // Show confirmation dialog
        const result = await swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
          // Call API to delete item if confirmed
          const response = await this.$axios.$post('/DelCarOffice.service', {
            action: 'delete',
            keyId: key_ID
          });

          if (response && response.status === '00') {
            swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.listCarOffice(); // Refresh the list
          } else {
            swal.fire(
              'Failed!',
              'There was an error deleting your file.',
              'error'
            );
          }
        }
      } catch (error) {
        // Handle errors
        this.$toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
        console.error(error);
      }
    },

    getIconStyle(item) {
      if (
        item.insurance_Lao_STATUS === 'E' ||
        item.insurance_thai_STATUS === 'E' ||
        item.insurance_viet_STATUS === 'E' ||
        item.technic_check_STATUS === 'E' ||
        item.lean_STATUS === 'E' ||
        item.lean_engine_date_next_status === 'NOT' ||
        item.license_STATUS === 'E'
      ) {
        return { color: 'red' };
      } else if (
        item.insurance_Lao_STATUS === 'NOT' &&
        item.insurance_thai_STATUS === 'NOT' &&
        item.insurance_viet_STATUS === 'NOT' &&
        item.technic_check_STATUS === 'NOT' &&
        item.lean_STATUS === 'NOT' &&
        item.lean_engine_date_next_status === 'E' &&
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
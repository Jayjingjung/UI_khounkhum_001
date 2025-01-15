<template>
  <div>
    <v-card class="x">
      <div style="display: flex; overflow-x: auto; width: 1640px; margin-left: 10px;">
        <v-list style="display: flex; min-width: 1200px;" v-model="selectedCard">
          <v-btn ref="btn1" value="1" @click="selectedCard = '1'" @mouseover="changeColor('#FFE5FF', $refs.btn1)"
            @mouseleave="changeColor('white', $refs.btn1)"
            style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);">
            <v-icon style="color: rgb(#000000);" size="55">mdi-package-variant </v-icon>
            ຂໍ້ມູນອຸປະກອນ
          </v-btn>

          <!-- <v-btn ref="btn2" value="2" @click="selectedCard = '2'" @mouseover="changeColor('#FFE5FF', $refs.btn2)"
            @mouseleave="changeColor('white', $refs.btn2)"
            style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);width: 200px;">
            <v-icon style="color: rgb(#000000)" size="55">mdi-car</v-icon>
            ອາປະກອ
          </v-btn>
  
          <v-btn ref="btn3" value="3" @click="selectedCard = '3'" @mouseover="changeColor('#FFE5FF', $refs.btn3)"
            @mouseleave="changeColor('white', $refs.btn3)"
            style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);width: 230px;">
            <v-icon style="color: rgb(#000000)" size="55">mdi-car-wash</v-icon>
            ອາປະກອ
          </v-btn> -->
        </v-list>
      </div>
      <div>
        <v-btn dark color="#685f40" to="/item_office" class="card-shadow mb-5 mt-5" rounded>
          <v-icon color="white">mdi-package-variant-closed-plus</v-icon>
          <span class="white--text">ເພີ່ມຂໍ້ມູນອຸປະກອນ</span>
        </v-btn>
      </div>

      <v-card style="width: 100%;height:750px;overflow-x: auto;">
        <div v-if="selectedCard === '1'">
          <v-card class="card-shadow mb-4" rounded="lg">
            <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#685f40;color:white">
              ລາຍການ ອຸປະກອນ
              <v-row justify="center">
                <v-btn color="#f593b3" class="white--text"
                  @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
              </v-row>
            </v-card-title>
            <div class="mt-2">
              <v-data-table :items="report_listitemOffice" :headers="report_leave_caroffice_header" :search="search"
                :items-per-page="80">
                <template v-slot:item="row">
                  <tr>
                    <td>
                      <img :src="row.item.img" style="height: 100px; width: 80px;">
                    </td>

                    <td>{{ row?.item?.code }}</td>

                    <td>{{ row?.item?.name }}</td>
                    <td>{{ row?.item?.group_type }}</td>
                    <td>{{ row?.item?.owner }}</td>
                    <td>{{ row?.item?.qty?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                    <!-- <td>{{ row?.item?.branch_office }}</td> -->
                    <td>{{ row?.item?.life_service }}</td>
                    <td>{{ row?.item?.date_getin }}</td>
                    <td>{{ row?.item?.dateExpire }}</td>
                    <td>{{ row?.item?.department }}</td>
                    <td>{{ row?.item?.brand }}</td>
                    <td>{{ row?.item?.model }}</td>
                    <td>{{ row?.item?.location_room }}</td>
                    <td>{{ row?.item?.unit }}</td>
                    <td>{{ row?.item?.colors }}</td>
                    <td>{{ row?.item?.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                    <td>{{ row?.item?.currency }}</td>

                    <td>
                      <v-btn style="height: 40px;width: 90px;" small color="#90A4AE" class="white--text card-shadow"
                        @click="viewup(row?.item?.key_id)">
                        <v-icon size="30" color="white">mdi-table-edit</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn style="height: 40px;width: 90px;" small color="#90A4AE" class="white--text card-shadow"
                        @click="viewdelete(row?.item?.key_id)">
                        <v-icon size="30" color="white">mdi-delete</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-icon :style="getIconStyle(row.item)" size="40">mdi-bell-ring</v-icon>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </v-card>
        </div>


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
              ລາຍງານ ອຸປະກອນ </div>
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
                  class=" font-weight-bold">ລະຫັດ</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ຊື່</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ປະເພດ</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ເຈົ້າຂອງ</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ຈໍານວນ</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ອາຍຸການໃຊ້ງານ</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ພະແນກ</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ຢີ່ຫໍ້</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ລຸ້ນ</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ສະຖານທີ</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ວັນທີຮັບເຂົ້າ</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ວັນທີໝົດອາຍູ</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ຫົວໜ່ວຍ</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ສີ</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ລາຄາ</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">ສະກຸນເງິນ</td>

              </tr>
              <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                v-for="(item, i) in report_listitemOffice" :key="i">

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
                  class=" font-weight-bold">{{ item?.code }}</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.name }}</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.group_type }}</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.owner }}</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.qty }}</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.life_service }}</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.date_getin }}</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.dateExpire }}</td>
                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.department }}</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.brand }}</td>


                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.model }}</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.location_room }}</td>



                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.unit }}</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.colors }}</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.price }}</td>

                <td
                  style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                  class=" font-weight-bold">{{ item?.currency }}</td>

              </tr>
            </table>



          </div>


        </div>


      </v-card>
    </v-card>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  data() {
    return {
      selectedCard: '1', // This will hold the selected card to display
      loading_processing: false,
      formattedStartDate: null,

      license_plate: '',
      report_leave_caroffice_header: [
        { text: 'ຮູບພາບ', value: 'img' },
        { text: 'ລະຫັດ', value: 'code' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ປະເພດ', value: 'group_type' },
        { text: 'ເຈົ້າຂອງ', value: 'owner' },
        { text: 'ຈໍານວນ', value: 'qty' },
        // { text: 'branch_office', value: 'branch_office' },
        { text: 'ອາຍຸການໃຊ້ງານ', value: 'life_service' },
        { text: 'ວັນທີຮັບເຂົ້າ', value: 'date_getin' },
        { text: 'ວັນທີໝົດອາຍູ', value: 'dateExpire' },
        { text: 'ພະແນກ', value: 'department' },
        { text: 'ຢີ່ຫໍ້', value: 'brand' },
        { text: 'ລຸ້ນ', value: 'model' },
        { text: 'ສະຖານທີ', value: 'location_room' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ສີ', value: 'colors' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ສະກຸນເງິນ', value: 'currency' },
        // { text: 'ເບິ່ງ', value: '' },
        { text: 'ເເກ້ໄຂ', value: '' },
        { text: 'ສະຖານະ', value: '' },
      ],
      report_listitemOffice: [],

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
    // this.listCarOfficeDAO();
    // this.listCarOfficeDAO2();

  },
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


    viewDAO(key_id) {
      this.$router.push({ path: '/viewDAO-car-office', query: { keyId: key_id } });
    },
    changeColor(color, ref) {
      ref.$el.style.backgroundColor = color;
    },
    listCarOffice() {
      try {
        this.loading_processing = true;
        this.$axios.$post('/listAssetsOffice.service', {
          toKen: localStorage.getItem('toKen'),
        }).then((data) => {
          if (data?.status === "00") {
            this.report_listitemOffice = data?.data;
            this.loading_processing = false;
          } else {
            this.report_listitemOffice = [];
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

    viewPDF(pdfUrl) {
      this.pdfFileUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
      this.pdfDialog = true;
    },
    downloadPdf(key_id) {
      // Implement download logic
    },

    viewup(key_id) {
      this.$router.push({ path: '/UpdateAssetOffice', query: { key_id: key_id } });
    },
    async viewdelete(key_id) {
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
          const response = await this.$axios.$post('/DelAssetsByID.service', {
            action: 'delete',
            key_id: key_id
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

.x {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgb(255, 255, 255);
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
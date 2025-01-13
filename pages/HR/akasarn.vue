<template>
  <div>
    <v-card class="x">
      <div class="button-list">
        <v-list v-model="selectedCard">
          <v-btn ref="btn1" value="1" @click="selectedCard = '1'" @mouseover="changeColor('#FFE5FF', $refs.btn1)"
            @mouseleave="changeColor('white', $refs.btn1)" class="button-style">
            <v-icon size="40">mdi-barcode-scan</v-icon>
            ຂໍ້ມູນເອກກະສານ
          </v-btn>
        </v-list>
      </div>
      <div class="additional-buttons">
        <v-row>
          <v-btn dark color="#80BFFF" to="/akasarn_add" class="card-shadow mb-2 mt-2" rounded>
            <v-icon color="white">mdi-scan-helper</v-icon>
            <span class="white--text">ເພີ່ມຂໍ້ມູນເອກກະສານ</span>
          </v-btn>
          <v-btn dark color="#80BFFF" to="/type" class="card-shadow mb-2 mt-2" rounded>
            <v-icon color="white">mdi-scan-helper</v-icon>
            <span class="white--text">ເພີ່ມປະເພດ</span>
          </v-btn>
          <v-btn dark color="#80BFFF" to="/addcompany" class="card-shadow mb-2 mt-2" rounded>
            <v-icon color="white">mdi-scan-helper</v-icon>
            <span class="white--text">ບໍລິສັດ</span>
          </v-btn>
          <v-btn dark color="#80BFFF" to="/addbuang" class="card-shadow mb-2 mt-2" rounded>
            <v-icon color="white">mdi-scan-helper</v-icon>
            <span class="white--text">ບ້ວງ</span>
          </v-btn>
          <v-btn dark color="#80BFFF" to="/forphon" class="card-shadow mb-2 mt-2" rounded>
            <v-icon color="white">mdi-cellphone-settings</v-icon>
            <span class="white--text">For Phon</span>
          </v-btn>
        </v-row>
      </div>
      <v-row class="mt-5">
        <v-autocomplete style="width: 200px; margin-left: 15px; margin-right: 15px;" outlined dense
          label="ປະເພດ ທີເພີ່ມເອງ" :items="products_data_list" item-text="typeName" item-value="id"
          background-color="#13d95a" v-model="selectedProduct" @change="onGetProductDetails"></v-autocomplete>
        <v-autocomplete style="width: 200px; margin-left: 15px; margin-right: 15px;" outlined dense label="ບໍລິສັດ"
          :items="loca_data_list" item-text="province" item-value="id" background-color="#c6a50b" v-model="selectedLoca"
          @change="onGetLocaDetails"></v-autocomplete>
        <v-select background-color="#ffa5f1" dense outlined style="width: 200px; margin-left: 15px; margin-right: 15px;"
          :items="conditionalItems1" v-model="classofdocs" label="ໃບອະນຸຍາດ"></v-select>
        <v-autocomplete style="width: 100px; margin-left: 15px; margin-right: 15px;" outlined dense label="ບ້ວງ"
          :items="buang_data_list" item-text="nameOfBouang" item-value="nameOfBouang" background-color="#c6a50b"
          v-model="selectedBuang" @change="onGetbuangDetails"></v-autocomplete>
        <v-btn v-if="!hideInboundNumber" color="primary" class="filter-button mr-5 mb-5" @click="setBound('in')">
          <v-icon>mdi-</v-icon>ຂາເຂົ້າ
        </v-btn>
        <v-btn v-if="!hideInboundNumber" color="primary" class="filter-button mr-5 mb-5" @click="setBound('inside')">
          <v-icon>mdi-</v-icon>ພາຍໃນ
        </v-btn>
        <v-btn v-if="!hideInboundNumber" color="primary" class="filter-button mr-5 mb-5" @click="setBound('out')">
          <v-icon>mdi-</v-icon>ຂາອອກ
        </v-btn>
      </v-row>
      <v-card class="data-card">
        <div v-if="selectedCard === '1'">
          <v-card class="card-shadow mb-4" rounded="lg" style="height: 100%;">
            <v-card-title
              style="display: flex; border-bottom:0.5px solid #e0e0e0; background-color:#80BFFF; color:white;">
              ລາຍການ ເອກກະສານ
              <div class="search-section">
                <v-text-field class="search-field" placeholder="ຄົ້ນຫາ..." v-model="search" rounded
                  background-color="#e1e1e1" prepend-inner-icon="mdi-magnify">
                </v-text-field>
                <v-btn class="search-button" @click="listCarOfficeSearch">ຄົ້ນຫາ</v-btn>
              </div>
              <v-btn class="print-button" color="#ffffff" @click="print">
                <v-icon color="#00000">mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ
              </v-btn>
            </v-card-title>
            <div class="mt-2">
              <v-data-table :items="report_listitemOffice" :headers="filteredHeaders" :items-per-page="50"
                :search="search">
                <template v-slot:item="row">
                  <tr>
                    <td>
                      <v-btn style="height: 100%;width: 100%;" small color="#0059c8" class="white--text card-shadow"
                        @click="viewerpdf(row?.item?.pdf)">
                        <v-icon size="30" color="white">mdi-content-paste</v-icon>
                      </v-btn>
                    </td>
                    <td>{{ row?.item?.docType }}</td>
                    <td>{{ row?.item?.datetakein }}</td>
                    <td>{{ row?.item?.dateExpDoc }}</td>
                    <td>{{ row?.item?.classofdocs }}</td>
                    <td>{{ row?.item?.bouang }}</td>
                    <td>{{ row?.item?.content_doc }}</td>
                    <td>{{ row?.item?.whocarrydoc }}</td>
                    <!-- Conditionally show these columns based on USER_NAME -->
                    <td v-if="!hideInboundNumber">{{ row?.item?.inboundnumber }}</td>
                    <td>{{ row?.item?.inside }}</td>
                    <!-- <td v-if="!hideinsideboundNumber">{{ row?.item?.insideboundnumber }}</td> -->
                    <td v-if="!hideOutboundNumber">{{ row?.item?.outboundnumber }}</td>
                    <td v-if="!hideBound">{{ getBoundText(row?.item?.bound) }}</td>
                    <td>{{ row?.item?.company }}</td>
                    <td>{{ row?.item?.etc }}</td>
                    <td>
                      <v-badge color="red" v-if="row?.item?.status === 'EXPIRE'">
                        {{ row?.item?.lektee }}
                      </v-badge>
                      <span v-else>
                        {{ row?.item?.lektee }}
                      </span>
                    </td>
                    <td>
                      <!-- Dropdown Menu -->
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn style="height: 40px; width: 50px;" small color="#0085e3"
                            class="white--text card-shadow" v-bind="attrs" v-on="on">
                            <v-icon size="30" color="white">mdi-arrow-down-drop-circle</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item style="margin-bottom: 20px;" @click="showpdf(row?.item?.pdf)">
                            <v-list-item-icon>
                              <v-icon size="50" color="blue">mdi-printer-eye</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Show</v-list-item-title>
                          </v-list-item>

                          <v-list-item style="margin-bottom: 20px;" @click="viewup(row?.item?.key_id)">
                            <v-list-item-icon>
                              <v-icon size="50" color="blue">mdi-table-edit</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Update</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="viewdelete(row?.item?.key_id)">
                            <v-list-item-icon>
                              <v-icon>mdi-delete</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Delete</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </v-card>
        </div>
      </v-card>
      <!-- PDF Popup -->
      <v-dialog v-model="pdfDialog">
        <v-card>
          <v-card-title class="headline">PDF Viewer</v-card-title>
          <v-card-text>
            <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="1800px" frameborder="0"></iframe>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="pdfDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import swal from 'sweetalert2'

export default {
  data() {
    return {
      selectedCard: '1', // This will hold the selected card to display
      license_plate: '',
      type: null,
      selectedProduct: null,
      selectedLoca: '',
      classofdocs: '',
      selectedBuang: null,
      dropdownVisibleFor: null,
      report_leave_caroffice_header: [
        { text: 'ເອກກະສານ', value: 'pdf' },
        { text: 'ປະເພດ', value: 'docType' },
        { text: 'ວັນທີລົ່ງຂໍມູນ', value: 'datetakein' },
        { text: 'ວັນທີໝົດອາຍຸ', value: 'dateExpDoc' },
        { text: 'ຂັ້ນ', value: 'classofdocs' },
        { text: 'ບ້ວງ', value: 'bouang' },
        { text: 'ເນື້ອໃນເອກະສານ', value: 'content_doc' },
        { text: 'ຜູ້ນຳເອກະສານມາ', value: 'whocarrydoc' },
        { text: 'ເລກທີຂາເຂົ້າ', value: 'inboundnumber' },
        { text: 'ເລກທີພາຍໃນ', value: 'inside' },
        { text: 'ເລກທີຂາອອກ', value: 'outboundnumber' },
        { text: 'ຂາເຂົ້າ/ຂາອອກ', value: 'bound' },
        { text: 'ບໍລິສັດ', value: 'company' },
        { text: 'ອື່ນໆ', value: 'etc' },
        { text: 'ເລກທີ', value: 'lektee' },
        { text: '', value: '' }, // Add an extra column header for the new button
      ],
      report_listitemOffice: [],
      search: '', // Add the search property here
      selectedDropdown: null,
      conditionalItems: ['MOU', 'ໃບອານຸຍາດສໍາປະທານ', 'ໃບອານຸຍາດຂຸດຄົນ'],
      selectedConditional: null,
      conditionalItems1: ['ຂັ້ນເມືອງ', 'ຂັ້ນເເຂວງ', 'ຂັ້ນສໍານັກງານນາຍົກ'],
      conditionalItems2: ['ບໍລິສັດ ຄູນຄໍາ ອຸດສະຫະກໍາ ສໍາ ນັກງານໃຫຍ່', 'ບໍລິສັດ ຄູນຄໍາ ກໍ່ສ້າງຂົວ-ທາງ,ຊົນລະປະທານ ເເລະ ເຄຫະສະຖານ ', 'ບໍລິສັດ ຄູນຄໍາ ໂລຈິດສຕິກສ', 'ບໍລິສັດ ຄູນຄໍາ ສະຕິຮອິນດັສທຮີ', 'ບໍລິສັດ ຄູນຄໍາ ອູດສະຫະກໍາ ບໍ່ເເຮ່', 'ບໍລິສັດ ຫ້ວຍເປາະພາວເວີ', 'ບໍລິສັດ ຖະນະພອນ ອຸດສະຫະກໍາເເຮ່ທາດ', 'ບໍລິສັດ ຄໍາໃສ ການຄ້າ ຂາເຂົ້າ-ຂາອອກ'],
      bouang: null,
      buang_data_list: null,
      selectedConditional1: null,
      selectedConditional2: null,
      bound: '',
      pdfDialog: false, // Controls the visibility of the PDF dialog
      pdfUrl: '',       // Stores the URL of the PDF to display
      pdfDialog: false, // Controls the visibility of the PDF dialog
      pdfUrl: '',
      company: null,
      etc: '',
      whocarrydoc: '',
      content_doc: '',
      products_data_list: [], // Defined here
      loca_data_list: [],// Defined here
      nameRules: [
        v => !!v || 'ປ້ອນຂໍ້ມູນ',
      ],
      USER_NAME: localStorage.getItem('USER_NAME'), // Retrieve the USER_NAME from local storage
    };
  },
  watch: {
    selectedProduct(newVal) {
      if (newVal) {
        this.selectedLoca = null;
        this.classofdocs = null;
        this.selectedBuang = null;
      }
    },
    selectedLoca(newVal) {
      if (newVal) {
        this.selectedProduct = null;
        this.classofdocs = null;
        this.selectedBuang = null;
      }
    },
    classofdocs(newVal) {
      if (newVal) {
        this.selectedProduct = null;
        this.selectedLoca = null;
        this.selectedBuang = null;
      }
    },
    selectedBuang(newVal) {
      if (newVal) {
        this.selectedProduct = null;
        this.selectedLoca = null;
        this.classofdocs = null;
      }
    },
  },
  computed: {
    filteredItems() {
      return this.report_listitemOffice ? this.report_listitemOffice.slice() : []; // Default to an empty array if null
    },
    hideInboundNumber() {
      return ['may34', 'tae49', 'puna37', 'nok37'].includes(this.USER_NAME);
    },
    hideinsideboundNumber() {
      return ['may34', 'tae49', 'puna37', 'nok37'].includes(this.USER_NAME);
    },
    hideOutboundNumber() {
      return ['may34', 'tae49', 'puna37', 'nok37'].includes(this.USER_NAME);
    },
    hideBound() {
      return ['may34', 'tae49', 'puna37', 'nok37'].includes(this.USER_NAME);
    },
    hidebunc() {
      return ['kkin-out', 'minly37',].includes(this.USER_NAME);
    },
    filteredHeaders() {
      return this.report_leave_caroffice_header.filter(header => {
        if (header.value === 'inboundnumber') return !this.hideInboundNumber;
        if (header.value === 'outboundnumber') return !this.hideOutboundNumber;
        if (header.value === 'insideboundnumber') return !this.hideinsideboundNumber;
        if (header.value === 'bound') return !this.hideBound;

        return true;
      });
    }
  },
  mounted() {
    this.listCarOffice();
    this.onGetAll();
    this.onGetbuang();

    this.onGetLocationList();
  },
  methods: {
    viewup(key_id) {
      this.$router.push({ path: '/UpdateDR', query: { key_id: key_id } });
    },
    toggleDropdown(key_id) {
      this.dropdownVisibleFor = this.dropdownVisibleFor === key_id ? null : key_id;
    },
    isDropdownVisible(key_id) {
      return this.dropdownVisibleFor === key_id;
    },
    setBound(value) {
      this.bound = value;
      this.listCarOffice();
    },
    changeColor(color, ref) {
      ref.$el.style.backgroundColor = color;
    },
    async listCarOffice() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('/listDocumentAll.service', {
          branchUser: localStorage.getItem('USER_ROLE'),
          toKen: localStorage.getItem('toKen'),
          bound: this.bound,
          bouang: this.selectedBuang,
          userIdoffinanceial: this.userIdoffinanceial // Pass the selected userIdoffinanceial value here
        });
        console.log('API Response:', response);  // Log the API response
        if (response?.status === "00") {
          this.report_listitemOffice = response?.data || []; // Ensure it's always an array
        } else {
          this.report_listitemOffice = [];
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error.message || 'An error occurred.',
        });
        console.error(error);
      } finally {
        this.loading_processing = false;
      }
    },
    async listCarOfficeSearch() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('/listDocumentAllBySearch.service', {
          branchUser: localStorage.getItem('USER_ROLE'),
          toKen: localStorage.getItem('toKen'),
          // bound: this.bound,
          bouang: this.selectedBuang,
          company: this.company,
          type: this.selectedProduct,
        });
        console.log('API Response:', response);  // Log the API response
        if (response?.status === "00") {
          this.report_listitemOffice = response?.data || []; // Ensure it's always an array
        } else {
          this.report_listitemOffice = [];
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error.message || 'An error occurred.',
        });
        console.error(error);
      } finally {
        this.loading_processing = false;
      }
    },
    print() {
      console.log('Print button clicked');
      // Add your print functionality here
    },
    viewpdf(key_id) {
      this.$router.push({ path: '/lDocumentDetail', query: { key_id: key_id } });
    },
    onGetProductDetails(id) {
      let data = this.products_data_list.filter((el) => el.id === id);
      this.product_name = data[0]?.proName;
      this.documentType = id;
    },
    onGetLocaDetails(id) {
      let data = this.loca_data_list.filter((el) => el.id === id);
      this.loca_send_province = data[0]?.province;
      this.company = data[0]?.province; // Assign province to company
    },
    onGetbuangDetails(nameOfBouang) {
      let data = this.buang_data_list.filter((el) => el.nameOfBouang === nameOfBouang);
      this.buang_send_buang = data[0]?.nameOfBouang;
      this.bouang = data[0]?.nameOfBouang; // Assign province to company
    },
    async onGetbuang() {
      try {
        this.loading_processing = true
        await this.$axios.$post('/getBouangAll.service',
          {
            toKen: localStorage.getItem('toKen'),
          }).then((data) => {
            if (data?.status == '00') {
              this.buang_data_list = data?.data
              this.loading_processing = false
              console.log('buang:', this.buang_data_list)
            } else {
              this.loading_processing = false
              swal.fire({
                title: 'ແຈ້ງເຕືອນ',
                text: data?.message,
                icon: 'info',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              })
            }
          })
      } catch (error) {
        this.loading_processing = false
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      }
    },
    async onGetAll() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('getExpensesTypeAll.service', {
          toKen: localStorage.getItem('toKen'),
        });
        if (response?.status === '00') {
          this.products_data_list = response.data;
          this.loading_processing = false;
          console.log('products_list:', this.products_data_list);
        }
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },
    async onGetLocationList() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('getAllLocation', {
          toKen: localStorage.getItem('toKen'),
        });
        if (response?.status === "00") {
          this.loca_data_list = response.data;
          this.loading_processing = false;
          console.log('Loca_list:', this.loca_data_list);
        }
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
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
          const response = await this.$axios.$post('/DelDocumentByID.service', {
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
    showpdf(pdfUrl) {
      window.open(pdfUrl, '_blank');
    },
    viewerpdf(pdf) {
      this.pdfUrl = pdf;
      this.pdfDialog = true; // Open the PDF dialog
    },
    updateSearch() {
      if (this.selectedDropdown === 'ຂໍ້ຕົກລົງ') {
        this.search = this.selectedConditional;
      } else if (this.selectedDropdown === 'ໃບອະນຸຍາດ') {
        this.search = this.selectedConditional1;
      }
      else if (this.selectedDropdown === 'ບໍລິສັດ') {
        this.search = this.selectedConditional2;
      } else {
        this.search = this.selectedDropdown;
      }
    },
    getBoundText(bound) {
      return bound === 'in' ? 'ຂາເຂົ້າ' : (bound === 'out' ? 'ຂາອອກ' : '');
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

.container {
  padding: 10px;
}

.button-list,
.additional-buttons,
.print-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.button-style,
.filter-button {
  width: 250px;

}

.data-card {
  width: 100%;
  height: 800px;
  overflow-x: auto;
}

.card-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.search-section {
  display: flex;
  flex: 1;
  justify-content: center;
  max-width: 100%;
}

.search-field {
  width: 100%;
  max-width: 250px;
}

.search-button {
  margin-left: 5px;
}

.x {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  z-index: 5;
  background-color: rgb(255, 255, 255);
}
</style>

<template>
<<<<<<< HEAD
    <v-card>
      <!-- Header Section -->
      <v-card-title class="header-title1">
        ລາຍງານ
        <div class="search-print">
          <!-- Search Field -->
          <v-text-field
            placeholder="ຄົ້ນຫາ..."
            v-model="search"
            rounded
            background-color="#e1e1e1"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
      </v-card-title>
  
      <!-- Data Table Section -->
      <div style="width: 100%;">
        <v-data-table
          :items="report_listitemOffice"
          :headers="filteredHeaders"
          :items-per-page="50"
          :search="search"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.quotation_code }}</td>
              <td>{{ item.typeName }}</td>
              <td>{{ item.topic }}</td>
              <td>{{ formatNumber(item.num) }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ formatNumber(item.amount_money) }}</td>
              <td>{{ formatNumber(item.totalMoney) }}</td>
              <td :style="currencyStyle(item.currency)">{{ item.currency }}</td>
              <td>{{ item.note }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.due_date }}</td>
              <td>
                <v-btn
                  small
                  color="#0059c8"
                  class="white--text card-shadow"
                  @click="viewview(item?.key_id)"
                >
                  ເບິ່ງເເລະເເກ້ໄຂ
                  <v-icon size="25" color="white">mdi-file-edit</v-icon>
                </v-btn>
              </td>
              <td v-if="item.status_wait_approve === 'Y'">
                <v-btn
                  small
                  color="#0059c8"
                  class="white--text card-shadow"
                  @click="dialogOpen(item.quotation_code, item.totalMoney)"
                >
                  ອອກໃບຮັບເງິນ
                  <v-icon size="25" color="white">mdi-file-document-plus</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
  
      <!-- Invoice Dialog -->
      <v-dialog v-model="dialog1" max-width="700px">
        <v-card class="card-shadow mb-4" rounded="lg" width="700px">
          <v-card-title class="orange--text white--text">ໃບຮັບເງິນ</v-card-title>
          <v-card-text>
            <!-- Date Picker -->
            <v-row>
              <v-col>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
                      outlined
                      v-model="formattedDate"
                      label="ວັນທີ"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="formattedDate"></v-date-picker>
                </v-menu>
              </v-col>
              <!-- File Upload -->
              <v-col>
                <v-file-input
                  label="ອັບໂຫຼດເອກກະສານ"
                  outlined
                  dense
                  prepend-icon="mdi-file-pdf"
                  v-model="imageStaff"
                  @change="onGetEmpImage"
                ></v-file-input>
              </v-col>
            </v-row>
  
            <!-- Money Input -->
            <v-text-field
              label="ຈຳນວນຂອງເງິນ"
              v-model="formattedInputMoney"
              outlined
              dense
            ></v-text-field>
  
            <!-- Details -->
            <v-textarea label="ພິມລາຍລະອຽດ" outlined dense v-model="detail"></v-textarea>
          </v-card-text>
  
          <v-card-actions>
            <v-btn @click="onstore_dept_Must_invoice" color="green" dark>ບັນທຶກ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: "",
        report_listitemOffice: [],
        filteredHeaders: [
          { text: "Quotation Code", value: "quotation_code" },
          { text: "Type", value: "typeName" },
          { text: "Topic", value: "topic" },
          { text: "Num", value: "num" },
          { text: "Unit", value: "unit" },
          { text: "Amount", value: "amount_money" },
          { text: "Total", value: "totalMoney" },
          { text: "Currency", value: "currency" },
          { text: "Note", value: "note" },
          { text: "Date", value: "date" },
          { text: "Due Date", value: "due_date" },
          { text: "Actions", value: "actions" },
        ],
        formattedDate: "",
        formattedInputMoney: "",
        imageStaff: null,
        detail: "",
        dialog1: false,
        menu: false,
      };
    },
    methods: {
      formatNumber(value) {
        return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
      },
      currencyStyle(currency) {
        return { color: currency === "USD" ? "green" : "blue" };
      },
      dialogOpen(quotationCode, totalMoney) {
        this.dialog1 = true;
        this.formattedInputMoney = totalMoney;
      },
      onGetEmpImage(file) {
        this.imageStaff = file;
      },
      async onstore_dept_Must_invoice() {
        try {
          const response = await this.$axios.$post("/GenInvoiceCodeINV.service");
          if (response?.status === "00") {
            this.saveinvoice(response.data[0]?.invoice_code_out);
          }
        } catch (error) {
          console.error("Error generating invoice:", error);
        }
      },
      async saveinvoice(invoice_code) {
        try {
          const formdata = new FormData();
          formdata.append("date", this.formattedDate);
          formdata.append("detail", this.detail);
          formdata.append("pdfandpic", this.imageStaff);
          formdata.append("amount_of_money", this.formattedInputMoney.replace(/,/g, ""));
          formdata.append("invoice_code", invoice_code);
          formdata.append("toKen", localStorage.getItem("toKen"));
  
          const response = await this.$axios.$post("InvoiceDeptInsert.service", formdata);
          if (response?.status === "00") {
            alert("Data saved successfully!");
            this.dialog1 = false;
          } else {
            alert("Failed to save data.");
          }
        } catch (error) {
          console.error("Error saving invoice:", error);
        }
      },
      async listCarOffice() {
        try {
          const response = await this.$axios.$post("/listDeptMustReceivedAll.service", {
            toKen: localStorage.getItem("toKen"),
          });
          this.report_listitemOffice = response?.status === "00" ? response.data : [];
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
    },
    mounted() {
      this.listCarOffice();
    },
  };
  </script>
  
  <style scoped>
  .header-title1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-print {
    display: flex;
    gap: 10px;
  }
  </style>
  ../assets/pdf/ເອກະສານບໍ່ມີຊື່.pdf
=======
    <div>
        <v-card style="width:1800px;height:800px;">
            <div v-if="selectedCard === '1'">
                <v-card class="card-shadow mb-4" rounded="lg">
                    <v-card-title
                        style="display: flex; border-bottom:0.5px solid #e0e0e0; background-color:#80BFFF; color:white;">
                        ລາຍການ ເອກກະສານ
                        <div style="width: 400px; margin-left: 50px;" class="d-flex align-center">
                            <v-text-field style="width: 700px; " placeholder="ຄົ້ນຫາ..." v-model="search" rounded
                                background-color="#f5f5f5" prepend-inner-icon="mdi-magnify">
                            </v-text-field>
                            <v-btn style="margin-left: 10px;" color="ping" class="card-shadow" @click="print">
                                <v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ
                            </v-btn>
                        </div>
                        <v-btn v-if="!hideInboundNumber" style="margin-left: 10px;" color="primary" class="card-shadow"
                            @click="setBound('in')">
                            <v-icon>mdi-</v-icon>ຂາເຂົ້າ
                        </v-btn>
                        <v-btn v-if="!hideInboundNumber" style="margin-left: 10px;" color="primary" class="card-shadow"
                            @click="setBound('out')">
                            <v-icon>mdi-</v-icon>ຂາອອກ
                        </v-btn>
                        <v-btn to="./HR/akasarn" style="background-color: orange;">
                            <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                    </v-card-title>
                    <div style="margin-top: 20px;margin-left: 20px;">
                        <!-- Add buttons with names 'may' and 'tae' -->
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('132')"><v-icon>mdi-account</v-icon>nok37</v-btn>
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('133')"><v-icon>mdi-account</v-icon>junly65</v-btn>
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('134')"><v-icon>mdi-account</v-icon>kkin-out</v-btn>
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('135')"><v-icon>mdi-account</v-icon>puna37</v-btn>
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('136')"><v-icon>mdi-account</v-icon>may34</v-btn>
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('137')"><v-icon>mdi-account</v-icon>tae49</v-btn>
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('138')"><v-icon>mdi-account</v-icon>minly37</v-btn>
                        <v-btn style="margin-left: 10px;"
                            @click="setUserId('139')"><v-icon>mdi-account</v-icon>air88</v-btn>
                        <div style="margin-top: 10px;">
                            <v-autocomplete style="width: 450px; margin-left: 15px; margin-right: 15px;" outlined dense
                                label="ບ້ວງ" :items="buang_data_list" item-text="nameOfBouang" item-value="nameOfBouang"
                                background-color="#c6a50b" v-model="selectedBuang"></v-autocomplete>

                            <v-autocomplete style="width: 490px; margin-left: 15px; margin-right: 15px;" outlined dense
                                label="ບໍລິສັດ" :items="loca_data_list" item-text="province" item-value="id"
                                background-color="#c6a50b" v-model="selectedLoca"
                                @change="onGetLocaDetails"></v-autocomplete>

                            <v-autocomplete style="width: 350px; margin-left: 15px; margin-right: 15px;" outlined dense
                                label="ປະເພດ ທີເພີ່ມເອງ" :items="products_data_list" item-text="typeName"
                                item-value="id" background-color="#13d95a" v-model="selectedProduct"
                                @change="onGetProductDetails"></v-autocomplete>
                            <!-- 
                            <v-select background-color="#ffa5f1" dense outlined
                                style="width: 200px; margin-left: 15px; margin-right: 15px;" :items="conditionalItems1"
                                v-model="classofdocs" label="ໃບອະນຸຍາດ"></v-select> -->

                        </div>

                        <div style="margin-left: 13px;">
                            <v-btn style="margin-top: -10px; color: antiquewhite;" width="150" color="#007ee5"
                                @click="listCarOfficeSearch">ຄົ້ນຫາ</v-btn>
                        </div>
                    </div>


                    <div class="mt-2">
                        <v-data-table :items="report_listitemOffice" :headers="filteredHeaders" :items-per-page="50"
                            :search="search">
                            <template v-slot:item="row">
                                <tr>
                                    <td>
                                        <v-badge color="red" v-if="row?.item?.status === 'EXPIRE'">
                                            {{ row?.item?.lektee }}
                                        </v-badge>
                                        <span v-else>
                                            {{ row?.item?.lektee }}
                                        </span>
                                    </td>

                                    <td>
                                        <v-btn style="height: 100%;width: 100%;" small color="#0059c8"
                                            class="white--text card-shadow" @click="viewerpdf(row?.item?.pdf)">
                                            <v-icon size="30" color="white">mdi-content-paste</v-icon>
                                        </v-btn>
                                    </td>
                                    <td>{{ row?.item?.datetakein }}</td>
                                    <td>{{ row?.item?.dateExpDoc }}</td>
                                    <!-- <td>{{ row?.item?.pdf }}</td> -->
                                    <!-- <td>{{ row?.item?.branchUser }}</td> -->
                                    <td>{{ row?.item?.docType }}</td>
                                    <td>{{ row?.item?.content_doc }}</td>
                                    <td>{{ row?.item?.whocarrydoc }}</td>
                                    <td>{{ row?.item?.etc }}</td>
                                    <td>{{ row?.item?.dateCreate }}</td>


                                    <!-- Conditionally show these columns based on USER_NAME -->
                                    <td v-if="!hideInboundNumber">{{ row?.item?.inboundnumber }}</td>
                                    <td v-if="!hideOutboundNumber">{{ row?.item?.outboundnumber }}</td>
                                    <td v-if="!hideBound">{{ getBoundText(row?.item?.bound) }}</td>
                                    <!-- <td v-if="!hidebunc">{{ row?.item?.lektee }}</td> -->
                                    <td>{{ row?.item?.classofdocs }}</td>


                                    <td>
                                        <v-btn style="height: 40px; width: 90px;" small color="#0085e3"
                                            class="white--text card-shadow" @click="showpdf(row?.item?.pdf)">
                                            <v-icon size="30" color="white">mdi-printer-eye</v-icon>
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn style="height: 40px; width: 90px;" small color="#90A4AE"
                                            class="white--text card-shadow" @click="viewdelete(row?.item?.key_id)">
                                            <v-icon size="30" color="white">mdi-delete</v-icon>
                                        </v-btn>
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
    </div>

</template>

<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            selectedCard: '1', // This will hold the selected card to display
            license_plate: '',
            selectedLoca: '',
            selectedProduct: null,
            compan: null,
            selectedBuang: null,
            products_data_list: [], // Defined here
            conditionalItems1: ['ຂັ້ນເມືອງ', 'ຂັ້ນເເຂວງ', 'ຂັ້ນສໍານັກງານນາຍົກ'],
            classofdocs: '',
            pdfDialog: false, // Controls the visibility of the PDF dialog

            report_leave_caroffice_header: [
                { text: 'ເລກທີ', value: 'lektee' },

                { text: 'ເອກກະສານ', value: 'pdf' },
                // { text: 'branchUser', value: 'branchUser' },
                { text: 'ວັນທີລົ່ງຂໍມູນ', value: 'datetakein' },
                { text: 'ວັນທີໝົດອາຍຸ', value: 'dateExpDoc' },
                { text: 'ປະເພດ', value: 'docType' },
                { text: 'ເນື້ອໃນເອກະສານ', value: 'content_doc' },
                { text: 'ຜູ້ນຳເອກະສານມາ', value: 'whocarrydoc' },
                { text: 'ອື່ນໆ', value: 'etc' },
                { text: 'ວັນທີລົ່ງຂໍມູນ', value: 'dateCreate' },
                { text: 'ຂາເຂົ້າ', value: 'inboundnumber' },
                { text: 'ຂາອອກ', value: 'outboundnumber' },
                { text: 'ປະເພດ', value: 'bound' },
                // { text: 'ເລກທີ', value: 'lektee' },
                { text: 'ຂັ້ນ', value: 'classofdocs' },
                { text: '', value: '' },
                { text: '', value: '' }, // Add an extra column header for the new button
            ],
            ID: 'someID', // Replace 'someID' with your actual ID value
            userIdoffinanceial: 'someUserId', // Replace 'someUserId' with the actual userId

            report_listitemOffice: [],
            loca_data_list: [],// Defined here

            userIdoffinanceial: "",
            buang_data_list: '',

            search: '', // Add the search property here

            selectedConditional1: null,
            bound: '',
            value: "",
            userIdoffinanceial: "", // This will be set dynamically
            etc: '',
            buang_data_list: [],
            search: '',
            whocarrydoc: '',
            content_doc: '',
            nameRules: [
                v => !!v || 'ປ້ອນຂໍ້ມູນ',
            ],
            USER_NAME: localStorage.getItem('USER_NAME'), // Retrieve the USER_NAME from local storage
        };
    },
    computed: {
        filteredItems() {
            return this.report_listitemOffice ? this.report_listitemOffice.slice() : []; // Default to an empty array if null
        },
        hideInboundNumber() {
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
                if (header.value === 'bound') return !this.hideBound;
                if (header.value === 'lektee') return !this.hidebunc;
                return true;
            });
        }
    },
    mounted() {
        this.listCarOffice();
        this.onGetbuang();
        this.onGetLocationList();
        this.onGetAll();

    },
    methods: {


        onGetbuangDetails(nameOfBouang) {
            let data = this.buang_data_list.filter((el) => el.nameOfBouang === nameOfBouang);
            this.buang_send_buang = data[0]?.nameOfBouang;
            this.bouang = data[0]?.nameOfBouang; // Assign province to company
        },
        setBound(value) {
            this.bound = value;
            this.listCarOffice();
        },
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        setUserId(id) {
            this.userIdoffinanceial = id;
            this.listCarOffice(); // Refresh the list with the new userIdoffinanceial
        },
        onGetLocaDetails(id) {
            let data = this.loca_data_list.filter((el) => el.id === id);
            this.loca_send_province = data[0]?.province;
            this.company = data[0]?.province; // Assign province to company
        },
        onGetProductDetails(id) {
            let data = this.products_data_list.filter((el) => el.id === id);
            this.product_name = data[0]?.proName;
            this.documentType = id;
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
                    // classofdocs: this.classofdocs,
                    // userIdoffinanceial: this.userIdoffinanceial // Pass the selected userIdoffinanceial value here
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
        async onGetbuang() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/getBouangAll.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                if (response.status == '00' && Array.isArray(response.data)) {
                    this.buang_data_list = response.data; // Ensure it's assigned as an array
                } else {
                    this.buang_data_list = []; // Fallback to empty array if no valid data
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.buang_data_list = []; // Handle the error by ensuring buang_data_list is an empty array
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
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
</style>
>>>>>>> a7a6ccf394ce071b5df6deb74f5e765e9e2282bd

<template>
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
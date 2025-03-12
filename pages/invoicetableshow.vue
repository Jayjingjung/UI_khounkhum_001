<template>
    <div>
        <v-card class="card-shadow mx-auto" width="100%">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="homepagehr">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <!-- ລາຍການໜີ້ທີ່ຕ້ອງໄດ້ຮັບ -->
                ໃບຮຽກເກັບເງິນ
                <v-spacer></v-spacer>
                <v-btn to="/receivedAlltest">
                    ໃບຮຽກເກັບເງິນ
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-data-table :headers="headers" :items="report_listitemOffice" item-value="key_id" dense
                    class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>ລາຍການໜີ້</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark @click="listCarOffice">Refresh Data</v-btn>
                        </v-toolbar>
                    </template>

                    <template v-slot:item.quotation_code="{ item }">
                        <v-chip color="blue" dark>{{ item.quotation_code }}</v-chip>
                    </template>

                    <template v-slot:item.customerName="{ item }">
                        <v-text-field v-model="item.customerName" dense outlined readonly></v-text-field>
                    </template>

                    <template v-slot:item.amount_money="{ item }">
                        <v-text-field v-model="item.amount_money" dense outlined readonly></v-text-field>
                    </template>

                    <template v-slot:item.totalMoney="{ item }">
                        <v-text-field v-model="item.totalMoney" dense outlined readonly></v-text-field>
                    </template>

                    <template v-slot:item.currency="{ item }">
                        <v-chip color="green" dark>{{ item.currency }}</v-chip>
                    </template>

                    <template v-slot:item.date="{ item }">
                        <v-text-field v-model="item.date" dense outlined readonly></v-text-field>
                    </template>

                    <template v-slot:item.document_1="{ item }">
                        <v-img :src="item.document_1" max-height="50" max-width="50"></v-img>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-btn color="blue" dark small @click="removeRow(item)">ເເກ້ໄຂ</v-btn>
                    </template>

                    <!-- <template v-slot:item.actions2="{ item }">
                        <v-btn v-if="item.status_wait_approve === 'Y'" style="height: 100%; width: 100%;" small
                            color="#0059c8" class="white--text card-shadow"
                            @click="openDialog(item.quotation_code, item.totalMoney)">
                            ອອກໃບຮັບເງິນ
                            <v-icon size="25" color="white">mdi-file-document-plus</v-icon>
                        </v-btn>
                    </template> -->
                    <template v-slot:item.actions2="{ item }">
                        <v-chip v-if="item.status_wait_approve === 'Y'"  
                            :color="parseFloat(item.totalMoney) > 0 ? '#a11933' : 'gray'"
                            class="white--text card-shadow" :disabled="parseFloat(item.totalMoney) <= 0"
                            @click="openDialog(item.quotation_code, item.totalMoney)">
                            ອອກໃບຮັບເງິນ
                            <v-icon  color="white">mdi-file-document-plus</v-icon>
                        </v-chip>
                    </template>

                </v-data-table>
            </v-card-text>
        </v-card>

        <!-- Invoice Dialog -->
        <v-dialog v-model="dialog1" max-width="700px">
            <v-card class="card-shadow mb-4" rounded="lg" width="700px">
                <v-card-title class="orange--text white--text">
                    ໃບຮັບເງິນ
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-icon color="black">mdi-calendar-range</v-icon>
                            <span>ວັນທີ</span>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="formattedDate" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined v-model="formattedDate" required label="ວັນທີ"
                                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="formattedDate" no-title scrollable
                                    @input="$refs.menu.save(formattedDate)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col>
                            <v-icon color="black">mdi-file-pdf-box</v-icon>
                            <span>ອັບໂຫຼດເອກະສານ</span>
                            <v-file-input label="ອັບໂຫຼດເອກະສານ" outlined dense prepend-icon="mdi-file-pdf"
                                v-model="pdfandpic"></v-file-input>
                        </v-col>
                    </v-row>

                    <v-col cols="12">
                        <v-icon size="30" color="black">mdi-cash-plus</v-icon>
                        <span>ຈຳນວນຂອງເງິນ</span>

                        <v-text-field label="ຈຳນວນເງິນ" outlined dense v-model="formattedInputMoney"
                            @input="calculateAllMoney"></v-text-field>
                        <v-text-field label="ພິມຈຳນວນເງິນ" outlined dense v-model="InputMoney"
                            @input="calculateAllMoney"></v-text-field>


                        <v-text-field label="ຈຳນວນເງິນທັງໝົດ" outlined dense v-model="allMoney" readonly></v-text-field>

                        <!-- Display warning if allMoney is negative -->
                        <span v-if="parseFloat(allMoney) < 0" style="color: red; font-weight: bold;">
                            ຫຼາຍເກັບໄປ
                        </span>

                    </v-col>

                    <!-- <strong>{{ formattedTotalMoney }}</strong> -->

                    <v-textarea label="ພິມລາຍລະອຽດ" outlined dense v-model="detail">
                    </v-textarea>
                </v-card-text>

                <v-card-actions>
                    <v-btn @click="onstore_dept_Must_invoice" color="green" dark>
                        ບັນທຶກ
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <InvoiceDeptInsert />
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            menu: false, // ✅ FIXED: menu is now defined
            dialog1: false,
            formattedDate: "",
            pdfandpic: null,
            formattedInputMoney: "",
            detail: "",
            selectedQuotationCode: "",
            report_listitemOffice: [],
            headers: [
                { text: "ເລກໃບຮຽກເກັບ", value: "quotation_code" },
                { text: "ລູກຄ້າ", value: "customerName" },
                { text: "ຈໍານວນເງິນ", value: "amount_money" },
                { text: "ລວມເງິນ", value: "totalMoney" },
                { text: "ສະກຸນເງິນ", value: "currency" },
                { text: "ວັນທີ", value: "date" },
                { text: "ເອກະສານ", value: "document_1" },
                { text: "ໃບຮັບເງິນ", value: "actions2" },
            ],
            InputMoney: "",
            formattedInputMoney: "",
            allMoney: "",
            invoice: {}, // ✅ FIXED: Ensure `invoice` is defined
            loading_processing: false, // ✅ Ensure loading state exists
        };
    },

    computed: {
        inputExceedsLimit() {
            return parseFloat(this.formattedInputMoney || 0) > 999999;
        },
        formattedTotalMoney() {
            return parseFloat(this.formattedInputMoney || 0).toLocaleString("en-US", {

            });
        },
    },
    mounted() {

        this.listCarOffice(); // Fetch customer list on component mount
    },

    methods: {
        calculateAllMoney() {
            const input = parseFloat(this.InputMoney) || 0;
            const formatted = parseFloat(this.formattedInputMoney) || 0;
            this.allMoney = (formatted - input).toFixed(2);
        },
        openDialog(quotationCode, totalMoney) {
            this.selectedQuotationCode = quotationCode;
            this.formattedInputMoney = totalMoney;
            this.dialog1 = true;
        },
        async listCarOffice() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post("/listDeptMustReceivedAll.service", {
                    toKen: localStorage.getItem("toKen"),
                });
                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || [];
                } else {
                    this.report_listitemOffice = [];
                }
            } catch (error) {
                Swal.fire({ icon: "error", text: error.message || "Error occurred." });
            } finally {
                this.loading_processing = false;
            }
        },

        async onstore_dept_Must_invoice() {
            try {
                const response = await this.$axios.$post("/GenInvoiceCodeINV.service");
                if (response?.status === "00") {
                    const invoice_code = response.data[0]?.invoice_code_out;
                    this.saveinvoice(invoice_code);  // Call saveinvoice with the generated code
                }
            } catch (error) {
                console.error("Error generating invoice code:", error);
            }
        },
        saveinvoice() {
            // You will send the raw `amount_of_money` to the API
            console.log(this.amount_of_money); // This is the raw value without commas
            // Send this value to your API
        },
        async saveinvoice(invoice_code) {
            const formdata = new FormData();
            formdata.append("date", this.formattedDate || "0000-00-00");
            formdata.append("detail", this.detail);

            // ✅ FIX: ตรวจสอบไฟล์ก่อนอัปโหลด
            if (this.pdfandpic && this.pdfandpic instanceof File) {
                formdata.append("pdfandpic", this.pdfandpic);
            } else {
                // ✅ FIX: ถ้าไม่มีไฟล์ ให้ส่ง Binary (Blob) แทน
                formdata.append("pdfandpic", new Blob([""], { type: "application/octet-stream" }), "empty-file.bin");
            }

            // ✅ FIX: ตรวจสอบว่า `this.invoice` ถูกต้องก่อนใช้ `Object.keys()`
            if (this.invoice && typeof this.invoice === "object") {
                Object.keys(this.invoice).forEach((key) => {
                    if (key !== "pdfandpic") {
                        formdata.append(key, this.invoice[key]);
                    }
                });
            }


            // ✅ FIX: ใช้ Object.keys() กับข้อมูลที่ถูกต้อง
            const invoiceData = {
                amount_of_money: this.formattedInputMoney.replace(/,/g, ""),
                invoice_code,
                quotation_code: this.selectedQuotationCode,
                toKen: localStorage.getItem("toKen"),
            };

            Object.keys(invoiceData).forEach((key) => {
                formdata.append(key, invoiceData[key]);
            });

            this.loading_processing = true;

            try {
                const data = await this.$axios.$post(
                    "http://khounkham.com/api-prod/v1/truck/InvoiceDeptInsert.service",
                    formdata
                );
                this.onClearData();  // Clear form data after saving
                Swal.fire({
                    title: "Success!",
                    text: "Data has been saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "Error",
                    text: error.message || "Failed to save data",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading_processing = false;
            }


        },
        // ✅ Added `onClearData` method to prevent errors
        onClearData() {
            this.formattedDate = "";
            this.pdfandpic = null;
            this.formattedInputMoney = "";
            this.detail = "";
            this.selectedQuotationCode = "";
            this.invoice = {}; // Reset invoice object
        },
    }
};
</script>

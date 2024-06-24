<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#a05de1" class="white--text">
                ອາໄລ
            </v-card-title>
            <v-row>
                <div>
                    <v-col>
                        <!-- <v-badge :content="" color="teal"> -->
                        <v-btn style="border: 2px solid rgb(160,93,225)" to="./product-list">ນໍາເຂົ້າອາໄລ</v-btn>
                        <v-badge style="margin-left: -35px;" :content="TOTAL_total_Wait" color="teal">
                        </v-badge>
                        <!-- </v-badge> -->
                    </v-col>
                </div>

                <div class="mt-2 ml-4 pt-6" style="width: 500px; ">
                    <v-text-field dense solo flat background-color="#f5f5f5" v-model="search" placeholder="ຄົ້ນຫາ..."
                        prepend-inner-icon="mdi-magnify" clearable></v-text-field>
                </div>
            </v-row>
            <div v-if="sumFooter" class="sum-footer mt-4">
                <v-card>
                    <v-card-title class="text-right">
                        ມູນລາຄ່າລາໄລທັງໝົດ ທີຢູ່ໃນສາງ: {{ sumFooter.totalValue }}
                    </v-card-title>
                </v-card>
            </div>

            <div>
                <!-- Date Range Dialog -->
                <v-dialog v-model="dateDialog" persistent max-width="400px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Select Date Range</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-menu ref="startDateMenu" v-model="startDatePicker"
                                            :close-on-content-click="false" transition="scale-transition" offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="startDate" label="Start Date"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="startDate"
                                                @input="startDatePicker = false"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-menu ref="endDateMenu" v-model="endDatePicker"
                                            :close-on-content-click="false" transition="scale-transition" offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="endDate" label="End Date"
                                                    prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="endDate"
                                                @input="endDatePicker = false"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dateDialog = false">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="submitDates">Send</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- Data table -->
                <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list"
                    :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>
                                <v-avatar style="width: 80px; height: 80px;">
                                    <img :src="row.item.img" style="width:100%; height:100%;" />
                                </v-avatar>
                            </td>
                            <td style="font-size: 18px;">{{ row?.item?.item_name }}</td>
                            <td style="font-size: 18px;">{{ row?.item?.qty?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td style="font-size: 18px;">{{ row?.item?.unit }}</td>
                            <td style="font-size: 18px;">{{ row?.item?.unitPirce?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td style="font-size: 18px;">{{ row?.item?.sumUnitWithPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>
                                <v-btn small color="primary" class="card-shadow"
                                    @click="openDateDialog(row.item.item_id, row.item.item_name)">
                                    <v-icon>mdi-folder-download</v-icon>ລາຍລະອຽດ
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </div>
        </v-card>
        <!-- Data Table printer -->
        <div style="display:none">
            <div id="modalInvoice">
                <v-row>
                    <v-col cols="3">

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



                <div
                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                    <div>ບັນຊີຂົນສົ່ງ</div>
                    <div style="height: 50px;"></div>
                    <div style="display:flex;justify-content:space-between">
                        ...............................
                    </div>
                </div>
                <div
                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                    <div>ບັນຊີຂົນສົ່ງ</div>
                    <div style="height: 50px;"></div>
                    <div style="display:flex;justify-content:space-between">
                        ...............................
                    </div>
                </div>
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
            search: '',
            startDatePicker: false,
            endDatePicker: false,
            startDate: '',
            TOTAL_total_Wait:'',
            endDate: '',
            dateDialog: false,
            selectedItemId: null,
            selectedItemName: '',
            truck_table_headers: [
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ລາໄລ', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'qty' },
                { text: 'ຫົວນວຍ', value: 'unit' },
                { text: 'ລາຄາ', value: 'unitPirce' },
                { text: 'ລາຄາທັງໝົດ', value: 'sumUnitWithPrice' },
            ],
            truck_data_list: [],
            sumFooter: null  // Add sumFooter to data properties
        }
    },

    mounted() {
        this.total_count();
        this.USER_ID = localStorage.getItem('USER_ID');
        this.USER_NAME = localStorage.getItem('USER_NAME');
        this.USER_ROLE = localStorage.getItem('USER_ROLE');
        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
    },
    methods: {
        openDateDialog(item_id, item_name) {
            this.selectedItemId = item_id;
            this.selectedItemName = item_name;
            this.dateDialog = true;
        },
        submitDates() {
            this.dateDialog = false;
            this.sendidgetDetail(this.selectedItemId, this.selectedItemName);
        },
        sendidgetDetail(item_id, item_name) {
            this.$router.push({
                name: 'sendidgetDetail',
                query: {
                    item_id: item_id,
                    startDate: this.startDate,
                    endDate: this.endDate,

                    // start_date: this.startDate,
                    // end_date: this.endDate
                }
            });
        },
        total_count() {
      try {
        this.loading_processing = true;
        this.$axios.$post('/getNotiTab3.service'
          , {
            toKen: localStorage.getItem('toKen'),

          }
        ).then((data) => {
          this.loading_processing = false
          this.TOTAL = data?.totalRow
          this.TOTAL_INVOICE = data?.notiInvoice
          this.TOTAL_FORMANCE = data?.notiPerForMance
          this.TOTAL_payStatus = data?.payStatus
          this.TOTAL_notiDetails = data?.notiDetails
          this.TOTAL_totalOwe = data?.totalOwe
          this.TOTAL_total_Wait = data?.total_Wait
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
        print() {
            const modal = document.getElementById("modalInvoice");
            const cloned = modal.cloneNode(true);
            let section = document.getElementById("print");
            if (!section) {
                section = document.createElement("div");
                section.id = "print";
                document.body.appendChild(section);
            }
            section.innerHTML = "";
            section.appendChild(cloned);
            window.print();
        },
        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ReportStock.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.truck_data_list = response.data;
                    this.sumFooter = response.sumFooter;  // Store the sumFooter value
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


        async onGetinbox(offerCode) {
            try {
                const response = await this.$axios.$post('/showofferpaperDetail.service', {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: offerCode,
                });

                console.log('Print API response:', response);

            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
            }
        },
        // Other methods...
    },
};
</script>

<style>
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

.v-btn {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 150px;
}

.sum-footer {
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
}
</style>
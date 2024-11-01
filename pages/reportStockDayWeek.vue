<template>
    <div>
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; ">
            <v-card class="card-shadow mb-6" rounded="lg" style="width: 1500px;height: 800px;">

                <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white">
                    ລາຍງານ
                </v-card-title>
                <div>
                    <div style="width:100%;display:flex;justify-content:start;margin-top: 20px;" class="pt-4">

                        <div class="mr-5 ml-10" style="width: auto;">
                            <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="formattedStartDate" label="ວັນ​ທີ່​ເລີ່ມ" readonly
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="startDate" no-title scrollable
                                    @input="updateStartDate"></v-date-picker>
                            </v-menu>
                        </div>
                        <!-- End Date Picker -->
                        <div class="mr-5 ml-5" style="width: auto;">
                            <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="formattedEndDate" label="ວັນທີສິ້ນສຸດ" readonly
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="endDate" no-title scrollable
                                    @input="updateEndDate"></v-date-picker>
                            </v-menu>
                        </div>
                        <div style="width: 150px;height: 50px;margin-right: 40px;">
                            <v-select v-model="item_id" :items="truck_data_list" item-text="itemName"
                                item-value="item_id" label="ອຸປະກອນ" :loading="loading_processing"
                                :disabled="loading_processing"></v-select>
                        </div>

                        <v-row justify="start">
                            <v-btn class="mr-4 mt-5" width="130" color="success"
                                @click="reportStockDayWeek">ບັນທຶກ</v-btn>
                        </v-row>
                        <v-row justify="center">
                            <v-btn color="#f593b3" class="white--text"
                                @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
                        </v-row>
                    </div>

                </div>

                <div>
                    <div style="width:100%;display:flex;justify-content:center;margin-top: 20px;" class="pt-4">

                        <div style="width: 400px;">
                            <v-row>
                                <v-btn v-for="month in 12" :key="month" @click="setMonth(month)">{{ month }}</v-btn>
                            </v-row>
                        </div>
                        <div style="width: 400px;">
                            <v-row>
                                <v-btn v-for="year in availableYears" :key="year" @click="setYear(year)">{{ year
                                    }}</v-btn>
                            </v-row>
                        </div>
                    </div>
                </div>
                <v-container style="display: flex;margin-top: 50px;width: 1300px;">
                    <v-data-table :headers="report_reportStockDayWeek_item" :items="report_reportStockDayWeek"
                        class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>ລາຍງານ </v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>

                        <template v-slot:item.img="{ item }">
                            <img :src="item.img" alt="Image" style="height: 100%; width: 100%;">
                        </template>


                    </v-data-table>
                    <div style="margin-top: 10px;margin-bottom: 10px; margin-left: 20px;">
                        <div v-if="sumFooter">
                            <div style="display: flex;">
                                <p>ຍອດຍົກມາ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter.total_yodyokma }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດຮັບເຂົ້າ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter.total_qty_in }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດເບີກອອກ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter.total_qty_out }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດຍັງເຫຼືອ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter.total_qty_stock }}</p>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 10px;margin-bottom: 10px; margin-left: 20px;">
                        <div v-if="sumFooter2">
                            <div style="display: flex;">
                                <p>ຍອດຍົກມາ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_yodyokma2 }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດຮັບເຂົ້າ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_qty_in }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດເບີກອອກ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_qty_out }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດຍັງເຫຼືອ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_qty_stock2 }}</p>
                            </div>
                        </div>
                    </div>

                </v-container>
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
                    ລາຍງານ ສິນຄ້າ </div>
                <div class="text-center" style="display:flex;justify-content:center;font-size:14px;margin-top: 15px;">
                    ຕັ້ງເເຕ່ວັນທີ {{ formattedStartDate }} ຫາ ວັນທີ {{ formattedEndDate }} </div>



                <table
                    style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px;margin-top: 10px;">
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ລຳດັບ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຮູບພາບ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຊື່ລາຍການ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ໜ່ວຍ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ອອກວັນທີ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ວັນທີໃນ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຈໍານວນຍັງເສີອ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຈໍານວນ ອອກ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຈໍານວນ ໃນ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຍົກມາ</td>

                    </tr>
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                        v-for="(item, i) in report_reportStockDayWeek" :key="i">

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                            class=" font-weight-bold">{{ i + 1 }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">
                            <img :src="item.img" :alt="item.item_name" style="width:50px; height:50px;">
                        </td>



                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.item_name }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.unit }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.dateOut }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.dateIn }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.qty_stock?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}
                        </td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.qty_out?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}
                        </td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.qty_in?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.yordyokma?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}
                        </td>



                    </tr>
                </table>
                <div style="margin-top: 10px;margin-bottom: 10px;">
                    <div v-if="sumFooter">
                        <div style="display: flex;">

                            <p>ສິນຄ້າຈໍານວນທັງຫມົດ </p>
                            <p style="margin-left: 10px; color: red;">{{ sumFooter.total_qty_stock }}</p>
                        </div>
                        <div style="display: flex;">

                            <p>ຈໍານວນທັງຫມົດເອົາເຂົ້າ</p>
                            <p style="margin-left: 10px; color: red;">{{ sumFooter.total_qty_in }}</p>
                        </div>
                        <div style="display: flex;">

                            <p>ຈໍານວນທັງຫມົດ ເອົາອອກ </p>
                            <p style="margin-left: 10px; color: red;">{{ sumFooter.total_qty_out }}</p>
                        </div>
                        <div style="display: flex;">

                            <p>ຍົກມາທັງໝົດ</p>
                            <p style="margin-left: 10px; color: red;">{{ sumFooter.total_yodyokma }}</p>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 10px;margin-bottom: 10px; margin-left: 20px;">
                        <div v-if="sumFooter2">
                            <div style="display: flex;">
                                <p>ຍອດຍົກມາ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_yodyokma2 }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດຮັບເຂົ້າ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_qty_in }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດເບີກອອກ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_qty_out }}</p>
                            </div>
                            <div style="display: flex;">
                                <p>ຍອດຍັງເຫຼືອ</p>
                                <p style="margin-left: 10px; color: red;">{{ sumFooter2.total_qty_stock2 }}</p>
                            </div>
                        </div>
                    </div>

                <div
                    style="margin-top:50px;display:flex;justify-content:space-between;padding-left:20px; font-size: 16px">
                    <div>
                        <div>ຜູ້ອໍານວຍການ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ................
                        </div>

                    </div>
                    <div>
                        <div>ບັນຊີ-ການເງີນ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ................
                        </div>

                    </div>
                    <div>
                        <div>ຜູ້ກວນກາ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ................
                        </div>

                    </div>
                    <div>
                        <div>ຜູ້ສະຫລຸບ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ................
                        </div>

                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            loading_processing: false,
            sumFooter: {},
            sumFooter2: {},
            truck_data_list: [],
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            startDateMenu: false,
            endDateMenu: false,
            item_id: null,
            availableYears: this.getYearsArray(),
            report_reportStockDayWeek_item: [
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ຊື່ລາຍການ', value: 'item_name' },
                { text: 'ໜ່ວຍ', value: 'unit' },
                { text: 'ອອກວັນທີ', value: 'dateOut' },
                { text: 'ວັນທີໃນ', value: 'dateIn' },
                { text: 'ຈຳນວນຍັງເຫຼືອ', value: 'qty_stock' },
                { text: 'ຈໍານວນອອກ', value: 'qty_out' },
                { text: 'ຈໍານວນໃນ', value: 'qty_in' },
                { text: 'ຍົກມາ', value: 'yordyokma' },
            ],
            report_reportStockDayWeek: [],
        };
    },
    computed: {
        formattedStartDate() {
            return this.formatDate(this.startDate);
        },
        formattedEndDate() {
            return this.formatDate(this.endDate);
        },
        ...mapGetters({
            truck_data_list: "truck_data_list",
            report_reportStockDayWeek: "report_reportStockDayWeek",
            report_reportStockDayWeek_item: "report_reportStockDayWeek_item",
            sumFooter: "sumFooter",
            sumFooter2: "sumFooter2",
        }),
    },
    mounted() {
        this.reportStockDayWeek();
        this.onGetadd();
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
        formatDate(date) {
            if (!date) return '';
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        ...mapActions({
            reportStockDayWeek: "reportStockDayWeek",
            clearItemList: "clearItemList",
        }),
        setMonth(month) {
            const currentYear = new Date().getFullYear();
            const start = new Date(currentYear, month - 1, 1);
            const end = new Date(currentYear, month, 0);
            this.startDate = start.toISOString().substr(0, 10);
            this.endDate = end.toISOString().substr(0, 10);
        },
        setYear(year) {
            this.startDate = `${year}-01-01`;
            this.endDate = `${year}-12-31`;
        },
        getYearsArray() {
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let i = currentYear; i >= currentYear - 10; i--) {
                years.push(i);
            }
            return years;
        },
        updateStartDate(date) {
            this.startDate = date;
            this.startDateMenu = false;
        },
        updateEndDate(date) {
            this.endDate = date;
            this.endDateMenu = false;
        },
        updateLicensePlateStartDate(date) {
            this.carDetail.license_plate_start = date;
            this.licensePlateStartDateMenu = false;
        },
        async reportStockDayWeek() {
            try {
                this.loading_processing = true;
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    item_id: this.item_id,
                    toKen: localStorage.getItem('toKen'),
                };
                const response = await this.$axios.$post('/reportStockDayWeek.service', data);
                if (response?.status === "00") {
                    this.report_reportStockDayWeek = response?.data;
                    this.sumFooter = response?.sumFooter;
                    this.sumFooter2 = response?.sumFooter2;  // Ensure sumFooter2 is set
                } else {
                    this.report_reportStockDayWeek = [];
                    this.sumFooter = {};
                    this.sumFooter2 = {};  // Reset sumFooter2 in case of error
                }
            } catch (error) {
                console.error('Error fetching report stock day week data:', error);
                this.report_reportStockDayWeek = [];
                this.sumFooter = {};
                this.sumFooter2 = {};  // Reset sumFooter2 in case of error
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetadd() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ListItems.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('API response:', response);
                if (response?.status === '00' && response?.data) {
                    this.truck_data_list = response.data;
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
    },
};
</script>


<style scoped>
.v-toolbar-title {
    font-weight: bold;
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

<template>
    <div>

        <div v-if="loading_processing">Loading...</div>
        <div v-else>


            <h3 class="red--text ">
                ຈ່າຍຄ່າອາໄລ: {{ sumFooterI.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                    ',') }} LAK
            </h3>

            <!-- Render other data if needed -->
        </div>
        <v-card style="margin-bottom: 10px;height: 200px;">
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
                    <div class="mr-5 ml-5" style="width: auto;">
                        <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y>
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="formattedEndDate" label="ວັນທີສິ້ນສຸດ" readonly
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="endDate" no-title scrollable @input="updateEndDate"></v-date-picker>
                        </v-menu>
                    </div>

                    <v-row justify="start">
                        <v-btn class="mr-4 mt-5" width="130" color="success" @click="onGetshowdata_table">ຄົ້ນຫາ</v-btn>
                    </v-row>
                    <v-row justify="center">
                        <v-btn color="#f593b3" class="white--text" @click="print">
                            <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                        </v-btn>
                    </v-row>
                </div>

                <div>
                    <div style="width:100%;display:flex;justify-content:center;margin-top: 20px" class="pt-4">
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
            </div>
        </v-card>
        <v-card>
            <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white">
                ລາຍງານໃບປອຍ
            </v-card-title>
            <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="filteredItems" :search="search">
                <template v-slot:item="row">
                    <tr>

                        <td>{{ row?.item?.offer_CODE }}</td>
                        <td>{{ formatDate(row?.item?.dateCreate) }}</td>
                        <td>{{ row?.item?.real_totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                            ',') }}</td>
                        <td>{{ row?.item?.statusPO }}</td>

                        <td>
                            <v-btn style="height: 40px;width: 100px;" small color="#b3da64"
                                class="white--text card-shadow" @click="onGetinbox(row?.item?.offer_CODE)">
                                <v-icon size="30" color="white">mdi-dropbox</v-icon>ລາຍລະອຽດ
                            </v-btn>
                        </td>

                    </tr>
                </template>
            </v-data-table>
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
                <div class="text-center" style="display:flex;justify-content:center;font-size:20px;font-weight:bold;margin-top: 10px;">
                    ລາຍງານອາໄລ</div>
                <div style="margin-top: 20px;">
                    <table
                        style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px">
                        <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ລຳດັບ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ຮູບພາບ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ລາຄາຕໍ່ຈໍານວນ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ຈໍານວນ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ລາຄາລວມ</td>
                        </tr>
                        <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                            v-for="(item, i) in truck_data_list" :key="i">
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                                class="font-weight-bold">{{ i + 1 }}</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                <img :src="item.img" :alt="item.item_name" style="width:50px; height:50px;">
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.unit_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.qty_offer?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>


                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>



                        </tr>
                    </table>

                    <div v-if="loading_processing">Loading...</div>
                    <div v-else>


                        <h3 class="red--text ">
                            ຈ່າຍຄ່າອາໄລ: {{ sumFooterI.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }} LAK
                        </h3>

                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
    data() {
        return {
            sumFooterI: {},
            sumFooter: {},
            offer_CODE: '',

            truck_table_headers: [

                { text: 'ເລກທີໃບສ້າງໃບບິນ', value: 'offer_CODE' },
                { text: 'ວັນທີສ້າງໃບບິນ', value: 'dateCreate' },
                { text: 'ຈ່າຍຄ່າອາໄລ', value: 'real_totalMoney' },
                { text: 'ສະທານະ', value: 'statusPO' },
                { text: 'ລາຍລະອຽດ', value: '' },
            ],
            search: '',
            truck_data_list: [],
            loading_processing: false,
            startDate: '',
            endDate: '',
            startDateMenu: null,
            endDateMenu: null,
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),

        };
    },
    computed: {
        filteredItems() {
            return this.truck_data_list;
        },
        formattedStartDate() {
            return this.formatDate(this.startDate);
        },
        formattedEndDate() {
            return this.formatDate(this.endDate);
        },
        availableYears() {
            return this.getYearsArray();
        },
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

        onGetinbox(offerCode) {
            this.$router.push({ path: '/paperDetail', query: { offerCode: offerCode } });
        },
        updateStartDate(date) {
            this.startDate = date;
            this.startDateMenu = false;
        },
        updateEndDate(date) {
            this.endDate = date;
            this.endDateMenu = false;
        },
        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem('toKen'),
                };
                const response = await this.$axios.$post('showofferpaper.service', data);
                console.log('API response:', response);
                if (response?.status === '00' && response?.data) {
                    this.truck_data_list = response.data;
                    this.sumFooterI = response?.sumFooter;
                    console.log("new data footer:", this.sumFooter);

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
        formatNumber(value) {
            return new Intl.NumberFormat().format(value);
        },
        showErrorAlert(title, text) {
            Swal.fire({
                icon: 'error',
                title,
                text,
            });
        },
    },
    mounted() {
        this.onGetshowdata_table(); // Fetch truck data when component is mounted
    },
};
</script>


<style>
@media screen {
    #print {
        display: none;
    }
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
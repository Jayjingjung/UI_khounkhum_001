<template>
    <div>
        <div>

            <v-btn
                style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);"
                :color="filter === 'jaiyleo' ? 'green' : ''" @click="setFilter('jaiyleo')">
                <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-cash-check</v-icon>

                ຈ່າຍເເລ້ວ
            </v-btn>
            <v-btn
                style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);"
                :color="filter === 'notjaiy' ? 'red' : ''" @click="setFilter('notjaiy')">
                <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-cash-minus</v-icon>

                ເຄດິດ
            </v-btn>
        </div>

        <!-- Date Pickers for Start and End Date -->
        <div style="width:100%;display:flex;justify-content:end;margin-top: 20px;" class="pt-4">


            <div class="mr-5 ml-10" style="width: auto;">
                <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-text-field dense outlined v-model="formattedStartDate" label="ວັນ​ທີ່​ເລີ່ມ" readonly
                            v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title scrollable @input="updateStartDate"></v-date-picker>
                </v-menu>
            </div>

            <div class="mr-5 ml-5" style="width: auto;">
                <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-text-field dense outlined v-model="formattedEndDate" label="ວັນທີສິ້ນສຸດ" readonly
                            v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" no-title scrollable @input="updateEndDate"></v-date-picker>
                </v-menu>
            </div>
            <div>

                <v-select dense outlined v-model="selectedShop" :items="uniqueShops" label="ຮ້ານ"
                    placeholder="Choose a shop" @change="applyFilters"></v-select>
            </div>

            <v-row justify="start">
                <v-btn class="mr-4 mt-5 ml-5" width="130" color="success" @click="onGetshowdata_tablev2">ຄົ້ນຫາ</v-btn>
            </v-row>
            <v-row justify="end">
                <v-btn color="#f593b3" class="white--text" @click="print">
                    <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                </v-btn>
            </v-row>

        </div>


        <div>
            <v-card class="card-shadow mb-5" rounded="lg">
                <v-card-title class="white--text" style="background-color: #af565c">


                    <!-- Exchange moneyRate Input and Display Fields -->
                    <v-text-field label="*ເລດ" type="number" dense outlined background-color="#f5f5f5"
                        v-model="formattedtotalmoneyRate" style="width: 50px; margin-top: 30px;color: chocolate;"
                        @input="calculateKip" />


                    <v-spacer></v-spacer>
                    <span>ຈໍານວນເງີນໃນໃບບິນທີເລືອກ​ທັງ​ຫມົດ</span>
                    <v-text-field label="*ຈໍານວນເງີນ" readonly dense outlined background-color="#f5f5f5"
                        v-model="formattedtotalTid" style="width: 100px; margin-top: 30px" />
                    <v-spacer></v-spacer>
                    <!-- Display the amount converted to LAK -->


                    <v-text-field label="*ເປັນເງິນກີບ" dense outlined background-color="#f5f5f5" v-model="formattedKip"
                        style="width: 50px; margin-top: 30px" />
                </v-card-title>

                <v-card-title>
                    <v-btn class="btn-confirm" @click="selectAllItems">
                        ເລືອກທັງໝົດ
                    </v-btn>
                    <v-btn class="btn-confirm" @click="deselectAllItems">
                        ຍົກເລີກທັງໝົດ
                    </v-btn>


                    <v-spacer></v-spacer>
                    <!-- Currency Buttons -->
                    <div class="button-group">

                        <v-btn :style="{
                            marginLeft: '1px',
                            marginRight: '1px',
                            backgroundColor: selectedCurrency === 'USD' ? 'red' : 'white',
                            color: selectedCurrency === 'USD' ? 'white' : 'black',
                            border: '1px solid rgb(221, 5, 245)'
                        }" @click="setCurrency('USD')">
                            USD
                        </v-btn>
                        <v-btn :style="{
                            marginLeft: '1px',
                            marginRight: '1px',
                            backgroundColor: selectedCurrency === 'LAK' ? 'red' : 'white',
                            color: selectedCurrency === 'LAK' ? 'white' : 'black',
                            border: '1px solid rgb(221, 5, 245)'
                        }" @click="setCurrency('LAK')">
                            LAK
                        </v-btn>
                        <v-btn :style="{
                            marginLeft: '1px',
                            marginRight: '1px',
                            backgroundColor: selectedCurrency === 'THB' ? 'red' : 'white',
                            color: selectedCurrency === 'THB' ? 'white' : 'black',
                            border: '1px solid rgb(221, 5, 245)'
                        }" @click="setCurrency('THB')">
                            THB
                        </v-btn>


                    </div>

                    <v-spacer></v-spacer>
                    <div class="mr-5 ml-10 mt-6" style="width: auto;">
                        <v-menu v-model="payDateMenu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y>
                            <template v-slot:activator="{ on }">
                                <v-text-field dense outlined v-model="formattedPayDate" label="ວັນ​ທີ່​ຈ່າຍ" readonly
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="payDate" no-title scrollable @input="updatePayDate"></v-date-picker>
                        </v-menu>
                    </div>

                    <!-- Other buttons and content -->
                    <v-btn style="background-color: seagreen; color: aliceblue; width: 150px;" @click="onPayToShop">
                        ສັງຈ່າຍ
                    </v-btn>
                </v-card-title>

                <v-data-table :items-per-page="5" :headers="truck_table_headersv2" :items="filteredItems"
                    :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>
                                <!-- Checkbox with selection -->
                                <v-checkbox v-if="row?.item?.statusNy !== 'jaiyleo'" v-model="selectedItems"
                                    :value="row.item" @change="updateTotalTid" />
                            </td>
                            <td>{{ row?.item?.offer_CODE }}</td>
                            <td>{{ row?.item?.pocode }}</td>
                            <td>{{ row?.item?.item_name }}</td>
                            <td>{{ formatNumber(row?.item?.qty_offer) }}</td>
                            <td>{{ formatNumber(row?.item?.moneyRate) }}</td>
                            <td>{{ formatNumber(row?.item?.total) }}</td>
                            <td>{{ formatNumber(row?.item?.paid) }}</td>
                            <td>{{ formatNumber(row?.item?.tid) }}</td>
                            <td>{{ row?.item?.shop_name }}</td>
                            <td>{{ row?.item?.offerDate }}</td>
                            <td>{{ row?.item?.dateCreatePO }}</td>
                            <td>{{ row?.item?.cur }}</td>
                        </tr>
                    </template>
                </v-data-table>
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
                <div class="text-center"
                    style="display:flex;justify-content:center;font-size:20px;font-weight:bold;margin-top: 10px;">
                    ລາຍງານອາໄລ</div>
                <div style="margin-top: 20px;">
                    <table
                        style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px">
                        <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ລຳດັບ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ລະຫັດບິນ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ລະຫັດບິນ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ຊື່</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ຈໍານວນ</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ເລດ</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ລາຄາ</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ຈ່າຍ</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ຕິດນີ້</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ຊື່ຮ້ານ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ວັນເວລາສ້າງ</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">ສະກຸນເງິນ</td>

                        </tr>
                        <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                            v-for="(item, i) in filteredItems" :key="i">
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                                class="font-weight-bold">{{ i + 1 }}</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.offer_CODE }}</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.pocode }}</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.item_name }}</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.qty_offer }}</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.moneyRate?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>

                           


                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.paid?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.tid?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>

                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.shop_name?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.offerDate?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>
                                         <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.dateCreatePO?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">{{
                                    item?.cur?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') }}</td>




                        </tr>
                    </table>

                    <div v-if="loading_processing">Loading...</div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            payDateMenu: '',
            payDate: '',
            formattedpaytDate: '',
            applyFilters: '',



            selectedShop: null,
            selectedCurrency: null,
            filter: null,



            show_list: [],
            selectedShop: null, // holds selected shop_id

            truck_data_listv2: [],
            selectedItems: [],
            search: '',
            formattedtotalmoneyRate: '',
            formattedcreate: '',
            create: '',
            createMenu: '',
            updatecreate: '',
            allinve: '', // Added this property
            selectedCurrency: '', // Default currency
            truck_table_headersv2: [
                { text: 'Checkbox', value: 'Checkbox' },
                { text: 'ລະຫັດບິນ', value: 'offer_CODE' },
                { text: 'ລະຫັດບິນ', value: 'pocode' },
                { text: 'ຊື່', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ເລດ', value: 'moneyRate' },
                { text: 'ລາຄາ', value: 'total' },
                { text: 'ຈ່າຍ', value: 'paid' },
                { text: 'ຕິດນີ້', value: 'tid' },
                { text: 'ຊື່ຮ້ານ', value: 'shop_name' },
                { text: 'ວັນສະເໜີ', value: 'offerDate' },
                { text: 'ວັນເວລາສ້າງ', value: 'dateCreatePO' },
                { text: 'ສະກຸນເງິນ', value: 'cur' }
            ],
            totalTid: '', // Holds the sum of selected TID values
            changkip: '', // Holds the converted amount in LAK
            formattedKip: '', // Holds the converted amount in LAK
            formattedtotalTid: '', // Holds the converted amount in LAK
            moneyRate: '', // Holds the converted amount in LAK

            loading_processing: false,
            startDate: '',
            endDate: '',
            startDateMenu: null,
            endDateMenu: null,
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
        };
    },
    mounted() {
        this.onGetshowdata_tablev2();
        this.onGetaddshow();
        this.onGetshow_item_data_table();
    },
    computed: {

        // Get unique shop names for the dropdown
        uniqueShops() {
            const shopNames = this.truck_data_listv2.map(item => item.shop_name);
            return [...new Set(shopNames)];
        },
        shopOptions() {
            return this.show_list.map((shop) => ({
                shop_id: shop.shop_id,
                shop_name: shop.shop_name || "Unnamed Shop", // Show default text if shop_name is null
            }));
        },
        formattedStartDate() {
            return this.formatDate(this.startDate);
        },
        formattedEndDate() {
            return this.formatDate(this.endDate);
        },
        formattedPayDate() {
            return this.formatDate(this.payDate);
        },
        availableYears() {
            return this.getYearsArray();
        },
        calculateKip() {
            // Ensure both `totalTid` and `formattedtotalmoneyRate` are numbers before calculating
            const total = parseFloat(this.totalTid) || 0;
            const moneyRate = parseFloat(this.formattedtotalmoneyRate) || 0;
            // Calculate the amount in LAK by multiplying `totalTid` by the exchange moneyRate `formattedtotalmoneyRate`
            this.changkip = total * moneyRate;
            // Format the changkip value with commas as a string
            this.formattedKip = this.changkip.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        filteredItems() {
            return this.truck_data_listv2.filter((item) => {
                const matchesShop = this.selectedShop ? item.shop_name === this.selectedShop : true;
                const matchesStatus = this.filter ? item.statusNy === this.filter : true;
                const matchesCurrency = this.selectedCurrency ? item.cur === this.selectedCurrency : true;
                return matchesShop && matchesStatus && matchesCurrency;
            });
        }
        ,
    },

    methods: {
        handleError(title, message) {
            console.error(`${title}: ${message}`);
            alert(`${title}: ${message}`);
        },
        async onGetaddshow() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('ListShops.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('itemName:', data?.data);
                this.show_list = data?.data || [];

            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        setFilter(filterValue) {
            this.filter = filterValue;
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
        updateStartDate(date) {
            this.startDate = date;
            this.startDateMenu = false;
        },

        updateEndDate(date) {
            this.endDate = date;
            this.endDateMenu = false;
        },
        updatePayDate(date) {
            this.payDate = date;
            this.payDateMenu = false;
        },
        setCurrency(currency) {
            this.selectedCurrency = currency;
        },
        formatNumber(value) {
            return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        selectAllItems() {
            this.selectedItems = this.filteredItems.filter(
                (item) => item.statusNy !== 'jaiyleo'
            );
            this.updateTotalTid();
        },
        deselectAllItems() {
            this.selectedItems = []; // Clear all selected items
            this.updateTotalTid(); // Update total TID after deselection
        },
        updateTotalTid() {
            // Ensure selectedItems is an array before calling reduce
            if (!Array.isArray(this.selectedItems)) {
                this.selectedItems = [];
            }

            // Sum TID values from selected items
            this.totalTid = this.selectedItems.reduce((sum, item) => {
                return sum + (item.tid ? parseFloat(item.tid) : 0);
            }, 0);
            this.formattedtotalTid = this.totalTid.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            // this.totalmoneyRate = this.selectedItems.reduce((sum, item) => {
            //     return sum + (item.moneyRate ? parseFloat(item.moneyRate) : 0);
            // }, 0);
            // this.formattedtotalmoneyRate = this.totalmoneyRate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '');


        }
        ,
        async onGetshowdata_tablev2() {
            try {
                this.loading_processing = true;
                const data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem('toKen'),
                };

                const response = await this.$axios.$post('ListShopsMustPay.service', data);

                if (response?.status === '00' && response?.data) {
                    this.truck_data_listv2 = response.data;
                } else {
                    // Clear the data if no results are found
                    this.truck_data_listv2 = [];
                }
            } catch (error) {
                console.error('API error:', error); // Log the error
                this.truck_data_listv2 = []; // Clear the data on error
            } finally {
                this.loading_processing = false;
            }
        },

        async onPayToShop() {
            if (this.selectedItems.length === 0) {

                return;
            }

            try {
                const paymentData = this.selectedItems.map((item) => ({
                    pocode: item.pocode,
                    paid: item.tid,
                    moneyRate: this.formattedtotalmoneyRate,
                    datePay: this.payDate,
                    offer_CODE: item.offer_CODE,
                }));

                const response = await this.$axios.$post(
                    'http://khounkham.com/api-prod/v1/truck/PayToShop.service',
                    paymentData
                );

                if (response?.status === '00') {
                    this.showSuccessAlert('Success', 'Payment processed successfully.');
                    this.onGetshowdata_tablev2();
                    this.selectedItems = [];
                } else {

                }
            } catch (error) {
                console.error('Payment API error:', error);

            }
            window.location.reload();

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
        async onGetshow_item_data_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showofferpaper.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.item_data_list = response.data;
                   
                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
                // window.location.reload();

            }
        },

    },
};
</script>


<style scoped>
.btn-custom {
    margin-left: 2px;
    margin-right: 2px;
    background-color: white;
    color: black;
    height: 65px;
    border: 1px solid rgb(221, 5, 245);
}

.icon-custom {
    color: rgb(221, 5, 245);
}

.btn-confirm {
    background-color: green;
    width: 150px;
    color: rgb(0, 0, 0);
}

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
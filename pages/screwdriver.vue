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
                <v-menu  v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-text-field dense outlined  v-model="formattedStartDate" label="ວັນ​ທີ່​ເລີ່ມ" readonly
                            v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title scrollable @input="updateStartDate"></v-date-picker>
                </v-menu>
            </div>
            <div class="mr-5 ml-5" style="width: auto;">
                <v-menu  v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-text-field dense outlined  v-model="formattedEndDate" label="ວັນທີສິ້ນສຸດ" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" no-title scrollable @input="updateEndDate"></v-date-picker>
                </v-menu>
            </div>

            <v-row justify="start">
                <v-btn class="mr-4 mt-5" width="130" color="success" @click="onGetshowdata_tablev2">ຄົ້ນຫາ</v-btn>
            </v-row>

        </div>


        <div>
            <v-card class="card-shadow mb-5" rounded="lg">
                <v-card-title class="white--text" style="background-color: #af565c">


                    <!-- Exchange moneyRate Input and Display Fields -->
                    <v-text-field label="*ເລດ" type="number" dense outlined background-color="#f5f5f5"
                        v-model="formattedLek" style="width: 50px; margin-top: 30px" @input="calculateKip" />
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
                        <v-menu v-model="createMenu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y>
                            <template v-slot:activator="{ on }">
                                <v-text-field dense outlined v-model="formattedcreate" label="ວັນ​ທີ່​ຈ່າຍ" readonly
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="create" no-title scrollable @input="updatecreate"></v-date-picker>
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
                            <td>{{ formatNumber(row?.item?.total) }}</td>
                            <td>{{ formatNumber(row?.item?.paid) }}</td>
                            <td>{{ formatNumber(row?.item?.tid) }}</td>
                            <td>{{ row?.item?.shop_name }}</td>
                            <td>{{ row?.item?.dateCreatePO }}</td>
                            <td>{{ row?.item?.cur }}</td>

                            <td>{{ row?.item?.cur }}</td>

                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter: '',
            truck_data_listv2: [],
            selectedItems: [],
            search: '',
            formattedLek: 1,
            allinve: '', // Added this property
            selectedCurrency: '', // Default currency
            truck_table_headersv2: [
                { text: 'Checkbox', value: 'Checkbox' },
                { text: 'ລະຫັດບິນ', value: 'offer_CODE' },
                { text: 'ລະຫັດບິນ', value: 'pocode' },
                { text: 'ຊື່', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ລາຄາ', value: 'total' },
                { text: 'ຈ່າຍ', value: 'paid' },
                { text: 'ຕິດນີ້', value: 'tid' },
                { text: 'ຊື່ຮ້ານ', value: 'shop_name' },
                { text: 'ວັນເວລາສ້າງ', value: 'dateCreatePO' },
                { text: 'ສະກຸນເງິນ', value: 'cur' }
            ],
            totalTid: '', // Holds the sum of selected TID values
            changkip: '', // Holds the converted amount in LAK
            formattedKip: '', // Holds the converted amount in LAK
            formattedtotalTid: '', // Holds the converted amount in LAK
            moneyRate: '0', // Holds the converted amount in LAK

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
    },
    computed: {
        formattedStartDate() {
            return this.formatDate(this.startDate);
        },
        formattedEndDate() {
            return this.formatDate(this.endDate);
        },
        availableYears() {
            return this.getYearsArray();
        },
        calculateKip() {
            // Ensure both `totalTid` and `formattedLek` are numbers before calculating
            const total = parseFloat(this.totalTid) || 0;
            const moneyRate = parseFloat(this.formattedLek) || 0;
            // Calculate the amount in LAK by multiplying `totalTid` by the exchange moneyRate `formattedLek`
            this.changkip = total * moneyRate;
            // Format the changkip value with commas as a string
            this.formattedKip = this.changkip.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


        },

        filteredItems() {
            return this.truck_data_listv2.filter((item) => {
                // Check if the item matches the status filter (if applied)
                const matchesStatus = this.filter
                    ? item.statusNy === this.filter
                    : true;
                // Check if the item matches the currency filter (if applied)
                const matchesCurrency = this.selectedCurrency
                    ? item.cur === this.selectedCurrency
                    : true;
                // Return items that match both the status and currency filters
                return matchesStatus && matchesCurrency;
            });
        },
    },

    methods: {

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

        }
        ,

        async onGetshowdata_tablev2() {
            try {
                this.loading_processing = true;
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem('toKen')
                };

                const response = await this.$axios.$post('ListShopsMustPay.service', data);

                if (response?.status === '00' && response?.data) {
                    this.truck_data_listv2 = response.data;
                } else {
                    this.handleError('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.handleError('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
            }
        },
        async onPayToShop() {
            if (this.selectedItems.length === 0) {
                this.showErrorAlert('Error', 'Please select items to pay.');
                return;
            }

            try {
                const paymentData = this.selectedItems.map((item) => ({
                    pocode: item.pocode,
                    paid: item.tid,
                    moneyRate: this.formattedLek,
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
                    this.showErrorAlert('Error', 'Payment failed.');
                }
            } catch (error) {
                console.error('Payment API error:', error);
                this.showErrorAlert('Error', 'Failed to process payment.');
            }
        },
        showErrorAlert(title, message) {
            alert(`${title}: ${message}`);
        },
        showSuccessAlert(title, message) {
            alert(`${title}: ${message}`);
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
</style>
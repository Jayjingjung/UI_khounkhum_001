<template>
    <div>
        <div>
            <v-btn
                style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(	175, 86, 92);"
                :color="filter1 === 'YES' ? 'green' : ''" @click="setFilter('YES')">
                <v-icon style="color: rgb(	175, 86, 92);" size="55">mdi-clipboard-alert-outline</v-icon>

                ຖ້າຢືນຢັນ
            </v-btn>
            <v-btn
                style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(	175, 86, 92);"
                :color="filter === 'NO' ? 'red' : ''" @click="setFilter('NO')">
                <v-icon style="color: rgb(	175, 86, 92);" size="55">mdi-clipboard-check-outline</v-icon>

                ຢືນຢັນເເລ້ວ
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

                <v-autocomplete dense outlined v-model="selectedItem" :items="uniqueItem" label="ອາໄລ"
                    placeholder="Choose a item" @change="onSelectitem"></v-autocomplete>

            </div>
            <div>

                <v-autocomplete dense outlined v-model="selectedLocation" :items="uniqueLocations"
                    label="ເລືອກສະຖານທີ່ເເຊວງ" placeholder="Choose location"
                    @change="onSelectLocation"></v-autocomplete>
            </div>
            <v-row justify="start">
                <v-btn class="mr-4 mt-5 ml-5" width="130" color="success" @click="onGetshowdata_tablev2">ຄົ້ນຫາ</v-btn>
            </v-row>

        </div>
        <div style="width: 100%;">
            <v-card class="card-shadow" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
                <v-card-title style="background-color: #af565c" class="white--text">
                    ອາໄລ
                </v-card-title>
                <v-data-table :items-per-page="5" :headers="truck_table_headersv2" :items="filteredItems"
                    :search="search">

                    <template v-slot:item="row">
                        <tr>

                            <td>{{ row?.item?.item_name }}</td>
                            <td>{{ row?.item?.branch_inventory }}</td>
                            <td>{{ row?.item?.qty_Fix }}</td>
                            <td>{{ row?.item?.total_Price }}</td>
                            <td>{{ row?.item?.description }}</td>
                            <td>{{ row?.item?.fix_Detail }}</td>
                            <td>{{ row?.item?.location_fix }}</td>
                            <td>{{ row?.item?.dateFix }}</td>
                            <td>{{ row?.item?.item_id }}</td>
                            <td>{{ row?.item?.footer_id }}</td>
                            <td>{{ row?.item?.f_BRANCH }}</td>
                            <td>{{ row?.item?.header_id }}</td>
                            <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                            <td>
                                <v-btn v-if="row.item.approve_status !== 'NO' & row.item.new_status !== 'GO'"
                                    @click="updatestatusconfirm(row.item)" color="success">
                                    Send
                                </v-btn>
                            </td>
                            <td>
                                <v-btn v-if="row.item.new_status !== 'GO'" :loading="loading_processing"
                                    @click="updatestatuscancle(row.item)" color="error">
                                    Cancel
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </div>
        <div style="width: 100%;">
            <v-card class="card-shadow" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
                <v-card-title style="background-color: #af565c" class="white--text">
                    ສໍາເລັດ

                    <v-btn color="#f593b3" class="white--text" @click="print">
                        <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                    </v-btn>
                </v-card-title>

                <v-data-table :items-per-page="5" :headers="truck_table_headersv" :items="filteredTruckData"
                    :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row?.item?.item_name }}</td>
                            <td>{{ row?.item?.branch_inventory }}</td>
                            <td>{{ row?.item?.qty_Fix }}</td>
                            <td>{{ row?.item?.total_Price }}</td>
                            <td>{{ row?.item?.description }}</td>
                            <td>{{ row?.item?.fix_Detail }}</td>
                            <td>{{ row?.item?.location_fix }}</td>
                            <td>{{ row?.item?.dateFix }}</td>
                            <td>{{ row?.item?.item_id }}</td>
                            <td>{{ row?.item?.footer_id }}</td>
                            <td>{{ row?.item?.f_BRANCH }}</td>
                            <!-- <td>{{ row?.item?.header_id }}</td> -->
                            <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>

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



                <table
                    style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px">
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ລຳດັບ</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ຊື່</td>
                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ສາຂາ</td> -->

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ຈໍານວນ</td>


                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ລາຄາ</td>


                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ລາຍລະອຽດ</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ລາຍລະອຽດການເເປງ</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ເເຊວງ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ວັນທີ</td>

                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">footer_id</td> -->
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ຫົວລັດ</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ຫາງລົດ</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ທະບຽນ</td>

                    </tr>
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                        v-for="(item, i) in filteredTruckData" :key="i">
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                            class="font-weight-bold">{{ i + 1 }}</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.item_name?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>

                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.branch_inventory?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td> -->


                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.qty_Fix?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.total_Price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.description?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.fix_Detail?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.location_fix?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.dateFix?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.item_id?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>
                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.footer_id?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td> -->
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.f_BRANCH?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>
                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.header_id?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td> -->


                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">{{
                                item?.h_VICIVLE_NUMBER?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>




                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import Swal from "sweetalert2"; // Import SweetAlert2

export default {
    data() {
        return {
            payDateMenu: '',
            payDate: '',
            formattedpaytDate: '',
            applyFilters: '',
            selectedCurrency: null,
            filter: null,
            selectedLocation: null, // ບໍ່ມີ location ທີ່ເລືອກໃນຕອນເລີ່ມ
            show_list: [],
            truck_data_listv2: [],
            truck_data_listv: [],
            selectedItems: [],
            selectedItem: null,
            search: '',
            formattedcreate: '',
            create: '',
            filter1: null, // ຕັ້ງຄ່າໃຫ້ມີຄ່າເລີ່ມຕົ້ນ
            createMenu: '',
            updatecreate: '',
            allinve: '', // Added this property
            selectedCurrency: '', // Default currency
            truck_table_headersv2: [
                // { text: 'Checkbox', value: 'Checkbox' },
                { text: 'ຊື່', value: 'item_name' },
                { text: 'ສາຂາ', value: 'branch_inventory' },
                { text: 'ຈໍານວນ', value: 'qty_Fix' },
                { text: 'ລາຄາ', value: 'total_Price' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ລາຍລະອຽດການເເປງ', value: 'fix_Detail' },
                { text: 'ເເຊວງ', value: 'location_fix' },
                { text: 'ວັນທີ', value: 'dateFix' },
                { text: 'footer_id', value: 'footer_id' },
                { text: 'item_id', value: 'item_id' },
                { text: 'ຫົວລັດ', value: 'h_VICIVLE_NUMBER' },
                // { text: 'ຫາງລົດ', value: 'header_id' },
                { text: 'ຫາງລົດ', value: 'f_BRANCH' },
                { text: 'ທະບຽນ', value: '' },
            ],
            truck_table_headersv: [
                // { text: 'Checkbox', value: 'Checkbox' },
                { text: 'ຊື່', value: 'item_name' },
                { text: 'ສາຂາ', value: 'branch_inventory' },
                { text: 'ຈໍານວນ', value: 'qty_Fix' },
                { text: 'ລາຄາ', value: 'total_Price' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ລາຍລະອຽດການເເປງ', value: 'fix_Detail' },
                { text: 'ເເຊວງ', value: 'location_fix' },
                { text: 'ວັນທີ', value: 'dateFix' },
                { text: 'footer_id', value: 'footer_id' },
                { text: 'item_id', value: 'item_id' },
                { text: 'ຫົວລັດ', value: 'h_VICIVLE_NUMBER' },
                // { text: 'ຫາງລົດ', value: 'header_id' },
                { text: 'ຫາງລົດ', value: 'f_BRANCH' },
            ],
            onconfirm: '', // Holds the sum of selected TID values
            totalTid: '', // Holds the sum of selected TID values
            changkip: '', // Holds the converted amount in LAK
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
        this.onGetshowdata_tablev();

    },
    computed: {
        uniqueLocations() {
            const locations = this.truck_data_listv2.map(item => item.location_fix);
            return [...new Set(locations)];
        },
        filteredTruckData() {
            return this.truck_data_listv.filter(item => item.new_status === 'GO');
        },
        // Get unique item names for the dropdown
        uniqueItem() {
            const itemNames = this.truck_data_listv2.map(item => item.item_name);
            return [...new Set(itemNames)];
        },
        itemOptions() {
            return this.show_list.map((item) => ({
                item_id: item.item_id,
                item_name: item.item_name || "Unnamed item", // Show default text if item_name is null
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


        // filteredItems() {
        //     return this.truck_data_listv2.filter((item) => {
        //         const matchesItem = this.selectedItem ? item.item_name === this.selectedItem : true;
        //         const matchesLocation = this.selectedLocation ? item.location_fix === this.selectedLocation : true;
        //         const matchesStatus = this.filter ? item.approve_status === this.filter : true;
        //         const matchesCurrency = this.selectedCurrency ? item.cur === this.selectedCurrency : true;

        //         return matchesItem && matchesLocation && matchesStatus && matchesCurrency;
        //     });
        // }
        filteredItems() {
            return this.truck_data_listv2
                .filter((item) => {
                    const matchesItem = this.selectedItem ? item.item_name === this.selectedItem : true;
                    const matchesLocation = this.selectedLocation ? item.location_fix === this.selectedLocation : true;
                    const matchesStatus = this.filter ? item.approve_status === this.filter : true;
                    const matchesCurrency = this.selectedCurrency ? item.cur === this.selectedCurrency : true;
                    return matchesItem && matchesLocation && matchesStatus && matchesCurrency;
                })
                .sort((a, b) => {
                    return new Date(b.dateFix) - new Date(a.dateFix); // เรียงจากวันที่ล่าสุดไปเก่า
                });
        }
        ,
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
        onSelectLocation(selected) {
            console.log("Location selected:", selected);
            this.selectedLocation = selected;
        },
        onSelectitem(selected) {
            console.log("item selected:", selected);
            this.selectedItem = selected;
        },
        applyFilters() {
            console.log("Filter applied with selectedItem:", this.selectedItem);
        },
        handleError(title, message) {
            console.error(`${title}: ${message}`);
            alert(`${title}: ${message}`);
        },

        setFilter(filterValue) {
            this.filter1 = filterValue; // ປ່ຽນ `filter1` ຄ່າໃໝ່
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

        formatNumber(value) {
            return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        selectAllItems() {
            this.selectedItems = this.filteredItems.filter(
                (item) => item.approve_status !== 'YES'
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
                const data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem('toKen'),
                };

                const response = await this.$axios.$post('showListofFixReq.service', data);

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
        async onGetshowdata_tablev() {
            try {
                this.loading_processing = true;
                const data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem('toKen'),
                };

                const response = await this.$axios.$post('showListofFixReq.service', data);

                if (response?.status === '00' && response?.data) {
                    this.truck_data_listv = response.data;
                } else {
                    // Clear the data if no results are found
                    this.truck_data_listv = [];
                }
            } catch (error) {
                console.error('API error:', error); // Log the error
                this.truck_data_listv = []; // Clear the data on error
            } finally {
                this.loading_processing = false;
            }
        },

        // async onconfirm() {
        //     if (this.selectedItems.length === 0) {

        //         return;
        //     }

        //     try {
        //         const paymentData = this.selectedItems.map((item) => ({


        //             header_id: item.header_id,
        //             item_name: item.item_name,
        //             branch_inventory: item.branch_inventory,
        //             item_id: item.item_id,
        //             footer_id: item.footer_id,
        //             qty_Fix: item.qty_Fix,
        //             total_Price: item.total_Price,
        //             description: item.description,
        //             location_fix: item.location_fix,
        //             fix_Detail: item.fix_Detail,
        //             dateFix: item.dateFix,
        //             toKen: localStorage.getItem('toKen'),
        //         }));

        //         const response = await this.$axios.$post(
        //             'http://khounkham.com/api-prod/v1/truck/fix.service',
        //             paymentData
        //         );

        //         if (response?.status === '00') {
        //             this.showSuccessAlert('Success', 'Payment processed successfully.');
        //             this.onGetshowdata_tablev2();
        //             this.selectedItems = [];
        //         } else {

        //         }
        //     } catch (error) {
        //         console.error('Payment API error:', error);

        //     }
        // },
        async updatestatusconfirm(item) {
            try {
                this.loading_processing = true;
                const data = {
                    item_name: item.item_name,
                    branch_inventory: item.branch_inventory,
                    item_id: item.item_id,
                    header_id: item.header_id,
                    footer_id: item.footer_id,
                    qty_Fix: item.qty_Fix,
                    total_Price: item.total_Price,
                    description: item.description,
                    location_fix: item.location_fix,
                    fix_Detail: item.fix_Detail,
                    dateFix: item.dateFix,
                    toKen: localStorage.getItem("toKen"), // Retrieve token from localStorage
                };

                console.log("Sending data:", data);

                const response = await this.$axios.$post("/fix.service", data); // Send data to API
                console.log("Response:", response);

                if (response?.status === "00") {
                    this.loading_processing = false;
                    this.onGetshowdata_tablev2(); // Refresh data

                    await Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data successfully sent.", // Customize success message
                        confirmButtonText: "OK",
                    });
                    // Uncomment if a page reload is required
                    // window.location.reload();
                }
            } catch (error) {
                console.error("Error:", error);
                this.loading_processing = false;

                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to send data.", // Customize error message
                    confirmButtonText: "OK",
                });
            }
        },
        async updatestatusconfirm(item) {
            try {
                this.loading_processing = true;


                const data = {
                    key_id: item.key_id, // Pass the item's key_id
                    status: "YES", // Set the status to 'NO'
                    toKen: localStorage.getItem("toKen"), // Retrieve token from localStorage
                };

                console.log("Sending data:", data);

                // Send the POST request to the API
                const response = await this.$axios.$post("/proofFixReq.service", data);
                console.log("Response:", response);

                if (response?.status === "00") {
                    this.loading_processing = false;

                    // Show success alert
                    await Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data successfully sent.",
                        confirmButtonText: "OK",
                    });
                    // window.location.reload(); 
                    this.onGetshowdata_tablev2()
                    this.onGetshowdata_tablev()


                    // window.location.reload();

                }
            } catch (error) {
                console.error("Error:", error);
                this.loading_processing = false;

                // Show error alert
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to send data.",
                    confirmButtonText: "OK",
                });
            }
        },
        async updatestatuscancle(item) {
            try {
                this.loading_processing = true;

                // Prepare the data payload
                const data = {
                    key_id: item.key_id, // Pass the item's key_id
                    status: "NO", // Set the status to 'NO'
                    toKen: localStorage.getItem("toKen"), // Retrieve token from localStorage
                };

                console.log("Sending data:", data);

                // Send the POST request to the API
                const response = await this.$axios.$post("/proofFixReq.service", data);
                console.log("Response:", response);

                if (response?.status === "00") {
                    this.loading_processing = false;

                    // Show success alert
                    await Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data successfully sent.",
                        confirmButtonText: "OK",
                    });

                    // Optionally reload or refresh data
                    // window.location.reload();
                    // OR trigger data refresh:
                    // this.fetchTruckData();
                }
            } catch (error) {
                console.error("Error:", error);
                this.loading_processing = false;

                // Show error alert
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to send data.",
                    confirmButtonText: "OK",
                });
            }
        }


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
    border: 1px solid rgb(175, 86, 92);
}

.icon-custom {
    color: rgb(175, 86, 92);
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
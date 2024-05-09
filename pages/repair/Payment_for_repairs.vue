<template>
    <div>
        <v-card class="card-shadow" rounded="lg"
            style="border:0.5px solid #e0e0e0;border-radius:3px;margin-bottom: 400px;">
            <v-card-title style="background-color:#edc69e" class="white--text">
                ສະເໜີໃຊ້
            </v-card-title>


            <div style="margin-top: 10px;margin-left: 10px;margin-right: 10px;">
                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <span>ເພີ້ມ ອຸປະກອນ:</span>


                    </div>

                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="ເລືອກ ອຸປະກອນ" :items="Mechanicequipment" item-text="itemName"
                            item-value="item_id" @change="onGetMechanicequipment">
                        </v-select>

                    </div>

                    <div style="width:100%;" class="pl-2">
                        <!-- Autocomplete for selecting vehicle -->
                        <div style="width:100%">
                            <v-autocomplete outlined dense label="ຮ້ານ" :items="show_list" item-text="shop_name"
                                item-value="shop_id" @change="onGetshow" :rules="nameRules">
                            </v-autocomplete>
                        </div>


                    </div>

                    <div style="width:100%;" class="pl-2">
                        <!-- Autocomplete for selecting vehicle -->
                        <div style="width:100%">
                            <v-autocomplete outlined dense label="ເລືອກຫົວລົດ" :items="cars_list"
                                item-text="h_VICIVLE_NUMBER" item-value="key_id" @change="onGetCarDetails"
                                :rules="nameRules">
                            </v-autocomplete>
                        </div>


                    </div>

                    <div style="width:100%;" class="pl-2">
                        <div style="width:100%">
                            <v-autocomplete outlined dense label="ເລືອກຫາງລົດ" :items="truct_footer_data_list"
                                item-text="f_CARD_NO" item-value="key_id" @change="onGetTructFooterDetail"
                                :rules="nameRules">
                            </v-autocomplete>
                        </div>
                    </div>
                </div>
                <div style="display: flex;">

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ຈໍານວນ" dense outlined background-color="#f5f5f5" v-model="qty_offer"
                            @input="calculateTotalMoney"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5" v-model="unit_price"
                            @input="calculateTotalMoney"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>


                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ຄຳອະທິບາຍ" dense outlined background-color="#f5f5f5"
                            v-model="description"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="* ຊື່ຜູ້ສະເໜີ" dense outlined background-color="#f5f5f5"
                            v-model="offerManName"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ໜ້າທີ່ຮັບຜິດຊອບ" dense outlined background-color="#f5f5f5"
                            v-model="job"></v-text-field>
                        <div class="tops"></div>
                    </div>

                </div>
            </div>

            <div class="center-btn mt-10">
                <v-btn elevation="0" color="#448AFF" @click="onGetLeaveNumber">
                    <v-icon color="white">mdi-check</v-icon>
                    <span class="white--text">ບັນທຶກ</span>
                </v-btn>
            </div>

            <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list" :search="search">
                <template v-slot:item="row">
                    <tr>
                        <td><v-avatar>
                                <img :src="row.item.img">
                            </v-avatar></td>
                        <td>{{ row?.item?.qty_offer }}</td>
                        <td>{{ row?.item?.unit_price }}</td>
                        <td>{{ row?.item?.totalMoney }}</td>
                        <td>{{ row?.item?.description }}</td>
                        <td>{{ row?.item?.offerManName }}</td>
                        <td>{{ row?.item?.job }}</td>
                        <td>{{ row?.item?.f_CARD_NO }}</td>
                        <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                        <td>{{ row?.item?.item_name }}</td>
                        <td>{{ row?.item?.offer_CODE }}</td>
                        <td>{{ row?.item?.statusPO }}</td>
                        <td>{{ row?.item?.dateCreate }}</td>
                        <td :class="getStatusClass(row.item.status)">
                            {{ getStatusText(row.item.status) }}
                        </td>
                        <td><v-btn small color="primary" class="card-shadow"
                                @click="onGetinbox(row.item.offer_CODE)"><v-icon>mdi-printer</v-icon>ລາຍລະອຽດ</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>


            <!-- component for print  -->
        </v-card>



        <v-dialog v-model="dialogVisible" max-width="800px" style="max-height: 800px;">
            <v-card>
                <v-card-title style="font-size: 24px;">ປ້ອນຂໍ້ມູນ</v-card-title>
                <v-card-actions>
                    <v-btn style="font-size: 20px;" color="primary" @click="onPrint">
                        <v-icon>mdi-printer</v-icon>ພິມບິນ
                    </v-btn>



                </v-card-actions>
                <div style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="shopName">ວັນທີສ້າງ:</label>
                            <span id="shopName">{{ shopName }}</span>
                        </div>
                        <div>
                            <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price">{{ unit_price }}</span>
                        </div>
                        <div>
                            <label for="offer_CODE">offer_CODE:</label>
                            <span id="offer_CODE">{{ offer_CODE }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer">{{ qty_offer }}</span>
                        </div>
                        <div>
                            <label for="totalMoney">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney">{{ totalMoney }}</span>
                        </div>
                        <div>
                            <label for="description">ລາຍລະອຽດ:</label>
                            <span id="description">{{ description }}</span>
                        </div>

                    </v-card-text>

                    <v-card-text style="font-size: 18px;">

                        <div>
                            <label for="offerManName">ຜູ້ສະເໜີ:</label>
                            <span id="offerManName">{{ offerManName }}</span>
                        </div>
                        <div>
                            <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                            <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                        </div>
                        <div>
                            <label for="item_name">ອາໄລ ຊື່:</label>
                            <span id="item_name">{{ item_name }}</span>
                        </div>
                        <div>
                            <label for="dateCreate">ວັນທີສ້າງ:</label>
                            <span id="dateCreate">{{ dateCreate }}</span>
                        </div>

                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img" style="width: 150px; height: 160px;">
                        </div>

                    </v-card-text>

                </div>
                <v-card-actions>

                    <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>


                </v-card-actions>
            </v-card>
        </v-dialog>


        <div>
            <div id="modalInvoice">
                <v-row>
                    <v-col>
                        <Notiv2 />
                        <div style="font-size: 18px;font-weight: bold;margin-top: 80px;margin-bottom: 80px;">

                            <div>
                                <label for="dateCreate">ວັນທີສ້າງ:</label>
                                <span id="dateCreate">{{ dateCreate }}</span>
                            </div>

                            <div>
                                <label for="shopName">ຊື່ຮ້ານ:</label>
                                <span id="shopName">{{ shopName }}</span>
                            </div>
                        </div>

                        <div style="display: flex;margin-left: 10px;margin-right: 10px;">
                            <v-card-text style="font-size: 18px;">
                                <div style="margin-bottom: 15px;">
                                    <label for="offer_CODE">ເລກທີໃບສ:</label>
                                    <span id="offer_CODE">{{ offer_CODE }}</span>
                                </div>

                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="description">ລາຍລະອຽດ:</label>
                                    <span id="description">{{ description }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="offerManName">ຜູ້ສະເໜີ:</label>
                                    <span id="offerManName">{{ offerManName }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="job">ໜ້າທີ່ຮັບຜິດຊອບ:</label>
                                    <span id="job">{{ job }}</span>
                                </div>
                            </v-card-text>
                            <v-card-text style="font-size: 18px;">
                                <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                                <div style="margin-bottom: 10px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name }}</span>
                                </div>


                                <label for="img">ຮູບພາບ:</label>
                                <div>

                                    <img :src="img" style="width: 300px; height: 310px;">

                                </div>
                            </v-card-text>

                        </div>
                        <div style="padding-top:10px;margin-top: 80px;margin-bottom: 120px;">
                            <table
                                style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%; font-size:12px">
                                <tr style="padding:5px;border: 0.5px solid #999;font-size: 18px;font-weight: bold;">
                                    <td style="border: 0.5px solid #999;padding:5px">ເລກທີໃບສ້າງໃບບິນ</td>

                                    <td style="border: 0.5px solid #999;padding:5px">ອາໄລ</td>



                                    <td style="border: 0.5px solid #999;padding:5px">ລາຍລະອຽດ</td>

                                    <td style="border: 0.5px solid #999;padding:5px">ຊື່ຜູ້ສະເໜີ</td>
                                    <td style="border: 0.5px solid #999;padding:5px">ໜ້າທີ່ຮັບຜິດຊອບ</td>

                                    <td style="border: 0.5px solid #999;padding:5px">ຈໍານວນ</td>
                                    <td style="border: 0.5px solid #999;padding:5px">ລາຄາຕໍ່ອັນ</td>
                                    <td style="border: 0.5px solid #999;padding:5px">ລາຄາລວມ</td>

                                    <td style="border: 0.5px solid #999;padding:5px">ວັນທີສ້າງໃບບິນ</td>

                                </tr>
                                <tr style="padding:5px;border: 0.5px solid #999;font-size: 18px;">

                                    <td style="border: 0.5px solid #999;padding:5px">{{ offer_CODE }} </td>



                                    <td style="border: 0.5px solid #999;padding:5px">{{ item_name }} </td>



                                    <td style="border: 0.5px solid #999;padding:5px">{{ description }} </td>
                                    <td style="border: 0.5px solid #999;padding:5px">{{ offerManName }} </td>
                                    <td style="border: 0.5px solid #999;padding:5px">{{ job }} </td>

                                    <td style="border: 0.5px solid #999;padding:5px">{{ qty_offer }} </td>
                                    <td style="border: 0.5px solid #999;padding:5px">{{ unit_price }} </td>
                                    <td style="border: 0.5px solid #999;padding:5px">{{ totalMoney }} </td>

                                    <td style="border: 0.5px solid #999;padding:5px">{{ dateCreate }} </td>


                                </tr>

                            </table>
                        </div>
                        <div style="width: 100%; margin: 0 auto;">
                            <div style="display: flex; justify-self: center;">
                                <div
                                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                                    <div>APPROVED BY</div>
                                    <div>ຜູ້ອະນຸມັດ</div>
                                    <div style="height: 50px;"></div>
                                    <div style="display:flex;justify-content:space-between">
                                        ...............................
                                    </div>
                                </div>
                                <div
                                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                                    <div>APPROVED BY KKL</div>
                                    <div>ຜູ້ອະນຸມັດ</div>
                                    <div style="height: 50px;"></div>
                                    <div style="display:flex;justify-content:space-between">
                                        ...............................
                                    </div>
                                </div>
                            </div>
                        </div>

                    </v-col>
                </v-row>
            </div>
        </div>



    </div>

</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            truct_footer_data_list: [],
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            f_CARD_NO: '',
            cars_list: [],
            item_id: '',
            sumFooter: '',
            hkey_id: '',
            dialogVisible: false,
            shopName: '',
            fkey_id: '',
            job: '',
            qty_offer: 0,
            unit_price: 0,
            totalMoney: 0,

            unit_price: '',
            img: '',
            qty_offer: '',
            totalMoney: '',
            description: '',
            offerManName: '',
            job: '',
            f_CARD_NO: '',
            item_name: '',
            dateCreate: '',
            offer_CODE: '',
            invoiceData: null, // Initialize invoiceData as null
            totalMoneyFormatted:'',
            Mechanicequipment: [],
            show_list: [],
            h_VICIVLE_NUMBER: '',
            number: '',
            // Other data properties...
            search: '',
            truck_table_headers: [
                { text: 'ລາຄາໜ້າຈໍານວນ', value: 'unit_price' },
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ໜ້າຈໍານວນ', value: 'qty_offer' },
                { text: 'ລາຄາລວມ', value: 'totalMoney' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ຊື່ຜູ້ສະເໜີ', value: 'offerManName' },
                { text: 'ອາຊີບ', value: 'job' },
                { text: 'ລຳດັບຍ້າຍລົດ', value: 'f_CARD_NO' },
                { text: 'ລຳດັບລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຊື່ສິ່ງທີ່ສະເໜີລຶບ', value: 'item_name' },
                { text: 'ວັນທີສ້າງໃບບິນ', value: 'dateCreate' },
                { text: 'ເລກທີໃບສ້າງໃບບິນ', value: 'offer_CODE' },
                { text: 'ສະທານະ', value: 'status' },



            ],
            truck_data_list: [],

            totalMoney: null, // Initialize totalMoney
            apiResponse: {} // Placeholder for your API response
        };
    },
    computed: {
        filteredItems() {
            if (!Array.isArray(this.truck_data_list)) {
                return [];
            }
            return this.truck_data_list.filter(item => item.statusPO === 'NO');
        },
     
    },
    methods: {
        askBeforeDeleteCusInfo(itemId) {
            // Handle delete action
        },
        calculateTotalMoney() {
            this.totalMoney = this.qty_offer * this.unit_price;
        },
        getStatusClass(status) {
            return status === 'N' ? 'red' : 'green';
        },
        getStatusText(status) {
            return status === 'Y' ? 'ຈ່າຍເເລ້ວ' : 'ຍັງບໍ່ຈ່າຍ';
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
        onGetDataListForPrint(keyId) {
            // Placeholder method for fetching data for printing
            console.log('Fetching data for printing with keyId:', keyId);
            // Add your logic here to fetch the data for printing
        },

        onGetMechanicequipment(item_id) {
            console.log(item_id);

            let data = this.Mechanicequipment.filter((el) => el.item_id === item_id);
            console.log('head:', data);
            this.itemName = data[0]?.itemName;
            this.item_id = item_id;

        },
        onGetCarDetails(id) {
            console.log(id);

            let data = this.cars_list.filter((el) => el.key_id === id);
            console.log('head:', data);
            this.h_VICIVLE_NUMBER = data[0]?.h_VICIVLE_NUMBER;
            this.h_ID = id;
        },
        onGetTructFooterDetail(key_id) {
            let data = this.truct_footer_data_list.filter((el) => el.fkey_id === key_id);
            console.log("back:", data);
            this.f_CARD_NO = data[0]?.f_CARD_NO;
            this.fkey_id = key_id;

            // Set other data properties as needed
        },
        onGetshow(shop_id) {
            console.log(shop_id);

            let data = this.show_list.filter((el) => el.shop_id === shop_id); // Use id parameter instead of shop_id
            console.log('head:', data);
            this.shop_name = data[0]?.shop_name;
            this.shop_id = shop_id; // Assign id to skey_id

            // Set other data properties as needed
        },

        async onGetinbox(offerCode) {
            try {
                const response = await this.$axios.$post('/showofferpaperDetail.service', {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: offerCode,
                });

                console.log('Print API response:', response);

                // Update your data properties with the response data
                this.offer_CODE = response.data[0].offer_CODE;
                this.unit_price = response.data[0].unit_price;
                this.qty_offer = response.data[0].qty_offer;
                this.totalMoney = response.data[0].totalMoney;
                this.description = response.data[0].description;
                this.offerManName = response.data[0].offerManName;
                this.h_VICIVLE_NUMBER = response.data[0].h_VICIVLE_NUMBER;
                this.item_name = response.data[0].item_name;
                this.img = response.data[0].img;
                this.dateCreate = response.data[0].dateCreate;
                this.shopName = response.data[0].shopName;
                this.status = response.data[0].status;
                this.stock_status = response.data[0].stock_status;
                this.statusPO = response.data[0].statusPO;
                this.job = response.data[0].job;
                this.item_id = response.data[0].item_id;

                // Open the dialog after API call success
                this.openDialog(this.offer_CODE);

                this.sumFooter = response.sumFooter;

            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
            }
        },

        openDialog(offerCode) {
            this.offerCode = offerCode;
            this.dialogVisible = true;
        },

        closeDialog() {
            this.dialogVisible = false;
        },

        onPrint() {
            // Clone the modal content
            const modal = document.getElementById("modalInvoice");
            const cloned = modal.cloneNode(true);
            this.isPrintClicked = true;
            // Create a new section for printing
            let section = document.getElementById("print");
            if (!section) {
                section = document.createElement("div");
                section.id = "print";
                document.body.appendChild(section);
            }

            // Clear existing content and append the cloned modal
            section.innerHTML = "";
            section.appendChild(cloned);

            // Print the content
            window.print();
        },

        async onGetTruckFooter() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('listViciclefooterCombo1.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('all_truck_footer_list:', data);
                if (!data || !data.data) {
                    this.truct_footer_data_list = [];
                } else {
                    this.truct_footer_data_list = data.data;
                }
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetTruckList() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('listVicicleHeaderCombo1.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('truck_list:', data?.data);
                this.cars_list = data?.data || [];
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        showErrorAlert(title, message) {
            swal.fire({
                title: title,
                text: message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        },
        onGetrepImage(file) {
            if (file) {
                this.url = URL.createObjectURL(this.img)
                console.log(this.url)
            } else {
                this.url = null
            }
        },
        async onGetadd() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('ListItems.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('itemName:', data?.data);
                this.Mechanicequipment = data?.data || [];
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
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
        async onGetLeaveNumber() {
            try {
                const response = await this.$axios.$post('/gencodeofferpaper.service');
                console.log("inv:", response);
                if (response?.status === '00') {
                    const offerCode = response.data[0]?.offer_CODE;
                    this.onCreateReports(offerCode, this.fkey_id); // Pass fkey_id parameter here
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
                        confirmButtonText: 'OK',
                    });

                }
            } catch (error) {
                console.log(error);

            }
        },

        async onCreateReports(offerCode) {
            try {
                this.loading_processing = true;
                const data = {
                    item_id: this.item_id, // Assuming item_id is accessible in this component
                    header_id: this.h_ID, // Assuming h_VICIVLE_NUMBER is accessible in this component
                    footer_id: this.fkey_id, // Assuming fkey_id is accessible in this component
                    shop_id: this.shop_id, // Assuming h_VICIVLE_NUMBER is accessible in this component
                    unit_price: this.unit_price,
                    qty_offer: this.qty_offer, // Assuming number is accessible in this component
                    totalMoney: this.totalMoney,
                    description: this.description,
                    offerManName: this.offerManName,
                    job: this.job,
                    offer_CODE: offerCode,
                    toKen: localStorage.getItem('toKen'),

                };
                console.log("send:", data);

                const response = await this.$axios.$post('/saveofferpaper.service', data);
                console.log("createReport:", response);

                if (response?.status === '00') {
                    this.loading_processing = false;
                    // this.print();
                    // Other actions upon successful creation
                    this.onGetshowdata_table();

                }
            } catch (error) {
                console.log(error);

                this.loading_processing = false;
            }
        },
        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showofferpaper.service', {
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



        async onGetDatsForPrint(key, cusName, cusId) {
            this.cusName = cusName;
            this.cusId = cusId;
            this.loading_processing = true;

            const data = {
                billNo: key,
                toKen: localStorage.getItem("toKen")
            };

            try {
                const response = await this.$axios.$post('/PintInvoiceByNo.service', data);

                if (response?.status === '00') {
                    console.log("dataForprint:", response);
                    // Check if these properties exist before accessing them
                    if (response.headerPrint && response.headerPrint.length > 0) {
                        this.data_header_print = response.headerPrint[0];
                    }
                    if (response.data) {
                        this.data_for_print = response.data;
                    }
                    if (response.sumTotal && response.sumTotal.length > 0) {
                        this.sum_total_print = response.sumTotal[0];
                    }
                    setTimeout(() => {
                        this.print();
                    }, 1000);
                } else {
                    // Handle scenarios where status is not '00'
                    console.error('Unexpected response status:', response?.status);
                }
            } catch (error) {
                // More robust error handling
                console.error('Error fetching print data:', error);
                // Handle specific error scenarios here if needed
            } finally {
                // Ensure loading state is turned off in both success and error scenarios
                this.loading_processing = false;
            }
        }



        // Other methods...

    },

    mounted() {
        this.onGetadd(); // Fetch truck footer data when component is mounted
        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
        this.onGetaddshow(); // Fetch truck footer data when component is mounted
        this.onGetTruckFooter(); // Fetch truck footer data when component is mounted
        this.onGetTruckList(); // Fetch truck footer data when component is mounted
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


.v-divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

.phoum10 {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 150px;
}

.center-btn {
    display: flex;
    justify-content: center;
}
</style>
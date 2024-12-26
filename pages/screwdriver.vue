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
                <!-- 
            NOTE: @change="applyFilters" will now call our 
            newly-created applyFilters() method in methods 
          -->
                <v-select dense outlined v-model="selectedShop" :items="uniqueShops" label="ຮ້ານ"
                    placeholder="Choose a shop" @change="applyFilters"></v-select>
            </div>

            <v-row justify="start">
                <v-btn class="mr-4 mt-5 ml-5" width="130" color="success" @click="onGetshowdata_tablev2">
                    ຄົ້ນຫາ
                </v-btn>
            </v-row>
            <!-- <v-row justify="end">
                <v-btn color="#f593b3" class="white--text" @click="print">
                    <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                </v-btn>
            </v-row> -->
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
                            border: '1px solid rgb(221, 5, 245)',
                        }" @click="setCurrency('USD')">
                            USD
                        </v-btn>
                        <v-btn :style="{
                            marginLeft: '1px',
                            marginRight: '1px',
                            backgroundColor: selectedCurrency === 'LAK' ? 'red' : 'white',
                            color: selectedCurrency === 'LAK' ? 'white' : 'black',
                            border: '1px solid rgb(221, 5, 245)',
                        }" @click="setCurrency('LAK')">
                            LAK
                        </v-btn>
                        <v-btn :style="{
                            marginLeft: '1px',
                            marginRight: '1px',
                            backgroundColor: selectedCurrency === 'THB' ? 'red' : 'white',
                            color: selectedCurrency === 'THB' ? 'white' : 'black',
                            border: '1px solid rgb(221, 5, 245)',
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
                            <td>
                                <v-btn small color="primary" class="card-shadow"
                                    @click="onGetinbox(row.item.offer_CODE)"><v-icon>mdi-printer</v-icon>ລາຍລະອຽດ</v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </div>
        <v-dialog v-model="dialogVisible" max-width="800px" style="max-height: 800px;">
            <v-card>
                <v-card-title style="font-size: 24px;">ປ້ອນຂໍ້ມູນ</v-card-title>
                <v-card-title class="huakhr">

                    <div>

                        <span id="shopName">{{ shopName }}</span>
                    </div>
                    <div>
                        <label for="offerManName">ຜູ້ສະເໜີ:</label>
                        <span id="offerManName">{{ offerManName }}</span>
                    </div>
                    <div>
                        <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                        <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                    </div>
                    <div>
                        <label for="offer_CODE">offer_CODE:</label>
                        <span id="offer_CODE">{{ offer_CODE }}</span>
                    </div>
                </v-card-title>
                <v-card-title>
                    <label for="description">ລາຍລະອຽດ:</label>
                    <span id="description">{{ description }}</span>
                </v-card-title>
                <v-card-actions>
                    <v-btn style="font-size: 20px;" color="primary" @click="onPrint">
                        <v-icon>mdi-printer</v-icon>ພິມບິນ
                    </v-btn>
                </v-card-actions>
                <div style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">

                        <div>
                            <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price">{{ unit_price }}</span>
                        </div>

                        <div>
                            <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer">{{ qty_offer }}</span>
                        </div>
                        <div>
                            <label for="totalMoney">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney">{{ totalMoney }}</span>
                        </div>


                    </v-card-text>

                    <v-card-text style="font-size: 18px;">


                        <div>
                            <label for="item_name">ອາໄລ ຊື່:</label>
                            <span id="item_name">{{ item_name }}</span>
                        </div>


                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img" style="width: 150px; height: 160px;">
                        </div>

                    </v-card-text>

                </div>

                <div v-if="item_name1 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ1:</label>
                            <span id="unit_price1">{{ unit_price1 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer1 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney1 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name1 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img1" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>
                <div v-if="item_name2 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ2:</label>
                            <span id="unit_price1">{{ unit_price2 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer2 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney2 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name2 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img2" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>
                <div v-if="item_name3 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ3:</label>
                            <span id="unit_price1">{{ unit_price3 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer3 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney3 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name3 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img3" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>

                <div v-if="item_name4 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price1">{{ unit_price4 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer4 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney4 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name4 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img4" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>
                <div v-if="item_name5 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price1">{{ unit_price5 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer5 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney5 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name5 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img5" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>
                <div v-if="item_name6 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price1">{{ unit_price6 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer6 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney6 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name6 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img6" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>
                <div v-if="item_name7 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price1">{{ unit_price7 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer7 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney7 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name7 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img7" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>
                <div v-if="item_name8 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price1">{{ unit_price8 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer8 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney8 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name8 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img8" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>
                <div v-if="item_name9 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="unit_price1">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price1">{{ unit_price9 }}</span>
                        </div>


                        <div>
                            <label for="qty_offer1">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer1">{{ qty_offer9 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney9 }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="item_name1">ອາໄລ ຊື່:</label>
                            <span id="item_name1">{{ item_name9 }}</span>
                        </div>
                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img9" style="width: 150px; height: 160px;">
                        </div>
                    </v-card-text>
                </div>

                <v-card-actions style="margin-right: auto;">
                    <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <label for="dateCreate">ວັນທີສ້າງ:</label>
                    <span id="dateCreate">{{ dateCreate }}</span>
                </v-card-actions>

            </v-card>
        </v-dialog>
        <div style="display:none">
            <div id="modalInvoice">
                <v-row>
                    <v-col>
                        <Notiv2 />
                        <div class="text-center"
                            style="display:flex;justify-content:center;font-size:25px;font-weight:bold;margin-top: 10px;margin-left: ">
                            ລາຍງານອາໄລ</div>
                        <div style="font-size: 18px;font-weight: bold;margin-top: 80px;margin-bottom: 50px;">

                            <div>
                                <label for="dateCreate">ວັນທີສ້າງ:</label>
                                <span id="dateCreate">{{ dateCreate
                                    }}</span>
                            </div>

                            <div>
                                <label for="shopName">ຊື່ຮ້ານ:</label>
                                <span id="shopName">{{ shopName?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }}</span>
                            </div>

                            <div>
                                <label for="moneyRate">ເລດ:</label>
                                <span id="moneyRate">{{ moneyRate?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }}</span>
                            </div>
                            <div>
                                <label for="currency">ສະກຸນເງິນ:</label>
                                <span id="currency">{{ currency }}</span>
                            </div>
                        </div>

                        <div style="display: flex;justify-content: space-between;margin-bottom: 20px;">
                            <div style="margin-bottom: 15px;">
                                <label for="offer_CODE">ເລກທີໃບສ:</label>
                                <span id="offer_CODE">{{ offer_CODE?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="offerManName">ຜູ້ສະເໜີ:</label>
                                <span id="offerManName">{{
                                    offerManName?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',')
                                }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="job">ໜ້າທີ່ຮັບຜິດຊອບ:</label>
                                <span id="job">{{ job?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
                            </div>
                        </div>


                        <div style="margin-bottom: 25px;justify-self: center;">
                            <label for="description">ລາຍລະອຽດ</label>
                            <span id="description">{{ description?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}</span>
                        </div>

                        <div
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>

                        <div v-if="item_name1 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img1" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name1?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer1?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price1?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney1?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>

                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>


                        <div v-if="item_name2 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img2" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name3 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img3" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name3?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer3?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price3?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney3?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>

                        <div v-if="item_name4 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img4" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name4?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer4?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price4?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney4?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name5 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img5" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name5?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer5?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price5?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney5?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name6 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img6" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name6?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer6?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price6?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney6?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name7 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img7" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name7?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer7?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price7?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney7?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name8 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img8" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name8?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer8?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price8?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney8?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name9 !== 'null'"
                            style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                            <label for="img">ຮູບພາບ:</label>
                            <div>
                                <img :src="img9" style="width: 100px; height: 100px;margin-top: -20px;">
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="item_name">ອາໄລ ຊື່:</label>
                                <span id="item_name">{{ item_name9?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                <span id="qty_offer">{{ qty_offer9?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                <span id="unit_price">{{ unit_price9?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                <span id="totalMoney">{{ totalMoney9?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</span>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>

                        <div style="margin-bottom: 15px;margin-top: 20px;justify-self: end;">
                            <label for="real_totalMoney">ລາຄາ ໝວມທັງໝົດບີນ:</label>
                            <span id="real_totalMoney" style="text-decoration: underline;font-size: 28px;">{{
                                real_totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
                        </div>

                        <!-- <div style="width: 100%; margin: 0 auto;">
                            <div style="display: flex; justify-self: center;">
                                <div
                                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">

                                    <div>ຜູ້ສະເໜີ</div>
                                    <div style="height: 50px;"></div>
                                    <div style="display:flex;justify-content:space-between">
                                        ...............................
                                    </div>
                                </div>
                                <div
                                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">

                                    <div>ຜູ້ຄຸມງານ</div>
                                    <div style="height: 50px;"></div>
                                    <div style="display:flex;justify-content:space-between">
                                        ...............................
                                    </div>
                                </div>
                                <div
                                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">

                                    <div>ໜ່ວຍກວດກາ</div>
                                    <div style="height: 50px;"></div>
                                    <div style="display:flex;justify-content:space-between">
                                        ...............................
                                    </div>
                                </div>
                                <div
                                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">

                                    <div>ອໍານວຍຍການບໍລີສັດ ຄູນຄໍາ</div>
                                    <div style="height: 50px;"></div>
                                    <div style="display:flex;justify-content:space-between">
                                        ...............................
                                    </div>
                                </div>
                            </div>
                        </div> -->

                    </v-col>
                </v-row>
            </div>
        </div>
        <!-- <div style="display:none">
            <div id="modalInvoice">
                <Noti />
                <v-row
                    style="font-size:14px;margin-left: 50px;margin-top: 10px;display:flex;justify-content:start;flex-direction:column;align-items:start">
                    <div>
                        <span>ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ,
                            ສະໜາມກີລາກອງທັບ,</span>
                        <span> ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ,
                            ສປປ ລາວ</span>
                        <span>ໂທລະສັບ: 020 92661111, 020 92 254 999 </span>
                        <span> ອີເມວ: kounkham@Mining|ເວັບໄຊ: kounkham</span>
                    </div>
                </v-row>
                <div class="text-center"
                    style="display:flex;justify-content:center;font-size:20px;font-weight:bold;margin-top: 10px;">
                    ລາຍງານອາໄລ
                </div>
                <div style="margin-top: 20px;">
                    <table
                        style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px">
                        <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ລຳດັບ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ລະຫັດບິນ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ລະຫັດບິນ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ຊື່
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ຈໍານວນ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ເລດ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ລາຄາ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ຈ່າຍ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ຕິດນີ້
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ຊື່ຮ້ານ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ວັນເວລາສ້າງ
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                ສະກຸນເງິນ
                            </td>
                        </tr>
                        <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                            v-for="(item, i) in filteredItems" :key="i">
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                                class="font-weight-bold">
                                {{ i + 1 }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{ item?.offer_CODE }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{ item?.pocode }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{ item?.item_name }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{ item?.qty_offer }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{
                                    item?.moneyRate?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{
                                    item?.total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{
                                    item?.paid?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{
                                    item?.tid?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{ item?.shop_name }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{
                                    item?.offerDate?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{
                                    item?.dateCreatePO?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                            </td>
                            <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                                class="font-weight-bold">
                                {{
                                    item?.cur?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                            </td>
                        </tr>
                    </table>

                    <div v-if="loading_processing">Loading...</div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,

            payDateMenu: '',
            payDate: '',
            formattedpaytDate: '',

            // Removed `applyFilters: ''` from data
            // because we will define it as a method

            selectedShop: null,
            selectedCurrency: null,
            filter: null,

            show_list: [],
            truck_data_listv2: [],
            selectedItems: [],
            search: '',
            formattedtotalmoneyRate: '',
            formattedcreate: '',
            create: '',
            createMenu: '',
            updatecreate: '',
            allinve: '',
            // Default currency
            selectedCurrency: '',
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
                { text: 'ສະກຸນເງິນ', value: 'cur' },
            ],
            totalTid: '',
            changkip: '',
            formattedKip: '',
            formattedtotalTid: '',
            moneyRate: '',

            loading_processing: false,
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            startDateMenu: null,
            endDateMenu: null,
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
            const shopNames = this.truck_data_listv2.map((item) => item.shop_name);
            return [...new Set(shopNames)];
        },
        shopOptions() {
            return this.show_list.map((shop) => ({
                shop_id: shop.shop_id,
                shop_name: shop.shop_name || 'Unnamed Shop',
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
            const total = parseFloat(this.totalTid) || 0;
            const moneyRate = parseFloat(this.formattedtotalmoneyRate) || 0;
            this.changkip = total * moneyRate;
            this.formattedKip = this.changkip
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        filteredItems() {
            return this.truck_data_listv2.filter((item) => {
                const matchesShop = this.selectedShop
                    ? item.shop_name === this.selectedShop
                    : true;
                const matchesStatus = this.filter ? item.statusNy === this.filter : true;
                const matchesCurrency = this.selectedCurrency
                    ? item.cur === this.selectedCurrency
                    : true;
                return matchesShop && matchesStatus && matchesCurrency;
            });
        },
    },
    methods: {
        // 1) Provide a real method for @change="applyFilters"
        applyFilters() {
            // In this case, the actual filtering logic happens 
            // automatically in our computed property filteredItems(), 
            // so we might just want to log or do additional stuff here:
            console.log('applyFilters: selectedShop =', this.selectedShop);
        },

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
            this.selectedItems = [];
            this.updateTotalTid();
        },
        updateTotalTid() {
            if (!Array.isArray(this.selectedItems)) {
                this.selectedItems = [];
            }
            this.totalTid = this.selectedItems.reduce((sum, item) => {
                return sum + (item.tid ? parseFloat(item.tid) : 0);
            }, 0);
            this.formattedtotalTid = this.totalTid
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            // Example if you also wanted a sum of moneyRate:
            // const totalMoneyRate = this.selectedItems.reduce((sum, item) => {
            //   return sum + (item.moneyRate ? parseFloat(item.moneyRate) : 0);
            // }, 0);
            // this.formattedtotalmoneyRate = totalMoneyRate
            //   .toFixed(2)
            //   .toString()
            //   .replace(/\B(?=(\d{3})+(?!\d))/g, '');
        },
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
                    this.truck_data_listv2 = [];
                }
            } catch (error) {
                console.error('API error:', error);
                this.truck_data_listv2 = [];
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
                    // handle error
                }
            } catch (error) {
                console.error('Payment API error:', error);
            }
            // Force a page reload or fetch new data
            window.location.reload();
        },
        // print() {
        //     const modal = document.getElementById('modalInvoice');
        //     const cloned = modal.cloneNode(true);
        //     let section = document.getElementById('print');
        //     if (!section) {
        //         section = document.createElement('div');
        //         section.id = 'print';
        //         document.body.appendChild(section);
        //     }
        //     section.innerHTML = '';
        //     section.appendChild(cloned);
        //     window.print();
        // },
        async onGetshow_item_data_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showofferpaper.service', {
                    toKen: localStorage.getItem('toKen'),
                });
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
            }
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
                this.unit_price1 = response.data[0].unit_price1;
                this.unit_price2 = response.data[0].unit_price2;
                this.unit_price3 = response.data[0].unit_price3;
                this.unit_price4 = response.data[0].unit_price4;
                this.unit_price5 = response.data[0].unit_price5;
                this.unit_price6 = response.data[0].unit_price6;
                this.unit_price7 = response.data[0].unit_price7;
                this.unit_price8 = response.data[0].unit_price8;
                this.unit_price9 = response.data[0].unit_price9;
                this.qty_offer1 = response.data[0].qty_offer1;
                this.qty_offer = response.data[0].qty_offer;
                this.qty_offer2 = response.data[0].qty_offer2;
                this.qty_offer3 = response.data[0].qty_offer3;
                this.qty_offer4 = response.data[0].qty_offer4;
                this.qty_offer5 = response.data[0].qty_offer5;
                this.qty_offer6 = response.data[0].qty_offer6;
                this.qty_offer7 = response.data[0].qty_offer7;
                this.qty_offer8 = response.data[0].qty_offer8;
                this.qty_offer9 = response.data[0].qty_offer9;
                this.totalMoney = response.data[0].totalMoney;
                this.real_totalMoney = response.data[0].real_totalMoney;
                this.totalMoney1 = response.data[0].totalMoney1;
                this.totalMoney2 = response.data[0].totalMoney2;
                this.totalMoney3 = response.data[0].totalMoney3;
                this.totalMoney4 = response.data[0].totalMoney4;
                this.totalMoney5 = response.data[0].totalMoney5;
                this.totalMoney6 = response.data[0].totalMoney6;
                this.totalMoney7 = response.data[0].totalMoney7;
                this.totalMoney8 = response.data[0].totalMoney8;
                this.totalMoney9 = response.data[0].totalMoney9;
                this.description = response.data[0].description;
                this.offerManName = response.data[0].offerManName;
                this.h_VICIVLE_NUMBER = response.data[0].h_VICIVLE_NUMBER;
                this.item_name = response.data[0].item_name;
                this.item_name1 = response.data[0].item_name1;
                this.item_name2 = response.data[0].item_name2;
                this.item_name3 = response.data[0].item_name3;
                this.item_name4 = response.data[0].item_name4;
                this.item_name5 = response.data[0].item_name5;
                this.item_name6 = response.data[0].item_name6;
                this.item_name7 = response.data[0].item_name7;
                this.item_name8 = response.data[0].item_name8;
                this.item_name9 = response.data[0].item_name9;
                this.img = response.data[0].img;
                this.img1 = response.data[0].img1;
                this.img2 = response.data[0].img2;
                this.img3 = response.data[0].img3;
                this.img4 = response.data[0].img4;
                this.img5 = response.data[0].img5;
                this.img6 = response.data[0].img6;
                this.img7 = response.data[0].img7;
                this.img8 = response.data[0].img8;
                this.img9 = response.data[0].img9;
                this.moneyRate = response.data[0].moneyRate;
                this.dateCreate = response.data[0].dateCreate;
                this.shopName = response.data[0].shopName;
                this.currency = response.data[0].currency;
                this.status = response.data[0].status;
                this.stock_status = response.data[0].stock_status;
                this.statusPO = response.data[0].statusPO;
                this.job = response.data[0].job;
                this.item_id = response.data[0].item_id;
                this.item_id1 = response.data[0].item_id1;
                this.item_id2 = response.data[0].item_id2;
                this.item_id3 = response.data[0].item_id3;
                this.item_id4 = response.data[0].item_id4;
                this.item_id5 = response.data[0].item_id5;
                this.item_id6 = response.data[0].item_id6;
                this.item_id7 = response.data[0].item_id7;
                this.item_id8 = response.data[0].item_id8;
                this.item_id9 = response.data[0].item_id9;

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
        async onPrint() {
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
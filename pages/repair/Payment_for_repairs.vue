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
                <div style="display: flex;">
                    <!-- //item// -->
                    <div style="display: flex;">
                        <div style="width:100%;" class="pl-2">
                            <v-select outlined dense label="ເລືອກ ອຸປະກອນ" :items="Mechanicequipment"
                                item-text="itemName" item-value="item_id" @change="onGetMechanicequipment">
                            </v-select>

                        </div>
                        <div style="width:100%;" class="d-flex align-center pl-2">
                            <v-text-field label="*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer"
                                @input="calculateTotalMoney"></v-text-field>
                            <div class="tops"></div>
                        </div>
                        <div style="width:100%;" class="d-flex align-center pl-2">
                            <v-text-field label="*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                                v-model="unit_price" @input="calculateTotalMoney"></v-text-field>
                            <div class="tops"></div>
                        </div>

                        <div style="width:100%;" class="d-flex align-center pl-2">
                            <v-text-field label="*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                                v-model="totalMoney" readonly></v-text-field>
                            <div class="tops"></div>
                        </div>
                    </div>
                    <!-- //item// -->

                    <!-- //item1// -->
                    <div style="display: flex;">
                        <div style="width:100%;" class="pl-2">
                            <v-select outlined dense label="1:*ເລືອກ ອຸປະກອນ" :items="Mechanicequipment1"
                                item-text="itemName" item-value="item_id" @change="onGetMechanicequipment1">
                            </v-select>

                        </div>
                        <div style="width:100%;" class="d-flex align-center pl-2">
                            <v-text-field label="1:*ຈໍານວນ " dense outlined background-color="#f5f5f5"
                                v-model="qty_offer1" @input="calculateTotalMoney1"></v-text-field>
                            <div class="tops"></div>
                        </div>
                        <div style="width:100%;" class="d-flex align-center pl-2">
                            <v-text-field label="1:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                                v-model="unit_price1" @input="calculateTotalMoney1"></v-text-field>
                            <div class="tops"></div>
                        </div>
                        <div style="width:100%;" class="d-flex align-center pl-2">
                            <v-text-field label="1:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                                v-model="totalMoney1" readonly></v-text-field>
                            <div class="tops"></div>
                        </div>
                    </div>
                    <!-- //item1// -->

                </div>
                <!-- //item2// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="2:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment2"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment2">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="2:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer2"
                            @input="calculateTotalMoney2"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="2:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price2" @input="calculateTotalMoney2"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="2:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney2" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item2// -->
                <!-- //item3// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="3:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment3"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment3">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="3:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer3"
                            @input="calculateTotalMoney3"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="3:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price3" @input="calculateTotalMoney3"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="3:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney3" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item3// -->
                <!-- //item4// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="4:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment4"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment4">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="4:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer4"
                            @input="calculateTotalMoney4"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="4:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price4" @input="calculateTotalMoney4"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="4:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney4" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item4// -->
                <!-- //item5// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="5:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment5"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment5">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="5:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer5"
                            @input="calculateTotalMoney5"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="5:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price5" @input="calculateTotalMoney5"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="5:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney5" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item5// -->
                <!-- //item6// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="6:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment6"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment6">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="6:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer6"
                            @input="calculateTotalMoney6"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="6:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price6" @input="calculateTotalMoney6"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="6:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney6" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item6// -->

                <!-- //item7// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="7:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment7"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment7">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="7:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer7"
                            @input="calculateTotalMoney7"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="7:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price7" @input="calculateTotalMoney6"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="7:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney7" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item7// -->

                <!-- //item8// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="8:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment8"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment8">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="8:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer8"
                            @input="calculateTotalMoney8"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="8:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price8" @input="calculateTotalMoney8"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="8:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney8" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item8// -->

                <!-- //item9// -->

                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="9:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment9"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment9">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="9:*ຈໍານວນ " dense outlined background-color="#f5f5f5" v-model="qty_offer9"
                            @input="calculateTotalMoney9"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="9:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price9" @input="calculateTotalMoney9"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="9:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney9" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
                <!-- //item9// -->


                <!-- //item10// -->

                <!-- <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="10:ເລືອກ ອຸປະກອນ" :items="Mechanicequipment10"
                            item-text="itemName" item-value="item_id" @change="onGetMechanicequipment10">
                        </v-select>

                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="10:*ຈໍານວນ " dense outlined background-color="#f5f5f5"
                            v-model="qty_offer10" @input="calculateTotalMoney10"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="10:*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price10" @input="calculateTotalMoney10"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="10:*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney10" readonly></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div> -->
                <!-- //item10// -->



            </div>

            <div class="center-btn mt-10">
                <v-btn elevation="0" color="#448AFF" @click="onGetLeaveNumber">
                    <v-icon color="white">mdi-check</v-icon>
                    <span class="white--text">ບັນທຶກ</span>
                </v-btn>
            </div>

            <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="filteredItems" :search="search">
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

                <div  v-if="item_name4 !== 'null'"  style="display: flex;margin-left: 10px;margin-right: 10px;">
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
                <div  v-if="item_name5 !== 'null'"  style="display: flex;margin-left: 10px;margin-right: 10px;">
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
                <div  v-if="item_name6 !== 'null'"  style="display: flex;margin-left: 10px;margin-right: 10px;">
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
                <div  v-if="item_name7 !== 'null'"  style="display: flex;margin-left: 10px;margin-right: 10px;">
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
                <div  v-if="item_name8 !== 'null'"  style="display: flex;margin-left: 10px;margin-right: 10px;">
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
                <div  v-if="item_name9 !== 'null'"  style="display: flex;margin-left: 10px;margin-right: 10px;">
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

                        <div style="display: flex;justify-content: space-between;">
                            <div style="margin-bottom: 15px;">
                                <label for="offer_CODE">ເລກທີໃບສ:</label>
                                <span id="offer_CODE">{{ offer_CODE }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="offerManName">ຜູ້ສະເໜີ:</label>
                                <span id="offerManName">{{ offerManName }}</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label for="job">ໜ້າທີ່ຮັບຜິດຊອບ:</label>
                                <span id="job">{{ job }}</span>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;justify-self: center;">
                            <label for="description">ລາຍລະອຽດ:</label>
                            <span id="description">{{ description }}</span>
                        </div>

                        <div style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>

                        <div v-if="item_name1 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer1 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price1 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney1 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name1 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img1" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>

                        <div v-if="item_name2 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer2 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price2 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney2 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name2 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img2" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name3 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer3 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price3 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney3 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name3 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img3" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>

                        <div v-if="item_name4 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer4 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price4 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney4 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name4 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img4" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name5 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer5 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price5 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney5 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name5 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img5" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name6 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer6 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price6 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney6 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name6 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img6" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name7 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer7 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price7 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney7 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name7 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img7" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name8 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer8 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price8 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney8 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name8 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img8" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                        </div>
                        <div v-if="item_name9 !== 'null'" style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <div style="margin-bottom: 15px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer9 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price9 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney9 }}</span>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name9 }}</span>
                                </div>
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img9" style="width: 100px; height: 100px;margin-top: -20px;">
                                </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
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
            item_id1: '',
            // item_id: '',
            // item_id: '',
            // item_id: '',
            sumFooter: '',
            unit_price1: '0',
            qty_offer1: '0',
            hkey_id: '',
            dialogVisible: false,
            shopName: '',
            fkey_id: '',
            job: '',
            qty_offer: 0,
            unit_price: 0,
            totalMoney: '0',
            totalMoney1: 0,
            totalMoney2: 0,
            totalMoney3: 0,
            totalMoney4: 0,
            totalMoney5: 0,
            totalMoney6: 0,
            totalMoney7: 0,
            totalMoney8: 0,
            totalMoney9: 0,
            totalMoney10: 0,

            // item_id1:0,
            // item_id2:0,
            // item_id3:0,
            // item_id4:0,
            // item_id5:0,
            // item_id6:0,
            // item_id7:0,
            // item_id8:0,
            // item_id1:0,
            // item_id1:0,
            // item_id1:0,
            // item_id1:0,
            // item_id1:0,

            unit_price: '0',
            unit_price2: '0',
            unit_price3: '0',
            unit_price4: '0',
            unit_price5: '0',
            unit_price6: '0',
            unit_price7: '0',
            unit_price8: '0',
            unit_price9: '0',
            unit_price10: '0',
            img: '',
            img1: '',
            qty_offer: '0',

            qty_offer2: '0',
            qty_offer3: '0',
            qty_offer4: '0',
            qty_offer5: '0',
            qty_offer6: '0',
            qty_offer7: '0',
            qty_offer8: '0',
            qty_offer9: '0',
            qty_offer10: '0',


            description: '',
            offerManName: '',
            job: '',
            f_CARD_NO: '',
            item_name: '',
            dateCreate: '',
            offer_CODE: '',
            invoiceData: null, // Initialize invoiceData as null
            totalMoneyFormatted: '',
            Mechanicequipment: [],
            Mechanicequipment1: [],
            Mechanicequipment2: [],
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

            totalMoney: '0', // Initialize totalMoney
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
        calculateTotalMoney1() {

            this.totalMoney1 = this.qty_offer1 * this.unit_price1;
        },
        calculateTotalMoney2() {

            this.totalMoney2 = this.qty_offer2 * this.unit_price2;
        },
        calculateTotalMoney3() {

            this.totalMoney3 = this.qty_offer3 * this.unit_price3;
        },
        calculateTotalMoney4() {

            this.totalMoney4 = this.qty_offer4 * this.unit_price4;
        },
        calculateTotalMoney5() {

            this.totalMoney5 = this.qty_offer5 * this.unit_price5;
        },
        calculateTotalMoney6() {

            this.totalMoney6 = this.qty_offer6 * this.unit_price6;
        },
        calculateTotalMoney7() {

            this.totalMoney7 = this.qty_offer7 * this.unit_price7;
        },
        calculateTotalMoney8() {

            this.totalMoney8 = this.qty_offer8 * this.unit_price8;
        },
        calculateTotalMoney9() {

            this.totalMoney9 = this.qty_offer9 * this.unit_price9;
        },
        calculateTotalMoney10() {

            this.totalMoney10 = this.qty_offer10 * this.unit_price10;
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

            let data = this.Mechanicequipment.find((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data) {
                this.itemName = data.itemName;
                this.item_id = item_id;
                // this.img1 = data.img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id:', item_id);
            }
        },

        onGetMechanicequipment1(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment1.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName1 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id1 = item_id;
                this.img1 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        },
        onGetMechanicequipment2(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment2.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName2 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id2 = item_id;
                this.img2 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        },
        onGetMechanicequipment3(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment3.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName3 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id3 = item_id;
                this.img3 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        }, onGetMechanicequipment4(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment4.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName4 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id4 = item_id;
                this.img4 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        }, onGetMechanicequipment5(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment2.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName5 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id5 = item_id;
                this.img5 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        }, onGetMechanicequipment6(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment6.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName6 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id6 = item_id;
                this.img6 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        }, onGetMechanicequipment7(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment2.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName7 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id7 = item_id;
                this.img7 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        }, onGetMechanicequipment8(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment8.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName8 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id8 = item_id;
                this.img8 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        },
        onGetMechanicequipment9(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment9.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName9 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id9 = item_id;
                this.img9 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
        },
        onGetMechanicequipment10(item_id) {
            console.log(item_id);

            // Use item_id1 to filter Mechanicequipment1 array
            let data = this.Mechanicequipment10.filter((el) => el.item_id === item_id);
            console.log('head:', data);

            if (data.length > 0) {
                this.itemName10 = data[0].itemName; // Access itemName directly from the first item in the filtered data
                this.item_id10 = item_id;
                this.img10 = data[0].img; // Assuming 'img' is a property in your data structure
            } else {
                // Handle the case when data is not found
                console.error('Data not found for item_id1:', item_id);
            }
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
                this.dateCreate = response.data[0].dateCreate;
                this.shopName = response.data[0].shopName;
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
                this.Mechanicequipment1 = data?.data || [];
                this.Mechanicequipment2 = data?.data || [];
                this.Mechanicequipment3 = data?.data || [];
                this.Mechanicequipment4 = data?.data || [];
                this.Mechanicequipment5 = data?.data || [];
                this.Mechanicequipment6 = data?.data || [];
                this.Mechanicequipment7 = data?.data || [];
                this.Mechanicequipment8 = data?.data || [];
                this.Mechanicequipment9 = data?.data || [];
                this.Mechanicequipment10 = data?.data || [];
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
                    header_id: this.h_ID, // Assuming h_VICIVLE_NUMBER is accessible in this component
                    footer_id: this.fkey_id, // Assuming fkey_id is accessible in this component
                    shop_id: this.shop_id, // Assuming h_VICIVLE_NUMBER is accessible in this component
                    description: this.description,
                    offerManName: this.offerManName,
                    job: this.job,
                    offer_CODE: offerCode,
                    toKen: localStorage.getItem('toKen'),

                    item_id: this.item_id, // Assuming item_id is accessible in this component
                    unit_price: this.unit_price,
                    qty_offer: this.qty_offer, // Assuming number is accessible in this component
                    totalMoney: this.totalMoney,
                    itemName: this.itemName,
                    img: this.img,

                    item_id1: this.item_id1,// Assuming item_id is accessible in this component
                    unit_price1: this.unit_price1,
                    qty_offer1: this.qty_offer1, // Assuming number is accessible in this component
                    totalMoney1: this.totalMoney1,
                    item_name1: this.itemName1,
                    img1: this.img1,


                    item_id2: this.item_id2, // Assuming item_id is accessible in this component
                    unit_price2: this.unit_price2,
                    qty_offer2: this.qty_offer2, // Assuming number is accessible in this component
                    totalMoney2: this.totalMoney2,
                    item_name2: this.itemName2,
                    img2: this.img2,


                    item_id3: this.item_id3, // Assuming item_id is accessible in this component
                    unit_price3: this.unit_price3,
                    qty_offer3: this.qty_offer3, // Assuming number is accessible in this component
                    totalMoney3: this.totalMoney3,
                    item_name3: this.itemName3,
                    img3: this.img3,


                    item_id4: this.item_id4, // Assuming item_id is accessible in this component
                    unit_price4: this.unit_price4,
                    qty_offer4: this.qty_offer4, // Assuming number is accessible in this component
                    totalMoney4: this.totalMoney4,
                    item_name4: this.itemName4,
                    img4: this.img4,


                    item_id5: this.item_id5, // Assuming item_id is accessible in this component
                    unit_price5: this.unit_price5,
                    qty_offer5: this.qty_offer5, // Assuming number is accessible in this component
                    totalMoney5: this.totalMoney5,
                    itemName5: this.itemName5,
                    img5: this.img5,


                    item_id6: this.item_id6, // Assuming item_id is accessible in this component
                    unit_price6: this.unit_price6,
                    qty_offer6: this.qty_offer6, // Assuming number is accessible in this component
                    totalMoney6: this.totalMoney6,
                    item_name6: this.itemName6,
                    img6: this.img6,


                    item_id7: this.item_id7, // Assuming item_id is accessible in this component
                    unit_price7: this.unit_price7,
                    qty_offer7: this.qty_offer7, // Assuming number is accessible in this component
                    totalMoney7: this.totalMoney7,
                    item_name7: this.itemName7,
                    img7: this.img7,


                    item_id8: this.item_id8, // Assuming item_id is accessible in this component
                    unit_price8: this.unit_price8,
                    qty_offer8: this.qty_offer8, // Assuming number is accessible in this component
                    totalMoney8: this.totalMoney8,
                    item_name8: this.itemName8,
                    img8: this.img8,


                    item_id9: this.item_id9, // Assuming item_id is accessible in this component
                    unit_price9: this.unit_price9,
                    qty_offer9: this.qty_offer9, // Assuming number is accessible in this component
                    totalMoney9: this.totalMoney9,
                    item_name9: this.itemName9,
                    img9: this.img9,


                    item_id10: this.item_id10, // Assuming item_id is accessible in this component
                    unit_price10: this.unit_price10,
                    qty_offer10: this.qty_offer10, // Assuming number is accessible in this component
                    totalMoney10: this.totalMoney10,
                    item_name10: this.itemName10,
                    img10: this.img10,


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

.huakhr {
    display: flex;
    justify-self: end;
}

.center-btn {
    display: flex;
    justify-content: center;
}
</style>
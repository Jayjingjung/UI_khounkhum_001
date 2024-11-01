<template>
    <div>
        <v-btn ref="btn1" value="1" @click="selectedCard = '1'" @mouseover="changeColor('	#009fff', $refs.btn1)"
            @mouseleave="changeColor('white', $refs.btn1)"
            style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);">
            <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-filter-cog</v-icon>
            ນໍາເຂົ້າອາໄລ
        </v-btn>

        <v-btn ref="btn2" value="2" @click="selectedCard = '2'" @mouseover="changeColor('	#009fff', $refs.btn1)"
            @mouseleave="changeColor('white', $refs.btn1)"
            style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);">
            <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-printer</v-icon>
            ພິມບິນ
        </v-btn>
        <div v-if="selectedCard === '1'">
            <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
                <v-card-title style="background-color:#c69eed" class="white--text">
                    ນໍາເຂົ້າອາໄລ
                </v-card-title>

                <div style="margin-top: 10px;margin-left: 10px;margin-right: 10px;">
                    <div style="display: flex;">
                        <div style="width:100%;" class="pl-2">
                            <span>ເພີ້ມ ອຸປະກອນ:</span>
                        </div>
                    </div>
                </div>
                <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="filteredItems"
                    :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row?.item?.unit_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                            <td>{{ row?.item?.qty_offer?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.description?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.offerManName }}</td>
                            <td>{{ row?.item?.job }}</td>
                            <td>{{ row?.item?.f_CARD_NO }}</td>
                            <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                            <td>{{ row?.item?.item_name }}</td>
                            <td>{{ row?.item?.dateCreate }}</td>
                            <td>{{ row?.item?.offer_CODE }}</td>
                            <!-- <td :class="getStatusClass(row.item.status)">
                            {{ getStatusText(row.item.status) }}
                        </td> -->
                            <td>{{ row?.item?.stock_status }}</td>
                            <!-- <td>{{ row?.item?.statusPO }}</td> -->


                            <td>
                                <v-btn small color="primary" class="card-shadow"
                                    @click="onGetinbox(row.item.offer_CODE)">
                                    <v-icon>mdi mdi-archive-plus</v-icon>ນໍາເຂົ້າ
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>


                <!-- component for print  -->
                <v-dialog v-model="dialogVisible" max-width="400px">
                    <v-card>
                        <v-card-title style="font-size: 24px;">ປ້ອນຂໍ້ມູນ</v-card-title>
                        <v-card-title class="huakhr">
                            <v-card-actions>
                                <!-- <v-btn style="font-size: 20px;" color="primary" @click="onPrint">
                                <v-icon>mdi-printer</v-icon>ພິມບິນ
                            </v-btn> -->
                            </v-card-actions>
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



                                <div>
                                    <label for="size">ຂະນາດ</label>
                                    <span id="size">{{ size }}</span>
                                    <v-text-field label="*size" dense outlined background-color="#f5f5f5"
                                        v-model="size"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand">ຍີ່ຫໍ້</label>
                                    <span id="brand">{{ brand }}</span>
                                    <v-text-field label="*brand" dense outlined background-color="#f5f5f5"
                                        v-model="brand"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber">ເບີ</label>
                                    <span id="ber">{{ ber }}</span>
                                    <v-text-field label="*ber" dense outlined background-color="#f5f5f5"
                                        v-model="ber"></v-text-field>
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
                                <div>
                                    <label for="size1">ຂະນາດ</label>
                                    <span id="size1">{{ size1 }}</span>
                                    <v-text-field label="*size1" dense outlined background-color="#f5f5f5"
                                        v-model="size1"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand1">ຍີ່ຫໍ້</label>
                                    <span id="brand1">{{ brand1 }}</span>
                                    <v-text-field label="*brand1" dense outlined background-color="#f5f5f5"
                                        v-model="brand1"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber1">ເບີ</label>
                                    <span id="ber1">{{ ber1 }}</span>
                                    <v-text-field label="*ber1" dense outlined background-color="#f5f5f5"
                                        v-model="ber1"></v-text-field>
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
                                    <label for="qty_offer2">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer2">{{ qty_offer2 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney2 }}</span>
                                </div>

                                <div>
                                    <label for="size2">ຂະນາດ</label>
                                    <span id="size2">{{ size2 }}</span>
                                    <v-text-field label="*size2" dense outlined background-color="#f5f5f5"
                                        v-model="size2"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand2">ຍີ່ຫໍ້</label>
                                    <span id="brand2">{{ brand2 }}</span>
                                    <v-text-field label="*brand2" dense outlined background-color="#f5f5f5"
                                        v-model="brand2"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber2">ເບີ</label>
                                    <span id="ber2">{{ ber2 }}</span>
                                    <v-text-field label="*ber2" dense outlined background-color="#f5f5f5"
                                        v-model="ber2"></v-text-field>
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
                                    <label for="qty_offer3">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer3">{{ qty_offer3 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney3 }}</span>
                                </div>
                                <div>
                                    <label for="size3">ຂະນາດ</label>
                                    <span id="size3">{{ size3 }}</span>
                                    <v-text-field label="*size3" dense outlined background-color="#f5f5f5"
                                        v-model="size3"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand3">ຍີ່ຫໍ້</label>
                                    <span id="brand3">{{ brand3 }}</span>
                                    <v-text-field label="*brand3" dense outlined background-color="#f5f5f5"
                                        v-model="brand3"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber3">ເບີ</label>
                                    <span id="ber3">{{ ber3 }}</span>
                                    <v-text-field label="*ber3" dense outlined background-color="#f5f5f5"
                                        v-model="ber3"></v-text-field>
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
                                    <label for="qty_offer4">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer4">{{ qty_offer4 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney4 }}</span>
                                </div>
                                <div>
                                    <label for="size4">ຂະນາດ</label>
                                    <span id="size4">{{ size4 }}</span>
                                    <v-text-field label="*size4" dense outlined background-color="#f5f5f5"
                                        v-model="size4"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand4">ຍີ່ຫໍ້</label>
                                    <span id="brand4">{{ brand4 }}</span>
                                    <v-text-field label="*brand4" dense outlined background-color="#f5f5f5"
                                        v-model="brand4"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber4">ເບີ</label>
                                    <span id="ber4">{{ ber4 }}</span>
                                    <v-text-field label="*ber4" dense outlined background-color="#f5f5f5"
                                        v-model="ber4"></v-text-field>
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
                                    <label for="qty_offer5">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer5">{{ qty_offer5 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney5 }}</span>
                                </div>
                                <div>
                                    <label for="size5">ຂະນາດ</label>
                                    <span id="size5">{{ size5 }}</span>
                                    <v-text-field label="*size5" dense outlined background-color="#f5f5f5"
                                        v-model="size5"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand5">ຍີ່ຫໍ້</label>
                                    <span id="brand5">{{ brand5 }}</span>
                                    <v-text-field label="*brand5" dense outlined background-color="#f5f5f5"
                                        v-model="brand5"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber5">ເບີ</label>
                                    <span id="ber5">{{ ber5 }}</span>
                                    <v-text-field label="*ber5" dense outlined background-color="#f5f5f5"
                                        v-model="ber5"></v-text-field>
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
                                    <label for="qty_offer6">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer6">{{ qty_offer6 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney6 }}</span>
                                </div>

                                <div>
                                    <label for="size6">ຂະນາດ</label>
                                    <span id="size6">{{ size6 }}</span>
                                    <v-text-field label="*size6" dense outlined background-color="#f5f5f5"
                                        v-model="size6"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand6">ຍີ່ຫໍ້</label>
                                    <span id="brand6">{{ brand6 }}</span>
                                    <v-text-field label="*brand6" dense outlined background-color="#f5f5f5"
                                        v-model="brand6"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber6">ເບີ</label>
                                    <span id="ber6">{{ ber6 }}</span>
                                    <v-text-field label="*ber6" dense outlined background-color="#f5f5f5"
                                        v-model="ber6"></v-text-field>
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
                                    <label for="qty_offer7">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer7">{{ qty_offer7 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney7 }}</span>
                                </div>
                                <div>
                                    <label for="size7">ຂະນາດ</label>
                                    <span id="size7">{{ size7 }}</span>
                                    <v-text-field label="*size7" dense outlined background-color="#f5f5f5"
                                        v-model="size7"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand7">ຍີ່ຫໍ້</label>
                                    <span id="brand7">{{ brand7 }}</span>
                                    <v-text-field label="*brand7" dense outlined background-color="#f5f5f5"
                                        v-model="brand7"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber7">ເບີ</label>
                                    <span id="ber7">{{ ber7 }}</span>
                                    <v-text-field label="*ber7" dense outlined background-color="#f5f5f5"
                                        v-model="ber7"></v-text-field>
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
                                    <label for="qty_offer8">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer8">{{ qty_offer8 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney8 }}</span>
                                </div>
                                <div>
                                    <label for="size8">ຂະນາດ</label>
                                    <span id="size8">{{ size8 }}</span>
                                    <v-text-field label="*size8" dense outlined background-color="#f5f5f5"
                                        v-model="size8"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand8">ຍີ່ຫໍ້</label>
                                    <span id="brand8">{{ brand8 }}</span>
                                    <v-text-field label="*brand8" dense outlined background-color="#f5f5f5"
                                        v-model="brand8"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber8">ເບີ</label>
                                    <span id="ber8">{{ ber8 }}</span>
                                    <v-text-field label="*ber8" dense outlined background-color="#f5f5f5"
                                        v-model="ber8"></v-text-field>
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
                                    <label for="qty_offer9">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer9">{{ qty_offer9 }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney1">{{ totalMoney9 }}</span>
                                </div>
                                <div>
                                    <label for="size9">ຂະນາດ</label>
                                    <span id="size9">{{ size9 }}</span>
                                    <v-text-field label="*size9" dense outlined background-color="#f5f5f5"
                                        v-model="size9"></v-text-field>
                                </div>

                                <div>
                                    <label for="brand9">ຍີ່ຫໍ້</label>
                                    <span id="brand9">{{ brand9 }}</span>
                                    <v-text-field label="*brand9" dense outlined background-color="#f5f5f5"
                                        v-model="brand9"></v-text-field>
                                </div>

                                <div>
                                    <label for="ber9">ເບີ</label>
                                    <span id="ber9">{{ ber9 }}</span>
                                    <v-text-field label="*ber9" dense outlined background-color="#f5f5f5"
                                        v-model="ber9"></v-text-field>
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


                        <v-card-actions>
                            <label for="dateCreate">ວັນທີສ້າງ:</label>
                            <span id="dateCreate">{{ dateCreate }}</span>
                        </v-card-actions>

                        <v-card-actions>
                            <v-btn color="primary" @click="onSubmit">ນໍາເຂົ້າ</v-btn>
                            <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-card>
        </div>
        <div v-if="selectedCard === '2'">
            <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
                <v-card-title style="background-color:#a05de1" class="white--text">
                    ອາໄລທີນໍາເຂົ້າ ເເລ້ວ
                </v-card-title>
                <v-data-table :items-per-page="5" :headers="truck_table_headersv2" :items="filteredItemsv2"
                    :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row?.item?.unit_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                            <td>{{ row?.item?.qty_offer?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.description }}</td>
                            <td>{{ row?.item?.offerManName }}</td>
                            <td>{{ row?.item?.job }}</td>
                            <td>{{ row?.item?.f_CARD_NO }}</td>
                            <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                            <td>{{ row?.item?.item_name }}</td>
                            <td>{{ row?.item?.dateCreate }}</td>
                            <td>{{ row?.item?.offer_CODE }}</td>
                            <!-- <td :class="getStatusClass(row.item.status)">
                            {{ getStatusText(row.item.status) }}
                        </td> -->
                            <td>{{ row?.item?.stock_status }}</td>
                            <!-- <td>{{ row?.item?.statusPO }}</td> -->


                            <td>
                                <v-btn small color="primary" class="card-shadow"
                                    @click="onGetinboxv2(row.item.offer_CODE)">
                                    <v-icon>mdi mdi-archive-plus</v-icon>ນໍາເຂົ້າ
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </div>
        <v-dialog v-model="dialogVisiblev2" max-width="400px">
            <v-card>
                <v-card-title style="font-size: 24px;">ປ້ອນຂໍ້ມູນ</v-card-title>
                <v-card-title class="huakhr">
                    <v-card-actions>
                        <v-btn style="font-size: 20px;" color="primary" @click="onPrint">
                            <v-icon>mdi-printer</v-icon>ພິມບິນ
                        </v-btn>
                    </v-card-actions>
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



                        <div>
                            <label for="size">ຂະນາດ</label>
                            <span id="size">{{ size }}</span>

                        </div>

                        <div>
                            <label for="brand">ຍີ່ຫໍ້</label>
                            <span id="brand">{{ brand }}</span>

                        </div>

                        <div>
                            <label for="ber">ເບີ</label>
                            <span id="ber">{{ ber }}</span>

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
                        <div>
                            <label for="size1">ຂະນາດ</label>
                            <span id="size1">{{ size1 }}</span>

                        </div>

                        <div>
                            <label for="brand1">ຍີ່ຫໍ້</label>
                            <span id="brand1">{{ brand1 }}</span>

                        </div>

                        <div>
                            <label for="ber1">ເບີ</label>
                            <span id="ber1">{{ ber1 }}</span>

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
                            <label for="qty_offer2">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer2">{{ qty_offer2 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney2 }}</span>
                        </div>

                        <div>
                            <label for="size2">ຂະນາດ</label>
                            <span id="size2">{{ size2 }}</span>

                        </div>

                        <div>
                            <label for="brand2">ຍີ່ຫໍ້</label>
                            <span id="brand2">{{ brand2 }}</span>

                        </div>

                        <div>
                            <label for="ber2">ເບີ</label>
                            <span id="ber2">{{ ber2 }}</span>

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
                            <label for="qty_offer3">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer3">{{ qty_offer3 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney3 }}</span>
                        </div>
                        <div>
                            <label for="size3">ຂະນາດ</label>
                            <span id="size3">{{ size3 }}</span>

                        </div>

                        <div>
                            <label for="brand3">ຍີ່ຫໍ້</label>
                            <span id="brand3">{{ brand3 }}</span>

                        </div>

                        <div>
                            <label for="ber3">ເບີ</label>
                            <span id="ber3">{{ ber3 }}</span>

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
                            <label for="qty_offer4">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer4">{{ qty_offer4 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney4 }}</span>
                        </div>
                        <div>
                            <label for="size4">ຂະນາດ</label>
                            <span id="size4">{{ size4 }}</span>

                        </div>

                        <div>
                            <label for="brand4">ຍີ່ຫໍ້</label>
                            <span id="brand4">{{ brand4 }}</span>

                        </div>

                        <div>
                            <label for="ber4">ເບີ</label>
                            <span id="ber4">{{ ber4 }}</span>

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
                            <label for="qty_offer5">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer5">{{ qty_offer5 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney5 }}</span>
                        </div>
                        <div>
                            <label for="size5">ຂະນາດ</label>
                            <span id="size5">{{ size5 }}</span>

                        </div>

                        <div>
                            <label for="brand5">ຍີ່ຫໍ້</label>
                            <span id="brand5">{{ brand5 }}</span>

                        </div>

                        <div>
                            <label for="ber5">ເບີ</label>
                            <span id="ber5">{{ ber5 }}</span>

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
                            <label for="qty_offer6">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer6">{{ qty_offer6 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney6 }}</span>
                        </div>

                        <div>
                            <label for="size6">ຂະນາດ</label>
                            <span id="size6">{{ size6 }}</span>

                        </div>

                        <div>
                            <label for="brand6">ຍີ່ຫໍ້</label>
                            <span id="brand6">{{ brand6 }}</span>

                        </div>

                        <div>
                            <label for="ber6">ເບີ</label>
                            <span id="ber6">{{ ber6 }}</span>

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
                            <label for="qty_offer7">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer7">{{ qty_offer7 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney7 }}</span>
                        </div>
                        <div>
                            <label for="size7">ຂະນາດ</label>
                            <span id="size7">{{ size7 }}</span>

                        </div>

                        <div>
                            <label for="brand7">ຍີ່ຫໍ້</label>
                            <span id="brand7">{{ brand7 }}</span>

                        </div>

                        <div>
                            <label for="ber7">ເບີ</label>
                            <span id="ber7">{{ ber7 }}</span>

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
                            <label for="qty_offer8">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer8">{{ qty_offer8 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney8 }}</span>
                        </div>
                        <div>
                            <label for="size8">ຂະນາດ</label>
                            <span id="size8">{{ size8 }}</span>

                        </div>

                        <div>
                            <label for="brand8">ຍີ່ຫໍ້</label>
                            <span id="brand8">{{ brand8 }}</span>

                        </div>

                        <div>
                            <label for="ber8">ເບີ</label>
                            <span id="ber8">{{ ber8 }}</span>

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
                            <label for="qty_offer9">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer9">{{ qty_offer9 }}</span>
                        </div>
                        <div>
                            <label for="totalMoney1">ເງິນທັງໝົດ:</label>
                            <span id="totalMoney1">{{ totalMoney9 }}</span>
                        </div>
                        <div>
                            <label for="size9">ຂະນາດ</label>
                            <span id="size9">{{ size9 }}</span>

                        </div>

                        <div>
                            <label for="brand9">ຍີ່ຫໍ້</label>
                            <span id="brand9">{{ brand9 }}</span>

                        </div>

                        <div>
                            <label for="ber9">ເບີ</label>
                            <span id="ber9">{{ ber9 }}</span>

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


                <v-card-actions>
                    <label for="dateCreate">ວັນທີສ້າງ:</label>
                    <span id="dateCreate">{{ dateCreate }}</span>
                </v-card-actions>

                <v-card-actions>

                    <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div style="margin-top: 500px;display:none">
            <div id="modalInvoice">
                <v-row>
                    <v-col>
                        <Notiv2 />
                        <div class="text-center"
                            style="display:flex;justify-content:center;font-size:25px;font-weight:bold;margin-top: 10px;margin-left: ">
                            ໃບຮັບສິນຄ້າເຂົ້າສ່າງ</div>
                        <div style="font-size: 18px;font-weight: bold;margin-top: 80px;margin-bottom: 50px;">

                            <div>
                                <label for="dateCreate">ວັນທີສ້າງ:</label>
                                <span id="dateCreate">{{ dateCreate }}</span>
                            </div>

                            <div>
                                <label for="shopName">ຊື່ຮ້ານ:</label>
                                <span id="shopName">{{ shopName }}</span>
                            </div>
                        </div>

                        <div style="display: flex;justify-content: space-between;margin-bottom: 20px;">
                            <div style="margin-bottom: 22px;">
                                <label for="offer_CODE">ເລກທີໃບສ:</label>
                                <span id="offer_CODE">{{ offer_CODE }}</span>
                            </div>
                            <div style="margin-bottom: 22px;">
                                <label for="offerManName">ຜູ້ສະເໜີ:</label>
                                <span id="offerManName">{{ offerManName }}</span>
                            </div>
                            <div style="margin-bottom: 22px;">
                                <label for="job">ໜ້າທີ່ຮັບຜິດຊອບ:</label>
                                <span id="job">{{ job }}</span>
                            </div>
                        </div>
                        <div style="margin-bottom: 25px;justify-self: center;">
                            <label for="description">ລາຍລະອຽດ:</label>
                            <span id="description">{{ description }}</span>
                        </div>

                        <div>
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney }}</span>
                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size">ຂະໜາດ:</label>
                                    <span id="size">{{ size }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand">ຍີ່ຫໍ້:</label>
                                    <span id="brand">{{ brand }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber">ເບີ:</label>
                                    <span id="ber">{{ ber }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="item_name1 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img1" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer1 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price1 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney1 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name1 }}</span>
                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size1">ຂະໜາດ1 :</label>
                                    <span id="size1">{{ size1 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand1">ຍີ່ຫໍ້1:</label>
                                    <span id="brand1">{{ brand1 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber1">ເບີ1:</label>
                                    <span id="ber1">{{ ber1 }}</span>
                                </div>
                            </div>
                        </div>


                        <div v-if="item_name2 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img2" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name2 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer2 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price2 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney2 }}</span>

                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size2">ຂະໜາດ2 :</label>
                                    <span id="size2">{{ size2 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand2">ຍີ່ຫໍ້2:</label>
                                    <span id="brand2">{{ brand2 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber2">ເບີ2:</label>
                                    <span id="ber2">{{ ber2 }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item_name3 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img3" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name3 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer3 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price3 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney3 }}</span>
                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size3">ຂະໜາດ3 :</label>
                                    <span id="size3">{{ size3 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand3">ຍີ່ຫໍ້3:</label>
                                    <span id="brand3">{{ brand3 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber3">ເບີ3:</label>
                                    <span id="ber3">{{ ber3 }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="item_name4 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img4" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name4 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer4 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price4 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney4 }}</span>
                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size4">ຂະໜາດ4 :</label>
                                    <span id="size4">{{ size4 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand4">ຍີ່ຫໍ້4:</label>
                                    <span id="brand4">{{ brand4 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber4">ເບີ4:</label>
                                    <span id="ber4">{{ ber4 }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item_name5 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img5" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name5 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer5 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price5 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney5 }}</span>
                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size5">ຂະໜາດ5 :</label>
                                    <span id="size5">{{ size5 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand5">ຍີ່ຫໍ້5:</label>
                                    <span id="brand5">{{ brand5 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber5">ເບີ5:</label>
                                    <span id="ber5">{{ ber5 }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item_name6 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img6" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name6 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer6 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price6 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney6 }}</span>
                                </div>
                                <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            </div>
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size6">ຂະໜາດ6 :</label>
                                    <span id="size6">{{ size6 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand6">ຍີ່ຫໍ້6:</label>
                                    <span id="brand6">{{ brand6 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber6">ເບີ6:</label>
                                    <span id="ber6">{{ ber6 }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item_name7 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img7" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name7 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer7 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price7 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney7 }}</span>
                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size7">ຂະໜາດ7 :</label>
                                    <span id="size7">{{ size7 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand7">ຍີ່ຫໍ້7:</label>
                                    <span id="brand7">{{ brand7 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber7">ເບີ7:</label>
                                    <span id="ber7">{{ ber7 }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item_name8 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">
                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img8" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name8 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer8 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price8 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney8 }}</span>
                                </div>
                            </div>
                            <!-- <div style="margin-bottom: 10px;">
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div> -->
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size8">ຂະໜາດ8 :</label>
                                    <span id="size8">{{ size8 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand8">ຍີ່ຫໍ້8:</label>
                                    <span id="brand8">{{ brand8 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber8">ເບີ8:</label>
                                    <span id="ber8">{{ ber8 }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item_name9 !== 'null'">
                            <div
                                style="display: flex;margin-left: 10px;margin-right: 10px;margin-top: 30px;justify-content: space-between;">


                                <label for="img">ຮູບພາບ:</label>
                                <div>
                                    <img :src="img9" style="width: 95px; height: 95px;margin-top: -20px;">
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name9 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer9 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price9 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;">
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney9 }}</span>
                                </div>

                            </div>
                            <div style="display: flex;">

                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="size9">ຂະໜາດ9 :</label>
                                    <span id="size9">{{ size9 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="brand9">ຍີ່ຫໍ້9:</label>
                                    <span id="brand9">{{ brand9 }}</span>
                                </div>
                                <div style="margin-bottom: 22px;margin-right: 20px;">
                                    <label for="ber9">ເບີ9:</label>
                                    <span id="ber9">{{ ber9 }}</span>
                                </div>
                            </div>
                        </div>

                        <div style="margin-bottom: 15px;margin-top: 20px;">
                            <label for="real_totalMoney">ລາຂາ ທັງໝົດ:</label>
                            <span id="real_totalMoney" style="text-decoration: underline;">{{ real_totalMoney }}</span>
                        </div>

                        <div style="width: 100%; margin: 0 auto;">
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
            hkey_id: '',
            fkey_id: '',
            unit_price: '',
            img: '',
            qty_offer: '',
            qty_offer1: '',
            qty_offer2: '',
            qty_offer3: '',
            qty_offer4: '',
            qty_offer5: '',
            qty_offer6: '',
            qty_offer7: '',
            qty_offer8: '',
            qty_offer9: '',
            qty_offer10: '',
            selectedCard: '1', // This will hold the selected card to display
            loading_processing: false,
            totalMoney: '',
            description: '',
            offerManName: '',
            job: '',
            f_CARD_NO: '',
            item_name: '',
            pocode: '',
            dateCreate: '',
            offer_CODE: '',
            printData: null,
            showModal: false,
            dialogVisible: false,
            dialogVisiblev2: false,
            offerManName: '',
            job: '',
            item_id: '0',
            item_id1: '0',
            item_id2: '0',
            item_id3: '0',
            item_id4: '0',
            item_id5: '0',
            item_id6: '0',
            item_id7: '0',
            item_id8: '0',
            item_id9: '0',

            itemName: '',
            qtyOffer: '',
            imgUrl: '',

            Mechanicequipment: [],
            show_list: [],
            size: '',
            brand: '',
            ber: '',
            size1: '',
            size2: '',
            size3: '',
            size4: '',
            size5: '',
            size6: '',
            size7: '',
            size8: '',
            size9: '',

            brand1: '',
            brand2: '',
            brand3: '',
            brand4: '',
            brand5: '',
            brand6: '',
            brand7: '',
            brand8: '',
            brand9: '',

            ber1: '',
            ber2: '',
            ber3: '',
            ber4: '',
            ber5: '',
            ber6: '',
            ber7: '',
            ber8: '',
            ber9: '',

            name: '',
            address: '',
            offerCode: '',
            h_VICIVLE_NUMBER: '',
            number: '',
            // Other data properties...
            search: '',
            truck_table_headers: [
                { text: 'ລາຄາ', value: 'unit_price' },
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ລາຄາລວມ', value: 'totalMoney' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ຊື່ຜູ້ສະເໜີ', value: 'offerManName' },
                { text: 'ອາຊີບ', value: 'job' },
                { text: 'ລຳດັບຍ້າຍລົດ', value: 'f_CARD_NO' },
                { text: 'ລຳດັບລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຊື່ສິ່ງທີ່ສະເໜີລຶບ', value: 'item_name' },
                { text: 'ວັນທີສ້າງໃບບິນ', value: 'dateCreate' },
                { text: 'ເລກທີໃບສ້າງໃບບິນ', value: 'offer_CODE' },
                // { text: 'SS', value: 'stock_status' },
                { text: 'ສະທານະຊື້', value: '' },
                // { text: 'SPO', value: 'statusPO' },
                // { text: 'ພິມບິນ', value: '' },
                // { text: 'ໃບສັງຊື້', value: '' },



            ],
            truck_table_headersv2: [
                { text: 'ລາຄາ', value: 'unit_price' },
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ລາຄາລວມ', value: 'totalMoney' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ຊື່ຜູ້ສະເໜີ', value: 'offerManName' },
                { text: 'ອາຊີບ', value: 'job' },
                { text: 'ລຳດັບຍ້າຍລົດ', value: 'f_CARD_NO' },
                { text: 'ລຳດັບລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຊື່ສິ່ງທີ່ສະເໜີລຶບ', value: 'item_name' },
                { text: 'ວັນທີສ້າງໃບບິນ', value: 'dateCreate' },
                { text: 'ເລກທີໃບສ້າງໃບບິນ', value: 'offer_CODE' },
                // { text: 'SS', value: 'stock_status' },
                { text: 'ສະທານະຊື້', value: '' },
                // { text: 'SPO', value: 'statusPO' },
                // { text: 'ພິມບິນ', value: '' },
                // { text: 'ໃບສັງຊື້', value: '' },



            ],
            truck_data_list: [],
            truck_data_listv2: [],
        };
    },
    mounted() {
        // Fetch data here or populate truck_data_list from props
        this.fetchPrintData();
    },
    computed: {
        filteredItems() {
            if (!Array.isArray(this.truck_data_list)) {
                return [];
            }
            return this.truck_data_list.filter(item =>
                item.statusPO === 'YES' &&
                (item.stock_status === 'wait')
            );
        },
        filteredItemsv2() {
            if (!Array.isArray(this.truck_data_listv2)) {
                return [];
            }
            return this.truck_data_listv2.filter(item =>
                item.statusPO === 'YES' &&
                (item.stock_status === 'in')
            );
        },
    },

    methods: {
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },

        getStatusClass(status) {
            return status === 'N' ? 'red' : 'green';
        },
        getStatusText(status) {
            return status === 'Y' ? 'ຊື້ເເລ້ວ' : 'ຍັງບໍ່ສັງຊື້';
        },
        onGetMechanicequipment(item_id) {
            console.log(item_id);

            let data = this.Mechanicequipment.filter((el) => el.item_id === item_id);
            console.log('head:', data);
            this.itemName = data[0]?.itemName;
            this.item_id = item_id;

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
                    this.truck_data_listv2 = response.data;
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
        async onGetinboxv2(offerCode) {
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

                this.size = response.data[0].size;
                this.brand = response.data[0].brand;
                this.ber = response.data[0].ber;

                this.size1 = response.data[0].size1;
                this.brand1 = response.data[0].brand1;
                this.ber1 = response.data[0].ber1;

                this.size2 = response.data[0].size2;
                this.brand2 = response.data[0].brand2;
                this.ber2 = response.data[0].ber2;


                this.size3 = response.data[0].size3;
                this.brand3 = response.data[0].brand3;
                this.ber3 = response.data[0].ber3;


                this.size4 = response.data[0].size4;
                this.brand4 = response.data[0].brand4;
                this.ber4 = response.data[0].ber4;


                this.size5 = response.data[0].size5;
                this.brand5 = response.data[0].brand5;
                this.ber5 = response.data[0].ber5;


                this.size6 = response.data[0].size6;
                this.brand6 = response.data[0].brand6;
                this.ber6 = response.data[0].ber6;


                this.size7 = response.data[0].size7;
                this.brand7 = response.data[0].brand7;
                this.ber7 = response.data[0].ber7;


                this.size8 = response.data[0].size8;
                this.brand8 = response.data[0].brand8;
                this.ber8 = response.data[0].ber8;


                this.size9 = response.data[0].size9;
                this.brand9 = response.data[0].brand9;
                this.ber9 = response.data[0].ber9;



                // Open the dialog after API call success
                this.openDialogv2(this.offer_CODE);

                this.sumFooter = response.sumFooter;

            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
            }
        },
        onGetrepImagev2(file) {
            if (file) {
                this.url = URL.createObjectURL(this.img)
                console.log(this.url)
            } else {
                this.url = null
            }
        },
        openDialogv2(offerCode) {
            this.offerCode = offerCode;
            this.dialogVisiblev2 = true;
        },
        closeDialogv2() {
            this.dialogVisiblev2 = false;
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

                this.size = response.data[0].size;
                this.brand = response.data[0].brand;
                this.ber = response.data[0].ber;

                this.size1 = response.data[0].size1;
                this.brand1 = response.data[0].brand1;
                this.ber1 = response.data[0].ber1;

                this.size2 = response.data[0].size2;
                this.brand2 = response.data[0].brand2;
                this.ber2 = response.data[0].ber2;


                this.size3 = response.data[0].size3;
                this.brand3 = response.data[0].brand3;
                this.ber3 = response.data[0].ber3;


                this.size4 = response.data[0].size4;
                this.brand4 = response.data[0].brand4;
                this.ber4 = response.data[0].ber4;


                this.size5 = response.data[0].size5;
                this.brand5 = response.data[0].brand5;
                this.ber5 = response.data[0].ber5;


                this.size6 = response.data[0].size6;
                this.brand6 = response.data[0].brand6;
                this.ber6 = response.data[0].ber6;


                this.size7 = response.data[0].size7;
                this.brand7 = response.data[0].brand7;
                this.ber7 = response.data[0].ber7;


                this.size8 = response.data[0].size8;
                this.brand8 = response.data[0].brand8;
                this.ber8 = response.data[0].ber8;


                this.size9 = response.data[0].size9;
                this.brand9 = response.data[0].brand9;
                this.ber9 = response.data[0].ber9;



                // Open the dialog after API call success
                this.openDialog(this.offer_CODE);

                this.sumFooter = response.sumFooter;

            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
            }
        },

        onGetrepImage(file) {
            if (file) {
                this.url = URL.createObjectURL(this.img)
                console.log(this.url)
            } else {
                this.url = null
            }
        },
        openDialog(offerCode) {
            this.offerCode = offerCode;
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },

        onSubmit() {
            // Implement your logic to handle form submission
            console.log('Name:', this.name);
            console.log('Address:', this.address);
            console.log('Offer Code:', this.offerCode);

            // Close the dialog after submission
            this.closeDialog();
        },
        async onSubmit() {
            try {
                // Prepare the data to be sent in the request body
                const requestData = {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: this.offerCode, // Using the offerCode property
                    item_id: this.item_id, // Assuming you have an itemId property set from somewhere

                    qty_offer: this.qty_offer,

                    size: this.size,
                    brand: this.brand,
                    ber: this.ber,

                    item_id1: this.item_id1,
                    qty_offer1: this.qty_offer1,
                    size1: this.size1,
                    brand1: this.brand1,
                    ber1: this.ber1,

                    item_id2: this.item_id2,
                    qty_offer2: this.qty_offer2,
                    size2: this.size2,
                    brand2: this.brand2,
                    ber2: this.ber2,

                    item_id3: this.item_id3,
                    qty_offer3: this.qty_offer3,
                    size3: this.size3,
                    brand3: this.brand3,
                    ber3: this.ber3,

                    item_id4: this.item_id4,
                    qty_offer4: this.qty_offer4,
                    size4: this.size4,
                    brand4: this.brand4,
                    ber4: this.ber4,

                    item_id5: this.item_id5,
                    qty_offer5: this.qty_offer5,
                    size5: this.size5,
                    brand5: this.brand5,
                    ber5: this.ber5,

                    item_id6: this.item_id6,
                    qty_offer6: this.qty_offer6,
                    size6: this.size6,
                    brand6: this.brand6,
                    ber6: this.ber6,

                    item_id7: this.item_id7,
                    qty_offer7: this.qty_offer7,
                    size7: this.size7,
                    brand7: this.brand7,
                    ber7: this.ber7,

                    item_id8: this.item_id8,
                    qty_offer8: this.qty_offer8,
                    size8: this.size8,
                    brand8: this.brand8,
                    ber8: this.ber8,

                    item_id9: this.item_id9,
                    qty_offer9: this.qty_offer9,
                    size9: this.size9,
                    brand9: this.brand9,
                    ber9: this.ber9,



                };

                // Send the POST request to the API endpoint
                const response = await this.$axios.$post('/MoveItemToStock.service', requestData);

                console.log('MoveItemToStock API response:', response);

                // Close the dialog after submission
                this.closeDialog();

                if (response?.status === "00") {
                    this.loading_processing = false;
                    // this.print();
                    // Other actions upon successful creation


                    // Display success alert using SweetAlert2
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
                        confirmButtonText: 'OK',
                    });
                    // window.location.reload();
                }

                // You can handle the response here, such as showing a success message or updating UI
            } catch (error) {
                console.error('MoveItemToStock API error:', error);
                // Handle the error, such as displaying an error message

            }
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
        async onGetDatsForPrint(offerCode) {
            try {
                const response = await this.$axios.$post('/showofferpaperDetail.service', {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: offerCode,
                });

                console.log('Print API response:', response);

                // Handle the response as needed, such as displaying a success message or handling errors
            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
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
        // Other methods...
    },
    mounted() {

        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
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
</style>
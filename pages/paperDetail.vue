<template>
    <div>
        <v-card>

            <v-row justify="center">
                <v-btn color="#f593b3" class="white--text mt-10" @click="print">
                    <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                </v-btn>
            </v-row>

            <v-card-subtitle style="display: flex;">
                <p style="margin-right: 5px;"><strong>Offer Code:</strong> {{ paperDetail.offer_CODE }}</p>
                <p style="margin-right: 5px;"><strong>Description:</strong> {{ paperDetail.description }}</p>
                <p style="margin-right: 5px;"><strong>Offer Man Name:</strong> {{ paperDetail.offerManName }}</p>
                <p style="margin-right: 5px;"><strong>Job:</strong> {{ paperDetail.job }}</p>
            </v-card-subtitle>

        </v-card>
        <div style="display: flex;">
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',')}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img1" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name1 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney1?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer1 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img2" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name2 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer2 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img3" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name3 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney3?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer3 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img4" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name4 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney4?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer4 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img5" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name5 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney5?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer5 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>

        </div>

        <div style="display: flex;">
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img6" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name6 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney6?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer6 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img7" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name7 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney7?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer7 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img8" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name8 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney9?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer9 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
            </v-card>
            <v-card style="margin-top: 10px;margin-right: 5px;">
                <v-card-text style="display: flex;">
                    <div>

                        <img :src="paperDetail.img10" alt="Item Image" width="150" />
                    </div>
                    <div>

                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Item Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.item_name10 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Total Money:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.totalMoney10?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>Quantity:</v-list-item-title>
                                    <v-list-item-subtitle>{{ paperDetail.qty_offer10 }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-card-text>
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
                    style="display:flex;justify-content:center;font-size:25px;font-weight:bold;margin-top: 30px;">
                    ລາຍງານລາຍລະອຽດອາໄລ</div>
                <v-card-subtitle style="display: flex;">
                    <p style="margin-right: 5px;"><strong>Offer Code:</strong> {{ paperDetail.offer_CODE }}</p>
                    <p style="margin-right: 5px;"><strong>Description:</strong> {{ paperDetail.description }}</p>
                    <p style="margin-right: 5px;"><strong>Offer Man Name:</strong> {{ paperDetail.offerManName }}</p>
                    <p style="margin-right: 5px;"><strong>Job:</strong> {{ paperDetail.job }}</p>
                </v-card-subtitle>

                <div style="margin-top: 20px;">
                    <div style="display: flex;">
                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img1" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name1
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney1
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer1
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                    <div style="display: flex;">
                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img2" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name2
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney2
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer2
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img3" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name3
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney3
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer3
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                    <div style="display: flex;">

                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img4" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name4
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney4
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer4
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img5" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name5
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney5
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer5
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>

                    <div style="display: flex;">
                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img6" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name6
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney6
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer6
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img7" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name7
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney7
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer7
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                    <div style="display: flex;">

                        <v-card style="margin-top: 10px;margin-left: 20px;">
                            <v-card-text style="display: flex;">
                                <div>

                                    <img :src="paperDetail.img8" alt="Item Image" width="80" />
                                </div>
                                <div>

                                    <v-list style="display: flex;">
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Item Name:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.item_name8
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Total Money:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.totalMoney8
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Quantity:</v-list-item-title>
                                                <v-list-item-subtitle>{{ paperDetail.qty_offer8
                                                    }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>


                        <div style="display: flex;">

                            <v-card style="margin-top: 10px;margin-left: 20px;">
                                <v-card-text style="display: flex;">
                                    <div>

                                        <img :src="paperDetail.img9" alt="Item Image" width="80" />
                                    </div>
                                    <div>

                                        <v-list style="display: flex;">
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>Item Name:</v-list-item-title>
                                                    <v-list-item-subtitle>{{ paperDetail.item_name9
                                                        }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>Total Money:</v-list-item-title>
                                                    <v-list-item-subtitle>{{ paperDetail.totalMoney9
                                                        }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>Quantity:</v-list-item-title>
                                                    <v-list-item-subtitle>{{ paperDetail.qty_offer9
                                                        }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <h3 class="red--text ">
                            ຈ່າຍຄ່າອາໄລ: {{ paperDetail.real_totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }} LAK
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {

            sumFooter: {},
            offer_CODE: '',
            paperDetail: {}, // Holds paper details
        }
    },
    mounted() {
        if (this.$route.query.offerCode) {
            this.ongetData(this.$route.query.offerCode);
        }
    },
    methods: {
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
        async ongetData(offerCode) {
            try {
                const requestData = {
                    offer_CODE: offerCode, // Use the passed offerCode
                    toKen: localStorage.getItem('toKen'),
                };
                const response = await this.$axios.$post('/showofferpaperDetail.service', requestData);
                if (response?.status === "00") {
                    this.paperDetail = response?.data[0];
                    this.sumFooter = response?.sumFooter;
                    console.log("new data footer:", this.sumFooter);

                } else {
                    swal.fire({
                        icon: 'error',
                        text: 'Failed to fetch car details',
                    });
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred',
                });
                console.log(error);
            }
        },
    },
}
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

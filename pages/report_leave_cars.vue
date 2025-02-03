<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <!-- <noti/> -->
            <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#E57373;color:white">
                ລາຍງານການປ່ອຍລົດ
            </v-card-title>

            <!-- <div v-if="loading_processing">Loading...</div>
            <div v-else>
                <div>ຈ່າຍຄ່າອາໄລ: {{ sumFooterferpaper.totalMoney }}</div>
            </div> -->

            <div>ຈ່າຍສົດບໍ່ມີຊື່ຮ້ານ: {{ totalMoney2 }}</div>
            <div>ຈ່າຍຮ້ານເຄຮດິດ(ຕິດໜີ້): {{ sumFooter_Credit.totalMoney_credit }}</div>
            <div>ຈ່າຍຄ່າຕິດໜີ້ນໍ້າມັນ: {{ sumFooter_Creditpaid.sumtotalOilPaid }}</div>
            <v-card-text>
                <div style="width:100%;display:flex;justify-content:start" class="pt-4">

                    <div class="d-flex align-center">
                        <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                            :return-value.sync="startDate" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="formattedStartDate" required
                                    label="ວັນທີເລີ່ມຕົ້ນ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="startDate" no-title scrollable
                                @input="$refs.start_menu.save(startDate)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="d-flex align-center pl-2">
                        <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                            :return-value.sync="endDate" transition="scale-transition" offset-y min-width="auto">

                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="formattedEndDate" required label="ວັນທີສຸດທ້າຍ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="endDate" no-title scrollable @input="$refs.end_menu.save(endDate)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>


                    <div class="ml-2 pt-1">
                        <v-btn color="#90A4AE" class="white--text" elevation="0" @click="handleSearch">
                            <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
                        </v-btn>

                    </div>
                    <v-spacer></v-spacer>
                    <div style="width:600px" class="d-flex align-center">
                        <v-text-field placeholder="ຄົ້ນຫາດ້ວຍລະຫັດປ່ອຍລົດ..." v-model="search" rounded
                            background-color="#f5f5f5" prepend-inner-icon="mdi-magnify"></v-text-field>
                        <div style="width: 50px;"></div>
                        <v-btn color="primary" class="card-shadow"
                            @click="print"><v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ</v-btn>
                    </div>
                </div>
                <div style="display:flex;align-items:center">

                    <div v-if="showAlert === true"
                        style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                        class="ml-2 pl-2 pr-10">
                        <v-icon color="red">mdi-alert-outline</v-icon>
                        <span class="ml-2 red--text">ລາຍການສີແດງຮອດກຳນົດແລ້ວ!</span>
                    </div>
                </div>
                <!-- Radio button -->
                <!-- <div style="width:100%; display:flex; justify-content:start" class="ml-5"> -->
                <div style="width:100%; display:flex; justify-content:start" class="ml-5">
                    <div style="width: 20%;">

                        <v-radio-group v-model="status" column>
                            <v-radio label="ໃບປ່ອຍລົດທີ່ຍັງບໍ່ໄດ້ອອກໃບປະຕິບັດງານ" color="red darken-3"
                                value="N"></v-radio>
                            <v-radio label="ໃບປ່ອຍລົດທີ່ໄດ້ອອກໃບປະຕິບັດງານແລ້ວ" color="success" value="Y"></v-radio>
                            <v-radio label="ໃບປ່ອຍລົດທັງໝົດ" color="primary" value="A"></v-radio>
                        </v-radio-group>
                    </div>
                    <div>
                        <div>
                            <div style="width: 100%;display:flex;justify-content:center;margin-top: 20px;" class="pt-4">

                                <div style="width: 500px;margin-right: 20px;">
                                    <v-row>
                                        <v-btn v-for="month in 12" :key="month" @click="setMonth(month)">{{ month
                                            }}</v-btn>
                                    </v-row>
                                </div>
                                <div style="width: 500px;margin-left: 20px;">
                                    <v-row>
                                        <v-btn v-for="year in availableYears" :key="year" @click="setYear(year)">{{ year
                                            }}</v-btn>
                                    </v-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </div> -->
                <div style="width:100%; display:flex; justify-content:start" class="ml-5">
                    <!-- Your existing divs -->
                    <div>

                        <div>
                            <h3>ທັງໝົດ: <span class="green--text">{{ report_leave_car_list?.length }}</span></h3>

                        </div>
                        <div class="ml-10 mr-5">
                            <h3>ໃບປ່ອຍລົດທີ່ໄດ້ອອກໃບປະຕິບັດງານແລ້ວ: <span class="green--text">{{ successList }}</span>
                            </h3>

                        </div>
                        <div class="ml-10 mr-5">
                            <h3>ໃບປ່ອຍລົດທີ່ຍັງບໍ່ໄດ້ອອກໃບປະຕິບັດງານ: <span class="red--text">{{ waitingList }}</span>
                            </h3>
                        </div>
                    </div>


                </div>

                <div class="mt-2">

                    <v-data-table :items="report_leave_car_list" :headers="report_leave_car_header" :search="search">

                        <template v-slot:item="row">

                            <tr :style="{ 'color': row?.item?.totalDay >= '7' && row?.item?.status === 'N' ? 'red' : 'black' }"
                                @mouseover="active = row?.index" @mouseleave="active = ''">
                                <td>{{ row?.item?.lahud_POYLOD }}</td>
                                <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                                <td>{{ row?.item?.f_CARD_NO }}</td>
                                <td>{{ moment(row?.item?.out_DATE).format('DD/MM/YYYY') }}</td>
                                <td>{{ row?.item?.staft_NAME }} <span>{{ row?.item?.staft_SURNAME }}</span></td>
                                <!-- <td>{{ row?.item?.staft_NAME1 }} <span>{{ row?.item?.staft_SURNAME1 }}</span></td> -->
                                <td>{{ row?.item?.pro_NAME }}</td>
                                <td>{{ row?.item?.totalBiaLieng }}</td>
                                <td>{{ row?.item?.staff_BIALINEG_KANGJAIY }}</td>
                                <!-- <td>{{ row?.item?.staff02_beforepay }}</td> -->
                                <!-- <td>{{ row?.item?.staff_BIALINEG_KANGSecond }}</td> -->
                                <td> {{ row?.item?.sainummun }} </td>
                                <td>{{ row?.item?.priceNamMun }} </td>
                                <td>{{ row?.item?.totalPriceFuel }} </td>
                                <td>{{ row?.item?.runningTotal }}</td>
                                <td> <span>{{ row?.item?.allLaiyJaiy }}</span></td>

                                <!-- <td class="green--text">{{ row?.item?.total_price }} {{ row?.item?.currency }}</td> -->
                                <td v-if="row?.item?.status === 'N'" class="red--text">
                                    <div class="d-flex">
                                        <v-btn small color="red" class="white--text card-shadow" block> <v-icon
                                                color="white" size="24">mdi-new-box</v-icon>
                                            <span class="white--text ml-2">ຍັງບໍ່ໄດ້ອອກໃບປະຕິບັດງານ</span>

                                            <v-spacer></v-spacer></v-btn>
                                    </div>
                                </td>
                                <td v-else class="green--text">

                                    <div class="d-flex algin-center">
                                        <v-btn block small class="card-shadow" color="#4CAF50"><v-icon
                                                color="white">mdi-check-circle</v-icon>
                                            <span class="white--text ml-2">ອອກໃບປະຕິບັດງານສຳເລັດ</span>
                                            <v-spacer></v-spacer></v-btn>
                                    </div>
                                </td>


                                <td><v-btn small color="primary" class="card-shadow" @click="onPrintAgain(
                                    row?.item?.lahud_POYLOD,
                                    row?.item?.customer_ID,
                                    row?.item?.product_ID,
                                    row?.item?.product_AMOUNT,
                                    row?.item?.product_SIZE,
                                    row?.item?.product_DETAILS,
                                    row?.item?.product_FROM,
                                    row?.item?.product_TO,
                                    row?.item?.place_PD_FROM,
                                    row?.item?.place_PD_TO,
                                    row?.item?.staff_ID_NUM1,
                                    row?.item?.staff_ID_NUM2,
                                    row?.item?.staff_BIALIENG_FRIST,
                                    row?.item?.staff_BIALIENG,
                                    row?.item?.staff_BIALINEG_KANGJAIY,
                                    row?.item?.header_ID,
                                    row?.item?.footer_ID,
                                    row?.item?.out_DATE,
                                    row?.item?.in_DATE,
                                    row?.item?.laiyathang,
                                    row?.item?.sainummun,
                                    row?.item?.numnuklod,
                                    row?.item?.kongnarlod,
                                    row?.item?.khg_MUE_TIDLOD,
                                    row?.item?.kim_KILO,
                                    row?.item?.price,
                                    row?.item?.total_price,
                                    row?.item?.priceNamMun,
                                    row?.item?.currency,
                                    row?.item?.staff_Curr
                                )"><v-icon>mdi-printer</v-icon>ພິມບິນຄືນ</v-btn></td>
                            </tr>
                        </template>
                        <!-- sum footer -->

                        <template v-slot:body.append>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h3>ລວມ :</h3>
                                </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="black--text ">{{ sumFooter.totalBiaLieng }}</h3>
                                    </b>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="black--text ">{{ sumFooter.todtalLaiyJaiyFrist }}</h3>
                                    </b>
                                </td>



                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="orange--text ">{{ sumFooter.totalNummun }}</h3>
                                    </b>
                                </td>
                                <td v-if="sumFooter != null">
                                    <!-- <b>
                                        <h3 class="orange--text ">{{ sumFooter.totalPriceNammun }}</h3>
                                    </b> -->
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="primary--text ">{{ sumFooter.totalPriceFuel }}</h3>
                                    </b>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="red--text ">{{ sumFooter.runningTotal }}</h3>
                                    </b>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="red--text ">{{ sumFooter.allLaiyJaiy }}</h3>
                                    </b>
                                </td>
                            </tr>
                            <tr>


                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h4> ລວມເບ້ຍລ້ຽງ:</h4>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="red--text ">{{ sumFooter.totalBiaLieng }}</h3>
                                    </b>
                                </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h3>ລາຍຈ່າຍອື່ນ:</h3>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="red--text ">{{ sumFooter.laiJaiyOutFrist }}</h3>

                                    </b>
                                </td>
                                <td>
                                    <v-btn small color="primary" class="card-shadow" style="width:190px"
                                        to="/report-expense"> <v-icon
                                            color="white">mdi-currency-usd</v-icon>ເບິ່ງລາຍລະອຽດການຈ່າຍ</v-btn>
                                </td>
                            </tr>

                            <!-- ລາຍຈ່າຍທີ່ລວມກັນເບັດເສັດ -->
                            <tr>


                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h4>ເບ້ຍລ້ຽງ+ລາຍຈ່າຍອື່ນ</h4>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="red--text ">{{ sumFooter.totalBiaLiengAndlaiJaiyOutFrist }}</h3>
                                    </b>
                                </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h3>ລາຍຈ່າຍສຸດທິ:</h3>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="red--text ">{{ sumFooter.laiJaiyOutTotal }}</h3>
                                    </b>
                                </td>
                            </tr>

                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>

                                <td>
                                    <h4>ລວມ(ສິ້ນເປືອງ+ຈ່າຍນອກ+ເບ້ຍລ້ຽງ):</h4>
                                </td>
                                <td v-if="sumFooter != null">
                                    <b>
                                        <h3 class="red--text ">{{ sumFooter.biaOutWasted }}</h3>
                                    </b>
                                </td>
                                <td> </td>

                            </tr>

                        </template>
                    </v-data-table>
                </div>
            </v-card-text>
        </v-card>
        <!-- component for print -->
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
                <div class="text-center" style="display:flex;justify-content:center;font-size:20px;font-weight:bold">
                    ລາຍງານໃບປ່ອຍລົດ</div>
                 <div style="padding-top:20px;padding-bottom: 10px;">
                    ທັງໝົດ: {{ report_leave_car_list?.length }} ລາຍການ <span v-if="startDate !== null">ແຕ່ວັນທີ:
                        {{ startDate }} ຫາ {{ endDate }}</span>
                </div>
                <table
                    style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px">
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ລຳດັບ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ວັນທີອອກ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ເລກປ່ອຍລົດ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ທະບຽນຫົວ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ທະບຽນຫາງ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ສິນຄ້າ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ໃສ່ນ້ຳມັນ</td>

                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ວັນທີກັບ</td> -->


                    </tr>
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                        v-for="(item, i) in report_leave_car_list" :key="i">

                        <!-- {{ moment(row?.item?.out_DATE).format('DD/MM/YYYY') }} -->

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                            class=" font-weight-bold">{{ i + 1 }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ moment(item?.out_DATE).format('DD/MM/YYYY') }}</td>

                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.out_DATE }}</td> -->

                        <!-- <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.out_DATE }}</td> -->
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.lahud_POYLOD }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.h_VICIVLE_NUMBER }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.f_CARD_NO }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.pro_NAME }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.sainummun }}</td>


                        <!-- <td style="padding: 10px; border: 0.5px solid #999; border-collapse: collapse; color: #000; border-top-right-radius: 3px"
                            class="font-weight-bold">{{ moment(item?.in_DATE).format('DD/MM/YYYY') }}</td> -->



                    </tr>
                </table>



                <div style="display: flex;margin-top:10px; justify-content:space-between; font-size: 13px;">
                    <div>


                        <div style="height: 35px;">

                            <td>
                                <h3>1. ລວມເບ້ຍລ້ຽງຈ່າຍກ່ອນ: </h3>
                            </td>
                            <td v-if="sumFooter != null">
                                <b>
                                    <h3 class="red--text ">{{ sumFooter.totalBiaLieng }} LAK</h3>
                                </b>
                            </td>

                        </div>

                        <div style="height: 35px;">
                            <td>
                                <h3>2. ລາຍຈ່າຍນອກ: </h3>
                            </td>
                            <td v-if="sumFooter != null">
                                <b>
                                    <h3 class="red--text ">{{ sumFooter.laiJaiyOutFrist }} LAK</h3>

                                </b>
                            </td>
                        </div>

                        <div style="height: 35px;">
                            <td>
                                <h3>3. ລວມຄ່າສິ້ນເປືອງ: </h3>
                            </td>
                            <td v-if="sumFooter != null">
                                <b>
                                    <h3 class="red--text ">{{ sumFooter.runningTotal }} LAK</h3>
                                </b>
                            </td>
                        </div>

                        <div v-if="loading_processing">Loading...</div>
                        <div v-else>


                            <h3 class="red--text ">
                                4.ຈ່າຍຄ່າອາໄລ: {{ totalMoney2 }} LAK


                            </h3>


                        </div>
                        <!-- <div style="height: 35px;">
                            <td>
                                <h3> ລວມເງິນສິ້ນເປືອງ (ສິ້ນເປືອງ + ຈ່າຍນອກ + ເບ້ຍລ້ຽງ): </h3>
                            </td>
                            <td v-if="sumFooter != null">
                                <b>
                                    <h3 class="red--text "> {{ sumFooter.biaOutWasted }} LAK</h3>
                                </b>
                            </td>
                        </div> -->
                        <!-- <div style="height: 35px;margin-top: 10px;margin-bottom: 15px;">
                            <td style="margin-right: 5px;">
                                <h3>5. ລວມຈ່າຍຊີ້ນເປືອງທັງຫມົດປະຈຳ <span v-if="startDate !== null">ເປັນເງີນ :</span>
                                </h3>

                                <h5 style="color: crimson;">(ສິ້ນເປືອງ + ຈ່າຍນອກ + ເບ້ຍລ້ຽງ + ຈ່າຍຄ່າອາໄລ):</h5>
                            </td>
                            <td v-if="sumFooter_all != null">
                                <b>
                                    <h3 class="red--text"> {{ sumFooter_all }} LAK</h3>
                                </b>
                            </td>
                        </div> -->


                        <div style="height: 35px;margin-top: 10px;">
                            <td>
                                <h3>ລວມລາຍຈ່າຍປະຈໍາວັນ: </h3>
                            </td>
                            <td>
                                <b>
                                    <h2 style="margin-top: -3px;" class="red--text ">{{ sumFooter_allL }} LAK</h2>
                                    <!-- <h2 style="margin-top: -3px;" class="red--text"> {{ totalMoney }} LAK</h2> -->
                                    <!-- <h3   v-if="sumFooter != null" class="red--text ">{{ sumFooter.biaOutWasted }}</h3> -->

                                </b>
                            </td>
                        </div>
              


                    </div>
                    <div>
                        <div style="height: 35px;">
                            <td>
                                <h3>5. ລວມຄ່າເບ້ຍລ້ຽງທີ່ຄ້າງຊໍາລະທັງໝົດ : </h3>
                            </td>
                            <td>
                                <b>
                                    <h3 class="red--text ">{{ totalBialiengthatPaid }} LAK</h3>

                                </b>
                            </td>
                        </div>

                        <div style="height: 35px;">

                            <td>
                                <h3>6. ລວມຈ່າຍນໍ້າມັນທີຕິດໜີ້ : </h3>
                            </td>
                            <td>
                                <b>
                                    <h3 class="red--text ">{{ sumFooter_Creditpaid.sumtotalOilPaid }} LAK</h3>

                                </b>
                            </td>

                        </div>



                        <div style="height: 35px;">
                            <td>
                                <h3>7. ຈ່າຍຮ້ານເຄຮດິດ(ຕິດໜີ້): </h3>
                            </td>
                            <td>
                                <b>
                                    <!-- <h3 class="red--text "> {{ sumFooter_Credit.totalMoney_credit }}</h3> -->
                                    <!-- <h2  style="margin-top: -3px;" class="red--text"> {{ totalMoney }} LAK</h2> -->
                                    <!-- <h3   v-if="sumFooter != null" class="red--text ">{{ sumFooter.biaOutWasted }}</h3> -->


                                </b>
                            </td>
                        </div>
                        <div>
                            <!-- <v-card> -->
                            <!-- Display USD Credit -->
                            <div style="height: 35px; margin-left: 10px;">
                                <td>
                                    <h3 style="color: tomato;">ເຄດິດ:</h3>
                                </td>
                                <td>
                                    <b>
                                        <h3 class="red--text">{{ usd }} $ / {{ sfcusd }} LAK</h3>
                                    </b>
                                </td>
                            </div>

                            <!-- Display THB Credit -->
                            <div style="height: 35px; margin-left: 10px;">
                                <td>
                                    <h3 style="color: tomato;">ເຄດິດ:</h3>
                                </td>
                                <td>
                                    <b>
                                        <h3 class="red--text">{{ thb }} Baht / {{ sfcthb }} LAK</h3>
                                    </b>
                                </td>
                            </div>

                            <!-- Display LAK Credit -->
                            <div style="height: 35px; margin-left: 10px;">
                                <td>
                                    <h3 style="color: tomato;">ເຄດິດ:</h3>
                                </td>
                                <td>
                                    <b>
                                        <h3 class="red--text">{{ sfclak }} LAK</h3>
                                    </b>
                                </td>
                            </div>

                            <!-- Display Total Daily Credit -->
                            <div style="height: 35px; margin-left: 10px;">
                                <td>
                                    <h3 style="color: tomato;">ລວມລາຍຈ່າຍເຄດິດປະຈໍາວັນ:</h3>
                                </td>
                                <td>
                                    <b>
                                        <h3 class="red--text">{{ Alltitnee }} LAK</h3>
                                    </b>
                                </td>
                            </div>


                            <!-- <div style="height: 35px;margin-left: 30px;">
                                    <td>
                                        <h3 style="color: tomato;"> ຍັງບໍ່ຈ່າຍ: </h3>
                                    </td>
                                    <td>
                                        <b>
                                            <h3 class="red--text "> {{ sumFooter_Credit.totalMoney_credit }} $</h3>

                                        </b>
                                    </td>
                                </div> -->
                            <!-- <h2  style="margin-top: -3px;" class="red--text"> {{ totalMoney }} LAK</h2> -->

                            <!-- </v-card> -->
                        </div>


                        <!-- <div style="height: 35px;">
                            <td style="margin-right: 5px;">
                                <h3>ລວມຈ່າຍເບ້ຍລ້ຽງ ເປັນເງີນ :</h3>


                                <b>
                                    <h2 style="margin-top: -3px;" class="red--text">{{ sumtotalOilPaid }} LAK</h2>
                                </b>
                            </td>

                            <td style="margin-right: 5px;">
                                <h3>ລວມຈ່າຍເບ້ຍລ້ຽງ ເປັນເງີນ :</h3>


                                <b>
                                    <h2 style="margin-top: -3px;" class="red--text">{{ totalBialiengthatPaid }} LAK</h2>
                                </b>
                            </td>

                        </div> -->


                    </div>
                </div>

                <div
                    style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px; font-size: 12px">

                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                        <div>ຜູ້ສະຫຼຸບ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            .............................


                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 12px">
                        <div>ບັນຊີຂົນສົ່ງ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ...............................


                        </div>
                    </div>
                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px;padding-right:20px; font-size: 12px">
                        <div>ບັນຊີຄັງເງິນ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            .............................


                        </div>
                    </div>
                    <div
                        style="width:1000px;display:flex;flex-direction:column;justify-content:center;align-items:center; font-size: 12px">
                        <div>ອຳນວຍການ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ............................................


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex';

import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
            ex7: 'red',

            // carPayTotal: null,
            // totalRow: null,
            active: '',
            showAlert: false,
            loading_processing: false,
            end_menu: false,
            endDate: null,
            sumFooter: {},
            sumFooterferpaper: {},
            totalBialiengthatPaid: 0,  // Initialize with a default value
            sumtotalOilPaid: 0,       // Initialize with a default value
            startDate: null,
            start_menu: false,
            status: 'A',
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            startDateMenu: false,
            endDateMenu: false,
            item_id: null,
            loading_processing: false,
            availableYears: this.getYearsArray(),
            // totalPriceNm:priceNamMun*sainummun,
            report_leave_car_header: [
                { text: 'ເລກບິນ', value: 'lahud_POYLOD' },
                { text: 'ທະບຽນຫົວ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ທະບຽນຫາງ', value: 'f_CARD_NO' },
                { text: 'ວັນທີອອກ', value: 'out_DATE' },
                { text: 'ຄົນຂັບ1', value: 'staft_NAME' },
                // { text: 'ຄົນຂັບ2', value: 'staft_NAME1' },
                { text: 'ຊື່ສິນຄ້າ', value: 'pro_NAME' },
                { text: 'ເບ້ຍລ້ຽງຈ່າຍຕົວຈິງຂອງຜູ້ທີ1', value: 'totalBiaLieng' },
                { text: 'ເບ້ຍລ້ຽງຄ້າງຈ່າຍຜູ້ທີ1', value: 'staff_BIALINEG_KANGJAIY' },
                // { text: 'ເບ້ຍລ້ຽງຄ້າງຈ່າຍຜູ້ທີ2', value: 'staff_BIALINEG_KANGSecond' },
                // { text: 'ເບ້ຍລ້ຽງຈ່າຍຕົວຈິງຂອງຜູ້ທີ2', value: 'staff02_beforepay' },
                { text: 'ໃສ່ນ້ຳມັນ', value: 'sainummun' },
                { text: 'ລາຄານ້ຳມັນຕໍ່ລິດ', value: 'priceNamMun' },
                { text: 'ລວມເງິນນ້ຳມັນ', value: 'totalPriceFuel' },
                { text: 'ລວມເງິນສິ້ນເປືອງ', value: 'runningTotal' },
                { text: 'ລວມລາຍຈ່າຍທັງໝົດ', value: 'allLaiyJaiy' },
                { text: 'ສະຖານະ', value: '' },
                { text: '', value: '' },
            ],
            report_leave_car_list: [],
            selected: '',
            search: '',
            successList: 0,
            sumFooter_all: 0,
            waitingList: 0,
            sumTotalPrice: '',
            sumFooterferpaper: '',
            sumFooter_allL: '',
            sumFooter_Credit: '',

            sumFooter_Creditpaid: 0,

            totalMoney2: null,

            usd: '', // Example value for USD credit
            sfcusd: '', // Example value for USD in LAK
            thb: '', // Example value for THB credit
            sfcthb: '', // Example value for THB in LAK
            sfclak: '', // Example value for LAK credit

        }
    },
    watch: {
        sumFooter: 'computeSumFooterAll',
        sumFooterferpaper: 'computeSumFooterAll'
    },
    computed: {
   
    Alltitnee() {
  // Remove commas and convert the strings to numbers before adding them
  const cleanSfcusd = parseFloat(this.sfcusd.replace(/,/g, ''));
  const cleanSfcthb = parseFloat(this.sfcthb.replace(/,/g, ''));
  const cleanSfclak = parseFloat(this.sfclak.replace(/,/g, ''));
  
  // Sum the cleaned values
  const total = cleanSfclak + cleanSfcthb + cleanSfcusd;
  
  // Format the total with commas and return it
  return total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
},

        // formattedTHB() {
        //     return this.sfcthb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // }
        // ,
        // formattedUSD() {
        //     return this.sfcusd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // }
        // ,
        // formattedLAK() {
        //     return this.sfclak.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // }
        // ,
        formattedStartDate() {
            if (!this.startDate) return ''; // Return empty string if date is not set
            const dateObj = new Date(this.startDate);
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formattedEndDate() {
            if (!this.endDate) return ''; // Return empty string if date is not set
            const dateObj = new Date(this.endDate);
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        },
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
            computedSumFooter: "sumFooter" // Renamed here
        }),
    },

    mounted() {
        this.onSearchLeaveCarReport()
        // this.fetchShowOfferPaperData()
        // this.fetchShowTotalOilPaidData()
        this.fetchShowAmountThatPaidStaffData()
        this.onGetshowofferpaper()

        this.rCurrencyUSD()
        this.rCurrencyTHB()
        this.rCurrencyLAK()

    },
    methods: {
        async onGetshowofferpaper() {
            try {
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),
                };
                this.loading_processing = true;
                const response = await this.$axios.$post('/reportshowofferpaper.service', data
                );

                if (response.status === '00' && response.sumFooter && response.sumFooter_Credit) {
                    // Save the totalMoney and totalMoney_credit into component's data
                    this.totalMoney2 = response.sumFooter.totalMoney;
                    this.totalMoneyCredit = response.sumFooter_Credit.totalMoney_credit;
                } else {
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        async rCurrencyUSD() {
            try {
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),
                };
                this.loading_processing = true;
                const response = await this.$axios.$post('/reportShowofferpaperCurrencyUSD.service', data
                );



                if (response.status === '00' && response.sumFooter_Currency) {
                    // Update the sfcthb value with the sum from the API or set it to 0
                    this.sfcusd = response.sumFooter_Currency.sumMoneycurrencyUSD || '0';
                    this.usd = response.sumFooter_Currency.usd || '0';
                    console.log("Total THB:", this.sfcusd);

                } else {
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        async rCurrencyTHB() {
            try {
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),
                };
                this.loading_processing = true;
                const response = await this.$axios.$post('/reportShowofferpaperCurrencyTHB.service', data
                );

                if (response.status === '00' && response.sumFooter_Currency) {
                    // Update the sfcthb value with the sum from the API or set it to 0
                    this.sfcthb = response.sumFooter_Currency.sumMoneyCurrencyTHB || '0';
                    this.thb = response.sumFooter_Currency.thb || '0';
                    console.log("Total THB:", this.sfcthb);

                } else {
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        async rCurrencyLAK() {
            try {
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),
                };
                this.loading_processing = true;
                const response = await this.$axios.$post('/reportShowofferpaperCurrencyLAK.service', data
                );


                if (response.status === '00' && response.sumFooter_Currency) {
                    // Update the sfclak value with the sum from the API or set it to 0
                    this.sfclak = response.sumFooter_Currency.sumMoneycurrencyLAK || '0';
                    console.log("Total THB:", this.sfclak);
                } else {
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        computeSumFooterAll() {
            // Function to format number with commas
            const formatNumber = (number) => {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            };

            // Function to parse formatted number to integer
            const parseFormattedNumber = (formattedNumber) => {
                return parseInt(formattedNumber.replace(/,/g, ''), 10);
            };

            // Retrieve and parse the values
            const biaOutWasted = this.sumFooter.biaOutWasted || 0;
            const totalMoney = this.sumFooter.totalMoney || 0;
            const totalMoneypop = this.sumFooter_Creditpaid.sumtotalOilPaid || 0;
            const totalMoney2 = this.totalMoney2 || 0;
            // <h3 class="red--text ">{{ sumFooter_Creditpaid.sumtotalOilPaid }} LAK</h3>

            // Parse the formatted numbers
            const biaOutWastedParsed = parseFormattedNumber(formatNumber(biaOutWasted));
            const totalMoneyParsed = parseFormattedNumber(formatNumber(totalMoney));
            const totalMoneypopParsed = parseFormattedNumber(formatNumber(totalMoneypop));
            const totalMoney2Parsed = parseFormattedNumber(formatNumber(totalMoney2));

            // Compute the total and format the result
            // this.sumFooter_all = formatNumber(biaOutWastedParsed + totalMoneyParsed);
            this.sumFooter_allL = formatNumber(biaOutWastedParsed + totalMoneyParsed + totalMoney+totalMoney2Parsed+totalMoneypopParsed);
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
            // Update the startDate and endDate based on the selected month
            const currentYear = new Date().getFullYear();
            const start = new Date(currentYear, month - 1, 1);
            const end = new Date(currentYear, month, 0);
            this.startDate = start.toISOString().substr(0, 10);
            this.endDate = end.toISOString().substr(0, 10);
        },
        setYear(year) {
            // Update the startDate and endDate based on the selected year
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
        onCheckAlert() {
            this.report_leave_car_list.map((list) => {
                if (list?.totalDay >= '7' && list?.status === 'N') {
                    this.showAlert = true
                    return
                } else {
                    this.showAlert = false
                    return
                }
            })
        },

        onSearcReport() {

            this.loading_processing = true;
            try {
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),

                    status: 0
                }
                // this.$axios.$post('/ReportStaff.service', data).then((data) => {
                this.$axios.$post('/ReportGiveCarAll', data).then((data) => {
                    console.log("staft:", data)
                    if (data?.status === '00') {
                        this.staft_data_list = data?.data;

                        this.sumFooter = data?.sumFooter
                        console.log("new data footer:", this.sumFooter)

                        this.loading_processing = false
                    } else {
                        this.loading_processing = false
                        swal.fire({
                            icon: 'error',
                            text: data?.message
                        })
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        },
        // onSearcReport() {

        //     this.loading_processing = true;
        //     try {
        //         let data = {
        //             startDate: this.startDate,
        //             endDate: this.endDate,
        //             status: 0
        //         }
        //         // this.$axios.$post('/ReportStaff.service', data).then((data) => {
        //         this.$axios.$post('/ReportGiveCarAll', data).then((data) => {
        //             console.log("staft:", data)
        //             if (data?.status === '00') {
        //                 this.staft_data_list = data?.data;

        //                 this.sumFooters = data?.sumFooter
        //                 console.log("new data footer:", this.sumFooters)

        //                 this.loading_processing = false
        //             } else {
        //                 this.loading_processing = false
        //                 swal.fire({
        //                     icon: 'error',
        //                     text: data?.message
        //                 })
        //             }
        //         })
        //     } catch (error) {
        //         this.loading_processing = false
        //         swal.fire({
        //             icon: 'error',
        //             text: error
        //         })
        //         console.log(error)
        //     }
        // },

        // async fetchShowOfferPaperData() {
        //     this.loading_processing = true;
        //     try {
        //         let data = {
        //             startDate: this.startDate,
        //             endDate: this.endDate,
        //             toKen: localStorage.getItem("toKen"),
        //         };
        //         const response = await this.$axios.$post('/showofferpaper.service', data);
        //         console.log("showofferpaper response:", response);
        //         if (response?.status === '00') {
        //             this.staft_data_list = response?.data;
        //             this.sumFooterferpaper = response?.sumFooter;
        //             console.log("new data footer:", this.sumFooter);
        //         } else {
        //             swal.fire({
        //                 icon: 'error',
        //                 text: response?.message
        //             });
        //         }
        //     } catch (error) {
        //         swal.fire({
        //             icon: 'error',
        //             text: error.message
        //         });
        //         console.log(error);
        //     } finally {
        //         this.loading_processing = false;
        //     }
        // },
        // async fetchShowTotalOilPaidData() {
        //     this.loading_processing = true;
        //     try {
        //         let data = {
        //             startDate: this.startDate,
        //             endDate: this.endDate,
        //             toKen: localStorage.getItem("toKen"),
        //         };
        //         const response = await this.$axios.$post('/ShowTotalOilPaid.service', data);
        //         console.log("showofferpaper response:", response);

        //         if (response?.status === '00') {
        //             this.sumtotalOilPaid = response?.sumFooter?.sumtotalOilPaid || '0';
        //             console.log("Total Oil Paid:", this.sumtotalOilPaid);
        //         } else {
        //             swal.fire({
        //                 icon: 'error',
        //                 text: response?.message
        //             });
        //         }
        //     } catch (error) {
        //         swal.fire({
        //             icon: 'error',
        //             text: error.message
        //         });
        //         console.log(error);
        //     } finally {
        //         this.loading_processing = false;
        //     }
        // },

        async fetchShowAmountThatPaidStaffData() {
            this.loading_processing = true;
            try {
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),
                };
                const response = await this.$axios.$post('/AmountThatPaidStaff.service', data);
                console.log("showofferpaper response:", response);
                if (response?.status === '00') {

                    this.totalBialiengthatPaid = response?.sumFooter?.totalBialiengthatPaid || '0';
                    console.log("new data footer:", this.totalBialiengthatPaid);
                } else {
                    swal.fire({
                        icon: 'error',
                        text: response?.message
                    });
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message
                });
                console.log(error);
            } finally {
                this.loading_processing = false;
            }
        },
        handleSearch() {
            this.onSearchLeaveCarReport();
            // this.fetchShowOfferPaperData();
            // this.fetchShowTotalOilPaidData();
            this.fetchShowAmountThatPaidStaffData();
            this.onGetshowofferpaper()
            this.onGetShowTotalOilPaid()

            this.rCurrencyUSD()
            this.rCurrencyTHB()
            this.rCurrencyLAK()
        },
        onSearchLeaveCarReport() {
            try {
                this.loading_processing = true;
                this.successList = 0
                this.waitingList = 0
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),

                    status: this.status

                }
                this.$axios.$post('/ListReportAll01.service', data).then((data) => {
                    console.log("allReport:", data)
                    if (data?.data) {
                        data.data.forEach(item => {
                            if (item.status === 'Y') {
                                this.successList += 1;
                            } else if (item.status === 'N') {
                                this.waitingList += 1;
                            }
                        });

                        this.report_leave_car_list = data?.data
                        this.sumFooter = data?.sumFooter
                        console.log("new data sum footer:", this.sumFooter)
                        this.loading_processing = false
                        this.onCheckAlert()
                    } else {
                        this.report_leave_car_list = []
                        this.loading_processing = false
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        },
        // async onGetshowofferpaper() {
        //     this.loading_processing = true;
        //     try {

        //         const response = await this.$axios.$post('/showofferpaper.service');
        //         console.log("onGetshowofferpaper:", data)


        //         if (response?.status === '00') {

        //             this.sumFooterferpaper = response?.sumFooter || '0';
        //             console.log("Total Oil Paid:", this.sumFooterferpaper);
        //         } else {
        //             swal.fire({
        //                 icon: 'error',
        //                 text: response?.message
        //             });
        //         }
        //     } catch (error) {
        //         swal.fire({
        //             icon: 'error',
        //             text: error.message
        //         });
        //         console.log(error);
        //     } finally {
        //         this.loading_processing = false;
        //     }
        // },

        // async onGetshowofferpaper() {
        //     try {
        //         let data = {
        //             startDate: this.startDate,
        //             endDate: this.endDate,
        //             toKen: localStorage.getItem("toKen"),
        //         };
        //         this.loading_processing = true;
        //         const response = await this.$axios.$post('/showofferpaper.service', data
        //         );

        //         if (response.status == '00' && Array.isArray(response.data)) {
        //             this.sumFooterferpaper = response?.sumFooter || '0';
        //             console.log("Total Oil Paid:", this.sumFooterferpaper);
        //             this.sumFooter_Credit = response?.sumFooter_Credit || '0';
        //             console.log("Total Oil Paid:", this.sumFooter_Credit);

        //         } else {
        //             swal.fire({
        //                 title: 'ແຈ້ງເຕືອນ',
        //                 text: response.message,
        //                 icon: 'info',
        //                 allowOutsideClick: false,
        //                 confirmButtonColor: '#3085d6',
        //                 confirmButtonText: 'OK',
        //             });
        //         }
        //     } catch (error) {
        //         swal.fire({
        //             title: 'ແຈ້ງເຕືອນ',
        //             text: error.message || 'An error occurred.',
        //             icon: 'error',
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             confirmButtonText: 'OK',
        //         });
        //         console.error(error);
        //     } finally {
        //         this.loading_processing = false;
        //     }
        // },

        async onGetShowTotalOilPaid() {
            try {
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem("toKen"),
                };
                const response = await this.$axios.$post('/ShowTotalOilPaid.service', data);

                if (response.status == '00' && Array.isArray(response.data)) {


                    this.sumFooter_Creditpaid = response?.sumFooter || '0';
                    console.log("Total Oil Paid:", this.sumFooter_Creditpaid);
                } else {
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {

                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        onPrintAgain(lahud_POYLOD,
            customer_ID,
            product_ID,
            product_AMOUNT,
            product_SIZE,
            product_DETAILS,
            detail_send,
            detail_recive,
            place_PD_FROM,
            place_PD_TO,
            staff_ID_NUM1,
            staff_ID_NUM2,
            staff_BIALIENG_FRIST,
            staff_BIALIENG,
            staff_BIALINEG_KANGJAIY,
            header_ID,
            footer_ID,
            out_DATE,
            in_DATE,
            laiyathang,
            sainummun,
            numnuklod,
            kongnarlod,
            khg_MUE_TIDLOD,
            kim_KILO, price, total_price, priceNamMun, currency, staff_Curr) {
            this.$router.push({
                path: '/print-leave-car', query: {
                    key: lahud_POYLOD, cusId: customer_ID,
                    proId: product_ID, proAmount: product_AMOUNT,
                    proWeight: product_SIZE, product_detail: product_DETAILS, detail_send: detail_send, detail_recive: detail_recive, place_from: place_PD_FROM,
                    place_to: place_PD_TO, staft_id1: staff_ID_NUM1, staft_id2: staff_ID_NUM2, bialieng: staff_BIALIENG_FRIST, bialieng1: staff_BIALIENG, bialieng2: staff_BIALINEG_KANGJAIY,
                    head_id: header_ID, footer_id: footer_ID, out_date: out_DATE, in_date: in_DATE, road: laiyathang, nummun: sainummun, car_weight: numnuklod, kongnarlod: kongnarlod, khg_meu_tidlod: khg_MUE_TIDLOD,
                    kim_kilo: kim_KILO, price: price, total_price: total_price, priceNamMun: priceNamMun, currency: currency, staff_Curr: staff_Curr
                }
            })

        },


    }

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
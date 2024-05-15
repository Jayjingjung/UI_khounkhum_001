<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mb-6" rounded="lg">
            <v-card-title style="background-color:#E57373;color:white">ລາຍງານໃບປະຕິບັດງານ</v-card-title>
            <v-card-text>
                <v-form ref="form" lazy-validation v-model="valid">
                    <div style="width:100%;display:flex" class="pt-4">

                        <div class="d-flex align-center">
                            <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                                :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined v-model="formattedStartDate" required
                                        label="ວັນທີເລີ່ມຕົ້ນ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                        v-on="on" :rules="nameRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="start_date" no-title scrollable
                                    @input="$refs.start_menu.save(start_date)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div class="d-flex align-center pl-2">
                            <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                                :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined v-model="formattedEndDate" required
                                        label="ວັນທີສຸດທ້າຍ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                        v-on="on" :rules="nameRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="end_date" no-title scrollable
                                    @input="$refs.end_menu.save(end_date)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </div>


                        <div class="ml-2 pt-2 pl-2 mt-5">
                            <v-btn color="#90A4AE" elevation="0" class="white--text"
                                @click="onSeachPermance(row?.item?.key_ID)"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                        </div>
                        <td class="ml-2 pt-2 mt-5">
                            <v-btn color="#2F7DBB" class="white--text" @click="Print2">
                                <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                            </v-btn>
                        </td>

                        <div style="background-color:#f5f5f5;width:250px;border-radius:5px" class="pa-4 mr-10 ml-10">
                            <div style="width:100%">
                                <v-autocomplete outlined dense label="ເລືອກສິນຄ້າ" 
                                :items="products_data_list"
                                    item-text="proName" item-value="id" @change="onGetProductDetails"></v-autocomplete>
                            </div>

                            <div class="d-flex align-center">
                                <span>ຊື່ສິນຄ້າ:</span>
                                <span class="ml-4">{{ product_name }}</span>
                            </div>

                        </div>

                        <div>
                            <div style="width:80%">
                                <v-autocomplete outlined dense label="ເລືອກລູກຄ້າ" :items="customer_data_list"
                                    item-text="customerName" item-value="id" @change="onGetCustomerDetails"
                                    :rules="nameRules"></v-autocomplete>
                            </div>


                            <div class="d-flex align-center ">
                                <span>ລະຫັດລູກຄ້າ:</span>
                                <span class="ml-4">{{ customer_id }}</span>
                            </div>
                            <div class="d-flex align-center">
                                <span>ຊື່ລູກຄ້າ:</span>
                                <span class="ml-4">{{ customer_name }}</span>
                            </div>
                            <div class="d-flex align-center">
                                <span>ເບີໂທລູກຄ້າ:</span>
                                <span class="ml-4">{{ customer_mobile }}</span>
                            </div>

                        </div>


                        <v-spacer></v-spacer>
                        <div style="width:300px">
                            <v-text-field placeholder="ຄົ້ນຫາດ້ວຍລະຫັດປ່ອຍລົດ..." v-model="search" rounded
                                background-color="#f5f5f5" prepend-inner-icon="mdi-magnify"></v-text-field>
                        </div>
                    </div>
                </v-form>
                <div style="display:flex;align-items:center">

                    <div v-if="showAlert === true"
                        style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                        class="ml-2 pl-2 pr-10">
                        <v-icon color="red">mdi-alert-outline</v-icon>
                        <span class="ml-2 red--text">ລາຍການສີແດງຮອດກຳນົດແລ້ວ!</span>
                    </div>
                </div>

                <div style="width:100%;display:flex;justify-content:start" class="pt-4 mb-10">

                    <div>
                        <h3>ທັງໝົດ: <span class="green--text">{{ report_peration_list?.length }}</span></h3>
                    </div>
                    <div class="ml-5 mr-5">
                        <h3>ອອກໃບຮຽກເກັບເງິນແລ້ວ: <span class="green--text">{{ successList }}</span></h3>
                        <!-- Display number of paid invoices -->
                    </div>

                    <div class="ml-10 mr-5">
                        <h3>ຍັງບໍ່ໄດ້ອອກໃບຮຽກເກັບເງິນ: <span class="red--text">{{ waitingList }}</span></h3>
                        <!-- Display number of unpaid invoices -->
                    </div>
                </div>
                <div>
                    <v-data-table :items="report_peration_list" :headers="report_operation_header" :search="search"
                        style="border-radius:10px">
                        <template v-slot:item="row">
                            <tr
                                :style="{ 'color': row?.item?.totalDay >= '7' && row?.item?.status === 'N' ? 'red' : 'black' }">
                                <td>{{ row?.item?.key_ID }}</td>
                                <td>{{ row?.item?.performancebillno }}</td>
                                <td>{{ row?.item?.customer_NAME }}</td>
                                <td>{{ row?.item?.pro_NAME }}</td>
                                <!-- <td>{{ row?.item?.sainummun?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}</td>
                                <td>{{ row?.item?.priecenumnun?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>
                                <td>{{ row?.item?.totalnummun?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',') }}</td>
                                <td>{{ row?.item?.laiyathang }}</td> -->
                                <td>{{ row?.item?.pro_TYPE }}</td>
                                <td>{{ moment(row?.item?.performancedate).format('DD/MM/YYYY') }}</td>
                                <td>{{ row?.item?.proSize }}</td>
                                <td>{{ row?.item?.prizeProcuctPerT }} {{ row?.item?.currency }}</td>
                                <td class="green--text">{{ row?.item?.total_PRICE?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }} {{ row?.item?.currency }}</td>

                                <td v-if="row?.item?.status === 'N'">

                                    <v-btn small elevation="0" color="red" class="white--text" block>
                                        <v-icon color="white" size="24">mdi-new-box</v-icon>
                                        <span class="white--text ml-2">ຍັງບໍ່ໄດ້ອອກໃບຮຽກເກັບເງິນ</span>
                                        <v-spacer></v-spacer>
                                    </v-btn>


                                </td>
                                <td v-else>
                                    <v-btn small color="green" class="white--text card-shadow align-center" block>
                                        <v-icon color="white">mdi-check-circle</v-icon>
                                        <span>ອອກໃບຮຽກເກັບເງິນແລ້ວ</span>
                                    </v-btn>
                                </td>

                                <td>
                                    <v-btn color="#2F7DBB" small class="white--text card-shadow"
                                        @click="onGetDataListForPrint(row?.item?.key_ID)"><v-icon
                                            color="white">mdi-printer-pos-check-outline</v-icon><span>ພິມບິນຄືນ</span></v-btn>
                                </td>
                            </tr>
                        </template>
                        <!-- sum footer -->
                        <template v-slot:body.append>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td>
                                    <h3>ລວມຈຳນວນໂຕນ:</h3>
                                </td>
                                <td>
                                    <b>
                                        <h3 class="green--text "> {{ sumTonProSize }} T </h3>
                                    </b>
                                </td>
                                <td>
                                    <h3>ລວມທັງໝົດ:</h3>
                                </td>
                                <td>
                                    <b>
                                        <h3 class="green--text "> {{ sumAmount }} LAK </h3>
                                    </b>
                                </td>

                            </tr>
                        </template>
                    </v-data-table>
                </div>
            </v-card-text>

        </v-card>
        <!-- component for print  -->
        <div style="display:none;">
            <div id="modalInvoice">
                <v-row>
                    <v-col cols="3">
                        <img class="mx-auto" src="../assets/images/khounkham.png" height="70px" cover />
                    </v-col>
                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                            <span style="font-size:14px"><b>
                                    <Noti />
                                </b> </span>
                            <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
                                |
                                ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-col>
                </v-row>
                <br>

                <div class="text-center pb-10 pt-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:18px">
                    <b>ໃບປະຕິບັດງານ</b>
                </div>
                <div style="height:20px"></div>

                <div style="display:flex;justify-content:end;flex-direction:column;align-items:end">
                    <!-- <span style="font-size:12pt">ໜ້າທີ: 01</span> -->
                    <div
                        style="border:0.5px solid #999;display:flex;flex-direction:column;padding:10px;border-radius:3px">
                        <span style="font-size:12px">ເລກທີ: {{ performanceSmallHeaderGruops?.keyId }}</span>
                        <span style="font-size:12px">ວັນທີ:
                            {{ moment(performanceSmallHeaderGruops?.printDate).format('DD/MM/YYYY') }}</span>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;font-size:12px">
                    <span>ທະບຽນລົດ: {{ performanceheaderGruops?.h_VICIVLE_NUMBER }}</span>
                    <!-- <span style="margin-left:10px">ທະບຽນຫາງລົດ: B102145</span> -->
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between; font-size:12px">
                    <div>
                        <span>ພະນັກງານຂັບ1: {{ performanceheaderGruops?.staffname }}</span>
                        <span style="margin-left:5px">ພະນັກງານຂັບ2:
                            {{ performanceheaderGruops?.staffname1 }}</span>
                    </div>

                </div>
                <div style="font-size:12px">
                    ວັນທີກັບ: {{ moment(performaceGroupDetails?.perFORMANCEREDATE).format('DD/MM/YYYY') }}
                </div>
                <div style="padding-top:10px">
                    <table
                        style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%; font-size:12px">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px">ລຳດັບ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ວັນທີສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ຊື່ລູກຄ້າ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ສິນຄ້າທີສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ເສັ້ນທາງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ຊື່ຮ້ານຄ້າປາຍທາງ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ເລກທີສັ່ງງານ</td>
                            <td style="border: 0.5px solid #999;padding:5px">ລາຍໄດ້</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px">1</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ moment(performaceGroupDetails?.perFORMANCEDATE).format('DD/MM/YYYY') }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ performaceGroupDetails?.customer_NAME }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ performaceGroupDetails?.pro_NAME }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ performaceGroupDetails?.pro_TYPE }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ performaceGroupDetails?.to_CUSTOMER }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ performaceGroupDetails?.lahud_POYLOD }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ performaceGroupDetails?.total_PRICE }} {{ performaceGroupDetails?.currency }}</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px" colspan="7">ລວມທັງໝົດ</td>
                            <td style="border: 0.5px solid #999;padding:5px">
                                {{ performaceGroupDetails?.total_PRICE }} {{ performaceGroupDetails?.currency }}</td>
                        </tr>
                    </table>
                </div>
                <div
                    style="padding-top:20px;display:flex;flex-direction:row;justify-content:space-between; font-size:12px">
                    <div>
                        <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ລາຍການ</td>
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າໃຊ້ຈ່າຍ</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າເບ້ຍລ້ຽງ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.staff_BIALIENG }} {{ performaceGroupDetails?.staff_Cur }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຊິງມະຫາໄຊ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancejumpho }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຕຳລວດ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancefeepolish }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancefe_PAYANG }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancefeetaxung }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າດ່ານຫວຽດຂາກັບ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performanceovertime }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performanceovervn }}</td>
                            </tr>
                            <!-- <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າລ່ວງເວລາຢູ່ດ່ານຫຼັກ20</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performanceboderlak20 }}</td>
                            </tr> -->
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຊິງນາອິນ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancepassport }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ອື່ນໆ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancevaccine }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າໃບຊີງ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancefeesing }}</td>
                            </tr>

                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancefeesaphan }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າລົງເກືອ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancefeeoutcontainer }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າລ່ວງເວລາ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancefeeyoktu }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ລວມລາຍຈ່າຍທັງໝົດ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.feetotal?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',')
                                }}</td>
                            </tr>
                            <!-- <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າສະພານ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefeesaphan }}</td>
                            </tr> -->

                        </table>
                    </div>
                    <div style="display:flex;flex-direction:column;justify-content:space-between">
                        <div>
                            <div style="border:1px solid #999;">
                                <div style="display:flex;justify-content:center">
                                    <span class="text--center">ຄ່າເຊື້ອເພີງ</span>
                                </div>
                                <v-divider></v-divider>
                                <div style="display:flex;flex-direction:column;padding:10px;width:280px">
                                    <div style="display:flex;flex-direction:row;justify-content:space-between">
                                        <span>ນໍ້າມັນເຕີມ</span>
                                        <v-spacer></v-spacer>
                                        <span>{{ performance_GroupFeePower?.saiNumMun }} ລິດ</span>
                                    </div>
                                    <div style="display:flex;flex-direction:row;justify-content:space-between">
                                        <span>ລາຄານໍ້າມັນຕໍ່ລິດ</span>
                                        <v-spacer></v-spacer>
                                        <span>{{ performance_GroupFeePower?.priceNumMun }}/ລິດ</span>
                                    </div>

                                    <div style="display:flex;flex-direction:row;justify-content:space-between">
                                        <span>ລວມ</span>
                                        <v-spacer></v-spacer>
                                        <span>{{ (performance_GroupFeePower?.totalNumMun)?.replace(/\D/g, '')
                                            .slice(0, -3) // Remove the last three digits (,000)
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
                                    </div>

                                    <!-- <div style="display:flex;flex-direction:row;justify-content:space-between">
                                        <span>ລວມ</span>
                                        <v-spacer></v-spacer>
                                        <span>{{ (performance_GroupFeePower?.totalNumMun)?.replace(/\D/g, '')
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
                                    </div> -->
                                </div>
                                <v-divider></v-divider>
                                <div style="display:flex;flex-direction:column;padding:10px">
                                    <!-- <span></span>
                                    <span></span>
                                    <span></span> -->
                                    <div style="display:flex;flex-direction:column;padding:10px;width:280px">
                                        <div style="display:flex;flex-direction:row;justify-content:space-between">
                                            <span>ເລກໄມທ່ຽວກ່ອນ</span>
                                            <v-spacer></v-spacer>
                                            <span>{{ performance_GroupFeePower?.kimKiLo }}</span>
                                        </div>
                                        <div style="display:flex;flex-direction:row;justify-content:space-between">
                                            <span>ໄລຍະທາງທ່ຽວນີ້</span>
                                            <v-spacer></v-spacer>
                                            <span>{{ performance_GroupFeePower?.laiYaThang }}</span>
                                        </div>
                                        <!-- <div style="display:flex;flex-direction:row;justify-content:space-between">
                                            <span>ເລກໄມທ່ຽວນີ້</span>
                                            <v-spacer></v-spacer>
                                            <span>{{ performance_GroupFeePower?.lekMai }}</span>
                                        </div> -->
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div style="display:flex">
                                <div>ລົງຊື່</div>
                                <div style="border-bottom:1px solid #999;width:100%"></div>
                                <div style="width:70px">ຜູ້ຮັບເງິນ</div>
                            </div>
                            <br />
                            <div style="display:flex">
                                <div>ລົງຊື່</div>
                                <div style="border-bottom:1px solid #999;width:100%"></div>
                                <div style="width:80px">ຜູ້ຈ່າຍເງິນ</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- customer -->
            </div>
        </div>
        <div style="display:none">
            <div id="Print_all">
                <v-row>
                    <v-col cols="3">
                        <img class="mx-auto" src="../assets/images/khounkham.png" height="70px" cover />
                    </v-col>
                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">

                            <span style="font-size:14px">

                                <Noti />

                            </span>

                            <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
                                |
                                ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-col>
                </v-row>
                <br>
                <div class="text-center" style="display:flex;justify-content:center;font-size:20px;font-weight:bold">
                    ລາຍງານໃບປະຕິບັດງານ</div>

                <span style="width:100%;margin-top:20px;;font-size:12px;display:flex;justify-content:start"
                    class="pt-4 mb-10">

                    <div class="ml-10 mr-5">
                        <span> ທັງໝົດ: </span>
                        <span class="green--text ml-10 mr-5">{{ report_peration_list?.length }}</span>
                    </div>

                    <div class="ml-5 mr-5">
                        <span> ອອກໃບຮຽກເກັບເງິນແລ້ວ: <span class="green--text">{{ successList }}</span></span>
                        <!-- Display number of paid invoices -->
                    </div>

                    <div class="ml-10 mr-5">
                        <span> ຍັງບໍ່ໄດ້ອອກໃບຮຽກເກັບເງິນ: <span class="red--text">{{ waitingList }}</span></span>
                        <!-- Display number of unpaid invoices -->
                    </div>
                </span>


                <table style="border-collapse: collapse; width: 100%; font-size: 12px; margin-top: 20px;">
                    <tr>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">ລຳດັບ</td>
                        <th style="border: 1px solid #999; padding: 8px;">ວັນທີ</th>
                        <th style="border: 1px solid #999; padding: 8px;">ເລກບິນ</th>
                        <th style="border: 1px solid #999; padding: 8px;">ເລກປ່ອຍລົດ</th>
                        <th style="border: 1px solid #999; padding: 8px;">ຊື່ລູກຄ້າ</th>
                        <th style="border: 1px solid #999; padding: 8px;">ສິນຄ້າ</th>
                        <th style="border: 1px solid #999; padding: 8px;">ຮ້ານຄ້າປາຍທາງ</th>
                        <th style="border: 1px solid #999; padding: 8px;">ຈຳນວນໂຕນ(T)</th>
                        <th style="border: 1px solid #999; padding: 8px;">ລາຄາຕໍ່ໂຕນ</th>
                        <th style="border: 1px solid #999; padding: 8px;">ລາຍຮັບທັງໝົດ</th>
                        <!-- Add other table headers as needed -->
                    </tr>

                    <tr v-for="(item, index) in report_peration_list" :key="index">
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                            class="font-weight-bold">{{ index + 1 }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.performancedate }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.key_ID }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.performancebillno }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.customer_NAME }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.pro_NAME }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.pro_TYPE }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.proSize }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.prizeProcuctPerT }}</td>
                        <td style="border: 1px solid #999; padding: 8px;">{{ item.total_PRICE }}</td>
                        <!-- Add other table data cells as needed -->
                    </tr>
                </table>

                <div
                    style="display: flex;margin-top:10px; flex-direction: column; justify-content: flex-end; font-size: 13px;">
                    <div style="height: 35px;">
                        <td>
                            <h3>ລວມຈຳນວນໂຕນ: </h3>
                        </td>
                        <td>
                            <b>
                                <h3 class="green--text "> {{ sumTonProSize }} T </h3>
                            </b>
                        </td>
                    </div>

                    <div style="height: 35px;">
                        <td>
                            <h3>ລວມທັງໝົດ: </h3>
                        </td>
                        <td>
                            <b>
                                <h3 class="green--text "> {{ sumAmount }} LAK </h3>
                            </b>
                        </td>
                    </div>

                </div>

                <div
                    style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px; font-size: 12px">


                    <div
                        style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 12px">
                        <div>ບັນຊີຂົນສົ່ງ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ...............................
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            products_data_list: [],
            moment: moment,
            sumAmount: null,
            sumTonProSize: null,
            showAlert: false,
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງເລືອກ'],
            search: '',
            loading_processing: false,
            end_menu: false,
            product_name: '',
            customer_data_list:[],
            end_date: null,
            start_menu: false,
            start_date: null,

            report_peration_list: [],
            report_operation_header: [
                { text: 'ເລກບິນ', value: 'key_ID' },
                { text: 'ເລກປ່ອຍລົດ', value: 'performancebillno' },
                { text: 'ຊື່ລູກຄ້າ', value: 'customer_NAME' },
                { text: 'ສິນຄ້າ', value: 'pro_NAME' },
                { text: 'ຮ້ານຄ້າປາຍທາງ', value: 'pro_TYPE' },
                { text: 'ວັນທີ', value: 'performancedate' },
                { text: 'ຈຳນວນໂຕນ(T)', value: 'proSize' },
                { text: 'ລາຄາຕໍ່ໂຕນ', value: 'prizeProcuctPerT' },
                { text: 'ລາຍຮັບທັງໝົດ', value: 'total_PRICE' },
                { text: 'ສະຖານະ', value: 'status' },
                { text: '', value: '' }
            ],
            per_key: '',
            // state for print 
            performaceGroupDetails: [],
            performaceGroupFee: [],
            performanceSmallHeaderGruops: [],
            performance_GroupFeePower: [],
            performanceheaderGruops: [],
            successList: 0,
            waitingList: 0


        }

    },

    computed: {
        formattedStartDate() {
            if (!this.start_date) return ''; // Return empty string if date is not set
            const dateObj = new Date(this.start_date);
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formattedEndDate() {
            if (!this.end_date) return ''; // Return empty string if date is not set
            const dateObj = new Date(this.end_date);
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        }
    },

    mounted() {
        this.onGetAllPermance()
        this.onGetProductsList();
        this.onGetCustomerList(); 
    },
    methods: {

        async onGetProductsList() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('getAllProduct', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response?.status === '00') {
                    this.products_data_list = response.data;
                    this.loading_processing = false;
                    console.log('products_list:', response);
                }
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        async onGetCustomerList() {
        try {
            this.loading_processing = true;
            const response = await this.$axios.$post('getAllCustomer', {
                toKen: localStorage.getItem('toKen'),
            });
            if (response?.status === '00') {
                this.customer_data_list = response?.data;
                this.loading_processing = false;
                console.log('customer_list:', response);
            }
        } catch (error) {
            this.loading_processing = false;
            console.error(error);
            swal.fire({
                title: 'ແຈ້ງເຕືອນ',
                text: error.message || 'Unknown error occurred',
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        }
    },
        onCheckAlert() {
            this.report_peration_list.map((list) => {
                if (list?.totalDay >= '7' && list?.status === 'N') {
                    this.showAlert = true
                    return
                } else {
                    this.showAlert = false
                    return
                }
            })
        },
        onGetDataListForPrint(key) {
            try {
                let data = {
                    performanceBillNo: key,
                    toKen: localStorage.getItem("toKen")

                }
                this.loading_processing = true
                console.log("datadend:", data)
                this.$axios.$post('/ListPrintBillByNo.service', data).then((data) => {
                    console.log("dataForPrint:", data)
                    this.data_for_print = data;
                    this.performaceGroupDetails = data?.performaceGroupDetails[0],
                        this.performaceGroupFee = data?.performaceGroupFee[0],
                        this.performanceSmallHeaderGruops = data?.performanceSmallHeaderGruops[0],
                        this.performance_GroupFeePower = data?.performance_GroupFeePower[0],
                        this.performanceheaderGruops = data?.performanceheaderGruops[0]
                    setTimeout(() => {
                        this.loading_processing = false
                        this.print()
                    }, 1000);
                })
            } catch (error) {
                console.log(error)
            }
        },
        onGetAllPermance() {
            this.loading_processing = true;
            this.successList = 0; // Reset counters for success and waiting items
            this.waitingList = 0;

            try {
                this.$axios.$post('/ListViewPerformance.service', {
                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    if (data?.data) {
                        this.report_peration_list = data.data;
                        this.sumTonProSize = data?.sumTonProSize;

                        // Format the sumAmount with commas
                        if (data?.sumAmount) {
                            const formattedSumAmount = data.sumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            this.sumAmount = formattedSumAmount;
                            this.sumTonProSize = sumTonProSize;
                        } else {
                            this.sumAmount = 'N/A';
                            this.sumTonProSize = 'N/A';
                            
                        }

                        // Count success and waiting statuses in the fetched data
                        data.data.forEach(item => {
                            if (item.status === 'Y') {
                                this.successList += 1; // Increment successList for each 'Y' status
                            } else if (item.status === 'N') {
                                this.waitingList += 1; // Increment waitingList for each 'N' status
                            }
                        });

                        console.log("data_all_permance:", data.data);
                        this.onCheckAlert(); // Additional processing or checks
                    } else {
                        this.report_peration_list = []; // Reset the list if no data is returned
                    }
                    this.loading_processing = false;
                }).catch(error => {
                    // console.error("Error in onGetAllPermance:", error);
                    this.loading_processing = false;
                });
            } catch (error) {
                console.error("Error in onGetAllPermance:", error);
                this.loading_processing = false;
            }
        },
        onGetProductDetails(id) {

            let data = this.products_data_list.filter((el => el.id === id));
            this.product_name = data[0]?.proName;
            this.product_ID = id;
        },
        onGetCustomerDetails(id) {
            console.log(id)
            let data = this.customer_data_list.filter((el => el.id === id));
            // console.log("filter:",data)
            this.customer_name = data[0]?.customerName
            this.customer_mobile = data[0]?.mobile
            this.customer_id = id
        },

        onSeachPermance(key) {
            // if (!this.$refs.form.validate()) return null;
            try {
                let data = {
                    performanceBillNo: key,
                    performanceReDate: this.start_date,
                    toKen: localStorage.getItem('toKen'),
                    performanceDate: this.end_date,
                    productId: this.product_ID,
                    custormerId: this.customer_id
                };
                this.$axios.$post('/SearchBillPerformance.service', data).then((response) => {
                    if (response?.data) {
                        this.report_peration_list = response.data;
                        this.sumAmount = response?.sumAmount; // Update sumAmount here
                        this.sumTonProSize = response?.sumTonProSize;

                        this.successList = response.data.filter(item => item.status === 'Y').length;
                        this.waitingList = response.data.filter(item => item.status === 'N').length;

                        // Format the sumAmount with commas
                        if (this.sumAmount !== null) {
                            this.sumAmount = this.sumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        } else {
                            this.sumAmount = 'N/A';
                        }
                    } else {
                        this.report_peration_list = [];
                        this.sumAmount = null; // Reset sumAmount if no data is returned
                    }
                });
            } catch (error) {
                console.log(error);
            }
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
        Print2() {
            const modal = document.getElementById("Print_all");
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

    }
}
</script>

<style lang="scss">
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
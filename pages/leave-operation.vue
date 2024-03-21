<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="mb-4 card-shadow" rounded="lg">
            <v-card-title style="font-size:16pt;background-color:#E57373;color:white">
                <div style="display:flex;align-items:center">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="operation-list">
                        <v-icon color="#E57373">mdi-arrow-left</v-icon>
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
                <span class="ml-4">ອອກໃບປະຕິບັດງານ</span>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-10">
                <div style="display:flex;border-radius:5px">
                    <div style="width:300px">
                        <v-text-field flat solo background-color="#e0e0e0" color="#568fb3"
                            placeholder="ປ້ອນເລກບິນປ່ອຍລົດ..." v-model="l_id"
                            @keyup.enter="onGetPerformanceData"></v-text-field>

                    </div>
                    <div style="margin-top:2px">
                        <v-btn color="#546E7A" class="white--text ml-2 mb-0" height="48" style="margin-top:-2px"
                            @click="onGetPerformanceData" elevation="0"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <div style="margin-top:2px">
                        <v-btn color="#2979FF" class="white--text ml-2 mb-0 card-shadow" height="40" width="200"
                            style="margin-top:-2px;"
                            @click="showLeavCarDialog = true"><v-icon>mdi-format-list-bulleted</v-icon>ເລືອກລາຍການ</v-btn>
                    </div>
                    <!-- <div class="text-center">
                        <span>ເລກບິນ: {{ perBillNoAuto }}</span>
                    </div> -->


                </div>
                <v-divider></v-divider>
                <div style="display:flex;flex-direction:row;" class="pt-2">
                    <span><span class="font-weight-bold">ທະບຽນລົດ:</span> {{ performance_data[0]?.f_CARD_NO }}</span>
                    <div class="pl-10">
                        <span><span class="font-weight-bold">ພະນັກງານຂັບ1:</span> {{ performance_data[0]?.staffname
                            }}</span>
                        <span style="margin-left:5px"><span class="font-weight-bold">ພະນັກງານຂັບ2:</span> {{
            performance_data[0]?.staffname1 }}</span>
                    </div>
                    <!-- <div class="pl-10">
                        ວັນທີອອກ: {{performance_data[0]?.out_DATE}}
                    </div> -->
                </div>
                <div style="border-radius:5px" class=" mt-2">
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold" class="text-left">ລຳດັບ
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold">ວັນທີສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold">ຊື່ລູກຄ້າ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold">ສິນຄ້າທີສົ່ງ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold">ເສັ້ນທາງ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold">ຊື່ຮ້ານຄ້າປາຍທາງ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold">ເລກທີສັ່ງງານ</td>
                            <td style="border: 0.5px solid #999;padding:5px;font-weight:bold">ລາຍໄດ້</td>
                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px" class="text-left">1</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ performance_data[0]?.out_DATE }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ performance_data[0]?.customer_NAME }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ performance_data[0]?.pro_NAME }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ performance_data[0]?.road_DURATION }}
                            </td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ performance_data[0]?.reciver }}</td>
                            <td style="border: 0.5px solid #999;padding:5px">{{ performance_data[0]?.lahud_POYLOD }}
                            </td>

                            <td style="border: 0.5px solid #999;padding:5px" class="red--text">
                                {{ (performance_data[0]?.total_PRICE)?.replace(/\D/g, '')
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{ performance_data[0]?.currency }}</td>

                        </tr>
                        <tr style="padding:5px;border: 0.5px solid #999;">
                            <td style="border: 0.5px solid #999;padding:5px" colspan="7"
                                class="font-weight-bold text-left">
                                ລວມທັງໝົດ:</td>
                            <td style="border: 0.5px solid #999;padding:5px" class="red--text">{{
            (performance_data[0]?.total_PRICE
            )?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} {{ performance_data[0]?.currency }}</td>
                        </tr>
                    </table>
                    <div class="pt-4 d-flex align-center" style="">
                        <!-- ເລືອກວັນທີກັບ -->
                        <div style="width: 770px">
                            <v-menu ref="start_go_menu" v-model="start_go_menu" :close-on-content-click="false"
                                :return-value.sync="start_go_date" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <span>ວັນທີກັບ</span>
                                    <v-text-field v-model="start_go_date" dense flat solo background-color="#a4eaff"
                                        required placeholder="ເລືອກວັນທີກັບ" prepend-inner-icon="mdi-calendar" readonly
                                        v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="start_go_date" no-title scrollable
                                    @input="$refs.start_go_menu.save(start_go_date)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </div>



                        <div style="width: 700px" class="pl-2">
                            <span>ນໍ້າໜັກລົດເປົ່າ<span  style="color: red"> 1</span></span>
                            <v-text-field flat solo dense background-color="#ffb6b6" placeholder="ປ້ອນນ້ຳໜັກລົດເປົ່າ"
                                v-model="numnuklod"></v-text-field>
                        </div>

                        <div style="width:700px" class="pl-2">
                            <span>ລາຄາ <span  style="color: red"> 2</span> </span>
                            <v-text-field flat solo dense background-color="#fc9a9a" placeholder="ປ້ອນລາຄາ"
                                v-model="price"></v-text-field>
                        </div>

                        <div style="width:700px" class="pl-2">
                            <span>ນໍ້າໜັກສິນຄ້າ <span  style="color: red"> 3</span></span>
                            <v-text-field flat solo dense background-color="#ff8383" placeholder="ປ້ອນນໍ້າໜັກສິນຄ້າ"
                                append-icon="mdi-format-title" v-model="proSize"></v-text-field>
                        </div>
                        <div style="width: 750px" class="pl-2">
                            <span>ນໍ້າໜັກທັງໝົດ <spam :style="{ color: 'red' }">( ຄິດໄລເເບບໂອໂຕ )</spam></span>
                            <v-text-field flat solo dense background-color="#ffdb9c" placeholder="ນໍ້າໜັກທັງໝົດ"
                                v-model="numnuktotal" readonly></v-text-field>
                        </div>
                        <div style="width:700px" class="pl-2">
                            <span>ລາຄາລວມ <spam :style="{ color: 'red' }">( ຄິດໄລເເບບໂອໂຕ )</spam></span>
                            <v-text-field readonly flat solo dense background-color="#ffdb9c" placeholder="ລາຄາລວມ"
                                v-model="price_total"></v-text-field>
                        </div>
                        <div style="width:700px" class="pl-2">
                            <span>ສະກຸນເງິນ</span>
                            <v-select label="ເລືອກສະກຸນເງິນ" class="pl-2" flat solo dense background-color="#ea90f4"
                                :items="currency_items" v-model="currency"></v-select>
                        </div>

                    </div>
                </div>
                <!-- <div>
                    <v-divider class="mb-2"></v-divider>
                    <span>- ຄ່າໃຊ້ຈ່າຍ(ຖ້າມີ)</span>
                    <div style="width:100%" class="pt-4">
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າຈໍ້າປື້ມຕັ່ງສິດລົດ"
                                    v-model="performanceJumPho"></v-text-field>
                                
                            </div>
                            <div style="width:100%" class="px-2">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າຕຳລວດ"
                                    v-model="performanceFeePolish"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າປະຢາງ"
                                    v-model="per_PA"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າທ່ຽວ"
                                    v-model="performanceFeeTiew"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າລ່ວງເວລາຢູ່ຫວຽດນາມ"
                                    v-model="performanceOverVN"></v-text-field>
                            </div>
                            <div style="width:100%" class="pl-2">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າຍົກຕູ້"
                                    v-model="performanceFeeYoktu"></v-text-field>
                            </div>
                            <div style="width:100%" class="pl-2">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າຕາຊັ່ງ"
                                    v-model="performanceFeeTaxung"></v-text-field>
                            </div>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <v-text-field flat solo background-color="#f5f5f5" dense
                                    placeholder="ຄ່າລ່ວງເວລາຢູ່ດ່ານຫຼັກ20" v-model="performanceBoderLak20"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າປະທັບກາພາສປອດ"
                                    v-model="performancePassport"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າຊິດຢາຕ້ານເສື້ອ"
                                    v-model="performanceVaccine"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <v-text-field flat solo background-color="#f5f5f5" dense placeholder="ຄ່າແຈ້ງຊີງ"
                                    v-model="performanceFeeSing"></v-text-field>
                            </div>
                            <div style="width:100%"><v-text-field flat solo background-color="#f5f5f5" dense
                                    placeholder="ຄ່າສະພານ" v-model="performanceFeeSaPhan"></v-text-field>
                            </div>
                            <div style="width:100%" class="pl-2">
                                <v-text-field flat solo background-color="#f5f5f5" dense
                                    placeholder="ຄ່າເອົາຕູ້ອອກຈາກດ່ານລາວ"
                                    v-model="performanceFeeOutContainer"></v-text-field>
                            </div>
                           
                        </div>

                    </div>
                </div> -->




                <!-- ເລືອກວັນກຳນົດເກັບເງິນ -->
                <div style="width:15%">
                    <v-menu ref="dpay_Moneyy" v-model="dpay_Moneyy" :close-on-content-click="false"
                        :return-value.sync="dpay_Money" transition="scale-transition" offset-y min-width="auto">

                        <template v-slot:activator="{ on, attrs }">
                            <span>ວັນທີເກັບເງິນ</span>
                            <v-text-field v-model="dpay_Money" dense flat solo background-color="#a4eaff" required
                                placeholder="ເລືອກວັນກຳນົດເກັບເງິນ" prepend-inner-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dpay_Money" no-title scrollable
                            @input="$refs.dpay_Moneyy.save(dpay_Money)">
                        </v-date-picker>
                    </v-menu>
                </div>
                <div class="text-center">
                    <span class="white-text large-text" style="color: red;font-size:15px;font-weight:bold">ໃຫ້ໃສຂໍມູນຕາມລໍາດັບ 1 2 3</span>
                </div>
                <div class="text-center">
                    <span class="white-text large-text" style="color: red;font-size:15px;font-weight:bold">ຖ້າມີການ ປຽນຂໍມູນ 1 2 ໃຫ້ ໃສ ຂໍມູນ 3 ຄືນໄໝ່</span>
                </div>

                <div class="pl-2 d-flex">
                    <v-spacer></v-spacer>
                    <v-btn color="#2979FF" width="200" height="40" class="white--text card-shadow" style=""
                        @click="onSavePerformance"><v-icon>mdi-printer-pos-check-outline</v-icon> ພີມບິນ</v-btn>
                </div>
                <v-snackbar :timeout="3000" v-model="showSnakbar" :value="true" centered elevation="0" color="orange">
                    <div class="d-flex align-center">
                        <v-icon color="white" size="40">mdi-alert-outline</v-icon>
                        <span style="font-size:12pt">ກະລຸນາຄົ້ນຫາຂໍ້ມູນກ່ອນ</span>
                    </div>
                </v-snackbar>
                <v-snackbar :timeout="3000" v-model="showDate" centered elevation="0" color="orange">
                    <div class="d-flex align-center">
                        <v-icon color="white" size="40">mdi-alert-outline</v-icon>
                        <span style="font-size:12pt">ກະລຸນາເລືອກວັນທີລົດກັບ</span>
                    </div>
                </v-snackbar>
                <v-snackbar :timeout="3000" v-model="showLet" centered elevation="0" color="orange">
                    <div class="d-flex align-center">
                        <v-icon color="white" size="40">mdi-alert-outline</v-icon>
                        <span style="font-size:12pt">ກະລຸນາປ້ອນເລກໄມທ່ຽວນີ້</span>
                    </div>
                </v-snackbar>
            </v-card-text>
            <!-- <v-btn @click="onGetDataListForPrint">test</v-btn> -->
        </v-card>
        <v-dialog v-model="showLeavCarDialog" max-width="1200" persistent scrollable>
            <v-card>

                <v-card-title style="background-color:#E57373;color:white">
                    <div class="d-flex align-center" style="width:100%">
                        ລາຍການປ່ອຍລົດ
                        <v-spacer></v-spacer>
                        <v-btn icon elevation="0" @click="showLeavCarDialog = false"><v-icon
                                color="white">mdi-close</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <div style="border:1px solid #E0E0E0;border-radius:3px" class="mt-2">

                        <v-data-table :items="report_peration_list" :headers="report_operation_header" :search="search">

                            <template v-slot:item="row">

                                <tr :style="{ 'color': row?.item?.totalDay >= '7' ? 'red' : 'black' }">

                                    <td>{{ row?.item?.lahud_POYLOD }}</td>
                                    <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                                    <td>{{ row?.item?.f_CARD_NO }}</td>
                                    <!-- <td>{{ row?.item?.staft_NAME }} <span>{{ row?.item?.staft_SURNAME }}</span></td>
                                    <td>{{ row?.item?.staft_NAME1 }} <span>{{ row?.item?.staft_SURNAME1 }}</span></td>
                                    <td>{{ row?.item?.staff_BIALIENG_FRIST }}</td> -->
                                    <td>{{ row?.item?.pro_NAME }}</td>

                                    <!-- ລາຄາ -->

                                    <!-- <td class="red--text font-weight-bold">{{ row?.item?.price }} {{ row?.item?.currency }}
                                    </td> -->

                                    <!-- ລາຄາ -->


                                    <td v-if="row?.item?.status === 'N'" class="red--text">
                                        <div class="d-flex algin-center" style="width:150px">
                                            <v-btn small class="card-shadow" color="red">
                                                <v-icon color="white" size="24">mdi-new-box</v-icon>
                                                <span class="white--text">ລໍຖ້າອອກໃບປະຕິບັດ</span>
                                            </v-btn>
                                        </div>
                                    </td>
                                    <td v-else class="green--text">
                                        <div class="d-flex algin-center" style="width:90px">
                                            <v-icon color="green">mdi-check-circle</v-icon>
                                            <span>ສຳເລັດ</span>
                                        </div>
                                    </td>
                                    <td><v-btn small color="#2979FF" class="card-shadow white--text"
                                            @click="onChoose(row?.item?.lahud_POYLOD)"><v-icon>mdi-check</v-icon>ເລືອກ</v-btn>
                                    </td>

                                </tr>
                            </template>
                        </v-data-table>
                    </div>
                </v-card-text>
            </v-card>

        </v-dialog>
        <!-- component for print -->
        <div style="display:none;">
            <div id="modalInvoice">
                <v-row>
                    <v-col cols="3">
                        <img class="mx-auto" src="../assets/images/khounkham.png" height="70px" cover />
                    </v-col>
                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                            <span style="font-size:14px"><b><Noti/> </b> </span>
                            <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining |
                                ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-col>
                </v-row>
                <br>
                <div class="text-center pb-10 pt-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:20px">
                    <b>ໃບປະຕິບັດງານ</b>
                </div>
                <div style="height:20px"></div>

                <div style="display:flex;justify-content:end;flex-direction:column;align-items:end">
                    <!-- <span style="font-size:12pt">ໜ້າທີ: 01</span> -->
                    <div
                        style="border:0.5px solid #999;display:flex;flex-direction:column;padding:10px;border-radius:3px">
                        <span style="font-size:12px">ເລກທີ: {{ performanceSmallHeaderGruops?.keyId }}</span>
                        <span style="font-size:12px">ວັນທີ:
                            {{ moment(performanceSmallHeaderGruops?.printDate).format('DD/MM/YYYY hh:mm:ss') }}</span>
                        <span style="font-size:12px">ກຳນົດເກັບເງິນ:
                            {{ moment(dpay_Money).format('DD/MM/YYYY') }}</span>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row; font-size:12px">
                    <span>ທະບຽນລົດ: {{ performanceheaderGruops?.h_VICIVLE_NUMBER }}</span>
                    <!-- <span style="margin-left:10px">ທະບຽນຫາງລົດ: B102145</span> -->
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between; font-size:12px">
                    <div>
                        <span>ພະນັກງານຂັບ1:{{ performanceheaderGruops?.staffname }}</span>
                        <span>ພະນັກງານຂັບ2:{{ performanceheaderGruops?.staffname1 }}</span>
                    </div>

                </div>
                <div style="font-size:12px">
                    ວັນທີກັບ: {{ moment(start_go_date).format('DD/MM/YYYY') }}
                </div>
                <div style="padding-top:10px; font-size:12px">
                    <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
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
                                {{ performaceGroupDetails?.perFORMANCEREDATE }}</td>
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
                <!-- ຄ່າໃຊ້ຈ່າຍອື່ນໆ -->
                <div
                    style="padding-top:20px;display:flex;flex-direction:row;justify-content:space-between; font-size:12px">
                    <div>
                        <table style="padding:2px;border: 0.5px solid #FFF;border-collapse: collapse;width:100%">
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td colspan="2" style="border: 0.5px solid #999;padding:5px">ຄ່າໃຊ້ຈ່າຍ</td>
                                <!-- <td style="border: 0.5px solid #999;padding:5px">ຄົນຂັບ1</td> -->
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າເບ້ຍລ້ຽງ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.staff_BIALIENG?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g,
                    ',') }}
                                    {{ performaceGroupFee?.staff_Cur }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຊິງມະຫາໄຊ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancejumpho?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຕຳລວດ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefeepolish?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefe_PAYANG?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>


                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performanceovervn?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>

                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າດ່ານຫວຽດຂາກັບ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performanceovertime?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>



                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefeetaxung?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>



                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າໃບຊີງ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefeesing?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefeesaphan?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າລົງເກືອ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefeeoutcontainer?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າລ່ວງເວລາ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancefeeyoktu?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>



                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຊິງ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancepassport?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>

                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ອື່ນໆ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
            performaceGroupFee?.performancevaccine?.replace(/\D/g,
                '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>


                          
                            <!-- <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າລ່ວງເວລາຢູ່ດ່ານຫຼັກ20</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performanceboderlak20?.replace(/\D/g,
                                        '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr>
                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າປະທັບກາພາສປອດ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancepassport?.replace(/\D/g,
                                        '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr> -->
                            <!-- <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ຄ່າຊິດຢາຕ້ານເສື້ອ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.performancevaccine?.replace(/\D/g,
                                        '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            </tr> -->


                            <tr style="padding:5px;border: 0.5px solid #999;">
                                <td style="border: 0.5px solid #999;padding:5px">ລວມລາຍຈ່າຍທັງໝົດ</td>
                                <td style="border: 0.5px solid #999;padding:5px">{{
                                    performaceGroupFee?.feetotal?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ',')
                                    }}</td>
                            </tr>

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

                                    <!-- <div style="display:flex;flex-direction:row;justify-content:space-between">
                                        <span>ລວມ</span>
                                        <v-spacer></v-spacer>
                                        <span>{{ (performance_GroupFeePower?.totalNumMun)?.replace(/\D/g, '')
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
                                    </div> -->
                                    <div style="display:flex;flex-direction:row;justify-content:space-between">
                                        <span>ລວມ</span>
                                        <v-spacer></v-spacer>
                                        <span>{{ (performance_GroupFeePower?.totalNumMun)?.replace(/\D/g, '')
                                            .slice(0, -3) // Remove the last three digits (,000)
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
                                    </div>

                                </div>
                                <v-divider></v-divider>
                                <div style="display:flex;flex-direction:column;padding:10px">

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
    </div>
</template>

<script>
import swal from 'sweetalert2'
import moment from 'moment'
export default {
    data() {
        return {
            // pick_date_get_money: null,
            dpay_Money: '',
            moment: moment,
            currency_items: ['LAK', 'USD', 'THB', 'CNY'],
            currency: '',
            price: '',
            price_total: '',
            proSize: '',
            numnuktotal: '',
            numnuklod: '',
            dpay_Moneyy: false,
            showDate: false,
            showLet: false,
            search: '',
            showSnakbar: false,
            data_for_print: [],
            loading_processing: false,
            start_go_menu: false,
            end_menu: false,
            start_go_date: null,
            performance_data: '',
            l_id: '',
            performanceBillNo: '',
            performanceReDate: '',
            performanceTotal: '',
            performanceOvertime: '',
            performanceJumPho: '',
            performanceFeePolish: '',
            performanceFeeTaxung: '',
            performanceFeeTiew: '',
            performanceOverVN: '',
            performanceBoderLak20: '',
            performancePassport: '',
            performanceVaccine: '',
            performanceFeeSing: '',
            performanceFeeSaPhan: '',
            performanceFeeYoktu: '',
            performanceFeeOutContainer: '',
            feeUnit: '',
            feeTotal: '',
            per_PA: '',
            performaceGroupDetails: [],
            performaceGroupFee: [],
            performanceSmallHeaderGruops: [],
            performance_GroupFeePower: [],
            performanceheaderGruops: [],
            let_mai: '',
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],
            perBillNoAuto: '',
            kim: '',
            report_peration_list: [],
            report_operation_header: [
                { text: 'ເລກບິນ', value: 'lahud_POYLOD' },
                { text: 'ທະບຽນຫົວ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ທະບຽນຫາງ', value: 'f_CARD_NO' },
                { text: 'ຊື່ສິນຄ້າ', value: 'pro_NAME' },
                // { text: 'ລາຄາ', value: 'price' },
                { text: 'ສະຖານະ', value: '' },
                { text: 'ເລືອກ', value: '' },
            ],
            showLeavCarDialog: false,
            check_kim: ''
        }
    },
    mounted() {
        this.onGetPerIdAutoGenerate()
        this.onGetLeacarList()
        let test = 25.50 * 100
        console.log(test)
    },
    watch: {
        numnuklod: function (newValue) {
            const result = newValue?.replace(/[^\d.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

            this.numnuklod = result;
            //numnuktotal

            this.numnuktotal = totalNumnuk?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            const totalNumnuk = parseFloat(newValue?.split(' ')?.join('')) + parseFloat(this.proSize?.split(' ')?.join(''));

            //numnuktotal


        },
        let_mai: function (value) {
            this.check_kim = parseFloat(value?.split(' ')?.join('')) - parseFloat(this.kim?.split('-').join(''));
        },
        proSize: function (newValue) {
            const reals = parseFloat(newValue?.split(' ')?.join('')) * parseFloat(this.price ? this.price?.split(' ')?.join('') : 1);

            // Calculate price_total
            this.price_total = reals?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

            // Calculate numnuktotal only if numnuklod is greater than 0
            if (parseFloat(this.numnuklod?.split(' ')?.join('')) > 0) {
                const totalNumnuk = parseFloat(newValue?.split(' ')?.join('')) + parseFloat(this.numnuklod?.split(' ')?.join(''));
                this.numnuktotal = totalNumnuk?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

            // Set proSize to newValue
            this.proSize = newValue;
        },

        price: function (newValue) {
            const result = newValue?.replace(/[^\d.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

            const reals = parseFloat(newValue?.split(' ')?.join('')) * parseFloat(this.proSize !== '0' ? this.proSize?.split(' ')?.join('') : 1);


            this.price_total = reals?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

            this.price = result;

        },

        price_total: function(newValue) {
        const result = newValue?.replace(/[^\d.]/g, ','); // Remove all characters except digits and decimals

        this.price_total = result; // Update price_total with the modified value
    }

        //     price_total: function(newValue) {
        //     // Ensure newValue is not null or undefined
        //     if (newValue != null) {
        //         // Parse newValue as a float
        //         const floatValue = parseFloat(newValue);

        //         // Check if floatValue is a valid number
        //         if (!isNaN(floatValue)) {
        //             // Format floatValue with commas and update price_total
        //             this.price_total = floatValue.toLocaleString(undefined, {
        //                 minimumFractionDigits: 2, // Set the minimum number of decimal places
        //                 maximumFractionDigits: 2, // Set the maximum number of decimal places
        //             });
        //         } else {
        //             // Handle invalid input (e.g., non-numeric value)
        //             this.price_total = '';
        //         }
        //     }
        // },
    },



    methods: {
        onGetLeacarList() {
            this.loading_processing = true
            try {
                this.$axios.$post('/v_popupDetails.service', {
                    // Autorization: localStorage.getItem('toKen')
                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    this.report_peration_list = data?.data
                    this.loading_processing = false
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },
        onChoose(key) {
            this.l_id = key
            this.showLeavCarDialog = false
            this.onGetPerformanceData()
        },
        onGetPerIdAutoGenerate() {
            try {
                this.$axios.$post('/getPerByGenID.service', {
                    // Autorization: localStorage.getItem('toKen')
                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    this.perBillNoAuto = data?.data[0]?.key_id
                })
            } catch (error) {
                console.log(error)
            }
        },
        onGetPerformanceData() {

            this.loading_processing = true
            let data = {
                lahud_poylod: this.l_id,

            }
            try {
                this.$axios.$post('/getBillNo.service', data


                    // {toKen: localStorage.getItem('toKen'),
                    // l_id:""
                    // }
                ).then((data) => {
                    if (data?.data) {
                        this.performance_data = data?.data
                        this.kim = data?.data[0]?.kim_KM
                        this.price = data?.data[0]?.price
                        this.price_total = data?.data[0]?.total_PRICE
                        this.proSize = data?.data[0]?.proSize
                        this.currency = data?.data[0]?.currency
                        // this.numnuklod = data?.data[0]?.numnuklod
                        this.loading_processing = false
                    } else {
                        this.performance_data = data?.data
                        this.loading_processing = false
                    }

                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
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
            window.location.href = '/operation-list';

        },
        onGetDataListForPrint() {
            try {
                let data = {
                    performanceBillNo: this.perBillNoAuto,

                }
                this.$axios.$post('/ListPrintBillByNo.service', data).then((data) => {
                    this.data_for_print = data;
                    this.performaceGroupDetails = data?.performaceGroupDetails[0],
                        this.performaceGroupFee = data?.performaceGroupFee[0],
                        this.performanceSmallHeaderGruops = data?.performanceSmallHeaderGruops[0],
                        this.performance_GroupFeePower = data?.performance_GroupFeePower[0],
                        this.performanceheaderGruops = data?.performanceheaderGruops[0]
                    setTimeout(() => {
                        this.loading_processing = false
                        // this.l_id = ''
                        this.onGetPerIdAutoGenerate()
                        this.onGetLeacarList()
                        this.performanceBillNo = '',
                            this.start_go_date = null,
                            this.performanceTotal = '',
                            this.performanceOvertime = '',
                            this.performanceJumPho = '',
                            this.performanceFeePolish = '',

                            this.performanceFeeTaxung = '',
                            this.performanceFeeTiew = '',
                            this.performanceOverVN = '',
                            this.performanceBoderLak20 = '',
                            this.performancePassport = '',
                            this.performanceVaccine = '',
                            this.performanceFeeSing = '',
                            this.performanceFeeSaPhan = '',
                            this.performanceFeeYoktu = '',
                            this.performanceFeeOutContainer = '',
                            this.per_PA = '',
                            this.let_mai = '',
                            this.performance_data = [],
                            this.price = '',
                            this.price_total = '',
                            this.currency = '',
                            this.proSize = '',
                            this.numnuklod = '',
                            this.numnuktotal = ''
                        this.print()

                    }, 1000);
                })
            } catch (error) {
                console.log(error)
            }
        },
        onSavePerformance() {
            if (this.performance_data?.length === 0) {
                this.$toast.success('ກະລຸນາຄົ້ນຫາຂໍ້ມູນກ່ອນ')
                return;
            }
            if (!this.start_go_date) {
                this.$toast.success('ກະລຸນາເລືອກວັນທີລົດກັບ')
                return;
            }
            this.loading_processing = true
            try {
                let data = {
                    performanceBillNo: this.l_id,
                    performanceReDate: this.start_go_date ? this.start_go_date : 0,
                    performanceTotal: this.performance_data[0]?.total_PRICE,
                    performanceOvertime: this.performanceOvertime ? this.performanceOvertime : 0,
                    performanceJumPho: this.performanceJumPho ? this.performanceJumPho : 0,
                    performanceFeePolish: this.performanceFeePolish ? this.performanceFeePolish : 0,
                    performanceFeeTaxung: this.performanceFeeTaxung ? this.performanceFeeTaxung : 0,
                    performanceFeeTiew: this.performanceFeeTiew ? this.performanceFeeTiew : 0,
                    performanceOverVN: this.performanceOverVN ? this.performanceOverVN : 0,
                    performanceBoderLak20: this.performanceBoderLak20 ? this.performanceBoderLak20 : 0,
                    performancePassport: this.performancePassport ? this.performancePassport : 0,
                    performanceVaccine: this.performanceVaccine ? this.performanceVaccine : 0,
                    performanceFeeSing: this.performanceFeeSing ? this.performanceFeeSing : 0,
                    performanceFeeSaPhan: this.performanceFeeSaPhan ? this.performanceFeeSaPhan : 0,
                    performanceFeeYoktu: this.performanceFeeYoktu ? this.performanceFeeYoktu : 0,
                    performanceFeeOutContainer: this.performanceFeeOutContainer ? this.performanceFeeOutContainer : 0,
                    per_PA: this.per_PA ? this.per_PA : 0,
                    last_LEKMAI: this.let_mai ? this.let_mai : 0,
                    key_id: this.perBillNoAuto,
                    check_KM: this.check_kim,
                    currency: this.currency,
                    proAmount: this.price,
                    proTotalAmount: this.price_total,
                    proSize: this.proSize,
                    dpay_Money: this.dpay_Money,
                    toKen: localStorage.getItem("toKen")

                }
                this.$axios.$post('/savePerformance.service', data).then((data) => {

                    this.onGetDataListForPrint()

                })
            } catch (error) {
                console.log(error)
            }
        }
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
<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card class="mb-8 card-shadow" rounded="lg">
                <v-card-title style="display:flex;background-color:#E57373;color:white">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="leave-cars-list">
                        <v-icon color="#E57373">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <span class="ml-2">ແກ້ໄຂໃບປ່ອຍລົດ</span>
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-10">
                    <!-- leave card key -->
                    <div style="display:flex;flex-direction:row;justify-content:space-between">

                        <div style="background-color:#f5f5f5;height:40px;width:300px;display:flex;align-items:center;border-radius:5px"
                            class="mb-2 pl-2 px-2 ">
                            <span>ລະຫັດໃບປ່ອຍລົດ: {{ leave_card_no }}</span>
                        </div>
                    </div>
                    <!-- product and customers -->
                    <div style="display:flex;justify-content:space-between;width:100%" c>
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="mr-6 pa-4 ">
                            <div style="width:100%">
                                <v-autocomplete outlined dense label="ເລືອກລູກຄ້າ" :items="customer_data_list"
                                    item-text="customerName" item-value="id"
                                    @change="onGetCustomerDetails"></v-autocomplete>
                            </div>
                            <div class="d-flex align-center" style="width: 100%;border-radius:5px">
                                <span class="font-weight-bold">ລະຫັດລູກຄ້າ:</span>
                                <span class="ml-4">{{ customer_id }}</span>
                            </div>
                            <div class="d-flex align-center" style="width: 100%;border-radius:5px">
                                <span class="font-weight-bold">ຊື່ລູກຄ້າ:</span>
                                <span class="ml-4">{{ customer_name }}</span>
                            </div>
                            <div class="d-flex align-center" style="width: 100%;border-radius:5px">
                                <span class="font-weight-bold">ເບີໂທລູກຄ້າ:</span>
                                <span class="ml-4">{{ customer_mobile }}</span>
                            </div>
                        </div>
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="pa-4 ">
                            <div style="width:100%">
                                <v-autocomplete outlined dense label="ເລືອກສິນຄ້າ" :items="products_data_list"
                                    item-text="proName" item-value="id" @change="onGetProductDetails"></v-autocomplete>
                            </div>
                            <div class="d-flex align-center">
                                <span class="font-weight-bold">ຊື່ສິນຄ້າ:</span>
                                <span class="ml-4">{{ product_name }}</span>
                            </div>
                            <div class="d-flex align-center" style="width:100%">
                                <v-text-field label="ປ້ອນລາຄາ" style="width:100%" outlined dense
                                    v-model="product_price"></v-text-field>
                                <v-spacer></v-spacer>
                                <v-select label="ເລືອກສະກຸນເງິນ" style="width:100%" class="pl-2" outlined dense
                                    :items="currency_items" v-model="currency"></v-select>
                            </div>
                            <div class="d-flex align-center" style="width:100%">
                                <v-text-field label="ລາຄາລວມ" style="width:100%" readonly outlined dense
                                    v-model="total_price"></v-text-field>
                                <div class="d-flex align-center pl-2" style="width:100%">
                                    <v-text-field label="ປ້ອນນໍ້າໜັກ" style="width:100%" outlined dense
                                        v-model="product_weight"></v-text-field>
                                    <div
                                        style="height:40px;width:45px;margin-top:-26px;display:flex;align-items:center;justify-content:center;background-color:#448AFF;margin-left:-2px">
                                        <span class="white--text">ໂຕນ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- locations -->
                    <div class="d-flex align-center mt-6">
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="pa-4 mr-6 ">
                            <div>
                                <v-autocomplete outlined dense label="ເລືອກສະຖານທີສົ່ງ" :items="loca_data_list"
                                    item-text="name" item-value="id" @change="onGetLocaDetails"></v-autocomplete>

                            </div>
                            <div class="pl-2 d-flex align-center">
                                <span class="font-weight-bold">ແຂວງທີສົ່ງ:</span>
                                <span class="ml-4">{{ loca_send_province }}</span>
                            </div>
                            <div class="pl-2 d-flex align-center">
                                <span class="font-weight-bold">ສະຖານທີສົ່ງ:</span>
                                <span class="ml-2">{{ loca_send_station }}</span>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="pa-4 ">
                            <div>
                                <v-autocomplete outlined dense label="ເລືອກສະຖານທີຮັບ" :items="loca_data_list"
                                    item-text="name" item-value="id" @change="onGetLocaDetails1"></v-autocomplete>
                            </div>
                            <div style="width:100%" class=" d-flex align-center">
                                <span class="font-weight-bold">ແຂວງຮັບ:</span>
                                <span class="ml-2">{{ loca_recieve_province }}</span>
                            </div>
                            <div style="width:100%" class="d-flex align-center">
                                <span class="font-weight-bold">ສະຖານທີຮັບ:</span>
                                <span class="ml-2">{{ loca_revieve_station }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- employee -->
                    <div class="d-flex align-center mt-6">
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="pa-4 mr-6 ">
                            <div>
                                <v-autocomplete outlined dense label="ເລືອກຄົນຂັບ1" :items="emplyee_list_choose"
                                    item-text="name" item-value="id" @change="onGetEmpDetails"></v-autocomplete>
                            </div>
                            <div style="display:flex;align-items:center;width:100%;border-radius:5px">
                                <span class="font-weight-bold">ຊື່:</span>
                                <span class="ml-4">{{ emp_name }}</span>
                            </div>
                            <div style="display:flex;align-items:center">
                                <span class="font-weight-bold">ເບີໂທລະສັບ:</span>
                                <span class="ml-4">{{ emp_mobile }}</span>
                            </div>
                            <div style="display:flex;align-items:center">
                                <span class="font-weight-bold">ເລກໃບຂັບຂີ່:</span>
                                <span class="ml-4">{{ emp_id_card }}</span>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="pa-4 ">
                            <div>
                                <v-autocomplete outlined dense label="ເລືອກຄົນຂັບ2" :items="emplyee_list_choose"
                                    item-text="name" item-value="id" @change="onGetEmpDetails1"></v-autocomplete>
                            </div>
                            <div style="display:flex;align-items:center;width:100%;border-radius:5px">
                                <span class="font-weight-bold">ຊື່:</span>
                                <span class="ml-4">{{ emp_name1 }}</span>
                            </div>
                            <div style="display:flex;align-items:center;width:100%;border-radius:5px">
                                <span class="font-weight-bold">ເບີໂທລະສັບ:</span>
                                <span class="ml-4">{{ emp_mobile1 }}</span>
                            </div>
                            <div style="display:flex;align-items:center;width:100%;border-radius:5px">
                                <span class="font-weight-bold">ເລກໃບຂັບຂີ່:</span>
                                <span class="ml-4">{{ emp_id_card1 }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- money -->
                    <div style="" class="d-flex align-center mt-6">
                        <div style="display:flex;flex-direction:row;justify-content:space-between;width:100%;background-color:#f5f5f5;border-radius:5px"
                            class="mr-6 px-4 pt-5 ">
                            <div style="width:100%" class="mr-0"><v-text-field label="ເບ້ຍລ້ຽງ" outlined dense
                                    v-model="money"></v-text-field></div>
                            <div style="width:100%" class="pl-2"><v-text-field label="ເບ້ຍລ້ຽງຈ່າຍກ່ອນ" outlined dense
                                    v-model="money_aready_pay"></v-text-field></div>

                        </div>
                        <v-spacer></v-spacer>
                        <div style="width:100%;background-color:#f5f5f5;border-radius:5px;display:flex;"
                            class="px-4 pt-5 ">
                            <v-text-field style="width:100%" readonly label="ຄ້າງຈ່າຍ" outlined dense
                                v-model="money_still_pay"></v-text-field>
                            <v-select label="ເລືອກສະກຸນເງິນ" style="width:100%" class="pl-2" outlined dense
                                :items="currency_items" v-model="staff_cur"></v-select>
                        </div>

                    </div>
                    <!-- cars head and footer -->
                    <div class="d-flex align-center mt-6">
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="pa-4 mr-6 ">
                            <div style="width:100%">
                                <v-autocomplete outlined dense label="ເລືອກຫົວລົດ" :items="cars_list"
                                    item-text="h_VICIVLE_NUMBER" item-value="key_id"
                                    @change="onGetCarDetails"></v-autocomplete>
                            </div>
                            <div style="width:100%" class="d-flex align-center pl-2">
                                <span class="font-weight-bold">ປ້າຍຫົວລົດ:</span>
                                <span class="ml-4"> {{ h_VICIVLE_NUMBER }}</span>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div style="background-color:#f5f5f5;width:100%;border-radius:5px" class="pa-4 ">
                            <div style="width:100%">
                                <v-autocomplete outlined dense label="ເລືອກຫາງລົດ" :items="truct_footer_data_list"
                                    item-text="f_CARD_NO" item-value="key_id"
                                    @change="onGetTructFooterDetail"></v-autocomplete>
                            </div>
                            <div style="width:100%" class="d-flex align-center pl-2">
                                <span class="font-weight-bold">ປ້າຍຫາງລົດ:</span>
                                <span class="ml-4"> {{ f_CARD_NO }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- start date and end date -->
                    <div class="d-flex align-center mt-6 mb-6">
                        <div style="width:100%;background-color:#f5f5f5;border-radius:5px" class="mr-6 pa-4 ">
                            <div class="d-flex align-center">
                                <div style="width:100%">
                                    <v-menu ref="start_go_menu" v-model="start_go_menu" :close-on-content-click="false"
                                        :return-value.sync="start_go_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="start_go_date" required
                                                label="ວັນທີອອກເດີນທາງ" append-icon="mdi-calendar" readonly
                                                v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="start_go_date" no-title scrollable
                                            @input="$refs.start_go_menu.save(start_go_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>
                                <div style="width:100%" class="d-flex align-center pl-2">
                                    <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                                        :return-value.sync="end_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="end_date" required label="ວັນທີກັບ"
                                                append-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="end_date" no-title scrollable
                                            @input="$refs.end_menu.save(end_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>
                            </div>
                            <div class="d-flex align-center">
                                <div style="width:100%" class="d-flex align-center">
                                    <v-text-field dense outlined label="ໄລຍະທາງຂົນສົ່ງ"
                                        v-model="road_send_km"></v-text-field>
                                </div>
                                <div class="d-flex align-center pl-2" style="width: 100%">
                                    <!-- <v-text-field dense outlined label="ເລກໄມປ່ຽນລີນກົ້ນ" v-model="let_mai_pian_lin_kund"></v-text-field> -->
                                    <v-text-field dense outlined label="ໃສ່ນໍ້າມັນ"
                                        v-model="truck_glass"></v-text-field>
                                </div>
                            </div>

                        </div>
                        <v-spacer></v-spacer>
                        <div style="width:100%;background-color:#f5f5f5;border-radius:5px" class="pa-4 ">
                            <div class="d-flex align-center">
                                <div style="width:100%">
                                    <v-text-field dense outlined label="ນໍ້າໜັກລົດ"
                                        v-model="truck_weight"></v-text-field>

                                </div>
                                <div style="width:100%" class="d-flex align-center pl-2">
                                    <v-text-field dense outlined label="ກ້ອງໜ້າລົດ"
                                        v-model="start_camera"></v-text-field>
                                </div>
                            </div>
                            <div class="d-flex align-center">
                                <div class="d-flex align-center" style="width: 100%">
                                    <v-text-field dense outlined label="ລາຄານໍ້າມັນຕໍ່ລິດ"
                                        v-model="priceNamMun"></v-text-field>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions style="margin-top:-40px" class="pb-8">
                    <v-spacer></v-spacer>
                    <v-btn color="#FFB74D" class="card-shadow" @click="onCreateReports" width="200">
                        <span class="white--text ">ແກ້ໄຂ</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-form>
        <!-- component for print -->
        <div style="display:none;">
            <div id="modalInvoice">
                <div class="text-center pb-10 font-weight-bold"
                    style="display:flex;justify-content:center;font-size:12pt">
                    ໃບປ່ອຍລົດ</div>
                <div style="height:20px"></div>
                <div style="display:flex;justify-content:end;flex-direction:column;align-items:end">
                    <div
                        style="display:flex;flex-direction:column;padding:10px;border-radius:3px;border:1px solid #999">

                        <span style="font-size:12pt">ເລກທີ: {{ leave_card_no }}</span>
                        <span style="font-size:12pt">ວັນທີປ່ອຍລົດ: {{ start_go_date }}</span>
                        <span style="font-size:12pt">ວັນທີກັບ: {{ end_date }}</span>
                    </div>
                </div>
                <!-- customer -->
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end"><span style="font-size:12pt">ລະຫັດໃບປ່ອຍລົດ: {{
            leave_card_no
        }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12pt">ລະຫັດລູກຄ້າ: {{ customer_id }}</span></div>
                    <div style="width:100%;display:flex;justify-content:space-between"><span
                            style="font-size:12pt">ຊື່ລູກຄ້າ:
                            {{
            customer_name }}</span></div>
                </div>
                <!-- products -->
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:100%;display:flex;align-items:end"><span style="font-size:12pt">ຊື່ສິນຄ້າ: {{
            product_name
        }}</span>
                    </div>
                    <div style="width:100%;display:flex;justify-content:start"><span style="font-size:12pt">ນໍ້າໜັກ: {{
                product_weight }} ໂຕນ</span></div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:100%;display:flex;align-items:end"><span style="font-size:12pt">ລາຄາ: {{
            product_price
        }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12pt">ຈຳນວນ: {{ product_quality }}</span></div>
                    <div style="width:100%"><span style="font-size:12pt">ລາຄາລວມ: {{ total_price }}</span></div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">

                    <div style="width:100%"><span style="font-size:12pt">ແຂວງທີ່ສົ່ງ: {{ loca_send_province }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12pt">ສະຖານທີສົ່ງ: {{ loca_send_station }}</span>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:100%;display:flex;align-items:end"><span style="font-size:12pt">ແຂວງຮັບ: {{
            loca_recieve_province }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12pt">ສະຖານທີຮັບ: {{ loca_revieve_station }}</span>
                    </div>
                </div>
                <!-- employee -->
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end"><span style="font-size:12pt">ຊື່ຄົນຂັບລົດ1: {{
            emp_realName
        }}</span></div>
                    <div style="width:100%"><span style="font-size:12pt">ເບີໂທ: {{ emp_mobile }}</span></div>
                    <div style="width:100%"><span style="font-size:12pt">ເລກໃບຂັບຂີ່: {{ emp_id_card }}</span></div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end"><span style="font-size:12pt">ຊື່ຄົນຂັບລົດ2: {{
            emp_realName1
        }}</span></div>
                    <div style="width:100%"><span style="font-size:12pt">ເບີໂທ: {{ emp_mobile1 }}</span></div>
                    <div style="width:100%"><span style="font-size:12pt">ເລກໃບຂັບຂີ່: {{ emp_id_card1 }}</span></div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end"><span style="font-size:12pt">ເບ້ຍລ້ຽງ: {{ money
                            }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12pt">ເບ້ຍລ້ຽງຈ່າຍກ່ອນ: {{ money_aready_pay }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12pt">ຄ້າງຈ່າຍ: {{ money_still_pay }}</span></div>
                </div>


                <!-- truck -->

                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end">
                        <span style="font-size:12pt">ວັນທີອອກລົດ: {{
            start_go_date
        }}</span>
                    </div>
                    <div style="width:100%"><span style="font-size:12pt">ວັນທີກັບ: {{ end_date }}</span></div>
                    <div style="width:100%">
                        <!-- <span style="font-size:12pt">ເລກໄມປ່ຽນລີນກົ້ນ: {{ let_mai_pian_lin_kund }}</span> -->
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end"><span style="font-size:12pt">ໄລຍະທາງຂົນສົ່ງ: {{
            road_send_km
        }}</span></div>
                    <div style="width:100%"><span style="font-size:12pt">ໃສ່ນໍ້າມັນ: {{ truck_glass }}</span></div>
                    <div style="width:100%"><span style="font-size:12pt">ນໍ້າໜັກລົດ: {{ truck_weight }}</span></div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end"><span
                            style="font-size:12pt">ເລກໄມປ່ຽນນໍ້າມັນເຄື່ອງຮອບຕໍ່ໄປ:
                            {{ let_next }}</span></div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                    <div style="width:80%;display:flex;align-items:end">
                        <!-- <span style="font-size:12pt">ໝໍ້ໄຟ: {{ mong_fai }}</span> -->
                        <span style="font-size:12pt">ເຂັມກິໂລແມັດກ່ອນປ່ອຍ: {{ truck_kilomen }}</span>
                    </div>
                    <!-- <div style="width:100%">
                        <span style="font-size:12pt">ເຄື່ອງມືຕິດລົດ: {{
                            digital_with_car }}</span>
                    </div> -->
                    <div style="width:100%"><span style="font-size:12pt">ກ້ອງໜ້າລົດ: {{ start_camera }}</span></div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;">
                </div>



                <!-- head and footer general data -->
                <div style="display:flex;flex-direction:row;justify-content:space-between;padding-top:20px">
                    <div style="width:100%;padding-right:20px" class="pr-2">
                        <span style="font-size:12pt;font-weight:bold">ຂໍ້ມູນຫົວລົດ</span><br />
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ທະບຽນລົດ: {{ h_VICIVLE_NUMBER }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ຍີ່ຫໍ້: {{ h_VICIVLE_BRANCH }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ລົດປີ: {{ h_VICIVLE_YEARLEVEL }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ເລກປະກັນໄພ: {{ h_VICIVLE_GALATY }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ປະກັນໄພໝົດ: {{ h_VICIVLE_DATE_GALATY }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;flex-direction:column">
                            <span style="font-size:12pt">ເລກຈັກ: {{ h_VICIVLE_LEKJUK }}</span>
                            <span style="font-size:12pt">ເລກຖັງ: {{ h_VICIVLE_LEKTHUNG }}</span>
                        </div>
                    </div>
                    <div style="width:100%;padding-left:20px">
                        <span style="font-size:12pt;font-weight:bold">ຂໍ້ມູນຫາງລົດ</span><br />
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ທະບຽນລົດ: {{ f_CARD_NO }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ຍີ່ຫໍ້: {{ f_BRANCH }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ລົດປີ: {{ f_YEAR }}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <span style="font-size:12pt">ເລກປະກັນໄພ: {{ f_GALATY_NO }}</span>
                        </div>
                        <div style="display:flex;justify-content:start">
                            <span style="font-size:12pt">ປະກັນໄພໝົດ: </span>
                            <span style="font-size:12pt;margin-left:5px"> {{ f_GALATY_DEP }}</span>
                        </div>
                        <div style="display:flex;justify-content:start">

                            <span style="font-size:12pt">ເລກຄັນຊີ: {{ f_LEKKUNZEE }}</span>
                        </div>
                    </div>
                </div>

                <!-- cars fit -->
                <div style="display:flex;flex-direction:row;justify-content:space-between;padding-top:20px">
                    <!-- left fit -->
                    <div style="width:100%">
                        <div style="width:100%;display:flex;flex-direction:row;justify-content:space-between">
                            <div style="width:100%;display:flex;flex-direction:column;">
                                <span style="font-size:12pt;font-weight:bold">ຕຳແໜ່ງແລະ</span>
                                <span style="font-size:12pt;font-weight:bold">ເກຍຢາງລົດ</span>
                                <span>{{ ll_TIRE_NO_1 }}</span>
                                <span>{{ ll_TIRE_NO_2 }}</span>
                                <span>{{ ll_TIRE_NO_3 }}</span>
                                <span>{{ ll_TIRE_NO_4 }}</span>
                                <span>{{ ll_TIRE_NO_5 }}</span>
                                <span>{{ ll_TIRE_NO_6 }}</span>

                                <span style="margin-top:15px">{{ r_TIRE_NO_1 }}</span>
                                <span>{{ r_TIRE_NO_2 }}</span>
                                <span>{{ r_TIRE_NO_3 }}</span>
                                <span>{{ r_TIRE_NO_4 }}</span>
                                <span>{{ r_TIRE_NO_5 }}</span>
                                <span>{{ r_TIRE_NO_6 }}</span>

                            </div>
                            <div style="width:100%;display:flex;flex-direction:column;">
                                <span style="font-size:12pt;font-weight:bold">ວັນທີປ່ຽນ</span>
                                <span style="font-size:12pt;font-weight:bold;color:white">..</span>
                                <span>{{ ll_TIRE_DATE_1 }}</span>
                                <span>{{ ll_TIRE_DATE_2 }}</span>
                                <span>{{ ll_TIRE_DATE_3 }}</span>
                                <span>{{ ll_TIRE_DATE_4 }}</span>
                                <span>{{ ll_TIRE_DATE_5 }}</span>
                                <span>{{ ll_TIRE_DATE_6 }}</span>

                                <span style="margin-top:15px">{{ r_TIRE_DATE_1 }}</span>
                                <span>{{ r_TIRE_DATE_2 }}</span>
                                <span>{{ r_TIRE_DATE_3 }}</span>
                                <span>{{ r_TIRE_DATE_4 }}</span>
                                <span>{{ r_TIRE_DATE_5 }}</span>
                                <span>{{ r_TIRE_DATE_6 }}</span>
                            </div>
                            <div
                                style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                                <span style="font-size:12pt;font-weight:bold">ກຳນົດແລ່ນໄດ້</span>
                                <span style="font-size:12pt;font-weight:bold">ກິໂລແມັດ</span>
                                <span>{{ ll_TIRE_KM_1 }}</span>
                                <span>{{ ll_TIRE_KM_2 }}</span>
                                <span>{{ ll_TIRE_KM_3 }}</span>
                                <span>{{ ll_TIRE_KM_4 }}</span>
                                <span>{{ ll_TIRE_KM_5 }}</span>
                                <span>{{ ll_TIRE_KM_6 }}</span>

                                <span style="margin-top:15px">{{ r_TIRE_KM_1 }}</span>
                                <span>{{ r_TIRE_KM_2 }}</span>
                                <span>{{ r_TIRE_KM_3 }}</span>
                                <span>{{ r_TIRE_KM_4 }}</span>
                                <span>{{ r_TIRE_KM_5 }}</span>
                                <span>{{ r_TIRE_KM_6 }}</span>

                            </div>
                        </div>
                    </div>
                    <!-- right fit -->
                    <div style="width:100%">
                        <div style="width:100%;display:flex;flex-direction:row;justify-content:space-between">
                            <div style="width:100%;display:flex;flex-direction:column;justify-content:center">
                                <span style="font-size:12pt;font-weight:bold">ຕຳແໜ່ງແລະ</span>
                                <span style="font-size:12pt;font-weight:bold">ເກຍຢາງລົດ</span>
                                <span>{{ bl_TRIES_1 }}</span>
                                <span>{{ bl_TRIES_2 }}</span>
                                <span>{{ bl_TRIES_3 }}</span>
                                <span>{{ bl_TRIES_4 }}</span>
                                <span>{{ bl_TRIES_5 }}</span>
                                <span>{{ bl_TRIES_6 }}</span>
                                <span>{{ bl_TRIES_7 }}</span>
                                <span>{{ bl_TRIES_8 }}</span>

                                <span>{{ br_TRIES_1 }}</span>
                                <span>{{ br_TRIES_2 }}</span>
                                <span>{{ br_TRIES_3 }}</span>
                                <span>{{ br_TRIES_4 }}</span>
                                <span>{{ br_TRIES_5 }}</span>
                                <span>{{ br_TRIES_6 }}</span>
                                <span>{{ br_TRIES_7 }}</span>
                                <span>{{ br_TRIES_8 }}</span>
                            </div>
                            <div style="width:100%;display:flex;flex-direction:column;justify-content:center">
                                <span style="font-size:12pt;font-weight:bold">ວັນທີປ່ຽນ</span>
                                <span style="font-size:12pt;font-weight:bold;color:white">..</span>
                                <span>{{ bl_TRIES_DATE_1 }}</span>
                                <span>{{ bl_TRIES_DATE_2 }}</span>
                                <span>{{ bl_TRIES_DATE_3 }}</span>
                                <span>{{ bl_TRIES_DATE_4 }}</span>
                                <span>{{ bl_TRIES_DATE_5 }}</span>
                                <span>{{ bl_TRIES_DATE_6 }}</span>
                                <span>{{ bl_TRIES_DATE_7 }}</span>
                                <span>{{ bl_TRIES_DATE_8 }}</span>


                                <span>{{ br_TRIES_DATE_1 }}</span>
                                <span>{{ br_TRIES_DATE_2 }}</span>
                                <span>{{ br_TRIES_DATE_3 }}</span>
                                <span>{{ br_TRIES_DATE_4 }}</span>
                                <span>{{ br_TRIES_DATE_5 }}</span>
                                <span>{{ br_TRIES_DATE_6 }}</span>
                                <span>{{ br_TRIES_DATE_7 }}</span>
                                <span>{{ br_TRIES_DATE_8 }}</span>
                            </div>
                            <div style="width:100%;display:flex;flex-direction:column;justify-content:center">
                                <span style="font-size:12pt;font-weight:bold">ກຳນົດແລ່ນໄດ້</span>
                                <span style="font-size:12pt;font-weight:bold">ກິໂລແມັດ</span>
                                <span>{{ bl_TRIES_KM_1 }}</span>
                                <span>{{ bl_TRIES_KM_2 }}</span>
                                <span>{{ bl_TRIES_KM_3 }}</span>
                                <span>{{ bl_TRIES_KM_4 }}</span>
                                <span>{{ bl_TRIES_KM_5 }}</span>
                                <span>{{ bl_TRIES_KM_6 }}</span>
                                <span>{{ bl_TRIES_KM_7 }}</span>
                                <span>{{ bl_TRIES_KM_8 }}</span>


                                <span>{{ br_TRIES_KM_1 }}</span>
                                <span>{{ br_TRIES_KM_2 }}</span>
                                <span>{{ br_TRIES_KM_3 }}</span>
                                <span>{{ br_TRIES_KM_4 }}</span>
                                <span>{{ br_TRIES_KM_5 }}</span>
                                <span>{{ br_TRIES_KM_6 }}</span>
                                <span>{{ br_TRIES_KM_7 }}</span>
                                <span>{{ br_TRIES_KM_8 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:space-between;padding-top:100px">
                    <span style="font-size:12pt">ຜູ້ຮັບຜິດຊອບປ່ອຍລົດ</span>
                    <span style="font-size:12pt">ຜູ້ຂົນສົ່ງສິນຄ້າ</span>
                    <span style="font-size:12pt">ຫົວໜ້າຄຸມງານ</span>
                    <span style="font-size:12pt">ຜູ້ຮັບສິນຄ້າປາຍທາງ</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            emplyee_list_choose: [],
            staff_new1: '',
            staff_new2: '',
            head_new: '',
            foot_new: '',
            currency: '',
            staff_cur: '',
            currency_items: ['LAK', 'USD', 'THB', 'CNY'],
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            loading_processing: false,
            // open_dialog_print: false,
            //start and end date
            start_go_menu: false,
            end_menu: false,
            start_go_date: null,
            end_date: null,
            cars_category_list: [],
            leave_card_no: '',

            // l_plate_No: '',
            // fullName: '',
            //==========truck
            cars_list: [],
            // truck_key: '',
            t_year: '',
            t_type: '',
            t_model: '',
            t_tek_nik_ex: '',
            truck_plateNo_start: '',
            truck_start_color: '',
            truck_plateNo_end: '',
            truck_end_color: '',
            truck_type: '',
            truck_type1: '',
            road_send_km: '',
            let_mai_pian_lin_kund: '',
            truck_glass: '',
            truck_weight: '',
            let_mai_pian_num_mun_kheng_next: '',
            let_next: '',
            let_mai_pian_lin_kia: '',
            mong_fai: '',
            GPS: '',
            start_camera: '',
            digital_with_car: '',
            truck_kilomen: '',

            // truck_plate_detail: '',
            // truck_type: '',
            //employee
            emplyee_list: [],
            emp_name: '',
            emp_realName: '',
            emp_realName1: '',
            emp_mobile: '',
            emp_id_card: '',
            emp_name1: '',
            emp_mobile1: '',
            emp_id_card1: '',
            money: '',
            money_aready_pay: '',
            money_still_pay: '',

            //========location
            loca_data_list: [],
            loca_send_province: '',
            loca_send_station: '',
            loca_recieve_province: '',
            loca_revieve_station: '',
            //=====customer
            customer_data_list: [],
            customer_name: '',
            customer_mobile: '',
            customer_id: '',
            //========products
            products_data_list: [],
            product_name: '',
            product_quality: '',
            product_weight: '',
            product_detail: '',
            province_send: '',
            station_send: '',
            province_receiv: '',
            station_receiv: '',
            detail_send: '',
            detail_recive: '',
            product_price: '',
            total_price: '',
            priceNamMun: '',
            // head data for bill
            h_VICIVLE_NUMBER: '',
            h_VICIVLE_BRANCH: '',
            h_VICIVLE_YEARLEVEL: '',
            h_VICIVLE_GALATY: '',
            h_VICIVLE_DATE_GALATY: '',
            h_VICIVLE_LEKJUK: '',
            h_VICIVLE_LEKTHUNG: '',
            h_VICIVLE_BRANCHTYPE: '',

            ll_TIRE_NO_1: '',
            ll_TIRE_NO_2: '',
            ll_TIRE_NO_3: '',
            ll_TIRE_NO_4: '',
            ll_TIRE_NO_5: '',
            ll_TIRE_NO_6: '',

            r_TIRE_NO_1: '',
            r_TIRE_NO_2: '',
            r_TIRE_NO_3: '',
            r_TIRE_NO_4: '',
            r_TIRE_NO_5: '',
            r_TIRE_NO_6: '',

            ll_TIRE_DATE_1: '',
            ll_TIRE_DATE_2: '',
            ll_TIRE_DATE_3: '',
            ll_TIRE_DATE_4: '',
            ll_TIRE_DATE_5: '',
            ll_TIRE_DATE_6: '',

            r_TIRE_DATE_1: '',
            r_TIRE_DATE_2: '',
            r_TIRE_DATE_3: '',
            r_TIRE_DATE_4: '',
            r_TIRE_DATE_5: '',
            r_TIRE_DATE_6: '',

            ll_TIRE_KM_1: '',
            ll_TIRE_KM_2: '',
            ll_TIRE_KM_3: '',
            ll_TIRE_KM_4: '',
            ll_TIRE_KM_5: '',
            ll_TIRE_KM_6: '',

            r_TIRE_KM_1: '',
            r_TIRE_KM_2: '',
            r_TIRE_KM_3: '',
            r_TIRE_KM_4: '',
            r_TIRE_KM_5: '',
            r_TIRE_KM_6: '',
            // FOOTER STATE
            f_DATEEXPRIED: '',
            f_CARD_NO: '',
            f_BRANCH: '',
            f_YEAR: '',
            f_GALATY_NO: '',
            f_GALATY_DEP: '',
            f_CAR_TYPE: '',
            f_LEKKUNZEE: '',
            truct_footer_data_list: [],
            bl_TRIES_1: '',
            bl_TRIES_2: '',
            bl_TRIES_3: '',
            bl_TRIES_4: '',
            bl_TRIES_5: '',
            bl_TRIES_6: '',
            bl_TRIES_7: '',
            bl_TRIES_8: '',

            br_TRIES_1: '',
            br_TRIES_2: '',
            br_TRIES_3: '',
            br_TRIES_4: '',
            br_TRIES_5: '',
            br_TRIES_6: '',
            br_TRIES_7: '',
            br_TRIES_8: '',
            bl_TRIES_DATE_1: '',
            bl_TRIES_DATE_2: '',
            bl_TRIES_DATE_3: '',
            bl_TRIES_DATE_4: '',
            bl_TRIES_DATE_5: '',
            bl_TRIES_DATE_6: '',
            bl_TRIES_DATE_7: '',
            bl_TRIES_DATE_8: '',


            br_TRIES_DATE_1: '',
            br_TRIES_DATE_2: '',
            br_TRIES_DATE_3: '',
            br_TRIES_DATE_4: '',
            br_TRIES_DATE_5: '',
            br_TRIES_DATE_6: '',
            br_TRIES_DATE_7: '',
            br_TRIES_DATE_8: '',

            bl_TRIES_KM_1: '',
            bl_TRIES_KM_2: '',
            bl_TRIES_KM_3: '',
            bl_TRIES_KM_4: '',
            bl_TRIES_KM_5: '',
            bl_TRIES_KM_6: '',
            bl_TRIES_KM_7: '',
            bl_TRIES_KM_8: '',


            br_TRIES_KM_1: '',
            br_TRIES_KM_2: '',
            br_TRIES_KM_3: '',
            br_TRIES_KM_4: '',
            br_TRIES_KM_5: '',
            br_TRIES_KM_6: '',
            br_TRIES_KM_7: '',
            br_TRIES_KM_8: '',

            // create report
            key_ID: '',
            staff_BIALIENG_FRIST: '',
            staff_BIALINEG_KANGJAIY: '',
            product_SIZE: '',
            product_DETAILS: '',
            product_FROM: '',
            customer_ID: '',
            product_ID: '',
            product_AMOUNT: '',
            product_TO: '',
            staff_BIALIENG: '',
            place_PD_TO: '',
            kongnarlod: '',
            laiyathang: '',
            numnuklod: '',
            kim_KILO: '',
            place_PD_FROM: '',
            out_DATE: '',
            staff_ID_NUM1: '',
            in_DATE: '',
            sainummun: '',
            footer_ID: '',
            header_ID: '',
            staff_ID_NUM2: '',
            khg_MUE_TIDLOD: ''
        }
    },
    watch: {

        priceNamMun: function (newValue) {
            const result = newValue

            this.priceNamMun = result
        },
        product_price: function (newValue) {
            const real_total = parseInt(newValue?.split(',').join(''));
            this.total_price = (real_total)?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
           
            const result = newValue?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.product_price = result
        },
        product_weight: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.product_weight = result
        },
        money: function (newValue) {
            const real_money = parseInt(newValue?.split(',').
            join('')) - parseInt(this.money_aready_pay ? this.money_aready_pay?.split(',').join('') : 0)
            this.money_still_pay = real_money?.toString()?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.money = result
        },
        money_aready_pay: function (newValue) {
            // const real_money = parseInt(this.money?.split(',').join('')) - parseInt(newValue ? newValue?.split(',').join('') : 0)

            // this.money_still_pay = real_money?.toString()?.replace(/\D/g, '')
            //     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            const result = newValue
                // ?.replace(/\D/g, '')
                // ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.money_aready_pay = result
        },
        road_send_km: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.road_send_km = result
        },
        truck_glass: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.truck_glass = result
        },
        truck_weight: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.truck_weight = result
        },
        truck_kilomen: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.truck_kilomen = result
        },
    },

    mounted() {
        this.onGetEmployeeListForChoose()
        this.onGetTruckList()
        this.onGetEmployeeList()
        this.onGetEmployeeList1()
        this.onGetLocationList()
        this.onGetLocationList1()
        this.onGetCustomerList()
        this.onGetProductsList()
        this.onGetTruckFooter()
        const today = new Date()
        const date =
            today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        this.current_date = date,
            this.leave_card_no = this.$route.query?.key;
        this.product_quality = this.$route.query?.proAmount;
        this.product_weight = this.$route.query?.proWeight;
        this.product_detail = this.$route.query?.product_detail;
        this.detail_send = this.$route.query?.detail_send;
        this.detail_recive = this.$route.query?.detail_recive;
        this.money = this.$route.query?.bialieng;
        this.money_aready_pay = this.$route.query?.bialieng1;
        this.money_still_pay = this.$route.query?.bialieng2;
        this.start_go_date = this.$route.query?.out_date;
        this.end_date = this.$route?.query?.in_date;
        this.road_send_km = this.$route?.query?.road;
        this.truck_glass = this.$route?.query?.nummun;
        this.truck_weight = this.$route?.query?.car_weight;
        this.start_camera = this.$route?.query?.kongnarlod;
        this.digital_with_car = this.$route?.query?.khg_meu_tidlod;
        this.product_price = this.$route?.query?.price;
        this.total_price = this.$route?.query?.total_price;
        this.priceNamMun = this.$route?.query?.priceNamMun;
        this.currency = this.$route?.query?.currency;
        this.staff_cur = this.$route?.query?.staff_Curr;
        this.h_VICIVLE_NUMBER = this.$route?.query?.plate;
        this.f_CARD_NO = this.$route?.query?.plate1
    },

    methods: {
        onAskBeforePrintBill() {
            // this.print()
            if (!this.$refs.form.validate()) {
                swal.fire({
                    icon: 'info',
                    title: 'ແຈ້ງເຕືອນ',
                    text: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ'
                })
                return;
            }
            swal
                .fire({
                    title: 'ທ່ານຕ້ອງການພິມບິນແທ້ບໍ ?',
                    icon: 'question',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.onCreateReports()
                    }
                })
        },
        
        async onCreateReports() {
            try {
                this.loading_processing = true;
                let data = {
                    laHud_poyLod: this.leave_card_no,
                    staff_BIALIENG_FRIST: this.money,
                    staff_BIALIENG: this.money_aready_pay,
                    staff_BIALINEG_KANGJAIY: this.money_still_pay,
                    product_SIZE: this.product_weight,
                    product_DETAILS: this.product_detail,
                    product_FROM: this.detail_send,
                    customer_ID: this.customer_id,
                    product_ID: this.product_ID,
                    product_AMOUNT: this.product_quality,
                    product_TO: this.detail_recive,
                    place_PD_TO: this.place_PD_TO,
                    kongnarlod: this.start_camera,
                    laiyathang: this.road_send_km,
                    numnuklod: this.truck_weight,
                    kim_KILO: this.truck_kilomen,
                    place_PD_FROM: this.place_PD_FROM,
                    out_DATE: this.start_go_date,
                    staff_ID_NUM1: this.staff_ID_NUM1,
                    staff_ID_NUM2: this.staff_ID_NUM2,
                    in_DATE: this.end_date,
                    sainummun: this.truck_glass,
                    footer_ID: this.footer_ID,
                    header_ID: this.header_ID,
                    khg_MUE_TIDLOD: this.digital_with_car,
                    currency: this.currency,
                    staff_Curr: this.staff_cur,
                    price: this.total_price,
                    totalPrice: this.total_price,
                    priceNamMun: this.priceNamMun,
                    headerNew: this.head_new,
                    footerNew: this.foot_new,
                    staffNew01: this.staff_new1,
                    toKen: localStorage.getItem("toKen"),
                    staffNew02: this.staff_new2,
                    keyId: this.keyId,
                };

                await this.$axios.$post('/UpdateRevertTxn.service', data).then((data) => {
                    if (data?.status === '00') {
                        swal.fire({
                            icon: 'success',
                            text: 'ສຳເລັດ'
                        });
                        // this.$router.push('/leave-cars-list')
                        this.loading_processing = false
                    } else {
                        swal.fire({
                            icon: 'success',
                            text: data?.message
                        })
                        this.loading_processing = false
                    }
                })
            } catch (error) {
                console.log(error)
                this.loading_processing = false
            }
        },
        onGetTructFooterDetail(
            key_id
        ) {

            let data = this.truct_footer_data_list?.filter((el => el.key_id === key_id));
            console.log("back:", data)
            this.f_DATEEXPRIED = data[0]?.f_DATEEXPRIED,
                this.f_CARD_NO = data[0]?.f_CARD_NO,
                this.f_BRANCH = data[0]?.f_BRANCH,
                this.f_YEAR = data[0]?.f_YEAR,
                this.f_GALATY_NO = data[0]?.f_GALATY_NO,
                this.f_GALATY_DEP = data[0]?.f_GALATY_DEP,
                this.f_CAR_TYPE = data[0]?.f_CAR_TYPE,
                this.f_LEKKUNZEE = data[0]?.f_LEKKUNZEE,

                this.bl_TRIES_1 = data[0]?.l_TRIES_1,
                this.bl_TRIES_2 = data[0]?.l_TRIES_2,
                this.bl_TRIES_3 = data[0]?.l_TRIES_3,
                this.bl_TRIES_4 = data[0]?.l_TRIES_4,
                this.bl_TRIES_5 = data[0]?.l_TRIES_5,
                this.bl_TRIES_6 = data[0]?.l_TRIES_6,
                this.bl_TRIES_7 = data[0]?.l_TRIES_7,
                this.bl_TRIES_8 = data[0]?.l_TRIES_8,

                this.br_TRIES_1 = data[0]?.r_TRIES_1,
                this.br_TRIES_2 = data[0]?.r_TRIES_2,
                this.br_TRIES_3 = data[0]?.r_TRIES_3,
                this.br_TRIES_4 = data[0]?.r_TRIES_4,
                this.br_TRIES_5 = data[0]?.r_TRIES_5,
                this.br_TRIES_6 = data[0]?.r_TRIES_6,
                this.br_TRIES_7 = data[0]?.r_TRIES_7,
                this.br_TRIES_8 = data[0]?.r_TRIES_8,
                this.bl_TRIES_DATE_1 = data[0]?.l_TRIES_DATE_1,
                this.bl_TRIES_DATE_2 = data[0]?.l_TRIES_DATE_2,
                this.bl_TRIES_DATE_3 = data[0]?.l_TRIES_DATE_3,
                this.bl_TRIES_DATE_4 = data[0]?.l_TRIES_DATE_4,
                this.bl_TRIES_DATE_5 = data[0]?.l_TRIES_DATE_5,
                this.bl_TRIES_DATE_6 = data[0]?.l_TRIES_DATE_6,
                this.bl_TRIES_DATE_7 = data[0]?.l_TRIES_DATE_7,
                this.bl_TRIES_DATE_8 = data[0]?.l_TRIES_DATE_8,


                this.br_TRIES_DATE_1 = data[0]?.r_TRIES_DATE_1,
                this.br_TRIES_DATE_2 = data[0]?.r_TRIES_DATE_2,
                this.br_TRIES_DATE_3 = data[0]?.r_TRIES_DATE_3,
                this.br_TRIES_DATE_4 = data[0]?.r_TRIES_DATE_4,
                this.br_TRIES_DATE_5 = data[0]?.r_TRIES_DATE_5,
                this.br_TRIES_DATE_6 = data[0]?.r_TRIES_DATE_6,
                this.br_TRIES_DATE_7 = data[0]?.r_TRIES_DATE_7,
                this.br_TRIES_DATE_8 = data[0]?.r_TRIES_DATE_8,

                this.bl_TRIES_KM_1 = data[0]?.l_TRIES_KM_1,
                this.bl_TRIES_KM_2 = data[0]?.l_TRIES_KM_2,
                this.bl_TRIES_KM_3 = data[0]?.l_TRIES_KM_3,
                this.bl_TRIES_KM_4 = data[0]?.l_TRIES_KM_4,
                this.bl_TRIES_KM_5 = data[0]?.l_TRIES_KM_5,
                this.bl_TRIES_KM_6 = data[0]?.l_TRIES_KM_6,
                this.bl_TRIES_KM_7 = data[0]?.l_TRIES_KM_7,
                this.bl_TRIES_KM_8 = data[0]?.l_TRIES_KM_8,


                this.br_TRIES_KM_1 = data[0]?.r_TRIES_KM_1,
                this.br_TRIES_KM_2 = data[0]?.r_TRIES_KM_2,
                this.br_TRIES_KM_3 = data[0]?.r_TRIES_KM_3,
                this.br_TRIES_KM_4 = data[0]?.r_TRIES_KM_4,
                this.br_TRIES_KM_5 = data[0]?.r_TRIES_KM_5,
                this.br_TRIES_KM_6 = data[0]?.r_TRIES_KM_6,
                this.br_TRIES_KM_7 = data[0]?.r_TRIES_KM_7,
                this.br_TRIES_KM_8 = data[0]?.r_TRIES_KM_8,
                this.foot_new = key_id
        },
        // print() {
        //     const modal = document.getElementById("modalInvoice")
        //     const cloned = modal.cloneNode(true)
        //     let section = document.getElementById("print")
        //     if (!section) {
        //         section = document.createElement("div")
        //         section.id = "print"
        //         document.body.appendChild(section)
        //     }
        //     section.innerHTML = "";
        //     section.appendChild(cloned);
        //     window.print();
        // },

        onClearData() {
            this.Id_lea_cars = ''
            this.truck_plateNo = ''
            this.truck_plate_detail = ''
            this.truck_type = ''
            this.emp_name = ''
            this.emp_mobile = ''
            this.pri_id_card = ''
            this.product_name = ''
            this.pri_product_details = ''
            this.pri_product_qty = ''
            this.loca_detail = ''
            this.loca_detail1 = ''
            this.loca_province = ''
            this.loca_province1 = ''
            this.pri_road_express = ''
            this.pri_card_glass = ''
            this.price = ''
            this.start_go_date = null
            this.end_date = null
            this.pri_money_allready_pay = '0'
            this.customer_id = ''
            this.customer_mobile = ''
            this.customer_name = ''
            this.pri_express_prod_detail = ''
            this.pri_recive_prod_detail = ''
            this.pri_car_brand = ''
            this.pri_product_weight = ''
        },
        // activate() {
        //     setTimeout(() => this.print(), 1000)
        // },
        onGetCustomerDetails(id) {
            console.log(id)
            let data = this.customer_data_list?.filter((el => el.id === id));
            // console.log("filter:",data)
            this.customer_name = data[0]?.customerName
            this.customer_mobile = data[0]?.mobile
            this.customer_id = id
        },
        onGetEmpDetails(id) {
            let data = this.emplyee_list?.filter((el => el.id === id));
            this.emp_name = data[0]?.name
            this.emp_realName = data[0]?.realName
            this.emp_mobile = data[0]?.phone
            this.emp_id_card = data[0]?.cardNo
            this.staff_new1 = data[0]?.id
        },
        onGetEmpDetails1(id) {
            let data = this.emplyee_list?.filter((el => el.id === id));
            this.emp_name1 = data[0]?.name
            this.emp_realName1 = data[0]?.realName1
            this.emp_mobile1 = data[0]?.phone
            this.emp_id_card1 = data[0]?.cardNo
            this.staff_new2 = data[0]?.id
        },
        async onGetCarDetails(

            id
        ) {
            let data = this.cars_list?.filter((el => el.key_id === id));
            console.log('head:', data)
            this.h_VICIVLE_NUMBER = data[0]?.h_VICIVLE_NUMBER,
                this.h_VICIVLE_BRANCH = data[0]?.h_VICIVLE_BRANCH,
                this.h_VICIVLE_YEARLEVEL = data[0]?.h_VICIVLE_YEARLEVEL,
                this.h_VICIVLE_GALATY = data[0]?.h_VICIVLE_GALATY,
                this.h_VICIVLE_DATE_GALATY = data[0]?.h_VICIVLE_DATE_GALATY,
                this.h_VICIVLE_LEKJUK = data[0]?.h_VICIVLE_LEKJUK,
                this.h_VICIVLE_LEKTHUNG = data[0]?.h_VICIVLE_LEKTHUNG,
                this.h_VICIVLE_BRANCHTYPE = data[0]?.h_VICIVLE_BRANCHTYPE,
                this.h_VICIVLE_DATEEXPRIRE = data[0]?.h_VICIVLE_DATEEXPRIRE,
                this.kim_KM = data[0]?.kim_KM,
                this.truck_kilomen = data[0]?.kim_kilo,
                this.ll_TIRE_NO_1 = data[0]?.ll_TIRE_NO_1,
                this.ll_TIRE_NO_2 = data[0]?.ll_TIRE_NO_2,
                this.ll_TIRE_NO_3 = data[0]?.ll_TIRE_NO_3,
                this.ll_TIRE_NO_4 = data[0]?.ll_TIRE_NO_4,
                this.ll_TIRE_NO_5 = data[0]?.ll_TIRE_NO_5,
                this.ll_TIRE_NO_6 = data[0]?.ll_TIRE_NO_6,

                this.r_TIRE_NO_1 = data[0]?.r_TIRE_NO_1,
                this.r_TIRE_NO_2 = data[0]?.r_TIRE_NO_2,
                this.r_TIRE_NO_3 = data[0]?.r_TIRE_NO_3,
                this.r_TIRE_NO_4 = data[0]?.r_TIRE_NO_4,
                this.r_TIRE_NO_5 = data[0]?.r_TIRE_NO_5,
                this.r_TIRE_NO_6 = data[0]?.r_TIRE_NO_6,

                this.ll_TIRE_DATE_1 = data[0]?.ll_TIRE_DATE_1,
                this.ll_TIRE_DATE_2 = data[0]?.ll_TIRE_DATE_2,
                this.ll_TIRE_DATE_3 = data[0]?.ll_TIRE_DATE_3,
                this.ll_TIRE_DATE_4 = data[0]?.ll_TIRE_DATE_4,
                this.ll_TIRE_DATE_5 = data[0]?.ll_TIRE_DATE_5,
                this.ll_TIRE_DATE_6 = data[0]?.ll_TIRE_DATE_6,

                this.r_TIRE_DATE_1 = data[0]?.r_TIRE_DATE_1,
                this.r_TIRE_DATE_2 = data[0]?.r_TIRE_DATE_2,
                this.r_TIRE_DATE_3 = data[0]?.r_TIRE_DATE_3,
                this.r_TIRE_DATE_4 = data[0]?.r_TIRE_DATE_4,
                this.r_TIRE_DATE_5 = data[0]?.r_TIRE_DATE_5,
                this.r_TIRE_DATE_6 = data[0]?.r_TIRE_DATE_6,

                this.ll_TIRE_KM_1 = data[0]?.ll_TIRE_KM_1,
                this.ll_TIRE_KM_2 = data[0]?.ll_TIRE_KM_2,
                this.ll_TIRE_KM_3 = data[0]?.ll_TIRE_KM_3,
                this.ll_TIRE_KM_4 = data[0]?.ll_TIRE_KM_4,
                this.ll_TIRE_KM_5 = data[0]?.ll_TIRE_KM_5,
                this.ll_TIRE_KM_6 = data[0]?.ll_TIRE_KM_6,

                this.r_TIRE_KM_1 = data[0]?.r_TIRE_KM_1,
                this.r_TIRE_KM_2 = data[0]?.r_TIRE_KM_2,
                this.r_TIRE_KM_3 = data[0]?.r_TIRE_KM_3,
                this.r_TIRE_KM_4 = data[0]?.r_TIRE_KM_4,
                this.r_TIRE_KM_5 = data[0]?.r_TIRE_KM_5,
                this.r_TIRE_KM_6 = data[0]?.r_TIRE_KM_6,
                this.let_mai_pian_num_mun_kheng_next = data[0]?.h_LEK_NUMMUNKHG,

                this.head_new = id
            this.let_next = data[0]?.h_LEK_NUMMUNKHG
        },
        async onGetTruckList() {
            try {
                this.loading_processing = true
                await this.$axios.$post('listVicicleHeaderCombo1.service', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    console.log('truck_list:', data?.data)
                    if (data?.data) {
                        this.cars_list = data?.data
                    } else {
                        this.cars_list = []
                    }
                    let datas = this.cars_list?.filter((el => parseInt(el.key_id) === parseInt(this.$route?.query?.head_id)));
                    // this.h_VICIVLE_NUMBER = datas[0]?.h_VICIVLE_NUMBER,
                    this.h_VICIVLE_BRANCH = datas[0]?.h_VICIVLE_BRANCH,
                        this.h_VICIVLE_YEARLEVEL = datas[0]?.h_VICIVLE_YEARLEVEL,
                        this.h_VICIVLE_GALATY = datas[0]?.h_VICIVLE_GALATY,
                        this.h_VICIVLE_DATE_GALATY = datas[0]?.h_VICIVLE_DATE_GALATY,
                        this.h_VICIVLE_LEKJUK = datas[0]?.h_VICIVLE_LEKJUK,
                        this.h_VICIVLE_LEKTHUNG = datas[0]?.h_VICIVLE_LEKTHUNG,
                        this.h_VICIVLE_BRANCHTYPE = datas[0]?.h_VICIVLE_BRANCHTYPE,
                        this.h_VICIVLE_DATEEXPRIRE = datas[0]?.h_VICIVLE_DATEEXPRIRE,
                        this.let_next = datas[0]?.h_LEK_NUMMUNKHG,
                        this.truck_kilomen = datas[0]?.kim_KM,
                        // console.log("=======",datas[0]?.kim_kilo),
                        this.ll_TIRE_NO_1 = datas[0]?.ll_TIRE_NO_1,
                        this.ll_TIRE_NO_2 = datas[0]?.ll_TIRE_NO_2,
                        this.ll_TIRE_NO_3 = datas[0]?.ll_TIRE_NO_3,
                        this.ll_TIRE_NO_4 = datas[0]?.ll_TIRE_NO_4,
                        this.ll_TIRE_NO_5 = datas[0]?.ll_TIRE_NO_5,
                        this.ll_TIRE_NO_6 = datas[0]?.ll_TIRE_NO_6,
                        this.ll_TIRE_DATE_1 = datas[0]?.ll_TIRE_DATE_1,
                        this.ll_TIRE_DATE_2 = datas[0]?.ll_TIRE_DATE_2,
                        this.ll_TIRE_DATE_3 = datas[0]?.ll_TIRE_DATE_3,
                        this.ll_TIRE_DATE_4 = datas[0]?.ll_TIRE_DATE_4,
                        this.ll_TIRE_DATE_5 = datas[0]?.ll_TIRE_DATE_5,
                        this.ll_TIRE_DATE_6 = datas[0]?.ll_TIRE_DATE_6,
                        this.ll_TIRE_KM_1 = datas[0]?.ll_TIRE_KM_1,
                        this.ll_TIRE_KM_2 = datas[0]?.ll_TIRE_KM_2,
                        this.ll_TIRE_KM_3 = datas[0]?.ll_TIRE_KM_3,
                        this.ll_TIRE_KM_4 = datas[0]?.ll_TIRE_KM_4,
                        this.ll_TIRE_KM_5 = datas[0]?.ll_TIRE_KM_5,
                        this.ll_TIRE_KM_6 = datas[0]?.ll_TIRE_KM_6,


                        this.r_TIRE_NO_1 = datas[0]?.r_TIRE_NO_1,
                        this.r_TIRE_NO_2 = datas[0]?.r_TIRE_NO_2,
                        this.r_TIRE_NO_3 = datas[0]?.r_TIRE_NO_3,
                        this.r_TIRE_NO_4 = datas[0]?.r_TIRE_NO_4,
                        this.r_TIRE_NO_5 = datas[0]?.r_TIRE_NO_5,
                        this.r_TIRE_NO_6 = datas[0]?.r_TIRE_NO_6,
                        this.r_TIRE_DATE_1 = datas[0]?.r_TIRE_DATE_1,
                        this.r_TIRE_DATE_2 = datas[0]?.r_TIRE_DATE_2,
                        this.r_TIRE_DATE_3 = datas[0]?.r_TIRE_DATE_3,
                        this.r_TIRE_DATE_4 = datas[0]?.r_TIRE_DATE_4,
                        this.r_TIRE_DATE_5 = datas[0]?.r_TIRE_DATE_5,
                        this.r_TIRE_DATE_6 = datas[0]?.r_TIRE_DATE_6,
                        this.r_TIRE_KM_1 = datas[0]?.r_TIRE_KM_1,
                        this.r_TIRE_KM_2 = datas[0]?.r_TIRE_KM_2,
                        this.r_TIRE_KM_3 = datas[0]?.r_TIRE_KM_3,
                        this.r_TIRE_KM_4 = datas[0]?.r_TIRE_KM_4,
                        this.r_TIRE_KM_5 = datas[0]?.r_TIRE_KM_5,
                        this.r_TIRE_KM_6 = datas[0]?.r_TIRE_KM_6,
                        this.let_mai_pian_num_mun_kheng_next = datas[0]?.let_nummunkg,
                        this.header_ID = this.$route?.query?.head_id
                })
            } catch (error) {
                this.loading_processing = false
                console.log("error:", error)
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        async onGetTruckFooter() {
            try {
                this.loading_processing = true
                await this.$axios.$post('listViciclefooterCombo1.service', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    console.log('all_truck_footer_list:', data)
                    if (data?.data == null || data?.data == '') {
                        this.truct_footer_data_list = []
                        this.loading_processing = false
                        this.loading_processing = false
                    } else {
                        this.truct_footer_data_list = data?.data
                        this.loading_processing = false
                        this.loading_processing = false
                        let datas = this.truct_footer_data_list?.filter((el => parseInt(el.key_id) === parseInt(this.$route?.query?.footer_id)));
                        this.f_DATEEXPRIED = datas[0]?.f_DATEEXPRIED,
                            // this.f_CARD_NO = datas[0]?.f_CARD_NO,
                            this.f_BRANCH = datas[0]?.f_BRANCH,
                            this.f_YEAR = datas[0]?.f_YEAR,
                            this.f_GALATY_NO = datas[0]?.f_GALATY_NO,
                            this.f_GALATY_DEP = datas[0]?.f_GALATY_DEP,
                            this.f_CAR_TYPE = datas[0]?.f_CAR_TYPE,



                            this.f_LEKKUNZEE = datas[0]?.f_LEKKUNZEE,

                            this.bl_TRIES_1 = datas[0]?.l_TRIES_1,
                            this.bl_TRIES_2 = datas[0]?.l_TRIES_2,
                            this.bl_TRIES_3 = datas[0]?.l_TRIES_3,
                            this.bl_TRIES_4 = datas[0]?.l_TRIES_4,
                            this.bl_TRIES_5 = datas[0]?.l_TRIES_5,
                            this.bl_TRIES_6 = datas[0]?.l_TRIES_6,
                            this.bl_TRIES_7 = datas[0]?.l_TRIES_7,
                            this.bl_TRIES_8 = datas[0]?.l_TRIES_8,

                            this.br_TRIES_1 = datas[0]?.r_TRIES_1,
                            this.br_TRIES_2 = datas[0]?.r_TRIES_2,
                            this.br_TRIES_3 = datas[0]?.r_TRIES_3,
                            this.br_TRIES_4 = datas[0]?.r_TRIES_4,
                            this.br_TRIES_5 = datas[0]?.r_TRIES_5,
                            this.br_TRIES_6 = datas[0]?.r_TRIES_6,
                            this.br_TRIES_7 = datas[0]?.r_TRIES_7,
                            this.br_TRIES_8 = datas[0]?.r_TRIES_8,
                            this.bl_TRIES_DATE_1 = datas[0]?.l_TRIES_DATE_1,
                            this.bl_TRIES_DATE_2 = datas[0]?.l_TRIES_DATE_2,
                            this.bl_TRIES_DATE_3 = datas[0]?.l_TRIES_DATE_3,
                            this.bl_TRIES_DATE_4 = datas[0]?.l_TRIES_DATE_4,
                            this.bl_TRIES_DATE_5 = datas[0]?.l_TRIES_DATE_5,
                            this.bl_TRIES_DATE_6 = datas[0]?.l_TRIES_DATE_6,
                            this.bl_TRIES_DATE_7 = datas[0]?.l_TRIES_DATE_7,
                            this.bl_TRIES_DATE_8 = datas[0]?.l_TRIES_DATE_8,


                            this.br_TRIES_DATE_1 = datas[0]?.r_TRIES_DATE_1,
                            this.br_TRIES_DATE_2 = datas[0]?.r_TRIES_DATE_2,
                            this.br_TRIES_DATE_3 = datas[0]?.r_TRIES_DATE_3,
                            this.br_TRIES_DATE_4 = datas[0]?.r_TRIES_DATE_4,
                            this.br_TRIES_DATE_5 = datas[0]?.r_TRIES_DATE_5,
                            this.br_TRIES_DATE_6 = datas[0]?.r_TRIES_DATE_6,
                            this.br_TRIES_DATE_7 = datas[0]?.r_TRIES_DATE_7,
                            this.br_TRIES_DATE_8 = datas[0]?.r_TRIES_DATE_8,

                            this.bl_TRIES_KM_1 = datas[0]?.l_TRIES_KM_1,
                            this.bl_TRIES_KM_2 = datas[0]?.l_TRIES_KM_2,
                            this.bl_TRIES_KM_3 = datas[0]?.l_TRIES_KM_3,
                            this.bl_TRIES_KM_4 = datas[0]?.l_TRIES_KM_4,
                            this.bl_TRIES_KM_5 = datas[0]?.l_TRIES_KM_5,
                            this.bl_TRIES_KM_6 = datas[0]?.l_TRIES_KM_6,
                            this.bl_TRIES_KM_7 = datas[0]?.l_TRIES_KM_7,
                            this.bl_TRIES_KM_8 = datas[0]?.l_TRIES_KM_8,


                            this.br_TRIES_KM_1 = datas[0]?.r_TRIES_KM_1,
                            this.br_TRIES_KM_2 = datas[0]?.r_TRIES_KM_2,
                            this.br_TRIES_KM_3 = datas[0]?.r_TRIES_KM_3,
                            this.br_TRIES_KM_4 = datas[0]?.r_TRIES_KM_4,
                            this.br_TRIES_KM_5 = datas[0]?.r_TRIES_KM_5,
                            this.br_TRIES_KM_6 = datas[0]?.r_TRIES_KM_6,
                            this.br_TRIES_KM_7 = datas[0]?.r_TRIES_KM_7,
                            this.br_TRIES_KM_8 = datas[0]?.r_TRIES_KM_8,
                            this.footer_ID = this.$route?.query?.footer_id
                    }
                })
            } catch (error) {
                this.loading_processing = false
                console.log(error)
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        async onGetEmployeeListForChoose() {
            try {
                this.loading_processing = true
                await this.$axios.$post('getChooseStaft01.service', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    console.log('employee_list:', data?.data)
                    // this.emplyee_list = data?.data
                    this.emplyee_list_choose = data?.data?.map((list) => {
                        return {
                            'name': `${list?.name} | ${list?.surname}`, 'phone': `${list?.mobile}`, 'cardNo': `${list?.licenceId}`, 'id': `${list?.id
                                }`, 'st_id': `${list?.staftId}`, 'realName': `${list?.name}`
                        }
                    })

                })
            } catch (error) {
                this.loading_processing = false
                console.log(error)
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        async onGetEmployeeList() {
            try {
                this.loading_processing = true
                await this.$axios.$post('getAllStaft', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    console.log('employee_list:', data?.data)
                    // this.emplyee_list = data?.data
                    this.emplyee_list = data?.data?.map((list) => {
                        return {
                            'name': `${list?.name} | ${list?.surname}`, 'phone': `${list?.mobile}`, 'cardNo': `${list?.licenceId}`, 'id': `${list?.id
                                }`, 'st_id': `${list?.staftId}`, 'realName': `${list?.name}`
                        }
                    })
                    let datas = this.emplyee_list?.filter((el => parseInt(el.id) === parseInt(this.$route?.query?.staft_id1)));
                    this.emp_name = datas[0]?.name
                    this.emp_realName = datas[0]?.realName
                    this.emp_mobile = datas[0]?.phone
                    this.emp_id_card = datas[0]?.cardNo
                    this.staff_ID_NUM1 = datas[0]?.id
                })
            } catch (error) {
                this.loading_processing = false
                console.log(error)
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        async onGetEmployeeList1() {
            try {
                this.loading_processing = true
                await this.$axios.$post('getAllStaft', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    console.log('employee_list:', data?.data)
                    this.emplyee_list = data?.data?.map((list) => {
                        return {
                            'name': `${list?.name} | ${list?.surname}`, 'phone': `${list?.mobile}`, 'cardNo': `${list?.licenceId}`, 'id': `${list?.id
                                }`, 'st_id': `${list?.staftId}`, 'realName': `${list?.name}`
                        }
                    })
                    let datas = this.emplyee_list?.filter((el => parseInt(el.id) === parseInt(this.$route?.query.staft_id2)));
                    this.emp_name1 = datas[0]?.name
                    this.emp_realName1 = datas[0]?.realName
                    this.emp_mobile1 = datas[0]?.phone
                    this.emp_id_card1 = datas[0]?.cardNo
                    this.staff_ID_NUM2 = datas[0]?.id
                })
            } catch (error) {
                this.loading_processing = false
                console.log("errorder", error)
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        onGetLocaDetails(id) {
            let data = this.loca_data_list?.filter((el => el.id === id));

            this.loca_send_province = data[0]?.province
            this.loca_send_station = data[0]?.detail
            this.place_PD_FROM = id
        },
        onGetLocaDetails1(id) {
            let data = this.loca_data_list?.filter((el => el.id === id));
            this.loca_recieve_province = data[0]?.province
            this.loca_revieve_station = data[0]?.detail
            this.place_PD_TO = id
        },
        onGetProductDetails(id) {

            let data = this.products_data_list?.filter((el => el.id === id));
            this.product_name = data[0]?.proName;
            this.product_ID = id;
        },
        async onGetLocationList() {
            try {
                // this.loading_processing = true
                await this.$axios.$post('/getAllLocation', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    if (data?.status == '00') {
                        // this.loading_processing = false
                        console.log('locaList:', data)
                        // this.loca_data_list = data?.data
                        this.loca_data_list = data?.data.map((list) => {
                            return { 'name': `${list?.province} | ${list?.detail}`, 'id': `${list?.id}`, 'detail': `${list?.detail}`, 'province': `${list?.province}` };
                        })
                        let datas = this.loca_data_list?.filter((el => parseInt(el.id) === parseInt(this.$route.query?.place_from)));

                        this.loca_send_province = datas[0]?.province
                        this.loca_send_station = datas[0]?.detail
                        this.place_PD_FROM = this.$route.query?.place_from
                    }
                })
            } catch (error) {
                // this.loading_processing = false
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        async onGetLocationList1() {
            try {
                // this.loading_processing = true
                await this.$axios.$post('/getAllLocation', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    if (data?.status == '00') {
                        // this.loading_processing = false
                        console.log('locaList:', data)
                        // this.loca_data_list = data?.data
                        this.loca_data_list = data?.data.map((list) => {
                            return { 'name': `${list?.province} | ${list?.detail}`, 'id': `${list?.id}`, 'detail': `${list?.detail}`, 'province': `${list?.province}` };
                        })
                        let datas = this.loca_data_list?.filter((el => parseInt(el.id) === parseInt(this.$route?.query?.place_to)));
                        this.loca_recieve_province = datas[0]?.province
                        this.loca_revieve_station = datas[0]?.detail
                        this.place_PD_TO = this.$route?.query?.place_to
                    }
                })
            } catch (error) {
                // this.loading_processing = false
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        async onGetCustomerList() {
            try {
                this.loading_processing = true
                await this.$axios.$post('getAllCustomer', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    if (data?.status == '00') {
                        this.customer_data_list = data?.data
                        this.loading_processing = false
                        console.log('customer_list:', data);
                        console.log("cusInfo:", this.customer_data_list)
                        let datas = this.customer_data_list?.filter((el => parseInt(el.id) === parseInt(this.$route?.query?.cusId)));
                        console.log("new:", datas)
                        this.customer_name = datas[0]?.customerName
                        this.customer_mobile = datas[0]?.mobile
                        this.customer_id = this.$route?.query?.cusId
                    }
                })
            } catch (error) {
                this.loading_processing = false
                console.log(error)
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        async onGetProductsList() {
            try {
                this.loading_processing = true
                await this.$axios.$post('getAllProduct', {
                    toKen: localStorage.getItem("toKen"),

                }).then((data) => {
                    if (data?.status == '00') {
                        this.products_data_list = data?.data
                        this.loading_processing = false
                        let datas = this.products_data_list?.filter((el => parseInt(el.id) === parseInt(this.$route?.query?.proId)));
                        this.product_name = datas[0]?.proName;
                        this.product_ID = this.$route?.query?.proId;
                        console.log('products_list:', data)
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
    },
}
</script>
<style lang="scss">
.bottoms {
    position: relative;
    bottom: 0px;
}



// @media screen {
//     #print {
//         display: none;
//     }
// }

// @media print {
//     @page {
//         size: A4;
//         margin: 1in;
//     }

//     body * {
//         visibility: hidden;
//     }

//     #print,
//     #print * {
//         visibility: visible;
//     }

//     #print {
//         position: absolute;
//         top: 0px;
//         right: 0px;
//         left: 0px;
//     }
// }

.margintop {
    margin-top: -30px;
}

.top {
    margin-top: 5px;
    margin-left: 10px;
}
</style>
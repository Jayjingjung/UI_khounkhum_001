<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <!-- General car info -->
        <v-card class="card-shadow mx-auto" width="1400">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="cars_footer">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ເບີ່ງຂໍ້ມູນຫາງລົດ
                <v-spacer></v-spacer>
                <v-row justify="center">
                    <v-btn color="#f593b3" class="white--text"
                        @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
                </v-row>
            </v-card-title>
            <v-card-text>
                <div class="d-flex align-center">
                    <v-card class="text-center ml-10 mr-10" max-width="400">
                        <img :src="imgFootTruckOld" height="220px" cover>
                    </v-card>
                    <div style="width:100%" class="pr-2">
                        <span>ຍີ່ຫໍ້ຫາງລົດ</span>
                        <v-text-field :rules="nameRules" label="ຍີ່ຫໍ້ຫາງລົດ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="f_BRANCH"></v-text-field>
                    </div>
                    <div style="width:100%" class="px-2"><span>ຫາງລົດປີ</span>
                        <v-text-field :rules="nameRules" label="ລົດປີ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="f_YEAR"></v-text-field>
                    </div>
                    <div style="width:100%" class="px-2"><span>ປະເພດລົດ</span>
                        <v-text-field :rules="nameRules" label="ປະເພດລົດ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="f_CAR_TYPE"></v-text-field>
                    </div>
                </div>
                <div class="" style="display:flex;flex-direction:row;justify-content:space-between">

                    <div style="width:100%" class="pr-2"><span>ທະບຽນຫາງລົດ</span>
                        <v-text-field :rules="nameRules" label="ທະບຽນລົດ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="f_CARD_NO"></v-text-field>
                    </div>
                    <div class="px-2" style="width:100%"><span>ຍີ່ຫໍ້ຫາງລົດ</span><v-text-field :rules="nameRules"
                            label="ເລກຄັນຊີ" dense readonly flat solo background-color="#f5f5f5"
                            v-model="f_LEKKUNZEE"></v-text-field></div>
                    <div class="px-2" style="width:100%"><span>ເຜົາ</span><v-text-field :rules="nameRules" label="ເຜົາ"
                            dense readonly flat solo background-color="#f5f5f5" v-model="f_PAO"></v-text-field>
                    </div>
                    <div class="px-2" style="width:100%"><span>ຂໍເກາະ</span><v-text-field :rules="nameRules"
                            label="ຂໍເກາະ" dense readonly flat solo background-color="#f5f5f5"
                            v-model="f_KORKC"></v-text-field></div>
                </div>
                <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                    <div class="pr-2" style="width:100%"><span>ໂຕລັອກຕູ້</span><v-text-field :rules="nameRules"
                            label="ໂຕລັອກຕູ້" dense readonly flat solo background-color="#f5f5f5"
                            v-model="f_TOLOCKTU"></v-text-field></div>
                    <div style="width:100%" class="px-2"><span>ໂສ້</span>
                        <v-text-field :rules="nameRules" label="ໂສ້" dense readonly flat solo background-color="#f5f5f5"
                            v-model="f_SO"></v-text-field>
                    </div>
                    <!-- <div class="px-2" style="width:100%"><span>ຜ້າບັດ</span><v-text-field :rules="nameRules"
                            label="ຜ້າບັດ" dense readonly flat solo background-color="#f5f5f5"
                            v-model="f_PABUD"></v-text-field></div> -->
                    <div class="px-2" style="width:100%"><span>ໄຟຂ້າງ</span><v-text-field :rules="nameRules"
                            label="ໄຟຂ້າງ" dense readonly flat solo background-color="#f5f5f5"
                            v-model="f_FAIKHANG"></v-text-field></div>
                </div>
                <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                    <div class="pr-2" style="width:100%"><span>ໄຟທ້າຍ</span><v-text-field :rules="nameRules"
                            label="ໄຟທ້າຍ" dense readonly flat solo background-color="#f5f5f5"
                            v-model="f_FAITHAIY"></v-text-field></div>
                    <div style="width:100%" class="px-2"><span>ບັງຕົມ</span>
                        <v-text-field :rules="nameRules" label="ບັງຕົມ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="f_BGTHOM"></v-text-field>
                    </div>
                    <div class="px-2" style="width:100%"><span>ເລກປະກັນໄພ</span>
                        <v-text-field :rules="nameRules" label="ເລກປະກັນໄພ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="f_GALATY_NO"></v-text-field>
                    </div>
                    <div class="px-2" style="width:100%"><span>ວັນທີປະກັນໄພໝົດ</span>
                        <v-text-field :rules="nameRules" label="ວັນທີປະກັນໄພໝົດ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="f_GALATY_DEP"></v-text-field>
                    </div>
                    <div class="px-2" style="width:100%"><span>ເລກຕັ້ງສິດ</span>
                        <v-text-field :rules="nameRules" label="ເລກຕັ້ງສິດ" dense readonly flat solo
                            background-color="#f5f5f5" v-model="lektungsit"></v-text-field>
                    </div>
                </div>
                <div style="width: 20%;">
                    <span>ວັນທີໝົດອາຍຸຕັ້ງສິດ</span>
                    <v-menu :close-on-content-click="false" :return-value.sync="dateExTungsit"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-if="dateExTungsit_status === 'W'" dense outlined background-color="#FFF176"
                                v-model="dateExTungsit" required append-icon="mdi-calendar" readonly v-bind="attrs"
                                v-on="on" :rules="nameRules"></v-text-field>
                            <v-text-field v-else-if="dateExTungsit_status === 'E'" dense outlined background-color="red"
                                v-model="dateExTungsit" required append-icon="mdi-calendar" readonly v-bind="attrs"
                                v-on="on" :rules="nameRules"></v-text-field>
                            <v-text-field v-else dense outlined background-color="#f5f5f5" v-model="dateExTungsit"
                                required append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                :rules="nameRules"></v-text-field>
                        </template>>
                    </v-menu>
                </div>
                <div class="d-flex align-center pt-2 pr-2"
                    style="background-color:#f7f7f7;border-radius:5px;height:50px">
                    <v-radio-group inline v-model="f_STATUS">
                        <div class="pl-4 d-flex align-center">
                            <span>ສະຖານະຫາງລົດ</span>
                            <Width />
                            <v-radio label="ວ່າງ" value="Y" color="#55CE63"></v-radio>
                            <Width />
                            <v-radio label="ບໍ່ວ່າງ" value="N" color="red"></v-radio>
                        </div>
                    </v-radio-group>
                </div>
                <!-- ຂໍ້ມູນຢາງລົດ -->
                <v-card flat>
                    <v-card-title>
                        <div class="d-flex">
                            <span>ຂໍ້ມູນຢາງລົດ:</span>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div style="width:100%;display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <!-- Left -->
                                <div style="background-color:#f5f5f5;border-radius:5px" class="pa-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_1"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="l_TRIES_DATE_1"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="l_TRIES_KM_1"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_2"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="l_TRIES_DATE_2"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="l_TRIES_KM_2"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div style="padding-top: 0px" class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_3"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="l_TRIES_DATE_3"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="l_TRIES_KM_3"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_4"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="l_TRIES_DATE_4"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="l_TRIES_KM_4"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div style="padding-top: 0px" class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_5"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="l_TRIES_DATE_5"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="l_TRIES_KM_5"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_6"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="l_TRIES_DATE_6"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="l_TRIES_KM_6"></v-text-field>
                                    </div>
                                </div>
                                <!-- NEW SESSION -->
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                    v-if="l_TRIES_7">
                                    <div style="padding-top: 0px" class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_7"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="l_TRIES_DATE_7"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="l_TRIES_KM_7"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                    v-if="l_TRIES_8">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="l_TRIES_8"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງs" v-model="l_TRIES_DATE_8"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ kms" v-model="l_TRIES_KM_8"></v-text-field>
                                    </div>
                                </div>
                            </div>
                            <div style="display:flex;flex-direction:row;justify-content:center;align-items:center">
                                <div v-if="r_TRIES_7" class="text-center">
                                    <img class="mx-auto" src="../assets/images/back16.png" width="150" height="420" />
                                </div>
                                <div v-else class="text-center">
                                    <img class="mx-auto" src="../assets/images/backs12.png" width="150" height="310" />
                                </div>
                            </div>
                            <!-- Right -->
                            <div style="width:100%">
                                <div style="background-color:#f5f5f5;border-radius:5px">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_1"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TRIES_DATE_1"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TRIES_KM_1"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_2"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TRIES_DATE_2"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TRIES_KM_2"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div style="padding-top: 0px" class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_3"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TRIES_DATE_3"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TRIES_KM_3"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_4"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TRIES_DATE_4"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TRIES_KM_4"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div style="padding-top: 0px" class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_5"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TRIES_DATE_5"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TRIES_KM_5"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_6"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TRIES_DATE_6"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TRIES_KM_6"></v-text-field>
                                    </div>
                                </div>
                                <!-- NEW SESSION -->
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                    v-if="r_TRIES_7">

                                    <div style="padding-top: 0px" class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_7"></v-text-field>

                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TRIES_DATE_7"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TRIES_KM_7"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                    v-if="r_TRIES_8">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" dense readonly label="ລະຫັດຢາງລົດ"
                                            v-model="r_TRIES_8"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ວັນທີປ່ຽນຢາງs" v-model="r_TRIES_DATE_8"></v-text-field>
                                        <v-text-field class="ml-2" :rules="nameRules" dense readonly
                                            label="ກຳນົດແລ່ນໄດ້ kms" v-model="r_TRIES_KM_8"></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
        <div style="display: none;">
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
                <div class="text-center"
                    style="display:flex;justify-content:center;font-size:20px;font-weight:bold;margin-top: 18px;margin-bottom: 35px;">
                    ລາຍງານຂໍ້ມູນຫາງລົດ
                </div>
                <v-card-text>
                    <div style="display:flex;flex-direction:row;justify-content:space-between">
                        <div class="text-center ml-10 mr-10">
                            <img :src="imgFootTruckOld" height="200px" width="250px" cover>
                        </div>
                        <div style="padding-top: 30px;">
                            <div style="margin-bottom: 20px;">ຍີ່ຫໍ້ຫາງລົດ: {{ f_BRANCH }}</div>
                            <div style="margin-bottom: 20px;">ຫາງລົດປີ: {{ f_YEAR }}</div>
                            <div style="margin-bottom: 20px;">ປະເພດລົດ: {{ f_CAR_TYPE }}</div>
                            <div>ໄຟຂ້າງ: {{ f_FAIKHANG }}</div>
                        </div>
                        <div style="padding-top: 30px;">
                            <div style="margin-bottom: 20px;">ທະບຽນຫາງລົດ: {{ f_CARD_NO }}</div>
                            <div style="margin-bottom: 20px;">ເລກຄັນຊີ :{{ f_LEKKUNZEE }}</div>
                            <div style="margin-bottom: 20px;">ເຜົາ : {{ f_PAO }}</div>
                            <div>ໄຟທ້າຍ : {{ f_FAITHAIY }}</div>
                        </div>
                    </div>
                    <div
                        style="margin-top:20px;margin-right:10px; display:flex;flex-direction:row;justify-content:space-between">
                        <div style="padding-top: 30px;">
                            <div style="margin-bottom: 20px;"> ໂຕລັອກຕູ້: {{ f_TOLOCKTU }}</div>
                            <div style="margin-bottom: 20px;"> ໂສ້: {{ f_SO }}</div>
                            <!-- <div style="margin-bottom: 20px;"> ຜ້າບັດ: {{ f_PABUD }}</div> -->
                     
                        </div>
                        <div style="padding-top: 30px;">
                            <div style="margin-bottom: 20px;"> ບັງຕົມ: {{ f_BGTHOM }}</div>
                            <div style="margin-bottom: 20px;">ເລກປະກັນໄພ: {{ f_GALATY_NO }}</div>
                            <div style="margin-bottom: 20px;">ເລກຕັ້ງສິດ: {{ lektungsit }}</div>
                        </div>
                        <div style="padding-top: 30px;">
                            <div style="margin-bottom: 20px;">ຂໍເກາະ : {{ f_KORKC }}</div>
                            <div style="margin-bottom: 20px;">ວັນທີຫມົດປະກັນໄພ: {{ f_GALATY_DEP }}</div>
                            <div style="margin-bottom: 20px;">ວັນທີໝົດອາຍຸຕັ້ງສິດ: {{ dateExTungsit }}</div>
                        </div>
                    </div>
                    <!-- ຂໍ້ມູນຢາງລົດ -->
                    <v-card flat>
                        <v-card-text style="margin-top: 100px;">
                            <div class="text-center" style="display:flex;justify-content:center;font-size:20px;font-weight:bold;margin-top: 30px;margin-bottom: 10px;">
                                ຂໍ້ມູນຢາງລົດ
                            </div>
                            <div style="width:100%;display:flex;justify-content:space-between ;margin-top: 10px;">
                                <div style="width:100%">
                                    <!-- Left -->
                                    <div dense>
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ l_TRIES_1 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ l_TRIES_DATE_1 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ l_TRIES_KM_1 }}
                                        </div>
                                    </div>
                                    <div style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ l_TRIES_2 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ l_TRIES_DATE_2 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ l_TRIES_KM_2 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ l_TRIES_3 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ;{{ l_TRIES_DATE_3 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ l_TRIES_KM_3 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ;{{ l_TRIES_4 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ l_TRIES_DATE_4 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km;{{ l_TRIES_KM_4 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ;{{ l_TRIES_5 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ l_TRIES_DATE_5 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ l_TRIES_KM_5 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ l_TRIES_6 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ l_TRIES_DATE_6 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ l_TRIES_KM_6 }}
                                        </div>
                                    </div>
                                    <!-- NEW SESSION -->
                                    <div dense v-if="l_TRIES_7" style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ l_TRIES_7 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ l_TRIES_DATE_7 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ l_TRIES_KM_7 }}
                                        </div>
                                    </div>
                                    <div dense v-if="l_TRIES_8" style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ l_TRIES_8 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ l_TRIES_DATE_8 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ l_TRIES_KM_8 }}
                                        </div>
                                    </div>
                                </div>
                                <div  style="width:100%; margin-top: 84px;">
                                    <div v-if="r_TRIES_7" class="text-center">
                                        <img class="mx-auto" src="../assets/images/back16.png" width="150"
                                            height="420" />
                                    </div>
                                    <div v-else class="text-center">
                                        <img class="mx-auto" src="../assets/images/backs12.png" width="150"
                                            height="310" />
                                    </div>
                                </div>
                                <!-- right -->
                                <div style="width:100%">
                                    <div dense>
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ r_TRIES_1 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ r_TRIES_DATE_1 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ r_TRIES_KM_1 }}
                                        </div>
                                    </div>
                                    <div style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ r_TRIES_2 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ r_TRIES_DATE_2 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ r_TRIES_KM_2 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ r_TRIES_3 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ;{{ r_TRIES_DATE_3 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ r_TRIES_KM_3 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ;{{ r_TRIES_4 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ r_TRIES_DATE_4 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km;{{ r_TRIES_KM_4 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ;{{ r_TRIES_5 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ r_TRIES_DATE_5 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ r_TRIES_KM_5 }}
                                        </div>
                                    </div>
                                    <div dense style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ r_TRIES_6 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ r_TRIES_DATE_6 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ r_TRIES_KM_6 }}
                                        </div>
                                    </div>
                                    <!-- NEW SESSION -->
                                    <div dense v-if="r_TRIES_7" style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ r_TRIES_7 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ r_TRIES_DATE_7 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ r_TRIES_KM_7 }}
                                        </div>
                                    </div>
                                    <div dense v-if="r_TRIES_8" style="margin-top: 15px;">
                                        <div>
                                            ລະຫັດຢາງລົດ:{{ r_TRIES_8 }}
                                        </div>
                                        <div>
                                            ວັນທີປ່ຽນຢາງ:{{ r_TRIES_DATE_8 }}
                                        </div>
                                        <div>
                                            ກຳນົດແລ່ນໄດ້km:{{ r_TRIES_KM_8 }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </div>
        </div>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            //insert
            loading_processing: false,
            chooseCarType: '12',
            valid: true,
            nameRules: [(v) => !!v || ''],
            // kilomen
            his_REASON: '',
            f_STATUS: '',
            f_BRANCH: '',
            f_YEAR: '',
            f_DATEEXPRIED: '',
            f_CARD_NO: '',
            f_LEKKUNZEE: '',
            f_PAO: '',
            f_KORKC: '',
            f_TOLOCKTU: '',
            f_SO: '',
            f_PABUD: '',
            f_FAIKHANG: '',
            f_FAITHAIY: '',
            f_BGTHOM: '',
            f_GALATY_NO: '',
            lektungsit: '',
            f_GALATY_DEP: '',
            f_CAR_TYPE: '',

            l_TRIES_1: '',
            l_TRIES_2: '',
            l_TRIES_3: '',
            l_TRIES_4: '',
            l_TRIES_5: '',
            l_TRIES_6: '',
            l_TRIES_7: '',
            l_TRIES_8: '',
            l_TRIES_DATE_1: '',
            l_TRIES_DATE_2: '',
            l_TRIES_DATE_3: '',
            l_TRIES_DATE_4: '',
            l_TRIES_DATE_5: '',
            l_TRIES_DATE_6: '',
            l_TRIES_DATE_7: '',
            l_TRIES_DATE_8: '',
            l_TRIES_KM_1: '',
            l_TRIES_KM_2: '',
            l_TRIES_KM_3: '',
            l_TRIES_KM_4: '',
            l_TRIES_KM_5: '',
            l_TRIES_KM_6: '',
            l_TRIES_KM_7: '',
            l_TRIES_KM_8: '',
            r_TRIES_1: '',
            r_TRIES_2: '',
            r_TRIES_3: '',
            r_TRIES_4: '',
            r_TRIES_5: '',
            r_TRIES_6: '',
            r_TRIES_7: '',
            r_TRIES_8: '',
            r_TRIES_DATE_1: '',
            r_TRIES_DATE_2: '',
            r_TRIES_DATE_3: '',
            r_TRIES_DATE_4: '',
            r_TRIES_DATE_5: '',
            r_TRIES_DATE_6: '',
            r_TRIES_DATE_7: '',
            r_TRIES_DATE_8: '',
            r_TRIES_KM_1: '',
            r_TRIES_KM_2: '',
            r_TRIES_KM_3: '',
            r_TRIES_KM_4: '',
            r_TRIES_KM_5: '',
            r_TRIES_KM_6: '',
            r_TRIES_KM_7: '',
            r_TRIES_KM_8: '',
            //=========
            f_KM1: '',
            f_KM2: '',
            f_KM3: '',
            f_KM4: '',
            f_KM5: '',
            f_KM6: '',
            f_KM7: '',
            f_KM8: '',
            f_KM9: '',
            f_KM10: '',
            f_KM11: '',
            f_KM12: '',
            f_KM13: '',
            f_KM14: '',
            f_KM15: '',
            f_KM16: '',
            f_KM_LL1: '',
            f_KM_LL2: '',
            f_KM_LL3: '',
            f_KM_LL4: '',
            f_KM_LL5: '',
            f_KM_LL6: '',
            f_KM_LL7: '',
            f_KM_LL8: '',
            f_KM_LL9: '',
            f_KM_LL10: '',
            f_KM_LL11: '',
            f_KM_LL12: '',
            f_KM_LL13: '',
            f_KM_LL14: '',
            f_KM_LL15: '',
            f_KM_LL16: '',
            dateExTungsit: '',
            dateExTungsit_status: ''
        }
    },
    mounted() {
        if (this.$route.query.key) {
            this.ongetData()
            console.log(this.$route.query.key)
        }
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
        async onInserTruct() {
            // if (!this.$refs.form.validate()) {
            //     swal.fire({
            //         icon: 'info',
            //         text: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ'
            //     })
            //     return null;
            // }
            this.loading_processing = true
            try {
                let data = {
                    key_id: this.$route.query.key,
                    f_BRANCH: this.f_BRANCH,
                    f_YEAR: this.f_YEAR,
                    f_DATEEXPRIED: this.f_DATEEXPRIED,
                    f_CARD_NO: this.f_CARD_NO,
                    f_LEKKUNZEE: this.f_LEKKUNZEE,
                    f_PAO: this.f_PAO,
                    f_KORKC: this.f_KORKC,
                    f_TOLOCKTU: this.f_TOLOCKTU,
                    f_SO: this.f_SO,
                    f_PABUD: this.f_PABUD,
                    f_FAIKHANG: this.f_FAIKHANG,
                    f_FAITHAIY: this.f_FAITHAIY,
                    f_BGTHOM: this.f_BGTHOM,
                    f_GALATY_NO: this.f_GALATY_NO,
                    lektungsit: this.lektungsit,
                    f_GALATY_DEP: this.f_GALATY_DEP,
                    f_CAR_TYPE: this.f_CAR_TYPE,
                    f_STATUS: this.f_STATUS,
                    his_REASON: this.his_REASON,
                    l_TRIES_1: this.l_TRIES_1,
                    l_TRIES_2: this.l_TRIES_2,
                    l_TRIES_3: this.l_TRIES_3,
                    l_TRIES_4: this.l_TRIES_4,
                    l_TRIES_5: this.l_TRIES_5,
                    l_TRIES_6: this.l_TRIES_6,
                    l_TRIES_7: this.l_TRIES_7,
                    l_TRIES_8: this.l_TRIES_8,
                    l_TRIES_DATE_1: this.l_TRIES_DATE_1,
                    l_TRIES_DATE_2: this.l_TRIES_DATE_2,
                    l_TRIES_DATE_3: this.l_TRIES_DATE_3,
                    l_TRIES_DATE_4: this.l_TRIES_DATE_4,
                    l_TRIES_DATE_5: this.l_TRIES_DATE_5,
                    l_TRIES_DATE_6: this.l_TRIES_DATE_6,
                    l_TRIES_DATE_7: this.l_TRIES_DATE_7,
                    l_TRIES_DATE_8: this.l_TRIES_DATE_8,
                    l_TRIES_KM_1: this.l_TRIES_KM_1,
                    l_TRIES_KM_2: this.l_TRIES_KM_2,
                    l_TRIES_KM_3: this.l_TRIES_KM_3,
                    l_TRIES_KM_4: this.l_TRIES_KM_4,
                    l_TRIES_KM_5: this.l_TRIES_KM_5,
                    l_TRIES_KM_6: this.l_TRIES_KM_6,
                    l_TRIES_KM_7: this.l_TRIES_KM_7,
                    l_TRIES_KM_8: this.l_TRIES_KM_8,
                    r_TRIES_1: this.r_TRIES_1,
                    r_TRIES_2: this.r_TRIES_2,
                    r_TRIES_3: this.r_TRIES_3,
                    r_TRIES_4: this.r_TRIES_4,
                    r_TRIES_5: this.r_TRIES_5,
                    r_TRIES_6: this.r_TRIES_6,
                    r_TRIES_7: this.r_TRIES_7,
                    r_TRIES_8: this.r_TRIES_8,
                    r_TRIES_DATE_1: this.r_TRIES_DATE_1,
                    r_TRIES_DATE_2: this.r_TRIES_DATE_2,
                    r_TRIES_DATE_3: this.r_TRIES_DATE_3,
                    r_TRIES_DATE_4: this.r_TRIES_DATE_4,
                    r_TRIES_DATE_5: this.r_TRIES_DATE_5,
                    r_TRIES_DATE_6: this.r_TRIES_DATE_6,
                    r_TRIES_DATE_7: this.r_TRIES_DATE_7,
                    r_TRIES_DATE_8: this.r_TRIES_DATE_8,
                    r_TRIES_KM_1: this.r_TRIES_KM_1,
                    r_TRIES_KM_2: this.r_TRIES_KM_2,
                    r_TRIES_KM_3: this.r_TRIES_KM_3,
                    r_TRIES_KM_4: this.r_TRIES_KM_4,
                    r_TRIES_KM_5: this.r_TRIES_KM_5,
                    r_TRIES_KM_6: this.r_TRIES_KM_6,
                    r_TRIES_KM_7: this.r_TRIES_KM_7,
                    r_TRIES_KM_8: this.r_TRIES_KM_8,
                    f_KM1: this.f_KM1,
                    f_KM2: this.f_KM2,
                    f_KM3: this.f_KM3,
                    f_KM4: this.f_KM4,
                    f_KM5: this.f_KM5,
                    f_KM6: this.f_KM6,
                    f_KM7: this.f_KM7,
                    f_KM8: this.f_KM8,
                    f_KM9: this.f_KM9,
                    f_KM10: this.f_KM10,
                    f_KM11: this.f_KM11,
                    f_KM12: this.f_KM12,
                    f_KM13: this.f_KM13,
                    f_KM14: this.f_KM14,
                    f_KM15: this.f_KM15,
                    f_KM16: this.f_KM16,
                    f_KM_LL1: this.f_KM_LL1,
                    f_KM_LL2: this.f_KM_LL2,
                    f_KM_LL3: this.f_KM_LL3,
                    f_KM_LL4: this.f_KM_LL4,
                    f_KM_LL5: this.f_KM_LL5,
                    f_KM_LL6: this.f_KM_LL6,
                    f_KM_LL7: this.f_KM_LL7,
                    f_KM_LL8: this.f_KM_LL8,
                    f_KM_LL9: this.f_KM_LL9,
                    f_KM_LL10: this.f_KM_LL10,
                    f_KM_LL11: this.f_KM_LL11,
                    f_KM_LL12: this.f_KM_LL12,
                    f_KM_LL13: this.f_KM_LL13,
                    f_KM_LL14: this.f_KM_LL14,
                    f_KM_LL15: this.f_KM_LL15,
                    f_KM_LL16: this.f_KM_LL16
                }


                console.log('Data Send:', data)
                // return;
                await this.$axios.$post('updateVicicleFooter.service', data).then((data) => {
                    console.log(data)
                    if (data?.status == '00') {
                        this.loading_processing = false
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        })
                        this.$router.push('/cars_footer')
                        // this.onClearData()
                        // this.$refs.form.reset()
                    } else {
                        this.loading_processing = false
                        swal.fire({
                            title: 'ແຈ້ງເຕືອນ',
                            text: data?.message,
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK',
                        })
                    }
                })
                // }
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
        onClearData() {
            this.$refs.form.reset();
            setTimeout(() => this.ins_glass = 'ກະຊວນ', 1000)
            setTimeout(() => this.chooseCarType = '12', 1000)
        },
        async ongetData() {
            try {
                await this.$axios.$post('/listViciclefooterByID.service', {
                    key_id: this.$route?.query?.key, toKen: localStorage.getItem('toKen')
                }).then((data) => {

                    console.log("dataUpd", data)
                    this.f_STATUS = data?.data[0]?.f_STATUS,
                        this.imgFootTruckOld = data?.data[0]?.imgFootTruck,
                        this.f_BRANCH = data?.data[0]?.f_BRANCH,
                        this.f_YEAR = data?.data[0]?.f_YEAR,
                        this.f_DATEEXPRIED = data?.data[0]?.f_DATEEXPRIED,
                        this.f_CARD_NO = data?.data[0]?.f_CARD_NO,
                        this.f_LEKKUNZEE = data?.data[0]?.f_LEKKUNZEE,
                        this.f_PAO = data?.data[0]?.f_PAO,
                        this.f_KORKC = data?.data[0]?.f_KORKC,
                        this.f_TOLOCKTU = data?.data[0]?.f_TOLOCKTU,
                        this.f_SO = data?.data[0]?.f_SO,
                        this.f_PABUD = data?.data[0]?.f_PABUD,
                        this.f_FAIKHANG = data?.data[0]?.f_FAIKHANG,
                        this.f_FAITHAIY = data?.data[0]?.f_FAITHAIY,
                        this.f_BGTHOM = data?.data[0]?.f_BGTHOM,
                        this.f_GALATY_NO = data?.data[0]?.f_GALATY_NO,
                        this.lektungsit = data?.data[0]?.lektungsit,
                        this.f_GALATY_DEP = data?.data[0]?.f_GALATY_DEP,
                        this.f_CAR_TYPE = data?.data[0]?.f_CAR_TYPE,
                        this.dateExTungsit_status = data?.data[0]?.dateExTungsit_status,
                        this.dateExTungsit = data?.data[0]?.dateExTungsit,
                        this.l_TRIES_1 = data?.data[0]?.l_TRIES_1,
                        this.l_TRIES_2 = data?.data[0]?.l_TRIES_2,
                        this.l_TRIES_3 = data?.data[0]?.l_TRIES_3,
                        this.l_TRIES_4 = data?.data[0]?.l_TRIES_4,
                        this.l_TRIES_5 = data?.data[0]?.l_TRIES_5,
                        this.l_TRIES_6 = data?.data[0]?.l_TRIES_6,
                        this.l_TRIES_7 = data?.data[0]?.l_TRIES_7,
                        this.l_TRIES_8 = data?.data[0]?.l_TRIES_8,
                        this.l_TRIES_DATE_1 = data?.data[0]?.l_TRIES_DATE_1,
                        this.l_TRIES_DATE_2 = data?.data[0]?.l_TRIES_DATE_2,
                        this.l_TRIES_DATE_3 = data?.data[0]?.l_TRIES_DATE_3,
                        this.l_TRIES_DATE_4 = data?.data[0]?.l_TRIES_DATE_4,
                        this.l_TRIES_DATE_5 = data?.data[0]?.l_TRIES_DATE_5,
                        this.l_TRIES_DATE_6 = data?.data[0]?.l_TRIES_DATE_6,
                        this.l_TRIES_DATE_7 = data?.data[0]?.l_TRIES_DATE_7,
                        this.l_TRIES_DATE_8 = data?.data[0]?.l_TRIES_DATE_8,
                        this.l_TRIES_KM_1 = data?.data[0]?.l_TRIES_KM_1,
                        this.l_TRIES_KM_2 = data?.data[0]?.l_TRIES_KM_2,
                        this.l_TRIES_KM_3 = data?.data[0]?.l_TRIES_KM_3,
                        this.l_TRIES_KM_4 = data?.data[0]?.l_TRIES_KM_4,
                        this.l_TRIES_KM_5 = data?.data[0]?.l_TRIES_KM_5,
                        this.l_TRIES_KM_6 = data?.data[0]?.l_TRIES_KM_6,
                        this.l_TRIES_KM_7 = data?.data[0]?.l_TRIES_KM_7,
                        this.l_TRIES_KM_8 = data?.data[0]?.l_TRIES_KM_8,
                        this.r_TRIES_1 = data?.data[0]?.r_TRIES_1,
                        this.r_TRIES_2 = data?.data[0]?.r_TRIES_2,
                        this.r_TRIES_3 = data?.data[0]?.r_TRIES_3,
                        this.r_TRIES_4 = data?.data[0]?.r_TRIES_4,
                        this.r_TRIES_5 = data?.data[0]?.r_TRIES_5,
                        this.r_TRIES_6 = data?.data[0]?.r_TRIES_6,
                        this.r_TRIES_7 = data?.data[0]?.r_TRIES_7,
                        this.r_TRIES_8 = data?.data[0]?.r_TRIES_8,
                        this.r_TRIES_DATE_1 = data?.data[0]?.r_TRIES_DATE_1,
                        this.r_TRIES_DATE_2 = data?.data[0]?.r_TRIES_DATE_2,
                        this.r_TRIES_DATE_3 = data?.data[0]?.r_TRIES_DATE_3,
                        this.r_TRIES_DATE_4 = data?.data[0]?.r_TRIES_DATE_4,
                        this.r_TRIES_DATE_5 = data?.data[0]?.r_TRIES_DATE_5,
                        this.r_TRIES_DATE_6 = data?.data[0]?.r_TRIES_DATE_6,
                        this.r_TRIES_DATE_7 = data?.data[0]?.r_TRIES_DATE_7,
                        this.r_TRIES_DATE_8 = data?.data[0]?.r_TRIES_DATE_8,
                        this.r_TRIES_KM_1 = data?.data[0]?.r_TRIES_KM_1,
                        this.r_TRIES_KM_2 = data?.data[0]?.r_TRIES_KM_2,
                        this.r_TRIES_KM_3 = data?.data[0]?.r_TRIES_KM_3,
                        this.r_TRIES_KM_4 = data?.data[0]?.r_TRIES_KM_4,
                        this.r_TRIES_KM_5 = data?.data[0]?.r_TRIES_KM_5,
                        this.r_TRIES_KM_6 = data?.data[0]?.r_TRIES_KM_6,
                        this.r_TRIES_KM_7 = data?.data[0]?.r_TRIES_KM_7,
                        this.r_TRIES_KM_8 = data?.data[0]?.r_TRIES_KM_8,
                        this.f_KM1 = data?.data[0]?.f_KM1,
                        this.f_KM2 = data?.data[0]?.f_KM2,
                        this.f_KM3 = data?.data[0]?.f_KM3,
                        this.f_KM4 = data?.data[0]?.f_KM4,
                        this.f_KM5 = data?.data[0]?.f_KM5,
                        this.f_KM6 = data?.data[0]?.f_KM6,
                        this.f_KM7 = data?.data[0]?.f_KM7,
                        this.f_KM8 = data?.data[0]?.f_KM8,
                        this.f_KM9 = data?.data[0]?.f_KM9,
                        this.f_KM10 = data?.data[0]?.f_KM10,
                        this.f_KM11 = data?.data[0]?.f_KM11,
                        this.f_KM12 = data?.data[0]?.f_KM12,
                        this.f_KM13 = data?.data[0]?.f_KM13,
                        this.f_KM14 = data?.data[0]?.f_KM14,
                        this.f_KM15 = data?.data[0]?.f_KM15,
                        this.f_KM16 = data?.data[0]?.f_KM16,
                        this.f_KM_LL1 = data?.data[0]?.f_KM_LL1,
                        this.f_KM_LL2 = data?.data[0]?.f_KM_LL2,
                        this.f_KM_LL3 = data?.data[0]?.f_KM_LL3,
                        this.f_KM_LL4 = data?.data[0]?.f_KM_LL4,
                        this.f_KM_LL5 = data?.data[0]?.f_KM_LL5,
                        this.f_KM_LL6 = data?.data[0]?.f_KM_LL6,
                        this.f_KM_LL7 = data?.data[0]?.f_KM_LL7,
                        this.f_KM_LL8 = data?.data[0]?.f_KM_LL8,
                        this.f_KM_LL9 = data?.data[0]?.f_KM_LL9,
                        this.f_KM_LL10 = data?.data[0]?.f_KM_LL10,
                        this.f_KM_LL11 = data?.data[0]?.f_KM_LL11,
                        this.f_KM_LL12 = data?.data[0]?.f_KM_LL12,
                        this.f_KM_LL13 = data?.data[0]?.f_KM_LL13,
                        this.f_KM_LL14 = data?.data[0]?.f_KM_LL14,
                        this.f_KM_LL15 = data?.data[0]?.f_KM_LL15,
                        this.f_KM_LL16 = data?.data[0]?.f_KM_LL16

                })
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error
                })
                this.loading_processing = false
                console.log(error)
            }
        },
    },
    watch: {
        chooseCarType: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.chooseCarType = result
        },
    }
}
</script>
<style lang="scss">
.margintop {
    margin-top: -30px;
}

.top {
    margin-top: 5px;
    margin-left: 10px;
}

.centers {
    justify-content: center;
    background-color: red;
    justify-items: center;
}
</style>
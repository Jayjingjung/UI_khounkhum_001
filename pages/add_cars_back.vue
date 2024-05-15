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
                ເພີ່ມຂໍ້ມູນຫາງລົດ
                <v-spacer></v-spacer>
            </v-card-title>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-card-text>
                    <div class="d-flex align-center">
                        <v-row>
                            <v-col>
                                <v-file-input label="ອັບໂຫຼດຮູູບຫາງລົດ" outlined dense prepend-icon="mdi-camera"
                                    append-inner-icon="mdi-card-account-details" background-color="#f5f5f5"
                                    v-model="imgFootTruck"></v-file-input>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field :rules="nameRules" label="ຍີ່ຫໍ້ຫາງລົດ" dense outlined
                                    background-color="#f5f5f5" v-model="f_BRANCH"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" class="px-2">
                                <v-text-field :rules="nameRules" label="ຫາງລົດປີ" dense outlined
                                    background-color="#f5f5f5" v-model="f_YEAR"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field :rules="nameRules" label="ປະເພດລົດ" dense outlined
                                    background-color="#f5f5f5" v-model="f_CAR_TYPE"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                        <v-row>
                            <v-col cols="12" md="3" sm="3" style="width:100%">
                                <v-text-field :rules="nameRules" label="ທະບຽນຫາງລົດ" dense outlined
                                    background-color="#f5f5f5" v-model="f_CARD_NO"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" class="px-2" style="width:100%"><v-text-field :rules="nameRules"
                                    label="ເລກຄັນຊີ" dense outlined background-color="#f5f5f5"
                                    v-model="f_LEKKUNZEE"></v-text-field></v-col>
                            <v-col cols="12" md="3" class="px-2" style="width:100%"><v-text-field :rules="nameRules"
                                    label="ເຜົາ" dense outlined background-color="#f5f5f5"
                                    v-model="f_PAO"></v-text-field></v-col>
                            <v-col cols="12" md="3" class="pl-2" style="width:100%"><v-text-field :rules="nameRules"
                                    label="ຂໍເກາະ" dense outlined background-color="#f5f5f5"
                                    v-model="f_KORKC"></v-text-field></v-col>
                        </v-row>
                    </div>
                    <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                        <v-row>
                            <v-col cols="12" md="3" style="width:100%"><v-text-field :rules="nameRules"
                                    label="ໂຕລັອກຕູ້" dense outlined background-color="#f5f5f5"
                                    v-model="f_TOLOCKTU"></v-text-field></v-col>
                            <v-col cols="12" md="3" style="width:100%" class="px-2">
                                <v-text-field :rules="nameRules" label="ໂສ້" dense outlined background-color="#f5f5f5"
                                    v-model="f_SO"></v-text-field>
                            </v-col>
                            <!-- <v-col cols="12" md="3" class="px-2" style="width:100%"><v-text-field :rules="nameRules"
                                    label="ຜ້າບັດ" dense outlined background-color="#f5f5f5"
                                    v-model="f_PABUD"></v-text-field></v-col> -->
                            <v-col cols="12" md="3" class="pl-2" style="width:100%"><v-text-field :rules="nameRules"
                                    label="ໄຟຂ້າງ" dense outlined background-color="#f5f5f5"
                                    v-model="f_FAIKHANG"></v-text-field></v-col>
                            <v-col cols="12" md="3" style="width:100%"><v-text-field :rules="nameRules" label="ໄຟທ້າຍ"
                                    dense outlined background-color="#f5f5f5"
                                    v-model="f_FAITHAIY"></v-text-field></v-col>
                        </v-row>
                    </div>
                    <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                        <v-row>
                            <v-col cols="12" md="3" style="width:100%" class="px-2">
                                <v-text-field :rules="nameRules" label="ບັງຕົມ" dense outlined
                                    background-color="#f5f5f5" v-model="f_BGTHOM"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" class="px-2" style="width:100%">
                                <v-text-field :rules="nameRules" label="ເລກປະກັນໄພ" dense outlined
                                    background-color="#f5f5f5" v-model="f_GALATY_NO"></v-text-field>
                            </v-col>

                            <v-col>
                                <v-menu ref="fGALATYDEP" v-model="fGALATYDEP" :close-on-content-click="false"
                                    :return-value.sync="f_GALATY_DEP" transition="scale-transition" offset-y
                                    min-width="auto">

                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field dense outlined v-model="f_GALATY_DEP" background-color="#f5f5f5"
                                            required label="* ວັນທີປະກັນໄພໝົດ" append-icon="mdi-calendar" readonly
                                            v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
                                    </template>

                                    <v-date-picker v-model="f_GALATY_DEP" no-title scrollable
                                        @input="$refs.fGALATYDEP.save(f_GALATY_DEP)">
                                        <v-spacer></v-spacer>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>

                            <!-- <v-col cols="12" md="3" class="pl-2" style="width:100%">
                                <v-text-field :rules="nameRules" label="ວັນທີປະກັນໄພໝົດ" dense outlined
                                    background-color="#f5f5f5" v-model="f_GALATY_DEP"></v-text-field>
                            </v-col> -->
                        </v-row>

                    </div>
                    <v-card flat>
                        <v-card-title>
                            <div class="d-flex">
                                <span>ຂໍ້ມູນຢາງລົດ:</span>
                                <div class="pt-2 pl-6">
                                    <v-row>
                                        <v-radio-group inline v-model="chooseCarType">
                                            <v-row class="pl-4">
                                                <span>ເລືອກປະເພດລົດ:</span>
                                                <Width />
                                                <v-radio label="ລົດ 12 ລໍ້" value="12" class="mt-1"></v-radio>
                                                <Width />
                                                <v-radio label="ລົດ 16 ລໍ້" value="16"></v-radio>
                                            </v-row>
                                        </v-radio-group>
                                    </v-row>
                                </div>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <div style="width:100%;display:flex;justify-content:space-between">
                                <div style="width:100%">

                                    <!-- Left -->
                                    <div style="background-color:#f5f5f5;border-radius:5px">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_1"></v-text-field>

                                            <v-text-field :rules="nameRules" class="mx-2" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_1"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_1"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM1"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL1"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_2"></v-text-field>

                                            <v-text-field :rules="nameRules" class="mx-2" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_2"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_2"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM2"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL2"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_3"></v-text-field>
                                            <v-text-field :rules="nameRules" dense class="mx-2" label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_3"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_3"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM3"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL3"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_4"></v-text-field>

                                            <v-text-field :rules="nameRules" class="mx-2" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_4"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_4"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM4"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL4"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_5"></v-text-field>

                                            <v-text-field :rules="nameRules" class="mx-2" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_5"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_5"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM5"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL5"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_6"></v-text-field>

                                            <v-text-field :rules="nameRules" class="mx-2" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_6"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_6"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM6"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL6"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <!-- NEW SESSION -->
                                    <div style="background-color:#f5f5f5;border-radius:5px"
                                        v-if="chooseCarType === '16'" class="mt-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_7"></v-text-field>

                                            <v-text-field :rules="nameRules" class="mx-2" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_7"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_7"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM7"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL7"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px"
                                        v-if="chooseCarType === '16'" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_8"></v-text-field>
                                            <v-text-field :rules="nameRules" class="mx-2" dense label="ວັນທີປ່ຽນຢາງs"
                                                v-model="l_TRIES_DATE_8"></v-text-field>
                                            <v-text-field :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ kms"
                                                v-model="l_TRIES_KM_8"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM8"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL8"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                </div>
                                <div style="display:flex;flex-direction:row;justify-content:center;align-items:center">
                                    <div v-if="chooseCarType === '12'" class="text-center">
                                        <img class="mx-auto" src="../assets/images/backs12.png" width="150"
                                            height="310" />
                                    </div>
                                    <div v-if="chooseCarType === '16'" class="text-center">
                                        <img class="mx-auto" src="../assets/images/back16.png" width="150"
                                            height="420" />
                                    </div>
                                </div>
                                <!-- Right -->
                                <div style="width:100%">
                                    <div style="background-color:#f5f5f5;border-radius:5px">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_1"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_1"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_1"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM9"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL9"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_2"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_2"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_2"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM10"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL10"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_3"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_3"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_3"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM11"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL11"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_4"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_4"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_4"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM12"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL12"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_5"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_5"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_5"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM13"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL13"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_6"></v-text-field>

                                            <v-text-field :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_6"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_6"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM14"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL14"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <!-- NEW SESSION -->
                                    <div style="background-color:#f5f5f5;border-radius:5px"
                                        v-if="chooseCarType === '16'" class="mt-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_7"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_7"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_7"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM15"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL15"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px"
                                        v-if="chooseCarType === '16'" class="mt-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_8"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງs"
                                                v-model="r_TRIES_DATE_8"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ kms"
                                                v-model="r_TRIES_KM_8"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex" style="margin-top:-12px">
                                        <div style="width:100%"><v-text-field :rules="nameRules" dense label="ເລກໄມລ່າສຸດ"
                                                v-model="f_KM16"></v-text-field>
                                        </div>
                                        <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL16"></v-text-field></div>
                                        <div style="width:100%"></div>
                                    </div> -->
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" @click="onClearData">
                            <v-icon color="white">mdi-close</v-icon>
                            <span class="white--text">ລ້າງຂໍ້ມູນ</span>
                        </v-btn>
                        <v-btn color="#448AFF" @click="onInserTruct">
                            <v-icon color="white">mdi-check</v-icon>
                            <span class="white--text">ບັນທຶກ</span>
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-form>
        </v-card>
        <Height />
        <Height />
        <Height />
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            //insert
            imgFootTruck: null,
            fGALATYDEP: null,
            loading_processing: false,
            chooseCarType: '12',
            valid: true,
            nameRules: [(v) => !!v || ''],
            // kilomen
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
            l_TRIES_KM_7: 0.0,
            l_TRIES_KM_8: 0.0,
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
            r_TRIES_KM_7: 0.0,
            r_TRIES_KM_8: 0.0,
            //====================

            // f_KM1: '',
            f_KM2: '',
            f_KM3: '',
            f_KM4: '',
            f_KM5: '',
            f_KM6: '',
            f_KM7: '',
            f_KM8: '',
            f_KM9: '',
            // f_KM10: '',
            // f_KM11: '',
            // f_KM12: '',
            // f_KM13: '',
            // f_KM14: '',
            // f_KM15: '',
            // f_KM16: '',
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
            f_KM_LL16: ''
        }
    },
    methods: {
        //new----
        openUpload() {
            document.getElementById('file-field').click()
        },

        updagePreview(e, file) {
            var reader, files = e.target.files

            if (files.length === 0) {
                console.log('empty')
            }

            reader = new FileReader()

            reader.onload = (e) => {
                this.imagePreview = e.target.result
            }

            reader.readAsDataURL(files[0])

            if (file) {
                this.IMAGE_TRUK = URL.createObjectURL(this.IMAGE_TRUK)
                console.log(this.IMAGE_TRUK)
            } else {
                this.IMAGE_TRUK = null
            }
        },
        //new----
        async onInserTruct() {
            if (!this.$refs.form.validate()) {
                swal.fire({
                    icon: 'info',
                    text: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ'
                })
                return null;
            }
            this.loading_processing = true
            try {
                const formdata = new FormData();
                formdata.append('files', this.imgFootTruck)
                formdata.append('f_BRANCH', this.f_BRANCH)
                formdata.append('f_YEAR', this.f_YEAR)
                formdata.append('f_DATEEXPRIED', this.f_DATEEXPRIED)
                formdata.append('f_CARD_NO', this.f_CARD_NO)
                formdata.append('f_LEKKUNZEE', this.f_LEKKUNZEE)
                formdata.append('f_PAO', this.f_PAO)
                formdata.append('f_KORKC', this.f_KORKC)
                formdata.append('f_TOLOCKTU', this.f_TOLOCKTU)
                formdata.append('f_SO', this.f_SO)
                formdata.append('f_PABUD', this.f_PABUD)
                formdata.append('f_FAIKHANG', this.f_FAIKHANG)
                formdata.append('f_FAITHAIY', this.f_FAITHAIY)
                formdata.append('f_BGTHOM', this.f_BGTHOM)
                formdata.append('f_GALATY_NO', this.f_GALATY_NO)
                formdata.append('f_GALATY_DEP', this.f_GALATY_DEP)
                formdata.append('f_CAR_TYPE', this.f_CAR_TYPE)
                formdata.append('l_TRIES_1', this.l_TRIES_1)
                formdata.append('l_TRIES_2', this.l_TRIES_2)
                formdata.append('l_TRIES_3', this.l_TRIES_3)
                formdata.append('l_TRIES_4', this.l_TRIES_4)
                formdata.append('l_TRIES_5', this.l_TRIES_5)
                formdata.append('l_TRIES_6', this.l_TRIES_6)
                formdata.append('l_TRIES_7', this.l_TRIES_7)
                formdata.append('l_TRIES_8', this.l_TRIES_8)
                formdata.append('l_TRIES_DATE_1', this.l_TRIES_DATE_1)
                formdata.append('l_TRIES_DATE_2', this.l_TRIES_DATE_2)
                formdata.append('l_TRIES_DATE_3', this.l_TRIES_DATE_3)
                formdata.append('l_TRIES_DATE_4', this.l_TRIES_DATE_4)
                formdata.append('l_TRIES_DATE_5', this.l_TRIES_DATE_5)
                formdata.append('l_TRIES_DATE_6', this.l_TRIES_DATE_6)
                formdata.append('l_TRIES_DATE_7', this.l_TRIES_DATE_7)
                formdata.append('l_TRIES_DATE_8', this.l_TRIES_DATE_8)
                formdata.append('l_TRIES_KM_1', this.l_TRIES_KM_1)
                formdata.append('l_TRIES_KM_2', this.l_TRIES_KM_2)
                formdata.append('l_TRIES_KM_3', this.l_TRIES_KM_3)
                formdata.append('l_TRIES_KM_4', this.l_TRIES_KM_4)
                formdata.append('l_TRIES_KM_5', this.l_TRIES_KM_5)
                formdata.append('l_TRIES_KM_6', this.l_TRIES_KM_6)
                formdata.append('l_TRIES_KM_7', this.l_TRIES_KM_7)
                formdata.append('l_TRIES_KM_8', this.l_TRIES_KM_8)
                formdata.append('r_TRIES_1', this.r_TRIES_1)
                formdata.append('r_TRIES_2', this.r_TRIES_2)
                formdata.append('r_TRIES_3', this.r_TRIES_3)
                formdata.append('r_TRIES_4', this.r_TRIES_4)
                formdata.append('r_TRIES_5', this.r_TRIES_5)
                formdata.append('r_TRIES_6', this.r_TRIES_6)
                formdata.append('r_TRIES_7', this.r_TRIES_7)
                formdata.append('r_TRIES_8', this.r_TRIES_8)
                formdata.append('r_TRIES_DATE_1', this.r_TRIES_DATE_1)
                formdata.append('r_TRIES_DATE_2', this.r_TRIES_DATE_2)
                formdata.append('r_TRIES_DATE_3', this.r_TRIES_DATE_3)
                formdata.append('r_TRIES_DATE_4', this.r_TRIES_DATE_4)
                formdata.append('r_TRIES_DATE_5', this.r_TRIES_DATE_5)
                formdata.append('r_TRIES_DATE_6', this.r_TRIES_DATE_6)
                formdata.append('r_TRIES_DATE_7', this.r_TRIES_DATE_7)
                formdata.append('r_TRIES_DATE_8', this.r_TRIES_DATE_8)
                formdata.append('r_TRIES_KM_1', this.r_TRIES_KM_1)
                formdata.append('r_TRIES_KM_2', this.r_TRIES_KM_2)
                formdata.append('r_TRIES_KM_3', this.r_TRIES_KM_3)
                formdata.append('r_TRIES_KM_4', this.r_TRIES_KM_4)
                formdata.append('r_TRIES_KM_5', this.r_TRIES_KM_5)
                formdata.append('r_TRIES_KM_6', this.r_TRIES_KM_6)
                formdata.append('r_TRIES_KM_7', this.r_TRIES_KM_7)
                formdata.append('r_TRIES_KM_8', this.r_TRIES_KM_8)
                formdata.append('f_KM1', this.f_KM1)
                formdata.append('f_KM2', this.f_KM2)
                formdata.append('f_KM3', this.f_KM3)
                formdata.append('f_KM4', this.f_KM4)
                formdata.append('f_KM5', this.f_KM5)
                formdata.append('f_KM6', this.f_KM6)
                formdata.append('f_KM7', this.f_KM7)
                formdata.append('f_KM8', this.f_KM8)
                formdata.append('f_KM9', this.f_KM9)
                formdata.append('f_KM10', this.f_KM10)
                formdata.append('f_KM11', this.f_KM11)
                formdata.append('f_KM12', this.f_KM12)
                formdata.append('f_KM13', this.f_KM13)
                formdata.append('f_KM14', this.f_KM14)
                formdata.append('f_KM15', this.f_KM15)
                formdata.append('f_KM16', this.f_KM16)
                formdata.append('f_KM_LL1', this.f_KM_LL1)
                formdata.append('f_KM_LL2', this.f_KM_LL2)
                formdata.append('f_KM_LL3', this.f_KM_LL3)
                formdata.append('f_KM_LL4', this.f_KM_LL4)
                formdata.append('f_KM_LL5', this.f_fKM_LL5)
                formdata.append('f_KM_LL6', this.f_KM_LL6)
                formdata.append('f_KM_LL7', this.f_KM_LL7)
                formdata.append('f_KM_LL8', this.f_KM_LL8)
                formdata.append('f_KM_LL9', this.f_KM_LL9)
                formdata.append('f_KM_LL10', this.f_KM_LL10)
                formdata.append('f_KM_LL11', this.f_KM_LL11)
                formdata.append('f_KM_LL12', this.f_KM_LL12)
                formdata.append('f_KM_LL13', this.f_KM_LL13)
                formdata.append('f_KM_LL14', this.f_KM_LL14)
                formdata.append('f_KM_LL15', this.f_KM_LL15)
                formdata.append('f_KM_LL16', this.f_KM_LL16)
                formdata.append('toKen', localStorage.getItem("toKen"))


                // let data = {
                //     f_BRANCH: this.f_BRANCH,
                //     f_YEAR: this.f_YEAR,
                //     f_DATEEXPRIED: this.f_DATEEXPRIED,
                //     f_CARD_NO: this.f_CARD_NO,
                //     f_LEKKUNZEE: this.f_LEKKUNZEE,
                //     f_PAO: this.f_PAO,
                //     f_KORKC: this.f_KORKC,
                //     f_TOLOCKTU: this.f_TOLOCKTU,
                //     f_SO: this.f_SO,
                //     f_PABUD: this.f_PABUD,
                //     f_FAIKHANG: this.f_FAIKHANG,
                //     f_FAITHAIY: this.f_FAITHAIY,
                //     f_BGTHOM: this.f_BGTHOM,
                //     f_GALATY_NO: this.f_GALATY_NO,
                //     f_GALATY_DEP: this.f_GALATY_DEP,
                //     f_CAR_TYPE: this.f_CAR_TYPE,

                //     l_TRIES_1: this.l_TRIES_1,
                //     l_TRIES_2: this.l_TRIES_2,
                //     l_TRIES_3: this.l_TRIES_3,
                //     l_TRIES_4: this.l_TRIES_4,
                //     l_TRIES_5: this.l_TRIES_5,
                //     l_TRIES_6: this.l_TRIES_6,
                //     l_TRIES_7: this.l_TRIES_7,
                //     l_TRIES_8: this.l_TRIES_8,
                //     l_TRIES_DATE_1: this.l_TRIES_DATE_1,
                //     l_TRIES_DATE_2: this.l_TRIES_DATE_2,
                //     l_TRIES_DATE_3: this.l_TRIES_DATE_3,
                //     l_TRIES_DATE_4: this.l_TRIES_DATE_4,
                //     l_TRIES_DATE_5: this.l_TRIES_DATE_5,
                //     l_TRIES_DATE_6: this.l_TRIES_DATE_6,
                //     l_TRIES_DATE_7: this.l_TRIES_DATE_7,
                //     l_TRIES_DATE_8: this.l_TRIES_DATE_8,
                //     l_TRIES_KM_1: this.l_TRIES_KM_1,
                //     l_TRIES_KM_2: this.l_TRIES_KM_2,
                //     l_TRIES_KM_3: this.l_TRIES_KM_3,
                //     l_TRIES_KM_4: this.l_TRIES_KM_4,
                //     l_TRIES_KM_5: this.l_TRIES_KM_5,
                //     l_TRIES_KM_6: this.l_TRIES_KM_6,
                //     l_TRIES_KM_7: this.l_TRIES_KM_7,
                //     l_TRIES_KM_8: this.l_TRIES_KM_8,
                //     r_TRIES_1: this.r_TRIES_1,
                //     r_TRIES_2: this.r_TRIES_2,
                //     r_TRIES_3: this.r_TRIES_3,
                //     r_TRIES_4: this.r_TRIES_4,
                //     r_TRIES_5: this.r_TRIES_5,
                //     r_TRIES_6: this.r_TRIES_6,
                //     r_TRIES_7: this.r_TRIES_7,
                //     r_TRIES_8: this.r_TRIES_8,
                //     r_TRIES_DATE_1: this.r_TRIES_DATE_1,
                //     r_TRIES_DATE_2: this.r_TRIES_DATE_2,
                //     r_TRIES_DATE_3: this.r_TRIES_DATE_3,
                //     r_TRIES_DATE_4: this.r_TRIES_DATE_4,
                //     r_TRIES_DATE_5: this.r_TRIES_DATE_5,
                //     r_TRIES_DATE_6: this.r_TRIES_DATE_6,
                //     r_TRIES_DATE_7: this.r_TRIES_DATE_7,
                //     r_TRIES_DATE_8: this.r_TRIES_DATE_8,
                //     r_TRIES_KM_1: this.r_TRIES_KM_1,
                //     r_TRIES_KM_2: this.r_TRIES_KM_2,
                //     r_TRIES_KM_3: this.r_TRIES_KM_3,
                //     r_TRIES_KM_4: this.r_TRIES_KM_4,
                //     r_TRIES_KM_5: this.r_TRIES_KM_5,
                //     r_TRIES_KM_6: this.r_TRIES_KM_6,
                //     r_TRIES_KM_7: this.r_TRIES_KM_7,
                //     r_TRIES_KM_8: this.r_TRIES_KM_8,
                //     f_KM1: this.f_KM1,
                //     f_KM2: this.f_KM2,
                //     f_KM3: this.f_KM3,
                //     f_KM4: this.f_KM4,
                //     f_KM5: this.f_KM5,
                //     f_KM6: this.f_KM6,
                //     f_KM7: this.f_KM7,
                //     f_KM8: this.f_KM8,
                //     f_KM9: this.f_KM9,
                //     f_KM10: this.f_KM10,
                //     f_KM11: this.f_KM11,
                //     f_KM12: this.f_KM12,
                //     f_KM13: this.f_KM13,
                //     f_KM14: this.f_KM14,
                //     f_KM15: this.f_KM15,
                //     f_KM16: this.f_KM16,
                //     f_KM_LL1: this.f_KM_LL1,
                //     f_KM_LL2: this.f_KM_LL2,
                //     f_KM_LL3: this.f_KM_LL3,
                //     f_KM_LL4: this.f_KM_LL4,
                //     f_KM_LL5: this.f_KM_LL5,
                //     f_KM_LL6: this.f_KM_LL6,
                //     f_KM_LL7: this.f_KM_LL7,
                //     f_KM_LL8: this.f_KM_LL8,
                //     f_KM_LL9: this.f_KM_LL9,
                //     f_KM_LL10: this.f_KM_LL10,
                //     f_KM_LL11: this.f_KM_LL11,
                //     f_KM_LL12: this.f_KM_LL12,
                //     f_KM_LL13: this.f_KM_LL13,
                //     f_KM_LL14: this.f_KM_LL14,
                //     f_KM_LL15: this.f_KM_LL15,
                //     f_KM_LL16: this.f_KM_LL16
                // }

                await this.$axios.$post('saveVicicleFooterByID.service', formdata).then((data) => {
                    console.log(data)
                    if (data?.status == '00') {
                        this.loading_processing = false
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                            showConfirmButton: false,
                            timer: 1000,
                        }).then(() => {
                            // Reload the page after the swal message is closed
                            window.location.reload();
                        });
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
        }
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
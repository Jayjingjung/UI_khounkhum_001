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
                ແກ້ໄຂຂໍ້ມູນຫາງລົດ
                <v-spacer></v-spacer>
            </v-card-title>
            <v-form v-model="valid" ref="form" lazy-validation>
                <v-card-text>
                    <div class="d-flex align-center">
                        <v-col cols="3" align="center" class="mt-4">
                            <v-card class="text-center" max-width="344">
                                <img :src="imgFootTruckOld" height="220px" cover>
                            </v-card>
                            <div class="mt-4">
                                <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera"
                                    background-color="#f5f5f5" v-model="imgFootTruck"></v-file-input>
                                <div class="tops"></div>
                            </div>
                        </v-col>
                        <div style="width:100%" class="pr-2">
                            <v-text-field :rules="nameRules" label="ຍີ່ຫໍ້ລົດ" dense v-model="f_BRANCH"></v-text-field>
                        </div>
                        <div style="width:100%" class="px-2">
                            <v-text-field :rules="nameRules" label="ລົດປີ" dense v-model="f_YEAR"></v-text-field>
                        </div>
                        <div style="width:100%" class="px-2">
                            <v-text-field :rules="nameRules" label="ປະເພດລົດ" dense v-model="f_CAR_TYPE"></v-text-field>
                        </div>
                        <div style="width:100%" class="px-2">
                        </div>
                    </div>
                    <div class="" style="display:flex;flex-direction:row;justify-content:space-between">

                        <div style="width:100%" class="pr-2">
                            <v-text-field :rules="nameRules" label="ທະບຽນລົດ" dense v-model="f_CARD_NO"></v-text-field>
                        </div>
                        <div class="px-2" style="width:100%"><v-text-field :rules="nameRules" label="ເລກຄັນຊີ" dense
                                v-model="f_LEKKUNZEE"></v-text-field></div>
                        <div class="px-2" style="width:100%"><v-text-field :rules="nameRules" label="ເຜົາ" dense
                                v-model="f_PAO"></v-text-field></div>
                        <div class="px-2" style="width:100%"><v-text-field :rules="nameRules" label="ຂໍເກາະ" dense
                                v-model="f_KORKC"></v-text-field></div>
                    </div>
                    <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                        <div class="pr-2" style="width:100%"><v-text-field :rules="nameRules" label="ໂຕລັອກຕູ້" dense
                                v-model="f_TOLOCKTU"></v-text-field></div>
                        <div style="width:100%" class="px-2">
                            <v-text-field :rules="nameRules" label="ໂສ້" dense v-model="f_SO"></v-text-field>
                        </div>
                        <div class="pr-2" style="width:100%"><v-text-field :rules="nameRules" label="ໄຟທ້າຍ" dense
                                v-model="f_FAITHAIY"></v-text-field></div>
                        <!-- <div class="px-2" style="width:100%"><v-text-field :rules="nameRules" label="ຜ້າບັດ" dense
                                v-model="f_PABUD"></v-text-field></div> -->
                        <div class="px-2" style="width:100%"><v-text-field :rules="nameRules" label="ໄຟຂ້າງ" dense
                                v-model="f_FAIKHANG"></v-text-field></div>
                    </div>
                    <div class="" style="display:flex;flex-direction:row;justify-content:space-between">
                        <div style="width:100%" class="px-2">
                            <v-text-field :rules="nameRules" label="ບັງຕົມ" dense v-model="f_BGTHOM"></v-text-field>
                        </div>
                        <div class="px-2" style="width:100%">
                            <v-text-field :rules="nameRules" label="ເລກປະກັນໄພ" dense
                                v-model="f_GALATY_NO"></v-text-field>
                        </div>
                        <div class="px-2" style="width:100%">
                            <v-text-field :rules="nameRules" label="ວັນທີປະກັນໄພໝົດ" dense
                                v-model="f_GALATY_DEP"></v-text-field>
                        </div>
                        <div class="px-2" style="width:100%">
                            <v-text-field :rules="nameRules" label="ເລກຕັ້ງສິດ" dense
                                v-model="lektungsit"></v-text-field>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div style="width:23%">
                            <div>ວັນທີ່ໝົດອາຍຸຕັ້ງສິດ</div>
                            <v-menu ref="end_tangsit" v-model="end_tangsit" :close-on-content-click="false"
                                :return-value.sync="dateExTungsit" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-if="dateExTungsit_status === 'W'" dense outlined
                                        background-color="#FFF176" v-model="dateExTungsit" required
                                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="nameRules"></v-text-field>
                                    <v-text-field v-else-if="dateExTungsit_status === 'E'" dense outlined
                                        background-color="red" v-model="dateExTungsit" required
                                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="nameRules"></v-text-field>
                                    <v-text-field v-else dense outlined background-color="#f5f5f5"
                                        v-model="dateExTungsit" required append-icon="mdi-calendar" readonly
                                        v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="dateExTungsit" no-title scrollable
                                    @input="$refs.end_tangsit.save(dateExTungsit)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div class="ml-10" style="width:23%">
                            <div>ວັນທີ່ໝົດອາຍຸທະບຽລົດຫາງ </div>
                            <v-menu ref="end_dateExpireLicensePlate" v-model="end_dateExpireLicensePlate" :close-on-content-click="false"
                                :return-value.sync="dateExpireLicensePlate" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined background-color="#f5f5f5" v-model="dateExpireLicensePlate"
                                        required append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="nameRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="dateExpireLicensePlate" no-title scrollable
                                    @input="$refs.end_dateExpireLicensePlate.save(dateExpireLicensePlate)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </div>
                    </div>
                    <div class="d-flex align-center pt-2 pr-2"
                        style="background-color:#f7f7f7;border-radius:5px;height:50px">
                        <v-radio-group inline v-model="f_STATUS">
                            <div class="pl-4 d-flex align-center">
                                <span>ສະຖານະລົດ</span>
                                <Width />
                                <v-radio label="ວ່າງ" value="Y" color="#55CE63"></v-radio>
                                <Width />
                                <v-radio label="ບໍ່ວ່າງ" value="N" color="red"></v-radio>
                            </div>
                        </v-radio-group>
                    </div>
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
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_1"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_1"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_1"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM1"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL1"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_2"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_2"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_2"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM2"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL2"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_3"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_3"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_3"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM3"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL3"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_4"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_4"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_4"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM4"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL4"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_5"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_5"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_5"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM5"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL5"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_6"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_6"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_6"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM6"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL6"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <!-- NEW SESSION -->
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                        v-if="l_TRIES_7">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_7"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_7"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="l_TRIES_KM_7"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM7"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL7"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                        v-if="l_TRIES_8">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="l_TRIES_8"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="l_TRIES_DATE_8"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ kms"
                                                v-model="l_TRIES_KM_8"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM8"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="pl-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL8"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                </div>
                                <div style="display:flex;flex-direction:row;justify-content:center;align-items:center">
                                    <div v-if="r_TRIES_7" class="text-center">
                                        <img class="mx-auto" src="../assets/images/back16.png" width="150"
                                            height="420" />
                                    </div>
                                    <div v-else class="text-center">
                                        <img class="mx-auto" src="../assets/images/backs12.png" width="150"
                                            height="310" />
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
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM9"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL9"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_2"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_2"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_2"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM10"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL10"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_3"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_3"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_3"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM11"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL11"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_4"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_4"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_4"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM12"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL12"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_5"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_5"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_5"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM13"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL13"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_6"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_6"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_6"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM14"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL14"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <!-- NEW SESSION -->
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                        v-if="r_TRIES_7">

                                        <div style="padding-top: 0px" class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_7"></v-text-field>

                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງ"
                                                v-model="r_TRIES_DATE_7"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ km"
                                                v-model="r_TRIES_KM_7"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM15"></v-text-field>
                                            </div>
                                            <div style="width:100%" class="ml-2"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມປະຈຸບັນ" v-model="f_KM_LL15"></v-text-field></div>
                                            <div style="width:100%"></div>
                                        </div> -->
                                    </div>
                                    <div style="background-color:#f5f5f5;border-radius:5px" class="mt-2 pa-2"
                                        v-if="r_TRIES_8">
                                        <div class="d-flex">
                                            <v-text-field :rules="nameRules" dense label="ລະຫັດຢາງລົດ"
                                                v-model="r_TRIES_8"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ວັນທີປ່ຽນຢາງs"
                                                v-model="r_TRIES_DATE_8"></v-text-field>
                                            <v-text-field class="ml-2" :rules="nameRules" dense label="ກຳນົດແລ່ນໄດ້ kms"
                                                v-model="r_TRIES_KM_8"></v-text-field>
                                        </div>
                                        <!-- <div class="d-flex">
                                            <div style="width:100%"><v-text-field :rules="nameRules" dense
                                                    label="ເລກໄມລ່າສຸດ" v-model="f_KM16"></v-text-field>
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
                    <v-card class="pa-4 mt-2" flat>
                        <span>ໝາຍເຫດ</span>
                        <v-textarea outlined dense placeholder="ຕົວຢ່າງ: ປ່ຽນນໍ້າມັນເຄື່ອງ..."
                            v-model="his_REASON"></v-textarea>
                    </v-card>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="#FFB74D" @click="onInserTruct">
                            <v-icon color="white">mdi-check</v-icon>
                            <span class="white--text">ບັນທຶກ</span>
                        </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-form>
        </v-card>

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
            end_tangsit: false,
            end_dateExpireLicensePlate:false,
            dateExTungsit: '',
            dateExpireLicensePlate:'',
            dateExTungsit_status: '',
            f_GALATY_DEP: '',
            f_CAR_TYPE: '',
            //img
            imgFootTruck: '',
            imgFootTruckOld: null,

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
            f_KM_LL16: ''
        }
    },
    mounted() {
        if (this.$route.query.key) {
            this.ongetData()
            console.log(this.$route.query.key)
        }
    },
    methods: {
        openUpload() {
            document.getElementById('file-field').click()
        },

        updagePreview(e) {
            var reader, files = e.target.files

            if (files.length === 0) {
                console.log('empty')
            }

            reader = new FileReader()

            reader.onload = (e) => {
                this.imagePreview = e.target.result
            }

            reader.readAsDataURL(files[0])
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
                const formdata = new FormData();
                formdata.append('files', this.imgFootTruck !== null || this.imgFootTruck !== '' ? this.imgFootTruck : '')
                formdata.append('key_id', this.$route.query.key)
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
                formdata.append('lektungsit', this.lektungsit)
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
                formdata.append('f_STATUS', this.f_STATUS)
                formdata.append('HIS_RESON', this.his_RESON)

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
                formdata.append('imgFootTruck', this.imgFootTruckOld),
                formdata.append('dateExTungsit', this.dateExTungsit)
                formdata.append('dateExpireLicensePlate', this.dateExpireLicensePlate)
                formdata.append('toKen', localStorage.getItem("toKen"))




                await this.$axios.$post('updateVicicleFooter.service', formdata).then((data) => {
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
                    key_id: this.$route.query?.key,
                    toKen: localStorage.getItem('toKen')
                }

                ).then((data) => {

                    console.log("dataUpd", data)
                    this.imgFootTruckOld = data?.data[0]?.imgFootTruck,
                        this.f_STATUS = data?.data[0]?.f_STATUS,
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
                        this.dateExpireLicensePlate = data?.data[0]?.dateExpireLicensePlate,
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

                },)
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
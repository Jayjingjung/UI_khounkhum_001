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
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="cars_14">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ອັບເດດຂໍ້ມູນຫົວລົດ
                <v-spacer></v-spacer>
            </v-card-title>
            <v-form v-model="valid" ref="form" lazy-validation>
                <!-- ຂໍ້ມູນຫົວລົດ================== -->
                <v-card flat>
                    <div class="pa-2 pl-6 pt-4 d-flex">
                        <v-spacer></v-spacer>
                        <div v-if="alert === true"
                            style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                            class="ml-2 pl-2 pr-10 mr-4">
                            <v-icon color="red">mdi-alert-outline</v-icon>
                            <span class="ml-2 red--text">ນໍ້າມັນເຄື່ອງໝົດກຳນົດແລ້ວ!</span>
                        </div>

                        <div v-if="toBatRowStatus === 'W'"
                            style="border:1px solid #ff9200;height:40px;border-radius:3px;display:flex;align-items:center"
                            class="ml-2 pl-2 pr-10 mr-4">
                            <v-icon color="#F9A825">mdi-alert-outline</v-icon>
                            <span class="ml-2" style="color: #ff9200;">ໝໍ້ໄຟໃກ້ຈະໝົດອາຍຸການໃຊ້ງານ</span>
                        </div>
                        <div v-else-if="toBatRowStatus === 'E'"
                            style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                            class="ml-2 pl-2 pr-10 mr-4">
                            <v-icon color="red">mdi-alert-circle</v-icon>
                            <span class="ml-2" style="color: red;">ກະລຸນາປ່ຽນໝໍ້ໄຟ</span>
                        </div>
                        <!-- plate number -->
                        <div v-if="toBatRowtabienLod === 'W'"
                            style="border:1px solid #ff9200;height:40px;border-radius:3px;display:flex;align-items:center"
                            class="ml-2 pl-2 pr-10 mr-4">
                            <v-icon color="#F9A825">mdi-alert-outline</v-icon>
                            <span class="ml-2" style="color: #ff9200;">ທະບຽນລົດໃກ້ຈະໝົດອາຍຸການໃຊ້ງານ</span>
                        </div>
                        <div v-else-if="toBatRowtabienLod === 'E'"
                            style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                            class="ml-2 pl-2 pr-10 mr-4">
                            <v-icon color="red">mdi-alert-circle</v-icon>
                            <span class="ml-2" style="color: red;">ທະບຽນລົດໝົດອາຍຸແລ້ວ</span>
                        </div>
                        <!-- ปะกันไพ -->
                        <div v-if="toBatRowGalanty === 'W'"
                            style="border:1px solid #ff9200;height:40px;border-radius:3px;display:flex;align-items:center"
                            class="ml-2 pl-2 pr-10 mr-4">
                            <v-icon color="#F9A825">mdi-alert-outline</v-icon>
                            <span class="ml-2" style="color: #ff9200;">ປະກັນໄພໃກ້ຈະໝົດແລ້ວ</span>
                        </div>
                        <div v-else-if="toBatRowGalanty === 'E'"
                            style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                            class="ml-2 pl-2 pr-10 mr-4">
                            <v-icon color="red">mdi-alert-circle</v-icon>
                            <span class="ml-2" style="color: red;">ປະກັນໄພໝົດອາຍຸແລ້ວ</span>
                        </div>
                    </div>

                    <v-card-text>
                        <v-row>
                            <v-col cols="3" align="center" class="mt-4">
                                <v-card class="text-center" max-width="344">
                                    <img :src="imageTruckold" height="220px" cover>
                                </v-card>
                                <div class="mt-4">
                                    <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera"
                                        background-color="#f5f5f5" v-model="imageTruck"></v-file-input>
                                    <div class="tops"></div>
                                </div>

                            </v-col>
                            <v-col cols="9">
                                <v-row>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ທະບຽນລົດ</span>
                                        <v-text-field :rules="nameRules" dense flat solo background-color="#f5f5f5"
                                            v-model="h_VICIVLE_NUMBER"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ວັນໝົດອາຍຸທະບຽນລົດ</span>
                                        <v-menu ref="end_cardate" v-model="end_cardate" :close-on-content-click="false"
                                            :return-value.sync="exCarDate" transition="scale-transition" offset-y
                                            min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-if="toBatRowtabienLod === 'W'" dense outlined
                                                    v-model="exCarDate" background-color="#ff9200" required label=""
                                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                    :rules="nameRules"></v-text-field>
                                                <v-text-field v-else-if="toBatRowtabienLod === 'E'" dense outlined
                                                    v-model="exCarDate" background-color="red" required label=""
                                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                    :rules="nameRules"></v-text-field>
                                                <v-text-field v-else dense outlined v-model="exCarDate"
                                                    background-color="#f5f5f5" required label=""
                                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                    :rules="nameRules"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="exCarDate" no-title scrollable
                                                @input="$refs.end_cardate.save(exCarDate)">
                                                <v-spacer></v-spacer>
                                            </v-date-picker>
                                        </v-menu>

                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ປະກັນໄພ</span>
                                        <v-text-field v-if="toBatRowGalanty === 'W'" :rules="nameRules" label="ປະກັນໄພ"
                                            dense flat solo background-color="#ff9200"
                                            v-model="h_VICIVLE_GALATY"></v-text-field>

                                        <v-text-field v-else-if="toBatRowGalanty === 'E'" :rules="nameRules"
                                            label="ປະກັນໄພ" dense flat solo background-color="red"
                                            v-model="h_VICIVLE_GALATY"></v-text-field>

                                        <v-text-field v-else :rules="nameRules" label="ປະກັນໄພ" dense flat solo
                                            background-color="#f5f5f5" v-model="h_VICIVLE_GALATY"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-top: -14px;">
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ວັນທີປະກັນໄພໝົດ</span>
                                        <v-menu ref="start_galaty" v-model="start_galaty"
                                            :close-on-content-click="false" :return-value.sync="h_VICIVLE_DATE_GALATY"
                                            transition="scale-transition" offset-y min-width="auto">

                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-if="toBatRowGalanty === 'W'" dense outlined
                                                    v-model="h_VICIVLE_DATE_GALATY" background-color="#ff9200" required
                                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                    :rules="nameRules"></v-text-field>

                                                <v-text-field v-else-if="toBatRowGalanty === 'E'" dense outlined
                                                    v-model="h_VICIVLE_DATE_GALATY" background-color="red" required
                                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                    :rules="nameRules"></v-text-field>

                                                <v-text-field v-else dense outlined v-model="h_VICIVLE_DATE_GALATY"
                                                    background-color="#f5f5f5" required append-icon="mdi-calendar"
                                                    readonly v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="h_VICIVLE_DATE_GALATY" no-title scrollable
                                                @input="$refs.start_galaty.save(h_VICIVLE_DATE_GALATY)">
                                                <v-spacer></v-spacer>
                                            </v-date-picker>
                                        </v-menu>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ຍີ່ຫໍ້ລົດ</span>
                                        <v-text-field :rules="nameRules" label="ຍີ່ຫໍ້ລົດ" dense flat solo
                                            background-color="#f5f5f5" v-model="h_VICIVLE_BRANCH"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ເຂັມກີໂລແມັດ</span>
                                        <v-text-field :rules="nameRules" label="ເຂັມກີໂລແມັດ" dense flat solo
                                            v-model="kim_KM"
                                            :background-color="alert === true ? 'red' : '#f5f5f5'"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-top: -14px;">
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ລົດປີ</span>
                                        <v-text-field :rules="nameRules" label="ລົດປີ" dense flat solo
                                            background-color="#f5f5f5" v-model="h_VICIVLE_YEARLEVEL"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ປ້ອນສີລົດ</span>
                                        <v-text-field :rules="nameRules" dense outlined background-color="#f5f5f5"
                                            v-model="exCarColor"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ເລກໄມປ່ຽນນໍ້າມັນເຄື່ອງຮອບຕໍ່ໄປ</span>
                                        <v-text-field :rules="nameRules" label="ເລກໄມປ່ຽນນໍ້າມັນເຄື່ອງຮອບຕໍ່ໄປ" dense
                                            flat solo v-model="h_LEK_NUMMUNKHG"
                                            :background-color="alert === true ? 'red' : '#f5f5f5'"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-icon color="black">mdi-calendar-range</v-icon>
                                        <span>ວັນທີ່ປ່ຽນນ້ຳມັນເຄື່ອງ</span>
                                        <v-menu ref="date_change_lean" v-model="date_change_lean"
                                            :close-on-content-click="false" :return-value.sync="formattedDate"
                                            transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field dense outlined v-model="formattedDate" required
                                                    label="ວັນທີ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                                    v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="formattedDate" no-title scrollable
                                                @input="$refs.date_change_lean.save(formattedDate)">
                                                <v-spacer></v-spacer>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-top: -14px;">
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ປະເພດລົດ</span>
                                        <v-text-field :rules="nameRules" label="ປະເພດລົດ" dense flat solo
                                            background-color="#f5f5f5" v-model="h_VICIVLE_BRANCHTYPE"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ເລກຈັກ</span>
                                        <v-text-field :rules="nameRules" label="ເລກຈັກ" dense flat solo
                                            background-color="#f5f5f5" v-model="h_VICIVLE_LEKJUK"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ເລກຖັງ</span>
                                        <v-text-field :rules="nameRules" label="ເລກຖັງ" dense flat solo
                                            background-color="#f5f5f5" v-model="h_VICIVLE_LEKTHUNG"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-top: -14px;">
                                    <v-col clos="6" md="4" sm="4">
                                        <span>GPS</span><v-text-field :rules="nameRules" label="GPS" dense flat solo
                                            background-color="#f5f5f5" v-model="h_VICIVLE_GPS"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col clos="6" md="4" sm="4">
                                        <span>ຝອຍປັດນໍ້າຝົນ</span><v-text-field :rules="nameRules" label="ຝອຍປັດນໍ້າຝົນ"
                                            dense flat solo background-color="#f5f5f5"
                                            v-model="h_VICIVLE_POYPUDNUMFON"></v-text-field>
                                        <div class="tops">
                                        </div>
                                    </v-col>
                                    <v-col cols="6" md="4" sm="4">
                                        <span>ໝໍ້ໄຟ</span>
                                        <div>
                                            <v-row>
                                                <v-col cols="6" md="2" sm="2">
                                                    <img :src="imageMorFai" alt="Battery Image" cover height="40px"
                                                        width="40px">
                                                </v-col>
                                                <v-col cols="6" md="10" sm="10">
                                                    <v-autocomplete v-model="keyId" outlined dense :label="idMorFai"
                                                        :items="morfai_data_list" :rules="nameRules" item-text="batNo"
                                                        item-value="keyId" background-color="#f5f5f5"
                                                        @change="onGetmorfaiDetails"></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </div>
                                        <div class="tops" style="display: flex; align-items: center;">
                                            <span>ຂະໜາດ: {{ sizeMorFai }} || ອາຍຸການໃຊ້ງານ: {{ serviceLIFE }} ປີ</span>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: -14px;">
                            <v-col clos="6" md="3" sm="3">
                                <span>ວັນທີໃສ່ໝໍ້ໄຟ</span>
                                <v-menu ref="start_bat" v-model="start_bat" :close-on-content-click="false"
                                    :return-value.sync="start_bat_date" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-if="toBatRowStatus === 'W'" dense outlined
                                            v-model="start_bat_date" background-color="#FFF176" required
                                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            :rules="nameRules"></v-text-field>
                                        <v-text-field v-else-if="toBatRowStatus === 'E'" dense outlined
                                            v-model="start_bat_date" background-color="red" required
                                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            :rules="nameRules"></v-text-field>
                                        <v-text-field v-else dense outlined v-model="start_bat_date"
                                            background-color="#f5f5f5" required append-icon="mdi-calendar" readonly
                                            v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="start_bat_date" no-title scrollable
                                        @input="$refs.start_bat.save(start_bat_date)">
                                        <v-spacer></v-spacer>
                                    </v-date-picker>
                                </v-menu>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ວັນທີໝົດອາຍຸໝໍ້ໄຟ</span>
                                <v-menu ref="end_bat" v-model="end_bat" :close-on-content-click="false"
                                    :return-value.sync="end_bat_date" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-if="toBatRowStatus === 'W'" dense outlined
                                            background-color="#FFF176" v-model="end_bat_date" required
                                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            :rules="nameRules"></v-text-field>
                                        <v-text-field v-else-if="toBatRowStatus === 'E'" dense outlined
                                            background-color="red" v-model="end_bat_date" required
                                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            :rules="nameRules"></v-text-field>
                                        <v-text-field v-else dense outlined background-color="#f5f5f5"
                                            v-model="end_bat_date" required append-icon="mdi-calendar" readonly
                                            v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="end_bat_date" no-title scrollable
                                        @input="$refs.end_bat.save(end_bat_date)">
                                        <v-spacer></v-spacer>
                                    </v-date-picker>
                                </v-menu>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ບັງຕົມ</span><v-text-field :rules="nameRules" label="ບັງຕົມ" dense flat solo
                                    background-color="#f5f5f5" v-model="h_VICIVLE_BGTOM"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ຈານລາກ</span><v-text-field :rules="nameRules" label="ຈານລາກ" dense flat solo
                                    background-color="#f5f5f5" v-model="h_VICIVLE_JANLARK"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: -14px;">
                            <v-col clos="6" md="3" sm="3">
                                <span>ແຮງມ້າ</span><v-text-field :rules="nameRules" dense flat solo
                                    background-color="#f5f5f5" v-model="exHangMar"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ໄຟໜ້າ</span><v-text-field :rules="nameRules" label="ໄຟໜ້າ" dense flat solo
                                    background-color="#f5f5f5" v-model="h_VICIVLE_FAINAR"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ໄຟທ້າຍ</span>
                                <v-text-field :rules="nameRules" label="ໄຟທ້າຍ" dense flat solo
                                    background-color="#f5f5f5" v-model="h_VICIVLE_FAITHAIY"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ໄຟຂ້າງ</span><v-text-field :rules="nameRules" label="ໄຟຂ້າງ" dense flat solo
                                    background-color="#f5f5f5" v-model="h_VICIVLE_FAIYKHANG"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: -14px;">
                            <v-col clos="6" md="3" sm="3">
                                <span>ແວ່ນມອງໜ້າ</span><v-text-field :rules="nameRules" label="ແວ່ນມອງໜ້າ" dense flat
                                    solo background-color="#f5f5f5" v-model="h_VICIVLE_VENMONGNAR"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ແວ່ນມອງຫຼັງ</span><v-text-field :rules="nameRules" label="ແວ່ນມອງຫຼັງ" dense flat
                                    solo background-color="#f5f5f5" v-model="h_VICIVLE_VENMONGLHG"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <span>ແວ່ນຂ້າງ</span>
                                <v-text-field :rules="nameRules" label="ແວ່ນຂ້າງ" dense flat solo
                                    background-color="#f5f5f5" v-model="h_VICIVLE_VENKHANG"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col clos="6" md="3" sm="3">
                                <v-text-field :rules="nameRules" label="ສາຍສະເຕ" dense flat solo
                                    background-color="#f5f5f5" v-model="saiystay"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <v-text-field :rules="nameRules" label="ກະລິກ" dense flat solo
                                    background-color="#f5f5f5" v-model="galick"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <v-text-field :rules="nameRules" label="ຜ້າບັດ" dense flat solo
                                    background-color="#f5f5f5" v-model="pha_But"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <v-text-field label="ກໍານົດປ່ຽນນໍ້າມັນເກຍ (ຕາມເລກໄມ)" dense flat solo
                                    background-color="#f5f5f5" v-model="leanGia"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col clos="6" md="3" sm="3">
                                <v-text-field label="ກໍານົດປ່ຽນນ້ຳມັນເຟືອງທ້າຍ (ຕາມເລກໄມ)" dense flat solo
                                    background-color="#f5f5f5" v-model="leanFuengThaiy"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                        </v-row>
                        <v-card class="card-shadow mx-auto mt-10" width="1400">
                            <v-card-title style="display:flex;background-color:#E57373;color:white">
                                <v-spacer></v-spacer>
                                ເລກຕັ້ງສິດ
                                <v-spacer></v-spacer>
                            </v-card-title>
                            <v-row style="margin-top: -14px;" justify="center" align="center">
                                <v-col cols="12" md="6" sm="8" class="text-center">
                                    <v-card-actions>
                                        <div>
                                            <div>
                                                ຕັ້ງສິດ
                                            </div>
                                            <v-text-field :rules="nameRules" label="ຕັ້ງສິດ" dense flat solo
                                                background-color="#f5f5f5" v-model="lektungsit"></v-text-field>
                                        </div>
                                        <v-spacer></v-spacer>
                                        <div>
                                            <div>ວັນທີໝົດອາຍຸຕັ້ງສິດ</div>
                                            <v-menu ref="end_tangsit" v-model="end_tangsit"
                                                :close-on-content-click="false" :return-value.sync="dateExTungsit"
                                                transition="scale-transition" offset-y min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-if="dateExTungsit_status === 'W'" dense outlined
                                                        background-color="#FFF176" v-model="dateExTungsit" required
                                                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                        :rules="nameRules"></v-text-field>
                                                    <v-text-field v-else-if="dateExTungsit_status === 'E'" dense
                                                        outlined background-color="red" v-model="dateExTungsit" required
                                                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                                        :rules="nameRules"></v-text-field>
                                                    <v-text-field v-else dense outlined background-color="#f5f5f5"
                                                        v-model="dateExTungsit" required append-icon="mdi-calendar"
                                                        readonly v-bind="attrs" v-on="on"
                                                        :rules="nameRules"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="dateExTungsit" no-title scrollable
                                                    @input="$refs.end_tangsit.save(dateExTungsit)">
                                                    <v-spacer></v-spacer>
                                                </v-date-picker>
                                            </v-menu>
                                        </div>
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-card>
                        <Height />
                        <div class="margintop d-flex align-center mt-4">
                            <div class="d-flex align-center pt-2  pr-2"
                                style="background-color:#f7f7f7;border-radius:5px;height:40px">
                                <v-radio-group inline v-model="h_VICIVLE_GLASS">
                                    <div class="pl-4 d-flex align-center">
                                        <span>ນໍ້າມັນລົດໃຊ້</span>
                                        <Width />
                                        <v-radio label="ແອັດຊັງ" value="ແອັດຊັງ"></v-radio>
                                        <Width />
                                        <v-radio label="ກະຊວນ" value="ກະຊວນ"></v-radio>
                                    </div>
                                </v-radio-group>
                            </div>
                            <div class="d-flex align-center pt-2 ml-2 pr-2"
                                style="background-color:#f7f7f7;border-radius:5px;height:40px">
                                <v-radio-group inline v-model="h_STATUS">
                                    <div class="pl-4 d-flex align-center">
                                        <span>ສະຖານະລົດ</span>
                                        <Width />
                                        <v-radio label="ວ່າງ" value="Y" color="#55CE63"></v-radio>
                                        <Width />
                                        <v-radio label="ບໍ່ວ່າງ" value="N" color="red"></v-radio>
                                    </div>
                                </v-radio-group>
                            </div>
                        </div>
                    </v-card-text>
                    <Height />
                    <v-divider></v-divider>
                    <Height />
                </v-card>
                <!-- ຂໍ້ມູນຢາງລົດ -->
                <v-card flat>
                    <v-card-text>
                        <div class="d-flex">
                            <span style="font-size:14pt">ຂໍ້ມູນຢາງລົດ:</span>
                        </div>
                        <Height />
                        <div class="d-flex">
                            <div style="width:100%">
                                <!-- Left -->
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2">
                                    <div class="d-flex pt-1">
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ລະຫັດຢາງລົດ" v-model="ll_TIRE_NO_1"></v-text-field>

                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="ll_TIRE_DATE_1"></v-text-field>
                                        <v-text-field :rules="nameRules" dense rounded background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="ll_TIRE_KM_1"></v-text-field>
                                    </div>
                                    <div class="d-flex">
                                        <v-text-field style="margin-top:-6px" :rules="nameRules" rounded
                                            background-color="#fff" dense label="ເລກໄມລ່າສຸດ"
                                            v-model="h_KM1"></v-text-field>
                                        <v-text-field style="margin-top:-6px" :rules="nameRules" rounded
                                            background-color="#fff" dense label="ເລກໄມປະຈຸບັນ"
                                            v-model="h_KML_1"></v-text-field>
                                        <v-text-field style="margin-top:-6px" :rules="nameRules" rounded
                                            background-color="#fff" dense label="ແລ່ນໄປແລ້ວ km"
                                            v-model="canRun1"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1 pt-1" v-if="ll_TIRE_NO_2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="ll_TIRE_NO_2"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="ll_TIRE_DATE_2"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="ll_TIRE_KM_2"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM2"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_2"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun2"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1">
                                    <div class="d-flex pt-1">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="ll_TIRE_NO_3"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="ll_TIRE_DATE_3"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="ll_TIRE_KM_3"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM3"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_3"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun3"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1 pt-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="ll_TIRE_NO_4"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="ll_TIRE_DATE_4"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="ll_TIRE_KM_4"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM4"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_4"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun4"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1 pt-2">
                                    <div style="padding-top: 0px" class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="ll_TIRE_NO_5"></v-text-field>

                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="ll_TIRE_DATE_5"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="ll_TIRE_KM_5"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM5"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_5"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun5"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1 pt-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="ll_TIRE_NO_6"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="ll_TIRE_DATE_6"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="ll_TIRE_KM_6"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM6"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_6"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun6"></v-text-field>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <img v-if="r_TIRE_NO_2" class="mx-auto" src="../assets/images/head12.png" width="150"
                                    height="450" />
                                <img v-else class="mx-auto" src="../assets/images/head10.png" width="150"
                                    height="390" />
                            </div>
                            <!-- Right -->
                            <div style="width:100%">
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 pt-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="r_TIRE_NO_1"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TIRE_DATE_1"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TIRE_KM_1"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM7"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_7"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun7"></v-text-field>
                                    </div>
                                </div>
                                <!-- =========12 los========== -->
                                <div v-if="r_TIRE_NO_2"
                                    style="background-color:#f2ebeb;height:80px;padding-top:0px;border-radius:5px"
                                    class="px-2 mt-1">
                                    <div class="d-flex pt-2">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="r_TIRE_NO_2"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TIRE_DATE_2"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TIRE_KM_2"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM8"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_8"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun8"></v-text-field>
                                    </div>
                                </div>
                                <!-- /////////////////////////////// -->
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1">
                                    <div class="d-flex pt-1">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="r_TIRE_NO_3"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TIRE_DATE_3"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TIRE_KM_3"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM9"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_9"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun9"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1 pt-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="r_TIRE_NO_4"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TIRE_DATE_4"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TIRE_KM_4"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM10"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_10"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun10"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 pt-2 mt-1 ">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="r_TIRE_NO_5"></v-text-field>

                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TIRE_DATE_5"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TIRE_KM_5"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM11"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_11"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun11"></v-text-field>
                                    </div>
                                </div>
                                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                                    class="px-2 mt-1 pt-2">
                                    <div class="d-flex">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ລະຫັດຢາງລົດ" v-model="r_TIRE_NO_6"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ວັນທີປ່ຽນຢາງ" v-model="r_TIRE_DATE_6"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TIRE_KM_6"></v-text-field>
                                    </div>
                                    <div class="d-flex" style="margin-top:-10px">
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມລ່າສຸດ" v-model="h_KM12"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                            label="ເລກໄມປະຈຸບັນ" v-model="h_KML_12"></v-text-field>
                                        <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                            label="ແລ່ນໄປແລ້ວ km" v-model="canRun12"></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px"
                            class="px-2 mt-1 pt-2">
                            <div class="d-flex">
                                <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                    label="ລະຫັດຢາງລົດ" v-model="r_TIRE_NO_7"></v-text-field>
                                <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                    label="ວັນທີປ່ຽນຢາງ" v-model="r_TIRE_DATE_7"></v-text-field>
                                <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                    label="ກຳນົດແລ່ນໄດ້ km" v-model="r_TIRE_KM_7"></v-text-field>
                            </div>
                            <div class="d-flex" style="margin-top:-10px">
                                <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                    label="ເລກໄມລ່າສຸດ" v-model="h_KM13"></v-text-field>

                                <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                                    label="ເລກໄມປະຈຸບັນ" v-model="h_KML_13"></v-text-field>

                                <v-text-field :rules="nameRules" rounded background-color="#fff" dense
                                    label="ແລ່ນໄປແລ້ວ km" v-model="canRun13"></v-text-field>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
                <v-card class="pa-4 mt-2" flat>
                    <span>ໝາຍເຫດ</span>
                    <v-textarea rounded background-color="#f5f5f5" filled placeholder="ຕົວຢ່າງ: ປ່ຽນນໍ້າມັນເຄື່ອງ..."
                        v-model="his_REASON"></v-textarea>
                </v-card>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <p style="color: deeppink;margin-right: 20px;margin-top: 20px;">ກອນອັບເດດ ຖຸກຄັງໃຫ້ ໃສ່ ໝໍ້ໄຟ
                </p>
                <v-btn color="#FFB74D" width="120" elevation="0" @click="onUpdate">
                    <v-icon color="white">mdi-update</v-icon>
                    <span class="white--text">ອັບເດດ</span>
                </v-btn>
            </v-card-actions>
            <Height />
            <Height />
            <Height />
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
            toBatRowStatus:'',
            toBatRowGalanty:'',
            toBatRowtabienLod:'',
            dateExTungsit_status:'',
            date_change_lean:'',
            imagePreview: '',
            canRun1: '',
            canRun2: '',
            canRun3: '',
            canRun4: '',
            canRun5: '',
            canRun6: '',
            canRun7: '',
            canRun8: '',
            canRun9: '',
            canRun10: '',
            canRun11: '',
            canRun12: '',
            canRun13: '',
            alert: false,
            loading_processing: false,
            chooseCarType: '10',
            valid: true,
            nameRules: [(v) => !!v || ''],
            // state save data
            his_REASON: '',
            h_VICIVLE_GLASS: 'ກະຊວນ',
            h_VICIVLE_NUMBER: '',
            h_VICIVLE_GALATY: '',
            start_galaty: false,
            h_VICIVLE_DATE_GALATY: null,
            h_VICIVLE_TNGLOD: '',
            h_VICIVLE_BRANCH: '',
            h_VICIVLE_YEARLEVEL: '',
            h_VICIVLE_BRANCHTYPE: '',
            h_VICIVLE_DATEEXPRIRE: '',
            h_VICIVLE_LEKJUK: '',
            h_VICIVLE_LEKTHUNG: '',
            h_VICIVLE_GPS: '',
            h_VICIVLE_POYPUDNUMFON: '',
            h_VICIVLE_MORFAI: '',
            imageTruck: null,
            imageTruckold: null,
            exCarColor: '',
            exCarDate: null,
            end_cardate: false,
            //start and end bat
            start_bat: false,
            end_bat: false,
            end_tangsit: false,
            start_bat_date: null,
            end_bat_date: null,
            dateExTungsit: '',
            h_VICIVLE_BGTOM: '',
            h_VICIVLE_JANLARK: '',
            h_VICIVLE_FAINAR: '',
            h_VICIVLE_FAITHAIY: '',
            h_VICIVLE_FAIYKHANG: '',
            h_VICIVLE_VENMONGNAR: '',
            lektungsit: '',
            h_VICIVLE_VENMONGLHG: '',
            h_VICIVLE_VENKHANG: '',
            h_LEK_NUMMUNKHG: '',
            kim_KM: '',
            h_STATUS: '',
            r_TIRE_NO_1: '',
            r_TIRE_NO_2: '',
            r_TIRE_NO_3: '',
            r_TIRE_NO_4: '',
            r_TIRE_NO_5: '',
            r_TIRE_NO_6: '',
            r_TIRE_DATE_1: '',
            r_TIRE_DATE_2: '',
            r_TIRE_DATE_3: '',
            r_TIRE_DATE_4: '',
            r_TIRE_DATE_5: '',
            r_TIRE_DATE_6: '',
            r_TIRE_KM_1: '',
            r_TIRE_KM_2: '',
            r_TIRE_KM_3: '',
            r_TIRE_KM_4: '',
            r_TIRE_KM_5: '',
            formattedDate: null,
            r_TIRE_KM_6: '',
            r_TIRE_KM_7:'',
            ll_TIRE_NO_1: '',
            ll_TIRE_NO_2: '',
            ll_TIRE_NO_5: '',
            ll_TIRE_KM_1: '',
            ll_TIRE_NO_4: '',
            ll_TIRE_DATE_1: '',
            ll_TIRE_DATE_3: '',
            ll_TIRE_DATE_5: '',
            ll_TIRE_KM_2: '',
            ll_TIRE_NO_3: '',
            ll_TIRE_NO_6: '',
            ll_TIRE_DATE_2: '',
            ll_TIRE_KM_3: '',
            ll_TIRE_DATE_6: '',
            ll_TIRE_DATE_4: '',
            ll_TIRE_KM_6: '',
            ll_TIRE_KM_4: '',
            ll_TIRE_KM_5: '',
            r_TIRE_NO_7: '',
            r_TIRE_DATE_7: '',
            ll_TIRE_KM_7: '',
            //left last and now
            h_KM1: '',
            h_KM2: '',
            h_KM3: '',
            h_KM4: '',
            h_KM5: '',
            h_KM6: '',
            h_KM7: '',
            h_KM8: '',
            h_KM9: '',
            h_KM10: '',
            h_KM11: '',
            h_KM12: '',
            h_KM13:'',
            //right last and now
            h_KML_1: '',
            h_KML_2: '',
            h_KML_3: '',
            h_KML_4: '',
            h_KML_5: '',
            h_KML_6: '',
            h_KML_7: '',
            h_KML_8: '',
            h_KML_9: '',
            h_KML_10: '',
            h_KML_11: '',
            h_KML_12: '',
            h_KML_13: '',
            exHangMar: '',
            //add new
            saiystay: '',
            galick: '',
            leanGia: '',
            leanFuengThaiy: '',
            pha_But: '',
            morfai_data_list: [],
            keyId: null,
            batNo: '',
            idMorFai: '',
            idMorFai1: '',
            imageMorFai: '',
            modalMorFai: '',
            sizeMorFai: '',
            serviceLIFE: ''
        }
    },
    watch: {
        h_LEK_NUMMUNKHG: function (value) {
            if (parseFloat(value?.split(',').join('')) <= parseFloat(this.kim_KM?.split(',').join(''))) {
                this.alert = true
            } else {
                this.alert = false
            }
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_LEK_NUMMUNKHG = result
        },
        kim_KM: function (value) {
            if (parseFloat(value?.split(',').join('')) >= parseFloat(this.h_LEK_NUMMUNKHG?.split(',').join(''))) {
                this.alert = true
            } else {
                this.alert = false
            }
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.kim_KM = result
            this.h_KML_1 = result
            this.h_KML_2 = result
            this.h_KML_3 = result
            this.h_KML_4 = result
            this.h_KML_5 = result
            this.h_KML_6 = result
            this.h_KML_7 = result
            this.h_KML_8 = result
            this.h_KML_9 = result
            this.h_KML_10 = result
            this.h_KML_11 = result
            this.h_KML_12 = result
            this.h_KML_13 = result
            const can1 = parseFloat(this.h_KML_1?.split(',').join('')) - parseFloat(this.h_KM1?.split(',').join(''))
            const can2 = parseFloat(this.h_KML_2?.split(',').join('')) - parseFloat(this.h_KM2?.split(',').join(''))
            const can3 = parseFloat(this.h_KML_3?.split(',').join('')) - parseFloat(this.h_KM3?.split(',').join(''))
            const can4 = parseFloat(this.h_KML_4?.split(',').join('')) - parseFloat(this.h_KM4?.split(',').join(''))
            const can5 = parseFloat(this.h_KML_5?.split(',').join('')) - parseFloat(this.h_KM5?.split(',').join(''))
            const can6 = parseFloat(this.h_KML_6?.split(',').join('')) - parseFloat(this.h_KM6?.split(',').join(''))
            const can7 = parseFloat(this.h_KML_7?.split(',').join('')) - parseFloat(this.h_KM7?.split(',').join(''))
            const can8 = parseFloat(this.h_KML_8?.split(',').join('')) - parseFloat(this.h_KM8?.split(',').join(''))
            const can9 = parseFloat(this.h_KML_9?.split(',').join('')) - parseFloat(this.h_KM9?.split(',').join(''))
            const can10 = parseFloat(this.h_KML_10?.split(',').join('')) - parseFloat(this.h_KM10?.split(',').join(''))
            const can11 = parseFloat(this.h_KML_11?.split(',').join('')) - parseFloat(this.h_KM11?.split(',').join(''))
            const can12 = parseFloat(this.h_KML_12?.split(',').join('')) - parseFloat(this.h_KM12?.split(',').join(''))
            const can13 = parseFloat(this.h_KML_13?.split(',').join('')) - parseFloat(this.h_KM13?.split(',').join(''))
            this.canRun1 = can1?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun2 = can2?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun3 = can3?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun4 = can4?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun5 = can5?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun6 = can6?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun7 = can7?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun8 = can8?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun9 = can9?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun10 = can10?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun11 = can11?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun12 = can12?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.canRun13 = can13?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        ll_TIRE_KM_1: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ll_TIRE_KM_1 = result
        },
        ll_TIRE_KM_2: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ll_TIRE_KM_2 = result
        },
        ll_TIRE_KM_3: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ll_TIRE_KM_3 = result
        },
        ll_TIRE_KM_4: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ll_TIRE_KM_4 = result
        },
        ll_TIRE_KM_5: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ll_TIRE_KM_5 = result
        },
        ll_TIRE_KM_6: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ll_TIRE_KM_6 = result
        },
        r_TIRE_KM_1: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.r_TIRE_KM_1 = result
        },
        r_TIRE_KM_2: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.r_TIRE_KM_2 = result
        },
        r_TIRE_KM_3: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.r_TIRE_KM_3 = result
        },
        r_TIRE_KM_4: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.r_TIRE_KM_4 = result
        },
        r_TIRE_KM_5: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.r_TIRE_KM_5 = result
        },
        r_TIRE_KM_6: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.r_TIRE_KM_6 = result
        },
        h_KM1: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM1 = result
        },
        h_KM2: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM2 = result
        },
        h_KM3: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM3 = result
        },
        h_KM4: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM4 = result
        },
        h_KM5: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM5 = result
        },
        h_KM6: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM6 = result
        },
        h_KM7: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM7 = result
        },
        h_KM8: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM8 = result
        },
        h_KM9: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM9 = result
        },
        h_KM10: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM10 = result
        },
        h_KM11: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM11 = result
        },
        h_KM12: function (value) {
            const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.h_KM12 = result
        },
    },
    mounted() {
        if (this.$route.query.key) {
            this.ongetData()
        }
        this.onGetmorfaiList()
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
        onGetmorfaiDetails(id) {
            console.log('Selected keyId:', id);
            const selected = this.morfai_data_list.find((el) => el.keyId === id);
            if (selected) {
                this.modalMorFai = selected.modalMorfai;
                this.sizeMorFai = selected.sizeMorfai;
                this.serviceLIFE = selected.serviceLife;
                this.imageMorFai = selected.imageBatery;
                this.keyId = selected.keyId;
                console.log('Updated data:', selected);
            } else {
                console.warn('No matching data found for keyId:', id);
            }
        },
        async onGetmorfaiList() {
            try {
                const response = await this.$axios.$post('getBateryAll', {
                    toKen: localStorage.getItem('toKen'),
                    keyId: "",
                });
                if (response?.status === '00') {
                    this.morfai_data_list = response.data;
                    console.log('morfai_data_list:', response.data);
                } else {
                    console.error('Error fetching data:', response?.message || 'Unknown error');
                }
            } catch (error) {
                console.error(error);
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: 'Error fetching data',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        // async onGetmorfaiList() {
        //     try {
        //         await this.$axios.$post('getBateryAll'
        //             , {
        //                 toKen: localStorage.getItem('toKen'),
        //                 keyId: ""
        //             }
        //         ).then((data) => {
        //             if (data?.status == '00') {
        //                 this.morfai_data_list = data?.data
        //                 this.loading_processing = false
        //                 console.log('morfai_data_list:', data);
        //                 console.log("cusInfo:", this.morfai_data_list)
        //                 let datas = this.morfai_data_list?.filter((el => parseInt(el.id) === parseInt(this.$route?.query?.KeyID)));
        //                 console.log("new:", datas)
        //                 this.modalMorFai = datas[0]?.modalMorfai
        //                 this.sizeMorFai = datas[0]?.sizeMorfai
        //                 this.serviceLIFE = datas[0]?.serviceLife
        //                 this.imageMorFai = datas[0]?.imageBatery
        //                 this.keyId = this.$route?.query?.KeyID
        //             }
        //         })
        //     } catch (error) {
        //         this.loading_processing = false
        //         console.log(error)
        //         swal.fire({
        //             title: 'ແຈ້ງເຕືອນ',
        //             text: error,
        //             icon: 'error',
        //             allowOutsideClick: false,
        //             confirmButtonColor: '#3085d6',
        //             confirmButtonText: 'OK',
        //         })
        //     }
        // },
        async ongetData() {
            try {
                await this.$axios.$post('/listVicicleHeaderByID.service', {
                    key_id: this.$route?.query?.key, toKen: localStorage.getItem('toKen')
                }
                ).then((data) => {
                    console.log("dataUpd", data)
                    this.imageTruckold = data?.data[0]?.imageTruck;
                    this.h_STATUS = data?.data[0]?.h_STATUS;
                    this.kim_KM = data?.data[0]?.kim_KM,
                        this.exHangMar = data?.data[0]?.exHangMar,
                        this.exCarDate = data?.data[0]?.exCarDate,
                        this.exCarColor = data?.data[0]?.exCarColor,
                        this.keyId = data?.data[0]?.batNo,
                        this.idMorFai = data?.data[0]?.idMorFai,
                        this.imageMorFai = data?.data[0].imageMorFai,
                        this.modalMorFai = data?.data[0].modalMorfai,
                        this.sizeMorFai = data?.data[0].sizeMorfai,
                        this.serviceLIFE = data?.data[0].serviceLife,
                        this.h_LEK_NUMMUNKHG = data?.data[0]?.h_LEK_NUMMUNKHG,
                        this.h_VICIVLE_GLASS = data?.data[0]?.h_VICIVLE_GLASS,
                        this.h_VICIVLE_NUMBER = data?.data[0]?.h_VICIVLE_NUMBER,
                        this.h_VICIVLE_GALATY = data?.data[0]?.h_VICIVLE_GALATY,
                        this.h_VICIVLE_DATE_GALATY = data?.data[0]?.h_VICIVLE_DATE_GALATY,
                        this.formattedDate = data?.data[0]?.date_change_lean,
                        this.h_VICIVLE_TNGLOD = data?.data[0]?.h_VICIVLE_TNGLOD,
                        this.h_VICIVLE_BRANCH = data?.data[0]?.h_VICIVLE_BRANCH,
                        this.h_VICIVLE_YEARLEVEL = data?.data[0]?.h_VICIVLE_YEARLEVEL,
                        this.h_VICIVLE_BRANCHTYPE = data?.data[0]?.h_VICIVLE_BRANCHTYPE,
                        this.h_VICIVLE_DATEEXPRIRE = data?.data[0]?.h_VICIVLE_DATEEXPRIRE,
                        this.h_VICIVLE_LEKJUK = data?.data[0]?.h_VICIVLE_LEKJUK,
                        this.h_VICIVLE_LEKTHUNG = data?.data[0]?.h_VICIVLE_LEKTHUNG,
                        this.h_VICIVLE_GPS = data?.data[0]?.h_VICIVLE_GPS,
                        this.h_VICIVLE_POYPUDNUMFON = data?.data[0]?.h_VICIVLE_POYPUDNUMFON,
                        this.h_VICIVLE_MORFAI = data?.data[0]?.h_VICIVLE_MORFAI,
                        this.toBatRowStatus = data?.data[0]?.toBatRowStatus,
                        this.dateExTungsit_status = data?.data[0]?.dateExTungsit_status,
                        this.toBatRowGalanty = data?.data[0]?.toBatRowGalanty,
                        this.toBatRowtabienLod = data?.data[0]?.toBatRowtabienLod,
                        this.start_bat_date = data?.data[0]?.bat_StartDate,
                        this.end_bat_date = data?.data[0]?.bat_EndDate,
                        this.dateExTungsit = data?.data[0]?.dateExTungsit,
                        this.h_VICIVLE_BGTOM = data?.data[0]?.h_VICIVLE_BGTOM,
                        this.h_VICIVLE_JANLARK = data?.data[0]?.h_VICIVLE_JANLARK,
                        this.h_VICIVLE_FAINAR = data?.data[0]?.h_VICIVLE_FAINAR,
                        this.h_VICIVLE_FAITHAIY = data?.data[0]?.h_VICIVLE_FAITHAIY,
                        this.h_VICIVLE_FAIYKHANG = data?.data[0]?.h_VICIVLE_FAIYKHANG,
                        this.h_VICIVLE_VENMONGNAR = data?.data[0]?.h_VICIVLE_VENMONGNAR,
                        this.lektungsit = data?.data[0]?.lektungsit,
                        this.h_VICIVLE_VENMONGLHG = data?.data[0]?.h_VICIVLE_VENMONGLHG,
                        this.h_VICIVLE_VENKHANG = data?.data[0]?.h_VICIVLE_VENKHANG,
                        this.h_KM13 = data?.data[0]?.h_KM13,
                        this.h_KML_13 = data?.data[0]?.h_KML_13,
                        this.r_TIRE_NO_1 = data?.data[0]?.r_TIRE_NO_1,
                        this.r_TIRE_NO_2 = data?.data[0]?.r_TIRE_NO_2,
                        this.r_TIRE_NO_3 = data?.data[0]?.r_TIRE_NO_3,
                        this.r_TIRE_NO_4 = data?.data[0]?.r_TIRE_NO_4,
                        this.r_TIRE_NO_5 = data?.data[0]?.r_TIRE_NO_5,
                        this.r_TIRE_NO_6 = data?.data[0]?.r_TIRE_NO_6,
                        this.r_TIRE_DATE_1 = data?.data[0]?.r_TIRE_DATE_1,
                        this.r_TIRE_DATE_2 = data?.data[0]?.r_TIRE_DATE_2,
                        this.r_TIRE_DATE_3 = data?.data[0]?.r_TIRE_DATE_3,
                        this.r_TIRE_DATE_4 = data?.data[0]?.r_TIRE_DATE_4,
                        this.r_TIRE_DATE_5 = data?.data[0]?.r_TIRE_DATE_5,
                        this.r_TIRE_DATE_6 = data?.data[0]?.r_TIRE_DATE_6,
                        this.r_TIRE_KM_1 = data?.data[0]?.r_TIRE_KM_1,
                        this.r_TIRE_KM_2 = data?.data[0]?.r_TIRE_KM_2,
                        this.r_TIRE_KM_3 = data?.data[0]?.r_TIRE_KM_3,
                        this.r_TIRE_KM_4 = data?.data[0]?.r_TIRE_KM_4,
                        this.r_TIRE_KM_5 = data?.data[0]?.r_TIRE_KM_5,
                        this.r_TIRE_KM_6 = data?.data[0]?.r_TIRE_KM_6,
                        this.ll_TIRE_NO_1 = data?.data[0]?.ll_TIRE_NO_1,
                        this.ll_TIRE_NO_2 = data?.data[0]?.ll_TIRE_NO_2,
                        this.ll_TIRE_NO_5 = data?.data[0]?.ll_TIRE_NO_5,
                        this.ll_TIRE_KM_1 = data?.data[0]?.ll_TIRE_KM_1,
                        this.ll_TIRE_NO_4 = data?.data[0]?.ll_TIRE_NO_4,
                        this.ll_TIRE_DATE_1 = data?.data[0]?.ll_TIRE_DATE_1,
                        this.ll_TIRE_DATE_3 = data?.data[0]?.ll_TIRE_DATE_3,
                        this.ll_TIRE_DATE_5 = data?.data[0]?.ll_TIRE_DATE_5,
                        this.ll_TIRE_KM_2 = data?.data[0]?.ll_TIRE_KM_2,
                        this.ll_TIRE_NO_3 = data?.data[0]?.ll_TIRE_NO_3,
                        this.ll_TIRE_NO_6 = data?.data[0]?.ll_TIRE_NO_6,
                        this.ll_TIRE_DATE_2 = data?.data[0]?.ll_TIRE_DATE_2,
                        this.ll_TIRE_KM_3 = data?.data[0]?.ll_TIRE_KM_3,
                        this.ll_TIRE_DATE_6 = data?.data[0]?.ll_TIRE_DATE_6,
                        this.ll_TIRE_DATE_4 = data?.data[0]?.ll_TIRE_DATE_4,
                        this.ll_TIRE_KM_6 = data?.data[0]?.ll_TIRE_KM_6,
                        this.ll_TIRE_KM_4 = data?.data[0]?.ll_TIRE_KM_4,
                        this.ll_TIRE_KM_5 = data?.data[0]?.ll_TIRE_KM_5,
                        this.r_TIRE_NO_7 = data?.data[0]?.r_TIRE_NO_7,
                        this.r_TIRE_DATE_7 = data?.data[0]?.r_TIRE_DATE_7,
                        this.r_TIRE_KM_7 = data?.data[0]?.r_TIRE_KM_7,
                        this.h_KM1 = data?.data[0]?.h_KM1,
                        this.h_KM2 = data?.data[0]?.h_KM2,
                        this.h_KM3 = data?.data[0]?.h_KM3,
                        this.h_KM4 = data?.data[0]?.h_KM4,
                        this.h_KM5 = data?.data[0]?.h_KM5,
                        this.h_KM6 = data?.data[0]?.h_KM6,
                        this.h_KM7 = data?.data[0]?.h_KM7,
                        this.h_KM8 = data?.data[0]?.h_KM8,
                        this.h_KM9 = data?.data[0]?.h_KM9,
                        this.h_KM10 = data?.data[0]?.h_KM10,
                        this.h_KM11 = data?.data[0]?.h_KM11,
                        this.h_KM12 = data?.data[0]?.h_KM12,
                        //right last and now
                        this.h_KML_1 = data?.data[0]?.h_KML_1,
                        this.h_KML_2 = data?.data[0]?.h_KML_2,
                        this.h_KML_3 = data?.data[0]?.h_KML_3,
                        this.h_KML_4 = data?.data[0]?.h_KML_4,
                        this.h_KML_5 = data?.data[0]?.h_KML_5,
                        this.h_KML_6 = data?.data[0]?.h_KML_6,
                        this.h_KML_7 = data?.data[0]?.h_KML_7,
                        this.h_KML_8 = data?.data[0]?.h_KML_8,
                        this.h_KML_9 = data?.data[0]?.h_KML_9,
                        this.h_KML_10 = data?.data[0]?.h_KML_10,
                        this.h_KML_11 = data?.data[0]?.h_KML_11,
                        this.h_KML_12 = data?.data[0]?.h_KML_12,
                        this.saiystay = data?.data[0]?.saiystay,
                        this.galick = data?.data[0]?.galick,
                        this.leanGia = data?.data[0]?.leanGia,
                        this.leanFuengThaiy = data?.data[0]?.leanFuengThaiy,
                        this.pha_But = data?.data[0]?.pha_But
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
        async onUpdate() {
            if (!this.$refs.form.validate()) {
                swal.fire({
                    icon: 'info',
                    text: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ',
                });
                return null;
            }
            if (!this.keyId) {
                swal.fire({
                    icon: 'error',
                    text: 'ກະລຸນາເລືອກໝໍ້ໄຟ',
                });
                return null;
            }
            this.loading_processing = true
            try {
                const formdata = new FormData();
                formdata.append('files', this.imageTruck !== null || this.imageTruck !== '' ? this.imageTruck : '')
                formdata.append('h_VICIVLE_NUMBER', this.h_VICIVLE_NUMBER)
                formdata.append('h_VICIVLE_GALATY', this.h_VICIVLE_GALATY)
                formdata.append('h_VICIVLE_DATE_GALATY', this.h_VICIVLE_DATE_GALATY)
                formdata.append('date_change_lean', this.formattedDate || "0000-00-00")
                formdata.append('h_VICIVLE_TNGLOD', this.h_VICIVLE_TNGLOD)
                formdata.append('h_VICIVLE_BRANCH', this.h_VICIVLE_BRANCH)
                formdata.append('h_VICIVLE_YEARLEVEL', this.h_VICIVLE_YEARLEVEL)
                formdata.append('h_VICIVLE_BRANCHTYPE', this.h_VICIVLE_BRANCHTYPE)
                formdata.append('h_VICIVLE_DATEEXPRIRE', this.h_VICIVLE_DATEEXPRIRE)
                formdata.append('h_VICIVLE_LEKJUK', this.h_VICIVLE_LEKJUK)
                formdata.append('h_VICIVLE_LEKTHUNG', this.h_VICIVLE_LEKTHUNG)
                formdata.append('h_VICIVLE_GPS', this.h_VICIVLE_GPS)
                formdata.append('h_VICIVLE_POYPUDNUMFON', this.h_VICIVLE_POYPUDNUMFON)
                formdata.append('h_VICIVLE_MORFAI', this.keyId)
                formdata.append('h_VICIVLE_BGTOM', this.h_VICIVLE_BGTOM)
                formdata.append('h_VICIVLE_JANLARK', this.h_VICIVLE_JANLARK)
                formdata.append('h_VICIVLE_FAINAR', this.h_VICIVLE_FAINAR)
                formdata.append('h_VICIVLE_FAITHAIY', this.h_VICIVLE_FAITHAIY)
                formdata.append('h_VICIVLE_FAIYKHANG', this.h_VICIVLE_FAIYKHANG)
                formdata.append('h_VICIVLE_VENMONGNAR', this.h_VICIVLE_VENMONGNAR)
                formdata.append('lektungsit', this.lektungsit)
                formdata.append('h_VICIVLE_VENMONGLHG', this.h_VICIVLE_VENMONGLHG)
                formdata.append('h_VICIVLE_VENKHANG', this.h_VICIVLE_VENKHANG)
                formdata.append('h_VICIVLE_GLASS', this.h_VICIVLE_GLASS)
                formdata.append('lL_TIRE_NO_1', this.ll_TIRE_NO_1)
                formdata.append('lL_TIRE_NO_2', this.ll_TIRE_NO_2)
                formdata.append('lL_TIRE_NO_3', this.ll_TIRE_NO_3)
                formdata.append('lL_TIRE_NO_4', this.ll_TIRE_NO_4)
                formdata.append('lL_TIRE_NO_5', this.ll_TIRE_NO_5)
                formdata.append('lL_TIRE_NO_6', this.ll_TIRE_NO_6)
                formdata.append('lL_TIRE_NO_7', this.lL_TIRE_NO_7)
                formdata.append('lL_TIRE_DATE_1', this.ll_TIRE_DATE_1)
                formdata.append('lL_TIRE_DATE_2', this.ll_TIRE_DATE_2)
                formdata.append('lL_TIRE_DATE_3', this.ll_TIRE_DATE_3)
                formdata.append('lL_TIRE_DATE_4', this.ll_TIRE_DATE_4)
                formdata.append('lL_TIRE_DATE_5', this.ll_TIRE_DATE_5)
                formdata.append('lL_TIRE_DATE_6', this.ll_TIRE_DATE_6)
                formdata.append('lL_TIRE_DATE_7', this.lL_TIRE_DATE_7)
                formdata.append('lL_TIRE_KM_1', this.ll_TIRE_KM_1)
                formdata.append('lL_TIRE_KM_2', this.ll_TIRE_KM_2)
                formdata.append('lL_TIRE_KM_3', this.ll_TIRE_KM_3)
                formdata.append('lL_TIRE_KM_4', this.ll_TIRE_KM_4)
                formdata.append('lL_TIRE_KM_5', this.ll_TIRE_KM_5)
                formdata.append('lL_TIRE_KM_6', this.ll_TIRE_KM_6)
                formdata.append('lL_TIRE_KM_7', this.r_TIRE_KM_7)
                formdata.append('r_TIRE_NO_1', this.r_TIRE_NO_1)
                formdata.append('r_TIRE_NO_2', this.r_TIRE_NO_2)
                formdata.append('r_TIRE_NO_3', this.r_TIRE_NO_3)
                formdata.append('r_TIRE_NO_4', this.r_TIRE_NO_4)
                formdata.append('r_TIRE_NO_5', this.r_TIRE_NO_5)
                formdata.append('r_TIRE_NO_6', this.r_TIRE_NO_6)
                formdata.append('r_TIRE_NO_7', this.r_TIRE_NO_7)
                formdata.append('r_TIRE_DATE_1', this.r_TIRE_DATE_1)
                formdata.append('r_TIRE_DATE_2', this.r_TIRE_DATE_2)
                formdata.append('r_TIRE_DATE_3', this.r_TIRE_DATE_3)
                formdata.append('r_TIRE_DATE_4', this.r_TIRE_DATE_4)
                formdata.append('r_TIRE_DATE_5', this.r_TIRE_DATE_5)
                formdata.append('r_TIRE_DATE_6', this.r_TIRE_DATE_6)
                formdata.append('r_TIRE_DATE_7', this.r_TIRE_DATE_7)
                formdata.append('r_TIRE_KM_1', this.r_TIRE_KM_1)
                formdata.append('r_TIRE_KM_2', this.r_TIRE_KM_2)
                formdata.append('r_TIRE_KM_3', this.r_TIRE_KM_3)
                formdata.append('r_TIRE_KM_4', this.r_TIRE_KM_4)
                formdata.append('r_TIRE_KM_5', this.r_TIRE_KM_5)
                formdata.append('r_TIRE_KM_6', this.r_TIRE_KM_6)
                formdata.append('r_TIRE_KM_7', this.r_TIRE_KM_7)
                formdata.append('h_LEK', this.h_LEK_NUMMUNKHG)
                formdata.append('kim_KM', this.kim_KM)
                formdata.append('h_KM1', this.h_KM1)
                formdata.append('h_KM2', this.h_KM2)
                formdata.append('h_KM3', this.h_KM3)
                formdata.append('h_KM4', this.h_KM4)
                formdata.append('h_KM5', this.h_KM5)
                formdata.append('h_KM6', this.h_KM6)
                formdata.append('h_KM7', this.h_KM7)
                formdata.append('h_KM8', this.h_KM8)
                formdata.append('h_KM9', this.h_KM9)
                formdata.append('h_KM10', this.h_KM10)
                formdata.append('h_KM11', this.h_KM11)
                formdata.append('h_KM12', this.h_KM12)
                formdata.append('h_KM13', this.h_KM13)
                formdata.append('h_KML_1', this.h_KML_1)
                formdata.append('h_KML_2', this.h_KML_2)
                formdata.append('h_KML_3', this.h_KML_3)
                formdata.append('h_KML_4', this.h_KML_4)
                formdata.append('h_KML_5', this.h_KML_5)
                formdata.append('h_KML_6', this.h_KML_6)
                formdata.append('h_KML_7', this.h_KML_7)
                formdata.append('h_KML_8', this.h_KML_8)
                formdata.append('h_KML_9', this.h_KML_9)
                formdata.append('h_KML_10', this.h_KML_10)
                formdata.append('h_KML_11', this.h_KML_11)
                formdata.append('h_KML_12', this.h_KML_12)
                formdata.append('h_KML_13', this.h_KML_13)
                formdata.append('bat_StartDate', this.start_bat_date)
                formdata.append('bat_EndDate', this.end_bat_date)
                formdata.append('dateExTungsit', this.dateExTungsit)
                formdata.append('exCarDate', this.exCarDate)
                formdata.append('exCarColor', this.exCarColor)
                formdata.append('exHangMar', this.exHangMar)
                formdata.append('batNo', this.keyId)
                formdata.append('imageTruck', this.imageTruckold)
                formdata.append('his_REASON', this.his_REASON)
                formdata.append('h_STATUS', this.h_STATUS)
                formdata.append('key_id', this.$route.query.key)
                //add new
                formdata.append('saiystay', this.saiystay)
                formdata.append('galick', this.galick)
                formdata.append('leanGia', this.leanGia)
                formdata.append('leanFuengThaiy', this.leanFuengThaiy)
                formdata.append('pha_But', this.pha_But),
                    formdata.append('toKen', localStorage.getItem("toKen"))
                await this.$axios.$post('/updateVicicleHeaderByID.service', formdata).then((data) => {
                    console.log("saveStatus:", data)
                    if (data?.status == '00') {
                        this.loading_processing = false
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        })
                        this.onGetmorfaiList()
                        this.ongetData()
                        // this.$router.push('/cars_14')
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
            setTimeout(() => this.chooseCarType = '10', 1000)
        }
    },
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

.tops {
    margin-top: -30px;
    font-size: 14px;
}
</style>
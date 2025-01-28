<template>
  <div>
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>
    <!-- General car info -->
    <Height />
    <v-card class="card-shadow mx-auto" width="1400">
      <v-card-title style="display:flex;background-color:#E57373;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="cars_14">
          <v-icon color="#E57373">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        ເພີ່ມຂໍ້ມູນຫົວລົດ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="1400" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col>
                  <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera"
                    append-inner-icon="mdi-card-account-details" background-color="#f5f5f5"
                    v-model="imageaddcar"></v-file-input>
                  <div class="tops">
                  </div>
                </v-col>
                <!-- <v-col>
                  <v-text-field :rules="nameRules" label="* ປ້ອນລະຫັດລົດ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_NUMBER"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col> -->
                <v-col>
                  <v-text-field :rules="nameRules" label="* ປ້ອນທະບຽນລົດ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_NUMBER"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
                <v-col>

                  <v-menu ref="end_cardate" v-model="end_cardate" :close-on-content-click="false"
                    :return-value.sync="exCarDate" transition="scale-transition" offset-y min-width="auto">

                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined v-model="exCarDate" background-color="#f5f5f5" required
                        label="* ວັນໝົດອາຍຸທະບຽນລົດ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                        :rules="nameRules"></v-text-field>
                    </template>

                    <v-date-picker v-model="exCarDate" no-title scrollable @input="$refs.end_cardate.save(exCarDate)">
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                  <!-- <v-text-field :rules="nameRules" label="* ວັນໝົດອາຍຸທະບຽນລົດ" dense outlined background-color="#f5f5f5"
                    v-model="numberlad"></v-text-field> -->
                  <div class="tops">
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນເລກປະກັນໄພ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_GALATY"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
                <v-col clos="6" md="3" sm="3">
                  <v-menu ref="start_galaty" v-model="start_galaty" :close-on-content-click="false"
                    :return-value.sync="h_VICIVLE_DATE_GALATY" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined v-model="h_VICIVLE_DATE_GALATY" background-color="#f5f5f5" required
                        label="* ປ້ອນວັນທີປະກັນໄພໝົດ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                        :rules="nameRules"></v-text-field>
                    </template>
                    <v-date-picker v-model="h_VICIVLE_DATE_GALATY" no-title scrollable
                      @input="$refs.start_galaty.save(h_VICIVLE_DATE_GALATY)">
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                  <div class="tops">
                  </div>
                </v-col>
                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນຍີ່ຫໍ້ລົດ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_BRANCH"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນລົດປີ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_YEARLEVEL"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນປະເພດລົດ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_BRANCHTYPE"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນສີລົດ" dense outlined background-color="#f5f5f5"
                    v-model="exCarColor"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>

                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນເລກໄມປະຈຸບັນ" dense outlined background-color="#f5f5f5"
                    v-model="kim_KM" @input="calculateH_LEK_NUMMUNKHG"></v-text-field>
                  <div class="tops"></div>
                </v-col>

                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນເລກຈັກ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_LEKJUK"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
              </v-row>
              <v-row>

                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນເລກຖັງ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_LEKTHUNG"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>

                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນເລກໄມປ່ຽນນໍ້າມັນເຄື່ອງຮອບຕໍ່ໄປ" dense outlined readonly
                    background-color="#f5f5f5" v-model="h_LEK_NUMMUNKHG"></v-text-field>
                  <div class="tops"></div>
                </v-col>

                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນGPS" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_GPS"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
                <v-col clos="6" md="3" sm="3">
                  <v-text-field :rules="nameRules" label="* ປ້ອນຝອຍປັດນໍ້າຝົນ" dense outlined background-color="#f5f5f5"
                    v-model="h_VICIVLE_POYPUDNUMFON"></v-text-field>
                  <div class="tops">
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col clos="6" md="3" sm="3">
              <div>

                <v-row>
                  <v-col clos="6" md="2" sm="2">
                    <div v-if="keyId == ''">
                      <img src="../assets/images/morfai.jpg" cover height="40px" width="40px">
                    </div>
                    <div v-else>
                      <img :src="imageBatery" cover height="40px" width="40px">
                    </div>
                  </v-col>
                  <v-col clos="6" md="10" sm="10">
                    <v-autocomplete outlined dense label="* ເລືອກໝໍ້ໄຟ" :items="morfai_data_list" item-text="batNo"
                      item-value="keyId" background-color="#f5f5f5" @change="onGetmorfaiDetails"
                      :rules="nameRules"></v-autocomplete>
                  </v-col>
                </v-row>
              </div>
              <div class="tops" style="display:flex;align-items:center">
                <span> ຂະໜາດ: {{ sizeMorfai }} || ອາຍຸການໃຊ້ງານ: {{ serviceLife }} ປີ </span>
                <span class="ml-4"></span>
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-menu ref="start_bat" v-model="start_bat" :close-on-content-click="false"
                :return-value.sync="start_bat_date" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field dense outlined v-model="start_bat_date" background-color="#f5f5f5" required
                    label="* ວັນທີໃສ່ໝໍ້ໄຟ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                    :rules="nameRules"></v-text-field>
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
              <v-menu ref="end_bat" v-model="end_bat" :close-on-content-click="false" :return-value.sync="end_bat_date"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field dense outlined background-color="#f5f5f5" v-model="end_bat_date" required
                    label="* ວັນທີໝົດອາຍຸໝໍ້ໄຟ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                    :rules="nameRules"></v-text-field>
                </template>
                <v-date-picker v-model="end_bat_date" no-title scrollable @input="$refs.end_bat.save(end_bat_date)">
                  <v-spacer></v-spacer>
                </v-date-picker>
              </v-menu>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນບັງຕົມ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_BGTOM"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
          </v-row>
          <v-row style="margin-top: -10px;">
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນຈານລາກ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_JANLARK"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນແຮງມ້າ" dense outlined background-color="#f5f5f5"
                v-model="exHangMar"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນໄຟໜ້າ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_FAINAR"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນໄຟທ້າຍ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_FAITHAIY"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນໄຟຂ້າງ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_FAIYKHANG"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນແວ່ນມອງໜ້າ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_VENMONGNAR"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນແວ່ນມອງຫຼັງ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_VENMONGLHG"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ປ້ອນແວ່ນຂ້າງ" dense outlined background-color="#f5f5f5"
                v-model="h_VICIVLE_VENKHANG"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ສາຍສະເຕ" dense outlined background-color="#f5f5f5"
                v-model="saiystay"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ກະລິກ" dense outlined background-color="#f5f5f5"
                v-model="galick"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ຜ້າບັດ" dense outlined background-color="#f5f5f5"
                v-model="pha_But"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ກໍານົດປ່ຽນນໍ້າມັນເກຍ (ຕາມເລກໄມ)" dense outlined
                background-color="#f5f5f5" v-model="leanGia"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col clos="6" md="3" sm="3">
              <v-text-field :rules="nameRules" label="* ກໍານົດປ່ຽນນ້ຳມັນເຟືອງທ້າຍ (ຕາມເລກໄມ)" dense outlined
                background-color="#f5f5f5" v-model="leanFuengThaiy"></v-text-field>
              <div class="tops">
              </div>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-icon color="black">mdi-calendar-range</v-icon>
              <span>ວັນທີ່ປ່ຽນນ້ຳມັນເຄື່ອງ</span>
              <v-menu ref="date_change_lean" v-model="date_change_lean" :close-on-content-click="false"
                :return-value.sync="formattedDate" transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field dense outlined v-model="formattedDate" required label="ວັນທີ" append-icon="mdi-calendar"
                    readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="formattedDate" no-title scrollable
                  @input="$refs.date_change_lean.save(formattedDate)">
                  <v-spacer></v-spacer>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
          </v-row>
          <v-card class="card-shadow mx-auto mt-10" width="1400">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
              <v-spacer></v-spacer>
              ຕັ້ງສິດ
              <v-spacer></v-spacer>
            </v-card-title>
            <v-row style="margin-top: -14px;">
              <v-col clos="12" md="6" sm="4">
                <span >ຕັ້ງສິດ</span>
                <v-card-actions>
                  <div>
                    <v-text-field label="ຕັ້ງສິດ" dense flat solo background-color="#f5f5f5" v-model="lektungsit">
                    </v-text-field>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <v-menu ref="end_tungsit" v-model="end_tungsit" :close-on-content-click="false"
                    :return-value.sync="dateExTungsit" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined background-color="#f5f5f5" v-model="dateExTungsit" required
                      label="* ວັນທີໝົດອາຍຸຕັ້ງສິດ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                      :rules="nameRules"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateExTungsit" no-title scrollable @input="$refs.end_tungsit.save(dateExTungsit)">
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </div>
              </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
          <v-row>
            <v-col clos="6" md="4" sm="4">
              <v-radio-group inline v-model="h_VICIVLE_GLASS">
                <v-row class="pl-3">
                  <span>ນໍ້າມັນລົດໃຊ້</span>
                  <Width />
                  <v-radio label="* ແອັດຊັງ" color="red" value="ແອັດຊັງ"></v-radio>
                  <Width />
                  <v-radio label="* ກະຊວນ" color="green" value="ກະຊວນ"></v-radio>
                </v-row>
              </v-radio-group>

              <div class="tops">
              </div>
            </v-col>
          </v-row>
          <Height />
          <Height />
          <Height />
          <v-divider></v-divider>
          <Height />
          <Height />
          <div>
            <span style="font-size:20px">ຂໍ້ມູນຢາງລົດ:</span>
            <div class="d-flex">
              <div class="pt-3 pl-3">
                <v-row>
                  <v-radio-group inline v-model="chooseCarType">
                    <v-row class="pl-3">
                      <span>ເລືອກປະເພດລົດ:</span>
                      <Width />
                      <v-radio label="* ລົດ 11 ລໍ້" value="10" class="mt-1"></v-radio>
                      <Width />
                      <v-radio label="* ລົດ 13 ລໍ້" value="12"></v-radio>
                    </v-row>
                  </v-radio-group>
                </v-row>
              </div>
              <div class="pl-10">
                <v-text-field label="ຢີ່ຫໍ້ຢາງລົດ"outlined dense flat solo background-color="#f5f5f5" v-model="brand_wheel_car">
                </v-text-field>
              </div>
            </div>
            <Height />
            <Height />
            <div class="d-flex align-center">
              <div style="width:100%">
                <!-- Left -->
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="px-2">
                  <div class="d-flex">
                    <v-text-field :rules="nameRules" rounded background-color="#fff" dense label="* ລະຫັດຢາງລົດ"
                      v-model="ll_TIRE_NO_1"></v-text-field>
                    <v-text-field :rules="nameRules" rounded background-color="#fff" dense label="* ວັນທີປ່ຽນຢາງ"
                      v-model="ll_TIRE_DATE_1"></v-text-field>
                    <v-text-field :rules="nameRules" rounded background-color="#fff" dense label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="ll_TIRE_KM_1"></v-text-field>
                  </div>
                  <div class="d-flex">
                    <div style="width:100%"><v-text-field style="margin-top:-10px" :rules="nameRules" rounded
                        background-color="#fff" dense label="* ເລກໄມລ່າສຸດ" v-model="h_KM1"></v-text-field></div>
                    <div style="width:100%"><v-text-field style="margin-top:-10px" :rules="nameRules" rounded
                        background-color="#fff" dense label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_1"></v-text-field>
                    </div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div v-if="chooseCarType === '12'"
                  style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="mt-1 px-2">
                  <div class="d-flex" style="margin-top:-0px">
                    <v-text-field :rules="nameRules" rounded background-color="#fff" dense label="* ລະຫັດຢາງລົດ"
                      v-model="ll_TIRE_NO_2"></v-text-field>
                    <v-text-field :rules="nameRules" rounded background-color="#fff" dense label="* ວັນທີປ່ຽນຢາງ"
                      v-model="ll_TIRE_DATE_2"></v-text-field>
                    <v-text-field :rules="nameRules" rounded background-color="#fff" dense label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="ll_TIRE_KM_2"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM2"></v-text-field></div>
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_2"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="mt-1 px-2">
                  <div style="padding-top: 0px" class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="ll_TIRE_NO_3"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="ll_TIRE_DATE_3"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="ll_TIRE_KM_3"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM3"></v-text-field></div>
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_3"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="mt-1 px-2">
                  <div class="d-flex" style="margin-top: 0px">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="ll_TIRE_NO_4"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="ll_TIRE_DATE_4"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="ll_TIRE_KM_4"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM4"></v-text-field></div>
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_4"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="mt-1 px-2">
                  <div style="padding-top: 0px" class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="ll_TIRE_NO_5"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="ll_TIRE_DATE_5"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="ll_TIRE_KM_5"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM5"></v-text-field></div>
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_5"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="mt-1 px-2">
                  <div style="margin-top: 0px" class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="ll_TIRE_NO_6"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="ll_TIRE_DATE_6"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="ll_TIRE_KM_6"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM6"></v-text-field></div>
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_6"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>

              </div>

              <div class="text-center">
                <img v-if="chooseCarType === '10'" class="mx-auto" src="../assets/images/head10.png" width="150"
                  height="390" />
                <img v-if="chooseCarType === '12'" class="mx-auto" src="../assets/images/head12.png" width="150"
                  height="400" />
              </div>
              <!-- Right -->
              <div style="width:100%">
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="px-2">
                  <div class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="r_TIRE_NO_1"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="r_TIRE_DATE_1"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="r_TIRE_KM_1"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM7"></v-text-field></div>
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_7"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>

                <!-- =========12 los========== -->
                <div v-if="chooseCarType === '12'"
                  style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="px-2 mt-1">
                  <div class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="r_TIRE_NO_2"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="r_TIRE_DATE_2"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="r_TIRE_KM_2"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM8"></v-text-field></div>
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_8"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <!-- /////////////////////////////// -->
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="px-2 mt-1">
                  <div class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="r_TIRE_NO_3"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="r_TIRE_DATE_3"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="r_TIRE_KM_3"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM9"></v-text-field></div>
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_9"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="px-2 mt-1">
                  <div class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="r_TIRE_NO_4"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="r_TIRE_DATE_4"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="r_TIRE_KM_4"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM10"></v-text-field></div>
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_10"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="px-2 mt-1">
                  <div class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="r_TIRE_NO_5"></v-text-field>

                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="r_TIRE_DATE_5"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="r_TIRE_KM_5"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM11"></v-text-field></div>
                    <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_11"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>
                <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="px-2 mt-1">
                  <div style="margin-top: 0px" class="d-flex">
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ລະຫັດຢາງລົດ"
                      v-model="r_TIRE_NO_6"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                      v-model="r_TIRE_DATE_6"></v-text-field>
                    <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                      v-model="r_TIRE_KM_6"></v-text-field>
                  </div>
                  <div class="d-flex" style="margin-top:-12px">
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມລ່າສຸດ" v-model="h_KM12"></v-text-field></div>
                    <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                        label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_12"></v-text-field></div>
                    <div style="width:100%"></div>
                  </div>
                </div>

              </div>
            </div>
            <div style="background-color:#f2ebeb;height:80px;padding-top:5px;border-radius:5px" class="mt-1 px-2">
              <div style="margin-top: 0px" class="d-flex">
                <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* 11ລະຫັດຢາງລົດ"
                  v-model="r_TIRE_NO_7"></v-text-field>

                <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ວັນທີປ່ຽນຢາງ"
                  v-model="r_TIRE_DATE_7"></v-text-field>
                <v-text-field :rules="nameRules" rounded dense background-color="#fff" label="* ກຳນົດແລ່ນໄດ້ km"
                  v-model="r_TIRE_KM_7"></v-text-field>
              </div>
              <div class="d-flex" style="margin-top:-12px">
                <div style="width:100%"><v-text-field :rules="nameRules" rounded dense background-color="#fff"
                    label="* ເລກໄມລ່າສຸດ" v-model="h_KM13"></v-text-field></div>
                <div style="width:100%"> <v-text-field :rules="nameRules" rounded dense background-color="#fff"
                    label="* ເລກໄມປະຈຸບັນ" readonly v-model="h_KML_13"></v-text-field></div>
                <div style="width:100%"></div>
              </div>
            </div>
          </div>
        </v-form>

        <Height />
        <Height />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" elevation="0" @click="onClearData">
            <v-icon color="white">mdi-close</v-icon>
            <span class="white--text">ລ້າງຂໍ້ມູນ</span>
          </v-btn>
          <v-btn elevation="0" color="#448AFF" @click="onInserTruct">
            <v-icon color="white">mdi-check</v-icon>
            <span class="white--text">ບັນທຶກ</span>
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

    <Height />
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
      kim_KM: '',
      h_LEK_NUMMUNKHG: '',
      nameRules: [
        v => !!v || 'ປ້ອນຂໍ້ມູນ',
      ],
      loading_processing: false,
      chooseCarType: '10',
      valid: true,
      nameRules: [(v) => !!v || ''],
      // state save data
      imageaddcar: null,
      h_VICIVLE_GLASS: 'ກະຊວນ',
      h_VICIVLE_NUMBER: '',
      h_VICIVLE_GALATY: '',
      start_galaty: false,
      h_VICIVLE_DATE_GALATY: null,
      end_date: false,
      END_DATE_REGISCAR: null,
      date_change_lean: null,
      exHangMar: '',
      COLOR_CAR: '',
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
      //start and end bat
      start_bat: false,
      end_bat: false,
      end_tungsit: false,
      start_bat_date: null,
      end_bat_date: null,
      dateExTungsit:'',
      exCarDate: null,
      end_cardate: null,
      h_VICIVLE_BGTOM: '',
      exCarColor: '',
      h_VICIVLE_JANLARK: '',
      h_VICIVLE_FAINAR: '',
      h_VICIVLE_FAITHAIY: '',
      h_VICIVLE_FAIYKHANG: '',
      h_VICIVLE_VENMONGNAR: '',
      h_VICIVLE_VENMONGLHG: '',
      h_VICIVLE_VENKHANG: '',
      h_LEK_NUMMUNKHG: '',
      //add new
      saiystay: '',
      galick: '',
      leanGia: '',
      leanFuengThaiy: '',
      lektungsit: '',
      status_use_unuse_car:'run',
      comment:null,
      brand_wheel_car:'',
      pha_But: '',
      //add new
      kim_KM: '',
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
      r_TIRE_KM_2: 0.0,
      r_TIRE_KM_3: '',
      r_TIRE_KM_4: '',
      r_TIRE_KM_5: '',
      r_TIRE_KM_6: '',
      ll_TIRE_NO_1: '',
      ll_TIRE_NO_2: '',
      ll_TIRE_NO_5: '',
      ll_TIRE_KM_1: '',
      ll_TIRE_NO_4: '',
      ll_TIRE_NO_7: '',
      ll_TIRE_DATE_1: '',
      ll_TIRE_DATE_3: '',
      ll_TIRE_DATE_5: '',
      ll_TIRE_KM_2: 0.0,
      ll_TIRE_NO_3: '',
      ll_TIRE_NO_6: '',
      ll_TIRE_DATE_2: '',
      ll_TIRE_KM_3: '',
      ll_TIRE_DATE_6: '',
      ll_TIRE_DATE_4: '',
      ll_TIRE_KM_6: '',
      ll_TIRE_KM_4: '',
      ll_TIRE_KM_5: '',
      lL_TIRE_DATE_7: '',
      lL_TIRE_KM_7: '',
      r_TIRE_KM_7: '',
      r_TIRE_DATE_7: '',
      r_TIRE_NO_7: '',

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
      h_KM13: '',
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
      IMAGE_TRUK: '',

      morfai_data_list: [],
      morfai_data_list_2: [],

      modalMorfai: '',
      sizeMorfai: '',
      serviceLife: '',
      imageBatery: '',
      keyId: '',

    }
  },
  watch: {
    kim_KM: function (value) {
      if (parseFloat(value?.split(',').join('')) >= parseFloat(this.h_LEK_NUMMUNKHG?.split(',').join(''))) {
        this.alert = true
      } else {
        this.alert = false
      }
      const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.kim_KM = result
      this.h_KML_1 = result
      if (this.chooseCarType === '12') {
        this.h_KML_2 = result
        this.h_KML_8 = result
      }
      this.h_KML_3 = result
      this.h_KML_4 = result
      this.h_KML_5 = result
      this.h_KML_6 = result
      this.h_KML_7 = result
      this.h_KML_9 = result
      this.h_KML_10 = result
      this.h_KML_11 = result
      this.h_KML_12 = result
      this.h_KML_13 = result
    },

    h_LEK_NUMMUNKHG: function (value) {

      const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.h_LEK_NUMMUNKHG = result
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
    ll_TIRE_KM_7: function (value) {
      const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.ll_TIRE_KM_7 = result
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
    r_TIRE_KM_7: function (value) {
      const result = value?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.r_TIRE_KM_7 = result
    },
  },
  mounted() {
    this.onGetmorfaiList()
  },
  methods: {
    calculateH_LEK_NUMMUNKHG() {
      const kimKMValue = parseFloat(this.kim_KM.split(',').join(''));
      const calculatedValue = kimKMValue + 40000;
      this.h_LEK_NUMMUNKHG = calculatedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
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

    onGetmorfaiDetails(id) {
      let data = this.morfai_data_list.filter((el => el.keyId === id));
      this.modalMorfai = data[0]?.modalMorfai
      this.sizeMorfai = data[0]?.sizeMorfai
      this.serviceLife = data[0]?.serviceLife
      this.imageBatery = data[0]?.imageBatery
      this.keyId = data[0]?.keyId
    },

    async onGetmorfaiList() {
      try {
        await this.$axios.$post('getBateryAll', {
          toKen: localStorage.getItem('toKen'),
          keyId: ""
        }).then((data) => {
          if (data?.status == '00') {
            this.morfai_data_list = data?.data
            console.log('morfai_data_list:', data)
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
        formdata.append('files', this.imageaddcar)
        formdata.append('h_VICIVLE_NUMBER', this.h_VICIVLE_NUMBER)
        formdata.append('h_VICIVLE_GALATY', this.h_VICIVLE_GALATY)
        formdata.append('h_VICIVLE_DATE_GALATY', this.h_VICIVLE_DATE_GALATY)
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
        formdata.append('h_VICIVLE_VENMONGLHG', this.h_VICIVLE_VENMONGLHG)
        formdata.append('h_VICIVLE_VENKHANG', this.h_VICIVLE_VENKHANG)
        formdata.append('h_VICIVLE_GLASS', this.h_VICIVLE_GLASS)
        formdata.append('lL_TIRE_NO_1', this.ll_TIRE_NO_1)
        formdata.append('lL_TIRE_NO_2', this.ll_TIRE_NO_2)
        formdata.append('lL_TIRE_NO_3', this.ll_TIRE_NO_3)
        formdata.append('lL_TIRE_NO_4', this.ll_TIRE_NO_4)
        formdata.append('lL_TIRE_NO_5', this.ll_TIRE_NO_5)
        formdata.append('lL_TIRE_NO_6', this.ll_TIRE_NO_6)
        formdata.append('lL_TIRE_NO_7', this.r_TIRE_NO_7)
        formdata.append('lL_TIRE_DATE_1', this.ll_TIRE_DATE_1)
        formdata.append('lL_TIRE_DATE_2', this.ll_TIRE_DATE_2)
        formdata.append('lL_TIRE_DATE_3', this.ll_TIRE_DATE_3)
        formdata.append('lL_TIRE_DATE_4', this.ll_TIRE_DATE_4)
        formdata.append('lL_TIRE_DATE_5', this.ll_TIRE_DATE_5)
        formdata.append('lL_TIRE_DATE_6', this.ll_TIRE_DATE_6)
        formdata.append('lL_TIRE_DATE_7', this.r_TIRE_DATE_7)
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
        //add new
        formdata.append('saiystay', this.saiystay)
        formdata.append('galick', this.galick)
        formdata.append('leanGia', this.leanGia)
        formdata.append('leanFuengThaiy', this.leanFuengThaiy)
        formdata.append('lektungsit', this.lektungsit)
        formdata.append('status_use_unuse_car', this.status_use_unuse_car)
        formdata.append('comment', this.comment)
        formdata.append('brand_wheel_car', this.brand_wheel_car)
        formdata.append('pha_But', this.pha_But)
        formdata.append('date_change_lean', this.formattedDate || "0000-00-00")
        formdata.append('toKen', localStorage.getItem("toKen"))

        // let data = {

        //   h_VICIVLE_NUMBER: this.h_VICIVLE_NUMBER,
        //   h_VICIVLE_GALATY: this.h_VICIVLE_GALATY,
        //   h_VICIVLE_DATE_GALATY: this.h_VICIVLE_DATE_GALATY,
        //   h_VICIVLE_TNGLOD: this.h_VICIVLE_TNGLOD,
        //   h_VICIVLE_BRANCH: this.h_VICIVLE_BRANCH,
        //   h_VICIVLE_YEARLEVEL: this.h_VICIVLE_YEARLEVEL,
        //   h_VICIVLE_BRANCHTYPE: this.h_VICIVLE_BRANCHTYPE,
        //   h_VICIVLE_DATEEXPRIRE: this.h_VICIVLE_DATEEXPRIRE,
        //   h_VICIVLE_LEKJUK: this.h_VICIVLE_LEKJUK,
        //   h_VICIVLE_LEKTHUNG: this.h_VICIVLE_LEKTHUNG,
        //   h_VICIVLE_GPS: this.h_VICIVLE_GPS,
        //   h_VICIVLE_POYPUDNUMFON: this.h_VICIVLE_POYPUDNUMFON,
        //   h_VICIVLE_MORFAI: this.h_VICIVLE_MORFAI,
        //   //insert start and end bat
        //   bat_StartDate: this.start_bat_date,
        //   bat_EndDate: this.end_bat_date,
        //   //////
        //   h_VICIVLE_BGTOM: this.h_VICIVLE_BGTOM,
        //   h_VICIVLE_JANLARK: this.h_VICIVLE_JANLARK,
        //   h_VICIVLE_FAINAR: this.h_VICIVLE_FAINAR,
        //   h_VICIVLE_FAITHAIY: this.h_VICIVLE_FAITHAIY,
        //   h_VICIVLE_FAIYKHANG: this.h_VICIVLE_FAIYKHANG,
        //   h_VICIVLE_VENMONGNAR: this.h_VICIVLE_VENMONGNAR,
        //   h_VICIVLE_VENMONGLHG: this.h_VICIVLE_VENMONGLHG,
        //   h_VICIVLE_VENKHANG: this.h_VICIVLE_VENKHANG,
        //   h_VICIVLE_GLASS: this.h_VICIVLE_GLASS,
        //   h_LEK_NUMMUNKHG: this.h_LEK_NUMMUNKHG,
        //   kim_KM: this.kim_KM,
        //   r_TIRE_NO_1: this.r_TIRE_NO_1,
        //   r_TIRE_NO_2: this.r_TIRE_NO_2,
        //   r_TIRE_NO_3: this.r_TIRE_NO_3,
        //   r_TIRE_NO_4: this.r_TIRE_NO_4,
        //   r_TIRE_NO_5: this.r_TIRE_NO_5,
        //   r_TIRE_NO_6: this.r_TIRE_NO_6,
        //   r_TIRE_DATE_1: this.r_TIRE_DATE_1,
        //   r_TIRE_DATE_2: this.r_TIRE_DATE_2,
        //   r_TIRE_DATE_3: this.r_TIRE_DATE_3,
        //   r_TIRE_DATE_4: this.r_TIRE_DATE_4,
        //   r_TIRE_DATE_5: this.r_TIRE_DATE_5,
        //   r_TIRE_DATE_6: this.r_TIRE_DATE_6,
        //   r_TIRE_KM_1: this.r_TIRE_KM_1,
        //   r_TIRE_KM_2: this.r_TIRE_KM_2,
        //   r_TIRE_KM_3: this.r_TIRE_KM_3,
        //   r_TIRE_KM_4: this.r_TIRE_KM_4,
        //   r_TIRE_KM_5: this.r_TIRE_KM_5,
        //   r_TIRE_KM_6: this.r_TIRE_KM_6,
        //   ll_TIRE_NO_1: this.ll_TIRE_NO_1,
        //   ll_TIRE_NO_2: this.ll_TIRE_NO_2,
        //   ll_TIRE_NO_5: this.ll_TIRE_NO_5,
        //   ll_TIRE_KM_1: this.ll_TIRE_KM_1,
        //   ll_TIRE_NO_4: this.ll_TIRE_NO_4,
        //   ll_TIRE_DATE_1: this.ll_TIRE_DATE_1,
        //   ll_TIRE_DATE_3: this.ll_TIRE_DATE_3,
        //   ll_TIRE_DATE_5: this.ll_TIRE_DATE_5,
        //   ll_TIRE_KM_2: this.ll_TIRE_KM_2,
        //   ll_TIRE_NO_3: this.ll_TIRE_NO_3,
        //   ll_TIRE_NO_6: this.ll_TIRE_NO_6,
        //   ll_TIRE_DATE_2: this.ll_TIRE_DATE_2,
        //   ll_TIRE_KM_3: this.ll_TIRE_KM_3,
        //   ll_TIRE_DATE_6: this.ll_TIRE_DATE_6,
        //   ll_TIRE_DATE_4: this.ll_TIRE_DATE_4,
        //   ll_TIRE_KM_6: this.ll_TIRE_KM_6,
        //   ll_TIRE_KM_4: this.ll_TIRE_KM_4,
        //   ll_TIRE_KM_5: this.ll_TIRE_KM_5,
        //   h_KM1: this.h_KM1,
        //   h_KM2: this.h_KM2,
        //   h_KM3: this.h_KM3,
        //   h_KM4: this.h_KM4,
        //   h_KM5: this.h_KM5,
        //   h_KM6: this.h_KM6,
        //   h_KM7: this.h_KM7,
        //   h_KM8: this.h_KM8,
        //   h_KM9: this.h_KM9,
        //   h_KM10: this.h_KM10,
        //   h_KM11: this.h_KM11,
        //   h_KM12: this.h_KM12,
        //   //right last and now
        //   h_KML_1: this.h_KML_1,
        //   h_KML_2: this.h_KML_2,
        //   h_KML_3: this.h_KML_3,
        //   h_KML_4: this.h_KML_4,
        //   h_KML_5: this.h_KML_5,
        //   h_KML_6: this.h_KML_6,
        //   h_KML_7: this.h_KML_7,
        //   h_KML_8: this.h_KML_8,
        //   h_KML_9: this.h_KML_9,
        //   h_KML_10: this.h_KML_10,
        //   h_KML_11: this.h_KML_11,
        //   h_KML_12: this.h_KML_12

        // }
        // console.log('Data Send:', data)
        // return;
        await this.$axios.$post('/saveVicicleHeaderByID.service', formdata).then((data) => {
          console.log("saveStatus:", data)
          if (data?.status == '00') {
            this.loading_processing = false
            swal.fire({
              title: 'ສຳເລັດ',
              icon: 'success',
              allowOutsideClick: false,
            })
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
      setTimeout(() => this.h_VICIVLE_GLASS = 'ກະຊວນ', 1000)
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

.tops1 {
  margin-top: -20px;
  font-size: 12px;
}

.preview-image {
  width: 300px;
  height: 200px;
}
</style>

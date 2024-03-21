<template>
  <v-card padding-top="1" height="640" width="2000" class="mx-auto">
      <v-row>
          <v-col cols="2">
              <v-navigation-drawer permanent :active="active">


                  <v-list-item>
                      <v-list-item-content>

                          <v-card-title style="background-color:#E57373;color:white ">ສາງ</v-card-title>

                      </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>

                  <v-list dense nav>
                      <v-list-item v-for="item in items" :key="item.title" link @click="page = item?.page"
                          :style="{ 'background-color': page === item?.page ? '#CFD8DC' : 'white' }">
                          <v-list-item-icon>
                              <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                              <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>
                  </v-list>
              </v-navigation-drawer>
          </v-col>
          <!-- Page all -->
          <v-col>
              <div v-if="page === 1">
                  <span>ເພີ່ມຜູ້ສະໜອງ</span>
                  <v-col>
                      <v-vol class="d-flex align-center">
                          <v-col clos="1" md="3" sm="3">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                          <v-col clos="1" md="3" sm="3">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                      </v-vol>
                      <v-vol class="d-flex align-center">
                          <v-col clos="1" md="3" sm="3">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                          <v-col clos="1" md="3" sm="3">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                      </v-vol>
                      <v-vol clos="1" md="5" sm="5">
                          <v-btn elevation="0" color="green" @click="onInserTruct">
                              <v-icon color="white">mdi-check</v-icon>
                              <span class="white--text">ບັນທຶກ</span>
                          </v-btn>
                      </v-vol>
                  </v-col>
                  <v-data-table>
                  </v-data-table>

              </div>
              <!-- page2 -->
              <!-- ເພີ່ມລາຍຈ່າຍ -->
              <div v-if="page === 2">
                  <v-vol>


                      <span>ລາຍການສິນຄ້າ</span>



                      <v-data-table>
                      </v-data-table>
                  </v-vol>
              </div>
              <!-- ເພີ່ມປະເພດລາຍຈ່າຍ -->
              <div v-if="page === 3">

                  <v-col>
                      <v-vol class="d-flex align-center">
                          <v-col clos="1" md="3" sm="3">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                          <v-col clos="1" md="3" sm="3">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                      </v-vol>
                      <v-vol class="d-flex align-center">
                          <v-vol clos="1" md="3" sm="3">
                              <v-btn elevation="0" color="green" @click="onInserTruct">
                                  <v-icon color="white">mdi-check</v-icon>
                                  <span class="white--text">ບັນທຶກ</span>
                              </v-btn>
                          </v-vol>
                      </v-vol>
                  </v-col>

              </div>
              <div v-if="page === 4">
                  <v-vol>
                      <c-card>
                          <v-vol>

                              <span>ລາຍງານລາຍຈ່າຍ</span>
                          </v-vol>
                          <v-vol class="tops" style="display:flex; align-items:flex-start;">
                              <V-vol class="align-center">

                                  <span>ເພີ່ມສິນຄ້າ</span>
                                  <v-vol class="tops" style="display:flex; align-items:flex-start;">
                                      <V-vol class="d-flex align-center">
                                          <div>
                                              <v-row>
                                                  <v-col clos="1" md="10" sm="10">
                                                      <v-autocomplete outlined dense label="ເລືອກປະເພດລົດ"
                                                          :items="morfai_data_list" item-text="batNo" item-value="keyId"
                                                          background-color="#f5f5f5" @change="onGetmorfaiDetails"
                                                          :rules="nameRules"></v-autocomplete>
                                                  </v-col>
                                              </v-row>

                                          </div>
                                          <div>
                                              <v-row>
                                                  <v-col clos="1" md="10" sm="10">
                                                      <v-autocomplete outlined dense label="ເລືອກທະບຽນລົດ"
                                                          :items="morfai_data_list" item-text="batNo" item-value="keyId"
                                                          background-color="#f5f5f5" @change="onGetmorfaiDetails"
                                                          :rules="nameRules"></v-autocomplete>
                                                  </v-col>
                                              </v-row>

                                          </div>
                                      </V-vol>
                                  </v-vol>
                                  <v-vol class="tops" style="display:flex; align-items:flex-start;">
                                      <V-vol class="d-flex align-center">
                                          <div>
                                              <v-row>
                                                  <v-col clos="1" md="10" sm="10">
                                                      <v-autocomplete outlined dense label="ເລືອກປະເພດລົດ"
                                                          :items="morfai_data_list" item-text="batNo" item-value="keyId"
                                                          background-color="#f5f5f5" @change="onGetmorfaiDetails"
                                                          :rules="nameRules"></v-autocomplete>
                                                  </v-col>
                                              </v-row>

                                          </div>
                                          <div>
                                              <v-row>
                                                  <v-col clos="1" md="10" sm="10">
                                                      <v-autocomplete outlined dense label="ເລືອກທະບຽນລົດ"
                                                          :items="morfai_data_list" item-text="batNo" item-value="keyId"
                                                          background-color="#f5f5f5" @change="onGetmorfaiDetails"
                                                          :rules="nameRules"></v-autocomplete>
                                                  </v-col>
                                              </v-row>

                                          </div>
                                      </V-vol>

                                  </v-vol>
                                  <v-col>
                                      <v-vol class="d-flex align-center">
                                          <v-col clos="1" md="6" sm="6">
                                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                                  :rules="nameRules"></v-text-field>
                                          </v-col>
                                          <v-col clos="1" md="6" sm="6">
                                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                                  :rules="nameRules"></v-text-field>
                                          </v-col>
                                      </v-vol>
                                      <v-vol class="d-flex align-center">
                                          <v-col clos="1" md="6" sm="6">
                                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                                  :rules="nameRules"></v-text-field>
                                          </v-col>
                                          <v-vol clos="1" md="5" sm="5">
                                              <v-btn elevation="0" color="green" @click="onInserTruct">
                                                  <v-icon color="white">mdi-check</v-icon>
                                                  <span class="white--text">ບັນທຶກ</span>
                                              </v-btn>
                                          </v-vol>
                                      </v-vol>
                                  </v-col>
                              </V-vol>

                          </v-vol>
                      </c-card>
                  </v-vol>

              </div>
              <div v-if="page === 5">
                  <v-vol>
                      <c-card>
                          <v-vol>
                              ສົງອອກ

                          </v-vol>
                          <v-col>
                              <v-vol class="align-center">
                                  <v-row>
                                      <v-col clos="1" md="6" sm="6">
                                          <v-autocomplete outlined dense label="ເລືອກປະເພດລົດ" :items="morfai_data_list"
                                              item-text="batNo" item-value="keyId" background-color="#f5f5f5"
                                              @change="onGetmorfaiDetails" :rules="nameRules"></v-autocomplete>
                                      </v-col>
                                  </v-row>
                                  <v-col clos="1" md="6" sm="6">
                                      <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                          :rules="nameRules"></v-text-field>
                                  </v-col>
                              </v-vol>
                              <v-vol class="d-flex align-center">
                                  <v-vol clos="1" md="5" sm="5">
                                      <v-btn elevation="0" color="green" @click="onInserTruct">
                                          <v-icon color="white">mdi-check</v-icon>
                                          <span class="white--text">ບັນທຶກ</span>
                                      </v-btn>
                                  </v-vol>
                              </v-vol>
                          </v-col>

                      </c-card>
                  </v-vol>

              </div>
              <div v-if="page === 6">
                  <v-vol>
                      <c-card>
                          <v-vol>
                              ສັງຊື້

                          </v-vol>
                          <v-row>
                              <v-col clos="1" md="6" sm="6">
                                  <v-autocomplete outlined dense label="ເລືອກປະເພດລົດ" :items="morfai_data_list"
                                      item-text="batNo" item-value="keyId" background-color="#f5f5f5"
                                      @change="onGetmorfaiDetails" :rules="nameRules"></v-autocomplete>
                              </v-col>
                          </v-row>
                          <v-col clos="1" md="6" sm="6">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                          <v-col clos="1" md="6" sm="6">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                          <v-col clos="1" md="6" sm="6">
                              <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                  :rules="nameRules"></v-text-field>
                          </v-col>
                          <v-vol class="d-flex align-center">
                              <v-vol clos="1" md="5" sm="5">
                                  <v-btn elevation="0" color="green" @click="onInserTruct">
                                      <v-icon color="white">mdi-check</v-icon>
                                      <span class="white--text">ບັນທຶກ</span>
                                  </v-btn>
                              </v-vol>
                          </v-vol>
                      </c-card>
                  </v-vol>

              </div>
          </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
      return {
          // for page3
          expense_headers: [
              { text: 'ຊື່ປະເພດລາຍຈ່າຍ', value: 'typeName' },
              { text: '', value: '' },
              { text: '', value: '' }
          ],
          expense_list: [],
          typeName: '',
          checkbtn: false,
          key_up: '',

          // for page 2
          start_menu: false,
          dateSave: null,
          start_menu1: false,
          dateSave1: null,
          updateDia: false,
          expense_list: [],
          expense_header: [
              { text: 'ປະເພດຄ່າໃຊຈ່າຍ', value: 'exPType' },
              { text: 'ຈຳນວນ', value: 'amount' },
              { text: 'ຈຳນວນເງິນ', value: 'perAmount' },
              { text: 'ຈຳນວນເງິນທັງໝົດ', value: 'toTal' },
              { text: 'ວັນທີບັນທຶກ', value: 'cdate' },
              { text: 'ວັນທີຈ່າຍຄ່າ', value: 'cdate' },
              { text: '', value: '' },
              { text: '', value: '' },
          ],
          form: {},
          expense_list_type: [],
          type: '',
          totalAmount: '',
          perAmount: '',
          amount: '',
          type1: '',
          totalAmount1: '',
          perAmount1: '',
          amount1: '',
          valid: true,
          nameRules: [(v) => !!v || 'ຕ້ອງມີຂໍ້ມູນ'],
          key_up: '',
          list_expense_type_for_up: [],

          // for side bar menu   

          items: [
              { title: 'ເພີ່ມຜູ້ສະໜອງ', icon: 'mdi-archive-plus', page: 1 },
              { title: 'ລາຍການສິນຄ້າ', icon: 'mdi-clipboard-list', page: 2 },
              { title: 'ເພີ່ມສິນຄ້າ', icon: 'mdi-clipboard-plus-outline', page: 3 },
              { title: 'ນໍາເຂົ້າ', icon: 'mdi-archive-arrow-down-outline', page: 4 },
              { title: 'ນໍາອອກ', icon: 'mdi-archive-arrow-up-outline', page: 5 },
              { title: 'ສັ່ງຊື້', icon: 'mdi-currency-usd', page: 6 },

          ],
          right: null,
          page: 1


      }
  },

  mounted() {
      this.onGetAll()
      this.onGetExpenseTypeAll()
      this.onGetExpense()
  },
  watch: {
      amount: function (newValue) {
          const real_total = parseInt(newValue?.split(',').join('')) * parseInt(this.perAmount ? this.perAmount?.split(',').join('') : 1);
          this.totalAmount = (real_total)?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          const result = newValue?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.amount = result
      },
      perAmount: function (newValue) {
          const real_total = parseInt(newValue?.split(',').join('')) * parseInt(this.amount ? this.amount?.split(',').join('') : 1);
          this.totalAmount = (real_total)?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          const result = newValue?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.perAmount = result;
      },
      amount1: function (newValue) {
          const real_total = parseInt(newValue?.split(',').join('')) * parseInt(this.perAmount1 ? this.perAmount1?.split(',').join('') : 1);
          this.totalAmount1 = (real_total)?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          const result = newValue?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.amount1 = result
      },
      perAmount1: function (newValue) {
          const real_total = parseInt(newValue?.split(',').join('')) * parseInt(this.amount1 ? this.amount1?.split(',').join('') : 1);
          this.totalAmount1 = (real_total)?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          const result = newValue?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.perAmount1 = result;
      },
  },
  methods: {
      // for page2
      onSave() {
          if (!this.$refs.form.validate()) return null
          let data = {
              exPType: this.type,
              toTal: this.totalAmount?.split(',').join(''),
              perAmount: this.perAmount?.split(',').join(''),
              amount: this.amount?.split(',').join(''),
              expDate: this.dateSave
          }
          try {
              this.$axios.$post('/storeExpenses.service', data).then((data) => {
                  if (data?.status === '00') {
                      this.$toast.success('ສຳເລັດແລ້ວ')
                      this.onGetExpense()
                      this.$refs.form.reset();
                  } else {
                      swal.fire({
                          icon: 'error',
                          text: data?.message
                      })
                  }
              })
          } catch (error) {
              console.log(error)
          }
      },
      onGetExpenseTypeAll() {
          try {
              this.$axios.$post('/getExpensesTypeAll.service').then((data) => {
                  this.expense_list_type = data?.data
              })
          } catch (error) {
              console.log(error)
          }
      },
      onGetExpense() {
          try {
              this.$axios.$post('/getExpensesAll.service').then((data) => {
                  this.expense_list = data?.data
              })
          } catch (error) {
              console.log(error)
          }
      },
      onGetDaForUp(key_id, exPType, amount, perAmount, toTal, date) {
          this.list_expense_type_for_up = this.expense_list_type.map((list) => {
              return list?.typeName
          })
          this.key_up = key_id
          this.type1 = exPType
          this.amount1 = amount
          this.perAmount1 = perAmount
          this.totalAmount1 = toTal
          this.dateSave1 = date
          this.updateDia = true
      },
      onDelete(key) {
          try {
              let data = {
                  key_id: key
              }
              this.$axios.$post('/storeExpensesDel.service', data).then((data) => {
                  if (data?.status === '00') {
                      this.$toast.success('ສຳເລັດແລ້ວ')
                      this.onGetExpense()
                  }
              })
          } catch (error) {
              console.log(error)
          }
      },
      onUpdate() {
          let datas = this.expense_list_type.filter((el) => el.typeName === this.type1);

          let data = {
              key_id: this.key_up,
              exPType: datas[0]?.key_id,
              toTal: this.totalAmount1?.split(',').join(''),
              perAmount: this.perAmount1?.split(',').join(''),
              amount: this.amount1?.split(',').join(''),
              exPName: '',
              expDate: this.dateSave1

          }
          console.log("send===", data)

          try {
              this.$axios.$post('/storeExpensesUpdate.service', data).then((data) => {

                  if (data?.status === '00') {
                      this.$toast.success('ສຳເລັດແລ້ວ')
                      this.onGetExpense()
                      this.updateDia = false
                  } else {
                      swal.fire({
                          icon: 'error',
                          text: data?.message
                      })
                  }
              })
          } catch (error) {
              console.log(error)
          }
      },
      // for page3

      onGetforUp(id, name) {
          this.key_up = id;
          this.typeName = name;
          this.checkbtn = true
      },
      onUpdate() {
          let data = {
              key_id: this.key_up,
              typeName: this.typeName
          }
          try {
              this.$axios.$post('/storeExpensesTypeUpdate.service', data).then((data) => {
                  if (data?.status === '00') {
                      this.onGetAll()
                      this.$toast.success('ສຳເລັດ')
                      this.typeName = ''
                      this.checkbtn = false
                  }
              })
          } catch (error) {
              console.log(error)
          }
      },
      onDelete(key) {
          try {
              let data = {
                  key_id: key
              }
              this.$axios.$post('/storeExpensesTypeDel.service', data).then((data) => {
                  if (data?.status === '00') {
                      this.$toast.success('ສຳເລັດ')
                      this.onGetAll()
                  }
              })
          } catch (error) {
              console.log(error)
          }
      },
      onSave() {
          try {
              let data = {
                  typeName: this.typeName
              }
              this.$axios.$post('/storeExpensesType.service', data).then((data) => {
                  if (data?.status === '00') {
                      console.log("data", data)
                      this.$toast.success('ສຳເລັດ')
                      this.onGetAll()
                      this.typeName = ''
                  }
              })
          } catch (error) {
              console.log(error)
          }
      },
      onGetAll() {
          try {
              this.$axios.$post('/getExpensesTypeAll.service').then((data) => {
                  this.expense_list = data?.data
                  console.log('all====', data?.data)
              })
          } catch (error) {
              console.log(error)
          }
      }
  }

}
</script>
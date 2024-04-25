<template>
    <v-card padding-top="1" height="640" width="2000" class="mx-auto">
        <v-row>
            <v-col cols="2">
                <v-navigation-drawer permanent :active="active">
  
  
                    <v-list-item>
                        <v-list-item-content>
  
                            <v-card-title style="background-color:#E57373;color:white ">ໜ້າສ້ອມເເປງ</v-card-title>
  
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
            <v-col class="mt-10">
                <div v-if="page === 1">
                    <c-card>
                        <v-vol class="tops" style="display:flex; align-items:flex-start;">
                            <V-vol class="d-flex align-center">
                                <div>
                                    <v-row>
                                        <v-col clos="1" md="10" sm="10">
                                            <v-autocomplete outlined dense label="ເລືອກປະເພດລົດ" :items="morfai_data_list"
                                                item-text="batNo" item-value="keyId" background-color="#f5f5f5"
                                                @change="onGetmorfaiDetails" :rules="nameRules"></v-autocomplete>
                                        </v-col>
                                    </v-row>
  
                                </div>
                                <div>
                                    <v-row>
                                        <v-col clos="1" md="10" sm="10">
                                            <v-autocomplete outlined dense label="ເລືອກທະບຽນລົດ" :items="morfai_data_list"
                                                item-text="batNo" item-value="keyId" background-color="#f5f5f5"
                                                @change="onGetmorfaiDetails" :rules="nameRules"></v-autocomplete>
                                        </v-col>
                                    </v-row>
  
                                </div>
                            </V-vol>
                        </v-vol>
                        <v-vol class="tops " style="display:flex;align-items:center">
                            <V-vol class="d-flex align-center">
                                <div>
                                    <v-row>
                                        <v-col clos="1" md="10" sm="10">
                                            <v-autocomplete outlined dense label="ລາຍການເເປງ" :items="morfai_data_list"
                                                item-text="batNo" item-value="keyId" background-color="#f5f5f5"
                                                @change="onGetmorfaiDetails" :rules="nameRules"></v-autocomplete>
                                        </v-col>
                                    </v-row>
  
                                </div>
                                <v-menu ref="end_cardate" v-model="end_cardate" :close-on-content-click="false"
                                    :return-value.sync="exCarDate" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field dense outlined v-model="exCarDate" background-color="#f5f5f5" required
                                            label="ເລືອກວັນທີ່ເເປງ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                            v-on="on" :rules="nameRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="exCarDate" no-title scrollable
                                        @input="$refs.end_cardate.save(exCarDate)">
                                        <v-spacer></v-spacer>
                                    </v-date-picker>
                                </v-menu>
                            </V-vol>
                        </v-vol>
                        <v-vol class="d-flex align-center">
                            <v-col clos="1" md="5" sm="5">
                                <v-text-field label="ປ້ອນຄ່າສອມເເປງ" outlined dense v-model="money"
                                    :rules="nameRules"></v-text-field>
                            </v-col>
  
                            <v-col class="d-flex align-center pl-2" clos="1" md="5" sm="5">
                                <v-select label="ເລືອກສະກຸນເງິນ" style="width:100" outlined dense :items="currency_items"
                                    v-model="currency1" :rules="nameRules"></v-select>
                            </v-col>
                        </v-vol>
                        <v-vol clos="1" md="5" sm="5">
                            <v-btn elevation="0" color="#448AFF" @click="onInserTruct">
                                <v-icon color="white">mdi-check</v-icon>
                                <span class="white--text">ບັນທຶກ</span>
                            </v-btn>
                        </v-vol>
                    </c-card>
                </div>
  
                <!-- ເພີ່ມລາຍຈ່າຍ page2 -->
                <div v-if="page === 2">
                    <c-card>
                        <v-vol>
                            <v-card class="d-flex align-center" width="400">
                                <v-col clos="1">
                                    <v-text-field label="ປ້ອນລາຍການສ້ອມເເປງ" outlined dense v-model="money"
                                        :rules="nameRules"></v-text-field>
                                    <v-vol>
                                        <v-btn elevation="3" color="green" @click="onInserTruct">
                                            <v-icon color="white">mdi-plus</v-icon>
                                            <span class="white--text">ເພີ່ມ</span>
                                        </v-btn>
                                    </v-vol>
                                </v-col>
                            </v-card>
                            <v-vol class="d-flex align-center mt-3">
                                <v-col clos="1" md="5" sm="5">
                                    <span>ເພີ່ມສິງທີຕົ້ງເເປງ</span>
                                </v-col>
                            </v-vol>
                            <v-data-table>
  
                            </v-data-table>
  
                        </v-vol>
                    </c-card>
                </div>
  
                <!-- ເພີ່ມປະເພດລາຍຈ່າຍ page3 -->
                <div v-if="page === 3">
                    <div class="d-flex align-center">
                        <v-card width="1100" class="mx-auto card-shadow">
                            <v-card-title style="background-color:#E57373;color:white">ປະເພດລາຍຈ່າຍ</v-card-title>
                            <div style="width:100%;display:flex;justify-content:start" class="pt-4">
                                <div>
                                    <h3>ທັງໝົດ: <span class="green--text">{{ report_invoice_list?.length }}</span></h3>
                                    <!-- Display total number of invoices -->
                                </div>
  
                                <div class="ml-5 mr-5">
                                    <h3>ສໍາເລັດ: <span class="green--text">{{ successList }}</span></h3>
                                    <!-- Display number of paid invoices -->
                                </div>
  
                                <div class="ml-10 mr-5">
                                    <h3>ລໍຖ້າຊໍາລະ: <span class="red--text">{{ waitingList }}</span></h3>
                                    <!-- Display number of unpaid invoices -->
                                </div>
                            </div>
  
                            <div style="width:100%;display:flex;justify-content:start" class="pt-4">
  
                                <div class="d-flex align-center">
                                    <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                                        :return-value.sync="start_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="start_date" required
                                                label="ວັນທີເລີ່ມຕົ້ນ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="start_date" no-title scrollable
                                            @input="$refs.start_menu.save(start_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>
                                <div class="d-flex align-center pl-2">
                                    <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                                        :return-value.sync="end_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ"
                                                append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="end_date" no-title scrollable
                                            @input="$refs.end_menu.save(end_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </div>
                                <div class="ml-2 pt-1">
                                    <v-btn color="#90A4AE" class="white--text card-shadow"
                                        @click="onGetAllInvoice"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                                </div>
                                <v-spacer></v-spacer>
                            </div>
                            <v-data-table :items="report_invoice_list" :headers="report_invoice_headers" :search="search"
                                style="border-radius:5px">
                                <template v-slot:item="row">
  
                                </template>
                            </v-data-table>
                        </v-card>
                    </div>
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
            currency_items: ['LAK', 'USD', 'THB', 'CNY'],
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
                { title: 'ໜ້າສ້ອມເເປງ', icon: 'mdi-hammer-wrench', page: 1 },
                { title: 'ເພີ່ມລາຍການຊ່ອມເເປງ', icon: 'mdi-wrench', page: 2 },
                { title: 'ເບຶ່ງປະຫວັດສ້ອມເເປງ', icon: 'mdi-history', page: 3 },
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
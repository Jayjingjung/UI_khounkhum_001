<template>
    <v-card padding-top="1" height="840" width="2000" class="mx-auto">
        <v-row>
            <v-col cols="2">
                <v-navigation-drawer permanent :active="active">


                    <v-list-item>
                        <v-list-item-content>

                            <v-card-title style="background-color:#E57373;color:white ">ບັນຊີລາຍຈ່າຍ</v-card-title>

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
            <!-- page1 -->
            <v-col>
                <div v-if="page === 1">
                    <span>ລາຍງານລາຍຈ່າຍ</span>
                    <v-col clos="1" md="3" sm="3">
                        <v-menu ref="end_cardate" v-model="end_cardate" :close-on-content-click="false"
                            :return-value.sync="exCarDate" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="exCarDate" background-color="#f5f5f5" required
                                    label="ເລືອກວັນທີ່ເເປງ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                    :rules="nameRules"></v-text-field>
                            </template>
                            <v-date-picker v-model="exCarDate" no-title scrollable
                                @input="$refs.end_cardate.save(exCarDate)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-data-table>
                    </v-data-table>

                </div>
                <!-- page2 -->
                <!-- ເພີ່ມລາຍຈ່າຍ -->
                <div v-if="page === 2">
                    <v-vol>
                        <span>ລາຍງານລາຍຈ່າຍ</span>
                        <v-col clos="1" md="3" sm="3">
                            <v-menu ref="end_cardate" v-model="end_cardate" :close-on-content-click="false"
                                :return-value.sync="exCarDate" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined v-model="exCarDate" background-color="#f5f5f5" required
                                        label="ເລືອກວັນທີ່ເເປງ" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="nameRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="exCarDate" no-title scrollable
                                    @input="$refs.end_cardate.save(exCarDate)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
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

                        <v-data-table>
                        </v-data-table>
                    </v-vol>
                </div>
                <!-- ເພີ່ມປະເພດລາຍຈ່າຍ -->
                <div v-if="page === 3">
                    <div>
                        <!-- <div>ເພີ່ມລາຍຈ່າຍ</div> -->
                    <create-expense2/>
                    </div>
                </div>
                <div v-if="page === 4">
                    <create-expense-type2/>

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
                { title: 'ລາຍງານລາຍຈ່າຍ', icon: 'mdi-currency-usd', page: 1 },
                { title: 'ລາຍຈ່າຍ', icon: 'mdi-cash-plus', page: 2 },
                { title: 'ເພີ່ມລາຍຈ່າຍ', icon: 'mdi-cash-edit', page: 3 },
                { title: 'ເພີ່ມປະເພດລາຍຈ່າຍ', icon: 'mdi-cash-edit', page: 4 },
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
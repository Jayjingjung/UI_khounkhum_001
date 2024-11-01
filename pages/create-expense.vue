<template>
    <div>
        <!-- <div>ເພີ່ມລາຍຈ່າຍ</div> -->
        <div class="d-flex align-center mt-2 mb-2">

            <v-form v-model="valid" ref="form" lazy-validation>
                <div style="height:80vh;width:350px;border-radius:5px;border:1px solid #e0e0e0" class="pa-8">


                    <v-select dense outlined label="ເລືອກລາຍຮັບ ຫຼື ລາຍຈ່າຍ" v-model="statusFInsert"
                        :items="statusOptions" item-text="text" item-value="value"></v-select>


                    <v-select dense outlined label="ເລືອກປະເພດລາຍຮັບ - ລາຍຈ່າຍ" v-model="type"
                        :items="expense_list_type" item-text="typeName" item-value="key_id"
                        :rules="nameRules"></v-select>

                    <v-text-field dense outlined label="ຈຳນວນ" v-model="amount"></v-text-field>

                    <v-text-field dense outlined label="ລາຄາ/ອັນ" v-model="perAmount"></v-text-field>

                    <v-text-field dense outlined label="ລາຄາທັງໝົດ" v-model="totalAmount" readonly
                        :rules="nameRules"></v-text-field>

                    <v-text-field dense outlined label="ເລກອ້າງອີງ" v-model="ref_NO"></v-text-field>

                    <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                        :return-value.sync="dateSave" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field dense outlined v-model="dateSave" :rules="nameRules" required
                                label="ວັນທີໄດ້ລາຍຮັບ ຫຼື ຈ່າຍອອກ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dateSave" no-title scrollable @input="$refs.start_menu.save(dateSave)">
                            <v-spacer></v-spacer>
                        </v-date-picker>
                    </v-menu>
                    <div>
                        <v-btn elevation="0" block color="#e64141" class="white--text" @click="onSave">ເພີ່ມ</v-btn>
                    </div>
                </div>
            </v-form>




            <!-- ອັບເດດ -->
            <v-dialog v-model="updateDia" max-width="400">
                <v-card>
                    <v-card-title>ແກ້ໄຂ</v-card-title>
                    <v-card-text>
                        <div style="border-radius:5px;background-color:#f5f5f5" class="pa-8">
                            <v-select dense outlined label="Select Status" v-model="statusFInsert"
                                :items="statusOptions" item-text="text" item-value="value"></v-select>
                            <v-select dense outlined label="ເລືອກປະເພດ" v-model="type1"
                                :items="list_expense_type_for_up"></v-select>

                            <v-text-field dense outlined label="ຈຳນວນ" v-model="amount1"></v-text-field>
                            <v-text-field dense outlined label="ລາຄາ/ອັນ" v-model="perAmount1"></v-text-field>
                            <v-text-field dense outlined label="ລາຄາທັງໝົດ" v-model="totalAmount1"
                                readonly></v-text-field>
                            <v-menu ref="start_menu1" v-model="start_menu1" :close-on-content-click="false"
                                :return-value.sync="dateSave1" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined v-model="dateSave1" :rules="nameRules" required
                                        label="ວັນທີຈ່າຍຄ່າ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                        v-on="on"></v-text-field>
                                </template>
                                <v-text-field dense outlined label="ເລກໃບບິນ" v-model="ref_NOAmount1"></v-text-field>

                                <v-date-picker v-model="dateSave1" no-title scrollable
                                    @input="$refs.start_menu1.save(dateSave1)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                            <div class="d-flex align-center">
                                <v-spacer></v-spacer>
                                <v-btn elevation="0" color="red" class="white--text mr-2"
                                    @click="updateDia = false">ຍົກເລຶກ</v-btn>
                                <v-btn elevation="0" color="#FFB74D" class="white--text"
                                    @click="onUpdate">ອັບເດດ</v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- ຂໍ້ມູນລາຍຈ່າຍ -->
            <div style="width:100%;height:80vh;border:1px solid #e0e0e0;border-radius:5px" class="ml-2">
                <div style="width:15%;">
                    <v-btn to="/report-expense"
                        style="margin-bottom:10px ;margin-top: 10px; margin-left: 10px; margin-right: 10px;" block
                        color="#3d3d3d" class="white--text">ລາຍງານຮັບ - ລາຍຈ່າຍ ອື່ນໆ</v-btn>
                </div>
                <div style="">
                    <v-card-title style="background-color:#e64141;color:white">ຂໍ້ມູນລາຍຮັບ - ລາຍຈ່າຍ</v-card-title>

                    <v-card-text class="pt-3">
                        <div style="padding-bottom:10px">
                            <span>ທັງໝົດ:
                                <span class="green--text" style="font-size: 12pt; font-weight: bold">{{
                                    expense_list?.length
                                        ?.toString()
                                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}</span></span>
                        </div>
                        <v-divider></v-divider>
                        <div style="overflow: scroll;overflow-y: scroll;overflow-x: hidden;height:65vh">
                            <v-data-table :items="expense_list" :headers="expense_header">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{ row?.item?.exPType }}</td>
                                        <td>{{ row?.item?.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                        </td>
                                        <td>{{ row?.item?.perAmount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }}
                                        </td>
                                        <td>{{ row?.item?.toTal?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                        </td>
                                        <td>{{ row?.item?.expDate }}</td>
                                        <td>{{ row?.item?.cdate }}</td>
                                        <td>{{ row.item.ref_NO }}</td>
                                        <td>{{ row?.item?.status }}</td>
                                        <td>
                                            <v-btn color="#FFB74D" small elevation="0"
                                                @click="onGetDaForUp(row?.item?.key_id, row?.item?.exPType, row?.item?.amount, row?.item?.perAmount, row?.item?.toTal, row?.item?.date, row?.item?.ref_NO, row?.item?.status,)">


                                                <v-icon color="white">mdi-pencil</v-icon>
                                                <span class="white--text">ແກ້ໄຂ</span>
                                            </v-btn>
                                        </td>
                                        <td>
                                            <v-btn color="red" small elevation="0" @click="onDelete(row?.item?.key_id)">
                                                <v-icon color="white">mdi-delete</v-icon>
                                                <span class="white--text">ລົບ</span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </div>
                    </v-card-text>
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
            statusFInsert: '',
            start_menu: false,
            dateSave: null,
            start_menu1: false,
            dateSave1: null,
            updateDia: false,
            ref_NOAmount1: '',
            expense_list: [],
            expense_header: [
                { text: 'ປະເພດ', value: 'exPType' },
                { text: 'ຈຳນວນ', value: 'amount' },
                { text: 'ຈຳນວນເງິນ', value: 'perAmount' },
                { text: 'ຈຳນວນເງິນທັງໝົດ', value: 'toTal' },
                { text: 'ວັນທີບັນທຶກ', value: 'cdate' },
                { text: 'ວັນທີໄດ້ລາຍຮັບ ຫຼື ຈ່າຍອອກ', value: 'cdate' },
                { text: 'ເລກອ້າງອີງ', value: 'ref_NO' },
                { text: 'ສະຖານະ', value: 'status' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            status: null,
            statusOptions: [
                { text: 'ລາຍຈາຍ', value: 'PAY' },
                { text: 'ລາຍຮັບ', value: 'INCOME' }
            ],
            form: {},
            expense_list_type: [],
            type: '',
            totalAmount: '',
            perAmount: '',
            amount: '',
            type1: '',
            ref_NO: '',
            totalAmount1: '',
            perAmount1: '',
            amount1: '',
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງມີຂໍ້ມູນ'],
            key_up: '',
            list_expense_type_for_up: []
        }
    },
    mounted() {
        this.onGetExpenseTypeAll()
        this.onGetExpense()
    },
    watch: {
        amount(newVal) {
            if (newVal === null) {
                this.amount = "";
            } else {
                this.amount = newVal.toString().replace(/[^\d.-]/g, '');
            }
            this.calculateTotal();
        },
        perAmount(newVal) {
            if (newVal === null) {
                this.perAmount = "";
            } else {
                const cleanValue = newVal.toString().replace(/[^\d.-]/g, '');
                this.perAmount = this.formatNumberWithCommas(cleanValue);
            }
            this.calculateTotal();
        },
        amount1(newVal) {
            if (newVal === null) {
                this.amount1 = "";
            } else {
                this.amount1 = newVal.toString().replace(/[^\d.-]/g, '');
            }
            this.calculateTotalUpdate();
        },
        perAmount1(newVal) {
            if (newVal === null) {
                this.perAmount1 = "";
            } else {
                const cleanValue = newVal.toString().replace(/[^\d.-]/g, '');
                this.perAmount1 = this.formatNumberWithCommas(cleanValue);
            }
            this.calculateTotalUpdate();
        },
    },
    methods: {
        calculateTotal() {
            const amount = this.amount ? parseFloat(this.amount.replace(/,/g, '')) : 0;
            const perAmount = this.perAmount ? parseFloat(this.perAmount.replace(/,/g, '')) : 0;
            this.totalAmount = (amount * perAmount).toFixed(2);
        },
        calculateTotalUpdate() {
            const amount1 = this.amount1 ? parseFloat(this.amount1.replace(/,/g, '')) : 0;
            const perAmount1 = this.perAmount1 ? parseFloat(this.perAmount1.replace(/,/g, '')) : 0;
            this.totalAmount1 = (amount1 * perAmount1).toFixed(2);
        },
        formatNumberWithCommas(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        onSave() {
            if (!this.$refs.form.validate()) return null;
            let data = {
                exPType: this.type,
                toTal: this.totalAmount?.split(',').join(''),
                perAmount: this.perAmount?.split(',').join(''),
                amount: this.amount?.split(',').join(''),
                status: this.statusFInsert,
                expDate: this.dateSave,
                ref_NO: this.ref_NO,
                toKen: localStorage.getItem('toKen'),
            };
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
                        });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        ,

        onGetExpenseTypeAll() {
            try {
                this.$axios.$post('/getExpensesTypeAll.service', {
                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    this.expense_list_type = data?.data
                })
            } catch (error) {
                console.log(error)
            }
        },
        onGetExpense() {
            let data = {
                "startDate": null,
                "endDate": null,
                "status": "0",
                toKen: localStorage.getItem('toKen'),
            }
            this.$axios.$post('/getExpensesAll.service', data)
                .then((response) => {
                    this.expense_list = response.data;
                })
                .catch((error) => {
                    console.error('Error fetching expenses:', error.response);
                    swal.fire({
                        icon: 'error',
                        title: 'Error fetching expenses',
                        text: error.message
                    });
                });
        },
        onGetDaForUp(key_id, exPType, amount, perAmount, toTal, date, ref_NO, status) {
            this.list_expense_type_for_up = this.expense_list_type.map((list) => {
                return list?.typeName;
            });
            this.key_up = key_id;
            this.ref_NOAmount1 = ref_NO; // assuming ref_NO is passed as an argument
            this.statusFInsert = status; // assuming ref_NO is passed as an argument
            this.amount1 = amount;
            this.perAmount1 = perAmount;
            this.totalAmount1 = toTal;
            this.dateSave1 = date;
            this.type1 = exPType;
            this.type1 = exPType;
            this.updateDia = true;
        },

        onDelete(key) {
            try {
                let data = {
                    key_id: key,
                    toKen: localStorage.getItem('toKen'),
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
                status: this.statusFInsert,
                key_id: this.key_up,
                exPType: datas[0]?.key_id,
                toTal: this.totalAmount1?.split(',').join(''),
                perAmount: this.perAmount1?.split(',').join(''),
                amount: this.amount1?.split(',').join(''),
                ref_NO: this.ref_NOAmount1,
                toKen: localStorage.getItem('toKen'),
                // expDate: this.updateDia,


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
        }
    }
}
</script>
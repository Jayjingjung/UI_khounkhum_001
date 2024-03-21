<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <v-card class="card-shadow mb-6" rounded="lg">
            <v-card-title style="background-color:#E57373">
                <div style="display:flex;justify-content:space-between;width:100%">
                    <span class="white--text">ລາຍລະອຽດຂໍ້້ມູນອັດຕາການແລກປ່ຽນ</span>
                    <v-btn color="#fff" @click="showModalAddexchang = true" elevation="0" rounded>
                        <v-icon color="#E57373">mdi-plus</v-icon>
                        <span style="color: #E57373;">ເພີ່ມຂໍ້ມູນ</span>
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text>
                <div style="display:flex;justify-content:space-between;width:100%">
                    <div class="py-2">
                        <span>ທັງໝົດ:
                            <span class="green--text" style="font-size: 12pt; font-weight: bold">
                                {{ excang_data_list.length.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                            </span>
                        </span>
                    </div>
                    <div class="mt-2 ml-4" style="width:300px">
                        <v-text-field label="ຄົ້ນຫາ..." rounded background-color="#f5f5f5" append-icon="mdi-magnify"
                            v-model="Exchang_search"></v-text-field>
                    </div>
                </div>

                <v-data-table :headers="excang_table_headers" :items="excang_data_list" :search="Exchang_search">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.key_Id }}</td>
                            <td>{{ row.item.exchangeDate }}</td>
                            <td>{{ row.item.txn_Usd }}</td>
                            <td>{{ row.item.txn_Thb }}</td>
                            <td>{{ row.item.txn_Cny }}</td>
                            <td>
                                <v-btn color="#FFB74D" small @click="
                                    onGetDataForUpdate(
                                        row.item.key_Id,
                                        row.item.exchangeDate,
                                        row.item.txn_Usd,
                                        row.item.txn_Thb,
                                        row.item.txn_Cny,
                                    )
                                    ">
                                    <v-icon color="white">mdi-pencil</v-icon>
                                    <span class="white--text">ແກ້ໄຂ</span>
                                </v-btn>
                            </td>

                            <td>
                                <v-btn class="red" small @click="askBeforeDeleteexchangInfo(row.item.key_Id)">
                                    <v-icon color="white">mdi-delete</v-icon>
                                    <span class="white--text">ລຶບ</span>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <!-- add exchang -->
        <v-dialog v-model="showModalAddexchang" persistent width="400">
            <v-card>
                <v-card-title style="display:flex;background-color:#E57373;color:white">
                    <v-spacer></v-spacer>
                    ເພີ່ມອັດຕາການແລກປ່ຽນ
                    <v-spacer></v-spacer>
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="onCloseDialogAdd">
                        <v-icon color="#E57373">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-container>
                    <Height />
                    <v-card-text>
                        <div>
                            <div style="width:100%" class="d-flex align-center">
                                <v-menu ref="end_menu1" v-model="end_menu1" :close-on-content-click="false"
                                    :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field dense outlined v-model="end_date" required label="ວັນທີອັດຕາແລກປ່ຽນ"
                                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                            :rules="nameRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="end_date" no-title scrollable
                                        @input="$refs.end_menu1.save(end_date)">
                                        <v-spacer></v-spacer>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                            <v-text-field label="ສະກູນເງິນໂດ້ລ້າ" outlined dense v-model="ins_txn_Usd"></v-text-field>
                            <div class="tops">
                                <span class="red--text pl-1">{{ usd_mess }}</span>
                            </div>
                            <v-text-field label="ສະກຸນເງິນບາດ" outlined dense v-model="ins_txn_Thb"></v-text-field>
                            <div class="tops">
                                <span class="red--text pl-1">{{ thb_mess }}</span>
                            </div>
                            <v-text-field label="ສະກຸນເງິນຢວນ" outlined dense v-model="ins_txn_Cny"></v-text-field>
                            <div class="tops">
                                <span class="red--text pl-1">{{ cny_mess }}</span>
                            </div>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" @click="onClearData">
                            <v-icon color="white">mdi-close</v-icon>
                            <span class="white--text">clear ຂໍ້ມູນ</span>
                        </v-btn>

                        <v-btn color="#448AFF" @click="onInsertexchangInfo">
                            <v-icon color="white">mdi-check</v-icon>
                            <span class="white--text">ບັນທຶກ</span>
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-card>
        </v-dialog>

        <!-- update exchang -->
        <v-dialog v-model="showModalupdateexchang" persistent width="400">
            <v-card>
                <v-card-title style="display:flex;background-color:#E57373;color:white">
                    <v-spacer></v-spacer>
                    ແກ້ໄຂອັດຕາການແລກປ່ຽນ
                    <v-spacer></v-spacer>
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="onCloseDialogupdate">
                        <v-icon color="#E57373">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-container>
                  
                    <Height />
                    <v-card-text>
                        <div>
                            <div style="width:100%" class="d-flex align-center">
                                <v-menu ref="end_menu2" v-model="end_menu2" :close-on-content-click="false"
                                    :return-value.sync="up_end_date" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field dense outlined v-model="up_end_date" required
                                            label="ວັນທີອັດຕາແລກປ່ຽນ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                            v-on="on" :rules="nameRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="up_end_date" no-title scrollable
                                        @input="$refs.end_menu2.save(up_end_date)">
                                        <v-spacer></v-spacer>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                            <v-text-field label="ສະກູນເງິນໂດ້ລ້າ" outlined dense v-model="up_txn_Usd"></v-text-field>
                            <div class="tops">
                                <span class="red--text pl-1">{{ usd_mess }}</span>
                            </div>
                            <v-text-field label="ສະກຸນເງິນບາດ" outlined dense v-model="up_txn_Thb"></v-text-field>
                            <div class="tops">
                                <span class="red--text pl-1">{{ thb_mess }}</span>
                            </div>
                            <v-text-field label="ສະກຸນເງິນຢວນ" outlined dense v-model="up_txn_Cny"></v-text-field>
                            <div class="tops">
                                <span class="red--text pl-1">{{ cny_mess }}</span>
                            </div>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>


                        <v-btn color="#FFB74D" @click="onUpdateexchangInfo">
                            <v-icon color="white">mdi-check</v-icon>
                            <span class="white--text">ແກ້ໄຂ</span>
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            showModalAddexchang: false,
            loading_processing: false,
            showModalupdateexchang: false,
            excang_data_list: [],
            excang_table_headers: [
                { text: 'ລໍາດັບ', value: 'id' },
                { text: 'ວັນທີ', value: 'date' },
                { text: 'ສະກຸນເງິນໂດລ້າ ', value: 'bath' },
                { text: 'ສະກຸນເງິນບາດ ', value: 'dolar' },
                { text: 'ສະກຸນເງິນຢວນ ', value: 'dolar' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            //insert 
            end_menu1:false,
            end_menu2:false,
            end_menu: false,
            end_date: null,
            ins_txn_Usd: '',
            ins_txn_Thb: '',
            ins_txn_Cny: '',
            //update
            key_update_exchang: '',
            //search
            Exchang_search: '',
            //delet
            key_for_delete: '',
            loading_processing: false,
            // validations
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],

        }
    },
    watch: {
        ins_txn_Usd: function (newValue) {
            const result = newValue
                .replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ins_txn_Usd = result
        },
        ins_txn_Thb: function (newValue) {
            const result = newValue
                .replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ins_txn_Thb = result
        },
        ins_txn_Cny: function (newValue) {
            const result = newValue
                .replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.ins_txn_Cny = result
        },


        up_txn_Usd: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.up_txn_Usd = result
        },
        up_txn_Thb: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.up_txn_Thb = result
        },
        up_txn_Cny: function (newValue) {
            const result = newValue
                ?.replace(/\D/g, '')
                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.up_txn_Cny = result
        },
    },
    mounted() {
        this.onGetexchangList()
        const today = new Date()
        const date =
            today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        this.current_date = date
    },
    methods: {
        async onGetexchangList() {
            try {
                this.loading_processing = true
                let data = { "key_Id": "" }
                await this.$axios.$post('/getExchange.service', data).then((data) => {
                    if (data?.status == '00') {
                        this.loading_processing = false
                        console.log('locaList:', data)
                        this.excang_data_list = data?.data
                    } else {
                        this.loading_processing = false
                        swal.fire({
                            title: 'ແຈ້ງເຕືອນ',
                            text: data?.message,
                            icon: 'info',
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

        onCloseDialogAdd() {
            this.onClearData()
            this.showModalAddexchang = false
        },

        onCloseDialogupdate() {
            this.showModalupdateexchang = false
        },


        onClearData() {
            this.ins_txn_Usd = ''
            this.ins_txn_Thb = ''
            this.ins_txn_Cny = ''
        },

        async onInsertexchangInfo() {
            try {
                let data = {
                    exchangeDate: this.end_date,
                    txn_Usd: this.ins_txn_Usd,
                    txn_Thb: this.ins_txn_Thb,
                    txn_Cny: this.ins_txn_Cny,
                    userId: localStorage.getItem('USER_ID'),
                }
                console.log('send:', data)
                if (
                    this.ins_txn_Usd == '' ||
                    this.ins_txn_Thb == '' ||
                    this.ins_txn_Cny == ''
                ) {
                    if (this.ins_txn_Usd == '') {
                        this.usd_mess = 'ກະລຸນາປ້ອນສະກຸນເງິນໂດລ້າ'
                    } else {
                        this.usd_mess = ''
                    }
                    if (this.ins_txn_Thb == '') {
                        this.thb_mess = 'ກະລຸນາປ້ອນສະກຸນເງິນບາດ'
                    } else {
                        this.thb_mess = ''
                    }
                    if (this.ins_txn_Cny == '') {
                        this.cny_mess = 'ກະລຸນາປ້ອນສະກຸນເງິນຢວນ'
                    } else {
                        this.cny_mess = ''
                    }
                    // if (this.ins_pro_url == null) {
                    //   this.pro_url_mess = 'ກະລຸນາເລືອກຮູບ'
                    // } else {
                    //   this.pro_url_mess = ''
                    // }
                } else {
                    this.loading_processing = true
                    await this.$axios.$post('/storeExchange.service', data).then((data) => {
                        if (data?.status == '00') {
                            this.loading_processing = false
                            this.showModalAddexchang = false
                            console.log('exchang_list:', data)
                            swal.fire({
                                title: 'ສຳເລັດ',
                                icon: 'success',
                                allowOutsideClick: false,
                                showConfirmButton: false,
                                timer: 1000,
                            })
                            this.onGetexchangList()
                            this.onClearData()
                        } else {
                            this.showModalAddexchang = false
                            this.loading_processing = false
                            swal.fire({
                                title: 'ແຈ້ງເຕືອນ',
                                text: data?.message,
                                icon: 'info',
                                allowOutsideClick: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK',
                            })
                        }
                    })
                }
            } catch (error) {
                this.showModalAddexchang = false
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

        onGetDataForUpdate(key_Id, exchangeDate, txn_Usd, txn_Thb, txn_Cny) {
            this.key_update_exchang = key_Id
            this.up_end_date = exchangeDate
            this.up_txn_Usd = txn_Usd
            this.up_txn_Thb = txn_Thb
            this.up_txn_Cny = txn_Cny
            this.showModalupdateexchang = true
        },

        async onUpdateexchangInfo() {
            try {
                let data = {
                    exchangeDate: this.up_end_date,
                    txn_Usd: this.up_txn_Usd,
                    txn_Thb: this.up_txn_Thb,
                    txn_Cny: this.up_txn_Cny,
                    key_Id: this.key_update_exchang,
                }
                this.loading_processing = true
                await this.$axios.$post('/updateExchange.service', data).then((data) => {
                    console.log('updateSatatu:', data)
                    if (data?.status == '00') {
                        this.loading_processing = false
                        this.onGetexchangList()
                        this.showModalupdateexchang = false
                        this.up_txn_Usd = ''
                        this.up_txn_Thb = ''
                        this.up_txn_Cny = ''
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        })
                    } else {
                        this.loading_processing = false
                        this.showModalupdateexchang = false
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
                this.showModalupdateexchang = false
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

        askBeforeDeleteexchangInfo(key_Id) {
            this.key_for_delete = key_Id
            console.log(key_Id)
            swal
                .fire({
                    text: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ',
                    icon: 'question',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'No'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.onDeleteexchang()
                    }
                })
        },
        async onDeleteexchang() {
            try {
                let data = {
                    key_Id: this.key_for_delete,
                }
                this.loading_processing = true
                await this.$axios.$post('/delExchange.service', data).then((data) => {
                    if (data?.status == '00') {
                        this.loading_processing = false
                        this.onGetexchangList()
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        })
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
        // onCloseModalUpdateLoca() {
        //     this.modalUpdateLoca = false
        //     this.in_details = ''
        //     this.in_province = ''
        // },
    }
}
</script>

<style>
.tops {
    margin-top: -25px;
    font-size: 12px;
}
</style>
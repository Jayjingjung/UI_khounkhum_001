<template>
    <div class="pt-0">
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#E57373" class="white--text">
                ຂໍ້ມູນຫາງລົດ
            </v-card-title>
            <div style="display:flex;align-items:center;height: 90px;">
                <div class="pl-4 pr-4"><span>ທັງໝົດ: <span class="green--text">{{ truck_data_list.length }}</span></span>
                </div>
                <div class="d-flex align-center">
                    <v-btn dark color="#E57373" class="card-shadow" to="add_cars_back" rounded>
                        <v-icon color="white">mdi-plus</v-icon>
                        <span class="white--text">ເພີ່ມຂໍ້ມູນ</span>
                    </v-btn>
                </div>
                <v-btn outlined color="green" class="ml-4 card-shadow" rounded to="/footer_update_history">
                    <v-icon>mdi-history</v-icon>
                    <span>ປະຫວັດການແກ້ໄຂຂໍ້ມູນ</span>
                </v-btn>
                <div class="mt-2 ml-4 pt-6" style="width: 500px;">
                    <v-text-field dense solo flat background-color="#f5f5f5" v-model="search" placeholder="ຄົ້ນຫາ..."
                        prepend-inner-icon="mdi-magnify" clearable></v-text-field>
                </div>
            </div>

            <v-card-text>
                <v-data-table :headers="truck_table_headers" :items="truck_data_list" :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>
                                <v-avatar>
                                    <img :src="row.item.imgFootTruck">
                                </v-avatar>
                            </td>

                            <td>{{ row.item.f_CARD_NO }}</td>
                            <td>{{ row.item.f_BRANCH }}</td>
                            <td>{{ row.item.f_CAR_TYPE }}</td>
                            <!-- <td>{{ row.item.f_DATEEXPRIED }}</td> -->
                            <td>{{ row.item.f_GALATY_NO }}</td>
                            <td>{{ row.item.f_GALATY_DEP }}</td>
                            <td>{{ row.item.f_YEAR }}</td>
                            <td v-if="row?.item.f_STATUS === 'Y'" style="color:#55CE63"><v-icon
                                    color="#55CE63">mdi-check</v-icon>
                                ວ່າງ</td>
                            <td v-else class="red--text"><v-icon color="red">mdi-close</v-icon> ບໍ່ວ່າງ</td>
                            <td><v-btn small color="#FFB74D" class="white--text card-shadow"
                                    @click="edit(row?.item?.key_id)"><v-icon color="white">mdi-pencil</v-icon>ແກ້ໄຂ</v-btn>
                            </td>
                            <td><v-btn small color="#90A4AE" class="white--text card-shadow"
                                    @click="view(row?.item?.key_id)"><v-icon color="white">mdi-magnify</v-icon>ເບີ່ງ</v-btn>
                            </td>
                            <td><v-btn small color="red" class="white--text card-shadow"
                                    @click="askBeforeDeleteTruct(row?.item?.key_id)"><v-icon color="white">mdi-delete
                                    </v-icon>ລຶບ</v-btn></td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            search: '',
            loading_processing: false,
            showDialogUpdate: false,
            showDialogViewTruct: false,
            truck_table_headers: [
                { text: 'ຮູບພາບ', value: '' },
                { text: 'ທະບຽນລົດ', value: 'f_CARD_NO' },
                { text: 'ຍີ່ຫໍ້ລົດ', value: 'f_BRANCH' },
                { text: 'ປະເພດລົດ', value: 'f_CAR_TYPE' },
                // { text: 'ເຕັກນິກໝົດ', value: 'f_DATEEXPRIED' },
                { text: 'ປະກັນໄພ', value: 'f_GALATY_NO' },
                { text: 'ປະກັນໄພໝົດ', value: 'f_GALATY_DEP' },
                { text: 'ລົດປີ', value: 'f_YEAR' },
                { text: 'ສະຖານະລົດ', value: 'f_YEAR' },
                { text: '', value: '' },
                { text: '', value: '' },
                { text: '', value: '' },

            ],
            nameRules: [(v) => !!v || ''],
            truck_data_list: [],

            key_for_delete_truct: '',

        }
    },

    mounted() {
        this.onGetTruckList()
    },
    methods: {
        edit(key) {
            // this.$router.push({path: '/edit_cars_head', params: {key: 'he'}});
            this.$router.push({ path: '/edit_cars_footer', query: { key: key } })
        },
        view(key) {
            // this.$router.push({path: '/edit_cars_head', params: {key: 'he'}});
            this.$router.push({ path: '/view-cars-footer', query: { key: key } })
        },
        async onGetTruckList() {
            try {
                this.loading_processing = true
                await this.$axios.$post('listViciclefooter.service',{

                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    console.log('all_truck_list:', data)
                    if (data?.data == null || data?.data == '') {
                        this.truck_data_list = []
                        this.loading_processing = false
                        this.loading_processing = false
                    } else {
                        this.truck_data_list = data?.data
                        this.loading_processing = false
                        this.loading_processing = false
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
        askBeforeDeleteTruct(key) {
            this.key_for_delete_truct = key
            console.log(key)
            swal
                .fire({
                    title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ ?',
                    icon: 'question',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.onDeleteTruck()
                    }
                })
        },
        async onDeleteTruck() {
            try {
                try {
                    let data = {
                        key_id: this.key_for_delete_truct,
                    }
                    console.log("ketD:", this.key_for_delete_truct)
                    this.loading_processing = true
                    await this.$axios.$post('DelVicicleFooter.service', data).then((data) => {
                        if (data?.status == '00') {
                            this.loading_processing = false
                            swal.fire({
                                title: 'ສຳເລັດ',
                                icon: 'success',
                                allowOutsideClick: false,
                            })
                            this.onGetTruckList()
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
            } catch (error) { }
        },

    },
}
</script>
  
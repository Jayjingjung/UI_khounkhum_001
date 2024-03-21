<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card width="800" class="mx-auto card-shadow mb-6"  rounded="lg" >
            <v-card-title style="background-color:#E57373;color:white">ຂໍ້ມູນສະຖານທີ່</v-card-title>
            <v-card-text class="pt-4">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div style="display:flex;justify-content:space-between;flex-direction:row">
                        <v-text-field :rules="nameRules" label="ແຂວງ" outlined dense v-model="in_province"></v-text-field>

                        <v-text-field :rules="nameRules" label="ລາຍລະອຽດ" outlined dense v-model="in_details"
                            class="mx-2"></v-text-field>
                        <v-btn color="#448AFF" @click="onInsertLocation" height="40">
                            <span class="white--text">ບັນທຶກ</span>
                        </v-btn>
                    </div>
                </v-form>
                <v-text-field append-icon="mdi-magnify" dense outlined label="ຄົ້ນຫາ..."
                    v-model="search_location"></v-text-field>
                <v-data-table :headers="location_header" :items="location_data_list" :search="search_location">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.province }}</td>
                            <td>{{ row.item.detail }}</td>
                            <td>
                                <v-btn color="#FFB74D" small @click="onGetDataForUpdate(
                                    row.item.id,
                                    row.item.province,
                                    row.item.detail
                                )
                                    ">
                                    <v-icon color="white">mdi-pencil</v-icon>
                                    <span class="white--text">ແກ້ໄຂ</span>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn class="red" small @click="askBeforeDelete(row.item.id)">
                                    <v-icon color="white">mdi-delete</v-icon>
                                    <span class="white--text">ລຶບ</span>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <v-dialog v-model="modalUpdateLoca" width="350">
            <v-card elevation="2">
                <v-card-title>ແກ້ໄຂຂໍ້ມູນ</v-card-title>
                <v-card-text>
                    <v-text-field label="ແຂວງ" outlined dense v-model="in_province"></v-text-field>

                    <v-textarea label="ລາຍລະອຽດ" outlined dense v-model="in_details"></v-textarea>
                    <div class="d-flex">
                        <v-spacer></v-spacer>
                        <v-btn class="mr-4" color="red" @click="onCloseModalUpdateLoca"><span
                                class="white--text">ຍົກເລິກ</span></v-btn>
                        <v-btn color="#FFB74D" @click="onUpdateLoca"><span style="color: white;"> ແກ້ໄຂ</span> </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            loading_processing: false,
            modalUpdateLoca: false,
            location_data_list: [],
            location_header: [
                { text: 'ແຂວງ', value: 'province' },
                { text: 'ສະຖານທີ່', value: 'detail' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            //insert loca
            in_province: '',
            in_details: '',
            //update
            key_update_loca: '',
            //search
            search_location: '',
            //delet
            key_for_delete: '',
            loading_processing: false,
            // validations
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],

        }
    },
    mounted() {
        this.onGetLocationList()
    },
    methods: {
        async onGetLocationList() {
            try {
                this.loading_processing = true
                await this.$axios.$post('/getAllLocation',
                
                {
                    // Autorization: localStorage.getItem('toKen')
                    toKen: localStorage.getItem('toKen'),
                
                
                }).then((data) => {
                    if (data?.status == '00') {
                        this.loading_processing = false
                        console.log('locaList:', data)
                        this.location_data_list = data?.data
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
        async onUpdateLoca() {
            try {
                let data = {
                    province: this.in_province,
                    detail: this.in_details,
                    id: this.key_update_loca,
                    toKen: localStorage.getItem("toKen")

                }
                this.loading_processing = true
                await this.$axios.$post('UpdateLocation', data).then((data) => {
                    console.log('updateSatatu:', data)
                    if (data?.status == 'success') {
                        this.loading_processing = false
                        this.onGetLocationList()
                        this.modalUpdateLoca = false
                        this.in_province = ''
                        this.in_details = ''
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        })
                    } else {
                        this.loading_processing = false
                        this.modalUpdateLoca = false
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
                this.modalUpdateLoca = false
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
        onGetDataForUpdate(key, province, detail) {
            this.key_update_loca = key
            this.in_province = province
            this.in_details = detail
            this.modalUpdateLoca = true
        },
        async onInsertLocation() {
            if (!this.$refs.form.validate()) return null
            try {
                if (this.in_province != '' && this.in_details != '') {
                    let data = {
                        province: this.in_province,
                        detail: this.in_details,
                        toKen: localStorage.getItem("toKen")
                    }
                    this.loading_processing = true
                    await this.$axios.$post('StoreLocation', data).then((data) => {
                        console.log('InLoca:', data)
                        if (data?.status == 'success') {
                            this.loading_processing = false
                            this.onGetLocationList()
                            this.$refs.form.reset()
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
                }
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
        askBeforeDelete(key) {
            this.key_for_delete = key
            console.log(key)
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
                        this.onDeleteLocation()
                    }
                })
        },
        async onDeleteLocation() {
            try {
                let data = {
                    id: this.key_for_delete,
                }
                this.loading_processing = true
                await this.$axios.$post('DeleteLocation', data).then((data) => {
                    if (data?.status == 'success') {
                        this.loading_processing = false
                        this.onGetLocationList()
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
        onCloseModalUpdateLoca() {
            this.modalUpdateLoca = false
            this.in_details = ''
            this.in_province = ''
        },
    }
}
</script>
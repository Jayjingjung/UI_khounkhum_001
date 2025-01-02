<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card width="900" class="mx-auto card-shadow mb-6" rounded="lg">
            <v-card-title style="background-color:#00E676; font-size: 20px; font-weight: bold;">ຊື່ບ້ວງ</v-card-title>
            <v-card-text class="pt-4">
                <div class="mb-6">
                    <div style="font-size: 18px; font-weight: bold; color: red;">
                        *ຫາກເອກະສານຂອງທ່ານກ່ຽວຂ້ອງກັບບໍ່ຫີນຂຸດ ແມ່ນໃຫ້ທ່ານເລືອກຄັດລ໋ອກບໍ່ທີ່ກ່ຽວຂ້ອງລຸ່ມນີ້ໄປເປັນບ້ວງ
                    </div>
                    <v-row class="mt-4">
                        <v-col v-for="branch in branches" :key="branch.id" cols="12" sm="6" md="2">
                            <div style="font-size: 18px; font-weight: bold;"  @click="copyToClipboard(branch.b_name)">
                                {{ branch.b_name }}
                                <v-icon color="#00E676" small @click="copyToClipboard(branch.b_name)" >
                                    mdi-content-copy
                                </v-icon>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div style="display:flex;justify-content:space-between;flex-direction:row">
                        <v-text-field :rules="nameRules" label="ປ້ອນຊື່ບ້ວງ" outlined dense
                            v-model="in_nameOfBouang"></v-text-field>
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
                            <td>{{ row.item.nameOfBouang }}</td>
                            <td>{{ row.item.someOtherField }}</td>
                            <!-- Make sure this field exists and is correctly referenced -->
                            <td>
                                <v-btn color="#FFB74D" small @click="onGetDataForUpdate(
                                    row.item.key_id,
                                    row.item.nameOfBouang,
                                    row.item.someOtherField
                                )">
                                    <v-icon color="white">mdi-pencil</v-icon>
                                    <span class="white--text">ແກ້ໄຂ</span>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn class="red" small @click="askBeforeDelete(row.item.key_id)">
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
                    <v-text-field label="nameOfBouang" outlined dense v-model="in_nameOfBouang"></v-text-field>
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
            toKen1: "c27bcc229bf00e6c1deb14b93d6fe80655f35371e4907d0431a23aa4f68b3d41",
            branches: [],
            loading_processing: false,
            modalUpdateLoca: false,
            location_data_list: [],
            location_header: [
                { text: 'ຊື່ບ້ວງ', value: 'nameOfBouang' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            // Insert loca
            in_nameOfBouang: '',
            // Update
            key_update_loca: '',
            // Search
            search_location: '',
            // Delete
            key_for_delete: '',
            // Validations
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],
        };
    },
    mounted() {
        this.onGetbuang();
        this.fetchBranches()
    },
    methods: {
        copyToClipboard(text) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    this.$toast.success("ຄັດລ໋ອກແລ້ວ!"); // Show success message
                })
                .catch((err) => {
                    this.$toast.error(" ຄັດລ໋ອກລົ້ມເຫຼວ: " + err.message); // Show error message
                });
        },
        async fetchBranches() {
            try {
                const response = await this.$axios.$post(
                    "/getShowBranchNew2024.service",
                    {
                        toKen: this.toKen1,
                    }
                );
                if (response?.status === "00") {
                    this.branches = response.data || [];
                } else {
                    this.branches = [];
                }
            } catch (error) {
                swal.fire({
                    icon: "error",
                    text: "Failed to fetch data: " + error.message,
                });
            }
        },
        async onGetbuang() {
            try {
                this.loading_processing = true
                await this.$axios.$post('/getBouangAll.service',
                    {
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
                    nameOfBouang: this.in_nameOfBouang,
                    key_id: this.key_update_loca,
                    toKen: localStorage.getItem("toKen")
                }
                this.loading_processing = true
                await this.$axios.$post('BouangUpdate.service', data).then((data) => {
                    console.log('updateSatatu:', data)
                    if (data?.status == "00") {
                        this.loading_processing = false
                        this.onGetbuang()
                        this.modalUpdateLoca = false
                        this.in_nameOfBouang = ''
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
        onGetDataForUpdate(key, nameOfBouang,) {
            this.key_update_loca = key
            this.in_nameOfBouang = nameOfBouang

            this.modalUpdateLoca = true
        },
        async onInsertLocation() {
            if (!this.$refs.form.validate()) return null
            try {
                if (this.in_nameOfBouang != '') {
                    let data = {
                        nameOfBouang: this.in_nameOfBouang,

                        toKen: localStorage.getItem("toKen")
                    }
                    this.loading_processing = true
                    await this.$axios.$post('storeBouang.service', data).then((data) => {
                        console.log('InLoca:', data)
                        if (data?.status ==
                            "00") {
                            this.loading_processing = false
                            this.onGetbuang()
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
                    key_id: this.key_for_delete,
                }
                this.loading_processing = true
                await this.$axios.$post('DelBouang.service', data).then((data) => {
                    if (data?.status == "00") {
                        this.loading_processing = false
                        this.onGetbuang()
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

            this.in_nameOfBouang = ''
        },
    }
}
</script>
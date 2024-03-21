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
                    <span class="white--text">ລາຍລະອຽດຂໍ້້ມູນຜູ້ໃຊ້ລະບົບ</span>
                    <v-btn color="#fff" @click="showModalAddUser = true" elevation="0" rounded>
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
                                {{ user_data_list.length.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                            </span>
                        </span>
                    </div>
                    <div class="mt-2 ml-4" style="width:300px">
                        <v-text-field label="ຄົ້ນຫາ..." rounded background-color="#f5f5f5" append-icon="mdi-magnify"
                            v-model="search_user"></v-text-field>
                    </div>
                </div>

                <v-data-table :headers="user_table_headers" :items="user_data_list" :search="search_user">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row.item.key_Id }}</td>
                            <td>{{ row.item.userLogin }}</td>
                            <td>
                                {{ row.item.branch === '2' ? 'ຊຽງຂວາງ' : (row.item.branch === '3' ? 'ທ່າເເຂກ' : 'ລະຫັດພິເສດ') }}
                            </td>
                            <td>{{ row.item.role }}</td>
                            <!-- <td>{{ row.item.passWord }}</td> -->
                            <td v-if="row?.item.status === 'A'">
                                <v-chip class="ma-2" color="green" text-color="white">
                                    Action
                                </v-chip>
                            </td>
                            <td v-else>
                                <v-chip class="ma-2" color="orange" text-color="white">
                                    disble
                                </v-chip>
                            </td>
                            <td>
                                <v-btn color="#FFB74D" small @click="
            onGetDataForUpdate(
                row.item.key_Id,
                row.item.userLogin,
                // row.item.passWord,
                row.item.branch,
                row.item.role,
                row.item.status,
            )
            ">
                                    <v-icon color="white">mdi-pencil</v-icon>
                                    <span class="white--text">ແກ້ໄຂ</span>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn class="red" small @click="askBeforeDeleteCusInfo(row.item.key_Id)">
                                    <v-icon color="white">mdi-delete</v-icon>
                                    <span class="white--text">ລຶບ</span>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <!-- Modal add user -->
        <v-dialog v-model="showModalAddUser" persistent width="400">
            <v-card>
                <v-card-title style="display:flex;background-color:#E57373;color:white">

                    <v-spacer></v-spacer>
                    ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ລະບົບ
                    <v-spacer></v-spacer>
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="onCloseDialogAdd">
                        <v-icon color="#E57373">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <Height />
                <Height />

                <v-card-text>
                    <Height />
                    <div>
                        <!-- <v-text-field label="ລະຫັດຜູ້ໃຊ້" outlined dense v-model="user_id"></v-text-field>
                            <div class="tops">
                                <span class="red--text pl-1">{{ id_mess }}</span>
                            </div> -->
                        <v-text-field label="ຊື່ຜູ້ໃຊ້ລະບົບ" outlined dense v-model="user_name"></v-text-field>
                        <div class="tops">
                            <span class="red--text pl-1">{{ name_mess }}</span>
                        </div>
                        <v-text-field label="ລະຫັດຜ່ານ" outlined dense v-model="user_password"></v-text-field>
                        <div class="tops">
                            <span class="red--text pl-1">{{ password_mess }}</span>
                        </div>
                        <!-- add branch -->
                        <v-select label="ສາຂາ" outlined dense v-model="branch"
                            :items="['ທ່າເເຂກ', 'ຊຽງຂວາງ']"></v-select>

                        <div class="tops">
                            <span class="red--text pl-1">{{ branch_mess }}</span>
                        </div>

                        <v-select dense outlined label="ເລືອກສິດຜູ້ເຂົ້າໃຊ້" v-model="Level"
                            :items="level_item"></v-select>
                        <div class="tops">
                            <span class="red--text pl-1">{{ level_mess }}</span>
                        </div>

                        <v-radio-group inline v-model="status" :rules="nameRules">
                            <v-row class="pl-3">
                                <span class="mt-1">ສະຖານະ</span>
                                <Width />
                                <v-radio label="Action" value="A" class="mt-1"></v-radio>
                                <Width />
                                <v-radio label="Disble" value="D"></v-radio>
                            </v-row>
                        </v-radio-group>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <Height />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="onClearData">
                        <v-icon color="white">mdi-close</v-icon>
                        <span class="white--text">clear ຂໍ້ມູນ</span>
                    </v-btn>

                    <v-btn color="#448AFF" @click="onInsertUserInfo">
                        <v-icon color="white">mdi-check</v-icon>
                        <span class="white--text">ບັນທຶກ</span>
                    </v-btn>
                    <!-- <v-btn color="primary" block @click="onInsertProdInfo">
                                ບັນທຶກ
                        </v-btn> -->
                </v-card-actions>
                <Height />
                <Height />

            </v-card>
        </v-dialog>
        <!-- Modal Update user -->
        <v-dialog v-model="showModalUpdateuser" persistent width="400">
            <v-card>
                <v-card-title style="display:flex;background-color:#E57373;color:white">
                    <v-spacer></v-spacer>
                    ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ລະບົບ
                    <v-spacer></v-spacer>
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white"
                        @click="showModalUpdateuser = false">
                        <v-icon color="#E57373">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <Height />
                <Height />
                <Height />
                <v-card-text>
                    <div>
                        <!-- <v-text-field label="ລະຫັດຜູ້ໃຊ້" outlined dense v-model="up_user_id"></v-text-field> -->
                        <div class="tops">
                            <span class="red--text pl-1">{{ id_mess }}</span>
                        </div>
                        <v-text-field label="ຊື່ຜູ້ໃຊ້ລະບົບ" outlined dense v-model="up_user_name"></v-text-field>
                        <div class="tops">
                            <span class="red--text pl-1">{{ name_mess }}</span>
                        </div>
                        <v-text-field label="ລະຫັດຜ່ານ" outlined dense v-model="up_user_password"></v-text-field>
                        <div class="tops">
                            <span class="red--text pl-1">{{ user_password }}</span>
                        </div>
                        <!-- update branch -->
                        <v-text-field label="ສາຂາ" outlined dense v-model="up_branch"></v-text-field>
                        <div class="tops">
                            <span class="red--text pl-1">{{ branch_mess }}</span>
                        </div>

                        <v-select dense outlined label="ເລືອກສິດຜູ້ເຂົ້າໃຊ້" v-model="up_Level"
                            :items="level_item"></v-select>
                        <div class="tops">

                        </div>
                        <v-radio-group inline v-model="up_status" :rules="nameRules">
                            <v-row class="pl-3">
                                <span class="mt-1">ສະຖານະ</span>
                                <Width />
                                <v-radio label="Action" value="A" class="mt-1"></v-radio>
                                <Width />
                                <v-radio label="Disble" value="D"></v-radio>
                            </v-row>
                        </v-radio-group>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <Height />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="showModalUpdateuser = false">
                        <v-icon color="white">mdi-close</v-icon>
                        <span class="white--text">ຍົກເລິກ</span>
                    </v-btn>
                    <v-btn color="#FFB74D" @click="onUpdateUser">
                        <v-icon color="white">mdi-check</v-icon>
                        <span class="white--text">ແກ້ໄຂ</span>
                    </v-btn>
                </v-card-actions>
                <Height />
                <Height />
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            showModalAddUser: false,
            loading_processing: false,
            showModalUpdateuser: false,
            user_data_list: [],
            user_table_headers: [
                { text: 'ລະຫັດ', value: 'userid' },
                { text: 'ຊື່ຜູ້ໃຊ້ລະບົບ', value: 'name' },
                { text: 'ສາຂາ ', value: 'branch' },
                { text: 'ສິດເຂົ້າໃຊ້ ', value: 'level' },
                { text: 'ສະຖານະ', value: 'status' },
                { text: '', value: '' },
                { text: '', value: '' },

            ],
            //insert user
            staft_list: [],
            // insert data
            // user_id: '',
            user_name: '',
            user_password: '',
            Level: '',
            level_item: ['ADMIN', 'USER', 'FINANCE'],
            status: 'A',
            branch: '',

            //message when empty data
            id_mess: '',
            name_mess: '',
            password_mess: '',
            level_mess: '',
            branch_mess: '',

            //update
            key_update_user: '',

            //search
            search_user: '',
            //delet
            key_for_delete: '',
            loading_processing: false,
            // validations
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],

        }
    },
    mounted() {
        this.onGetUserList()
    },
    methods: {
        async onGetUserList() {
            try {
                this.loading_processing = true

                await this.$axios.$post('/getUserLogin.service',

                    {

                        toKen: localStorage.getItem('toKen'),
                        keyId: ""
                    }
                ).then((data) => {
                    if (data?.status == '00') {
                        this.loading_processing = false
                        console.log('user:', data)
                        this.user_data_list = data?.data
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
            this.showModalAddUser = false
        },

        onClearData() {
            // this.user_id = ''
            this.user_name = ''
            this.user_password = ''
            this.Level = ''
            this.emp_id = ''
            this.status = 'A'
            this.branch = ''
        },
        async onInsertUserInfo() {
            try {
                let branchValue = ''; // Initialize a variable to store the branch value

                // Check the selected branch and set the branchValue accordingly
                if (this.branch === 'ຊຽງຂວາງ') {
                    branchValue = '2';
                } else if (this.branch === 'ທ່າເເຂກ') {
                    branchValue = '3';
                }

                let data = {
                    user_Login: this.user_name,
                    passWord: this.user_password,
                    branch: branchValue, // Set the branch value dynamically
                    role: this.Level,
                    status: this.status,
                    userId: localStorage.getItem('USER_ID'),
                    toKen: localStorage.getItem('toKen')
                }
                console.log('send:', data)
                if (
                    // this.user_id == '' ||
                    this.user_name == '' ||
                    this.user_password == '' ||
                    this.Level == '' ||
                    this.branch == ''
                ) {
                    if (this.user_id == '') {
                        this.id_mess = 'ກະລຸນາປ້ອນລະຫັດ'
                    } else {
                        this.id_mess = ''
                    }
                    if (this.user_name == '') {
                        this.name_mess = 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້'
                    } else {
                        this.name_mess = ''
                    }
                    if (this.user_password == '') {
                        this.password_mess = 'ກະລຸນາປ້ອນລະຫັດເຂົ້າໃຊ້'
                    } else {
                        this.password_mess = ''
                    }
                    if (this.branch == '') {
                        this.branch_mess = 'ກະລຸນາປ້ອນສາຂາ'
                    } else {
                        this.branch_mess = ''
                    }
                    if (this.Level == '') {
                        this.level_mess = 'ກະລຸນາປ້ອນເລືອກສິດຜູ້ໃຊ້'
                    } else {
                        this.level_mess = ''
                    }
                } else {
                    this.loading_processing = true
                    await this.$axios.$post('/storeUserLogin.service', data).then((data) => {
                        if (data?.status == '00') {
                            this.loading_processing = false
                            this.showModalAddUser = false
                            console.log('products_list:', data)
                            swal.fire({
                                title: 'ສຳເລັດ',
                                icon: 'success',
                                allowOutsideClick: false,
                                showConfirmButton: false,
                                timer: 1000,
                            })
                            this.onGetUserList()
                            this.onClearData()
                        } else {
                            this.showModalAddUser = false
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
                this.showModalAddProduct = false
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

        onGetDataForUpdate(key_Id, user_Login, passWord, role, status, branch) {
            this.key_update_user = key_Id
            this.up_user_name = user_Login
            this.up_user_password = passWord
            this.up_Level = role
            this.up_status = status
            this.up_branch = branch
            this.showModalUpdateuser = true
        },

        async onUpdateUser() {
            try {
                let data = {
                    key_Id: this.key_update_user,
                    user_Login: this.up_user_name,
                    passWord: this.up_user_password,
                    role: this.up_Level,
                    status: this.up_status,
                    branch: this.up_branch,
                }
                this.loading_processing = true
                await this.$axios.$post('/updateUserLogin.service', data).then((data) => {
                    console.log('updateStatus:', data)
                    if (data?.status == '00') {
                        this.loading_processing = false
                        this.onGetUserList()
                        this.showModalUpdateuser = false
                        this.up_user_name = ''
                        this.up_user_password = ''
                        this.up_Level = ''
                        this.up_status = ''
                        this.up_branch = ''
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        })
                    } else {
                        this.loading_processing = false
                        this.showModalUpdateuser = false
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
                this.showModalUpdateuser = false
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

        askBeforeDeleteCusInfo(key_Id) {
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
                        this.onDeleteUser()
                    }
                })
        },
        async onDeleteUser() {
            try {
                let data = {
                    key_Id: this.key_for_delete,
                }
                this.loading_processing = true
                await this.$axios.$post('delUserLogin.service', data).then((data) => {
                    if (data?.status == '00') {
                        this.loading_processing = false
                        this.onGetUserList()
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
    }
}
</script>

<style>
.tops {
    margin-top: -25px;
    font-size: 12px;
}
</style>
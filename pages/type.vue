<template>
    <div>
        <v-card width="500" class="mx-auto card-shadow">
            <v-card-title style="background-color:#E57373;color:white">ປະເພດ</v-card-title>
            <v-card-text class="pt-4">
                <div style="display:flex">
                    <v-text-field
                     outlined label=" ປະເພດ"
                      dense v-model="typeName"
                      :rules="nameRules">
                    </v-text-field>
                  
                    <v-btn v-if="!checkbtn"
                     elevation="0" 
                     height="40" 
                     color="#448AFF" 
                     class="white--text ml-2"
                        @click="onSave">ເພີ່ມ</v-btn>

                    <v-btn v-else elevation="0" height="40" color="#FFB74D" class="white--text ml-2"
                        @click="onUpdate">ອັບເດດ</v-btn>
                </div>
                <div>
                    <v-data-table :items="expense_list" :headers="expense_headers" dense>
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row?.item?.typeName }}</td>
                                <td>
                                    <v-btn color="#FFB74D" small elevation="0"
                                        @click="onGetforUp(row?.item?.key_id, row?.item?.typeName)">
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
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            expense_headers: [
                { text: 'ປະເພດ', value: 'typeName' },
                { text: '', value: '' },
                { text: '', value: '' }
            ],
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            expense_list: [],
            typeName: '',
            checkbtn: false,
            key_up: ''
        }
    },
    mounted() {
        this.onGetAll()
    },
    methods: {
        onGetforUp(id, name) {
            this.key_up = id;
            this.typeName = name;
            this.checkbtn = true
        },
        onUpdate() {
            let data = {
                key_id: this.key_up,
                toKen: localStorage.getItem("toKen"),

                typeName: this.typeName
            }
            try {
                this.$axios.$post('/storeExpensesTypeUpdate.service', data, {
                    toKen: localStorage.getItem('toKen')
                }).then((data) => {
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
                this.$axios.$post('/storeExpensesTypeDel.service', data, {
                    toKen: localStorage.getItem('toKen')
                }).then((data) => {
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
                // Retrieve the token from local storage
                let token = localStorage.getItem('toKen');

                // Include token and typeName in the data object
                let data = {
                    typeName: this.typeName,
                    toKen: token
                }

                // Send the data object with the token as a header
                this.$axios.$post('/storeExpensesType.service', data,).then((data) => {
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
                this.$axios.$post('/getExpensesTypeAll.service', {
                    // Autorization: localStorage.getItem('toKen')
                    toKen: localStorage.getItem('toKen')

                }).then((data) => {
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

<style></style>
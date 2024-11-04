<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#cc7a26" class="white--text">
                ເພີ້ມ ອາໄຫຼ່
            </v-card-title>
            <div>
                <v-form ref="form">
                    <div style="display: flex;margin-top: 10px;margin-left: 10px;margin-left: 30px;margin-right: 30px;">
                        <v-row>
                            <v-col>
                                <v-text-field label="* ອາໄຫຼ່" dense outlined background-color="#f5f5f5"
                                    v-model="itemName"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col>
                                <v-text-field label="* ຈໍານວນ" dense outlined background-color="#f5f5f5"
                                    v-model="qty"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <v-col>
                                <v-text-field label="* ຫົວໜ່ວຍ" dense outlined background-color="#f5f5f5"
                                    v-model="unit"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>


                            <v-col>
                                <v-text-field label="* ລາຄາຕໍ່" dense outlined background-color="#f5f5f5"
                                    v-model="unit_price"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col>
                            <!-- <v-col>
                                <v-text-field label="* ຈໍານວນ" dense outlined background-color="#f5f5f5"
                                    v-model="qty"></v-text-field>
                                <div class="tops">
                                </div>
                            </v-col> -->
                            <v-col>
                                <v-file-input label="ອັບໂຫຼດຮູູບ" outlined dense prepend-icon="mdi-camera"
                                    append-inner-icon="mdi-card-account-details" background-color="#f5f5f5"
                                    v-model="files"></v-file-input>
                                <div class="tops">
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-form>
                <div class="center-btn">
                    <v-btn elevation="0" color="#448AFF" @click="onputadd">
                        <v-icon color="white">mdi-check</v-icon>
                        <span class="white--text">ບັນທຶກ</span>
                    </v-btn>
                </div>
                <div class="mt-2 ml-4 pt-6" style="width: 500px; ">
                    <v-text-field dense solo flat background-color="#f5f5f5" v-model="search" placeholder="ຄົ້ນຫາ..."
                        prepend-inner-icon="mdi-magnify" clearable></v-text-field>
                </div>
                <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list"
                    :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row?.index + 1 }}</td>
                            <!-- <td>{{ row?.item?.item_id }} </td> -->
                            <td>{{ row?.item?.itemName }}</td>
                            <td><v-avatar>
                                    <img :src="row.item.img">
                                </v-avatar></td>
                            <td>{{ row?.item?.qty }}</td>
                            <td>{{ row?.item?.unit }}</td>
                            <td>{{ row?.item?.unit_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>
                                <v-btn class="green" small @click="askBeforeupdateCusInfo(row.item.item_id)">
                                    <v-icon color="white">mdi-update</v-icon>
                                    <span class="white--text">ອັບເດດ</span>
                                </v-btn>
                            </td>


                            <td>
                                <v-btn class="red" small @click="askBeforeDeleteCusInfo(row.item.item_id)">
                                    <v-icon color="white">mdi-delete</v-icon>
                                    <span class="white--text">ລຶບ</span>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </div>
        </v-card>
        <!-- <v-divider></v-divider> -->

        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#dd9348" class="white--text">
                ເພີ່ມ ບໍລິສັດ ຫຼື ຮ້ານ
            </v-card-title>
            <div style="display: flex;margin-top: 10px;margin-left: 10px;margin-left: 30px;margin-right: 30px;">
                <v-row>
                    <v-col>
                        <v-text-field label="* ຮ້ານ" dense outlined background-color="#f5f5f5"
                            v-model="shop_name"></v-text-field>
                        <div class="tops">
                        </div>
                    </v-col>
                    <v-col>
                        <v-text-field label="* ທີ່ຢູ່" dense outlined background-color="#f5f5f5"
                            v-model="address"></v-text-field>
                        <div class="tops">
                        </div>
                    </v-col>


                    <v-col>
                        <v-text-field label="* ໂທ" dense outlined background-color="#f5f5f5"
                            v-model="phone"></v-text-field>
                        <div class="tops">
                        </div>
                    </v-col>
                    <!-- <v-col>
                        <v-text-field label="* ຈຳນວນ_ເງິນ" dense outlined background-color="#f5f5f5"
                            v-model="amount_money"></v-text-field>
                        <div class="tops">
                        </div>
                    </v-col> -->
                    <v-col>
                        <v-text-field label="ສະກຸນເງິນ" outlined dense append-inner-icon="mdi-card-account-details"
                            background-color="#f5f5f5" v-model="currency"></v-text-field>
                        <div class="tops">
                        </div>
                    </v-col>
                    <v-col>
                        <v-text-field label="* ປະເທດ" dense outlined background-color="#f5f5f5"
                            v-model="country"></v-text-field>
                        <div class="tops">
                        </div>
                    </v-col>

                </v-row>
            </div>
            <div class="center-btn">
                <v-btn elevation="0" color="#448AFF" @click="onSaveshow">
                    <v-icon color="white">mdi-check</v-icon>
                    <span class="white--text">ບັນທຶກ</span>
                </v-btn>
            </div>
            <div class="mt-2 ml-4 pt-6" style="width: 500px; ">
                <v-text-field dense solo flat background-color="#f5f5f5" v-model="searchv2" placeholder="ຄົ້ນຫາ..."
                    prepend-inner-icon="mdi-magnify" clearable></v-text-field>
            </div>
            <v-data-table :items-per-page="5" :headers="truck_table_repairs" :items="truck_table_repairs2"
                :searchv2="searchv2">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row?.index + 1 }}</td>
                        <td>{{ row?.item?.shop_name }}</td>
                        <td>{{ row?.item?.address }}</td>
                        <td>{{ row?.item?.phone }}</td>
                        <!-- <td>{{ row?.item?.amount_money }}</td> -->
                        <td>{{ row?.item?.currency }}</td>
                        <td>{{ row?.item?.country }}</td>
                        <!-- <td>{{ row?.item?.branch }}</td> -->

                        <!-- <td>
                            <v-btn class="red" small @click="deleteshow(row.item.shop_id)">
                                <v-icon color="white">mdi-delete</v-icon>
                                <span class="white--text">ລຶບ</span>
                            </v-btn>
                        </td> -->


                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>

</template>
<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            search: '',
            searchv2: '',
            itemName: '',
            unit: '',
            img: null,
            unit_price: '',
            item_id: '',
            files: null,
            truck_table_headers: [
                { text: 'ລດ', value: '' },
                { text: 'ອາໄຫຼ່', value: 'itemName' },
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ຈໍານວນ', value: 'qty' },
                { text: 'ຫົວໜວຍ', value: 'unit' },
                { text: 'ລາຄາ', value: 'unit_price' },
                { text: '', value: '' },
            ],
            truck_data_list: [],
            truck_table_repairs: [
                { text: 'ລດ', value: '' },
                { text: 'ຮ້ານ', value: 'shop_name' },
                { text: 'ທີ່ຢູ່', value: 'address' },
                { text: 'ໂທ', value: 'phone' },
                { text: 'ສະກຸນເງິນ', value: 'currency' },
                { text: 'ປະເທດ', value: 'country' },
                { text: '', value: '' },
            ],
            truck_table_repairs2: [],
            loading_processing: false,
        };
    }
    ,


    mounted() {
        this.onGetadd(); // Call the onGetadd method when the component is mounted
        this.onGetaddshow(); // Call the onGetadd method when the component is mounted

    },
    methods: {

        onGetrepImage(file) {
            if (file) {
                this.url = URL.createObjectURL(this.img)
                console.log(this.url)
            } else {
                this.url = null
            }
        },
        async onGetadd() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ListItems.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.truck_data_list = response.data;
                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetaddshow() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ListShops.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.truck_table_repairs2 = response.data;
                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
            }
        },
        async onSaveshow() {
            if (!this.$refs.form.validate()) return null
            let data = {
                shop_name: this.shop_name,
                address: this.address,
                phone: this.phone,
                country: this.country,
                currency: this.currency,
                amount_money: this.amount_money,
                branch: this.branch,
                toKen: localStorage.getItem('toKen'),
            }
            try {
                this.$axios.$post('/InsertShop.service', data).then((data) => {
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
                this.onGetaddshow();
            }
        },
        deleteshow(key) {
            this.shop_id = key; // Set item_id property
            Swal.fire({
                title: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ ?',
                icon: 'question',
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.onDeleteshow();
                }
            });
        },

        async onDeleteshow() {
            try {
                const data = {
                    shop_id: this.shop_id, // Use item_id property
                };
                this.loading_processing = true;
                const response = await this.$axios.$post('DelShops.service', data);

                if (response?.status == '00') {
                    console.log(this.shop_id);
                    this.loading_processing = false;
                    this.onGetaddshow();

                    Swal.fire({
                        title: 'ສຳເລັດ',
                        icon: 'success',
                        allowOutsideClick: false,
                    });
                } else {
                    this.loading_processing = false;
                    Swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response?.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.loading_processing = false;
                Swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred while deleting',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        onGetEmpImage(file) {
            if (file) {
                this.url = URL.createObjectURL(this.imageStaff)
                console.log(this.url)
            } else {
                this.url = null
            }

        },
        async onputadd() {
            try {
                // Validate the form
                if (!this.$refs.form || !this.$refs.form.validate()) {
                    // Form is not valid, return or show error message
                    console.error('Form validation failed');
                    return;
                }
                // Form is valid, proceed with form submission
                const formdata = new FormData();
                formdata.append('itemName', this.itemName);
                formdata.append('unit', this.unit);
                formdata.append('unit_price', this.unit_price);
                formdata.append('qty', this.qty);
                formdata.append('toKen', localStorage.getItem('toKen'));
                formdata.append('files', this.files);

                this.loading_processing = true;
                await this.$axios.$post('insertItems.service', formdata);

                // Handle success or show error messages here
            } catch (error) {
                // Handle errors and show appropriate messages
                console.error('Error submitting form:', error);
            } finally {
                this.loading_processing = false;
                this.onGetadd();
            }
        },
        // Your existing code...

        askBeforeDeleteCusInfo(key) {
            this.item_id = key; // Set item_id property
            Swal.fire({
                title: 'ທ່ານຕ້ອງການອັບເເດດແທ້ບໍ ?',
                icon: 'question',
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.isConfirmed) {

                }
            });
        },

        askBeforeupdateCusInfo(item_id) {
            this.$router.push({ path: '/updateitem', query: { item_id: item_id } });
        },
        async onDeleteEmpInfo() {
            try {
                const data = {
                    item_id: this.item_id, // Use item_id property
                };
                this.loading_processing = true;
                const response = await this.$axios.$post('DelItem.service', data);

                if (response?.status == '00') {
                    console.log(this.item_id);
                    this.loading_processing = false;
                    this.onGetadd();

                    Swal.fire({
                        title: 'ສຳເລັດ',
                        icon: 'success',
                        allowOutsideClick: false,
                    });
                } else {
                    this.loading_processing = false;
                    Swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response?.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.loading_processing = false;
                Swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred while deleting',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
    },

};


</script>
<style>
.v-divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

.center-btn {
    display: flex;
    justify-content: center;
}
</style>
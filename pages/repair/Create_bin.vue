<template>
    <div>
        <v-card class="flex-container mr-10 ml-10">

            <div style="width:95%;" class="pl-2">
                <v-select outlined dense label="ເລືອກ ອຸປະກອນ" :items="Mechanicequipment" item-text="itemName"
                    item-value="item_id" @change="onGetMechanicequipment">
                </v-select>

                <div class="d-flex align-center pl-2">
                    <v-text-field label="*qty_Fix" dense outlined background-color="#f5f5f5"
                        v-model="qty_Fix"></v-text-field>
                    <div class="tops"></div>
                </div>
            </div>

            <div style="width:95%;" class="pl-2">
                <!-- Autocomplete for selecting vehicle -->
                <div>
                    <v-autocomplete outlined dense label="ເລືອກຫົວລົດ" :items="cars_list" item-text="h_VICIVLE_NUMBER"
                        item-value="key_id" @change="onGetCarDetails" :rules="nameRules">
                    </v-autocomplete>
                    <div class="d-flex align-center pl-2">
                        <v-text-field label="*total_Price" dense outlined background-color="#f5f5f5"
                            v-model="total_Price"></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
            </div>

            <div style="width:95%;" class="pl-2">
                <div>
                    <v-autocomplete outlined dense label="ເລືອກຫາງລົດ" :items="truct_footer_data_list"
                        item-text="f_CARD_NO" item-value="key_id" @change="onGetTructFooterDetail" :rules="nameRules">
                    </v-autocomplete>
                    <div class="d-flex align-center pl-2">
                        <v-text-field label="*description" dense outlined background-color="#f5f5f5"
                            v-model="description"></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>
            </div>
            <div style="width:95%;" class=" ml-2 mb-2">
                <v-btn elevation="0" color="#448AFF" @click="onGetLeaveNumber">
                    <v-icon color="white">mdi-check</v-icon>
                    <span class="white--text">ບັນທຶກ</span>
                </v-btn>
            </div>
        </v-card>
        <div style="display: flex;margin-top: 10px;">
            <div>
                <v-card class="card-shadow" rounded="lg"
                    style="border:0.5px solid #e0e0e0;border-radius:3px;width: 100%;">
                    <v-card-title style="background-color:	#b76d22" class="white--text">
                        ອາໄລໃນສາງ
                    </v-card-title>

                    <div style="display: flex;margin-top: 10px;margin-left: 10px;">
                    </div>
                    <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list"
                        :search="search">
                        <template v-slot:item="row">
                            <tr>

                                <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                                <td>{{ row?.item?.item_name }}</td>
                                <td>{{ row?.item?.qty }}</td>

                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
            <div>
                <v-card class="card-shadow" rounded="lg"
                    style="border:0.5px solid #e0e0e0;border-radius:3px;width: 100%;">
                    <v-card-title style="background-color:	#b72222" class="white--text">
                        ອາໄລທີນໍາອອກຈາກສາງ
                    </v-card-title>

                    <div style="display: flex;margin-top: 10px;margin-left: 10px;">
                    </div>
                    <v-data-table :items-per-page="5" :headers="data_list_showFix" :items="showFix_data_list"
                        :search="search">
                        <template v-slot:item="row">
                            <tr>

                                <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                                <td>{{ row?.item?.fixId }}</td>
                                <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                                <td>{{ row?.item?.f_BRANCH }}</td>
                                <td>{{ row?.item?.qty_Fix }}</td>
                                <td>{{ row?.item?.total_Price }}</td>
                                <td>{{ row?.item?.add_on }}</td>
                                <td>{{ row?.item?.description }}</td>
                                <td>{{ row?.item?.dateFix }}</td>

                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </div>


        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            truct_footer_data_list: [],
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            f_CARD_NO: '',
            cars_list: [],
            item_id: '',
            hkey_id: '',
            fkey_id: '',
            unit_price: '',
            img: '',
            qty_offer: '',
            totalMoney: '',
            description: '',
            offerManName: '',
            job: '',
            f_CARD_NO: '',
            item_name: '',
            pocode: '',
            dateCreate: '',
            offer_CODE: '',
            printData: null,
            showModal: false,
            dialogVisible: false,
            offerManName: '',
            job: '',
            itemId: '', // Add itemId property
            Mechanicequipment: [],
            show_list: [],
            show_list: [],
            name: '',
            address: '',
            offerCode: '',
            h_VICIVLE_NUMBER: '',
            number: '',
            // Other data properties...
            search: '',
            truck_table_headers: [

                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ລາໄລ', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'qty' },

            ],
            truck_data_list: [],

            data_list_showFix: [

                { text: 'ຮູບພາບ', value: 'fixId' },
                { text: 'ລາໄລ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຈໍານວນ', value: 'f_BRANCH' },
                { text: 'ຈໍານວນ', value: 'qty_Fix' },
                { text: 'ຈໍານວນ', value: 'total_Price' },
                { text: 'ຈໍານວນ', value: 'add_on' },
                { text: 'ຈໍານວນ', value: 'description' },
                { text: 'ຈໍານວນ', value: 'dateFix' },

            ],
            showFix_data_list: [],

            // Other data properties...
        };
    },
    computed: {
        filteredItems() {
            if (!Array.isArray(this.truck_data_list)) {
                return [];
            }
            return this.truck_data_list.filter(item =>
                item.statusPO === 'YES' &&
                (item.stock_status === 'wait')
            );
        },
    },

    methods: {
        onGetCarDetails(id) {
            console.log(id);

            let data = this.cars_list.filter((el) => el.key_id === id);
            console.log('head:', data);
            this.h_VICIVLE_NUMBER = data[0]?.h_VICIVLE_NUMBER;
            this.h_ID = id;
        },
        onGetMechanicequipment(item_id) {
            console.log(item_id);

            let data = this.Mechanicequipment.filter((el) => el.item_id === item_id);
            console.log('head:', data);
            this.itemName = data[0]?.itemName;
            this.item_id = item_id;

        },
        onGetTructFooterDetail(key_id) {
            let data = this.truct_footer_data_list.filter((el) => el.fkey_id === key_id);
            console.log("back:", data);
            this.f_CARD_NO = data[0]?.f_CARD_NO;
            this.fkey_id = key_id;

            // Set other data properties as needed
        },
        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ReportStock.service', {
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
                // window.location.reload();

            }
        },

        async onGetLeaveNumber() {
            try {
                this.loading_processing = true;
                const data = {
                    item_id: this.item_id, // Assuming item_id is accessible in this component
                    header_id: this.h_ID, // Assuming h_VICIVLE_NUMBER is accessible in this component
                    footer_id: this.fkey_id, // Assuming fkey_id is accessible in this component
                    qty_Fix: this.qty_Fix, // Assuming number is accessible in this component
                    total_Price: this.total_Price, // Assuming number is accessible in this component
                    description: this.description, // Assuming number is accessible in this component

                    toKen: localStorage.getItem('toKen'),
                };
                console.log("send:", data);

                const response = await this.$axios.$post('/fix.service', data);
                console.log("createReport:", response);

                if (response?.status === '00') {
                    this.loading_processing = false;
                    // this.print();
                    // Other actions upon successful creation
                    this.onGetshowdata_table();

                    // Display success alert using SweetAlert2
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.log(error);
                this.loading_processing = false;

                // Display error alert using SweetAlert2
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch data from the API', // Customize the error message
                    confirmButtonText: 'OK',
                });
            }
        }
        ,
        async onGetadd() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('ListItems.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('itemName:', data?.data);
                this.Mechanicequipment = data?.data || [];
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetTruckList() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('listVicicleHeaderCombo1.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('truck_list:', data?.data);
                this.cars_list = data?.data || [];
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetTruckFooter() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('listViciclefooterCombo1.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('all_truck_footer_list:', data);
                if (!data || !data.data) {
                    this.truct_footer_data_list = [];
                } else {
                    this.truct_footer_data_list = data.data;
                }
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetshowFix() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showFix.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.showFix_data_list = response.data;
                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
                // window.location.reload();

            }
        },
    },
    mounted() {
        this.onGetTruckFooter(); // Fetch truck footer data when component is mounted
        this.onGetTruckList(); // Fetch truck footer data when component is mounted
        this.onGetshowFix(); // Fetch truck footer data when component is mounted
        this.onGetadd(); // Fetch truck footer data when component is mounted
        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
    },

};
</script>

<style>
.v-divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

.phoum10 {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 150px;
}

.flex-container {
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 2px;
    height: 200px;
}
</style>
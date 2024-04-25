<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:	#b76d22" class="white--text">
                ສະເໜີໃຊ້
            </v-card-title>

            <div style="display: flex;margin-top: 10px;margin-left: 10px;">

                <!-- <div style="width: 10%;margin-top: -10px;" class="d-flex align-center pl-2">
                    <span>ເພີ້ມ ອຸປະກອນ:</span>
                    <span class="ml-4"> {{ selectedGasStation }}</span>
                </div>

                <div style="width:300px">
                    <v-select outlined dense label="ເລືອກ ອຸປະກອນ" :items="AllFuelStation_gas"
                        item-text="fuelStationName" item-value="fuelStationId" @change="onGetgas">
                    </v-select>
                </div>


                <div style="width: 300px;">
                    <v-text-field label="*ຈໍານວນ" dense outlined background-color="#f5f5f5"
                        v-model="OOOO"></v-text-field>
                    <div class="tops"></div>
                </div>


                <v-btn class="mr-10 ml-10" style="margin-top: 3px;" elevation="0" color="#448AFF" @click="onInserTruct">
                    <v-icon color="white">mdi-check</v-icon>
                    <span class="white--text">ບັນທຶກ</span>
                </v-btn> -->
            </div>
            <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list" :search="search">
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
</template>

<script>
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
    },
    mounted() {

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
</style>
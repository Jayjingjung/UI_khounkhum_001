<template>
    <div>
    <v-card>
        <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list" :search="search">
            <template v-slot:item="row">
                <tr>


                    <td>{{ row?.item?.offer_CODE }}</td>
                    <td>{{ row?.item?.item_name }}</td>
                    <td>{{ row?.item?.qty_offer }}</td>
                    <!-- <td>{{ row?.item?.pocode }}</td> -->
                    <td>{{ row?.item?.total }}</td>
                    <td>{{ row?.item?.paid }}</td>
                    <td>{{ row?.item?.tid }}</td>
                    <td>{{ row?.item?.shop_name }}</td>
                    <td>{{ row?.item?.dateCreatePO }}</td>
                    <td>{{ row?.item?.cur }}</td>
                    <!-- <td>{{ row?.item?.timeToPay }}</td> -->

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

                { text: 'ຈໍານວນ', value: 'offer_CODE' },
                { text: 'ລາໄລ', value: 'item_name' },
                // { text: 'ຮູບພາບ', value: 'pocode' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ຈໍານວນ', value: 'total' },
                { text: 'ຈໍານວນ', value: 'tid' },
                { text: 'ຈໍານວນ', value: 'shop_name' },
                { text: 'ຈໍານວນ', value: 'dateCreatePO' },
                { text: 'ຈໍານວນ', value: 'cur' },
                // { text: 'ຈໍານວນ', value: 'timeToPay' },
  

            ],
            truck_data_list: [],

            // Other data properties...
        };
    },
    methods: {


        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ListShopsMustPay.service', {
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

<style></style>
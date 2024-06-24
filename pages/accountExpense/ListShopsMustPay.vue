<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
                    <v-card-title style="background-color: #b722b7" class="white--text">
                        ອາໄລໃນສາງ
                    </v-card-title>
            <v-data-table :items-per-page="5" :headers="truck_table_headersv2" :items="filteredItemsv2" :search="search">
                <template v-slot:item="row">
                    <tr>


                        <td>{{ row?.item?.offer_CODE }}</td>
                        <td>{{ row?.item?.pocode }}</td>
                        <td>{{ row?.item?.item_name }}</td>
                        <td>{{ row?.item?.qty_offer }}</td>
                        <td>{{ row?.item?.total }}</td>
                        <td>{{ row?.item?.paid }}</td>
                        <td>{{ row?.item?.tid }}</td>
                        <td>{{ row?.item?.shop_name }}</td>
                        <td>{{ row?.item?.dateCreatePO }}</td>
                        <td>{{ row?.item?.cur }}</td>
                        <!-- <td>{{ row?.item?.timeToPay }}</td> -->
                        <td>
                            <v-btn small color="primary" class="card-shadow"
                                @click="onSubmit(row.item.pocode, row.item.paid)">
                                <v-icon>mdi-currency-usd</v-icon>ສັງຈ່າຍ
                            </v-btn>
                        </td>
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
            paid: '', // Define the paid variable here
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
            truck_table_headersv2: [

                { text: 'offer_CODE', value: 'offer_CODE' },
                { text: 'pocode', value: 'pocode' },
                { text: 'ລາໄລ', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ຈໍານວນ', value: 'total' },
                { text: 'ຈໍານວນ', value: 'tid' },
                { text: 'ຈໍານວນ', value: 'shop_name' },
                { text: 'ຈໍານວນ', value: 'dateCreatePO' },
                { text: 'ຈໍານວນ', value: 'cur' },
                { text: 'ຈໍານວນ', value: 'timeToPay' },


            ],
            truck_data_listv2: [],

            // Other data properties...
        };
    },
    computed: {
        filteredItemsv2() {
            if (!Array.isArray(this.truck_data_listv2)) {
                return [];
            }
            return this.truck_data_listv2.filter(item =>
                item.statusNy === 'notjaiy'
            );
        },
    },
    methods: {
        async onSubmit(pocode, paid) {
            try {
                const requestData = {
                    toKen: localStorage.getItem('toKen'),
                    pocode: pocode,
                    paid: paid,
                };
                const response = await this.$axios.$post('/PayToShop.service', requestData);
                console.log('PayToShop API response:', response);
                // Handle response as needed
                if (response?.status === '00') {
                    this.loading_processing = false;
                    // this.print();
                    // Other actions upon successful creation


                    // Display success alert using SweetAlert2
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
                        confirmButtonText: 'OK',
                    });
                    window.location.reload();
                }
            } catch (error) {
                console.error('PayToShop API error:', error);
                // Handle error as needed
            }
        },


        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ListShopsMustPay.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('API response:', response);
                if (response?.status === '00' && response?.data) {
                    this.truck_data_listv2 = response.data;
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
    },
    mounted() {
        this.onGetshowdata_table();
    },
};
</script>

<style></style>
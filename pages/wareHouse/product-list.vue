<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#c69eed" class="white--text">
                ນໍາເຂົ້າອາໄລ
            </v-card-title>

            <div style="margin-top: 10px;margin-left: 10px;margin-right: 10px;">
                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <span>ເພີ້ມ ອຸປະກອນ:</span>
                    </div>
                </div>
            </div>
            <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="filteredItems" :search="search">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row?.item?.unit_price }}</td>
                        <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                        <td>{{ row?.item?.qty_offer }}</td>
                        <td>{{ row?.item?.totalMoney }}</td>
                        <td>{{ row?.item?.description }}</td>
                        <td>{{ row?.item?.offerManName }}</td>
                        <td>{{ row?.item?.job }}</td>
                        <td>{{ row?.item?.f_CARD_NO }}</td>
                        <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                        <td>{{ row?.item?.item_name }}</td>
                        <td>{{ row?.item?.dateCreate }}</td>
                        <td>{{ row?.item?.offer_CODE }}</td>
                        <!-- <td :class="getStatusClass(row.item.status)">
                            {{ getStatusText(row.item.status) }}
                        </td> -->
                        <td>{{ row?.item?.stock_status }}</td>
                        <!-- <td>{{ row?.item?.statusPO }}</td> -->

                        <td>
                            <v-btn small color="primary" class="card-shadow"
                                @click="onGetDatsForPrint(row.item.offer_CODE)">
                                <v-icon>mdi-printer</v-icon>ພິມບິນຄືນ
                            </v-btn>
                        </td>
                        <td>
                            <v-btn small color="primary" class="card-shadow" @click="onGetinbox(row.item.offer_CODE)">
                                <v-icon>mdi mdi-archive-plus</v-icon>ນໍາເຂົ້າ
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <!-- component for print  -->
            <v-dialog v-model="dialogVisible" max-width="800px" >
                <v-card>
                    <v-card-title>ປ້ອນຂໍ້ມູນ</v-card-title>
                    <v-card-text>
                        <div>
                            <label for="item_name">ອາໄລ:</label>
                            <span id="item_name">{{ itemName }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">ຈໍານວນ</label>
                            <span id="qty_offer">{{ qtyOffer }}</span>
                        </div>
                     
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="onSubmit">ບັນທຶກ</v-btn>
                        <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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
                { text: 'ລາຄາ', value: 'unit_price' },
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ລາຄາລວມ', value: 'totalMoney' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ຊື່ຜູ້ສະເໜີ', value: 'offerManName' },
                { text: 'ອາຊີບ', value: 'job' },
                { text: 'ລຳດັບຍ້າຍລົດ', value: 'f_CARD_NO' },
                { text: 'ລຳດັບລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຊື່ສິ່ງທີ່ສະເໜີລຶບ', value: 'item_name' },
                { text: 'ວັນທີສ້າງໃບບິນ', value: 'dateCreate' },
                { text: 'ເລກທີໃບສ້າງໃບບິນ', value: 'offer_CODE' },
                // { text: 'SS', value: 'stock_status' },
                { text: 'ສະທານະຊື້', value: '' },
                // { text: 'SPO', value: 'statusPO' },
                { text: 'ພິມບິນ', value: '' },
                // { text: 'ໃບສັງຊື້', value: '' },



            ],
            truck_data_list: [],
        };
    },
    mounted() {
        // Fetch data here or populate truck_data_list from props
        this.fetchPrintData();
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

        getStatusClass(status) {
            return status === 'N' ? 'red' : 'green';
        },
        getStatusText(status) {
            return status === 'Y' ? 'ຊື້ເເລ້ວ' : 'ຍັງບໍ່ສັງຊື້';
        },
        onGetMechanicequipment(item_id) {
            console.log(item_id);

            let data = this.Mechanicequipment.filter((el) => el.item_id === item_id);
            console.log('head:', data);
            this.itemName = data[0]?.itemName;
            this.item_id = item_id;

        },


        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showofferpaper.service', {
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

        async onGetinbox(offerCode) {
            try {
                const response = await this.$axios.$post('/showofferpaperDetail.service', {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: offerCode,
                });

                console.log('Print API response:', response);
                this.itemName = response.data[0].item_name; // Assuming you want the first item's name
                this.qtyOffer = response.data[0].qty_offer; // Assuming you want the first item's qty_offer
                this.qtyOffer = response.data[0].qty_offer; // Assuming you want the first item's qty_offer
                this.itemId = response.data[0].item_id; // Assuming you want the first item's qty_offer
                // Handle the response as needed, such as displaying a success message or handling errors
                this.openDialog(offerCode); // Open the dialog after API call success
            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
            }
        },
        openDialog(offerCode) {
            this.offerCode = offerCode;
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        onSubmit() {
            // Implement your logic to handle form submission
            console.log('Name:', this.name);
            console.log('Address:', this.address);
            console.log('Offer Code:', this.offerCode);

            // Close the dialog after submission
            this.closeDialog();
        },
        async onSubmit() {
            try {
                // Prepare the data to be sent in the request body
                const requestData = {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: this.offerCode, // Using the offerCode property
                    item_id: this.itemId, // Assuming you have an itemId property set from somewhere
                    qty_offer: this.qtyOffer, // Using the qtyOffer property
                 
                };

                // Send the POST request to the API endpoint
                const response = await this.$axios.$post('/MoveItemToStock.service', requestData);

                console.log('MoveItemToStock API response:', response);

                // Close the dialog after submission
                this.closeDialog();

                // You can handle the response here, such as showing a success message or updating UI
            } catch (error) {
                console.error('MoveItemToStock API error:', error);
                // Handle the error, such as displaying an error message
            
            }
        },


        async onGetDatsForPrint(offerCode) {
            try {
                const response = await this.$axios.$post('/showofferpaperDetail.service', {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: offerCode,
                });

                console.log('Print API response:', response);

                // Handle the response as needed, such as displaying a success message or handling errors
            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
            }
        },
        print() {
            const modal = document.getElementById("modalInvoice");
            const cloned = modal.cloneNode(true);
            let section = document.getElementById("print");
            if (!section) {
                section = document.createElement("div");
                section.id = "print";
                document.body.appendChild(section);
            }
            section.innerHTML = "";
            section.appendChild(cloned);
            window.print();
        },
        // Other methods...
    },
    mounted() {

        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
    },
};
</script>

<style>
@media screen {
    #print {
        display: none;
    }
}

@media print {
    @page {
        size: A4;
        margin: 1in;
    }

    body * {
        visibility: hidden;
    }

    #print,
    #print * {
        visibility: visible;
    }

    #print {
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0px;
    }
}

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
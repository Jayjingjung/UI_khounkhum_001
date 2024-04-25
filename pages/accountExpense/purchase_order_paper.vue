<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#ed9ec5" class="white--text">
                ໃບສະເໜີຊື້
            </v-card-title>

            <div style="margin-top: 10px;margin-left: 10px;margin-right: 10px;">
                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <span>ເພີ້ມ ອຸປະກອນ:</span>

                    </div>
                </div>

                
                <div style="width:100%;" class="pl-2">
                        <!-- Autocomplete for selecting vehicle -->
                        <div style="width:100%">
                            <v-autocomplete outlined dense label="ຮ້ານ" :items="show_list" item-text="shop_name"
                                item-value="shop_id" @change="onGetshow" :rules="nameRules">
                            </v-autocomplete>
                        </div>


                    </div>

                <div style="display: flex;">
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ສະກຸນເງິນ" dense outlined background-color="#f5f5f5"
                            v-model="cut"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ຈ່າຍກ່ອນ" dense outlined background-color="#f5f5f5"
                            v-model="paid"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ຍັງຕີດໜີ້" dense outlined background-color="#f5f5f5"
                            v-model="tid"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*total" dense outlined background-color="#f5f5f5"
                            v-model="total"></v-text-field>
                        <div class="tops"></div>
                    </div>

                </div>
            </div>
            <v-data-table :items-per-page="10" :headers="truck_table_headers" :items="truck_data_list" :search="search">
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
                        <td :class="getStatusClass(row.item.status)">
                            {{ getStatusText(row.item.status) }}
                        </td>
              

                        <td>
                            <v-btn small color="primary" class="card-shadow"
                                @click="onGetDatsForPrint(row.item.offer_CODE)">
                                <v-icon>mdi-printer</v-icon>ພິມບິນຄືນ
                            </v-btn>
                        </td>
               
                        <!-- <td v-if="row.item.status !== 'Y'">
                            <v-btn small color="primary" class="card-shadow"
                                @click="onGetLeaveNumber(row.item.offer_CODE)">
                                <v-icon>mdi-currency-usd</v-icon>ໃບສັງຊື້
                            </v-btn>
                        </td> -->

                        <td >
                            <v-btn small color="primary" class="card-shadow"
                                @click="onGetLeaveNumber(row.item.offer_CODE)">
                                <v-icon>mdi-currency-usd</v-icon>ໃບສັງຊື້
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>

            <v-dialog v-model="dialogVisible" max-width="400px">
                <v-card>
                    <v-card-title>ປ້ອນຂໍ້ມູນ</v-card-title>
                    <v-card-text>
                        <div style="width: 100%;" class="d-flex align-center pl-2">
                            <v-text-field label="* ຊື່ຜູ້ສະເໜີ" dense outlined background-color="#f5f5f5"
                                v-model="o"></v-text-field>
                            <div class="tops"></div>
                        </div>

                        <div style="width: 100%;" class="d-flex align-center pl-2">
                            <v-text-field label="* ໜ້າທີ່ຮັບຜິດຊອບ" dense outlined background-color="#f5f5f5"
                                v-model="o"></v-text-field>
                            <div class="tops"></div>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="onGetLeaveNumber">ບັນທຶກ</v-btn>
                        <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


            <!-- component for print  -->
        </v-card>
        <div>
            <div id="modalInvoice">
                <v-row>

                    <v-col cols="9">
                        
                                 <Notiv2/>
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                            <!-- Notification component -->
                            
                            
                            <!-- Offer details -->
                            <span v-if="printData">Unit Price: {{ printData.unit_price }}</span>
                            <span v-if="printData">Quantity Offered: {{ printData.qty_offer }}</span>
                            <span v-if="printData">Total Money: {{ printData.totalMoney }}</span>
                            <!-- Other properties... -->
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>





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
            Mechanicequipment: [],
            show_list: [],
            show_list: [],

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
                { text: 'ໃບສັງຊື້', value: '' },



            ],
            truck_data_list: [],
        };
    },
    mounted() {
        // Fetch data here or populate truck_data_list from props
        this.fetchPrintData();
    },
    methods: {
        // askBeforeDeleteCusInfo(itemId) {
        //     // Handle delete action
        // },
        // openDialog() {
        //     this.dialogVisible = true;
        // },
        closeDialog() {
            this.dialogVisible = false;
        },

        getStatusClass(status) {
            return status === 'N' ? 'red' : 'green';
        },
        getStatusText(status) {
            return status === 'Y' ? 'ຊື້ເເລ້ວ' : 'ຍັງບໍ່ສັງຊື້';
        },

        onGetDataListForPrint(keyId) {
            // Placeholder method for fetching data for printing
            console.log('Fetching data for printing with keyId:', keyId);
            // Add your logic here to fetch the data for printing
        },
    onGetshow(shop_id) {
            console.log(shop_id);

            let data = this.show_list.filter((el) => el.shop_id === shop_id); // Use id parameter instead of shop_id
            console.log('head:', data);
            this.shop_name = data[0]?.shop_name;
            this.shop_id = shop_id; // Assign id to skey_id

            // Set other data properties as needed
        },
        onGetMechanicequipment(item_id) {
            console.log(item_id);

            let data = this.Mechanicequipment.filter((el) => el.item_id === item_id);
            console.log('head:', data);
            this.itemName = data[0]?.itemName;
            this.item_id = item_id;

        },



        async fetchPrintData() {
            try {
                const response = await this.$axios.$get('/api/printData');
                this.printData = response.data;
            } catch (error) {
                console.error('Error fetching print data:', error);
            }
        },
        async onGetaddshow() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('ListShops.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('itemName:', data?.data);
                this.show_list = data?.data || [];
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
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
            }

        },


        showErrorAlert(title, message) {
            swal.fire({
                title: title,
                text: message,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        },
        onGetrepImage(file) {
            if (file) {
                this.url = URL.createObjectURL(this.img)
                console.log(this.url)
            } else {
                this.url = null
            }
        },


        // async onGetLeaveNumber() {
        //     try {
        //         const response = await this.$axios.$post('/GenCodePO.service');
        //         console.log("inv:", response);
        //         if (response.status === '00') {
        //             // const offerCode = response.data[0]?.offer_CODE;
        //             const pocode = response.data[0]?.po_CODE;
        //             // const pocode = ''; // You need to define pocode here
        //             this.onCreateReports( pocode); // Pass offerCode and pocode here
        //         } else {
        //             // Handle scenarios where status is not '00'
        //             console.error('Unexpected response status:', response.status);
        //         }
        //     } catch (error) {
        //         console.error('Error in onGetLeaveNumber:', error);
        //         // Handle specific error scenarios here if needed
        //     }
        // },
        async onGetLeaveNumber(offerCode) {
            try {
                const response = await this.$axios.$post('/GenCodePO.service');
                console.log("inv:", response);
                if (response.status === '00') {
                    const pocode = response.data[0]?.po_CODE;
                    this.onCreateReports(pocode, offerCode); // Pass offerCode to onCreateReports
                }
            } catch (error) {
                console.log(error);
            }
        },



        async onCreateReports(pocode, offerCode) {
            try {
                this.loading_processing = true;
                const data = {
                    tid: this.tid,
                    paid: this.paid,
                    show_list  : this.shop_id,
                    cut: this.cut,
                    total: this.total,
                    pocode: pocode,
                    offer_CODE: offerCode,
                    // cur: offerCode,
                    toKen: localStorage.getItem('toKen'),
                };
                console.log('send:', data);

                const response = await this.$axios.$post('/SavePurchaseOrder.service', data);
                console.log('createReport:', response);

                if (response?.status === '00') {
                    this.loading_processing = false;
                    // this.onGetshowdata_table();
                    // window.location.reload();
                }
            } catch (error) {
                console.error('Error in onCreateReports:', error);
                this.loading_processing = false;

            }
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

        async onGetDatsForPrint(offer_CODE) {
            this.offer_CODE = offer_CODE;
            this.loading_processing = true;
            const data = {
                offer_CODE: offer_CODE,
                toKen: localStorage.getItem("toKen")
            };
            try {
                const response = await this.$axios.$post('/showofferpaperDetail.service', data);

                if (response?.status === '00') {
                    console.log("dataForprint:", response);
                    this.printData = response.data[0]; // Set printData first

                    // Show the modal with updated data
                    this.showModal = true;

                    // Delay the printing to ensure data is rendered in the modal
                    setTimeout(() => {
                        this.print();
                    }, 500); // You can adjust the delay as needed
                } else {
                    // Handle scenarios where status is not '00'
                    console.error('Unexpected response status:', response?.status);
                }
            } catch (error) {
                // More robust error handling
                console.error('Error fetching print data:', error);
                // Handle specific error scenarios here if needed
            } finally {
                // Ensure loading state is turned off in both success and error scenarios
                this.loading_processing = false;
            }
        },

        // Other methods...

    },

    mounted() {
        this.onGetaddshow(); // Fetch truck footer data when component is mounted
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

.center-btn {
    display: flex;
    justify-content: center;
}
</style>
<template>
    <div>
        <v-card class="card-shadow" rounded="lg"
            style="border:0.5px solid #e0e0e0;border-radius:3px;margin-bottom: 500px;">
            <v-card-title style="background-color:#ed9ec5" class="white--text">
                ໃບສະເໜີຊື້
            </v-card-title>


            <v-data-table :items-per-page="10" :headers="truck_table_headers" :items="filteredItems" :search="search">
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
                            <v-btn small color="primary" class="card-shadow" @click="onGetinbox(row.item.offer_CODE)">
                                <v-icon>mdi-currency-usd</v-icon>ໃບສັງຊື້v2
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>


        <v-dialog v-model="dialogVisible" max-width="800px" style="max-height: 800px;">
            <v-card>
                <v-card-title style="font-size: 24px;">ປ້ອນຂໍ້ມູນ</v-card-title>
                <v-card-actions>
                    <!-- <v-btn style="font-size: 20px;" color="primary" @click="onPrint">
                        <v-icon>mdi-printer</v-icon>ພິມບິນ
                    </v-btn> -->



                </v-card-actions>
                <div style="display: flex;margin-left: 10px;margin-right: 10px;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="shopName">ວັນທີສ້າງ:</label>
                            <span id="shopName">{{ shopName }}</span>
                        </div>
                        <div>
                            <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                            <span id="unit_price">{{ unit_price }}</span>
                        </div>
                        <div>
                            <label for="offer_CODE">offer_CODE:</label>
                            <span id="offer_CODE">{{ offer_CODE }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                            <span id="qty_offer">{{ qty_offer }}</span>
                        </div>
                        <div>
                            <label for="real_totalMoney">ເງິນທັງໝົດ:</label>
                            <span id="real_totalMoney">{{ real_totalMoney }}</span>
                        </div>
                        <div>
                            <label for="description">ລາຍລະອຽດ:</label>
                            <span id="description">{{ description }}</span>
                        </div>

                    </v-card-text>

                    <v-card-text style="font-size: 18px;">

                        <div>
                            <label for="offerManName">ຜູ້ສະເໜີ:</label>
                            <span id="offerManName">{{ offerManName }}</span>
                        </div>
                        <div>
                            <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                            <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                        </div>
                        <div>
                            <label for="item_name">ອາໄລ ຊື່:</label>
                            <span id="item_name">{{ item_name }}</span>
                        </div>
                        <div>
                            <label for="dateCreate">ວັນທີສ້າງ:</label>
                            <span id="dateCreate">{{ dateCreate }}</span>
                        </div>

                        <label for="img">ຮູບພາບ:</label>
                        <div>
                            <img :src="img" style="width: 150px; height: 160px;">
                        </div>

                    </v-card-text>
                    <v-card-text>
                        <div>


                            <v-text-field label="*ທັງໝົດ" dense outlined background-color="#f5f5f5"
                                v-model="real_totalMoney" @input="calculateTotalMoney"></v-text-field>

                            <v-text-field label="*ຈ່າຍ" dense outlined background-color="#f5f5f5" v-model="paid"
                                @input="calculateTotalMoney"></v-text-field>

                            <v-text-field label="*ຕິດໜີ້" dense outlined background-color="#f5f5f5" v-model="tid"
                                readonly></v-text-field>

                            <v-text-field label="*ສະກູນເງິນ" dense outlined background-color="#f5f5f5"
                                v-model="cur"></v-text-field>
                        </div>
                        <v-btn style="margin-top: -10px;margin-left: 10px;" color="primary" @click="ongetppocode">
                            <v-icon>mdi-border-color</v-icon>ບັນທຶກສັງຊື</v-btn>
                    </v-card-text>
                </div>
                <v-card-actions>

                    <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>


                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- component for print  -->
        <!-- 
        <div>
            <div id="modalInvoice">
                <v-row>
                    <v-col cols="9">
                        <Notiv2 />

                        <div>
                            <label for="dateCreate">ວັນທີສ້າງ:</label>
                            <span id="dateCreate">{{ dateCreate }}</span>
                        </div>

                        <div>
                            <label for="shopName">ວັນທີສ້າງ:</label>
                            <span id="shopName">{{ shopName }}</span>
                        </div>

                        <div style="display: flex;margin-left: 10px;margin-right: 10px;">
                            <v-card-text style="font-size: 18px;">
                                <div>
                                    <label for="unit_price">ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ:</label>
                                    <span id="unit_price">{{ unit_price }}</span>
                                </div>
                                <div>
                                    <label for="offer_CODE">offer_CODE:</label>
                                    <span id="offer_CODE">{{ offer_CODE }}</span>
                                </div>
                                <div>
                                    <label for="qty_offer">ຂໍ້ສະເໜີ ຈໍານວນ:</label>
                                    <span id="qty_offer">{{ qty_offer }}</span>
                                </div>
                                <div>
                                    <label for="totalMoney">ເງິນທັງໝົດ:</label>
                                    <span id="totalMoney">{{ totalMoney }}</span>
                                </div>
                                <div>
                                    <label for="description">ລາຍລະອຽດ:</label>
                                    <span id="description">{{ description }}</span>
                                </div>
                            </v-card-text>
                            <v-card-text style="font-size: 18px;">
                                <div>
                                    <label for="offerManName">ຜູ້ສະເໜີ:</label>
                                    <span id="offerManName">{{ offerManName }}</span>
                                </div>
                                <div>
                                    <label for="h_VICIVLE_NUMBER">ຫົວລັດ:</label>
                                    <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                                </div>
                                <div>
                                    <label for="item_name">ອາໄລ ຊື່:</label>
                                    <span id="item_name">{{ item_name }}</span>
                                </div>


                                <label for="img">ຮູບພາບ:</label>
                                <div>

                                    <img :src="img" style="width: 150px; height: 160px;">

                                </div>
                            </v-card-text>

                        </div>
                    </v-col>
                </v-row>
            </div>
        </div> -->
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
            isPrintClicked: false,
            unit_price: '',
            img: '',
            qty_offer: '',
            real_totalMoney: '',
            sumFooter: null, // Sum footer data
            truck_table_headers: [
                { text: 'ລາຄາໜ້າຈໍານວນ', value: 'unit_price' },
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ໜ້າຈໍານວນ', value: 'qty_offer' },
                { text: 'ລາຄາລວມ', value: 'totalMoney' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ຊື່ຜູ້ສະເໜີ', value: 'offerManName' },
                { text: 'ອາຊີບ', value: 'job' },
                { text: 'ລຳດັບຍ້າຍລົດ', value: 'f_CARD_NO' },
                { text: 'ລຳດັບລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຊື່ສິ່ງທີ່ສະເໜີລຶບ', value: 'item_name' },
                { text: 'ວັນທີສ້າງໃບບິນ', value: 'dateCreate' },
                { text: 'ເລກທີໃບສ້າງໃບບິນ', value: 'offer_CODE' },
                { text: 'ສະທານະ', value: 'status' },



            ],
            truck_data_list: [],
            totalMoney: '',
            description: '',
            offerManName: '',
            item_id1: '', // Ensure item_id1 is correctly initialized
            job: '',
            f_CARD_NO: '',
            item_name: '',
            pocode: '',
            dateCreate: '',
            paid: 0,
            tid: 0,
            cur: '',
            shopName: '',
            offer_CODE: '',
            printData: null,
            showModal: false,
            dialogVisible: false,
            offerManName: '',
            job: '',
            Mechanicequipment: [],
            show_list: [],

            // Ensure no duplicate property names
            h_VICIVLE_NUMBER: '',
            number: '',
            search: '',


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
                item.statusPO === 'NO'
            );
        },
        // Compute the value of tid based on totalMoney and paid
    },
    methods: {

        calculateTotalMoney() {
            this.tid = this.real_totalMoney - this.paid;
        },
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

        onGetMechanicequipment(item_id) {
            console.log(item_id);

            let data = this.Mechanicequipment.filter((el) => el.item_id === item_id);
            console.log('head:', data);
            this.itemName = data[0]?.itemName;
            this.item_id = item_id;

        },
        // onGetMechanicequipment1(item_id) {
        //     console.log(item_id);

        //     // Use item_id1 to filter Mechanicequipment1 array
        //     let data = this.Mechanicequipment1.filter((el) => el.item_id === item_id);
        //     console.log('head:', data);

        //     if (data.length > 0) {
        //         this.itemName1 = data[0].itemName; // Access itemName directly from the first item in the filtered data
        //         this.item_id1 = item_id;
        //         this.img1 = data[0].img; // Assuming 'img' is a property in your data structure
        //     } else {
        //         // Handle the case when data is not found
        //         console.error('Data not found for item_id1:', item_id);
        //     }
        // },




        async fetchPrintData() {
            try {
                const response = await this.$axios.$get('/api/printData');
                this.printData = response.data;
            } catch (error) {
                console.error('Error fetching print data:', error);
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


        async onGetinbox(offerCode) {
            try {
                const response = await this.$axios.$post('/showofferpaperDetail.service', {
                    toKen: localStorage.getItem('toKen'),
                    offer_CODE: offerCode,
                });

                console.log('Print API response:', response);
                this.sumFooter = response.sumFooter;
                // Update your data properties with the response data
                this.offer_CODE = response.data[0].offer_CODE;
                this.unit_price = response.data[0].unit_price;
                this.qty_offer = response.data[0].qty_offer;
                this.real_totalMoney = response.data[0].real_totalMoney;
                this.totalMoney = response.data[0].totalMoney;
                this.description = response.data[0].description;
                this.offerManName = response.data[0].offerManName;
                this.h_VICIVLE_NUMBER = response.data[0].h_VICIVLE_NUMBER;
                this.item_name = response.data[0].item_name;
                this.img = response.data[0].img;
                this.dateCreate = response.data[0].dateCreate;
                this.shopName = response.data[0].shopName;
                this.status = response.data[0].status;
                this.stock_status = response.data[0].stock_status;
                this.statusPO = response.data[0].statusPO;
                this.item_id = response.data[0].item_id;

                // this.item_id1 = response.data[0].item.item_id1;
                // this.qty_offer1 = response.data[0].item.qty_offer1;

                // this.itemId10 =response.data[0].response.data[0]. item.item_id10;
                // this.qty_offer10 =response.data[0].response.data[0]. item.qty_offer10;

                // this.itemId2 =response.data[0]. item.item_id2;
                // this.qty_offer2 =response.data[0]. item.qty_offer2;

                // this.itemId3 =response.data[0]. item.item_id3;
                // this.qty_offer3 =response.data[0]. item.qty_offer3;

                // this.itemId4 =response.data[0]. item.item_id4;
                // this.qty_offer4 =response.data[0]. item.qty_offer4;

                // this.itemId5 =response.data[0]. item.item_id5;
                // this.qty_offer5 =response.data[0]. item.qty_offer5;

                // this.itemId6 =response.data[0]. item.item_id6;
                // this.qty_offer6 =response.data[0]. item.qty_offer6;

                // this.itemId7 =response.data[0]. item.item_id7;
                // this.qty_offer7 =response.data[0]. item.qty_offer7;

                // this.itemId8 =response.data[0]. item.item_id8;
                // this.qty_offer8 = response.data[0].item.qty_offer8;

                // this.itemId9 =response.data[0]. item.item_id9;
                // this.qty_offer9 =response.data[0]. item.qty_offer9;

                // Open the dialog after API call success
                this.openDialog(this.offer_CODE);

                // Call onGetLeaveNumber with the offerCode
                this.onGetLeaveNumber(offerCode);
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
            console.log('offer_CODE:', this.offer_CODE);
            console.log('item_id:', this.item_id);
            // console.log('item_id1:', this.item_id1);
            console.log('pocode:', this.pocode);
            console.log('total:', this.total);
            console.log('paid:', this.paid);
            console.log('tid:', this.tid);
            console.log('cur:', this.cur);

            // Close the dialog after submission
            this.closeDialog();
        },

        async ongetppocode() {
            try {
                const response = await this.$axios.$post('/GenCodePO.service');
                // Handle the response and extract the po_CODE
                const po_CODE = response.data[0]?.po_CODE;
                console.log("GenCodePO API response:", response);

                // Call onSubmit with the generated po_CODE
                this.onSubmit(po_CODE);

            } catch (error) {
                console.error('GenCodePO API error:', error);
                // Handle the error, such as displaying an error message
            }
        },



        async onSubmit(po_CODE) {
            try {
                // Prepare the data to be sent in the request body
                const requestData = {
                    toKen: localStorage.getItem('toKen'),

                    offer_CODE: this.offerCode, // Using the offerCode property

                    pocode: po_CODE, // Using the po_CODE parameter

                    total: this.totalMoney, // Using the qtyOffer property
                    real_totalMoney: this.real_totalMoney, // Using the qtyOffer property

                    paid: this.paid, // Using the qtyOffer property

                    tid: this.tid, // Using the qtyOffer property

                    item_id: this.item_id, // Assuming you have an itemId property set from somewhere

                    cur: this.cur, // Using the qtyOffer property


                    item_id1: this.item_id1,
                    qty_offer1: this.qty_offer1,

                    item_id2: this.itemId2,
                    qty_offer2: this.qtyOffer2,

                    item_id3: this.itemId3,
                    qty_offer3: this.qtyOffer3,

                    item_id4: this.itemId4,
                    qty_offer4: this.qtyOffer4,

                    item_id5: this.itemId5,
                    qty_offer5: this.qtyOffer5,

                    item_id6: this.itemId6,
                    qty_offer6: this.qtyOffer6,

                    item_id7: this.itemId7,
                    qty_offer7: this.qtyOffer7,

                    item_id8: this.itemId8,
                    qty_offer8: this.qtyOffer8,

                    item_id9: this.itemId9,
                    qty_offer9: this.qtyOffer9,

                    item_id10: this.itemId10,
                    qty_offer10: this.qtyOffer10,


                };
                // Send the POST request to the API endpoint
                const response = await this.$axios.$post('/SavePurchaseOrder.service', requestData);

                console.log('SavePurchaseOrder API response:', response);

                // Close the dialog after submission
                this.closeDialog();

                // window.location.reload();

                // You can handle the response here, such as showing a success message or updating UI
            } catch (error) {
                console.error('SavePurchaseOrder API error:', error);
                // Handle the error, such as displaying an error message
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
        onPrint() {
            // Clone the modal content
            const modal = document.getElementById("modalInvoice");
            const cloned = modal.cloneNode(true);
            this.isPrintClicked = true;
            // Create a new section for printing
            let section = document.getElementById("print");
            if (!section) {
                section = document.createElement("div");
                section.id = "print";
                document.body.appendChild(section);
            }

            // Clear existing content and append the cloned modal
            section.innerHTML = "";
            section.appendChild(cloned);

            // Print the content
            // window.print();
        },

        async onGetDatsForPrint(offer_CODE) {
            this.offer_CODE = offer_CODE;
            this.loading_processing = true;
            const data = {
                tid: this.tid,
                paid: this.paid,
                show_list: this.shop_id,
                cut: this.cut,
                total: this.total,
                pocode: pocode,
                offer_CODE: offerCode,
                toKen: localStorage.getItem("toKen")
            };
            try {
                const response = await this.$axios.$post('/SavePurchaseOrder.service', data);

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
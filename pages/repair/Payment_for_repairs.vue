<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#edc69e" class="white--text">
                ສະເໜີໃຊ້
            </v-card-title>

            <div style="margin-top: 10px;margin-left: 10px;margin-right: 10px;">
                <div style="display: flex;">
                    <div style="width:100%;" class="pl-2">
                        <span>ເພີ້ມ ອຸປະກອນ:</span>

                    </div>

                    <div style="width:100%;" class="pl-2">
                        <v-select outlined dense label="ເລືອກ ອຸປະກອນ" :items="Mechanicequipment" item-text="itemName"
                            item-value="item_id" @change="onGetMechanicequipment">
                        </v-select>

                    </div>

                    <div style="width:100%;" class="pl-2">
                        <!-- Autocomplete for selecting vehicle -->
                        <div style="width:100%">
                            <v-autocomplete outlined dense label="ຮ້ານ" :items="show_list" item-text="shop_name"
                                item-value="shop_id" @change="onGetshow" :rules="nameRules">
                            </v-autocomplete>
                        </div>


                    </div>

                    <div style="width:100%;" class="pl-2">
                        <!-- Autocomplete for selecting vehicle -->
                        <div style="width:100%">
                            <v-autocomplete outlined dense label="ເລືອກຫົວລົດ" :items="cars_list"
                                item-text="h_VICIVLE_NUMBER" item-value="key_id" @change="onGetCarDetails"
                                :rules="nameRules">
                            </v-autocomplete>
                        </div>


                    </div>

                    <div style="width:100%;" class="pl-2">
                        <div style="width:100%">
                            <v-autocomplete outlined dense label="ເລືອກຫາງລົດ" :items="truct_footer_data_list"
                                item-text="f_CARD_NO" item-value="key_id" @change="onGetTructFooterDetail"
                                :rules="nameRules">
                            </v-autocomplete>
                        </div>
                    </div>
                </div>
                <div style="display: flex;">
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ຈໍານວນ" dense outlined background-color="#f5f5f5"
                            v-model="qty_offer"></v-text-field>
                        <div class="tops"></div>
                    </div>
                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ລາຄາຕໍ່ອັນ" dense outlined background-color="#f5f5f5"
                            v-model="unit_price"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ເປັນເງິນທັງໝົດ" dense outlined background-color="#f5f5f5"
                            v-model="totalMoney"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ຄຳອະທິບາຍ" dense outlined background-color="#f5f5f5"
                            v-model="description"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="* ຊື່ຜູ້ສະເໜີ" dense outlined background-color="#f5f5f5"
                            v-model="offerManName"></v-text-field>
                        <div class="tops"></div>
                    </div>

                    <div style="width:100%;" class="d-flex align-center pl-2">
                        <v-text-field label="*ໜ້າທີ່ຮັບຜິດຊອບ" dense outlined background-color="#f5f5f5"
                            v-model="job"></v-text-field>
                        <div class="tops"></div>
                    </div>

                </div>
            </div>

            <div class="center-btn mt-10">
                <v-btn elevation="0" color="#448AFF" @click="onGetLeaveNumber">
                    <v-icon color="white">mdi-check</v-icon>
                    <span class="white--text">ບັນທຶກ</span>
                </v-btn>
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
                        <td>{{ row?.item?.statusPO }}</td>
                        <td :class="getStatusClass(row.item.status)">
                            {{ getStatusText(row.item.status) }}
                        </td>
                        <td><v-btn small color="primary" class="card-shadow"
                                @click="onGetDatsForPrint(row?.item?.inVoiceID, row?.item?.cusName, row?.item?.cusID)"><v-icon>mdi-printer</v-icon>ພິມບິນຄືນ</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>


            <!-- component for print  -->
        </v-card>
        <div>
            <div style="display:none">
                <div id="modalInvoice">
                    <v-row>
                        <v-col cols="3">
                            <!-- <img class="mx-auto" src="../assets/images/khounkham.png" height="70px" cover /> -->
                        </v-col>
                        <v-col cols="9">
                            <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">

                                <span style="font-size:14px">

                                    <Noti />

                                </span>

                                <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ,
                                    ສະໜາມກີລາກອງທັບ,
                                    ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                                <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ:
                                    kounkham@Mining
                                    |
                                    ເວັບໄຊ: kounkham</span>
                            </div>
                        </v-col>

                    </v-row>
                </div>
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
            dateCreate: '',
            offer_CODE: '',


            Mechanicequipment: [],
            show_list: [],
            h_VICIVLE_NUMBER: '',
            number: '',
            // Other data properties...
            search: '',
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
        };
    },
    mounted() {
        // Fetch data here or populate truck_data_list from props
    },
    computed: {
        filteredItems() {
            if (!Array.isArray(this.truck_data_list)) {
                return [];
            }
            return this.truck_data_list.filter(item => item.statusPO === 'NO');
        },
    },
    methods: {
        askBeforeDeleteCusInfo(itemId) {
            // Handle delete action
        },
     
        getStatusClass(status) {
            return status === 'N' ? 'red' : 'green';
        },
        getStatusText(status) {
            return status === 'Y' ? 'ຈ່າຍເເລ້ວ' : 'ຍັງບໍ່ຈ່າຍ';
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
        onGetCarDetails(id) {
            console.log(id);

            let data = this.cars_list.filter((el) => el.key_id === id);
            console.log('head:', data);
            this.h_VICIVLE_NUMBER = data[0]?.h_VICIVLE_NUMBER;
            this.h_ID = id;
        },
        onGetTructFooterDetail(key_id) {
            let data = this.truct_footer_data_list.filter((el) => el.fkey_id === key_id);
            console.log("back:", data);
            this.f_CARD_NO = data[0]?.f_CARD_NO;
            this.fkey_id = key_id;

            // Set other data properties as needed
        },
        onGetshow(shop_id) {
            console.log(shop_id);

            let data = this.show_list.filter((el) => el.shop_id === shop_id); // Use id parameter instead of shop_id
            console.log('head:', data);
            this.shop_name = data[0]?.shop_name;
            this.shop_id = shop_id; // Assign id to skey_id

            // Set other data properties as needed
        },
        printInvoice() {
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
            // this.onGetaddshow();
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
        async onGetLeaveNumber() {
            try {
                const response = await this.$axios.$post('/gencodeofferpaper.service');
                console.log("inv:", response);
                if (response.status === '00') {
                    const offerCode = response.data[0]?.offer_CODE;
                    this.onCreateReports(offerCode, this.fkey_id); // Pass fkey_id parameter here
                }
            } catch (error) {
                console.log(error);

            }
        },

        async onCreateReports(offerCode) {
            try {
                this.loading_processing = true;
                const data = {
                    item_id: this.item_id, // Assuming item_id is accessible in this component
                    header_id: this.h_ID, // Assuming h_VICIVLE_NUMBER is accessible in this component
                    footer_id: this.fkey_id, // Assuming fkey_id is accessible in this component
                    shop_id: this.shop_id, // Assuming h_VICIVLE_NUMBER is accessible in this component
                    unit_price: this.unit_price,
                    qty_offer: this.qty_offer, // Assuming number is accessible in this component
                    totalMoney: this.totalMoney,
                    description: this.description,
                    offerManName: this.offerManName,
                    job: this.job,
                    offer_CODE: offerCode,
                    toKen: localStorage.getItem('toKen'),

                };
                console.log("send:", data);

                const response = await this.$axios.$post('/saveofferpaper.service', data);
                console.log("createReport:", response);

                if (response?.status === '00') {
                    this.loading_processing = false;
                    // this.print();
                    // Other actions upon successful creation
                    this.onGetshowdata_table();

                }
            } catch (error) {
                console.log(error);

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
            }


        },



        async onGetDatsForPrint(key, cusName, cusId) {
            this.cusName = cusName;
            this.cusId = cusId;
            this.loading_processing = true;

            const data = {
                billNo: key,
                toKen: localStorage.getItem("toKen")
            };

            try {
                const response = await this.$axios.$post('/PintInvoiceByNo.service', data);

                if (response?.status === '00') {
                    console.log("dataForprint:", response);
                    // Check if these properties exist before accessing them
                    if (response.headerPrint && response.headerPrint.length > 0) {
                        this.data_header_print = response.headerPrint[0];
                    }
                    if (response.data) {
                        this.data_for_print = response.data;
                    }
                    if (response.sumTotal && response.sumTotal.length > 0) {
                        this.sum_total_print = response.sumTotal[0];
                    }
                    setTimeout(() => {
                        this.print();
                    }, 1000);
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
        }



        // Other methods...

    },

    mounted() {
        this.onGetadd(); // Fetch truck footer data when component is mounted
        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
        this.onGetaddshow(); // Fetch truck footer data when component is mounted
        this.onGetTruckFooter(); // Fetch truck footer data when component is mounted
        this.onGetTruckList(); // Fetch truck footer data when component is mounted
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
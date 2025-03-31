<template>
    <div>
        <div class="pt-0">
            <v-card class="card-shadow" rounded="lg" style="border:0.2px solid #e0e0e0;border-radius:3px">
                <!-- <v-card-title style="background-color:#e5ac73;height: 100px;" class="white--text">
                    ເມນູ ສ້ອມເເປງ
                </v-card-title> -->
                <v-row>
                    <div>
                        <!-- <v-col v-if="USER_ID === 'ADMIN' && USER_ROLE === 'ADMIN'"> -->
                        <v-col>
                            <!-- <v-btn style="border: 2px solid rgb(151,90,28);height: 70px;font-size: 25px;" to="./Create_bin" >ສະເໝີ ໃຊ້ </v-btn> -->
                            <v-btn style="width: 200px;border: 2px solid rgb(151,90,28);height: 70px;font-size: 18px;"
                                to="/Create_bin1">ສະເໝີໃຊ້ອະໄຫຼ່ໃນສາງ </v-btn>
                        </v-col>
                    </div>
                    <div>
                        <v-col>
                            <v-btn style="width: 200px;border: 2px solid rgb(151,90,28);height: 70px;font-size: 18px;"
                                to="./add">ເພີ່ມຂໍ້ມູນອາໄຫຼ່
                                ຫຼື ຮ້ານ</v-btn>
                        </v-col>
                    </div>
                    <div>
                        <v-col>
                            <v-btn style="width: 200px;border: 2px solid rgb(151,90,28);height: 70px;font-size: 18px;"
                                to="./Payment_for_repairs">ສ້າງໃບສະເໝີຊື້ອາໄຫຼ່ເຂົ້າ</v-btn>
                            <v-badge style="margin-left: -10px;" :content="total_Offer_List" color="teal">
                            </v-badge>
                        </v-col>
                    </div>
                    <div class="mt-2 ml-4 pt-6" style="width: 500px; ">
                        <v-text-field dense solo flat background-color="#f5f5f5" v-model="search"
                            placeholder="ຄົ້ນຫາ..." prepend-inner-icon="mdi-magnify" clearable></v-text-field>
                    </div>
                </v-row>
                <v-chip color="#A7FFEB" class="mt-2 ml-4" v-if="bouang">
                    {{ bouang }}
                </v-chip>
                <div class="mt-6" style="background-color:#e5ac73;height: 70px; color: black; font-size: 18px; font-weight: bold;padding: 16px;">
                    ລາຍການທີໄດ້ຮັບການສັ່ງຊື້ເເລ້ວ
                </div>
                <v-data-table :headers="truck_table_headers" :items="filteredItems" :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>{{ row?.item?.offer_CODE }}</td>
                            <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                            <td>{{ row?.item?.item_id }}</td>
                            <td>{{ row?.item?.qty_offer?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.unit_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</td>
                            <td>{{ row?.item?.description }}</td>
                            <td>{{ row?.item?.offerManName }}</td>
                            <td>{{ row?.item?.job }}</td>
                            <td>{{ row?.item?.f_CARD_NO }}</td>
                            <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                            <td :class="getStatusClass(row.item.status)">
                                {{ getStatusText(row.item.status) }}
                            </td>
                            <td :class="getStatusClasspo(row.item.statusPO)">
                                {{ getStatusTextpo(row.item.statusPO) }}
                            </td>
                            <td :class="getStatusClassstock_status(row.item.stock_status)">
                                {{ getStatusTextstock_status(row.item.stock_status) }}
                            </td>
                            <td>{{ row?.item?.dateCreate }}</td>
                        </tr>
                    </template> <!-- Your data table content here -->
                </v-data-table>
                <div>
                    <Warehouse />
                </div>
            </v-card>
            <!-- Data Table printer -->
            <div style="display:none">
                <div id="modalInvoice">
                    <v-row>
                        <v-col cols="3">
                        </v-col>
                        <v-col cols="9">
                            <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                                <span style="font-size:19px">
                                    <Noti />
                                </span>
                                <span style="font-size:18px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ,
                                    ສະໜາມກີລາກອງທັບ,
                                    ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                                <span style="font-size:18px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ:
                                    kounkham@Mining
                                    |
                                    ເວັບໄຊ: kounkham</span>
                            </div>
                        </v-col>
                    </v-row>
                    <br>
                    <div
                        style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                        <div>ບັນຊີຂົນສົ່ງ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ...............................
                        </div>
                    </div>
                    <div
                        style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                        <div>ບັນຊີຂົນສົ່ງ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ...............................
                        </div>
                    </div>
                    <div
                        style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                        <div>ບັນຊີຂົນສົ່ງ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ...............................
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Data Table printer -->
    </div>
</template>
<script>
import Swal from "sweetalert2";// ในคอมโพเนนต์ที่ใช้ EventBus
import Warehouse from '../wareHouse/warehouse.vue';

export default {
    data() {
        return {
            search: '',
            total_Offer_List: '',
            truck_table_headers: [
                { text: 'ລະຫັດສະເຫນີ', value: 'offer_CODE' },
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ID ລາຍການ', value: 'item_id' },
                { text: 'ຈໍານວນ', value: 'qty_offer' },
                { text: 'ລາ​ຄາ​ຕໍ່​ຫນ່ວຍ', value: 'unit_price' },
                { text: 'ລາຄາລວມ', value: 'totalMoney' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ຊື່ຜູ້ສະເໜີ', value: 'offerManName' },
                { text: 'ວຽກ', value: 'job' },
                { text: 'ຫາງລົດ', value: 'f_CARD_NO' },
                { text: 'ຫົວລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ສະຖານະຮ້ານ', value: 'status' },
                { text: 'ສະຖານະການສັງຊື', value: 'statusPO' },
                { text: 'ສະຖານະການນໍາເຂົ້າ', value: 'stock_status' },
                { text: 'ວັນທີສ້າງ', value: 'dateCreate' },
            ],
            truck_data_list: [],
            key_id: null,
            bouang: null,

        }
    },
    computed: {
        filteredItems() {
            if (!Array.isArray(this.truck_data_list)) {
                return [];
            }
            return this.truck_data_list.filter(item =>
                item.statusPO === 'YES'
            );
        },
    },
    // Your component logic here
    methods: {
        getStatusClass(status) {
            return status === 'N' ? 'red' : 'green';
        },
        getStatusText(status) {
            return status === 'Y' ? 'ຮ້ານນອກ' : 'ຮ້ານເຄດິດ';
        },
        getStatusClasspo(statusPO) {
            return statusPO === 'NO' ? 'orange' : 'blue';
        },
        getStatusTextpo(statusPO) {
            return statusPO === 'YES' ? 'ສັງຊືເເລ້ວ' : 'ຍັງບໍ່ໄດ້ສັງຊື';
        },
        getStatusClassstock_status(stock_status) {
            return stock_status === 'IN' ? '#e15d9e' : 'e15d9e';
        },
        getStatusTextstock_status(stock_status) {
            return stock_status === 'wait' ? 'ຖ້ານໍາເຂົ້າ' : 'ນໍາເຂົ້າເເລ້ວ';
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
        total_count() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/getNotiTab3.service', {
                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    this.loading_processing = false;
                    if (data && data.status === '00') {
                        this.total_Offer_List = data.total_Offer_List;
                        this.total_FuelUnpaid = data.total_FuelUnpaid;
                    } else {
                        // Handle API response with error status
                        swal.fire({
                            icon: 'error',
                            text: data?.message || 'Failed to fetch data',
                        });
                    }
                }).catch((error) => {
                    this.loading_processing = false;
                    console.log(error);
                    // Display error alert using SweetAlert2
                    swal.fire({
                        icon: 'error',
                        text: 'Failed to fetch data from the API',
                    });
                });
            } catch (error) {
                this.loading_processing = false;
                console.log(error);
                // Display error alert using SweetAlert2
                swal.fire({
                    icon: 'error',
                    text: error.toString(),
                });
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
        testBor() {
            Swal.fire({
                title: 'ສຳເລັດ!',
                text: 'ສາງອາໄຫຼ່ຂອງບໍ່',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        }
    },
    mounted() {
        const { bouang, key_id } = this.$route.query;  // Destructure values from query params
        if (key_id) {
            // If 'key_id' has a truthy value in query params
            this.bouang = bouang;
            this.key_id = key_id;
            // this.testBor();

        } else {
            // If 'key_id' is falsy (undefined, null, etc.)
            this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
            this.total_count()
            this.USER_ID = localStorage.getItem('USER_ID')
            this.USER_NAME = localStorage.getItem('USER_NAME')
            this.USER_ROLE = localStorage.getItem('USER_ROLE')
        }
    },
};
</script>
<style>
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

.v-btn {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 150px;
}
</style>
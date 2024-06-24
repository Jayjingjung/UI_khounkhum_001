<template>
    <div>
        <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="filteredItems" :search="search">
            <template v-slot:item="row">
                <tr>
                    <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                    <td>{{ row?.item?.qty_offer }}</td>
                    <td>{{ row?.item?.unit_price }}</td>
                    <td>{{ row?.item?.totalMoney }}</td>
                    <td>{{ row?.item?.description }}</td>
                    <td>{{ row?.item?.offerManName }}</td>
                    <td>{{ row?.item?.job }}</td>
                    <td>{{ row?.item?.f_CARD_NO }}</td>
                    <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                    <td>{{ row?.item?.item_name }}</td>
                    <td>{{ row?.item?.offer_CODE }}</td>
                    <td>{{ row?.item?.statusPO }}</td>
                    <td>{{ row?.item?.dateCreate }}</td>
                    <td :class="getStatusClass(row.item.status)">
                        {{ getStatusText(row.item.status) }}
                    </td>
                    <td>
                        <v-btn small color="primary" class="card-shadow" @click="onGetinbox(row.item.offer_CODE)">
                            <v-icon>mdi-printer</v-icon>ພິມບິນຄືນ
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>

        
        <div style="display: none">
            <div id="modalInvoice">
                <v-row>
                    <v-col cols="3">
                        <!-- Placeholder for an image -->
                 
                    </v-col>
                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">
                            <!-- Notifications or other content -->
                            <span style="font-size:14px">
                                <Noti />
                            </span>
                            <span style="font-size:12px">
                                ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ
                            </span>
                            <span style="font-size:12px">
                                ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining | ເວັບໄຊ: kounkham
                            </span>
                            <!-- Print the fetched data -->
                        </div>
                    </v-col>
                </v-row>
                <!-- Print the fetched data -->
                <v-table v-if="invoiceData" :data="invoiceData">
                    <template #default="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <!-- Display the unit_price -->
                                <td>{{ item.unit_price }}</td>
                                <!-- Add more columns here as needed -->
                            </tr>
                        </tbody>
                    </template>
                </v-table>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
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
            loading_processing: false,
        search: '',
        invoiceData: null, // Add this line
        };
    },
    mounted() {
        this.onGetshowdata_table();
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
        getStatusClass(status) {
            return status === 'N' ? 'red' : 'green';
        },
        getStatusText(status) {
            return status === 'Y' ? 'ຈ່າຍເເລ້ວ' : 'ຍັງບໍ່ຈ່າຍ';
        },
       
        showErrorAlert(title, message) {
            // Display error alert
        },
    },

    async onGetinbox(offerCode) {
        try {
            // method implementation
        } catch (error) {
            console.error('Print API error:', error);
            // Handle the error, such as displaying an error message
        }
    },
        print() {
            const modal = document.getElementById('modalInvoice');
            const cloned = modal.cloneNode(true);
            let section = document.getElementById('print');
            if (!section) {
                section = document.createElement('div');
                section.id = 'print';
                document.body.appendChild(section);
            }
            section.innerHTML = '';
            section.appendChild(cloned);
            window.print();
            // location.reload();
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
</style>
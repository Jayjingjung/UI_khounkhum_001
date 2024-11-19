<template>
    <div>
        <div>
            <v-card class="card-shadow mb-5" rounded="lg">
                <v-card-title class="white--text" style="background-color: #af565c">





                    <span>ຢືນຢັນ ໃບສະເໜີ ເເຕ່ລະເເຂວງ</span>
                    <v-spacer></v-spacer>


                </v-card-title>

                <v-card-title>
                    <v-btn class="btn-confirm" @click="selectAllItems">
                        ເລືອກທັງໝົດ
                    </v-btn>
                    <v-btn class="btn-confirm" @click="deselectAllItems">
                        ຍົກເລີກທັງໝົດ
                    </v-btn>


                    <v-spacer></v-spacer>
                    <!-- Currency Buttons -->
                    <div class="button-group">




                    </div>

                    <v-spacer></v-spacer>


                    <!-- Other buttons and content -->
                    <v-btn style="background-color: seagreen; color: aliceblue; width: 150px;" @click="onPayToShop">
                        ຢືນຢັນ
                    </v-btn>
                </v-card-title>
                <v-data-table :items-per-page="5" :headers="table_confirm" :items="filteredItems" :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td>
                                <!-- Checkbox with selection -->
                                <v-checkbox v-if="row?.item?.statusNy !== 'jaiyleo'" v-model="selectedItems"
                                    :value="row.item" @change="updateTotalTid" />
                            </td>
                            <td>{{ row?.item?.offer_CODE }}</td>
                            <td>{{ row?.item?.pocode }}</td>
                            <td>{{ row?.item?.item_name }}</td>
                            <td>{{ formatNumber(row?.item?.h_VICIVLE_NUMBER) }}</td>
                            <td>{{ formatNumber(row?.item?.h_BRANCH) }}</td>
                            <td>{{ formatNumber(row?.item?.total_Price) }}</td>
                            <td>{{ formatNumber(row?.item?.dateFix) }}</td>
                            <td>{{ formatNumber(row?.item?.totalFixCost) }}</td>
                            <td>{{ row?.item?.totalFixCost }}</td>
                     
                        </tr>
                    </template>
                </v-data-table>
            </v-card>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

            table_confirm: [
                { text: 'Checkbox', value: 'Checkbox' },
                { text: 'ລະຫັດບິນ', value: 'offer_CODE' },
                { text: 'ລະຫັດບິນ', value: 'pocode' },
                { text: 'h_VICIVLE_NUMBER', value: 'h_VICIVLE_NUMBER' },
                { text: 'h_BRANCH', value: 'h_BRANCH' },
                { text: 'total_Price', value: 'total_Price' },
                { text: 'dateFix', value: 'dateFix' },
                { text: 'totalTimeFix', value: 'totalTimeFix' },
                { text: 'totalFixCost', value: 'totalFixCost' },
            

      
            ],

        };
    },
    mounted() {


    },


    methods: {
        async ontable_confirm() {
            try {
                this.loading_processing = true;
                const data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem('toKen'),
                };

                const response = await this.$axios.$post('.service', data);

                if (response?.status === '00' && response?.data) {
                    this.table_confirm = response.data;
                } else {
                    // Clear the data if no results are found
                    this.table_confirm = [];
                }
            } catch (error) {
                console.error('API error:', error); // Log the error
                this.table_confirm = []; // Clear the data on error
            } finally {
                this.loading_processing = false;
            }
        },
    },
};
</script>


<style scoped>
.btn-custom {
    margin-left: 2px;
    margin-right: 2px;
    background-color: white;
    color: black;
    height: 65px;
    border: 1px solid rgb(221, 5, 245);
}

.icon-custom {
    color: rgb(221, 5, 245);
}

.btn-confirm {
    background-color: green;
    width: 150px;
    color: rgb(0, 0, 0);
}
</style>
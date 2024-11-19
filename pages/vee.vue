<template>
    <v-container>
        <v-card>
            <v-data-table :headers="headers" :items="items" :search="search" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>ສະແດງຂໍ້ມູນສ້ອມແປງ</v-toolbar-title>
                    </v-toolbar>
                    <v-card-actions>
                        <v-card-title>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="ຄົ້ນຫາ" single-line
                                hide-details></v-text-field>
                        </v-card-title>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            search: '',
            items: [],
            headers: [
                { text: 'Key ID', value: 'key_id' },
                { text: 'Header ID', value: 'header_id' },
                { text: 'Item Name', value: 'item_name' },
                { text: 'Item ID', value: 'item_id' },
                { text: 'Branch Inventory', value: 'branch_inventory' },
                { text: 'Total Price', value: 'total_Price' },
                { text: 'Quantity Fix', value: 'qty_Fix' },
                { text: 'Description', value: 'description' },
                { text: 'Date Fix', value: 'dateFix' },
                { text: 'Fix Detail', value: 'fix_Detail' },
                { text: 'location_fix', value: 'location_fix' },
                { text: 'approve_status', value: 'approve_status' },
                { text: 'h_VICIVLE_NUMBER', value: 'h_VICIVLE_NUMBER' },
                { text: 'f_BRANCH', value: 'f_BRANCH' },
            ],
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                // API
                const response = await this.$axios.$post(
                    'http://khounkham.com/api-prod/v1/truck/showListofFixReq.service',
                    {
                        branchUser: this.USER_ROLE,
                        toKen: this.toKen,
                    }
                );
                if (response?.status === '00') {
                    this.items = response?.data || [];
                } else {
                    console.error('Error fetching data:', response?.message);
                    this.items = [];
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
};
</script>
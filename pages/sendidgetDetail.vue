<template>
    <div>
        <v-data-table :headers="detailHeaders" :items="truck_data_list" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>ລາຍລະອຽດ ລາໄລ</v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        <v-avatar style="width: 80px; height: 80px;">
                            <img :src="item.img" style="width:100%; height:100%;" />
                        </v-avatar>
                    </td>
                    <td>{{ item.item_name }}</td>
                    <td>{{ item.item_qty }}</td>
                    <!-- <td>{{ item.qty_offer }}</td> -->
                    <td>{{ item.date_import }}</td>
                </tr>
            </template>
        </v-data-table>
    </div> 
</template>
 
<script>
export default {
    data() {
        return {
            item: '',
            truck_data_list: [],
            detailHeaders: [
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ລາໄລ', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'item_qty' },
                { text: 'ວັນທີ', value: 'date_import' },
            ],
        }
    },
    mounted() {
        if (this.$route.query.item_id) {
            this.ongetData();
        }
    },
    methods: {
        async ongetData() {
            try {
                const response = await this.$axios.$post('/ItemHis.service', {
                    item_id: this.$route.query.item_id,
                    // item_name: this.$route.query.item_name,
                    startDate: this.$route.query.startDate,
                    endDate: this.$route.query.endDate,
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
                this.showErrorAlert('Error', 'Failed to fetch item details');
            }
        },
        showErrorAlert(title, message) {
            swal.fire({
                icon: 'error',
                title: title,
                text: message,
            });
        },
    },
};
</script>
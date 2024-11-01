<template>
    <div>
        <!-- Data Table -->
        <v-data-table :items="report_listCarOfficeDAO2" :headers="report_leave_caroffice_header_DAO2" :search="search">
            <template v-slot:item="row">
                <tr>
                    <td>
                        <img :src="row.item.img" style="height: 100px; width: 100px;">
                    </td>
                    <td>
                        <pdf style="width: 700px; height: 800px;" :src="selectedPdfUrl"></pdf>

                    </td>
                    <td>{{ row.item.license_plate }}</td>
                    <td>{{ row.item.pricePaid }}</td>
                    <td>{{ row.item.cur }}</td>
                    <td>{{ row.item.dateCreate }}</td>
                </tr>
            </template>
        </v-data-table>


    </div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
    components: {
        pdf,
    },
    data() {
        return {
            report_listCarOfficeDAO2: [],
            report_leave_caroffice_header_DAO2: [
                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'PDF', value: 'pdfFile' },
                { text: 'ປ້າຍລົດ', value: 'license_plate' },
                { text: 'ຈໍານວນເງີນ', value: 'pricePaid' },
                { text: 'ສະກຸນເງີນ', value: 'cur' },
                { text: 'ວັນທີ', value: 'dateCreate' }
            ],
            showPdfViewer: false,
            selectedPdfUrl: ''
        };
    },
    mounted() {
        this.listCarOfficeDAO2();
    },
    methods: {
        async listCarOfficeDAO2() {
            try {
                this.loading_processing = true;
                let data = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    toKen: localStorage.getItem('toKen')
                };
                const response = await this.$axios.$post('/listCarThatPaid.service', data);
                if (response?.status === "00") {
                    this.report_listCarOfficeDAO2 = response?.data.map(item => ({
                        ...item,
                        pdfFile: item.pdfFile ? `http://khounkham.com/images/car/${item.pdfFile}` : null
                    }));
                } else {
                    this.report_listCarOfficeDAO2 = [];
                }
            } catch (error) {
                console.error('Error fetching report fuel data:', error);
                // Handle error message display or other logic here
            } finally {
                this.loading_processing = false;
            }
        },
        showPdf(pdfUrl) {
            this.selectedPdfUrl = pdfUrl;
            this.showPdfViewer = true;
            // You might want to scroll to the PDF viewer section if needed
            this.$nextTick(() => {
                this.$refs.pdfViewer.$el.scrollIntoView();
            });
        }
    }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
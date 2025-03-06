<template>
    <div>
        <v-card style="width:1800px;height:800px;">
            <div v-if="selectedCard === '1'">
                <v-card class="card-shadow mb-4" rounded="lg">
                    <v-card-actions style="background-color: #E0F7FA;">
                        <v-btn class="ml-4" fab elevation="0" small color="#00E676" @click="$router.back()">
                            <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                        </v-btn>
                        <div style="font-weight: bold; font-size: 22px;" class="ml-8 mt-2">
                            ເອກະສານຕ່າງໆ
                            <v-divider></v-divider>
                        </div>
                        <v-chip v-if="village" style="font-weight: bold; font-size: 18px;" class="ml-8 mt-2">
                            {{ village }}
                        </v-chip>
                        <v-spacer></v-spacer>
                        <div>
                            <v-btn style="margin-left: 10px;" color="primary" class="card-shadow"
                                @click="setBound('in')">
                                <v-icon>mdi-</v-icon>ຂາເຂົ້າ
                            </v-btn>
                            <v-btn style="margin-left: 10px;" color="primary" class="card-shadow"
                                @click="setBound('out')">
                                <v-icon>mdi-</v-icon>ຂາອອກ
                            </v-btn>
                            <!-- <v-btn to="./HR/akasarn" style="background-color: #00E676">
                                <v-icon color="white">mdi-plus</v-icon>
                            </v-btn> -->
                        </div>
                    </v-card-actions>
                    <v-card-title style="display: flex; border-bottom:0.5px solid #e0e0e0;">
                        <div>
                            <div class="mb-4">
                                <div v-if="uniqueNameDetails.length">
                                    <v-row>
                                        <v-col cols="12" sm="6" md="3" v-for="(item, index) in uniqueNameDetails"
                                            :key="index" class=" justify-center align-center "
                                            @click="onButtonClick(item)">
                                            <v-card :class="{ 'hovered-card': isItemHovered === item }"
                                                :color="isItemHovered === item ? '#64FFDA' : '#E0F7FA'">
                                                <v-card-text class="text-center font-weight-bold"
                                                    style="font-size: 20px;">
                                                    <div>{{ item }}</div>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div v-else class="text-center mt-5">
                                    <div style="font-size: 20px; font-weight: bold;color: #ff5733;">ຍັງບໍ່ມີເອກະສານ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card-title>
                    <div class="mt-2">
                        <v-text-field class="ma-6" v-model="search" label="ຄົ້ນຫາ" clearable append-icon="mdi-magnify"
                            :style="{ width: '300px' }"></v-text-field>
                        <v-data-table :items="filteredItems" :headers="filteredHeaders" :items-per-page="50"
                            :search="search">
                            <template v-slot:item="row">
                                <tr>
                                    <td>
                                        <v-badge color="red" v-if="row?.item?.status === 'EXPIRE'">
                                            {{ row?.item?.lektee }}
                                        </v-badge>
                                        <span v-else>
                                            {{ row?.item?.lektee }}
                                        </span>
                                    </td>
                                    <td>{{ row?.item?.content_doc }}</td>
                                    <td>{{ row?.item?.docType }}</td>
                                    <td>{{ row?.item?.whocarrydoc }}</td>
                                    <td>{{ row?.item?.datetakein }}</td>
                                    <td>{{ row?.item?.dateExpDoc }}</td>
                                    <!-- <td>{{ row?.item?.etc }}</td> -->
                                    <td>{{ row?.item?.dateCreate }}</td>
                                    <!-- <td v-if="!hideBound">{{ getBoundText(row?.item?.bound) }}</td> -->
                                    <td>{{ row?.item?.bouang }}</td>
                                    <td>{{ row?.item?.classofdocs }}</td>
                                    <!-- <td>{{ row?.item?.userIdoffinanceial }}</td> -->
                                    <td>
                                        <v-chip @click="showpdf(row?.item?.pdf)" size="30"
                                            color="#00E676">ເບີ່ງ</v-chip>
                                    </td>
                                    <td>
                                        <v-icon @click="viewdelete(row?.item?.key_id)" size="30" color="#FF1744">
                                            mdi-delete
                                        </v-icon>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                    </div>
                </v-card>
            </div>
        </v-card>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            selectedCard: '1', // This will hold the selected card to display
            selectedDoctype: null,
            selectedProduct: null,
            compan: null,
            selectedBuang: null,
            products_data_list: [], // Defined here
            classofdocs: '',
            header: [
                { text: 'ເອກະສານເລກທີ', value: 'lektee', class: 'header-font-size' },
                { text: 'ຊື່ເອກະສານ', value: 'content_doc', class: 'header-font-size' },
                { text: 'ປະເພດເອກະສານ', value: 'docType', class: 'header-font-size' },
                { text: 'ນຳເອກະສານມາໂດຍ', value: 'whocarrydoc', class: 'header-font-size' },
                { text: 'ຂໍ້ມູນວັນທີ່', value: 'datetakein', class: 'header-font-size' },
                { text: 'ວັນທີໝົດອາຍຸ', value: 'dateExpDoc', class: 'header-font-size' },
                // { text: 'ອື່ນໆ', value: 'etc' },
                { text: 'ວັນທີ່ນໍາເຂົ້າ', value: 'dateCreate', class: 'header-font-size' },
                // { text: 'ປະເພດຂາ', value: 'bound', class: 'header-font-size' },
                { text: 'ບ້ວງ', value: 'bouang', class: 'header-font-size' },
                { text: 'ຂັ້ນ', value: 'classofdocs' , class: 'header-font-size' },
                // { text: 'id', value: 'userIdoffinanceial' , class: 'header-font-size' },
                { text: 'ເບີ່ງ', value: '', class: 'header-font-size' },
                { text: 'ແກ້ໄຂ', value: '', class: 'header-font-size' }, // Add an extra column header for the new button
            ],
            report_listitemOffice: [],
            loca_data_list: [],// Defined here
            userIdoffinanceial: "",
            buang_data_list: '',
            search: '', // Add the search property here
            bound: '',
            value: "",
            etc: '',
            buang_data_list: [],
            whocarrydoc: '',
            content_doc: '',
            USER_NAME: localStorage.getItem('USER_NAME'), // Retrieve the USER_NAME from local storage
            isItemHovered: null, //  hover
            bouang: null,
            village: ''
        };
    },
    computed: {
        // Unique nameDetails for filter buttons
        uniqueNameDetails() {
            return [
                ...new Set(
                    this.report_listitemOffice
                        .map((item) => item.docType)
                        .filter((value) => value && value !== 'null') // ຕັດ null
                ),
            ];
        },
        filteredItems() {
            let items = this.report_listitemOffice;
            if (this.selectedDoctype) {
                items = items.filter((item) => item.docType === this.selectedDoctype);
            }
            return items;
        },

        hideBound() {
            return ['may34', 'tae49', 'puna37', 'nok37'].includes(this.USER_NAME);
        },
        filteredHeaders() {
            return this.header.filter(header => {
                if (header.value === 'bound') return !this.hideBound;
                return true;
            });
        }
    },
    mounted() {
        // this.onGetbuang();
        const bouang = this.$route.query.bouang;
        const village = this.$route.query.village;
        if (bouang && village ) {
            this.bouang = bouang;
            this.village = village;
            this.listCarOfficeSearch();
        }
    },
    methods: {
        async listCarOfficeSearch() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/listDocumentAllBySearch.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
                    bouang: this.bouang,
                    company: this.company,
                    type: this.selectedProduct,
                });
                console.log('API Response:', response);  // Log the API response
                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || []; // Ensure it's always an array
                } else {
                    this.report_listitemOffice = [];
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        async viewdelete(key_id) {
            try {
                // Show confirmation dialog
                const result = await swal.fire({
                    title: 'ທ່ານແນ່ໃຈວ່າຈະລຶບແທ້ບໍ?',
                    text: 'ເພາະຖ້າລຶບແລ້ວ ຈະບໍ່ສາມາດກູ້ຄືນໄດ້!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ບັນທືກການລຶບ',
                    cancelButtonText: 'ຍົກເລີກ'
                });
                if (result.isConfirmed) {
                    // Call API to delete item if confirmed
                    const response = await this.$axios.$post('/DelDocumentByID.service', {
                        action: 'delete',
                        key_id: key_id
                    });
                    if (response && response.status === '00') {
                        swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        this.listCarOffice(); // Refresh the list
                    } else {
                        swal.fire(
                            'Failed!',
                            'There was an error deleting your file.',
                            'error'
                        );
                    }
                }
            } catch (error) {
                // Handle errors
                this.$toast.error('fail to connect');
                console.error(error);
            }
        },
        onButtonClick(docType) {
            this.selectedDoctype = docType;
            this.isItemHovered = this.isItemHovered === docType ? null : docType;
        },
        showpdf(pdfUrl) {
            window.open(pdfUrl, '_blank');
        },
        getBoundText(bound) {
            return bound === 'in' ? 'ຂາເຂົ້າ' : (bound === 'out' ? 'ຂາອອກ' : '');
        },
    },
};
</script>
<style>
.header-font-size {
    font-size: 16px !important;
    /* Adjust the font size as needed */
    color: #000;
}

.hovered-card {
    transform: scale(1.10);
    /* Slightly enlarge the card */
    transition: transform 0.2s ease-in-out;
    /* Smooth transition */
}
</style>

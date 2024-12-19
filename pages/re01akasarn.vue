<template>
    <div>
        <v-card style="width:1800px;height:800px;">
            <div v-if="selectedCard === '1'">
                <v-card class="card-shadow mb-4" rounded="lg">
                    <v-card-actions style="background-color: #00E676;">
                        <v-btn class="ml-4" fab elevation="0" small color="#E0F7FA" @click="$router.back()">
                            <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                        </v-btn>
                        <div style="font-weight: bold; font-size: 22px;" class="ml-8 mt-2">
                            ເອກະສານຕ່າງໆ
                            <v-divider></v-divider>
                        </div>
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
                    <v-card-actions>
                        <div class="mt-6 d-flex">
                            <v-autocomplete style="width: 450px; margin-left: 15px; margin-right: 15px;" outlined dense
                                label="ເລືອກບ້ວງ" :items="buang_data_list" item-text="nameOfBouang"
                                item-value="nameOfBouang" background-color="#84FFFF"
                                v-model="selectedBuang"></v-autocomplete>
                            <v-btn class="mb-5" style="color: black;" color="#84FFFF"
                                @click="listCarOfficeSearch">
                                ຄົ້ນຫາຕາມບ້ວງ
                            </v-btn>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="mb-4 mr-8">
                            <v-autocomplete :items="uniqueNameDetails" label="ເລືອກປະເພດ"
                                :return-object="true">
                                <template v-slot:item="{ item }">
                                    <v-list-item :class="{ 'hovered-card': isItemHovered === item }"
                                        :style="{ backgroundColor: isItemHovered === item ? '#64FFDA' : '#E0F7FA' }"
                                        @click="onButtonClick(item)" @mouseenter="isItemHovered = item"
                                        @mouseleave="isItemHovered = null">
                                        <v-list-item-content>
                                            <v-list-item-title>{{ item }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-autocomplete>
                        </div>
                    </v-card-actions>
                    <!-- <v-card-title style="display: flex; border-bottom:0.5px solid #e0e0e0;">
                        <div>
                            <div class="mb-4">
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
                        </div>
                    </v-card-title> -->
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
                                    <td v-if="!hideBound">{{ getBoundText(row?.item?.bound) }}</td>
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
            isItemHovered: null, //  hover
            license_plate: '',
            selectedLoca: '',
            selectedProduct: null,
            compan: null,
            selectedBuang: null,
            products_data_list: [], // Defined here
            conditionalItems1: ['ຂັ້ນເມືອງ', 'ຂັ້ນເເຂວງ', 'ຂັ້ນສໍານັກງານນາຍົກ'],
            classofdocs: '',
            pdfDialog: false, // Controls the visibility of the PDF dialog
            header: [
                { text: 'ເອກະສານເລກທີ', value: 'lektee', class: 'header-font-size' },
                { text: 'ຊື່ເອກະສານ', value: 'content_doc', class: 'header-font-size' },
                { text: 'ປະເພດເອກະສານ', value: 'docType', class: 'header-font-size' },
                { text: 'ນຳເອກະສານມາໂດຍ', value: 'whocarrydoc', class: 'header-font-size' },
                { text: 'ຂໍ້ມູນວັນທີ່', value: 'datetakein', class: 'header-font-size' },
                { text: 'ວັນທີໝົດອາຍຸ', value: 'dateExpDoc', class: 'header-font-size' },
                // { text: 'ອື່ນໆ', value: 'etc' },
                { text: 'ວັນທີ່ນໍາເຂົ້າ', value: 'dateCreate', class: 'header-font-size' },
                { text: 'ປະເພດຂາ', value: 'bound', class: 'header-font-size' },
                { text: 'ບ້ວງ', value: 'bouang', class: 'header-font-size' },
                { text: 'ຂັ້ນ', value: 'classofdocs', class: 'header-font-size' },
                // { text: 'id', value: 'userIdoffinanceial' , class: 'header-font-size' },
                { text: 'ເບີ່ງ', value: '', class: 'header-font-size' },
                { text: 'ແກ້ໄຂ', value: '', class: 'header-font-size' }, // Add an extra column header for the new button
            ],
            report_listitemOffice: [],
            loca_data_list: [],// Defined here
            userIdoffinanceial: "",
            buang_data_list: '',
            search: '', // Add the search property here
            selectedConditional1: null,
            bound: '',
            value: "",
            userIdoffinanceial: "", // This will be set dynamically
            etc: '',
            buang_data_list: [],
            search: '',
            whocarrydoc: '',
            content_doc: '',
            USER_NAME: localStorage.getItem('USER_NAME'), // Retrieve the USER_NAME from local storage
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
        this.listCarOffice();
        this.onGetbuang();
    },
    methods: {
        setBound(value) {
            this.bound = value;
            this.listCarOffice();
        },
        async listCarOffice() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/listDocumentAll.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
                    bound: this.bound,
                    bouang: this.selectedBuang,
                    userIdoffinanceial: this.userIdoffinanceial // Pass the selected userIdoffinanceial value here
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
        async listCarOfficeSearch() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/listDocumentAllBySearch.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
                    bouang: this.selectedBuang,
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
        async onGetbuang() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/getBouangAll.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response.status == '00' && Array.isArray(response.data)) {
                    this.buang_data_list = response.data; // Ensure it's assigned as an array
                } else {
                    this.buang_data_list = []; // Fallback to empty array if no valid data
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.buang_data_list = []; // Handle the error by ensuring buang_data_list is an empty array
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'An error occurred.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
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

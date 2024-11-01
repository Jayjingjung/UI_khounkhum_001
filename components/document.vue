<template>
    <div>
        <v-card class="card-shadow mb-4" rounded="lg" style="margin-left: 10px;margin-right: 10px;">
            <v-card-title style="display: flex; border-bottom:0.5px solid #e0e0e0; background-color:#80BFFF; color:white;">
                ລາຍການ ເອກກະສານ
                <div style="width: 400px; margin-left: 50px;" class="d-flex align-center">
                    <v-text-field style="width: 700px;" placeholder="ຄົ້ນຫາ..." v-model="search" rounded
                        background-color="#f5f5f5" prepend-inner-icon="mdi-magnify">
                    </v-text-field>
                </div>
            </v-card-title>

            <div class="mt-2">
                <v-data-table :items="report_listitemOffice" :headers="report_leave_caroffice_header"
                    :items-per-page="50" :search="search">
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
                            <td>
                                <v-btn style="height: 100%;width: 100%;" small color="#0059c8"
                                    class="white--text card-shadow" @click="viewerpdf(row?.item?.pdf)">
                                    <v-icon size="30" color="white">mdi-content-paste</v-icon>
                                </v-btn>
                            </td>
                            <td>{{ row?.item?.datetakein }}</td>
                            <td>{{ row?.item?.dateExpDoc }}</td>
                            <td>{{ row?.item?.docType }}</td>
                            <td>{{ row?.item?.content_doc }}</td>
                            <td>{{ row?.item?.whocarrydoc }}</td>
                            <td>{{ row?.item?.etc }}</td>
                            <td>{{ row?.item?.dateCreate }}</td>
                            <td v-if="!hideInboundNumber">{{ row?.item?.inboundnumber }}</td>
                            <td v-if="!hideOutboundNumber">{{ row?.item?.outboundnumber }}</td>
                            <td v-if="!hideBound">{{ getBoundText(row?.item?.bound) }}</td>
                            <td>{{ row?.item?.classofdocs }}</td>
                            <td>
                                <v-btn style="height: 40px; width: 90px;" small color="#0085e3"
                                    class="white--text card-shadow" @click="showpdf(row?.item?.pdf)">
                                    <v-icon size="30" color="white">mdi-printer-eye</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn style="height: 40px; width: 90px;" small color="#90A4AE"
                                    class="white--text card-shadow" @click="viewdelete(row?.item?.key_id)">
                                    <v-icon size="30" color="white">mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </div>
        </v-card>

        <!-- PDF Popup -->
        <v-dialog v-model="pdfDialog">
            <v-card>
                <v-card-title class="headline">PDF Viewer</v-card-title>
                <v-card-text>
                    <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="1800px" frameborder="0"></iframe>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="pdfDialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            report_listitemOffice: [],
            pdfDialog: false,
            pdfUrl: '',
            search: '',
            report_leave_caroffice_header: [
                { text: 'ເລກທີ', value: 'lektee' },
                { text: 'ເອກກະສານ', value: 'pdf' },
                { text: 'ວັນທີລົ່ງຂໍມູນ', value: 'datetakein' },
                { text: 'ວັນທີໝົດອາຍຸ', value: 'dateExpDoc' },
                { text: 'ປະເພດ', value: 'docType' },
                { text: 'ເນື້ອໃນເອກະສານ', value: 'content_doc' },
                { text: 'ຜູ້ນຳເອກະສານມາ', value: 'whocarrydoc' },
                { text: 'ອື່ນໆ', value: 'etc' },
                { text: 'ວັນທີລົ່ງຂໍມູນ', value: 'dateCreate' },
                { text: 'ຂາເຂົ້າ', value: 'inboundnumber' },
                { text: 'ຂາອອກ', value: 'outboundnumber' },
                { text: 'ປະເພດ', value: 'bound' },
                { text: 'ຂັ້ນ', value: 'classofdocs' },
                { text: '', value: '' },
                { text: '', value: '' },
            ]
        }
    },
    mounted() {
        this.documentlinsOffice(); // Fetch data when the component is mounted
    },
    methods: {
        async documentlinsOffice() {
            try {
                const response = await this.$axios.$post('/listDocumentAllBySearch.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
                    bouang: this.nameOfBouang,
                    company: this.company,
                    type: this.selectedProduct,
                });

                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || [];
                } else {
                    this.report_listitemOffice = [];
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
                console.error(error);
            }
        },
        showpdf(pdfUrl) {
            window.open(pdfUrl, '_blank');
        },
        viewerpdf(pdf) {
            this.pdfUrl = pdf;
            this.pdfDialog = true;
        },
        viewdelete(key_id) {
            swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteDocument(key_id);
                }
            });
        },
        async deleteDocument(key_id) {
            try {
                const response = await this.$axios.$post('/deleteDocument.service', { key_id });
                if (response?.status === "00") {
                    swal.fire('Deleted!', 'Your document has been deleted.', 'success');
                    this.documentlinsOffice(); // Refresh the list after deletion
                } else {
                    swal.fire('Error!', response?.message || 'Failed to delete the document.', 'error');
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
            }
        },
        getBoundText(bound) {
            return bound === 'in' ? 'ຂາເຂົ້າ' : (bound === 'out' ? 'ຂາອອກ' : '');
        }
    }
}
</script>

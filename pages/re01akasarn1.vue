<template>
    <div>
        <div v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
            <v-btn elevation="0" dark width="30" height="30" color="green" @click="$router.back()">
                <v-icon color="#0a3382">mdi-arrow-left</v-icon>
            </v-btn>
        </div>
        <div class="mb-8 mt-6" style="font-size: 20px; font-weight: bold;">
            ເອກະສານຕ່າງໆຂອງຝ່າຍບັນຊີ
            <hr>
        </div>
        <v-card-actions>
            <v-btn class="ml-4" fab elevation="0" small color="#00E676" @click="$router.back()">
                <v-icon color="#0a3382">mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn to="./HR/akasarn" color="#00E676" style="font-size: 16px; font-weight: bold">
                <v-icon color="white">
                    mdi-plus-circle-multiple
                </v-icon>
                ເພີ່ມເອກະສານ
            </v-btn>
        </v-card-actions>
        <v-container fluid fill-height>
            <v-row>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-list-group no-action sub-group>
                            <template v-slot:activator>
                                <v-icon color="green">mdi-file-document</v-icon>
                                <v-list-item-content>
                                    <v-list-item-title
                                        style="font-size: 20px; font-weight: bold;">ເອກະສານ</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item>
                                <v-btn rounded @click="nokDoc('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF', 'ເອກະສານຕ່າງໆ')">
                                    ເບີ່ງ
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="success"
                                    @click="InsertDoc('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF', 'ເອກະສານເອື້ອຍນົກ', 'nok', 'ເພີ່ມເອກະສານ')"
                                    rounded>
                                    ເພີ່ມ
                                </v-btn>
                            </v-list-item>
                        </v-list-group>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('132', 'Nok37')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            Nok37
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('133', 'Junly65')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            Junly65
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('134', 'kkin-out')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            kkin-out
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('135', 'Puna37')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            Puna37
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('136', 'May34')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            May34
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('137', 'Tae49')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            Tae49
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('138', 'Minly37')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            Minly37
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card color="#E0F7FA" class="mt-4" width="300">
                        <v-card-text @click="nokDoc1('139', 'Air88')"
                            style="font-size: 20px; font-weight: bold; text-align: center;">
                            <v-icon color="green">mdi-account-box-multiple</v-icon>
                            Air88
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            searchQuery: '',
            selectedToken: null,
            USER_ROLE: null,
            USER_NAME: localStorage.getItem('USER_NAME'),
            report_listitemOffice: [],
            filteredReportList: [], // Filtered data
            search: '', // Search query
            sisternok1: [],
            sisternok: [],
            pdfDialog: false, // Controls the visibility of the PDF dialog
        };
    },
    methods: {
        nokDoc1(id, number) {
            this.$router.push({
                name: 'documentation2',
                query: { id, number }
            });
        },
        nokDoc(token, buttonLabel) {
            this.$router.push({
                name: 'documentation',
                query: { token, label: buttonLabel }
            });
        },
        InsertDoc(token, buttonLabel, number, number1) {
            this.$router.push({
                name: 'nokdocumment',
                query: { token, label: buttonLabel, number, number1 }
            });
        },
        showResultpdf(file) {
            window.open(file, '_blank');
        },
    },
};
</script>

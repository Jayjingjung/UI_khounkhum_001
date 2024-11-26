<template>
    <div>
        <v-card color="#E0F7FA" class="mb-10">
            <v-card-actions>
                <v-btn fab elevation="0" small color="green" @click="$router.back()">
                    <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                </v-btn>
                <v-card-title v-if="buttonname" class="font-weight-bold">
                    {{ buttonname }}
                </v-card-title>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <!-- ແຈ້ງການ1  -->
        <v-dialog v-model="testDoc" max-width="790" persistent disable-esc>
            <v-card class="mx-auto" max-width="790">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                            <v-btn @click="refresher" rounded color="#00E676">
                                <v-icon>
                                    mdi-arrow-collapse-left
                                </v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ແຈ້ງການ1</div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="functionvichai" :style="{ width: '300px' }"></v-text-field>
                            <div>
                                <v-card-actions>
                                    <div class="ml-10" style="font-weight:bold">
                                        ຊື່ເອກະສານ
                                        <v-divider></v-divider>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div style="font-weight:bold">
                                        ວັນທີ່,ເດືອນ,ປີ
                                        <v-divider></v-divider>
                                    </div>
                                </v-card-actions>
                            </div>
                        </v-card>
                        <div v-for="(item, index) in vichai" :key="index">
                            <v-card-actions>
                                <v-btn text @click="showResultpdf(item.file)">
                                    <v-icon color="#00E676">
                                        mdi-progress-download
                                    </v-icon>
                                </v-btn>
                                <div @click="showResultpdf(item.file)" class="hoverable">
                                    {{ item.type }}
                                    <v-divider></v-divider>
                                </div>
                                <v-spacer></v-spacer>
                                ({{ item.dateInsert }})
                            </v-card-actions>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <!-- ແຈ້ງການ2  -->
        <v-dialog v-model="surveydocument" max-width="790" persistent disable-esc>
            <v-card class="mx-auto" max-width="790">
                <div class="mt-4">
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                            <v-btn @click="refresher" rounded color="#00E676">
                                <v-icon>
                                    mdi-arrow-collapse-left
                                </v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ແຈ້ງການ2</div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="filteredServey" :style="{ width: '300px' }"></v-text-field>
                            <div>
                                <v-card-actions>
                                    <div class="ml-10" style="font-weight:bold">
                                        ຊື່ເອກະສານ
                                        <v-divider></v-divider>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div style="font-weight:bold">
                                        ວັນທີ່,ເດືອນ,ປີ
                                        <v-divider></v-divider>
                                    </div>
                                </v-card-actions>
                            </div>
                        </v-card>
                        <div v-for="(item, index) in filterServey" :key="index">
                            <v-card-actions>
                                <v-btn text @click="showResultpdf(item.file)">
                                    <v-icon color="#00E676">
                                        mdi-progress-download
                                    </v-icon>
                                </v-btn>
                                <div @click="showResultpdf(item.file)" class="hoverable">
                                    {{ item.type }}
                                    <v-divider></v-divider>
                                </div>
                                <v-spacer></v-spacer>
                                ({{ item.dateInsert }})
                            </v-card-actions>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <!-- ແຈ້ງການ3 -->
        <v-dialog v-model="sisternokDoc" max-width="790" persistent disable-esc>
            <v-card class="mx-auto" max-width="790">
                <div class="mt-4">
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                            <v-btn @click="refresher" rounded color="#00E676">
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ແຈ້ງການ3
                            </div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="nokSearch" :style="{ width: '300px' }"></v-text-field>
                            <div>
                                <v-card-actions>
                                    <div class="ml-10" style="font-weight:bold">
                                        ຊື່ເອກະສານ
                                        <v-divider></v-divider>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div style="font-weight:bold">
                                        ວັນທີ່,ເດືອນ,ປີ
                                        <v-divider></v-divider>
                                    </div>
                                </v-card-actions>
                            </div>
                        </v-card>
                        <div v-for="(item, index) in sisternok" :key="index">
                            <v-card-actions>
                                <v-btn text @click="showResultpdf(item.file)">
                                    <v-icon color="#00E676">
                                        mdi-progress-download
                                    </v-icon>
                                </v-btn>
                                <div @click="showResultpdf(item.file)" class="hoverable">
                                    {{ item.type }}
                                    <v-divider></v-divider>
                                </div>
                                <v-spacer></v-spacer>
                                ({{ item.dateInsert }})
                            </v-card-actions>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <v-card flat>
            <v-card-text class="mt-10">
                <v-row>
                    <v-col cols="12" sm="6" md="3" @click="filterTest">
                        <v-card color="#E0F7FA">
                            <v-card-text>
                                <div class="d-flex justify-center align-center"
                                    style="font-size: 20px; font-weight: bold;">
                                    ແຈ້ງການ1
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="3" @click="filterSurvey">
                        <v-card color="#E0F7FA">
                            <v-card-text class="d-flex justify-center align-center">
                                <div style="font-size: 20px; font-weight: bold;">
                                    ແຈ້ງການ2
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="3" @click="filterNokPay">
                        <v-card color="#E0F7FA">
                            <v-card-text class="d-flex justify-center align-center">
                                <div style="font-size: 20px; font-weight: bold;">
                                    ແຈ້ງການ3
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="3" @click="surveydocument = true">
                        <v-card color="#E0F7FA">
                            <v-card-text class="d-flex justify-center align-center">
                                <div style="font-size: 20px; font-weight: bold;">
                                    ແຈ້ງການ4
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            searchQuery: '',
            sisternokDoc: false,
            testDoc: false,
            surveydocument: false,
            filedocuments: false,
            imagefile: false,
            payfile: false,
            buttonname: null,
            selectedToken: null,
            USER_ROLE: null,
            USER_NAME: localStorage.getItem('USER_NAME'),
            report_listitemOffice: [],
            filteredReportList: [], // Filtered data
            search: '', // Search query
            vichai: [],
            vichai1: [],
            payment: [],
            payment1: [],
            filterServey1: [],
            filterServey: [],
            sisternok1: [],
            sisternok: [],
            pdfDialog: false, // Controls the visibility of the PDF dialog
        };
    },
    mounted() {
        // รับค่า token จาก query และแสดง
        const token = this.$route.query.token;
        const label = this.$route.query.label;
        if (token && label) {
            this.buttonname = label;
            this.setToken(token);
        }

    },
    methods: {
        refresher() {
            window.location.reload();
        },
        setToken(token) {
            console.log('Set Token:', token);
            this.toKen = token;
            this.selectedToken = token; // Update selected token
            this.fetchAllData();
        },
        // Filter Payment Data
        filterPayment() {
            this.payment1 = this.payAll.filter((item) => item.name === "pay");
            this.payment = this.payment1
            this.payfile = true;
        },
        // Filter Vichai Data
        filterTest() {
            this.vichai1 = this.payAll.filter((item) => item.name === "nok" && item.nameDetail === "ແຈ້ງການ1");
            this.vichai = this.vichai1
            this.testDoc = true;
        },
        // Filter Survey Data
        filterSurvey() {
            this.filterServey1 = this.payAll.filter((item) => item.name === "nok" && item.nameDetail === "ແຈ້ງການ2");
            this.filterServey = this.filterServey1
            this.surveydocument = true;
        },
        filterNokPay() {
            this.sisternok1 = this.payAll.filter((item) => item.name === "nok" && item.nameDetail === "ແຈ້ງການ3");
            this.sisternok = this.sisternok1
            this.sisternokDoc = true;
        },
        fetchAllData() {
            try {
                this.$axios
                    .$post("/ShowAllResultOfServey.service", {
                        branchUser: this.USER_ROLE,
                        toKen: this.toKen,
                    })
                    .then((response) => {
                        if (response?.status === "00") {
                            this.payAll = response.data; // Store all data here
                        } else {
                            this.payAll = [];
                        }
                    });
            } catch (error) {
                swal.fire({
                    icon: "error",
                    text: error.message,
                });
            }
        },
        filteredServey() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            if (this.searchQuery.trim() === '') {
                this.filterServey = this.filterServey1;
            } else {
                this.filterServey = this.filterServey1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        // functionvichai() {
        //     // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
        //     this.vichai = this.vichai1.filter((item) =>
        //         item.type.includes(this.searchQuery)
        //     );
        // },
        // Filter data based on search query
        functionvichai() {
            if (this.searchQuery.trim() === '') {
                this.vichai = this.vichai1;
            } else {
                this.vichai = this.vichai1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        functionpay() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            if (this.searchQuery.trim() === '') {
                this.payment = this.payment1;
            } else {
                this.payment = this.payment1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        nokSearch() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            if (this.searchQuery.trim() === '') {
                this.sisternok = this.sisternok1;
            } else {
                this.sisternok = this.sisternok1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        click2fuction(fileUrl) {
            if (fileUrl) {
                window.open(fileUrl, "_blank");
            } else {
                console.error("File URL is missing or invalid.");
            }
        },
        showResultpdf(file) {
            window.open(file, '_blank');
        },
    },
};
</script>
<style>
.custom-text-field {
    background-color: #f0f0f0;
    color: #000000;
}

.hoverable:hover {
    color: #42A5F5;
    font-size: 18px;
    font-weight: bold;
}

.v-list-group__header .v-icon.mdi-excavator {
    color: green;
    font-size: 24px;
}
</style>
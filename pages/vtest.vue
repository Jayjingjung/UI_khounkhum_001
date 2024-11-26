<template>
    <div>
        <!-- Dialog for Payment -->
        <v-dialog v-model="payfile" max-width="790" persistent disable-esc>
            <v-card class="mx-auto" max-width="790">
                <v-card-text>
                    <v-card flat>
                        <v-btn @click="refresher" rounded color="#00E676">
                            <v-icon>mdi-arrow-collapse-left</v-icon>
                        </v-btn>
                        <div class="text-center font-weight-bold" style="font-size: 20px">
                            ຂໍ້ມູນລາຍຈ່າຍ
                        </div>
                        <v-divider></v-divider>
                        <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                            @input="functionpay" :style="{ width: '300px' }"></v-text-field>
                    </v-card>
                    <div v-for="(item, index) in payment" :key="index">
                        <v-card-actions>
                            <v-btn text @click="showResultpdf(item.file)">
                                <v-icon color="#00E676">mdi-progress-download</v-icon>
                            </v-btn>
                            <div @click="showResultpdf(item.file)" class="hoverable">
                                {{ item.type }}
                            </div>
                            <v-spacer></v-spacer>
                            ({{ item.dateInsert }})
                        </v-card-actions>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Dialog for Documents -->
        <v-dialog v-model="documentDialog" max-width="790" persistent disable-esc>
            <v-card class="mx-auto" max-width="790">
                <v-card-text>
                    <v-card flat>
                        <v-btn @click="documentDialog = false" rounded color="#00E676">
                            <v-icon>mdi-arrow-collapse-left</v-icon>
                        </v-btn>
                        <div class="text-center font-weight-bold" style="font-size: 20px">
                            ຂໍ້ມູນເອກະສານ
                        </div>
                        <v-divider></v-divider>
                    </v-card>
                    <div v-for="(item, index) in documents" :key="index">
                        <v-card-actions>
                            <v-btn text @click="showResultpdf(item.file)">
                                <v-icon color="#00E676">mdi-progress-download</v-icon>
                            </v-btn>
                            <div @click="showResultpdf(item.file)" class="hoverable">
                                {{ item.type }}
                            </div>
                            <v-spacer></v-spacer>
                            ({{ item.dateInsert }})
                        </v-card-actions>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Kept v-list -->
        <v-list color="#E0F7FA">
            <v-list-group :value="false" prepend-icon="mdi-excavator"
                @click="setTokenAndFetch('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO')">
                <template v-slot:activator>
                    <v-list-item-title style="font-size: 20px; font-weight: bold;">
                        ບ້ານຄອນງົວ
                    </v-list-item-title>
                </template>
                <v-list-group no-action sub-group>
                    <template v-slot:activator>
                        <v-icon color="yellow">mdi-cash-100</v-icon>
                        <v-list-item-content>
                            <v-list-item-title style="height: 20px; overflow: visible;">
                                ຂໍ້ມູນລາຍຈ່າຍ
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item>
                        <v-btn rounded @click="filterPayment">ເບີ່ງ</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success"
                            @click="navigateToPayment('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຄອນງົວ', 'pay', 'ເອກະສານ')"
                            rounded>
                            ເພີ່ມ
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn rounded @click="filterDocuments">ເອກະສານ</v-btn>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
        </v-list>
    </div>
</template>

<script>
import swal from "sweetalert2";

export default {
    data() {
        return {
            payfile: false,
            documentDialog: false,
            searchQuery: "",
            payment: [],
            documents: [],
            payAll: [], // Store all data here
        };
    },
    methods: {
        refresher() {
            this.payfile = false;
            this.documentDialog = false;
            window.location.reload();
        },
        // Filter Payment Data
        filterPayment() {
            this.payment = this.payAll.filter((item) => item.name === "pay");
            this.payfile = true;
        },
        // Filter Document Data
        filterDocuments() {
            this.documents = this.payAll.filter((item) => item.name === "servey");
            this.documentDialog = true;
        },
        showResultpdf(file) {
            window.open(file, "_blank");
        },
        functionpay() {
            this.payment = this.payAll.filter((item) =>
                item.type.includes(this.searchQuery)
            );
        },
        setTokenAndFetch(token) {
            this.toKen = token;
            // Fetch all data at once (single API call)
            this.fetchAllData();
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
    },
    mounted() {
        this.setTokenAndFetch('default_token'); // Load default data
    },
};
</script>

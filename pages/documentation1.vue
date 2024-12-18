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
        <!-- Dialog -->
        <v-dialog v-model="fileList" max-width="790" persistent disable-esc>
            <v-card class="mx-auto" max-width="790">
                <v-card-text>
                    <v-card flat>
                        <v-btn @click="refresher" rounded color="#00E676">
                            <v-icon>mdi-arrow-collapse-left</v-icon>
                        </v-btn>
                        <div class="text-center font-weight-bold" style="font-size: 20px">
                            ເອກະສານ
                        </div>
                        <v-divider></v-divider>
                        <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                            :style="{ width: '300px' }"></v-text-field>
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
                    </v-card>
                    <div v-if="filteredItems.length">
                        <div v-for="(item, index) in filteredItems" :key="index">
                            <v-card-actions>
                                <v-btn text @click="showResultpdf(item.file)">
                                    <v-icon color="#00E676">mdi-progress-download</v-icon>
                                </v-btn>
                                <div @click="showResultpdf(item.file)" class="hoverable">
                                    {{ item.type }}
                                    <v-divider></v-divider>
                                </div>
                                <v-spacer></v-spacer>
                                ({{ item.dateInsert }})
                            </v-card-actions>
                        </div>
                    </div>
                    <div v-else class="text-center mt-5">
                        <p>ບໍ່ມີຂໍ້ມູນທີ່ທ່ານຄົ້ນຫາ</p>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Filter Buttons -->
        <v-card flat>
            <v-card-text>
                <div v-if="uniqueNameDetails.length">
                    <v-row>
                        <v-col cols="12" sm="6" md="2" v-for="(item, index) in uniqueNameDetails" :key="index"
                            class=" justify-center align-center" @click="onButtonClick(item)">
                            <v-card color="#E0F7FA">
                                <v-card-text class="text-center font-weight-bold" style="font-size: 20px;">
                                    <div>{{ item }}</div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
                <div v-else class="text-center mt-5">
                    <div style="font-size: 20px; font-weight: bold;color: #ff5733;">ຍັງບໍ່ມີເອກະສານ</div>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import swal from "sweetalert2";

export default {
    data() {
        return {
            searchQuery: "",
            fileList: false,
            payAll: [],
            selectedNameDetail: null,
            buttonname: null,
            toKen: null,
            USER_ROLE: localStorage.getItem("USER_ROLE") || null,
        };
    },
    computed: {
        // Unique nameDetails for filter buttons
        uniqueNameDetails() {
            return [
                ...new Set(
                    this.payAll
                        .map((item) => item.nameDetail)
                        .filter((value) => value && value !== 'null' && value !== 'ເອກະສານ') // ຕັດ null และ 'ເອກະສານ'
                ),
            ];
        },
        // Filtered items based on search and selected nameDetail
        filteredItems() {
            let items = this.payAll;
            if (this.selectedNameDetail) {
                items = items.filter((item) => item.nameDetail === this.selectedNameDetail);
            }

            if (this.searchQuery) {
                const searchTerm = this.searchQuery.trim().toLowerCase();
                items = items.filter(
                    (item) =>
                        item.type.toLowerCase().includes(searchTerm) ||
                        item.dateInsert.includes(searchTerm)
                );
            }
            return items;
        },
    },
    mounted() {
        const token = this.$route.query.token;
        const label = this.$route.query.label;

        if (token && label) {
            this.buttonname = label;
            this.setToken(token);
        }
        this.fetchAllData();
    },
    methods: {
        setToken(token) {
            console.log("Set Token:", token);
            this.toKen = token;
        },
        refresher() {
            window.location.reload();
        },
        fetchAllData() {
            this.$axios
                .$post("/ShowAllResultOfServey.service", {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,
                })
                .then((response) => {
                    if (response?.status === "00") {
                        this.payAll = response.data || [];
                    } else {
                        this.payAll = [];
                    }
                })
                .catch((error) => {
                    swal.fire({
                        icon: "error",
                        text: "Failed to fetch data: " + error.message,
                    });
                });
        },
        onButtonClick(nameDetail) {
            this.selectedNameDetail = nameDetail;
            this.fileList = true;
        },
        showResultpdf(file) {
            if (file) {
                window.open(file, "_blank");
            } else {
                swal.fire({
                    icon: "error",
                    text: "File not available.",
                });
            }
        },
    },
};
</script>

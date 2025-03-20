<template>
    <div>
        <div style="padding-top: 100px;">
            <v-card color="#E0F7FA" class="mb-10">
                <v-card-actions>
                    <v-btn fab elevation="0" small color="green" @click="$router.back()">
                        <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-card-title v-if="name && buttonname" class="font-weight-bold">
                        {{ name }} {{ buttonname }}
                    </v-card-title>
                    <!-- <v-card-title v-if="buttonname" class="font-weight-bold">
                        {{ buttonname }}
                    </v-card-title> -->
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </div>
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
            toKen: "c27bcc229bf00e6c1deb14b93d6fe80655f35371e4907d0431a23aa4f68b3d41",
            key_id: '',
            USER_ROLE: localStorage.getItem("USER_ROLE") || null,
            name: '',
            number1: '',
        };
    },
    computed: {
        // Unique nameDetails for filter buttons
        uniqueNameDetails() {
            if (this.number1 === '1') {
                return [
                    ...new Set(
                        this.payAll
                            .filter((item) => item.type !== null && item.name === 'servey')  // Filtering for 'servey'
                            .map((item) => item.type)
                    ),
                ];
            } if (this.number1 === '2') {
                return [
                    ...new Set(
                        this.payAll
                            .filter((item) => item.type !== null && item.name === 'testData')  // Filtering for 'nok'
                            .map((item) => item.type)
                    ),
                ];
            }
            else {
                return [
                    ...new Set(
                        this.payAll
                            .filter((item) => item.type !== null && item.name === 'pay')// Filtering for 'testData'
                            .map((item) => item.type)
                    ),
                ];
            }
        },
        // Filtered items based on search and selected nameDetail
        filteredItems() {
            let items = this.payAll;
            if (this.selectedNameDetail) {
                items = items.filter((item) => item.type === this.selectedNameDetail);
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
        const { key_id, label } = this.$route.query;
        const { name, number1 } = this.$route.query;
        if (key_id && label) {
            this.buttonname = label;
            this.key_id = key_id;
        }
        if (name && number1) {
            this.name = name;
            this.number1 = number1;
        }
        this.fetchAllData();
    },

    methods: {
        refresher() {
            window.location.reload();
        },
        fetchAllData() {
            this.$axios
                .$post("/ShowAllResultOfServey.service", {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,
                    branch_id: this.key_id,
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

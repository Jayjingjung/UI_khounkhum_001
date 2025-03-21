<template>
    <div>
        <div style="padding-top: 100px;">
            <v-card color="#E0F7FA" class="mb-10">
                <v-card-actions>
                    <v-card-title v-if="buttonname" class="font-weight-bold">
                        ຂໍ້ມູນຮູເຈາະ {{ buttonname }}
                    </v-card-title>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </div>

        <!-- Dialog -->
        <v-dialog v-model="fileList" max-width="890" persistent disable-esc>
            <v-card class="mx-auto" max-width="890">
                <div class="mt-4">
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                            <v-btn fab @click="refresher" rounded color="#A7FFEB">
                                <v-icon>
                                    mdi-arrow-collapse-left
                                </v-icon>
                            </v-btn>
                            <div v-if="buttonname" class="text-center font-weight-bold"
                                style="font-size: 20px; font-weight: bold; font-style: italic;">
                                ຂໍ້ມູນຮູເຈາະ{{ buttonname }} ({{ selectedNameDetail }})
                            </div>
                            <v-divider></v-divider>
                            <v-card-title v-if="number">
                                <v-chip color="#A7FFEB" dense class="font-weight-bold">
                                    {{ number }}
                                </v-chip>
                            </v-card-title>
                            <v-card-actions>
                                <div class="ml-4" style="font-size: 18px; font-weight: bold;">
                                    ມີທັງໝົດ {{ totalList }} ລາຍການ
                                </div>
                                <v-spacer></v-spacer>
                                <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                    :style="{ width: '300px' }"></v-text-field>
                            </v-card-actions>
                            <div style="padding-left: 100px;">
                                <div style="font-weight:bold; font-size: 16px; font-style: italic;">
                                    ຊື່ເອກະສານ
                                    <v-divider></v-divider>
                                </div>
                            </div>
                        </v-card>
                        <div v-if="filteredItems.length">
                            <div v-for="(item, index) in filteredItems" :key="index">
                                <v-card-actions>
                                    <v-btn text @click="showResultpdf(item.pic)">
                                        <v-icon color="#00E676">mdi-progress-download</v-icon>
                                    </v-btn>
                                    <div v-if="item.hoeNumber" @click="showResultpdf(item.pic)" class="hoverable">
                                        {{ item.hoeNumber }}
                                        <v-divider></v-divider>
                                    </div>
                                    <div v-else @click="showResultpdf(item.pic)" class="hoverable">
                                        {{ item.full_Name_Hole_number }}
                                        <v-divider></v-divider>
                                    </div>
                                </v-card-actions>
                            </div>
                        </div>
                        <div v-else class="text-center mt-5">
                            <p>ບໍ່ມີຂໍ້ມູນທີ່ທ່ານຄົ້ນຫາ</p>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>

        <!-- Filter Buttons -->
        <v-card flat>
            <div class="ml-4 pt-6"
                style="font-size: 20px; font-weight: bold; display: inline-block; border-bottom: 2px solid black; padding-bottom: 4px;">
                ມີທັງໝົດ {{ total }} Folder
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-text-field label="ຄົ້ນຫາ" v-model="searchData" append-icon="mdi-magnify"
                    :style="{ width: '300px' }"></v-text-field>
            </v-card-actions>
            <v-card-text>
                <div v-if="uniqueNameDetails.length">
                    <v-row>
                        <v-col cols="12" sm="6" md="4" v-for="(item, index) in uniqueNameDetails" :key="index"
                            class=" justify-center align-center" @click="onButtonClick(item)">
                            <v-card height="65px" color="#E0F7FA">
                                <v-card-text class="text-center font-weight-bold" style="font-size: 20px;">
                                    <div>{{ item }}</div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
                <div v-else class="text-center mt-5">
                    <div style="font-size: 20px; font-weight: bold;color: #ff5733;">ຍັງບໍ່ມີຂໍ້ມູນ ຫຼືຶ ເອກະສານ</div>
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
            searchQuery: "",  // For searching documents inside the folder
            searchData: "",   // For searching folders
            fileList: false,
            huchoList: [],
            selectedNameDetail: null,
            buttonname: null,
            toKen: "c27bcc229bf00e6c1deb14b93d6fe80655f35371e4907d0431a23aa4f68b3d41",
            key_id: '',
            USER_ROLE: localStorage.getItem("USER_ROLE") || null,
            name: '',
        };
    },
    computed: {
        uniqueNameDetails() {
            return [
                ...new Set(
                    this.huchoList
                        .map((item) => item.full_Name_Hole_number)
                        .filter((value) => value && value !== 'null' && value !== 'ເອກະສານ') // Filter out null and 'ເອກະສານ'
                ),
            ];
        },
        filteredItems() {
            let items = this.huchoList;

            // Filter by selected folder name
            if (this.selectedNameDetail) {
                items = items.filter((item) => item.full_Name_Hole_number === this.selectedNameDetail);
            }

            // Search filter: both hoeNumber and full_Name_Hole_number
            if (this.searchQuery) {
                const searchTerm = this.searchQuery.trim().toLowerCase();
                items = items.filter(
                    (item) =>
                        item.full_Name_Hole_number.toLowerCase().includes(searchTerm) ||
                        item.hoeNumber.toLowerCase().includes(searchTerm)
                );
            }

            return items;
        },
        totalList() {
            return this.filteredItems.length;
        },
        total() {
            return this.uniqueNameDetails.length;
        },
    },
    mounted() {
        const { key_id, label } = this.$route.query;
        if (key_id && label) {
            this.buttonname = label;
            this.key_id = key_id;
        }
        this.ShowListOfHole();
    },

    methods: {
        refresher() {
            this.fileList = false;
            this.searchQuery = ""; // Reset search query
        },
        ShowListOfHole() {
            try {
                this.$axios.$post('/ShowAllListOfHole.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,
                    branch_id: this.key_id,
                }).then((data) => {
                    if (data?.status === "00") {
                        this.huchoList = data?.data;
                    } else {
                        this.huchoList = [];
                    }
                });
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error,
                });
            }
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

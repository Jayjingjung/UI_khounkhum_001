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
                                    <!-- <div v-if="item.hoeNumber" @click="showResultpdf(item.pic)" class="hoverable">
                                        {{ item.hoeNumber }}
                                        <v-divider></v-divider>
                                    </div>
                                    <div v-else @click="showResultpdf(item.pic)" class="hoverable">
                                        {{ item.full_Name_Hole_number }}
                                        <v-divider></v-divider>
                                    </div> -->
                                    <div @click="showResultpdf(item.pic)" class="hoverable">
                                        {{ getFileName(item.pic) }}
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
        <v-dialog v-model="dialog" max-width="100%" height="100%" persistent disable-esc content-class="dialog-top">
            <v-card>
                <v-card class="pt-2 pl-2" style="position: sticky; top: 0; z-index: 1;" flat color="#A7FFEB">
                    <v-card-actions>
                        <v-btn fab elevation="0" dark width="50" height="50" color="white" @click="dialog = false">
                            <v-icon color="#0a3382">mdi-close</v-icon>
                        </v-btn>
                        <div v-if="buttonname" class="text-center font-weight-bold"
                            style="font-size: 20px; font-weight: bold; font-style: italic;">
                            ຂໍ້ມູນຮູເຈາະ{{ buttonname }} ({{ selectedNameDetail }})
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn @click="changeStyle()" color="#B3E5FC" rounded
                            style="font-size: 16px; font-weight: bold; font-style: italic;">
                            ເບີ່ງແບບ Slide
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card-text>
                    <v-row class="mt-2">
                        <v-col v-for="(pic, index) in filteredItems" :key="index" cols="12" sm="6" md="2">
                            <v-card class="mx-auto" @click="showResultpdf(pic.pic)" width="270px" color="#ECEFF1">
                                <v-img :src="pic.pic" alt="Picture" height="380px" class="mb-2"
                                    style="cursor: pointer;"></v-img>
                                <div @click="showResultpdf(pic.pic)" class="hoverable">
                                    {{ getFileName(pic.pic) }}
                                    <v-divider></v-divider>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog1" max-width="890" persistent disable-esc>
            <v-card class="mx-auto" max-width="890" height="770px">
                <div>
                    <v-card class="pt-2 pl-2" style="position: sticky; top: 0; z-index: 1;" flat color="#A7FFEB">
                        <v-card-actions>
                            <v-btn fab elevation="0" dark width="50" height="50" color="white" @click="dialog1 = false">
                                <v-icon color="#0a3382">mdi-close</v-icon>
                            </v-btn>
                            <div v-if="buttonname" class="text-center font-weight-bold"
                                style="font-size: 20px; font-weight: bold; font-style: italic;">
                                ຂໍ້ມູນຮູເຈາະ{{ buttonname }} ({{ selectedNameDetail }})
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn @click="changeStyle1()" color="#B3E5FC" rounded
                                style="font-size: 16px; font-weight: bold; font-style: italic;">
                                ເບີ່ງແບບລວມ
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-carousel hide-delimiters>
                        <v-carousel-item v-for="(pic, index) in filteredItems" :key="index" :src="pic"
                            reverse-transition="fade-transition" transition="fade-transition">
                            <div style="text-align: center; font-weight: bold; font-size: 16px; font-style: italic;"
                                @click="showResultpdf(pic.pic)" class="hoverable">
                                {{ getFileName(pic.pic) }}
                                <v-divider></v-divider>
                            </div>
                            <div style="padding-left: 150px;">
                                <v-img width="80%" height="100%" :src="pic.pic" @click="showResultpdf(pic.pic)"></v-img>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
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
                <!-- Search Field -->
                <v-text-field label="ຄົ້ນຫາ" v-model="searchData" append-icon="mdi-magnify" :style="{ width: '300px' }">
                </v-text-field>
            </v-card-actions>
            <v-card-text>
                <!-- Display filtered results -->
                <div v-if="filteredUniqueNameDetails.length">
                    <v-row>
                        <v-col cols="12" sm="6" md="4" v-for="(item, index) in filteredUniqueNameDetails" :key="index"
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
            dialog: false,
            dialog1: false,
            carouselPics: [],
            huchoList: [],
            selectedNameDetail: null,
            buttonname: null,
            toKen: "c27bcc229bf00e6c1deb14b93d6fe80655f35371e4907d0431a23aa4f68b3d41",
            key_id: '',
            USER_ROLE: localStorage.getItem("USER_ROLE") || null,
            name: '',
            searchData: '',
        };
    },
    computed: {
        // Get the unique folder names
        uniqueNameDetails() {
            return [
                ...new Set(
                    this.huchoList
                        .map((item) => item.full_Name_Hole_number)
                        .filter((value) => value && value !== 'null' && value !== 'ເອກະສານ') // Filter out null and 'ເອກະສານ'
                ),
            ];
        },
        // Filter the unique names based on searchData
        filteredUniqueNameDetails() {
            // Check if searchData is not empty and filter the list
            return this.uniqueNameDetails.filter(item => {
                return item.toLowerCase().includes(this.searchData.toLowerCase());
            });
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
            // this.fileList = true;
            this.dialog = true;
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
        getFileName(url) {
            // Extracts the file name from the URL without the extension
            const fileName = url.split('/').pop(); // Get the last part of the URL
            return fileName.split('.')[0]; // Remove the extension (after the dot)
        },
        changeStyle() {
            this.dialog = false;
            this.dialog1 = true;
        },
        changeStyle1() {
            this.dialog1 = false;
            this.dialog = true;
        },
    },
};
</script>

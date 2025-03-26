<template>
    <v-row justify="center">
        <v-container>
            <v-card class="mx-auto" max-width="790" >
                <div class="mt-4">
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" flat >
                            <v-card-text style="background-color: #A7FFEB; border-radius:36px 0 36px  0;">
                                <!-- <v-btn fab elevation="0" dark width="50" height="50" color="white"
                                    @click="$router.back()">
                                    <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                                </v-btn> -->
                                <div class="text-center font-weight-bold" style="font-size: 20px">
                                    ຮູບພາບກ່ຽວກັບພາກສະໜາມ
                                </div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <div>
                                <div>
                                    <v-card-title v-if="number">
                                        <v-chip color="#A7FFEB" dense class="font-weight-bold">
                                            {{ number }}
                                        </v-chip>
                                    </v-card-title>
                                </div>
                            </div>
                            <v-card-actions>
                                <div style="font-size: 18px; font-weight: bold;">
                                    ມີທັງໝົດ {{ totalList }} ລາຍການ
                                </div>
                                <v-spacer></v-spacer>
                                <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                    :style="{ width: '300px' }">
                                </v-text-field>
                            </v-card-actions>
                            <div>
                                <v-card-actions>
                                    <div class="ml-10" style="font-weight:bold">
                                        ຊື່ໄຟລ໌
                                        <v-divider></v-divider>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div style="font-weight:bold">
                                        ວັນທີ່,ເດືອນ, ປີ
                                        <v-divider></v-divider>
                                    </div>
                                </v-card-actions>
                            </div>
                        </v-card>
                        <div v-if="filteredPicList.length">
                            <div v-for="(picGroup, index) in filteredPicList" :key="index">
                                <v-card-actions>
                                    <v-btn text @click="showImages(picGroup)">
                                        <v-icon color="#00E676">mdi-progress-download</v-icon>
                                    </v-btn>
                                    <v-btn text class="hoverable" @click="showImages(picGroup)" style="font-weight: bold; font-style: italic; 
                                        text-transform: capitalize;">
                                        {{ picGroup.folderName }}
                                        <v-divider></v-divider>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    {{ picGroup.dateCreate }}
                                </v-card-actions>
                            </div>
                        </div>
                        <!-- No Results Found Message -->
                        <div v-else class="text-center mt-5" style="font-size: 16px; color: crimson;">
                            <p>ບໍ່ມີຂໍ້ມູນ</p>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
            <!-- Full Picture Dialog with Scrollable Content -->
            <v-dialog v-model="dialog" max-width="100%" height="100%" persistent disable-esc content-class="dialog-top">
                <v-card>
                    <v-card class="pt-2 pl-2" style="position: sticky; top: 0; z-index: 1;" flat color="#A7FFEB">
                        <v-card-actions>
                            <v-btn fab elevation="0" dark width="50" height="50" color="white" @click="dialog = false">
                                <v-icon color="#0a3382">mdi-close</v-icon>
                            </v-btn>
                            <div class="ml-10" style="font-size: 18px; font-weight: bold;">
                                {{ selectedFolderName }}
                            </div>
                            <div class="ml-5" style="font-size: 16px; font-style: italic;">
                                ({{ selectedDateCreate }})
                            </div>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-btn @click="changeStyle()" color="#B3E5FC" rounded style="font-size: 16px; font-weight: bold; font-style: italic;">
                                ເບີ່ງແບບ Slide
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card-text>
                        <v-row class="mt-2">
                            <v-col v-for="(pic, index) in carouselPics" :key="index" cols="12" sm="6" md="2">
                                <v-card class="mx-auto" width="270px" color="#ECEFF1">
                                    <v-img :src="pic" alt="Picture" height="380px" class="mb-2"
                                        @click="openInNewTab(pic)" style="cursor: pointer;"></v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog1" width="55%" persistent disable-esc>
                <v-card>
                    <v-card class="pt-2 pl-2" style="position: sticky; top: 0; z-index: 1;" flat color="#A7FFEB">
                        <v-card-actions>
                            <v-btn fab elevation="0" dark width="50" height="50" color="white" @click="dialog1 = false">
                                <v-icon color="#0a3382">mdi-close</v-icon>
                            </v-btn>
                            <div class="ml-10" style="font-size: 18px; font-weight: bold;">
                                {{ selectedFolderName }}
                            </div>
                            <div class="ml-5" style="font-size: 16px; font-style: italic;">
                                ({{ selectedDateCreate }})
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn @click="changeStyle1()" color="#B3E5FC" rounded style="font-size: 16px; font-weight: bold; font-style: italic;">
                                ເບີ່ງແບບລວມ
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card>
                        <v-card-text>
                            <v-carousel hide-delimiters>
                                <v-carousel-item v-for="(pic, index) in carouselPics" :key="index" :src="pic"
                                    reverse-transition="fade-transition" transition="fade-transition">
                                    <v-img :src="pic" @click="openInNewTab(pic)"></v-img>
                                </v-carousel-item>
                            </v-carousel>
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-dialog>
        </v-container>
    </v-row>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            searchQuery: "", // Input value from search field
            picList: [],// List of picture groups
            selectedPicGroup: null, // Currently selected picture group
            dialog: false,
            dialog1: false, // State for the dialog
            toKen: "c27bcc229bf00e6c1deb14b93d6fe80655f35371e4907d0431a23aa4f68b3d41",
            key_id: '',
            carouselPics: [], // List of images for the carousel
            carouselIndex: 0, // Current index for the carousel
            selectedFolderName: "", // Folder name for the selected picture group
            selectedDateCreate: "", // Date of creation for the selected picture group
            number: "",
        };
    },
    computed: {
        // Filtered list based on searchQuery
        filteredPicList() {
            const query = this.searchQuery.toLowerCase();
            return this.picList.filter((picGroup) =>
                picGroup.folderName.toLowerCase().includes(query)
            );
        },
        totalList() {
            return this.filteredPicList.length;
        }
    },
    mounted() {
        const key_id = this.$route.query.key_id;
        const number = this.$route.query.number;
        if (key_id && number) {
            this.key_id = key_id;
            this.number = number;
        }
        this.onGetPicList();
    },
    methods: {
        async onGetPicList() {
            try {
                const response = await axios.post(
                    "http://khounkham.com/api-prod/v1/truck/ShowPicOfBor.service",
                    {
                        toKen: this.toKen, // Use the token
                        branch_id: this.key_id,
                    }
                );
                if (response.data.status === "00") {
                    this.picList = response.data.data;
                } else {
                    console.error("Error fetching pictures:", response.data.message);
                }
            } catch (error) {
                console.error("API Error:", error);
            }
        },
        showImages(picGroup) {
            this.selectedPicGroup = picGroup;
            this.selectedFolderName = picGroup.folderName; // Set the folder name
            this.selectedDateCreate = picGroup.dateCreate; // Set the date create
            this.dialog = true;

            // Get the list of pictures for the carousel
            this.carouselPics = this.parsedPics(picGroup.pic);
            this.carouselIndex = 0; // Reset the carousel to the first image
        },
        changeStyle() {
            this.dialog = false;
            this.dialog1 = true;
        },
        changeStyle1() {
            this.dialog1 = false;
            this.dialog = true;
        },
        parsedPics(picGroup) {
            const baseUrl = "http://khounkham.com/images/car/";
            return picGroup
                .replace("[", "")
                .replace("]", "")
                .split(", ")
                .map((filename) => {
                    const trimmedFilename = filename.trim();
                    return trimmedFilename.startsWith("http")
                        ? trimmedFilename
                        : `${baseUrl}${trimmedFilename}`;
                });
        },
        openInNewTab(imageUrl) {
            window.open(imageUrl, '_blank'); // Opens the image URL in a new tab
        },
    },
};
</script>

<style scoped>
.dialog-top .v-dialog__content {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2000;
    /* Make sure it's above other content */
    height: auto;
    max-height: 100vh;
    /* Set max height to avoid overflow */
}
</style>
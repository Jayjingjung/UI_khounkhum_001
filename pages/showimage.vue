<template>
    <v-row justify="center">
        <v-container>
            <!-- List of Picture Groups -->
            <!-- <v-row v-if="picList.length" class="mt-4">
                <v-col v-for="(picGroup, index) in picList" :key="index" cols="12" sm="6" md="4">
                    <v-btn block color="secondary" @click="showImages(picGroup)">
                        {{ picGroup.folderName }}
                        {{ picGroup.dateCreate }}
                    </v-btn>
                </v-col>
            </v-row> -->
            <v-card class="mx-auto" max-width="790">
                <div class="mt-4">
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                            <v-btn fab elevation="0" dark width="30" height="30" small color="#2bcc96"
                                @click="$router.back()">
                                <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນຮູບພາກສະໜາມ
                            </div>
                            <v-divider></v-divider>
                            <div>
                                <div>
                                    <v-card-title v-if="number">
                                        <v-chip color="#2bcc96" dense class="font-weight-bold">
                                            {{ number }}
                                        </v-chip>
                                    </v-card-title>
                                </div>
                            </div>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="functionpay" :style="{ width: '300px' }"></v-text-field>
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
                        <div v-if="picList.length">

                            <div v-for="(picGroup, index) in picList" :key="index">
                                <v-card-actions>
                                    <v-btn text @click="showImages(picGroup)">
                                        <v-icon color="#00E676">
                                            mdi-progress-download
                                        </v-icon>
                                    </v-btn>
                                    <div class="hoverable" @click="showImages(picGroup)">
                                        {{ picGroup.folderName }}
                                        <v-divider></v-divider>
                                    </div>
                                    <v-spacer></v-spacer>
                                    {{ picGroup.dateCreate }}
                                </v-card-actions>
                            </div>
                        </div>
                        <div v-else class="text-center mt-5" style="font-size: 16px; color:crimson;">
                            <p>ບໍ່ມີຂໍ້ມູນ</p>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
            <!-- Full Picture Dialog with Scrollable Content -->
            <v-dialog v-model="dialog" max-width="35%">
                <v-card>
                    <div class="pt-4 pl-4">
                        <v-btn text @click="dialog = false" rounded>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                    <!-- Dialog Title with Folder and Date -->
                    <v-card-title class="justify-space-between">
                        <span>{{ selectedFolderName }}</span>
                        <span>{{ selectedDateCreate }}</span>
                    </v-card-title>
                    <!-- Image Carousel -->
                    <v-carousel hide-delimiters height="100%">
                        <v-carousel-item v-for="(pic, index) in carouselPics" :key="index" :src="pic"
                            reverse-transition="fade-transition" transition="fade-transition">
                            <v-img :src="pic" @click="openInNewTab(pic)"></v-img>
                        </v-carousel-item>
                    </v-carousel>
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
            picList: [], // List of picture groups
            selectedPicGroup: null, // Currently selected picture group
            dialog: false, // State for the dialog
            toKen: "", // Token to be sent with the API request
            carouselPics: [], // List of images for the carousel
            carouselIndex: 0, // Current index for the carousel
            selectedFolderName: "", // Folder name for the selected picture group
            selectedDateCreate: "", // Date of creation for the selected picture group
        };
    },
    mounted() {
        const token = this.$route.query.token;
        const number = this.$route.query.number;
        if (token && number) {
            this.setToKen(token);
            this.number = number;
        }
        this.onGetPicList();
    },
    methods: {
        setToKen(token) {
            this.toKen = token; // Set the token
        },
        async onGetPicList() {
            try {
                const response = await axios.post(
                    "http://khounkham.com/api-prod/v1/truck/ShowPicOfBor.service",
                    {
                        toKen: this.toKen, // Use the token
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

<style scoped></style>
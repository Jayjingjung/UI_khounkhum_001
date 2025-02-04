<template>
    <div class="x">
        <v-card style="width: 100%; height: 100%; overflow-x: auto;">
            <v-btn style="background-color: teal; color: white;">
                + ເພີ່ມ
            </v-btn>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                    <span class="text-h6">ເພີ່ມ</span>
                    <v-btn icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <p class="text-caption font-weight-bold">ປະເພດ <span class="red--text">*</span></p>
                                <v-chip-group v-model="selectedType_Oldwarehouse" mandatory>
                                    <v-chip v-for="(type, index) in partTypes" :key="index" outlined>
                                        {{ type }}
                                    </v-chip>
                                </v-chip-group>
                            </v-col>

                            <v-col cols="12">
                                <v-autocomplete v-model="itemName_Oldwarehouse" :items="itemOptions"
                                    label="ເລືອກ ອຸປະກອນ" outlined dense required></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="*ຈໍານວນ" dense outlined background-color="#f5f5f5"
                                    v-model="qty_Oldwarehouse"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="*ປະເພດ" dense outlined background-color="#f5f5f5"
                                    v-model="selectedType_Oldwarehouse"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete v-model="vehicle_Oldwarehouse" :items="vehicleOptions"
                                    label="ເລືອກຫົວລົດ" outlined dense required></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete v-model="vehiclefooter_Oldwarehouse" :items="vehiclefooter"
                                    label="ເລືອກຫາງລົດ" outlined dense required></v-autocomplete>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field dense outlined v-model="price_Oldwarehouse" label="ລາຄາ" prefix="$ or K"
                                    type="number" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="date" label="ເລືອກວັນທີ" v-model="ImportExpirationDate_Oldwarehouse" outlined dense></v-text-field>


                            </v-col>

                            <v-col cols="12">
                                <v-textarea dense outlined v-model="description_Oldwarehouse" label="ລາຍລະອຽດ"
                                    required></v-textarea>
                            </v-col>


                            <!-- Image Selection Options -->
                            <v-col cols="12" class="d-flex justify-center">
                                <v-btn style="width: 300px;" icon @click="triggerFileInput">
                                    <v-icon>mdi-cloud-upload</v-icon>
                                    ອັບໂຫຼດໄຟລ໌
                                </v-btn>

                                <v-btn style="width: 300px;" icon @click="accessCamera">
                                    <v-icon>mdi-camera</v-icon>
                                    ຖ່າຍຮູບ
                                </v-btn>
                            </v-col>

                            <v-col cols="12">
                                <v-file-input ref="fileInput" label="Upload Image" v-model="image" accept="image/*"
                                    @change="previewImage" style="display: none;"></v-file-input>
                                <v-img v-if="imagePreview" :src="imagePreview" contain height="200"></v-img>
                            </v-col>

                            <!-- Camera Capture -->
                            <v-col cols="12" v-if="isCameraOpen" class="camera-container">
                                <video ref="camera" autoplay class="camera-video"></video>
                                <v-btn color="success" @click="capturePhoto" class="capture-btn">
                                    <v-icon>mdi-camera</v-icon>
                                </v-btn>
                                <canvas ref="canvas" style="display: none;"></canvas>
                            </v-col>


                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-between">
                    <v-btn variant="outlined">ຍົກເລີກ</v-btn>
                    <v-btn color="primary">ສົ່ງ</v-btn>
                </v-card-actions>
            </v-card>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedType_Oldwarehouse: null,
            itemName_Oldwarehouse: "",
            qty_Oldwarehouse: "",
            vehicle_Oldwarehouse: "",
            vehiclefooter_Oldwarehouse: "",
            price_Oldwarehouse: "",
            ImportExpirationDate_Oldwarehouse: "",
            description_Oldwarehouse: "",
            image_Oldwarehouse: null,

            partTypes: ["Peripherals", "Connectors", "Central Components"],
            vehicleOptions: [],
            vehiclefooter: [],
            itemOptions: [],
            imagePreview: null,
            isCameraOpen: false,

            itemName: "",
            vehicle: "",
            price: "",
            description: "",
            image: null,
        };
    },
    watch: {
        // Watch changes and save them to Local Storage
        selectedType_Oldwarehouse(newVal) {
            localStorage.setItem("selectedType_Oldwarehouse", JSON.stringify(newVal));
        },
        itemName_Oldwarehouse(newVal) {
            localStorage.setItem("itemName_Oldwarehouse", newVal);
        },
        qty_Oldwarehouse(newVal) {
            localStorage.setItem("qty_Oldwarehouse", newVal);
        },
        vehicle_Oldwarehouse(newVal) {
            localStorage.setItem("vehicle_Oldwarehouse", newVal);
        },
        vehiclefooter_Oldwarehouse(newVal) {
            localStorage.setItem("vehiclefooter_Oldwarehouse", newVal);
        },
        price_Oldwarehouse(newVal) {
            localStorage.setItem("price_Oldwarehouse", newVal);
        },
        ImportExpirationDate_Oldwarehouse(newVal) {
            localStorage.setItem("ImportExpirationDate_Oldwarehouse", newVal);
        },
        description_Oldwarehouse(newVal) {
            localStorage.setItem("description_Oldwarehouse", newVal);
        }
    },
    methods: {
        loadFromLocalStorage() {
            this.selectedType_Oldwarehouse = JSON.parse(localStorage.getItem("selectedType_Oldwarehouse")) || null;
            this.itemName_Oldwarehouse = localStorage.getItem("itemName_Oldwarehouse") || "";
            this.qty_Oldwarehouse = localStorage.getItem("qty_Oldwarehouse") || "";
            this.vehicle_Oldwarehouse = localStorage.getItem("vehicle_Oldwarehouse") || "";
            this.vehiclefooter_Oldwarehouse = localStorage.getItem("vehiclefooter_Oldwarehouse") || "";
            this.price_Oldwarehouse = localStorage.getItem("price_Oldwarehouse") || "";
            this.ImportExpirationDate_Oldwarehouse = localStorage.getItem("ImportExpirationDate_Oldwarehouse") || "";
            this.description_Oldwarehouse = localStorage.getItem("description_Oldwarehouse") || "";
        },
        async fetchVehicleOptions() {
            try {
                const response = await this.$axios.$post('listVicicleHeader.service', {
                    toKen: localStorage.getItem('toKen')
                });
                this.vehicleOptions = response.data.map(item => item.h_VICIVLE_NUMBER) || [];
            } catch (error) {
                console.error("Error fetching vehicle options:", error);
            }
        },
        async fetchVehiclefooter() {
            try {
                const response = await this.$axios.$post('listViciclefooter.service', {
                    toKen: localStorage.getItem('toKen')
                });
                this.vehiclefooter = response.data.map(item => item.f_BRANCH) || [];
            } catch (error) {
                console.error("Error fetching vehicle footer:", error);
            }
        },
        async fetchItemOptions() {
            try {
                const response = await this.$axios.$post('ListItems.service', {
                    toKen: localStorage.getItem('toKen')
                });
                this.itemOptions = response.data.map(item => item.itemName) || [];
            } catch (error) {
                console.error("Error fetching item options:", error);
            }
        },
        previewImage() {
            if (this.part.image) {
                const file = this.part.image;
                this.imagePreview = URL.createObjectURL(file);
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.$refs.input.click();
        },
        accessCamera() {
            this.isCameraOpen = true;
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    this.$refs.camera.srcObject = stream;
                })
                .catch(error => {
                    console.error("Error accessing camera:", error);
                });
        },
        capturePhoto() {
            const video = this.$refs.camera;
            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            this.imagePreview = canvas.toDataURL("image/png");
        }
    },
    async mounted() {
        this.loadFromLocalStorage();
        await this.fetchVehicleOptions();
        await this.fetchVehiclefooter();
        await this.fetchItemOptions();
    },
};
</script>

<style>
.x {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgb(255, 255, 255);
}

.camera-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.camera-video {
    width: 100%;
    max-height: 300px;

}

.capture-btn {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    /* border-radius: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<template>
    <div>
        <v-card style="width: 800px; height: 100%; ">
            <v-card-text>
                <div>
                    <h1 style=" display: flex;align-items: center;justify-content: center" class="mb-10 mt-10">ເພີ່ມ
                    </h1>
                    <v-row>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ຊື່</spen>
                                <spen>ຈຳເປັນ</spen>
                            </div>
                            <v-autocomplete v-model="itemName_Oldwarehouse" :items="itemOptions" label="ເລືອກ ອຸປະກອນ"
                                outlined dense required></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ຈໍານວນ</spen>
                                <spen></spen>
                            </div>
                            <v-text-field label="*ຈໍານວນ" dense outlined background-color="#f5f5f5"
                                v-model="qty_Oldwarehouse"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ປະເພດ</spen>
                                <spen>ຈຳເປັນ</spen>
                            </div>
                            <v-text-field label="*ປະເພດ" dense outlined background-color="#f5f5f5"
                                v-model="selectedType_Oldwarehouse"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ປະເພດ</spen>
                                <spen>ຈຳເປັນ</spen>
                            </div>
                            <v-autocomplete v-model="selectedType_Oldwarehouse" :items="typeOptions" label="ເລືອກປະເພດ"
                                outlined dense required></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ຫົວລົດ</spen>
                                <spen></spen>
                            </div>
                            <v-autocomplete v-model="vehicle_Oldwarehouse" :items="vehicleOptions" label="ເລືອກຫົວລົດ"
                                outlined dense required></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ຫາງລົດ</spen>
                                <spen></spen>
                            </div>
                            <v-autocomplete v-model="vehiclefooter_Oldwarehouse" :items="vehiclefooter"
                                label="ເລືອກຫາງລົດ" outlined dense required></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ລາຄາ</spen>
                                <spen></spen>
                            </div>
                            <v-text-field dense outlined v-model="price_Oldwarehouse" label="ລາຄາ" prefix="$ or K"
                                type="number" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ວັນທີ່ນໍາເຂົ້າ</spen>
                                <spen>ຈຳເປັນ</spen>
                            </div>
                            <v-text-field type="date" v-model="importExpirationDate_Oldwarehouse" outlined
                                dense></v-text-field>


                        </v-col>

                        <v-col cols="12">
                            <div style="display: flex; justify-content:space-between; ">
                                <spen>ລາຍລະອຽດ</spen>
                                <spen></spen>
                            </div>
                            <v-textarea dense outlined v-model="description_Oldwarehouse" label="ລາຍລະອຽດ"
                                required></v-textarea>
                        </v-col>


                        <v-card-text>
                            <div>
                                <v-row>
                                    <v-col cols="12">
                                        <div style="display: flex; justify-content:space-between; ">
                                            <spen>ຮູບ</spen>
                                            <spen>ຈຳເປັນ</spen>
                                        </div>
                                        <v-file-input label="ອັບໂຫຼດໄຟລ໌" outlined dense prepend-icon="mdi-cloud-upload"
                                            append-inner-icon="mdi-card-account-details" background-color="#f5f5f5"
                                            v-model="imagea" @change="previewImage"></v-file-input>
                                    </v-col>
                                    <!-- <v-col cols="12">
                                            <v-btn @click="openCamera">
                                                <v-icon>mdi-camera</v-icon>
                                                ຖ່າຍຮູບ
                                            </v-btn>
                                        </v-col> -->
                                    <v-col cols="12">
                                        <video ref="video" class="camera-video" v-show="showCamera" autoplay></video>
                                        <canvas ref="canvas" style="display: none;"></canvas>
                                        <v-btn v-if="showCamera" @click="capturePhoto">ບັນທຶກຮູບ</v-btn>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-img v-if="imagePreview" :src="imagePreview" contain height="200"></v-img>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                    </v-row>
                </div>
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between">
                <v-btn variant="outlined">ຍົກເລີກ</v-btn>
                <v-btn @click="insertData" color="primary">ສົ່ງ</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            openForm: false,
            selectedType_Oldwarehouse: null,
            itemName_Oldwarehouse: "",
            qty_Oldwarehouse: "",
            vehicle_Oldwarehouse: "",
            vehiclefooter_Oldwarehouse: "",
            price_Oldwarehouse: "",
            importExpirationDate_Oldwarehouse: "",
            description_Oldwarehouse: "",
            image_Oldwarehouse: null,
            imagePreview: null,

            vehicleOptions: [],
            vehiclefooter: [],
            itemOptions: [],
            typeOptions: [],
            image_Oldwarehouse: null,
            imagea: null,
            showCamera: false,
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
        importExpirationDate_Oldwarehouse(newVal) {
            localStorage.setItem("importExpirationDate_Oldwarehouse", newVal);
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
            this.importExpirationDate_Oldwarehouse = localStorage.getItem("importExpirationDate_Oldwarehouse") || "";
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
            const file = this.imagea;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.imagePreview = '';
            }
        },
        openCamera() {
            this.showCamera = true;
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.$refs.video.srcObject = stream;
            }).catch(error => {
                console.error("Camera access error:", error);
            });
        },
        capturePhoto() {
            const canvas = this.$refs.canvas;
            const video = this.$refs.video;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                this.imagea = new File([blob], "captured_photo.png", { type: "image/png" });
                this.imagePreview = URL.createObjectURL(blob);
            }, "image/png");
            this.showCamera = false;
            video.srcObject.getTracks().forEach(track => track.stop());
        },
        insertData() {
            let formData = new FormData();
            if (this.imagea) {
                formData.append('image_Oldwarehouse', this.imagea);
            }
            console.log("Data submitted", formData);
        },
        async insertData() {
            try {
                let formData = new FormData(); // ✅ Correct declaration

                formData.append('itemName_Oldwarehouse', this.itemName_Oldwarehouse);
                formData.append('qty_Oldwarehouse', this.qty_Oldwarehouse);
                formData.append('selectedType_Oldwarehouse', this.selectedType_Oldwarehouse);
                formData.append('vehicle_Oldwarehouse', this.vehicle_Oldwarehouse);
                formData.append('vehiclefooter_Oldwarehouse', this.vehiclefooter_Oldwarehouse);
                formData.append('price_Oldwarehouse', this.price_Oldwarehouse);
                formData.append('importExpirationDate_Oldwarehouse', this.importExpirationDate_Oldwarehouse);
                formData.append('description_Oldwarehouse', this.description_Oldwarehouse);

                // ✅ Append image file only if it exists
                if (this.imagea) {
                    formData.append('image_Oldwarehouse', this.imagea);
                }

                formData.append('toKen', localStorage.getItem("toKen"));

                const response = await this.$axios.$post('/InsertOldInventory.service', formData);

                // ✅ Success Alert
                Swal.fire('Success', 'Data inserted successfully!', 'success');

                this.openForm = false;
            } catch (error) {
                console.error("❌ Error inserting data:", error);
                Swal.fire('Error', 'Failed to insert data', 'error');
            }
            this.selectedType_Oldwarehouse = "";
            this.itemName_Oldwarehouse = "";
            this.qty_Oldwarehouse = "";
            this.vehicle_Oldwarehouse = "";
            this.vehiclefooter_Oldwarehouse = "";
            this.price_Oldwarehouse = "";
            this.importExpirationDate_Oldwarehouse = "";
            this.description_Oldwarehouse = "";
        },
        async fetchOldInventory() {
            try {
                const response = await this.$axios.$post('showOldInventory.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response.status === "00") {
                    this.typeOptions = response.data.map(item => item.selectedType_Oldwarehouse);
                }
                console.log("Old Inventory Data:", response);
            } catch (error) {
                console.error("Error fetching old inventory:", error);
            }
        },


    },
    async mounted() {
        this.loadFromLocalStorage();
        await this.fetchVehicleOptions();
        await this.fetchVehiclefooter();
        await this.fetchItemOptions();
        await this.fetchOldInventory();
    },
};
</script>

<style>
/* .x {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgb(255, 255, 255);
} */

/* .camera-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
} */

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

.camera-video {
    width: 100%;
    max-height: 300px;
}
</style>

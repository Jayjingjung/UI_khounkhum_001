<template>
    <div>
        <div style=" justify-content:space-between; margin-top: 90px; ">
            <v-card-actions>
                <v-spacer></v-spacer>
                <div v-if="truck_data_list.length >= num">
                    <v-alert type="warning" color="warning" style="font-size: 25px;"
                        text>ສາງເກົ່າເຕັມ(ຕ້ອງການຂາຍອອກ)</v-alert>
                    <!-- <v-btn fab @click="addList" color="primary" style="font-size: 20px; font-weight: bold;">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn> -->
                </div>
                <div v-else>
                    <v-chip @click="dialog = true" large
                        style="background-color: #A7FFEB;margin-bottom: 15px; font-size: 18px; font-weight: bold;">
                        + ເພີ່ມອະໄຫຼ່
                    </v-chip>
                </div>
            </v-card-actions>
        </div>
        <v-dialog max-width="700px" v-model="dialog">
            <sangkao @closeDialog="dialog = false" />
        </v-dialog>
        <div>
            <h1 style="color: crimson;">
                ສາງອະໄຫຼ່ເກົ່າ
                <hr>
            </h1>
            <v-chip color="primary" class="mt-6" v-if="village" style="color: aqua; font-size: 17px; ">
                {{ village }}
            </v-chip>
        </div>
        <div class="mt-10">
            <v-card-text>
                <v-card-actions>
                    <!-- Search Field -->
                    <v-text-field v-model="search" label="ຄົ້ນຫາຂໍ້ມູນ" prepend-inner-icon="mdi-magnify" dense
                        class="mb-4" style="width: 10%;"></v-text-field>
                    <v-spacer></v-spacer>
                    <!-- Autocomplete for Type Selection -->
                    <v-autocomplete v-model="selectedType" :items="uniqueTypes" label="ຄ້ນຫາຕາມປະເພດອະໄຫຼ່" outlined
                        dense clearable style="width: 8%;"></v-autocomplete>
                </v-card-actions>
            </v-card-text>
            <v-data-table v-if="filteredData.length" :headers="headers" :items="filteredData" :items-per-page="5"
                class="elevation-1 mt-4" header-class="bold-header">
                <!-- Custom Slots for Columns -->
                <template v-slot:item.image_Oldwarehouse="{ item }">
                    <v-img :src="item.image_Oldwarehouse" max-width="80" max-height="80"></v-img>
                </template>
                <template v-slot:item.importExpirationDate_Oldwarehouse="{ item }">
                    <span>{{ formatDate(item.importExpirationDate_Oldwarehouse) }}</span>
                </template>
                <template v-slot:item.price_Oldwarehouse="{ item }">
                    <span>{{ formatPrice(item.price_Oldwarehouse) }}</span>
                </template>
                <template v-slot:item.shows="{ item }">
                    <v-chip color="#A7FFEB" @click="showDetail(item)" class="mr-2">ເບີ່ງລາຍລະອຽດ</v-chip>
                </template>
                <template v-slot:item.edit="{ item }">
                    <v-chip color="yellow" @click="openEditDialog(item)" class="mr-2">ແກ້ໄຂ</v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-chip color="error" @click="deleteItem(item)">ລຶບ</v-chip>
                </template>
                <template v-slot:no-data>
                    <v-alert type="warning" color="warning" text>ບໍ່ພົບຂໍ້ມູນ</v-alert>
                </template>
            </v-data-table>
        </div>

        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="600px">
            <v-card>
                <div style="font-size: 25px;font-weight: bold; text-align: center;padding-top: 30px;">
                    ແກ້ໄຂຂໍ້ມູນ
                </div>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-img :src="editedItem.image_Oldwarehouse" max-width="250" max-height="350"
                                    class="mb-4"></v-img>
                                <v-file-input v-model="imageFile" label="ອັບໂຫຼດຮູບພາບໃໝ່" accept="image/*"
                                    @change="handleImageUpload"></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.itemName_Oldwarehouse"
                                    label="ຊື່ອະໄຫຼ່"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.selectedType_Oldwarehouse"
                                    label="ປະເພດອະໄຫຼ່"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.qty_Oldwarehouse" label="ຈຳນວນ"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.price_Oldwarehouse" label="ລາຄາ"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.vehicle_Oldwarehouse" label="ຫົວລົດ"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.vehiclefooter_Oldwarehouse"
                                    label="ຫາງລົດ"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field type="date" v-model="editedItem.importExpirationDate_Oldwarehouse"
                                    label="ວັນທີ່ນໍາເຂົ້າ"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="editedItem.description_Oldwarehouse" label="ລາຍລະອຽດ"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-text>
                    <v-card-actions>
                        <v-btn color="error" @click="closeEditDialog">ຍົກເລີກ</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="saveEditedItem" v-if="imageFile">ອັບເດັດ</v-btn>
                        <div v-else style="font-size: 20px;font-weight: bold;color: red;">
                            ກາລຸນາປ້ອນຮູບກ່ອນທຸກຄັ້ງ</div>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showDialog" max-width="890">
            <v-card>
                <v-card-text>
                    <v-card-actions>
                        <div>
                            <a :href="editedItem.image_Oldwarehouse" target="_blank">
                                <v-img style="display: block; justify-self: center; cursor: pointer;"
                                    :src="editedItem.image_Oldwarehouse" max-width="450px" max-height="560px" />
                            </a>
                            <div v-if="$vuetify.breakpoint.xs">
                                <div style="text-align: center; width: 300px;">
                                    <div class="mt-10" style="font-size: 18px;font-weight: bold; text-align: center;">
                                        {{ editedItem.itemName_Oldwarehouse }}
                                    </div>
                                    <div class="mt-4" style="font-size: 16px">
                                        ລາຄາ:
                                        {{ editedItem.price_Oldwarehouse }}
                                    </div>
                                    <div style="font-size: 16px">
                                        ຈໍານວນ:
                                        {{ editedItem.qty_Oldwarehouse }}
                                    </div>
                                    <v-row>
                                        <v-col cols="5">
                                            <div v-if="editedItem.vehicle_Oldwarehouse" style="font-size: 16px">
                                                ຫົວລົດ:
                                                <div>
                                                    {{ editedItem.vehicle_Oldwarehouse }}
                                                </div>
                                            </div>
                                            <div v-if="editedItem.vehiclefooter_Oldwarehouse" style="font-size: 16px">
                                                ຫາງລົດ:
                                                <div>
                                                    {{ editedItem.vehiclefooter_Oldwarehouse }}
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="7">
                                            <div>
                                                <div class="ml-2">
                                                    ວັນທີ່ນໍາເຂົ້າ
                                                </div>
                                                <div color="orange" small>
                                                    {{ editedItem.importExpirationDate_Oldwarehouse }}
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <div>
                                        <v-card-text>
                                            ລາຍລະອຽດ:
                                            <div>
                                                {{ editedItem.description_Oldwarehouse }}
                                            </div>
                                        </v-card-text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="mr-10"
                            v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl">
                            <div style="text-align: center; width: 300px;">
                                <div class="mt-10" style="font-size: 18px;font-weight: bold; text-align: center;">
                                    {{ editedItem.itemName_Oldwarehouse }}
                                </div>
                                <div class="mt-4" style="font-size: 16px">
                                    ລາຄາ:
                                    {{ editedItem.price_Oldwarehouse }}
                                </div>
                                <div style="font-size: 16px">
                                    ຈໍານວນ:
                                    {{ editedItem.qty_Oldwarehouse }}
                                </div>
                                <v-row>
                                    <v-col cols="5">
                                        <div v-if="editedItem.vehicle_Oldwarehouse" style="font-size: 16px">
                                            ຫົວລົດ:
                                            <div>
                                                {{ editedItem.vehicle_Oldwarehouse }}
                                            </div>
                                        </div>
                                        <div v-if="editedItem.vehiclefooter_Oldwarehouse" style="font-size: 16px">
                                            ຫາງລົດ:
                                            <div>
                                                {{ editedItem.vehiclefooter_Oldwarehouse }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col cols="7">
                                        <div>
                                            <div class="ml-2">
                                                ວັນທີ່ນໍາເຂົ້າ
                                            </div>
                                            <div color="orange" small>
                                                {{ editedItem.importExpirationDate_Oldwarehouse }}
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                                <div>
                                    <v-card-text>
                                        ລາຍລະອຽດ:
                                        <div>
                                            {{ editedItem.description_Oldwarehouse }}
                                        </div>
                                    </v-card-text>
                                </div>
                            </div>
                        </div>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            dialog: false,
            search: '', // Search 
            selectedType: null, // Selected type for filtering
            truck_data_list: [], // Data fetched from API
            loading_processing: false, // Loading state
            headers: [
                { text: 'ຮູບອະໄຫຼ່', value: 'image_Oldwarehouse', align: 'center' },
                { text: 'ຊື່ອະໄຫຼ່', value: 'itemName_Oldwarehouse', align: 'center' },
                { text: 'ປະເພດອະໄຫຼ່', value: 'selectedType_Oldwarehouse', align: 'center' },
                { text: 'ຈຳນວນ', value: 'qty_Oldwarehouse', align: 'center' },
                { text: 'ລາຄາ', value: 'price_Oldwarehouse', align: 'center' },
                { text: 'ຫົວລົດ', value: 'vehicle_Oldwarehouse', align: 'center' },
                { text: 'ຫາງລົດ', value: 'vehiclefooter_Oldwarehouse', align: 'center' },
                { text: 'ວັນທີ່ນໍາເຂົ້າ', value: 'importExpirationDate_Oldwarehouse', align: 'center' },
                { text: 'ລາຍລະອຽດ', value: 'description_Oldwarehouse', align: 'center' },
                { text: '', value: 'shows', align: 'center' },
                { text: 'ຕັ້ງຄ່າ', value: 'edit', align: 'center' },
                { text: '', value: 'actions', align: 'center' }, // Edit and delete buttons
            ],
            editDialog: false, // Controls edit dialog visibility
            showDialog: false,
            editedItem: {}, // Item being edited
            defaultItem: {}, // Default empty item
            imageFile: null, // Stores the uploaded image file
            bouang: null,
            village: '',
            num: '4',
        };
    },
    computed: {
        // Extract unique types from truck_data_list
        uniqueTypes() {
            const types = this.truck_data_list.map(item => item.selectedType_Oldwarehouse);
            return [...new Set(types)]; // Remove duplicates
        },

        // Filter data based on search keyword and selected type
        filteredData() {
            let data = this.truck_data_list;

            // Filter by selected type
            if (this.selectedType) {
                data = data.filter(item => item.selectedType_Oldwarehouse === this.selectedType);
            }
            // Filter by search keyword 
            if (this.search) {
                const keyword = this.search.toLowerCase();
                data = data.filter(item =>
                    Object.values(item).some(value =>
                        String(value).toLowerCase().includes(keyword))
                );
            }
            return data;
        },
    },
    methods: {
        // Fetch data from API
        async onGetTruckList() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showOldInventory.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (!response?.data || response.data.length === 0) {
                    this.truck_data_list = [];
                } else {
                    this.truck_data_list = response.data;
                }
            } catch (error) {
                console.log(error);
                this.$swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },

        // Open edit dialog
        openEditDialog(item) {
            this.editedItem = { ...item }; // Copy item to avoid direct mutation
            this.imageFile = null; // Reset image file
            this.editDialog = true;
        },
        showDetail(item) {
            this.editedItem = { ...item }; // Copy item to avoid direct mutation
            this.showDialog = true;
        },
        // Close edit dialog
        closeEditDialog() {
            this.editDialog = false;
            this.editedItem = { ...this.defaultItem };
            this.imageFile = null; // Reset image file
        },

        // Handle image upload
        handleImageUpload(event) {
            const file = event;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.editedItem.image_Oldwarehouse = e.target.result; // Set image preview
                };
                reader.readAsDataURL(file);
            }
        },

        // Save edited item
        async saveEditedItem() {
            try {
                this.loading_processing = true;
                // Prepare FormData for the API request
                const formData = new FormData();
                const formattedDate = new Date(this.editedItem.importExpirationDate_Oldwarehouse).toISOString().split('T')[0]; // Format date
                formData.append('toKen', localStorage.getItem('toKen'));
                formData.append('key_id', this.editedItem.key_id); // Unique identifier for the item
                formData.append('itemName_Oldwarehouse', this.editedItem.itemName_Oldwarehouse);
                formData.append('price_Oldwarehouse', this.editedItem.price_Oldwarehouse);
                formData.append('qty_Oldwarehouse', this.editedItem.qty_Oldwarehouse);
                formData.append('vehicle_Oldwarehouse', this.editedItem.vehicle_Oldwarehouse);
                formData.append('vehiclefooter_Oldwarehouse', this.editedItem.vehiclefooter_Oldwarehouse);
                formData.append('description_Oldwarehouse', this.editedItem.description_Oldwarehouse);
                formData.append('selectedType_Oldwarehouse', this.editedItem.selectedType_Oldwarehouse);
                formData.append('importExpirationDate_Oldwarehouse', formattedDate);
                if (this.imageFile) {
                    formData.append('image_Oldwarehouse', this.imageFile); // Append the new image file
                } else {
                    formData.append('image_Oldwarehouse', this.editedItem.image_Oldwarehouse); // Keep the existing image
                }

                // Send the update request
                const response = await this.$axios.$post('UpdateOldInventory.service', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Required for file uploads
                    },
                });

                if (response?.status === "00") {
                    Swal.fire({
                        title: 'ສຳເລັດ!',
                        text: 'ຂໍ້ມູນຖືກອັບເດດແລ້ວ',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    this.closeEditDialog();
                    if (this.bouang) {
                        this.forTest();
                        // this.onGetTruckList(); 
                    } else {
                        // this.forTest();
                        this.onGetTruckList(); // Refresh data
                    }
                } else {
                    this.$swal.fire({
                        title: 'ຜິດພາດ!',
                        text: response?.message || 'ການອັບເດດຜິດພາດ',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.log(error);
                this.$swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },

        // Delete item
        async deleteItem(item) {
            const confirm = await Swal.fire({
                title: "ທ່ານຕ້ອງການລຶບຂໍ້ມູນແທ້ບໍ່?",
                text: "ເພາະຖ້າລຶບແລ້ວຈະບໍ່ສາມາດກູ້ຂໍ້ມູນຄືນໄດ້.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#FF1744',
                cancelButtonColor: '#EEFF41',
                confirmButtonText: "ລົບອອກ!",
                cancelButtonText: 'ຍົກເລີກ'
            });

            if (confirm.isConfirmed) {
                try {
                    const response = await this.$axios.$post("/DelOldInventory.service", {
                        key_id: item.key_id, // Use the item's unique ID
                    });
                    console.log("key_id", item.key_id);
                    console.log("Response from API:", response);

                    if (response?.status === "00") {
                        Swal.fire({
                            title: "ສຳເລັດ",
                            text: "ລຶບຂໍ້ມູນສຳເລັດ!",
                            icon: "success",
                        });
                        if (this.bouang) {
                            // this.forTest();
                            await this.onGetTruckList();
                        } else {
                            await this.forTest();
                            // await this.onGetTruckList(); // Refresh data
                        }

                    } else {
                        Swal.fire({
                            icon: "error",
                            text: "ລຶບຂໍ້ມູນບໍ່ສຳເລັດ!",
                        });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        text: "ຜິດພາດໃນການລຶບຂໍ້ມູນ!",
                    });
                }
            }
        },

        // Format date
        formatDate(date) {
            if (!date) return '-';
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(date).toLocaleDateString('lo-LA', options);
        },

        // Format price
        formatPrice(price) {
            return new Intl.NumberFormat('lo-LA').format(price);
        },
        forTest() {
            Swal.fire({
                title: 'ສຳເລັດ!',
                text: 'ຄົ້ນຫາຕາມໄອດີຂອງບໍ່',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        },
        addList() {
            this.num = this.num + 1;
        }
    },
    mounted() {
        const bouang = this.$route.query.bouang;
        const village = this.$route.query.village;

        if (bouang) {
            // If bouang has a truthy value
            this.bouang = bouang;
            this.village = village;
            this.forTest();
        } else {
            // If bouang is falsy (undefined, null, empty, etc.)
            this.onGetTruckList(); // Fetch data when component is mounted
        }
    }

};
</script>

<style scoped>
.v-data-table {
    font-family: 'Noto Sans Lao', sans-serif;
}

.bold-header {
    font-weight: bold;
    font-size: 18px;
    text-align: center;
}
</style>
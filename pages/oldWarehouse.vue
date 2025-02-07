<template>
    <v-container>
        <v-card-text>
            <div>
                <div style="display: flex; justify-content:space-between; ">
                    <div>
                        <h1>
                            ສາງອະໄລ່ເກົ່າ
                        </h1>
                    </div>
                    <div>
                        <v-btn @click="dialog = true" style="background-color: teal; color: white;margin-bottom: 15px;">
                            + ເພີ່ມ
                        </v-btn>
                    </div>
                </div>
                <v-dialog style="display: flex; justify-content: flex-end;" max-width="700px" v-model="dialog">
                    <sangkao />
                </v-dialog>

                <v-dialog max-width="500px" v-model="editDialog">
                    <v-card>
                        <v-card-text>
                            <h1 class="pt-10">ແກ້ໄຂ</h1>
                            <v-card-text>
                                <v-form ref="editForm" v-model="formValid">
                                    <!-- Image Preview -->
                                    <v-img v-if="selectedPart.imagePreview" :src="selectedPart.imagePreview"
                                        height="200px" contain></v-img>
                                    <v-text-field v-model="selectedPart.namec" label="ຊື່"
                                        :rules="[v => !!v || 'Name is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.price" label="ລາຄາ" type="number"
                                        :rules="[v => !!v || 'Price is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.totall" label="ຈໍານວນ" type="number"
                                        :rules="[v => !!v || 'Total is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.headc" label="ຫົວລົດ"
                                        :rules="[v => !!v || 'Head Code is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.tailc" label="ຫາງລົດ"
                                        :rules="[v => !!v || 'Tail Code is required']"></v-text-field>
                                    <v-text-field type="date" v-model="selectedPart.date" label="ວັນທີ່ນໍາເຂົ້າ"
                                        :rules="[v => !!v || 'Tail Code is required']"></v-text-field>
                                    <v-textarea v-model="selectedPart.detail" label="ລາຍລະອຽດ" rows="4"></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="secondary" @click="editDialog = false">Cancel</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="updatePart">Save</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
            <div>
                <v-text-field dense v-model="searchQuery" label="🔍 ຄົ້ນຫາປະເພດອະໄລ່" outlined clearable></v-text-field>
            </div>
        </v-card-text>
        <v-col>
            <v-row v-for="(category, index) in filteredCategories" :key="index">
                <v-card style="width: 100%;" flat>
                    <v-card-actions>
                        <v-card-title style="font-weight: bold; color: #0097A7;">{{ category.type }}</v-card-title>
                        <!-- <div>{{ category.description }}</div> -->
                        <v-spacer></v-spacer>
                        <v-btn small text @click="viewAll(category)"
                            style="font-size: 18px;color:#00796B;font-weight: bold;">
                            ເບີ່ງທັງໝົດ
                            <v-icon>
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                    <!-- Horizontal Scroll Container -->
                    <div class="scroll-container">
                        <v-row class="flex-nowrap">
                            <v-col v-for="(part, index) in category.parts" :key="index">
                                <v-hover v-slot:default="{ hover }">
                                    <v-card class="mx-auto" width="300px" color="#ECEFF1">
                                        <v-card-text>
                                            <v-img :src="part.image" height="200px">
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn v-if="hover" fab text small @click="editData(part)">
                                                        <v-icon color="#18FFFF">mdi-dots-vertical</v-icon>
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-img>
                                            <div style="text-align: center;">
                                                <v-btn color="#18FFFF" @click="openPartDialog(part)" v-if="hover">
                                                    Read More
                                                </v-btn>
                                            </div>
                                            <div class="mt-4"
                                                style="font-size: 18px;font-weight: bold; text-align: center;">
                                                {{ part.namec }}
                                            </div>
                                            <div class="mt-4" style="font-size: 16px;font-weight: bold;">
                                                ລາຄາ: {{ part.price }}
                                            </div>
                                            <div style="font-size: 16px;font-weight: bold;">
                                                ຈໍານວນ: {{ part.totall }}
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </div>

                </v-card>
            </v-row>
        </v-col>
        <!-- Dialog for selected part -->
        <v-dialog v-model="showPartDialog" max-width="620">
            <v-card>
                <v-card-text>
                    <v-img style="display: block;justify-self: center;" :src="selectedPart?.image" max-width="500px" />
                    <div style="text-align: center;">
                        <div class="mt-10" style="font-size: 18px;font-weight: bold; text-align: center;">
                            {{ selectedPart?.namec }}
                        </div>
                        <div class="mt-4" style="font-size: 16px">
                            ລາຄາ:
                            {{ selectedPart?.price }}
                        </div>
                        <div style="font-size: 16px">
                            ຈໍານວນ:
                            {{ selectedPart?.totall }}
                        </div>
                        <v-row>
                            <v-col cols="6">
                                <div v-if="selectedPart?.headc" style="font-size: 16px">
                                    ຫົວລົດ:
                                    {{ selectedPart?.headc }}
                                </div>
                                <div v-if="selectedPart?.tailc" style="font-size: 16px">
                                    ຫາງລົດ:
                                    {{ selectedPart?.tailc }}
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div>
                                    <div class="ml-2">
                                        ວັນທີ່ນໍາເຂົ້າ
                                    </div>
                                    <div color="orange" small>
                                        {{ selectedPart?.date }}
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                        <div>
                            ລາຍລະອຽດ: <br>
                            <span>
                                {{ selectedPart?.detail }}
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae ex saepe quae
                                error, eveniet libero! Dolor qui deleniti labore voluptatum.
                            </span>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Dialog for showing all parts in a category -->
        <v-dialog v-model="showDetails" width="90%">
            <v-card class="mx-auto">
                <v-card-text>
                    <v-card-actions>
                        <v-card-title></v-card-title>
                        <v-btn color="#F50057" @click="closeDetails">
                            <v-icon>mdi-backburger</v-icon>ອອກ
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card-text>
                <v-card-text>
                    <div class="ml-10" style="font-size: 20px; font-weight: bold;">
                        {{ selectedCategory?.type }}
                    </div>
                    <v-row>
                        <v-col v-for="(part, index) in selectedCategory?.parts" :key="index">
                            <v-hover v-slot:default="{ hover }">
                                <v-card class="mx-auto" width="300px" color="#ECEFF1">
                                    <v-card-text>
                                        <v-img :src="part.image" height="200px">
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn v-if="hover" fab text small @click="editData(part)">
                                                    <v-icon color="#18FFFF">mdi-dots-vertical</v-icon>
                                                </v-btn>
                                            </v-card-actions>
                                        </v-img>
                                        <div style="text-align: center;">
                                            <v-btn color="#18FFFF" @click="openPartDialog(part)" v-if="hover">
                                                Read More
                                            </v-btn>
                                        </div>
                                        <div class="mt-4"
                                            style="font-size: 18px;font-weight: bold; text-align: center;">
                                            {{ part.namec }}
                                        </div>
                                        <div class="mt-4" style="font-size: 16px;font-weight: bold;">
                                            ລາຄາ: {{ part.price }}
                                        </div>
                                        <div style="font-size: 16px;font-weight: bold;">
                                            ຈໍານວນ: {{ part.totall }}
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            editDialog: false,
            categories: [],
            truck_data_list: [],
            loading_processing: false,
            selectedCategory: null,
            selectedPart: {},
            // selectedPart: null,
            showDetails: false,
            showPartDialog: false,
            searchQuery: "",
            formValid: false,
        };
    },
    async mounted() {
        await this.onGetTruckList();
        this.mapTruckDataToCategories(); // group data
    },
    computed: {
        filteredCategories() {
            if (!this.searchQuery) {
                return this.categories; // if no searching, it will display all.
            }
            const query = this.searchQuery.toLowerCase();
            return this.categories.filter(category =>
                category.type?.toLowerCase().includes(query)
            );
        }
    },
    methods: {
        async onGetTruckList() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showOldInventory.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('all_truck_list:', response);
                if (!response?.data || response.data.length === 0) {
                    this.truck_data_list = [];
                } else {
                    this.truck_data_list = response.data;
                }
            } catch (error) {
                console.log(error);
                this.$swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },
        mapTruckDataToCategories() {
            // Group truck data by h_VICIVLE_BRANCH (or any other field you want to use as a category)
            const groupedData = this.truck_data_list.reduce((acc, truck) => {
                const categoryName = truck.selectedType_Oldwarehouse; // Use h_VICIVLE_BRANCH as the category name
                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        type: categoryName,
                        parts: [],
                    };
                }
                acc[categoryName].parts.push({
                    type: truck.selectedType_Oldwarehouse, // Use selectedType_Oldwarehouse as the part name
                    image: truck.image_Oldwarehouse, // Use image_Oldwarehouse as the image URL
                    namec: truck.itemName_Oldwarehouse,
                    totall: truck.qty_Oldwarehouse,
                    headc: truck.vehicle_Oldwarehouse,
                    tailc: truck.vehiclefooter_Oldwarehouse,
                    price: truck.price_Oldwarehouse,
                    date: truck.importExpirationDate_Oldwarehouse,
                    detail: truck.description_Oldwarehouse,
                });
                return acc;
            }, {});
            // Convert grouped data into an array of categories
            this.categories = Object.values(groupedData);
        },
        async updatePart() {
            try {
                // Form validation check
                if (!this.formValid) {
                    this.$swal.fire({
                        title: 'ຜິດພາດ!',
                        text: 'ກະລຸນາປ້ອນຂໍ້ມູນທັງຫມົດ!',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    return;
                }

                // Send the update request to the API
                const response = await this.$axios.$post('updateOldInventory.service', {
                    toKen: localStorage.getItem('toKen'),
                    // partId: this.selectedPart.id, // Ensure you are passing the unique part ID
                    itemName_Oldwarehouse: this.selectedPart.namec,
                    price_Oldwarehouse: this.selectedPart.price,
                    qty_Oldwarehouse: this.selectedPart.totall,
                    vehicle_Oldwarehouse: this.selectedPart.headc,
                    vehiclefooter_Oldwarehouse: this.selectedPart.tailc,
                    importExpirationDate_Oldwarehouse: this.selectedPart.date,
                    description_Oldwarehouse: this.selectedPart.detail,
                });

                // Handle response
                if (response?.data?.success) {
                    // Notify user of success
                    this.$swal.fire({
                        title: 'ສຳເລັດ!',
                        text: 'ຂໍ້ມູນຖືກອັບເດດແລ້ວ',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });

                    // Close the dialog and refresh data
                    this.editDialog = false;
                    await this.onGetTruckList(); // Refresh the truck list after update
                    this.mapTruckDataToCategories(); // Re-map the truck data to categories
                } else {
                    // Show error if update failed
                    this.$swal.fire({
                        title: 'ຜິດພາດ!',
                        text: response?.message || 'ການອັບເດດຜິດພາດ',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                // Handle any errors during the API call
                console.error(error);
                this.$swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'ການອັບເດດຜິດພາດ',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        viewAll(category) {
            console.log('Selected Category:', JSON.stringify(category, null, 2));
            this.selectedCategory = category;
            this.showDetails = true;
        },
        closeDetails() {
            this.showDetails = false;
        },
        openPartDialog(part) {
            this.selectedPart = part;
            this.showPartDialog = true;
        },
        editData(part) {
            this.selectedPart = part;
            this.editDialog = true;
        },
        closePartDialog() {
            this.showPartDialog = false;
        },
    },
};
</script>

<style scoped>
.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
}
</style>

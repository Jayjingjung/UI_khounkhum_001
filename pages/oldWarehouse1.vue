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


                <v-dialog max-width="700px" v-model="dialog">
                    <sangkao />
                </v-dialog>
            </div>
            <div>
                <v-text-field dense v-model="searchQuery" label="🔍 ຄົ້ນຫາປະເພດອະໄລ່" outlined clearable></v-text-field>

            </div>
        </v-card-text>
        <v-col>
            <v-row v-for="(category, index) in filteredCategories" :key="index">
                <v-card style="width: 100%;height: 450px;" flat>
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
                                <v-card class="mx-auto" width="300px" color="#ECEFF1" style="position: relative;">
                                    <!-- Dots Button with Dropdown Menu -->
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon small
                                                style="position: absolute; top: 5px; right: 5px; z-index: 1;"
                                                v-bind="attrs" v-on="on">
                                                <v-icon>mdi-dots-horizontal</v-icon>
                                            </v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item @click="editPart(part)">
                                                <v-list-item-icon>
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>ແກ້ໄຂ</v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>

                                    <v-card-text @click="openPartDialog(part)">
                                        <v-img :src="part.image" height="200px" />

                                        <div class="mt-4" style="font-size: 18px;font-weight: 500;color:black;">
                                            ຊື່ອະໄລ່
                                            {{ part.namec }}
                                        </div>
                                        <div class="mt-2" style="font-size: 16px;font-weight: 500;">
                                            ລະຫັດ: {{ part.key_id }}
                                        </div>
                                        <div class="mt-2" style="font-size: 16px;font-weight: 500;">
                                            ລາຄາ: {{ part.price }}
                                        </div>
                                        <div style="font-size: 16px;font-weight: 500;">
                                            ຈໍານວນ: {{ part.totall }}
                                        </div>
                                    </v-card-text>
                                </v-card>

                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </v-row>
        </v-col>
        <!-- Dialog for selected part -->
        <v-dialog v-model="showPartDialog" max-width="50%">
            <v-card>
                <v-img style="display: block;justify-self: center;" :src="selectedPart?.image" max-width="500px" />
                <v-row>
                    <v-col>
                        <div class="mt-4" style="font-size: 18px;font-weight: 500;color:black; ">
                            {{ selectedPart?.namec }}
                        </div>
                        <div class="mt-4" style="font-size: 16px;font-weight: 500;">
                            ລາຄາ:
                            {{ selectedPart?.price }}
                        </div>
                        <div style="font-size: 16px;font-weight: 500;">
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
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
        <!-- Dialog for showing all parts in a category -->
        <v-dialog v-model="showDetails" width="100%">
            <v-card class="mx-auto">
                <v-card-text>
                    <v-card-actions>
                        <v-card-title></v-card-title>
                        <v-btn style="color: aliceblue;" color="#00796B" @click="closeDetails">
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
                        <v-col v-for="(part, index) in selectedCategory?.parts" :key="index"
                            @click="openPartDialog(part)">
                            <v-card class="mx-auto" width="300px" color="#ECEFF1">
                                <v-card-text>
                                    <v-img :src="part.image" height="200px" />
                                    <!-- <v-card-title>{{ part.description }}</v-card-title> -->
                                    <div class="mt-4" style="font-size: 18px;font-weight: 500;color:black; ">
                                        ຊື່ອະໄລ່

                                        {{ part.namec }}
                                    </div>

                                    <div class="mt-2" style="font-size: 16px;font-weight: 500;">
                                        ລະຫັດ:
                                        {{ part.key_id }}
                                    </div>
                                    <div class="mt-2" style="font-size: 16px;font-weight: 500;">
                                        ລາຄາ:
                                        {{ part.price }}
                                    </div>
                                    <div style="font-size: 16px;font-weight: 500;">
                                        ຈໍານວນ:
                                        {{ part.totall }}
                                    </div>
                                </v-card-text>
                            </v-card>
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

            categories: [],
            truck_data_list: [],
            loading_processing: false,
            selectedCategory: null,
            selectedPart: null,
            showDetails: false,
            showPartDialog: false,
            searchQuery: "",
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
                    key_id: truck.key_id,
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
        closePartDialog() {
            this.showPartDialog = false;
        },
    },
};
</script>

<style scoped>
.scroll-container {

    width: 100%;
}
</style>

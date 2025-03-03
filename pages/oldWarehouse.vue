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
                <v-dialog max-width="500px" v-model="editDialog">
                    <v-card>
                        <v-card-text>
                            <h1 class="pt-10">ແກ້ໄຂ</h1>
                            <v-card-text>
                                <v-form ref="editForm" v-model="formValid">
                                    <!-- Show Old Image if Available -->
                                    <div class="image-container" style="position: relative; height: 170px;">
                                        <!-- แสดงภาพที่อัปโหลดจริง (ไฟล์ที่ผู้ใช้เลือก) -->
                                        <!-- <v-img v-if="selectedPart.image" :src="selectedPart.image" height="170px"
                                            contain style="position: absolute; top: 0; left: 0;" /> -->
                                        <!-- แสดงพรีวิวภาพ (Base64) หากไม่มีไฟล์จริง -->
                                        <v-img v-if="selectedPart.imagePreview" :src="selectedPart.imagePreview"
                                            height="170px" contain style="position: absolute; top: 0; left: 0;" />
                                    </div>

                                    <!-- ปุ่มเปลี่ยนรูป -->
                                    <!-- <div style="text-align: center;">
                                        <v-btn dense @click="clearImage" color="success" class="mt-2">
                                            ປ່ຽນຮູບ
                                        </v-btn>
                                    </div> -->

                                    <!-- v-if="!selectedPart.imagePreview && !selectedPart.image" -->
                                    <!-- ฟอร์มอัปโหลดไฟล์ -->
                                    <v-file-input label="ອັບໂຫຼດຮູບ" accept="image/*" prepend-icon="mdi-camera"
                                        @change="onImageChange" />
                                    <v-text-field v-model="selectedPart.namec" label="ຊື່"
                                        :rules="[v => !!v || 'Name is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.type" label="ປະເພດ"
                                        :rules="[v => !!v || 'Type is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.price" label="ລາຄາ"
                                        :rules="[v => !!v || 'Price is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.totall" label="ຈໍານວນ"
                                        :rules="[v => !!v || 'Total is required']"></v-text-field>
                                    <v-text-field v-model="selectedPart.headc" label="ຫົວລົດ"></v-text-field>
                                    <v-text-field v-model="selectedPart.tailc" label="ຫາງລົດ"></v-text-field>
                                    <v-text-field type="date" v-model="selectedPart.date" label="ວັນທີ່ນໍາເຂົ້າ"
                                        :rules="[v => !!v || 'Tail Code is required']"></v-text-field>
                                    <v-textarea v-model="selectedPart.detail" label="ລາຍລະອຽດ" rows="4"></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="error" @click="editDialog = false">ຍົກເລີກ</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="updatePart"
                                    v-if="selectedPart.imagePreview && selectedPart.image">ອັບເດັບ</v-btn>
                                <div v-else style="font-size: 20px;font-weight: bold;color: red;">
                                    ກາລຸນາປ້ອນຮູບກ່ອນທຸກຄັ້ງ</div>
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
                                <v-card class="mx-auto" width="270px" color="#ECEFF1">
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon style="position: absolute; top: 1px; right: 2px; z-index: 1;"
                                                v-bind="attrs" v-on="on">
                                                <v-icon color="#00796B">mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                                <v-list-item-group>
                                                    <!-- ปุ่มแก้ไข -->
                                                    <v-list-item @click="editData(part)">
                                                        <v-list-item-title>
                                                            ແກ້ໄຂ
                                                        </v-list-item-title>
                                                    </v-list-item>

                                                    <!-- ปุ่มลบ -->
                                                    <v-list-item @click="deleteItem(part)">
                                                        <v-list-item-title>
                                                            ລຶບອອກ
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                    <v-card-text @click="openPartDialog(part)">
                                        <v-img style="margin-top: 20px;" :src="part.image" height="200px">
                                        </v-img>
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
                            </v-col>
                            <v-col></v-col>
                        </v-row>
                    </div>
                </v-card>
            </v-row>
        </v-col>
        <!-- Dialog for selected part -->
        <v-dialog v-model="showPartDialog" max-width="590">
            <v-card>
                <v-card-text>
                    <v-card-actions>
                        <div>
                            <v-img style="display: block;justify-self: center;" :src="selectedPart?.image"
                                max-width="250px" />
                            <div v-if="$vuetify.breakpoint.xs">
                                <div style="text-align: center; width: 300px;">
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
                                        <v-col cols="5">
                                            <div v-if="selectedPart?.headc" style="font-size: 16px">
                                                ຫົວລົດ:
                                                <div>
                                                    {{ selectedPart?.headc }}
                                                </div>
                                            </div>
                                            <div v-if="selectedPart?.tailc" style="font-size: 16px">
                                                ຫາງລົດ:
                                                <div>
                                                    {{ selectedPart?.tailc }}
                                                </div>
                                            </div>
                                        </v-col>
                                        <v-col cols="7">
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
                                        <v-card-text>
                                            ລາຍລະອຽດ:
                                            <div>
                                                {{ selectedPart?.detail }}
                                            </div>
                                        </v-card-text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="mr-10" v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl">
                            <div style="text-align: center; width: 300px;">
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
                                    <v-col cols="5">
                                        <div v-if="selectedPart?.headc" style="font-size: 16px">
                                            ຫົວລົດ:
                                            <div>
                                                {{ selectedPart?.headc }}
                                            </div>
                                        </div>
                                        <div v-if="selectedPart?.tailc" style="font-size: 16px">
                                            ຫາງລົດ:
                                            <div>
                                                {{ selectedPart?.tailc }}
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col cols="7">
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
                                    <v-card-text>
                                        ລາຍລະອຽດ:
                                        <div>
                                            {{ selectedPart?.detail }}
                                        </div>
                                    </v-card-text>
                                </div>
                            </div>
                        </div>
                    </v-card-actions>
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
                            <v-icon>mdi-backburger</v-icon> ອອກ
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
                            <v-card class="mx-auto" width="270px" color="#ECEFF1">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon style="position: absolute; top: 1px; right: 2px; z-index: 1;"
                                            v-bind="attrs" v-on="on">
                                            <v-icon color="#00796B">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-group>
                                                <!-- ปุ่มแก้ไข -->
                                                <v-list-item @click="editData(part)">
                                                    <v-list-item-title>
                                                        ແກ້ໄຂ
                                                    </v-list-item-title>
                                                </v-list-item>

                                                <!-- ปุ่มลบ -->
                                                <v-list-item @click="deleteItem(part)">
                                                    <v-list-item-title>
                                                        ລຶບອອກ
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list-item-group>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-text @click="openPartDialog(part)">
                                    <v-img style="margin-top: 20px;" :src="part.image" height="200px">
                                    </v-img>
                                    <div class="mt-4" style="font-size: 18px;font-weight: bold; text-align: center;">
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
                        </v-col>
                        <v-col></v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import Swal from "sweetalert2";
export default {
    data() {
        return {
            dialog: false,
            editDialog: false,
            categories: [],
            truck_data_list: [],
            loading_processing: false,
            selectedCategory: null,
            // selectedPart: {},
            selectedPart: {
                namec: '',
                price: '',
                totall: '',
                headc: '',
                tailc: '',
                detail: '',
                image: null,
                imagePreview: '', // Ensure this is initialize
                type: '',
            },
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
                    id: truck.key_id
                });
                return acc;
            }, {});
            // Convert grouped data into an array of categories
            this.categories = Object.values(groupedData);
        },
        async updatePart() {
            try {
                // ตรวจสอบฟิลด์ที่จำเป็น
                if (!this.selectedPart.namec || !this.selectedPart.price || !this.selectedPart.totall || !this.selectedPart.type || !this.selectedPart.namec || !this.selectedPart.image) {
                    this.$swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: 'ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    return;
                }
                const formattedDate = new Date(this.selectedPart.date).toISOString().split('T')[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
                // เตรียมข้อมูล formData
                const formData = new FormData();
                formData.append('toKen', localStorage.getItem('toKen'));
                formData.append('key_id', this.selectedPart.id);
                formData.append('itemName_Oldwarehouse', this.selectedPart.namec);
                formData.append('price_Oldwarehouse', (this.selectedPart.price));
                formData.append('qty_Oldwarehouse', (this.selectedPart.totall));
                formData.append('vehicle_Oldwarehouse', this.selectedPart.headc);
                formData.append('vehiclefooter_Oldwarehouse', this.selectedPart.tailc);
                formData.append('description_Oldwarehouse', this.selectedPart.detail);
                formData.append('selectedType_Oldwarehouse', this.selectedPart.type);
                formData.append('importExpirationDate_Oldwarehouse', formattedDate);

                // ถ้าผู้ใช้เลือกภาพใหม่ จะส่งไฟล์ใหม่ไป
                if (this.selectedPart.image) {
                    formData.append('image_Oldwarehouse', this.selectedPart.image);
                }
                // ตรวจสอบข้อมูล formData ที่จะส่ง
                console.log([...formData.entries()]);

                // ส่ง request อัปเดต
                const response = await this.$axios.$post('UpdateOldInventory.service', formData, {});
                console.log(response);  // ตรวจสอบ response

                if (response?.status === "00") {
                    Swal.fire({
                        title: 'ສຳເລັດ!',
                        text: 'ຂໍ້ມູນຖືກອັບເດດແລ້ວ',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    this.editDialog = false;
                    await this.onGetTruckList();
                    this.mapTruckDataToCategories();
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
        async deleteItem(part) {
            try {
                console.log('Part ID:', part.id); // ตรวจสอบว่า part.id ถูกต้องหรือไม่
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
                    const response = await this.$axios.$post(
                        "/DelOldInventory.service",
                        {
                            key_id: part.id,
                        },
                    );
                    console.log("key_id", part.id)
                    console.log("Response from API:", response); // ตรวจสอบการตอบกลับจาก API
                    if (response?.status === "00") {
                        Swal.fire({
                            title: "ສຳເລັດ",
                            text: "successfully!",
                            icon: "success",
                        });
                        await this.onGetTruckList();
                        this.mapTruckDataToCategories(); // group data
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: "Failed to delete data!",
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: "Failed to delete data111!",
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
            // this.selectedPart = part;
            // this.editDialog = true;
            this.selectedPart = { ...part }; // Make a copy of the part data
            this.selectedPart.imagePreview = part.imagePreview || ''; // Set preview if available
            this.editDialog = true;
        },
        onImageChange(file) {
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Store the Base64 preview URL
                    this.selectedPart.imagePreview = e.target.result;
                    // Store the actual file for uploading
                    this.selectedPart.image = file;
                };
                reader.readAsDataURL(file);
            } else {
                this.selectedPart.imagePreview = '';
                this.selectedPart.image = null;
            }
        },

        clearImage() {
            this.selectedPart.imagePreview = null;
            this.selectedPart.image = null;
        },
        closePartDialog() {
            this.showPartDialog = false;
        },
    },
};
</script>

<style scoped>
.image-container {
    position: relative;
    width: 100%;
    /* หรือกำหนดความกว้างที่ต้องการ */
    height: 170px;
}

.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
}
</style>

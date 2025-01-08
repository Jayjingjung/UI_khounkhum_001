<template>
    <v-container>
        <!-- Back Button -->
        <div class="mb-4">
            <v-btn elevation="0" dark width="30" height="30" color="#00E676" @click="$router.back()">
                <v-icon color="#0a3382">mdi-arrow-left</v-icon>
            </v-btn>
        </div>
        <!-- Branch Data Table -->
        <v-data-table :headers="headers" :items="filteredBranches" item-value="key_id" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title style="font-size: 20px; font-weight: bold;">ບໍ່ຕ່າງໆ</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- Search Input -->
                    <v-text-field v-model="searchQuery" label="ຄົ້ນຫາ" append-icon="mdi-magnify" single-line
                        hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <!-- <v-btn color="primary" @click="fetchBranches">Refresh</v-btn> -->
                    <v-btn color="#00E676" @click="addDialog = true" style="font-size: 16px; font-weight: bold;">
                        ເພີ່ມ
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="success" @click="editBranch(item)" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="error" @click="deleteBranch(item)" icon>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="400px">
            <v-card>
                <v-card-text>
                    <v-card-title style="font-size: 20px; font-weight: bold; text-align: center;">
                        ແກ້ໄຂ
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="editedBranch.b_name" label="ຊໍ່ບໍ່"></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12">
                                    <v-text-field v-model="editedBranch.b_tel" label="ເບີໂທ"></v-text-field>
                                </v-col> -->
                                <v-col cols="12">
                                    <v-text-field v-model="editedBranch.location" label="ສະຖານທີ່ຕັ້ງ"></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12">
                                    <v-text-field v-model="editedBranch.email" label="ອີເມວ"></v-text-field>
                                </v-col> -->
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="error" @click="closeEditDialog">ຍົກເລີກ</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="#00E676" @click="updateBranch">ບັນທືກ</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Add Branch Form -->
        <v-dialog v-model="addDialog" max-width="400px" persistent disable-esc>
            <v-card>
                <v-card-title>ເພີ່ມບໍ່</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field v-model="branch.b_name" label="ຊື່ບໍ່" :rules="[rules.required]"
                            required></v-text-field>
                        <!-- <v-text-field v-model="branch.b_tel" label="ເບີໂທ" :rules="[rules.required]"
                            required></v-text-field> -->
                        <v-textarea v-model="branch.location" label="ທີ່ຕັ້ງ" :rules="[rules.required]" rows="3"
                            required></v-textarea>
                        <!-- <v-text-field v-model="branch.email" label="ອີເມວ" :rules="[rules.required, rules.email]"
                            required></v-text-field> -->
                    </v-form>
                    <v-card-actions>
                        <v-btn color="red" @click="resetForm">ຍົກເລີກ</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="#00E676" @click="submitForm">ບັນທືກ</v-btn>
                    </v-card-actions>
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
            toKen: "c27bcc229bf00e6c1deb14b93d6fe80655f35371e4907d0431a23aa4f68b3d41",
            b_tel:"02072467194",
            email:"borhin@gmail.com",
            branches: [],
            searchQuery: "",
            editDialog: false,
            addDialog: false,
            editedBranch: {
                key_id: "",
                b_name: "",
                b_tel: "",
                location: "",
                email: "",
            },
            branch: {
                toKen: localStorage.getItem("toKen") || "",
                b_name: "",
                b_tel: "",
                location: "",
                email: "",
            },
            rules: {
                required: (value) => !!value || "ຂໍ້ນີ້ຈໍາເປັນຕ້ອງລະບຸ",
                email: (value) => /.+@.+\..+/.test(value) || "ອີເມວບໍ່ຖືກຕ້ອງ",
            },
            valid: false,
            loading_processing: false,
            headers: [
                // { text: "Key ID", value: "key_id" },
                { text: "ຊື່ບໍ່", value: "b_name" },
                { text: "ສະຖານທີ່ຕັ້ງ", value: "location" },
                // { text: "ເບີໂທ", value: "b_tel" },
                // { text: "ອິເມວ", value: "email" },
                { text: "ຕັ້ງຄ່າ", value: "actions", sortable: false },
            ],
        };
    },
    computed: {
        filteredBranches() {
            return this.branches
                .sort((a, b) => (a.key_id < b.key_id ? 1 : -1)) // Sorting by key_id in descending order
                .filter(branch => {
                    return (
                        branch.b_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        branch.b_tel.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        branch.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        branch.email.toLowerCase().includes(this.searchQuery.toLowerCase())
                    );
                });
        }
    },
    methods: {
        async fetchBranches() {
            try {
                const response = await this.$axios.$post(
                    "/getShowBranchNew2024.service",
                    {
                        toKen: this.toKen,
                    }
                );
                if (response?.status === "00") {
                    this.branches = response.data || [];
                } else {
                    this.branches = [];
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: "Failed to fetch data: " + error.message,
                });
            }
        },
        editBranch(branch) {
            this.editedBranch = { ...branch };
            this.editDialog = true;
        },
        async updateBranch() {
            try {
                const response = await this.$axios.$post("/UpdateBranch.service", {
                    toKen: this.toKen,
                    key_id: this.editedBranch.key_id,
                    b_name: this.editedBranch.b_name,
                    b_tel: this.editedBranch.b_tel,
                    location: this.editedBranch.location,
                    email: this.editedBranch.email,
                });
                if (response?.status === "00") {
                    Swal.fire({
                        icon: "success",
                        text: "ອັບເດັບສຳເລັດ!",
                    });
                    this.fetchBranches();
                    this.closeEditDialog();
                } else {
                    Swal.fire({
                        icon: "error",
                        text: response?.message || "ບໍ່ສາມາດອັບເດັບຂໍ້ມູນໄດ້",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: "ບໍ່ສາມາດອັບເດັບຂໍ້ມູນໄດ້: " + error.message,
                });
            }
        },

        closeEditDialog() {
            this.editDialog = false;
            this.editedBranch = {
                key_id: "",
                b_name: "",
                b_tel: "",
                location: "",
                email: "",
            };
        },

        async deleteBranch(branch) {
            try {
                const confirm = await Swal.fire({
                    title: "ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ບໍ່?",
                    text: "ເພາະຖ້າລົບແລ້ວຈະບໍ່ສາມາດກູ້ຂໍ້ມູນຄືນໄດ້.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#FF1744',
                    cancelButtonColor: '#EEFF41',
                    confirmButtonText: "ລົບອອກ!",
                    cancelButtonText: 'ຍົກເລີກ'
                });

                if (confirm.isConfirmed) {
                    const response = await this.$axios.$post(
                        "/DelBranchs.service",
                        {
                            key_id: branch.key_id,
                        }
                    );
                    if (response?.status === "00") {
                        Swal.fire({
                            icon: "success",
                            text: "ລຶບຂໍ້ມູນສຳເລັບ!",
                        });
                        this.fetchBranches();
                    } else {
                        Swal.fire({
                            icon: "error",
                            text: response?.message || "Failed to delete branch.",
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: "Failed to delete data: " + error.message,
                });
            }
        },

        submitForm() {
            if (!this.branch.toKen) {
                Swal.fire({
                    icon: "warning",
                    text: "Token is missing. Please log in again.",
                });
                return;
            }
            if (this.$refs.form.validate()) {
                this.loading_processing = true;
                const rawData = {
                    toKen: this.toKen,
                    b_name: this.branch.b_name,
                    b_tel: this.b_tel,
                    location: this.branch.location,
                    email: this.email,
                };
                this.$axios
                    .post("/storeBranch.service", rawData, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then((response) => {
                        const data = response.data;
                        if (data?.status === "00") {
                            this.loading_processing = false;
                            Swal.fire({
                                title: "ສຳເລັດ",
                                text: "Data saved successfully!",
                                icon: "success",
                            });
                            this.onClearData();
                            this.addDialog= false;
                            this.fetchBranches();
                        } else {
                            this.loading_processing = false;
                            Swal.fire({
                                icon: "error",
                                text: "Failed to save data!",
                            });
                        }
                    })
                    .catch((error) => {
                        this.loading_processing = false;
                        Swal.fire({
                            icon: "error",
                            text: "Error occurred while saving data!",
                        });
                    });
            }
        },

        resetForm() {
            this.$refs.form.reset();
            this.onClearData();
            this.addDialog = false;
        },

        onClearData() {
            this.branch.b_name = "";
            this.branch.b_tel = "";
            this.branch.location = "";
            this.branch.email = "";
        },
    },
    mounted() {
        this.fetchBranches();
    },
};
</script>

<style scoped>
.v-card {
    max-width: 500px;
    margin: 20px auto;
}
</style>

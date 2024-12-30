<template>
    <v-container>
        <v-btn elevation="0" dark width="30" height="30" color="#00E676" @click="$router.back()">
                    <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                </v-btn>
        <v-card>
            <v-card-title>ເພີ່ມບໍ່</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <!-- Branch Name Field -->
                    <v-text-field v-model="branch.b_name" label="ຊື່ບໍ່" :rules="[rules.required]"
                        required></v-text-field>
                    <!-- Telephone Field -->
                    <v-text-field v-model="branch.b_tel" label="ເບີໂທ" :rules="[rules.required]"
                        required></v-text-field>
                    <!-- Location Field -->
                    <v-textarea v-model="branch.location" label="ທີ່ຕັ້ງ" :rules="[rules.required]" rows="3"
                        required></v-textarea>
                    <!-- Email Field -->
                    <v-text-field v-model="branch.email" label="ອີເມວ" :rules="[rules.required, rules.email]"
                        required></v-text-field>
                </v-form>
                <v-card-actions>
                    <v-btn color="red" @click="resetForm">Reset</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="#00E676" @click="submitForm">ບັນທືກ</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import swal from "sweetalert2";
export default {
    data() {
        return {
            toKen: 'tZl011U2nNs9AdvQDIStduuOIc8yWmxw',
            valid: false,
            loading_processing: false, // For loading spinner
            branch: {
                toKen: localStorage.getItem("toKen") || "", // Fetch token from localStorage
                b_name: "",
                b_tel: "",
                location: "",
                email: "",
            },
            rules: {
                required: (value) => !!value || "ຂໍ້ນີ້ຈໍາເປັນຕ້ອງລະບຸ",
                email: (value) =>
                    /.+@.+\..+/.test(value) || "ອີເມວບໍ່ຖືກຕ້ອງ",
            },
        };
    },
    methods: {
        submitForm() {
            // Check if the token is available
            if (!this.branch.toKen) {
                swal.fire({
                    icon: 'warning',
                    text: 'Token is missing. Please log in again.',
                });
                return;
            }
            if (this.$refs.form.validate()) {
                this.loading_processing = true;
                // Prepare the raw data as a JSON object
                const rawData = {
                    toKen: this.toKen,
                    b_name: this.branch.b_name,
                    b_tel: this.branch.b_tel,
                    location: this.branch.location,
                    email: this.branch.email
                };
                this.$axios
                    .post("/storeBranch.service", rawData, {
                        headers: {
                            'Content-Type': 'application/json'  // Make sure to specify the correct Content-Type
                        }
                    })
                    .then((response) => {
                        const data = response.data;
                        console.log('Response Data:', data);
                        if (data?.status === "00") {
                            this.loading_processing = false;
                            swal.fire({
                                title: "ສຳເລັດ",
                                text: "Data saved successfully!",
                                icon: "success",
                            });
                            this.onClearData();
                        } else {
                            this.loading_processing = false;
                            swal.fire({
                                icon: "error",
                                text: "Failed to save data!",
                            });
                        }
                    })
                    .catch((error) => {
                        this.loading_processing = false;
                        swal.fire({
                            icon: "error",
                            text: "Error occurred while saving data!",
                        });
                        console.error("Error submitting form:", error);
                        if (error.response) {
                            console.error("Error Response:", error.response.data);
                        }
                    });
            } else {
                console.log("Form is invalid");
            }
        },
        resetForm() {
            this.$refs.form.reset();
            this.onClearData();
        },
        onClearData() {
            this.branch.b_name = "";
            this.branch.b_tel = "";
            this.branch.location = "";
            this.branch.email = "";
        },
    },
};
</script>

<style scoped>
.v-card {
    max-width: 500px;
    margin: 20px auto;
}
</style>

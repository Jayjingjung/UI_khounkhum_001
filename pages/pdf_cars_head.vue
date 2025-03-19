<template>
    <div>
        <v-card class="card-shadow mx-auto" width="1400">
            <v-card-title style="display: flex; background-color: #E57373; color: white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="edit_cars_head">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                PDF Documents
                <v-spacer></v-spacer>
            </v-card-title>

            <!-- File Upload Section -->
            <v-card-text style="margin-top: 25px;">
                <v-row>

                    <v-text-field label="Select Date" v-model="date2" type="date" outlined></v-text-field>

                    <v-file-input label="Select PDF File" v-model="selectedFile"
                        accept="application/pdf"></v-file-input>

                    <v-btn color="success" :disabled="!selectedFile || !date2" @click="uploadFile">
                        <v-icon left>mdi-content-save</v-icon> Save
                    </v-btn>
                </v-row>
            </v-card-text>

            <v-progress-linear v-if="loading_upload" indeterminate color="primary"></v-progress-linear>

            <!-- PDF List Table -->
            <v-data-table :headers="headers" :items="pdfData" class="elevation-1">
                <template v-slot:item.files="{ item }">
                    <v-btn color="primary" @click="openPdfViewer(item.files)">
                        <v-icon left>mdi-file-pdf-box</v-icon> View PDF
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>

        <!-- PDF Viewer Popup -->
        <v-dialog v-model="pdfDialog" max-width="1200px">
            <v-card>
                <v-card-title class="headline">PDF Viewer</v-card-title>
                <v-card-text>
                    <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="800px" frameborder="0"></iframe>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="pdfDialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
import Swal from "sweetalert2"; // ✅ Import SweetAlert2 for alerts

export default {
    data() {
        return {
            pdfData: [], // Store fetched PDF data
            selectedFile: null, // File selected for upload
            loading_processing: false,
            loading_upload: false,
            key_id_of_lod: "",
            headtruck_id: "",
            pdfDialog: false, // ✅ Controls the PDF Viewer popup
            pdfUrl: "", // ✅ Stores the selected PDF URL
            date2: "",
            key: "",
            headers: [
                { text: "Key ID", value: "key_id_of_file" },
                { text: "License Plate", value: "license_plate" },
                { text: "Date", value: "date2" },
                { text: "PDF", value: "files", sortable: false }
            ]
        };
    },
    mounted() {
        this.fetchPDF(); // ✅ Fetch initial PDF data on page load
    },
    methods: {
        async fetchPDF() {
            try {
                this.loading_processing = true;

                const keyId = this.$route.query.key; // ✅ Get `key_id_of_lod` from the URL query parameter

                if (!keyId) {
                    throw new Error("No key_id_of_lod provided.");
                }

                const response = await this.$axios.$post("ShowFilesOfHeadertruckKeyId.service", {
                    key_id_of_lod: keyId, // ✅ Pass the actual key
                });

                console.log("API Response:", response);

                if (response?.status === "00") {
                    this.pdfData = response?.data || []; // ✅ Store response data
                } else {
                    this.pdfData = [];
                    console.warn("API Error:", response?.message || "Unexpected error.");
                }

            } catch (error) {
                console.error("Fetch Error:", error);
                this.loading_processing = false;
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "An error occurred while fetching PDFs.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading_processing = false;
            }
        },

        async uploadFile() {
            if (!this.selectedFile || !this.date2) {
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: "Please select a file and date before uploading.",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
                return;
            }

            this.loading_upload = true;

            try {
                const headtruckId = this.$route.query.key; // Get `key` from URL
                if (!headtruckId) {
                    throw new Error("No headtruck_id provided.");
                }

                const formData = new FormData();
                formData.append("files", this.selectedFile);
                formData.append("date2", this.date2); // ✅ Send selected date
                formData.append("headtruck_id", String(headtruckId)); // ✅ Ensure it's a STRING
                formData.append("toKen", localStorage.getItem("toKen"));

                console.log("Uploading File:", {
                    headtruck_id: formData.get("headtruck_id"), // ✅ Check formatting
                    date2: formData.get("date2"),
                    toKen: formData.get("toKen"),
                });

                const response = await this.$axios.$post("/headerTruckFiles.service", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("File Upload Response:", response);

                this.loading_upload = false;

                if (response?.status === "00") {
                    Swal.fire({
                        title: "Upload Successful",
                        text: "Your file has been uploaded successfully.",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });

                    this.fetchPDF(); // ✅ Refresh the list after upload
                } else {
                    Swal.fire({
                        title: "ແຈ້ງເຕືອນ",
                        text: response?.message || "File upload failed.",
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                this.loading_upload = false;
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "File upload failed.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            }
        }
        ,

        async updateFile(fileKeyId) {
            if (!this.selectedFile) {
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: "Please select a file to update.",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
                return;
            }

            this.loading_upload = true;

            try {
                const headtruckId = this.$route.query.key;
                if (!headtruckId) {
                    throw new Error("No headtruck_id provided.");
                }

                const formData = new FormData();
                formData.append("files", this.selectedFile);
                formData.append("headtruck_id", headtruckId);
                formData.append("toKen", localStorage.getItem("toKen"));
                formData.append("key_id_of_file", fileKeyId); // ✅ Send file key for update

                const response = await this.$axios.$post("/headerTruckFilesUpdate.service", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("File Update Response:", response);

                this.loading_upload = false;

                if (response?.status === "00") {
                    Swal.fire({
                        title: "Update Successful",
                        text: "Your file has been updated successfully.",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });

                    this.fetchPDF();
                } else {
                    Swal.fire({
                        title: "ແຈ້ງເຕືອນ",
                        text: response?.message || "File update failed.",
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                this.loading_upload = false;
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "File update failed.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            }
        },
        openPdfViewer(pdfLink) {
            this.pdfUrl = pdfLink;
            this.pdfDialog = true;
        }
    }
};
</script>
<style scoped>
.v-card {
    padding: 20px;
}

.v-btn {
    text-transform: none;
}
</style>
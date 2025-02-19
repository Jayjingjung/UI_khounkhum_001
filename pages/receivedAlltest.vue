<template>
    <div>
        <!-- Card Section -->
        <v-card class="card-shadow mb-4" rounded="lg" width="700px">
            <v-card-title class="bg-blue-500 text-white text-center py-4">
                <h2>ໃບຮຽກເກັບເງິນ</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="invoiceForm" v-model="valid">
                    
                    <!-- Quotation Code -->
                    <v-text-field
                        label="ລະຫັດໃບຮຽກເກັບເງິນ"
                        outlined
                        dense
                        v-model="quotation_code"
                        readonly
                    >
                        <template v-slot:append>
                            <v-btn color="primary" small @click="generateQuotationCode">Generate</v-btn>
                        </template>
                    </v-text-field>

                  

                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            valid: false,
            loading_processing: false,
            quotation_code: "", // 🆕 เก็บ Quotation Code ที่ได้จาก API
        };
    },
    methods: {
        // 🔹 เรียก API เพื่อ Gen Quotation Code
        async generateQuotationCode() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post("/GenQuotationCodeKKT.service");
                
                console.log("inv:", response); // ✅ Debugging Response

                // ✅ ดึงข้อมูลจาก response.data[0].kkt_code
                if (response?.status === "00" && response?.data?.length) {
                    this.quotation_code = response.data[0].kkt_code;
                    Swal.fire({
                        title: "ສຳເລັດ",
                        text: `ສ້າງລະຫັດ Quotation Code: ${this.quotation_code} ສຳເລັດ!`,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } else {
                    Swal.fire({
                        title: "ແຈ້ງເຕືອນ",
                        text: response?.message || "ບໍ່ສາມາດສ້າງລະຫັດ Quotation Code",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "Error fetching Quotation Code",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading_processing = false;
            }
        },
    }
};
</script>


<style scoped>
.card-shadow {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>

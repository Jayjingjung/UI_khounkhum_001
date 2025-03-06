<template>
    <div>
        <div style="display: flex;">

            <!-- First v-card (ອານຸມັດໜີ້ນໍ້າມັນ) -->
            <v-card style="width: 50%; margin-left: 15px;">
                <v-card-title style="border-bottom: 0.5px solid #e0e0e0; background-color: #E57373; color: white;">
                    ອານຸມັດໜີ້ນໍ້າມັນ
                </v-card-title>

                <!-- Display data -->
                <v-card-text>
                    <p><strong>ວັນທີສ້າງ:</strong> {{ fuelApproval.datecreate }}</p>
                    <p><strong>ໃບສົ່ງ:</strong> {{ fuelApproval.dels.join(', ') }}</p>
                    <p><strong>ລາຄາລວມນໍ້າມັນ:</strong> {{ formatCurrency(fuelApproval.totalPriceOil) }} LAK</p>
                </v-card-text>

                <!-- Confirm Button -->
                <v-card-actions>
                    <v-btn color="success" @click="confirmApproval" :loading="isLoading">
                        <v-icon left>mdi-check</v-icon> ຢືນຢັນ
                    </v-btn>
                </v-card-actions>
            </v-card>

            <!-- Second v-card (ອານຸມັດໃບຮຽກເກັບເງິນ) -->
            <v-card style="width: 50%; margin-left: 15px;">
            <v-card-title style="border-bottom: 0.5px solid #e0e0e0; background-color: #E57373; color: white;">
                ອານຸມັດໃບຮຽກເກັບເງິນ
            </v-card-title>
            <v-card-text>
                <p>ຂໍ້ມູນສໍາລັບໃບຮຽກເກັບເງິນ</p>
                <v-list>
                    <v-list-item v-for="(item, index) in array_invoice" :key="index">
                        <v-list-item-content>
                            <v-list-item-title>
                                <strong>ລູກຄ້າ:</strong> {{ item.cusName }} (ID: {{ item.cusID }})
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <strong>ໃບຮຽກເກັບ:</strong> {{ item.perID }} | 
                                <strong>ປະເພດ:</strong> {{ item.proType }} | 
                                <strong>ຈໍານວນ:</strong> {{ item.proAmount }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>

            <v-card-actions>
                <v-btn color="success" @click="confirmInvoice" :loading="isLoading">
                    <v-icon left>mdi-check</v-icon> ຢືນຢັນ
                </v-btn>
            </v-card-actions>
        </v-card>



        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            fuelApproval: {
                datecreate: "2025-03-05",
                dels: ["DEL-VT-15258", "DEL-VT-15144"],
                keyIds: ["6254", "6138"],
                toKen: "3c616d217fa508a837f1e099b7824cb646d322fb9794088e41c4558adbad1711",
                totalPriceOil: "9175001",
            },
            isLoading: false, // Loading state for button
            invoiceList: [
                { cusID: "142", cusName: "test vt", perID: "DEL-VT-15378", proType: "1 - 1", proAmount: "7" },
                { cusID: "142", cusName: "test vt", perID: "DEL-VT-15379", proType: "1 - 1", proAmount: "4" }
            ]
        };
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat("en-US").format(value);
        },
        async confirmApproval() {
            this.isLoading = true; // Show loading on button

            try {
                const response = await axios.post("https://your-api-url.com/approve-oil", this.fuelApproval, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.fuelApproval.toKen}`
                    }
                });

                if (response.status === 200) {
                    alert("✅ ຢືນຢັນສຳເລັດ!");
                } else {
                    alert("❌ ມີຂໍ້ຜິດພາດ!");
                }
            } catch (error) {
                alert("❌ ບໍ່ສາມາດສົ່ງ API ໄດ້: " + error.message);
            }

            this.isLoading = false; // Hide loading
        },
        addInvoice(fillter) {
            this.array_invoice.push({
                'cusID': fillter[0]?.customer_ID,
                'cusName': fillter[0]?.customer_NAME,
                'perID': fillter[0]?.performancebillno,
                'proType': fillter[0]?.pro_TYPE,
                'proAmount': fillter[0]?.product_AMOUNT,
                'priCE': fillter[0]?.price,
                'totalPrice': fillter[0]?.total_PRICE,
                'inVoiceID': this.inVoiceBillNo,
                'key_id': fillter[0]?.key_ID,
                'toKen': localStorage.getItem("toKen")
            });
        },
        async confirmInvoice() {
            this.isLoading = true; // แสดง loading

            try {
                const response = await axios.post("https://your-api-url.com/confirm-invoice", this.array_invoice);

                if (response.status === 200) {
                    alert("✅ ຢືນຢັນສຳເລັດ!");
                } else {
                    alert("❌ ມີຂໍ້ຜິດພາດ!");
                }
            } catch (error) {
                alert("❌ ບໍ່ສາມາດສົ່ງ API ໄດ້: " + error.message);
            }

            this.isLoading = false; // ซ่อน loading
        },
    }
};
</script>

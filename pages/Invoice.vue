<template>
    <!-- <v-card class="fullscreen-map"> -->
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>Invoice Details</v-card-title>
                        <v-card-text>
                            <strong>Subject</strong>
                            <v-text-field v-model="invoice.subject" label="Subject"></v-text-field>
                            <strong>Due date</strong>


                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="invoice.dueDate" label="Due date" readonly v-bind="attrs"
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="invoice.dueDate" @input="menu = false"></v-date-picker>
                            </v-menu>
                            <strong>selectedunit</strong>
                            <v-select v-model="invoice.selectedunit" :items="selectedunit" label="selectedunit"></v-select>
     
                            <strong>Currency</strong>
                            <v-select v-model="invoice.currency" :items="currencies" label="Currency"></v-select>
                        </v-card-text>
                    </v-card>

                    <v-card class="mt-4">
                        <v-card-title>Product</v-card-title>
                        <v-card-text>
                            <v-data-table :headers="headers" :items="invoice.products" hide-default-footer>
                                <template v-slot:item.tax="{ item }">
                                    <v-text-field v-model="item.tax" type="number" suffix="%"></v-text-field>
                                </template>
                            </v-data-table>
                            <v-btn class="mt-2" style="color: blue;" @click="addProduct">Add Product</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">

                    <v-card class="pa-5" style="background-color: #edf1f2;">
                        <v-row align="center" class="mb-3">
                            <v-col>
                                <h3 class="font-weight-bold">Preview <v-icon small>mdi-information-outline</v-icon></h3>
                            </v-col>
                            <v-col class="text-right">
                                <v-btn icon @click="printPDF">
                                    <v-icon>mdi-file-pdf-box</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>mdi-email</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>mdi-credit-card</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-card class="pa-5" outlined>
                            <h2 class="font-weight-bold mb-3">INV2398-08-087</h2>
                            <v-divider :thickness="20"></v-divider>

                            <v-row class="mt-3 ">
                                <v-col>
                                    <p><strong>Due date:</strong> {{ invoice.dueDate }}</p>
                                    <p><strong>Subject:</strong> {{ invoice.subject }}</p>
                                </v-col>
                                <v-col>
                                    <p><strong>Billed to:</strong></p>
                                    <p>John Smith</p>
                                    <p>john_s@gmail.com</p>
                                </v-col>
                                <v-col>
                                    <p><strong>Currency:</strong> {{ invoice.currency }}</p>
                                    <p><strong>Currency:</strong> {{ invoice.selectedunits }}</p>
                                </v-col>
                            </v-row>

                            <v-divider :thickness="20"></v-divider>
                            <v-data-table :headers="headers" :items="invoice.products" class="mt-3" hide-default-footer>
                            </v-data-table>

                            <v-divider :thickness="20" color="black"></v-divider>

                            <v-row class="mt-3"
                                style="justify-content: flex-end; text-align: right;margin-right: 70px;">
                                <v-col cols="auto">
                                    <p><strong style="margin-right: 50px;">Subtotal:</strong> {{ subtotal() }} {{
                                        invoice.currency }} {{
                                        invoice.selectedunit }}
                                    </p>
                                    <p><strong style="margin-right: 50px;">Discount:</strong> -{{ discount() }} {{
                                        invoice.currency }} {{
                                        invoice.selectedunit }}
                                    </p>
                                    <p><strong style="margin-right: 50px;">Total:</strong> {{ calculateTotal() }} {{
                                        invoice.currency }} {{
                                        invoice.selectedunit }}
                                    </p>
                                </v-col>
                            </v-row>


                            <v-divider :thickness="20" color="black"></v-divider>

                            <p class="mt-Unit Price"><strong>Attachment</strong></p>
                            <v-btn color="primary" @click="downloadAttachment">Download Product List (PDF)</v-btn>
                        </v-card>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    <!-- </v-card> -->
</template>

<script>
export default {
    data() {
        return {
            menu: false,
            invoice: {
                subject: "",
                dueDate: "",
                currency: "IDR",
                products: [{ name: "Summer 2K23 T-shirt", price: 125000, quantity: 1, tax: 10 }]
            },
            currencies: ["USD", "EUR", "IDR"],
            selectedunit: [" ອັນ", "ໂຕນ", "ລິດ", "ຄັ້ງ"],
            headers: [
                { text: "Description", value: "name" },
                { text: "Qty", value: "quantity" },
                { text: "Unit Price", value: "price" },
                { text: "Amount", value: "amount" }
            ],

        };
    },
    methods: {
        addProduct() {
            this.invoice.products.push({ name: "New Item", price: 0, quantity: 1, tax: 0 });
        },
        subtotal() {
            return this.invoice.products.reduce((total, product) => total + product.price * product.quantity, 0);
        },
        discount() {
            return this.subtotal() * 0.1;
        },
        calculateTotal() {
            return this.subtotal() - this.discount();
        },
        printPDF() {
            window.print();
        },
        downloadAttachment() {
            alert("Downloading product list...");
        }
    }
};
</script>

<style scoped>
.v-container {
    max-width: 1200px;
    margin: auto;
}

.fullscreen-map {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 800px;
    z-index: 5;
    background-color: rgb(255, 255, 255);
}
</style>

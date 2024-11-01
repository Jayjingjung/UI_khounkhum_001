<template>
    <div>
        <!-- Render a list of input fields for each entry in the list -->

        <div justify="center" align="center" style="display: flex;">


            <v-card class="card-shadow " justify="center" align="center" rounded="lg" width="1250px">
                <v-card-title class="orange--text white--text">
                    ໃບສະເໝີລາຄາ
                </v-card-title>

                <div v-for="(item, index) in formDataList" :key="index">
                    <v-row>
                        <v-col cols="10" md="3" sm="6">
                            <v-select style="width: 200px;" outlined dense label="ລູກຄ້າ" v-model="item.listName"
                                :items="customer_data_list" item-text="customerName" item-value="customerName"
                                return-object @change="updateCustomerName(item, $event)" />
                        </v-col>

                        <v-col cols="10" md="3" sm="6">
                            <v-text-field style="width: 200px;" outlined dense label="Number" v-model="item.num"
                                type="number" />
                        </v-col>

                        <v-col cols="10" md="3" sm="6">
                            <v-text-field style="width: 200px;" outlined dense label="Amount Money"
                                v-model="item.amount_money" type="number" @input="updateTotalMoney(index)" />
                        </v-col>

                        <v-col cols="10" md="3" sm="6">
                            <v-text-field style="width: 200px;" outlined dense label="Total Money"
                                v-model="item.totalMooney" type="number" readonly />
                        </v-col>

                        <!-- Remove Button -->
                        <v-col cols="10" md="3" sm="6">
                            <v-btn style="background-color: firebrick;color: aliceblue;"
                                @click="removeItem(index)">Remove</v-btn>
                        </v-col>
                    </v-row>


                </div>

                <!-- Add Button to add new list item -->
                <v-btn style="background-color: darkblue;color: aliceblue;" @click="addNewItem">Add New Item</v-btn>

                <!-- Save Button to send data to API -->
                <v-btn style="background-color: green;color: aliceblue;" @click="onstore_dept_Must_received">Save to
                    API</v-btn>
            </v-card>
            <v-card class="card-shadow " justify="center" align="center" rounded="lg" width="1250px">
                <v-card-title class="orange--text white--text">
                    ໃບສະເໝີລາຄາ
                </v-card-title>
                <div>



                    <v-icon color="black">mdi-file-pdf-box</v-icon>
                    <span>ອັບໂຫຼດເອກກະສານ1</span>
                    <v-file-input style="margin-right: 30px;" ref="fileInput1" label="ອັບໂຫຼດເອກກະສານ1" outlined dense
                        prepend-icon="mdi-file-pdf" append-inner-icon="mdi-file-pdf" background-color="#f5f5f5"
                        v-model="document_1" @change="checkFileName1">
                    </v-file-input>



                    <v-icon color="black">mdi-cash</v-icon>

                    <span>ສະກຸນເງິນ</span>

                    <div class="currency-selection">
                        <div justify="center" align="center">
                            <v-btn style="width: 80px;font-size: 25px "
                                :class="{ 'selected-currency': selectedCurrency === 'LAK' }"
                                @click="selectedCurrency = 'LAK'">
                                LAK
                            </v-btn>
                            <v-btn style="width: 80px;font-size: 25px "
                                :class="{ 'selected-currency': selectedCurrency === 'USD' }"
                                @click="selectedCurrency = 'USD'">
                                USD
                            </v-btn>
                            <v-btn style="width: 80px;font-size: 25px "
                                :class="{ 'selected-currency': selectedCurrency === 'THB' }"
                                @click="selectedCurrency = 'THB'">
                                THB
                            </v-btn>
                        </div>
                    </div>





                    <div style="margin-right: 10px;">
                        <v-icon size="55" color="black">mdi-tape-measure</v-icon>

                        <span>ຫົວໜ່ວຍ</span>

                        <div class="currency-selection">
                            <div justify="center" align="center">
                                <v-btn style="width: 70px;font-size: 20px "
                                    :class="{ 'selected-currency': selectedunit === 'ອັນ' }"
                                    @click="selectedunit = 'ອັນ'">
                                    ອັນ
                                </v-btn>
                                <v-btn style="width: 70px;font-size: 20px "
                                    :class="{ 'selected-currency': selectedunit === 'ໂຕນ' }"
                                    @click="selectedunit = 'ໂຕນ'">
                                    ໂຕນ
                                </v-btn>
                                <v-btn style="width: 70px;font-size: 20px "
                                    :class="{ 'selected-currency': selectedunit === 'ລິດ' }"
                                    @click="selectedunit = 'ລິດ'">
                                    ລິດ
                                </v-btn>
                                <v-btn style="width: 70px;font-size: 20px "
                                    :class="{ 'selected-currency': selectedunit === 'ຄັ້ງ' }"
                                    @click="selectedunit = 'ຄັ້ງ'">
                                    ຄັ້ງ
                                </v-btn>
                            </div>
                        </div>

                    </div>





                    <div class="main-content">



                        <v-icon color="black">mdi-calendar-range</v-icon>

                        <span>ວັນທີ</span>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                            :return-value.sync="formattedDate" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="formattedDate" required label="ວັນທີ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="formattedDate" no-title scrollable
                                @input="$refs.menu.save(formattedDate)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>


                        <v-icon color="black">mdi-calendar-range</v-icon>
                        <span>ວັນທີຄົບກໍານົດ</span>
                        <v-menu ref="due_date_menu" v-model="due_date_menu" :close-on-content-click="false"
                            :return-value.sync="formatteddue_date" transition="scale-transition" offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="formatteddue_date" required
                                    label="ພີມວັນທີຄົບກໍານົດ" append-icon="mdi-calendar" readonly v-bind="attrs"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="formatteddue_date" no-title scrollable
                                @input="$refs.due_date_menu.save(formatteddue_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>


                        <v-icon color="black">mdi-account</v-icon>
                        <span>ປະເພດ</span>
                        <div class="selection">
                            <v-autocomplete outlined dense label="-ປະເພດ-" :items="buang_data_list"
                                item-text="nameOfBouang" item-value="key_id" @change="onGetbuangDetails">
                            </v-autocomplete>
                            <v-btn to="customer" style="background-color: blue;margin-top: -30px;">
                                <v-icon color="white">mdi-plus</v-icon>
                            </v-btn>
                        </div>

                    </div>

                    <!-- Additional Fields -->

                    <v-textarea style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;"
                        label="ຄໍາອະທິບາຍ" v-model="comment" outlined dense :rules="[v => !!v || 'Comment is required']"
                        rows="8" auto-grow>
                    </v-textarea>


                    <!-- Additional Fields -->
                    <v-textarea
                        style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;width: 800px;"
                        label="ໝາຍເຫດ" v-model="note" outlined dense :rules="[v => !!v || 'Comment is required']"
                        rows="4" auto-grow>
                    </v-textarea>

                </div>
            </v-card>


        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formDataList: [
                {
                    listName: "", // This will now store the selected customer name
                    quotation_code: "",
                    num: "",
                    amount_money: "",
                    totalMooney: "",
                },
            ],
            customer_data_list: [], // Array to hold customer data
            loading_processing: false, // Add a loading state if needed
        };
    },
    mounted() {
        this.onGetCustomerList();
    },
    methods: {
        // Generate quotation code and save data
        async onstore_dept_Must_received() {
            try {
                const response = await this.$axios.$post('/GenQuotationCodeKKT.service');
                console.log("inv:", response);

                if (response?.status === "00") {
                    const quotation_code = response.data[0]?.kkt_code;

                    // Assign quotation_code to each item in the formDataList
                    this.formDataList.forEach(item => {
                        item.quotation_code = quotation_code;
                    });

                    // Call save with the updated formDataList
                    await this.saveDataToApi();

                    // SweetAlert2 success notification after quotation code generation
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your quotation code has been generated and data saved!', // Customize the success message
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error("Error generating quotation code:", error);
            }
        },
        // Add a new item to the list
        addNewItem() {
            this.formDataList.push({
                listName: "", // Initialize as empty
                quotation_code: "", // Initialize as empty
                num: "",
                amount_money: "",
                totalMooney: "",
            });
        },
        // Remove an item from the list
        removeItem(index) {
            this.formDataList.splice(index, 1);
        },
        // Update the total money based on num and amount_money
        updateTotalMoney(index) {
            const item = this.formDataList[index];
            const total = Number(item.num) * Number(item.amount_money);
            item.totalMooney = isNaN(total) ? "" : total;
        },
        // Send the form data to the API
        async saveDataToApi() {
            try {
                const response = await fetch("http://khounkham.com/api-prod/v1/truck/InsertNameListArray.service", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Specify the content type
                    },
                    body: JSON.stringify(this.formDataList), // Convert formDataList to JSON string
                });
                const result = await response.json();
                if (response.ok) {
                    alert("Data saved successfully!");
                } else {
                    console.error(result);
                    alert("Failed to save data.");
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while saving data.");
            }
        },

        async onGetCustomerList() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('getAllCustomer', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response?.status === '00') {
                    this.customer_data_list = response?.data;
                }
                this.loading_processing = false;
            } catch (error) {
                this.loading_processing = false;
                console.error(error);
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message || 'Unknown error occurred',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        // Update the listName to only contain customerName when a customer is selected
        updateCustomerName(item, selectedCustomer) {
            if (selectedCustomer) {
                item.listName = selectedCustomer.customerName; // Set only customerName
            } else {
                item.listName = ""; // Reset if no customer is selected
            }
        },
    },
};
</script>

<style scoped></style>

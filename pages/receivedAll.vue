<template>
    <div>


        <div>


            <!-- <v-img src="path-to-image.jpg" alt="Header Image" height="200px"></v-img> Add an image if needed -->

            <v-card class="card-shadow mb-4" rounded="lg">
                <!-- <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="testt-v-card-pdf">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn> -->

                <v-card-title style="display:flex;background-color:#E57373;color:white">
                    <v-btn elevation="0" dark width="120" height="30" small color="white" to="homepagehr">
                        <v-icon color="#E57373">mdi-arrow-left</v-icon>
                        <spen style="color: #E57373;">

                            ຫນ້າລັກ
                        </spen>
                    </v-btn>
                    <v-spacer></v-spacer>
                    ສ້າງໃບຮຽກເກັບເງິນ
                    <v-spacer></v-spacer>
                    <v-btn elevation="0" dark width="120" height="30" small color="white" to="InvoiceDeptInsert">
                        <spen style="color: #24ab70;">

                            ໃບຮັບເງິນ
                        </spen>
                        <v-icon color="#24ab70">mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card-title>


                <v-btn style="margin-top: 20px;width: 100%;" @click="dialog = true" color="primary">
                    <v-icon>
                        mdi-plus
                    </v-icon>ເພື່ມໃບຮຽກເກັບເງິນໃໜ່
                </v-btn>
                <v-dialog v-model="dialog" max-width="1250px">

                    <v-card class="card-shadow mb-4" rounded="lg" width="1250px">
                        <v-card-title class="orange--text white--text">
                            ໃບຮຽກເກັບເງິນ
                        </v-card-title>
                        <v-card-text>
                            <div class="main-content">
                                <!-- Customer Selection -->
                                <!-- <v-card> -->

                                <v-col cols="12" md="4" sm="6">
                                    <v-icon color="black">mdi-file-pdf-box</v-icon>
                                    <span>ອັບໂຫຼດເອກກະສານ1</span>
                                    <v-file-input style="" ref="fileInput1" label="ອັບໂຫຼດເອກກະສານ1" outlined dense
                                        prepend-icon="mdi-file-pdf" append-inner-icon="mdi-file-pdf"
                                        background-color="#f5f5f5" v-model="document_1" @change="checkFileName1">
                                    </v-file-input>
                                </v-col>


                                <v-col cols="12" md="4" sm="6">
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

                                </v-col>

                                <v-col cols="12" md="4" sm="6">
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
                                </v-col>


                            </div>
                            <div class="main-content">


                                <v-col cols="12" md="4" sm="6">
                                    <v-icon color="black">mdi-calendar-range</v-icon>

                                    <span>ວັນທີ</span>
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                        :return-value.sync="formattedDate" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="formattedDate" required label="ວັນທີ"
                                                append-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="formattedDate" no-title scrollable
                                            @input="$refs.menu.save(formattedDate)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-icon color="black">mdi-calendar-range</v-icon>
                                    <span>ວັນທີຄົບກໍານົດ</span>
                                    <v-menu ref="due_date_menu" v-model="due_date_menu" :close-on-content-click="false"
                                        :return-value.sync="formatteddue_date" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="formatteddue_date" required
                                                label="ພີມວັນທີຄົບກໍານົດ" append-icon="mdi-calendar" readonly
                                                v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="formatteddue_date" no-title scrollable
                                            @input="$refs.due_date_menu.save(formatteddue_date)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
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
                                </v-col>
                            </div>
                            <div class="main-content">

                                <v-col cols="12" md="4" sm="6">
                                    <v-icon color="black">mdi-account</v-icon>
                                    <span>ລູກຄ້າ</span>
                                    <v-select outlined dense label="ລູກຄ້າ" v-model="customer_id"
                                        :items="customer_data_list" item-text="customerName" item-value="id" />
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-icon color="black">mdi-account</v-icon>
                                    <span>ຫົວຂໍ້</span>
                                    <v-text-field label="ຫົວຂໍ້" style="font-size: 28px; " outlined dense
                                        v-model="topic" :rules="[v => !!v || 'Required field']">
                                    </v-text-field>

                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-icon color="black">mdi-account</v-icon>
                                    <span>ຈໍານວນ</span>
                                    <div style="display: flex;">

                                        <v-text-field label="ຈໍານວນ" style="font-size: 28px; " outlined dense
                                            v-model="num" :rules="[v => !!v || 'Required field']">
                                        </v-text-field>
                                        <v-text-field readonly="" label="ຫົວໜ່ວຍ" style="font-size: 28px; width: 80px; "
                                            outlined dense v-model="selectedunit"
                                            :rules="[v => !!v || 'Required field']">
                                        </v-text-field>
                                    </div>
                                </v-col>
                            </div>
                            <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">

                                <div style="display: flex;">
                                    <div>
                                        <v-icon color="black">mdi-account</v-icon>
                                        <span>ລາຄາ</span>
                                        <v-text-field label="ລາຄາ" style="font-size: 28px; " outlined dense
                                            v-model="amount_money" :rules="[v => !!v || 'Required field']">
                                        </v-text-field>
                                    </div>
                                    <div>

                                        <v-text-field readonly label="ສະກຸນເງິນ"
                                            style="font-size: 28px; width: 80px;margin-top: 24px; " outlined dense
                                            v-model="selectedCurrency" :rules="[v => !!v || 'Required field']">
                                        </v-text-field>
                                    </div>
                                </div>

                                <div style="display: flex;">

                                    <div>
                                        <v-icon color="black">mdi-account</v-icon>
                                        <span>-ລາຄາທັງໝົດ-</span>
                                        <v-text-field label="ລາຄາທັງໝົດ" style="font-size: 28px; " outlined dense
                                            v-model="totalMoney" :rules="[v => !!v || 'Required field']">
                                        </v-text-field>
                                    </div>

                                    <v-text-field readonly="" label="ຫົວໜ່ວຍ"
                                        style="font-size: 28px; width: 80px;margin-top: 24px;  " outlined dense
                                        v-model="selectedunit" :rules="[v => !!v || 'Required field']">
                                    </v-text-field>
                                    <v-text-field readonly label="ສະກຸນເງິນ"
                                        style="font-size: 28px; width: 80px; margin-top: 24px; " outlined dense
                                        v-model="selectedCurrency" :rules="[v => !!v || 'Required field']">
                                    </v-text-field>
                                </div>


                            </div>
                        </v-card-text>
                    </v-card>
                    <v-card justify="center" align="center" class="card-shadow mb-4" rounded="lg" width="1250px">
                        <v-card-title class="orange--text white--text">
                            ເພີ້ມ
                        </v-card-title>
                        <v-card-text>

                            <div v-for="(item, index) in formDataList" :key="index">
                                <div class="main-content">
                                    <!-- Customer Selection -->
                                    <v-col cols="12" md="4" sm="6" style="display: flex;">
                                        <v-select outlined dense label="ລູກຄ້າ" v-model="item.listName"
                                            :items="customer_data_list" item-text="customerName"
                                            item-value="customerName" return-object
                                            @change="updateCustomerName(item, $event)" />
                                        <v-btn to="customer" style="background-color: blue;">
                                            <v-icon color="white">mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <!-- <v-col cols="12" md="4" sm="6">
                                  
                                        <div class="currency-selection" style="display: flex; justify-content: center;">
                                            <v-btn :style="getButtonStyle(item.selectedCurrency, 'LAK')"
                                                @click="setCurrency(item, 'LAK')">LAK</v-btn>
                                            <v-btn :style="getButtonStyle(item.selectedCurrency, 'USD')"
                                                @click="setCurrency(item, 'USD')">USD</v-btn>
                                            <v-btn :style="getButtonStyle(item.selectedCurrency, 'THB')"
                                                @click="setCurrency(item, 'THB')">THB</v-btn>
                                        </div>
                                    </v-col> -->
                                    <v-col cols="12" md="4" sm="6">

                                        <!-- Unit Selection -->
                                        <div class="unit-selection" style="display: flex; justify-content: center;">
                                            <v-btn :style="getButtonStyle(item.selectedUnit, 'ອັນ')"
                                                @click="setUnit(item, 'ອັນ')">ອັນ</v-btn>
                                            <v-btn :style="getButtonStyle(item.selectedUnit, 'ໂຕນ')"
                                                @click="setUnit(item, 'ໂຕນ')">ໂຕນ</v-btn>
                                            <v-btn :style="getButtonStyle(item.selectedUnit, 'ລິດ')"
                                                @click="setUnit(item, 'ລິດ')">ລິດ</v-btn>
                                            <v-btn :style="getButtonStyle(item.selectedUnit, 'ຄັ້ງ')"
                                                @click="setUnit(item, 'ຄັ້ງ')">ຄັ້ງ</v-btn>
                                        </div>
                                    </v-col>
                                    <!-- Other Fields (e.g., Quantity, Price) -->
                                    <v-col cols="12" md="4" sm="6" style="display: flex;">
                                        <v-text-field outlined dense label="ຈໍານວນ" v-model="item.num" type="number" />
                                        <v-text-field outlined dense readonly
                                            style="font-size: 28px; font-weight: bold; width: 80px; text-align: center;"
                                            v-model="item.selectedUnit" />
                                    </v-col>

                                    <!-- Price Fields -->
                                    <v-col cols="12" md="4" sm="6"
                                        style="display: flex; justify-content: center; align-items: center;">
                                        <v-text-field outlined dense label="ລາຄາ" v-model="item.amount_money"
                                            type="number" @input="updateTotalMoney(index)" />
                                        <v-text-field outlined dense readonly
                                            style="font-size: 28px; font-weight: bold; width: 80px; text-align: center;"
                                            v-model="item.selectedCurrency" />
                                    </v-col>

                                    <!-- Total Price -->
                                    <v-col cols="12" md="4" sm="6"
                                        style="display: flex; justify-content: center; align-items: center;">
                                        <v-text-field outlined dense label="ລາຄາທັງໝົດ" v-model="item.totalMooney"
                                            type="number" readonly />
                                    </v-col>

                                    <!-- Remove Button -->
                                    <v-col cols="12" md="4" sm="6">
                                        <v-btn style="background-color: firebrick; color: aliceblue;"
                                            @click="removeItem(index)">ລຶມ</v-btn>
                                    </v-col>
                                </div>

                                <!-- Add New Item Button -->
                                <div
                                    style="display: flex; justify-content: center; align-items: center;margin-top: 15px;margin-bottom: 15px;">
                                    <v-btn style="background-color: #24ab70; color: aliceblue;"
                                        @click="addNewItem">ເພີ້ມ</v-btn>
                                </div>
                            </div>


                        </v-card-text>
                    </v-card>
                    <v-card>


                        <v-card-text class="card-shadow mb-4" rounded="lg" width="1250px">
                            <v-card-title class="orange--text white--text">
                                ຄໍາອະທິບາຍ
                            </v-card-title>

                            <!-- Additional Fields -->

                            <v-textarea
                                style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;"
                                label="ຄໍາອະທິບາຍ" v-model="comment" outlined dense
                                :rules="[v => !!v || 'Comment is required']" rows="8" auto-grow>
                            </v-textarea>


                            <!-- Additional Fields -->
                            <v-textarea
                                style="font-size: 18px; font-weight: normal;margin-left: 20px;margin-right: 20px;width: 800px;"
                                label="ໝາຍເຫດ" v-model="note" outlined dense
                                :rules="[v => !!v || 'Comment is required']" rows="4" auto-grow>
                            </v-textarea>

                            <!-- Save Button to send data to API -->
                            <div
                                style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;margin-bottom: 10px;">

                                <v-btn style="background-color: green;color: aliceblue;"
                                    @click="onstore_dept_Must_received">ບັນທຶກ</v-btn>
                            </div>
                            <!-- Save Button to send data to API --> <!-- Save Button to send data to API -->
                            <!-- Save Button to send data to API -->
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- Dialog for Invoice Form -->
                <v-dialog v-model="dialog1" max-width="700px">
                    <v-card class="card-shadow mb-4" rounded="lg" width="700px">
                        <v-card-title class="orange--text white--text">
                            ໃບຮັບເງິນ
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <!-- Date Picker -->
                                <v-col>
                                    <v-icon color="black">mdi-calendar-range</v-icon>
                                    <span>ວັນທີ</span>
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                        :return-value.sync="formattedDate" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field dense outlined v-model="formattedDate" required label="ວັນທີ"
                                                append-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="formattedDate" no-title scrollable
                                            @input="$refs.menu.save(formattedDate)">
                                            <v-spacer></v-spacer>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>

                                <!-- PDF File Input -->
                                <v-col>
                                    <v-icon color="black">mdi-file-pdf-box</v-icon>
                                    <span>ອັບໂຫຼດເອກກະສານ</span>
                                    <v-file-input label="ອັບໂຫຼດເອກກະສານ" outlined dense prepend-icon="mdi-file-pdf"
                                        v-model="pdfandpic"></v-file-input>
                                </v-col>
                            </v-row>

                            <!-- Amount of money -->
                            <v-col cols="12" md="4" sm="6">
                                <v-icon size="55" color="black">mdi-cash-plus</v-icon>
                                <span>ຈຳນວນຂອງເງິນ</span>
                                <div style="display: flex; flex-direction: column;">
                                    <!-- Display formatted amount -->
                                    <v-text-field label="ພິມຈຳນວນຂອງເງິນ"
                                        style="font-size: 28px; font-weight: bold; width: 210px;" outlined dense
                                        v-model="formattedInputMoney"
                                        :rules="[v => !!v || 'Required field']"></v-text-field>

                                    <!-- Display text if the input exceeds the amount_money -->
                                    <span v-if="inputExceedsLimit" style="color: red; font-weight: bold;">
                                        ຫຼາຍເກັບໄປ
                                    </span>
                                </div>
                                <!-- Display formatted totalMoney -->
                                <strong>
                                    {{ formattedTotalMoney }}
                                </strong>
                            </v-col>

                            <v-textarea label="ພິມລາຍລະອຽດ" outlined dense v-model="detail">
                                <v-icon color="black">mdi-file-document-outline</v-icon>
                                <span>detail</span>
                            </v-textarea>

                        </v-card-text>

                        <v-card-actions>
                            <v-btn :disabled="inputExceedsLimit" @click="onstore_dept_Must_invoice" color="green" dark>
                                ບັນທຶກ
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- table -->
                <v-card-title class="header-title1">
                    ລາຍງານ
                    <div class="search-print">
                        <v-text-field placeholder="ຄົ້ນຫາ..." v-model="search" rounded background-color="#e1e1e1"
                            prepend-inner-icon="mdi-magnify">
                        </v-text-field>

                        <v-btn color="#e1e1e1" class="card-shadow print-btn" @click="print">
                            <v-icon>mdi-printer</v-icon> ພີມລາຍງານທັງໝົດ
                        </v-btn>
                    </div>

                    <div style="width: 100%;">

                        <v-data-table :items="report_listitemOffice" :headers="filteredHeaders" :items-per-page="50"
                            :search="search">
                            <template v-slot:item="{ item }">
                                <tr>
                                    <!-- <td>{{ item.customer_id }}</td> -->
                                    <td>{{ item.quotation_code }}</td>
                                    <!-- <td>{{ item.customerName }}</td>s -->
                                    <!-- <td>{{ item.reference_number }}</td> -->
                                    <td>{{ item.typeName }}</td>
                                    <td>{{ item.topic }}</td>
                                    <td>{{ item.num ? item.num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                                        }}</td>
                                    <td>{{ item.unit }}</td>
                                    <td>{{ item.amount_money ?
                                        item.amount_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '' }}</td>

                                    <td>{{ item.totalMoney ? item.totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                        ',') : '' }}</td>

                                    <!-- Currency with Conditional Styling -->
                                    <td :style="currencyStyle(item.currency)">
                                        {{ item.currency }}
                                    </td>

                                    <!-- <td>
                                       
                                        <a v-if="item.document_1" @click="viewerpdf(item.document_1)" target="_blank">
                                            ເບິ່ງ ເອກະສານ 1
                                        </a>
                                    </td>
                                  
                                    <!-- <td>{{ item.status_wait_approve }}</td> -->
                                    <!-- <td>{{ item.quotation }}</td> -->
                                    <!-- <td>{{ item.description }}</td> -->
                                    <td>{{ item.note }}</td>
                                    <td>{{ item.date }}</td>
                                    <td>{{ item.due_date }}</td>
                                    <td>
                                        <v-btn style="height: 100%;width: 100%;" small color="#0059c8"
                                            class="white--text card-shadow" @click="viewview(item?.key_id)">
                                            ເບິ່ງເເລະເເກ້ໄຂ
                                            <v-icon size="25" color="white">mdi-file-edit</v-icon>
                                        </v-btn>
                                    </td>
                                    <td v-if="item.status_wait_approve === 'Y'">
                                        <v-btn style="height: 100%; width: 100%;" small color="#0059c8"
                                            class="white--text card-shadow"
                                            @click="openDialog(item.quotation_code, item.totalMoney)">
                                            ອອກໃບຮັບເງິນ
                                            <v-icon size="25" color="white">mdi-file-document-plus</v-icon>
                                        </v-btn>
                                    </td>
                                    <!-- <td v-if="item.status_wait_approve === 'Y'">
                                        <v-btn style="height: 100%; width: 100%;" small color="#0059c8"
                                            class="white--text card-shadow"
                                            @click="navigateToInvoice(item.quotation_code, item.totalMoney)">
                                            ໄປເຮັດໃບເກີດເງິນ
                                            <v-icon size="25" color="white">mdi-next</v-icon>
                                        </v-btn>
                                    </td> -->


                                    <!-- <tb> <v-btn style="height: 40px;width: 100%;" small color="#0059c8"
                                            class="white--text card-shadow" @click="openDialog(item?.quotation_code)">
                                            <v-icon size="30" color="white">mdi-file-document-plus</v-icon>
                                        </v-btn>
                                    </tb> -->



                                    <!-- <td v-if="item.status_wait_approve !== 'Y'">
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn style="height: 40px; width: 50px;" small color="#0085e3"
                                                    class="white--text card-shadow" v-bind="attrs" v-on="on">
                                                    <v-icon size="30" color="white">mdi-arrow-down-drop-circle</v-icon>
                                                </v-btn>
                                            </template>
            <v-list>


                <v-list-item style="margin-bottom: 20px;" @click="viewup(item?.key_id)">
                    <v-list-item-icon>
                        <v-icon size="50" color="blue">mdi-table-edit</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Update</v-list-item-title>
                </v-list-item>
                <v-list-item @click="viewdelete(item?.key_id)">
                    <v-list-item-icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
            </td> -->

                                </tr>
                            </template>
                        </v-data-table>

                        <!-- Displaying Total -->
                        <!-- <div style="text-align: right; margin-top: 20px;">
                        <strong>ລວຍຍອດ: {{ totalAmount }}</strong>
                    </div> -->
                    </div>
                </v-card-title>
            </v-card>
            <!-- PDF Dialog Viewer -->
            <v-dialog v-model="pdfDialog" max-width="800px">
                <v-card>
                    <v-card-title>
                        PDF Viewer
                    </v-card-title>
                    <v-card-text>
                        <iframe :src="pdfUrl" width="100%" height="500px"></iframe>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="pdfDialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <div style="display:none">
                <div id="modalInvoice">
                    <Noti />
                    <v-row
                        style="font-size:14px;margin-left: 50px;margin-top: 10px;display:flex;justify-content:start;flex-direction:column;align-items:start">
                        <div>
                            <span>ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,</span>
                            <span> ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span>ໂທລະສັບ: 020 92661111, 020 92 254 999 </span>
                            <span> ອີເມວ: kounkham@Mining | ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-row>
                    <br>
                    <div class="text-center"
                        style="display:flex;justify-content:center;font-size:19px;font-weight:bold;margin-top: 15px;">
                        ໃບສະເໜີລາຄາ
                    </div>
                    <div>
                        {{ quotation_code }}
                    </div>

                    <table
                        style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px;margin-top: 10px;">
                        <thead>
                            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;">
                                <th style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    # ລຳດັບ</th>
                                <th style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    ລາຍງານ</th>
                                <th style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    ຈໍານວນ</th>
                                <th style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    ລາຄາ</th>
                                <th style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    ທັງໜົດ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in report_listitemOffice" :key="i"
                                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;">
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">{{ i + 1 }}</td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    {{ item?.description?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    {{ item?.num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    {{ item?.amount_money?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;" class="font-weight-bold">
                                    {{ item?.totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            search: '',

            customer_name: '',
            customer_mobile: '',

            pdfandpic: "null",
            listName: '',
            amount_money: null,
            detail: '',
            customer_mobile: '',
            formDataList: [
                {
                    listName: "",
                    num: "",
                    amount_money: "",
                    totalMooney: "",
                    selectedCurrency: "LAK", // Default currency
                    selectedUnit: "ອັນ",    // Default unit
                },
            ],
            customer_data_list: [], // Array to hold customer data
            loading_processing: false, // Add a loading state if needed

            customer_id: null,
            loading_processing: false,
            comment: '',
            due_date_menu: false,
            pdfUrl: '',
            dialog1: false,  // Controls dialog visibility
            selectedQuotationCode: null,  // To store the passed quotation code
            step: 3, // Initialize the step value, assuming the user starts at step 3
            report_listitemOffice: [],
            filteredHeaders:
                [
                    // { text: 'Customer ID', value: 'customer_id' }, 
                    { text: 'ເລກໃບສະເໜີ', value: 'quotation_code' },
                    // { text: 'Customer Name', value: 'customerName' },
                    // { text: 'ເລກ ອ້າງອິງ', value: 'reference_number' },
                    { text: 'ປະເພດ', value: 'typeName' },
                    { text: 'ຫົວຂໍ', value: 'topic' },
                    { text: 'ຈໍານວນ', value: 'num' },
                    { text: 'ຫົວໜ່ວຍ', value: 'num' },
                    { text: 'ລາຄາ', value: 'amount_money' },
                    { text: 'ລາຄາທັງໝົດ', value: 'totalMoney' },
                    { text: 'ສະກຸນເງິນ', value: 'currency' },
                    // { text: 'ເອກະສານ 1', value: 'document_1' },

                    // { text: 'Status', value: 'status_wait_approve' },
                    // { text: 'Quotation', value: 'quotation' },
                    // { text: 'Description', value: 'description' },
                    { text: 'ໝາຍເຫດ', value: 'note' },
                    { text: 'ວັນທີສ້າງໃບບິນ', value: 'date' },
                    { text: 'ວັນຄົບກໍານົດ', value: 'due_date' },
                    { text: 'ເບິ່ງເເລະເເກ້ໄຂ', value: '' },
                    { text: 'ເຮັດໃບຮັບເງິນ', value: '' },
                    // { text: 'ບິ່ງເເລະເເກ້ໄຂໃບຮັບເງິນ', value: '' }, 
                ],
            selectedCurrency: '',
            selectedunit: '',
            selectedunit1: '',
            amount_of_money: '',
            document_1: null,
            dialog: false,

            customer_id: '',
            pdfDialog: false, // Controls the visibility of the PDF dialog
            quotation_code: '',
            topic: '',
            type_id: '',
            currency: '',
            reference_number: '0',
            lek_bai_sung: '0',
            amount_money: '',
            quotation: '0',
            description: '',
            note: '',
            num: '',
            type_id: '',
            loading_processing: false,
            date: '',
            due_date: '',
            menu: '',
            toto: '0',
            formattedDate: null,
            formatteddue_date: '',
            buang_data_list: [],
            totalMoney: '',
            unit: '', // Add the unit data property here
            selectedCurrency: '', // Add selected currency if needed
            formattedInputMoney: '', // User input for money
        };
    },
    mounted() {
        this.onGetCustomerList(); // Fetch customer list on component mount
        this.onGetbuang(); // Fetch customer list on component mount
        this.listCarOffice(); // Fetch customer list on component mount
    },
    watch: {
        // Watch changes in unit and amount_money
        formattedInputMoney(newValue) {
            const numericValue = parseFloat(newValue.replace(/,/g, '') || 0);
            this.formattedInputMoney = numericValue
                ? numericValue.toLocaleString()
                : '';
        },
        num() {
            this.calculateTotal();
        },
        amount_money() {
            this.calculateTotal();
        },
    },

    computed: {
        inputExceedsLimit() {
            return this.formattedInputMoney && parseFloat(this.formattedInputMoney) > this.totalMoney;
        },
        formattedTotalMoney() {
            return this.totalMoney.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        displayAmountMoney: {
            get() {
                return this.formattedTotalMoney
                    ? `${this.formattedTotalMoney}`
                    : '';
            },
            set(value) {
                // Allow decimal numbers and remove commas for raw value
                this.amount_money = value.replace(/[^0-9.]/g, '');
            }
        },
        // Formatted num with commas
        formattedUnit() {
            return this.num
                ? this.num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
        },
        // Formatted displayUnit with num and currency
        displayUnit: {
            get() {
                return this.formattedUnit
                    ? `${this.formattedUnit}`
                    : '';
            },
            set(value) {
                // Allow decimal numbers and remove commas for raw value
                this.num = value.replace(/[^0-9.]/g, '');
            }
        },
        formattedMoney: {
            get() {
                // Return the formatted amount with commas
                return this.totalMoney
                    ? this.totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '';
            },
            set(value) {
                // Remove commas when user enters the value
                this.amount_of_money = value.replace(/,/g, '');
            },
        },

    },
    methods: {
        // navigateToInvoice(quotationCode, totalMoney) {
        //     this.$router.push({
        //         path: '/tve',
        //         query: {
        //             quotation_code: quotationCode,
        //             total_money: totalMoney,
        //         },
        //     });
        // },
        openDialog(quotationCode, totalMoney) {
            this.dialog1 = true;  // Open the dialog
            this.selectedQuotationCode = quotationCode;  // Store the passed quotation code
            this.totalMoney = totalMoney; // Set the selected amount_money
        },
        async onstore_dept_Must_invoice() {
            try {
                const response = await this.$axios.$post("/GenInvoiceCodeINV.service");
                if (response?.status === "00") {
                    const invoice_code = response.data[0]?.invoice_code_out;
                    this.saveinvoice(invoice_code);  // Call saveinvoice with the generated code
                }
            } catch (error) {
                console.error("Error generating invoice code:", error);
            }
        },
        saveinvoice() {
            // You will send the raw `amount_of_money` to the API
            console.log(this.amount_of_money); // This is the raw value without commas
            // Send this value to your API
        },
        async saveinvoice(invoice_code) {
            const formdata = new FormData();
            formdata.append("date", this.formattedDate || "0000-00-00");
            formdata.append("detail", this.detail);
            formdata.append("pdfandpic", this.pdfandpic);
            formdata.append("amount_of_money", this.formattedInputMoney.replace(/,/g, ''));

            formdata.append("invoice_code", invoice_code);
            formdata.append("quotation_code", this.selectedQuotationCode);  // Use the selected quotation code
            formdata.append("toKen", localStorage.getItem("toKen"));

            this.loading_processing = true;

            try {
                const data = await this.$axios.$post(
                    "http://khounkham.com/api-prod/v1/truck/InvoiceDeptInsert.service",
                    formdata
                );
                this.onClearData();  // Clear form data after saving
                Swal.fire({
                    title: "Success!",
                    text: "Data has been saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "Error",
                    text: error.message || "Failed to save data",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading_processing = false;
            }
        },
        onClearData() {
            this.formattedDate = '';
            this.detail = '';
            this.pdfandpic = "null";

            this.amount_of_money = "";

            this.selectedQuotationCode = null;
        },
        print() {
            const modal = document.getElementById("modalInvoice")
            const cloned = modal.cloneNode(true)
            let section = document.getElementById("print")
            if (!section) {
                section = document.createElement("div")
                section.id = "print"
                document.body.appendChild(section)
            }
            section.innerHTML = "";
            section.appendChild(cloned);
            window.print();
        },
        // Calculate the total money
        calculateTotal() {
            // Parse the values as floats, accounting for decimal numbers
            const num = parseFloat(this.num) || 0;
            const amountMoney = parseFloat(this.amount_money) || 0;

            // Multiply the values
            let totalMoney = (num * amountMoney).toFixed(2); // Ensure two decimal places

            // Manually add commas for thousands, millions, etc.
            totalMoney = totalMoney.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            // Set the formatted total money
            this.totalMoney = totalMoney;
        },

        viewup(key_id) {
            this.$router.push({ path: '/editRE', query: { key_id: key_id } });
        },
        viewview(key_id) {
            this.$router.push({ path: '/viewRE', query: { key_id: key_id } });
        },

        currencyStyle(currency) {
            if (currency === 'USD') {
                return 'color: red;';
            } else if (currency === 'LAK') {
                return 'color: green;';
            } else if (currency === 'THB') {
                return 'color: blue;';
            }
            return '';
        },
        setCurrency(value) {
            this.currency = value;
        },

        onGetbuangDetails(key_id) {
            let data = this.buang_data_list.filter((el) => el.key_id === key_id);
            this.buang_send_buang = data[0]?.key_id;
            this.bouang = data[0]?.key_id; // Assign province to company
        },
        // Method to fetch all customers
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
        async onGetbuang() {
            try {
                this.loading_processing = true
                await this.$axios.$post('/getBouangAll.service',

                    {

                        toKen: localStorage.getItem('toKen'),


                    }).then((data) => {
                        if (data?.status == '00') {
                            this.buang_data_list = data?.data
                            this.loading_processing = false
                            console.log('buang:', this.buang_data_list)
                        } else {
                            this.loading_processing = false
                            swal.fire({
                                title: 'ແຈ້ງເຕືອນ',
                                text: data?.message,
                                icon: 'info',
                                allowOutsideClick: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK',
                            })
                        }
                    })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },
        // Print function


        async onstore_dept_Must_received() {
            try {
                const response = await this.$axios.$post('/GenQuotationCodeKKT.service');
                console.log("inv:", response);

                if (response?.status === "00") {
                    const quotation_code = response.data[0]?.kkt_code;
                    this.quotation_code = quotation_code; // Set the quotation_code in data

                    // Call save with the quotation_code

                    this.save(quotation_code);
                    // SweetAlert2 success notification after quotation code generation

                    // Call save with the updated formDataList
                    this.formDataList.forEach(item => {
                        item.quotation_code = quotation_code;
                        item.selectedCurrency = this.selectedCurrency;


                    });
                    await this.saveDataToApi(quotation_code);

                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
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
                listName: "",
                num: "",
                amount_money: "",
                totalMooney: "",

                selectedUnit: "ອັນ",
            });
        },
        removeItem(index) {
            this.formDataList.splice(index, 1);
        },
        updateTotalMoney(index) {
            const item = this.formDataList[index];
            item.totalMooney = item.num * item.amount_money || "";
        },
        updateCustomerName(item, selectedCustomer) {
            if (selectedCustomer) {
                item.listName = selectedCustomer.customerName; // Set only customerName
            } else {
                item.listName = ""; // Reset if no customer is selected
            }
        },

        setUnit(item, unit) {
            item.selectedUnit = unit;
        },
        getButtonStyle(selectedValue, currentValue) {
            return {
                width: "80px",
                fontSize: "20px",
                backgroundColor: selectedValue === currentValue ? "green" : "",
                color: selectedValue === currentValue ? "white" : "black",
            };
        },

        async save(quotation_code) {
            const formdata = new FormData();


            formdata.append('customer_id', this.customer_id);
            formdata.append('topic', this.topic);
            formdata.append('amount_money', this.amount_money);
            formdata.append('num', this.num);
            formdata.append('unit', this.selectedunit);
            formdata.append('totalMoney', this.totalMoney.replace(/,/g, ''));

            formdata.append('toKen', localStorage.getItem("toKen"));
            formdata.append('type_id', this.bouang);
            formdata.append('currency', this.selectedCurrency);
            formdata.append('datee', this.formattedDate || '0000-00-00');
            formdata.append('due_date', this.formatteddue_date || '0000-00-00');
            formdata.append('reference_number', this.reference_number);
            formdata.append('lek_bai_sung', this.lek_bai_sung);
            formdata.append('quotation', this.quotation);
            formdata.append('document_1', this.document_1);

            formdata.append('description', this.comment);
            formdata.append('note', this.note);



            formdata.append('quotation_code', quotation_code);

            this.loading_processing = true;

            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/DeptMustReceivedInsert.service', formdata);
                console.log("Response:", data);

                // Optionally clear form data here
                this.onClearData();

                // SweetAlert2 success notification after saving
                Swal.fire({
                    title: 'Success!',
                    text: 'Data has been saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });

            } catch (error) {
                console.error("Error:", error);

                // SweetAlert2 error notification
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'Failed to save data',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },
        async saveDataToApi(quotation_code) {
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
            // window.location.reload();
        },

        onClearData() {
            // Clear your form fields here
            this.customer_id = '';
            this.topic = '';
            this.bouang = '';
            this.selectedCurrency = '';
            this.formattedDate = '';
            this.formatteddue_date = '';
            this.reference_number = '';
            this.lek_bai_sung = '';
            this.quotation = '';
            this.document_1 = null;

            this.comment = '';
            this.note = '';
            this.selectedunit = '';
            this.amount_money = '';
            this.num = '';
            this.totalMoney = '';
        },
        // Method to view PDF in a dialog
        viewerpdf(pdf) {
            if (pdf) {
                this.pdfUrl = pdf;
                this.pdfDialog = true; // Open the PDF dialog
            }
        },
        // Method to check the file name length for document_1
        checkFileName1() {
            if (this.document_1 && this.document_1.name.length > 100) {
                alert('The text is too long');
                this.document_1 = null;
                this.pdfDialog = false; // Close PDF dialog when document_1 is cleared
            }
        },


        // Clear both documents and close the PDF viewer
        onClearData() {
            this.document_1 = null;

            this.pdfDialog = false; // Close the PDF dialog when documents are cleared
        },
        async listCarOffice() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/listDeptMustReceivedAll.service', {

                    toKen: localStorage.getItem('toKen'),
                    // bound: this.bound,
                    // bouang: this.selectedBuang,
                    // company: this.company,
                    // type: this.selectedProduct,
                    // classofdocs: this.classofdocs,
                    // userIdoffinanceial: this.userIdoffinanceial // Pass the selected userIdoffinanceial value here
                });

                console.log('API Response:', response);  // Log the API response

                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || []; // Ensure it's always an array
                } else {
                    this.report_listitemOffice = [];
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },


        async viewdelete(key_id) {
            try {
                // Show confirmation dialog
                const result = await swal.fire({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                });

                if (result.isConfirmed) {
                    // Call API to delete item if confirmed
                    const response = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/DelDeptMustReceivedtByID.service', {
                        // action: 'delete',
                        key_id: key_id,
                        toKen: localStorage.getItem('toKen'),


                    });

                    if (response && response.status === '00') {
                        swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        this.listCarOffice(); // Refresh the list
                    } else {
                        swal.fire(
                            'Failed!',
                            'There was an error deleting your file.',
                            'error'
                        );
                    }
                }
            } catch (error) {
                // Handle errors
                this.$toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
                console.error(error);
            }

        },

    },
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.selected-currency {
    /* background-color: rgb(16, 38, 160); */
    color: rgb(228, 18, 18);
}

.selected-currency1 {
    background-color: #007bff;
    /* Change to your preferred color */
    color: #ffffff;
    /* Change text color if needed */
}

.header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #e0e0e0;
    background-color: #d81313;
    color: white;
    padding: 10px;
}

.search-print {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.print-btn {
    margin-left: 10px;
}

.main-content,
.footer-content {
    display: flex;
    flex-wrap: wrap;
    margin-left: 12px;
}

.selection {
    display: flex;
    align-items: center;
    margin-right: 10px;
}


.currency-selection {
    display: flex;
    /* align-items: center; */

    gap: 10px;
    margin-right: 10px;

}

@media (max-width: 768px) {
    .search-print {
        flex-direction: column;
        width: 100%;
    }

    .main-content,
    .footer-content {
        flex-direction: column;
        margin-left: 0;
    }

    .selection,
    .currency-selection {
        flex-direction: column;
        /* align-items: center; */

    }
}
</style>

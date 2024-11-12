<template>
    <div>
        <div>
            <!-- <v-img src="path-to-image.jpg" alt="Header Image" height="200px"></v-img> Add an image if needed -->

            <v-card class="card-shadow mb-4" rounded="lg">


                <v-card-title style="display:flex;background-color:#42c69f;color:white">


                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="receivedAll">
                        <v-icon color="#73c5e5">mdi-arrow-left</v-icon>
                    </v-btn>



                    <v-spacer></v-spacer>
                    ໃບສະເໝີລາຄາ
                    <v-spacer></v-spacer>
                    <v-btn color="#e1e1e1" class="card-shadow print-btn" @click="print">
                        <v-icon>mdi-printer</v-icon> ພີມລາຍງານທັງໝົດ
                    </v-btn>
                </v-card-title>



                <div class="main-content">
                    <!-- Customer Selection -->
                    <!-- <v-card> -->



                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-account</v-icon>
                        <span>ລູກຄ້າ</span>
                        <span>: {{ customerName }}</span> <!-- Display selected customer name -->
                        <span>: {{ customer_id }}</span> <!-- Display selected customer name -->
                        <div class="selection">
                            <v-autocomplete outlined dense label="-ເລືອກລູກຄ້າ-" :items="customer_data_list"
                                item-text="customerName" item-value="id" @change="onGetCustomerDetails">
                            </v-autocomplete>

                        </div>
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
                    <!-- <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-document-outline</v-icon>

                        <span>ໃບສະເໜີລາຄາເລກທີ</span>

                        <v-text-field label="ພີມໃບສະເໜີລາຄາເລກທີ" outlined dense v-model="quotation"></v-text-field>
                    </v-col> -->
                    <!-- </v-card> -->
                </div>
                <div class="main-content">
                    <v-col cols="12" md="4" sm="6">
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
                    </v-col>


                    <v-col cols="12" md="4" sm="6">
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
                    </v-col>

                    <!-- <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-document-outline</v-icon>

                        <span>ໃບສັ່ງເລກທີ</span>
                        <v-text-field label="ພີມໃບສັ່ງເລກທີ" outlined dense v-model="lek_bai_sung"
                            :rules="[v => !!v || 'Required field']"></v-text-field>
                    </v-col> -->
                </div>

                <div class="footer-content">

                    <!-- <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-document-outline</v-icon>

                        <span>ການອ້າງອີງ</span>
                        <v-text-field label="ພີມການອ້າງອີງ" outlined dense v-model="reference_number"></v-text-field>
                    </v-col> -->
                    <!-- Customer Selection -->

                    <v-col cols="12" md="4" sm="6">
                        <div style="margin-right: 10px;">
                            <v-icon color="black">mdi-file-document-outline</v-icon>

                            <span>ຫົວຂໍ</span>

                            <v-text-field label="ພິມຫົວຂໍ" outlined dense v-model="topic"></v-text-field>
                        </div>
                    </v-col>



                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-account</v-icon>
                        <span>ປະເພດ</span>
                        <span>: {{ typeName }}</span> <!-- Display selected customer name -->
                        <span>: {{ bouang }}</span> <!-- Display selected customer name -->

                        <div class="selection">
                            <v-autocomplete outlined dense label="-ປະເພດ-" :items="buang_data_list"
                                item-text="nameOfBouang" item-value="key_id" @change="onGetbuangDetails">
                            </v-autocomplete>

                        </div>
                    </v-col>


                </div>

                <v-row justify="center" align="center">
                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-pdf-box</v-icon>
                        <span>ອັບໂຫຼດເອກກະສານ1</span>
                        <v-file-input style="margin-right: 30px;" ref="fileInput1" label="ອັບໂຫຼດເອກກະສານ1" outlined
                            dense prepend-icon="mdi-file-pdf" append-inner-icon="mdi-file-pdf"
                            background-color="#f5f5f5" v-model="document_1" @change="checkFileName1">
                        </v-file-input>
                    </v-col>





                    <v-col cols="12" md="4" sm="6">
                        <v-icon color="black">mdi-file-pdf-box</v-icon>
                        <span>ອັບໂຫຼດເອກກະສານ1</span>


                        <v-card-text>
                            <iframe v-if="document_1" :src="document_1" width="100%" height="500px"
                                frameborder="0"></iframe>
                        </v-card-text>
                    </v-col>


                </v-row>

                <div class="footer-content">



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
                    <v-col cols="12" md="4" sm="6">
                        <v-icon size="55" color="black">mdi-ticket-confirmation</v-icon>
                        <span>ຈໍານວນ</span>
                        <div style="display: flex;">
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 210px;" label="ພີມ" outlined
                                dense v-model="displaynum" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 20px;" outlined dense
                                v-model="selectedunit" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                        </div>
                    </v-col>

                    <!-- Customer Selection -->




                    <v-col cols="12" md="4" sm="6">
                        <v-icon size="55" color="black">mdi-cash</v-icon>
                        <span style="font-size: 24px;">ລາຄາ</span>
                        <div style="display: flex;">
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 210px;" label="ພີມລາຄາ"
                                outlined dense v-model="displayAmountMoney" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 40px;" outlined dense
                                v-model="selectedCurrency" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                            <v-text-field style="font-size: 28px; font-weight: bold; width: 60px;" outlined dense
                                v-model="selectedunit" :rules="[v => !!v || 'Required field']">
                            </v-text-field>
                        </div>
                    </v-col>


                </div>

                <v-row justify="center" align="center">
                    <v-col cols="12" md="4" sm="6">
                        <v-icon size="55" color="black">mdi-cash-plus</v-icon>
                        <span>ລາຄາທັງໝົດ</span>
                        <div class="selection">
                            <div style="display: flex;">
                                <v-text-field style="font-size: 28px; font-weight: bold;" label="ລາຄາທັງໝົດ" outlined
                                    dense v-model="totalMoney" readonly>
                                </v-text-field>
                                <v-text-field style="font-size: 28px; font-weight: bold; width: 100px;" outlined dense
                                    v-model="selectedCurrency" :rules="[v => !!v || 'Required field']">
                                </v-text-field>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <div>

                    <v-data-table :headers="headers" :items="deptList" item-key="key_id" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Department List</v-toolbar-title>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.key_id="{ item }">
                            <span>{{ item.key_id }}</span>
                        </template>
                        <template v-slot:item.listName="{ item }">
                            <span>{{ item.listName }}</span>
                        </template>
                        <template v-slot:item.quotation_code="{ item }">
                            <span>{{ item.quotation_code }}</span>
                        </template>
                        <template v-slot:item.amount="{ item }">
                            <span>{{ item.amount }}</span>
                        </template>
                        <template v-slot:item.price="{ item }">
                            <span>{{ item.price }}</span>
                        </template>
                        <template v-slot:item.totalPrice="{ item }">
                            <span>{{ item.totalPrice }}</span>
                        </template>
                    </v-data-table>

                </div>

                <!-- Display Total Money from sumfooter -->
                <div class="mt-4">
                    <strong>Total Money: </strong>
                    <span>{{ totalMoney2 }}</span>
                </div>
                <div>

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

                    <!-- <div style="display: flex; justify-content: center; align-items: center; height: 10vh">
    <v-btn @click="updat" style="background-color: green; width: 30%;color: white;">
        
        ບັນທຶກ
    </v-btn>
</div> -->
                </div>


            </v-card>



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

                    <v-card-title style="display:flex;font-size: 18px;font-weight: bold">


                        <v-spacer></v-spacer>
                        ໃບສະເໜີລາຄາ
                        <v-spacer></v-spacer>

                    </v-card-title>

                    <v-card-title style="display:flex;font-size: 15px;margin-top: -25px;">
                        <div style="font-weight: bold;margin-right: 10px;">
                            ລູກຄ້າ
                        </div> {{ customerName }}

                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>

                        <v-spacer> </v-spacer>
                        ໃບສະເໜີລາຄາ <div style="font-weight: bold; margin-left: 20px;">

                            {{ quotation_code }}
                        </div>

                    </v-card-title>
                    <v-card-title style="display:flex;font-size: 15px;margin-top: -25px;">

                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>

                        <v-spacer> </v-spacer>
                        ວັນທີ
                        <div style="font-weight: bold; margin-left: 20px;">

                            {{ formattedDate }}
                        </div>


                    </v-card-title>

                    <v-card-title style="display:flex;font-size: 15px;margin-top: -25px;">

                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>

                        <v-spacer> </v-spacer>
                        ວັນທີຄົບກໍານົດ
                        <div style="font-weight: bold; margin-left: 20px;">

                            {{ formatteddue_date }}
                        </div>

                    </v-card-title>


                    <table
                        style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px;margin-top: 10px;">
                        <thead>
                            <tr
                                style="padding:10px;background-color:#aae0ec;border: 0.5px solid #999;border-collapse: collapse;">
                                <th style="padding:10px;background-color:#aae0ec;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    # ລຳດັບ
                                </th>
                                <th style="padding:10px;background-color:#aae0ec;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    ລາຍການ
                                </th>
                                <th style="padding:10px;background-color:#aae0ec;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    ຈໍານວນ
                                </th>
                                <th style="padding:10px;background-color:#aae0ec;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    ລາຄາ
                                </th>

                                <th style="padding:10px;background-color:#aae0ec;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    ລາຄາ ທັງໜົດ
                                </th>
                                <th style="padding:10px;background-color:#aae0ec;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    ສະກຸນເງິນ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;">
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    1
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ comment }}

                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ displaynum?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ displayAmountMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>

                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ selectedCurrency }}
                                </td>
                            </tr>

                            <tr v-for="(item, index) in deptList" :key="item.key_id"
                                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;">
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ index + 2 }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ item.listName }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>

                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                                </td>
                                <td style="padding:10px;border: 0.5px solid #999;color:#000;text-align: center;"
                                    class="font-weight-bold">
                                    {{ selectedCurrency }}
                                </td>
                            </tr>
                        </tbody>


                    </table>

                    <v-card-title style="display:flex;font-size: 15px;">

                        <v-spacer></v-spacer>

                        <v-spacer></v-spacer>

                        <v-spacer> </v-spacer>
                        ທັງໜົດ
                        <div style="font-weight: bold; margin-left: 20px;">

                            {{ totalMoney2 }}
                        </div>

                    </v-card-title>


                    <div
                        style="display:flex;flex-direction:row;justify-content:space-between;margin-top:120px; font-size: 12px">

                        <div
                            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center">
                            <div>ຜູ້ສະເໜີ</div>
                            <div style="height: 50px;"></div>
                            <div style="display:flex;justify-content:space-between">
                                .............................


                            </div>
                        </div>
                        <div
                            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 12px">
                            <div>ຜູ້ກວດສອບ</div>
                            <div style="height: 50px;"></div>
                            <div style="display:flex;justify-content:space-between">
                                ...............................


                            </div>
                        </div>
                        <div
                            style="width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px;padding-right:20px; font-size: 12px">
                            <div>ຜູ້ອໍານວຍການ</div>
                            <div style="height: 50px;"></div>
                            <div style="display:flex;justify-content:space-between">
                                .............................


                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {
            search: '',

            customer_data_list: [],
            customer_name: '',
            customer_mobile: '',

            customer_id: null,
            loading_processing: false,
            comment: '',
            customer_data_list: [], // This should be populated with customer data
            customerName: '', // For displaying customer name
            customer_id: '', // To store selected customer ID
            due_date_menu: false,
            pdfUrl: '',
            bouang: '',
            report_listitemOffice: [],

            selectedCurrency: '',

            document_1: null,
            totalMoney: 0,
            items: [], // To hold the data items
            typeName: '',
            checkFileName1: '',
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
            itemss: '',
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
            deptList: [],
            totalMoney: 0,
            sumtotomoney: '',
            num: '', // Add the num data property here
            selectedCurrency: '', // Add selected currency if needed
            selectedunit: '', // Add selected num if needed
            deptList: [],

            headers: [
                { text: 'Key ID', value: 'key_id' },
                { text: 'List Name', value: 'listName' },
                { text: 'Quotation Code', value: 'quotation_code' },
                { text: 'Amount', value: 'amount' },
                { text: 'Price', value: 'price' },
                { text: 'Total Price', value: 'totalPrice' },
            ]
        };
    },
    mounted() {
        if (this.$route.query.key_id) {
            this.onGetData(this.$route.query.key_id); // Use the correct method name

            this.onGetbuang(); // Fetch customer list on component mount
            this.onGetCustomerList(); // Fetch customer list on component mount

        }

    },
    watch: {
        // Watch changes in num and amount_money
        num() {
            this.calculateTotal();
        },
        amount_money() {
            this.calculateTotal();
        },
    },

    computed: {
        formattedTotalMoney() {
            return parseFloat(this.totalMoney).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        formattedAmountMoney() {
            return this.amount_money !== null && this.amount_money !== undefined
                ? this.amount_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
        },
        // Formatted displayAmountMoney with num and currency
        displayAmountMoney: {
            get() {
                return this.formattedAmountMoney
                    ? `${this.formattedAmountMoney}`
                    : '';
            },
            set(value) {
                // Allow decimal numbers and remove commas for raw value
                this.amount_money = value.replace(/[^0-9.]/g, '');
            }
        },
        // Formatted num with commas
        formattednum() {
            return this.num
                ? this.num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
        },
        // Formatted displaynum with num and currency
        displaynum: {
            get() {
                return this.formattednum
                    ? `${this.formattednum}`
                    : '';
            },
            set(value) {
                // Allow decimal numbers and remove commas for raw value
                this.num = value.replace(/[^0-9.]/g, '');
            }
        },
    },
    methods: {
        onFileChange(event) {
            const files = event.target.files;
            this.document_1 = files.length ? files[0] : null; // Set to the first file or null
        },
        // Calculate the total money
        calculateTotal() {
            // Parse the values as floats, accounting for decimal numbers
            const num = parseFloat(this.num) || 0;
            const amountMoney = parseFloat(this.amount_money) || 0;

            // Multiply the values and format the result with commas and decimals
            this.totalMoney = (num * amountMoney).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
        onGetCustomerDetails(id) {
            const data = this.customer_data_list.find(el => el.id === id);
            if (data) {
                this.customer_name = data.customerName;
                this.customer_mobile = data.mobile;
                this.customer_id = id;
            }
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
        async onGetData(key_id) {
            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listDeptMustReceiveddetail.service', {
                    key_id: key_id
                });
                if (data?.status === "00") {
                    const details = data?.data[0] || {};
                    this.customerName = details.customerName || "";
                    this.formattedDate = details.date || "";
                    this.formatteddue_date = details.due_date || "";
                    this.topic = details.topic || "";
                    this.typeName = details.typeName || "";
                    this.bouang = details.type_id || "";
                    this.customer_id = details.customer_id || "";
                    this.selectedunit = details.unit || "";
                    this.selectedCurrency = details.currency || "";
                    this.displaynum = details.num || "";
                    this.displayAmountMoney = details.amount_money || "";
                    this.totalMoney = details.totalMoney || "";

                    this.note = details.note || "";
                    this.comment = details.description || "";
                    this.document_1 = details.document_1 || "";
                    this.quotation_code = details.quotation_code || "";

                }

                this.onGetindexData()
            }
            catch (error) {

                console.log(error);
            }
        }
        ,
        async onGetindexData() {
            try {
                if (!this.quotation_code) {
                    throw new Error("Quotation code is not available.");
                }

                const response = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/listNameOfDept.service', {
                    quotation_code: this.quotation_code
                });

                if (response?.status === "00") {
                    this.deptList = response.data || [];
                    this.items = response.data.data; // Assign data items
                    this.totalMoney2 = response.sumfooter.totalMoney; // Assign totalMoney from sumfooter

                    console.log('Data fetched successfully:', this.deptList);
                    console.log('Total Money:', this.totalMoney); // Log totalMoney for verification
                } else {
                    console.error('Failed to fetch data. API response status:', response?.status);
                }
            } catch (error) {
                console.error('Error while fetching data:', error.message);
            }
        }



        ,
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




        async updat(quotation_code) {
            const formdata = new FormData();

            // Append form fields to FormData
            formdata.append('document_1', this.document_1);
            formdata.append('customer_id', this.customer_id);
            formdata.append('toKen', localStorage.getItem("toKen"));
            formdata.append('topic', this.topic);
            formdata.append('currency', this.selectedCurrency);
            formdata.append('datee', this.formattedDate || '0000-00-00');
            formdata.append('due_date', this.formatteddue_date || '0000-00-00');
            formdata.append('reference_number', this.reference_number);
            formdata.append('lek_bai_sung', this.lek_bai_sung);
            formdata.append('amount_money', this.amount_money);
            formdata.append('quotation', this.quotation);
            formdata.append('description', this.comment);
            formdata.append('unit', this.selectedunit);
            formdata.append('num', this.num);
            formdata.append('totalMoney', this.totalMoney);
            // formdata.append('quotation_code', quotation_code);

            // Append key_id from route query
            formdata.append('note', this.note);
            formdata.append('type_id', this.bouang);
            formdata.append('key_id', this.$route.query.key_id);

            this.loading_processing = true;

            try {
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/DeptMustReceivedUpdate.service', formdata);
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



        // Clear both documents and close the PDF viewer

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

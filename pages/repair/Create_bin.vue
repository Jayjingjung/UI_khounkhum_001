<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px;width: 100%;">
            <v-card-title style="background-color:	#b76d22" class="white--text">
                ນໍາອາໄຫຼ່ອອກ ສາງ
            </v-card-title>
            <v-card class="flex-container ">
                <div style="width:95%;" class="pl-2">

                    <!-- Display unit_price above the v-select component -->
                  
                    <!-- <div v-if="selectedEquipment" class="mt-2">
                        <p>ລາຄາຕໍ່ອັນ: {{ selectedEquipment.unit_price }} Kip</p>
                    </div> -->

                    <v-select outlined dense label="ເລືອກ ອຸປະກອນ" :items="Mechanicequipment" item-text="itemName"
                        item-value="item_id" @change="onSelectMechanicequipment">
                        <template v-slot:selection="data">
                            <span>{{ data.item.itemName }} ({{ data.item.unit_price }} Kip)</span>
                        </template>
                        <template v-slot:item="data">
                            <span>{{ data.item.itemName }} ({{ data.item.unit_price }} Kip)</span>
                        </template>
                    </v-select>
                    <div class="d-flex align-center pl-2">
                        <v-text-field label="*ຈໍານວນ" dense outlined background-color="#f5f5f5"
                            v-model="qty_Fix"></v-text-field>
                        <div class="tops"></div>
                    </div>
                </div>

                <div style="width:95%;" class="pl-2">
                    <div>
                        <v-autocomplete outlined dense label="ເລືອກຫົວລົດ" :items="cars_list"
                            item-text="h_VICIVLE_NUMBER" item-value="key_id" @change="onGetCarDetails"
                            :rules="nameRules">
                        </v-autocomplete>
                        <div class="d-flex align-center pl-2">
                            <v-text-field label="*ລາ​ຄາ​ລວມ" dense outlined background-color="#f5f5f5"
                                v-model="total_Price"></v-text-field>
                            <div class="tops"></div>
                        </div>
                    </div>
                </div>

                <div style="width:95%;" class="pl-2">
                    <div>
                        <v-autocomplete outlined dense label="ເລືອກຫາງລົດ" :items="truct_footer_data_list"
                            item-text="f_CARD_NO" item-value="key_id" @change="onGetTructFooterDetail"
                            :rules="nameRules">
                        </v-autocomplete>
                        <div class="d-flex align-center pl-2">
                            <v-text-field label="*ລາຍລະອຽດ" dense outlined background-color="#f5f5f5"
                                v-model="description"></v-text-field>
                            <div class="tops"></div>
                        </div>
                    </div>
                </div>

                <div style="width:95%;" class="pl-2">
                    <div>
                        <div class="d-flex align-center pl-2">
                            <v-text-field label="*ສະຖານທີ" dense outlined background-color="#f5f5f5"
                                v-model="location_fix"></v-text-field>
                            <div class="tops"></div>
                        </div>
                        <div class="d-flex align-center pl-2">
                            <v-text-field label="*ລາຍລະອຽດ ການເເປງ" dense outlined background-color="#f5f5f5"
                                v-model="fix_Detail"></v-text-field>
                            <div class="tops"></div>
                        </div>
                    </div>
                </div>

                <div style="width:95%;" class="pl-2">
                    <v-select outlined dense label="ເລືອກ ສາຂາ" :items="branches" item-text="name" item-value="value"
                        v-model="branch_inventory">
                    </v-select>
                </div>

                <div style="width:95%;" class=" ml-2 mb-2">
                    <v-btn elevation="0" color="#448AFF" @click="onGetLeaveNumber">
                        <v-icon color="white">mdi-check</v-icon>
                        <span class="white--text">ບັນທຶກ</span>
                    </v-btn>
                </div>
            </v-card>
        </v-card>
        <div style="display: flex; margin-top: 10px; width: 100%;">
            <div style="width: 100%;"> <!-- Updated this div -->
                <v-card class="card-shadow" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
                    <v-card-title style="background-color: #b76d22" class="white--text">
                        ອາໄຫຼ່ໃນສາງ
                    </v-card-title>

                    <div style="display: flex; margin-top: 10px; margin-left: 10px;"></div>
                    <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list"
                        :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                                <td>{{ row?.item?.item_name }}</td>
                                <td>{{ row?.item?.qty }}</td>
                                <td>{{ row?.item?.unit }}</td>
                                <td>{{ row?.item?.unitPirce }}</td>
                                <td>{{ row?.item?.sumUnitWithPrice }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
            <!-- <v-card style="width: 80%;">
                <v-card class="card-shadow" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
                    <v-card-title style="background-color: #b72222" class="white--text">
                        ອາໄຫຼ່ທີນໍາອອກຈາກສາງ
                    </v-card-title>

                    <div style="display: flex; margin-top: 10px;"></div>
                    <v-data-table :items-per-page="5" :headers="data_list_showFix" :items="showFix_data_list"
                        :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                                <td>{{ row?.item?.fixId }}</td>
                                <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                                <td>{{ row?.item?.f_BRANCH }}</td>
                                <td>{{ row?.item?.qty_Fix }}</td>
                                <td>{{ row?.item?.total_Price }}</td>
                                <td>{{ row?.item?.add_on }}</td>
                                <td>{{ row?.item?.description }}</td>
                                <td>{{ row?.item?.dateFix }}</td>
                                <td>
                                    <v-btn small color="primary" class="card-shadow"
                                        @click="onGetinbox(row.item.fixId)">
                                        <v-icon>mdi-clipboard-text</v-icon>ລາຍລະອຽດ
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-card> -->
        </div>

        <!-- <v-dialog v-model="dialogVisible" max-width="800px" style="max-height: 800px;">
            <v-card>
                <v-card-title style="font-size: 24px;">ປ້ອນຂໍ້ມູນ</v-card-title>
                <v-card-actions>
                    <v-btn style="font-size: 20px;" color="primary" @click="closeDialog">
                        <v-icon>mdi-printer</v-icon>ພິມບິນ</v-btn>


                </v-card-actions>
                <div style="display: flex;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="fixId">fixId:</label>
                            <span id="fixId">{{ fixId }}</span>
                        </div>
                        <div>
                            <label for="h_VICIVLE_NUMBER">h_VICIVLE_NUMBER</label>
                            <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">f_BRANCH</label>
                            <span id="qty_offer">{{ f_BRANCH }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">qty_Fix</label>
                            <span id="qty_offer">{{ qty_Fix }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">total_Price</label>
                            <span id="qty_offer">{{ total_Price }}</span>
                        </div>

                        <div>
                            <label for="qty_offer">description</label>
                            <span id="qty_offer">{{ description }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">dateFix</label>
                            <span id="qty_offer">{{ dateFix }}</span>
                        </div>
                        <div>
                            <label for="add_on">add_on</label>
                            <span id="add_on">{{ add_on }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text v-if="add_on < 1" style="display: flex;">
                        <div>
                            <label for="add_on">ລາຍຈາຍເພີນ(ຄ່າສ່າງ)</label>
                            <span id="add_on">{{ add_on }}</span>
                            <v-text-field label="*add_on" dense outlined background-color="#f5f5f5"
                                v-model="add_on"></v-text-field>
                        </div>
                        <v-btn style="margin-top: -10px; margin-left: 10px;" color="primary" @click="onSubmit">
                            <v-icon>mdi-border-color</v-icon>ເເກ່ໄຂ
                        </v-btn>
                    </v-card-text>

                </div>
                <v-card-actions>

                    <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>


                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            truct_footer_data_list: [],
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            f_CARD_NO: '',
            cars_list: [],
            item_id: '',
            hkey_id: '',
            fkey_id: '',
            fix_Detail: '',
            unit_price: '',
            location_fix: '',
            img: '',
            qty_offer: '',
            totalMoney: '',
            description: '',
            offerManName: '',
            job: '',
            f_CARD_NO: '',
            item_name: '',
            pocode: '',
            dateCreate: '',
            offer_CODE: '',
            total_Price: '',
            qty_Fix: '',
            printData: null,
            branch_inventory: null,
            branches: [
                { name: 'Thakhaek', value: 2 },
                { name: 'XiengKhouang', value: 3 },
                { name: 'Savannakhet', value: 4 },
                { name: 'Vientiane', value: 5 },
            ],
            showModal: false,
            dialogVisible: false,
            offerManName: '',
            job: '',
            itemId: '', // Add itemId property
            Mechanicequipment: [],
            show_list: [],

            name: '',
            address: '',
            fixId: '',
            offerCode: '',
            h_VICIVLE_NUMBER: '',
            number: '',
            // Other data properties...
            search: '',
            truck_table_headers: [

                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ລາໄລ', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'qty' },
                { text: 'ຫົວນວຍ', value: 'unit' },
                { text: 'ລາຄາ', value: 'unitPirce' },
                { text: 'ລາຄາທັງໝົດ', value: 'sumUnitWithPrice' },

            ],
            truck_data_list: [],

            data_list_showFix: [
                { text: 'ຮູບພາບ', value: 'img' },

                { text: 'ID', value: 'fixId' },
                { text: 'ຫົວລັດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຫາງລົດ', value: 'f_BRANCH' },
                { text: 'ຈໍານວນ', value: 'qty_Fix' },
                { text: 'ລາ​ຄາ​ລວມ', value: 'total_Price' },
                { text: 'ລາຍຈ່າຍເພີນເຕີມ(ຄ່າຊ່າງ)', value: 'add_on' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ວັນທີເເປງ', value: 'dateFix' },

            ],
            showFix_data_list: [],

            // Other data properties...
        };
    },
    computed: {
        filteredItems() {
            if (!Array.isArray(this.truck_data_list)) {
                return [];
            }
            return this.truck_data_list.filter(item =>
                item.statusPO === 'YES' &&
                (item.stock_status === 'wait')
            );
        },

    },
    watch: {
        qty_Fix(newVal) {
            if (this.selectedEquipment) {
                this.total_Price = this.selectedEquipment.unit_price * newVal;
            }
        }
    },
    methods: {
        onSelectMechanicequipment(selectedItem) {
      this.selectedEquipment = this.Mechanicequipment.find(item => item.item_id === selectedItem);
      if (this.selectedEquipment) {
        this.item_id = this.selectedEquipment.item_id; // Set the item_id from the selected item
        this.item_name = this.selectedEquipment.itemName; // Set the itemName from the selected item
        this.unit_price = this.selectedEquipment.unit_price; // Set the unit_price from the selected item
        this.total_Price = this.unit_price * this.qty_Fix; // Calculate the total price
      }
    },
        onGetCarDetails(id) {
            console.log(id);

            let data = this.cars_list.filter((el) => el.key_id === id);
            console.log('head:', data);
            this.h_VICIVLE_NUMBER = data[0]?.h_VICIVLE_NUMBER;
            this.h_ID = id;
        },
        onGetMechanicequipment(item_id) {
            console.log(item_id);

            let data = this.Mechanicequipment.filter((el) => el.item_id === item_id);
            console.log('head:', data);
            this.itemName = data[0]?.itemName;
            this.item_id = item_id;

        },
        onGetTructFooterDetail(key_id) {
            let data = this.truct_footer_data_list.filter((el) => el.fkey_id === key_id);
            console.log("back:", data);
            this.f_CARD_NO = data[0]?.f_CARD_NO;
            this.fkey_id = key_id;

            // Set other data properties as needed
        },
        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ReportStock.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.truck_data_list = response.data;
                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
                // window.location.reload();

            }
        },

        async onGetLeaveNumber() {
      try {
        this.loading_processing = true;
        const data = {
          item_name: this.item_name,
          branch_inventory: this.branch_inventory,
          item_id: this.item_id,
          header_id: this.h_ID,
          footer_id: this.fkey_id,
          qty_Fix: this.qty_Fix,
          total_Price: this.total_Price,
          description: this.description,
          location_fix: this.location_fix,
          fix_Detail: this.fix_Detail,
          toKen: localStorage.getItem('toKen'),
        };
        console.log("send:", data);

        const response = await this.$axios.$post('/fix.service', data);
        console.log("createReport:", response);

        if (response?.status === '00') {
          this.loading_processing = false;
          this.onGetshowdata_table();

          // Display success alert using SweetAlert2
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your message here', // Customize the success message
            confirmButtonText: 'OK',
          });
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        this.loading_processing = false;

        // Display error alert using SweetAlert2
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch data from the API', // Customize the error message
          confirmButtonText: 'OK',
        });
      }
    },
        async onGetadd() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('ListItems.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('itemName:', data?.data);
                this.Mechanicequipment = data?.data || [];
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetTruckList() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('listVicicleHeaderCombo1.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('truck_list:', data?.data);
                this.cars_list = data?.data || [];
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetTruckFooter() {
            try {
                this.loading_processing = true;
                const data = await this.$axios.$post('listViciclefooterCombo1.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                console.log('all_truck_footer_list:', data);
                if (!data || !data.data) {
                    this.truct_footer_data_list = [];
                } else {
                    this.truct_footer_data_list = data.data;
                }
            } catch (error) {
                console.log(error);
                this.showErrorAlert('ແຈ້ງເຕືອນ', error);
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetshowFix() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('showFix.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.showFix_data_list = response.data;
                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
                // window.location.reload();

            }
        },
        async onGetinbox(fixId) {
            try {
                const response = await this.$axios.$post('/showFixDetail.service', {
                    toKen: localStorage.getItem('toKen'),
                    fixId: fixId,
                });

                console.log('Print API response:', response);
                this.fixId = response.data[0].fixId; // Assuming you want the first item's name
                this.h_VICIVLE_NUMBER = response.data[0].h_VICIVLE_NUMBER; // Assuming you want the first item's qty_offer
                this.f_BRANCH = response.data[0].f_BRANCH; // Assuming you want the first item's qty_offer
                this.qty_Fix = response.data[0].qty_Fix; // Assuming you want the first item's qty_offer
                this.total_Price = response.data[0].total_Price; // Assuming you want the first item's qty_offer
                this.add_on = response.data[0].add_on; // Assuming you want the first item's qty_offer
                this.description = response.data[0].description; // Assuming you want the first item's qty_offer
                this.dateFix = response.data[0].dateFix; // Assuming you want the first item's qty_offer
                // Handle the response as needed, such as displaying a success message or handling errors
                this.location_fix = response.data[0].location_fix; // Assuming you want the first item's qty_offer

                this.openDialog(fixId); // Open the dialog after API call success
            } catch (error) {
                console.error('Print API error:', error);
                // Handle the error, such as displaying an error message
            }
        },
        openDialog(fixId) {
            this.fixId = fixId;
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        onSubmit() {
            // Implement your logic to handle form submission
            console.log('fixId:', this.fixId);
            console.log('h_VICIVLE_NUMBER:', this.h_VICIVLE_NUMBER);
            console.log('f_BRANCH:', this.f_BRANCH);
            console.log('qty_Fix:', this.qty_Fix);
            console.log('total_Price:', this.total_Price);
            console.log('add_on:', this.add_on);
            console.log('description:', this.description);
            console.log('dateFix:', this.dateFix);
            console.log('location_fix:', this.location_fix);


            // Close the dialog after submission
            this.closeDialog();

        },
        async onSubmit() {
            try {
                // Prepare the data to be sent in the request body
                const requestData = {
                    // toKen: localStorage.getItem('toKen'),
                    fixId: this.fixId, // Using the offerCode property
                    add_on: this.add_on, // Assuming you have an itemId property set from somewhere
                    location_fix: this.location_fix,

                };

                // Send the POST request to the API endpoint
                const response = await this.$axios.$post('/UpdateFixCost.service', requestData);

                console.log('UpdateFixCost API response:', response);

                // Close the dialog after submission
                this.closeDialog();

                if (response?.status === '00') {
                    this.loading_processing = false;
                    // this.print();
                    // Other actions upon successful creation


                    // Display success alert using SweetAlert2
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
                        confirmButtonText: 'OK',
                    });
                    window.location.reload();
                }

                // You can handle the response here, such as showing a success message or updating UI
            } catch (error) {
                console.error('UpdateFixCost API error:', error);
                // Handle the error, such as displaying an error message

            }
            window.location.reload();
        },
    },
    mounted() {
        this.onGetTruckFooter(); // Fetch truck footer data when component is mounted
        this.onGetTruckList(); // Fetch truck footer data when component is mounted
        this.onGetshowFix(); // Fetch truck footer data when component is mounted
        this.onGetadd(); // Fetch truck footer data when component is mounted
        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted
    },

};
</script>

<style>
.v-divider {
    margin-top: 10px;
    margin-bottom: 10px;
}

.phoum10 {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 150px;
}

.flex-container {
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 2px;
    height: 200px;
}
</style>
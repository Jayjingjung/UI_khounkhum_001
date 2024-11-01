<template>
    <div>
        <v-card class="card-shadow mb-5" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
            <v-card-title style="background-color: #b722b7" class="white--text">
                <v-icon color="white" size="55">mdi mdi-truck-alert</v-icon>
                ປະວັດການເບີກທອນອາໄລ ຂອງລົດ
                <v-col>

                </v-col>
            </v-card-title>
            <v-data-table :headers="truck_table_headers" :items="truck_data_list" :search="search">
                <template v-slot:item="row">
                    <tr>
                        <td>{{ row.item.h_VICIVLE_NUMBER }}</td>
                        <td>{{ row.item.h_BRANCH }}</td>
                        <td>{{ row.item.total_Price }}</td>
                        <td>{{ row.item.dateFix }}</td>
                        <td>{{ row.item.totalTimeFix }}</td>
                        <td>{{ row.item.totalFixCost }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>





        <v-card style="width: 100%;">
            <v-card class="card-shadow" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
                <v-card-title style="background-color: #b72222" class="white--text">
                    ອາໄຫຼ່ທີນໍາອອກຈາກສາງ
                </v-card-title>
                <div style="display: flex; justify-content: flex-start;margin-left: 30px;margin-top: 10px;">
                    <p style="margin-right: 10px;font-size: 20px">ລວມຄ່າໃຊ້ຈ່າຍທັງໝົດ: </p>
                    <p style="font-size: 25px;margin-top: -5px;">{{ sumFooter?.totalFixCost }}</p>
                </div>
                <div style="display: flex; margin-top: 10px;"></div>
                <v-data-table :items-per-page="5" :headers="data_list_showFix" :items="showFix_data_list"
                    :search="search">
                    <template v-slot:item="row">
                        <tr>
                            <td><v-avatar><img :src="row.item.img"></v-avatar></td>
                            <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                            <td>{{ row?.item?.f_BRANCH }}</td>
                            <td>{{ row?.item?.qty_Fix }}</td>
                            <td>{{ row?.item?.total_Price }}</td>
                            <td>{{ row?.item?.total_ }}</td>


                            <td>{{ row?.item?.add_on }}</td>
                            <td>{{ row?.item?.description }}</td>
                            <td>{{ row?.item?.dateFix }}</td>
                            <td>{{ row?.item?.fix_Detail }}</td>
                            <td>{{ row?.item?.location_fix }}</td>

                            <td>{{ getBranchName(row?.item?.branch_inventory) }}</td>
                            <td>
                                <v-btn small color="primary" class="card-shadow" @click="onGetinbox(row.item.fixId)">
                                    <v-icon>mdi-clipboard-text</v-icon>ລາຍລະອຽດ
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </v-card>


        <v-dialog v-model="dialogVisible" max-width="800px" style="max-height: 800px;">
            <v-card>
                <v-card-title style="font-size: 24px;">ປ້ອນຂໍ້ມູນ</v-card-title>
                <v-card-actions>
                    <v-btn style="font-size: 20px;" color="primary" @click="print">
                        <v-icon>mdi-printer</v-icon>ພິມບິນ</v-btn>


                </v-card-actions>
                <div style="display: flex;">
                    <v-card-text style="font-size: 18px;">
                        <div>
                            <label for="fixId">ID:</label>
                            <span id="fixId">{{ fixId }}</span>
                        </div>
                        <div>
                            <label for="h_VICIVLE_NUMBER">ຫົວລັດ :</label>
                            <span id="h_VICIVLE_NUMBER">{{ h_VICIVLE_NUMBER }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">ຫາງລົດ :</label>
                            <span id="qty_offer">{{ f_BRANCH }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">ຈໍານວນ :</label>
                            <span id="qty_offer">{{ qty_Fix }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">ລາ​ຄາ​ລວມ :</label>
                            <span id="qty_offer">{{ total_Price }}</span>
                        </div>

                        <div>
                            <label for="qty_offer">ລາຍລະອຽດ :</label>
                            <span id="qty_offer">{{ description }}</span>
                        </div>
                        <div>
                            <label for="qty_offer">ວັນທີ :</label>
                            <span id="qty_offer">{{ dateFix }}</span>
                        </div>
                        <div>
                            <label for="add_on">ລາຍຈ່າຍເພີນເຕີມ(ຄ່າຊ່າງ) :</label>
                            <span id="add_on">{{ add_on }}</span>
                        </div>
                        <div>
                            <label for="location_fix">ສະຖານທີ :</label>
                            <span id="location_fix">{{ location_fix }}</span>
                        </div>
                        <div>
                            <label for="fix_Detail">ລາຍລະອຽດ :</label>
                            <span id="fix_Detail">{{ fix_Detail }}</span>
                        </div>
                    </v-card-text>
                    <v-card-text style="display: flex;">
                        <!-- v-if=" add_on <= 0" -->
                        <div>
                            <label for="add_on">ລາຍຈາຍເພີນ(ຄ່າສ່າງ)</label>
                            <!-- <span id="add_on">{{ add_on }}</span> -->
                            <v-text-field label="*ຄ່າຊ່າງ" dense outlined background-color="#f5f5f5" v-model="add_on">
                            </v-text-field>
                        </div>
                        <v-btn style="margin-top: -10px; margin-left: 10px;" color="primary" @click="onSubmit">
                            <v-icon>mdi-border-color</v-icon>ເເກ່ໄຂ
                        </v-btn>
                    </v-card-text>

                    <!-- <div>
                        <label for="location_fix">ສະຖານທີ</label>
                        <span id="location_fix">{{ location_fix }}</span>
                        <v-text-field label="*location_fix" dense outlined background-color="#f5f5f5"
                            v-model="location_fix"></v-text-field>
                    </div> -->

                </div>
                <v-card-actions>

                    <v-btn color="red darken-1" text @click="closeDialog">ຍົກເລີກ</v-btn>


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
                        <span> ອີເມວ: kounkham@Mining|ເວັບໄຊ: kounkham</span>
                    </div>

                </v-row>
                <br>
                <div class="text-center"
                    style="display:flex;justify-content:center;font-size:19px;font-weight:bold;margin-top: 15px;">
                    ລາຍງານ ສິນຄ້າ </div>

                    <div v-for="(item, i) in showFix_data_list" :key="i" style="margin-top: 10px;font-size: 13px;">
                 
                    <p>ວັນທີ :
                        {{ item?.dateFix }}
                    </p>
                  
                </div>


                <table
                    style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 13px;margin-top: 50px;">
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">

                       
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຮູບພາບ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຫົວລັດ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຫາງລົດ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ຈໍານວນ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold"> ລາ​ຄາ​</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ລາຍຈ່າຍເພີນ ຄ່າຊ່າງ</td>

                    


                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ສະຖານທີ</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">ເເຂວງ</td>



                    </tr>
                    <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
                        v-for="(item, i) in showFix_data_list" :key="i">

                        
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class="font-weight-bold">
                            <img :src="item.img" :alt="item.item_name" style="width:50px; height:50px;">
                        </td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.h_VICIVLE_NUMBER }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.f_BRANCH }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.qty_Fix }}</td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.total_Price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}
                        </td>
                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.add_on?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                                ',') }}
                        </td>

                  

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ item?.location_fix }}</td>

                        <td style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                            class=" font-weight-bold">{{ getBranchName(item?.branch_inventory) }}</td>

                    </tr>
                </table>

                <div v-for="(item, i) in showFix_data_list" :key="i" style="margin-top: 50px;font-size: 15px;">
                    <p>
                        ລາຍລະອຽດ :
                        {{ item?.description?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g,
                            ',') }}
                    </p>
                    <p>ລາຍລະອຽດ ເເປງ :
                        {{ item?.fix_Detail }}
                    </p>
                    <p>ລາຍລະອຽດ ອາໄຫຼ່ :
                        {{ item?.detail_A_lai }}
                    </p>
                    <p>ລາ​ຄາ​ລວມ :
                        {{ item?.finalTotalPrice }}
                    </p>
                </div>

                <div
                    style="margin-top:100px;display:flex;justify-content:space-between;padding-left:20px; font-size: 16px">
                    <div>
                        <div>ຜູ້ສະເໜີ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ................
                        </div>

                    </div>
                    <div>
                        <div>ບັນຊີ-ການເງີນ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ................
                        </div>
                    </div>
                    <div>
                        <div>ຜູ້ຮັບ</div>
                        <div style="height: 50px;"></div>
                        <div style="display:flex;justify-content:space-between">
                            ................
                        </div>
                    </div>

                </div>
            </div>


        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            sumFooter: null,
            search: '',
            truck_table_headers: [
                { text: 'ທະບຽນຫົວລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ທະບຽນຫາງລົດ', value: 'h_BRANCH' },
                { text: 'ຄ່າອາໄຫຼ່ໃນການເເປງ', value: 'total_Price' },
                { text: 'ວັນທີເເປງ', value: 'dateFix' },
                { text: 'ຈໍານວນຄັ້ງໃນການເເປງ', value: 'totalTimeFix' },
                { text: 'ຄ່າໃຊ້ຈ່າຍທັງໜົດໃນການເເປງ', value: 'totalFixCost' },
            ],
            truck_data_list: [],
            loading_processing: false,
            data_list_showFix: [
                { text: 'ຮູບພາບ', value: 'img' },

                // { text: 'ID', value: 'fixId' }, 
                { text: 'ຫົວລັດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຫາງລົດ', value: 'f_BRANCH' },
                { text: 'ຈໍານວນ', value: 'qty_Fix' },
                { text: 'ລາ​ຄາ​', value: 'total_Price' },
                { text: 'ລາ​ຄາ​ລວມ', value: 'finalTotalPrice' },
                { text: 'ລາຍຈ່າຍເພີນເຕີມ(ຄ່າຊ່າງ)', value: 'add_on' },
                { text: 'ລາຍລະອຽດ', value: 'description' },
                { text: 'ວັນທີ', value: 'dateFix' },
                { text: 'ສະຖານທີ ', value: 'location_fix' },
                { text: 'ລາຍລະອຽດ', value: 'branch_inventory' },
                { text: 'ເເຂວງ', value: 'branch_inventory' },
                { text: 'ລາຍລະອຽດ', value: '' },

            ],
            showFix_data_list: [],
            branches: {
                2: 'Thakhaek',
                3: 'XiengKhouang',
                4: 'Savannakhet',
                5: 'Vientiane',

            },
            truct_footer_data_list: [],
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນ'],
            f_CARD_NO: '',
            cars_list: [],
            item_id: '',
            hkey_id: '',
            fkey_id: '',
            unit_price: '',
            img: '',
            add_on: '',
            qty_offer: '',
            totalMoney: '',
            dateFix: '',
            f_BRANCH: '',
            qty_Fix: '',
            total_Price: '',
            description: '',
            offerManName: '',
            job: '',
            f_CARD_NO: '',
            item_name: '',
            pocode: '',
            dateCreate: '',
            offer_CODE: '',
            fix_Detail: '',
            printData: null,
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
            location_fix: '',
            // Other data properties...
            search: '',
        };
    },
    computed: {},
    mounted() {
        this.onGetshowFix(); //
        this.onGetshowdata_table();
    },
    methods: {
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
        getBranchName(branchInventory) {
            return this.branches[branchInventory] || '';
        },
        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('FixReport.service', {
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    this.truck_data_list = response.data;
                    this.sumFooter = response.sumFooter;
                } else {
                    this.showErrorAlert('Error', 'Failed to fetch data from the API');
                }
            } catch (error) {
                console.error('API error:', error);
                this.showErrorAlert('Error', 'Failed to fetch data from the API');
            } finally {
                this.loading_processing = false;
            }
        },
        showErrorAlert(title, message) {
            alert(`${title}: ${message}`);
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
                this.location_fix = response.data[0].location_fix; // Assuming you want the first item's qty_offer
                this.fix_Detail = response.data[0].fix_Detail; // Assuming you want the first item's qty_offer
                // Handle the response as needed, such as displaying a success message or handling errors
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
            console.log('fix_Detail:', this.fix_Detail);


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
                    fix_Detail: this.fix_Detail,
                };

                // Send the POST request to the API endpoint
                const response = await this.$axios.$post('/UpdateFixCost.service', requestData);

                console.log('UpdateFixCost API response:', response);

                // Close the dialog after submission
                this.closeDialog();

                if (response?.status === '00') {
                    this.loading_processing = false;
                    this.print();
                    // Other actions upon successful creation


                    // Display success alert using SweetAlert2
                    await Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Your message here', // Customize the success message
                        confirmButtonText: 'OK',
                    });
                    // window.location.reload();
                }

                // You can handle the response here, such as showing a success message or updating UI
            } catch (error) {
                console.error('UpdateFixCost API error:', error);
                // Handle the error, such as displaying an error message

            }
            this.onGetshowFix()
            // window.location.reload();
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
            }
        },
    },
};
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media print {
    @page {
        size: A4;
        margin: 1in;
    }

    body * {
        visibility: hidden;
    }

    #print,
    #print * {
        visibility: visible;
    }

    #print {
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0px;
    }
}
</style>
<template>
    <div>
        <v-card class="card-shadow" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#a05de1" class="white--text">
                ອາໄລ
            </v-card-title>
            <v-row>
                <div>
                    <v-col>
                        <!-- <v-badge :content="" color="teal"> -->
                        <v-btn style="border: 2px solid rgb(160,93,225)" to="./product-list">ນໍາເຂົ້າອາໄລ</v-btn>
                        <v-badge style="margin-left: -35px;" :content="total_PO" color="teal">
                        </v-badge>
                        <!-- </v-badge> -->
                    </v-col>
                </div>
                <!-- <div>
                    <v-col>
                        <v-btn style="width: 200px;" to="./add">ເພີ່ມຂໍ້ມູນ ອາໄລ ບໍລິສັດ ຫຼື ຮ້ານ</v-btn>
                    </v-col>
                </div> -->
                <!-- <div>
                    <v-col>
                        <v-btn to="./oil_paid">ສະເໝີ ໃຊ້</v-btn>
                    </v-col>
                </div> -->
                <!-- <div style="margin-top:10px" class="ml-10">
                    <v-btn color="#e91e63" class="white--text"
                        @click="print"><v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ</v-btn>
                </div> -->
                <div class="mt-2 ml-4 pt-6" style="width: 500px; ">
                    <v-text-field dense solo flat background-color="#f5f5f5" v-model="search" placeholder="ຄົ້ນຫາ..."
                        prepend-inner-icon="mdi-magnify" clearable></v-text-field>
                </div>
            </v-row>

            <v-data-table :items-per-page="5" :headers="truck_table_headers" :items="truck_data_list" :search="search">
                <template v-slot:item="row">
                    <tr>
                        <td><v-avatar style="width: 80px; height: 80px;"><img :src="row.item.img"
                                    style="width:100%; height:100%;" /></v-avatar></td>
                        <td style="font-size: 18px;">{{ row?.item?.item_name }}</td>
                        <td style="font-size: 18px;">{{ row?.item?.qty }}</td>
                    </tr>
                </template>
            </v-data-table>

        </v-card>
        <!-- Data Table printer -->
        <div style="display:none">
            <div id="modalInvoice">
                <v-row>
                    <v-col cols="3">
                        <!-- <img class="mx-auto" src="../assets/images/khounkham.png" height="90px" cover /> -->
                    </v-col>
                    <v-col cols="9">
                        <div style="display:flex;justify-content:start;flex-direction:column;align-items:start">

                            <span style="font-size:19px">

                                <Noti />

                            </span>

                            <span style="font-size:18px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
                                ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                            <span style="font-size:18px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
                                |
                                ເວັບໄຊ: kounkham</span>
                        </div>
                    </v-col>

                </v-row>
                <br>



                <div
                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                    <div>ບັນຊີຂົນສົ່ງ</div>
                    <div style="height: 50px;"></div>
                    <div style="display:flex;justify-content:space-between">
                        ...............................
                    </div>
                </div>
                <div
                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                    <div>ບັນຊີຂົນສົ່ງ</div>
                    <div style="height: 50px;"></div>
                    <div style="display:flex;justify-content:space-between">
                        ...............................
                    </div>
                </div>
                <div
                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                    <div>ບັນຊີຂົນສົ່ງ</div>
                    <div style="height: 50px;"></div>
                    <div style="display:flex;justify-content:space-between">
                        ...............................
                    </div>
                </div>
            </div>
        </div>
        <!-- Data Table printer -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            total_PO: '',


            truck_table_headers: [

                { text: 'ຮູບພາບ', value: 'img' },
                { text: 'ລາໄລ', value: 'item_name' },
                { text: 'ຈໍານວນ', value: 'qty' },

            ],
            truck_data_list: [],

        }
    },
    mounted() {
        this.total_count()
        this.USER_ID = localStorage.getItem('USER_ID')
        this.USER_NAME = localStorage.getItem('USER_NAME')
        this.USER_ROLE = localStorage.getItem('USER_ROLE')
        this.onGetshowdata_table(); // Fetch truck footer data when component is mounted

    },
    // Your component logic here
    methods: {
        total_count() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/getNotiTab3.service', {
                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    this.loading_processing = false;

                    if (data && data.status === '00') {
                        this.total_PO = data.total_PO;
                    } else {
                        // Handle API response with error status
                        swal.fire({
                            icon: 'error',
                            text: data?.message || 'Failed to fetch data',
                        });
                    }
                }).catch((error) => {
                    this.loading_processing = false;
                    console.log(error);
                    // Display error alert using SweetAlert2
                    swal.fire({
                        icon: 'error',
                        text: 'Failed to fetch data from the API',
                    });
                });
            } catch (error) {
                this.loading_processing = false;
                console.log(error);
                // Display error alert using SweetAlert2
                swal.fire({
                    icon: 'error',
                    text: error.toString(),
                });
            }
        },
        print() {
            const modal = document.getElementById("modalInvoice");
            const cloned = modal.cloneNode(true);
            let section = document.getElementById("print");
            if (!section) {
                section = document.createElement("div");
                section.id = "print";
                document.body.appendChild(section);
            }
            section.innerHTML = "";
            section.appendChild(cloned);
            window.print();
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
        // Other methods...
    },
};
</script>

<style>
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

.v-btn {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 150px;
}
</style>
<template>
    <div>
        <v-card class="card-shadow mb-5" rounded="lg" style="border:0.5px solid #e0e0e0;border-radius:3px">
            <v-card-title style="background-color:#e15d9e" class="white--text">
                ບັນຊີ
            </v-card-title>
            <v-row>
                <div>
                    <v-col>
                        <v-btn style="border: 2px solid rgb(225,93,158)"
                            to="./purchase_order_paper">ສ້າງບິນສັ່ງຊື້</v-btn>
                        <v-badge style="margin-left: -35px;" :content="total_Offer_List" color="teal">
                        </v-badge>
                    </v-col>
                </div>

                <div class="mt-2 ml-4 pt-6" style="width: 500px; ">
                    <v-text-field dense solo flat background-color="#f5f5f5" v-model="search" placeholder="ຄົ້ນຫາ..."
                        prepend-inner-icon="mdi-magnify" clearable></v-text-field>
                </div>
            </v-row>
        </v-card>
        <v-card class="card-shadow  mb-5" rounded="lg" style="border: 0.5px solid #e0e0e0; border-radius: 3px;">
            <v-card-title style="background-color: #b722b7" class="white--text">
                <v-icon color="white" size="55">mdi mdi-truck-alert</v-icon>
                ປະວັດການເບີກທອນອາໄລ ຂອງລົດ
                <!-- <v-btn ref="btn1" value="1" @click="selectedCard = '1'" @mouseover="changeColor('	#009fff', $refs.btn1)"
                    @mouseleave="changeColor('white', $refs.btn1)"
                    style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(221, 5, 245);">
                    <v-icon style="color: rgb(221, 5, 245);" size="55">mdi-printer</v-icon>
                    ລາຍລະອຽດ
                </v-btn> -->
                <v-col>
                    <v-btn style="border: 2px solid rgb(225,93,158);width: 200px;" :to="{ name: 'dta' }">ລາຍລະອຽດການເບີກທອນອາໄລ</v-btn>
                </v-col>
            </v-card-title>
            <v-data-table :headers="truck_table_headers" :items="truck_data_list" :search="search">
                <template v-slot:item="row">

                    <tr>

                        <td>{{ row?.item?.h_VICIVLE_NUMBER }}</td>
                        <td>{{ row?.item?.h_BRANCH }}</td>
                        <td>{{ row?.item?.total_Price }}</td>
                        <td>{{ row?.item?.dateFix }}</td>
                        <td>{{ row?.item?.totalTimeFix }}</td>
                        <td>{{ row?.item?.totalFixCost }}</td>



                    </tr>

                </template> <!-- Your data table content here -->
            </v-data-table>
        </v-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            total_Offer_List: '',
            total_FuelUnpaid: '',
            truck_table_headers: [
                { text: 'ທະບຽນຫົວລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ທະບຽນຫາງລົດ', value: 'h_BRANCH' },
                { text: 'ຄ່າອາໄຫຼ່ໃນການເເປງ', value: 'total_Price' },
                { text: 'ວັນທີເເປງ', value: 'dateFix' },
                { text: 'ຈໍານວນຄັ້ງໃນການເເປງ', value: 'totalTimeFix' },
                { text: 'ຄ່າໃຊ້ຈ່າຍທັງໜົດໃນການເເປງ', value: 'totalFixCost' },
            ],
            truck_data_list: [],

        }
    },
    computed: {

    },
    mounted() {

        this.onGetshowdata_table();
        this.total_count()
        this.USER_ID = localStorage.getItem('USER_ID')
        this.USER_NAME = localStorage.getItem('USER_NAME')
        this.USER_ROLE = localStorage.getItem('USER_ROLE')


    },
    // Your component logic here
    methods: {
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },

        total_count() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/getNotiTab3.service', {
                    toKen: localStorage.getItem('toKen'),
                }).then((data) => {
                    this.loading_processing = false;

                    if (data && data.status === '00') {
                        this.total_Offer_List = data.total_Offer_List;
                        this.total_FuelUnpaid = data.total_FuelUnpaid;
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
        async onGetshowdata_table() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('FixReport.service', {
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
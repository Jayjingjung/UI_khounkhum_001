<template>
    <div>
        <div>
            <v-card class="card-shadow mb-4" rounded="lg">
                <v-card-title style="display:flex;background-color:#E57373;color:white">
                    <!-- <v-btn elevation="0" dark width="120" height="50" small color="white" to="dashboard">
                        <v-icon size="35" color="#E57373">mdi-arrow-left-bold-box</v-icon>
                        <span style="color: #E57373;font-weight: bold;font-size: 20px;">ຫນ້າລັກ</span>
                    </v-btn> -->
                    <v-spacer></v-spacer>
                    ???? <!-- Add your title here -->
                    <v-spacer></v-spacer>
                    <v-btn style="background-color: aliceblue;" elevation="0" dark width="250px" height="50" small
                        color="white" to="InvoiceDeptInsert">
                        <span style="color: #24ab70;font-weight: bold;font-size: 20px;">ເອກກະສານ ອື່ນໆ</span>
                    </v-btn>
                </v-card-title>
                <div style="display: flex; justify-content: center;">
                    <v-col cols="12" md="4" sm="6" style="justify-self: start;">
                        <v-icon color="black">mdi-account</v-icon>
                        <span>ບ້ວງ</span>
                        <v-select style="width: 250px;" outlined dense label="ບ້ວງ" v-model="nameOfBouang"
                            :items="buang_data_list" item-text="nameOfBouang" item-value="nameOfBouang" />
                    </v-col>

                    <v-col cols="12" md="4" sm="6" style="justify-self: start;">
                        <v-btn color="primary" @click="documentlinsOffice">
                            Send ບ້ວງ
                        </v-btn>
                    </v-col>

                    <v-col cols="12" md="4" sm="6" style="justify-self: start;">
                        <v-icon color="black">mdi-account</v-icon>
                        <span>ລູກຄ້າ</span>
                        <v-select style="width: 250px;" outlined dense label="ລູກຄ້າ" v-model="customer_id"
                            :items="customer_data_list" item-text="customerName" item-value="id" />
                    </v-col>
                </div>

                <div style="display: flex; overflow-x: auto; width: 1780px; margin-left: 10px;">
                    <v-list style="display: flex;margin-left: 5px;" v-model="selectedCard">

                        <v-btn ref="btn1" value="1" @click="selectedCard = '1'"
                            @mouseover="changeColor('#FFE5FF', $refs.btn1)"
                            @mouseleave="changeColor(selectedCard === '1' ? '#fff5ea' : 'white', $refs.btn1)"
                            :style="{ backgroundColor: selectedCard === '1' ? '#fff5ea' : 'white', color: 'black', height: '65px', border: '1px solid rgb(0, 0, 0)' }">
                            <v-icon style="color: rgb(9, 44, 112);" size="44">mdi-file-document-edit-outline</v-icon>
                            ບັບຊີເປັນຜູ້ຄີ 1
                            <span>[ເອກກະສານ]</span>

                        </v-btn>
                    </v-list>

                    <v-list style="display: flex;margin-left: 5px;" v-model="selectedCard">
                        <v-btn ref="btn2" value="2" @click="selectedCard = '2'"
                            @mouseover="changeColor('#FFE5FF', $refs.btn2)"
                            @mouseleave="changeColor(selectedCard === '2' ? '#fff5ea' : 'white', $refs.btn2)"
                            :style="{ backgroundColor: selectedCard === '2' ? '#fff5ea' : 'white', color: 'black', height: '65px', border: '1px solid rgb(0, 0, 0)' }">
                            <v-icon style="color: rgb(121,17,225);" size="44">mdi-file-pdf-box</v-icon>
                            ສະໜາມເປັນຜູ້ຄີ 2
                            <span>[ບົດລາຍງານ/ຜົນວິໃຈເເຮ່]</span>
                        </v-btn>
                    </v-list>

                    <v-list style="display: flex;margin-left: 5px;" v-model="selectedCard">
                        <v-btn ref="btn3" value="3" @click="selectedCard = '3'"
                            @mouseover="changeColor('#FFE5FF', $refs.btn3)"
                            @mouseleave="changeColor(selectedCard === '3' ? '#fff5ea' : 'white', $refs.btn3)"
                            :style="{ backgroundColor: selectedCard === '3' ? '#fff5ea' : 'white', color: 'black', height: '65px', border: '1px solid rgb(0, 0, 0)' }">
                            <v-icon style="color: rgb(250, 128, 114);" size="44">mdi-account-hard-hat-outline</v-icon>
                            ສະໜາມເປັນຜູ້ຄີ 3
                            <span>[ວຽກພາກສະຫນາມ/ຮູບພາບ]</span>

                        </v-btn>
                    </v-list>

                    <v-list style="display: flex;margin-left: 5px;" v-model="selectedCard">
                        <v-btn ref="btn4" value="4" @click="selectedCard = '4'"
                            @mouseover="changeColor('#FFE5FF', $refs.btn4)"
                            @mouseleave="changeColor(selectedCard === '4' ? '#fff5ea' : 'white', $refs.btn4)"
                            :style="{ backgroundColor: selectedCard === '4' ? '#fff5ea' : 'white', color: 'black', height: '65px', border: '1px solid rgb(0, 0, 0)' }">
                            <v-icon style="color:rgb(17,225,121);" size="44">mdi-cash</v-icon>
                            ບັບຊີເປັນຜູ້ຄີເປັນຜູ້ຄີ 4
                            <span>[ລາຍຮັບ/ລາຍຈ່າຍ]</span>


                        </v-btn>
                    </v-list>

                    <v-list style="display: flex;margin-left: 5px;" v-model="selectedCard">
                        <v-btn ref="btn5" value="5" @click="selectedCard = '5'"
                            @mouseover="changeColor('#FFE5FF', $refs.btn5)"
                            @mouseleave="changeColor(selectedCard === '5' ? '#fff5ea' : 'white', $refs.btn5)"
                            :style="{ backgroundColor: selectedCard === '5' ? '#fff5ea' : 'white', color: 'black', height: '65px', border: '1px solid rgb(0, 0, 0)' }">
                            <v-icon style="color: rgb(225,17,17);" size="44">mdi-cash-minus</v-icon>
                            ບັບຊີເປັນຜູ້ຄີເປັນຜູ້ຄີ 5
                            <span>[ຫນີ້ຕ້ອງຮັບ-ຫນີ້ຕ້ອງສົ່ງ]</span>

                        </v-btn>
                    </v-list>

                    <v-list style="display: flex;margin-left: 5px;" v-model="selectedCard">
                        <v-btn ref="btn6" value="6" @click="selectedCard = '6'"
                            @mouseover="changeColor('#FFE5FF', $refs.btn6)"
                            @mouseleave="changeColor(selectedCard === '6' ? '#fff5ea' : 'white', $refs.btn6)"
                            :style="{ backgroundColor: selectedCard === '6' ? '#fff5ea' : 'white', color: 'black', height: '65px', border: '1px solid rgb(0, 0, 0)' }">
                            <v-icon style="color: rgb(0, 128, 0);" size="44">mdi-cash-sync</v-icon>
                            ບັບຊີເປັນຜູ້ຄີເປັນຜູ້ຄີ 6 [ ກໍາໄລຂາດທືນ]
                        </v-btn>
                    </v-list>

                </div>
                <!-- selectedCard==1 -->
                <div v-if="selectedCard === '1'">

                <document/>
                </div>
                <!-- selectedCard==1 -->
                <div v-if="selectedCard === '2'">
                    <v-col cols="12" md="4" sm="6">
                        2</v-col>
                </div>
                <div v-if="selectedCard === '3'">
                    <v-col cols="12" md="4" sm="6">
                        3
                    </v-col>
                </div>
                <div v-if="selectedCard === '4'">
                    <v-col cols="12" md="4" sm="6">
                        4</v-col>
                </div>

                <div v-if="selectedCard === '5'">
                    <v-col cols="12" md="4" sm="6">
                        5</v-col>
                </div>
                <div v-if="selectedCard === '6'">
                    <v-col cols="12" md="4" sm="6">
                        6</v-col>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            bound: '',
            nameOfBouang: '',
            customer_id: '',
            search: '',
            selectedBuang: null,
            buang_data_list: [],
            loading_processing: false,
            selectedCard: null,
            customer_data_list: [],
        }
    },
    mounted() {
        this.onGetbuang(); // Fetch Bouang data when component is mounted
        this.onGetCustomerList(); // Fetch Bouang data when component is mounted
     
    },
    methods: {
        async documentlinsOffice() {
            try {
                const response = await this.$axios.$post('/listDocumentAllBySearch.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
                    bouang: this.nameOfBouang,
                    company: this.company,
                    type: this.selectedProduct,
                });

                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || [];
                } else {
                    this.report_listitemOffice = [];
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
                console.error(error);
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

        async onGetbuang() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('getBouangAll.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response?.status === '00') {
                    this.buang_data_list = response?.data;
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
     
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
    },
}
</script>

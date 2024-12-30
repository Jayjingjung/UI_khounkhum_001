<template>
    <v-container>
        <v-card-actions>
            <div v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                <v-btn elevation="0" dark width="30" height="30" color="#00E676" @click="$router.back()">
                    <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                </v-btn>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="#00E676" style="font-size: 20px; font-weight: bold;" to="borhinsetting">
                ຈັດການບໍ່ຕ່າງໆ
            </v-btn>
        </v-card-actions>
        <div class="mb-8 mt-6" style="font-size: 20px; font-weight: bold;">
            ຝ່າຍສຳຫຼວດ ແລະ ຂຸດຄົ້ນບໍ່ແຮ່
            <hr>
        </div>
        <!-- ລາຍຈ່າຍ  -->
        <v-dialog v-model="sisternokDoc" max-width="790" persistent disable-esc>
            <v-card class="mx-auto" max-width="790">
                <div class="mt-4">
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                            <v-btn @click="refresher" rounded color="#00E676">
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນລາຍຈ່າຍ(Nok)
                            </div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="nokSearch" :style="{ width: '300px' }"></v-text-field>
                            <div>
                                <v-card-actions>
                                    <div class="ml-10" style="font-weight:bold">
                                        ຊື່ເອກະສານ
                                        <v-divider></v-divider>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div style="font-weight:bold">
                                        ວັນທີ່,ເດືອນ,ປີ
                                        <v-divider></v-divider>
                                    </div>
                                </v-card-actions>
                            </div>
                        </v-card>
                        <div v-if="sisternok.length">
                            <div v-for="(item, index) in sisternok" :key="index">
                                <v-card-actions>
                                    <v-btn text @click="showResultpdf(item.file)">
                                        <v-icon color="#00E676">
                                            mdi-progress-download
                                        </v-icon>
                                    </v-btn>
                                    <div @click="showResultpdf(item.file)" class="hoverable">
                                        {{ item.type }}
                                        <v-divider></v-divider>
                                    </div>
                                    <v-spacer></v-spacer>
                                    ({{ item.dateInsert }})
                                </v-card-actions>
                            </div>
                        </div>
                        <div v-else class="text-center mt-5" style="font-size: 16px; color:crimson;">
                            <p>ບໍ່ມີຂໍ້ມູນ</p>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <v-row>
            <!-- ຂໍ້ມູນຜົນການສຳຫຼວດ -->
            <v-dialog v-model="surveydocument" max-width="790" persistent disable-esc>
                <v-card class="mx-auto" max-width="790">
                    <div class="mt-4">
                        <v-card-text>
                            <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                                <v-btn @click="refresher" rounded color="#00E676">
                                    <v-icon>
                                        mdi-arrow-collapse-left
                                    </v-icon>
                                </v-btn>
                                <div class="text-center font-weight-bold" style="font-size: 20px">
                                    ຂໍ້ມູນຜົນການສຳຫຼວດ</div>
                                <v-divider></v-divider>
                                <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                    @input="filteredServey" :style="{ width: '300px' }"></v-text-field>
                                <div>
                                    <v-card-actions>
                                        <div class="ml-10" style="font-weight:bold">
                                            ຊື່ເອກະສານ
                                            <v-divider></v-divider>
                                        </div>
                                        <v-spacer></v-spacer>
                                        <div style="font-weight:bold">
                                            ວັນທີ່,ເດືອນ,ປີ
                                            <v-divider></v-divider>
                                        </div>
                                    </v-card-actions>
                                </div>
                            </v-card>
                            <div v-if="filterServey.length">
                                <div v-for="(item, index) in filterServey" :key="index">
                                    <v-card-actions>
                                        <v-btn text @click="showResultpdf(item.file)">
                                            <v-icon color="#00E676">
                                                mdi-progress-download
                                            </v-icon>
                                        </v-btn>
                                        <div @click="showResultpdf(item.file)" class="hoverable">
                                            {{ item.type }}
                                            <v-divider></v-divider>
                                        </div>
                                        <v-spacer></v-spacer>
                                        ({{ item.dateInsert }})
                                    </v-card-actions>
                                </div>
                            </div>
                            <div v-else class="text-center mt-5" style="font-size: 16px; color:crimson;">
                                <p>ບໍ່ມີຂໍ້ມູນ</p>
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </v-dialog>
            <!-- ຂໍ້ມູນຮເຈາະ  -->
            <v-dialog v-model="filedocuments" max-width="790" persistent disable-esc>
                <v-card class="mx-auto" max-width="790">
                    <div class="mt4">
                        <v-card-text>
                            <!-- Section Header -->
                            <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                                <v-btn @click="refresher" rounded color="#00E676">
                                    <v-icon>mdi-arrow-collapse-left</v-icon>
                                </v-btn>
                                <div class="text-center font-weight-bold" style="font-size: 20px">
                                    ຂໍ້ມູນຮູເຈາະ
                                </div>
                                <v-divider></v-divider>

                                <!-- Search Field -->
                                <v-text-field label="ຄົ້ນຫາ" v-model="search" append-icon="mdi-magnify"
                                    @input="filterReportList" :style="{ width: '300px' }"></v-text-field>
                                <div>
                                    <v-card-actions>
                                        <div class="ml-10" style="font-weight:bold">
                                            ຊື່ຮູເຈາະ
                                            <v-divider></v-divider>
                                        </div>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </div>
                            </v-card>

                            <!-- Filtered List -->
                            <div v-if="filteredReportList.length">

                                <div v-for="item in filteredReportList" :key="item.key_id">
                                    <v-card-actions>
                                        <v-btn text @click="click2fuction(item.pic)">
                                            <v-icon color="#00E676">mdi-progress-download</v-icon>
                                        </v-btn>
                                        <div class="hoverable" @click="click2fuction(item.pic)">
                                            {{ item.full_Name_Hole_number }}
                                            <v-divider></v-divider>
                                        </div>
                                    </v-card-actions>
                                </div>
                            </div>
                            <div v-else class="text-center mt-5" style="font-size: 16px; color:crimson;">
                                <p>ບໍ່ມີຂໍ້ມູນ</p>
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </v-dialog>
            <!-- ຂໍ້ມູນວິໃຈຕົວຢ່າງ  -->
            <v-dialog v-model="testDoc" max-width="790" persistent disable-esc>
                <v-card class="mx-auto" max-width="790">
                    <div>
                        <v-card-text>
                            <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                                <v-btn @click="refresher" rounded color="#00E676">
                                    <v-icon>
                                        mdi-arrow-collapse-left
                                    </v-icon>
                                </v-btn>
                                <div class="text-center font-weight-bold" style="font-size: 20px">
                                    ຂໍ້ມູນວິໃຈຕົວຢ່າງ</div>
                                <v-divider></v-divider>
                                <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                    @input="functionvichai" :style="{ width: '300px' }"></v-text-field>
                                <div>
                                    <v-card-actions>
                                        <div class="ml-10" style="font-weight:bold">
                                            ຊື່ເອກະສານ
                                            <v-divider></v-divider>
                                        </div>
                                        <v-spacer></v-spacer>
                                        <div style="font-weight:bold">
                                            ວັນທີ່,ເດືອນ,ປີ
                                            <v-divider></v-divider>
                                        </div>
                                    </v-card-actions>
                                </div>
                            </v-card>
                            <div v-if="vichai.length">
                                <div v-for="(item, index) in vichai" :key="index">
                                    <v-card-actions>
                                        <v-btn text @click="showResultpdf(item.file)">
                                            <v-icon color="#00E676">
                                                mdi-progress-download
                                            </v-icon>
                                        </v-btn>
                                        <div @click="showResultpdf(item.file)" class="hoverable">
                                            {{ item.type }}
                                            <v-divider></v-divider>
                                        </div>
                                        <v-spacer></v-spacer>
                                        ({{ item.dateInsert }})
                                    </v-card-actions>
                                </div>
                            </div>
                            <div v-else class="text-center mt-5" style="font-size: 16px; color:crimson;">
                                <p>ບໍ່ມີຂໍ້ມູນ</p>
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </v-dialog>
            <!-- ຂໍ້ມູນລາຍຈ່າຍ -->
            <v-dialog v-model="payfile" max-width="790" persistent disable-esc>
                <v-card class="mx-auto" max-width="790">
                    <div class="mt-4">
                        <v-card-text>
                            <v-card style="position: sticky; top: 0; z-index: 1;" flat>
                                <v-btn @click="refresher" rounded color="#00E676">
                                    <v-icon>
                                        mdi-arrow-collapse-left
                                    </v-icon>
                                </v-btn>
                                <div class="text-center font-weight-bold" style="font-size: 20px">
                                    ຂໍ້ມູນລາຍຈ່າຍ</div>
                                <v-divider></v-divider>
                                <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                    @input="functionpay" :style="{ width: '300px' }"></v-text-field>
                                <div>
                                    <v-card-actions>
                                        <div class="ml-10" style="font-weight:bold">
                                            ຊື່ເອກະສານ
                                            <v-divider></v-divider>
                                        </div>
                                        <v-spacer></v-spacer>
                                        <div style="font-weight:bold">
                                            ວັນທີ່,ເດືອນ,ປີ
                                            <v-divider></v-divider>
                                        </div>
                                    </v-card-actions>
                                </div>
                            </v-card>
                            <div v-if="payment.length">

                                <div v-for="(item, index) in payment" :key="index">
                                    <v-card-actions>
                                        <v-btn text @click="showResultpdf(item.file)">
                                            <v-icon color="#00E676">
                                                mdi-progress-download
                                            </v-icon>
                                        </v-btn>
                                        <div @click="showResultpdf(item.file)" class="hoverable">
                                            {{ item.type }}
                                            <v-divider></v-divider>
                                        </div>
                                        <v-spacer></v-spacer>
                                        ({{ item.dateInsert }})
                                    </v-card-actions>
                                </div>
                            </div>
                            <div v-else class="text-center mt-5" style="font-size: 16px; color:crimson;">
                                <p>ບໍ່ມີຂໍ້ມູນ</p>
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </v-dialog>
            <v-container fluid fill-height>
                <v-row justify="center" align="center">
                    <v-col cols="auto">
                        <v-card color="#E0F7FA" max-width="300">
                            <!-- v-if="USER_ROLE !== 'BOR-HIN-KHUAT'" -->
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="font-size: 20px; font-weight: bold;">ເອກະສານລວມຝ່າຍບັນຊີ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded to="re01akasarn">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn to="./HR/akasarn" color="success" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <!-- Loop through the branches and display each in v-col -->
            <v-col v-for="(branch, index) in branches" :key="index" cols="12" sm="6" md="3">
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch(branch.key_id)">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">
                                    {{ branch.b_name }}
                                </v-list-item-title>
                            </template>
                            <v-card-text>
                                {{ branch.location }}
                            </v-card-text>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title style="height: 20px; overflow: visible;">
                                            ເອກະສານຫ້ອງການ
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="showDocument(branch.b_name, `ບ້ານ${branch.b_name}`)" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title style="height: 20px; overflow: visible;">
                                            ລາຍຈ່າຍ
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="filterNokPay" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc(branch.key_id, `ບ້ານ${branch.b_name}`, 'pay1', 'ເອກະສານ', 'ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title style="height: 20px; overflow: visible;">
                                            ເອກະສານທີ່ກ່ຽວຂ້ອງ
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="seeDocument(branch.key_id, 'ເອກະສານບ້ານຄອນງົວ')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="insertDocument(branch.key_id, `ບ້ານ${branch.b_name}`, 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="filterSurvey" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc(branch.key_id, `ບ້ານ${branch.b_name}`, 'servey', 'ເອກະສານ', 'ເພີ່ມຂໍ້ມູນສຳຫຼວດ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title style="height: 20px; overflow: visible;">
                                            ຂໍ້ມູນຮູເຈາະ
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" @click="navigate(branch.key_id, `ບ້ານ${branch.b_name}`)"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="blue">mdi-test-tube-off</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="filterTest" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc(branch.key_id, `ບ້ານ${branch.b_name}`, 'testData', 'ເອກະສານ', 'ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterPayment">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc(branch.key_id, `ບ້ານ${branch.b_name}`, 'pay', 'ເອກະສານ', 'ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-message-image-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="toImage1(branch.key_id, `ບ້ານ${branch.b_name}`,)">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" @click="toImage(branch.key_id, `ບ້ານ${branch.b_name}`,)"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            search: '',
            sisternokDoc: false,
            surveydocument: false,
            filedocuments: false,
            testDoc: false,
            payfile: false,
            branches: [], // To store branch data from API
            filteredReportList: [],
            // USER_ROLE: "exampleRole", // Replace with actual role if needed
            toKen: "tZl011U2nNs9AdvQDIStduuOIc8yWmxw",
            sisternok1: [],
            sisternok: [],
            filterServey1: [],
            filterServey: [],
            vichai: [],
            vichai1: [],
            payment: [],
            payment1: [],
            selectedToken: null,
            key_id: null,
        };
    },
    mounted() {
        this.fetchBranches();
        this.USER_ROLE = this.$route.query.userRole || localStorage.getItem('userRole') || 'BOR-HIN-KHUAT';  // ຄ່າ default ເປັນ 'BOR-HIN-KHUAT
    },
    watch: {
        '$route.query.userRole': function (newRole) {
            this.USER_ROLE = newRole || 'BOR-HIN-KHUAT';  // if no value set it to default
            localStorage.setItem('userRole', this.USER_ROLE); // keep USER_ROLE in localStorage
        }
    },
    methods: {
        setTokenAndFetch(key_id) {
            console.log("Clicked key_id:", key_id);
            this.key_id = key_id;
            this.fetchAllData();
            this.ShowAllListOfHole();
        },
        filterNokPay() {
            this.sisternok1 = this.payAll.filter((item) => item.name === "pay1");
            this.sisternok = this.sisternok1
            this.sisternokDoc = true;
        },
        // Filter Survey Data
        filterSurvey() {
            this.filterServey1 = this.payAll.filter((item) => item.name === "servey");
            this.filterServey = this.filterServey1
            this.surveydocument = true;
        },
        // Filter Vichai Data
        filterTest() {
            this.vichai1 = this.payAll.filter((item) => item.name === "testData");
            this.vichai = this.vichai1
            this.testDoc = true;
        },
        // Filter Payment Data
        filterPayment() {
            this.payment1 = this.payAll.filter((item) => item.name === "pay");
            this.payment = this.payment1
            this.payfile = true;
        },
        fetchAllData() {
            try {
                this.$axios
                    .$post("/ShowAllResultOfServey.service", {
                        branchUser: this.USER_ROLE,
                        toKen: this.toKen,
                        key_id: this.key_id,
                    })
                    .then((response) => {
                        if (response?.status === "00") {
                            this.payAll = response.data; // Store all data here
                        } else {
                            this.payAll = [];
                        }
                    });
            } catch (error) {
                swal.fire({
                    icon: "error",
                    text: error.message,
                });
            }
        },
        async fetchBranches() {
            try {
                const response = await this.$axios.$post(
                    "/getShowBranchNew2024.service",
                    {
                        toKen: this.toKen,
                        key_id: this.key_id,
                    }
                );
                if (response?.status === "00") {
                    this.branches = response.data || [];
                } else {
                    this.branches = [];
                }
            } catch (error) {
                swal.fire({
                    icon: "error",
                    text: "Failed to fetch data: " + error.message,
                });
            }
        },
        ShowAllListOfHole() {
            try {
                this.$axios.$post('/ShowAllListOfHole.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,  // Use the token set from the button click
                    bound: this.bound,
                    key_id: this.key_id,
                }).then((data) => {
                    if (data?.status === "00") {
                        this.report_listitemOffice = data?.data;
                        this.filteredReportList = data?.data; // Initialize filtered list
                    } else {
                        this.report_listitemOffice = [];
                        this.filteredReportList = [];

                    }
                });
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error,
                });
                console.log(error);
            }
        },
        navigate(key_id, village) {
            this.$router.push({
                name: 'Add_a_hole',
                query: { key_id, village }
            });
        },
        seeDocument(key_id, number) {
            this.$router.push({
                name: 'documentation1',
                query: { key_id, label: number }
            });
        },
        insertDocument(key_id, buttonLabel, number, number1) {
            this.$router.push({
                name: 'nokdocumment',
                query: { key_id, label: buttonLabel, number, number1 }
            });
        },
        showDocument(bouang, village) {
            this.$router.push({
                name: "documentation2",
                query: { bouang, village },
            });
        },
        paymentdoc(key_id, valueDoc, number, number1, number2) {
            this.$router.push({
                name: 'paydocument',
                query: { key_id, label: valueDoc, number, number1, number2 }
            });
        },
        toImage(key_id, number) {
            this.$router.push({
                name: 'insertImage',
                query: { key_id, number }
            });
        },
        toImage1(key_id, number) {
            this.$router.push({
                name: 'showimage',
                query: { key_id, number }
            });
        },
        refresher() {
            window.location.reload();
        },
        nokSearch() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            if (this.searchQuery.trim() === '') {
                this.sisternok = this.sisternok1;
            } else {
                this.sisternok = this.sisternok1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        filteredServey() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            if (this.searchQuery.trim() === '') {
                this.filterServey = this.filterServey1;
            } else {
                this.filterServey = this.filterServey1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        // Filter report list based on search
        filterReportList() {
            const query = this.search.toLowerCase();
            this.filteredReportList = this.report_listitemOffice.filter(item =>
                item.full_Name_Hole_number.toLowerCase().includes(query)
            );
        },
        functionvichai() {
            if (this.searchQuery.trim() === '') {
                this.vichai = this.vichai1;
            } else {
                this.vichai = this.vichai1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        functionpay() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            if (this.searchQuery.trim() === '') {
                this.payment = this.payment1;
            } else {
                this.payment = this.payment1.filter((item) =>
                    item.type.includes(this.searchQuery)
                );
            }
        },
        click2fuction(fileUrl) {
            if (fileUrl) {
                window.open(fileUrl, "_blank");
            } else {
                console.error("File URL is missing or invalid.");
            }
        },
        showResultpdf(file) {
            window.open(file, '_blank');
        },
    },
};
</script>

<style scoped>
.v-card {
    max-width: 100%;
    margin: 10px 0;
}
</style>
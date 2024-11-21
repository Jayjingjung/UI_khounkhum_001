<template>
    <div>
        <div class=mb-10>
            <v-card flat>
                <v-card-actions>
                    <v-btn elevation="0" dark width="30" height="30" color="green" @click="$router.back()">
                        <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-card-title v-if="buttonname" class="font-weight-bold">
                        {{ buttonname }}
                    </v-card-title>
                </v-card-actions>
            </v-card>
        </div>
        <!-- ແຈ້ງການ2  -->
        <v-dialog v-model="testDoc" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="success" small>
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ແຈ້ງການ2</div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="functionvichai"></v-text-field>
                        </v-card>
                        <div v-for="(item, index) in vichai" :key="index">
                            <v-card-subtitle>
                                <v-card-actions>
                                    <v-btn text @click="showResultpdf(item.file)">
                                        <v-icon color="#00E676">
                                            mdi-eye-arrow-left
                                        </v-icon>
                                    </v-btn>

                                    {{ item.type }}
                                    <v-spacer></v-spacer>
                                    ({{ item.dateInsert }})
                                </v-card-actions>
                            </v-card-subtitle>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <!-- ແຈ້ງການ1  -->
        <v-dialog v-model="sisternokDoc" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="success" small>
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ແຈ້ງການ1
                            </div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="nokSearch"></v-text-field>
                        </v-card>
                        <div v-for="(item, index) in sisternok" :key="index">
                            <v-card-subtitle>
                                <v-card-actions>
                                    <v-btn text @click="showResultpdf(item.file)">
                                        <v-icon color="#00E676">
                                            mdi-eye-arrow-left
                                        </v-icon>
                                    </v-btn>

                                    {{ item.type }}
                                    <v-spacer></v-spacer>
                                    ({{ item.dateInsert }})
                                </v-card-actions>
                            </v-card-subtitle>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <!-- ແຈ້ງການ3 -->
        <v-dialog v-model="filedocument" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="success" small>
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ແຈ້ງການ3
                            </div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="filterResults"></v-text-field>
                        </v-card>
                        <div v-for="(item, index) in filteredResults" :key="index">
                            <v-card-subtitle>
                                <v-card-actions>
                                    <v-btn text @click="showResultpdf(item.file)">
                                        <v-icon color="#00E676">
                                            mdi-eye-arrow-left
                                        </v-icon>
                                    </v-btn>

                                    {{ item.type }}
                                    <v-spacer></v-spacer>
                                    ({{ item.dateInsert }})
                                </v-card-actions>
                            </v-card-subtitle>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col cols="12" sm="6" md="3" @click="sisternokDoc = true">
                <v-card>
                    <v-card-text class="d-flex justify-center align-center">
                        <div>
                            ແຈ້ງການ1
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3" @click="testDoc = true">
                <v-card>
                    <v-card-text class="d-flex justify-center align-center">
                        <div>
                            ແຈ້ງການ2
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3" @click="filedocument = true">
                <v-card>
                    <v-card-text class="d-flex justify-center align-center">
                        <div>
                            ແຈ້ງການ3
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card>
                    <v-card-text class="d-flex justify-center align-center">
                        <div>
                            ແຈ້ງການ4
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>


<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            searchQuery: '',
            sisternokDoc: false,
            loading_processing: false,
            filedocument: false,
            testDoc: false,
            surveydocument: false,
            filedocuments: false,
            imagefile: false,
            payfile: false,
            toKen: '',
            selectedToken: '', // To store the selected token
            buttonname: null,
            selectedCard: '1',
            license_plate: '',
            USER_ROLE: null,
            USER_NAME: localStorage.getItem('USER_NAME'),
            report_leave_caroffice_header: [
                { text: 'ຄຸດເຈາະ', value: 'pic' },
                { text: 'ນໍາເບີຮູເຈາະ', value: 'hoeNumber' },
                { text: 'ຂໍ້ມູນ coller', value: 'dataColler' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            report_listitemOffice: [],
            filteredReportList: [], // Filtered data
            search: '', // Search query
            report_ResultOfServeygeader: [
                { text: 'file', value: 'file' },
                { text: 'type', value: 'type' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            report_ResultOfServey: [],
            ResultOfServey: [],
            sisterNokAll: [],
            vichai: [],
            payment: [],
            search: '',
            pdfDialog: false, // Controls the visibility of the PDF dialog
            pdfUrl: '',       // Stores the URL of the PDF to display
        };
    },
    computed: {
        computedLabel() {
            return this.USER_NAME === 'Geo-Explo'
                ? 'ຂໍ້ມູນເດີນສໍາຫຼວດ'
                : 'ຂໍ້ມູນຮູເຈາະ';
        },
        reLabel() {
            return this.USER_NAME === 'Geo-Explo'
                ? 'ບົດລາຍງານ'
                : 'ຜົນການສໍາຫຼວດ'; // Customize this label based on your requirements
        },
    },
    mounted() {
        // รับค่า token จาก query และแสดง
        const token = this.$route.query.token;
        const label = this.$route.query.label;
        if (token && label) {
            this.buttonname = label;
            this.setToken(token);
        }

    },
    methods: {
        refresher() {
            this.filedocument = false;
            this.filedocuments = false;
            this.testDoc = false;
            this.surveydocument = false;
            this.payfile = false;
            window.location.reload();
        },
        navigateWithToken(token, buttonLabel, number) {
            this.$router.push({
                name: 'Survey results',
                query: { token, label: buttonLabel, number }
            });
        },
        toImage(token, buttonLabel, number) {
            this.$router.push({
                name: 'image',
                query: { token, label: buttonLabel, number }
            });
        },
        navigate(token, buttonvalue) {
            this.$router.push({
                name: 'Add_a_hole',
                query: { token, label: buttonvalue }
            });
        },
        miningDoc(token, buttonLabel, number) {
            this.$router.push({
                name: 'miningdocument',
                query: { token, label: buttonLabel, number }
            });
        },
        nokDoc(token, buttonLabel, number) {
            this.$router.push({
                name: 'nokdocumment',
                query: { token, label: buttonLabel, number }
            });
        },
        test(token, valueDoc, number) {
            this.$router.push({
                name: 'testdocument',
                query: { token, label: valueDoc, number }
            });
        },
        paymentdoc(token, valueDoc, number) {
            this.$router.push({
                name: 'paydocument',
                query: { token, label: valueDoc, number }
            });
        },
        setBound(value) {
            this.bound = value;
            this.ShowAllListOfHole();
        },
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        setToken(token) {
            console.log('Set Token:', token); // ตรวจสอบค่าที่ได้รับ
            this.toKen = token;
            this.selectedToken = token; // Update selected token
            this.functionSisterNok();
            this.ShowAllResultOfServey();
            this.vichaiExample();
        },
        ShowAllListOfHole() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllListOfHole.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,  // Use the token set from the button click
                    bound: this.bound,
                }).then((data) => {
                    if (data?.status === "00") {
                        this.report_listitemOffice = data?.data;
                        this.filteredReportList = data?.data; // Initialize filtered list
                    } else {
                        this.report_listitemOffice = [];
                        this.filteredReportList = [];

                    }
                    this.loading_processing = false;
                });
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    icon: 'error',
                    text: error,
                });
                console.log(error);
            }
        },
        ShowAllResultOfServey() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllResultOfServey.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,
                    bound: this.bound,
                }).then((data) => {
                    console.log('API Response:', data); // Log the response
                    if (data?.status === "00") {
                        // this.report_ResultOfServey = data?.data;
                        this.report_ResultOfServey = data.data.filter(item => item.name === 'documment' && item.nameDetail === 'ແຈ້ງການ1');
                        this.filteredResults = this.report_ResultOfServey; //   
                    } else {
                        this.report_ResultOfServey = [];
                        this.filteredResults = [];
                    }
                    this.loading_processing = false;
                });
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    icon: 'error',
                    text: error.message,
                });
                console.log(error);
            }
        },
        functionSisterNok() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllResultOfServey.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,
                    bound: this.bound,
                }).then((data) => {
                    console.log('API Response:', data); // Log the response
                    if (data?.status === "00") {
                        // this.report_ResultOfServey = data?.data;
                        this.sisterNokAll = data.data.filter(item => item.name === 'documment' && item.nameDetail === 'ແຈ້ງການ1');
                        this.sisternok = this.sisterNokAll; // 
                    } else {
                        this.sisterNokAll = [];
                        this.sisternok = [];
                    }
                    this.loading_processing = false;
                });
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    icon: 'error',
                    text: error.message,
                });
                console.log(error);
            }
        },
        // Filter report list based on search
        filterReportList() {
            const query = this.search.toLowerCase();
            this.filteredReportList = this.report_listitemOffice.filter(item =>
                item.full_Name_Hole_number.toLowerCase().includes(query)
            );
        },
        filterResults() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            this.filteredResults = this.report_ResultOfServey.filter((item) =>
                item.type.includes(this.searchQuery)
            );
        },
        filteredServey() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            this.filterServey = this.ResultOfServey.filter((item) =>
                item.type.includes(this.searchQuery)
            );
        },
        functionvichai() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            this.vichai = this.vichaiAll.filter((item) =>
                item.type.includes(this.searchQuery)
            );
        },
        functionpay() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            this.payment = this.payAll.filter((item) =>
                item.type.includes(this.searchQuery)
            );
        },
        nokSearch() {
            // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
            this.sisternok = this.sisterNokAll.filter((item) =>
                item.type.includes(this.searchQuery)
            );
        },
        refresh() {
            // ຟັງຊັ່ນໂຫຼດຂໍ້ມູນໃໝ່
            this.searchQuery = '';
            this.filteredResults = this.report_ResultOfServey;
        },
        DocServey() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllResultOfServey.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,  // Use the token set from the button click
                    bound: this.bound,
                    // bound: this.bound,
                }).then((data) => {
                    if (data?.status === "00") {
                        // this.report_ResultOfServey = data?.data;
                        // this.ResultOfServey = data.data.filter(item => item.name === 'kk'|| item.name==='dd');
                        this.ResultOfServey = data.data.filter(item => item.name === 'servey');
                        this.filterServey = this.ResultOfServey; // ตั้งค่าเริ่มต้นให้แสดงข้อมูลทั้งหมด

                        this.loading_processing = false;
                    } else {
                        this.ResultOfServey = [];
                        this.filterServey = [],
                            this.loading_processing = false;
                    }
                });
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    icon: 'error',
                    text: error,
                });
                console.log(error);
            }
        },
        vichaiExample() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllResultOfServey.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,  // Use the token set from the button click
                    bound: this.bound,
                    // bound: this.bound,
                }).then((data) => {
                    if (data?.status === "00") {
                        // this.report_ResultOfServey = data?.data;
                        // this.ResultOfServey = data.data.filter(item => item.name === 'kk'|| item.name==='dd');
                        this.vichaiAll = data.data.filter(item => item.name === 'documment' && item.nameDetail === 'ແຈ້ງການ2');
                        this.vichai = this.vichaiAll
                        this.loading_processing = false;
                    } else {
                        this.vichaiAll = [];
                        this.vichai = []
                        this.loading_processing = false;
                    }
                });
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    icon: 'error',
                    text: error,
                });
                console.log(error);
            }
        },
        paymentAll() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllResultOfServey.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,  // Use the token set from the button click
                    bound: this.bound,
                    // bound: this.bound,
                }).then((data) => {
                    if (data?.status === "00") {
                        // this.report_ResultOfServey = data?.data;
                        // this.ResultOfServey = data.data.filter(item => item.name === 'kk'|| item.name==='dd');
                        this.payAll = data.data.filter(item => item.name === 'pay');
                        this.payment = this.payAll
                        this.loading_processing = false;
                    } else {
                        this.payAll = [];
                        this.payment = []
                        this.loading_processing = false;
                    }
                });
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    icon: 'error',
                    text: error,
                });
                console.log(error);
            }
        },
        click2fuction(pic, key_id) {
            //   this.showpdf(pic);
            this.viewpdf(key_id);
        },
        viewpdf(key_id) {
            this.$router.push({ path: '/miningDetail_admin', query: { key_id: key_id } });
        },
        showpdf(pic) {
            this.pdfUrl = pic;
            this.pdfDialog = true; // Open the PDF dialog
        },
        async collerdelete(key_id) {
            try {
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
                    const response = await this.$axios.$post('/DelHoleByID.service', {
                        action: 'delete',
                        key_id: key_id
                    });

                    if (response && response.status === '00') {
                        swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                        this.ShowAllListOfHole(); // Refresh the list
                    } else {
                        swal.fire('Failed!', 'There was an error deleting your file.', 'error');
                    }
                }
            } catch (error) {
                this.$toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
                console.error(error);
            }
        },
        async Resultdelete(key_id) {
            try {
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
                    const response = await this.$axios.$post('/DelResultOfSurveyByID.service', {
                        action: 'delete',
                        key_id: key_id
                    });

                    if (response && response.status === '00') {
                        swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                        this.ShowAllListOfHole(); // Refresh the list
                    } else {
                        swal.fire('Failed!', 'There was an error deleting your file.', 'error');
                    }
                }
            } catch (error) {
                this.$toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
                console.error(error);
            }
        },
        showResultpdf(file) {
            window.open(file, '_blank');
        },
    },
};
</script>

<style>
.scrollable-text {
    height: 300px;
    overflow-y: auto;
    padding: 10px;
}

.st0 {
    fill: #71d8ef;
}

.st1 {
    fill: #fff534;
}

.st2 {
    fill: #000000;
}

.custom-text-field {
    background-color: #f0f0f0;
    color: #000000;
}

.st10 {
    fill: #695e5d4d;
    stroke: black;
    /* Add border color */
    stroke-width: 1;
}

.st11 {
    fill: #ECBDD6;
}

.circle-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.circle {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: #0a3382;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 15px;
    margin-left: 15px;
    transition: transform 0.2s;
}

.circle:hover {
    transform: scale(1.1);
}

.circle span {
    font-size: 20px;
}
</style>
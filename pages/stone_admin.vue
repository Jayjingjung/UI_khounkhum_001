<template>
    <div>

        <div>
            <div>
                <v-btn :style="getButtonStyle('tZl011U2nNs9AdvQDIStduuOIc8yWmxw')"
                    @click="setTokenAndFetch('tZl011U2nNs9AdvQDIStduuOIc8yWmxw')">
                    ຄອນງົວ
                </v-btn>

                <v-btn :style="getButtonStyle('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF')"
                    @click="setTokenAndFetch('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF')">
                    ສີຄູນ
                </v-btn>

                <v-btn :style="getButtonStyle('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa')"
                    @click="setTokenAndFetch('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa')">
                    ບ້ານທ່າ
                </v-btn>

                <v-btn :style="getButtonStyle('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123')"
                    @click="setTokenAndFetch('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123')">
                    ໂພນຄໍາ
                </v-btn>

                <v-btn :style="getButtonStyle('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO')"
                    @click="setTokenAndFetch('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO')">
                    ຊຽງຄົງ
                </v-btn>

                <v-btn :style="getButtonStyle('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456')"
                    @click="setTokenAndFetch('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456')">
                    ນໍ້າຊາວ
                </v-btn>

                <v-btn   :style="getButtonStyle('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789')"
                    @click="setTokenAndFetch('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789')">
                    ໜອງພູນໄຊ32,28
                </v-btn>

                <v-btn   :style="getButtonStyle('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112')"
                    @click="setTokenAndFetch('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112')">
                    ໜອງພູນໄຊ62,39 
                </v-btn>

                <v-btn :style="getButtonStyle('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415')"
                    @click="setTokenAndFetch('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415')">
                    ລາດຫໍ້
                </v-btn>
            </div>
        </div>
        <v-card>


            <div style="display: flex; overflow-x: auto; width: 1640px; margin-left: 10px;">

                <v-list style="display: flex; min-width: 12px;" v-model="selectedCard">

                    <v-btn ref="btn1" value="1" @click="selectedCard = '1'"
                        @mouseover="changeColor('	#FFE5FF', $refs.btn1)" @mouseleave="changeColor('white', $refs.btn1)"
                        style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);">
                        <v-icon style="color: rgb(	9, 44, 112);" size="55">mdi-summit</v-icon>

                        {{ computedLabel }}
                    </v-btn>
                    <v-btn style="height: 60px;background-color: green;color: aliceblue;" to="/Add_a_hole">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                        ເພີ່ມ {{ computedLabel }}
                    </v-btn>
                </v-list>
                <v-list style="display: flex; min-width: 12px;" v-model="selectedCard">
                    <v-btn ref="btn2" value="2" @click="selectedCard = '2'"
                        @mouseover="changeColor('	#FFE5FF', $refs.btn2)" @mouseleave="changeColor('white', $refs.btn2)"
                        style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);">
                        <v-icon style="color: rgb(43, 204, 150);" size="55">mdi-circular-saw</v-icon>

                        {{ reLabel }}
                    </v-btn>
                    <v-btn style="height: 60px;background-color: green;color: aliceblue; " to="/Survey results">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                        ເພີ່ມ {{ reLabel }}
                    </v-btn>
                </v-list>
            </div>

            <div v-if="selectedCard === '1'">
                <v-card style="width:1800px;height:800px;">
                    <v-card class="card-shadow mb-4" rounded="lg">
                        <v-card-title
                            style="display: flex; border-bottom:0.5px solid #e0e0e0; background-color:#0a3382; color:white;">
                            {{ computedLabel }}
                            <v-icon color="white"></v-icon>

                            <div style="width: 400px; margin-left: 50px;" class="d-flex align-center">
                                <v-text-field style="width: 700px; " placeholder="ຄົ້ນຫາດ້ວຍລະຫັດປ່ອຍລົດ..."
                                    v-model="search" rounded background-color="#f5f5f5"
                                    prepend-inner-icon="mdi-magnify"></v-text-field>

                                <v-btn style="margin-left: 10px;" color="ping" class="card-shadow" @click="print">
                                    <v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ
                                </v-btn>
                            </div>
                        </v-card-title>

                        <div class="circle-container">
                            <v-row>
                                <v-col v-for="item in report_listitemOffice" :key="item.key_id">
                                    <div class="circle" @click="click2fuction(item.pic, item.key_id)">
                                        <row>
                                            <span>{{ item.hoeNumber }}</span>
                                        </row>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>

                        <!-- PDF Popup -->
                        <v-dialog v-model="pdfDialog" max-width="800px">
                            <v-card>
                                <v-card-title class="headline">PDF Viewer</v-card-title>
                                <v-card-text>
                                    <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="500px"
                                        frameborder="0"></iframe>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="pdfDialog = false">
                                        Close
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-card>
            </div>
            <div v-if="selectedCard === '2'">
                <v-card style="width:1800px;height:800px;">
                    <v-card class="card-shadow mb-4" rounded="lg">
                        <v-card-title
                            style="display: flex; border-bottom:0.5px solid #2bcc96; background-color:#2bcc96; color:white;">
                            {{ reLabel }}


                            <div style="width: 400px; margin-left: 50px;" class="d-flex align-center">
                                <v-text-field style="width: 700px; " placeholder="ຄົ້ນຫາດ້ວຍລະຫັດປ່ອຍລົດ..."
                                    v-model="search" rounded background-color="#f5f5f5"
                                    prepend-inner-icon="mdi-magnify"></v-text-field>

                                <v-btn style="margin-left: 10px;" color="ping" class="card-shadow" @click="print">
                                    <v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ
                                </v-btn>
                            </div>
                        </v-card-title>
                        <div class="mt-2">
                            <v-data-table :items="report_ResultOfServey" :headers="report_ResultOfServeygeader"
                                :items-per-page="50" :search="search">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{ row?.item?.file }}</td>

                                        <td>{{ row?.item?.type }}</td>


                                        <td>
                                            <v-btn style="height: 40px; width: 90px;" small color="#0085e3"
                                                class="white--text card-shadow" @click="showResultpdf(row?.item?.file)">
                                                <v-icon size="30" color="white">mdi-printer-eye</v-icon>
                                            </v-btn>
                                        </td>
                                        <!-- <td>
                                        <v-btn style="height: 40px; width: 90px;" small color="#90A4AE"
                                            class="white--text card-shadow" @click="viewpdf(row?.item?.key_id)">
                                            <v-icon size="30" color="white">mdi-</v-icon>
                                        </v-btn>
                                    </td> -->
                                        <!-- <td>
                                            <v-btn style="height: 40px; width: 90px;" small color="#90A4AE"
                                                class="white--text card-shadow"
                                                @click="Resultdelete(row?.item?.key_id)">
                                                <v-icon size="30" color="white">mdi-delete</v-icon>
                                            </v-btn>
                                        </td> -->
                                    </tr>
                                </template>
                            </v-data-table>
                        </div>
                    </v-card>
                </v-card>
            </div>
        </v-card>
    </div>
</template>


<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            selectedToken: null, // To store the selected token
            selectedCard: '1',
            license_plate: '',
            USER_ROLE: 'BOR-HIN-KHUAT',
            USER_NAME: localStorage.getItem('USER_NAME'),
            report_leave_caroffice_header: [
                { text: 'ຄຸດເຈາະ', value: 'pic' },
                { text: 'ນໍາເບີຮູເຈາະ', value: 'hoeNumber' },
                { text: 'ຂໍ້ມູນ coller', value: 'dataColler' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            report_listitemOffice: [],
            report_ResultOfServeygeader: [
                { text: 'file', value: 'file' },
                { text: 'type', value: 'type' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            report_ResultOfServey: [],
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
        this.ShowAllListOfHole();
        this.ShowAllResultOfServey();
    },
    methods: {
        setBound(value) {
            this.bound = value;
            this.ShowAllListOfHole();
        },
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        setTokenAndFetch(token) {
            this.selectedToken = token; // Update selected token
            this.toKen = token;
            this.ShowAllListOfHole();
            this.ShowAllResultOfServey();
        },
        getButtonStyle(token) {
            // Conditionally return the button style
            return {
                width: '150px',
                height: '40px',
                fontSize: '18px',
                backgroundColor: this.selectedToken === token ? '#2382dc' : '', // Set background to green if selected
                color: this.selectedToken === token ? 'white' : 'black', // Change text color to white if selected
            };
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
                        this.loading_processing = false;
                    } else {
                        this.report_listitemOffice = [];
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
        ShowAllResultOfServey() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllResultOfServey.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,  // Use the token set from the button click
                    bound: this.bound,
                    bound: this.bound,
                }).then((data) => {
                    if (data?.status === "00") {
                        this.report_ResultOfServey = data?.data;
                        this.loading_processing = false;
                    } else {
                        this.report_ResultOfServey = [];
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
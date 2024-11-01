<template>
    <div>
        <v-card>


            <div style="display: flex; overflow-x: auto; width: 1640px; margin-left: 10px;">

                <v-list style="display: flex; min-width: 12px;" v-model="selectedCard">

                    <v-btn ref="btn1" value="1" @click="selectedCard = '1'"
                        @mouseover="changeColor('	#FFE5FF', $refs.btn1)" @mouseleave="changeColor('white', $refs.btn1)"
                        style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);">
                        <v-icon style="color: rgb(	9, 44, 112);" size="55">mdi-summit</v-icon>

                        {{ computedLabel }}
                    </v-btn>
                </v-list>
                <v-list style="display: flex; min-width: 12px;" v-model="selectedCard">
                    <v-btn ref="btn2" value="2" @click="selectedCard = '2'"
                        @mouseover="changeColor('	#FFE5FF', $refs.btn2)" @mouseleave="changeColor('white', $refs.btn2)"
                        style="margin-left: 2px; margin-right: 2px; background-color: white; color: black; height: 65px; border: 1px solid rgb(0, 0, 0);">
                        <v-icon style="color: rgb(43, 204, 150);" size="55">mdi-circular-saw</v-icon>

                        {{ reLabel }}
                    </v-btn>
                </v-list>
            </div>
            <div style="display: flex; overflow-x: auto; width: 1640px; margin-left: 10px;">
                <v-btn dark color="#07babb" to="/file_mining" class="card-shadow mb-5 mt-5">
                    <v-icon color="white">mdi-circle-expand</v-icon>
                    <span class="white--text">ເພີ່ມເອກະສານຜົນການສໍາຫຼວດ </span>
                </v-btn>

                <v-btn dark color="#c64309" to="./HR/akasarn" class="card-shadow mb-5 mt-5">
                    <v-icon color="white">mdi-folder-multiple-outline</v-icon>
                    <span class="white--text">ເອກກະສານ</span>
                </v-btn>
                <div class="circle-container">
                    <div style="    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: #1ece00;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 15px;
    margin-left: 15px;
    transition: transform 0.2s;">
                        <v-btn dark color="#1ece00" to="/report_mining" class="card-shadow mb-5 mt-5" rounded>
                            <v-icon color="white">mdi-circle-edit-outline</v-icon>
                            <span class="white--text">+</span>
                        </v-btn>
                    </div>
                </div>

            </div>
            <div v-if="selectedCard === '1'">
                <v-card style="width:1800px;height:800px;">
                    <v-card class="card-shadow mb-4" rounded="lg">
                        <v-card-title
                            style="display: flex; border-bottom:0.5px solid #e0e0e0; background-color:#0a3382; color:white;">
                            ລາຍການ ຮູເຈາະ
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
                            ລາຍການ ຮູເຈາະ


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
                                        <td>
                                            <v-btn style="height: 40px; width: 90px;" small color="#90A4AE"
                                                class="white--text card-shadow"
                                                @click="Resultdelete(row?.item?.key_id)">
                                                <v-icon size="30" color="white">mdi-delete</v-icon>
                                            </v-btn>
                                        </td>
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
            selectedCard: '1',
            license_plate: '',
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
        ShowAllListOfHole() {
            try {
                this.loading_processing = true;
                this.$axios.$post('/ShowAllListOfHole.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
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
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
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
            this.$router.push({ path: '/miningDetail', query: { key_id: key_id } });
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

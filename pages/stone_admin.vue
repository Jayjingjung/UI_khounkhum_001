<template>
    <div>
        <div v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
            <v-btn elevation="0" dark width="30" height="30" color="#00E676" @click="$router.back()">
                <v-icon color="#0a3382">mdi-arrow-left</v-icon>
            </v-btn>
        </div>
        <div class="mb-8 mt-6" style="font-size: 20px; font-weight: bold;">
            ຝ່າຍສຳຫຼວດ ແລະ ຂຸດຄົ້ນບໍ່ແຮ່
            <hr>
        </div>
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
        <!-- ຂໍ້ມູນພາບ -->
        <v-dialog v-model="imagefile" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="imagefile = false" rounded color="primary">
                                <v-icon>
                                    mdi-arrow-collapse-left
                                </v-icon>
                                ກັບຄືນ
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px"> ຮູບພາກສະໜາມ</div>
                            <v-divider></v-divider>
                        </v-card>
                        <div>
                            <v-card-subtitle>
                                No Image Yet
                            </v-card-subtitle>
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
                        <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'"
                            @click="setTokenAndFetch('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF')">
                            <template v-slot:activator>
                                <v-icon color="white">mdi-file-document</v-icon>
                                <v-list-item-content>
                                    <v-list-item-title
                                        style="font-size: 20px; font-weight: bold;">ເອກະສານສ່ວນຕົວ</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item>
                                <v-btn rounded @click="nokDoc1('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF', 'ເອກະສານຕ່າງໆ')">
                                    ເບີ່ງ
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="success"
                                    @click="nokDoc('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF', 'ເອກະສານເອື້ອຍນົກ', 'nok', 'ເພີ່ມເອກະສານ')"
                                    rounded>
                                    ເພີ່ມ
                                </v-btn>
                            </v-list-item>
                        </v-list-group>
                    </v-card>
                </v-col>
                <v-col cols="auto">
                    <v-card color="#E0F7FA" max-width="300">
                        <!-- v-if="USER_ROLE !== 'BOR-HIN-KHUAT'" -->
                        <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'"
                            @click="setTokenAndFetch('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF')">
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
        <!-- ຄອນງົວ  -->
        <v-row>
            <v-col>
                <v-card class="mt-4" width="300" >
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('tZl011U2nNs9AdvQDIStduuOIc8yWmxw')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານຄອນງົວ
                                </v-list-item-title>
                            </template>
                            <!-- v-if="USER_ROLE !== 'BOR-HIN-KHUAT'" ໃຊ້ເພື່ອກຳນົດການມອງເຫັນ -->
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc1('ບໍ່ຄອນງົວ','ບ້ານຄອນງົວ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc2('tZl011U2nNs9AdvQDIStduuOIc8yWmxw','ເອກະສານບ້ານຄອນງົວ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="nokDoc('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')"
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
                                        @click="paymentdoc('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')"
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
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="filedocuments = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ຄອນງົວ')" rounded>
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
                                        @click="paymentdoc('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'pay', 'ເອກະສານມ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!-- ສີຄູນ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານສີຄູນ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc1('ບໍ່ສີຄູນ', 'ບ້ານສີຄູນ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc2('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ເອກະສານບ້ານສີຄູນ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ')" rounded>
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
                                        @click="paymentdoc('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!-- ບ້ານທ່າ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານທ່າ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc1( 'ບໍ່ບ້ານທ່າ', 'ບ້ານທ່າ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc2( 'e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ເອກະສານບ້ານທ່າ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ')" rounded>
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
                                        @click="paymentdoc('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>

            <!-- ບ້ານໂພນຄໍາ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານໂພນຄໍາ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ໂພນຄໍາ', 'ບ້ານໂພນຄໍາ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ')"
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
                                        @click="paymentdoc('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>

            <!-- ຊຽງຄົງ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານຊຽງຄົງ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc1('ບໍ່ຊຽງຄົງ', 'ບ້ານຊຽງຄົງ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group >
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc2('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ເອກະສານບ້ານຊຽງຄົງ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ')" rounded>
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
                                        @click="paymentdoc('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                    <v-btn rounded @click="filterPayment">ເບີ່ງ</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>

            <!-- ນໍ້າຊາວ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານນໍ້າຊາວ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ນໍ້າຊາວ', 'ບ້ານນໍ້າຊາວ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ເອກະສານບ້ານນໍ້າຊາວ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ')"
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
                                        @click="paymentdoc('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>

            <!-- ໜອງພູໄຊ 32,28-->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ໜອງພູໄຊ 32,28
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ໜອງພູໄຊ32,28', 'ບ້ານໜອງພູໄຊ 32,28')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'pay1', 'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ເອກະສານບ້ານໜອງພູໄຊ 32,28')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28')"
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
                                        @click="paymentdoc('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!-- ໜອງພູໄຊ 62,39-->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ໜອງພູໄຊ 62,39
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ໜອງພູໄຊ62,39', 'ບ້ານໜອງພູໄຊ62,39')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ເອກະສານບ້ານໜອງພູໄຊ  62,39')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39')"
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
                                        @click="paymentdoc('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!-- ລາດຫໍ້  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານລາດຫໍ້
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ລາດຫໍ້', 'ບ້ານລາດຫໍ້')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ເອກະສານບ້ານລາດຫໍ້')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້')"
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
                                        @click="paymentdoc('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!-- ຕະເປືອ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານຕະເປືອ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ຕະເປືອ', 'ບ້ານຕະເປືອ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ເອກະສານບ້ານຕະເປືອ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ')"
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
                                        @click="paymentdoc('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('vewerwfe33369cee4866caf2f9941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຕະເປືອ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!-- ຫ້ວຍຮ່ອງ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານຫ້ວຍຮ່ອງ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ຫ້ວຍຮ່ອງ', 'ບ້ານຫ້ວຍຮ່ອງ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group >
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ເອກະສານບ້ານຫ້ວຍຮ່ອງ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ')"
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
                                        @click="paymentdoc('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('e6ea9da1b901d1ddeevgewvewvwe941bf6244c5b6570f63a1f3eb91bba', 'ບ້ານຫ້ວຍຮ່ອງ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!--ນາຢົມ  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານນາຢົມ
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່ນາຢົມ', 'ບ້ານນາຢົມ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group >
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ເອກະສານບ້ານນາຢົມ')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ')"
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
                                        @click="paymentdoc('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('eb168d8130dc6f4601dd97dd3f38bdbbc2ef846572823da64dd75bf7dfc05ee9', 'ບ້ານນາຢົມ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <!--DMC  -->
            <v-col>
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">DMC
                                </v-list-item-title>
                            </template>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານຫ້ອງການ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc1('ບໍ່DMC', 'DMC')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filterNokPay">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC', 'pay1', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group >
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content >
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn
                                        @click="miningDoc2('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'ເອກະສານຂອງDMC')"
                                        rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="nokDoc('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC', 'documment', 'ເພີ່ມເອກະສານທີ່ກ່ຽວຂ້ອງ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
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
                                    <v-btn color="success" rounded
                                        @click="paymentdoc('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC', 'servey', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນສຳຫຼວດ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            style="height: 20px; overflow: visible;">ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="filedocuments = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigate('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC')"
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
                                        @click="paymentdoc('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC', 'testData', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນວິໃຈຕົວຢ່າງ')"
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
                                        @click="paymentdoc('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC', 'pay', 'ເອກະສານ','ເພີ່ມຂໍ້ມູນລາຍຈ່າຍ')"
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
                                    <v-btn rounded @click="toImage1('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC')">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="toImage('0cb514c085014db6b69f22e2f228b1e15ed7ff4c7f51f698b0af98759f4de0ce', 'DMC')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col></v-col>
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
            testDoc: false,
            surveydocument: false,
            filedocuments: false,
            imagefile: false,
            payfile: false,
            selectedToken: null,
            USER_ROLE: null,
            USER_NAME: localStorage.getItem('USER_NAME'),
            report_listitemOffice: [],
            filteredReportList: [], // Filtered data
            search: '', // Search query
            vichai: [],
            vichai1: [],
            payment: [],
            payment1: [],
            filterServey1: [],
            filterServey: [],
            sisternok1: [],
            sisternok: [],
            pdfDialog: false, // Controls the visibility of the PDF dialog
        };
    },
    mounted() {
        this.USER_ROLE = this.$route.query.userRole || localStorage.getItem('userRole') || 'BOR-HIN-KHUAT';  // ຄ່າ default ເປັນ 'BOR-HIN-KHUAT
    },
    watch: {
        '$route.query.userRole': function (newRole) {
            this.USER_ROLE = newRole || 'BOR-HIN-KHUAT';  // if no value set it to default
            localStorage.setItem('userRole', this.USER_ROLE); // keep USER_ROLE in localStorage
        }
    },
    methods: {
        refresher() {
            window.location.reload();
        },
        toImage(token, number) {
            this.$router.push({
                name: 'insertImage',
                query: { token, number }
            });
        },
        toImage1(token, number) {
            this.$router.push({
                name: 'showimage',
                query: { token, number }
            });
        },
        navigate(token, buttonvalue) {
            this.$router.push({
                name: 'Add_a_hole',
                query: { token, label: buttonvalue }
            });
        },
        miningDoc1( bouang, village ) {
            this.$router.push({
                name: 'documentation2',
                query: {bouang, village }
            });
        },
        miningDoc2( token, number ) {
            this.$router.push({
                name: 'documentation1',
                query: {token, label:number }
            });
        },
        nokDoc(token, buttonLabel, number, number1) {
            this.$router.push({
                name: 'nokdocumment',
                query: { token, label: buttonLabel, number, number1 }
            });
        },
        nokDoc1(token, buttonLabel) {
            this.$router.push({
                name: 'documentation',
                query: { token, label: buttonLabel }
            });
        },
        paymentdoc(token, valueDoc, number, number1,number2) {
            this.$router.push({
                name: 'paydocument',
                query: { token, label: valueDoc, number, number1,number2 }
            });
        },
        setTokenAndFetch(token) {
            this.selectedToken = token; // Update selected token
            this.toKen = token;
            this.fetchAllData();
            this.ShowAllListOfHole();
        },
        // Filter Payment Data
        filterPayment() {
            this.payment1 = this.payAll.filter((item) => item.name === "pay");
            this.payment = this.payment1
            this.payfile = true;
        },
        // Filter Vichai Data
        filterTest() {
            this.vichai1 = this.payAll.filter((item) => item.name === "testData");
            this.vichai = this.vichai1
            this.testDoc = true;
        },
        // Filter Survey Data
        filterSurvey() {
            this.filterServey1 = this.payAll.filter((item) => item.name === "servey");
            this.filterServey = this.filterServey1
            this.surveydocument = true;
        },
        filterNokPay() {
            this.sisternok1 = this.payAll.filter((item) => item.name === "pay1");
            this.sisternok = this.sisternok1
            this.sisternokDoc = true;
        },
        fetchAllData() {
            try {
                this.$axios
                    .$post("/ShowAllResultOfServey.service", {
                        branchUser: this.USER_ROLE,
                        toKen: this.toKen,
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
        ShowAllListOfHole() {
            try {
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
                });
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error,
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
        // functionvichai() {
        //     // ຟັງຊັ່ນກອງຂໍ້ມູນຕາມຄ່າຄົ້ນຫາ
        //     this.vichai = this.vichai1.filter((item) =>
        //         item.type.includes(this.searchQuery)
        //     );
        // },
        // Filter data based on search query
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
<style>
.custom-text-field {
    background-color: #f0f0f0;
    color: #000000;
}

.hoverable:hover {
    color: #42A5F5;
    font-size: 18px;
    font-weight: bold;
}

.v-list-group__header .v-icon.mdi-excavator {
    color: green;
    font-size: 24px;
}
</style>
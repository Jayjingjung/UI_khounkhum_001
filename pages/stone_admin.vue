<template>
    <div>
        <div v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'">
            <v-btn elevation="0" dark width="30" height="30" color="green" @click="$router.back()">
                <v-icon color="#0a3382">mdi-arrow-left</v-icon>
            </v-btn>
        </div>
        <div class="mb-8 mt-6" style="font-size: 20px; font-weight: bold;">
            ຝ່າຍສຳຫຼວດ ແລະ ຂຸດຄົ້ນບໍ່ແຮ່
            <hr>
        </div>
        <!-- ຂໍ້ມູນວິໃຈຕົວຢ່າງ  -->
        <v-dialog v-model="testDoc" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="primary">
                                <v-icon>
                                    mdi-arrow-collapse-left
                                </v-icon>
                                ກັບຄືນ
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນວິໃຈຕົວຢ່າງ</div>
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
        <!-- ເອກະສານເື້ອອຍນົກ  -->
        <v-dialog v-model="sisternokDoc" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="primary">
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                                ກັບຄືນ
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນຜົນເອກະສານ
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
        <!-- ເອກະສານທີ່ກ່ຽວຂ້ອງ  -->
        <v-dialog v-model="filedocument" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="primary">
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                                ກັບຄືນ
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນຜົນເອກະສານທີ່ກ້ຽວຂ້ອງ
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
        <!-- ຂໍ້ມູນຜົນການສຳຫຼວດ -->
        <v-dialog v-model="surveydocument" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="primary">
                                <v-icon>
                                    mdi-arrow-collapse-left
                                </v-icon>
                                ກັບຄືນ
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນຜົນການສຳຫຼວດ</div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="filteredServey"></v-text-field>
                        </v-card>
                        <div v-for="(item, index) in filterServey" :key="index">
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
        <!-- ຂໍ້ມູນຮເຈາະ  -->
        <v-dialog v-model="filedocuments" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <!-- Section Header -->
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="primary">
                                <v-icon>mdi-arrow-collapse-left</v-icon>
                                ກັບຄືນ
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນຮູເຈາະ
                            </div>
                            <v-divider></v-divider>

                            <!-- Search Field -->
                            <v-text-field label="ຄົ້ນຫາ" v-model="search" append-icon="mdi-magnify"
                                @input="filterReportList"></v-text-field>
                        </v-card>

                        <!-- Filtered List -->
                        <div v-for="item in filteredReportList" :key="item.key_id">
                            <div>
                                <v-card-subtit>
                                    <v-btn text @click="click2fuction(item.pic, item.key_id)">
                                        <v-icon color="#00E676">mdi-eye-arrow-left</v-icon>
                                    </v-btn>
                                    {{ item.full_Name_Hole_number }}
                                </v-card-subtit>
                            </div>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <!-- ຂໍ້ມູນລາຍຈ່າຍ -->
        <v-dialog v-model="payfile" max-width="490">
            <v-card class="mx-auto" max-width="490">
                <div>
                    <v-card-text>
                        <v-card style="position: sticky; top: 0; z-index: 1;" max-width="500" flat>
                            <v-btn @click="refresher" rounded color="primary">
                                <v-icon>
                                    mdi-arrow-collapse-left
                                </v-icon>
                                ກັບຄືນ
                            </v-btn>
                            <div class="text-center font-weight-bold" style="font-size: 20px">
                                ຂໍ້ມູນລາຍຈ່າຍ</div>
                            <v-divider></v-divider>
                            <v-text-field label="ຄົ້ນຫາ" v-model="searchQuery" append-icon="mdi-magnify"
                                @input="functionpay"></v-text-field>
                        </v-card>
                        <div v-for="(item, index) in payment" :key="index">
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
                    <v-card color="#E0F7FA">
                        <!-- v-if="USER_ROLE !== 'BOR-HIN-KHUAT'" -->
                        <v-list-group no-action sub-group v-if="USER_ROLE === 'FOR_DOCUMENT_ADMIN'"
                            @click="setTokenAndFetch('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF')">
                            <template v-slot:activator>
                                <v-icon color="white">mdi-file-document</v-icon>
                                <v-list-item-content>
                                    <v-list-item-title
                                        style="font-size: 20px; font-weight: bold;">ເອກະສານ</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item>
                                <v-btn rounded @click="nokDoc1('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF', 'ເອກະສານຕ່າງໆ')">
                                    ເບີ່ງ
                                </v-btn>
                                <!-- <v-btn rounded @click="sisternokDoc = true">
                                    ເບີ່ງ
                                </v-btn> -->
                                <v-spacer></v-spacer>
                                <v-btn color="success"
                                    @click="nokDoc('UnCuQ8Dql7bSVS9LcDfMWmA8asAtQLMF', 'ເອກະສານເອື້ອຍນົກ', 'nok')"
                                    rounded>
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
                <v-card class="mt-4" width="300">
                    <v-list color="#E0F7FA">
                        <v-list-group :value="false" prepend-icon="mdi-excavator"
                            @click="setTokenAndFetch('tZl011U2nNs9AdvQDIStduuOIc8yWmxw')">
                            <template v-slot:activator>
                                <v-list-item-title style="font-size: 20px; font-weight: bold;">ບ້ານຄອນງົວ
                                </v-list-item-title>
                            </template>
                            <!-- v-if="USER_ROLE !== 'BOR-HIN-KHUAT'" ໃຊ້ເພື່ອກຳນົດການມອງເຫັນ -->
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="miningDoc1('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ເອກະສານບ້ານຄອນງົວ')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="miningDoc('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'documment')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="navigateWithToken('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'servey','ເອກະສານ')"
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
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'testData' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('tZl011U2nNs9AdvQDIStduuOIc8yWmxw', 'ບ້ານຄອນງົວ', 'pay','ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="imagefile = true">
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ເອກະສານບ້ານສີຄູນ')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'servey','ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'testData' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF', 'ບ້ານສີຄູນ', 'pay' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ເອກະສານບ້ານທ່າ')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'servey','ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'testData','ເອກະສານ')" rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('23QZokLhZNSVtXP1qYQHM8PVHr76VQa', 'ບ້ານທ່າ', 'pay','ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ເອກະສານບ້ານໂພນຄໍາ')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'servey','ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                <v-icon color="blue">mdi-test-tube-off</v-icon>
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'testData' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123', 'ບ້ານໂພນຄໍາ', 'pay','ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('OQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ເອກະສານບ້ານຊຽງຄົງ')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'servey','ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'testData' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO', 'ບ້ານຊຽງຄົງ', 'pay','ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ເອກະສານບ້ານນໍ້າຊາວ')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'servey' ,'ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'testData' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456', 'ບ້ານນໍ້າຊາວ', 'pay' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ເອກະສານບ້ານໜອງພູໄຊ 32,28')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'servey' ,'ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'testData' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789', 'ໜອງພູໄຊ 32,28', 'pay' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="white">mdi-file-document</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ເອກະສານບ້ານໜອງພູໄຊ  62,39')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'servey','ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'testData' ,'ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112', 'ໜອງພູໄຊ 62,39', 'pay','ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
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
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-list-item-content c>
                                        <v-list-item-title>ຂໍ້ມູນເອກະສານທີ່ກ່ຽວຂ້ອງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <!-- <v-btn @click="filedocument = true" rounded>
                                        ເບີ່ງ
                                    </v-btn> -->
                                    <v-btn @click="miningDoc1('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ເອກະສານບ້ານລາດຫໍ້')" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="miningDoc('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'documment')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="green">mdi-image-search-outline</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນສຳຫຼວດ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="surveydocument = true" rounded>
                                        ເບີ່ງ

                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded
                                        @click="navigateWithToken('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'servey','ເອກະສານ')">
                                        ເພີ່ມ
                                    </v-btn>
                                    <br>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="red">mdi-screw-machine-flat-top</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນຮູເຈາະ</v-list-item-title>
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
                                        <v-list-item-title>ຂໍ້ມູນວິໃຈຕົວຢ່າງ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn @click="testDoc = true" rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="test('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'testData','ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="yellow">mdi-cash-100</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຂໍ້ມູນລາຍຈ່າຍ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded @click="payfile = true">
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success"
                                        @click="paymentdoc('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415', 'ບ້ານລາດຫໍ້', 'pay','ເອກະສານ')"
                                        rounded>
                                        ເພີ່ມ
                                    </v-btn>
                                </v-list-item>
                            </v-list-group>
                            <v-list-group no-action sub-group>
                                <template v-slot:activator>
                                    <v-icon color="orange">mdi-account-hard-hat</v-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>ຮູບພາບກ່ຽວກັບພາກສະໜາມ</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item>
                                    <v-btn rounded>
                                        ເບີ່ງ
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" rounded>ເພີ່ມ</v-btn>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
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
            selectedToken: null, // To store the selected token
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
        this.USER_ROLE = this.$route.query.userRole || localStorage.getItem('userRole') || 'BOR-HIN-KHUAT';  // ຄ່າ default ເປັນ 'BOR-HIN-KHUAT

    },
    watch: {
        // คอยติดตามการเปลี่ยนแปลงใน URL (กรณีถ้ามีการกลับมาใน URL ที่มี query)
        '$route.query.userRole': function (newRole) {
            this.USER_ROLE = newRole || 'BOR-HIN-KHUAT';  // ถ้าไม่มีค่าก็ใช้ default
            localStorage.setItem('userRole', this.USER_ROLE); // เก็บค่า USER_ROLE ใน localStorage
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
        navigateWithToken(token, buttonLabel, number, number1) {
            this.$router.push({
                name: 'Survey results',
                query: { token, label: buttonLabel, number, number1 }
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
        miningDoc1(token, buttonLabel) {
            this.$router.push({
                name: 'documentation1',
                query: { token , label: buttonLabel}
            });
        },
        nokDoc(token, buttonLabel, number) {
            this.$router.push({
                name: 'nokdocumment',
                query: { token, label: buttonLabel, number }
            });
        },
        nokDoc1(token, buttonLabel) {
            this.$router.push({
                name: 'documentation',
                query: { token, label: buttonLabel }
            });
        },
        test(token, valueDoc, number,number1) {
            this.$router.push({
                name: 'testdocument',
                query: { token, label: valueDoc, number,number1 }
            });
        },
        paymentdoc(token, valueDoc, number,number1) {
            this.$router.push({
                name: 'paydocument',
                query: { token, label: valueDoc, number, number1 }
            });
        },
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
            this.DocServey();
            this.vichaiExample();
            this.functionSisterNok();
            this.paymentAll();
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
                        this.report_ResultOfServey = data.data.filter(item => item.name === 'documment');
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
                        this.sisterNokAll = data.data.filter(item => item.name === 'nok');
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
                        this.vichaiAll = data.data.filter(item => item.name === 'testData');
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
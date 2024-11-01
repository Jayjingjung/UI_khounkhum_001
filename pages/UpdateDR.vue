<template>
    <div class="pt-5">
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <v-card class="card-shadow mx-auto" width="1300">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="./HR/akasarn">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ແບບຟອມເພີ່ມ ຂໍ້ມູນ ເອກກະສານ
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
                <v-form v-model="valid" lazy-validation ref="form">
                    <v-row>
                        <height />
                    </v-row>

                    <v-row>
                        <height />

                        <v-col cols="6" md="3" sm="3">
                            <div>
                                <v-text-field style="width: 400px;" label="* ເລກທີ" dense outlined
                                    background-color="#13d95a" v-model="lektee"></v-text-field>
                            </div>
                        </v-col>


                        <v-col cols="6" md="3" sm="3">

                            <v-text-field style="width: 400px;" label="* ເລກທີເອກະສານຂາເຂົ້າ" dense outlined
                                background-color="#13d95a" v-model="inboundnumber"></v-text-field>

                        </v-col>
                        <v-col cols="6" md="3" sm="3">

                            <v-text-field style="width: 400px;" label="* ເລກທີເອກະສາພາຍໃນ" dense outlined
                                background-color="#13d95a" v-model="inside"></v-text-field>

                        </v-col>
                        <v-col cols="6" md="3" sm="3">


                            <v-text-field style="width: 400px;" label="* ເລກທີເອກະສານຂາອອກ" dense outlined
                                background-color="#13d9bf" v-model="outboundnumber"></v-text-field>

                        </v-col>


                        <v-col cols="6" md="3" sm="3">
                            <v-text-field style="width: 400px;" label="ວັນທີນຳເຂົ້າ" dense outlined
                                background-color="#f5f5f5" v-model="datetakein" type="date"></v-text-field>
                        </v-col>

                        <v-col cols="6" md="3" sm="3">
                            <v-text-field style="width: 400px;" label="ວັນທີໝົດອາຍຸຂອງເອກະສານ" dense outlined
                                background-color="#f5f5f5" v-model="dateExpDoc" type="date"></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <!-- <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="* ປະເພດ " dense
                            outlined background-color="#13d95a" v-model="documentType"></v-text-field>

                        <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="* ບໍລິສັດ "
                            dense outlined background-color="#c6a50b" v-model="company"></v-text-field> -->





                        <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="*ບ້ວງ " dense
                            outlined background-color="#b96c02" v-model="bouang"></v-text-field>
                    </v-row>

                    <div>
                        <v-row>
                            <v-autocomplete style="width: 100px;margin-left: 15px;margin-right: 15px;" outlined dense
                                label="ປະເພດ ທີເພີ່ມເອງ" :items="products_data_list" item-text="typeName"
                                item-value="id" background-color="#13d95a"
                                @change="onGetProductDetails"></v-autocomplete>

                            <v-autocomplete style="width: 100px; margin-left: 15px; margin-right: 15px;" outlined dense
                                label="ບໍລິສັດ" :items="loca_data_list" item-text="province" item-value="id"
                                background-color="#c6a50b" @change="onGetLocaDetails"></v-autocomplete>

                            <v-autocomplete style="width: 100px; margin-left: 15px; margin-right: 15px;" outlined dense
                                label="ບ້ວງ" :items="buang_data_list" item-text="nameOfBouang" item-value="key_id"
                                background-color="#c6a50b" @change="onGetbuangDetails"></v-autocomplete>
                        </v-row>
                    </div>
                    <v-row>

                        <v-select background-color="#ffa5f1" dense outlined
                            style="width: 100px;margin-left: 15px;margin-right: 15px;" :items="conditionalItems1"
                            v-model="classofdocs" label="ໃບອະນຸຍາດ"></v-select>
                        <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;"
                            label="* ຜູ້ນຳເອກະສານມາ" dense outlined background-color="#99dbd2"
                            v-model="whocarrydoc"></v-text-field>



                        <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="*ເນື້ອໃນເອກະສານ"
                            dense outlined background-color="#99dbd2" v-model="content_doc"></v-text-field>





                        <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="* ອື່ນໆ" dense
                            outlined background-color="#99dbd2" v-model="etc"></v-text-field>

                    </v-row>
                    <v-row justify="center">
                        <v-btn class="mr-4" width="130" color="success" @click="onInserEmpInfo">ບັນທຶກ</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2';
import pdf from 'vue-pdf';

export default {
    components: {
        pdf,
    },
    data() {
        return {
            loading_processing: false,
            company: '',
            documentType: '',
            conditionalItems1: ['ຂັ້ນເມືອງ', 'ຂັ້ນເເຂວງ', 'ຂັ້ນສໍານັກງານນາຍົກ'],
            classofdocs: '',
            products_data_list: [],
            loca_data_list: [],
            USER_ID: '',
            USER_NAME: '',
            content_doc: '',
            dateExpDoc: '',
            dateCreate: '',
            whocarrydoc: '',
            buang_data_list: [],

            etc: '',
            bouang: '',
            USER_ROLE: '',
            valid: true,
        };
    },

    mounted() {
        if (this.$route.query.key_id) {
            this.onGetadd(this.$route.query.key_id);
        }
        this.onGetAll();
        this.onGetbuang();
        this.onGetLocationList();
        this.USER_ID = localStorage.getItem('USER_ID');
        this.USER_NAME = localStorage.getItem('USER_NAME');
        this.USER_ROLE = localStorage.getItem('USER_ROLE');
    },

    methods: {
        addNewItem(newItem) {
            if (!this.dropdownItems.includes(newItem)) {
                this.dropdownItems.push(newItem);
            }
        },
        async onGetadd(key_id) {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('listDocumentDetail.service', {
                    key_id: key_id,
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    const itemData = response.data[0];
                    this.company = itemData.company;
                    this.documentType = itemData.docType;
                    this.classofdocs = itemData.classofdocs;

                    this.lektee = itemData.lektee;
                    this.inboundnumber = itemData.inboundnumber;
                    this.inside = itemData.inside;
                    this.outboundnumber = itemData.outboundnumber;
                    this.dateExpDoc = itemData.dateExpDoc;
                    this.datetakein = itemData.datetakein;

                    this.bouang = itemData.bouang;
                    this.whocarrydoc = itemData.whocarrydoc;
                    this.content_doc = itemData.content_doc;
                    this.etc = itemData.etc;



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
        onGetbuangDetails(key_id) {
            let data = this.buang_data_list.filter((el) => el.key_id === key_id);
            this.buang_send_buang = data[0]?.nameOfBouang;
            this.bouang = data[0]?.nameOfBouang; // Assign province to company
        },
        async onGetbuang() {
            try {
                this.loading_processing = true
                await this.$axios.$post('/getBouangAll.service',

                    {

                        toKen: localStorage.getItem('toKen'),


                    }).then((data) => {
                        if (data?.status == '00') {
                            this.buang_data_list = data?.data
                            this.loading_processing = false
                            console.log('buang:', this.buang_data_list)
                        } else {
                            this.loading_processing = false
                            swal.fire({
                                title: 'ແຈ້ງເຕືອນ',
                                text: data?.message,
                                icon: 'info',
                                allowOutsideClick: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK',
                            })
                        }
                    })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                })
            }
        },

        async onGetAll() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('getExpensesTypeAll.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response?.status === '00') {
                    this.products_data_list = response.data;
                    console.log('products_list:', this.products_data_list);
                }
            } catch (error) {
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },

        async onGetLocationList() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('getAllLocation', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response?.status === "00") {
                    this.loca_data_list = response.data;
                    console.log('Loca_list:', this.loca_data_list);
                }
            } catch (error) {
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.loading_processing = false;
            }
        },
        async onInserEmpInfo(key_id) {
            if (!this.$refs.form.validate()) return;

            try {
                const formdata = new FormData();
                // formdata.append('files', this.doc);
                formdata.append('branchUser', localStorage.getItem("USER_ROLE"));
                formdata.append('documentType', this.documentType); // Send the selected documentType
                formdata.append('toKen', localStorage.getItem("toKen"));
                formdata.append('lektee', this.lektee);
                formdata.append('datetakein', this.datetakein);
                formdata.append('dateExpDoc', this.dateExpDoc);
                formdata.append('company', this.company);
                formdata.append('key_id', this.$route.query.key_id);



                formdata.append('classofdocs', this.classofdocs);
                formdata.append('content_doc', this.content_doc);
                formdata.append('whocarrydoc', this.whocarrydoc);
                formdata.append('etc', this.etc);
                formdata.append('bouang', this.bouang);

                if (this.inboundnumber) {
                    formdata.append('inboundnumber', this.inboundnumber);
                    formdata.append('outboundnumber', '');
                    formdata.append('inside', '');
                    formdata.append('bound', 'in');
                } else if (this.outboundnumber) {
                    formdata.append('outboundnumber', this.outboundnumber);
                    formdata.append('inboundnumber', '');
                    formdata.append('inside', '');
                    formdata.append('bound', 'out');
                }
                else if (this.inside) {
                    formdata.append('inside', this.inside);
                    formdata.append('inboundnumber', '');
                    formdata.append('outboundnumber', '');
                    formdata.append('bound', 'inside');
                } else {
                    formdata.append('inboundnumber', '');
                    formdata.append('inside', '');
                    formdata.append('outboundnumber', '');
                    formdata.append('bound', '');
                }

                this.loading_processing = true;
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/UpdateDocument.service', formdata);
                console.log("Response:", data);

                if (data?.status === "00") {
                    this.loading_processing = false;
                    swal.fire({
                        title: 'ສຳເລັດ',
                        icon: 'success',
                        allowOutsideClick: false,
                    });

                } else {
                    this.loading_processing = false;
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: data?.message,
                        icon: 'error',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        }
        ,

        onGetProductDetails(id) {
            let data = this.products_data_list.filter((el) => el.id === id);
            this.product_name = data[0]?.proName;
            this.documentType = id;
        },

        onGetLocaDetails(id) {
            let data = this.loca_data_list.filter((el) => el.id === id);
            this.company = data[0]?.province;
        },
    },
};
</script>

<style lang="scss">
.margintops {
    margin-top: -25px;
}

.top {
    margin-top: 5px;
    margin-left: 10px;
}

.tops {
    margin-top: -25px;
    font-size: 14px;
}

.preview-image {
    width: 220px;
    height: 220px;
}
</style>

<template>
    <div>
        <v-card class="card-shadow mx-auto" style="border-radius: 36px 1px 36px 2px;" width="430">
            <v-card-title style="display:flex;background-color:#2bcc96; border-radius:36px 0 36px  0;">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" @click="$router.back()">
                    <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div class="font-weight-bold" v-if="number1"> 
                    {{ number1 }}
                </div>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-title v-if="buttonname">
                <v-chip color="#2bcc96" dense class="font-weight-bold">
                    {{ buttonname }}
                </v-chip>
            </v-card-title>
            <v-card-text class="pa-8 mx-auto" style="border:0px solid #e0e0e0">
                <v-form v-model="valid" lazy-validation ref="form">
                    <v-text-field label="ເລືອກວັນທີ່" v-model="dateInsert" prepend-icon="mdi-calendar" readonly
                        @click="datePicker = true" :style="{ width: '250px' }"></v-text-field>

                    <v-dialog v-model="datePicker" width="290">
                        <v-date-picker v-model="dateInsert" @input="datePicker = false"></v-date-picker>
                    </v-dialog>

                    <v-file-input label="ເລືອກໄຟສ໌" v-model="files" prepend-icon="mdi-paperclip"
                        @change="previewImage"></v-file-input>

                    <v-text-field label="ເພີ່ມຊື່ເອກະສານ" dense v-model="type"
                        :rules="[v => !!v || 'ຈໍາເປັນຕ້ອງເພີ່ມຊື່']" required></v-text-field>

                    <v-card class="card-shadow mx-auto" flat>
                        <v-card-text>
                            <div class="font-weight-bold">
                                ປະເພດເອກະສານ
                            </div>
                            <v-radio-group v-model="inputMethod" row>
                                <v-radio label="ພີມເອງ" value="textField"></v-radio>
                                <v-radio label="ເລືອກຈາກລາຍການ" value="select"></v-radio>
                            </v-radio-group>
                            <div v-if="inputMethod === 'textField'">
                                <v-text-field label="ພີມຊື່ປະເພດ" dense v-model="nameDetail"
                                    :rules="[v => !!v || 'ຈໍາເປັນຕ້ອງປ້ອນ']" required></v-text-field>
                            </div>
                            <div v-if="inputMethod === 'select'">
                                <v-select v-model="nameDetail" :items="filteredNameDetails" label="ເລືອກປະເພດເອກະສານ"
                                    dense outlined :rules="[v => !!v || 'ຈໍາເປັນຕ້ອງເລືອກປະເພດ']" required />
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-row justify="center">
                        <v-btn class="mt-8 font-weight-bold" width="130" color="#2bcc96" @click="onInmining">
                            ບັນທືກ
                        </v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {
            loading_processing: false,
            USER_NAME: localStorage.getItem('USER_NAME'),
            files: null,
            dateInsert: null,
            type: '',
            toKen: "tZl011U2nNs9AdvQDIStduuOIc8yWmxw",
            key_id:'',
            buttonname: '',
            valid: false,
            number: null,
            number1:'',
            datePicker: false,
            nameDetail: '',
            nameDetails: [],
            inputMethod: 'textField',
        };
    },
    computed: {
        filteredNameDetails() {
            // ກອງຄ່າ null, ຄ່າ "ເອກະສານ" ແລະສະແດງຄ່າທີ່ບໍ່ຊ້າກັນ
            const nonNullDetails = this.nameDetails.filter(item => item && item.nameDetail  !== "null" && item.nameDetail !== "ເອກະສານ");
            const uniqueDetails = [...new Set(nonNullDetails.map(item => item.nameDetail))];
            return uniqueDetails;
        }
    },
    mounted() {
        const key_id = this.$route.query.key_id;
        const label = this.$route.query.label;
        const number = this.$route.query.number;
        const number1 = this.$route.query.number1;
        if (key_id && label) {
            this.key_id=key_id;
            this.buttonname = label;
            this.fetchNameDetails();
        }
        if (number && number1) {
            this.number = number;
            this.number1 = number1;
        }
    },
    methods: {
        async fetchNameDetails() {
            try {
                const response = await this.$axios.$post('/ShowAllResultOfServey.service', {
                    branchUser: this.USER_ROLE,
                    toKen: this.toKen,
                });
                if (response?.status === '00') {
                    this.nameDetails = response.data || [];
                } else {
                    this.nameDetails = [];
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: 'Failed to fetch data: ' + error.message,
                });
            }
        },
        async onInmining() {
            if (!this.$refs.form.validate()) return;
            try {
                const formdata = new FormData();
                formdata.append('files', this.files);
                formdata.append('type', this.type);
                formdata.append('name', this.number);
                formdata.append('nameDetail', this.nameDetail);
                formdata.append('dateInsert', new Date(this.dateInsert).toLocaleDateString('en-CA'));
                formdata.append('toKen', this.toKen);
                formdata.append('branch_id', this.key_id);
                this.loading_processing = true;

                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/InsertResultOfSurvey.service', formdata);

                if (data?.status === '00') {
                    this.loading_processing = false;
                    swal.fire({
                        title: 'ສຳເລັດ',
                        text: 'Data saved successfully!',
                        icon: 'success',
                    });
                    this.onClearData();
                } else {
                    this.loading_processing = false;
                    swal.fire({
                        icon: 'error',
                        text: 'Failed to save data!',
                    });
                }
            } catch (error) {
                this.loading_processing = false;
                swal.fire({
                    icon: 'error',
                    text: 'An error occurred while saving data: ' + error.message,
                });
            }
        },
        onClearData() {
            this.files = null;
            this.type = '';
            this.dateInsert='',
            this.name='',
            this.nameDetail='',
            this.selectedToken = ''; // Clear selectedToken when clearing form
        },
    },
};
</script>
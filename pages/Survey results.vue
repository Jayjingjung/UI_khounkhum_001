<template>
    <div class="pt-5">

        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <v-card class="card-shadow mx-auto" style="border-radius: 36px 1px 36px 2px;" width="430">
            <v-card-title style="display:flex;background-color:#2bcc96; border-radius:36px 0 36px  0;">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white"  @click="$router.back()">
                    <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div class="font-weight-bold">
                    {{ reLabel }}
                </div>
                <v-spacer></v-spacer>
            </v-card-title>
            <div>
                <div>
                    <v-card-title v-if="buttonLabel">
                        <v-chip color="#2bcc96" dense class="font-weight-bold">
                            {{ buttonLabel }}
                        </v-chip>
                    </v-card-title>
                </div>
            </div>
            <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
                <v-form v-model="valid" lazy-validation ref="form">
                    <!-- ວັນທີ່ -->
                    <v-text-field  label="ເລືອກວັນທີ່" v-model="dateInsert" prepend-icon="mdi-calendar" readonly
                        @click="datePicker = true" :style="{ width: '250px' }"></v-text-field>

                    <v-dialog v-model="datePicker" width="290">
                        <v-date-picker v-model="dateInsert" @input="datePicker = false"></v-date-picker>
                    </v-dialog>
                    <v-file-input :label="computedLabel" v-model="files" prepend-icon="mdi-paperclip"
                        @change="previewImage">
                    </v-file-input>
                    <v-text-field label="ພີມຊື່" dense v-model="type"
                        :rules="[v => !!v || 'ຈໍາເປັນຕ້ອງເພີ່ມຊື່']" required>
                    </v-text-field>
                    <v-row justify="center">
                        <v-btn class="mt-8 font-weight-bold" width="130" color="#2bcc96"
                            @click="onInmining">ບັນທືກ</v-btn>
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
            type: '',
            toKen: '', // Add toKen property
            valid: false,
            dropdownItems: ['ບົດວິພາກເຕັກນິກ', 'ບົດວິພາກເສດຖະກິດ'],
            selectedToken: '', // Add selectedToken to track selected button
            number: null,
            datePicker: false
        };
    },
    mounted() {
        // รับค่า token และ label จาก query และแสดง
        const token = this.$route.query.token;
        const label = this.$route.query.label;
        const number = this.$route.query.number;
        const number1 = this.$route.query.number1;
        if (token && label) {
            this.setToKen(token);
            this.buttonLabel = label;
        }
        if (number&& number1) {
            this.number = number;
            this.number1 = number1;
        }
    },
    computed: {
        computedLabel() {
            return this.USER_NAME === 'Geo-Explo'
                ? 'ບົດລາຍງານ'
                : 'ເລືອກໄຟລ໌';
        },
        reLabel() {
            return this.USER_NAME === 'Geo-Explo'
                ? 'ບົດລາຍງານ'
                : 'ເພີ່ມຂໍ້ມູນຜົນການສຳຫຼວດ'; // Customize this label based on your requirements
        },
    },
    methods: {
        setToKen(token) {
            this.toKen = token; // Assign clicked token to the toKen property
            this.selectedToken = token; // Update selectedToken when a button is clicked
        },
        getButtonStyle(token) {
            // Conditionally return the button style
            return {
                width: '150px',
                height: '40px',
                fontSize: '18px',
                backgroundColor: this.selectedToken === token ? '#2382dc' : '', // Set background color if selected
                color: this.selectedToken === token ? 'white' : 'black', // Change text color if selected
            };
        },
        async onInmining() {
            if (!this.$refs.form.validate()) return;

            try {
                const formdata = new FormData();
                formdata.append('files', this.files);
                formdata.append('type', this.type);
                formdata.append('name', this.number);
                formdata.append('nameDetail', this.number1);
                formdata.append('dateInsert', new Date(this.dateInsert).toLocaleDateString('en-CA'));
                formdata.append('toKen', this.toKen);
                this.loading_processing = true;

                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/InsertResultOfSurvey.service', formdata);
                console.log("Response:", data);

                if (data?.status === "00") {
                    this.loading_processing = false;
                    swal.fire({
                        title: 'ສຳເລັດ',
                        icon: 'success',
                        allowOutsideClick: false,
                    });
                    this.onClearData();
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
        },


        updateConditionalItems() {
            // Handle any additional logic when dropdown selection changes
        },
        previewImage() {
            // Handle image preview logic
        },
        onClearData() {
            this.files = null;
            this.type = '';
            this.selectedToken = ''; // Clear selectedToken when clearing form
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
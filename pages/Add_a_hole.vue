<template>
    <div class="pt-5">
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-card class="card-shadow mx-auto" width="800">
            <v-card-title style="display:flex;background-color:#2bcc96; font-weight: bold;">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white"  @click="$router.back()">
                    <v-icon color="#2bcc96">mdi-arrow-left</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
                {{ retedLabel }}
                <v-spacer></v-spacer>
            </v-card-title>

            <div>
                <div>
                    <v-card-title v-if="village">
                        <v-chip color="#2bcc96" dense class="font-weight-bold">
                            {{ village}}
                        </v-chip>
                    </v-card-title>
                </div>
                <div :style="getButtonStyle()">
                </div>
                <div>
                    <!-- <v-btn :style="getButtonStyle('tZl011U2nNs9AdvQDIStduuOIc8yWmxw')"
                        @click="setToKen('tZl011U2nNs9AdvQDIStduuOIc8yWmxw')">
                        ຄອນງົວ
                    </v-btn>

                    <v-btn :style="getButtonStyle('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF')"
                        @click="setToKen('3iKcWacuOwaXxERfL6LNvuEKdjhvc5aF')">
                        ສີຄູນ
                    </v-btn>

                    <v-btn :style="getButtonStyle('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa')"
                        @click="setToKen('e23QZokLhZNSVtXP1qYQHM8PVHr76VQa')">
                        ບ້ານທ່າ
                    </v-btn>

                    <v-btn :style="getButtonStyle('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123')"
                        @click="setToKen('phonkham123kOQHMwA1Ve9lMq22X3kpSiaIbDO123')">
                        ໂພນຄໍາ
                    </v-btn>

                    <v-btn :style="getButtonStyle('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO')"
                        @click="setToKen('kOQHMwA1Ve9lMq22X3kpSiaIbGGKghDO')">
                        ຊຽງຄົງ
                    </v-btn>

                    <v-btn :style="getButtonStyle('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456')"
                        @click="setToKen('namzao123kOQHMwA1Ve9lMq22X3kpSiaIbKghDO456')">
                        ນໍ້າຊາວ
                    </v-btn>

                    <v-btn :style="getButtonStyle('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789')"
                        @click="setToKen('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789')">
                        ໜອງພູນໄຊ32,28
                    </v-btn>

                    <v-btn :style="getButtonStyle('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112')"
                        @click="setToKen('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112')">
                        ໜອງພູນໄຊ62,39
                    </v-btn>

                    <v-btn :style="getButtonStyle('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415')"
                        @click="setToKen('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415')">
                        ລາດຫໍ້
                    </v-btn> -->
                </div>
            </div>
            <v-card-text class="pa-8 mx-auto" width="300" style="border:0px solid #e0e0e0">
                <v-form v-model="valid" lazy-validation ref="form">
                    <v-row>
                        <height />
                        <v-file-input style="width: 100%;" label="ອັບໂຫຼດເອກກະສານ" dense
                            append-inner-icon="mdi-file-pdf" background-color="#f5f5f5" v-model="files"></v-file-input>

                        <!-- Conditional rendering based on USER_NAME -->
                        <v-text-field v-if="USER_NAME !== 'Geo-Explo'" style="width: 100%;" label="ຊື່ເຕັມຮູເຈາະ" dense
                            v-model="full_Name_Hole_number" />

                        <v-text-field style="width: 100%;" :label="computedLabel" dense 
                            v-model="holeNumber"></v-text-field>

                        <!-- Conditional rendering based on USER_NAME -->
                        <v-text-field v-if="USER_NAME !== 'Geo-Explo'" style="width: 100%;" label="*  ຂໍ້ມູນ Collar"
                            dense v-model="dataColler"></v-text-field>
                    </v-row>
                    <v-row justify="center">
                        <v-btn class="mr-4 font-weight-bold" width="130" color="#2bcc96"
                            @click="onInmining">ບັນທຶກ</v-btn>
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
            valid: false,
            type: '',
            toKen: "tZl011U2nNs9AdvQDIStduuOIc8yWmxw",
            key_id:'',
            selectedToken: '', // Add selectedToken to track selected button
            loading_processing: false,
            full_Name_Hole_number: "",
            dataColler: "",
            holeNumber: "",
            files: null,
            village:null,
            USER_NAME: localStorage.getItem('USER_NAME'), // Fetch the USER_NAME from localStorage
        };
    },
    mounted() {
        // รับค่า token และ label จาก query และแสดง
        const key_id = this.$route.query.key_id;
        const village = this.$route.query.village;
        if (key_id && village) {
            this.key_id=key_id;
            this.village = village;
        }
    },
    computed: {
        computedLabel() {
            return this.USER_NAME !== 'Geo-Explo'
                ? 'ຂໍ້ມູນເດີນສໍາຫຼວດ'
                : 'ຊື່ເຂດ';
        },
        retedLabel() {
            return this.USER_NAME !== 'Geo-Explo'
                ? 'ແບບຟອມ ເພີ່ມຮູເຈາະ'
                : 'ຂໍ້ມູນເດີນສໍາຫຼວດ';
        },
    },
    methods: {
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
                formdata.append('full_Name_Hole_number', this.full_Name_Hole_number);
                formdata.append('holeNumber', this.holeNumber);
                formdata.append('dataColler', this.dataColler);
                formdata.append('toKen', this.toKen);
                formdata.append('key_id', this.key_id);

                this.loading_processing = true;
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/StoreDataHole.service', formdata);

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
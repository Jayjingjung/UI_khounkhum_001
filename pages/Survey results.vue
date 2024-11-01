<template>
    <div class="pt-5">

        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <v-card class="card-shadow mx-auto" width="800">
            <v-card-title style="display:flex;background-color:#2bcc96;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="/stone_admin">
                    <v-icon color="#0a3382">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                {{ reLabel }}
                <v-spacer></v-spacer>
            </v-card-title>
            <div>
                <div>


                    <v-btn :style="getButtonStyle('tZl011U2nNs9AdvQDIStduuOIc8yWmxw')"
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

                    <v-btn style="width: 200px;" :style="getButtonStyle('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789')"
                        @click="setToKen('nongphounxai3kOQHMwA1Ve9lMq22X3kpSiaIDO789')">
                          ໜອງພູນໄຊ32,28
                    </v-btn>

                    <v-btn style="width: 200px;" :style="getButtonStyle('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112')"
                        @click="setToKen('knongphounxaiOQHMwA1Ve9lMq22X3kpSiahDO101112')">
                        ໜອງພູນໄຊ62,39 
                    </v-btn>

                    <v-btn :style="getButtonStyle('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415')"
                        @click="setToKen('kOlardhor123QHMwA1Ve9lMq22X3GGKghDO13214415')">
                        ລາດຫໍ້
                    </v-btn>
                </div>
            </div>
            <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
                <v-form v-model="valid" lazy-validation ref="form">
                    <v-row>
                        <v-col>
                            <v-file-input style="width: 100%;" :label="computedLabel" outlined dense
                                prepend-icon="mdi-file-pdf" append-inner-icon="mdi-file-pdf" background-color="#f5f5f5"
                                v-model="files" @change="previewImage"></v-file-input>
                        </v-col>
                    </v-row>

                    <v-col>
                        <v-text-field label="* ປະເພດ ພິມເອງ" dense outlined background-color="#f5f5f5"
                            v-model="type"></v-text-field>
                    </v-col>
                    <div v-if="USER_NAME !== 'Geo-Explo'">
                        <v-row>
                            <v-col>
                                <v-select :items="dropdownItems" dense outlined v-model="type" label="ປະເພດ"
                                    @change="updateConditionalItems" autocomplete
                                    :menu-props="{ auto: true }"></v-select>
                            </v-col>
                        </v-row>
                    </div>
                    <v-row justify="center">
                        <v-btn class="mr-4" width="130" color="success" @click="onInmining">ບັນທຶກ</v-btn>
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
        };
    },
    computed: {
        computedLabel() {
            return this.USER_NAME === 'Geo-Explo'
                ? 'ບົດລາຍງານ'
                : 'ອັບໂຫຼດເອກກະສານ';
        },
        reLabel() {
            return this.USER_NAME === 'Geo-Explo'
                ? 'ບົດລາຍງານ'
                : 'ແບບຟອມ ຜົນການສໍາຫຼວດ'; // Customize this label based on your requirements
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
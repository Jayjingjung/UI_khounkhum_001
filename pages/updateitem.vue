<template>
    <div class="pt-5">
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <v-card class="card-shadow mx-auto" width="1600">
            <v-card-title style="display:flex;background-color:#E57373;color:white">
                <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="./repair/add">
                    <v-icon color="#E57373">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                ແບບຟອມ ອັບເດດ ຂໍ້ມູນ ອາໄຫຼ່
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
                <v-form v-model="valid" lazy-validation ref="form">
                    <v-row>
                        <v-col cols="3" align="center" class="mt-4">
                            <v-card class="text-center" max-width="500px">
                                <img :src="img" height="220px" cover>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-row>
                                <v-col>
                                    <v-file-input :rules="nameRules" label="ອັບໂຫຼດຮູບ" outlined dense
                                        prepend-icon="mdi-camera" append-inner-icon="mdi-card-account-details"
                                        background-color="#f5f5f5" v-model="img"></v-file-input>
                                </v-col>
                                <v-col>
                                    <v-text-field label="* ລະຫັດ" dense outlined background-color="#f5f5f5"
                                        v-model="itemName"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ສີ" dense outlined background-color="#f5f5f5"
                                        v-model="unit"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ລາຄາ" dense outlined background-color="#f5f5f5"
                                        v-model="unit_price"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3" sm="3">
                                    <v-text-field label="* ຈຳນວນ" dense outlined background-color="#f5f5f5"
                                        v-model="qty"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row justify="end">
                        <v-btn class="mr-4" width="130" style="background-color: gray;color: aliceblue;"
                            @click="onupdateitem">ບັນທຶກ</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>


<script>
import swal from 'sweetalert2'

export default {
    data() {
        return {
            loading_processing: false,
            img: null,
            itemName: '',
            unit: '',
            unit_price: '',
            qty: '',
            valid: false,
            item_id: '',
        }
    },

    mounted() {
        if (this.$route.query.item_id) {
            this.onGetadd(this.$route.query.item_id);
        }
    },

    methods: {
        async onGetadd(item_id) {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('ListItemsDetail.service', {
                    item_id: item_id,
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API response:', response);

                if (response?.status === '00' && response?.data) {
                    const itemData = response.data[0];
                    this.item_id = itemData.item_id;
                    this.itemName = itemData.itemName;
                    this.unit = itemData.unit;
                    this.unit_price = itemData.unit_price;
                    this.qty = itemData.qty;
                    this.img = itemData.img;
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

        async onupdateitem() {
            if (!this.$refs.form.validate()) return null;
            try {
                const formdata = new FormData();
                formdata.append('files', this.img);
                formdata.append('item_id', this.item_id);
                formdata.append('itemName', this.itemName);
                formdata.append('unit', this.unit);
                formdata.append('unit_price', this.unit_price);
                formdata.append('qty', this.qty);
                formdata.append('toKen', localStorage.getItem("toKen"));

                this.loading_processing = true;
                const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/updateItem.service', formdata);
                console.log("Response:", data);
                if (data?.status == "00") {
                    this.loading_processing = false;
                    swal.fire({
                        title: 'ສຳເລັດ',
                        icon: 'success',
                        allowOutsideClick: false,
                    });
                    if (typeof this.onClearData === 'function') {
                        this.onClearData();
                    } else {
                        console.error("onClearData is not a function");
                    }
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
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },

        showErrorAlert(title, text) {
            swal.fire({
                title: title,
                text: text,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        },
    },


}
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

.red-background {
    background-color: red !important;
}
</style>

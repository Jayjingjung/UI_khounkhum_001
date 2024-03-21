<template>
    <div>
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>
        <v-dialog max-width="500" v-model="showDetail">
            <v-card>
                <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center" class="pa-2">
                    <h3>ຂໍ້ມູນທີໄດ້ແກ້ໄຂຂໍ້ມູນ</h3>
                    <v-btn icon @click="showDetail = false"><v-icon>mdi-close</v-icon></v-btn>
                </div>
                <v-divider></v-divider>
                <div class="pa-2 py-6 text-center" style="background-color:#DBECEB">
                    <span>{{ detail }}</span>
                </div>
            </v-card>
        </v-dialog>
        <v-card flat>
            <v-card-title>ປະຫວັດການແກ້ໄຂຂໍ້ມູນຫົວລົດ</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div class="d-flex align-center" style="width:100%">

                        <div class="d-flex align-center pl-2">
                            <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                                :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ"
                                        prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="nameRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="start_date" no-title scrollable
                                    @input="$refs.start_menu.save(start_date)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div class="d-flex align-center pl-2">
                            <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                                :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ"
                                        prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                        :rules="nameRules"></v-text-field>
                                </template>
                                <v-date-picker v-model="end_date" no-title scrollable
                                    @input="$refs.end_menu.save(end_date)">
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div style="margin-top:-25px" class="ml-2">
                            <v-btn color="green" elevation="0" class="white--text"
                                @click="onGetHeadReport"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                        </div>
                    </div>
                </v-form>
                <div>
                    <h3>ທັງໝົດ: <span class="green--text">{{ head_report_list?.length }}</span></h3>
                    <!-- <v-divider class="mt-2 mb-2"></v-divider> -->
                    <v-data-table :items="head_report_list" :headers="header_report_header">
                        <template v-slot:item="row">
                            <tr :style="{ 'background-color': row?.index % 2 === 0 ? '#f5f5f5' : '#fff' }">

                                <td>{{ row.item.h_VICIVLE_NUMBER }}</td>
                                <td>{{ row.item.h_VICIVLE_BRANCH }}</td>
                                <td>{{ row.item.h_VICIVLE_BRANCHTYPE }}</td>
                                <td>{{ row.item.h_VICIVLE_GALATY }}</td>
                                <td>{{ row.item.h_VICIVLE_DATE_GALATY }}</td>
                                <td>{{ row.item.h_VICIVLE_YEARLEVEL }}</td>
                                <td>{{ row.item.his_DATE }}</td>
                                <td class="green--text"><v-icon color="green">mdi-check-circle</v-icon>{{
                                    row.item.his_REASON }}
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            nameRules: [(v) => !!v || 'ຕ້ອງເລືອກ'],
            loading_processing: false,
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            head_report_list: [],
            showDetail: false,
            detail: '',
            header_report_header: [
                { text: 'ທະບຽນລົດ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ຍີ່ຫໍ້ລົດ', value: 'h_VICIVLE_BRANCH' },
                { text: 'ປະເພດລົດ', value: 'h_VICIVLE_BRANCHTYPE' },
                { text: 'ເລກປະກັນໄພ', value: 'h_VICIVLE_GALATY' },
                { text: 'ວັນທີປະກັນໄພໝົດ', value: 'h_VICIVLE_DATE_GALATY' },
                { text: 'ລົດປີ', value: 'h_VICIVLE_YEARLEVEL' },
                { text: 'ວັນທີແກ້ໄຂ', value: 'h_VICIVLE_YEARLEVEL' },
                { text: 'ຂໍ້ມູນທີແກ້ໄຂ', value: '' },

            ],
        }
    },
    mounted() {
    },
    methods: {
        onGetHeadReport() {
            if (!this.$refs.form.validate()) return null;
            let data = {
                "startDate": this.start_date,
                "endDate": this.end_date
            }
            try {
                this.$axios.$post('/ReportHeader.service', data).then((data) => {
                    console.log('report:', data)
                    if (data?.data) {
                        this.head_report_list = data?.data;
                    } else {
                        this.head_report_list = []
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        onGetChange(data) {
            this.showDetail = true;
            this.detail = data;
        }
    }
}
</script>

<style></style>
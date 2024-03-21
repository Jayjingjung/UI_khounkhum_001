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
            <v-card-title>ປະຫວັດການແກ້ໄຂຂໍ້ມູນຫາງລົດ</v-card-title>
            <v-card-text>
                <div class="d-flex align-center" style="width:100%">

                    <div class="d-flex align-center pl-2">
                        <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                            :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ"
                                prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
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
                                    prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div style="margin-top:-25px" class="ml-2">
                        <v-btn color="green" class="white--text" elevation="0"
                            @click="onGetFooterReport"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                    </div>
                </div>
                <!-- <v-divider></v-divider> -->
                <div class="pt-3">
                    <h3>ທັງໝົດ: <span class="green--text">{{ head_report_list?.length }}</span></h3>
                    <!-- <v-divider class="mt-2 mb-2"></v-divider> -->
                    <v-data-table dense :items="head_report_list" :headers="report_footer_headers">
                        <template v-slot:item="row">
                            <tr :style="{ 'background-color': row?.index % 2 === 0 ? '#f5f5f5' : '#fff' }">

                                <td>{{ row.item.f_CARD_NO }}</td>
                                <td>{{ row.item.f_BRANCH }}</td>
                                <td>{{ row.item.f_CAR_TYPE }}</td>
                                <!-- <td>{{ row.item.f_DATEEXPRIED }}</td> -->
                                <td>{{ row.item.f_GALATY_NO }}</td>
                                <td>{{ row.item.f_GALATY_DEP }}</td>
                                <td>{{ row.item.f_YEAR }}</td>
                                <td>{{ row.item.his_DATE }}</td>
                                <td class="green--text"><v-icon color="green">mdi-check-circle</v-icon>{{ row.item.his_REASON }}
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
            showDetail: false,
            detail: '',
            loading_processing: false,
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            head_report_list: [],
            report_footer_headers: [
                { text: 'ທະບຽນລົດ', value: 'f_CARD_NO' },
                { text: 'ຍີ່ຫໍ້ລົດ', value: 'f_BRANCH' },
                { text: 'ປະເພດລົດ', value: 'f_CAR_TYPE' },
                // { text: 'ເຕັກນິກໝົດ', value: 'f_DATEEXPRIED' },
                { text: 'ປະກັນໄພ', value: 'f_GALATY_NO' },
                { text: 'ປະກັນໄພໝົດ', value: 'f_GALATY_DEP' },
                { text: 'ລົດປີ', value: 'f_YEAR' },
                { text: 'ວັນທີແກ້ໄຂຂໍ້ມູນ', value: 'f_YEAR' },
                { text: 'ຂໍ້ມູນທີ່ແກ້ໄຂ', value: '' },

            ],
        }
    },
    mounted() {

    },
    methods: {
        onGetFooterReport() {
            let data = {
                "startDate": this.start_date,
                "endDate": this.end_date
            }
            try {
                this.$axios.$post('/ReportFooter.service', data).then((data) => {
                    console.log('report:', data?.data)
                    if (data?.data) {
                        this.head_report_list = data?.data
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
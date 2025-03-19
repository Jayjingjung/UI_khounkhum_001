<template>
    <div>
        <v-app-bar style="width: 100%;" fixed app color="#Bf0008" class="mt-2">


            <v-btn fab dark small>
                <img @click="onGoTo" class="mx-auto" src="../assets/images/logo01.png" width="80" />
            </v-btn>
            <!-- menu ຈັດການຂໍ້ມູນພື້ນຖານ -->
            <div style="margin-left: 20px;">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="white" v-bind="attrs" v-on="on" text elevation="0">
                            <v-icon color="#fff" size="18">mdi-book-open</v-icon>
                            ຈັດການບໍລິຫານ
                            <v-icon color="#fff">mdi-chevron-down-circle</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-btn color="white" to="" elevation="0" block><span
                                class="black--text"></span><v-spacer></v-spacer></v-btn>




                    </v-list>
                </v-menu>
                <v-menu v-if="USER_NAME == 'JT' " offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="white" v-bind="attrs" v-on="on" text elevation="0">
                            <v-icon color="#fff" size="18"> mdi-file-document-multiple</v-icon>
                            ຈັດການບໍລິຫານເລຂາ
                            <v-icon color="#fff">mdi-chevron-down-circle</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-btn color="white" to="stone_admin" elevation="0" block><span
                                class="black--text">document</span><v-spacer></v-spacer></v-btn>

                        <v-btn color="white" to="./HR/carindek_hr" elevation="0" block><span
                                class="black--text">ລົດບໍລິຫານ</span><v-spacer></v-spacer></v-btn>




                    </v-list>
                </v-menu>
            </div>
            <v-spacer />
            <v-btn style="width: auto;" rounded elevation="0" text>
                <v-icon color="#fff">mdi-account</v-icon>
                <span class="white--text">{{ USER_NAME }}</span>
            </v-btn>
            <v-chip style="width: auto;" v-if="TOTAL_branchName">{{ branchDisplayName }}</v-chip>
            <v-btn style="background-color: #f44336;width: 100px; margin-left: 20px; " rounded @click="onLogOut" text
                elevation="0">
                <v-icon color="white">mdi-power</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>

import swal from 'sweetalert2'
export default {
    data() {
        return {
            USER_ID: '',
            USER_NAME: '',
            USER_ROLE: '',
            TOTAL: '',
            TOTAL_INVOICE: '',
            TOTAL_FORMANCE: '',
            TOTAL_branchName: '',
            TOTAL_payStatus: '',
            TOTAL_totalOwe: '',
            TOTAL_notiDetails: '',
            sprit_role: '',
            loading_processing: false,
            getNotiTab3: {}
        }
    },
    computed: {
        branchDisplayName() {
            switch (this.TOTAL_branchName) {
                case 'Thakhaek':
                    return 'ທ່າເເຂກ';
                case 'XiengKhouang':
                    return 'ຊຽງຂວາງ';
                case 'vientiane':
                    return 'ວຽງຈັນ';
                case 'Savannakhet':
                    return 'ສະຫວັນນະເຂດ';
                default:
                    return this.TOTAL_branchName;
            }
        }
    },
    mounted() {
        this.USER_ID = localStorage.getItem('USER_ID');
        this.USER_NAME = localStorage.getItem('USER_NAME');
        this.USER_ROLE = localStorage.getItem('USER_ROLE');
        this.sprit_role = localStorage.getItem('sprit_role');

    },
    methods: {
        onPrint() {
            window.print();
        },
        onGoTo() {
            this.$router.push('/homepage');
        },
        onLogOut() {
            localStorage.clear();
            this.$router.push('/');
        },

    }
};
</script>
<style lang="scss"></style>

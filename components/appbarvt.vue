<template>
    <div>
        <!-- แถบเมนูสำหรับ HR และ FOR_DOCUMENT -->
        <v-app-bar style="width: 100%;" fixed app color="#Bf0008" class="mt-2"
            v-if="userRole === 'HR' || userRole === 'FOR_DOCUMENT'">
            <v-btn fab dark small>
                <img @click="onGoTo" class="mx-auto" src="../assets/images/logo01.png" width="80" />
            </v-btn>
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
                        <v-list-item to="/customer">
                            <v-list-item-title>ລູກຄ້າ</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/employee">
                            <v-list-item-title>ພະນັກງານ</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/products">
                            <v-list-item-title>ເພີ່ມສິນຄ້າ</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/locations">
                            <v-list-item-title>ເພີ່ມສະຖານທີຈັດສົ່ງ</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/morfai">
                            <v-list-item-title>ເພີ່ມຍີ່ຫໍ້ໝໍ້ໄຟ</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/create-expense-type">
                            <v-list-item-title>ປະເພດລາຍຮັບ - ລາຍຈ່າຍ</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="/insert_gas">
                            <v-list-item-title>ເພີ່ມສະຖານີປໍານໍ້າມັນ</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <v-spacer />
            <v-btn style="width: auto;" rounded elevation="0" text>
                <v-icon color="#fff">mdi-account</v-icon>
                <span class="white--text">{{ USER_NAME }}</span>
            </v-btn>
            <v-chip v-if="TOTAL_branchName">{{ branchDisplayName }}</v-chip>
            <v-btn style="background-color: #f44336;width: 100px; margin-left: 20px;" rounded @click="onLogOut" text
                elevation="0">
                <v-icon color="white">mdi-power</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- แถบเมนูสำหรับ FOR_DOCUMENT_ADMIN และ BOR-HIN-KHUAT -->
        <v-app-bar color="#A7FFEB" fixed v-if="userRole === 'FOR_DOCUMENT_ADMIN' || userRole === 'BOR-HIN-KHUAT'">
            <v-spacer />
            <v-btn style="width: auto;" rounded elevation="0" text>
                <v-icon color="black">mdi-account</v-icon>
                <span class="black--text">{{ USER_NAME }}</span>
            </v-btn>
            <v-chip v-if="TOTAL_branchName">{{ branchDisplayName }}</v-chip>
            <v-btn fab small style="background-color: #f44336;" rounded @click="onLogOut" text>
                <v-icon color="white">mdi-power</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {
            USER_ID: '',
            USER_NAME: '',
            userRole: '',
            TOTAL_branchName: '',
        };
    },
    computed: {
        branchDisplayName() {
            const branchNames = {
                'Thakhaek': 'ທ່າເເຂກ',
                'XiengKhouang': 'ຊຽງຂວາງ',
                'vientiane': 'ວຽງຈັນ',
                'Savannakhet': 'ສະຫວັນນະເຂດ'
            };
            return branchNames[this.TOTAL_branchName] || this.TOTAL_branchName;
        }
    },
    mounted() {
        this.USER_ID = localStorage.getItem('USER_ID') || '';
        this.USER_NAME = localStorage.getItem('USER_NAME') || '';
        this.userRole = localStorage.getItem('USER_ROLE') || '';
        this.TOTAL_branchName = localStorage.getItem('TOTAL_branchName') || '';

        console.log('USER_ROLE:', this.userRole);
    },
    methods: {
        onGoTo() {
            this.$router.push('/homepage');
        },
        onLogOut() {
            localStorage.clear();
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
/* ใส่ CSS เพิ่มเติมที่นี่ถ้าจำเป็น */
</style>

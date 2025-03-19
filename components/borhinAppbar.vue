<template>
    <div>
        <v-app-bar color="#A7FFEB" fixed v-if="userRole === 'FOR_DOCUMENT_ADMIN' || userRole === 'BOR-HIN-KHUAT'">
            <v-spacer />
            <v-btn style="width: auto;" rounded elevation="0" text>
                <v-icon color="black">mdi-account</v-icon>
                <span class="black--text">{{ USER_NAME }}</span>
            </v-btn>
            <v-chip v-if="TOTAL_branchName">{{ branchDisplayName }}</v-chip>
            <v-btn fab small style="background-color: #f44336; " rounded @click="onLogOut" text>
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

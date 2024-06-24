<template>
  <div>
    <div>
      <v-col cols="3">
        <!-- <img class="mx-auto" src="../assets/images/logo01.png" height="70px" cover /> -->

      </v-col>
      <v-row>
        <v-col cols="9">
          <div>
            <span ><b>
                <span style="font-size:20px; font-weight:bold;width: max-content;">ບໍລິສັດ ຄູນຄໍາ ຂົນສົ່ງ {{ branchDisplayName }}</span>
              </b> </span>
            <!-- <span style="font-size:12px">ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
              ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
            <span style="font-size:12px">ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
              |
              ເວັບໄຊ: kounkham</span> -->
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- Other template code -->
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  data() {
    return {
      TOTAL_branchName: '',
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
    this.getUserData();
  },
  methods: {
    async getUserData() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('/getNotiTab3.service', {
          toKen: localStorage.getItem('toKen'),
        });
        this.loading_processing = false;
        if (response.status === '00') {
          this.TOTAL_branchName = response.branchName;
        } else {
          swal.fire({
            icon: 'error',
            text: response.message
          });
        }
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          icon: 'error',
          text: error.message
        });
        console.error(error);
      }
    }
  }
}
</script>

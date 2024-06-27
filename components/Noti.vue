<template>
  <div>
    <div style="display: flex;">
      <img class="mx-auto" src="../assets/images/logo01.png" height="120px" cover />
      <span style="font-size:23px; font-weight:bold;margin-top: 40px;margin-left: 35px;">ບໍລິສັດ ຄູນຄໍາ ຂົນສົ່ງ {{ branchDisplayName }}</span>
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

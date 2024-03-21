<template>
  <div>
    <span style="font-size:15px; font-weight:bold">ບໍລິສັດ ຄູນຄໍາ ຂົນສົ່ງ {{ branchDisplayName }}</span>  
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
        default:
          return '';
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

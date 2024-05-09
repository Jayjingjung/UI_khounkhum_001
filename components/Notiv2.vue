<template>
    <div>
      <div style="display: flex;">
        <div cols="3" class="mr-10 ml-10">
          <img style="margin-top: -10px;" class="mx-auto" src="../assets/images/khounkham.png" height="120px" cover />
  
        </div>
        <div >
          <span style="font-size:26px; font-weight:bold; justify-content: center;">ບໍລິສັດ ຄູນຄໍາ ຂົນສົ່ງ {{
            branchDisplayName }}</span>
          <div style="font-weight:300;width: max-content;font-size:18px">
            <p>ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,
              ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</p>
            <p>ໂທລະສັບ: 020 92661111, 020 92 254 999 | ອີເມວ: kounkham@Mining
              |
              ເວັບໄຊ: kounkham</p>
          </div>
        </div>
      </div>
      <div class="text-center" style="display:flex;justify-content:center;font-size:25px;font-weight:bold;margin-top: 10px;margin-left: ">
        ໃບສະເໝີສັ່ງຊື້ສິນຄ້າ</div>
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
  <style>
  @media screen {
    #print {
      display: none;
    }
  }
  
  @media print {
    @page {
      size: A4;
      margin: 1in;
    }
  
    body * {
      visibility: hidden;
    }
  
    #print,
    #print * {
      visibility: visible;
    }
  
    #print {
      position: absolute;
      top: 0px;
      right: 0px;
      left: 0px;
    }
  }
  </style>
  
<template>
  <div class="pt-5">
    <v-dialog v-model="loading_processing" persistent width="55">
      <v-card width="55" height="55" class="pt-3 pl-3">
        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
      </v-card>
    </v-dialog>

    <v-card class="card-shadow mx-auto" width="1300">
      <v-card-title style="display:flex;background-color:#E57373;color:white">
        <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="./HR/akasarn">
          <v-icon color="#E57373">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        ແບບຟອມເພີ່ມ ຂໍ້ມູນ ເອກກະສານ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <height />

            <!-- <v-col>
              <v-file-input label="ອັບໂຫຼດເອກກະສານ" outlined dense prepend-icon="mdi-file-pdf"
                append-inner-icon="mdi-file-pdf" background-color="#f5f5f5" v-model="doc"
                @change="previewImage"></v-file-input>
            </v-col> -->
            <v-col>
              <v-file-input label="ອັບໂຫຼດເອກກະສານ" outlined dense prepend-icon="mdi-file-pdf"
                append-inner-icon="mdi-file-pdf" background-color="#f5f5f5" v-model="doc" @change="checkFileName">
              </v-file-input>
            </v-col>

            <v-col cols="6" md="3" sm="3">
              <div>
                <v-text-field style="width: 400px;" label="* ເລກທີ" dense outlined background-color="#13d95a"
                  v-model="lektee"></v-text-field>
              </div>
            </v-col>


            <v-col cols="6" md="3" sm="3">
              <div v-if="USER_NAME === 'kkin-out' || USER_NAME === 'minly37'">

                <v-text-field style="width: 400px;" label="* ເລກທີເອກະສານຂາເຂົ້າ" dense outlined
                  background-color="#13d95a" v-model="inboundnumber"></v-text-field>
              </div>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <div v-if="USER_NAME === 'kkin-out' || USER_NAME === 'minly37'">

                <v-text-field style="width: 400px;" label="* ເລກທີເອກະສາພາຍໃນ" dense outlined background-color="#13d95a"
                  v-model="inside"></v-text-field>
              </div>
            </v-col>
            <v-col cols="6" md="3" sm="3">
              <div v-if="USER_NAME === 'kkin-out' || USER_NAME === 'minly37'">

                <v-text-field style="width: 400px;" label="* ເລກທີເອກະສານຂາອອກ" dense outlined
                  background-color="#13d9bf" v-model="outboundnumber"></v-text-field>
              </div>
            </v-col>


            <v-row>
              <!-- Radio Button to Set Dates to Infinity -->


              <!-- Input for Date Take In -->
              <v-col cols="6" md="3" sm="3">
                <v-text-field style="width: 400px;" label="ວັນທີນຳເຂົ້າ" dense outlined background-color="#f5f5f5"
                  v-model="datetakein" type="date"></v-text-field>
              </v-col>

              <!-- Input for Date Expiration -->
              <v-col cols="6" md="3" sm="3">
                <v-text-field style="width: 400px;" label="ວັນທີໝົດອາຍຸຂອງເອກະສານ" dense outlined
                  background-color="#f5f5f5" v-model="dateExpDoc" type="date"></v-text-field>
              </v-col>
            </v-row>


          </v-row>
          <v-row>

            <!-- <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="* ປະເພດ " dense outlined
              background-color="#13d95a" v-model="documentType"></v-text-field> -->



            <!-- <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="* ບໍລິສັດ " dense outlined
              background-color="#c6a50b" v-model="company"></v-text-field> -->
            <!-- <v-select dense outlined style="width: 100px;margin-left: 15px;margin-right: 15px;"
              :items="conditionalItems" v-model="documentType" label="ຂໍ້ຕົກລົງ" background-color="#dde563"></v-select> -->
            <v-autocomplete style="width: 100px; margin-left: 15px; margin-right: 15px;" outlined dense label="ບ້ວງ"
              :items="buang_data_list" item-text="nameOfBouang" item-value="key_id" background-color="#c6a50b"
              @change="onGetbuangDetails"></v-autocomplete>

          </v-row>

          <div>
            <v-row>
              <v-autocomplete v-if="products_data_list.length"
                style="width: 100px; margin-left: 15px; margin-right: 15px;" outlined dense label="ປະເພດ ທີເພີ່ມເອງ"
                :items="products_data_list" item-text="typeName" item-value="id" background-color="#13d95a"
                @change="onGetProductDetails"></v-autocomplete>





              <v-autocomplete style="width: 100px; margin-left: 15px; margin-right: 15px;" outlined dense
                label="ບໍລິສັດ" :items="loca_data_list" item-text="province" item-value="id" background-color="#c6a50b"
                @change="onGetLocaDetails"></v-autocomplete>




              <v-select background-color="#ffa5f1" dense outlined
                style="width: 100px;margin-left: 15px;margin-right: 15px;" :items="conditionalItems1"
                v-model="classofdocs" label="ໃບອະນຸຍາດ"></v-select>

            </v-row>
          </div>
          <v-row>
            <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="* ຜູ້ນຳເອກະສານມາ" dense
              outlined background-color="#99dbd2" v-model="whocarrydoc"></v-text-field>



            <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="*ເນື້ອໃນເອກະສານ" dense
              outlined background-color="#99dbd2" v-model="content_doc"></v-text-field>


            <v-text-field style="width: 100px;margin-left: 15px;margin-right: 15px;" label="* ອື່ນໆ" dense outlined
              background-color="#99dbd2" v-model="etc"></v-text-field>

          </v-row>
          <v-row justify="center">
            <v-btn class="mr-4" width="130" color="success" @click="onInserEmpInfo">ບັນທຶກ</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import swal from 'sweetalert2';
import pdf from 'vue-pdf';

export default {
  components: {
    pdf,
  },
  data() {
    return {
      loading_processing: false,
      doc: null,
      docreview: '',
      company: '',
      conditionalItems1: [],
      isInfinity: false,
      dateExpDoc: '',
      datetakein: '',
      showSnackbar: false,
      branchUser: '',
      documentType: '',
      dropdownItems: ['ໃບສະເໜີ', 'ໃບມອບສິດ', 'ໃບເເຈ້ງການ', 'ໃບອະນຸຍາດ'],
      conditionalItems: ['MOU', 'ໃບອານຸຍາດສໍາປະທານ', 'ໃບອານຸຍາດຂຸດຄົນ'],
      conditionalItems1: ['ຂັ້ນເມືອງ', 'ຂັ້ນເເຂວງ', 'ຂັ້ນສໍານັກງານນາຍົກ'],
      conditionalItems2: ['ບໍລິສັດ ຄູນຄໍາ ອຸດສະຫະກໍາ ສໍາ ນັກງານໃຫຍ່', 'ບໍລິສັດ ຄູນຄໍາ ກໍ່ສ້າງຂົວ-ທາງ,ຊົນລະປະທານ ເເລະ ເຄຫະສະຖານ',
        'ບໍລິສັດ ຄູນຄໍາ ໂລຈິດສຕິກສ', 'ບໍລິສັດ ຄູນຄໍາ ສະຕິຮອິນດັສທຮີ', 'ບໍລິສັດ ຄູນຄໍາ ອູດສະຫະກໍາ ບໍ່ເເຮ່', 'ບໍລິສັດ ຫ້ວຍເປາະພາວເວີ', 'ບໍລິສັດ ຖະນະພອນ ອຸດສະຫະກໍາເເຮ່ທາດ', 'ບໍລິສັດ ຄໍາໃສ ການຄ້າ ຂາເຂົ້າ-ຂາອອກ'],
      selectedItem: '',
      classofdocs: '',
      inboundnumber: '',
      lektee: '',

      outboundnumber: '',
      inside: '',
      nameRules: [
        v => !!v || 'ປ້ອນຂໍ້ມູນ',
      ],
      etc: '',
      whocarrydoc: '',
      content_doc: '',

      formattedDate: '',
      bouang: '',
      buang_data_list: [],
      valid: true,
      previewImage: null,
      USER_ID: '',
      USER_NAME: '',
      USER_ROLE: '',
      bound: '',  // Added bound here
      products_data_list: [], // Defined here
      loca_data_list: [] // Defined here
    };
  },

  mounted() {
    this.onGetAll();
    this.onGetLocationList();
    this.onGetbuang();
    this.USER_ID = localStorage.getItem('USER_ID');
    this.USER_NAME = localStorage.getItem('USER_NAME');
    this.USER_ROLE = localStorage.getItem('USER_ROLE');
  },
  methods: {
    checkFileName() {
      if (this.doc && this.doc.name.length > 100) {
        alert('The text is too long');
        this.doc = null; // Optional: clear the file input if the name is too long
      }
    },
    onGetProductDetails(id) {
      let data = this.products_data_list.filter((el) => el.id === id);
      this.product_name = data[0]?.proName;
      this.documentType = id;
    },
    onGetLocaDetails(id) {
      let data = this.loca_data_list.filter((el) => el.id === id);
      this.loca_send_province = data[0]?.province;
      this.company = data[0]?.province; // Assign province to company
    },
    onGetbuangDetails(key_id) {
      let data = this.buang_data_list.filter((el) => el.key_id === key_id);
      this.buang_send_buang = data[0]?.nameOfBouang;
      this.bouang = data[0]?.nameOfBouang; // Assign province to company
    },
    async onGetAll() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('getExpensesTypeAll.service', {
          toKen: localStorage.getItem('toKen'),
        });
        if (response?.status === '00') {
          console.log('API Response:', response.data); // Debugging
          this.products_data_list = response.data || []; // Fallback to empty array if undefined
        }
        this.loading_processing = false;
      } catch (error) {
        this.loading_processing = false;
        // Error handling...
      }
    },

    async onGetLocationList() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$post('getAllLocation', {
          toKen: localStorage.getItem('toKen'),
        });
        if (response?.status === "00") {
          this.loca_data_list = response.data;
          this.loading_processing = false;
          console.log('Loca_list:', this.loca_data_list);
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

    updateConditionalItems() {
      // The documentType should be updated by the v-select automatically
      if (this.documentType === 'ຂໍ້ຕົກລົງ') {
        this.conditionalItems = ['MOU', 'ໃບອານຸຍາດສໍາປະທານ', 'ໃບອານຸຍາດຂຸດຄົນ'];
        this.conditionalItems1 = [];
      } else if (this.documentType === 'ໃບອະນຸຍາດ') {
        this.conditionalItems = [];
        this.conditionalItems1 = ['ຂັ້ນເມືອງ', 'ຂັ້ນເເຂວງ', 'ຂັ້ນສໍານັກງານນາຍົກ'];
      } else if (this.company === 'ບໍລິສັດ') {
        this.conditionalItems = [];
        this.conditionalItems2 = ['ບໍລິສັດ ຄູນຄໍາ ອຸດສະຫະກໍາ ສໍາ ນັກງານໃຫຍ່', 'ບໍລິສັດ ຄູນຄໍາ ກໍ່ສ້າງຂົວ-ທາງ,ຊົນລະປະທານ ເເລະ ເຄຫະສະຖານ ', 'ບໍລິສັດ ຄູນຄໍາ ໂລຈິດສຕິກສ', 'ບໍລິສັດ ຄູນຄໍາ ສະຕິຮອິນດັສທຮີ', 'ບໍລິສັດ ຄູນຄໍາ ອູດສະຫະກໍາ ບໍ່ເເຮ່', 'ບໍລິສັດ ຫ້ວຍເປາະພາວເວີ', 'ບໍລິສັດ ຖະນະພອນ ອຸດສະຫະກໍາເເຮ່ທາດ', 'ບໍລິສັດ ຄໍາໃສ ການຄ້າ ຂາເຂົ້າ-ຂາອອກ'];
      }
    }
    ,
    addNewItem(newItem) {
      if (!this.dropdownItems.includes(newItem)) {
        this.dropdownItems.push(newItem);
      }
    },

    async onGetbuang() {
      try {
        this.loading_processing = true
        await this.$axios.$post('/getBouangAll.service',
          {
            toKen: localStorage.getItem('toKen'),

          }).then((data) => {
            if (data?.status == '00') {
              this.buang_data_list = data?.data
              this.loading_processing = false
              console.log('buang:', this.buang_data_list)
            } else {
              this.loading_processing = false
              swal.fire({
                title: 'ແຈ້ງເຕືອນ',
                text: data?.message,
                icon: 'info',
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              })
            }
          })
      } catch (error) {
        this.loading_processing = false
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      }
    },


    async onInserEmpInfo() {
      if (!this.$refs.form.validate()) return;

      try {
        const formdata = new FormData();
        formdata.append('files', this.doc);
        formdata.append('branchUser', localStorage.getItem("USER_ROLE"));
        formdata.append('documentType', this.documentType); // Send the selected documentType
        formdata.append('toKen', localStorage.getItem("toKen"));
        formdata.append('lektee', this.lektee);



        formdata.append('datetakein', this.datetakein ? this.datetakein : '0000-00-00');
        formdata.append('dateExpDoc', this.dateExpDoc ? this.dateExpDoc : '0000-00-00');


        formdata.append('company', this.company);

        formdata.append('classofdocs', this.classofdocs);
        formdata.append('content_doc', this.content_doc);
        formdata.append('whocarrydoc', this.whocarrydoc);
        formdata.append('etc', this.etc);
        formdata.append('bouang', this.bouang);

        if (this.inboundnumber) {
          formdata.append('inboundnumber', this.inboundnumber);
          formdata.append('outboundnumber', '');
          formdata.append('inside', '');
          formdata.append('bound', 'in');
        } else if (this.outboundnumber) {
          formdata.append('outboundnumber', this.outboundnumber);
          formdata.append('inboundnumber', '');
          formdata.append('inside', '');
          formdata.append('bound', 'out');
        }
        else if (this.inside) {
          formdata.append('inside', this.inside);
          formdata.append('inboundnumber', '');
          formdata.append('outboundnumber', '');
          formdata.append('bound', 'inside');
        } else {
          formdata.append('inboundnumber', '');
          formdata.append('inside', '');
          formdata.append('outboundnumber', '');
          formdata.append('bound', '');
        }

        this.loading_processing = true;
        const data = await this.$axios.$post('http://khounkham.com/api-prod/v1/truck/StoreDocument.service', formdata);
        console.log("Response:", data);

        if (data?.status === "00") {
          this.loading_processing = false;
          swal.fire({
            title: 'ສຳເລັດ',
            icon: 'success',
            allowOutsideClick: false,
          });
          this.onClearData();
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
          text: error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    }
    ,

    onClearData() {
      this.doc = null;
      this.docreview = '';
      this.branchUser = '';
      this.documentType = '';
      this.classofdocs = '';
      this.inboundnumber = '';
      this.inside = '';
      this.outboundnumber = '';
      this.dateExpDoc = '';  // Clear dateExpDoc here
      this.bound = '';  // Clear bound here
    },
  },
};
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
</style>

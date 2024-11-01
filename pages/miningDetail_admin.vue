<template>
    <v-card class="card-shadow mx-auto" width="800">
      <v-card-title style="display:flex;background-color:#0a3382;color:white">
       
  
      
          <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="/stone_admin">
            <v-icon color="#0a3382">mdi-arrow-left</v-icon>
          </v-btn>
   
        <v-spacer></v-spacer>
        ລາຍການ ຮູເຈາະ
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pa-8 mx-auto" width="1200" style="border:0px solid #e0e0e0">
        <div class="mt-2">
          <v-data-table :items="miningDetail" :headers="filteredHeaders" :items-per-page="50" :search="search">
            <template v-slot:item="row">
              <tr>
                <td v-if="showFullNameColumn">{{ row.item.full_Name_Hole_number }}</td>
                <td>{{ row.item.hoeNumber }}</td>
                <td v-if="showDataCollerColumn">{{ row.item.dataColler }}</td>
                <td>
                  <v-btn style="height: 100%;width: 100%;" small color="#b3da64" class="white--text card-shadow"
                    @click="showpdf(row?.item?.pic)">
                    <v-icon size="30" color="white">mdi-folder</v-icon>
                  </v-btn>
                </td>
                <!-- PDF Popup -->
                <v-dialog v-model="pdfDialog">
                  <v-card>
                    <v-card-title class="headline">PDF Viewer</v-card-title>
                    <v-card-text>
                      <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="1800px" frameborder="0"></iframe>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="pdfDialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  
  <script>
  import swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        carDetail: null,
        search: '',
  
        report_leave_miningDetail: [
          { text: 'ຊື່ເຕັມຮູເຈາະ', value: 'full_Name_Hole_number' },
          { text: 'ນໍາເບີຮູເຈາະ', value: 'hoeNumber' },
          { text: 'ຂໍ້ມູນ coller', value: 'dataColler' },
          { text: '', value: 'pic' },
        ],
        miningDetail: [],
        pdfDialog: false, // Controls the visibility of the PDF dialog
        pdfUrl: '', // Stores the URL of the PDF to display
      };
    },
  
    computed: {
      filteredHeaders() {
        const USER_NAME = localStorage.getItem('USER_NAME');
        if (USER_NAME === 'Geo-Explo') {
          return this.report_leave_miningDetail.filter(
            (header) => header.value !== 'full_Name_Hole_number' && header.value !== 'dataColler'
          );
        }
        return this.report_leave_miningDetail;
      },
      showFullNameColumn() {
        return localStorage.getItem('USER_NAME') !== 'Geo-Explo';
      },
      showDataCollerColumn() {
        return localStorage.getItem('USER_NAME') !== 'Geo-Explo';
      },
      
    },
    mounted() {
      if (this.$route.query.key_id) {
        this.ongetData(this.$route.query.key_id);
      }
    },
    methods: {
      async ongetData(key_id) {
        try {
          const data = await this.$axios.$post(
            'http://khounkham.com/api-prod/v1/truck/ShowAllListOfHoleByKeyId.service',
            { key_id: key_id }
          );
          if (data?.status === '00') {
            this.miningDetail = data?.data || [];
          } else {
            swal.fire({
              icon: 'error',
              text: 'Failed to fetch mining details',
            });
          }
        } catch (error) {
          swal.fire({
            icon: 'error',
            text: 'An error occurred while fetching the data',
          });
          console.error(error);
        }
      },
      showpdf(pic) {
        this.pdfUrl = pic;
        this.pdfDialog = true; // Open the PDF dialog
      },
    },
  };
  
  </script>
  
  <style>
  .st0 {
    fill: #71d8ef;
  }
  
  .st1 {
    fill: #fff534;
  }
  
  .st2 {
    fill: #000000;
  }
  
  .custom-text-field {
    background-color: #f0f0f0;
    color: #000000;
  }
  
  .st10 {
    fill: #695e5d4d;
    stroke: black;
    /* Add border color */
    stroke-width: 1;
  }
  
  .st11 {
    fill: #ECBDD6;
  }
  
  .circle-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .circle {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: #0a3382;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 15px;
    margin-left: 15px;
    transition: transform 0.2s;
  }
  
  .circle:hover {
    transform: scale(1.1);
  }
  
  .circle span {
    font-size: 20px;
  }
  
  .mt-2 {
    margin-top: 16px;
  }
  </style>
  
<template>
    <div>
        <!-- Loading dialog -->
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="pt-3 pl-3">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <!-- Main content -->
        <v-card width="1800" class="mx-auto card-shadow mb-6" rounded="lg">
            <v-card-title style="background-color:#E57373;color:white">ປໍ້ານໍ້າມັນ</v-card-title>
            <v-card-text class="pt-4">
                <!-- Form for adding new fuel station -->
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div style="display:flex;flex-wrap:wrap;">
                        <v-text-field v-model="formData.fuelStationName" :rules="nameRules" label="ຊື່ສະຖານີນໍ້າມັນ
" required></v-text-field>
                      
<v-text-field v-model="formData.fuelStationId" label="ID ສະຖານີນໍ້າມັນ"></v-text-field>
                        <v-text-field v-model="formData.mobile" label="ເບີ"></v-text-field>
                        <v-text-field v-model="formData.address" label="ທີ່ຢູ່"></v-text-field>
                        <v-text-field v-model="formData.district" label="ເມືອງ" required></v-text-field>
                        <v-text-field v-model="formData.email" label="Email"></v-text-field>
                        <v-text-field v-model="formData.province" label="ແຂວງ" required></v-text-field>
                        <v-text-field v-model="formData.village" label="ບ້ານ
"></v-text-field>
                        <!-- Add other input fields for the remaining data -->
                        <v-btn color="primary" @click="onSubmit">Save</v-btn>
                    </div>
                </v-form>

                <!-- Display fuel stations in a data table -->
                <h1 class="pt-6">Fuel Stations</h1>
                <v-data-table :headers="headers" :items="fuelStations" :loading="loading_processing" item-key="id">
                    <template v-slot:item="row">
                        <tr>
                            <!-- <td>{{ row.item.id }}</td> -->
                            <td>{{ row.item.fuelStationId }}</td>
                            <td>{{ row.item.fuelStationName }}</td>
                            <td>{{ row.item.address }}</td>
                            <td>{{ row.item.village }}</td>
                            <td>{{ row.item.district }}</td>
                            <td>{{ row.item.province }}</td>
                            <td>{{ row.item.mobile }}</td>
                            <td>{{ row.item.email }}</td>
                            <td>
                                <v-btn color="#FFB74D" small @click="onEditLocation(row.item)">
                                    <v-icon color="white">mdi-pencil</v-icon>
                                    <span class="white--text">ແກ້ໄຂ</span>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn class="red" small @click="onDeleteLocation(row.item.id)">
                                    <v-icon color="white">mdi-delete</v-icon>
                                    <span class="white--text">ລຶບ</span>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
    data() {
        return {
            formData: {
                id: null,
                fuelStationId: null,
                toKen: localStorage.getItem('toKen'),
                fuelStationName: '',
                address: '',
                village: '',
                district: '',
                province: '',
                mobile: '',
                email: '',
            },
            nameRules: [(v) => !!v || 'ຕ້ອງປ້ອນຂໍ້ມູນ'],
            fuelStations: [],
            loading_processing: false,
            headers: [
                // { text: 'ID', value: 'id' },
                { text: 'ID ສະຖານີນໍ້າມັນ', value: 'fuelStationId' },
                { text: 'ຊື່ສະຖານີນໍ້າມັນ', value: 'fuelStationName' },
                { text: 'ທີ່ຢູ່', value: 'address' },
                { text: 'ບ້ານ', value: 'village' },
                { text: 'ເມືອງ', value: 'district' },
                { text: 'ແຂວງ', value: 'province' },
                { text: 'ເບີ', value: 'mobile' },
                { text: 'Email', value: 'email' },
                
            ],
            valid: true, // Added the 'valid' property and set its initial value
        };
    },
    mounted() {
        this.fetchFuelStations();
    },
    methods: {
        async onSubmit() {
            try {
                // Call API to store fuel station data
                const response = await this.$axios.$post('/StoreFuelStation.service', this.formData);
                console.log('Response:', response);
                // Reset form data after successful submission
                this.resetFormData();
                // Refresh fuel station list
                this.fetchFuelStations();
            } catch (error) {
                console.error('Error:', error);
                // Handle error, display message to user, etc.
            }
        },
        resetFormData() {
            // Reset form data after submission
            this.formData = {
                id: null,
                fuelStationId: null,
                toKen: localStorage.getItem('toKen'),
                fuelStationName: '',
                address: '',
                village: '',
                district: '',
                province: '',
                mobile: '',
                email: '',
            };
        },
        async fetchFuelStations() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/getAllFuelStation.service', {
                    toKen: localStorage.getItem('toKen'),
                });
                if (response?.status == '00') {
                    this.loading_processing = false;
                    console.log('Fuel stations:', response.data);
                    this.fuelStations = response.data; // Assuming the response contains an array of fuel stations
                } else {
                    this.loading_processing = false;
                    swal.fire({
                        title: 'ແຈ້ງເຕືອນ',
                        text: response?.message,
                        icon: 'info',
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
        },
        async onEditLocation(item) {
            // Logic for editing a fuel station
            console.log('Editing location:', item);
            // You can implement edit functionality here
        },
        async onDeleteLocation(id) {
            try {
                // Show confirmation dialog
                const confirmResult = await swal.fire({
                    text: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ?',
                    icon: 'question',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                });

                if (confirmResult.isConfirmed) {
                    // Proceed with deletion
                    this.loading_processing = true;
                    const response = await this.$axios.$post('DeleteFuelStation.service', { id });
                    if (response?.status == '00') {
                        this.loading_processing = false;
                        this.fetchFuelStations();
                        swal.fire({
                            title: 'ສຳເລັດ',
                            icon: 'success',
                            allowOutsideClick: false,
                        });
                    } else {
                        this.loading_processing = false;
                        swal.fire({
                            title: 'ແຈ້ງເຕືອນ',
                            text: response?.message,
                            icon: 'error',
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK',
                        });
                    }
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
        },

    }
};
</script>

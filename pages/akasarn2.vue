<template>
    <div>
        <!-- Selectable Level Chips (Only One Can Be Selected) -->
        <div class="d-flex flex-wrap justify-center my-2">
            <v-chip v-for="(level, index) in levels" :key="index" :color="selectedLevel === level ? 'red' : 'blue'"
                class="ma-1 white--text" @click="selectLevel(level)">
                {{ level }}
            </v-chip>
        </div>

        <!-- Slide Group for Unique Companies -->
        <v-slide-group class="ma-2" style="background-color: gainsboro;" show-arrows>
            <v-slide-item v-for="(item, index) in uniqueCompanies" :key="index">
                <v-btn style="width: auto;" class="ma-2" color="primary" @click="addChip(item)">
                    {{ item }}
                </v-btn>
            </v-slide-item>
        </v-slide-group>

        <!-- Slide Group for Type Names -->
        <v-slide-group class="ma-2" style="background-color: gainsboro;" show-arrows>
            <v-slide-item v-for="(item, index) in typeNames" :key="index">
                <v-btn style="width: auto;" class="ma-2" color="primary" @click="addChip(item)">
                    {{ item }}
                </v-btn>
            </v-slide-item>
        </v-slide-group>

        <!-- Selected Chips (User Selections) -->
        <div class="d-flex flex-wrap justify-center my-2">
            <v-chip v-for="(selected, index) in selectedChips" :key="index" color="red" class="ma-1 white--text" close
                @click:close="removeChip(index)">
                {{ selected }}
            </v-chip>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

export default {
    data() {
        return {
            levels: ['ຂັ້ນເມືອງ', 'ຂັ້ນເເຂວງ', 'ຂັ້ນສໍານັກງານນາຍົກ'], // ✅ Level chips
            selectedLevel: null, // ✅ Stores only one selected level
            report_listitemOffice: [],
            typeNames: [], // ✅ Stores `typeName` values
            selectedChips: [], // ✅ Stores multiple selections for `uniqueCompanies` & `typeNames`
            loading_processing: false,
        };
    },
    computed: {
        uniqueCompanies() {
            return [...new Set(this.report_listitemOffice.map(item => item.company))];
        }
    },
    mounted() {
        this.listCarOfficeSearch(); // ✅ Fetch document data
        this.onGetAll(); // ✅ Fetch expense types
        this.listCarOffice(); // ✅ Fetch expense types
    },
    methods: {
        async listCarOfficeSearch() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/listDocumentAllBySearch.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
                });

                console.log('API Response:', response);

                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || [];
                } else {
                    this.report_listitemOffice = [];
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                Swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
            } finally {
                this.loading_processing = false;
            }
        },

        async onGetAll() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post("getExpensesTypeAll.service", {
                    toKen: localStorage.getItem("toKen"),
                });

                if (response?.status === "00") {
                    this.typeNames = response.data.map((item) => item.typeName).filter(Boolean);
                    console.log("Fetched Type Names:", this.typeNames);
                } else {
                    console.warn("API Error:", response?.message || "Unexpected error.");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                Swal.fire({
                    title: "ແຈ້ງເຕືອນ",
                    text: error.message || "An error occurred.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading_processing = false;
            }
        },
        async listCarOffice() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$post('/listDocumentAll.service', {
                    branchUser: localStorage.getItem('USER_ROLE'),
                    toKen: localStorage.getItem('toKen'),
                    bound: this.bound,
                    bouang: this.selectedBuang,
                    userIdoffinanceial: this.userIdoffinanceial // Pass the selected userIdoffinanceial value here
                });
                console.log('API Response:', response);  // Log the API response
                if (response?.status === "00") {
                    this.report_listitemOffice = response?.data || []; // Ensure it's always an array
                } else {
                    this.report_listitemOffice = [];
                }
            } catch (error) {
                swal.fire({
                    icon: 'error',
                    text: error.message || 'An error occurred.',
                });
                console.error(error);
            } finally {
                this.loading_processing = false;
            }
        },
        // ✅ Allow only one level chip to be selected
        selectLevel(level) {
            this.selectedLevel = level;
        },

        // ✅ Allow multiple selections for companies and type names
        addChip(item) {
            if (!this.selectedChips.includes(item)) {
                this.selectedChips.push(item);
            }
        },

        removeChip(index) {
            this.selectedChips.splice(index, 1);
        }
    }
};
</script>

<style scoped>
.v-slide-group {
    max-width: 100%;
}

.v-btn {
    text-transform: none;
    white-space: nowrap;
}
</style>

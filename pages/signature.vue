<template>
    <div>
        <div class="signature-container">
            <canvas ref="signatureCanvas"
             class="signature-canvas"
              @mousedown="startDrawing" @mousemove="draw"
                @mouseup="stopDrawing" @mouseleave="stopDrawing"></canvas>
            <div class="signature-buttons">
                <v-btn @click="clearSignature">Clear</v-btn>
                <v-btn @click="saveSignature">Save</v-btn>
                <v-btn color="#f593b3" class="white--text" @click="print">
                    <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                </v-btn>
                <!-- Button for responsive full-screen mode -->
                <v-btn style="width: 60px; height: 60px; margin-left: 200px;" @click="toggleCanvasSize">
                    <v-icon size="55">mdi-arrow-expand-all</v-icon>
                </v-btn>
            </div>
        </div>
        <div style="display:none">
            <div id="modalInvoice">
                <Noti />
                <v-row
                    style="font-size:14px;margin-left: 50px;margin-top: 10px;display:flex;justify-content:start;flex-direction:column;align-items:start">
                    <div>
                        <span>ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,</span>
                        <span> ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
                        <span>ໂທລະສັບ: 020 92661111, 020 92 254 999 </span>
                        <span> ອີເມວ: kounkham@Mining|ເວັບໄຊ: kounkham</span>
                    </div>
                </v-row>


                <div
                    style="width:100%;margin-top:50px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-left:20px; font-size: 18px">
                    <div>ບັນຊີຂົນສົ່ງ</div>
                    <div style="height: 50px;"></div>

                    <div id="signaturePlaceholder">
                        <!-- Placeholder for signature image -->
                        <img v-if="signatureImage" :src="signatureImage" alt="Signature" style="width: 200px;" />
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        ...............................
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDrawing: false,
            context: null,
            isFullScreen: false, // Flag to toggle between full-screen and initial size
            signatureImage: '' // To store the signature image data URL
        };
    },
    mounted() {
        this.initializeCanvas();
        window.addEventListener('resize', this.updateCanvasSize); // Add event listener for window resize
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateCanvasSize); // Clean up the event listener on destroy
    },
    methods: {

        print() {
      

            const modal = document.getElementById("modalInvoice");
            if (modal) {
                const cloned = modal.cloneNode(true);
                let section = document.getElementById("print");
                if (!section) {
                    section = document.createElement("div");
                    section.id = "print";
                    document.body.appendChild(section);
                }
                section.innerHTML = "";
                section.appendChild(cloned);
                window.print();

                // Clean up after printing
                setTimeout(() => {
                    section.remove();
                }, 1000);
            } else {
                console.error("Modal element not found");
            }
        },
        initializeCanvas() {
            const canvas = this.$refs.signatureCanvas;
            canvas.width = 1000;
            canvas.height = 600;
            this.context = canvas.getContext('2d');
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#000';
        },
        startDrawing(event) {
            this.isDrawing = true;
            this.context.beginPath();
            this.context.moveTo(event.offsetX, event.offsetY);
        },
        draw(event) {
            if (!this.isDrawing) return;
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();
        },
        stopDrawing() {
            this.isDrawing = false;
        },
        clearSignature() {
            const canvas = this.$refs.signatureCanvas;
            if (canvas) {
                this.context.clearRect(0, 0, canvas.width, canvas.height);
            }
        },
        saveSignature() {
      
            const canvas = this.$refs.signatureCanvas;
            if (canvas) {
                this.signatureImage = canvas.toDataURL('image/png'); // Get signature image data URL
            }
        },
        toggleCanvasSize() {
            if (this.isFullScreen) {
                this.initializeCanvas(); // Reset to initial size
            } else {
                this.resizeCanvas(); // Expand to full screen
            }
            this.isFullScreen = !this.isFullScreen; // Toggle flag
        },
        resizeCanvas() {
            const canvas = this.$refs.signatureCanvas;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.context = canvas.getContext('2d'); // Update context for new size
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#000';
        },
        updateCanvasSize() {
            if (this.isFullScreen) {
                this.resizeCanvas(); // Maintain full-screen size on window resize
            }
        }
    }
};
</script>

<style scoped>
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

.signature-container {
    text-align: center;
    margin-top: 20px;
}

.signature-canvas {
    border: 1px solid #ccc;
    cursor: crosshair;
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
}

.signature-buttons {
    margin-top: 10px;
}

#signaturePlaceholder img {
    max-width: 100%;
    height: auto;
}
</style>
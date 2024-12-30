<template>
    <div>
      <canvas ref="fireworksCanvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;"></canvas>
      <div v-show="showMessage" class="message" :style="messageStyle">Happy 2025!</div>
      <button @click="launchFireworks">Launch Fireworks</button>
    </div>
  </template>
  
  <script>
  import confetti from "canvas-confetti";
  
  export default {
    name: "Fireworks",
    data() {
      return {
        showMessage: true, // Controls the visibility of the message
        messageOpacity: 1, // Controls the opacity of the message
      };
    },
    computed: {
      messageStyle() {
        return {
          opacity: this.messageOpacity,
          transition: "opacity 2s ease-in-out",
        };
      },
    },
    mounted() {
      this.launchFireworks(); // Automatically launch fireworks on load
    },
    methods: {
      launchFireworks() {
        const canvas = this.$refs.fireworksCanvas;
        const myConfetti = confetti.create(canvas, { resize: true });
  
        const colors = ["#FFD700", "#FF0000", "#FFFFFF"];
  
        const fireworkBurst = () => {
          myConfetti({
            particleCount: 100,
            angle: Math.random() * 360,
            spread: 60,
            origin: { x: Math.random(), y: Math.random() },
            colors: colors,
          });
        };
  
        // Launch multiple fireworks with intervals
        for (let i = 0; i < 10; i++) {
          setTimeout(fireworkBurst, i * 500);
        }
  
        // Gradually fade out the message after the fireworks finish
        setTimeout(() => {
          this.messageOpacity = 0;
          setTimeout(() => {
            this.showMessage = false;
          }, 2000); // Wait for the fade-out transition to complete
        }, 6000); // 6 seconds for 10 bursts
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    pointer-events: none;
    z-index: 9999;
  }
  .message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    color: #FFD700;
    text-shadow: 3px 3px 5px #FF0000;
    z-index: 10000;
    font-family: "Arial", sans-serif;
  }
  button {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: #FFD700;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    z-index: 10001;
  }
  button:hover {
    background-color: #FF0000;
  }
  </style>
  
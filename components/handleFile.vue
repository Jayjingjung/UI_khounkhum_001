<template>
    <div v-if="visible" class="overlay" @click="closeViewer">
      <img :src="file" class="image" />
  
      <button class="close-btn" @click.stop="closeViewer">×</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      file: String,
      visible: Boolean
    },
    methods: {
      closeViewer() {
        this.$emit("close");
      }
    }
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: zoom-out;
  }
  
  .image {
    max-width: 95%;
    max-height: 95%;
    object-fit: contain;
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    color: white;
    font-size: 24px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
  </style>
  
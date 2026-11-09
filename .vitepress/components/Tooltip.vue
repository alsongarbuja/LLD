<template>
  <span class="tooltip-container">
    <slot></slot>
    <span class="tooltip-text">{{ text }}</span>
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: help;
  border-bottom: 1px dashed #5cafff;
}

.tooltip-container .tooltip-text {
  visibility: hidden;
  width: max-content;
  max-width: 250px;
  background-color: #222;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 0.85rem;
  border: 1px solid #444;
  
  /* Position the tooltip above the text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
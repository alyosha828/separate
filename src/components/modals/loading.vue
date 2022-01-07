<template>
  <div
    class="modal fade exportServicesModal show modal-overlay"
    style="display: block;background: rgb(0 0 0 / 96%);"
    tabindex="-1"
  >
      <!-- <circle-spin :loading="isLoading" :color="color1" :size="size"></circle-spin> -->
      <moon-loader style="display: flex;justify-content: center;margin-top: 100px;" :loading="isLoading" :color="color" :size="size"></moon-loader>
  </div>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
export default {
  components: {
    MoonLoader
  },
  watch:{
  },
  props: [
    'data',
  ],
  data: () => ({
    isLoading: true,
    color: "#ffffff",
    size: '45px',
  }),
  methods: {
  },
  mounted(){
  }
};
</script>


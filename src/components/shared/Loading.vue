<template>
  <v-dialog
    fullscreen
    persistent
    transition="fade-transition"
    content-class="loading"
    v-model="loading">
    <v-layout class="loading" row wrap fill-height align-center justify-center>
      <div class="pre-loader"></div>
      <span class="primary--text title">загрузка...</span>
    </v-layout>
  </v-dialog>
</template>

<script>
  export default {
    name: 'LoadingComponent',

    computed: {
      loading() {
        return this.$store.getters.getLoadingState;
      }
    }
  }
</script>

<style scoped lang="scss">
  $size: 24px;
  $color: #3f51b5;

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  .loading {
    user-select: none;

    .pre-loader {
      width: $size;
      height: $size;
      animation: rotate .7s infinite linear;
      border: 6px double lighten($color, 40);
      border-top-color: $color;
      border-radius: 50%;
      margin-right: $size / 2;
    }
  }
</style>

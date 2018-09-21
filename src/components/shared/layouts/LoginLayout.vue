<template>
  <v-layout row wrap class="primary" fill-height>
    <!-- here goes content  -->
    <slot></slot>
    <!-- end of content -->

    <st-loading></st-loading>
  </v-layout>
</template>

<script>
  export default {
    name: 'LoginLayout'
  }
</script>

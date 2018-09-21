<template>
  <v-app>
    <v-content>
      <router-view/>
      <st-message></st-message>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    created: function () {
      this.$store.dispatch('reloadTokenFromCookies');
    }
  }
</script>

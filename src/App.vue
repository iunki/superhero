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
<style lang="scss">
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .clearfix {
    display: inline-block;
  }

  /* start commented backslash hack \*/
  * html .clearfix {
    height: 1%;
  }

  .clearfix {
    display: block;
  }

  /* close commented backslash hack */
</style>

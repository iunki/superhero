<template>
  <v-alert
    :type="alert.type"
    :value="alert.active"
    class="alert"
    transition="slide-y-transition"
    dismissible
    @input="dismiss"
  >
    <p v-html="alert.message"></p>
  </v-alert>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'Message',

    data: () => ({
      timeout: false
    }),

    computed: {
      ...mapState({
        alert: (state) => state.alert,
      }),
    },

    methods: {
      dismiss: function () {
        this.$store.dispatch('showAlertMessage');
      }
    }
  }
</script>

<style scoped lang="scss">
  .alert {
    position: fixed;
    top: 10px;
    width: 80%;
    right: 10%;
    z-index: 100;
  }
</style>

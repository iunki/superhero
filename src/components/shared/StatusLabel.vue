<template>
  <v-chip
    small
    :color="status.color"
    text-color="white"
  >
    {{status.label}}
  </v-chip>
</template>

<script>
  export default {
    name: 'StatusLabel',

    props: {
      statusId: Number
    },

    computed: {
      status: function () {
        let result = {};

        switch (this.statusId) {
          case 1:
            result.label = 'Новая заявка';
            result.color = 'info';
            break;
          case 2:
            result.label = 'На рассмотрении';
            result.color = 'warning';
            break;
          case 3:
            result.label = 'Удовлетворена';
            result.color = 'success';
            break;
          default:
            result.label = 'Статус не присвоен';
            result.color = 'grey';
        }

        return result;
      }
    },
  }
</script>

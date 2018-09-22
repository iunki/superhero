<template>
  <main-layout>
    <v-flex xs3>
      <v-toolbar
        color="white"
        flat
      >
        <v-toolbar-title class="primary--text">
          Оглавление
        </v-toolbar-title>
      </v-toolbar>

      <v-list class="transparent">
        <v-list-tile
          v-for="(item, index) in handbook"
          :key="'hb-' + index"
          :class="{'primary--text': item.id === active}"
          @click="pushDetailPage(item)"
        >
          <v-list-tile-action>
            <v-icon
              v-if="item.id === active"
              color="primary"
            >
              label
            </v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>

    <v-flex xs9 class="white">
      <v-toolbar
        color="primary lighten-2"
        flat
        dark
      >
        <v-toolbar-title>
          Содержимое
        </v-toolbar-title>
      </v-toolbar>

      <v-list two-line class="pa-3">
        <router-view></router-view>
      </v-list>
    </v-flex>
  </main-layout>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'Documentation',

    data: () => ({
      active: null
    }),

    computed: {
      ...mapState({
        handbook: (state) => state.documentation.articles
      }),
    },

    created: function () {
      this.$store.dispatch('loadDocumentation').then(() => {
        this.active = Number(this.$route.params.id) || 100;
      });
    },

    beforeUpdate: function () {
      this.active = Number(this.$route.params.id) || 100;

      if (!this.active) {
        this.$router.push({
          name: 'DocumentationIntro'
        });
      }
    },

    methods: {
      pushDetailPage: function (item) {
        this.active = Number(item.id);

        this.$router.push({
          name: 'DocumentationDetail',
          params: {
            id: item.id
          }
        })
      },
    },
  }
</script>

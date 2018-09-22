<template>
  <v-layout>
    <!-- aside -->
    <v-navigation-drawer
      app
      v-model="drawer"
      enable-resize-watcher
      permanent>
      <v-list>
        <v-list-tile
          v-for="(item, index) in aside"
          :key="index"
          :disabled="!item.url"
          :to="item.url">
          <v-list-tile-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"><span class="primary--text">β</span></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider class="mb-3"/>
      <v-flex xs12 class="text-xs-center pt-1">
        <v-btn outline
               small
               class="ml-3"
               @click="doLogOut"
               color="error">Выход
        </v-btn>
      </v-flex>
    </v-navigation-drawer>
    <!-- end of aside -->

    <!-- header -->
    <v-toolbar
      app
      flat
      color="primary"
      dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        {{title}} <span class="primary--text text--lighten-2">β</span>
      </v-toolbar-title>
    </v-toolbar>
    <!-- end of header -->

    <!-- here goes content  -->
    <v-layout row wrap>
      <slot></slot>
    </v-layout>
    <!-- end of content -->

    <st-loading></st-loading>
  </v-layout>
</template>

<script>
  export default {
    name: 'MainLayout',

    data: () => ({
      title: 'СТ-ВЕБКИТ',
      drawer: false,
      aside: [
        {
          icon: 'assignment',
          title: 'Контакты',
          url: '/contacts'
        },
        {
          icon: 'help',
          title: 'Помощь',
          url: '/documentation/intro'
        },
        {
          icon: 'message',
          title: 'Чат',
          url: '/chat'
        }
      ],
    }),
    methods: {
      pushPage: function (page) {
        this.$router.push({name: page});
      },

      doLogOut: function () {
        this.$store.dispatch('logUserOut')
          .then((response) => {
              if (response.success) {
                this.$router.push({
                  name: 'UserAuthorization'
                })
              }
            }
          )
      },

    }
  }
</script>

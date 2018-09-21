<template>
  <main-layout>
    <!-- user data -->
    <v-flex xs12 class="pa-3">
      <div class="title mb-3">Личный кабинет пользователья</div>
      <div class="subheading mb-2 grey--text">Личные данные пользователя</div>
      <div class="body-1">Имя пользователя: {{user.username | undefined}}</div>
      <div class="body-1">Доступные роли:
        <template v-for="(item, index) in user.roles">
          <span>{{item}}</span>
        </template>
        <span v-if="!user.roles.length">список пуст</span>
      </div>
    </v-flex>
    <v-flex xs12>
      <v-divider/>
    </v-flex>
    <!-- account data -->
    <v-flex xs12 class="pa-3">
      <div class="subheading mb-2 grey--text">Данные аккаунта</div>
      <div class="body-1">Логин: {{user.username | undefined}}</div>
      <div class="body-1">id пользователя: {{user.userId | undefined}}</div>
      <div class="body-1">Начало сессии: {{user.start | date}}</div>
      <div class="body-1">Конец сессии: {{user.finish | date}}</div>
      <v-btn flat
             class="mt-3 mx-0"
             small
             v-if="!token"
             :disabled="!user.access_token"
             @click="showToken"
             color="info"
      >
        Показать авторизационный токен
      </v-btn>
      <template v-if="token">
        <div class="my-3 subheading grey--text">Авторизационный токен:</div>
        <div class="code">{{token}}</div>
      </template>
    </v-flex>
    <!--action buttons -->
    <v-flex xs12 class="pt-3">
      <v-divider class="mb-3"/>
      <v-flex xs12 class="pt-3">
      </v-flex>
      <v-btn
        outline
        small
        class="ml-3"
        @click="doLogOut"
        color="error"
      >
        Выход
      </v-btn>
    </v-flex>
  </main-layout>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'User',

    filters: {
      undefined: (income) => {
        return income || "не определено"
      },
      date: (income) => {
        if (!income) return "не определено";
        return new Date(income).toLocaleTimeString('ru', {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        })
      }
    },

    data: () => ({
      token: null
    }),

    computed: {
      ...mapState({
        user: (state) => state.user.user
      }),
    },

    methods: {
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

      showToken: function () {
        this.token = this.user.access_token;
      },

      push: function (page) {
        this.$router.push({
          name: page
        })
      }
    },
  }
</script>

<style lang="scss">
  div.code {
    word-wrap: break-word;
    padding: 10px;
    background-color: antiquewhite;
    color: chocolate;
  }
</style>

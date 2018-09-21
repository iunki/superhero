<template>
  <login-layout class="pt-5">
    <v-flex sm6 offset-sm3 xs12>
      <v-card>
        <form
          id="app"
          @submit.prevent="doLogin"
          method="post"
        >
          <v-card-title primary-title>
            <div>
              <div class="headline">Авторизация</div>
              <span class="grey--text">Вход для зарегестрированных пользователей</span>
            </div>
          </v-card-title>

          <v-divider/>

          <div class="px-3 pt-3">
            <v-text-field
              v-model="email"
              required
              type="email"
              label="Email"
            >
            </v-text-field>

            <v-text-field
              v-model="password"
              type="password"
              required
              label="Пароль"
            >
            </v-text-field>
          </div>

          <v-card-actions>
            <v-spacer/>

            <v-btn
              :disabled="disableSubmit"
              type="submit"
              large
              flat
              color="primary"
            >
              Вход
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>

      <div class="text-xs-center pt-3">
        <v-btn
          disabled
          small
          flat
          dark
        >
          Восстановить пароль
        </v-btn>

        <v-btn @click="push('UserRegistration')"
               small
               flat
               dark
        >
          Регистрация
        </v-btn>
      </div>
    </v-flex>
  </login-layout>
</template>

<script>
  export default {
    name: 'UserAuthorization',

    data: () => ({
      email: null,
      password: null
    }),

    computed: {
      disableSubmit: function () {
        return !this.email || !this.password
      }
    },

    methods: {
      doLogin: function () {
        this.$store.dispatch('signUserIn', {
          userName: this.email,
          password: this.password,
          rememberMe: true
        })
          .then((response) => {
            if (response) {
              this.$router.push('/');
            }
          })
      },
      push: function (page) {
        this.$router.push({
          name: page
        })
      }
    }
  }
</script>

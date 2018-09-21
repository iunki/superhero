<template>
  <login-layout class="pt-5">

    <v-flex sm6 offset-sm3 xs12>

      <div class="pb-2 text-xs-center">
        <v-btn flat
               @click="push('UserAuthorization')"
               dark>
          <v-icon left>arrow_back_ios</v-icon>
          Назад
        </v-btn>
      </div>

      <v-card>
        <form
          id="app"
          @submit.prevent="doSignUserUp"
          method="post"
        >

          <v-card-title primary-title>
            <div>
              <div class="headline">Регистрация</div>
              <span class="grey--text">Форма регистрации нового пользователя</span>
            </div>
          </v-card-title>

          <v-divider/>

          <div class="px-3 pt-3">
            <v-text-field
              v-model="email"
              type="email"
              required
              label="Email"></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              required
              label="Пароль"></v-text-field>
            <v-text-field
              type="password"
              v-model="confirmPassword"
              :error-messages="matchPasswords"
              required
              label="Подтвердите пароль"></v-text-field>
          </div>

          <v-card-actions>
            <v-spacer/>
            <v-btn
              :disabled="disableSubmit"
              type="submit"
              large
              flat
              color="primary">Регистрация
            </v-btn>
          </v-card-actions>

        </form>
      </v-card>
    </v-flex>
  </login-layout>
</template>

<script>
  export default {
    name: 'UserRegistration',

    data: () => ({
      email: null,
      password: null,
      confirmPassword: null
    }),

    computed: {
      disableSubmit: function () {
        let fields = [
          this.email,
          this.password,
          this.confirmPassword
        ];
        return fields.some(item => item === null || item === "");
      },
      matchPasswords: function () {
        if (!this.confirmPassword) {
          return null;
        } else {
          return this.confirmPassword === this.password ? null : 'Пароли не совпадают';
        }
      }
    },

    methods: {
      doSignUserUp: function () {
        let user = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        };
        this.$store.dispatch('signUserUp', user)
          .then((response) => {
            if (response) {
              this.$router.push('/')
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

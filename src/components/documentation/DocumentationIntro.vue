<template>
  <v-layout row wrap>
    <v-flex xs12 class="title mb-3">
      СТ ВЕБКИТ
    </v-flex>
    <v-flex xs12>
      <p>
        «СТ ВЕБКИТ» — это готовый к работе шаблон для
        <a href="https://ru.vuejs.org/v2/guide/index.html" target="_blank">Vue.js</a>. «СТ ВЕБКИТ» опирается на
        следующие модули и библиотеки Vue.js:
      </p>
      <ul>
        <li><a href="https://vuex.vuejs.org/ru/" target="_blank">Vuex</a> — для работы с данными приложения;</li>
        <li>
          <a href="https://router.vuejs.org/ru/" target="_blank">Vue Router</a> — для обеспечения роутинга в
          приложении;
        </li>
        <li>
          <a href="https://github.com/axios/axios" target="_blank">Axios</a> — для осуществления HTTP-запросов и связи
          с сервером;
        </li>
        <li>
          <a href="https://vuetifyjs.com/ru/getting-started/quick-start" target="_blank">Vuetify</a> — для оформления
          внешнего вида;
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'DocumentationIntro',
  }
</script>

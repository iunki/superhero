<template>
  <v-layout row wrap v-if="article">
    <v-flex xs12 class="title mb-3" v-text="article.title"></v-flex>
    <v-flex xs12 v-html="article.content"></v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'DocumentationDetail',

    props: {
      id: [Number, String]
    },

    computed: {
      article: function () {
        return this.$store.getters.getArticleById(this.$route.params.id);
      }
    },
    created: function () {
      if (this.article === null || !this.id) {
        this.$router.push({
          name: 'DocumentationIntro'
        })
      }
    },
  }
</script>

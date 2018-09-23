<template>
  <v-container>
    <v-flex class="mt-4 mx-4">
      <v-flex xs12 class="text-xs-center">
        <p class="headline primary--text" v-if="!category">Чат помощи</p>
        <p class="headline primary--text"> {{category}}</p>
        <p class="headline blue--text"> {{socketId}}</p>
      </v-flex>
      <v-flex xs12 md12 lg8 offset-lg2>
        <div>
          <v-card class="grey lighten-2">
            <v-card-text class="clearfix">
              <div id="chat-zone">
                <div class="message my-3"
                     :class="{'message-right': m.type === 'own', 'message-left': m.type !== 'own'}"
                     v-for="(m, index) in messages" :key="index">
                  <div class="avatar">
                    <v-avatar :color="m.type === 'own'?'blue':'indigo'">
                      <v-icon dark>account_circle</v-icon>
                    </v-avatar>
                  </div>
                  <div class="content">
                    <div>{{m.text}}</div>
                    <div class="date" v-if="m.date">{{m.date | formatDate}}</div>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <v-form @submit.prevent="sendMessage">
                <v-card-actions color="grey" class="mt-2 pa-0">
                  <v-text-field
                    v-model="message"
                    autofocus
                    solo class="mt-0"
                    hide-details></v-text-field>
                  <v-btn class="ml-4" color="primary" @click="sendMessage">Отправить</v-btn>
                </v-card-actions>
              </v-form>

            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
  import {mapState} from 'vuex';
  import Filters from '@/helpers/HelperFilters'
  import moment from 'moment'
  import {SocketInstance} from '@/main.js'

  export default {
    name: 'Chat',
    sockets: {
      connect() {
        console.log('socket connected')
      },
      answer({message, socketId}) {
        if (socketId) {
          this.socketId = socketId
        }
        this.messages.push({
          text: message,
          date: new Date()
        })
      }
    },
    data: () => ({
      category: '',
      message: '',
      socketId: null,
      messages: [
        /*{
          id: 1,
          type: 'own',
          text: 'swedssd sdsdsd sds dsd sds dsd s dsds d Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi beatae cumque debitis deleniti dicta, expedita, fugiat id iste iure magni molestiae nesciunt optio pariatur praesentium, qui recusandae reiciendis sequi voluptatem?',
          date: new Date()
        }*/
      ]
    }),
    filters: {
      formatDate(input) {
        return moment(input).format('HH:mm')
      }
    },
    methods: {
      sendMessage() {
        this.$socket.emit('question', {message: this.message, socketId: this.socketId});
        this.messages.push({
          type: 'own',
          text: this.message,
          date: new Date()
        })
        this.message = ''
      }
    },
    mounted() {
      this.category = this.$route.params.category
      let message = 'Добро пожаловать! Задайте интересующий Вас вопрос.'
      if (this.category) {
        this.$socket.emit('register', this.category);
        message = 'Здравствуйте. Здесь вопросы по ' + this.category
      }
      this.messages.push({
        text: message
      })
    }
  }
</script>

<style lang="scss">
  #chat-zone {
    height: 60vh;
    border-radius: 5px;
    background-color: #fff;
    overflow-y: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
  }

  .message {
    position: relative;
    padding-top: 10px;
    .avatar {
      position: absolute;
      top: 0px;
    }
  }

  .message-left {
    .content {
      margin-left: 60px;
    }
    .avatar {
      left: -10px;
    }
  }

  .message-right {
    text-align: right;
    .avatar {
      right: -10px;
    }
    .content {
      background-color: #BBDEFB;
      margin-right: 60px;
      position: relative;
      &:before {
        border-top: 16px solid #BBDEFB;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        right: 0;
        margin: -8px -16px 0 0;
        left: auto;
      }
    }
  }

  .content {
    padding: 8px;
    background-color: #C5CAE9;
    border-radius: 5px;
    display: inline-block;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    max-width: 70%;
    word-wrap: break-word;
    min-width: 100px;
    font-size: 16px;
    line-height: 20px;
    &:before {
      content: '';
      position: absolute;
      border-top: 16px solid #C5CAE9;
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      margin: -8px 0 0 45px;
      left: 0;
    }
  }

  .date {
    text-align: right;
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    line-height: 15px;
  }
</style>

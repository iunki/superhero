import Vue from 'vue'
import Router from 'vue-router'

import Contacts from '@/components/contacts/Contacts'
import User from '@/components/user/User'
import UserAuthorization from '@/components/user/UserAuthorization'
import UserRegistration from '@/components/user/UserRegistration'
import Documentation from '@/components/documentation/Documentation'
import DocumentationIntro from '@/components/documentation/DocumentationIntro'
import DocumentationDetail from '@/components/documentation/DocumentationDetail'
import Chat from '@/components/chat/Chat'
import store from '@/store'

Vue.use(Router);

const checkToken = (to, from, next) => {
  if (store.getters.checkToken) {
    next();
    return
  }
  next('/user/auth');
};

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/contacts'
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
      beforeEnter: checkToken
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: Documentation,
      children: [
        {
          path: '/documentation/intro',
          name: 'DocumentationIntro',
          // component: DocumentationIntro
          redirect: '/documentation/id=100',
        },
        {
          path: '/documentation/id=:id?',
          name: 'DocumentationDetail',
          component: DocumentationDetail,
          props: true
        }
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/user/auth',
      name: 'UserAuthorization',
      component: UserAuthorization
    },
    {
      path: '/user/registration',
      name: 'UserRegistration',
      component: UserRegistration
    },
    {
      path: '/chat/:category?',
      name: 'Chat',
      component: Chat
    }
  ]
})

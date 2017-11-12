import Vue from 'vue'
import Router from 'vue-router'
import Introduction from '@/components/Introduction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Introduction
    }
  ]
})

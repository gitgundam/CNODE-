import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '@/components/Postlist.vue'
import Article from '@/components/Article.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'index',
      path:'/',
      components:{
        Postlist
      }
      
    },
    {
      name:'post_content',
      path:'/topic/:id',
      components:{
        main:Article
      }
    }
  ]
})

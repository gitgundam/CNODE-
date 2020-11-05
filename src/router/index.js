import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList'
import Article from '@/components/Article'
import UserInfo from '@/components/UserInfo'
import SlideBar from '@/components/SlideBar'

Vue.use(Router)



export default new Router({
  routes: [
    {
      name:'PostList',
      path:'/',
      components: {
        main: PostList
      }
    },
    {
      name: 'Article',
      path:'/topic/:id',
      components: {
        main: Article,
        slidebar: SlideBar
      }
    },
    {
      name: 'UserInfo',
      path:'/UserInfo/:userid',
      components: {
        main: UserInfo
      }
    }
  ],
  mode:'history'
})

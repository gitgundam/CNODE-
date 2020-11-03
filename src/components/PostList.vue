<template>
  <div class="postlist">
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" />
    </div>
    <div class="post">
      <ul>
        <li v-for="item in items" :key="item.data">
          <!-- 头像 -->
          <img :src="item.author.avatar_url" />
          <!-- 回复/浏览 -->
          <span>
            <span>{{ item.reply_count }}</span>
            <span>/{{ item.visit_count }}</span>
          </span>
          <!-- 类型 -->
          <span
            :class="[
              { good: item.good === true },
              { top: item.top === true },
              { tab: item.good != true && item.top != true },
            ]"
            >{{ item | itemType }}</span
          >
          <!-- 标题 -->
          <span>{{ item.title }}</span>
          <span>{{ item | fromDate }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script >
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      items:[]
    }
  },
  methods:{
    getData(){
      this.$http.get('https://52.197.183.123/api/v1/topics',{
        params:{
          page:1,
          limit:10
        }
      })
      .then(res =>{
        this.isLoading = false
        this.items = res.data.data
        console.log(res)
        
      }).catch(err=>console.log(err))
    }
  },
  beforeMount(){
    this.isLoading = 'true'
    this.getData()
  },
  filters:{
    itemType(item){
      if(item.top === true){
        return '置顶'
      }else if(item.good === true){
        return '精华'
      }else if(item.tab === 'share'){
        return '分享'
      }else if(item.tab === 'ask'){
        return '问答'
      }else{
        return '招聘'
      }
    },
    fromDate(item){
      let date =  new Date(item.last_reply_at).getTime()
      let time = new Date().getTime()-date
      if(time<0){
        return ''
      } else if(time/1000 < 30){
        return '刚刚'
      }else if(time/1000 < 60){
        return parseInt(time/1000)+'秒前'
      }else if(time/60000 < 60){
        return parseInt(time/60000)+'分钟前'
      }else if(time/3600000 < 24){
        return parseInt(time/3600000)+'小时前'
      }else if(time/86400000 < 31){
        return parseInt(time/86400000)+'天前'
      }else if(time/2592000000 < 12 ){
        return parseInt(time/(2592000000))+'月前'
      }else{
        return parseInt(time/(31104000000))
      }
    }

  }
  
}
</script>

<style scoped>
img {
  width: 30px;
  height: 30px;
}
.good,
.top {
  color: red;
}
.tab {
  color: #ccc;
}
li {
  list-style: none;
  display: flex;
  align-items: center;
}
</style>

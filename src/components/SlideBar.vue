<template>
  <div class="slidebar" >
    <div class="authersummay">
      <div class="topbar">作者</div>
      <div class="namepanel">
      <img :src="items.avatar_url" @click="toUserInfo">
      <span class="authorname">{{items.loginname}}</span>
      </div>
    </div>
    <div class="recent_topics">
      <div class="topbar">最近主题</div>
      <ul>
        <li v-for="item in items.recent_topics" :key="item.title" @click="toArticle(item)">{{item.title}}</li>
      </ul>
    </div>
    <div class="recent_replies" >
      <div class="topbar">最近回复</div>
      <ul>
        <li v-for="item in items.recent_replies" :key="item.title" @click="toArticle(item)">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script >
export default {
  name: "app",
  data() {
    return {
      isLoading : false,
      items:{}
    };
  },
  methods:{
      toArticle(item){
      this.$router.push({
        name:'Article',
        params:{
        id:item.id
        }
      })
    },
    toUserInfo(){
      this.$router.push({
        name:'UserInfo',
        params:{
        userid: this.items.loginname
        }
      })
    },
    getSlideBarData(){
      this.$http
        .get(`https://52.197.183.123/api/v1/user/${this.$route.params.userid}`)
        .then((res) => {
          if (res.data.success === true) {
            console.log(res,1)
            this.items = res.data.data;
          }
        })
        .catch((err) => console.log(err));
    }
  },
  beforeMount(){
    this.getSlideBarData()
  },
  computed:{
    limit(){
    }
  },
  

}
</script>

<style scoped>
  .slidebar{
    float: right;
    width: 328px;
    margin-left: 10px;
  }
  @media (max-width: 800px) {
    .slidebar{
    display: none;
  }
  }
  .slidebar .topbar{
    background: #f6f6f6;
    font-size:13px;
    padding: 10px;
  }
  .authersummay,.recent_topics,.recent_replies {
    background: white;
    margin-bottom: 10px;
  }
  .authersummay img{
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
 .namepanel{
   padding: 10px;
   display: flex;
   justify-content: flex-start;
   align-items:flex-end;
 }

.namepanel .authorname{
  padding-left: 10px;
}

.slidebar ul{
  margin: 0;
  padding: 0;
  color:#778087;
  font-size: 13px;
}

.slidebar ul :last-child{
  padding-bottom: 20px;
}
.slidebar ul li{
  list-style: none;
  margin: 10px;
  cursor: pointer;
}
</style>

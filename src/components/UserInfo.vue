<template>
  <div class="userinfo">
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" />
    </div>
    <div class="info_main" v-else>
      <section class="info_name">
          <img :src="items.avatar_url">
          <span>{{ items.loginname }}</span>
        <p>{{ items.score }}积分</p>
        <p>注册时间: {{items.create_at | fromDate}}</p>
      </section>
      <div class="info_reply">
        <p>回复的主题</p>
        <ul>
          <li v-for="item in items.recent_replies " :key="item.title" @click="toArticle(item)">{{item.title}}</li>
        </ul>
      </div>
      <div class="info_create">
        <p>创建的主题</p>
        <ul>
          <li v-for="item in items.recent_topics" :key="item.title" @click="toArticle(item)">{{item.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      items: {},
      sb:''
    };
  },
  filters: {
    fromDate(item) {
      let date = new Date(item).getTime();
      let time = new Date().getTime() - date;
      if (time / 1000 < 30) {
        return "刚刚";
      } else if (time / 1000 < 60) {
        return parseInt(time / 1000) + "秒前";
      } else if (time / 60000 < 60) {
        return parseInt(time / 60000) + "分钟前";
      } else if (time / 3600000 < 24) {
        return parseInt(time / 3600000) + "小时前";
      } else if (time / 86400000 < 31) {
        return parseInt(time / 86400000) + "天前";
      } else if (time / 2592000000 < 12) {
        return parseInt(time / 2592000000) + "月前";
      } else {
        return parseInt(time / 31104000000)+"年前"
      }
    }
  },
  methods: {
    toArticle(item){
      this.$router.push({
        name:'Article',
        params:{
        id:item.id
        }
      })
    },
    getUserInfoData() {
      this.$http
        .get(`http://mock.hunger-valley.com/cnode/api/v1/user/${this.$route.params.userid}`)
        .then((res) => {
          this.isLoading = false;
          console.log(this.isLoading);
          this.items = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.getUserInfoData();
  },
};
</script>

<style scoped>
.userinfo {
  flex-basis: 75%;
}

.info_main .info_name {
  background: white;
  padding: 12px;
}


.info_main .info_name img{
  width: 30px;
  height: 30px;
}

.info_main .info_name p{
  margin-bottom: 2px;
}

.info_main .info_reply,.info_create{
  background: white;
}

.info_main .info_reply p{
  padding: 10px;
  background: #f8f7f7;
  font-size: .75rem;
}

.info_main .info_create p{
  padding: 10px;
  margin-bottom: 0;
  background: #f8f7f7;
  font-size: .75rem;
}

.info_main ul{
  padding: 10px 40px;
  margin: 0 ;
}

.info_main li{
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  list-style: none;
  color:#094e99;
  font-size: .72rem;
};

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>

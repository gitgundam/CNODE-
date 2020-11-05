<template>
  <div class="slidebar">
    <div class="authersummay">
      <div class="topbar">作者</div>
      <!-- <img :src="items.author.avatar_url" alt=""> -->
    </div>
    <div class="recent_topics">
      <div class="topbar">最近主题</div>
      <ul>
        <li></li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">最近回复</div>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script >
export default {
  name: "app",
  data() {
    return {
      items:{}
    };
  },
  // methods:{
  //   getSlideBarData(){
  //     this.$http
  //       .get(`https://52.197.183.123/api/v1/topic/${this.$route.params.id}`)
  //       .then((res) => {
  //         if (res.data.success === true) {
  //           console.log(res)
  //           this.isLoading = false;
  //           this.items = res.data.data;
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // },
  // beforeMount(){
  //   this.getSlideBarData()
  // }
}
</script>

<style scoped>
  .slidebar{
    flex-basis: 40%;
    margin-left: 10px;
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
    padding: 10px;
  }

</style>

<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" />
    </div>
    <div v-else class="article_main">
      <div class="topic_header">
        <div class="topic_title">
          <h2>{{ items.title }}</h2>
          <ul>
            <li>• {{ items | fromDate }}</li>
            <li>• 作者: {{ items.author.loginname }}</li>
            <li>• {{ items.visit_count }}次浏览</li>
            <li>• 来自: {{ items | itemType }}</li>
          </ul>
        </div>
        <div v-html="items.content" class="topic_content"></div>
      </div>
      <div class="topoc_reply">
        <div class="reply_topbar">回复</div>
        <div class="reply_panel" v-if ="items.replies.length === 0">
          <div class="reply_content">
            <p> 无回复</p>
          </div>
        </div>
        <div
          v-for="(reply, index) in items.replies"
          :key="(reply, index)"
          class="reply_panel"
        >
          <div class="reply_info">
            <img :src="reply.author.avatar_url" @click="imgClick(reply)" />
            <span>{{ reply.author.loginname }}</span>
            <span>{{ index + 1 }}楼</span>
            <span v-if="reply.ups.length > 0"> 👍 {{ reply.ups.length }}</span>
          </div>
          <div class="reply_content">
            <p v-html="reply.content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: "false",
      items: {
        // 代表当前页面所以内容
      },
    };
  },
  methods: {
    imgClick(reply) {
      console.log(reply);
      this.$router.push({
        name: "UserInfo",
        params: {
          userid: reply.author.loginname,
        },
      });
    },
    getArticleData() {
      this.$http
        .get(`https://52.197.183.123/api/v1/topic/${this.$route.params.id}`)
        .then((res) => {
          if (res.data.success === true) {
            console.log(res,1)
            this.isLoading = false;
            this.items = res.data.data;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    this.isLoading = "true";
    this.getArticleData();
  },
  filters: {
    itemType(items) {
      if (items.good === true) {
        return "精华";
      } else if (items.tab === "share") {
        return "分享";
      } else if (items.tab === "ask") {
        return "问答";
      } else {
        return "招聘";
      }
    },
    fromDate(items) {
      let date = new Date(items.create_at).getTime();
      let time = new Date().getTime() - date;
      if (time < 0) {
        return "";
      } else if (time / 1000 < 30) {
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
        return parseInt(time / 2592000000) + "个月前";
      } else {
        return parseInt(time / 31104000000);
      }
    },
  },
  watch: {
    $route(to, from) {
      this.getArticleData();
    },
  },
};
</script>

<style>
@import url("../assets/markdown-github.css");
.article {
  margin-right: 340px;
}
@media (max-width: 800px) {
  .article {
    margin: 0 auto;
  }
}

.topic_header {
  background: white;
}

.topic_title {
  padding: 10px;
  padding-bottom: 0;
}

.topic_title ul {
  padding: 0;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  justify-content: start;
}

.topic_title li {
  padding: 5px;
  font-size: 12px;
  color: #999999;
  list-style: none;
}
.markdown-text {
  padding-bottom: 1px;
}
.topic_header .topic_content {
  padding: 0 20px;
}

.topic_content a {
  color: #636674;
  text-decoration: none;
}
.topic_content a:hover {
  color: #3961f2;
  text-decoration: underline;
}
/* 回复部分 */
.reply_topbar {
  font-size: 13px;
  background: #f5f5f5;
  padding: 10px 15px;
}
.topoc_reply {
  margin: 20px 0;
  background: white;
}
.topoc_reply .reply_info {
  padding: 8px;
  display: flex;
  align-items: center;
  color: #666666;
}

.topoc_reply .reply_info img {
  cursor: pointer;
  padding: 5px;
  width: 30px;
  height: 30px;
}

.topoc_reply .reply_info span {
  font-size: 13px;
  margin: 3px;
}

.reply_content {
  padding: 0 15px;
}

.reply_content a {
  color: #6d6d6d;
  text-decoration: none;
}

.reply_panel {
  border-bottom: 1px solid #e5e5e5;
}
.loading {
  text-align: center;
  padding-top: 300px;
}

.markdown-text img {
  max-width: 100%;
}
.markdown-text .prettyprint {
  overflow:scroll;
}
</style>


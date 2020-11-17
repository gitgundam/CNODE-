<template>
  <div class="postlist">
    <div class="post">
      <div class="loading" v-if="isLoading">
        <img src="@/assets/loading.gif" />
      </div>
      <ul v-else>
        <li>
          <div class="topbar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="item in items" :key="item.data">
          <img :src="item.author.avatar_url" />
          <span class="reply">
            <span>{{ item.reply_count }}</span>
            <span>/{{ item.visit_count }}</span>
          </span>
          <span
            :class="[
              { good: item.good === true },
              { top: item.top === true },
              { tab: item.good != true && item.top != true },
              'icon',
            ]"
            ><span>{{ item | itemType }}</span>
          </span>
          <router-link
            :to="{
              name: 'Article',
              params: { id: item.id, userid: item.author.loginname },
            }"
          >
            <span class="title">
              {{ item.title }}
            </span>
          </router-link>
          <span class="last_reply">{{ item | fromDate }}</span>
        </li>
        <li class="pagination"><pagination @change="handle"></pagination></li>
      </ul>
    </div>
  </div>
</template>

<script >
import pagination from "@/components/Pagination";
export default {
  name: "PostList",
  data() {
    return {
      isLoading: "false",
      items: [],
      nowpage: 1,
    };
  },
  components: {
    pagination,
  },
  watch: {
    nowpage(to, from) {
      this.getData();
    },
  },
  methods: {
    handle(value) {
      console.log(value);
      this.nowpage = value;
    },
    getData() {
      this.$http
        .get("http://mock.hunger-valley.com/cnode/api/v1/topics", {
          params: {
            page: this.nowpage,
            limit: 20,
          },
        })
        .then((res) => {
          this.isLoading = false;
          this.items = res.data.data;
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
  // 生命周期mount之前使用钩子
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
  filters: {
    itemType(item) {
      if (item.top === true) {
        return "置顶";
      } else if (item.good === true) {
        return "精华";
      } else if (item.tab === "share") {
        return "分享";
      } else if (item.tab === "ask") {
        return "问答";
      } else {
        return "招聘";
      }
    },
    fromDate(item) {
      let date = new Date(item.last_reply_at).getTime();
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
        return parseInt(time / 31104000000) + "年前";
      }
    },
  },
};
</script>

<style scoped>
.postlist {
  flex-grow: 1;
}
.topbar span {
  padding: 0 10px;
}

ul {
  margin: 0;
  padding: 0;
}
li:first-child {
  user-select: none;
  display: flex;
  align-items: center;
  list-style: none;
  background: #f5f5f5;
  height: 40px;
  color: #80bd01;
  font-size: 15px;
}

li:first-child span:hover {
  cursor: pointer;
  color: #d3a2c0;
}

li:not(:first-child) {
  display: grid;
  grid: auto/60px 60px 40px auto 50px;
  list-style: none;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #f0f0f0;
  background: #ffffff;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

img {
  width: 30px;
  height: 30px;
  margin: 10px;
}
.reply {
  justify-self: center;
  display: flex;
  align-items: center;
}
.reply :first-child {
  color: #9e78c0;
  font-size: 14px;
  line-height: 30px;
  font-weight: 400;
  font-family: Helvetica Neue, Luxi Sans, DejaVu Sans, Tahoma, Hiragino Sans GB,
    STHeiti, sans-serif !important;
}
.reply :last-child {
  font-size: 12px;
}
.icon {
  justify-self: center;
  font-size: 12px;
  width: 35px;
  height: 18px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.good,
.top {
  background: #80bd01;
  color: white;
}
.tab {
  color: #999999;
  background: #e5e5e5;
}

.title {
  font-size: 15px;
  padding-left: 8px;
}
.last_reply {
  color: #778087;
  font-size: 12px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

ul li:last-child {
  display: flex;
  justify-content: center;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>

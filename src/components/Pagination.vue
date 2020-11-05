<template>
  <div class="pagination">
    <ul>
      <li @click="toIndex">首页</li>
      <li v-if="currentPage === 1"> 上一页</li>
      <li @click="prePage" v-else>上一页</li>
      <li
        v-for="page in pages"
        :key="page"
        :class="[{currentPage:page == currentPage},'pagebtn']"
        @click="changeBtn(page)"
      >
        {{ page }}
      </li>
      <li @click="nextPage">下一页</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      pages: [1, 2, 3, 4,5],
      target: this.nowpage,
      currentPage:1
    };
  },

  props: ["nowpage"],
  methods: {
    prePage(){
      this.currentPage--
      if(this.currentPage == this.pages[0] && this.currentPage >1){
      this.pages.unshift(this.pages[0]-1)
      this.pages.splice(5,1)
      console.log(this.pages)
    }
    },
    nextPage(){
      this.currentPage++
      if(this.currentPage == this.pages[4]){
      this.pages.shift()
      this.pages.splice(4,0,this.pages[3]+1)
    }
    },
    toIndex(){
      location.reload()
    },
    changeBtn(page){
      this.currentPage = page
    if(page == this.pages[4]){
      this.pages.shift()
      this.pages.splice(4,0,this.pages[3]+1)
      console.log(this.page)
    }else if(page == this.pages[0] && page !=1){
      this.pages.unshift(this.pages[0]-1)
      this.pages.splice(5,1)
    }

  }
  },
  
};
</script>

<style scoped >
.pagination ul {
  display: flex;
  justify-content: center;
}
.pagination ul li:hover {
  background: #63605f;
  color: white;
}
.pagination ul .currentPage {
  background: #63605f;
  color: white;
}
.pagination ul li {
  user-select: none;
  font-size: 14px;
  border: 1px solid #dddddd;
  cursor: pointer;
  padding: 0 10px;
  align-items: center;
  margin-right: 8px;
  height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 3px;
}
</style>

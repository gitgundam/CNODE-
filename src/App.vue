<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <!-- <PostList /> -->      
      <router-view name="slidebar"></router-view>
      <router-view name="main"></router-view>

    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import PostList from "./components/PostList";

export default {
  name: "App",
  components: {
    Header,
    PostList,
  },
};
</script>

<style >
.main {
  max-width: 80%;
  margin: 20px auto;
}
</style>

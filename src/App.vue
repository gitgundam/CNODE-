<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <PostList/>
      </div>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
export default {
  name: 'App',
  components:{
    Header,
    PostList
  }
}
</script>

<style>
.main {
  max-width: 80%;
  margin: 0 auto;
  border: 1px solid;
}
</style>

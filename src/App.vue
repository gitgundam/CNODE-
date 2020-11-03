<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <PostList/>
      </div>
    <router-view name="main"></router-view>
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

<style >
.main {
  max-width: 75%;
  height: 100vh;
  margin: 10px auto;
  
}
#app{
  background:#e1e1e1 ;
}

</style>

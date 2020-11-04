<template>
  <div class="header">
    <img src="@/assets/cnodejs_light.svg" alt="" />
    <ul>
      <li><a href="">首页</a></li>
      <li><a href="">新手入门</a></li>
      <li><a href="">API</a></li>
      <li><a href="">关于</a></li>
      <li><a href="">注册</a></li>
      <li><a href="">登录</a></li>
    </ul>
  </div>
</template>

<script >
export default {
  name: "Header",
  data() {
    return {};
  },
  components: {},
};
</script>

<style  scoped>
.header {
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background: #63605f;
  height: 50px;
}
img {
  max-width: 120px;
  margin-left: 30px;
}

img:hover {
  cursor: pointer;
}

ul {
  display: flex;
  justify-content:space-around ;
  margin-right: 20px;
  list-style: none;
}

li{
  padding: 10px;
  margin:auto;
}


li>a{
    text-decoration: none;
    color:#ccc;
    font-size: 15px;
}
</style>


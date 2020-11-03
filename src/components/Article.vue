<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" />
    </div>
    <div v-else>

    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      isLoading: faluse,
      items:{
        // 代表当前页面所以内容
      }
    };
  },
  components: {},
};
</script>

<style scoped>
</style>


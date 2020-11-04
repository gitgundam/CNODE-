<template>
  <div class="userinfo">
    <!-- <div class="loading" v-if="isLoading">
      <img src="@/assets/loading.gif" />
    </div> -->
    <div v-if="a">1111</div>
    <div v-else>
      123344
    </div>
  </div>
</template>

<script >
export default {
  name: "UserInfo",
  data() {
    return {
      a: "faluse",
      items: {
        
      },
    };
  },
  methods: {
    getUserInfoData() {
      this.$http
        .get(`https://52.197.183.123/api/v1/user/${this.$route.params.userid}`)
        .then((res) => {
          console.log(res);
          this.isLoading = "faluse";
          console.log(this.a)
          this.items = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    // this.isLoading = "true"
    this.getUserInfoData()
  },
};
</script>

<style scoped>

</style>

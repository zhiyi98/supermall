<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";

export default {
  name: "home",
  components: {
    NavBar,
  },
  data() {
    return {
      result: [],
      recommends: []
};
  },
  created() {
    // 1. 请求多个数据
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      console.log(this.banners,this.recommends)
    });
  },
};
</script>

<style scroped>
.home-nav {
  background-color: #ff8e96;
  color: #fff;
}
</style>
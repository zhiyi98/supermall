<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    this.iid = this.$route.params.id;

    getDetail(this.iid).then((res) => {
      // 获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;
      console.log(this.topImages);
    });
  },
};
</script>

<style scope>
</style>
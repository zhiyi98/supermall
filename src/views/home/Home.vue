<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl"
      :class="{ fixed: isTabFixed }"
    />
    <goods-list :goods="showGoods" />
    <back-top @click.native="backClick" />

    <!-- <scroll> </scroll> -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    document.body.scrollTop = document.documentElement.scrollTop = this.saveY;
  },
  deactivated(e) {
    this.saveY = 1000;
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件都有一个$el: 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners, this.recommends);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scroped>
#home {
  padding-top: 44px;
  height: 100vh;
}

.home-nav {
  background-color: #ff8e96;
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}

/* .content {
  height: calc(100%-98px);
  overflow: hidden;
} */
</style>
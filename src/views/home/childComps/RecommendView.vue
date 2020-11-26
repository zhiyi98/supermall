<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scroped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 20px;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.recommend-item a {
  text-decoration: none;
  color: #595959;
}
</style>
<template>
  <view class="life">
    <section class="tabs">
      <u-tabs
        :list="list"
        @click="handleTabClick"
        lineHeight="4"
        lineWidth="40"
        lineColor="#A6CF6F"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: '46rpx',
        }"
        :inactiveStyle="{
          color: '#606266',
          fontSize: '40rpx',
        }"
      ></u-tabs>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "生活照护",
        },
        {
          name: "交通百科",
        },
        {
          name: "健康百科",
        },
      ],
    };
  },
  methods: {
    handleTabClick(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.life {
  padding: 20rpx;
  background-color: #d6e2bf;
  height: 100vmax;

  .tabs {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

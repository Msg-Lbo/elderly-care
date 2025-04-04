<template>
  <view class="start">
    <u-image src="/static/index/1.png" width="750rpx" height="100vh" mode="widthFix"></u-image>
    <view class="start-btn">
      <u-button @click="goHome" size="small" plain shape="circle">跳过 {{ num }}s</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      num: 3,
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.num--;
      if (this.num === 0) {
        this.goHome();
      }
    }, 1000);
  },
  onUnmounted() {
    clearInterval(this.timer);
  },
  methods: {
    goHome() {
      uni.switchTab({
        url: "/pages/tabbar/home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.start {
  width: 750rpx;
  height: 100vh;
  position: relative;
  .start-btn {
    position: absolute;
    top: 150rpx;
    right: 50rpx;
  }
}
</style>

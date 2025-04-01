<template>
  <!-- tab切换 -->
  <view class="main">
    <!-- <scroll-view scroll-x> -->
    <view class="tab">
      <view class="ta-box" v-for="(v, i) in dataList" :key="i">
        <view class="ta-title" @click="changeTab(v, i)">
          <text class="ta-text" :class="{ active: tab.key == v.key }">{{ v.value }}</text>
        </view>
        <!-- <view class="ta-line"></view> -->
      </view>
    </view>
    <!-- </scroll-view> -->
  </view>
</template>

<script>
export default {
  props: {
    tab: {
      type: Object,
      default: {},
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    // 切换消息类型
    async changeTab(val, inx) {
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  padding: 24rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  gap: 48rpx;
  overflow: scroll;

  .ta-box {
    display: flex;
    align-items: center;
    flex: none;

    &:first-child {
      margin-left: 20rpx;
    }

    .ta-line {
      width: 1rpx;
      height: 24rpx;
      background: #c8cacc;
      border-radius: 0rpx;
    }

    .ta-title {
      flex: 1;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;

      .ta-text {
        &.active {
          font-weight: bold;
          font-size: 32rpx;
          color: #00693a;
          position: relative;

          &::after {
            width: 100%;
            position: absolute;
            display: inline-block;
            content: "";
            bottom: -15rpx;
            left: 50%;
            transform: translateX(-50%);
            width: 48rpx;
            height: 4rpx;
            background: #00693a;
            background: $c-bgColor;
            border-radius: 20rpx;
            z-index: 9;
          }
        }
      }
    }
  }
}
</style>

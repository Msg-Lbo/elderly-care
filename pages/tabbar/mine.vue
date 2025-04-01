<template>
  <view class="mine">
    <section class="content">
      <view class="user">
        <view class="left">
          <u-image src="/static/mine/m1.png" width="120" height="120" mode="aspectFill"></u-image>
        </view>
        <view class="right">
          <view class="name">
            <text>张三</text>
          </view>
          <view class="account">
            <text>账号：13800138000</text>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="title">
          <view class="left">工具与服务</view>
        </view>
        <view class="list">
          <view class="item">
            <u-image width="50" height="50" src="/static/mine/m2.png" mode="WidthFix"></u-image>
            <view class="text">
              <text>个人档案</text>
            </view>
          </view>
          <view class="item">
            <u-image width="50" height="50" src="/static/mine/m3.png" mode="WidthFix"></u-image>
            <view class="text">
              <text>我的卡包</text>
            </view>
          </view>
          <view class="item" @click="$fn.jumpPage('/pages/my/myCommission')">
            <u-image width="50" height="50" src="/static/mine/m4.png" mode="WidthFix"></u-image>
            <view class="text">
              <text>我的委托</text>
            </view>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="title">
          <view class="left">监护设置</view>
        </view>
        <view class="list">
          <view class="item">
            <u-image width="70" height="70" src="/static/mine/m7.png" mode="aspectFill"></u-image>
            <view class="text">
              <text>添加监护人</text>
            </view>
          </view>
        </view>
      </view>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.mine {
  background: #d6e2bf;
  height: 100vh;
  .content {
    padding: 24rpx;
    .user {
      display: flex;
      align-items: center;
      .left {
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
        margin-right: 24rpx;
      }
      .right {
        .name {
          font-size: 48rpx;
          font-weight: bold;
        }
        .account {
          font-size: 32rpx;
          color: #999;
        }
      }
    }
    .card {
      background: #fff;
      border-radius: 24rpx;
      padding: 24rpx;
      margin-top: 24rpx;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          font-size: 48rpx;
          font-weight: bold;
        }
      }
      .list {
        display: flex;
        align-items: center;
        gap: 32rpx;
        margin-top: 24rpx;
        .item {
          display: flex;
          align-items: center;
          flex-direction: column;
          .text {
            margin-top: 12rpx;
            font-size: 32rpx;
            color: #606060;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

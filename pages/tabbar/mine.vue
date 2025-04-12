<template>
  <view class="mine">
    <section class="content">
      <view class="user" @click="$fn.jumpPage('/pages/my/information')">
        <view class="left">
          <u-image :src="vuex_imgUrl + userInfo.avatar" width="120" height="120" mode="aspectFill"></u-image>
        </view>
        <view class="right">
          <view class="name">
            <text>{{ userInfo.nickname }}</text>
          </view>
          <view class="account">
            <text>账号：{{ userInfo.user.username }}</text>
          </view>
          <view class="account">
            <text>手机号：{{ userInfo.phone }}</text>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="title">
          <view class="left">工具与服务</view>
        </view>
        <view class="list">
          <view class="item" @click="$fn.jumpPage('/pages/service/fileManagement')">
            <u-image width="50" height="50" src="/static/mine/m2.png" mode="WidthFix"></u-image>
            <view class="text">
              <text>个人档案</text>
            </view>
          </view>
          <view class="item" @click="$fn.jumpPage('/pages/my/myCard')">
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
          <view class="item" @click="$fn.jumpPage('/pages/my/addGuardian')">
            <u-image width="70" height="70" src="/static/mine/m7.png" mode="aspectFill"></u-image>
            <view class="text">
              <text>添加监护人</text>
            </view>
          </view>
        </view>
        <!-- 监护人列表 -->
        <view class="guardian-list" v-if="userInfo.guardians && userInfo.guardians.length > 0">
          <view class="guardian-item" v-for="item in userInfo.guardians" :key="item.id">
            <view class="guardian-info">
              <u-image :src="vuex_imgUrl + item.guardian.avatar" width="80" height="80" mode="aspectFill" shape="circle"></u-image>
              <view class="guardian-detail">
                <view class="guardian-name">{{ item.guardian.nickname }}</view>
                <view class="guardian-relation">关系：{{ item.relationship }}</view>
                <view class="guardian-phone">电话：{{ item.guardian.phone }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="empty-guardian" v-else>
          <text>暂无监护人</text>
        </view>
      </view>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  onShow() {
    this.getUserProfile();
  },
  methods: {
    // 获取用户信息
    async getUserProfile() {
      try {
        const res = await this.$api.getUserProFile();
        if (res.code == 200) {
          this.userInfo = res.data;
          uni.setStorageSync("userInfo", res.data);
        }
      } catch (err) {}
    },
  },
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
        display: flex;
        flex-direction: column;
        gap: 16rpx;
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
    .guardian-list {
      margin-top: 24rpx;
      .guardian-item {
        background-color: #f7f7f7;
        border-radius: 12rpx;
        padding: 20rpx;
        margin-bottom: 16rpx;

        .guardian-info {
          display: flex;
          align-items: center;
          gap: 20rpx;

          .guardian-detail {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 8rpx;

            .guardian-name {
              font-size: 32rpx;
              font-weight: bold;
              color: #333;
            }

            .guardian-relation,
            .guardian-phone {
              font-size: 28rpx;
              color: #666;
            }
          }
        }
      }
    }

    .empty-guardian {
      text-align: center;
      padding: 40rpx 0;
      color: #999;
      font-size: 28rpx;
    }
  }
}
</style>

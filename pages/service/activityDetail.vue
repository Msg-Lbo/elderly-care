<template>
  <view class="activity-detail">
    <view class="header">
      <u-image :src="img_url + activity.cover" width="100%" height="500rpx" mode="aspectFill"></u-image>
    </view>

    <view class="content">
      <view class="title">{{ activity.title }}</view>

      <view class="meta">
        <view class="meta-item">
          <u-icon name="calendar" size="18" color="#606266"></u-icon>
          <text>活动时间: {{ formatDate(activity.start_time) }} 至 {{ formatDate(activity.end_time) }}</text>
        </view>
        <view class="meta-item">
          <u-icon name="account" size="18" color="#606266"></u-icon>
          <text>已报名: {{ activity.registration_count || 0 }}人</text>
        </view>
      </view>

      <view class="divider"></view>

      <view class="description">
        <u-parse :content="activity.description"></u-parse>
      </view>

      <view class="action">
        <u-button type="primary" v-if="!activity.is_registered" @click="handleSignup"> 立即报名 </u-button>
        <u-button type="warning" v-else @click="handleCancelSignup"> 取消报名 </u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activity: {},
      img_url: "http://127.0.0.1:8000/",
    };
  },
  onLoad(options) {
    if (options.id) {
      this.getActivityDetail(options.id);
    }
  },
  methods: {
    async getActivityDetail(id) {
      try {
        const res = await this.$api.getActivityDetail(id);
        if (res.code === 200) {
          this.activity = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },
    // 报名
    handleSignup() {
      this.$api.activityRegister({ activity: this.activity.id }).then((res) => {
        if (res.code === 200) {
          this.activity.signup_count++;
          this.activity.is_registered = true;
          uni.showToast({
            title: "报名成功",
            icon: "success",
            duration: 2000,
          });
        } else {
          uni.showToast({
            title: res.message,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
    // 取消报名
    handleCancelSignup() {
      this.$api.activityCancleRegister({ activity: this.activity.id }).then((res) => {
        if (res.code === 200) {
          this.activity.signup_count--;
          this.activity.is_registered = false;
          uni.showToast({
            title: "取消报名成功",
            icon: "success",
            duration: 2000,
          });
        } else {
          uni.showToast({
            title: res.message,
            icon: "none",
            duration: 2000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-detail {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 100rpx;

  .header {
    position: relative;
  }

  .content {
    padding: 30rpx;
    background-color: #fff;
    margin: 20rpx;
    border-radius: 16rpx;

    .title {
      font-size: 40rpx;
      font-weight: bold;
      color: #303133;
      margin-bottom: 30rpx;
    }

    .meta {
      margin-bottom: 30rpx;

      .meta-item {
        display: flex;
        align-items: center;
        margin-bottom: 15rpx;
        font-size: 28rpx;
        color: #606266;

        text {
          margin-left: 10rpx;
        }
      }
    }

    .divider {
      height: 1px;
      background-color: #eee;
      margin: 30rpx 0;
    }

    .description {
      font-size: 30rpx;
      line-height: 1.6;
      color: #333;
    }

    .action {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20rpx;
      background-color: #fff;
      box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

      .u-button {
        width: 100%;
      }
    }
  }
}
</style>

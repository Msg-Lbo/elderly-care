<template>
  <view class="active-list">
    <u-list height="80vh">
      <view
        class="activity-card"
        v-for="(item, index) in communityActivity"
        :key="index"
        @click="$fn.jumpPage('/pages/service/activityDetail?id=' + item.id)"
      >
        <view class="card-left">
          <u-image :src="img_url + item.cover" width="250rpx" height="220rpx" mode="aspectFill" radius="10"></u-image>
        </view>
        <view class="card-right">
          <view class="activity-title">{{ item.title }}</view>
          <view class="activity-desc">{{ item.description }}</view>

          <view class="activity-meta">
            <view class="meta-item">
              <u-icon name="calendar" size="16" color="#606266"></u-icon>
              <text>{{ formatDate(item.start_time) }} - {{ formatDate(item.end_time) }}</text>
            </view>
            <view class="meta-item">
              <u-icon name="account" size="16" color="#606266"></u-icon>
              <text>已报名: {{ item.registration_count || 0 }}人</text>
            </view>
          </view>

          <u-button type="primary" size="small" shape="circle" @click.stop="handleSignup(item.id)"> 立即报名 </u-button>
        </view>
      </view>
    </u-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      communityActivity: [
        {
          id: 1,
          title: "活动标题1",
          description: "活动描述1",
          cover: "activity1.jpg",
          start_time: "2021-08-01 10:00:00",
          end_time: "2021-08-01 12:00:00",
          signup_count: 10,
        },
        {
          id: 2,
          title: "活动标题2",
          description: "活动描述2",
          cover: "activity2.jpg",
          start_time: "2021-08-02 10:00:00",
          end_time: "2021-08-02 12:00:00",
          signup_count: 20,
        },
      ],
      img_url: "http://127.0.0.1:8000/",
    };
  },
  onShow() {
    this.getCommunityActivity();
  },
  onLoad(options) {},
  methods: {
    // 获取活动列表
    async getCommunityActivity() {
      try {
        const res = await this.$api.getActivities();
        if (res.code === 200) {
          this.communityActivity = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString();
    },

    handleSignup(activityId) {
      uni.navigateTo({
        url: `/pages/service/activitySignup?id=${activityId}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active-list {
  padding: 20rpx;
  background-color: #f5f7fa;

  .activity-card {
    display: flex;
    padding: 30rpx;
    margin-bottom: 30rpx;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);

    .card-left {
      margin-right: 30rpx;
    }

    .card-right {
      flex: 1;
      display: flex;
      flex-direction: column;

      .activity-title {
        font-size: 36rpx;
        font-weight: bold;
        color: #303133;
        margin-bottom: 15rpx;
      }

      .activity-desc {
        font-size: 28rpx;
        color: #606266;
        margin-bottom: 20rpx;
        line-height: 1.5;
      }

      .activity-meta {
        margin-bottom: 20rpx;

        .meta-item {
          display: flex;
          align-items: center;
          margin-bottom: 10rpx;
          font-size: 24rpx;
          color: #606266;

          text {
            margin-left: 10rpx;
          }
        }
      }
    }
  }
}
</style>

<template>
  <view id="wrap">
    <view class="article-meta">
      <text class="publish-time">{{$u.timeFormat(publishTime, 'yyyy年mm月dd日')}}</text>
      <view class="like-count">
        <u-icon name="thumb-up" size="16" color="#999"></u-icon>
        <text>{{likeCount}}</text>
      </view>
    </view>
    <u-parse :content="content"></u-parse>
    <view class="action-bar">
      <u-button
        type="primary"
        text="点赞"
        icon="thumb-up"
        color="#18a058"
        :custom-style="{
          height: '88rpx',
          fontSize: '32rpx',
          marginTop: '40rpx',
        }"
        @click="handleLike"
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      id: "",
      liked: false,
      publishTime: "",
      likeCount: 0
    };
  },
  onLoad(options) {
    this.id = Number(options.id);
    uni.setNavigationBarTitle({
      title: "文章详情",
    });
    this.getInfo();
  },
  methods: {
    async handleLike() {
      try {
        const res = await this.$api.likeArticle({ id: this.id });
        if (res.code === 200) {
          this.likeCount++;
          uni.showToast({
            title: "点赞成功",
            icon: "success",
          });
        }
      } catch (err) {
        console.log(err.data);
      }
    },
    async getInfo() {
      try {
        const res = await this.$api.getArticleDetail(this.id);
        if (res.code === 200) {
          this.content = res.data.content;
          this.id = res.data.id;
          this.publishTime = res.data.createTime;
          this.likeCount = res.data.likes_count || 0;
          uni.setNavigationBarTitle({
            title: res.data.title,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  color: #999;
  font-size: 24rpx;
  
  .like-count {
    display: flex;
    align-items: center;
    
    text {
      margin-left: 10rpx;
    }
  }
}

#wrap {
  padding: 30rpx;
  padding-bottom: 120rpx;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 32rpx;
  background: #fff;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
  z-index: 100;
}
</style>

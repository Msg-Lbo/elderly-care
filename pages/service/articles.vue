<template>
  <view class="life">
    <section class="tabs">
      <u-tabs
        :list="categories"
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
    <section class="content">
      <u-list height="80vh">
        <view
          class="content-item"
          v-for="(item, index) in articleList"
          :key="index"
          @click="$fn.jumpPage(`/pages/tabbar/articleDetail?id=${item.id}`)"
        >
          <view class="left">
            <view class="title">{{ item.title }}</view>
            <view class="desc"> {{ item.description }} </view>
            <view class="meta">
              <text class="publish-time">{{$u.timeFormat(item.created_at, 'yyyy年mm月dd日')}}</text>
              <view class="stats">
                <view class="stat-item">
                  <u-icon name="eye" size="14" color="#999"></u-icon>
                  <text>{{item.views || 0}}</text>
                </view>
                <view class="stat-item">
                  <u-icon name="thumb-up" size="14" color="#999"></u-icon>
                  <text>{{item.likes_count || 0}}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="right">
            <u-image :src="img_url + item.cover" width="250rpx" height="220rpx" mode="WidthFix"></u-image>
          </view>
        </view>
      </u-list>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      categories: [],
      articleList: [],
      img_url: "http://127.0.0.1:8000",
    };
  },
  onShow() {
    this.handleGetCategories();
  },
  onLoad(options) {},
  methods: {
    handleTabClick(item) {
      this.currentIndex = item.index;
      // 筛选所有item.name对应的文章并返回
      this.getArticleList(item.name);
    },
    // 获取分类列表
    async handleGetCategories() {
      try {
        const res = await this.$api.getCategories();
        if (res.code === 200) {
          this.categories = res.data;
          this.getArticleList(this.categories[0].name);
        }
      } catch {}
    },
    // 获取文章列表
    async getArticleList(category) {
      try {
        const res = await this.$api.getArticlesByCategory(category);
        if (res.code === 200) {
          this.articleList = res.data;
          console.log(this.articleList);
        }
      } catch (error) {
        console.log(error);
      }
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
  .content {
    .content-item {
      margin-top: 40rpx;
      padding: 30rpx 20rpx;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 10rpx;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 10rpx 10rpx 20rpx #798860;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .title {
          font-size: 56rpx;
          color: #303133;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        .desc {
          font-size: 36rpx;
          color: #606266;
          margin-bottom: 10rpx;
        }
        .meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 24rpx;
          color: #999;
          margin-top: 20rpx;
          
          .stats {
            display: flex;
            gap: 20rpx;
            
            .stat-item {
              display: flex;
              align-items: center;
              
              text {
                margin-left: 6rpx;
              }
            }
          }
        }
        .right {
          width: 150rpx;
          height: 150rpx;
          border-radius: 10rpx;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

<template>
  <view class="search-list">
    <section class="content">
      <view class="search-bar">
        <u-search placeholder="请输入关键词" height="50" animation v-model="searchValue" @search="getArticleList"></u-search>
      </view>
      <u-list>
        <view class="list">
          <view
            class="item"
            v-for="(item, index) in articleList"
            :key="index"
            @click="$fn.jumpPage(`/pages/tabbar/agreement?id=${item.id}`)"
          >
            <view class="left">
              <view class="cover">
                <u-image :src="img_url + item.cover" width="100rpx" height="100rpx" mode="aspectFill"></u-image>
              </view>
              <view class="info">
                <view class="title">{{ item.title }}</view>
                <view class="desc">{{ item.description }}</view>
              </view>
            </view>
            <view class="right">
              <u-icon name="arrow-right"></u-icon>
            </view>
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
      img_url: "http://127.0.0.1:8000",
      searchValue: "",
      type: "",
      articleList: [],
    };
  },
  onLoad(options) {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      try {
        const res = await this.$api.getArticlesBySearch(this.searchValue);
        if (res.code === 200) {
          this.articleList = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-list {
  .content {
    padding: 24rpx;
    background-color: #f7f7f7;
    .search-bar {
      margin-bottom: 24rpx;
      font-size: 42rpx;
    }
    .list {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24rpx;
        background-color: #fff;
        border-radius: 16rpx;
        margin-bottom: 24rpx;
        .left {
          display: flex;
          align-items: center;
          .cover {
            margin-right: 24rpx;
          }
          .info {
            .title {
              font-size: 32rpx;
              font-weight: bold;
            }
            .desc {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
        .right {
          .icon {
            font-size: 32rpx;
            color: #999;
          }
        }
      }
    }
  }
}
</style>

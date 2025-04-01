<template>
  <view class="search-list">
    <section class="content">
      <view class="search-bar">
        <u-search placeholder="请输入关键词" height="50" animation v-model="searchValue"></u-search>
      </view>
      <u-list>
        <view class="list">
          <view class="item">
            <view class="left">
              <view class="cover">
                <u-image src="/static/common/c1.png" width="100rpx" height="100rpx" mode="aspectFill"></u-image>
              </view>
              <view class="info">
                <view class="title"> Lorem ipsum dolor sit </view>
                <view class="desc"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </view>
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
      searchValue: "",
      type: "",
    };
  },
  onLoad(options) {
    this.type = options.type;
  },
  methods: {},
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

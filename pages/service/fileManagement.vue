<template>
  <view class="file-management">
    <section class="content">
      <u-list>
        <view class="list" v-if="list.length > 0">
          <view class="item" v-for="item in list" :key="item.id" @click="$fn.jumpPage(`/pages/service/fileDetail?id=${item.id}`)">
            <view class="left">
              <view class="title">{{ item.title }}</view>
              <view class="time">创建时间: {{ $u.timeFormat(item.created_at, "yyyy年mm月dd日") }}</view>
            </view>
            <view class="right">
              <u-icon name="arrow-right"></u-icon>
            </view>
          </view>
        </view>
        <view class="empty-tip" v-else>
          <u-empty text="当前无个人档案" mode="list"></u-empty>
        </view>
      </u-list>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      userInfo: {},
    };
  },
  onLoad(options) {
    this.userInfo = uni.getStorageSync("userInfo");
    this.handleGetList();
  },
  methods: {
    handleGetList() {
      const id = this.userInfo.id;
      this.$api.getArchives(id).then((res) => {
        if (res.code === 200) {
          this.list = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.file-management {
  .content {
    padding: 24rpx;
    background-color: #f7f7f7;
    min-height: 100vh;
    .list {
      display: flex;
      flex-direction: column;
      gap: 24rpx;
      .item {
        padding: 24rpx;
        background-color: #fff;
        border-radius: 16rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: 42rpx;
          font-weight: bold;
        }
        .time {
          font-size: 38rpx;
          color: #999;
          margin-top: 16rpx;
        }
      }
    }
    .empty-tip {
      padding-top: 200rpx;
    }
  }
  .btns {
    background: #fff;
    position: fixed;
    bottom: 0rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 99;

    .btn {
      width: 686rpx;
      height: 96rpx;
      background: linear-gradient(90deg, #208a5b 0%, #00693a 100%);
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      text-align: center;
      line-height: 96rpx;

      font-weight: bold;
      font-size: 36rpx;
      color: #ffffff;
      margin-bottom: 40rpx;
    }
    .disabled {
      background: #ccc;
      border-color: #ccc;
      color: #999;
    }
  }
}
</style>

<template>
    <view class="file-management">
      <section class="content">
        <u-list>
          <view class="list">
            <view class="item" v-for="item in list" :key="item.id">
              <view class="left">
                <view class="title"> 档案名称 </view>
                <view class="time">体检日期：2025-03-31</view>
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
        list: [
          {
            id: 1,
            title: "档案名称",
            time: "体检日期：2025-03-31",
          },
          {
            id: 2,
            title: "档案名称",
            time: "体检日期：2025-03-31",
          },
        ],
      };
    },
    methods: {},
  };
  </script>
  
  <style lang="scss" scoped>
  .file-management {
    .content {
      padding: 24rpx;
      background-color: #f7f7f7;
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
  
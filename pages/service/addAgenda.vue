<template>
  <view class="add-agenda">
    <section class="content">
      <view class="content-section">
        <view class="item">
          <view class="label">日程标题</view>
          <view class="value">
            <u-input v-model="title" placeholder="请输入日程标题" border="none" inputAlign="right" />
          </view>
        </view>
        <u-line margin="40rpx 0"></u-line>
        <view class="item" @click="show = true">
          <view class="label">提醒时间</view>
          <view class="value">
            <text>{{ value1 ? $fn.timeDeal(value1) : "请选择提醒时间" }}</text>
            <u-icon name="arrow-right" size="24rpx"></u-icon>
          </view>
        </view>
        <u-line margin="40rpx 0"></u-line>
        <view class="item col">
          <view class="label">提醒内容</view>
          <view class="value" style="margin-top: 20rpx">
            <u-textarea v-model="content" placeholder="请输入提醒内容" />
          </view>
        </view>
      </view>
    </section>
    <section class="btns">
      <view class="btn">确定</view>
    </section>
    <u-datetime-picker :show="show" v-model="value1" :min-date="minDate" mode="datetime" @confirm="handleConfirm"></u-datetime-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      minDate: Date.now(),
      value1: "",
      title: "",
      content: "",
    };
  },
  methods: {
    handleConfirm(e) {
      this.value1 = e.value;
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-agenda {
  .content {
    .content-section {
      padding: 32rpx;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          font-size: 32rpx;
          color: #1a1a1a;
        }
        .value {
          font-size: 28rpx;
          color: #666;
          display: flex;
          align-items: center;
          gap: 10rpx;
        }
      }
      .col {
        flex-direction: column;
        align-items: flex-start;
        .value {
          width: 100%;
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

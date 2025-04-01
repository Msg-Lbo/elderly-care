<template>
  <view class="commission">
    <section class="content">
      <view class="content-section">
        <view class="item" @click="typeShow = true">
          <view class="label">帮助类型</view>
          <view class="value">
            <text>{{ currentType || "请选择帮助类型" }}</text>
            <u-icon name="arrow-right" size="24rpx"></u-icon>
          </view>
        </view>
        <u-line margin="40rpx 0"></u-line>
        <view class="item" @click="show = true">
          <view class="label">帮助时间</view>
          <view class="value">
            <text>{{ value1 ? $fn.timeDeal(value1) : "请选择帮助时间" }}</text>
            <u-icon name="arrow-right" size="24rpx"></u-icon>
          </view>
        </view>
        <u-line margin="40rpx 0"></u-line>
        <view class="item" @click="handleChooseLocation">
          <view class="label">详细地址</view>
          <view class="value">
            <text>{{ chooseLocation || "请选择详细地址" }}</text>
            <u-icon name="arrow-right" size="24rpx"></u-icon>
          </view>
        </view>
        <u-line margin="40rpx 0"></u-line>
        <view class="item col">
          <view class="label">备注</view>
          <view class="value" style="margin-top: 20rpx">
            <u-textarea v-model="content" placeholder="请输入备注" />
          </view>
        </view>
      </view>
    </section>
    <section class="btns">
      <view class="btn">确定</view>
    </section>
    <u-picker :show="typeShow" :columns="typeColumns" @cancel="typeShow = false" @confirm="handleTypeConfirm"></u-picker>
    <u-datetime-picker :show="show" v-model="value1" :min-date="minDate" mode="datetime" @confirm="handleConfirm"></u-datetime-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      typeShow: false,
      currentType: "",
      chooseLocation: "",
      show: false,
      minDate: Date.now(),
      value1: "",
      title: "",
      content: "",
      typeColumns: [["喂药", "看护", "做饭", "打扫"]],
    };
  },
  methods: {
    handleConfirm(e) {
      this.value1 = e.value;
      this.show = false;
    },
    handleTypeConfirm(e) {
      this.currentType = e.value[0];
      this.typeShow = false;
    },
    // 选择位置
    handleChooseLocation() {
      this.$fn.chooseLocation((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.chooseLocation = res.address;
          console.log(this.chooseLocation);
          
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.commission {
  .content {
    .content-section {
      padding: 32rpx;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          width: 180rpx;
          font-size: 42rpx;
          color: #1a1a1a;
        }
        .value {
          flex: 1;  
          font-size: 32rpx;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: flex-end;
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

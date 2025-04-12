<template>
  <view class="edit-card">
    <view class="form-card">
      <view class="form-item">
        <view class="form-label">卡片名称</view>
        <view class="form-input">
          <input type="text" v-model="form.name" placeholder="请输入卡片名称" />
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item">
        <view class="form-label">卡号</view>
        <view class="form-input">
          <input type="number" v-model="form.number" placeholder="请输入卡号" maxlength="19" />
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item">
        <view class="form-label">备注</view>
        <view class="form-input">
          <input type="text" v-model="form.remark" placeholder="请输入备注信息（选填）" />
        </view>
      </view>
    </view>

    <view class="bottom_btn" @click="handleSubmit">
      <view class="btn">保存</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cardId: "",
      form: {
        name: "",
        number: "",
        remark: "",
        card_type: "BANK",
      },
    };
  },
  onLoad(options) {
    if (options.id) {
      this.cardId = options.id;
      this.getCardDetail();
    }
  },
  methods: {
    // 获取银行卡详情
    getCardDetail() {
      this.$api
        .getCardDetail(this.cardId)
        .then((res) => {
          if (res.code === 200) {
            this.form = { ...res.data };
          } else {
            uni.showToast({
              title: res.message || "获取卡片信息失败",
              icon: "none",
            });
          }
        })
        .catch((err) => {
          uni.showToast({
            title: "获取卡片信息失败，请重试",
            icon: "none",
          });
        });
    },
    // 验证银行卡号
    validateCardNumber(number) {
      // 移除所有空格
      number = number.replace(/\s/g, "");
      // 验证是否为纯数字
      if (!/^\d+$/.test(number)) {
        return false;
      }
      // 验证长度
      if (number.length < 16 || number.length > 19) {
        return false;
      }
      return true;
    },
    handleSubmit() {
      if (!this.form.name) {
        uni.showToast({
          title: "请输入银行卡名称",
          icon: "none",
        });
        return;
      }
      if (!this.form.number) {
        uni.showToast({
          title: "请输入银行卡号",
          icon: "none",
        });
        return;
      }

      // 验证银行卡号
      if (!this.validateCardNumber(this.form.number)) {
        uni.showToast({
          title: "请输入正确的银行卡号",
          icon: "none",
        });
        return;
      }

      // 处理提交数据
      const submitData = {
        card_id: this.cardId,
        name: this.form.name,
        number: this.form.number.replace(/\s/g, ""), // 移除空格
        remark: this.form.remark || "",
        card_type: "BANK",
      };

      this.$api
        .updateCard(submitData)
        .then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: "保存成功",
              icon: "success",
            });
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          } else {
            uni.showToast({
              title: res.message || "保存失败",
              icon: "none",
            });
          }
        })
        .catch((err) => {
          uni.showToast({
            title: "保存失败，请重试",
            icon: "none",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-card {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 30rpx;
  padding-bottom: 120rpx;

  .form-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 0 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

    .form-item {
      display: flex;
      align-items: center;
      padding: 40rpx 0;
      position: relative;

      .form-label {
        width: 200rpx;
        font-size: 32rpx;
        color: #333;
        font-weight: 500;
      }

      .form-input {
        flex: 1;
        input {
          width: 100%;
          height: 48rpx;
          font-size: 32rpx;
          color: #333;
        }
      }
    }
  }

  .bottom_btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);
    .btn {
      background: linear-gradient(90deg, #208a5b 0%, #00693a 100%);
      color: #ffffff;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      font-size: 36rpx;
      font-weight: 500;
    }
  }
}
</style>

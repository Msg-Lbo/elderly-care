<template>
  <view class="commission">
    <view class="form-card">
      <view class="form-item" @click="typeShow = true">
        <view class="form-label">帮助类型</view>
        <view class="form-value">
          <text :class="{ placeholder: !form.service_type.label }">{{ form.service_type.label || "请选择" }}</text>
          <u-icon name="arrow-right" color="#808080" size="20"></u-icon>
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item" @click="show = true">
        <view class="form-label">帮助时间</view>
        <view class="form-value">
          <text :class="{ placeholder: !form.service_time }">{{
            form.service_time ? $u.timeFormat(form.service_time, "yyyy年mm月dd日 hh:MM") : "请选择"
          }}</text>
          <u-icon name="arrow-right" color="#808080" size="20"></u-icon>
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item" @click="handleChooseLocation">
        <view class="form-label">详细地址</view>
        <view class="form-value">
          <text :class="{ placeholder: !form.address }">{{ form.address || "请选择" }}</text>
          <u-icon name="arrow-right" color="#808080" size="20"></u-icon>
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item column">
        <view class="form-label">备注</view>
        <view class="form-input">
          <u-textarea v-model="form.content" placeholder="请输入备注" border="none" height="160" placeholder-class="textarea-placeholder" />
        </view>
      </view>
    </view>

    <view class="action-bar">
      <u-button
        shape="circle"
        type="primary"
        text="确定"
        color="#18a058"
        @click="handleCreateService"
        :custom-style="{
          height: '88rpx',
          fontSize: '36rpx',
          fontWeight: 500,
        }"
      />
    </view>
    <u-picker :show="typeShow" :columns="typeColumns" keyName="label" @cancel="typeShow = false" @confirm="handleTypeConfirm"></u-picker>
    <u-datetime-picker
      :show="show"
      v-model="form.service_time"
      :min-date="minDate"
      mode="datetime"
      @confirm="handleConfirm"
    ></u-datetime-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      typeShow: false,
      show: false,
      minDate: Date.now(),
      typeColumns: [
        [
          {
            label: "喂药",
            value: "FOOD",
          },
          {
            label: "看护",
            value: "MEDICINE",
          },
          {
            label: "做饭",
            value: "DIET",
          },
          {
            label: "打扫",
            value: "CLEANING",
          },
          {
            label: "其他",
            value: "OTHER",
          },
        ],
      ],
      userInfo: {},
      form: {
        client: "",
        service_type: {},
        service_time: "",
        address: "",
        content: "",
      },
    };
  },
  onLoad(options) {
    this.userInfo = uni.getStorageSync("userInfo");
  },
  methods: {
    handleConfirm(e) {
      this.form.service_time = e.value;
      console.log(e.value);
      
      this.show = false;
    },
    handleTypeConfirm(e) {
      this.form.service_type = e.value[0];
      this.typeShow = false;
    },
    handleChooseLocation() {
      this.$fn.chooseLocation((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.form.address = res.address + res.name;
          console.log(res.address + res.name);
        }
      });
    },
    // 创建服务
    handleCreateService() {
      if (!this.form.service_type.value ||!this.form.service_time || !this.form.address || !this.form.content) {
        uni.showToast({
          title: "请填写完整信息",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      this.$api
        .createServices({
          client: this.userInfo.id,
          service_type: this.form.service_type.value,
          service_time: new Date(this.form.service_time).toISOString(),
          address: this.form.address,
          content: this.form.content,
        })
        .then((res) => {
          this.$fn.toast(res.message);
          setTimeout(() => {
            uni.navigateTo({ url: '/pages/my/myCommission' })
          }, 1000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.commission {
  background-color: #f0f7ff;
  min-height: 100vh;
  padding: 30rpx;
  padding-bottom: 120rpx;

  .form-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 0 32rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  }

  .form-item {
    display: flex;
    align-items: center;
    padding: 32rpx 0;
    position: relative;

    &.column {
      flex-direction: column;
      align-items: flex-start;
    }

    .form-label {
      font-size: 38rpx;
      color: #1a73e8;
      font-weight: 500;
      width: 200rpx;
    }

    .form-value {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 38rpx;
      color: #333;

      .placeholder {
        color: #999;
      }
    }

    .form-input {
      width: 100%;
      margin-top: 20rpx;
    }
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
}

.textarea-placeholder {
  color: #999;
  font-size: 36rpx;
}

.form-item:active {
  background-color: #e6f2ff;
  border-radius: 12rpx;
}

.u-line {
  margin: 0 -32rpx !important;
}
</style>

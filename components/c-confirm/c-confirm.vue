<template>
  <u-popup :show="show" mode="center" @close="handleClose">
    <view class="confirm-popup">
      <view class="title">{{ title }}</view>
      <view class="content">{{ content }}</view>
      <view class="actions">
        <u-button @click="handleCancel" plain size="small">取消</u-button>
        <u-button @click="handleConfirm" type="primary" size="small" :color="confirmColor">{{ confirmText }}</u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'c-confirm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    confirmColor: {
      type: String,
      default: '#00693A'
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-popup {
  width: 600rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: 500;
    color: #333;
    text-align: center;
    margin-bottom: 30rpx;
  }
  
  .content {
    font-size: 32rpx;
    color: #666;
    text-align: center;
    margin-bottom: 40rpx;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 30rpx;
  }
}
</style> 
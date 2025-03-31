<template>
  <view class="sos">
    <section class="content">
      <view class="content-img" @click="sos">
        <u-image width="300" height="300" src="/static/common/sos.svg" mode="aspectFill"></u-image>
      </view>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      addressShow: false,
      sosCount: 0,
      timer: null, // 计时器
      lastClickTime: 0, // 上次点击时间
    };
  },
  methods: {
    // 回调
    abc(e) {
      this.addressShow = false;
      console.log("e", e);
    },
    // 防抖 3秒内连续点击3次触发sos拨打120
    sos() {
      const currentTime = new Date().getTime();
      
      // 如果距离上次点击超过3秒，重置计数
      if (currentTime - this.lastClickTime > 3000) {
        this.sosCount = 0;
      }
      
      this.lastClickTime = currentTime;
      this.sosCount++;
      
      // 清除之前的定时器
      if (this.timer) {
        clearTimeout(this.timer);
      }
      
      // 设置新的定时器，3秒后重置计数
      this.timer = setTimeout(() => {
        if (this.sosCount < 3) {
          this.sosCount = 0;
        }
      }, 3000);
      
      // 如果达到3次点击，触发SOS
      if (this.sosCount >= 3) {
        this.handleCall();
      }
    },

    // 拨打电话
    handleCall() {
      uni.makePhoneCall({
        phoneNumber: '120',
        success: () => {
          console.log('拨打电话成功');
          this.sosCount = 0; // 重置计数
        },
        fail: (err) => {
          console.error('拨打电话失败', err);
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    }
  },
  // 组件销毁时清除定时器
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
.sos {
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40%;
    .content-img {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

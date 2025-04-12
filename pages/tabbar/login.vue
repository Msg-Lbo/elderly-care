<template>
  <!-- 登录 -->
  <view class="login-page">
    <image class="login-bg" src="/static/common/login-bg.png"></image>
    <!-- 图片 -->
    <view class="topImg">
      <image src="/static/common/logo.png" mode=""></image>
    </view>
    <view class="welcome_login"> 你好，欢迎登录！ </view>
    <!-- 操作区域 -->
    <view class="contentLogin">
      <view class="content_info">
        <view class="content_info_item">
          <input type="text" v-model="username" placeholder="请输入账号" placeholder-class="pcs" />
        </view>
        <view class="content_info_item">
          <input type="password" v-model="password" placeholder="请输入密码" placeholder-class="pcs" />
        </view>
        <view class="content_info_item" v-if="isRegister">
          <input type="password" v-model="password2" placeholder="请确认密码" placeholder-class="pcs" />
        </view>
        <view class="content_info_item" v-if="isRegister">
          <input type="text" v-model="phone" placeholder="请输入手机号" placeholder-class="pcs" />
        </view>
        <view class="content_info_item" v-if="isRegister">
          <input type="text" v-model="email" placeholder="请输入邮箱" placeholder-class="pcs" />
        </view>
        <view class="forgetpassword">
          <view class="forgetpassword_rtxt"> 忘记密码请联系管理员 </view>
        </view>
        <view @click="handleGetToken" class="btn_sub" v-if="!isRegister"> 登录 </view>
        <view @click="handleRegister" class="btn_sub register" v-if="isRegister"> 注册 </view>
        <view @click="toggleMode" class="btn_sub" :class="{ register: isRegister }">
          {{ isRegister ? "返回登录" : "注册账号" }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      imgUniCode: "",
      verifyKey: "",
      username: "",
      password: "",
      password2: "",
      phone: "",
      email: "",
      verifyCode: "",
      noClick: true,
      isRegister: false, // 是否处于注册模式
    };
  },
  onLoad() {
    // this.getCaptchaCode()
  },
  onShow() {},
  methods: {
    // 切换登录/注册模式
    toggleMode() {
      this.isRegister = !this.isRegister;
      // 清空表单
      this.username = "";
      this.password = "";
      this.password2 = "";
      this.phone = "";
      this.email = "";
    },
    // 处理注册
    async handleRegister() {
      // 表单验证
      if (!this.username || !this.password || !this.password2 || !this.phone || !this.email) {
        this.$fn.toast("请填写完整信息");
        return;
      }
      if (this.password !== this.password2) {
        this.$fn.toast("两次密码输入不一致");
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.$fn.toast("请输入正确的手机号");
        return;
      }
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
        this.$fn.toast("请输入正确的邮箱");
        return;
      }

      try {
        const res = await this.$api.register({
          username: this.username,
          password: this.password,
          phone: this.phone,
          email: this.email,
        });

        if (res.code === 200) {
          this.$fn.toast(res.message || "注册成功，正在登录...");
          // 注册成功后自动登录
          await this.handleGetToken();
        } else {
          // 处理错误信息
          this.$fn.toast(res.message || "注册失败");
        }
      } catch (error) {
        console.error("注册失败:", error);
        this.$fn.toast(error.message || "注册失败，请重试");
      }
    },
    // 获取token
    async handleGetToken() {
      try {
        const res = await this.$api.getToken({
          username: this.username,
          password: this.password,
        });
        console.log(res);
        this.$store.state.vuex_token = res.access;
        uni.setStorageSync("token", res.access);
        await this.login();
      } catch (error) {
        this.$fn.toast("登录失败");
      }
    },
    // 登录
    async login() {
      try {
        const res = await this.$api.login({
          username: this.username,
          password: this.password,
        });
        if (res.code == 200) {
          this.$store.state.vuex_token = res.data.access;
          uni.setStorageSync("token", res.data.access);
          this.$fn.toast(res.message || "登录成功");
          await this.getUserProfile();
          // 使用reLaunch确保跳转到首页
          uni.reLaunch({
            url: "/pages/tabbar/home",
          });
        }
      } catch (error) {
        this.$fn.toast(error.message || "登录失败");
      }
    },
    // 获取用户信息
    async getUserProfile() {
      try {
        const res = await this.$api.getUserProFile();
        if (res.code == 200) {
          this.userInfo = res.data;
          uni.setStorageSync("userInfo", res.data);
        }
      } catch (err) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  .login-bg {
    position: fixed;
    top: -40rpx;
    left: 0;
    right: 0;
    bottom: 0;
    width: 120%;
    height: 130%;
    z-index: -1;
    transform: translateX(-10%);
  }
}
.topBg {
  /deep/.nav {
    font-weight: bold;
  }
}

.topImg {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 136rpx;
  // height: 540rpx;
  box-sizing: border-box;

  image {
    width: 240rpx;
    height: 240rpx;
  }
}

.welcome_login {
  width: 100%;
  padding-top: 48rpx;
  font-size: 40rpx;
  display: flex;
  justify-content: center;
  color: #000;
}

.contentLogin {
  width: 100%;
  padding: 0 80rpx;
  box-sizing: border-box;

  .content_info {
    padding-top: 64rpx;
    box-sizing: border-box;

    .content_info_item {
      width: 100%;
      height: 96rpx !important;
      background-color: #f7f7f7;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      padding-left: 28rpx;
      box-sizing: border-box;
      margin-bottom: 48rpx;

      input {
        font-size: 36rpx;
      }
    }

    .forgetpassword {
      margin-top: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .forgetpassword_rtxt {
        color: #191919;
        font-size: 24rpx;
      }
    }

    .btn_sub {
      width: 100%;
      margin-top: 58rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #a6cf6f;
      height: 96rpx;
      border-radius: 50rpx;
      color: #fff;
      font-size: 40rpx;

      &.register {
        background-color: #2d6cb3;
      }
    }
  }

  .pcs {
    font-size: 32rpx;
    color: #8c9299;
  }
}
</style>

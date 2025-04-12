<template>
  <view>
    <view class="main">
      <view @click="uploadAvatar" class="item">
        <text class="text">头像</text>
        <view class="item-right">
          <image class="head" v-show="form.avatar" :src="vuex_imgUrl + form.avatar" mode="aspectFill"></image>
          <image class="head" v-show="!form.avatar" src="/static/common/header-img.png"></image>
          <u-icon name="arrow-right" color="#666666" size="20rpx"></u-icon>
        </view>
      </view>

      <view class="items item">
        <text class="text">昵称</text>
        <view class="item-right">
          <input class="ipt" v-model="form.nickname" placeholder="请输入" />
        </view>
      </view>
      <view class="items item">
        <text class="text">账号</text>
        <view class="item-right">
          <view class="item-right">
            <input class="ipt" disabled v-model="form.user.username" placeholder="获取失败" />
          </view>
        </view>
      </view>
      <view class="items item">
        <text class="text">手机号码</text>
        <view class="item-right">
          <input class="ipt" disabled v-model="form.phone" placeholder="获取失败" />
        </view>
      </view>

      <!-- 退出登录按钮 -->
      <view class="logout-btn" @click="handleLogout">
        <text>退出登录</text>
      </view>
    </view>

    <section class="btns" @click="submit">
      <view class="btn">确定</view>
    </section>

    <!-- 选择性别 -->
    <u-picker
      :show="show"
      :columns="sexColumns"
      @confirm="selectedSex"
      @close="show = false"
      @cancel="show = false"
      keyName="name"
    ></u-picker>

    <u-loading-page :loading="uploadLoading" bgColor="#ffffff"></u-loading-page>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false, //性别选择
      sexColumns: [
        [
          {
            name: "女",
            type: 0,
          },
          {
            name: "男",
            type: 1,
          },
        ],
      ],
      regionShow: false, //地区选择
      form: {
        avatar: "", //头像
        name: "", //昵称
        sex: 0, //性别1=男，0=女
        phoneNumber: "", //手机号
        description: "",
      },
      uploadLoading: false,
      baseUrl: this.$store.state.vuex_baseUrl,
    };
  },
  onShow() {
    const avatar = uni.getStorageSync("avatar");
    if (avatar) {
      this.form.avatar = avatar;
      uni.removeStorageSync("avatar");
    } else {
      this.getInfo();
    }
  },
  methods: {
    // 上传头像
    uploadAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          this.uploadFile(tempFilePath);
        },
        fail: (err) => {
          console.error("选择图片失败", err);
          uni.showToast({
            title: "选择图片失败",
            icon: "none",
          });
        },
      });
    },

    // 上传文件到服务器
    uploadFile(filePath) {
      this.uploadLoading = true;
      uni.uploadFile({
        url: this.baseUrl + "/user/upload/",
        filePath: filePath,
        name: "file",
        formData: {
          type: "avatar",
        },
        header: {
          Authorization: "Bearer " + uni.getStorageSync("token"),
        },
        success: (uploadRes) => {
          try {
            const result = JSON.parse(uploadRes.data);
            if (result.code === 200) {
              this.form.avatar = result.data.url;
              uni.showToast({
                title: "上传成功",
                icon: "success",
              });
              this.submit();
            } else {
              throw new Error(result.message || "上传失败");
            }
          } catch (e) {
            uni.showToast({
              title: e.message || "上传失败",
              icon: "none",
            });
          }
        },
        fail: (err) => {
          console.error("上传失败", err);
          uni.showToast({
            title: "上传失败",
            icon: "none",
          });
        },
        complete: () => {
          this.uploadLoading = false;
        },
      });
    },

    getInfo() {
      this.$api.getUserProFile().then((res) => {
        if (res.code === 200) {
          this.form = {
            ...this.form,
            ...res.data,
            avatar: res.data.avatar || "",
            phone: this.$fn.phoneEn(res.data.phone),
          };
        }
      });
    },

    submit() {
      if (!this.form.nickname) {
        uni.showToast({
          mask: true,
          icon: "none",
          title: "昵称不能为空",
        });
        return;
      }

      const updateData = {
        nickname: this.form.nickname,
        avatar: this.form.avatar,
      };

      this.$api
        .updateUserProFile(updateData)
        .then((res) => {
          if (res.code === 200) {
            this.$u.toast("保存成功");
            this.getInfo()
            setTimeout(() => {
              uni.switchTab({ url: '/pages/tabbar/mine' })
            }, 1500);
          } else {
            uni.showToast({
              title: res.message || "保存失败",
              icon: "none",
            });
          }
        })
        .catch((err) => {
          console.error("更新失败", err);
          uni.showToast({
            title: "保存失败",
            icon: "none",
          });
        });
    },

    // 退出登录
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除登录状态
            uni.removeStorageSync('token');
            uni.removeStorageSync('userInfo');
            this.$store.state.vuex_token = '';
            
            // 跳转到登录页
            uni.reLaunch({
              url: '/pages/tabbar/login'
            });
          }
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 30rpx 178rpx;
}

.head {
  width: 90rpx;
  height: 90rpx;
  border-radius: 45rpx;
  margin-right: 10rpx;
}

.item {
  display: flex;
  justify-content: space-between;
  border-bottom: 2rpx solid #eeeeee;
  height: 140rpx;
  align-items: center;
}

.items {
  height: 110rpx;
}

.item-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text {
  font-size: 28rpx;
  font-weight: 500;
  color: #333333;
}

.ipt {
  width: 180rpx;
  font-size: 24rpx;
  color: #999999;
  margin-right: 8rpx;
  text-align: right;
}

.ipt1 {
  width: 500rpx;
}

::v-deep .u-textarea {
  background-color: #f7f7f7 !important;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 40rpx;
  --iphonex-fix-bottom: env(safe-area-inset-bottom);
  padding-bottom: var(--iphonex-fix-bottom);

  view {
    width: 670rpx;
    height: 96rpx;
    line-height: 96rpx;
    text-align: center;
    color: #fff;
    font-size: 36rpx;
    font-weight: bold;
    background: $c-bgColor;
    border-radius: 16rpx;
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

.logout-btn {
  margin-top: 40rpx;
  text-align: center;
  color: #999;
  font-size: 24rpx;
  padding: 32rpx 48rpx;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 30rpx;
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  
  &:active {
    opacity: 0.8;
  }
}
</style>

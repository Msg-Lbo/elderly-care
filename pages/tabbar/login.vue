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
                    <input type="text" v-model="account" placeholder="请输入账号" placeholder-class="pcs" />
                </view>
                <view class="content_info_item">
                    <input type="password" v-model="password" placeholder="请输入密码" placeholder-class="pcs" />
                </view>
                <view class="content_info_item">
                    <input type="password" v-model="password2" placeholder="请确认密码" placeholder-class="pcs" />
                </view>
                <!-- <view class="content_qrcode">
					<view class="inpqr">
						<input type="text" v-model="verifyCode" placeholder="请输入验证码" placeholder-class="pcs" />
					</view>
					<view @click="getCaptchaCode()" class="qrcode_img">
						<image :src="imgUniCode" mode=""></image>
					</view>
				</view> -->
                <view class="forgetpassword">
                    <view @click="setChecked()" class="rememberbtn">
                        <view v-if="!checked" class="checkIcon1"></view>
                        <view v-if="checked" class="checkIcon2">
                            <image src="/static/images/checked_icon.png" mode=""></image>
                        </view>
                        <!-- <checkbox @tap="setChecked" class="mycheck" value="1" :checked="true" /> -->
                        <view class="remember_txt"> 记住密码 </view>
                    </view>
                    <view class="forgetpassword_rtxt"> 忘记密码请联系管理员 </view>
                </view>
                <view @click="debounce()" class="btn_sub"> 登录 </view>
                <view @click="debounce()" class="btn_sub register"> 注册 </view>
            </view>
        </view>
    </view>
</template>

<script>
import { $_getCaptchaCode, $_login } from "@/api/http.api.js";
export default {
    data() {
        return {
            checked: false,
            imgUniCode: "",
            verifyKey: "",
            account: "",
            password: "",
            verifyCode: "",
            noClick: true,
        };
    },
    onLoad() {
        // this.getCaptchaCode()
    },
    onShow() {
        if (uni.getStorageSync("account") && uni.getStorageSync("password")) {
            this.account = uni.getStorageSync("account");
            this.password = uni.getStorageSync("password");
        }
        if (uni.getStorageSync("isMiss")) {
            this.checked = true;
        }
    },
    methods: {
        setChecked() {
            this.checked = !this.checked;
        },
        // 获取图形验证码
        async getCaptchaCode() {
            let res = await this.$api.$_getCaptchaCode();
            console.log(res);
            if (res.code == 200) {
                this.imgUniCode = `data:image/png;base64,${res.data.img}`;
                this.verifyKey = res.data.key;
            } else {
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 2000,
                });
            }
        },
        // 检查是否有密码
        reviewPass() {
            let account = uni.getStorageSync("account");
            let password = uni.getStorageSync("password");
            if (account && password) {
                this.account = account;
                this.password = password;
            }
        },
        // 非空校验
        noNullValidation() {
            if (!this.account) {
                return uni.showToast({
                    title: "请输入账号",
                    icon: "none",
                    duration: 2000,
                });
            }
            if (!this.password) {
                return uni.showToast({
                    title: "请输入密码",
                    icon: "none",
                    duration: 2000,
                });
            }
            // if (!this.verifyCode) {
            // 	return uni.showToast({
            // 		title: '请输入验证码',
            // 		icon: 'none',
            // 		duration: 2000
            // 	});
            // }
            this.login();
        },

        debounce() {
            let that = this;
            if (that.noClick) {
                // 第一次点击
                that.noClick = false;
                that.noNullValidation();
                setTimeout(() => {
                    that.noClick = true;
                }, 2000);
            } else {
                // 这里是重复点击的判断
                console.log("请稍后点击");
            }
        },

        // 登录
        async login() {
            let data = {
                account: this.account,
                password: this.password,
                /* verifyCode: this.verifyCode,
					verifyKey: this.verifyKey */
            };
            console.log(data, "参数");
            let res = await this.$api.$_login({
                account: this.account,
                password: this.password,
                // verifyCode: this.verifyCode,
                // verifyKey: this.verifyKey
            });
            if (res.code == 200) {
                console.log(res);
                // DETACHMENT_LEADER    支队长
                // DEPUTY_DETACHMENT_LEADER   副支队长
                // OFFICE    科室负责人
                // NORMAL   普通用户
                uni.showToast({
                    title: "登录成功！",
                    icon: "none",
                    duration: 2000,
                });
                console.log(res, "990000");
                if (this.checked) {
                    uni.setStorageSync("account", this.account);
                    uni.setStorageSync("password", this.password);
                    uni.setStorageSync("isMiss", this.checked);
                } else {
                    // 如果用户未勾选“记住我”，清除本地存储中的用户名和密码
                    uni.removeStorageSync("account");
                    uni.removeStorageSync("password");
                    uni.removeStorageSync("isMiss");
                }
                this.$u.vuex("vuex_token", res.data.accessToken);
                uni.setStorageSync("token", res.data.accessToken);
                uni.setStorageSync("user", res.data.detail);

                let url = "/pages/tabbar/home";
                setTimeout(() => {
                    if (url) {
                        uni.navigateTo({
                            url: url,
                        });
                    }
                }, 500);
            } else {
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 2000,
                });
            }
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
            height: 80rpx !important;
            background-color: #f7f7f7;
            border-radius: 12rpx;
            display: flex;
            align-items: center;
            padding-left: 28rpx;
            box-sizing: border-box;
            margin-bottom: 48rpx;
        }

        .forgetpassword {
            margin-top: 24rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .rememberbtn {
                display: flex;
                align-items: center;

                .checkIcon1 {
                    width: 24rpx;
                    height: 24rpx;
                    background-color: #f7f7f7;
                    border: 1rpx solid #f7f7f7;
                }

                .checkIcon2 {
                    width: 24rpx;
                    height: 24rpx;
                    border: 1rpx solid #f7f7f7;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #2d6cb3;

                    image {
                        width: 100%;
                        height: 100%;
                    }
                }

                .remember_txt {
                    font-size: 24rpx;
                    margin-left: 16rpx;
                    color: #191919;
                }
            }

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
            font-size: 36rpx;
        }
        .register {
            background-color: #2d6cb3;
        }
    }

    .pcs {
        font-size: 28rpx;
        color: #8c9299;
    }
}
</style>

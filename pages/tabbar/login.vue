<template>
	<!-- 登录 -->
	<view>
		<view class="tac">
			<image class="logo" src="../../static/common/logo.png" mode=""></image>
			<view class="tips">超 2000 家企业入驻</view>
			<!-- 微信一键登录 -->
			<view class="btn-box">
				<button v-if="!isAgree" class="wx-login" @click="notAgreed">一键登录</button>
				<button v-else-if="needWechatPhone" open-type="getPhoneNumber" class="wx-login"
					@getphonenumber="wechatLogin">一键登录</button>
				<button v-else class="wx-login" @click="loginSuccess(resData)">一键登录</button>
			</view>
			<view class="agreement-box">
				<view class="ag-box" @click="tabAgree">
					<image v-if="isAgree" src="/static/common/select.png" mode=""></image>
					<image v-else src="/static/common/noSelect.png" mode=""></image>
				</view>
				<view class="agreement">
					<text @click.stop="tabAgree">我已阅读并同意</text>
					<text class="primary-color" @click.stop="jumpXy(1)">《用户协议》</text>
					<text class="primary-color" @click.stop="jumpXy(2)">《隐私协议》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tipsShow: false,
				resData: {},
				isAgree: false, //是否同意协议
				needWechatPhone: false //是否需要微信手机号授权
			};
		},
		onLoad() {
			this.creatLogin();
		},
		methods: {
			// 跳转协议
			jumpXy(e) {
				uni.navigateTo({
					url: '/pages/tabbar/agreement?type=' + e
				})
			},
			// 同意/不同意协议
			tabAgree() {
				this.isAgree = !this.isAgree;
			},
			// 初始登录获取openid
			creatLogin() {
				uni.showLoading({
					title: '登录中...',
					mask: true
				})
				const that = this;
				uni.login({
					provider: "weixin", //使用微信登录
					success: async (loginRes) => {
						try {
							let res = await this.$api.wechatLogin({
								code: loginRes.code
							}, {
								custom: {
									catch: true,
									toast: false
								}
							})
							console.log('初始登录res', res);
							this.resData = res.data
							this.needWechatPhone = res.data.needWechatPhone
							uni.hideLoading()
						} catch (e) {
							//TODO handle the exception
							console.log('e', e);
							if (e.code == 500) {
								uni.showToast({
									title: e.msg,
									icon: 'none'
								})
							} else {
								this.tipsShow = true
							}
							uni.hideLoading()
						}

					},
				});
			},
			// 未同意协议
			notAgreed() {
				uni.showToast({
					title: '请先同意用户协议',
					icon: 'none',
					duration: 2000,
				})
			},
			// 微信一键登录
			async wechatLogin(e) {
				if (!this.isAgree) {
					return uni.showToast({
						title: "请先查看并同意协议",
						icon: "none",
						duration: 2000,
					});
				}
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
					uni.showToast({
						title: "用户拒绝授权",
						icon: "none",
						duration: 2000,
					});
					return;
				}
				console.log('e', e);
				let res = await this.$api.phoneWechatLogin({
					code: e.detail.code,
					openid: resData.openid,
				})
				if (res.code == 200) {
					this.loginSuccess(res)
				}

			},
			// 登录成功
			async loginSuccess(resData) {
				// uni.hideLoading()
				uni.showToast({
					title: "登录成功！",
					icon: "none",
					duration: 2000,
				});
				console.log('resData', resData);
				this.$u.vuex("vuex_token", resData.accessToken);
				uni.setStorageSync("token", resData.accessToken);
				uni.setStorageSync("userInfo", resData.detail);
				let url = "/pages/my/pages/selectType";
				setTimeout(() => {
					uni.reLaunch({
						url,
					});
				}, 500);
				this.showLogin = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tac {
		text-align: center;
	}

	.btn-box {
		display: flex;
		justify-content: center;
	}

	.logo {
		margin-top: 180rpx;
		text-align: center;
		width: 320rpx;
		height: 360rpx;
	}

	.title {
		margin-top: 56rpx;
		font-size: 48rpx;
		font-weight: bold;
		color: #020D1A;
	}

	.tips {
		font-size: 40rpx;
		color: #4591FE;
		margin-top: 80rpx;
	}

	.wx-login {
		margin-top: 120rpx;
		width: 480rpx;
		height: 96rpx;
		background: #404A87;
		border-radius: 48rpx;
		font-size: 36rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;

		.weixin {
			width: 48rpx;
			height: 46rpx;
			margin-right: 12rpx;
		}
	}

	.ple-login {
		padding: 40rpx 0rpx 85rpx;
		text-align: left;

		.inp-box {
			padding: 60rpx 0rpx 30rpx;
			margin: 0 70rpx;
			border-bottom: 1rpx solid #D8DEE6;
			position: relative;

			.phe-icon {
				position: absolute;
				top: 66rpx;
				left: 0;
				width: 28rpx;
				height: 28rpx;
			}

			input {
				padding-left: 60rpx;
			}

		}

		.login {
			margin-top: 100rpx;
			width: 640rpx;
			height: 96rpx;
			background: #04C15F;
			border-radius: 20rpx;
			color: #fff;
			font-size: 36rpx;
			font-weight: bold;
			color: #FFFFFF;

			&.unsatisfied {
				background: #E3E3E3;
				color: #9DA0A5;
			}
		}

		.tab {
			margin-bottom: 75rpx;
		}
	}

	.tab {
		margin-top: 40rpx;
		margin-bottom: 500rpx;
		text-align: center;
		font-size: 28rpx;
		color: #888990;
	}

	.agreement-box {
		position: fixed;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;

		.ag-box {
			width: 50rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		image {
			width: 24rpx;
			height: 24rpx;
		}

		.agreement {
			font-size: 28rpx;
			font-weight: 500;
			color: #666666;

			.primary-color {
				color: #4591FE;
			}
		}
	}
</style>
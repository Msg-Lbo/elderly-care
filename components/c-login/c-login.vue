<template>
	<!-- 登录 -->
	<view>
		<view class="tac">
			<image class="logo" src="/static/common/logo.png" mode=""></image>
			<view class="tips">扶农好礼店铺</view>
			<!-- 微信一键登录 -->
			<view>
				<button v-if="needWechatPhone" open-type="getPhoneNumber" class="wx-login"
					@getphonenumber="wechatLogin">手机号快捷登录</button>
				<button v-else class="wx-login" @click="loginSuccess(resData)">手机号快捷登录</button>
			</view>
			<view class="agreement-box">
				<view class="ag-box" @click="tabAgree">
					<image v-if="isAgree" src="/static/common/select.png" mode=""></image>
					<image v-else src="/static/common/noSelect.png" mode=""></image>
				</view>
				<view class="agreement">
					<text @click.stop="tabAgree">我已阅读并同意</text>
					<text class="primary-color" @click.stop="jumpPage('user')">《用户协议》</text>
					<text class="primary-color" @click.stop="jumpPage('privacy')">《隐私协议》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"c-login",
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.logo {
		margin-top: 180rpx;
		text-align: center;
		width: 300rpx;
		height: 300rpx;
	}

	.title {
		margin-top: 56rpx;
		font-size: 48rpx;
		font-weight: bold;
		color: #020D1A;
	}

	.tips {
		margin-top: 20rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #1A1A1A;

	}

	.wx-login {
		margin-top: 80rpx;
		width: 640rpx;
		height: 96rpx;
		background: $c-bgColor;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		opacity: 1;
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
				color: #4562C9;
			}
		}
	}
</style>
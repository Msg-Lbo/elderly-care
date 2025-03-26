<template>
	<view id="wrap" class="dis_cc">

		<button open-type="contact" bindcontact="handleContact">
			<view class="tool-item dis_cc fdc">
				<image src="../../../static/common/icon-service-1.png" mode=""></image>
				<text>在线客服</text>
			</view>
		</button>


		<view class="tool-item dis_cc fdc" @click="makePhoneCall">
			<image src="../../../static/common/icon-service-2.png" mode=""></image>
			<text>客服热线</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}

		},
		methods: {
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: '1340000' //仅为示例，并非真实的电话号码
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#wrap {
		width: 100vw;
		min-height: 70vh;
		flex-direction: column;
	}

	.tool-item {
		margin-top: 200rpx;
		font-size: 28rpx;
		image {
			width: 64rpx;
			height: 64rpx;
		}
		>text {
			margin-top: 20rpx;
		}
	}

	// 重置按钮样式
	button {
		margin: 0;
		padding: 0;
		border-radius: 0;
		border: none;
		background-color: transparent;
	}

	button::after {
		border: none;
	}

	.button-hover {
		color: rgba(0, 0, 0, 0.6);
		background-color: #fff;
	}
</style>
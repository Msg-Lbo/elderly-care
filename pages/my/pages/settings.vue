<template>
	<!-- 设置 -->
	<view id="warp">
		<view class="info">
			<view class="items" @click="goDetail(2)">
				<view class="title">关于我们</view>
				<view class="detail">
					<image src="../../../static/common/go.png" class="arrow"></image>
				</view>
			</view>
			<view class="items" @click="goDetail(3)">
				<view class="title">隐私协议</view>
				<view class="detail">
					<image src="../../../static/common/go.png" class="arrow"></image>
				</view>
			</view>
			<view class="items" @click="goDetail(4)">
				<view class="title">用户协议</view>
				<view class="detail">
					<image src="../../../static/common/go.png" class="arrow"></image>
				</view>
			</view>
			<view class="items" @click="definiteExit">
				<view class="title">退出登录</view>
				<view class="detail">
					<image src="../../../static/common/go.png" class="arrow"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				conShow: false
			};
		},
		methods: {
			// 跳转到协议
			goDetail(num) {
				uni.navigateTo({
					url: '/pages/tabbar/agreement?type=' + num
				})
			},
			// 确定退出
			definiteExit() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorageSync()
							uni.reLaunch({
								url: '/pages/tabbar/login',
								fail: (err) => {
									console.log('err', err);
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#warp {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background-color: #FFFFFF;

		.info {
			border-radius: 16rpx;
			padding: 0 30rpx;

			.items {
				box-sizing: border-box;
				border-bottom: 1rpx solid #E6E6E6;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;

				.title {
					width: 300rpx;
					color: #333333;
					font-size: 32rpx;
					font-family: PingFang SC-Medium;
				}

				.detail {
					.arrow {
						margin-left: 13rpx;
						margin-top: 7rpx;
						width: 25rpx;
						height: 25rpx;
					}
				}
			}
		}
	}
</style>
<template>
	<view class="page">
		<view class="coupon">
			<image class="coupon_bg" :src="images.couponImgA" mode=""></image>
			<!-- <image class="coupon_bg" :src="images.couponImg" mode=""></image> -->
			<view class="detail">
				<view class="left">
					<view class="coupon_price">
						<text class="unit">￥</text><text class="num">{{coupon.price}}</text>
					</view>
					<view class="unconditional">
						无门槛优惠券
					</view>
				</view>
				<view class="right">
					<view class="centent">
						<view class="coupon_name single-line-ellipsis">{{coupon.name}}</view>
						<view class="">适用城市：{{coupon.city}}</view>
						<view class="">有效期：{{coupon.indate}}</view>
						<view class="direction" @click="instructionsShow=true">使用说明
							<image class="go2" :src="images.go" mode="" />
						</view>
					</view>
					<view class="cou_btn">
						<button class="use" @click="immediateClaim">立即领取</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 使用说明 -->
		<u-modal :show="instructionsShow" :title="instructionsTitle" width="560rpx" :content='instructionsContent'
			confirmButtonShape="circle">
			<view slot="confirmButton">
				<!-- 这里是自定义按钮 -->
				<button class="pinkbtn" @click="instructionsShow=false">确认</button>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import images from './images.js'
	export default {
		name: "couponItem",
		props: {
			coupon: {
				type: Object,
				default: {
					price: 20,
					name: '优惠券名称',
					indate: '2024.10.01',
					city: '成都市'
				}
			}
		},
		data() {
			return {
				images,
				instructionsShow: false,
				instructionsTitle: '使用说明',
				instructionsContent: '这是优惠券使用说明这是优惠券使用说 明这是优惠券使用说明这是优惠券使用 说明这是优惠券使用说明这是优惠券使 用说明这是优惠券使用说明这是优惠券 使用说明这是优惠券使用说明这是优惠 券使用说明这是优惠券使用说明这是优 惠券使用说明这是优惠券使用说明'
			};
		},
		onLoad() {},
		onShow() {},
		methods: {
			immediateClaim(){
				this.$emit('getNow')
			}
		}
	};
</script>

<style lang="scss" scoped>
	.coupon {
		position: relative;
		margin-top: 20rpx;

		.coupon_bg {
			display: block;
			width: 702rpx;
			height: 208rpx;
			margin: 0 auto;
		}

		.detail {
			width: 702rpx;
			height: 208rpx;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%);
			display: flex;

			.left {
				width: 189rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.coupon_price {
					color: #18181A;
					font-weight: bold;

					.unit {
						font-size: 32rpx;
					}

					.num {
						font-size: 80rpx;
					}
				}

				.unconditional {
					font-family: PingFang SC, PingFang SC;
					font-weight: 500;
					font-size: 20rpx;
					color: #18181A;
					line-height: 36rpx;
				}
			}

			.right {
				width: 514rpx;
				height: 100%;
				padding: 20rpx 20rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.centent {
					width: 350rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: #606066;
					text-align: left;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.coupon_name {
						width: 100%;
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
						color: #18181A;
						line-height: 36rpx;
						text-align: left;
					}

					.direction {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 20rpx;
						color: #909099;
						line-height: 36rpx;
						text-align: left;

						.go2 {
							width: 16rpx;
							height: 16rpx;
							margin-left: 5rpx;
						}
					}
				}

				.cou_btn {
					width: 120rpx;
					display: flex;
					align-items: center;

					.use {
						width: 120rpx;
						height: 56rpx;
						background: #FFCCDF;
						border-radius: 30rpx 30rpx 30rpx 30rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 500;
						font-size: 20rpx;
						color: #18181A;
						line-height: 56rpx;
						text-align: center;
						padding: 0;
					}
				}
			}
		}
	}
</style>
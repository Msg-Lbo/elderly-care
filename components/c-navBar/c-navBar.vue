<template>
	<!-- 头部导航栏 -->
	<view>
		<view class="top_nav" :class="{ps:isSeat,tran:isTran}" :style="{'background-color': backgroundColor}">
			<view :style="{'height':statusHeight+'px'}"></view>
			<!-- 与小程序胶囊高度一致 -->
			<view v-if="custom" :style="{'height':titleHeight+'px'}">
				<slot></slot>
			</view>
			<view v-else class="nav" :style="{'height':titleHeight+'px'}">
				<view v-if="isBack" class="na-img" @click="jumpBack">
					<image :src="imgs.backImg" mode=""></image>
				</view>
				<view v-else-if="qrCode==1" @click="confirm" class="na-imgs" >
					完成
				</view>
				<view v-else-if="qrCode==2" @click="confirmS" class="na-imgs" style="color: #1A1A1A;">
					管理
				</view>
				<view style="font-weight: bold;
font-size: 36rpx;
">{{title}}</view>
			</view>
		</view>

		<view v-if="isPerch" :style="{'height':(statusHeight+titleHeight)+'px'}"></view>
	</view>
</template>

<script>
	/**
	 * c-navBar 弹窗
	 * @description 头部导航栏
	 * @property {String}			title				头部导航栏文字 (默认 头部导航栏文字 )
	 * @property {Boolean}			isBack				是否显示左侧返回按钮 （默认 false ）
	 * @property {Boolean}			isSeat				是否透视背景(脱离文档流)（默认 false ）
	 * @property {Boolean}			isPerch				是否占位（默认 false ）
	 * @property {Boolean}			isTran				是否透明（默认 false ）
	 * @property {Boolean}			custom				自定义头部 （false ）
	 * @event {Function} back 点击左侧按钮事件
	 * 
	 */
	import imgs from './images.js'
	export default {
		props: {
			title: {
				default: '头部导航栏文字',
				type: String
			},
			isBack: {
				default: false,
				type: Boolean
			},
			isSeat: {
				default: false,
				type: Boolean
			},
			isPerch: {
				default: false,
				type: Boolean
			},
			isTran: {
				default: false,
				type: Boolean
			},
			custom: {
				default: false,
				type: Boolean
			},
			backgroundColor: {
				default: '',
				type: String
			},
			qrCode: {
				default: -1,
				type: Number
			},
			qrImg: {
				default: '',
				type: String
			},

		},
		data() {
			return {
				statusHeight: 0,
				titleHeight: 0,
				imgs,
			}
		},
		created() {
			this.getPhe()
		},
		methods: {
			confirm(){
				this.$emit('confimC')
			},
			confirmS(){
				this.$emit('confimS')
			},
			// 获取手机导航栏高度
			getPhe() {
				// 状态栏高度
				let systemInfo = uni.getSystemInfoSync()
				this.statusHeight = systemInfo.safeArea.top
				// app端的标题栏高度
				this.titleHeight = 46
				// 小程序端的标题栏的高度
				// #ifdef MP-WEIXIN
				let titleSize = wx.getMenuButtonBoundingClientRect()
				this.titleHeight = titleSize.height + (titleSize.top - systemInfo.safeArea.top) * 2
				// #endif
			},
			// 跳转回上一个页面
			jumpBack() {
				// this.$emit('leftFn')
				uni.navigateBack({delta:1})
			},
			// 二维码
			setqrCode() {
				this.$emit('setqrCode')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.top_nav {
		z-index: 10;
		color: #1A1A1A;
		font-size: 32rpx;
		position: fixed;
		top: 0;
		background: #fff;
		width: 750rpx;

		&.tran {
			background: transparent;
		}

		&.ps {
			position: absolute;
			background: transparent;
		}

		.nav {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.na-img {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				left: 0rpx;
				top: 50%;
				transform: translateY(-50%);
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 35rpx;
					height: 35rpx;
				}
			}

			.na-imgs {
				font-weight: bold;
				font-size: 28rpx;
				color: #BB2B22;
				position: absolute;
				left: 32rpx;
				top: 50%;
				transform: translateY(-50%);
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 35rpx;
					height: 35rpx;
				}
			}

			.address {
				width: 32rpx;
				height: 32rpx;
				margin-left: 30rpx;
				margin-right: 8rpx;
			}

			.tabbar-title {
				font-size: 36rpx;
				font-weight: bold;
				color: #1A1A1A;
				line-height: 42rpx;
			}
		}
	}
</style>
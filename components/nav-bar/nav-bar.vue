<template>
	<view class="nav" :class="{'white':color == 'white'}" 
	:style="{ 'padding-top': menuButtonInfo.top + 'px','line-height':menuButtonInfo.height + 'px'}">
		<view class="title">
			<image src="/static/images/back_icon.png" class="icon" mode="aspectFill" v-if="hasBack"></image>
			<image src="/static/images/scan_icon.png" class="scan-icon" mode="aspectFill" v-if="hasScan"></image>
			{{title}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"nav-bar",
		props:{
			title:'',
			hasBack:false,
			color:'',
			hasScan:false
		},
		data() {
			return {
				menuButtonInfo:uni.getStorageSync('menuButtonInfo')
			};
		}
	}
</script>

<style scoped lang="scss">
	.nav{
		padding-top: calc(var(--status-bar-height) + 50rpx);
		text-align: center;
		color: #000;
		font-size: 36rpx;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		&.white{
			color: #fff;
		}
		.title{
			position: relative;
			height: 64rpx;
			.icon{
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				left: 32rpx;
				top: 50%;
				margin-top: -16rpx;
			}
			.scan-icon{
				width: 56rpx;
				height: 56rpx;
				position: absolute;
				left: 32rpx;
				top: 50%;
				margin-top: -28rpx;
			}
		}
	}
</style>
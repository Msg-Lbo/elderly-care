<template>
	<view class="price" :style="{fontSize:(unitSize+'rpx')}">
		<text v-if="vuex_token">￥</text>
		<text v-if="price" :style="{fontSize:(fontSize+'rpx')}">{{$fn.twoToFixed(price)}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			// 价格
			price:{
				type: String|Number
			},
			// 符号大小
			unitSize:{
				type: Number,
				default: 20
			},
			// 价格大小
			fontSize:{
				type: Number,
				default: 36
			}
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.price{
		font-weight: bold;
		font-size: 20rpx;
		color: #FA3753;
		line-height: 20rpx;
		text{
			font-size: 36rpx;
		}
	}
</style>
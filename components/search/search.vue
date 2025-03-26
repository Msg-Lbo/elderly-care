<template>
	<view class="search-bar">
		<input type="text" class="input" placeholder="请输入关键字" v-model="keyword" :focus="focus"/>
		<button class="search-btn" @click="search">
			<image src="/static/images/search_icon.png" class="search-icon"></image>
		</button>
	</view>
</template>

<script>
	
	export default {
		name: "search",
		props:{
			focus:{
				default:false,
				type:Boolean
			}
		},
		data() {
			return {
				keyword: '',
				isFocus: false,
				focus:false
			};
		},
		onLoad() {},
		methods: {
			search() {
				this.$emit('search', this.keyword)
			},
			// 设置默认搜搜内容
			setDefaultValue(text) {
				this.keyword = text ?? ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-bar {
		display: flex;
		align-items: center;
		border: 1px solid #E5392E;;
		width: 100%;
		height: 80rpx;
		border-radius: 40rpx;
		padding-right: 8rpx;
		padding-left: 32rpx;

		.input {
			flex: 1;
			font-size: 24rpx;
			color: #333;

		}

		.search-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 112rpx;
			height: 64rpx;
			border-radius: 40rpx;
			background: linear-gradient( 134deg, #E5392E 0%, #BB2B22 100%);

			.search-icon {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
</style>
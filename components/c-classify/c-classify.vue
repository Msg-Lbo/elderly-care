<template>
	<view class="page-body" :style="'height:' + height + 'px'">
		<scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'" :scroll-top="scrollLeftTop"
			scroll-with-animation>
			<template v-if="!shop">
				<view class="nav-left-item" @click="categoryClickMain(item.id)" :key="item.id"
					:class="item.id === activeId ? 'active' : ''" v-for="item in classifyData">
					{{ item.categoryName || '' }}
				</view>
			</template>
			<template v-else>
				<view class="nav-left-item" @click="categoryClickMain(item.id)" :key="item.id"
					:class="item.id === activeId ? 'active' : ''" v-for="item in classifyData">
					{{ item.categoryName || '' }}
				</view>
			</template>
		</scroll-view>
		<view class="nav-right">
			<view class="box">
				<view class="sort" v-if="sortShow">
					<view class="so-text" @click="tabSalesVolumeSort">
						<text>销量</text>
						<image v-if="sortQurey.sellNumOrder == null" class="ic-arrow"
							src="/static/common/arrow.png" mode=""> </image>
						<image v-else-if="sortQurey.sellNumOrder == 'ASC'" class="ic-arrow s2"
							src="/static/common/arrow3.png" mode=""></image>
						<image v-else-if="sortQurey.sellNumOrder == 'DESC'" class="ic-arrow s2"
							src="/static/common/arrow2.png" mode=""></image>
					</view>
					<view class="so-text" @click="tabPriceSort">
						<text>价格</text>
						<image v-if="sortQurey.priceOrder == null" class="ic-arrow" src="/static/common/arrow.png"
							mode=""> </image>
						<image v-else-if="sortQurey.priceOrder == 'ASC'" class="ic-arrow s2"
							src="/static/common/arrow3.png" mode=""> </image>
						<image v-else-if="sortQurey.priceOrder == 'DESC'" class="ic-arrow s2"
							src="/static/common/arrow2.png" mode=""> </image>
					</view>
				</view>
				<c-scroll-list :option="{ auto: false,offsetBottom:170}" ref="list"
					:api-params="{ categoryId: activeId, goodsName: keywords, ...apiParams, ...sortQurey }"
					@load="getListData" :api="api">
					<view class="ma-box" v-for="(goods, gIndex) in list" :key="gIndex"
						@click="$fn.jumpPage('/pages/goods/pages/goodsDetail?id=' + goods.id)">
						<view class="ma-left">
							<image class="ma-shop" :src="goods.imgs" mode=""></image>
							<view class="ma-info">
								<view class="ma-name otw">{{ goods.spuName }}</view>
								<view>
									<text class="ma-spu">{{ goods.brandName }}</text>
								</view>
								<view class="price">
									<text v-if="goods.showPrice">￥</text>
									<text>{{twoToFixed(goods.showPrice)}}</text>
								</view>
							</view>
						</view>
						<view class="ma-right">
							<image @click.stop="cart(goods)" class="" src="../../static/images/add-icon.png" mode="">
							</image>
						</view>
					</view>
				</c-scroll-list>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'c-classify',
		props: {
			api: {
				type: Function,
				required: true,
			},
			apiParams: {
				type: Object,
				default: () => {},
			},
			keywords: {
				type: String,
				default: '',
			},
			classifyData: {
				type: Array,
				default: () => [],
			},
			categoryActive: {
				type: String,
				default: 0,
			},
			// 是否显示排序
			sortShow: {
				type: Boolean,
				default: true,
			},
			// 是否显示排序
			shop: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				speShow: false, // 规格弹框
				spu: {},
				skuData: [], // 规格参数
				skuList: [], // 规格参数
				height: 0,
				scrollTop: 0,
				scrollLeftTop: 0,
				// scrollHeight: 0,
				// classifyData: [],
				arr: [], //初始值，后边计算会根据手机适配覆盖
				leftItemHeight: uni.upx2px(120), //49行会计算出新值进行覆盖
				tabBarHeight: 0, //如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
				list: [],
				sortQurey: {},
				activeId: '',
			}
		},
		watch: {
			categoryActive: {
				handler(newValue) {
					this.activeId = newValue
				},
			},
		},
		created() {
			//如果你的分类数据为后台异步获取请	将下方代码放置你的数据回调中
		},
		mounted() {
			this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight - uni.upx2px(124)
		},
		onShow() {
			this.$refs.list.initList(true)
		},
		methods: {
			// 获取列表数据
			getListData(res) {
				console.log('res', res);
				this.list = [...res.list]
			},
			// 刷新列表
			refresh() {
				this.$refs.list.refresh()
			},
			// 切换销量
			tabSalesVolumeSort() {
				this.sortQurey.priceOrder = null
				if (this.sortQurey.sellNumOrder == null) {
					this.sortQurey.sellNumOrder = 'ASC'
				} else if (this.sortQurey.sellNumOrder == 'ASC') {
					this.sortQurey.sellNumOrder = 'DESC'
				} else if (this.sortQurey.sellNumOrder == 'DESC') {
					this.sortQurey.sellNumOrder = 'ASC'
				}
				this.$refs.list.refresh()
			},
			// 切换价格
			tabPriceSort() {
				this.sortQurey.sellNumOrder = null
				if (this.sortQurey.priceOrder == null) {
					this.sortQurey.priceOrder = 'ASC'
				} else if (this.sortQurey.priceOrder == 'ASC') {
					this.sortQurey.priceOrder = 'DESC'
				} else if (this.sortQurey.priceOrder == 'DESC') {
					this.sortQurey.priceOrder = 'ASC'
				}
				this.$refs.list.refresh()
			},
			// 获取数据分类
			getGoodsTypes() {
				this.refresh()
			},
			categoryClickMain(id) {
				this.activeId = id
				this.getGoodsTypes()
				this.refresh()
			},
			getSku(spuId) {
				this.$api
					.getSkuDetail({
						spuId: spuId,
					})
					.then((res) => {
						this.skuList = res.data
						console.log('res', res)
					})
			},
			cart(goods) {
				if (!this.vuex_token) {
					return uni.showToast({
						icon: 'none',
						title: '请登录后购买'
					})
				}
				this.speShow = true
				this.spu = goods.spu
				console.log('goods', goods)
				this.getSku(goods.spu.id)
			},
			// 确定规格
			confirmSell() {},
			// 截取指定字符前
			substrStr(str) {
				let res = str
				if (str.indexOf(',') != -1) {
					let index = str.indexOf(',')
					res = str.substring(0, index)
				}
				if (str.indexOf('http') == -1) {
					res = this.vuex_imgUrl + res
				}
				return res
			},
			// 金额保留两位小数
			twoToFixed(price) {
				if (price || price != 0) {
					if (Number.isFinite(Number(price))) {
						return Number(price).toFixed(2)
					} else {
						return price
					}
				}
				return '0.00'
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sort {
		display: flex;
		align-items: center;
		// padding: 20rpx 20rpx 0;

		.so-text {
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: center;
			margin-right: 44rpx;
			padding: 20rpx;
		}

		.ic-arrow {
			width: 14rpx;
			height: 22rpx;
			margin-left: 12rpx;
		}
	}

	.page-body {
		display: flex;
		background: #fff;
		overflow: hidden;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 200rpx;
		background: #f5f5f5;
	}

	.nav-left-item {
		height: 120rpx;
		border-bottom: solid 1rpx #e6e6e6;
		font-size: 28rpx;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-left-item:last-child {
		border-bottom: none;
	}

	.nav-right {
		width: 550rpx;
	}

	.box {
		display: block;
		overflow: hidden;

		/*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */
		.ma-box {
			padding: 24rpx 0;
			margin: 0 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx dashed #d9d9d9;

			.ma-left {
				display: flex;

				.price {
					font-weight: bold;
					font-size: 20rpx;
					color: #FA3753;
					line-height: 20rpx;

					text {
						font-size: 36rpx;
					}
				}
				.ma-info{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}

				.ma-shop {
					width: 128rpx;
					height: 128rpx;
					border-radius: 8rpx;
					margin-right: 24rpx;
					flex: none;
				}

				.ma-name {
					width: 300rpx;
					font-size: 28rpx;
					color: #1a1a1a;
					line-height: 32rpx;
					text-align: left;
					font-style: normal;
				}

				.ma-spu {
					padding: 6rpx 14rpx 6rpx 8rpx;
					background: linear-gradient(90deg, #f8f07a 0%, #fedb04 100%);
					border-radius: 3rpx;
					display: inline-block;
					font-size: 20rpx;
					color: #6f3e0f;
				}

				.ma-level {
					font-weight: bold;
					font-size: 28rpx;
					color: #fa3753;
					line-height: 28rpx;
				}
			}

			.ma-right {
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}

	.box:last-child {
		border: none;
	}

	.nav-right-item {
		height: 186rpx;
		border-bottom: 1rpx solid #e6e6e6;
		text-align: center;
		padding: 22rpx 0 20rpx;
		margin: 0 20rpx;
		font-size: 28rpx;
		background: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
	}

	.goods-info {
		flex: 1;
		font-size: 32rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #1a1a1a;
		line-height: 38rpx;
		-webkit-background-clip: text;
		text-align: left;
		margin-left: 32rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		.go-name {
			font-size: 32rpx;
			color: #1a1a1a;
			line-height: 38rpx;
		}

		.go-df {
			display: flex;
			align-items: center;

			.go-integral {
				font-size: 24rpx;
				font-weight: bold;
				color: #4cb314;
				line-height: 23rpx;

				&.mr {
					margin-right: 66rpx;
				}

				text {
					font-size: 32rpx;
					display: inline-block;
					margin-right: 8rpx;
				}
			}

			.ma-integral-divide {
				margin: 0 5px;
			}

			.go-redeem {
				font-size: 20rpx;
				font-weight: 400;
				color: #999999;
				line-height: 23rpx;
			}
		}
	}

	.nav-right-item image {
		width: 150rpx;
		height: 150rpx;
	}

	.active {
		background: #fff;
		border-right: 0;
		font-size: 30rpx;
		font-weight: bold;
		color: #1a1a1a;
		position: relative;

		&::after {
			content: '';
			display: inline-block;
			position: absolute;
			left: 0;
			top: 0;
			width: 12rpx;
			height: 120rpx;
			background: linear-gradient(98deg, #4cb314 27%, #68d533 100%);
			border-radius: 0rpx 6rpx 6rpx 0rpx;
		}
	}

	.active1 {
		background: #e3f8cf;

		border-right: 0;
		font-size: 30rpx;
		font-weight: bold;
		color: #1a1a1a;
		position: relative;

		&::after {
			content: '';
			display: inline-block;
			position: absolute;
			left: 0;
			top: 0;
			width: 12rpx;
			height: 120rpx;
			background: linear-gradient(98deg, #4cb314 27%, #68d533 100%);
			border-radius: 0rpx 6rpx 6rpx 0rpx;
		}
	}

	::-webkit-scrollbar {
		/*取消小程序的默认导航条样式*/
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
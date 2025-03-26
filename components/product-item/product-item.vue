<template>
	<view class="product-box" :class="{'hasSelect':showSelect}">
		<view class="radio-box" v-if="showSelect" @click="select">
			<view class="radio" :class="{'active':selected}">
				<image src="/static/images/select-radio.png" class="pic-cover"></image>
			</view>
		</view>
		<view v-if="carS" class="product-item" :class="itemStyle=='small'?'small':''"
			@click="toTurnPageOne(productInfo)">
			<view class="pic-box">
				<image :src="`https://common-mfwl.obs.cn-southwest-2.myhuaweicloud.com${productInfo.image}`"
					class="pic-cover" mode="aspectFill"></image>
				<!-- <view class="tag" v-if="!productInfo.spotGoods">预售</view> -->
			</view>
			<view class="text-box">
				<view class="title col333 text-ellipsis mbt10">{{productInfo.title}}</view>
				<view class="txt col666">成色：{{productInfo.quality}}</view>
				<view style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<view class="txt col666">
						克重：{{productInfo.suttle /100}}g
					</view>
					<view v-if="isShowIcon" class="numBox">
						<view @click.stop="decrementValueFirst(productInfo)" class="numIcon">
							<view v-if="productInfo.value>0" class="remo-icon">
								<image style="width: 36rpx;height: 36rpx;" src="/static/images/remo-icon.png" mode="">
								</image>
							</view>

						</view>
						<view v-if="productInfo.value>0" class="textC">
							{{productInfo.value}}
						</view>
						<view @click.stop="incrementValueFirst(productInfo)" class="numIcon">
							<view class="remo-icon">
								<image style="width: 36rpx;height: 36rpx;" src="@/static/images/add-icon.png" mode="">
								</image>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view v-else class="product-item" style="align-items: center;padding: 20rpx 32rpx; box-sizing: border-box;"
			:class="itemStyle=='small'?'small':''" @click="toTurnPage(productInfo)">
			<view @click.stop="setXz(productInfo)" class="leftCb">
				<view class="seleB-icon">
					<view v-if="productInfo.showSelect" class="selectC"></view>
					<image v-else style="width: 36rpx;height: 36rpx;" src="../../static/images/checked_icon.png"
						mode="">
					</image>
				</view>
			</view>

			<view class="numBoxS" v-if="!(productInfo.commodityDisplay != true || productInfo.commodityDelFlag != '0')">
				<view @click.stop="decrementValue(productInfo)" class="numIcon">
					<view v-if="productInfo.number>0" class="remo-icon">
						<image style="width: 36rpx;height: 36rpx;" src="/static/images/remo-icon.png" mode="">
						</image>
					</view>

				</view>
				<view v-if="productInfo.number>0" class="textC">
					{{productInfo.number}}
				</view>
				<view @click.stop="incrementValue(productInfo)" class="numIcon" style="">
					<view class="remo-icon">
						<image style="width: 36rpx;height: 36rpx;" src="@/static/images/add-icon.png" mode="">
						</image>
					</view>
				</view>

			</view>
			<view class="pic-box">
				<image :src="`https://common-mfwl.obs.cn-southwest-2.myhuaweicloud.com${productInfo.image}`"
					class="pic-cover" mode="aspectFill"></image>
				<!-- <view class="tag" v-if="!productInfo.spotGoods">预售</view> -->
			</view>
			<view class="text-boxS">
				<view class="title col333 text-ellipsis mbt10">{{productInfo.title}}</view>
				<view class="txt col666">成色：{{productInfo.quality}}</view>
				<view style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
					<view class="txt col666">
						克重：{{productInfo.suttle/100}}g
					</view>
					<view class="txt col666 shixiao" style="background-color: silver; font-size: 30rpx;"
						v-if="productInfo.commodityDelFlag !== '0'">
						商品已失效
					</view>
					<view class="txt col666 shixiao" style="background-color: silver; font-size: 30rpx;"
						v-else-if="productInfo.commodityDisplay !== true && productInfo.commodityDelFlag === '0'">
						商品已下架
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "product-item",
		props: {
			itemStyle: '',
			showSelect: false,
			type: '',
			productInfo: {},
			carS: {
				default: true,
				type: Boolean
			},
			isShowIcon: {
				default: true,
				type: Boolean
			}
		},
		data() {
			return {
				value: 0,
				selected: false,
				itemB: true,
				totalList: {},
				decrement: false,
				increment: false,
				shoppingCartParms: {
					commodityId: 0,
					number: 0
				},
				time: 0,
				isAdding: false, // 用于防止连续点击的标志位
				isSubing: false,
				// valueTwo:0
			};
		},
		// onLoad(){
		// 	for (let i = 0; i < this.productInfo.length; i++) {
		// 		 this.valueTwo = this.productInfo[i].number
		// 	}
		// 	console.log( "this.valueTwo====>",this.valueTwo)

		// },
		methods: {
			// addStyle(){
			// 	// 获取所有 class 为 "product-item" 的元素（返回 NodeList）
			// 	var elements = document.querySelectorAll('.text-box');

			// 	// 遍历所有元素
			// 	elements.forEach(function(element) {
			// 	  // 对每个元素进行操作
			// 	  if(productInfo.commodityDelFlag === '0' || productInfo.commodityDisplay === true){
			// 		 element.classList.add('disabled-product');
			// 	  }

			// 	});
			// },
			decrementValueFirst(t) {
				// if (t.value > 1) {
				// 	t.addSub = 0
				// 		// t.number--
				// 	this.$emit('addSub', t)
				// }
				t.addSub = 0
				// t.number--
				this.$emit('addSub', t)
				// this.$emit('addSub', t)
				// if (this.value > 0) {
				// 	if (this.isSubing) return

				// 	this.isSubing = true
				// 	this.shoppingCartParms.commodityId = t.id;
				// 	this.shoppingCartParms.number = -1;
				// 	this.$api.addShoppingCart(this.shoppingCartParms).then(res => {
				// 		if (res.code == 200) {
				// 			wx.showToast({
				// 				title: '添加购物车成功',
				// 				icon: 'success',
				// 				duration: 2000
				// 			});
				// 			this.value--;
				// 			this.isSubing = false;
				// 		} else {}

				// 	}).catch(error => {

				// 	});
			},
			incrementValueFirst(t) {
				t.addSub = 1
				// t.number++
				this.$emit('addSub', t)
				// if (this.isAdding) return
				// this.isAdding = true
				// this.shoppingCartParms.commodityId = t.id;
				// this.shoppingCartParms.number = 1;
				// this.$api.addShoppingCart(this.shoppingCartParms).then(res => {
				// 	if (res.code == 200) {
				// 		wx.showToast({
				// 			title: '添加购物车成功',
				// 			icon: 'success',
				// 			duration: 2000
				// 		});
				// 		this.value++;
				// 		this.isAdding = false;
				// 	} else {}

				// }).catch(error => {

				// });

			},
			decrementValue(t) {

				if (t.number > 1) {
					t.addSub = 0
					// t.number--
					this.$emit('addSub', t)
				}

			},
			incrementValue(t) {
				t.addSub = 1
				// t.number++
				this.$emit('addSub', t)
				console.log("t.number===>", t.number)
				// this.$emit('addSub', t)
			},
			turnPage(url) {
				uni.navigateTo({
					url
				})
			},
			select() {
				if (!this.showSelect) return
				this.selected = !this.selected
				this.$emit('select', this.productInfo)
				console.log("this.selected = ", this.selected)
			},
			setXz(v) {
				v.showSelect = !v.showSelect
				console.log("v.showSelect ===>", v.showSelect)
				this.$emit('xuanzhong', v)
			},

			toTurnPageOne(item) {
				this.turnPage('/pages/product/product-detail/product-detail?id=' + this.productInfo.id + '&type=' +
					this.type)
			},
			toTurnPage(item) {
				console.log('item====>', item)
				if (item.commodityDelFlag !== '0') {
					uni.showToast({
						title: '该商品已失效！',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				if (item.commodityDisplay === false) {
					uni.showToast({
						title: '该商品已下架！',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.turnPage('/pages/product/product-detail/product-detail?id=' + this.productInfo.commodityId +
					'&type=' + this.type)

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/styles/product.scss";

	.text-boxS {
		width: calc(100% - 206rpx);
		padding-left: 24rpx;
		line-height: 1.6;
		font-size: 24rpx;
		position: relative;

	}

	.text-box {
		.txt {
			font-weight: 400;
			font-size: 24rpx;
			color: #666666;
		}
	}

	.title {

		font-weight: 500;
		font-size: 28rpx;
		color: #333333;
	}

	.disabled-product {
		/* 灰色样式 */
		background-color: #ccc;
		color: #666;
		cursor: not-allowed;
		/* 可能还有其他样式 */
	}

	.leftCb {
		width: 56rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
	}

	.seleB-icon {
		height: 100%;
		display: flex;
		align-items: center;

		.selectC {
			width: 36rpx;
			height: 36rpx;
			border-radius: 50%;
			border: 2rpx solid #ccc;

		}
	}

	.numBoxS {
		position: absolute;
		right: 0rpx;
		top: 0;
		height: 100%;
		// width: 124rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;

		.numIcon {
			// width: 36rpx;
			height: 100%;
			padding-top: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			width: 72rpx;
			z-index: 1;
		}

		.textC {
			width: 24rpx;
			padding-top: 62rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			font-weight: bold;
			font-size: 32rpx;
			color: #BB2B22;
		}
	}

	.numBox {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;

		.numIcon {
			// width: 36rpx;
			height: 100%;
			padding-top: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			width: 72rpx;
			z-index: 1;
		}

		.textC {
			width: 24rpx;
			padding-top: 62rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			font-weight: bold;
			font-size: 32rpx;
			color: #BB2B22;
		}
	}

	.minus {
		width: 22px;
		height: 22px;
		border-width: 1px;
		border-color: #BB2B22;
		border-style: solid;
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
		@include flex;
		justify-content: center;
		align-items: center;

		/deep/ .u-icon__icon {
			color: #BB2B22 !important;
		}
	}


	.input {
		padding: 0 10px;
	}

	.plus {
		width: 22px;
		height: 22px;
		background-color: #BB2B22;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}

	.pic-box {
		position: relative;
		width: 144rpx;
		height: 144rpx;

		.shixiao {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		image {
			width: 144rpx;
			height: 144rpx;
		}
	}
</style>
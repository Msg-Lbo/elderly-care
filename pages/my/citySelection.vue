<template>
	<!-- 城市选择 -->
	<u-index-list :index-list="indexList">
		<view slot="header">
			<!-- <c-search placeholder="请输入城市名"></c-search> -->
			<view class="search">
				<view class="se-box">
					<input v-model="keyword" type="text" placeholder="搜索城市" />
					<view class="se-btn" @click="searchFirstLetter">
						<image src="/static/common/search2.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="main">
				<view class="title">当前选择</view>
				<view class="top">
					<view class="option active">
						<view>{{city||'不限'}}</view>
					</view>
					<view class="option" @click="back">
						<view>不限</view>
					</view>
				</view>
				<view class="title">热门城市</view>
				<view class="bottom">
					<view class="option" v-for="v in hotCityList" :key="v" @click="checkCity(v)">{{ v.name }}</view>
				</view>
			</view>
		</view>
		<view v-for="(item, index) in itemArr" :key="index">
			<!-- #ifdef APP-NVUE -->
			<u-index-anchor :text="indexList[index]"></u-index-anchor>
			<!-- #endif -->
			<u-index-item>
				<!-- #ifndef APP-NVUE -->
				<u-index-anchor :text="indexList[index]"></u-index-anchor>
				<!-- #endif -->
				<view class="list-cell" v-for="(cell, index2) in item.list" :key="cell.id" @click="checkCity(cell, item)">
					{{ cell.name }}
				</view>
			</u-index-item>
		</view>
	</u-index-list>
</template>

<script>
	var amapFile = require('@/utils/amap-wx.130.js') //引入刚刚下载的文件 
	export default {
		data() {
			return {
				indexList: [
					// "A", "B", "C"
				],
				itemArr: [
					// [
					// 	{
					// 	id: 1,
					// 	name: '太原市'
					// }, {
					// 	id: 2,
					// 	name: '运城市'
					// }, {
					// 	id: 3,
					// 	name: '忻州市'
					// }, 
					// ]
				],
				oldData:{},
				key: 'c91f34e225c81e1844e96077491ac246', //高德key
				address: '',
				hotCityList: [
					// 	{
					// 	id: 1,
					// 	name: '太原市'
					// }, {
					// 	id: 2,
					// 	name: '运城市'
					// },  {
					// 	id: 3,
					// 	name: '忻州市'
					// }, 
				],
				city: '',
				keyword: ''
			}
		},
		onLoad() {
			const city = uni.getStorageSync('city')
			this.city = city.name
			this.getLocationFn()
			this.getHebeiLetterCityFn()
			this.getQueryHotCityFn()
		},
		methods: {
			/** 点击定位城市 */
			back() {
				uni.setStorageSync('city', {
					name: '不限'
				})
				uni.navigateBack()
			},
			// 获取当前所在城市
			getLocationFn() {
				this.address = '定位中'
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						console.log('当前位置：', res)
						this.getCity(res.latitude, res.longitude)
					},
					fail: (err) => {
						console.log('err', err)
					},
				})
			},
			// 高德地图逆解析
			getCity(latitude, longitude) {
				console.log(longitude, latitude)
				this.latitude = latitude
				this.longitude = longitude
				var that = this
				var key = that.key
				that.location = `${longitude},${latitude}`
				var myAmapFun = new amapFile.AMapWX({
					key: key,
					batch: true,
				})
				myAmapFun.getRegeo({
					//如果经纬度有问题会导致不进入回调方法，从而报错
					location: that.location,
					success: function(e) {
						console.log(e)

						//成功回调
						that.address = e[0].regeocodeData.addressComponent.city //详细地址
						console.log(that.address)
					},
					fail: function(info) {
						//失败回调
						console.log(info)
					},
				})
			},
			// 获取城市数据
			async getHebeiLetterCityFn() {
				const {
					data
				} = await this.$api.getLetterCityVO({
					level: 2
				})
				// this.indexList = data.indexList
				// this.itemArr = data.itemArr
				console.log('城市数据列表:', data);
				this.oldData = JSON.parse(JSON.stringify(data))
				this.indexList = [...new Set(data.map(v => v.firstLetter))]
				this.itemArr = this.dataFormat(data)
				console.log('城市数据|处理后的:', this.itemArr);
			},
			// 获取城市数据
			async getQueryHotCityFn() {
				const {
					data
				} = await this.$api.hotCity()
				console.log('热门data', data)
				this.hotCityList = data
			},
			// 选择城市
			checkCity(val, item) {
				uni.setStorageSync('city', val)
				uni.navigateBack()
			},
			// 搜索地区
			searchFirstLetter(){
				if(this.keyword){
					const data = JSON.parse(JSON.stringify(this.oldData))
					this.indexList = [...new Set(data.
					filter(v=>v.name.includes(this.keyword)).
					map(v => v.firstLetter))]
					this.itemArr = this.dataFormat(data.filter(v=>v.name.includes(this.keyword)))
				}else{
					const data = JSON.parse(JSON.stringify(this.oldData))
					this.indexList = [...new Set(data.map(v => v.firstLetter))]
					this.itemArr = this.dataFormat(data)
				}
			},
			// 处理数据格式
			dataFormat(data) {
				let arr = {}
			
				for (const d of data) {
					let list = arr[d.firstLetter]
					if (!list) {
						list = []
					}
					list.push(d)
					arr[d.firstLetter] = list
				}
				const dataList =
					Object.keys(arr).map(k => ({
						letter: k,
						list: arr[k]
					}))
			
				return dataList
			},
		},
	}
</script>

<style lang="scss" scoped>
	.search {
		.se-box {
			width: 702rpx;
			height: 80rpx;
			background: #FFFFFF;
			border-radius: 40rpx;
			margin: 24rpx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border: 1rpx solid #404A87;

			input {
				flex: 1;
				padding-left: 32rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #808080;
			}

			.se-btn {
				width: 112rpx;
				height: 64rpx;
				background: linear-gradient(180deg, #6791F7 0%, #4275F6 100%);
				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 4rpx;

				image {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.main {
		padding: 40rpx 32rpx;

		.title {
			font-weight: bold;
			font-size: 32rpx;
			color: #333333;
			line-height: 32rpx;
			text-align: left;
			font-style: normal;
		}

		.option {
			width: 200rpx;
			height: 64rpx;
			background: #f7f7f7;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			&.active {
				background: linear-gradient( 180deg, #6791F7 0%, #4275F6 100%);
				color: #fff;
			}

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
		}

		.top {
			display: flex;
			align-items: center;
			margin: 20rpx 0 40rpx;
			gap: 20rpx;

			.anew {
				width: 30rpx;
				height: 30rpx;
				margin: 0 6rpx 0 40rpx;
			}

			.an-text {
				font-weight: bold;
				font-size: 28rpx;
				color: #49ae14;
				line-height: 28rpx;
				font-style: normal;
			}
		}

		.bottom {
			margin: 20rpx 0 0rpx;
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
		}
	}
</style>
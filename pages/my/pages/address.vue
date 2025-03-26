<template>
	<!-- 收货地址 -->
	<view>
		<view class="main">
			<view class="oneBox" v-for="(v,i) in addressList" :key="v.id">
				<view class="">
					<view class="df aic">
						<view class="name">{{v.consignee}}</view>
						<view class="tel">{{v.phone}}</view>
						<view class="default" v-if="v.is_default==1">默认</view>
					</view>
					<view class="addres">
						{{v.address}}
					</view>
				</view>
				<view class="df">
					<view class="editor" @click="jumpEditAddress(v)">编辑</view>
					<view class="del" @click="delAddrees(v)">删除</view>
				</view>
			</view>
		</view>

		<view class="bottom_btn" @click="jumpEditAddress">
			<view class="btn">+添加收货地址</view>
		</view>
		<view v-if="addressList.length==0" class="no-data">
			<image src="/static/common/noContent.png" mode=""></image>
			无收货地址
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				showpage: 10,
				addressList: [
					{
						id: 1,
						phone: 13118441212,
						address: '这是地址呢地址地址四川泸州',
						consignee: '编译',
						is_default: 1,
					},{
						id: 2,
						phone: 13118441212,
						address: '请另行在小程序开发工具的控制台查看',
						consignee: '编译',
						is_default: 0,
					},{
						id: 3,
						phone: 13118441212,
						address: '请另行在小程序开发工具的控制台查看',
						consignee: '编译',
						is_default: 0,
					},
				]
			}
		},
		methods: {
			// 获取地址详情
			getAddressData() {
				this.$u.api.userAddress({
					page: this.page,
					showpage: 10
				}).then(res => {
					console.log(res);
					this.addressList = res.data
				}).catch(err => {
					console.log(err.data, 'err')
					if (err.data.code == 0) {
						this.addressList = []
					}
				})
			},
			// 跳转到编辑地址
			jumpEditAddress(v) {
				uni.navigateTo({
					url: '/pages/my/pages/editAddress?id=' + v.id
				})
			},
			// 删除按钮
			delAddrees(v) {
				console.log(v);
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否确定删除这个地址',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.$u.api.delAddress({
								address_id: v.id
							}).then(res => {
								console.log(res);
								if (res.code == 1) {
									uni.showToast({
										title: '删除成功',
										icon: 'none',
										duration: 2000,
									});
									that.getAddressData()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		padding: 0rpx 30rpx 180rpx;
		overflow-y: scroll;
	}

	.oneBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #F0F2F5;
		padding: 40rpx 0 30rpx;

		.name {
			font-size: 28rpx;
			font-weight: bold;
			margin-right: 30rpx;
		}

		.tel {
			font-size: 24rpx;
		}

		.addres {
			margin-top: 12rpx;
			width: 500rpx;
			font-size: 24rpx;
		}

		.editor {
			color: #1183FF;
			font-size: 24rpx;
		}

		.del {
			margin-left: 20rpx;
			color: #FC3E3E;
			font-size: 24rpx;
		}

		.default {
			width: 66rpx;
			height: 32rpx;
			background: #FF802F;
			border-radius: 16rpx;
			color: #fff;
			font-size: 20rpx;
			text-align: center;
			margin-left: 20rpx;

			&.dn {
				display: none;
			}
		}
	}

	.no-data {
		margin-top: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #BCBCBC;
		font-size: 28rpx;

		image {
			width: 300rpx;
			height: 140rpx;
		}
	}
</style>
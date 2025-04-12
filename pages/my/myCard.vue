<template>
	<!-- 我的卡包 -->
	<view>
		<view class="main">
			<view class="card-list">
				<view class="card-item" v-for="(card, index) in cardList" :key="card.id">
					<view class="card-header">
						<view class="card-type">{{ card.name }}</view>
						<view class="card-number">{{ card.number }}</view>
					</view>
					<view class="card-footer">
						<view class="card-remark">{{ card.remark }}</view>
						<view class="card-actions">
							<view class="action-btn edit" @click="handleEdit(card)">编辑</view>
							<view class="action-btn delete" @click="handleDelete(card)">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom_btn" @click="handleAdd">
			<view class="btn">+添加卡片</view>
		</view>

		<view v-if="cardList.length === 0" class="no-data">
			<image src="/static/common/noContent.png" mode=""></image>
			暂无卡片
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				cardList: []
			}
		},
		onShow() {
			this.getCardList()
		},
		methods: {
			// 获取银行卡列表
			getCardList() {
				this.$api.getCardPackage().then(res => {
					if (res.code === 200) {
						this.cardList = res.data.cards || []
					}
				})
			},
			// 添加银行卡
			handleAdd() {
				uni.navigateTo({
					url: '/pages/my/addCard'
				})
			},
			// 编辑银行卡
			handleEdit(card) {
				uni.navigateTo({
					url: `/pages/my/editCard?id=${card.id}`
				})
			},
			// 删除银行卡
			handleDelete(card) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张银行卡吗？',
					success: (res) => {
						if (res.confirm) {
							this.$api.deleteCard({
								card_id: card.id
							}).then(res => {
								if (res.code === 200) {
									uni.showToast({
										title: '删除成功',
										icon: 'success'
									})
									this.getCardList()
								} else {
									uni.showToast({
										title: res.message || '删除失败',
										icon: 'none'
									})
								}
							}).catch(err => {
								uni.showToast({
									title: '删除失败，请重试',
									icon: 'none'
								})
							})
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		padding: 30rpx;
		padding-bottom: 180rpx;
	}

	.card-list {
		.card-item {
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 40rpx;
			margin-bottom: 30rpx;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

			.card-header {
				margin-bottom: 30rpx;

				.card-type {
					font-size: 36rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 16rpx;
				}

				.card-number {
					font-size: 32rpx;
					color: #666;
				}
			}

			.card-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.card-remark {
					font-size: 28rpx;
					color: #999;
				}

				.card-actions {
					display: flex;
					gap: 30rpx;

					.action-btn {
						font-size: 28rpx;
						padding: 8rpx 24rpx;
						border-radius: 8rpx;

						&.edit {
							color: #00693A;
							background: rgba(0, 105, 58, 0.1);
						}

						&.delete {
							color: #FA3534;
							background: rgba(250, 53, 52, 0.1);
						}
					}
				}
			}
		}
	}

	.bottom_btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.btn {
			background: linear-gradient(90deg, #208a5b 0%, #00693a 100%);
			color: #FFFFFF;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 500;
		}
	}

	.no-data {
		margin-top: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #BCBCBC;
		font-size: 32rpx;

		image {
			width: 300rpx;
			height: 140rpx;
			margin-bottom: 30rpx;
		}
	}
</style>
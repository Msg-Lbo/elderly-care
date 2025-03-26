<template>
	<view>
		<view class="main">
			<view @click="uploadAvatar" class="item">
				<text class="text">头像</text>
				<view class="item-right">
					<image class="head" v-show="form.avatar" :src="vuex_imgUrl + form.avatar" mode="aspectFill"></image>
					<image class="head" v-show="!form.avatar" src="../../../static/common/header-img.png"></image>
					<u-icon name="arrow-right" color="#666666" size="20rpx"></u-icon>
				</view>
			</view>

			<view class="items item">
				<text class="text">昵称</text>
				<view class="item-right">
					<input class="ipt" v-model="form.name" placeholder="请输入" />
				</view>
			</view>
			<view class="items item" @click="selectSex">
				<text class="text">性别</text>
				<view class="item-right">
					<view class="ipt">
						{{ form.sex==0?'女':'' }}
						{{ form.sex==1?'男':'' }}
					</view>
					<u-icon name="arrow-right" color="#666666" size="20rpx"></u-icon>
				</view>
			</view>
			<view class="items item">
				<text class="text">手机号码</text>
				<view class="item-right">
					<input class="ipt" disabled v-model="form.phoneNumber" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="items mt40">
				<view class="text">个性签名</view>
				<view class="mt20">
					<u--textarea v-model="form.description" height="200rpx" placeholder="请输入内容"></u--textarea>
				</view>
			</view>

		</view>

		<!-- 按钮 -->
		<view @click="submit" class="bottom_btn">
			<view class="btn">保存</view>
		</view>

		<!-- 选择性别 -->
		<u-picker :show="show" :columns="sexColumns" @confirm='selectedSex' @close="show=false" @cancel="show=false"
			keyName="name"></u-picker>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false, //性别选择
				sexColumns: [
					[{
							name: '女',
							type: 0
						},
						{
							name: '男',
							type: 1
						},
					]
				],
				regionShow: false, //地区选择
				form: {
					avatar: '', //头像
					name: '', //昵称
					sex: 0, //性别1=男，0=女
					phoneNumber: '', //手机号
					description: '',
				},
			}
		},
		onShow() {
			const avatar = uni.getStorageSync('avatar')
			if (avatar) {
				this.form.avatar = avatar
				uni.removeStorageSync('avatar')
			} else {
				this.getInfo()
			}
		},
		methods: {
			selectSex() {
				this.show = true
			},
			selectedSex(list) {
				// console.log(list);
				this.form.sex = list.value[0].type
				this.show = false
			},
			// 上传头像
			uploadAvatar() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						const src = res.tempFilePaths[0];
						uni.redirectTo({
							url: './herderPicture?src=' + src
						});
					},
					fail: (res) => {
						console.log(res);
					}
				});
			},
			getInfo() {
				this.$api.userInfo().then(res => {
					this.form.avatar = res.data.user.avatar
					this.form = Object.assign(res.data.user,this.form)
					this.form.phone = this.$fn.phoneEn(res.data.phone)
				})
			},
			submit() {
				if (this.form.name == '') {
					uni.showToast({
						mask: true,
						icon: 'none',
						title: '昵称不能为空'
					})
					return
				}

				this.$api.setUser(this.form).then(res => {
					this.$fn.A_showToast({
						title: '保存成功'
					}).then(() => {
						this._back(1)
					})
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		padding: 0 30rpx 178rpx;
	}

	.head {
		width: 90rpx;
		height: 90rpx;
		border-radius: 45rpx;
		margin-right: 10rpx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #EEEEEE;
		height: 140rpx;
		align-items: center;

	}

	.items {
		height: 110rpx;
	}

	.item-right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.text {
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}

	.ipt {
		width: 180rpx;
		font-size: 24rpx;
		color: #999999;
		margin-right: 8rpx;
		text-align: right;
	}

	.ipt1 {
		width: 500rpx;
	}

	::v-deep .u-textarea {
		background-color: #F7F7F7 !important;
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 40rpx;
		--iphonex-fix-bottom: env(safe-area-inset-bottom);
		padding-bottom: var(--iphonex-fix-bottom);

		view {
			width: 670rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
			color: #fff;
			font-size: 36rpx;
			font-weight: bold;
			background: $c-bgColor;
			border-radius: 16rpx;
		}
	}
</style>
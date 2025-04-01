<template>
	<!-- 修改密码 -->
	<view class="change-pass">
		<view class="pd20">
			<view class="ch-title"></view>
			<u--form labelPosition="left" :model="passwordInfo" :rules="rules" ref="uForm" labelWidth="85">
				<u-form-item label="原密码" prop="oldPassword" borderBottom>
					<view class="fo-item">
						<u--input type="text" border="none" v-model="passwordInfo.oldPassword" placeholder="请输入">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item label="新密码" prop="newPassword" borderBottom>
					<view class="fo-item">
						<u--input type="text" border="none" v-model="passwordInfo.newPassword" placeholder="请输入">
						</u--input>
					</view>
				</u-form-item>
				<u-form-item label="再次输入" prop="newPasswordSecond" borderBottom>
					<view class="fo-item">
						<u--input type="text" border="none" v-model="passwordInfo.newPasswordSecond" @blur="verify" placeholder="请输入">
						</u--input>
					</view>
				</u-form-item>
			</u--form>
			<view class="btn-box">
				<button class="btn" @click="modifyInfo">确 定</button>
			</view>

		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				passwordInfo: {
					"newPassword": "",
					"newPasswordSecond": "",
					"oldPassword": ""
				},
				rules: {
					'oldPassword': [{
						type: 'string',
						required: true,
						message: '请输入旧密码',
						trigger: ['blur', 'change']
					}],
					'newPassword': {
						type: 'string',
						required: true,
						message: '请输入新密码',
						trigger: ['blur', 'change']
					},
					'newPasswordSecond': {
						type: 'string',
						required: true,
						message: '请再次输入新密码',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		created() {},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			// 验证新密码和确认
			verify() {
				if (this.passwordInfo.newPassword != this.passwordInfo.newPasswordSecond) {
					uni.showToast({
						icon: 'none',
						title: '新密码和确认密码不一致'
					})
					return
				}
			},
			// 保存按钮
			async modifyInfo() {
				return
				this.$refs.uForm.validate().then(async res => {
					uni.$u.toast('校验通过')
					const {
						data
					} = await this.$u.changePassword(this.passwordInfo);
					console.log(data);
					if (data == true) {
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/tabbar/login'
							});
						}, 2000);
					}

				}).catch(errors => {
					uni.$u.toast('校验失败')
				})

			}
		},

	}
</script>

<style lang="scss" scoped>
	.pd20 {
		padding: 0 20rpx;
	}

	.ch-title {
		font-weight: bold;
		font-size: 32rpx;
		color: #1A1A1A;
		font-style: normal;
	}

	.fo-item {
		padding: 14rpx 0rpx;

		input {
			width: 100%;
		}
	}

	.btn-box {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		padding: 10rpx 0rpx 68rpx;
		background: #fff;
		z-index: -1;
		left: 30rpx;

		.btn {
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient(157deg, #FFA00C 31%, #FFBA4F 100%);
			border-radius: 20rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
</style>
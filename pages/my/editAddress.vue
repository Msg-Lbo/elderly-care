<template>
	<!-- 编辑收货地址 -->
	<view>
		<view class="pd20">
			<u--form labelPosition="left" :model="addressInfo" :rules="rules" ref="uForm">
				<u-form-item label="收件人姓名" labelWidth="auto" prop="consignee" borderBottom>
					<u--input v-model="addressInfo.consignee" inputAlign="right" placeholder="请输入姓名"
						border="none"></u--input>
				</u-form-item>
				<u-form-item label="联系电话" labelWidth="auto" prop="phone" borderBottom>
					<u--input v-model="addressInfo.phone" inputAlign="right" placeholder="请输入电话号码"
						border="none"></u--input>
				</u-form-item>
				<u-form-item label="所在地区" labelWidth="auto" prop="phone" borderBottom>
					<view class="fo-item" @click="showArea=true">
						<u--input v-model="returnAddress" disabledColor="#fff" disabled inputAlign="right"
							placeholder="请选择" border="none"></u--input>
						<u-icon slot="right" name="arrow-right" color="#c0c4cc"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="详细地址" labelWidth="auto" prop="address" borderBottom>
					<u--input v-model="addressInfo.address" inputAlign="right" placeholder="请输入电话号码"
						border="none"></u--input>
				</u-form-item>
			</u--form>
		</view>

		<view class="bottom_box"></view>
		<view class="bottom_btn">
			<div class="btn cancel" @click="defaultBtn">设为默认地址</div>
			<div class="btn w330" @click="saveBtn">保存</div>
		</view>
		
		<!-- 地区选择器 -->
		<!-- 选择地区 -->
		<!-- <u-picker :show="showArea" ref="uPicker" :columns="areaList" keyName="name" @confirm="areaConfirm"
			@change="changeHandler" @cancel='showArea=false'></u-picker>
		</u-picker> -->
		<c-selectDistrict :show="showArea" @confirm="areaConfirm" @cancel="showArea=false"></c-selectDistrict>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				showArea: false,
				addressInfo: {
					is_default: 0, //是否默认
					consignee: "", //收货人
					phone: "", //联系方式 
					province_name: "", //省
					city_name: "", //市
					area_name: "", //区
					address: "", //详细地址
					province_id: "", //省编号
					city_id: "", //市编号
					area_id: "", //区编号
				},
				returnAddress: '请选择地区',
				Id: '',
				page: 10,
				showpage: 1,
				title: '新增',
				areaList: [],
				rules: {
					'form.consignee': {
						type: 'string',
						required: true,
						message: '请填写收件人姓名',
						trigger: ['blur', 'change']
					},
					'form.phone': {
						type: 'string',
						required: true,
						message: '请填写联系电话',
						trigger: ['blur', 'change']
					},
					'form.address': {
						type: 'string',
						required: true,
						message: '请上传详细地址',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onLoad: function(option) {
			this.Id = option.id
			if (option.id != 'undefined') {
				uni.setNavigationBarTitle({
					title: "编辑地址"
				})
				this.getAddreesData();
			}
		},
		onReady() {
			//onReady 为uni-app支持的生命周期之一
			this.$refs.uForm.setRules(this.rules)
		},

		methods: {
			// 切换地区
			changeHandler(e, mode = false) {
				this.$api.getAreaQ({
					pid: e.value[0].id
				}).then(res => {
					this.columnData = res.data
					const {
						columnIndex,
						value,
						values, // values为当前变化列的数组内容
						index,
						// 微信小程序无法将picker实例传出来，只能通过ref操作
						picker = this.$refs.uPicker
					} = e
					// 当第一列值发生变化时，变化第二列(后一列)对应的选项
					if (columnIndex === 0 || mode) {
						// console.log('this.columnData[index]',this.columnData[index]);
						// picker为选择器this实例，变化第二列对应的选项

						picker.setColumnValues(1, this.columnData)
						// picker.setColumnValues(1, this.columnData[index])
					}
					// console.log(this.columnData,'this.columnData')
				})
			},
			// 地区选择
			areaSelection(e) {},
			// 保存按钮
			saveBtn() {},
			// 获取地址
			getAddreesData() {},
			// 设置为默认按钮
			defaultBtn() {},
		},

	}
</script>

<style lang="scss" scoped>
	.pd20 {
		padding: 0 32rpx;
	}

	.ar-text {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12rpx;
		color: #c6cad1;
	}

	.fo-item {
		display: flex;
		align-items: center;
	}
</style>
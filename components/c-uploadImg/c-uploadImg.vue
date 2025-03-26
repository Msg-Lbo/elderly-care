<template>
	<view @click="chooseImg" class="img-box">
		<image class="img" v-show="!show" :src="images.upImg"></image>
		<image class="img" v-show="show" @load="complete" :src="img" mode="aspectFill"></image>
	</view>
</template>

<script>
	import images from "./images.js";
	export default {
		data() {
			return {
				img: '', //上传后预览图片
				show: false
			}
		},
		watch: {},
		props: {
			value: {
				type: String,
				default: ''
			},
		},
		created() {
			console.log('images', this.images);
		},
		data() {
			return {
				images,
			}
		},
		methods: {
			complete() {
				this.show = true
				uni.hideLoading()
			},
			chooseImg() {
				console.log(this.vuex_baseUrl + '/common/upload');
				let that = this
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.uploadFile({
							url: this.vuex_baseUrl + '/common/upload',
							name: 'images',
							filePath: res.tempFiles[0].path,
							success(res) {
								uni.showLoading({
									mask: true
								})
								let respons = JSON.parse(res.data)
								if (respons.code == 200) {
									that.img = respons.result.url //
									that.$emit('update:value', that.img)
								}
							},
							fail(err2) {
								console.log('err2',err2);
							}
						})
					},
					fail(err) {
						console.log('err',err);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.img-box {
		width: 100%;
		height: 100%;
		opacity: 0;
		.img {
			width: 100%;
			height: 100%;
		}
	}

	.text_box {
		margin: 30rpx auto 40rpx;
		text-align: center;
		font-size: 24rpx;
		line-height: 24rpx;
		font-weight: 500;
		color: #333333;
	}
</style>

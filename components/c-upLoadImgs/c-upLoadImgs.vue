<template>
	<!-- 上传图片多个 -->
	<u-upload v-if="!echo" :fileList="fileList" :accept="accept" @delete="deletePic" @afterRead="afterRead" name="3" multiple :maxCount="maxCount"
		:previewFullImage="true" :width="width" :height="height" :deletable="deletable"></u-upload>
		<view class="ec-box" v-else>
			<image v-for="(v,i) in fileList" :key="i" @click="previewImg" :style="{width:width,height:height}" :src="v.url"></image>
		</view>
</template>

<script>
	export default {
		props: {
			// 上传文件格式 video
			accept:{
				default: 'image',
				type: String
			},
			// 最多上传数
			maxCount: {
				default: 1,
				type: Number | String
			},
			// 宽度
			width: {
				default: '200rpx',
				type: Number | String
			},
			// 高度
			height: {
				default: '200rpx',
				type: Number | String
			},
			// 文件字段 使用时加上.sync  file.sync
			file: {
				default: () => [],
				type: Array | String
			},
			// 是否能删除
			deletable:{
				default: true,
				type: Boolean
			},
			// 回显模式(不能修改)
			echo:{
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				fileList: [],
			}
		},
		watch: {
			file: {
				handler(newValue) {
					this.handleImg(newValue)
				}
			}
		},
		mounted(){
			if(this.file){
				this.handleImg(this.file)
			}
		},
		methods: {
			// 处理图片格式
			handleImg(newValue){
				// console.log('newValue',newValue);
				if(typeof newValue == "object"){
					this.fileList = newValue.map(v => {
						return {
							url: this.vuex_imgUrl + v
						}
					})|| []
				}else{
					console.log('222');
					this.fileList = [{url:this.vuex_imgUrl+newValue}]
				}
				console.log('this.fileList',this.fileList);
			},
			// 删除图片
			deletePic(e) {
				console.log('e', e);
				this.fileList.splice(e.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.fileList.length
				lists.map((item) => {
					this.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.fileList[fileListLen]
					this.fileList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}

				console.log('this.fileList', this.fileList);
				let arr = this.fileList.map((v,i) => v.url.fileName||v.url.replace(this.vuex_imgUrl,""))
				if(arr.length==1){
					[arr] = arr
				}
				console.log('arr',arr);
				this.$emit("update:file", arr)
			},
			// 上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.vuex_baseUrl + '/common/upload',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							console.log('res', res);
							setTimeout(() => {
								resolve(JSON.parse(res.data))
							}, 1000)
						}
					});
				})
			},
			// 图片预览
			previewImg(){
				uni.previewImage({
					urls: this.fileList.map(v=>v.url)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-upload__wrap__preview {
		margin: 0;
	}
	.ec-box{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		image{
			// border: 1rpx solid red;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
	}
</style>
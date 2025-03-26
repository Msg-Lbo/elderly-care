<template>
	<!-- 电子签章 -->
	<view class='contents'>
		<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)'
			@touchend='end' @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
		</canvas>
		<!-- <image @longpress="isImage=false" class="img_bg" src="../static/img/sign_bg.png" mode="" v-if="isImage"></image> -->
		<view class="btnBox">
			<view class="btnBox-left">
				注：请在签名区域内签名，请勿超出签名区域范围。
			</view>
			<view class="btnBox-right">
				<view class="btn1" @tap='clearClick'>重写</view>
				<view class="btn2" @tap="overSign">确定</view>
			</view>
		</view>

	</view>
</template>

<script>
	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;

	export default {
		data() {
			return {
				isImage: true,
				isEnd: false, // 是否签名
				id: '',
				orderId: '',
				collateralId: '',
				urlPdf: '', //合同路径

			}
		},
		/*生命周期函数--监听页面加载 */
		onLoad(options) {
			// 合同路径
			if (options.urlPdf) {
				this.urlPdf = options.urlPdf
			}
			_that = this
			let dev = uni.getSystemInfoSync()
			console.log(dev)
			// 获取横屏的宽高 设置画布的大小
			// screenWidth windowHeight
			canvasw = dev.screenWidth - 20
			canvash = dev.screenHeight - 70
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#000")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
			content.setFillStyle('white'); //填充白色

			content.fillRect(0, 0, canvasw, canvash); //画出矩形白色背景

			content.restore()
			content.save()
		},
		methods: {
			// 提交按钮
			overSign() {


				if (this.isEnd) {
					let that = this
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						fileType: 'png',
						success: (res) => {
							//打印图片路径
							console.log('签名图片路径', res)
							// uni.previewImage({
							// 	urls: [res.tempFilePath]
							// })
							uni.compressImage({
								src: res.tempFilePath,
								quality: 50,
								success: res2 => {
									that.signName(res2.tempFilePath)
									// console.log(res2.tempFilePath, '签名路径')
								}
							})

						}
					})
				} else {
					uni.showToast({
						title: '请先完成签名',
						icon: "none",
						duration: 1500,
						mask: true
					})
				}

			},

			signName(signPath) {
				console.log(this.$fn.urlTobase64(signPath),'签字');
				this.$api.signContract({
					"contractPath": this.urlPdf,
					signPath: this.$fn.urlTobase64(signPath),
				}).then(res => {
					console.log(res, "合同签订");
					if (res.code == 200) {
						uni.navigateBack()
						uni.setStorageSync('signType', '1')
					}
				})
			},

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				// console.log("触摸开始" + event.changedTouches[0].x)
				// console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				this.isImage = false
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},
			// 画布的触摸移动结束手势响应
			end: function(e) {
				// console.log("触摸结束" + e)
				// 设置为已经签名
				this.isEnd = true
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},
			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},
			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},
			error: function(e) {
				console.log("画布触摸错误" + e)
			},
			//绘制
			draw: function(touchs) {
				// console.log(touchs[0], touchs[1])
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.isEnd = false
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},
		},
	}
</script>

<style lang="scss" scoped>
	@function tovmin($rpx) {
		//$rpx为需要转换的字号
		@return #{$rpx * 100 / 750}vmin;
	}

	page {
		background-color: #f2f2f2;
	}

	canvas {
		background-color: #fff;
		width: calc(100% - 20px);
		height: calc(100% - 85px);
		margin: 10px;
		position: absolute;
	}

	.img_bg {
		background-color: #fff;
		width: calc(100% - 20px);
		height: calc(100% - 85px);
		margin: 10px;
		position: absolute;
	}

	.btnBox {
		display: flex;
		// justify-content: flex-end;
		justify-content: space-between;
		align-items: center;
		// height: 85px;
		// width: 100%;
		position: fixed;
		right: tovmin(20);
		left: tovmin(20);
		bottom: 0;
		padding-bottom: 24rpx;
		box-sizing: border-box;
	}

	.btnBox view {}

	.btnBox view:active {
		// background-color: #CCCCCC;
		// color: #333333;
	}

	.btnBox-left {
		font-size: tovmin(28);
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		color: #EE3B31;
	}

	.btnBox-right {
		display: flex;
	}

	.btn1 {
		width: tovmin(200);
		height: tovmin(76);
		border-radius: tovmin(16);
		border: tovmin(2) solid #999999;
		color: #FFFFFF;
		margin-left: tovmin(20);
		font-size: tovmin(36);
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn2 {
		width: tovmin(200);
		height: tovmin(80);
		background: linear-gradient(135deg, #2AD03D 0%, #00B815 100%);
		border-radius: tovmin(16);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: tovmin(36);
		font-family: PingFang SC, PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin-left: tovmin(20);

	}
</style>
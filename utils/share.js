module.exports = {
	data(){
		return {
			path:'/pages/tabbar/home',
			share: {
				title: '', // 默认为小程序名称
				path: '', // 默认为当前页面路径
				imageUrl: '' // 默认为当前页面的截图
			},
			source:'',
			attribution:'',
		}
	},
    onLoad(e) {
		console.log(e)
		if(e.source){
			uni.setStorageSync('source',e.source)
		}
		if(e.attribution){
			uni.setStorageSync('attribution',e.attribution)
		}
		//黑名单
		const urlList=[
			'pages/person/person',
			'pages/course/myCourseList',
			'pages/course/myCourse',
			'pages/adultCollege/confirmOrder',
			'pages/colleges/confirmOrder',
			'pages/adultCollege/paySuccess',
			'pages/person/user-info/user-info',
			'pages/person/myOrder/myOrder',
			'pages/person/orderDetil/orderDetil',
		]
		//获取路由信息
		const pages=getCurrentPages()
		//获取当前路由
		let nowPage = pages[pages.length - 1]
		console.log(nowPage.route)
		this.path = nowPage.route
		if(urlList.includes(nowPage.route)){
			console.log('11111')
			uni.hideShareMenu()
		}
	},
	// imageUrl:uni.getStorageSync('shareImage'),
	//分享好友
	onShareAppMessage() {
		let source = uni.getStorageSync('source')
		let attribution = uni.getStorageSync('attribution')
		console.log('/'+this.path+`?source=${source}&attribution=${attribution}`)
		return {
			title: '', // 默认为小程序名称
			path: '/'+this.path+`?source=${source}&attribution=${attribution}`, // 默认为当前页面路径
			imageUrl: '' // 默认为当前页面的截图
		}
	},
	// #ifdef MP-WEIXIN
	//朋友圈
	onShareTimeline() {
		let source = uni.getStorageSync('source')
		let attribution = uni.getStorageSync('attribution')
		return {
			title: '', // 默认为小程序名称
			path: '/'+this.path+`?source=${source}&attribution=${attribution}`, // 默认为当前页面路径
			imageUrl: '' // 默认为当前页面的截图
		}
	},
	// #endif
	
}

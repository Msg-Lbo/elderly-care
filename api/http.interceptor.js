// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = vm.vuex_baseUrl
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		// console.log('拦截器',config);
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		// if(config?.custom?.auth) {
		// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		config.header = {
			'Authorization':'Bearer '+ vm.$store.state.vuex_token,
			"login-platform": "MINI_PROGRAM"
		};
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data

		// 自定义参数
		const custom = response.config?.custom
		if (!data.code) {
			return data
		}
		if (data.code == 401) {
			// uni.clearStorageSync()
			uni.$u.throttle(() => {
				uni.showToast({
					title: "登录已过期，请重新登录",
					icon: "none",
					duration: 2000,
				});
				setTimeout(function() {
					uni.reLaunch({
						url: "/pages/tabbar/login",
						fail(error) {
							console.log(error);
						},
					});
				}, 100);
			}, 2000);
		} else if (data.code !== 200) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.msg)
			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		return data
		// return data.data === undefined ? {} : data.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}

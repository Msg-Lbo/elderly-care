// uni方法二次封装

/**
 * @description uni.showToast  Promise化，用.then()代替success里面的setTimeout
 */
export function showToast(params = {}) {
	let obj = {
		duration: 1500,
		title: '请传入{title}',
		icon: 'none',
		mask: true
	}
	// 将参数合并
	let objs = Object.assign(obj, params)
	return new Promise((resolve, reject) => {
		uni.showToast({
			duration: objs.duration,
			title: objs.title,
			icon: objs.icon,
			mask: objs.mask,
			success() {
				let time = setTimeout(() => {
					clearTimeout(time)
					resolve()
				}, objs.duration)
			}
		})
	})
}

/**
 * @description uni.navigateTo  
 * @param String  url 跳转的页面路径
 */
export function jumpPage(url) {
	uni.navigateTo({
		url,
		success(res) {
			// console.log('跳转res',err);
		},
		fail(err) {
			console.log('跳转err',err);
		}
	})
}

/**
 * @description uni.navigateBack  
 */
export function jumpBack() {
	uni.navigateBack()
}
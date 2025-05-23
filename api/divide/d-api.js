// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const http = uni.$u.http
// 此处使用了传入的params参数，一切自定义即可
const getApiD = (data = {}, config) => http.get('/frontend/login/wechat', {params: data,...config});
const postApiD = (params = {}, config) => http.post('/frontend/yard/redeemRecord', params, config);

export default {
	getApiD, //get示例接口
	postApiD, //post示例接口
}

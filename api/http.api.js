// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F

// 引入分工api.js 
// import dApi from "./divide/d-api.js"
// import qApi from "./divide/q-api.js"


const http = uni.$u.http
// 此处使用了传入的params参数，一切自定义即可
const getArticles = (data = {}, config) => http.get('/article/articles/', {params: data,...config});
const postApi = (params = {}, config) => http.post('/frontend/yard/redeemRecord', params, config);

let apiList = {
	getArticles, // 获取文章列表
	postApi, //post接口示例
}
export default {...apiList}
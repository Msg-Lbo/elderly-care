// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F

// 引入分工api.js 
import dApi from "./divide/d-api.js"
import qApi from "./divide/q-api.js"


const http = uni.$u.http
// 此处使用了传入的params参数，一切自定义即可
const getApi = (data = {}, config) => http.get('/frontend/login/wechat', {params: data,...config});
const postApi = (params = {}, config) => http.post('/frontend/yard/redeemRecord', params, config);
const getArea = (data = '', config) => http.get('/ruoyi/city/getByPid' , {params: data,...config});
const getAgreement = (data = '', config) => http.get('/system/agreement/getById' , {params: data,...config});
const getByKey = (data = '', config) => http.get('/system/config/getByKey' , {params: data,...config});
const getDictByType = (key = '', config) => http.get(`/system/dict/data/type/${key}`, config);

let apiList = {
	...dApi,
	...qApi,
	getApi, //get接口示例
	postApi, //post接口示例
	getArea, //获取城市接口
	getAgreement, //获取协议
	getByKey, //获取配置
	getDictByType, //获取字典
}
export default {...apiList}
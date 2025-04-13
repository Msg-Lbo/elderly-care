// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F

// 引入分工api.js 
// import dApi from "./divide/d-api.js"
// import qApi from "./divide/q-api.js"


const http = uni.$u.http
// 此处使用了传入的params参数，一切自定义即可
const getToken = (data = {}, config = {}) => http.post('/auth/token/', data, config)
const login = (data = {}, config) => http.post('/user/login/', data, config);
const uploadImage = (data = {}, config) => http.post('/user/upload/', data, config);
const getUserProFile = (data = {}, config) => http.get('/user/profile/', data, config)
const updateUserProFile = (data = {}, config) => http.post('/user/profile/update/', data, config)
const getArticles = (data = {}, config) => http.get('/article/articles', data, config);
const likeArticle = (data = {}, config) => http.post(`/article/articles/${data.id}/like`, data, config);
const getArticlesBySearch = (data = {}, config) => http.get('/article/articles?search=' + data, data, config);
const getArticlesByHot = (data = {}, config) => http.get('/article/articles?is_hot=True', data, config);
const getArticlesByCategory = (data = {}, config) => http.get('/article/articles?category=' + data, data, config);
const getArticleDetail = (data = {}, config) => http.get('/article/articles/' + data, data, config);
const getCategories = (data = {}, config) => http.get('/article/categories', data, config)
const getArchives = (data = {}, config) => http.get('/user/profiles/', data, config)
const getArchivesDetail = (data = {}, config) => http.get(`/user/profiles/${data}/`, data, config)
const getCommunityActivity = (data = {}, config) => http.get('/community/activity', data, config)
const getActivities = (data = {}, config) => http.get('/activity/activities/', data, config)
const getActivityDetail = (data = {}, config) => http.get(`/activity/activities/${data}/`, data, config)
const activityRegister = (data = {}, config) => http.post(`/activity/activities/${data.activity}/register/`, data, config)
const createServices = (data = {}, config) => http.post('/service/services/', data, config)
const getServiceList = (data = {}, config) => http.get('/service/services/?status=' + data, data, config)
const getServiceDetail = (data = {}, config) => http.get(`/service/services/${data}/`, data, config)
const updateServiceDetail = (data = {}, config) => http.post(`/service/services/${data.id}/update/`, data, config)
const getCardPackage = (data = {}, config) => http.get('/user/card-package/get_card_list/', data, config)
const addCard = (data = {}, config) => http.post('/user/card-package/add_card/', data, config)
const getCardDetail = (data = {}, config) => http.get(`/user/card-package/get_card/${data}/`, data, config)
const updateCard = (data = {}, config) => http.post(`/user/card-package/update_card/${data.card_id}/`, data, config)
const deleteCard = (data = {}, config) => http.post(`/user/card-package/remove_card/${data.card_id}/`, data, config)
const getHealthSchedules = (data = {}, config) => http.get(`/user/health-schedules/`, data, config)
const getHealthSchedulesDetail = (data = {}, config) => http.get(`/user/health-schedules/${data}/`, data, config)
const createHealthSchedules = (data = {}, config) => http.post(`/user/health-schedules/`, data, config)
const updateHealthSchedules = (data = {}, config) => http.post(`/user/health-schedules/${data.id}/`, data, config)

// 监护人相关 API
const getGuardians = (data = {}, config) => http.get('/user/guardianship/?phone=' + data, data, config)
const addGuardian = (data = {}, config) => http.post('/user/guardianship/', data, config)
const deleteGuardian = (data = {}, config) => http.delete(`/user/guardianship/${data.id}/`, data, config)
const register = (data = {}, config) => http.post('/user/register/', data, config)

let apiList = {
	getToken, // 获取token
	login, // 登录
	uploadImage, // 上传图片
	updateUserProFile, // 更新用户信息
	getUserProFile, // 获取用户信息
	getArticles, // 获取文章列表
	likeArticle, // 点赞文章
	getArticlesBySearch, // 获取文章列表按搜索
	getArticlesByHot, // 获取文章列表按热度
	getArticlesByCategory, // 获取文章列表按分类
	getArticleDetail, // 获取文章详情
	getCategories, // 获取文章分类
	getArchives, // 获取档案列表
	getArchivesDetail, // 获取档案详情
	getCommunityActivity, // 获取社区活动
	getActivities, // 获取活动列表
	getActivityDetail, // 获取活动详情
	activityRegister, // 活动报名,
	createServices, // 创建服务
	getServiceList, // 获取服务列表
	getServiceDetail, // 获取服务详情
	updateServiceDetail, // 更新服务详情
	getCardPackage, // 获取卡包列表
	addCard, // 添加卡
	getCardDetail, // 获取卡详情
	updateCard, // 更新卡
	deleteCard, // 删除卡
	getHealthSchedules, // 获取健康日程
	getHealthSchedulesDetail, // 获取健康日程详情
	createHealthSchedules, // 创建健康日程
	updateHealthSchedules, // 更新健康日程
	getGuardians, // 获取监护人列表
	addGuardian, // 添加监护人
	deleteGuardian, // 删除监护人
	register, // 用户注册
}
export default { ...apiList }
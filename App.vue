<script>
	export default {
		onLaunch: function() {},
		onShow() {
			console.log('当前版本号:', this.vuex_version);
			this.listenForUpdates(); //监听更新
		},
		methods: {
			//监听小程序是否有新版本需要更新
			listenForUpdates() {
				console.log('监听版本更新');
				const updateManager = uni.getUpdateManager();
				console.log('updateManager',updateManager);
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log(res.hasUpdate, '新版本回调');
					console.log(res, '新版本回调res');
					if (res.hasUpdate == true) {
						updateManager.onUpdateReady(function(res) {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success(res) {
									console.log(res, '新版本下载完')
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
						updateManager.onUpdateFailed(function(res) {
							// 新的版本下载失败
							uni.showModal({
								title: '更新失败',
								content: '很抱歉未能更新成功。您可以尝试重新进入，或者在微信界面下拉，在最近使用中找到此小程序，长按将其拖拽到底部删除按钮中，然后重新搜索小程序进入。给您带来的不便，深表歉意！',
								showCancel: false,
							});

						});
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uni_modules/uview-ui/index.scss";
	@import "@/common/css/commonStyle.scss";
</style>
<template>
	<view id="wrap">
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				titList:['用户协议','隐私协议','关于我们'],
				type:0,//(1-用户协议 2-隐私协议 3-关于我们)
				content:'',
			}
		},
		methods:{
			getInfo(){
				this.$api.agreement({id:this.type}).then(res=>{
					console.log('协议res',res);
					this.content=res.data.content
				})
			}
		},
		onLoad(options){
			this.type = Number(options.type) 
			uni.setNavigationBarTitle({
				title:this.titList[this.type-1]
			})
			this.getInfo()
		}
	}
</script>

<style lang="scss" scoped>
	#wrap{
     padding: 30rpx;	
	}
</style>
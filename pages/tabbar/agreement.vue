<template>
	<view id="wrap">
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:'',
			}
		},
		onLoad(options){
			this.type = Number(options.type) 
			uni.setNavigationBarTitle({
				title:this.titList[this.type-1]
			})
			this.getInfo()
		},
		methods:{
			getInfo(){
				this.$api.agreement({id:this.type}).then(res=>{
					this.content=res.data.content
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	#wrap{
     padding: 30rpx;	
	}
</style>
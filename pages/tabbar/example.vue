<template>
	<view>
		<button @click="addressShow=true">打开地区选择</button>
		<c-selectDistrict :show="addressShow" @confirm="abc" @cancel="addressShow=false"></c-selectDistrict>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressShow: false
			}
		},
		methods:{
			// 回调
			abc(e){
				this.addressShow=false
				console.log('e',e);
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
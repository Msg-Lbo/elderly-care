## 公共方法
示例中的$fn为main.js中Vue.prototype.$fn挂载的，具体应用以实际挂载对象为准
|示例索引		|function			|description									|
|---------------|-------------------|-----------------------------------------------|
|(1				|A_showToast		|对uni.showToast的封装，.then为执行完成后的回调		|
|(2				|A_objToStr			|对象转url参数,只支持简单数据类型					|
|(3				|time_secondToStr	|将总秒数转换成'00:00'或'00:00:00'的字符串			|
|(4				|time_fromNow		|计算距离现在的时间								|
|				|					|												|



``` 
	//(1
	this.$fn.A_showToast({title:'提示文字'})
	//或
	this.$fn.A_showToast({title:'提示文字'}).then(()=>{})	  
	//.then为uni.showToast执行完成后的回调,如果提示完成需要进行操作就在then回调中执行
```

```
	//(2
	let query=this.$fn.A_objToStr({a:1,b:2})
	//query='?a=1&b=2'
```

```
	//(3
	let query=this.$fn.time_secondToStr(20)
	//等价于 let query=this.$fn.time_secondToStr(20,'minute')
	//query='00:20'
	let query=this.$fn.time_secondToStr(20,'hour')
	//query='00:00:20'
```

```
	//(4
	let time=this.$fn.time_fromNow('2022-04-05 10:05:24')
	//当前时间为2022-04-05 10:05:20 time='4秒前'
	//当前时间为2022-04-05 10:00:24 time='5分钟前'
	//当前时间为2022-04-05 09:05:24 time='1小时前'
	//当前时间为2022-04-06 10:05:24 time='一天前'
```

	

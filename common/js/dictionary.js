/**
 * 字典
 */
const list = {
	/**
	 * 房源状态
	 */
	PROPERTY_STATUS: {
		0: '报备有效',
		1: '正在报备',
		2: '报备失败',
		3: '房源成交',
		4: '竞价失败',
		5: '即将二拍',
	},
}

/**
 * @param {String} type 需要查询哪个字典，例如要查询配送方式，则传 SHIPPING_METHOD
 * @param {String|Number| 'list'} status 1. 传入字典的key，返回字典的value；2. 传入‘list’，返回返回该字典所有的key-value，组装成label-value的对象数组
 */
export function dictionary(type, status) {
	// status传入'list'时是下拉列表，其他情况是回显
	if (status === 'list') {
		return Object.entries(list[type]).map(([key, value]) => ({
			label: value,
			value: key,
		}))
		// status传入不为空或字符串返回对应值
	} else if (status != null) {
		return list[type][status]
		// status传入为null返回-
	} else {
		return '-'
	}
}
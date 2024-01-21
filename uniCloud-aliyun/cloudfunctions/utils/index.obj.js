// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	throttle(func, delay) {
		let last, timer;
		return function () {
			let self = this,
				args = arguments,
				now = +new Date();
	 
			if (last && now < last + delay) {
				clearTimeout(timer);
				timer = setTimeout(function () {
					last = now;
					func.apply(self, args);
				}, delay);
			} else {
				last = now;
				func.apply(self, args);
			}
		}
	},
	indexToCharCode(idx) {
		return String.fromCharCode(idx + 65);
	}
}

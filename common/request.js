const BASE_URL = "http://www.jsl123.com:19998"

export const myRequest = (options) => {
	if (options.header) {
		options.header = { ...options.header, token: 'jsl123'}
	} else {
		options.header = {token: 'jsl123'}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			data: options.data,
			header: options.header,
			dataType: options.dataType || "json",
			method: options.method || "POST",
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

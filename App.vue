<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: res => {
					console.log("设备信息", res)
					uni.setStorageSync("windowHeight", 750 / res.windowWidth * (res.windowHeight) * 1)
				}
			})
			uni.getSetting({
				success: res => {
					console.log("初始加载", res)
					if (!res.authSetting["scope.userInfo"]) {
						// 没有授权过
						console.log("没有授权过");
						// 还没有授权，就是第一次授权
						this.$utils.setData("isFirstUse", true)
					} else {
						this.$utils.setData("isFirstUse", false)
					}
				}
			})
			console.log('App Launch')
		},
		onShow() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.system-container {
		.page-setting {
			.row {
				.uni-slider-handle-wrapper {
					height: 4rpx;
				}
			}
		}
	}
</style>

<template>
	<view class="index-container">
		<button class='auth-btn' :style="{height: windowHeight + 'rpx'}" v-if="isFirstUse" type='primary' open-type="getUserInfo"
		 :withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
		</button>
		<swiper class="swiper" :indicator-dots="true" indicator-color="rgba(19, 19, 19, 0.5)" indicator-active-color="#131313">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<view class="swiper-item">
					<image class="banner-img" :src="'data:image/jpeg;base64,'+item.img" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<official-account v-if="!isAttention"></official-account>
		<view class="attention-org" v-else>
			<view class="left">
				<image class="logo" src="../../static/images/logo.png" mode="scaleToFill"></image>
				<view class="attention-org-content">
					<view class="title">嘉世利研学</view>
					<view class="note">嘉世利一【平行课堂】创始人，中国素质教育中国素质教育中国素质教育中国素质教育</view>
				</view>
			</view>
			<image class="scan" src="../../static/images/home/scan.png" mode="scaleToFill" @click="scanCode"></image>
		</view>
		<view class="index-tools">
			<view class="row">
				<navigator class="cell" url="../satellite-positioning/satellite-positioning">
					<image class="nav-img" src="../../static/images/home/index-img-1.png" mode=""></image>
					<text class="text">卫星定位</text>
				</navigator>
				<view class="cell">
					<image class="nav-img" src="../../static/images/home/index-img-2.png" mode=""></image>
					<text class="text">电子围栏</text>
				</view>
				<navigator class="cell" url="../motion-track/motion-track">
					<image class="nav-img" src="../../static/images/home/index-img-3.png" mode=""></image>
					<text class="text">运动轨迹</text>
				</navigator>
				<navigator class="cell" url="../team/team">
					<image class="nav-img" src="../../static/images/home/index-img-4.png" mode=""></image>
					<text class="text">团队状态</text>
				</navigator>
			</view>
			<view class="row">
				<view class="center">
					<view class="cell">
						<image class="nav-img" src="../../static/images/home/index-img-5.png" mode=""></image>
						<text class="text">鹰眼</text>
					</view>
					<view class="cell">
						<image class="nav-img" src="../../static/images/home/index-img-6.png" mode=""></image>
						<text class="text">跌倒提醒</text>
					</view>
					<view class="big1 cell">
						<image class="nav-img" src="../../static/images/home/index-img-7.png" mode=""></image>
						<text class="text">照明补光</text>
					</view>
				</view>
				<view class="center">
					<view class="big2 cell">
						<image class="nav-img" src="../../static/images/home/index-img-8.png" mode=""></image>
						<text class="text">应急呼救</text>
					</view>
					<view class="cell big2-item">
						<image class="nav-img" src="../../static/images/home/index-img-9.png" mode=""></image>
						<text class="text">打卡签到</text>
					</view>
					<view class="cell big2-item">
						<image class="nav-img" src="../../static/images/home/index-img-10.png" mode=""></image>
						<text class="text">添加号码</text>
					</view>
				</view>
			</view>
			<view class="row">
				<view class="cell-3 position">
					<image class="nav-img" src="../../static/images/home/index-img-11.png" mode=""></image>
					<navigator class="text" url="../system-setting/system-setting">系统设置</navigator>
				</view>
				<view class="cell-3 position">
					<image class="nav-img" src="../../static/images/home/index-img-12.png" mode=""></image>
					<text class="text">远程重启</text>
				</view>
				<view class="cell-3 small-box">
					<view class="small">
						<image class="nav-img" src="../../static/images/home/index-img-13.png" mode=""></image>
						<text class="text">远程关机</text>
					</view>
					<navigator class="small" @click="logout" open-type="exit" target="miniProgram">
						<image class="nav-img" src="../../static/images/home/index-img-14.png" mode=""></image>
						<text class="text">退出登录</text>
					</navigator>
					<view class="small">
						<image class="nav-img" src="../../static/images/home/index-img-15.png" mode=""></image>
						<text class="text">常见问题</text>
					</view>
					<view class="small">
						<image class="nav-img" src="../../static/images/home/index-img-16.png" mode=""></image>
						<text class="text">免责声明</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否关注
				isAttention: false,
				// 轮播图
				bannerList: [],
				// 是第一次授权用户
				isFirstUse: uni.getStorageSync("isFirstUse"),
				// 可用高度
				windowHeight: 1200
			}
		},
		onLoad() {
			this.windowHeight = uni.getStorageSync("windowHeight")
			uni.login({
				provider: "weixin",
				success: (loginRes) => {
					console.log("loginRes.code", loginRes)
					this.$utils.setData("userCode", loginRes.code)
					// 不是第一次使用的才去获取用户信息
					if (!this.isFirstUse) {
						uni.getUserInfo({
							provider: "weixin",
							success: (infoRes) => {
								console.log("infoRes", infoRes)
								this.$utils.setData("encryptedData", infoRes.encryptedData)
								this.$utils.setData("iv", infoRes.iv)
								this.login(infoRes.encryptedData, infoRes.iv)
							},
							fail: err => {
								console.log("获取授权失败", err)
							}
						})
					}
				}
			})
			this.getBanner()
		},
		methods: {
			/**
			 * 获取轮播图
			 */
			getBanner() {
				this.$myRuquest({
					url: "/jsl/slideshow/listSlideshow"
				}).then(res => {
					this.bannerList = res
				})
			},
			// 登录
			login(encryptedData, iv) {
				this.$myRuquest({
					url: "/jsl/shareworker/userLogin/login",
					data: {
						code: this.$utils.getData("userCode"),
						encryptedData: encryptedData,
						iv: iv
					}
				}).then(res => {
					console.log("res", res)
					this.$utils.setData("accessToken", res.accessToken)
					this.$utils.setData("p_uid", res.p_uid)
				}).catch()
			},
			/**
			 * 退出登录
			 */
			logout() {
				uni.clearStorageSync()
			}
		},
		components: {}
	}
</script>

<style lang="scss">
	.auth-btn {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		opacity: 0;
	}

	.index-container {
		padding-bottom: 5rpx;

		.swiper {
			margin: 0 24rpx 7rpx;
			height: 394rpx;

			.banner-img {
				display: block;
				width: 702rpx;
			}
		}

		.attention-org {
			padding: 20rpx 24rpx;
			border-top: 1rpx solid #CCCCCC;
			border-bottom: 1rpx solid #CCCCCC;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.logo {
					display: block;
					width: 98rpx;
					height: 98rpx;
				}

				.attention-org-content {
					width: 456rpx;
					margin-left: 10rpx;

					.title {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #343434;
					}

					.note {
						width: 456rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

			.scan {
				display: block;
				width: 72rpx;
				height: 72rpx;
			}

			.attention-btn {
				display: block;
				width: 110rpx;
				height: 50rpx;
				border: 1rpx solid #1AAD19;
				border-radius: 4rpx;
				text-align: center;
				line-height: 50rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				box-sizing: border-box;
				color: #1AAD19;
				background: transparent;
			}
		}

		.attention-box {
			position: fixed;
			left: 50rpx;
			top: 50%;
			transform: translate(0, -50%);
			z-index: 500;
			width: 650rpx;
		}

		.index-tools {
			padding: 25rpx 25rpx 0;

			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.cell {
					display: block;
					width: 160rpx;
					height: 160rpx;
					position: relative;

					.nav-img {
						display: block;
						width: 160rpx;
						height: 160rpx;
					}

					.text {
						position: absolute;
						bottom: 20rpx;
						left: 0;
						display: block;
						width: 100%;
						text-align: center;
						font-size: 24rpx;
						font-weight: 500;
						color: #FFFFFF;
					}
				}

				.center {
					display: flex;
					justify-content: space-between;
					align-content: space-between;
					flex-wrap: wrap;
					width: 340rpx;
					height: 520rpx;

					.big1 {
						width: 340rpx;
						height: 340rpx;

						.nav-img {
							display: block;
							width: 340rpx;
							height: 340rpx;
						}

						.text {
							bottom: 26rpx;
							font-size: 40rpx;
						}
					}

					.big2 {
						width: 340rpx;
						height: 310rpx;

						.nav-img {
							display: block;
							width: 340rpx;
							height: 310rpx;
						}

						.text {
							top: 26rpx;
							font-size: 40rpx;
						}
					}

					.big2-item {

						width: 160rpx;
						height: 188rpx;

						.nav-img {
							display: block;
							width: 160rpx;
							height: 188rpx;
						}
					}
				}

				.cell-3 {
					display: flex;
					justify-content: space-between;
					align-content: space-between;
					flex-wrap: wrap;
					width: 220rpx;
					height: 220rpx;

					.nav-img {
						display: block;
						width: 220rpx;
						height: 220rpx;
					}

					&.position {
						position: relative;

						.text {
							position: absolute;
							bottom: 26rpx;
							left: 0;
							display: block;
							width: 100%;
							text-align: center;
							font-size: 24rpx;
							font-weight: 500;
							color: #FFFFFF;
						}
					}

					&.small-box {
						width: 230rpx;
						height: 220rpx;
						background: #ffffff;

						.small {
							display: block;
							width: 106rpx;
							height: 106rpx;
							position: relative;

							.nav-img {
								display: block;
								width: 106rpx;
								height: 106rpx;
							}

							.text {
								position: absolute;
								bottom: 14rpx;
								left: 0;
								display: block;
								width: 100%;
								text-align: center;
								font-size: 20rpx;
								font-weight: 500;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}
</style>

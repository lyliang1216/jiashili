<template>
	<view class="system-container">
		<view class="page-setting">
			<text class="title">振动设置</text>
			<view class="row sys-flex">
				<text class="text">提醒灵敏度调节</text>
				<evan-switch class="switch-block" v-model="checked" active-color="#22C886" inactive-color="#CCCCCC" :size="38"></evan-switch>
			</view>
			<view class="row slider-box">
				<image class="down" src="../../static/images/volume-down.png" mode=""></image>
				<range-slider :width="610" :height="20" :blockSize="40" :bar-height="4" background-color="#CCCCCC" active-color="#22C886"
				 :min="0" :max="100" :step="1" :liveMode="true" @rangechange="rangechange">
				</range-slider>
				<image class="up" src="../../static/images/volume-up.png" mode=""></image>
			</view>
			<view class="row sys-flex">
				<text class="text">灯光常亮</text>
				<text class="text-right">5分钟</text>
			</view>
		</view>
		<view class="page-setting">
			<text class="title">信息设置及修改</text>
			<view class="row sys-flex">
				<text class="text">管理员权限</text>
				<text class="text-right underline">点击修改</text>
			</view>
			<view class="row sys-flex noborder">
				<text class="text">监护人电话</text>
				<text class="text-right underline">点击修改</text>
			</view>
			<view class="row sys-flex">
				<text class="text">预存联系人</text>
				<text class="text-right underline">点击修改</text>
			</view>
		</view>
	</view>
</template>

<script>
	import evanSwitch from "../../components/evan-switch/evan-switch.vue"
	import RangeSlider from '../../components/range-slider/range-slider.vue'
	export default {
		data() {
			return {
				checked: true
			}
		},
		methods: {
			rangechange(options) {
				console.log(options)
			}
		},
		components: {
			evanSwitch,
			RangeSlider
		}
	}
</script>

<style lang="scss">
	page {
		background: #f4f4f4;
	}
	.system-container {
		.page-setting {
			margin: 44rpx 0 11rpx;

			.title {
				font-size: 20rpx;
				color: #343434;
				margin-left: 24rpx;
				margin-bottom: 8rpx;
			}

			.row {
				padding: 0 24rpx;
				height: 70rpx;
				background: #ffffff;

				.text {
					font-size: 30rpx;
					line-height: 30rpx;
					color: #343434;
				}
				.text-right {
					font-size: 24rpx;
					line-height: 30rpx;
					color: #666666;
					&.underline {
						padding-top: 8rpx;
						padding-bottom: 8rpx;
						border-bottom: 3rpx solid #666666;
					}
				}
				&.sys-flex {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-top: 1rpx solid #DBDBDB;
					border-bottom: 1rpx solid #DBDBDB;
				}
				&.noborder {
					border: 0;
				}
				&.slider-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.up {
						display: block;
						width: 32rpx;
						height: 38rpx;
					}

					.slider-block {
						width: 640rpx;
						margin-left: 16rpx;
						margin-right: 16rpx;
					}

					.down {
						display: block;
						width: 32rpx;
						height: 38rpx;
					}
				}
			}
		}
	}
</style>

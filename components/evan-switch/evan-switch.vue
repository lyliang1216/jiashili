<template>
	<view @click="toggle" class="evan-switch" :class="{'evan-switch--disabled':disabled}" :style="{width:2*size+'rpx',height:switchHeight,borderRadius:size+'rpx',backgroundColor:currentValue===activeValue?activeColor:inactiveColor}">
		<view class="evan-switch__circle" :style="{width:size+'rpx',height:size+'rpx',transform:currentValue===activeValue?`translateX(${size}rpx)`:`translateX(0)`}"></view>
	</view>
</template>

<script>
	export default {
		name: 'EvanSwitch',
		props: {
			value: {
				type: [String, Number, Boolean],
				default: false
			},
			activeColor: {
				type: String,
				default: '#108ee9'
			},
			inactiveColor: {
				type: String,
				default: '#fff'
			},
			size: {
				type: Number,
				default: 30
			},
			disabled: {
				type: Boolean,
				default: false
			},
			activeValue: {
				type: [String, Number, Boolean],
				default: true
			},
			inactiveValue: {
				type: [String, Number, Boolean],
				default: false
			},
			beforeChange: {
				type: Function,
				default: null
			},
			extraData: null,
			contextLevel: {
				type: Number,
				default: 1
			}
		},
		computed: {
			switchHeight() {
				// #ifdef APP-NVUE
				return this.size + 2 + 'rpx'
				// #endif
				// #ifndef APP-NVUE
				return this.size + 'rpx'
				// #endif
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(value) {
					this.currentValue = value
				}
			}
		},
		data() {
			return {
				currentValue: false
			}
		},
		methods: {
			toggle() {
				if (!this.disabled) {
					if (this.beforeChange && typeof this.beforeChange === 'function') {
						let context = this
						for (let i = 0; i < this.contextLevel; i++) {
							context = context.$options.parent
						}
						const result = this.beforeChange(this.currentValue === this.activeValue ? this.inactiveValue : this.activeValue,
							this.extraData, context)
						if (typeof result === 'object') {
							result.then(() => {
								this.toggleValue()
							}).catch(() => {})
						} else if (typeof result === 'boolean' && result) {
							this.toggleValue()
						}
					} else {
						this.toggleValue()
					}
				}
			},
			toggleValue() {
				this.currentValue = this.currentValue === this.activeValue ? this.inactiveValue : this.activeValue
				this.$emit('input', this.currentValue)
				this.$emit('change', this.currentValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evan-switch {
		position: relative;
		border-width: 1rpx;
		border-color: rgba(0, 0, 0, 0.1);
		border-style: solid;
		transition: background-color 0.3s;
		/* #ifndef APP-NVUE */
		box-sizing: content-box;
		/* #endif */
	}

	.evan-switch--disabled {
		opacity: 0.3;
	}

	.evan-switch__circle {
		position: absolute;
		left: 0;
		top: 0;
		background-color: #fff;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		box-shadow: 0 3rpx 1rpx 0 rgba(0, 0, 0, 0.05), 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.1), 0 3rpx 3rpx 0 rgba(0, 0, 0, 0.05);
		/* #endif */
		/* #ifdef APP-NVUE */
		box-shadow: 1rpx 0 0rpx 0 rgba(0, 0, 0, 0.05);
		/* #endif */
		transition: transform 0.3s;
	}
</style>

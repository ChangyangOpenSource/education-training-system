<template>
	<view class="u-tr">
		<slot></slot>
	</view>


</template><script>
	/**
	 * tr 表格行标签
	 * @description 表格组件一般用于展示大量结构化数据的场景（搭配<u-table>使用）
	 * @tutorial https://www.uviewui.com/components/table.html
	 * @example <u-tr></u-tr>
	 */
	export default {
		name: "u-tr",
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	.u-tr {
		@include vue-flex;
	}
	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}</style>

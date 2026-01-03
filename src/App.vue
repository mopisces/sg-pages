<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
</script>

<style>
	@import '~@/assets/style/index.css';
	.van-dropdown-menu {
		height:30px !important;
	}

	.vxe-table.size--small .vxe-body--column.col--ellipsis, .vxe-table.size--small .vxe-footer--column.col--ellipsis, .vxe-table.size--small .vxe-header--column.col--ellipsis, .vxe-table.vxe-editable.size--small .vxe-body--column {
    	line-height: 24px !important;
	}

	.vxe-table--render-default .vxe-body--column.col--ellipsis, .vxe-table--render-default.vxe-editable .vxe-body--column, .vxe-table--render-default .vxe-footer--column.col--ellipsis, .vxe-table--render-default .vxe-header--column.col--ellipsis {
		height: 24px !important;
	}
</style>
<!-- 页面模板选择 -->
<template>
	<div>
		<van-tabs>
			<van-tab :title="$t('h.oldView')" >
				<monitorOld />
			</van-tab>
			<van-tab :title="$t('h.newView')">
				<PMMD />
			</van-tab>
		</van-tabs>
		<router-view />
	</div>
</template>

<script>
	// 子组件
	import monitorOld from "@/views/monitor/Index.vue"
	import PMMD from "@/views/monitor/PMMD"
	export default {
		components: {
			PMMD,
			monitorOld
		},
		computed: {
			
		},
		data() {
			return {
			}
		},
		mounted() {
			this.$store.commit('layout/setTitle', this.$i18n.t('h.monitoring'))
			this.$store.commit('layout/setActive','monitor')
		},
		methods: {}
	}
</script>

<style>
	.van-tabs--line .van-tabs__wrap {
		height: 34px !important;
	}
	.van-tab {
		line-height: 34px !important;
	}
</style>


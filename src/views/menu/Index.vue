<template>
	<div>
		<van-grid square :gutter="10" :column-num="3">
			<van-grid-item :text="$t('h.modify')" to="/sg/alter" v-if="showAlter">
				<van-icon slot="icon" name="setting-o" size="35" color="#1a991d"/>
			</van-grid-item>
			<van-grid-item :text="$t('h.userManagement')" to="/sg/user">
				<van-icon slot="icon" name="friends-o" size="35" color="#1a991d"/>
			</van-grid-item>
			<van-grid-item :text="$t('h.productionReport')" to="/sg/statis">
				<van-icon slot="icon" name="chart-trending-o" size="35" color="#1a991d"/>
			</van-grid-item>
		</van-grid>
	</div>
</template>
<script>
	import { getUserInfo } from '@/utils'
	export default {
		data(){
			return {
				showAlter:false
			}
		},
		methods:{

		},
		created(){
			this.$store.commit('layout/setTitle', this.$i18n.t('h.menu'))
			this.$store.commit('layout/setActive','menu')
		},
		mounted(){
			try{
				if(getUserInfo().root == 0) this.showAlter = true
			}catch(err){
				this.showAlter = false
			}
		},
		updated(){
			
		},
		destroyed(){
			
		},
		computed:{
			
		},
		watch:{

		}
	}
</script>
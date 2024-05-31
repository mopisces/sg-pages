<template>
	<div>
		<van-nav-bar 
			:title="title" 
			:left-text="$t('h.back')" 
			:right-text="$t('h.refresh')" 
			left-arrow 
			@click-left="onClickLeft" 
			@click-right="reload" 
			:fixed="true" 
			style="z-index:-1"
		></van-nav-bar>
		<div class="layout-content">
			<router-view v-if="isRouterAlive"/>
		</div>
		<van-tabbar v-model="active">
			<van-tabbar-item name="monitor" to="/sg/monitor">
				<van-icon slot="icon" name="volume-o"/>
				{{ $t('h.monitoring') }}
			</van-tabbar-item>
			<van-tabbar-item name="bl" to="/sg/bl">
				<van-icon slot="icon" name="points"/>
				{{ $t('h.mp') }}
			</van-tabbar-item>
			<van-tabbar-item name="blms" to="/sg/blms">
				<van-icon slot="icon" name="orders-o" />
				{{ $t('h.mpm') }}
			</van-tabbar-item>
			<van-tabbar-item name="scdd" to="/sg/scdd">
				<van-icon slot="icon" name="records" />
				{{ $t('h.prodOrd') }}
			</van-tabbar-item>
			<van-tabbar-item name="wgdd" to="/sg/wgdd">
				<van-icon slot="icon" name="completed"/>
				{{ $t('h.completeOrd') }}
			</van-tabbar-item>
			<van-tabbar-item name="menu" to="/sg/menu" v-if="config.haveMenu">
				<van-icon slot="icon" name="wap-home-o"/>
				{{ $t('h.menu') }}
			</van-tabbar-item>
			<van-tabbar-item name="sgLogout" @click="logout">
				<van-icon slot="icon" name="down"/>
				{{ $t('h.logout') }}
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
	import { getUserInfo, cleanUserInfo } from '@/utils'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				config:{
					haveMenu:false
				},
				isRouterAlive:true
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			reload(){
				this.isRouterAlive = false
				this.$nextTick(()=>{
					this.isRouterAlive = true
					location.reload()
				})
			},
			logout(){
				this.$dialog.confirm({
					message: this.$i18n.t('h.confirmLogout'),
					confirmButtonText: this.$i18n.t('h.confirm'),
					cancelButtonText: this.$i18n.t('h.cancel')
				}).then(() => {
					cleanUserInfo()
					this.$router.push('/login')
				}).catch(()=>{
					this.$dialog.close()
				})
			}
		},
		created(){
			this.$store.commit('layout/setTitle','user')
			this.$store.commit('layout/setActive','monitor')
		},
		mounted(){
			try{
				let userInfo = getUserInfo()
				this.root = userInfo.root
			}catch(err){
				this.root = null
			}
			if( this.root == 0 || this.root == 1 ){
				this.config.haveMenu = true
			}
		},
		updated(){
			
		},
		destroyed(){
			
		},
		computed:{
			...mapGetters({
				title:'layout/title'
			}),
			active:{
				get () {
					return this.$store.state.layout.active
				},
				set (value) {
					this.$store.commit('layout/setActive', 	value)
				}
			}
		},
		watch:{

		}
	}
</script>
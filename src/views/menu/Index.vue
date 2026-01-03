<template>
	<!-- <div>
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
	</div> -->
	<div class="user-container">
		<div class="top-container">
			<van-image class="bg-img" :src="config.bgSrc" />
			<div class="top-header-center">
				<van-image class="top-header-avatar" :src="config.mineSrc" />
				<div class="top-header-info">
					<div class="top-header-nickname">{{ config.factoryName }}</div>
					<div class="top-header-explain"></div>
				</div>
			</div>
		</div>

		<div class="karry-content-box">
			<div class="karry-box karry-tool-box">
				<div class="karry-box-header">
					<div class="box-header-title">{{ $t('h.time') }}</div>
					<div class="box-header-sub"></div>
				</div>
				<div class="karry-order-list karry-flex-wrap">
					<div class="karry-paper-item" 
						v-for="(item,idx) in menuList" 
						:key="idx"
						@click="openPage(item)"
					>
						<div class="karry-icon-box">
							<div class="karry-paper-icon">
								<van-icon :name="item.icon" size="32px"/>
							</div>
						</div>
						<div class="karry-order-text">
							{{ item.title }}
						</div>
					</div>
				</div>
			</div>

			<!-- <div class="karry-box karry-tool-box logout-btn-box">
				<van-button style="width: 100%;" type="info" size="small" round plain @click="logout">{{ $t('h.logout') }}</van-button>
			</div> -->
		</div>


		<div class="karry-content-box">
			<div class="karry-box karry-tool-box">
				<div class="karry-box-header">
					<div class="box-header-title">{{ $t('h.report') }}</div>
					<div class="box-header-sub"></div>
				</div>
				<div class="karry-order-list karry-flex-wrap">
					<div class="karry-paper-item"
						v-for="(item,idx) in statisList" 
						:key="idx"
						@click="openPage(item)"
					>
						<div class="karry-icon-box">
							<div class="karry-paper-icon">
								<van-icon :name="item.icon" size="32px"/>
							</div>
						</div>
						<div class="karry-order-text">
							{{ item.title }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { getUserInfo, cleanUserInfo } from "@/utils"

	export default {
		data(){
			return {
				// 配置
				config: {
					bgSrc: require("../../assets/image/user/mine_bg.png"),
					mineSrc: require("../../assets/image/user/mine_touxiang.png"),
					factoryName: ""
				},
				showAlter: false,
			}
		},
		computed:{
			menuList() {
				if( this.showAlter ) {
					return [
						{
							title: this.$i18n.t('h.modify'),
							icon: "setting-o",
							url: "/sg/alter",
						},
						{
							title: this.$i18n.t('h.userManagement'),
							icon: "friends-o",
							url: "/sg/user",
						},
						{
							title: this.$i18n.t('h.productionReport'),
							icon: "cluster-o",
							url: "/sg/statis",
						}
					]
				} else {
					return [
						{
							title: this.$i18n.t('h.userManagement'),
							icon: "friends-o",
							url: "/sg/user",
						},
						{
							title: this.$i18n.t('h.productionReport'),
							icon: "cluster-o",
							url: "/sg/statis",
						}
					] 
				}
			},
			statisList() {
				return [
					{
						title: this.$i18n.t('h.paperFinish'),
						icon: "coupon-o",
						url: "/sg/paperFinish",
					}
				]
			}
		},
		created(){
			this.$store.commit('layout/setTitle', this.$i18n.t('h.menu'))
			this.$store.commit('layout/setActive','menu')
		},
		mounted(){
			try{
				this.getFactoryName()
				if(getUserInfo().root == 0) this.showAlter = true

			}catch(err){
				this.showAlter = false
			}
		},
		updated(){
			
		},
		destroyed(){
			
		},
		watch:{

		},
		methods:{
			openPage( item ) {
				this.$router.push(item.url)
			},
			getFactoryName(){
				this.$request.login.getFactoryName().then((res)=>{
					if(res.errorCode == '00000') this.config.factoryName = res.result
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
	}
</script>

<style>
	.user-container{
		position: relative;
	}

	.top-container {
		width: 100%;
		height: 182px;
		position: relative;
	}

	.bg-img {
		width: 100%;
		height: 182px;
		display: block;
	}

	.top-header-center {
		position: absolute;
		width: 100%;
		height: 64px;
		left: 0;
		top: 9px;
		padding: 0 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	
	.top-header-avatar {
		flex-shrink: 0;
		width: 64px;
		height: 64px;
		display: block;
	}
	
	.top-header-info {
		width: 60%;
		padding-left: 15px;
	}
	
	.top-header-nickname {
		font-size: 15px;
		font-weight: 500;
		color: #fff;
		display: flex;
		align-items: center;
	}
	
	.top-header-explain {
		width: 80%;
		font-size: 12px;
		font-weight: 400;
		color: #fff;
		opacity: 0.75;
		padding-top: 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.top-header-btn-edit{
		flex-shrink: 0;
		padding-right: 11px;
	}

	.karry-content-box {
		width: 100%;
		padding: 0 15px;
		box-sizing: border-box;
		position: relative;
		top: -80px;
		z-index: 10;
	}

	.karry-box {
		width: 100%;
		background: #fff;
		box-shadow: 0 1.5px 10px rgba(183, 183, 183, 0.1);
		border-radius: 5px;
		overflow: hidden;
	}
	
	.karry-order-box {
		height: 104px;
	}
	
	.karry-box-header {
		height: 31px;
		padding: 10px 15px 5px 10px;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		font-size: 15px;
		color: #303133;
		align-items: center;
		border-bottom: 1px #f1f1f1 solid;
	}
	
	.box-header-title {
		flex:1;
		font-weight: 600;
		color: #333;
	}
	
	.box-header-sub {
		flex:1;
		text-align: right;
		font-size: 15px;
	}
	
	.karry-order-list {
		width: 100%;
		height: 73px;
		padding: 0 15px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.karry-order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.karry-icon-box {
		position: relative;
	}
	
	.karry-order-icon {
		width: 28px;
		height: 28px;
		display: block;
	}
	
	.karry-badge {
		position: absolute;
		font-size: 12px;
		height: 16px;
		min-width: 10px;
		padding: 0 3px;
		border-radius: 20px;
		right: 5px;
		top: -2px;
		-webkit-transform: scale(.8) translateX(60%);
		transform: scale(.8) translateX(60%);
		-webkit-transform-origin: center center;
		transform-origin: center center;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
	
	.karry-badge-red {
		background: #f74d54;
		color: #fff;
	}
	
	.karry-order-text {
		font-size: 13px;
		font-weight: 400;
		color: #666;
		padding-top: 2px;
	}
	
	.karry-paper-box {
		margin-top: 10px;
	}
	
	.karry-flex-wrap {
		flex-wrap: wrap;
		height: auto;
		padding-bottom: 15px;
		justify-content: flex-start;
	}
	
	.karry-paper-item {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 15px;
	}
	
	.karry-paper-text {
		font-size: 13px;
		font-weight: 400;
		color: #666;
		padding-top: 2px;
	}
	
	.karry-paper-icon {
		width: 32px;
		height: 32px;
		display: block;
	}
	
	.karry-statis-box {
		margin-top: 10px;
	}
	
	.karry-tool-box {
		margin-top: 10px;
	}

	.logout-btn-box {
	  border-radius: 100px;
	}
</style>
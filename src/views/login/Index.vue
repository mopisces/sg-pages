<template>
	<div class="login-container">
		<div class="login-header">
			<van-image :src="logo" width="80%" height="80%"/>
		</div>
		<div class="login-content">
			<div class="login-factory">
				{{ factoryName }}
			</div>
			<div class="login-from">
				<div class="form-content">
					<div>
						<van-field 
							v-model="formData.userName" 
							:label="$t('h.userName')" 
							:placeholder="$t('h.enterUserName')" 
							required
						/>
						<van-field 
							v-model="formData.userPass" 
							type="password" 
							:label="$t('h.userPass')" 
							:placeholder="$t('h.enterUserPass')" 
							required 
						/>
						<van-field 
							v-model="_selectItem[0].text" 
							:label="$t('h.selectLang')" 
							required
							:placeholder="$t('h.selectLang')" 
							clickable 
							readonly 
							@click="config.popup.show = true" 
						>
							<van-icon name="arrow" slot="right-icon"/>
						</van-field>
					</div>
					<div  class="login-2rem">
						<van-button type="primary" size="normal" block @click="onLogin">{{ $t('h.login') }}</van-button>
					</div>
					<div  class="login-2rem">
						<van-divider dashed>
							<a href="http://www.beian.miit.gov.cn"> 浙ICP备16024747号-1</a>
						</van-divider>
					</div>
				</div>
			</div>
		</div>
		<div class="login-foot">
			<van-divider dashed>
				<a href="http://www.jpeng.com.cn/"> Copyright © {{ year }} 佳鹏电脑.All rights reserved. </a>
			</van-divider>
		</div>
		<van-popup v-model="config.popup.show" position="bottom" :style="{ height: '50%' }">
			<van-picker 
				ref="langs"
				:title="$t('h.selectLang')"
				:columns="config.picker.columns" 
				show-toolbar
				:confirm-button-text="$t('h.confirm')"
				:cancel-button-text="$t('h.cancel')"
				@cancel="config.popup.show = false" 
				@confirm="confirm" 
			/>
		</van-popup>
	</div>
</template>
<script>
	import { setUserInfo } from '@/utils'
	import schema from 'async-validator'
	export default {
		data(){
			return {
				config: {
					popup: {
						show: false
					},
					picker: {
						columns: [
							{text: "中文", value: "zh"},
							{text: "English", value: 'en'}
						],
					}
				},
				factoryName: null,
				logo: require( '../../assets/image/jplogo.png'),
				formData: {
					userName: null,
					userPass: null,
					langs: "zh"
				},
				year:null,
				validator:null
			}
		},
		methods:{
			getFactoryName(){
				this.$request.login.getFactoryName().then((res)=>{
					if(res.errorCode == '00000') this.factoryName = res.result
				})
			},
			onLogin(){
				this.validator.validate(this.formData).then(()=>{
					this.login( this.formData )
				}).catch(({ errors, fields })=>{
					this.$toast.fail(errors[0].message)
				})
			},
			login(){
				this.$request.login.login( this.formData ).then(res=>{
					if( res.errorCode == '00000' ){
						let userInfo = Object.assign(res.result)
						setUserInfo( userInfo ).then(res=>{
							this.$router.push('/sg/monitor')
						})
						localStorage.setItem('karry-sg-user',JSON.stringify(this.formData))
					}
				})
			},
			getNowYear(){
				let dateYear = new Date()
				this.year = dateYear.getFullYear()
			},
			init(){
				this.formData.langs = localStorage.getItem("karry-sg-monitor-langs") || "zh"
				this.getNowYear()
				this.getFactoryName()
				if( this.validator == null ) this.validator = new schema({
					userName : [
						{ type: 'string', required: true, message: this.$i18n.t('h.enterUserName')}
					],
					userPass : [
						{ type: 'string', required: true, message: this.$i18n.t('h.enterUserPass')},
					]
				})
			},
			confirm(value, index) {
				this.formData.langs = value.value
				localStorage.setItem("karry-sg-monitor-langs", value.value)
				location.reload()
				this.config.popup.show = false
			}
		},
		created(){
			this.init()
			try{
				let user = localStorage.getItem('karry-sg-user');
				if( user != null ){
					this.formData.userName = user.userName;
					this.formData.userPass = user.userPass;
				}
			}catch( err ){
				console.log(err)
			}
		},
		mounted(){
			
		},
		updated(){
			
		},
		destroyed(){
			
		},
		computed:{
			_selectItem() {
				return this.config.picker.columns.filter((item)=> { return item.value == this.formData.langs })
			},
		},
		watch:{
		}
	}
</script>
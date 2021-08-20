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
						<van-field v-model="formData.userName" label="用户名" placeholder="请输入登录名" required/>
						<van-field v-model="formData.userPass" type="password" label="密码" placeholder="请输入密码" required></van-field>
					</div>
					<div  class="login-2rem">
						<van-button type="primary" size="normal" block @click="onLogin">登录</van-button>
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
	</div>
</template>
<script>
	import { setUserInfo } from '@/utils'
	import schema from 'async-validator'
	export default {
		data(){
			return {
				factoryName:null,
				logo: require( '../../assets/image/jplogo.png'),
				formData:{
					userName:null,
					userPass:null
				},
				year:null,
				rules:{
					userName : [
						{ type: 'string', required: true, message: '请输入用户名'}
					],
					userPass : [
						{ type: 'string', required: true, message: '请输入密码'},
					]
				},
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
						let userInfo = Object.assign({},this.formData,res.result)
						setUserInfo( userInfo ).then(res=>{
							this.$router.push('/sg/monitor')
						})
					}
				})
			},
			getNowYear(){
				let dateYear = new Date()
				this.year = dateYear.getFullYear()
			},
			init(){
				this.getNowYear()
				this.getFactoryName()
				if( this.validator == null ) this.validator = new schema(this.rules)
			}
		},
		created(){
			this.init()
		},
		mounted(){

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
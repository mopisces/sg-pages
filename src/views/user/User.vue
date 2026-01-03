<template>
	<div>
		<van-pull-refresh 
			v-model="config.list.pullRefresh.reloading" 
			@refresh="pullOnRefresh"
		>
			<card 
				:is-shadow="true"
				v-for="(item,index) in config.indexList" 
				:key="index"
			>
				<div class="card-body-container">
					<div class="card-body-item card-body-item-100">
						<span>{{ $t('h.userName') }}:
							<span class="green-color">{{ item.user }}</span>
						</span>
					</div>
					<div class="card-body-item card-body-item-100">
						<span>{{ $t('h.userPass') }}:
							<span class="green-color">{{ item.pass }}</span>
						</span>
					</div>
				</div>
				<div slot="actions" class="card-actions">
					<div class="card-actions-item" @click="handleEdit(item)">
						<van-icon name="edit" color="#3c9cff" size="18"/>
						<span class="card-actions-item-text">{{ $t('h.modify') }}</span>
					</div>
					<div class="card-actions-item" @click="doDel(item)">
						<van-icon name="close" color="#f56c6c" size="18"/>
						<span class="card-actions-item-text">{{ $t('h.delete') }}</span>
					</div>
				</div>
			</card>

		</van-pull-refresh>
		<!-- 弹出层 -->
		<van-dialog 
			v-model="config.dialog.show" 
			:title="formData.isEdit==0 ? $t('h.addUser'):$t('h.modifyUser')" 
			show-cancel-button 
			close-on-popstate 
			:confirmButtonText="$t('h.confirm')"
			:cancelButtonText="$t('h.cancel')"
			:before-close="checkData"
		>
			<van-field v-model="formData.user" error required :label="$t('h.userName')" :disabled="formData.isEdit == 1 ? true : false" />
			<van-field v-model="formData.pass" error required :label="$t('h.userPass')" :placeholder="$t('h.enterUserPass')" />
		</van-dialog>
		<!-- 添加按钮 -->
		<float-nav iconName="plus" :text="$t('h.addUser')" @floatNav="handleAdd"/>
	</div>
</template>

<script>
	// 数据验证库
	import schema from 'async-validator'
	// 自定义组件
	import Card from '@/components/Card.vue'
	import FloatNav from "@/components/FloatNav.vue"

	export default {
		components: {
			Card,
			FloatNav
		},
		data() {
			return {
				// 配置
				config: {
					list: {
						pullRefresh:{
							reloading: false,
						},
					},
					dialog: {
						show: false
					},
					// 数据列表
					indexList: [],
				},
				// 表单
				formData: {
					id: null,
					isEdit: 0,
					user: null,
					pass: null,
				},
				// 验证对象
				validator: null
			}
		},
		mounted() {
			this.$store.commit("layout/setTitle", this.$i18n.t("h.userManagement"))
			this.$store.commit("layout/setActive", "menu")
			this.fetchData()
			this.setValidator()
		},
		methods: {
			// 获取数据
			fetchData(){
				this.config.indexList = this.$options.data().config.indexList
				this.$request.user.getList().then(res=>{
					this.config.indexList = res.result
					this.config.list.pullRefresh.reloading = false
				})
			},
			// 刷新
			async pullOnRefresh(){
				await this.fetchData()
			},
			// 设置验证对象
			setValidator() {
				this.validator = new schema({
					user: [{
						required: true, 
						message: this.$i18n.t("h.enterUserName")
					}],
					pass: [{
						required: true, 
						message: this.$i18n.t("h.enterUserPass")
					}],
				})
			},
			// 删除
			doDel(rowData) {
				this.$dialog.confirm({
					message: "确认删除?",
				}).then(()=> {
					this.$request.user.doStatus({id: rowData.id, status: 0}).then(res=>{
						if( res.errorCode == '00000' ){
							this.$toast.success(res.msg)
							this.fetchData()
						}
					})
				}).catch(()=> {
					console.log("cancel")
				})
			},
			// 修改
			handleEdit(rowData) {
				this.formData = this.$options.data().formData
				this.formData = Object.assign( {}, this.formData, rowData )
				this.formData.isEdit = 1
				this.config.dialog.show = true
			},
			// 添加
			handleAdd(){
				this.formData = this.$options.data().formData
				this.formData.isEdit = 0
				this.config.dialog.show = true
			},
			// dialog关闭
			checkData(action, done) {
				if( action == 'cancel' ) {
					this.formData = this.$options.data().formData
					return done()
				} 
				if( action == 'confirm' ) {
					this.validator.validate(this.formData).then(()=> {
						this.$request.user.doEdit(this.formData).then(res=>{
							if( res.errorCode != '00000' ){
								return done(false)
							}else{
								this.$toast.success(res.msg)
								this.formData = this.$options.data().formData
								this.fetchData()
								return done()
							}
						})
					}).catch(({ errors, fields })=>{
						this.$toast.fail(errors[0].message)
					})
				}
			}
		},
	}
</script>

<style type="text/css">
	@import '~@/assets/style/card.css';
</style>
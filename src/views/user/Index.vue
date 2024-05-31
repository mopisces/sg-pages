<template>
	<div>
		<vxe-toolbar>
			<template #buttons>
				<van-button type="info" @click="handleAdd()">{{$t('h.addUser')}}</van-button>
			</template>
		</vxe-toolbar>
		<vxe-table ref="user" stripe :height="config.table.height" :data="list" :row-key="true">
			<vxe-table-column :title="$t('h.userName')" field="user" min-width="10"></vxe-table-column>
        	<vxe-table-column :title="$t('h.userPass')" field="pass"  min-width="30"></vxe-table-column>
        	<vxe-table-column :title="$t('h.modify')" min-width="50">
        		<template #default="{ row }">
        			<van-button type="warning" size="mini" @click="handleEdit(row)">{{$t('h.modify')}}</van-button>
        			<van-button type="danger" size="mini" @click="handleStatus(row)">{{$t('h.delete')}}</van-button>
        		</template>
        	</vxe-table-column>
		</vxe-table>
		<van-dialog 
			v-model="show" 
			:title="form.type=='add'?$t('h.addUser'):$t('h.modifyUser')" 
			show-cancel-button 
			close-on-popstate 
			:confirmButtonText="$t('h.confirm')"
			:cancelButtonText="$t('h.cancel')"
			:before-close="checkData"
		>
			<van-field v-model="form.user" error required :label="$t('h.userName')" :disabled="form.edit == 1 ? true : false" />
			<van-field v-model="form.pass" error required :label="$t('h.userPass')" :placeholder="$t('h.enterUserPass')" />
		</van-dialog>
	</div>
</template>
<script>
	import schema from 'async-validator'
	export default {
		data(){
			return {
				config:{
					table:{
						height:0,
					}
				},
				list:[],
				show:false,
				checked:false,
				form:{
					id:'',
					user:'',
					pass:'',
					edit:0,
					type: "add",
				},
				validator:{},
			}
		},
		methods:{
			fetchData(){
				this.$request.user.getList().then(res=>{
					this.list = res.result;
				});
			},
			handleEdit(row){
				this.form.type = 'operate';
				this.show = true;
				this.form = row;
				this.form.edit = 1;
			},
			handleAdd(){
				this.form.type = 'add';
				this.form = this.$options.data().form;
				this.show = true;
			},
			checkData(action, done){
				if( action == 'cancel' ){
					this.form = this.$options.data().form
					return done()
				}
				if( action == 'confirm' ){
					this.validator.validate(this.form).then(()=>{
						this.$request.user.doEdit(this.form).then(res=>{
							if( res.errorCode != '00000' ){
								return done(false)
							}else{
								this.$toast.success(res.msg)
								this.form = this.$options.data().form
								this.fetchData()
								return done()
							}
						});
					}).catch(({ errors, fields })=>{
						this.$toast.fail(errors[0].message)
					})
				}
			},
			handleStatus(row){
				let postData = {
					id:row.id,
					status:0
				}
				this.$request.user.doStatus(postData).then(res=>{
					if( res.errorCode == '00000' ){
						this.$toast.success(res.msg)
						this.$refs.user.remove(row)
					}
				})
			},
			getSgStatisYAxisTitle( cate ){
				if( this.options.chartType != 'sgStatistic' ){
					return ;
				}
				switch( cate ){
					case 'sumArea':
				        return '单位:平方米';
				    	break;
				   	case 'sumLen':
				       return '单位:米';
				    	break;
				    case 'avgSpeed':
				        return '平均车速';
				    	break;
				    case 'sumLoss':
				        return '单位:平方米';
				    	break;
				    case 'sumStops':
				        return '单位:次';
				    	break;
				    default:
				    	return '单位:平方米';
				}
			},
			getSgStatisSeries( cate ){
				if( this.options.chartType != 'sgStatistic' ){
					return ;
				}
				switch( cate ){
					case 'sumArea':
				        return '总面积';
				    	break;
				   	case 'sumLen':
				       return '总长度';
				    	break;
				    case 'avgSpeed':
				        return '平均车速';
				    	break;
				    case 'sumLoss':
				        return '损耗面积';
				    	break;
				    case 'sumStops':
				        return '停次';
				    	break;
				    default:
				    	return '总面积';
				}
			},
			init(){
				this.$store.commit('layout/setTitle', this.$i18n.t('h.userManagement'))
				this.$store.commit('layout/setActive','menu')
				this.fetchData()
				this.validator = new schema({
					user:[{
						required: true, 
						message: this.$i18n.t('h.enterUserName')
					}],
					pass:[{
						required: true, 
						message: this.$i18n.t('h.enterUserPass')
					}],
				})
			},
			setElementSize(){
				this.config.table.height = window.screen.height - 96 - 52
			}
		},
		created(){
			this.init()
		},
		mounted(){
			this.setElementSize()
			window.onresize = () => {
				return (() => {
					this.setElementSize()
				})()
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
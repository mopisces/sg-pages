<template>
	<div>
		<van-dropdown-menu>
			<van-dropdown-item v-model="formData.index" :options="config.dropDown.indexOption" />
			<van-dropdown-item v-model="formData.active" :options="config.dropDown.activeOption" />
		</van-dropdown-menu>
		<vxe-table ref="blms" stripe border :height="height" :data="tableData">
			<vxe-table-column title="糊机备纸" field="糊机备纸" min-width="130"></vxe-table-column>
			<vxe-table-column title="SF1芯纸" field="SF1芯纸" min-width="130"></vxe-table-column>
			<vxe-table-column title="SF1面纸" field="SF1面纸" min-width="130"></vxe-table-column>
			<vxe-table-column title="SF2芯纸" field="SF2芯纸" min-width="130"></vxe-table-column>
			<vxe-table-column title="SF2面纸" field="SF2面纸" min-width="130"></vxe-table-column>
			<vxe-table-column title="SF3芯纸" field="SF3芯纸" min-width="130"></vxe-table-column>
			<vxe-table-column title="SF3面纸" field="SF3面纸" min-width="130"></vxe-table-column>
		</vxe-table>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { DropdownMenu, DropdownItem } from 'vant';
	export default {
		components:{
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem,
		},
		data(){
			return {
				config:{
					dropDown:{
						indexOption  : [],
						activeOption : [
							{
								text  : '按长度',
								value : 0
							},
							{
								text  : '按重量',
								value : 1
							}
						]
					},
					table:{
						columns:[],
						height : 0
					},
					isnew : false
				},
				formData:{
					index  : 0,
					active : 0,
				},
				tableData : []
			}
		},
		methods:{
			getConfig(){
				let self = this;
				this.$request.common.getConfig().then(res=>{
					if( res.errorCode == '00000' ){
						res.result.forEach((item,index)=>{
							self.config.dropDown.indexOption.push({text:item.DB_FLAG,value:index,isnew:item.isnew});
						});
						self.config.isnew = self.config.dropDown.indexOption[0].isnew == 0 ? false : true;
						if( res.weight == 0 ){
							self.config.dropDown.activeOption = [
								{
									text  : '按长度',
									value : 0
								}
							];
						}else{
							self.config.dropDown.activeOption = [
								{
									text  : '按长度',
									value : 0
								},
								{
									text  : '按重量',
									value : 1
								}
							];
						}
					}
				}).then(()=>{
					this.getTableData()
				});
			},
			getTableData(){
				this.tableData = []
				this.$refs.blms.clearScroll().then(()=>{
					this.$request.select.getBlms( this.formData ).then(res=>{
						if( res.errorCode == '00000' ){
							this.tableData = res.result
						}
					})
				})
			},
			setElementSize(){
				this.$store.commit('layout/setHeight', window.screen.height - 96 - 50)
			}
		},
		created(){
			this.$store.commit('layout/setTitle','备料查看')
			this.$store.commit('layout/setActive','blms')
			this.getConfig()
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
			indexChange(){
				return this.formData.index
			},
			activeChange(){
				return this.formData.active
			},
			...mapGetters({
				height:'layout/height'
			}),
		},
		watch:{
			indexChange( newV, oldV ){
				this.config.isnew = this.config.dropDown.indexOption[newV].isnew == 0 ? false : true;
				if( this.config.isnew ){
					this.config.dropDown.activeOption = [
						{
							text  : '按长度',
							value : 0
						},
						{
							text  : '按重量',
							value : 1
						}
					];
				}else{
					this.config.dropDown.activeOption = [
						{
							text  : '按长度',
							value : 0
						}
					];
				}
				this.formData.active = 0
				this.getTableData()
			},
			activeChange( newV, oldV ){
				this.getTableData()
			}
		}
	}
</script>
<template>
	<div>
		<van-dropdown-menu>
			<van-dropdown-item v-model="selectItem" :options="dropDownOption" />
			<van-dropdown-item v-model="formData.active" :options="config.dropDown.activeOption" />
		</van-dropdown-menu>
		<vxe-table ref="blms" stripe border :height="height" :data="tableData">
			<vxe-table-column :title="$t('h.glueMachine')" field="糊机备纸" min-width="130"></vxe-table-column>
			<vxe-table-column :title="'SF1'+$t('h.flutingPaper')" field="SF1芯纸" min-width="130"></vxe-table-column>
			<vxe-table-column :title="'SF1'+$t('h.liningPaper')" field="SF1面纸" min-width="130"></vxe-table-column>
			<vxe-table-column :title="'SF2'+$t('h.flutingPaper')" field="SF2芯纸" min-width="130"></vxe-table-column>
			<vxe-table-column :title="'SF2'+$t('h.liningPaper')" field="SF2面纸" min-width="130"></vxe-table-column>
			<vxe-table-column :title="'SF3'+$t('h.flutingPaper')" field="SF3芯纸" min-width="130"></vxe-table-column>
			<vxe-table-column :title="'SF3'+$t('h.liningPaper')" field="SF3面纸" min-width="130"></vxe-table-column>
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
						indexOption: [],
						activeOption: []
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
				if( this.weight == 0 ){
					this.config.dropDown.activeOption = [
						{
							text: this.$i18n.t('h.sumLen'),
							value: 0
						}
					];
				}else{
					this.config.dropDown.activeOption = [
						{
							text: this.$i18n.t('h.sumLen'),
							value: 0
						},
						{
							text: this.$i18n.t('h.weight'),
							value: 1
						}
					];
				}
				this.getTableData()
			},
			getTableData(){
				this.tableData = []
				this.$request.select.getBlms( { index:this.selectItem, active:this.formData.active } ).then(res=>{
					if( res.errorCode == '00000' ){
						this.tableData = res.result
					}
				})
			},
			setElementSize(){
				this.$store.commit('layout/setHeight', window.screen.height - 96 - 50)
			}
		},
		created(){
			this.$store.commit('layout/setTitle', this.$i18n.t('h.mpm'))
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
			/*indexChange(){
				return this.formData.index
			},*/
			activeChange(){
				return this.formData.active
			},
			...mapGetters({
				height:'layout/height',
				dropDownOption:'layout/dbItem',
				weight:'layout/weight'
			}),
			selectItem:{
				get () {
					return this.$store.state.layout.dropDownIndex
				},
				set (value) {
					this.$store.commit('layout/setDropDownIndex', 	value)
					this.getTableData()
				}
			}
		},
		watch:{
			/*indexChange( newV, oldV ){
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
			},*/
			activeChange( newV, oldV ){
				this.getTableData()
			}
		}
	}
</script>
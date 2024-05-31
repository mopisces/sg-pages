<template>
	<div>
		<van-dropdown-menu active-color="#1aad19">
			<van-dropdown-item v-model="selectItem" :options="dropDownOption" />
		</van-dropdown-menu>
		<div v-if="lineNew==0">
			<vxe-table stripe :height="height" :data="tableData">
	        	<vxe-table-column :title="$t('h.num')" field="sn" min-width="10"></vxe-table-column>
	        	<vxe-table-column :title="$t('h.width')" field="width"  min-width="30"></vxe-table-column>
	        	<vxe-table-column :title="$t('h.prodPaper')" min-width="50" field="paperMaterial">
	        		<template #default="{ row }">
	        			<span v-if=" row.paper "> 
						{{ row.paper }} 
					</span>
					<span v-if=" row.paper_code "> 
						{{ row.paper_code }} 
					</span>
				</span>
	        		</template>
	        	</vxe-table-column>
	        	<vxe-table-column :title="$t('h.fluteType')">
	        		<template #default="{ row }">
				<span> 
					{{ row.flute_type }} 
				</span>
	        		</template>
	        	</vxe-table-column>
	        	<vxe-table-column :title="$t('h.totalLen')" field="total_len" min-width="20"></vxe-table-column>
	        </vxe-table>
        </div>
        <div v-else>
        	<vxe-table 
        		border 
        		resizable 
        		stripe 
        		align="center" 
        		:height="height" 
        		header-cell-class-name="bl-table-cell" 
        		:data="tableData"
        	>
	        	<vxe-table-column :title="$t('h.num')" field="sn" min-width="40"></vxe-table-column>
	        	<vxe-table-column :title="$t('h.width')" field="width" min-width="80"></vxe-table-column>
	        	<vxe-table-column :title="$t('h.fluteType')" field="width" min-width="80"></vxe-table-column>
	        	<vxe-table-column :title="$t('h.prodPaper')" field="width" min-width="100"></vxe-table-column>
	        	<vxe-colgroup field="hj" :title="$t('h.glueMachine')">
	        		<vxe-column field="c" :title="$t('h.paper')" min-width="100"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.totalMeters')" min-width="80"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.weight')" min-width="80"></vxe-column>
	        	</vxe-colgroup>
	        	<vxe-colgroup field="SF1" :title="'SF1'+$t('h.flutingPaper')">
	        		<vxe-column field="c" :title="$t('h.paper')" min-width="100"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.totalMeters')" min-width="80"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.weight')" min-width="80"></vxe-column>
	        	</vxe-colgroup>
	        	<vxe-colgroup field="SF1" :title="'SF1'+$t('h.liningPaper')">
	        		<vxe-column field="c" :title="$t('h.paper')" min-width="100"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.totalMeters')" min-width="80"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.weight')" min-width="80"></vxe-column>
	        	</vxe-colgroup>
	        	<vxe-colgroup field="SF2" :title="'SF2'+$t('h.flutingPaper')">
	        		<vxe-column field="c" :title="$t('h.paper')" min-width="100"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.totalMeters')" min-width="80"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.weight')" min-width="80"></vxe-column>
	        	</vxe-colgroup>
	        	<vxe-colgroup field="SF2" :title="'SF2'+$t('h.liningPaper')">
	        		<vxe-column field="c" :title="$t('h.paper')" min-width="100"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.totalMeters')" min-width="80"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.weight')" min-width="80"></vxe-column>
	        	</vxe-colgroup>
	        	<vxe-colgroup field="SF3" :title="'SF3'+$t('h.flutingPaper')">
	        		<vxe-column field="c" :title="$t('h.paper')" min-width="100"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.totalMeters')" min-width="80"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.weight')" min-width="80"></vxe-column>
	        	</vxe-colgroup>
	        	<vxe-colgroup field="SF3" :title="'SF3'+$t('h.liningPaper')">
	        		<vxe-column field="c" :title="$t('h.paper')" min-width="100"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.totalMeters')" min-width="80"></vxe-column>
	        		<vxe-column field="c" :title="$t('h.weight')" min-width="80"></vxe-column>
	        	</vxe-colgroup>
	        </vxe-table>
        </div>
	</div>
</template>	
<script>
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				config:{
					dropDownOption:[],
					table:{
						columns: [],
					}
				},
				tableData : []
			}
		},
		methods:{
			/*getConfig(){
				let self = this;
				this.$request.common.getConfig().then(res=>{
					if( res.errorCode == '00000' ){
						res.result.forEach((item,index)=>{
							self.config.dropDownOption.push({text:item.DB_FLAG,value:index,isnew:item.isnew});
						});
					}
				}).then(()=>{
					this.getTableData();
				});
			},*/
			getTableData(){
				this.tableData = []
				this.$request.select.getBl( { selectItem:this.selectItem || 0 } ).then(res=>{
					if( res.errorCode == '00000' ){
						this.tableData = res.result
					}
				});
			},
			setElementSize(){
				this.$store.commit('layout/setHeight', window.screen.height - 96 - 50)
			}
		},
		created(){
			this.$store.commit('layout/setTitle', this.$i18n.t('h.mp'))
			this.$store.commit('layout/setActive','bl')
			this.getTableData()
		},
		mounted(){
			this.setElementSize()
			window.onresize = () => {
				return (() => {
					this.setElementSize()
				})()
			}
			console.log(this.dropDownOption)
		},
		updated(){
			
		},
		destroyed(){
			
		},
		computed:{
			/*itemChange(){
				return this.formData.selectItem
			},*/
			...mapGetters({
				height:'layout/height',
				dropDownOption:'layout/dbItem'
			}),
			selectItem:{
				get () {
					return this.$store.state.layout.dropDownIndex
				},
				set (value) {
					this.$store.commit('layout/setDropDownIndex', value)
					this.getTableData()
				}
			},
			lineNew() {
				//return this.dropDownOption[0].isnew || 0
				return 0
			}
		},
		watch:{
			/*itemChange( newV, oldV ){
				this.getTableData()
			}*/
		}
	}
</script>
<style scoped>
	.bl-table-cell {
		padding: 8px 0;
	}
</style>
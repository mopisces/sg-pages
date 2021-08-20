<template>
	<div>
		<van-dropdown-menu active-color="#1aad19">
			<van-dropdown-item v-model="formData.selectItem" :options="config.dropDownOption" />
		</van-dropdown-menu>
		
		<vxe-table stripe :height="height" :data="tableData">
        	<vxe-table-column title="序号" field="sn" min-width="10"></vxe-table-column>
        	<vxe-table-column title="门幅" field="width"  min-width="30"></vxe-table-column>
        	<vxe-table-column title="生产纸质" min-width="50" field="paperMaterial">
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
        	<vxe-table-column title="楞别">
        		<template #default="{ row }">
					<span> 
						{{ row.flute_type }} 
					</span>
        		</template>
        	</vxe-table-column>
        	<vxe-table-column title="总长" field="total_len" min-width="20"></vxe-table-column>
        </vxe-table>
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
						columns : [],
					}
				},
				formData:{
					selectItem : 0
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
							self.config.dropDownOption.push({text:item.DB_FLAG,value:index,isnew:item.isnew});
						});
					}
				}).then(()=>{
					this.getTableData();
				});
			},
			getTableData(){
				let self = this;
				this.$request.select.getBl( this.formData ).then(res=>{
					if( res.errorCode == '00000' ){
						self.tableData = res.result;
					}
				});
			},
			setElementSize(){
				this.$store.commit('layout/setHeight', window.screen.height - 96 - 50)
			}
		},
		created(){
			this.$store.commit('layout/setTitle','备料')
			this.$store.commit('layout/setActive','bl')
			this.getConfig();
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
			itemChange(){
				return this.formData.selectItem;
			},
			...mapGetters({
				height:'layout/height'
			}),
		},
		watch:{
			itemChange( newV, oldV ){
				this.getTableData();
			}
		}
	}
</script>
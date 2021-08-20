<template>
	<div>
		<van-sticky :offset-top="46">
			<van-dropdown-menu>
				<van-dropdown-item v-model="formData.configIndex" :options="config.dropDownOption" />
			</van-dropdown-menu>
		</van-sticky>
		<van-divider :style="{color: '#1989fa', borderColor: '#1989fa', padding: '0 16px'}" v-if="formData.id">
			ID&nbsp;[&nbsp;{{ formData.id }}&nbsp;]
		</van-divider>
		<div style="width:100%;height:5rem;text-align:center;padding-top:5rem">
			<van-slider v-model="formData.sliderValue"  bar-height="5px" :max="10000"/>
		</div>
		<van-cell value="ID对应值">
			<template slot="right-icon">
				<van-stepper v-model="value" integer input-width="42" min="0" max="10000" @change="stepperChange" :disabled-input="true" />
			</template>
		</van-cell>
		<van-row type="flex" justify="space-around">
			<van-col span="10">
				<van-button type="info" style="width:80%;" @click="modifyClick()">修改</van-button>
			</van-col>
			<van-col span="10">
				<van-button type="info" plain  style="width:80%;" @click="clearClick()">清空记录</van-button>
			</van-col>
		</van-row>
		<div style="margin: 20px 0 80px;">
	        <div style="padding: 2px 20px;font-size: 14px;text-align: center;overflow: auto;white-space: nowrap;" v-for="(item,index) in recordList">
	            <span v-if=" !config.isnew ">
	            	id&nbsp;[&nbsp;
	            	<span style="color: #3598dc;">{{item.id}}</span>
	            	&nbsp;]
	            </span>
	            <span style="color: #3598dc;text-decoration: underline;cursor: pointer;" @click="recover(item)">
	            	{{item.before}}
	            </span>
	            <van-icon name="arrow" size="12" color="#3598dc"/>
	            <van-icon name="arrow" size="12" color="#3598dc"/>
	            <van-icon name="arrow" size="12" color="#3598dc"/>
	            &nbsp;<span style="color: #3598dc;">{{item.after}}</span>
	            [&nbsp;<span style="color: #3598dc;">{{item.time}}</span>&nbsp;]
	        </div>
	    </div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				config : {
					dropDownOption : [],
					isnew : false
				},
				formData : {
					configIndex : 0,
					id : '',
					sliderValue : 0
				},
				value       : 0,
				recordList  : []
			}
		},
		methods:{
			getConfig(){
				let self = this;
				this.$request.common.getConfig().then(res=>{
					if( res.errorCode == '00000' ){
						res.result.forEach((item,index)=>{
							self.config.dropDownOption.push({text:item.DB_FLAG,value:index,isnew:item.isnew,updown:item.updown});
						});
					}
				}).then(()=>{
					this.$nextTick(()=>{
						this.config.isnew = this.config.dropDownOption[ this.formData.configIndex ].isnew;
					})
				});
			},
			stepperChange(value,detail){
				this.formData.sliderValue = Number(value);
				if( Number(value) > 10000 ){
					this.formData.sliderValue = 10000;
				}
			},
			modifyClick(){
				this.$dialog.confirm({
					message: '确认要修改吗?'
				}).then(()=>{
					this.changeVal();
				}).catch(()=>{
					this.$dialog.close();
				});
			},
			clearClick(){
				this.$dialog.confirm({
					message: '确认要清空记录吗?'
				}).then(()=>{
					this.clearRecord();
				}).catch(()=>{
					this.$dialog.close();
				});
			},
			recover( item ){
				if( !this.config.isnew ){
					this.formData.id = item.id;
				}
				this.formData.sliderValue = Number(item.before);
			},
			getValue(){
				let self = this;
				this.$request.alter.getValue( this.formData ).then(res=>{
					if( res.errorCode != '00000' ){
						return ;
					}
					if( !self.config.dropDownOption[ self.formData.configIndex ].isnew ){
						self.formData.id = res.result.id;
						self.value = res.result.value;
					}else{
						self.value = res.result;
					}
				});
			},
			changeVal(){
				let self = this;
				this.$request.alter.changeVal( this.formData ).then(res=>{
					if( res.errorCode == '00000' ){
						let record = {
							configIndex:self.formData.configIndex,
							type:'push',
							record:res.result
						};
						self.$store.commit('alter/setAlertValue',record);
					}
				}).then(()=>{
					this.getRecord();
				});
			},
			getRecord(){
				let alterValue = this.$store.state.alter.alterValue;
				if( alterValue && alterValue[this.formData.configIndex] ){
					this.recordList = alterValue[this.formData.configIndex];
				}
			},
			clearRecord(){
				this.$store.commit('alter/setAlertValue',{configIndex:this.formData.configIndex,type:'clear'});
				this.getRecord();
				this.$toast.success('清除成功！');
			},
			init(){
				this.getConfig();
				this.getValue();
				this.getRecord();
			}
		},
		created(){
			this.$store.commit('layout/setTitle','修改')
			this.$store.commit('layout/setActive','menu')
			this.init();
		},
		mounted(){

		},
		updated(){
			
		},
		destroyed(){
			
		},
		computed:{
			sliderChange(){
				return this.formData.sliderValue;
			},
			configIndexChange(){
				return this.formData.configIndex;
			}
		},
		watch:{
			sliderChange( newV, oldV ){
				this.value = Number( newV );
			},
			configIndexChange( newV, oldV ){
				this.recordList = [];
				this.config.isnew = this.config.dropDownOption[ newV ].isnew;
				this.getRecord();
			}
		}
	}
</script>
<template>
	<div>
		<van-dropdown-menu>
			<van-dropdown-item v-model="selectItem" :options="dropDownOption" />
		</van-dropdown-menu>
		<template v-if="config.updown">
			<table class="monitor-info">
				<tr class="monitor-info">
					<td>{{ $t('h.numOfSlitters') }}</td>
					<td>{{ $t('h.prodSlitters') }}</td>
					<td>{{ $t('h.remainingSlitters') }}</td>
					<td>{{ $t('h.badSlitters') }}</td>
				</tr>
				<tr class="monitor-info">
					<td class="top-td" @click="buildChart($t('h.numOfSlitters')+'('+$t('h.upperKinfe')+')',$t('h.kinfeNum'),'qds1')">
						{{ updownInfo.qds1 }}
					</td>
					<td class="top-td" @click="buildChart($t('h.prodSlitters')+'('+$t('h.upperKinfe')+')',$t('h.kinfeNum'),'scds1')">
						{{ updownInfo.scds1 }}
					</td>
					<td class="top-td" @click="buildChart($t('h.remainingSlitters')+'('+$t('h.upperKinfe')+')',$t('h.kinfeNum'),'syds1')">
						{{ updownInfo.syds1 }}
					</td>
					<td class="top-td" @click="buildChart($t('h.badSlitters')+'('+$t('h.upperKinfe')+')',$t('h.kinfeNum'),'blds1')">
						{{ updownInfo.blds1 }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td class="top-td" @click="buildChart($t('h.numOfSlitters')+'('+$t('h.lowerKinfe')+')',$t('h.kinfeNum'),'qds2')">
						{{ updownInfo.qds2 }}
					</td>
					<td class="top-td" @click="buildChart($t('h.prodSlitters')+'('+$t('h.upperKinfe')+')',$t('h.kinfeNum'),'scds2')">
						{{ updownInfo.scds2 }}
					</td>
					<td class="top-td" @click="buildChart($t('h.remainingSlitters')+'('+$t('h.lowerKinfe')+')',$t('h.kinfeNum'),'syds2')">
						{{ updownInfo.syds2 }}
					</td>
					<td class="top-td" @click="buildChart($t('h.badSlitters')+'('+$t('h.lowerKinfe')+')',$t('h.kinfeNum'),'blds2')">
						{{ updownInfo.blds2 }}
					</td>
				</tr>
			</table>
			<table class="monitor-info">
				<tr class="monitor-info">
					<td>{{ $t('h.singleFacer') }}</td>
					<td>{{ $t('h.glueMachine') }}</td>
					<td>SF1</td>
					<td>SF2</td>
					<td>SF3</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.speed') }}</td>
					<td @click="buildChart($t('h.glueMachine') +'/' + $t('speed'),'','huji_cs')">{{ updownInfo.huji.cs }}</td>
					<td @click="buildChart('SF1/' + $t('speed'),'','SF1_cs')">{{ updownInfo.SF1.cs }}</td>
					<td @click="buildChart('SF2/' + $t('speed'),'','SF2_cs')">{{ updownInfo.SF2.cs }}</td>
					<td @click="buildChart('SF3/' + $t('speed'),'','SF3_cs')">{{ updownInfo.SF3.cs }}</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.orders') }}</td>
					<td colspan="2">{{ className }}{{ $t('h.workShift') }}</td>
					<td colspan="2">{{ $t('h.currentOrd') }}</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.totalMeters') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.totalMeters'),$t('h.meter'),'benban_zms')">
						{{ updownInfo.benban.zms }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.totalMeters'),$t('h.meter'),'benbi_zms')">
						{{ updownInfo.benbi.zms }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.production') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.production'),$t('h.meter'),'benban_sc')">
						{{ updownInfo.benban.sc }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.production'),$t('h.meter'),'benbi_sc')">
						{{ updownInfo.benbi.sc }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.remaining') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.remaining'),$t('h.meter'),'benban_sy')">
						{{ updownInfo.benban.sy }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.remaining'),$t('h.meter'),'benbi_sy')">
						{{ updownInfo.benbi.sy }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.bad') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.bad'),$t('h.meter'),'benban_bl')">
						{{ updownInfo.benban.bl }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.bad'),$t('h.meter'),'benbi_bl')">
						{{ updownInfo.benbi.bl }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.avgSpeed') }}(m/min)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/' + $t('h.avgSpeed'),$t('h.meter'),'benban_js')">
						{{ updownInfo.benban.js }}
					</td>
					<td colspan="2"@click="buildChart($t('h.currentOrd')+'/' + $t('h.avgSpeed'),$t('h.meter'),'benbi_js')">
						{{ updownInfo.benbi.js }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.prodSquare') }}(㎡)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.prodSquare'), $t('h.squareMeter'),'benban_scpf')">
						{{ updownInfo.benban.scpf }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.prodSquare'),$t('h.squareMeter'),'benbi_scpf')">
						{{ updownInfo.benbi.scpf }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.numOfStops') }}</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/' + $t('h.numOfStops'),$t('h.numOfTimes'),'benban_tccs')">
						{{ updownInfo.benban.tccs }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/' + $t('h.numOfStops'),$t('h.numOfTimes'),'benbi_tccs')">
						{{ updownInfo.benbi.tccs }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.badSheetRate') }}(%)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.badSheetRate'),'%','benban_hzl')">
						{{ updownInfo.benban.hzl }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.badSheetRate'),'%','benbi_hzl')">
						{{ updownInfo.benbi.hzl }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.trimmingRate') }}(%)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/' + $t('h.trimmingRate'),'%','benban_xbl')">
						{{ updownInfo.benban.xbl }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/' + $t('h.trimmingRate'),'%','benbi_xbl')">
						{{ updownInfo.benbi.xbl }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.productionTime') }}</td>
					<td colspan="2">{{ timeFormat(updownInfo.benban.scsj) }}</td>
					<td colspan="2">{{ timeFormat(updownInfo.benbi.scsj) }}</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.stopTime') }}</td>
					<td colspan="2">{{ timeFormat(updownInfo.benban.tcsj) }}</td>
					<td colspan="2">{{ timeFormat(updownInfo.benbi.tcsj) }}</td>
				</tr>
			</table>
		</template>
		<template v-else>
			<table class="monitor-info">
				<tr class="monitor-info">
					<td>{{ $t('h.numOfSlitters') }}</td>
					<td>{{ $t('h.prodSlitters') }}</td>
					<td>{{ $t('h.remainingSlitters') }}</td>
					<td>{{ $t('h.badSlitters') }}</td>
				</tr>
				<tr class="monitor-info">
					<td class="top-td" @click="buildChart($t('h.numOfSlitters'),$t('h.kinfeNum'),'qds')">
						{{ normalInfo.qds }}
					</td>
					<td class="top-td" @click="buildChart($t('h.prodSlitters'),$t('h.kinfeNum'),'scds')">
						{{ normalInfo.scds }}
					</td>
					<td class="top-td" @click="buildChart($t('h.remainingSlitters'),$t('h.kinfeNum'),'syds')">
						{{ normalInfo.syds }}
					</td>
					<td class="top-td" @click="buildChart($t('h.badSlitters'),$t('h.kinfeNum'),'blds')">
						{{ normalInfo.blds }}
					</td>
				</tr>
				<tr v-if="config.isnew" class="monitor-info">
					<td>{{ $t('h.remaining') }}(m)</td>
					<td>{{ $t('h.prodLen') }}(m)</td>
					<td>{{ $t('h.cutLen') }}(mm)</td>
					<td>{{ $t('h.speed') }}</td>
				</tr>
				<tr v-if="config.isnew" class="monitor-info">
					<td class="top-td" @click="buildChart($t('h.remainingOrd'),$t('h.meter'),'ddsy')">
						{{ normalInfo.ddsy }}
					</td>
					<td class="top-td" @click="buildChart($t('h.prodLen'),$t('h.meter'),'ddc')">
						{{ normalInfo.ddc }}
					</td>
					<td class="top-td" @click="buildChart($t('h.cutLen'),$t('h.mm'),'qc')">
						{{ normalInfo.qc }}
					</td>
					<td class="top-td"  @click="buildChart($t('h.speed'),'','cs')">
						{{ normalInfo.cs }}
					</td>
				</tr>
			</table>
			<table class="monitor-info">
				<tr class="monitor-info">
					<td>{{ $t('h.singleFacer') }}</td>
					<td>{{ $t('h.glueMachine') }}</td>
					<td>SF1</td>
					<td>SF2</td>
					<td>SF3</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.speed') }}</td>
					<td @click="buildChart($t('h.glueMachine')+'/'+$t('h.speed'),'','huji_cs')">{{ normalInfo.huji.cs }}</td>
					<td @click="buildChart('SF1/'+$t('h.speed'),'','SF1_cs')">{{ normalInfo.SF1.cs }}</td>
					<td @click="buildChart('SF2/'+$t('h.speed'),'','SF2_cs')">{{ normalInfo.SF2.cs }}</td>
					<td @click="buildChart('SF3/'+$t('h.speed'),'','SF3_cs')">{{ normalInfo.SF3.cs }}</td>
				</tr>
				<tr v-if="config.isnew" class="monitor-info">
					<td>{{ $t('h.remaining') }}</td>
					<td @click="buildChart($t('h.glueMachine')+'/' + $t('h.remaining'),'','huji_cs')">{{ normalInfo.huji.sy }}</td>
					<td @click="buildChart('SF1/'+$t('h.remaining'),'','SF1_sy')">{{ normalInfo.SF1.sy }}</td>
					<td @click="buildChart('SF2/'+$t('h.remaining'),'','SF2_sy')">{{ normalInfo.SF2.sy }}</td>
					<td @click="buildChart('SF3/'+$t('h.remaining'),'','SF3_sy')">{{ normalInfo.SF3.sy }}</td>
				</tr>
				<tr v-if="config.isnew" class="monitor-info">
					<td>{{ $t('h.accTotal') }}</td>
					<td @click="buildChart($t('h.glueMachine')+'/' + $t('h.accTotal'),'','huji_lj')">{{ normalInfo.huji.lj }}</td>
					<td @click="buildChart('SF1/' + $t('h.accTotal'),'','SF1_lj')">{{ normalInfo.SF1.lj }}</td>
					<td @click="buildChart('SF2/' + $t('h.accTotal'),'','SF2_lj')">{{ normalInfo.SF2.lj }}</td>
					<td @click="buildChart('SF3/' + $t('h.accTotal'),'','SF3_lj')">{{ normalInfo.SF3.lj }}</td>
				</tr>
			<!-- </table>
			<table> -->
				<tr class="monitor-info">
					<td>{{ $t('h.orders') }}</td>
					<td colspan="2">{{ className }}{{ $t('h.workShift') }}</td>
					<td colspan="2">{{ $t('h.currentOrd') }}</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.totalMeters') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.totalMeters'),$t('h.meter'),'benban_zms')">
						{{ normalInfo.benban.zms }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd') + '/'+$t('h.totalMeters'),$t('h.meter'),'benbi_zms')">
						{{ normalInfo.benbi.zms }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.production') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.production'),$t('h.meter'),'benban_sc')">
						{{ normalInfo.benban.sc }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd') + '/'+$t('h.production'),$t('h.meter'),'benbi_sc')">
						{{ normalInfo.benbi.sc }}
					</td>
				</tr>
				<tr class="monitor-info">

					<td>{{ $t('h.remaining') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.remaining'),$t('h.meter'),'benban_sy')">
						{{ normalInfo.benban.sy }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd') + '/'+$t('h.remaining'),$t('h.meter'),'benbi_sy')">
						{{ normalInfo.benbi.sy }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.bad') }}(m)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.bad'),$t('h.meter'),'benban_bl')">
						{{ normalInfo.benban.bl }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd') + '/'+$t('h.bad'),$t('h.meter'),'benbi_bl')">
						{{ normalInfo.benbi.bl }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.prodSquare') }}(㎡)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.prodSquare'),$t('h.squareMeter'),'benban_scpf')">
						{{ normalInfo.benban.scpf }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd') + '/'+$t('h.prodSquare'),$t('h.squareMeter'),'benbi_scpf')">
						{{ normalInfo.benbi.scpf }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.badSheetRate') }}(%)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.badSheetRate'),'%','benban_hzl')">
						{{ normalInfo.benban.hzl }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.badSheetRate'),'%','benbi_hzl')">
						{{ normalInfo.benbi.hzl }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.trimmingRate') }}(%)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/' + $t('h.trimmingRate'),'%','benban_xbl')">
						{{ normalInfo.benban.xbl }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/' + $t('h.trimmingRate'),'%','benbi_xbl')">
						{{ normalInfo.benbi.xbl }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.avgSpeed') }}(m/min)</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.avgSpeed'),$t('h.meter')+'/'+$t('h.minute'),'benban_js')">
						{{ normalInfo.benban.js }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.avgSpeed'),$t('h.meter')+'/'+$t('h.minute'),'benbi_js')">
						{{ normalInfo.benbi.js }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.numOfStops') }}</td>
					<td colspan="2" @click="buildChart('？'+$t('h.workShift')+'/'+$t('h.numOfStops'),$t('h.numOfTimes'),'benban_tccs')">
						{{ normalInfo.benban.tccs }}
					</td>
					<td colspan="2" @click="buildChart($t('h.currentOrd')+'/'+$t('h.numOfStops'),$t('h.numOfTimes'),'benbi_tccs')">
						{{ normalInfo.benbi.tccs }}
					</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.productionTime') }}</td>
					<td colspan="2">{{ timeFormat(normalInfo.benban.scsj) }}</td>
					<td colspan="2">{{ timeFormat(normalInfo.benbi.scsj) }}</td>
				</tr>
				<tr class="monitor-info">
					<td>{{ $t('h.stopTime') }}</td>
					<td colspan="2">{{ timeFormat(normalInfo.benban.tcsj) }}</td>
					<td colspan="2">{{ timeFormat(normalInfo.benbi.tcsj) }}</td>
				</tr>
			</table>
		</template>
		<div>
			<div class="highcharts-container" id="chart-container" ></div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { secondsFormat } from '@/utils';
	import Highcharts from 'highcharts/highstock';
	import io from 'socket.io-client';
	export default {
		data(){
			return {
				config:{
					updown : true,
					isnew  : true,
					notice : {
						text : '',
						avaliable : false
					},
					chart:{
						show : false,
						keyName : ''
					}
				},
				formData:{
					/*activeItem : 0*/
				},
				socket:{},  //socket链接对象
				className:'-',
				updownInfo:{
					'qds1'  : 0,
	                'scds1' : 0,
	                'syds1' : 0,
	                'ddsy1' : 0,
	                'blds1' : 0,
	                'ddc1'  : 0,
	                'qc1'   : 0,
	                'qds2'  : 0,
	                'scds2' : 0,
	                'syds2' : 0,
	                'ddsy2' : 0,
	                'blds2' : 0,
	                'ddc2'  : 0,
	                'qc2'   : 0,
	                'xs'    : 0,
	                'benban': {
	                    'zms'   : 0,
	                    'sc'    : 0,
	                    'sy'    : 0,
	                    'bl'    : 0,
	                    'js'    : 0,
	                    'scpf'  : 0,
	                    'scsj'  : 0,
	                    'tcsj'  : 0,
	                    'tccs'  : 0,
	                    'scjpf' : 0,
	                    'hzl'   : 0,
	                    'xbl'   : 0
	                },
	                'benbi': {
	                    'zms'   : 0,
	                    'sc'    : 0,
	                    'sy'    : 0,
	                    'bl'    : 0,
	                    'js'    : 0,
	                    'scpf'  : 0,
	                    'scsj'  : 0,
	                    'tcsj'  : 0,
	                    'tccs'  : 0,
	                    'scjpf' : 0,
	                    'hzl'   : 0,
	                    'xbl'   : 0
	                },
	                'huji' : {
	                	'cs' : 0
	                },
	                'SF1' : {
	                	'cs' : 0
	                },
	                'SF2' : {
	                	'cs' : 0
	                },
	                'SF3' : {
	                	'cs' : 0
	                }
				}, //上下刀数据
				normalInfo:{
					'qds'  : 0,
	                'scds' : 0,
	                'syds' : 0,
	                'ddsy' : 0,
	                'blds' : 0,
	                'ddc'  : 0,
	                'qc'   : 0,
	                'cs'   : 0,
	                'benban': {
	                    'zms'   : 0,
	                    'sc'    : 0,
	                    'sy'    : 0,
	                    'bl'    : 0,
	                    'js'    : 0,
	                    'scpf'  : 0,
	                    'scsj'  : 0,
	                    'tcsj'  : 0,
	                    'tccs'  : 0,
	                    'scjpf' : 0,
	                    'hzl'   : 0,
	                    'xbl'   : 0
	                },
	                'benbi': {
	                    'zms'   : 0,
	                    'sc'    : 0,
	                    'sy'    : 0,
	                    'bl'    : 0,
	                    'js'    : 0,
	                    'scpf'  : 0,
	                    'scsj'  : 0,
	                    'tcsj'  : 0,
	                    'tccs'  : 0,
	                    'scjpf' : 0,
	                    'hzl'   : 0,
	                    'xbl'   : 0
	                },
	                'huji': {
	                    'cs' : 0,
	                    'sy' : 0,
	                    'lj' : 0
	                },
	                'SF1': {
	                    'cs' : 0,
	                    'sy' : 0,
	                    'lj' : 0
	                },
	                'SF2': {
	                    'cs' : 0,
	                    'sy' : 0,
	                    'lj' : 0
	                },
	                'SF3': {
	                    'cs' : 0,
	                    'sy' : 0,
	                    'lj' : 0
	                }
				},  //非上下刀数据
				chart:{}
			}
		},
		methods:{
			getConfig(){
				/*let self = this;
				this.$request.common.getConfig().then(res=>{
					if( res.errorCode == '00000' ){
						res.result.forEach((item,index)=>{
							self.config.dropDownOption.push({text:item.DB_FLAG,value:index,isnew:item.isnew,updown:item.updown,socketUrl:item.socketio.domain});
						});
					}
				}).then(()=>{
					this.$nextTick(()=>{
						this.config.updown = this.config.dropDownOption[ this.selectItem ].updown;
						this.config.isnew = this.config.dropDownOption[ this.selectItem ].isnew;
						this.getSocket(this.config.dropDownOption[ this.selectItem ].socketUrl,this.selectItem)
					});
				});;*/
				this.config.updown = this.dropDownOption[ this.selectItem ].updown
				this.config.isnew = this.dropDownOption[ this.selectItem ].isnew
				this.getSocket(this.dropDownOption[ this.selectItem ].socketUrl,this.selectItem)
			},
			getSocket( socketUrl, index ){
				this.clearData()

				this.socket = io(socketUrl,{
					timeout:3000
				});

				this.socket.on('connect',()=>{
					this.config.notice.text = this.$i18n.t('h.socketConn');
				});
				this.socket.on('AnalyUdpData' + index, (data)=>{
					if( data == 10060 ){
						this.config.notice.text = this.$i18n.t('h.udpErr');
					}else{
						this.config.notice.text = this.$i18n.t('h.monitorSuccess');
						if( !JSON.parse(data).data || JSON.parse(data).ret == 0){
							this.config.notice.text = this.$i18n.t('h.dataLenErr');
						}
						let udpData = JSON.parse(data).data
						this.className = udpData.class
						if( this.config.updown ){
							Object.assign(this.updownInfo, udpData)
						}else{
							Object.assign(this.normalInfo, udpData)
						}
						if( !this.config.chart.show ) return
						if( this.config.updown ){
							if( this.config.chart.keyName.indexOf('_') === -1 ){
								this.chart.series[0].addPoint([(new Date()).getTime(),this.updownInfo[this.config.chart.keyName]],true,true)
							}else{
								let keyArr = this.config.chart.keyName.split('_');
								this.chart.series[0].addPoint([(new Date()).getTime(),this.updownInfo[keyArr[0]][keyArr[1]]],true,true)
							}
						}else{
							if( this.config.chart.keyName.indexOf('_') === -1 ){
								this.chart.series[0].addPoint([(new Date()).getTime(),this.normalInfo[this.config.chart.keyName]],true,true)
							}else{
								let keyArr = this.config.chart.keyName.split('_');
								this.chart.series[0].addPoint([(new Date()).getTime(),this.normalInfo[keyArr[0]][keyArr[1]]],true,true)
							}
						}
					}
				});
				this.socket.on('connect_error',(error)=>{
					this.config.notice.text = this.$i18n.t('h.socketErr')
				});
				this.socket.on('connect_timeout',(timeout)=>{
					this.config.notice.text = this.$i18n.t('h.socketTimeOut')
				});
				this.socket.on('error',(error)=>{
					this.config.notice.text = this.$i18n.t('h.connErr')
				});
				this.socket.on('disconnect',(error)=>{
					this.config.notice.text = 'disconnect'
				});
			},
			buildChart( xTitle, yTitle, keyName ){
				let className = '';
				if( this.config.updown ){
					className = this.updownInfo.class
				}else{
					className = this.normalInfo.class
				}
				this.chart = new Highcharts.chart('chart-container',{
					chart:{
						type        : 'spline',
						animation   : Highcharts.svg,
						marginRight : 10,
					},
					credits:{
						enabled : false
					},
					title : {
						text : xTitle.replace(/？/g,className)
					},
					xAxis:{
						type : 'datetime',
						tickPixelInterval : 150,
						visible : true
					},
					yAxis:{
						title : {
							text : yTitle
						},
						plotLines:[{
							value: 0,
                            width: 1,
                            color: '#808080'
						}],
						visible : true
					},
					tooltip:{
						formatter : function() {
							return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2)
						}
					},
					legend:{
						enabled : false
					},
					series:[{
						name : xTitle.replace(/？/g,className),
						data : (function(){
							var data = [],
								i;
							for (i = -10; i <= 0; i++ ) {
								data.push({
									x: (new Date()).getTime() + i * 1000,
									y: 0
								})
							}
							return data
						}())
					}]
				});
				
				this.config.chart.keyName = keyName;
				this.config.chart.show    = true;
			},
			selectItemChange( idx ){
				this.config.updown = this.dropDownOption[ idx ].updown
				this.config.isnew  = this.dropDownOption[ idx ].isnew
				if( this.config.chart.show ){
					this.chart.setSize(undefined,1)
				}
				this.socket.close()
				this.config.notice.text = ''
				this.getSocket(this.dropDownOption[ idx ].socketUrl, idx)
			},
			timeFormat( seconds ){
				return secondsFormat( seconds )
			},
			clearData(){
				this.updownInfo = this.$options.data().updownInfo
				this.normalInfo = this.$options.data().normalInfo
			},
			test(){
				let socket = io('127.0.0.1:40000',{
					timeout:3000
				});

				socket.on('SCLX', (data)=>{
					console.log(data)
				});

				socket.on('XLK', (data)=>{
					console.log(data)
				});
			}
		},
		created(){
			this.$store.commit('layout/setTitle', this.$i18n.t('h.monitoring'))
			this.$store.commit('layout/setActive','monitor')
			this.getConfig()
			this.test()
		},
		mounted(){
			Highcharts.setOptions({
				global:{
					useUTC:false
				}
			});
		},
		updated(){
			
		},
		destroyed(){
			this.socket.close()
		},
		computed:{
			...mapGetters({
				dropDownOption:'layout/dbItem'
			}),
			selectItem:{
				get () {
					return this.$store.state.layout.dropDownIndex
				},
				set (value) {
					this.$store.commit('layout/setDropDownIndex', value)
					this.selectItemChange( value )
				}
			}
		},
	}
</script>
<style>
	@import '~@/assets/style/monitor.css';
</style>
<!-- 生管监控页面数据 -->
<template>
	<div class="monitor-container">
		<van-dropdown-menu>
			<van-dropdown-item v-model="selectIndex" :options="dropDownOption" />
		</van-dropdown-menu>
		<card ref="header" :is-shadow="true" :border="false">
			<div class="card-body-container">
				<div class="card-body-item card-body-item-25 card-body-item-center">
					<span>{{ $t('h.numOfSlitters') }}</span>
				</div>
				<div class="card-body-item card-body-item-25 card-body-item-center">
					<span>{{ $t('h.prodSlitters') }}</span>
				</div>
				<div class="card-body-item card-body-item-25 card-body-item-center">
					<span>{{ $t('h.remainingSlitters') }}</span>
				</div>
				<div class="card-body-item card-body-item-25 card-body-item-center">
					<span>{{ $t('h.badSlitters') }}</span>
				</div>

				<div class="card-body-item card-body-item-25 card-body-item-center">
					<div class="card-body-item-value" >
						<div>
							<span class="blue-color">{{ lineInfo.qds }}</span>
						</div>
						<div v-if="selectItem&&selectItem.updown">
							<span class="blue-color">{{ lineInfo.qds2 }}</span>
						</div>
					</div>
				</div>
				<div class="card-body-item card-body-item-25 card-body-item-center">
					<div class="card-body-item-value" >
						<div>
							<span class="blue-color">{{ lineInfo.scds }}</span>
						</div>
						<div v-if="selectItem&&selectItem.updown">
							<span class="blue-color">{{ lineInfo.scds2 }}</span>
						</div>
					</div>
				</div>
				<div class="card-body-item card-body-item-25 card-body-item-center">
					<div class="card-body-item-value" >
						<div>
							<span class="blue-color">{{ lineInfo.syds }}</span>
						</div>
						<div v-if="selectItem&&selectItem.updown">
							<span class="blue-color">{{ lineInfo.syds2 }}</span>
						</div>
					</div>
				</div>
				<div class="card-body-item card-body-item-25 card-body-item-center">
					<div class="card-body-item-value" >
						<div>
							<span class="blue-color">{{ lineInfo.blds }}</span>
						</div>
						<div v-if="selectItem&&selectItem.updown">
							<span class="blue-color">{{ lineInfo.blds2 }}</span>
						</div>
					</div>
				</div>
				<!-- 新线且非上下刀 -->
				<template v-if="selectItem&& selectItem.isnew&&!selectItem.updown">
					<div class="card-body-item card-body-item-25 card-body-item-center">
						<span>{{ $t('h.remaining') }}</span>
					</div>
					<div class="card-body-item card-body-item-25 card-body-item-center">
						<span>{{ $t('h.prodLen') }}</span>
					</div>
					<div class="card-body-item card-body-item-25 card-body-item-center">
						<span>{{ $t('h.cutLen') }}</span>
					</div>
					<div class="card-body-item card-body-item-25 card-body-item-center">
						<span>{{ $t('h.speed') }}</span>
					</div>

					<div class="card-body-item card-body-item-25 card-body-item-center">
						<div class="card-body-item-value">
							<div>
								<span class="blue-color">{{ lineInfo.ddsy }}</span>
							</div>
						</div>
					</div>
					<div class="card-body-item card-body-item-25 card-body-item-center">
						<div class="card-body-item-value">
							<div>
								<span class="blue-color">{{ lineInfo.ddc }}</span>
							</div>
						</div>
					</div>
					<div class="card-body-item card-body-item-25 card-body-item-center">
						<div class="card-body-item-value">
							<div>
								<span class="blue-color">{{ lineInfo.qc }}</span>
							</div>
						</div>
					</div>
					<div class="card-body-item card-body-item-25 card-body-item-center">
						<div class="card-body-item-value">
							<div>
								<span class="blue-color">{{ lineInfo.cs }}</span>
							</div>
						</div>
					</div>
				</template>
			</div>
		</card>
		<!-- 坑机信息 -->
		<card 
			ref="kengji"
			:is-shadow="true" 
			:border="false"
		>
			<!-- 非上下刀且为新线 -->
			<div class="card-body-container">
				<div class="card-body-item card-body-item-100">
					<div class="card-body-item-left"></div>
					<div class="card-body-item-right">
						<div class="card-body-item card-body-item-25 card-body-item-center">
							{{ $t('h.glueMachine') }}
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							SF1
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							SF2
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							SF3
						</div>
					</div>
				</div>

				<div class="card-body-item card-body-item-100">
					<div class="card-body-item-left">{{ $t('h.speed') }}</div>
					<div class="card-body-item-right">
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.huji.cs }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF1.cs }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF2.cs }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF3.cs }}</span>
						</div>
					</div>
				</div>

				<div v-if="selectItem&&!selectItem.updown && selectItem.isnew" class="card-body-item card-body-item-100">
					<div class="card-body-item-left">{{ $t('h.remaining') }}</div>
					<div class="card-body-item-right">
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.huji.sy }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF1.sy }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF2.sy }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF3.sy }}</span>
						</div>
					</div>
				</div>

				<div v-if="selectItem&&!selectItem.updown && selectItem.isnew" class="card-body-item card-body-item-100">
					<div class="card-body-item-left">{{ $t('h.accTotal') }}</div>
					<div class="card-body-item-right">
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.huji.lj }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF1.lj }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF2.lj }}</span>
						</div>
						<div class="card-body-item card-body-item-25 card-body-item-center">
							<span>{{ lineInfo.SF3.lj }}</span>
						</div>
					</div>
				</div>
			</div>
		</card>
		<!-- 订单信息 -->
		<card 
			ref="orderInfo" 
			:is-shadow="true" 
			:border="false"
		>
			<div class="card-body-container">
				<div class="card-body-item card-body-item-100">
					<div v-if="selectItem&&selectItem.isnew" 
						class="card-body-item card-body-item-center"
						:class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'"
					>
						{{ $t('h.totalArea') }}
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						{{ $t('h.totalMeters') }}(m)
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						{{ $t('h.production') }}(m)
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						{{ $t('h.remaining') }}(m)
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						{{ $t('h.bad') }}(m)
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						{{ $t('h.prodSquare') }}(㎡)
					</div>
				</div>

				<div class="card-body-item card-body-item-100">
					<div 
						v-if="selectItem&&selectItem.isnew" 
						class="card-body-item card-body-item-center"
						:class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'"
					>
						<span class="blue-color">{{ lineInfo.benban.zmj }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span class="blue-color">{{ lineInfo.benban.zms }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span class="blue-color">{{ lineInfo.benban.sc }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span class="blue-color">{{ lineInfo.benban.sy }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span class="blue-color">{{ lineInfo.benban.bl }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span class="blue-color">{{ lineInfo.benban.scpf }}</span>
					</div>
				</div>

				<div class="card-body-item card-body-item-100">
					<div v-if="selectItem&&selectItem.isnew" class="card-body-item card-body-item-16 card-body-item-center">
						<span>{{ lineInfo.benbi.zmj }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span>{{ lineInfo.benbi.zms }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span>{{ lineInfo.benbi.sc }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span>{{ lineInfo.benbi.sy }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span>{{ lineInfo.benbi.bl }}</span>
					</div>
					<div class="card-body-item card-body-item-center" :class="selectItem&&selectItem.isnew?'card-body-item-16':'card-body-item-20'">
						<span>{{ lineInfo.benbi.scpf }}</span>
					</div>
				</div>

				<div class="card-body-item card-body-item-100">
					<div class="card-body-item card-body-item-16 card-body-item-center">
						{{ $t('h.badSheetRate') }}
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						{{ $t('h.trimmingRate') }}
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						{{ $t('h.avgSpeed') }}
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						{{ $t('h.productionTime') }}
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						{{ $t('h.stopTime') }}
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						{{ $t('h.color') }}
					</div>
				</div>
				
				<div class="card-body-item card-body-item-100">
					
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span class="blue-color">{{ lineInfo.benban.hzl }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span class="blue-color">{{ lineInfo.benban.xbl }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span class="blue-color">{{ lineInfo.benban.js }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span class="blue-color">{{ timeFormat(lineInfo.benban.scsj) }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span class="blue-color">{{ timeFormat(lineInfo.benban.tcsj) }}</span>
					</div>

					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span class="blue-color">{{ $t('h.currentClass') }}</span>
					</div>
				</div>
				<div class="card-body-item card-body-item-100">
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span>{{ lineInfo.benbi.hzl }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span>{{ lineInfo.benbi.xbl }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span>{{ lineInfo.benbi.js }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span>{{ timeFormat(lineInfo.benbi.scsj) }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span>{{ timeFormat(lineInfo.benbi.tcsj) }}</span>
					</div>
					<div class="card-body-item card-body-item-16 card-body-item-center">
						<span>{{ $t('h.currentOrd') }}</span>
					</div>
				</div>
			</div>
		</card>
		<!-- 底部表格 -->
		<div class="table-container">

			<vxe-table 
				:cell-style="cellStyle" 
				:header-cell-style="headerCellStyle" 
				stripe 
				border
				:height="config.table.height" 
				:data="config.table.tableData" 
				:show-overflow="true"
				:row-config="{height: 14}"
			>
				<vxe-table-column :title="$t('h.sn')" field="sn" min-width="50" fixed="left"></vxe-table-column>
				<vxe-table-column :title="$t('h.orderNumber')" field="order_number" min-width="120" fixed="left"></vxe-table-column>
				<vxe-table-column v-if="userRoot!= 2" :title="$t('h.customerName')" field="customer_name" min-width="180"></vxe-table-column>
				<vxe-table-column :title="$t('h.width')" field="width" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.paperCode')" field="paper_code" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.fluteType')" field="flute_type" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.pressingType')" field="pressing_type" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.paperLen')" field="paper_len" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.paperW')" field="paper_w" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.totalLen')" field="total_len" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.slittingData')" field="slitting_data" min-width="180"></vxe-table-column>
				<vxe-table-column :title="$t('h.slitting')+'1'" field="slitting" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.trimming')" field="trimming" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.quantity')" field="quantity" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.bundlingQty')" field="bundling_qty" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.stackingQty')" field="stacking_qty" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.maxSpeed')" field="max_speed" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.cruisingSpeed')" field="cruising_speed" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.remark')" field="remark" min-width="250"></vxe-table-column>
				<vxe-table-column :title="$t('h.slitting')+'2'" field="slitting2" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.slittingData')+'2'" field="slitting_data2" min-width="180"></vxe-table-column>
				<vxe-table-column :title="$t('h.cuttingQty')" field="cutting_qty" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.slitting')+'3'" field="slitting3" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.slittingData')+'3'" field="slitting_data3" min-width="180"></vxe-table-column>
				<vxe-table-column :title="$t('h.askDate')" field="ask_date" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.ordPaperCode')" field="ord_paper_code" min-width="150"></vxe-table-column>
				<vxe-table-column :title="$t('h.calcOrdArea')" field="calc_ord_area" min-width="150"></vxe-table-column>
				<vxe-table-column :title="$t('h.colorCode')" field="color_code" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.productName')" field="product_name" min-width="150"></vxe-table-column>
				<vxe-table-column :title="$t('h.area')" field="area" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.startTime')" field="start_time" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.endTime')" field="calc_end_time" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.printCount')" field="print_count" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.lenAddUp')" field="len_add_up" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.areaAddUp')" field="area_add_up" min-width="100"></vxe-table-column>
				<vxe-table-column :title="$t('h.orderSource')" field="order_source" min-width="130"></vxe-table-column>
			</vxe-table>
		</div>
	</div>
</template>

<script>
	// io库
	import io from 'socket.io-client'
	// 自定义方法
	import { secondsFormat, getUserInfo } from '@/utils'
	// 辅助函数
	import { mapGetters } from 'vuex'
	// 卡片组件
	import Card from '@/components/Card.vue'

	export default {
		components: {
			Card
		},
		computed: {
			...mapGetters({
				dropDownOption:'layout/dbItem'
			}),
			selectIndex:{
				get () {
					return this.$store.state.layout.dropDownIndex
				},
				set (value) {
					this.$store.commit('layout/setDropDownIndex', value)
					this.selectItemChange( value )
				}
			},
			selectItem() {
				return this.dropDownOption[this.selectIndex] || null
			},
			userRoot() {
				try{
					const userInfo = getUserInfo()
					return userInfo.root
				}catch(err){
					return null
				}
			}
		},
		data() {
			return {
				config: {
					dialog:{
						show:false,
						message:'',
						title:'',
					},
					table: {
						height: 0,
						tableData: [],
					},
					tips: "本班--蓝色;本笔--黑色"
				},
				/* 产线信息 */
				lineInfo: {
					// 班次
					class: null,
					// 切刀数
					qds: null,
					// 切刀数(上下刀)
					qds2: null,
					// 生产刀数
					scds: null,
					// 生产刀数(上下刀)
					scds2: null,
					// 剩余刀数
					syds: null,
					// 剩余刀数(上下刀)
					syds2: null,
					// 不良刀数
					blds: null,
					// 不良刀数(上下刀)
					blds2: null,
					// 订单剩余
					ddsy: null,
					// 订单长
					ddc: null,
					// 切长
					qc: null, 
					// 车速
					cs: null,
					// 糊机
					huji: {
						// 车速
						cs: null,
						// 剩余
						sy: null,
						// 累计
						lj: null
					},
					// SF1
					SF1: {
						// 车速
						cs: null,
						// 剩余
						sy: null,
						// 累计
						lj: null
					},
					// SF2
					SF2: {
						// 车速
						cs: null,
						// 剩余
						sy: null,
						// 累计
						lj: null
					},
					// SF3
					SF3: {
						// 车速
						cs: null,
						// 剩余
						sy: null,
						// 累计
						lj: null
					},
					// 本班
					benban: {
						// 总米数
						zms: null,
						// 总面积
						zmj: null,
						// 生产(m)
						sc: null,
						// 剩余(m)
						sy: null,
						// 不良(m)
						bl: null,
						// 均速
						js: null,
						// 生产平方
						scpf: null,
						// 生产时间
						scsj: null,
						// 停车时间
						tcsj: null,
						// 修编率
						xbl: null,
						// 坏纸率
						hzl: null,
						// 停车次数
						tccs: null,
					},
					// 本笔
					benbi: {
						// 总米数
						zms: null,
						// 总面积
						zmj: null,
						// 生产(m)
						sc: null,
						// 剩余(m)
						sy: null,
						// 不良(m)
						bl: null,
						// 均速
						js: null,
						// 生产平方
						scpf: null,
						// 生产时间
						scsj: null,
						// 停车时间
						tcsj: null,
						// 修编率
						xbl: null,
						// 坏纸率
						hzl: null,
						// 停车次数
						tccs: null,
					}
				},
			}
		},
		mounted() {
			this.$store.commit("layout/setTitle", this.$i18n.t("h.monitoring"))
			this.$store.commit("layout/setActive", "monitor")
			this.getSocket()
			try{
				let userInfo = getUserInfo()
				this.root = userInfo.root
			}catch(err){
				this.root = null
			}
			this.setTableHeight()
			window.addEventListener("resize", this.setTableHeight)
		},
		beforeDestroy() {
			window.removeEventListener("resize", this.setTableHeight)
		},
		methods: {
			setTableHeight() {
				this.$nextTick(() => {
					const pageHeight = window.innerHeight

					const header = this.$refs.header
					const kengji = this.$refs.kengji
					const orderInfo = this.$refs.orderInfo

					let headerHeight = 0
					let kengjiHeight = 0
					let orderInfoHeight = 0
					if (header.$el) {
						headerHeight = header.$el.offsetHeight
					}
					if(kengji.$el) {
						kengjiHeight = kengji.$el.offsetHeight
					}
					if(orderInfo.$el) {
						orderInfoHeight = orderInfo.$el.offsetHeight
					}
					const marginPadding = 265

					this.config.table.height = pageHeight - headerHeight - kengjiHeight - orderInfoHeight - marginPadding
					
					const minTableHeight = 125

					this.config.table.height = Math.max(this.config.table.height, minTableHeight)

				})
			},
			/* 时间格式 */
			timeFormat( seconds ){
				return secondsFormat( seconds )
			},
			/*生产线切换*/
			selectItemChange() {
				if( this.socket ) {
					this.lineInfo = this.$options.data().lineInfo
					this.socket.close()
				}
				this.getSocket()
			},
			/*获取广播数据*/
			getSocket() {
				try{
					this.socket = io(this.selectItem.socketUrl,{
						timeout:3000
					})
					this.socket.on("connect",()=>{
						console.log("connect success")
					})

					// 获取生管广播数据
					this.socket.on("AnalyUdpData"+this.selectIndex, (data)=>{
						const udpRes = JSON.parse(data)
						if( udpRes.ret == 1 ) {
							this.lineInfo = udpRes.data
						}
					})
					// 获取订单表广播数据
					this.socket.on("MyOrderUdp"+this.selectIndex, (data)=>{
						this.config.table.tableData = this.$options.data().config.table.tableData
						const udpRes = JSON.parse(data)
						if( udpRes.ret == 1 ) {
							this.config.table.tableData = udpRes.data
						}
					})

					this.socket.on("disconnect", ()=> {
						console.log("disconnect")
					})
				} catch(e) {
					console.log(e)
				}
			},
			headerCellStyle({ column }) {
				return {
					padding: "2px 0"
				}
			},
			cellStyle({ row, rowIndex, column }) {
				if( column.property == "total_len" ) {
					return {
						padding: "0",
						backgroundColor: "#2dededc7",
						color: "#000",
					}
				}
				if( rowIndex == 0 ) {
					return {
						padding: "0",
						backgroundColor: "red",
						color: "#fff",
					}
				}
				return {
					padding: "0",
				}
			},
		}
	}
</script>

<style scoped>
	@import '~@/assets/style/card.css';

	.vxe-table--render-default .vxe-body--column.col--ellipsis, .vxe-table--render-default.vxe-editable .vxe-body--column, .vxe-table--render-default .vxe-footer--column.col--ellipsis, .vxe-table--render-default .vxe-header--column.col--ellipsis {
		height: 14px !important;
	}

	.van-dropdown-menu {
		height:25px !important;
	}

	.card-body-item-center {
		justify-content: center; /* 水平居中 */
	}

	.card-body-item-25{
	    width: 25%;
	}

	.card-body-item-value {
		flex: 2;
		display: flex; 
		flex-direction: column;
		box-sizing: border-box; 
		align-items: center;
	}

	.card-body-item-left {
		flex: 0 0 30px;
	}

	.card-body-item-right {
		display: flex;
		flex: 1; 
	}

	.table-container {
		padding: 0px 10px;
	}

	.monitor-container {
		overflow: hidden;
	}

	.tip-container {
		font-size: 12px;
		line-height: 12px;
		text-align: center;
		margin: 0 10px;
	}
</style>
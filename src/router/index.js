import store from '@/store'
/*登录*/
const login = () => import('@/views/login/Index')
/*布局*/
const layout = () => import('@/components/layouts/Index')
/*404*/
const err404 = () => import('@/views/404')
/*生管监控界面*/
const monitor = ()=>import('@/views/monitor/Index')
/*备料*/
const bl = ()=>import('@/views/select/BL')
/*备料米数*/
const blms = () => import('@/views/select/BLMS')
/*生产订单*/
const scdd = () => import('@/views/select/SCDD')
/*完工订单*/
const wgdd = () => import('@/views/select/WGDD')
/*菜单*/
const menu = () => import('@/views/menu/Index')
/*用户*/
const user = () => import('@/views/user/Index')
/*生产进度*/
const statis = () => import('@/views/statis/Index')
/*修改*/
const alter = () => import('@/views/alter/Index')

Vue.use(VueRouter)

let routes = [
	{
        path : '/login',
        component: login,
        meta:{ title: '登录' }
    },
    {
    	path:'/sg',
    	component:layout,
    	meta:{ title:'生管布局' },
        children:[
            {
                path : 'monitor',
                meta : { title: '生产线数据' },
                component: monitor,
            },
            {
                path : 'bl',
                meta : { title: '备料' },
                component: bl,
            },
            {
                path : 'blms',
                meta : { title: '备料米数' },
                component: blms,
            },
            {
                path : 'scdd',
                meta : { title: '生产订单' },
                component: scdd,
            },
            {
                path : 'wgdd',
                meta : { title: '完工订单' },
                component: wgdd,
            },
            {
                path : 'menu',
                meta : { title: '菜单' },
                component: menu,
            },
            {
                path : 'user',
                meta : { title: '用户管理' },
                component: user,
            },
            {
                path : 'statis',
                meta : { title: '生产进度' },
                component: statis,
            },
            {
                path : 'alter',
                meta : { title: '修改' },
                component: alter,
            }

        ]
    },
    {
        path:'*',
        component:err404,
        meta:{ title:'您访问的页面不存在' }
    }
]

let router = new VueRouter({
	routes: routes,
    mode: 'history'
})

router.beforeResolve(async (to, from, next) => {
    try{
        if( store.state.layout.dbItem.length == 0 ) await store.dispatch('layout/getSelectConfig')
    }catch(err){
        console.log(err)
    }
    next()
})

export default router
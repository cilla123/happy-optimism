import AC from '../components/AsyncComponent'

export default [
    {
        name: '首页',
        icon: 'home',
        path: '/',
        component: AC(() => import('../pages/Index'))
    },
    {
        name: '色彩',
        icon: 'color',
        path: '/colors',
        component: AC(() => import('../pages/ColorPage'))
    },
    {
        name: '按钮',
        icon: 'button',
        path: '/button',
        component: AC(() => import('../pages/ButtonPage'))
    },
]
import Loadable from '../components/Loadable'

export default [
    {
        name: '首页',
        icon: 'home',
        path: '/',
        component: Loadable({ loader: () => import('../pages/Index') })
    },
    {
        name: '色彩',
        icon: 'color',
        path: '/colors',
        component: Loadable({ loader: () => import('../pages/ColorPage') })
    },
    {
        name: '按钮',
        icon: 'button',
        path: '/button',
        component: Loadable({ loader: () => import('../pages/ButtonPage') })
    },
]
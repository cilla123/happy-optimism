import React, { Component } from 'react'
import '../styles/components/SideNav.scss'

/**
 * 侧边栏
 */
class SideNav extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="side-nav">
                <ul>
                    <li className="nav-group-item">
                        <a>开发指南</a>
                        <div className="nav-group">
                            <div className="nav-group__title">使用</div>
                            <ul className="pure-menu-list">
                                <li className="nav-item">
                                    <a aria-current="false" href="">快速上手</a>
                                </li>
                            </ul>
                            <div className="nav-group__title">主题</div>
                            <ul className="pure-menu-list">
                                <li className="nav-item">
                                    <a aria-current="false" href="/#/colors">色彩</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-group-item">
                        <a>组件</a>
                        <div className="nav-group">
                            <div className="nav-group__title">数据</div>
                            <ul className="pure-menu-list">
                                <li className="nav-item">
                                    <a aria-current="false" href="/#/button">Button 按钮</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SideNav

import React, { Component } from 'react'
import SideNav from './SideNav'
import '../styles/components/Container'

/**
 * 主题部分
 */
class Container extends Component {

    constructor(props){
        super(props)
    }

    render() {

        const { children } = this.props

        return (
            <div className="main-content">
                <div className="page-container">
                    {/* 侧边栏 */}
                    <SideNav />
                    {/* 页面内容 */}
                    <div className="page-content">
                        <div className="react-doc-page-content">{children}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Container

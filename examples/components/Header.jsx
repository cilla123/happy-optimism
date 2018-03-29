import React, { Component } from 'react'
import '../styles/components/Header.scss'

/**
 * 头部
 */
class Header extends Component {

    render() {

        return (
            <header className="page-header">
                <div className="page-header__top">
                    {/* Logo */}
                    <a href="/" className="page-header__logo">
                        <span>Happy UI</span>
                    </a>
                    <div className="page-header__search-sep"></div>
                    {/* 搜索框 */}
                    {/* Github */}
                    <ul className="page-header__navs">
                        <li className="page-header__item">
                            <a href="https://github.com/cilla123/happy-optimism">
                                <img className="page-header__github" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522334417164&di=5f954916cd3505684fad4d34e99f4a0c&imgtype=0&src=http%3A%2F%2Fimg2.niushe.com%2Fupload%2F201304%2F19%2F14-22-31-71-26144.jpg" alt="github" width="28" height="28" />
                            </a>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header

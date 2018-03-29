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
                        <img src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png" alt="logo" />
                        <span>Happy UI</span>
                    </a>
                    <div className="page-header__search-sep"></div>
                    {/* 搜索框 */}
                    {/* Github */}
                    <ul className="page-header__navs">
                        <li className="page-header__item">
                            <a href="https://github.com/cilla123/happy-optimism">
                                <img className="page-header__github" src="https://img.yzcdn.cn/zanui/react/GitHub-Mark-120px-plus.png" alt="github" width="28" height="28" />
                            </a>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header

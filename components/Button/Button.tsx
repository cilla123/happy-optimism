import React, { Component, PureComponent } from 'react'
import PropsType from './PropsType'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import setClass from 'classnames'
import Icon from '../Icon'

const BLACK_LIST = [
    'type',
    'size',
    'htmlType',
    'block',
    'component',
    'disabled',
    'loading',
    'outline',
    'bordered',
    'icon',
    'className',
    'prefix',
]

const BTN_BLACK_LIST = ['href', 'target'].concat(BLACK_LIST)

const A_BLACK_LIST = ['href', 'target'].concat(BLACK_LIST)

const wrapTextWithSpanTag = children => {
    return React.Children.map(children, child => {
        return typeof child === 'string' ? <span>{ child }</span> : child
    })
}

class Button extends (PureComponent || Component)<PropsType, any> {

    static propTypes = {
        type: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'link']),
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
        className: PropTypes.string,
        block: PropTypes.bool,
        component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        outline: PropTypes.bool,
        bordered: PropTypes.bool,
        prefix: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }
    
    static defaultProps = {
        type: 'default',
        size: 'medium',
        htmlType: 'button',
        className: '',
        block: false,
        disabled: false,
        loading: false,
        outline: false,
        bordered: true,
        prefix: 'happy-optimism',
    }

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * 处理点击事件
     */
    handleClick(event){
        if (this.props.disabled || this.props.loading) return

        if (this.props.onClick) {
            this.props.onClick(event)
        }
    }

    /**
     * 渲染 a 标签
     */
    renderLink(classNames, iconNode, wrapedChildren){
        const { component, disabled, loading, href = '', target } = this.props
        const Node = component ||  'a'
        const nodePorps = omit(this.props, A_BLACK_LIST)

        return (
            <Node
                {...(disabled || loading ? {} : {href, target})}
                {...nodePorps}
                className={classNames}
                onClick={ this.handleClick }
            >
                { iconNode }
                { wrapedChildren }
            </Node>
        )
    }

    /**
     * 渲染 button 标签
     */
    renderButton(classNames, iconNode, wrapedChildren) {
        const { component, disabled, loading, htmlType } = this.props;
        const Node = component || 'button';
        const nodeProps = omit(this.props, BTN_BLACK_LIST);

        return (
            <Node
                {...nodeProps}
                {...(htmlType ? { type: htmlType } : {})}
                className={classNames}
                disabled={disabled || loading}
                onClick={this.handleClick}
            >
                {iconNode}
                {wrapedChildren}
            </Node>
        )
    }

    render() {
        const {
            href,
            target,
            type,
            size,
            block,
            disabled,
            loading,
            outline,
            bordered,
            prefix,
            icon,
            children,
        } = this.props
        let renderer = href || target ? 'renderLink' : 'renderButton'
        let { className } = this.props
        let classNames = setClass(
            {
            [`${prefix}-btn-${type}${outline ? '-outline' : ''}`]:
                type !== 'default',
            [`${prefix}-btn-${size}`]: size !== 'medium',
            [`${prefix}-btn-block`]: block,
            [`${prefix}-btn-loading`]: loading,
            [`${prefix}-btn-disabled`]: disabled,
            [`${prefix}-btn-border-transparent`]: !bordered,
            },
            `${prefix}-btn`,
            className
        );
        
        const iconNode = icon ? <Icon type={icon} /> : null;        
        const wrapedChildren = wrapTextWithSpanTag(children);

        return this[renderer](classNames, iconNode, wrapedChildren);
    }

}

export default Button
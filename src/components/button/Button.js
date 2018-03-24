import React, { Component, PureComponent } from 'react'
import setClass from 'classnames'
import Proptypes from 'prop-types'
import omit from 'lodash/omit'
// import Icon from 'icon'

const BLACK_LIST = [
    'type'
]

const BASE_LIST = ['href', 'target']

const BTN_BLACK_LIST = BASE_LIST.concat(BLACK_LIST)

const A_BLACK_LIST = BASE_LIST.concat(BLACK_LIST)

const wrapTextWithSpanTag = children => {
    return React.Children.map(children, child => {
        if (typeof child === 'string') {
            return <span>{child}</span>
        }
        return child
    })
}

export default class Button extends (PureComponent || Component) {
    
    static propTypes = {
        type: Proptypes.oneOf(['default', 'primary', 'success', 'danger', 'link']),
    }

    static defaultProps = {
        type: 'default'
    }

    constructor(props){
        super(props)
    }

    renderLink(){
        return (
            <a>11</a>
        )
    }

    renderButton(classNames, iconNode, wrapedChildren){
        const { component } = this.props
        const Node = component || 'button'
        const nodeProps = omit(this.props, BTN_BLACK_LIST)

        return (
            <Node 
                {...nodeProps}
            >
                { iconNode }
                { wrapedChildren }
            </Node>
        )
    }

    render(){
        const { type, prefix } = this.props
        const { className } = this.props
        const renderer = href || target ? 'renderLink' : 'renderButton'
        const classNames = setClass(
            {
                [`${prefix}-btn-${type}${outline ? '-outline' : ''}`] : type !== 'default',
            },
            `${prefix}-btn`,
            className
        )
        const iconNode = null;
        const wrapedChildren = wrapTextWithSpanTag(children)

        return this[renderer](classNames, iconNode, wrapedChildren)
    }

}

import React, {  Component, PureComponent  } from 'react'
import PropTypes from 'prop-types'
import setClass from 'classnames'
import PropsType from './PropsType'

class Icon extends ( PureComponent || Component )<PropsType, any> {

    static propTypes = {
        type: PropTypes.string.isRequired,
        className: PropTypes.string,
        spin: PropTypes.bool,
    }

    static defaultProps = {
        className: '',
        spin: false,
    }

    constructor(props){
        super(props)
    }

    render(){
        const { type, className, ...otherProps } = this.props
        const cls = setClass('happy-optimism-icon', `happy-optimism-icon-${type}`, className)

        return <i className={cls} {...otherProps} />;
    }

}

export default Icon
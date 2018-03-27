import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Spinner from '../Spinner';

export interface ButtonProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Button extends PureComponent<ButtonProps, {}> {

  static defaultProps = {
    prefixCls: 'za-button',
    theme: 'default',
    block: false,
    bordered: false,
    active: false,
    focus: false,
    disabled: false,
    loading: false,
    onClick() {},
  };

  render() {
    const {
      prefixCls,
      className,
      theme,
      size,
      shape,
      icon,
      block,
      active,
      focus,
      bordered,
      disabled,
      loading,
      onClick,
      children,
      ...others,
    } = this.props;

    const classes = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      block,
      bordered,
      active,
      focus,
      disabled,
    });

    const iconRender = loading
      ? <Spinner className="rotate360" />
      : icon;

    const childrenRender = children && <span>{children}</span>;

    const contentRender = (!!icon || loading)
      ? <div className={`${prefixCls}-content`}>{iconRender}{childrenRender}</div>
      : childrenRender;

    return (
      <a
        role="button"
        aria-disabled={disabled}
        className={classes}
        onClick={e => !disabled && typeof onClick === 'function' && onClick(e)}
        onTouchStart={() => {}}
        {...others}
      >
        {contentRender}
      </a>
    );
  }
}

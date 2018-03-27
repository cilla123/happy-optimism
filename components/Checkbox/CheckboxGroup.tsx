import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
import { BaseCheckboxGroupProps } from './PropsType';

const getChildChecked = (children) => {
  const checkedValue: any[] = [];
  React.Children.map(children, (element: any) => {
    if (element.props && element.props.checked) {
      checkedValue.push(element.props.value);
    }
  });
  return checkedValue;
};

const getValue = (props, defaultValue) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if (getChildChecked(props.children).length > 0) {
    return getChildChecked(props.children);
  }
  return defaultValue;
};

export interface CheckboxGroupProps extends BaseCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
}

export default class CheckboxGroup extends PureComponent<CheckboxGroupProps, any> {

  static defaultProps = {
    prefixCls: 'za-checkbox-group',
    block: false,
    disabled: false,
    compact: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props, []),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getChildChecked(nextProps.children).length > 0) {
      this.setState({
        value: nextProps.value || getChildChecked(nextProps.children),
      });
    }
  }

  onChildChange = (value) => {
    const values = this.state.value;
    const index = values.indexOf(value);

    if (index < 0) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }

    this.setState({
      value: values,
    });

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(values);
    }
  }

  render() {
    const { prefixCls, className, shape, type, block, disabled, compact, children } = this.props;

    const items = React.Children.map(children, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        type,
        shape,
        block: block || element.props.block,
        disabled: disabled || element.props.disabled,
        onChange: () => this.onChildChange(element.props.value),
        checked: (this.state.value.indexOf(element.props.value) > -1),
      });
    });

    const cls = classnames(`${prefixCls}`, className, {
      [`shape-${shape}`]: !!shape,
      'is-compact': compact,
      block,
      disabled,
    });

    return <div className={cls}>{items}</div>;
  }
}

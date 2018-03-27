import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Icon from '../Icon';

const getValue = (props, defaultValue) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  return defaultValue;
};

export interface StepperProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Stepper extends PureComponent<StepperProps, any> {

  static defaultProps = {
    prefixCls: 'za-stepper',
    theme: 'primary',
    disabled: false,
    step: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props, 0),
      lastValue: getValue(props, 0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Number(getValue(nextProps, 0)),
        lastValue: Number(getValue(nextProps, 0)),
      });
    }
  }

  onInputChange = (value) => {
    value = Number(value);
    const { onInputChange } = this.props;
    this.setState({ value });
    if (typeof onInputChange === 'function') {
      onInputChange(value);
    }
  }

  onInputBlur = (value) => {
    const { min, max, onChange } = this.props;
    value = Number(value);
    if (value === '' || isNaN(value)) {
      value = this.state.lastValue;
    }
    if (min !== null && value < min) {
      value = min;
    }
    if (max !== null && value > max) {
      value = max;
    }
    this.setState({
      value,
      lastValue: value,
    });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  onSubClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isSubDisabled()) {
      return;
    }

    const newValue = Number(value) - step;
    this.onInputBlur(newValue);
  }

  onPlusClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isPlusDisabled()) {
      return;
    }

    const newValue = Number(value) + step;
    this.onInputBlur(newValue);
  }

  isSubDisabled = () => {
    const { min, disabled } = this.props;
    const { value } = this.state;

    if (min === null) {
      return false;
    }
    return (value <= min) || disabled;
  }

  isPlusDisabled = () => {
    const { max, disabled } = this.props;
    const { value } = this.state;

    if (max === null) {
      return false;
    }
    return (value >= max) || disabled;
  }

  render() {
    const { prefixCls, className, theme, shape, disabled } = this.props;
    const { value } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
      disabled,
    });

    const subCls = classnames(`${prefixCls}-sub`, {
      disabled: this.isSubDisabled(),
    });

    const plusCls = classnames(`${prefixCls}-plus`, {
      disabled: this.isPlusDisabled(),
    });

    return (
      <span className={cls}>
        <span className={subCls} onClick={this.onSubClick}><Icon type="minus" /></span>
        <input
          className={`${prefixCls}-input`}
          type="tel"
          value={value}
          onChange={e => this.onInputChange(e.target.value)}
          onBlur={() => this.onInputBlur(value)}
        />
        <span className={plusCls} onClick={this.onPlusClick}><Icon type="add" /></span>
      </span>
    );
  }
}

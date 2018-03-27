import React, { Component } from 'react';
import { BaseDatePickerViewProps } from './PropsType';
import defaultLocale from './locale/zh_CN';
import classnames from 'classnames';
import Wheel from '../Wheel';

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;

// 获取当月天数
const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// 补齐格式
const pad = (n) => {
  return n < 10 ? `0${n}` : `${n}`;
};

const cloneDate = (date) => {
  return new Date(+date);
};

// 设置月份
const setMonth = (date, month) => {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
};

// 转成Date格式
const getGregorianCalendar = (year, month, day, hour, minutes, seconds) => {
  return new Date(year, month, day, hour, minutes, seconds);
};

const isExtendDate = (date) => {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
};

export interface DatePickerViewProps extends BaseDatePickerViewProps {
  prefixCls?: string;
  className?: any;
}

export default class DatePickerView extends Component<DatePickerViewProps, any> {

  static defaultProps = {
    visible: true,
    placeholder: '请选择',
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    mode: DATE,
    disabled: false,
    value: '',
    defaultValue: '',
    locale: defaultLocale,
    minuteStep: 1,
    prefixCls: 'za-picker',
    valueMember: 'value',
    onClick: () => {},
    onCancel: () => {},
  };

  constructor(props) {
    super(props);
    const date = props.value && isExtendDate(props.value);
    const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);
    const wheelDefault = props.wheelDefaultValue && isExtendDate(props.wheelDefaultValue);

    this.state = {
      date: defaultDate || date,
      wheelDefault,
    };

    if (typeof props.onInit === 'function') {
      props.onInit(this.getDate());
    }
  }

  componentWillReceiveProps(nextProps) {
    const date = nextProps.value && isExtendDate(nextProps.value);
    const defaultDate = nextProps.defaultValue && isExtendDate(nextProps.defaultValue);
    const wheelDefault = nextProps.wheelDefaultValue && isExtendDate(nextProps.wheelDefaultValue);

    this.setState({
      date: date || defaultDate,
      wheelDefault,
    });

    if (typeof this.props.onInit === 'function') {
      this.props.onInit(this.getDate());
    }
  }

  onValueChange(selected, index) {
    const { mode, onChange } = this.props;

    let newValue = cloneDate(this.getDate());
    if (mode === YEAR || mode === MONTH || mode === DATE || mode === DATETIME) {
      switch (index) {
        case 0:
          newValue.setFullYear(selected);
          break;
        case 1:
          setMonth(newValue, selected);
          break;
        case 2:
          newValue.setDate(selected);
          break;
        case 3:
          newValue.setHours(selected);
          break;
        case 4:
          newValue.setMinutes(selected);
          break;
        default:
          break;
      }
    } else {
      switch (index) {
        case 0:
          newValue.setHours(selected);
          break;
        case 1:
          newValue.setMinutes(selected);
          break;
        default:
          break;
      }
    }

    newValue = this.clipDate(newValue);

    this.setState({
      date: newValue,
    });

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  }

  clipDate(date) {
    const { mode } = this.props;
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
    if (mode === DATETIME) {
      if (date < minDate) {
        return cloneDate(minDate);
      }
      if (date > maxDate) {
        return cloneDate(maxDate);
      }
    } else if (mode === DATE) {
      if (+date + ONE_DAY <= +minDate) {
        return cloneDate(minDate);
      }
      if (date >= +maxDate + ONE_DAY) {
        return cloneDate(maxDate);
      }
    } else {
      const maxHour = maxDate.getHours();
      const maxMinutes = maxDate.getMinutes();
      const minHour = minDate.getHours();
      const minMinutes = minDate.getMinutes();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      if (hour < minHour || (hour === minHour && minutes < minMinutes)) {
        return cloneDate(minDate);
      }
      if (hour > maxHour || (hour === maxHour && minutes > maxMinutes)) {
        return cloneDate(maxDate);
      }
    }
    return date;
  }

  getColsValue() {
    const { mode } = this.props;
    const date = this.getDate();

    let dataSource: any[] = [];
    let value: any[] = [];

    if (mode === YEAR) {
      dataSource = this.getDateData();
      value = [`${date.getFullYear()}`];
    }
    if (mode === MONTH) {
      dataSource = this.getDateData();
      value = [`${date.getFullYear()}`, `${date.getMonth()}`];
    }
    if (mode === DATE || mode === DATETIME) {
      dataSource = this.getDateData();
      value = [`${date.getFullYear()}`, `${date.getMonth()}`, `${date.getDate()}`];
    }
    if (mode === DATETIME) {
      dataSource = dataSource.concat(this.getTimeData());
      value = value.concat([`${date.getHours()}`, `${date.getMinutes()}`]);
    }
    if (mode === TIME) {
      dataSource = this.getTimeData();
      value = [`${date.getHours()}`, `${date.getMinutes()}`];
    }

    return {
      dataSource,
      value,
    };
  }

  getDateData() {
    const { locale, mode } = this.props;
    const date = this.getDate();
    const yearCol: object[] = [];
    const monthCol: object[] = [];
    const dayCol: object[] = [];

    const selectYear = date.getFullYear();
    const selectMonth = date.getMonth();
    const minYear = this.getMinYear();
    const maxYear = this.getMaxYear();

    for (let i = minYear; i <= maxYear; i += 1) {
      yearCol.push({
        label: `${i + locale.year}`,
        value: `${i}`,
      });
    }

    if (mode === YEAR) {
      return [yearCol];
    }

    let minMonth = 0;
    let maxMonth = 11;
    if (selectYear === minYear) {
      minMonth = this.getMinMonth();
    }
    if (selectYear === maxYear) {
      maxMonth = this.getMaxMonth();
    }

    for (let i = minMonth; i <= maxMonth; i += 1) {
      monthCol.push({
        label: `${i + 1 + locale.month}`,
        value: `${i}`,
      });
    }

    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    let minDay = 1;
    let maxDay = getDaysInMonth(date);

    if (selectYear === minYear && selectMonth === minMonth) {
      minDay = this.getMinDay();
    }

    if (selectYear === maxYear && selectMonth === maxMonth) {
      maxDay = this.getMaxDay();
    }

    for (let i = minDay; i <= maxDay; i += 1) {
      dayCol.push({
        label: `${i + locale.day}`,
        value: `${i}`,
      });
    }

    if (mode === DATE) {
      return [yearCol, monthCol, dayCol];
    }

    return [yearCol, monthCol, dayCol];
  }

  getTimeData() {
    const { locale, mode, minuteStep } = this.props;
    const date = this.getDate();
    const hourCol: object[] = [];
    const minuteCol: object[] = [];

    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    const minDateHour = this.getMinHour();
    const maxDateHour = this.getMaxHour();
    const minDateMinute = this.getMinMinute();
    const maxDateMinute = this.getMaxMinute();
    const selectHour = date.getHours();

    if (mode === DATETIME) {
      const selectYear = date.getFullYear();
      const selectMonth = date.getMonth();
      const selectDay = date.getDate();
      const minYear = this.getMinYear();
      const maxYear = this.getMaxYear();
      const minMonth = this.getMinMonth();
      const maxMonth = this.getMaxMonth();
      const minDay = this.getMinDay();
      const maxDay = this.getMaxDay();

      if (selectYear === minYear && selectMonth === minMonth && selectDay === minDay) {
        minHour = minDateHour;
        if (selectHour === minHour) {
          minMinute = minDateMinute;
        }
      }

      if (selectYear === maxYear && selectMonth === maxMonth && selectDay === maxDay) {
        maxHour = maxDateHour;
        if (selectHour === maxHour) {
          maxMinute = maxDateMinute;
        }
      }
    } else {
      minHour = minDateHour;
      if (selectHour === minHour) {
        minMinute = minDateMinute;
      }

      maxHour = maxDateHour;
      if (selectHour === maxHour) {
        maxMinute = maxDateMinute;
      }
    }

    for (let i = minHour; i <= maxHour; i += 1) {
      hourCol.push({
        label: locale.hour ? `${i + locale.hour}` : pad(i),
        value: `${i}`,
      });
    }

    for (let i = minMinute; i <= maxMinute; i += minuteStep!) {
      minuteCol.push({
        label: locale.minute ? `${i + locale.minute}` : pad(i),
        value: `${i}`,
      });
    }

    return [hourCol, minuteCol];

  }

  getDate() {
    return this.state.date || this.state.wheelDefault || this.getDefaultDate();
  }

  getDefaultDate() {
    const { min, mode, minuteStep } = this.props;
    // 存在最小值且毫秒数大于现在
    if (min && this.getMinDate().getTime() >= Date.now()) {
      return this.getMinDate();
    }
    if (minuteStep && minuteStep > 1 && (mode === DATETIME || mode === TIME)) {
      return new Date(new Date().setMinutes(0));
    }
    return new Date();
  }

  getMinYear() {
    return this.getMinDate().getFullYear();
  }

  getMaxYear() {
    return this.getMaxDate().getFullYear();
  }

  getMinMonth() {
    return this.getMinDate().getMonth();
  }

  getMaxMonth() {
    return this.getMaxDate().getMonth();
  }

  getMinDay() {
    return this.getMinDate().getDate();
  }

  getMaxDay() {
    return this.getMaxDate().getDate();
  }

  getMinHour() {
    return this.getMinDate().getHours();
  }

  getMaxHour() {
    return this.getMaxDate().getHours();
  }

  getMinMinute() {
    return this.getMinDate().getMinutes();
  }

  getMaxMinute() {
    return this.getMaxDate().getMinutes();
  }

  getMinDate() {
    const minDate = isExtendDate(this.props.min);
    return minDate || this.getDefaultMinDate();
  }

  getMaxDate() {
    const maxDate = isExtendDate(this.props.max);
    return maxDate || this.getDefaultMaxDate();
  }

  getDefaultMinDate() {
    return getGregorianCalendar(2000, 0, 1, 0, 0, 0);
  }

  getDefaultMaxDate() {
    return getGregorianCalendar(2030, 11, 30, 23, 59, 59);
  }

  onTransition(isScrolling) {
    if (typeof this.props.onTransition === 'function') {
      this.props.onTransition!(isScrolling);
    }
  }

  renderWheel = (item, index) => {
    const { valueMember, disabled } = this.props;
    const { value } = this.getColsValue();

    return (
      <Wheel
        key={+index}
        dataSource={item}
        value={value[index]}
        valueMember={valueMember}
        disabled={disabled}
        onChange={selected => this.onValueChange(selected, index)}
        onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
      />
    );
  }

  render() {
    const { prefixCls, className } = this.props;
    const { dataSource } = this.getColsValue();
    return (
      <div className={`${prefixCls}-panel`}>
        <div className={`${prefixCls}-mask-top`} />
        <div className={classnames(`${prefixCls}-view`, className)}>
          {dataSource.map(this.renderWheel)}
        </div>
        <div className={`${prefixCls}-mask-bottom`} />
      </div>
    );
  }
}

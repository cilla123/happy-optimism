import { Component, PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import * as defaultI18n from './default';

export default class I18nProvider extends (PureComponent || Component) {
  static propTypes = {
    i18n: PropTypes.object,
  };

  static defaultProps = {
    i18n: defaultI18n,
  };

  static childContextTypes = {
    happyOptimismI18n: PropTypes.object,
    // __i18n_recieved__: PropTypes.bool  i18n标记
  };

  getChildContext() {
    return {
      happyOptimismI18n: {
        ...this.props.i18n,
      },
    };
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

import React, { PureComponent, CSSProperties } from 'react';
import { REFRESH_STATE, LOAD_STATE, PropsType } from './PropsType';
import classnames from 'classnames';
import Events from '../utils/events';
import Throttle from '../utils/throttle';
import Drag from '../Drag';
import Spinner from '../Spinner';
import Icon from '../Icon';

export interface PullProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Pull extends PureComponent<PullProps, any> {

  static defaultProps = {
    prefixCls: 'za-pull',
    refresh: {
      state: REFRESH_STATE.normal,
      startDistance: 30,
      distance: 50,
    },
    load: {
      state: LOAD_STATE.normal,
      distance: 0,
    },
    animationDuration: 400,
    stayTime: 1000,
  };

  private pull;
  private wrap;

  constructor(props) {
    super(props);
    this.state = {
      offsetY: 0,
      animationDuration: 0,
      refreshState: props.refresh.state,
      loadState: props.load.state,
    };
  }

  componentDidMount() {
    this.wrap = this.getScrollContainer();
    const scroller = (this.wrap === document.documentElement) ? window : this.wrap;
    Events.on(scroller, 'scroll', Throttle(this.onScroll, 250));
  }

  componentWillReceiveProps(nextProps) {
    if ('refresh' in nextProps && nextProps.refresh.state !== this.props.refresh.state) {
      this.doRefreshAction(nextProps.refresh.state);
    }

    if ('load' in nextProps && nextProps.load.state !== this.props.load.state) {
      this.doLoadAction(nextProps.load.state);
    }
  }

  componentWillUnmount() {
    const scroller = (this.wrap === document.documentElement) ? window : this.wrap;
    Events.off(scroller, 'scroll', this.onScroll);
  }

  getScrollContainer = () => {
    return (node => {
      while (node && node.parentNode && node.parentNode !== document.body) {
        const style = window.getComputedStyle(node);
        if (['scroll', 'auto'].indexOf(style.overflowY || '') > - 1) {
          return node;
        }
        node = node.parentNode;
      }
    })(this.pull) || document.documentElement;
  }

  onScroll = () => {
    const { refreshState, loadState } = this.state;
    const { scrollHeight, scrollTop, clientHeight } = this.wrap;
    const load = { ...Pull.defaultProps.load, ...this.props.load };
    const { handler, distance } = load;

    if (
      typeof handler !== 'function' ||
      refreshState !== REFRESH_STATE.normal ||
      loadState !== LOAD_STATE.normal ||
      scrollHeight <= clientHeight ||

      // 内容高度 - 偏移值 - 修正距离 <= 容器可见高度
      scrollHeight - (scrollTop + document.body.scrollTop) - distance! > clientHeight
    ) {
      return;
    }
    handler();
  }

  onDragMove = (event, { offsetY }) => {
    const { handler } = this.props.refresh;
    if (
      // 未设置刷新事件
      !handler ||

      // 上拉
      offsetY <= 0 ||

      // 未滚动到顶部
      offsetY > 0 && (this.wrap.scrollTop + document.body.scrollTop) > 0 ||

      // 已经触发过加载状态
      this.state.refreshState >= REFRESH_STATE.loading
    ) {
      return false;
    }

    // 解决低端安卓系统只触发一次touchmove事件的bug
    event.preventDefault();

    const refresh = { ...Pull.defaultProps.refresh, ...this.props.refresh };
    const { startDistance, distance } = refresh;
    const offset = offsetY / 2; // 移动距离为拖动距离的一半

    // 判断是否达到释放立即刷新的条件
    const action = ((offset - startDistance!) < distance!)
      ? REFRESH_STATE.pull
      : REFRESH_STATE.drop;

    this.doRefreshAction(action, offset);
    return true;
  }

  onDragEnd = (event, { offsetY }) => {
    event.preventDefault();

    // 没有产生位移
    if (!offsetY) {
      return;
    }

    // 当前状态为下拉状态时
    const { refreshState } = this.state;
    if (refreshState === REFRESH_STATE.pull) {
      this.doRefreshAction(REFRESH_STATE.normal);
      return;
    }

    // 执行外部触发刷新的回调
    const { handler } = this.props.refresh;
    if (typeof handler === 'function') {
      handler();
    }
  }

  /**
   * 执行动画
   * @param  {number} options.offsetY  偏移距离
   * @param  {number} options.animationDuration 动画执行时间
   */
  doTransition = ({ offsetY, animationDuration }) => {
    this.setState({ offsetY, animationDuration });
  }

  /**
   * 执行刷新动作
   * @param  {REFRESH_STATE} refreshState 刷新状态
   * @param  {number}        offsetY      偏移距离
   */
  doRefreshAction = (refreshState, offsetY?: number) => {
    const { animationDuration, stayTime } = this.props;

    this.setState({ refreshState });
    switch (refreshState) {
      case REFRESH_STATE.pull:
      case REFRESH_STATE.drop:
        this.doTransition({ offsetY, animationDuration: 0 });
        break;

      case REFRESH_STATE.loading:
        this.doTransition({ offsetY: 'auto', animationDuration });
        break;

      case REFRESH_STATE.success:
      case REFRESH_STATE.failure:
        this.doTransition({ offsetY: 'auto', animationDuration });
        setTimeout(() => {
          this.doRefreshAction(REFRESH_STATE.normal);
          this.doLoadAction(LOAD_STATE.normal);
        }, stayTime);
        break;

      default:
        this.doTransition({ offsetY: 0, animationDuration });
    }
  }

  /**
   * 执行加载动作
   * @param  {LOAD_STATE} loadState 加载状态
   */
  doLoadAction = (loadState) => {
    const { stayTime } = this.props;
    this.setState({ loadState });

    switch (loadState) {
      case LOAD_STATE.success:
        this.doLoadAction(LOAD_STATE.normal);
        break;

      case LOAD_STATE.failure:
        setTimeout(() => {
          this.doLoadAction(LOAD_STATE.abort);
        }, stayTime);
        break;

      default:
    }
  }

  /**
   * 渲染刷新节点
   */
  renderRefresh = () => {
    const refresh = { ...Pull.defaultProps.refresh, ...this.props.refresh };
    const { startDistance, distance, render } = refresh;
    const { refreshState, offsetY } = this.state;

    let percent = 0;
    if (offsetY >= startDistance) {
      percent = (
        (
          (offsetY - startDistance) < distance
            ? offsetY - startDistance
            : distance
        ) * 100
      ) / distance;
    }

    if (typeof render === 'function') {
      return render(refreshState, percent);
    }

    const cls = `${this.props.prefixCls}-control`;

    switch (refreshState) {
      case REFRESH_STATE.pull:
        return (
          <div className={cls}>
            <Spinner percent={percent} />
            <span>下拉刷新</span>
          </div>
        );

      case REFRESH_STATE.drop:
        return (
          <div className={cls}>
            <Spinner percent={100} />
            <span>释放立即刷新</span>
          </div>
        );

      case REFRESH_STATE.loading:
        return (
          <div className={cls}>
            <Spinner className="rotate360" />
            <span>加载中</span>
          </div>
        );

      case REFRESH_STATE.success:
        return (
          <div className={cls}>
            <Icon type="right-round" theme="success" />
            <span>加载成功</span>
          </div>
        );

      case REFRESH_STATE.failure:
        return (
          <div className={cls}>
            <Icon type="wrong-round" theme="error" />
            <span>加载失败</span>
          </div>
        );

      default:
    }
  }

  /**
   * 渲染加载节点
   */
  renderLoad = () => {
    const load = { ...Pull.defaultProps.load, ...this.props.load };
    const { render } = load;
    const { loadState } = this.state;

    if (typeof render === 'function') {
      return render(loadState);
    }

    const cls = `${this.props.prefixCls}-control`;

    switch (loadState) {
      case LOAD_STATE.loading:
        return (
          <div className={cls}>
            <Spinner className="rotate360" />
            <span>加载中</span>
          </div>
        );

      case LOAD_STATE.failure:
        return (
          <div className={cls}>
            <Icon type="wrong-round" theme="error" />
            <span>加载失败</span>
          </div>
        );

      case LOAD_STATE.complete:
        return (
          <div className={cls}>
            <span>我是有底线的</span>
          </div>
        );

      default:
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;
    const { offsetY, animationDuration, refreshState, loadState } = this.state;
    const cls = classnames(prefixCls, className);

    const loadCls = classnames(`${prefixCls}-load`, {
      [`${prefixCls}-load-show`]: loadState >= LOAD_STATE.loading,
    });

    const contentStyle: CSSProperties = {
      WebkitTransition: `all ${animationDuration}ms`,
      transition: `all ${animationDuration}ms`,
    };

    if (refreshState <= REFRESH_STATE.drop) {
      contentStyle.WebkitTransform = `translate3d(0, ${offsetY}px, 0)`;
      contentStyle.transform = `translate3d(0, ${offsetY}px, 0)`;
    }

    return (
      <Drag
        onDragMove={this.onDragMove}
        onDragEnd={this.onDragEnd}
      >
        <div className={cls}>
          <div className={`${prefixCls}-content`} style={contentStyle} ref={(ele) => { this.pull = ele; }}>
            <div className={`${prefixCls}-refresh`}>
              {this.renderRefresh()}
            </div>
            <div className={`${prefixCls}-body`}>{children}</div>
            <div className={loadCls}>
              {this.renderLoad()}
            </div>
          </div>
        </div>
      </Drag>
    );
  }
}

import React, { Component } from 'react';
import { Button } from 'happy-optimism'
import ReactMarkdown from 'react-markdown'

import Loadable from '../components/Loadable'

// console.log(require('../../components/Button/demos/basic.txt'))

class Page extends Component {

  render() {
    return (
      <div className="happy-optimism-react-container">
        <section className="happy-optimism-react-markdown"><h2 className="anchor-heading"><a href="javascript:void(0)">¶</a><a href="javascript:void(0)" className="anchor-point"></a>Button 按钮</h2>
          <p>按钮, 提供基础样式及基础状态.</p>
          <h3 className="anchor-heading"><a href="javascript:void(0)">¶</a><a href="javascript:void(0)" id="shi-yong-zhi-nan" className="anchor-point"></a>使用指南</h3>
          <ul>
            <li>通过 <code>type</code> 来控制按钮的样式</li>
            <li>通过 <code>size</code> 控制按钮的大小.</li>
            <li>提供 <code>'block'</code>、<code>'disabled'</code>、<code>'loading'</code> 等修饰状态.</li>
            <li>传入 <code>href/target</code>, Button 将渲染为a标签, 仍然支持以其他属性控制样式及状态.</li>
          </ul>
          <h3 className="anchor-heading"><a href="#dai-ma-yan-shi">¶</a><a href="javascript:void(0)" id="dai-ma-yan-shi" className="anchor-point"></a>代码演示</h3></section>
          {/* 基础用法 */}
          <div className="happy-optimism-react-demo">
            <div className="happy-optimism-react-demo__preview">
              <Button>按钮</Button>
            </div>
            <div className="happy-optimism-react-demo__bottom">
              <div className="happy-optimism-react-demo__title">
                <p>基础用法</p>
              </div>
              <i className="happyoptimismicon happyoptimismicon-caret-up happy-optimism-react-demo__toggle happy-optimism-react-demo__toggle-on">6</i>
            </div>
            <ReactMarkdown source={ ' # asd ' } />
          </div>
      </div>
    );
  }
}

export default Page;

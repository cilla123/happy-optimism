import React, { PureComponent, Component } from 'react';
import '../styles/pages/IndexPage';

class Page extends (PureComponent || Component) {

  render() {
    const { history } = this.props;

    return (
      <div>
        <button onClick={() => history.push('/button')}>按钮页面</button>        
      </div>
    );
  }
}

export default Page;

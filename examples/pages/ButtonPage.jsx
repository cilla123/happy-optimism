import React, { Component } from 'react';
import { Button } from 'happy-optimism'

// import '../styles/pages/ButtonPage';

class Page extends Component {

  render() {
    return (
      <div>
        <Button>按钮</Button>
        <Button type="success">按钮</Button>        
      </div>
    );
  }
}

export default Page;

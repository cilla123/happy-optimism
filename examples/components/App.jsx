import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AsyncComponent from './AsyncComponent';
import Header from './Header'
import Container from './Container'

import Routes from '../routes'

/**
 * App
 */
class App extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const { history, location, match } = this.props;
        const currentKey = location.pathname.split('/')[1] || '/';
        return (
            <div>
                {/* 头部 */}
                <Header />
                {/* 内容 */}
                <Container>
                    <Switch key={location.pathname} location={location}>
                        {
                            Routes.map(( { name, path, exact=true, component } ) => (
                                <Route path={path} exact={exact} component={component} key={name} />
                            ))
                        }
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(App);

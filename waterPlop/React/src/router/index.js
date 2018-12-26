import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Index from '../view/index';
import Animate from '../view/animate';

class RouterIndex extends Component{
    render() {
        return (
            <Switch>
                <Route path='/' exact render={() =>(
                    <Redirect to='/index'/>
                )}/>
                <Route path='/index' component={Index}/>
                <Route path='/Animate' component={Animate}/>
            </Switch>
        )
    }
}

export default RouterIndex;
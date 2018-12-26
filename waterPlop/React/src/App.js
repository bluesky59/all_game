import React, { Component } from 'react';
import RouterIndex from './router/index';
import './static/css/index.css';

class App extends Component {
  render() {
    return (
        <div className={'container'}>
          <RouterIndex/>
        </div>
    );
  }
}

export default App;

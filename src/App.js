import React, { Component } from 'react';
import Authentication from './Authentication.js'

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="Main">
                <Authentication />
            </div>
        );
    } 
}

export default App;

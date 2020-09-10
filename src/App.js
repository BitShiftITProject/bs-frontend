
import React, { Component } from 'react';
import Authentication from './Authentication.js'
// import TestRenderImage from './TestRenderImage.js'

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="Main">
                <Authentication/>
                {/* <TestRenderImage /> */}
            </div>
        );
    } 
}

export default App

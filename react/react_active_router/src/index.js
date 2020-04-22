import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import Store from './store'


function Root(){ 
    return (
        <Store>
            <Router/>
        </Store>
    )
}

ReactDOM.render(<Root/>, document.getElementById('root'));



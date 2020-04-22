import React from 'react';
import CSSModules from 'react-css-modules'; 
import styles from '../scss/page404.scss';

function Page404(){
    return (
        <h1>404:页面未找到</h1>
    )
}
export default CSSModules(Page404,styles) ;
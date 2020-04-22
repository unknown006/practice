import React ,{ Component } from 'react';
import styles from '../scss/dashboard.scss';
import { Route } from 'react-router-dom';
import  Page1 from './page1';
import  Page2 from './page2';
import { randomColor } from '../lib/utils';
//组件
import TestComponent from '../components/ComponnetTest';

class Test extends Component{
    constructor(props){
        super(props)
        this.state={
            value:0,
            background:randomColor(),
        }
        this.handleGetFocus=this.handleGetFocus.bind(this);
        this.handleShowMenu=this.handleShowMenu.bind(this);
    }
    focus(){
        this.textInput.focus();
    }   
    handleShowMenu(e) {
        e.stopPropagation();
    }
    handleGetFocus(e){
        e.stopPropagation();
        this.focus();
    }
    handleJump(path){
        return e => window.history.pushState(null,null,path)
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState({
                value:this.state.value+20,
                background:randomColor(),
            })
        },2000)
    }
    shouldComponentUpdate(){
        return false;
    } 
    render(){
        return (
            <div className={ styles.container } style={{
                marginTop:this.state.value+'px',
                background:randomColor(),
                transition:'all 2s linear',
            }}>
                输入框:<TestComponent  textInput={(dom)=>{this.textInput=dom}} test={2222222}/>
                <br/>
                <button onClick={this.handleGetFocus}>获取焦点</button>
                <button onClick={this.handleShowMenu} style={{marginLeft:'10px'}}>展示路由菜单</button>
                <div>
                   <button onClick={ this.handleJump('/home') }>to home!</button>
                   <button style={ {marginLeft:'20px'} } onClick={ this.handleJump('/404') }>to 404!</button>
                </div>
                <div>
                    <Route path="/page1" component={ Page1 }></Route>
                    <Route path="/page2" component={ Page2 }></Route>
                </div>
            </div>
        )
    }
}
export default Test;
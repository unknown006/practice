import React from 'react';
import { number,string } from 'prop-types'
let Component=React.Component;

// function decorator(target){
//     target.decorateProp='this is decoration prop!'
// }

// @decorator
class TestComponent extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={}
        this.stopPropagation=function(e){
            e.stopPropagation();
        }
        this.handleInput=this.handleInput.bind(this)
        this.handleFileChange=this.handleFileChange.bind(this)
    }
    static defaultProps={
        name:'测试',
        content:654,
    }
    static propTypes={
        name:string,
        content:number,
    }
    handleInput(e){
        this.setState({
            val:e.target.value,
        })
    }
    handleFileChange(e){
        console.log(e.target.files[0])
    }
    //生命周期-16.3
    // componentWillMount(){
    //     console.log('will mount!')
    // }
    componentDidMount(){
        console.log('did mount!')
    }
    // componentWillReceiveProps(props){
    //     console.log('receive props!')
    // }
    shouldComponentUpdate(props,nextState){
        let same2=Object.keys(nextState).every((key)=>{
            return nextState[key] === this.state[key]
        })
        if(same2){
            return false;
        }else{
            if(nextState.val===this.state.val){
                return true;
            }else{
                if (nextState.val && this.state.val && nextState.val.length>=10) {
                    return nextState.val.length>this.state.val.length || nextState.val.length<this.state.val.length ? true :false;
                }
            }
        }
        return false;
    }
    // componentWillUpdate(props,state){
    //     console.log('will update!')
    // }
    componentDidUpdate(props,state,snapshot){
        console.log('did update!')
    }
    componentWillUnmount(props,state){
        console.log('will unmount!')
    }
    //生命周期16.4
    static getDerivedStateFromProps(props,state){
        console.log(state)
        return null;
    }
    getSnapshotBeforeUpdate(props,prevState){
        console.log(prevState)
        console.log(this.state)
        console.log(props)
        console.log(this.props)
        return {};
    }
    render(){
        let { val } = this.state;
        return (
            <div>
                <input type="text" ref={this.props.textInput} onClick={this.stopPropagation} onInput={this.handleInput} />
                <div>{val}</div>
                <div>{`${this.props.name}:${this.props.content}`}</div>
                <input type="file" onClick={this.stopPropagation} onChange={this.handleFileChange}/>
            </div>
        )
    }
}

export default TestComponent
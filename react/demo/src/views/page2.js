import React from 'react';
import styles from  '../scss/page2.scss';
const Component =React.Component;
class Page2 extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <div className={styles.div}></div>
        )
    }
}
export default Page2;
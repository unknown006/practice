import React from 'react';
import styles from  '../scss/page1.scss';
const Component =React.Component;
class Page1 extends Component{
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
export default Page1;
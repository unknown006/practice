import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/home.scss'
class RouterPage extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <div>
                <p>标题</p>
                <ul className={styles.nav}>
                    <li className={ styles.navItem }><Link to="/page1">to Page1!</Link></li>
                    <li className={ styles.navItem }><Link to="/page2">to Page2!</Link></li>
                    <li className={ styles.navItem}><Link to="/">unknown</Link></li>
                    <li className={styles.navItem}><Link to="/">unknown</Link></li>
                    <li className={styles.navItem}><Link to="/">unknown</Link></li>
                </ul>
                { this.props.children }
            </div>
        )
    }
}

export default RouterPage;
import React, {Component} from 'react';
import 'w3-css/w3.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register';
import StMainView from '../MainView/Student/StMainView';
import GradeList from '../Grades/GradeList/GradeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


class Navbar extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        this.setState({ 
            user: localStorage.getItem('user'),
        });
        console.log(localStorage.getItem('user'));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }

    isLogged(){
        if(localStorage.getItem('user') === null) {
            return false;
        }
        else {
            return true;
        }
    }

    getUsername(){
        return localStorage.getItem('user');
    }

    render() {
        const user = this.setState
        return (
            <Router>
            <div className="w3-bar w3-light-gray w3-border w3-card">
                    <Link to='/' className="w3-bar-item w3-button w3-wide"><img style={{height:"50px", width:"219px"}} src="logo.png" alt="logo"/></Link>
                    <div className="w3-right w3-bar-item">
                            {this.isLogged() && <div className="w3-bar-item w3-button"><FontAwesomeIcon icon={faUser} />{this.getUsername()}</div>  }
                            {this.isLogged() && <button  className="w3-button w3-red" onClick={this.logout}>Log out</button> }
                            <Link to={'/'} className="w3-bar-item w3-button"> Home</Link>
                            <Link to={'/profile'} className="w3-bar-item w3-button">Profile</Link>
                            {!this.isLogged() &&<Link to={'/login'} className="w3-bar-item w3-button">Login</Link>}
                            {!this.isLogged() &&<Link to={'/register'} className="w3-bar-item w3-button">Register</Link>}
                            <Link to={'/courses'} className="w3-bar-item w3-button">Courses</Link>
                            <Link to={'/grades_test'} className="w3-bar-item w3-button">Grades_test</Link>                    
                        </div>  
                    </div>
                <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/courses' component={StMainView} />
                        <Route path='/grades_test' component={GradeList} />
                </Switch>
            </Router>
        );
    }

    
}

export default Navbar;
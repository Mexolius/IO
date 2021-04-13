import React, {Component} from 'react';
import 'w3-css/w3.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register';
import StMainView from '../MainView/Student/StMainView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


type AppState = {
    user?: string,
    logged?: boolean
};

class Navbar extends Component<AppState> {
    state: AppState;
    constructor(props: any) {
        super(props);
        this.state =(
            {
                user: "",
                logged: false
            }
        )
       // this.componentDidMount = this.componentDidMount.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setState(
            {
                user: localStorage.getItem('user'),
                logged: true
            }
        )
      }
      


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        localStorage.removeItem('authData');
        localStorage.removeItem('userID');

        this.setState({
            user: "",
            logged: false
        }
        )
    }

    isLogged(){
        return this.state.logged;
    }

    getUsername(){
        return localStorage.getItem('user');
    }

    render() {
        return (
            <Router>
            <div className="w3-bar w3-light-gray w3-border">
                    <Link to='/' className="w3-bar-item w3-wide"><img style={{height:"50px", width:"219px"}} src="logo.png" alt="logo"/></Link>
                    <div className="w3-right w3-bar-item">
                            {this.isLogged() && <Link to={'/profile'} className="w3-bar-item w3-hover-blue w3-button"><FontAwesomeIcon icon={faUser} /> {this.getUsername()}</Link> }
                            {this.isLogged() && <button  className="w3-button w3-red w3-hover-orange" onClick={this.logout}>Log out</button> }
                            <Link to={'/'} className="w3-bar-item w3-hover-blue w3-button"> Home</Link>
                            {!this.isLogged() &&<Link to={'/login'} className="w3-bar-item w3-hover-blue w3-button">Login</Link>}
                            {!this.isLogged() &&<Link to={'/register'} className="w3-bar-item w3-hover-blue w3-button">Register</Link>}
                            <Link to={'/courses'} className="w3-bar-item w3-hover-blue w3-button">Courses</Link>
                        </div>  
                    </div>
                <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/courses' component={StMainView} />
                </Switch>
            </Router>
        );
    }

    
}

export default Navbar;
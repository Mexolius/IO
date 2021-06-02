import { Component } from 'react';
import 'w3-css/w3.css';
import '../../../Styles/Navbar.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Login from '../Login/Login'
import Register from '../Register/Register';

import * as Navbars from "./RoleNavbars"
import Courses from '../Courses';
import { Database } from '../../../Structure/Database';
import CourseDetails from '../CourseDetails';
import CreateCourse from '../../Teacher/Courses/CreateCourse/CreateCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';


type AppState = {
    user?: string | null,
    nav: JSX.Element
};

class Navbar extends Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = (
            {
                user: null,
                nav: <Navbars.OfUnlogged />
            }
        )
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            const user = localStorage.getItem('user')!;
            this.setState(
                {
                    user: user,
                    nav: this.construct_nav(localStorage.getItem('userRoles')!.split(";"), user)
                }
            )
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        localStorage.removeItem('authData');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRoles');

        this.setState({
            user: null,
            nav: <Navbars.OfUnlogged />
        });
    }

    isLogged(): boolean {
        return this.state.user != null;
    }

    getUsername() {
        return this.state.user ?? "";
    }

    private construct_nav(roles: Array<String>, username: string): JSX.Element {
        if (roles.includes("STUDENT")) {
            return (<Navbars.OfStudent logout={this.logout} username={username} />)
        }
        if (roles.includes("TEACHER")) {
            return (<Navbars.OfTeacher logout={this.logout} username={username} />)
        }
        if (roles.includes("ADMIN")) {
            return (<Navbars.OfAdmin logout={this.logout} username={username} />)
        }
        return (<>WHAT ARE YOU?</>)
    }

    render() {
        return (
            <>
            <div style={{minHeight:"calc(90vh - 10em - 9px"}}>
                <Router>
                <div className="nav-bar">
                    <Link to='/' className="w3-bar-item w3-wide"><img style={{padding:"8px 0 0 8px", height: "50px", width: "219px" }} src="logo.png" alt="logo" /></Link>
                    <div className=" menu w3-right w3-bar-item">
                        <Link to={'/'} className=" w3-bar-item w3-button"> Home</Link>
                        {this.state.nav}
                    </div>
                </div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/courses/all'><Courses course_fetch_fun={Database.getAllCourses}/> </Route>
                    <Route path='/courses/my'><Courses course_fetch_fun={Database.getMyCourses}/></Route>
                    <Route path='/courses/add' component={CreateCourse} />
                    <Route exact path='/courses/details/:id'><CourseDetails /></Route>
                </Switch>
            </Router>
            
            </div>
            <footer>                
                
                <div className="flex-col">
                    Social media space
                    <div className="flex-row" >
                        <FontAwesomeIcon icon={faFacebook} size={'2x'} inverse/>
                        <FontAwesomeIcon icon={faTwitter} size={'2x'} inverse/>
                        <FontAwesomeIcon icon={faTwitch} size={'2x'} inverse/>
                    </div>
                    
                </div>
                
                <div>Drugi navbar? Informacje? Kontakt</div>
                <div className="flex-col">
                    <div className="flex-row" >
                        <div>Authors and stuff</div>
                    </div>
                    <div className="flex-row" >
                        <div>Paweł Kopel</div>
                        <div>Paweł Miziołek</div>
                    </div>
                    <div className="flex-row" >
                        <div>Marek Ślązak</div>
                        <div>Sebastian Wąwoźny </div>
                        <div>Paweł Tyszko</div>
                    </div>
                    
                    
                    
                </div>
            </footer>
            </>
        );
    }


}

export default Navbar;
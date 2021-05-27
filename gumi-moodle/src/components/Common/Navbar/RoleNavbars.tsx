import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const OfUnlogged = () => {
    return (<>
        <Link to={'/login'} className="w3-bar-item w3-button">Login</Link>
        <Link to={'/register'} className="w3-bar-item w3-button">Register</Link>
    </>);
}

const OfStudent = (props: { logout: any, username: string }) => {
    return (<>
        <Link to={'/courses/all'} className="w3-bar-item w3-button">All Courses</Link>
        <Link to={'/courses/my'} className="w3-bar-item w3-button">My Courses</Link>
        <OfLogged logout={props.logout} username={props.username} />
    </>);
}

const OfTeacher = (props: { logout: any, username: string }) => {
    return (<>
        <Link to={'/courses/my'} className="w3-bar-item w3-button">My Courses</Link>
        <Link to={'/courses/add'} className="w3-bar-item w3-button">Add course</Link>
        <OfLogged logout={props.logout} username={props.username} />
    </>);
}

const OfAdmin = (props: { logout: any, username: string }) => {
    return (<>
        
        <Link to={'/courses/all'} className="w3-bar-item w3-button">Admin Courses</Link>
        <Link to={'/courses/add'} className="w3-bar-item w3-button">Add course</Link>
        <OfLogged logout={props.logout} username={props.username} />
    </>);
}

const OfLogged = (props: { logout: any, username: string }) => {
    return (<>
        <Link to={'/profile'} className="w3-bar-item w3-button"><FontAwesomeIcon icon={faUser} /> {props.username}</Link>
        <button id={'logout'} className="w3-button w3-red" onClick={props.logout}>Log out</button>
    </>);
}

export { OfUnlogged, OfStudent, OfTeacher, OfAdmin }
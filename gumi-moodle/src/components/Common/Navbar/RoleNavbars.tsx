import { Link } from 'react-router-dom';
import Notifications from './Notifications/Notifications';


const OfUnlogged = () => {
    return (
        <>
            <Link to={'/login'} className="w3-bar-item w3-button">Login</Link>
            <Link to={'/register'} className="w3-bar-item w3-button">Register</Link>
        </>
    );
}

const OfStudent = (props: { logout: any, username: string }) => {
    return (
        <>
            <OfLogged logout={props.logout} username={props.username} />
            <Link to={'/courses/all'} className="w3-bar-item w3-button">All Courses</Link>
            <Link to={'/courses/my'} className="w3-bar-item w3-button">My Courses</Link>
        </>
    );
}

const OfTeacher = (props: { logout: any, username: string }) => {
    return (
        <>
            <OfLogged logout={props.logout} username={props.username} />
            <Link to={'/courses/my'} className="w3-bar-item w3-button">My Courses</Link>
            <Link to={'/courses/add'} className="w3-bar-item w3-button">Add course</Link>
        </>
    );
}

const OfAdmin = (props: { logout: any, username: string }) => {
    return (
        <>
            <OfLogged logout={props.logout} username={props.username} />
            <Link to={'/courses/all'} className="w3-bar-item w3-button">Admin Courses</Link>
            <Link to={'/courses/add'} className="w3-bar-item w3-button">Add course</Link>
        </>
    );
}

const OfLogged = (props: { logout: any, username: string }) => {
    return (
        <>
            <Notifications nots={[{courseID:"aaaa",gradeID:"bbb",timeStamp:"1549312452"},{courseID:"aaaa",gradeID:"bbb",timeStamp:"1549312452"}]} />
            <Link to={'/profile'} className="w3-bar-item w3-button">Profile</Link>
            <button id={'logout'} className="w3-button w3-red" onClick={props.logout}>Log out</button>
        </>
    );
}

export { OfUnlogged, OfStudent, OfTeacher, OfAdmin }
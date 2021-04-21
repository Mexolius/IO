import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateCourse from '../CreateCourse/CreateCourse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'
import CourseDetails from '../CourseViewing/CourseDetails/CourseDetails';
import CreateGrade from '../../Grades/CreateGrade/CreateGrade';
import Courses from '../CourseViewing/Courses';



export default class MainView extends Component {

    render() {
        return (
            <Router>
                <div className="w3-section w3-bottombar w3-topbar w3-dark-gray w3-padding-16 w3-center">
                    <Link to={'/add_course'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faPlus} /> Add Course</Link>
                    <Link to={'/add_grade'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faPlus} /> Add Grade</Link>
                    <Link to={'/all_courses'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faList} /> All Courses</Link>
                    <Link to={'/my_courses'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faList} /> My Courses</Link>
                </div>
                <div className="w3-container w3-light-gray w3-border w3-padding-16">

                    <Switch>
                        <Route path='/add_course' component={CreateCourse} />
                        <Route path='/add_grade' component={CreateGrade} />
                        <Route path='/my_courses' render={()=>(<Courses url={"http://localhost:8080/courses/of-student/"+localStorage.getItem('userID')}/>)} />
                        <Route path='/all_courses' render={()=>(<Courses url="http://localhost:8080/courses"/>)} />
                        <Route exact path='/course_details/:id' children={<CourseDetails />} />

                    </Switch>
                </div>
            </Router>
        )
    }
}
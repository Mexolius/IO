import { Component } from 'react'
//import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateCourse from '../CreateCourse/CreateCourse';
import CourseList from '../CourseList/CourseList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import CourseDetails from '../CourseList/CourseDetails';
import CreateGrade from '../../Grades/CreateGrade/CreateGrade';



export default class StMainView extends Component {

    render() {
        return (
            <Router>

                <div className="w3-section w3-bottombar w3-topbar w3-dark-gray w3-padding-16 w3-center">
                    <Link to={'/add_course'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faPlus} /> Add Course</Link>
                    <Link to={'/add_grade'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faPlus} /> Add Grade</Link>
                    <Link to={'/all_courses'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faList} /> My Courses</Link>
                </div>
                <div className="w3-container w3-light-gray w3-border w3-padding-16">

                    <Switch>
                        <Route path='/add_course' component={CreateCourse} />
                        <Route path='/add_grade' component={CreateGrade} />
                        <Route path='/all_courses' component={CourseList} />
                        <Route exact path='/course_details/:id' children={<CourseDetails />} />

                    </Switch>
                </div>
            </Router>

        )
    }
}
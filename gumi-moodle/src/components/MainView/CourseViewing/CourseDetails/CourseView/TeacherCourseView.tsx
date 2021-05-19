import AbstractCourseView from "./AbstractCourseView";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import DefineGrade from '../../../../Grades/DefineGrade/DefineGrade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faOutdent, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import StudentsList from "../../../../Students/StudentsList";
import ChangeGrade from "../../../../Grades/ChangeGrade/ChangeGrade";
import LoadingWrapper from "../../../../LoadingComponent/LoadingWrapper";
import ExportData from "../ExportData"

import AddTeacher from "../AddTeacher"

class TeacherCourseView extends AbstractCourseView{

    render() {
                return (
                    <Router>
                        <div className="w3-section w3-bottombar w3-topbar w3-dark-gray w3-padding-16 w3-center">
                            <Link to={'/define_grade'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faPlus} /> Define Grade</Link>
                            <Link to={'/students_list'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faList} /> Students List</Link>
                            <Link to={'/add_teacher'} className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faUser} /> Add Teacher</Link>
                            <Link to={'/export_data'} download="data.ccsv" className="w3-button w3-border w3-light-gray"><FontAwesomeIcon icon={faOutdent} /> Export Data</Link>
                        </div>
                        <div className="w3-container w3-light-gray w3-border w3-padding-16">
                            <Switch>
                                <Route path='/define_grade' render={()=>(<DefineGrade course_id={this.props.courseID}/>)} />
                                <Route path='/students_list' render={()=>(<StudentsList course={this.state.data}/>)} />
                                <Route path='/add_teacher' render={()=>(<AddTeacher course_id={this.props.courseID}/>)} />
                                <Route path='/export_data' render={()=>(<ExportData course_id={this.props.courseID}/>)} />
                                <Route exact path='/change_grade/:id' children={<ChangeGrade {...this.state.data} /> } />
                            </Switch>
                            
                        </div>
                    </Router>
                    )
                }
}


export default LoadingWrapper(TeacherCourseView, "Fetching grades...")
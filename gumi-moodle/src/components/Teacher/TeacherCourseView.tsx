import AbstractCourseView from "../../Structure/AbstractCourseView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DefineGrade from "./Grades/DefineGrade/DefineGrade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faList, faOutdent, faPlus, faUser, faEdit } from "@fortawesome/free-solid-svg-icons"
import StudentsList from "./Courses/StudentList/StudentsList";
import ChangeGrade from "./Grades/ChangeGrade/ChangeGrade";
import ChangeThresholds from "./Grades/ChangeThresholds/ChangeThresholds";
import LoadingWrapper from "../../Structure/LoadingComponent/LoadingWrapper";
import ExportData from "./Courses/ExportData"

import AddTeacher from "./Courses/AddTeacher"

class TeacherCourseView extends AbstractCourseView{

    render() {
                return (
                    <div className="flex-row course-container">
                    <Router>
                        <div className="menu-wrapper flex-col">
                            <Link to={`/courses/details/${this.state.data._id}/define_grade`}><FontAwesomeIcon icon={faPlus} /> Define Grade</Link>
                            <Link to={`/courses/details/${this.state.data._id}/change_thresholds`}><FontAwesomeIcon icon={faEdit} /> Change Thresholds</Link>
                            <Link to={`/courses/details/${this.state.data._id}/students_list`}><FontAwesomeIcon icon={faList} /> Students List</Link>
                            <Link to={`/courses/details/${this.state.data._id}/add_teacher`}><FontAwesomeIcon icon={faUser} /> Add Teacher</Link>
                            <Link to={`/courses/details/${this.state.data._id}/export_data/csv`} download="data.csv"><FontAwesomeIcon icon={faOutdent} />Export CSV</Link>
                            <Link to={`/courses/details/${this.state.data._id}/export_data/xlsx`} download="data.csv"><FontAwesomeIcon icon={faOutdent} />Export XLSX</Link>
                        </div>
                        <div className="flex-col course-list-grades">
                            <Switch>
                                <Route path={`/courses/details/${this.state.data._id}/define_grade`} render={()=>(<DefineGrade course_id={this.props.courseID}/>)} />
                                <Route path={`/courses/details/${this.state.data._id}/change_thresholds`} render={()=>(<ChangeThresholds {...this.state.data}/>)} />
                                <Route path={`/courses/details/${this.state.data._id}/students_list`} render={()=>(<StudentsList course={this.state.data}/>)} />
                                <Route path={`/courses/details/${this.state.data._id}/add_teacher`} render={()=>(<AddTeacher course_id={this.props.courseID}/>)} />
                                <Route path={`/courses/details/${this.state.data._id}/export_data/csv`} render={()=>(<ExportData format="csv" course_id={this.props.courseID}/>)} />
                                <Route path={`/courses/details/${this.state.data._id}/export_data/xlsx`} render={()=>(<ExportData format="xlsx" course_id={this.props.courseID}/>)} />
                                <Route exact path={`/courses/details/${this.state.data._id}/change_grade/:id`} children={<ChangeGrade {...this.state.data} /> } />
                            </Switch>
                        </div>
                            
                            
                        
                    </Router>

                    </div>
                    )
                }
}


export default LoadingWrapper(TeacherCourseView, "Fetching grades...")
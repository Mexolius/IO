import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { Course } from "../../Structure/DataModel.interface";
import { Component } from "react";
import { Link } from "react-router-dom"


export class StudentsList extends Component<{course:Course}>{

    render(){
        return(
            <div>
                        <h3>Students</h3>
                        <ul className="w3-ul w3-card-4 " style={{overflow: "scroll"}}>
                            {this.props.course.students.map((student, key) => {
                                return (
                                    <li className="w3-bar w3-white w3-hover-light-gray">
                                        <div className="w3-bar-item">
                                        <FontAwesomeIcon icon={faUserGraduate} />
                                        {student}
                                        </div>
                                        
                                        <Link key={"course_" + key} to={'./change_grade/' + student}>
                                        <button className="w3-button w3-right w3-teal w3-hover-green">Add Grade</button>
                                        </Link>
                                    </li>
                                );
                            })}
                            </ul>
                            </div>
        )
    }
}
export default StudentsList;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { Student } from "../../../../Structure/DataModel.interface";
import { Link } from "react-router-dom"



const StudentsList = (props: {students: Array<Student>}) =>{
    return(
        <div>
        <h3>Students</h3>
            <ul className="w3-ul w3-card-4" style={{overflow: "scroll"}}>
        {
            props.students.map((v,k)=>{
                return (
                    <li key={'student_'+k} className="w3-bar w3-white w3-hover-light-gray">
                        <div className="w3-bar-item">
                        <FontAwesomeIcon className="w3-margin-right" icon={faUserGraduate} />
                        {v.firstName}
                        </div>
                        
                        <Link key={"course_" + k} to={'./change_grade/' + v._id}>
                        <button style={{backgroundColor: "#5d99c6"}} className="w3-button w3-text-white w3-right w3-hover-blue">Add Grade</button>
                        </Link>
                        
                    </li>
                );
            })
        }
        </ul>
        </div>
    )
}

export default StudentsList;
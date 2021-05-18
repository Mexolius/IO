import { useState } from 'react';
import { useParams } from 'react-router';
import { Course } from '../../../Structure/DataModel.interface';
import AddGrade from "../../Grades/AddGrade/AddGrade";


const ChangeGrade = (course: Course) => {
    let { id } = useParams<{  id: string }>();
    const [choosenGradeModel, setchoosenGradeModel] = useState("")
    const [state, setState] = useState(0)

    if(localStorage.getItem('userRoles')?.includes("TEACHER")){
        if(state === 0){
            
            return (
                       <div>
                           <h3>Choose grade model:</h3>
                            <select className="w3-select" onChange={(e) => setchoosenGradeModel(e.target.value)}>
                             {course.grades.map(e => {
                          return (
                              <option value={e._id}>{e.name}</option>
                          )
                          })
                           }
                            </select>
                     <button className="w3-btn w3-hover-green w3-right w3-teal" onClick={() => setState(1)}>Submit</button>
                      </div>   )
        }
        else {
            return (
            <AddGrade course={course} choosenGradeModelID={choosenGradeModel} studentID={id} />)

        }
    } 
    else {
        return null
    }
}

export default ChangeGrade;
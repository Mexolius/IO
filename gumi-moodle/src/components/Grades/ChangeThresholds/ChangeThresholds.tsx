import { useState } from 'react';
import { useParams } from 'react-router';
import { Course } from '../../../Structure/DataModel.interface';
import AddGrade from "../AddGrade/AddGrade";
import AddThresholds from '../AddThresholds/AddThresholds';


const ChangeThresholds = (course: Course) => {
    const [choosenGradeModel, setchoosenGradeModel] = useState(course.grades[0]._id)
    const [state, setState] = useState(0)

    if(localStorage.getItem('userRoles')?.includes("ADMIN")){
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
            <AddThresholds course={course} choosenGradeModelID={choosenGradeModel} />)

        }
    } 
    else {
        return null
    }
}

export default ChangeThresholds;
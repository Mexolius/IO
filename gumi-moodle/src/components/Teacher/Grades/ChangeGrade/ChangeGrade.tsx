import { useState } from 'react';
import { useParams } from 'react-router';
import { Course } from '../../../../Structure/DataModel.interface';
import AddGrade from "../AddGrade/AddGrade";


const ChangeGrade = (course: Course) => {
    let { id } = useParams<{  id: string }>();
    const [choosenGradeModel, setchoosenGradeModel] = useState("")
    const [state, setState] = useState(0)

    if(localStorage.getItem('userRoles')?.includes("ADMIN")){
        if(state === 0){
            
            return (
                         <div className="w3-card w3-margin w3-padding ">
                         <h4 className="w3-border-bottom w3-border-dark-gray w3-text-dark-gray w3-margin-bottom">Choose grade model:</h4>
                            <select className="w3-select w3-light-gray w3-border" onChange={(e) => setchoosenGradeModel(e.target.value)}>
                             {course.grades.map(e => {
                          return (
                              <option value={e._id}>{e.name}</option>
                          )
                          })
                           }
                            </select>
                            <div className="w3-bar w3-white w3-margin-top">
                                <button style={{backgroundColor: "#5d99c6"}} className="w3-btn w3-hover-blue w3-right w3-text-white" onClick={() => setState(1)}>Submit</button>
                            </div>
                      </div>   
                    )
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
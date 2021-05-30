import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {Instructor} from "../../../Structure/DataModel.interface"

import "./TeacherList.css"

const TeacherList = (props: {teachers: Array<Instructor>}) =>{
    const [expanded, setExpanded] = useState(false);
    return(
    <>
    <div onClick={()=>setExpanded(!expanded)}>Teachers</div>
    <div className={"w3-container collapsible-content"} style={ expanded? {maxHeight:"200px", opacity:1}:{maxHeight:"0", opacity:0} }>
        
        {
            props.teachers.map((v,k)=>{
               return(<div style={{justifyContent:"center", alignItems:"center"}} className="flex-row" key={"teach_" + k}>
               <FontAwesomeIcon icon={faUserGraduate} />
               <div>
                   {v.firstName} {v.lastName}
               </div>
           </div>)
            })
        }
    </div>
    </>)
}

export default TeacherList;
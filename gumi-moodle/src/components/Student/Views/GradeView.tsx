import { Grade } from "../../../Structure/DataModel.interface"
import GradeList from "../GradeList/GradeList"

const GradeView = (props:{grades:Array<Grade>})=>{
    return <GradeList grades={props.grades}/>
}

export default GradeView;
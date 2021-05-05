import { useParams } from 'react-router';
import { Course } from '../../../Structure/DataModel.interface';
import AddGrade from "../../Grades/AddGrade/AddGrade";


const ChangeGrade = (course: Course) => {
    let { id } = useParams<{  id: string }>();
    if(localStorage.getItem('userRoles')?.includes("TEACHER")){
        return (<AddGrade course={course} studentID={id} />);
    }
    else {
        return null
    }
}

export default ChangeGrade;
import { useParams } from 'react-router';

import StudenCourseView from './CourseView/StudentCourseView';
import TeacherCourseView from './CourseView/TeacherCourseView';

const CourseDetails = () => {
    let { id } = useParams<{  id: string }>();
    if(localStorage.getItem('userRoles')?.includes("TEACHER")){
        return (<StudenCourseView courseID={parseInt(id)} />);
    }
    else{
        return (<TeacherCourseView courseID={parseInt(id)} />);
    }
}

export default CourseDetails;
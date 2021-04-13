import { useParams } from 'react-router';

import StudenCourseView from './CourseView/StudentCourseView';
import TeacherCourseView from './CourseView/TeacherCourseView';

const CourseDetails = () => {
    let { id } = useParams<{  id: string }>();
    if(localStorage.getItem('userRoles')?.includes("TEACHER")){
        return (<TeacherCourseView courseID={id} />);
    }
    else{
        return (<StudenCourseView courseID={id} />);
    }
}

export default CourseDetails;
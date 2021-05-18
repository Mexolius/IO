import { useParams } from 'react-router';

import StudentCourseView from './CourseView/StudentCourseView';
import TeacherCourseView from './CourseView/TeacherCourseView';

const CourseDetails = () => {
    const { id } = useParams<{  id: string }>();
    console.log(id)
    if(localStorage.getItem('userRoles')?.includes("ADMIN")){
        return (<TeacherCourseView courseID={id} />);
    }
    else{
        return (<StudentCourseView courseID={id} />);
    }
}

export default CourseDetails;
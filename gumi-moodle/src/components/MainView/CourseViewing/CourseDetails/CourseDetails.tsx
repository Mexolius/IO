import { useParams } from 'react-router';

import StudentCourseView from './CourseView/StudentCourseView';
import TeacherCourseView from './CourseView/TeacherCourseView';

const CourseDetails = () => {
    const { id } = useParams<{id: string }>();

    if(localStorage.getItem('userRoles')?.includes("STUDENT")){
        return (<StudentCourseView courseID={id} />);
    }
    else{
        return (<TeacherCourseView courseID={id} />);
    }
}

export default CourseDetails;
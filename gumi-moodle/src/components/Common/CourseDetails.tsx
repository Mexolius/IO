import { useParams } from 'react-router';

import StudentCourseView from '../Student/StudentCourseView';
import TeacherCourseView from '../Teacher/TeacherCourseView';

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
import { useParams } from 'react-router';

import StudenCourseView from './CourseView/StudentCourseView';
import TeacherCourseView from './CourseView/TeacherCourseView';

const CourseDetails = () => {
    let { studentID, courseID } = useParams<{ studentID: string, courseID: string }>();
    if(localStorage.getItem('userRoles')?.includes("TEACHER")){
        return (<StudenCourseView studentID={parseInt(studentID)} courseID={parseInt(courseID)} />);
    }
    else{
        return (<TeacherCourseView studentID={parseInt(studentID)} courseID={parseInt(courseID)} />);
    }
}

export default CourseDetails;
import AbstractCourseView from "./AbstractCourseView";

//temp
interface Student{}

export default class TeacherCourseView extends AbstractCourseView{

    render(){
        return(<div>Hello Teacher Course View</div>)
    }
}
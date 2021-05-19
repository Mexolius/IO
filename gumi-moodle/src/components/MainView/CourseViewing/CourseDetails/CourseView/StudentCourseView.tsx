import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradeList from "../../../../Grades/GradeList/GradeList";
import LoadingWrapper from "../../../../LoadingComponent/LoadingWrapper";
import ResponseError from "../../../../RepsonseError/ResponseError";
import AbstractCourseView from "./AbstractCourseView";

class StudenCourseView extends AbstractCourseView{



    render() {
        switch (this.state.status) {
            case 0:
                return(<></>)
            case 200:
                return (
                        <div className="flex-row course-container">
                            <div className="instructor-wrapper border-thin">
                                <div className="instructor-header">Instructors</div>
                                <div className="flex-col instructor-list">
                                    {this.state.data.teachers.map((inst, key) => {
                                        return (
                                            <div className="flex-row" key={"inst_" + key}>
                                                <FontAwesomeIcon icon={faUserGraduate} />
                                                <div>
                                                    {inst.firstName} {inst.lastName}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex-col course-list-grades" style={{}}>
                                <div className="course-header border-thin flex-row">
                                    <div className="course-header">
                                        <h2 className="line-below">{this.state.data.name}</h2>
                                        <p className="description">{this.state.data.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit natus vero non consectetur nostrum mollitia aliquid modi consequatur explicabo eveniet.</p>
                                    </div>
                                    
                                    {
                                    !this.state.data.isEnrolled
                                    &&<button className="w3-button w3-green join-button" onClick={this.joinCourse}>Join course!</button>
                                    }
                                </div>
                                {
                                    this.state.data.isEnrolled
                                    ?<div>
                                        <h2>Your grades</h2>
                                        <GradeList grades={this.state.data.grades}/>
                                    </div>
                                    :<h2>Enroll to see your grades!</h2>
                                }
                                
                            </div>
                        </div>
                )
            default:
                return <ResponseError status={this.state.status} />
        }
    }
}

export default LoadingWrapper(StudenCourseView, "Fetching grades...")
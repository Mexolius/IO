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
                                                {inst}
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
                                    !this.state.data.students.includes(localStorage.getItem('userID')!)
                                    &&<button className="w3-button w3-green join-button" onClick={this.joinCourse}>Join course!</button>
                                    }
                                </div>
                                <div>
                                    <h2>Your grades</h2>
                                    <GradeList zindex={0} grades={this.state.data.grades}/>
                                </div>
                            </div>
                        </div>
                )
            default:
                return <ResponseError status={this.state.status} />
        }
    }
}

export default LoadingWrapper(StudenCourseView, "Fetching grades...")
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
                    <div>
                        <div>Hello Course {this.state.data.name} Details </div>
                        <div className="course-container">
                            <div>
                                <h3>Prowadzący</h3>
                                <div className="instructor-list">
                                    {this.state.data.teachers.map((inst, key) => {
                                        return (
                                            <li key={"inst_" + key}>
                                                <FontAwesomeIcon icon={faUserGraduate} />
                                                {inst}
                                            </li>
                                        );
                                    })}
                                </div>
                            </div>
                            {
                                localStorage.getItem('userID')==null
                                ?<GradeList grades={[]}/>
                                :<GradeList grades={this.state.data.gradeModel}/>
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
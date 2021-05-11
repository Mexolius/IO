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
                        <div className="flex-gap course-container">
                            <div style={{background: "#d1d9ff"}}>
                                <h3>Prowadzący</h3>
                                <div className="instructor-list flex-gap">
                                    {this.state.data.teachers.map((inst, key) => {
                                        return (
                                            <div key={"inst_" + key}>
                                                <FontAwesomeIcon icon={faUserGraduate} />
                                                {inst}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex-gap course-list-grades" style={{flexDirection:"column"}}>
                                <div className="border-thin course-header">
                                    <h2>{this.state.data.name}</h2>
                                    <p>{this.state.data.description}</p>
                                </div>
                                <div>
                                    <h2>Your grades</h2>
                                    <GradeList grades={this.state.data.grades}/>
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
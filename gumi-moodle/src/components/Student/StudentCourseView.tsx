import LoadingWrapper from "../../Structure/LoadingComponent/LoadingWrapper";
import ResponseError from "../../Structure/ResponseError";
import AbstractCourseView from "../../Structure/AbstractCourseView";
import TeacherList from "./TeacherList/TeacherList";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import GradeView from "./Views/GradeView";
import GraphView from "./Views/GraphView";
import AchievementView from "./Views/AchievementView";

class StudenCourseView extends AbstractCourseView {
    render() {

        console.log(this.state.data);
        switch (this.state.status) {
            case 0:
                return (<></>)
            case 200:
                return (
                    <div className="flex-row course-container">

                        <Router>
                            <div className="menu-wrapper flex-col">
                                <Link to={`/courses/details/${this.state.data._id}/grades`}>Grades</Link>
                                <Link to={`/courses/details/${this.state.data._id}/stats`}>Statistics</Link>
                                <Link to={`/courses/details/${this.state.data._id}/achievements`}>Achievements</Link>
                                <TeacherList teachers={this.state.data.teachers} />
                            </div>
                            <div className="flex-col course-list-grades">
                                <div className="course-header border-thin flex-row">
                                    <div className="course-header">
                                        <h2 className="line-below">{this.state.data.name}</h2>
                                        <p className="description">{this.state.data.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit natus vero non consectetur nostrum mollitia aliquid modi consequatur explicabo eveniet.</p>
                                    </div>

                                    {
                                        !this.state.data.isEnrolled
                                        && <button className="w3-button w3-green join-button" onClick={this.joinCourse}>Join course!</button>
                                    }
                                </div>
                                <Switch>
                                    <Route exact path={`/courses/details/${this.state.data._id}/grades`} render={() => <GradeView grades={this.state.data.grades} />} />
                                    <Route exact path={`/courses/details/${this.state.data._id}/stats`} render={() => <GraphView _id={this.state.data._id} />} />
                                    <Route exact path={`/courses/details/${this.state.data._id}/achievements`} component={AchievementView} />
                                </Switch>
                            </div>


                        </Router>



                    </div >
                )
            default:
                return <ResponseError status={this.state.status} />
        }
    }
}

export default LoadingWrapper(StudenCourseView, "Fetching grades...")
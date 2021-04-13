import { Component } from "react";
import { Course } from "../../CourseUtils";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import ResponseError from "../../../../RepsonseError/ResponseError";

import '../CourseDetails.css'
import axios from "axios";

export default class AbstractCourseView extends Component<{ courseID: number }, { course: Course, status: number }>{
    constructor(props: { courseID: number }) {
        super(props);

        this.state = {
            status: 0,
            course: {} as Course //type safety not lost cause status 0 doesn't allow to render with missing data
        }
    }

    render() {
        console.log(this.state.status)
        switch (this.state.status) {
            case 0:
                return (<div>Loading...</div>)
            case 200:
                
                return (
                    <div>
                        <div>Hello Course {this.state.course.name} Details </div>
                        {/*<div className="course-container">
                            <div>
                                <h3>Prowadzący</h3>
                                <div className="instructor-list">
                                    {this.state.course.teachers.map((inst, key) => {
                                        return (
                                            <li key={"inst_" + key}>
                                                <FontAwesomeIcon icon={faUserGraduate} />
                                                {inst}
                                            </li>
                                        );
                                    })}
                                </div>
                            </div>

                            <GradeList grades={this.state.course.grades} />
                        </div>*/}
                    </div>

                )
            default:
                return <ResponseError status={this.state.status} />
        }
    }

    componentDidMount() {
        console.log(`http://localhost:8080/courses/${localStorage.getItem('userID')}/${this.props.courseID}`)
        axios(
            {
                method: 'get',
                url: `localhost:8080/courses/${localStorage.getItem('userID')}/${this.props.courseID}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Authorization': 'Basic ' + localStorage.getItem('authData'),
                }
            })
            .then(res => {
                console.log(res);
                /*this.setState({
                    course: res.data,
                    status: 200
                });*/
            })
            .catch(err => {
                console.log(err);
                if (err.response) {
                    this.setState({ status: err.response.status });
                }
                else this.setState({ status: -1 });

            });

    }
}
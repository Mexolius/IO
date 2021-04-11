import { Component } from 'react';
import { useParams } from 'react-router';
//import axios from 'axios';
import ResponseError from '../../RepsonseError/ResponseError';
import GradeList, { Grade } from '../../Grades/GradeList/GradeList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'

import './CourseDetails.css'

const CourseDetails = () => {
    let { id } = useParams<{ id: string }>();
    return (<CourseBody id={parseInt(id)}></CourseBody>);
}

interface Course {
    name: string,
    instructors: Array<String>,
    grades: Array<Grade>;
}

class CourseBody extends Component<{ id: number }, { course: Course, status: number }>{
    constructor(props: { id: number }) {
        super(props);

        this.state = {
            status: 0,
            course: {} as Course //type safety not lost cause status 0 doesn't allow to render with missing data
        }
    }

    render() {
        switch (this.state.status) {
            case 0:
                return (<div>Loading...</div>)
            case 200:
                return (
                    <div>
                        <div>Hello Course {this.state.course.name} Details </div>
                        <div className="course-container">
                            <div>
                                <h3>Prowadzący</h3>
                                <div className="instructor-list">
                                {this.state.course.instructors.map((inst, key) => {
                                    return (
                                        <li key={"inst_" + key}>
                                            <FontAwesomeIcon icon={faUserGraduate}/>
                                            {inst}
                                        </li>
                                    );
                                })}
                            </div>
                            </div>
                            
                            <GradeList grades={this.state.course.grades} />
                        </div>
                    </div>

                )
            default:
                return <ResponseError status={this.state.status} />
        }
    }

    componentDidMount() {
        /*axios.get('localhost:8080/courses/'+this.props.id)
        .then(res=>{
            this.setState({
                course: res.data,
                status: 200
            });
        })
        .catch(err=>{
            if(err.response){
                this.setState({status: err.response.status});
            }
            else this.setState({status: -1});

        });*/

        this.setState({
            status: 200,
            course: {
                name: "FajnyKurs",
                instructors: ["Jan Kowalski", "Wacław Frydrych"],
                grades: Array.from(
                    new Array<Grade>(10), () => {
                        return {
                            data: {
                                max: 100,
                                current: ~~(Math.random() * 100),
                                name: "Parent"
                            },
                            children: Math.random() < 0.2 ? [{
                                data: {
                                    max: 100,
                                    current: ~~(Math.random() * 100),
                                    name: "Child"
                                },
                                children: []
                            }, {
                                data: {
                                    max: 100,
                                    current: ~~(Math.random() * 100),
                                    name: "Child"
                                },
                                children: [{
                                    data: {
                                        max: 100,
                                        current: ~~(Math.random() * 100),
                                        name: "Child"
                                    },
                                    children: []
                                }, {
                                    data: {
                                        max: 100,
                                        current: ~~(Math.random() * 100),
                                        name: "Child"
                                    },
                                    children: []
                                }]
                            }, {
                                data: {
                                    max: 100,
                                    current: ~~(Math.random() * 100),
                                    name: "Child"
                                },
                                children: []
                            }] : []
                        }
                    }
                )
            }
        });
    }
}

export default CourseDetails;
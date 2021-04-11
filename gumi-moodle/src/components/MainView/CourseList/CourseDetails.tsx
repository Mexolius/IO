import { Component } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Grade } from '../../Grades/GradeDisplay/GradeDisplay';
import ResponseError from '../../RepsonseError/ResponseError';
import GradeList from '../../Grades/GradeList/GradeList';

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
                        <div>
                            <div><ul>
                                {this.state.course.instructors.map((inst, key)=>{
                                    return(<li key={"inst_"+key}>{inst}</li>);
                                })}    
                            </ul></div>
                            <GradeList grades={this.state.course.grades}/>
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
            course:{
                name: "FajnyKurs",
                instructors: ["Jan Kowalski", "Wacław Frydrych"],
                grades: Array.from(
                    new Array<Grade>(40), () => {
                        return {
                            max: 100,
                            current: ~~(Math.random() * 100),
                            name: "abc",
                            children: []
                        }
                    }
                )
            }
        });
    }
}

export default CourseDetails;
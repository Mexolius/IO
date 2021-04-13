import { Component } from "react";
import { Course } from "../../CourseUtils";

import '../CourseDetails.css'
import axios from "axios";

export default class AbstractCourseView<Type> extends Component<{ courseID: string }, { course: Course<Type>, status: number }>{
    constructor(props: { courseID: string }) {
        super(props);

        this.state = {
            status: 0,
            course: {} as Course<Type> //type safety not lost cause status 0 doesn't allow to render with missing data
        }
    }

    componentDidMount() {
        console.log(`http://localhost:8080/courses/${localStorage.getItem('userID')}/${this.props.courseID}`)
        axios(
            {
                method: 'get',
                url: `http://localhost:8080/courses/${localStorage.getItem('userID')}/${this.props.courseID}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Authorization': 'Basic ' + localStorage.getItem('authData'),
                }
            })
            .then(res => {
                console.log(res.data);
                if(res.status===200){
                    this.setState({
                        course: res.data,
                        status: 200
                    });
                    return;
                }
                this.setState({
                     status: res.status
                });
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
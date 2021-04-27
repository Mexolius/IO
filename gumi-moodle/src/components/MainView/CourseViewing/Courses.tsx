import { Component } from 'react'
import ResponseError from '../../RepsonseError/ResponseError'
import axios from 'axios';

import CourseList from './CourseUtils';
import { Database } from '../../../Structure/Database';
import { ApiRequestState, CourseData } from '../../../Structure/DataModel.interface';

interface IProps {
    readonly url: string
}

interface IState extends ApiRequestState<Array<CourseData>> { }

export default class Courses extends Component<IProps, IState>{

    constructor(props: { url: string }) {
        super(props);

        this.state = {
            data: new Array<CourseData>(),
            status: 0
        };
    }

    componentDidMount() {
        //this.getCourses(); // API calls in componentDidMount are safer;
        Database.getAllCourses()
            .then(courses => {
                this.setState({
                    data: courses,
                    status: 200
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    status: err.status
                })
            })
    }

    getCourses() {
        /*if (localStorage.getItem('userID') == null) {
            this.setState({
                status: 403
            });
            return;
        }
        axios({
            method: 'get',
            url: this.props.url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain; charset=utf-8',
                'Authorization': 'Basic ' + localStorage.getItem('authData'),
            }
        })
            .then(response => {
                if (response.status === 200) {
                    const courses = JSON.parse(JSON.stringify(response.data));

                    this.setState({
                        status: 200,
                        ls: courses.map(
                            (course: { [x: string]: any; }) => {
                                return {
                                    name: course['name'],
                                    id: course['_id'],
                                    description: course['description'],
                                    studentsLimit: course['studentsLimit'],
                                    students: course['students'],
                                    teachers: course['teachers']
                                }
                            })
                    });
                }
                else
                    this.setState({
                        status: response.status
                    });

            })
            .catch(err => {
                console.log(err);
                if (err.response)
                    this.setState({
                        status: err.response
                    });
                else
                    this.setState({
                        status: -1
                    });
            });*/
    }


    render() {
        switch (this.state.status) {
            case 0:
                return (
                    <div>Loading...</div>
                );
            case 200:
                return (
                    <CourseList data={this.state.data} />
                );
            default:
                return (
                    <ResponseError status={this.state.status} />
                );
        }
    }
}
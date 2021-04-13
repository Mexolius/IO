import { Component } from 'react'
import ResponseError from '../../RepsonseError/ResponseError'
import axios from 'axios';
//import axios from 'axios'

import { Course, CourseList } from './CourseUtils';

export default class Courses extends Component<{ url: string }, { ls: Array<Course>, status: number }> {

    constructor(props: { url: string }) {
        super(props);

        this.state = {
            ls: new Array<Course>(),
            status: 0
        };
    }

    componentDidMount() {
        this.getCourses(); // API calls in componentDidMount are safer;
    }

    getCourses() {
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
                            }).concat({
                                name: 'test',
                                id: 1,
                                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores nulla ad provident dolorum reprehenderit sapiente?",
                                studentsLimit: 20,
                                students: ["Stasio Powsinoga"],
                                teachers: ["Zbigniew Wyszyński"]
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
            });
    }


    render() {
        switch (this.state.status) {
            case 0:
                return (
                    <div>Loading...</div>
                );
            case 200:
                return (
                    <CourseList ls={this.state.ls} />
                );
            default:
                return (
                    <ResponseError status={this.state.status} />
                );
        }
    }
}
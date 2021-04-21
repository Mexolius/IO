import { Component } from 'react'
import ResponseError from '../../RepsonseError/ResponseError'
import axios from 'axios';
//import axios from 'axios'

import { Course, CourseList } from './CourseUtils';
import { Database } from '../../../Structure/Database';

export default class Courses<Type> extends Component<{ url: string }, { ls: Array<Course<Type>>, status: number }> {

    constructor(props: { url: string }) {
        super(props);

        this.state = {
            ls: new Array<Course<Type>>(),
            status: 0
        };
    }

    componentDidMount() {
        this.getCourses(); // API calls in componentDidMount are safer;
        Database.getCourses().then(res=>{
            if(res.ok){
                res.json().then(json=>{
                console.log(json);
            })
            }
            
        })
    }

    getCourses() {
        if(localStorage.getItem('userID')==null){
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
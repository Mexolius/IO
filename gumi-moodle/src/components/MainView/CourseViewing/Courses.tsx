import { Component } from 'react'
import ResponseError from '../../RepsonseError/ResponseError'
import CourseList from './CourseUtils';
import { Database } from '../../../Structure/Database';
import { ApiRequestState, Course } from '../../../Structure/DataModel.interface';

interface IProps {
    readonly url: string
}

interface IState extends ApiRequestState<Array<Course>> { }

export default class Courses extends Component<IProps, IState>{

    constructor(props: { url: string }) {
        super(props);

        this.state = {
            data: new Array<Course>(),
            status: 0
        };
    }

    componentDidMount() {
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
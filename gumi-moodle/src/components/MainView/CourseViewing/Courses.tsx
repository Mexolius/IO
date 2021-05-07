import { Component } from 'react'
import ResponseError from '../../RepsonseError/ResponseError'
import CourseList from './CourseUtils';
import { Database } from '../../../Structure/Database';
import { ApiRequestState, Course } from '../../../Structure/DataModel.interface';
import LoadingWrapper, { LoadingProps } from '../../LoadingComponent/LoadingWrapper';

interface IProps extends LoadingProps {
    readonly url: string
}

interface IState extends ApiRequestState<Array<Course>> { }

class Courses extends Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.props.setLoading(false);

        this.state = {
            data: new Array<Course>(),
            status: 0
        };
    }

    componentDidMount() {
        this.props.setLoading(true)
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
            .finally(()=>{
                this.props.setLoading(false);
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

export default  LoadingWrapper(Courses, "Fetching courses...") ;
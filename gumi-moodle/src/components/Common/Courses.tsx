import { Component } from 'react'
import ResponseError from '../../Structure/ResponseError'
import CourseList from './CourseList';
import { ApiRequestState, Course } from '../../Structure/DataModel.interface';
import LoadingWrapper, { LoadingProps } from '../../Structure/LoadingComponent/LoadingWrapper';

interface IProps extends LoadingProps {
    readonly course_fetch_fun: ()=>Promise<Array<Course>>
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
        this.props.course_fetch_fun()
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
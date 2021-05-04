import { Component } from "react";

import '../CourseDetails.css'
import { ApiRequestState, Course } from "../../../../../Structure/DataModel.interface";
import { Database } from "../../../../../Structure/Database";
import { LoadingProps } from "../../../../LoadingComponent/LoadingWrapper";

interface IState extends ApiRequestState<Course>{}

interface IProps extends LoadingProps{
    courseID: string
}

//abstract not abstract class. Fun.
export default class AbstractCourseView extends Component<IProps, IState>{
    constructor(props: any) {
        super(props);

        this.state = {
            status: 0,
            data: {} as Course
        }

        this.props.setLoading(false);
    }

    componentDidMount() {
        this.props.setLoading(true);
        const user = localStorage.getItem('userID');
        if(user!=null){
            Database.getCourseDetails(user, this.props.courseID)
            .then(res=>{
                this.setState({
                    status: 200,
                    data: res
                });
            })
            .catch(err=>{
                this.setState({
                    status: err.status
                });
            })
            .finally(()=>{
                this.props.setLoading(false);
            })
        }
        else{
            this.setState({
                status: 401
            });
            this.props.setLoading(false);
        }
        
    }
}
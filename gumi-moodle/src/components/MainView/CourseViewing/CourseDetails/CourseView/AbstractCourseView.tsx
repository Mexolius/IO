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
            data: {} as Course,
        }

        this.props.setLoading(false);
        this.joinCourse = this.joinCourse.bind(this);
    }

    joinCourse(){
        Database.enrollMe(this.state.data._id);
        setTimeout(()=>{
            window.location.reload()
        }, 200)
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
                console.log(err);
                this.setState({
                    status: err.status
                });
            })
            .finally(()=>{
                console.log(false);
                this.props.setLoading(false);
            })
        }
        
    }
}

export function userCourseJoin(_id: string) {
    throw new Error("Function not implemented.");
}

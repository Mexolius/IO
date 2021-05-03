import { Component } from "react";

import '../CourseDetails.css'
import { ApiRequestState, Course } from "../../../../../Structure/DataModel.interface";
import { Database } from "../../../../../Structure/Database";
import { stringify } from "node:querystring";

interface IState extends ApiRequestState<Course>{}

interface IProps{
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
    }

    componentDidMount() {
        const user = JSON.stringify(localStorage.getItem('userID'))
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
            });
        }
        else{
            this.setState({
                status: 401
            });
        }
        
    }
}
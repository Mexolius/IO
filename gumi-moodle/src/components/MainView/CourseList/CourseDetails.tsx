import { Component } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
  
const CourseDetails = ()=>{
        let { id } = useParams<{id:string}>();
        return(<CourseBody id={parseInt(id)}></CourseBody>);
}

interface Course{

}

class CourseBody extends Component<{id: number}, {course:Course, status: number}>{
    constructor(props: {id:number}){
        super(props);

        this.state = {
            status: 0,
            course: {}
        }
    }

    render(){
        return(
            <div>Hello Course {this.props.id} Details </div>
        )
    }

    componentDidMount(){
        axios.get('localhost:8080/courses/'+this.props.id)
        .then(res=>{
            this.setState({
                course: res.data,
                status: 200
            });
        })
        .catch(err=>{
            if(err.response){
                this.setState({status: err.response.status});
            }
            else this.setState({status: -1});

        });
    }
}

export default CourseDetails;
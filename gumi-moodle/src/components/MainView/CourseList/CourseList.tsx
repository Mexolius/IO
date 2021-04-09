import { Component } from 'react'
import { Link} from 'react-router-dom';
import ResponseError from '../../RepsonseError/ResponseError'
//import axios from 'axios'


export interface Course {
    name: string,
    id: number
}

const List = (props: any) => (

        <ul className="w3-ul w3-card-4 ">
            {props.ls.map((x: Course) => {
                return (
                    <li key={"course_"+x.id} className="w3-bar w3-white w3-hover-light-gray">
                    <Link to={'./course_details/' + x.id}>
                            <img alt="" src="https://www.pngkit.com/png/detail/449-4499737_energy-appraiser-certification-course-materials-icon-course-icon.png" className="w3-bar-item w3-circle" style={{ width: "85px" }}></img>
                            <div className="w3-bar-item">
                                <h3 className="w3-bottombar">{x.name}</h3>
                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsucimen book.</span>
                            </div>
                    </Link>
                    </li>

                )
            })}
        </ul>
)

export default class CourseList extends Component<any, { ls: Array<Course>, status: number }> {

    componentDidMount() {
        /*
        axios.get(props.APIaddress+"/courses_student?id="auth.currentUser.ID").then((courses:Array<Course>)=>{
            this.setState({ls:courses})
        }).catch(err=>{
            if(err.response){
                this.setState({status: err.response.status});
            }
            else this.setState({status: -1});

        })
        */
        this.setState({ ls: Array.from(new Array<Course>(5), (v, k) => Object.assign({}, { name: `Course ${k}`, id:k })) });
    }

    constructor(props: any) {
        super(props);

        this.state = {
            ls: new Array<Course>(),
            status: 0
        };
    }


    render() {
        if ([0, 200].includes(this.state.status)) {
            return (
                <List ls={this.state.ls} />
            );
        }
        else {
            return (
                <ResponseError status={this.state.status} />
            );
        }
    }
}
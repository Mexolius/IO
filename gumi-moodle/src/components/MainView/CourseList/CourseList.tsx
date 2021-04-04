import { Component } from 'react'
//import axios from 'axios'


interface Course {
    name: string;
}

const List = (props: any) => (<ul className="w3-ul w3-card-4 ">
    {props.ls.map((x: Course) => {
        return (
        <li className="w3-bar w3-white w3-hover-light-gray">
              <img src="https://www.pngkit.com/png/detail/449-4499737_energy-appraiser-certification-course-materials-icon-course-icon.png" className="w3-bar-item w3-circle" style={{width:"85px"}}></img>
            <div className="w3-bar-item">
                <h3 className="w3-bottombar">{x.name}</h3>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsucimen book.</span>
            </div>
        </li>
        )
    })}
</ul>)

export default class CourseList extends Component<any,{ls: Array<Course>}> {

    componentDidMount(){
        /*
        axios.get(props.APIaddress+"/courses_student?id="auth.currentUser.ID").then((courses:Array<Course>)=>{
            this.setState({ls:courses})
        })
        */
        this.setState({ls:Array.from(new Array<Course>(5),(v,k)=>Object.assign({},{name:`Course ${k}`}))});
    }

    constructor(props: any){
        super(props);

        this.state={
            ls: new Array<Course>()
        };
    }


    render(){ 
        return (    
                    <List ls={this.state.ls}></List>
        )
    }
}
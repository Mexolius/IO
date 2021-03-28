import { Component } from 'react'
//import axios from 'axios'

interface Course {
    name: string;
}

const List = (props: any) => (<ul>
    {props.ls.map((x: Course) => {
        return (<li>{x.name}</li>)
    })}
</ul>)

export default class StMainView extends Component<any,{ls: Array<Course>}> {

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

    render() {
        return (
            <div>
                Hello StMainView
                <List ls={this.state.ls}></List>
            </div>)
    }
}
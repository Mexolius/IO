import axios from 'axios';
import { Component } from 'react'
//import axios from 'axios'
import GradeDisplay, { Grade } from '../GradeDisplay/GradeDisplay'

import './GradeList.css'



export default class GradeList extends Component<{ APIaddres: string, studentID: number, courseID: number }, { grades: Array<Grade> }>{

    componentDidMount() {

        /*
                axios.get(this.props.APIaddres+'/courses').then((newGrades)=>{
            this.setState({grades: newGrades.data})
        })
        */
        this.setState({
            grades: Array.from(
                new Array<Grade>(40), (v, k) => {
                    return {
                        max: 100,
                        current:~~(Math.random()*100),
                        name: "abc"
                    }
                }
            )
        });
    }

    constructor(props: { APIaddres: string, studentID: number, courseID: number }) {
        super(props);

        this.state = {
            grades: new Array<Grade>()
        }
    }

    render() {
        return (
            <div className="row">
                {this.state.grades.map((grade: Grade, k:number) => {
                    return (
                        <GradeDisplay key={"grade_"+k} grade={grade}></GradeDisplay>
                    )
                })}
            </div>
        );

    }

}
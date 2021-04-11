import { Component } from 'react'
//import axios from 'axios'
import GradeDisplay, { Grade } from '../GradeDisplay/GradeDisplay'

import './GradeList.css'



export default class GradeList extends Component<{ grades: Array<Grade> }>{

    constructor(props: { grades: Array<Grade> }) {
        super(props);

        this.state = {
            grades: new Array<Grade>()
        }
    }

    render() {
        return (
            <div className="row">
                {this.props.grades.map((grade: Grade, k:number) => {
                    return (
                        <GradeDisplay key={"grade_"+k} grade={grade}></GradeDisplay>
                    )
                })}
            </div>
        );

    }

}
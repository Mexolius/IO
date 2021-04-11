import { Component } from 'react';
import './GradeList.css'
import PoggersBar from './PoggersBar/PoggersBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


interface GradeData {
    max: number,
    current: number,
    name: string
}

export interface Grade {
    data: GradeData
    children: Array<Grade>
}

function numeric_grade(percent: number): { value: number, color: string } {
    const thresholds = [60, 70, 80, 90];
    if (percent <= 50) return { value: 2, color: "#c71010" };
    let g = 3;
    for (let v of thresholds) {
        if (percent <= v) return { value: g, color: `rgb(97, ${300 - g * 20}, ${90 + g * 40})` };
        g += 0.5;
    }
    return { value: 5, color: "#3377f5" };
}

function isCompound(g: Grade): boolean {
    return Array.isArray(g.children) && g.children.length !== 0;
}

const SimpleGrade = (props: { grade: GradeData }) => {
    const percent = 100 * props.grade.current / props.grade.max;
    const numeric = numeric_grade(percent);

    return (
        <div className="col">
            <div>{props.grade.name}</div>
            <PoggersBar max={props.grade.max} values={[props.grade.current, 70]} thresholds={[30, 60, 90]} />
        </div>
    )
}

class GradeDisplay extends Component<{ grade: Grade }, { expanded: boolean }>{

    constructor(props: { grade: Grade }) {
        super(props);

        this.state = { expanded: false }
        this.onSubgradesClick = this.onSubgradesClick.bind(this);
    }

    onSubgradesClick(){
        this.setState(state => ({
            expanded: !state.expanded
        }));
    }

    render() {
        if (isCompound(this.props.grade)){
            const reduced_grade = this.props.grade.children.reduce((a:Grade,b:Grade)=>{
                return{
                    data:{
                        name:'',
                        max: a.data.max+b.data.max,
                        current: a.data.current+b.data.current
                    },
                    children:[]
                }
            },{data:{max: 0, current: 0, name:''},children:[]})
            return (
                <div>
                    <div className="row">
                        <SimpleGrade grade={reduced_grade.data} />
                        <div onClick={this.onSubgradesClick}>Subgrades
                        <FontAwesomeIcon icon={faChevronDown} className="w3-bar-item w3-centered w3-circle" /></div>
                    </div>
                    {this.state.expanded?<GradeList grades={this.props.grade.children} />:null}
                </div>
            )
        }
            
        else
            return (<div className="row"><SimpleGrade grade={this.props.grade.data} /></div>)
    }
}

class GradeList extends Component<{ grades: Array<Grade> }>{

    render() {
        return (
            <ul className="grade-list">
                {this.props.grades.map((grade: Grade, k) => {
                    return (
                        <li key={"grade_" + k}>
                            <GradeDisplay grade={grade}></GradeDisplay>
                        </li>
                    )
                })}
            </ul>
        );

    }
}

export default GradeList;
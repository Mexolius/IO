import { Component } from 'react';
import './GradeList.css'
import PoggersBar from './PoggersBar/PoggersBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Grade } from '../../../Structure/DataModel.interface';


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

const SimpleGrade = (props: { grade: Grade }) => {
    const percent = 100 * props.grade.points / 100;
    const numeric = numeric_grade(percent);

    return (
        <div className="col">
            <div>{props.grade.name}</div>
            <PoggersBar max={100} values={[~~(Math.random()*100)]} thresholds={[30, 60, 90]} />
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

                        name:a.name+b.name,
                        points: a.points+b.points,

                    children:new Array<Grade>(0)
                }
            },{points: 0, name:'',children:[]})
            return (
                <div>
                    <div className="row">
                        <SimpleGrade grade={reduced_grade} />
                        <div onClick={this.onSubgradesClick}>Subgrades
                        <FontAwesomeIcon icon={faChevronDown} className="w3-bar-item w3-centered w3-circle" /></div>
                    </div>
                    {this.state.expanded?<GradeList grades={this.props.grade.children} />:null}
                </div>
            )
        }
            
        else
            return (<div className="row"><SimpleGrade grade={this.props.grade} /></div>)
    }
}

class GradeList extends Component<{ grades: Array<Grade> }>{

    render() {

        return (
            <ul className="grade-list">
                {this.props.grades.map((grade: Grade, k) => {
                    const changed = grade;
                    changed.children=[{name: "g1", points:~~(Math.random()*100), children:[]},{name: "g2", points:~~(Math.random()*100), children:[]},{name: "g3", points:~~(Math.random()*100), children:[]}]
                    return (
                        <li key={"grade_" + k}>
                            <GradeDisplay grade={changed}></GradeDisplay>
                        </li>
                    )
                })}
            </ul>
        );

    }
}

export default GradeList;
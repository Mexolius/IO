import { Component } from 'react';
import './GradeList.css'
import PoggersBar from './PoggersBar/PoggersBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
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

interface IProps {
    grade: Grade,
    id: string
}

const SimpleGrade = (props: IProps) => {

    const val = props.grade.studentPoints[props.id] ?? 0;

    return (
        <>
            <div className="col flex-gap">
            <b style={{ fontSize: 20 }}>{props.grade.name}</b>
                <PoggersBar max={props.grade.maxPoints} values={[val]} thresholds={props.grade.thresholds} />
            </div>
            <b style={{ fontSize: 20 }}>
                {`${(100 * val / props.grade.maxPoints).toFixed(2)}%`}
            </b>
        </>
    )
}

class GradeDisplay extends Component<IProps, { expanded: boolean }>{

    constructor(props: IProps) {
        super(props);

        this.state = { expanded: false }
        this.onSubgradesClick = this.onSubgradesClick.bind(this);
    }

    onSubgradesClick() {
        this.setState(state => ({
            expanded: !state.expanded
        }));
    }

    render() {
        if (!this.props.grade.isLeaf) {
            return (
                <div>
                    <div className="row expandable" onClick={this.onSubgradesClick} >
                        <SimpleGrade grade={this.props.grade} id={this.props.id} />
                        <div className="flex-gap" style={{ lineHeight: "100%" }} >
                            <b style={{fontSize:17}}>Subgrades</b>
                            <FontAwesomeIcon size={"lg"} icon={this.state.expanded ? faChevronUp : faChevronDown} className="w3-bar-item w3-centered w3-circle" />
                        </div>
                    </div>
                    {this.state.expanded ? <ChildGradeList id={this.props.id} grades={this.props.grade.children} /> : <></>}
                </div>
            )
        }

        else return (
            <div className="row">
                <SimpleGrade grade={this.props.grade} id={this.props.id} />
                <div className="flex-gap" style={{ lineHeight: "100%", opacity: 0, cursor: "default" }} >
                    Subgrades
                    <FontAwesomeIcon size={"lg"} icon={this.state.expanded ? faChevronUp : faChevronDown} className="w3-bar-item w3-centered w3-circle" />
                </div>
            </div>
        )

    }
}

const ParentGradeList = (props: { grades: Array<Grade> }) => {
    const id = localStorage.getItem('userID')!;

    return (
        <div className="grade-list flex-gap">
            {props.grades.map((grade: Grade, k) => {
                return (
                    <div key={"grade_" + k} >
                        <GradeDisplay id={id} grade={grade} />
                    </div>
                )
            })}
        </div>
    );
}

const ChildGradeList = (props: { grades: Array<Grade>, id: string }) => {
    return (
        <div className="grade-list ">
            {props.grades.map((grade: Grade, k) => {
                return (
                    <div style={{ paddingLeft: 20 }} key={"grade_" + k} >
                        <GradeDisplay id={props.id} grade={grade} />
                    </div>
                )
            })}
        </div>
    );
}

export default ParentGradeList;
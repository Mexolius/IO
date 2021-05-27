import { Component } from 'react';
import '../../../Styles/GradeList.css'
import PoggersBar from './PoggersBar/PoggersBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Grade } from '../../../Structure/DataModel.interface';


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
                <PoggersBar color={val === 0 ? "lightgray" : "white"} max={props.grade.maxPoints} values={[val]} thresholds={[50,60,70,80,90]} />
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
                    <div className="row expandable w3-card" style={{ background: !this.state.expanded ? '#fff' : '#eceff1' }} onClick={this.onSubgradesClick} >
                        <SimpleGrade  grade={this.props.grade} id={this.props.id} />
                        <div className="flex-gap" style={{ lineHeight: "100%" }} >
                            <b style={{ fontSize: 17 }}>Subgrades</b>
                            <FontAwesomeIcon size={"lg"} icon={this.state.expanded ? faChevronUp : faChevronDown} className="w3-bar-item w3-centered w3-circle" />
                        </div>
                    </div>
                    {this.state.expanded ? <ChildGradeList id={this.props.id} grades={this.props.grade.children} /> : <></>}
                </div>
            )
        }

        else return (
            <div className="row w3-card">
                <SimpleGrade  grade={this.props.grade} id={this.props.id} />
                <div className="flex-gap" style={{ lineHeight: "100%", opacity: 0, cursor: "default" }} >
                    <b style={{ fontSize: 17 }}>Subgrades</b>
                    <FontAwesomeIcon size={"lg"} icon={faChevronDown} className="w3-bar-item w3-centered w3-circle" />
                </div>
            </div>
        )

    }
}

const ParentGradeList = (props: { grades: Array<Grade>}) => {
    const id = localStorage.getItem('userID')!;

    return (
        <div className="grade-list">
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

const ChildGradeList = (props: { grades: Array<Grade>, id: string}) => {
    return (
        <div >
            {props.grades.map((grade: Grade, k) => {
                return (
                    <div style={{ paddingLeft: 30 }} key={"grade_" + k} >
                        <GradeDisplay id={props.id} grade={grade} />
                    </div>
                )
            })}
        </div>
    );
}

export default ParentGradeList;
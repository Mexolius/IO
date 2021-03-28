import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export interface Grade {
    max: number,
    current: number,
    name: string
}

function numeric_grade(percent: number):{value: number, color:string}{
    const thresholds = [60,70,80,90];
    if(percent<=50) return {value:2,color:"#c71010"};
    let g=3;
    for(let v of thresholds){
        if(percent<=v) return {value:g,color:`rgb(97, ${300-g*20}, ${90+g*40})`};
        g+=0.5;
    }
    return {value:5,color:"#3377f5"};
}

const GradeDisplay = (props: { grade: Grade }) => {
    const percent = 100 * props.grade.current / props.grade.max;
    const numeric = numeric_grade(percent);
    return (
        <div className="w3-center">
            {props.grade.name}
            <div style={{ width: "5rem", height: "5rem" }}>
                <CircularProgressbarWithChildren value={percent} styles={{path:{stroke: numeric.color}}}>
                    <div style={{ fontSize: 18, marginTop: -5 }}>{numeric.value}</div>
                    <div style={{ fontSize: 12, marginTop: -5 }}>{percent}%</div>
                </CircularProgressbarWithChildren>
            </div>
        </div>

    );
}

export default GradeDisplay;
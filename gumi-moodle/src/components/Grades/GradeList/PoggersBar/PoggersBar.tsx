import './PoggersBar.css'

const colors = [
    "#FF0000",
    "#00FF00",
    "#FF00FF",
]

const PoggersBar = (props: {max:number, values:Array<number> , thresholds:Array<number>}) => {
    return (
        <div className="prog-bar">
            {props.values.sort((a,b)=>b-a).map((x,k)=>{
                console.log(colors[k]);
                return(<Filler key={"filler_"+k} color={colors[k]} percent={x/props.max} zIndex={k}/>)
            })}
            {props.thresholds.map((x,k)=>{
                return(<Threshold key={"threshold"+k} percent={x} />)
            })}
        </div>)
}

const Filler = (props: {color: string, percent: number, zIndex: number}) => {
    return (
        <div className="filler" style={{background: props.color, width:`${props.percent*100}%`, zIndex: props.zIndex}} />
    )
}

const Threshold = (props:{percent: number})=>{
    return(
        <div className="threshold" style={{left:`${props.percent}%`}} />
    )
}

export default PoggersBar;
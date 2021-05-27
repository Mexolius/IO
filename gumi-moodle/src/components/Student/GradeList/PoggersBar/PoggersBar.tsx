import './PoggersBar.css'

interface IProps{
    max:number, 
    values:Array<number> , 
    thresholds:Array<number>,
    color: string
}

const PoggersBar = (props: IProps) => {
    

    return (
        <div style={{background:props.color}} className="prog-bar">
                {props.values.sort((a,b)=>b-a).map((x,k)=>{
                const percent = x/props.max
                return(<Filler key={"filler_"+k} color={percent>0.5?"green":"red"} percent={percent} zIndex={k}/>)
            })}
            
            {props.thresholds.map((x,k)=>{
                return(<Threshold key={"threshold"+k} percent={x} />)
            })}
        </div>
        )
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
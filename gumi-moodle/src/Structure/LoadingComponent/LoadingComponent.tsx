import './LoadingComponent.css'

export const LoadingComponent = (props:{message:string})=>{
    return(
        <div className="container w3-center">
            <div>{props.message}</div>
            <img className="spinner" alt="loader" src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"/>
        </div>
    )
}

export default LoadingComponent;
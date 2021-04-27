export const LoadingComponent = (props:{message:string})=>{
    return(
        <>
            <div>{props.message}</div>
            <img alt="loader" src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"/>
        </>
    )
}

export default LoadingComponent;
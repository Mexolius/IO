import {ComponentType, useState} from 'react';
import LoadingComponent from './LoadingComponent'

export interface LoadingProps{
    setLoading: (isComponentLoading:boolean)=>boolean
}

export const LoadingWrapper = <P extends LoadingProps>(Component : ComponentType<P>, loadingMessage: string)=>{

    function HOC(props:any){
        const [isLoading, setLoading] = useState(true);

        const setLoadingState = (isComponentLoading:boolean)=>{
            setLoading(isComponentLoading);
        }

        return(
            <>
                {isLoading &&<LoadingComponent message={loadingMessage}/>}
                <Component {...props as P} setLoading={setLoadingState}/>
            </>
        )
    }

    return HOC;
}

export default LoadingWrapper;
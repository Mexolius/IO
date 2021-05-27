import React,{ Component } from 'react';
import '../Styles/login.css';

export default abstract class AbstractFormComponent<P = {}, S = {}, SS = any> extends Component<P,S,SS>{

    protected fields: Array<any> = [];
    protected rfs : Map<string, React.RefObject<HTMLInputElement>>;
    
    constructor(props: any){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.rfs = new Map<string, React.RefObject<HTMLInputElement>>()

    }

    abstract onSubmit(event:any) : void;
}
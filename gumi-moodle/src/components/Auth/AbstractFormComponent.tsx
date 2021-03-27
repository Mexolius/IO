import React,{ Component } from 'react';
import './login.css';

export default abstract class AbstractFormComponent extends Component{

    protected fields: Array<any> = [];
    protected rfs : Map<string, React.RefObject<HTMLInputElement>>;
    
    constructor(props: any){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.rfs = new Map<string, React.RefObject<HTMLInputElement>>()

    }

    abstract onSubmit(event:any) : boolean;
}
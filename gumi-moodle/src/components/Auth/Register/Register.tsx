import React from 'react'
import f from './fields.json'
import 'w3-css/w3.css';

import AbstractFormComponent from '../AbstractFormComponent'
import axios from 'axios';

const headers = {
    "Content-type": "application/json"
}

export default class Register extends AbstractFormComponent<any,{status: number}> {

    constructor(props: any){
        super(props);

        this.fields = f;
        this.fields.forEach((x:any)=>{
            this.rfs.set(x.name, React.createRef());
         });
         this.state = {
             status: 0,
         }
    }

    onSubmit(event:any): boolean{
        event.preventDefault();
        const payload = {
            "firstName": this.rfs.get('Name')?.current?.value,
            "lastName": this.rfs.get('Surname')?.current?.value,
            "email": this.rfs.get('email')?.current?.value,
            "password": this.rfs.get('password')?.current?.value
        }
        console.log(payload);
        axios.post("http://localhost:8080/register",payload,{headers:headers})
        .then(res=>{
            this.setState({
                status: 200,
            })
        }).catch(err=>{
            if(err.response){
               
            }
            else{
                this.setState({
                    status: -1,
                })
            }
            
            console.log(err);
        })
        return true;
    }

    error_message(code: number):string{
        switch(code){
            case 409: return "This email already has an account connected to it!"
            case 500: return "Internal server error"
            case -1: return "Network Error. Our database seems to be down. If this issue persists, please report this to our team!"
            default: return "Daaah... Something went wrong and we don't know what :(\n error code: " + code
        }
    }

    render() {

        if(this.state.status===200){
            return(
            <div className="login-container flex-col">
                <h2>Thank you for joining GUMI-MOODLE</h2>
            </div>
            )
        }
        else if([409,0].includes(this.state.status)){
            let err = this.state.status===0?null:<div className="red">{this.error_message(409)}</div>
            return (
                <div className="login-container flex-col">
                    <h2>Register</h2>
                    <form className="flex-col" name="loginForm" onSubmit={this.onSubmit}>
                        {err}
                        {this.fields.map(x => {
                            return (
                                <div key={x.name}>
                                    <input ref={this.rfs.get(x.name)} className={x.classnames} type={x.type} placeholder={x.name} />
                                </div>
                            )
                        })}
                        <div className="buttons">
                            <button>Sign up</button>
                        </div>
    
                    </form>
                    <a className="hover-move" href="/Login">Already have an account? Sign in{'>'}{'>'}</a>
                </div>
            )
        }

        else{
            return(
                <div className="login-container flex-col">
                    <h2>{this.error_message(this.state.status)}</h2>
                </div>
                )
        }


    }
}
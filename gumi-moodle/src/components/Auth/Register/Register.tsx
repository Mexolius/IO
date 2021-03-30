import React from 'react'
import f from './fields.json'
import 'w3-css/w3.css';

import AbstractFormComponent from '../AbstractFormComponent'
import axios from 'axios';

const headers = {
    "Content-type": "application/json"
}

export default class Register extends AbstractFormComponent {

    constructor(props: any){
        super(props);

        this.fields = f;
        this.fields.forEach((x:any)=>{
            this.rfs.set(x.name, React.createRef());
         })
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
        .then(res=>{}).catch(err=>{
            console.log(err);
        })
        return true;
    }


    render() {
        return (
            <div className="login-container flex-col">
                <h2>Register</h2>
                <form className="flex-col" name="loginForm" onSubmit={this.onSubmit}>
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
}
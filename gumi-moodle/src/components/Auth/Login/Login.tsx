import React from 'react'
import f from './fields.json'
import 'w3-css/w3.css';


import AbstractFormComponent from '../AbstractFormComponent'

export default class Login extends AbstractFormComponent {

    constructor(props:any){
        super(props);

        this.fields = f;
        this.fields.forEach((x:any)=>{
            this.rfs.set(x.name, React.createRef());
         })
    }

    onSubmit(event:any): boolean{
        this.rfs.forEach(v=>{
            console.log(v.current?.value);
        })
        event.preventDefault();
        return true;
    }


    render() {

        return (
            <div className="login-container flex-col">
                <h2>Login</h2>
                <form className="flex-col" name="loginForm" onSubmit={this.onSubmit}>
                    {this.fields.map((x: { type: string, name: string, classnames: string }) => {
                        return (
                            <div key={x.name}>
                                <input ref={this.rfs.get(x.name)} className={x.classnames} type={x.type} placeholder={x.name} />
                            </div>
                        )
                    })}
                    <div className="buttons">
                        <button>Login</button>
                        <button>Internal</button>
                    </div>

                </form>
                <a className="hover-move" href="/Register">Don't have an account? Sign up{'>'}{'>'}</a>
                <a className="hover-move" href="/">Forgot password? Recover{'>'}{'>'} </a>
            </div>


        )

    }
}
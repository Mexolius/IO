import React from 'react'
import f from './fields.json'
import 'w3-css/w3.css';
import AbstractFormComponent from '../AbstractFormComponent'
import axios from 'axios';


type AppState = {
    status?: number
};

export default class Login extends AbstractFormComponent<AppState> {
    state: AppState;

    constructor(props:any){
        super(props);

        this.state =(
            {
                status: 0
            }
        )

        this.fields = f;
        this.fields.forEach((x:any)=>{
            this.rfs.set(x.name, React.createRef());
         })
         this.login = this.login.bind(this);
    }


    login(usern: any, pass: any) {
        const tkn = usern+":"+pass;
        const encodedToken = Buffer.from(tkn).toString('base64');
        const session_url = 'http://localhost:8080/logged';

        axios({
            method: 'get',
            url: session_url,
            headers: { 
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'text/plain; charset=utf-8',
                'Authorization': 'Basic '+ encodedToken,
        }
            })
            .then(response => {
                if(response.status === 200) {
                    localStorage.setItem('user', usern);
                    this.state =(
                        {
                            status: 200
                        }
                    )
                    window.location.reload(); 
                }
                else {
                    console.log("error");
                }
                
            })
            .catch(err=>{
                console.log(err);
            });
    }

    getStatus(){
        return this.state.status;
    }

    onSubmit(event:any): boolean{
        this.login(this.rfs.get('Login')?.current?.value, this.rfs.get('Password')?.current?.value);
        event.preventDefault();
        return true;
    }


    render() {

        
            if(this.getStatus()===200){
                return(
                <div className="login-container flex-col">
                    <h2>Thank you for joining GUMI-MOODLE</h2>
                </div>
                )
            }
            else{
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
}
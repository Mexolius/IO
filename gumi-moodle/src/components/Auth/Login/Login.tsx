import React from 'react'
import f from './fields.json'
import 'w3-css/w3.css';
import AbstractFormComponent from '../../AbstractForm/AbstractFormComponent'
import axios from 'axios';
import { RouteComponentProps} from 'react-router-dom';

import ResponseError from '../../RepsonseError/ResponseError';


type AppState = {
    status: number

};

export default class Login extends AbstractFormComponent<RouteComponentProps, AppState> {
    state: AppState;

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = (
            {
                status: 0
            }
        )

        this.fields = f;
        this.fields.forEach((x: any) => {
            this.rfs.set(x.name, React.createRef());
        })
        this.login = this.login.bind(this);
    }


    login(usern: any, pass: any) {
        const tkn = usern + ":" + pass;
        const encodedToken = Buffer.from(tkn).toString('base64');
        const session_url = 'http://localhost:8080/logged';

        axios({
            method: 'get',
            url: session_url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain; charset=utf-8',
                'Authorization': 'Basic ' + encodedToken,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('user', usern);
                    localStorage.setItem('authData', encodedToken);
                    this.saveUserDetails(usern, encodedToken);
                }
                else
                    this.setState({
                        status: response.status
                    });
            })
            .catch(err => {
                if (err.response)
                    this.setState({
                        status: err.reposonse.status
                    });

                else
                    this.setState({
                        status: -1,
                    })
            })
            .finally(() => {
                setTimeout(() => {
                    this.props.history.push('/');
                    window.location.reload();
                }, 150)
            }
            );
    }

    //this is bad solution, but necessary
    saveUserDetails(email: any, encodedToken: any) {


        const session_url = 'http://localhost:8080/user/' + email;


        console.log(session_url);
        axios({
            method: 'get',
            url: session_url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain; charset=utf-8',
                'Authorization': 'Basic ' + encodedToken,
            }
        })
            .then(response => {
                console.log('saving');
                if (response.status === 200) {
                    const userInfo = JSON.parse(JSON.stringify(response.data));
                    localStorage.setItem('userID', userInfo['_id']);
                    localStorage.setItem('userRoles', userInfo['roles'].join(';'));
                }
                this.setState({
                    status: response.status
                });
            })
            .catch(err => {
                console.log(err);
                if (err.response)
                    this.setState({
                        status: err.response
                    });
                else
                    this.setState({
                        status: -1
                    });
            });
    }

    getStatus() {
        return this.state.status;
    }

    onSubmit(event: any): boolean {
        this.login(this.rfs.get('Login')?.current?.value, this.rfs.get('Password')?.current?.value);
        event.preventDefault();
        return true;
    }


    render() {

        return (
            <div className="login-container flex-col">
                {
                    this.getStatus() === 200
                        ? <h2>Thank you for joining GUMI-MOODLE</h2>
                        : [0, 401].includes(this.getStatus())
                            ? <form className="flex-col" name="loginForm" onSubmit={this.onSubmit}>
                                <h2>Login</h2>
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
                                <a className="hover-move" href="/Register">Don't have an account? Sign up{'>'}{'>'}</a>
                                <a className="hover-move" href="/">Forgot password? Recover{'>'}{'>'} </a>
                            </form>
                            : <ResponseError status={this.state.status} />
                }
            </div>
        )
    }
}

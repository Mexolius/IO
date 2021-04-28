import React from 'react'
import f from './formfields.json'
import 'w3-css/w3.css';

import AbstractFormComponent from '../../AbstractForm/AbstractFormComponent'
import ResponseError from '../../RepsonseError/ResponseError'
import { Database } from '../../../Structure/Database';

export default class Register extends AbstractFormComponent<any, { status: number }> {

    constructor(props: any) {
        super(props);

        this.fields = f;
        this.fields.forEach((x: any) => {
            this.rfs.set(x.name, React.createRef());
        });
        this.state = {
            status: 0,
        }
    }

    private readUser(): string {
        return JSON.stringify({
            "firstName": this.rfs.get('Name')?.current?.value,
            "lastName": this.rfs.get('Surname')?.current?.value,
            "email": this.rfs.get('email')?.current?.value,
            "password": this.rfs.get('password')?.current?.value
        });
    }

    onSubmit(event: any): void {
        event.preventDefault();
        Database.register(this.readUser())
            .then(res => {
                if (res.ok) {
                    this.setState({
                        status: 200,
                    })
                }
                else {
                    this.setState({
                        status: res.status,
                    })
                }
            })
            .catch(err => {
                this.setState({
                    status: -1,
                })
            })
    }


    render() {

        return (
            <div className="login-container flex-col">
                {
                    this.state.status === 200 ?
                        <h2>Thank you for joining GUMI-MOODLE</h2>
                        :
                        [409, 0].includes(this.state.status) ?

                            <form className="flex-col" name="loginForm" onSubmit={this.onSubmit}>
                                <h2>Register</h2>
                                <ResponseError status={this.state.status} />
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
                                <a className="hover-move" href="/Login">Already have an account? Sign in{'>'}{'>'}</a>
                            </form>
                            :
                            <ResponseError status={this.state.status} />
                }
            </div>
        )
    }
}
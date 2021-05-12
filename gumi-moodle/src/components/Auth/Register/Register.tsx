import React from 'react'
import f from './formfields.json'
import 'w3-css/w3.css';

import AbstractFormComponent from '../../AbstractForm/AbstractFormComponent'
import ResponseError from '../../RepsonseError/ResponseError'
import { Database } from '../../../Structure/Database';
import LoadingWrapper, { LoadingProps } from '../../LoadingComponent/LoadingWrapper';
import { ApiRequestState } from '../../../Structure/DataModel.interface';

interface IProps extends LoadingProps{}
interface IState extends ApiRequestState<any>{}

class Register extends AbstractFormComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.fields = f;
        this.fields.forEach((x: any) => {
            this.rfs.set(x.name, React.createRef());
        });
        this.state = {
            status: 0,
            data: {}
        }
        this.props.setLoading(false);
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
        this.props.setLoading(true);
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
            .finally(()=>{
                this.props.setLoading(false);
            })
    }


    render() {
        switch (this.state.status) {
            case 409:
            case 0:
                return (
                    <div className="login-container flex-col">

                        <form className="flex-col" name="loginForm" onSubmit={this.onSubmit}>
                            <h2>Register</h2>
                            {this.state.status === 409 ? <div style={{color:"red"}}>This email already has an account connected to it!</div> : <></>}
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

                    </div>
                )
            case 200:
                return (
                    <div className="login-container flex-col">
                        <h2>Thank you for joining GUMI-MOODLE</h2>
                    </div>
                )
            default: return (
                    <ResponseError status={this.state.status} />

            )
        }
    }
}

export default LoadingWrapper(Register, "Signing up...");
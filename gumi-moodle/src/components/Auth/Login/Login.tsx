import React from 'react'
import f from './fields.json'
import 'w3-css/w3.css';
import AbstractFormComponent from '../../AbstractForm/AbstractFormComponent'
import { RouteComponentProps } from 'react-router-dom';

import ResponseError from '../../RepsonseError/ResponseError';
import { Database } from '../../../Structure/Database';
import LoadingWrapper, { LoadingProps } from '../../LoadingWrapper'
import { ApiRequestState, IUser } from '../../../Structure/DataModel.interface';

interface IState extends ApiRequestState<IUser>{}

interface IProps extends RouteComponentProps, LoadingProps { }

class Login extends AbstractFormComponent<IProps, IState> {

    constructor(props: RouteComponentProps) {
        super(props);

        this.props.setLoading(false);

        this.state = ({
            status: 0,
            data: {} as IUser
        });

        this.fields = f;
        this.fields.forEach((x: any) => {
            this.rfs.set(x.name, React.createRef());
        })
        this.login = this.login.bind(this);
    }

    login(email: string, pass: string) {
        const tkn = Buffer.from(email + ":" + pass).toString('base64');

        Database.getUserDetails(email, tkn)
            .then(user => {
                localStorage.setItem('userID', user._id);
                localStorage.setItem('userRoles', user.roles.join(';'));
                localStorage.setItem('user', email);
                localStorage.setItem('authData', tkn);

                this.setState({status: 200})
            })
            .catch(err => {
                console.log("Login error " + err);
                this.setState({ status: err.status });
            })
            .finally(()=>{
                this.props.setLoading(false);
                setTimeout(()=>{
                    this.props.history.push('/');
                    window.location.reload();
                },150)
            })
    }

    getStatus() {
        return this.state.status;
    }

    onSubmit(event: any): boolean {
        event.preventDefault();
        this.props.setLoading(true);
        this.login(this.rfs.get('Login')?.current?.value!, this.rfs.get('Password')?.current?.value!);
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

export default LoadingWrapper(Login, "Logging in");
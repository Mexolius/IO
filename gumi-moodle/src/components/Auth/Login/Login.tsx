import React, { useEffect } from 'react'
import f from './fields.json'
import 'w3-css/w3.css';
import AbstractFormComponent from '../../AbstractForm/AbstractFormComponent'
import { RouteComponentProps } from 'react-router-dom';

import ResponseError from '../../RepsonseError/ResponseError';
import { Database } from '../../../Structure/Database';
import LoadingWrapper, { LoadingProps } from '../../LoadingWrapper'


/*interface LBProps extends LoadingProps {
}

const LoginButtons = (props: LBProps) => {

    const { setLoading } = props;

    useEffect(() => { setLoading(false) })

    setLoading(false);

    const onSubmit = async () => {
        setLoading(true);

        await new Promise(res => {
            setTimeout(() => { res(1) }, 800)
        })

        setLoading(false);
    }

    return (
        <>
            <div className="buttons">
                <button onClick = {onSubmit}>Login</button>
                <button onClick={onSubmit}>Internal</button>
            </div>
            <a className="hover-move" href="/Register">Don't have an account? Sign up{'>'}{'>'}</a>
            <a className="hover-move" href="/">Forgot password? Recover{'>'}{'>'} </a>
        </>
    )
}

const WrappedButtons = LoadingWrapper(LoginButtons, "Logging in");*/

interface IState {
    status: number
}

interface IProps extends RouteComponentProps, LoadingProps { }

class Login extends AbstractFormComponent<IProps, IState> {

    constructor(props: RouteComponentProps) {
        super(props);

        this.props.setLoading(false);

        this.state = ({
            status: 0
        });

        this.fields = f;
        this.fields.forEach((x: any) => {
            this.rfs.set(x.name, React.createRef());
        })
        this.login = this.login.bind(this);
    }

    onLoginSuccess(usern: string, tkn: string) {
        localStorage.setItem('user', usern);
        localStorage.setItem('authData', tkn);

        Database.getUserDetails(usern)
            .then(user => {
                console.log("Setting id "+user._id)
                localStorage.setItem('userID', user._id);
                localStorage.setItem('userRoles', user.roles.join(';'));
            })
            .catch(err => {
                console.log("Fail to set user details. Reason:");
                console.log(err);
            })
            .finally(()=>{
                this.props.setLoading(false);
                setTimeout(()=>{
                    this.props.history.push('/');
                    //window.location.reload();
                },150)
                
            })
    }

    onLoginFail(status: number) {
        this.setState({ status: status });
        this.props.setLoading(false);
    }


    login(usern: string, pass: string) {
        const tkn = Buffer.from(usern + ":" + pass).toString('base64');

        Database.login(tkn)
            .then(res => {
                if (res.ok) this.onLoginSuccess(usern, tkn);
                else this.onLoginFail(res.status);
            })
            .catch(err => {
                console.log("Login error " + err);
                if (err.response) this.onLoginFail(err.response.status);
                else this.onLoginFail(-1);
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
                                {/*<WrappedButtons onSubmit={this.onSubmit} />*/}
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
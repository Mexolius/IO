import { Component } from 'react';
import fields from './fields.json'
import 'w3-css/w3.css';
import './login.css';

class Login extends Component {
    render() {

        return (
            <div className="login-container flex-col">
                <h2>Login</h2>
                <form className="flex-col" name="loginForm">
                    {fields.map((x: { type: string, name: string, classnames: string }) => {
                        return (
                            <div key={x.name}>
                                <input className={x.classnames} type={x.type} placeholder={x.name} />
                            </div>
                        )
                    })}
                    <div className="buttons">
                        <button>Login</button>
                        <button>Internal</button>
                    </div>

                </form>
                <a className="hover-move" href="/">Don't have an account? Register {'>'}{'>'}</a>
                <a className="hover-move" href="/">Forgot password? Recover {'>'}{'>'} </a>
            </div>


        )

    }
}

export default Login
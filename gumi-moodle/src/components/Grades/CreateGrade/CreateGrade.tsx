import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePrescription, faFileSignature, faKey } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Course } from '../../MainView/CourseViewing/CourseUtils';
import ResponseError from '../../RepsonseError/ResponseError';

export interface IValues {
    title: string,
    password: string,
    description: string
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    status: number;
    courses: Course[];
}



export default class CreateCourse extends Component<RouteComponentProps, IFormState>{
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            title: '',
            password: '',
            description: '',
            values: [],
            submitSuccess: false,
            status: 0,
            courses: []
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = {
            title: this.state.title,
            password: this.state.password,
            description: this.state.description,
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData] });
        /*axios.post(`http://localhost:8080/courses`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);*/
        console.log("sent" + formData);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    componentDidMount() {
        /*axios.get('http://localhost:8080/courses')
            .then(res => {
                console.log(res.data);
                this.setState({
                    status: res.status,
                    courses: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    this.setState({
                        status: err.response.status
                    })
                }
                else this.setState({
                    status: -1
                })
            })*/
    }

    render() {
        const { submitSuccess } = this.state;

        /*switch (this.state.status) {
            case 0:
                return (<div>Loading...</div>)
            case 200:
                return (
                    <div className="w3-section w3-padding-16">
                        {!submitSuccess && (
                                         <div className="login-container flex-col">
                                         {
                                             this.state.status===200?
                                                 <h2>Thank you for joining GUMI-MOODLE</h2> 
                                                 :
                                                 [409,0].includes(this.state.status)?
                         
                                                    <form className="flex-col" name="loginForm">
                                                        <h2>Add Grade</h2>
                                                        <ResponseError status={this.state.status}/>
                                                        <input type="text" placeholder="Name"/>
                                                        <input type="number" placeholder="MaxPoints"/>
                                                    </form> 
                                                    :
                                                    <ResponseError status={this.state.status}/>
                                             }
                                         </div>
                         
                        )}

                        {submitSuccess && (
                            <div className="w3-panel w3-round-large w3-border w3-green">
                                <h3>Success!</h3>
                                <p>The form was successfully submitted!</p>
                            </div>
                        )}
                    </div>
                )
                default:
                    return(<ResponseError status={this.state.status}/>)*/

        return (<div className="login-container flex-col">
            {
                //this.state.status===200?
                //<h2>Thank you for joining GUMI-MOODLE</h2> 
                //:
                //[409,0].includes(this.state.status)?

                <form className="flex-col" name="loginForm">
                    <h2>Add Grade</h2>
                    { /*<ResponseError status={this.state.status}/> */}
                    <input type="text" placeholder="Name" />
                    <input type="number" placeholder="dst" />
                    <input type="number" placeholder="dst+" />
                    <input type="number" placeholder="db" />
                    <input type="number" placeholder="db+" />
                    <input type="number" placeholder="bdb" />
                </form>
                //:
                //<ResponseError status={this.state.status}/>
            }
        </div>)



    }

}
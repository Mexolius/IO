import {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePrescription, faFileSignature, faKey } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {useForm} from 'react-hook-form'



export interface IValues {
    name: string,
    description: string,
    studentsLimit: number,
    students: [],
    teachers: []
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
}
 
export default class CreateCourse extends Component<RouteComponentProps, IFormState>{
    constructor(props: RouteComponentProps){
        super(props);
        this.state = {
            name: '',
            description: '',
            studentsLimit: 0,
            students: [],
            teachers: [],
            values: [],
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({
            students: [localStorage.getItem('userID')]
        })
        const formData = {
            name: this.state.name,
            description: this.state.description,
            studentsLimit: this.state.studentsLimit,
            students: this.state.students,
            teachers: this.state.teachers
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData]});

        const encodedToken = localStorage.getItem('authData');
        const session_url = 'http://localhost:8080/course'

        let headers = { 
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json',
            'Authorization': 'Basic '+ encodedToken
        }


        axios.post(session_url, formData, {headers:headers})
        .then(res=>{
            console.log(res);
        }).catch(err=>{
            if(err.response){
            }
            else{

            }
            
            console.log(err);
        })
        .finally( ()=>{
            console.log("Finally done")
        });

    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
    })
}


    render() {
        const { submitSuccess } = this.state;
        
        return(
            <div className="w3-section w3-padding-16">
                {!submitSuccess && (
                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true} className="w3-container w3-border w3-padding-16 w3-white">
                <h1 className="w3-bottombar w3-border-dark-gray">Add new course</h1>
                
            
                    <label className="w3-text-dark-gray"><b><FontAwesomeIcon icon={faFileSignature} /> Title</b></label>
                    <input className="w3-input w3-border w3-white" onChange={(e) => this.handleInputChanges(e)} type="text" />

                    <label className="w3-text-dark-gray"><b><FontAwesomeIcon icon={faKey} /> Students Limit</b></label>
                    <input className="w3-input w3-border w3-white" onChange={(e) => this.handleInputChanges(e)} type="text" />
                
                    <label className="w3-text-dark-gray"><b><FontAwesomeIcon icon={faFilePrescription} /> Description</b></label>
                    <input className="w3-input w3-border w3-white" style={{height:"100px"}} onChange={(e) => this.handleInputChanges(e)} type="text" />
                
                    <button type="submit" className="w3-button w3-block w3-dark-gray w3-margin-bottom">Submit</button>
                </form> 
                )}
                
                {submitSuccess && (
                    <div className="w3-panel w3-round-large w3-border w3-green">
                        <h3>Success!</h3>
                        <p>   The form was successfully submitted!</p>
                    </div> 
                  )}
          </div>
        )
    }
    
}
import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePrescription, faFileSignature, faKey } from '@fortawesome/free-solid-svg-icons'
import { RouteComponentProps } from 'react-router-dom';
import { CourseData } from '../../../../Structure/DataModel.interface';
import { Database } from '../../../../Structure/Database';

interface IState {
    [key: string]: any,
    values: CourseData[],
    submitSuccess: boolean,
    status: number,
}

interface IProps extends RouteComponentProps { }

export default class CreateCourse extends Component<IProps, IState>{
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            description: '',
            studentLimit: 0,
            values: [],
            submitSuccess: false,
            status: 0
        }

        this.handleInputChanges = this.handleInputChanges.bind(this);
    }

    private readFormData(): string {


        const formData = {
            "name": this.state.name,
            "description": this.state.description,
            "studentLimit": Number(this.state.studentLimit),
            "students": [],
            "teachers": [{_id:localStorage.getItem('userID')!, firstName:"", lastName:""}],
            "grades": [],
        }
        
        this.setState({ submitSuccess: true, values: [...this.state.values, formData] });
        console.log(JSON.stringify(formData));
        return JSON.stringify(formData)
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        Database.postCourse(this.readFormData())
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

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }


    render() {
        const { submitSuccess } = this.state;

        return (
            <div className="w3-section w3-padding-16">
                {!submitSuccess && (
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true} className="w3-container w3-border w3-padding-16 w3-white">
                        <h1 className="w3-bottombar w3-border-dark-gray">Add new course</h1>


                        <label className="w3-text-dark-gray"><b><FontAwesomeIcon icon={faFileSignature} /> Title</b></label>
                        <input name="name" className="w3-input w3-border w3-white" onChange={this.handleInputChanges} type="text" />

                        <label className="w3-text-dark-gray"><b><FontAwesomeIcon icon={faKey} /> Students Limit</b></label>
                        <input name="studentLimit" className="w3-input w3-border w3-white" onChange={this.handleInputChanges} type="text" />

                        <label className="w3-text-dark-gray"><b><FontAwesomeIcon icon={faFilePrescription} /> Description</b></label>
                        <input name="description" className="w3-input w3-border w3-white" style={{ height: "100px" }} onChange={this.handleInputChanges} type="text" />

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
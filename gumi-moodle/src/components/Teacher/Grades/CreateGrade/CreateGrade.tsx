import React from 'react'
import AbstractFormComponent from '../../../../Structure/AbstractFormComponent';

import f from './formfields.json'

export default class CreateCourse extends AbstractFormComponent<any,{status: number}>{
    
    onSubmit(event:any): boolean{
        return true;
    }


    constructor(props: any){
        super(props)

        this.fields = f;
        this.fields.forEach((x:any)=>{
            this.rfs.set(x.name, React.createRef());
         });
         this.state = {
             status: 0,
         }
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
        //const { submitSuccess } = this.state;

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
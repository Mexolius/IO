import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTag, faUser, faEnvelope, faFileSignature } from '@fortawesome/free-solid-svg-icons'
import { Database } from '../../../Structure/Database';
import ResponseError from '../../../Structure/ResponseError';
import {ApiRequestState, IUser} from '../../../Structure/DataModel.interface'
import LoadingWrapper, { LoadingProps } from '../../../Structure/LoadingComponent/LoadingWrapper';

interface IState extends ApiRequestState<IUser> {}

interface IProps extends RouteComponentProps, LoadingProps{}

class Profile extends Component<IProps, IState> {

  componentDidMount(){
    this.getData();
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: {} as IUser,
      status: 0
    }
  }

  private getFirstName(): string {
    return this.state.data.firstName;
  }

  private getLastName(): string {
    return this.state.data.lastName;
  }

  private getEmail(): string {
    return this.state.data.email;
  }

  private getRoles(): Array<string> {
    return this.state.data.roles;
  }

  getData() {
    this.props.setLoading(true);
    const email = localStorage.getItem('user');
    if (email == null){
      this.setState({ status: 403 });
      this.props.setLoading(false);
      return;
    } 
    else {
      Database.getUserDetails(email!)
        .then(user => {
          this.setState({
            data: user,
            status: 200
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ status: err.status})
        })
        .finally(()=>{
          this.props.setLoading(false);
        })
    }
  }


  render() {
    switch (this.state.status) {

      case 200:{
        return (
          <div style={{cursor:"default"}} className="w3-section content-wrapper">
            <div className="w3-card w3-round w3-light">
              <div className="w3-container">
                <div className="w3-container">
                  <h2 className="w3-text-dark w3-center w3-padding-16 w3-left"><FontAwesomeIcon icon={faUser} /> My Profile</h2>
                  <p className="w3-right"><img src="avatar.png" style={{ height: "106px", width: "106px" }} className="w3-circle" alt="Avatar"></img></p>
                </div>

                <ul className="w3-ul ">
                  <li className="w3-bar w3-white"><p><FontAwesomeIcon icon={faFileSignature} /> First Name: <b>{this.getFirstName()}</b></p></li>
                  <li className="w3-bar w3-white"><p><FontAwesomeIcon icon={faFileSignature} /> Last Name:   <b>{this.getLastName()}</b></p></li>
                  <li className="w3-bar w3-white"><p><FontAwesomeIcon icon={faEnvelope} /> E-mail:  <b>{this.getEmail()}</b></p></li>
                  <li className="w3-bar w3-white"><p><FontAwesomeIcon icon={faUserTag} /> Roles: <b>
                    {this.getRoles().map((x, k) => {
                      return (
                        <span key={"role_" + k} className="w3-tag w3-teal w3-round">{x} </span>
                      )
                    })}

                  </b></p></li>
                </ul>
              </div>
            </div>
          </div>
        )
      }

      default:{
        return(
          <ResponseError status={this.state.status}/>
        ) 
      }
    }
  }
}

export default LoadingWrapper(Profile, "Loading profile") ;
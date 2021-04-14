import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTag ,faUser,  faEnvelope, faFileSignature } from '@fortawesome/free-solid-svg-icons'

export interface IState {
  firstname: string,
  lastname: string,
  email: string,
  roles: [],
}

class Profile extends Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      roles: [],
    }
    this.getData();
}

getFirstName(){
  return this.state.firstname;
}

getLastName(){
  return this.state.lastname;
}

getEmail(){
  return this.state.email;
}

getRoles(){
  return this.state.roles;
}

getData() {
  const email = localStorage.getItem('user');
  const encodedToken = localStorage.getItem('authData');
  const session_url = 'http://localhost:8080/user/' + email;

  axios({
      method: 'get',
      url: session_url,
      headers: { 
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'text/plain; charset=utf-8',
          'Authorization': 'Basic '+ encodedToken,
  }
      })
      .then(response => {
        //console.log(response);
          if(response.status === 200) {
              const userInfo = JSON.parse(JSON.stringify(response.data));
              console.log(userInfo);
              this.setState({
                firstname: userInfo['firstName'],
                lastname: userInfo['lastName'],
                email: userInfo['email'],
                roles: userInfo['roles'],
              })
          }
      })
      .catch(err=>{
          if(err.response){
           }
           else{
               this.setState({
               })
           }
      });
}


  render() {
    return (
      <div className="w3-section">    
              <div className="w3-card w3-round w3-light">
                <div className="w3-container">
                  <div className="w3-container">
                    <h2 className="w3-text-dark w3-center w3-padding-16 w3-left"><FontAwesomeIcon icon={faUser} /> My Profile</h2>
                    <p className="w3-right"><img src="avatar.png" style={{height:"106px", width:"106px"}} className="w3-circle" alt="Avatar"></img></p>
                  </div>

                <ul className="w3-ul ">
                  <li className="w3-bar w3-white w3-hover-light-gray"><p><FontAwesomeIcon icon={faFileSignature} /> First Name: <b>{this.getFirstName()}</b></p></li>
                  <li className="w3-bar w3-white w3-hover-light-gray"><p><FontAwesomeIcon icon={faFileSignature} /> Last Name:   <b>{this.getLastName()}</b></p></li>
                  <li className="w3-bar w3-white w3-hover-light-gray"><p><FontAwesomeIcon icon={faEnvelope} /> E-mail:  <b>{this.getEmail()}</b></p></li>
                  <li className="w3-bar w3-white w3-hover-light-gray"><p><FontAwesomeIcon icon={faUserTag} /> Roles: <b>
                  {this.getRoles().map((x,k) => {
                                   return (
                                    <span key={"role_"+k} className="w3-tag w3-teal w3-hover-green w3-round">{x} </span>
                                   )
                               })}
                    
                    </b></p></li>
                </ul>
              </div>
          </div>
      </div>
          
    )
  }
}

export default Profile;
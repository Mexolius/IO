import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom, faCogs, faDatabase,  } from '@fortawesome/free-solid-svg-icons'



class Home extends Component {
  render() {
    return (
        <div>
          <h2>Welcome to GumiMoodle</h2>
          <div className="w3-center">
            <h5>Created By</h5>
            <div style={{width:"50%", margin:"auto"}}>
              <div className="w3-card" style={{height:"3rem", alignItems:"center", justifyContent:"center", display:"flex", gap:"1em"}}><FontAwesomeIcon icon={faDatabase}/>Paweł Miziołek</div>
              <div className="w3-card" style={{height:"3rem", alignItems:"center", justifyContent:"center", display:"flex", gap:"1em"}}><FontAwesomeIcon icon={faCogs}/>Paweł Tyszko</div>
              <div className="w3-card" style={{height:"3rem", alignItems:"center", justifyContent:"center", display:"flex", gap:"1em"}}><FontAwesomeIcon icon={faDatabase}/>Paweł Kopel</div>
              <div className="w3-card" style={{height:"3rem", alignItems:"center", justifyContent:"center", display:"flex", gap:"1em"}}><FontAwesomeIcon icon={faAtom}/>Marek Ślązak</div>
              <div className="w3-card" style={{height:"3rem", alignItems:"center", justifyContent:"center", display:"flex", gap:"1em"}}><FontAwesomeIcon icon={faAtom}/>Sebastian Wąwoźny</div>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
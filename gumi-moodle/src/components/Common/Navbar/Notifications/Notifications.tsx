import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Database } from "../../../../Structure/Database";
import { Notification } from "../../../../Structure/DataModel.interface";
import './Notifications.css'

interface IProps {
    nots: Array<Notification>
}

class Notifications extends Component<any,IProps>{
    constructor(props: any){
        super(props);

        this.state = {
            nots: []
        }
    }

    componentDidMount(){
        Database.getNotifications()
        .then(nots=>{
            this.setState({
                nots:nots
            })
        })
    }

    render(){
        return <NotificationsList nots={this.state.nots}/>
    }
    
}

//#region PRESENTATION

const NotificationsList = (props: IProps) => {
    return (
        <div className={"dropdown"}>
            <FontAwesomeIcon style={{ minWidth: "2rem" }} icon={faBell} />
            <span style={props.nots.length === 0 ? {} : { background: "#5d99c6", color: "#fff" }} className="dot">
                {props.nots.length}
            </span>
            <div className="dropdown-content">
            {
                props.nots.length>0
                ? props.nots.map((v, k) => {
                    return <NotificationDisplay not={v} key={'not_' + k} />
                })
                : <div className="notification col">Nothing here :(</div>
            }
            </div>
        </div>
    )
}



function dateToString(timeStamp: string): string {
    const date = new Date(parseInt(timeStamp));
    
    const isToday = (someDate:Date) : boolean => {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear();
      }

    
    if(isToday(date)) return `${date.getHours()}:${date.getMinutes()}`
    return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
}

const NotificationDisplay = (props: { not: Notification }) => {
    return (
        <Link to={"/courses/details/"+props.not.courseID} className="notification">
            <div className="col"><b>{props.not.courseID}</b>
            {props.not.gradeID}</div>
            {dateToString(props.not.createdTimestamp)}
        </Link>
    )

}
//#endregion



export default Notifications;
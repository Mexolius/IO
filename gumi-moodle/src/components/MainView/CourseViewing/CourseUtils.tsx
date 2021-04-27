import { Component } from "react"
import { Link } from "react-router-dom"
import { CourseData } from "../../../Structure/DataModel.interface"

class CourseList extends Component<{ data: Array<CourseData> }>{

    render() {
        return (
            <ul className="w3-ul w3-card-4 ">
                {this.props.data.map((x: CourseData) => {
                    return (
                        <Link key={"course_" + x._id} to={'./course_details/' + x._id}>
                            <li className="w3-bar w3-white w3-hover-light-gray">
                                <img alt="" src="https://www.pngkit.com/png/detail/449-4499737_energy-appraiser-certification-course-materials-icon-course-icon.png" className="w3-bar-item w3-circle" style={{ width: "85px" }}></img>
                                <div className="w3-bar-item">
                                    <h3 className="w3-bottombar">{x.name}</h3>
                                    <span>{x.description}</span>
                                </div>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        )
    }
}


export default CourseList;
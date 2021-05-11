import { Route, generatePath, Link } from "react-router-dom"
import { Course } from "../../../Structure/DataModel.interface"
import CourseDetails from "./CourseDetails/CourseDetails";


const CourseList = (props: { data: Array<Course> }) =>{
    return (
        <>
            <ul className="w3-ul w3-card-4 ">
                {props.data.map(x => {
                    const id = x._id;
                    return (
                            <Link key={"course_" + x._id} to={generatePath(`/courses/details/:id`, {id})}>
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
            <Route path={`/courses/details/:id`}>
                <CourseDetails />
            </Route>
            </>
        )
}


export default CourseList;
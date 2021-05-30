import { Route, generatePath, Link } from "react-router-dom"
import { Course } from "../../Structure/DataModel.interface"
import CourseDetails from "./CourseDetails";

import '../../Styles/CourseList.css'


const CourseList = (props: { data: Array<Course> }) => {
    return (
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <h1 style={{textAlign:"center"}}> Courses</h1>
            <div className="gallery">
                
                {props.data.map(x => {
                    const id = x._id;
                    return (
                        <div key={"course_" + x._id} className="element">
                            <Link style={{textDecoration:"none"}}  to={generatePath(`/courses/details/:id`, { id })}>
                                <div className="w3-card w3-hover-shadow">
                                <header className="course-title">{x.name}</header>
                                    <div className="content">
                                        <img style={{width:'100px', height:'100px'}} alt="" src="https://www.pngkit.com/png/detail/449-4499737_energy-appraiser-certification-course-materials-icon-course-icon.png" className="w3-bar-item w3-circle"></img>
                                        <p style={{textAlign:"justify"}}>{[x.description,x.description,x.description,x.description,x.description,x.description,x.description].join(" ")}</p>
                                    </div>
                                    
                                    
                                </div>
                            </Link>

                        </div>

                    )
                })}
            </div>
            <Route path={`/courses/details/:id`}>
                <CourseDetails />
            </Route>
        </div>
    )
}


export default CourseList;
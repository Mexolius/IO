import { Link } from "react-router-dom"

export interface Course {
    id: string,
    name: string,
    description: string,
    studentsLimit: number,
    students: [],
    teachers: Array<String>
}

export const CourseList = (props: {ls:Array<Course>}) => (

    <ul className="w3-ul w3-card-4 ">
        {props.ls.map((x: Course) => {
            return (
                <li key={"course_"+x.id} className="w3-bar w3-white w3-hover-light-gray">
                <Link to={'./course_details/' + x.id}>
                        <img alt="" src="https://www.pngkit.com/png/detail/449-4499737_energy-appraiser-certification-course-materials-icon-course-icon.png" className="w3-bar-item w3-circle" style={{ width: "85px" }}></img>
                        <div className="w3-bar-item">
                            <h3 className="w3-bottombar">{x.name}</h3>
                            <span>{x.description}</span>
                        </div>
                </Link>
                </li>

            )
        })}
    </ul>
)
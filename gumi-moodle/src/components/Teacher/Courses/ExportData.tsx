import { Database } from "../../../Structure/Database";

interface IProps{
    course_id: string;
    format: string;
}

const ExportData = (props: IProps)=>{


    Database.getExport(props.format,props.course_id)
    .then()
    .catch()
    .finally()


    return(<>Hello</>)
}

export default ExportData
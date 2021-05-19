import { Database } from "../../../../Structure/Database";
import LoadingWrapper, { LoadingProps } from "../../../LoadingComponent/LoadingWrapper"

interface IProps{
    course_id: string;
}

const ExportData = (props: IProps)=>{


    Database.getExport("csv",props.course_id)
    .then()
    .catch()
    .finally()


    return(<>Hello</>)
}

export default ExportData
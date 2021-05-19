import React, { useState } from "react";
import { useHistory } from "react-router";
import { Database } from "../../../../Structure/Database";

interface IProps {
    course_id: string
}

export function AddTeacher(props: IProps) {

    const [email, setEmail] = useState("")
    const [status, setStatus] = useState(0)
    const hist = useHistory();

    let form = (<></>)

    const onSubmit = (event: any) => {
        console.log(email)
        event.preventDefault();
        Database.enrollUser(email, props.course_id)
            .then(res => {
                setStatus(200)
            })
            .catch(err => {
                setStatus(err.status)
            })
            .finally(() => {
                setTimeout(()=>{hist.push("/students_list")},1000)
                
            })
    }
    if (status === 0) {
        form = (
            <form onSubmit={onSubmit}>
                <h2>Add a fellow Teacher</h2>
                <label>
                    Email:
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
                </label>
                <input type="submit" value="Send invite" />
            </form>
        )
    }
    else if(status === 200){
        form = (<h1>TEACHER ADDED!</h1>)
    }
    else if(status === 200){
        form = (<h1>Error {status}</h1>)
    }

    return form;
}

export default AddTeacher;
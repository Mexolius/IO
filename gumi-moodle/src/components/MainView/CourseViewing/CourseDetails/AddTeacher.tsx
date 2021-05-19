import React, { useState } from "react";
import {  useHistory } from "react-router";
import { Database } from "../../../../Structure/Database";

interface IProps {
    course_id: string
}

export function AddTeacher(props: IProps) {

    const [email, setEmail] = useState("")
    const hist = useHistory();

    const onSubmit = (event:any)=>{
        console.log(email)
        event.preventDefault();
        Database.enrollUser(email,props.course_id)
        .then(res=>{})
        .catch(err=>{})
        .finally(()=>{
            hist.push("/students_list")
        })
    }

    console.log("render")

    return (
        <form onSubmit={onSubmit}>
            <h2>Add a fellow Teacher</h2>
            <label>
                Email:
        <input value={email} onChange={e=>setEmail(e.target.value)} type="text" />   
            </label>
            <input type="submit" value="Send invite" />
        </form>
    );
}

export default AddTeacher;
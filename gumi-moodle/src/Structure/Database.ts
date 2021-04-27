import { IUser } from "./DataModel.interface";

export namespace Database {

    const url = "http://localhost:8080/";
    const authorized = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('authData')
    }

    const unauthorized = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    }

    export function getCourses() {
        return fetch(url + "courses", {
            headers: authorized,
            method: "GET"
        });
    }

    export function getUserDetails(email: string) : Promise<IUser>{

        return new Promise<IUser>((resolve,reject)=>{
            fetch(url + "user/"+email, {
                headers: authorized,
                method: "GET"
            })
            .then(response=>{
                if(response.ok) response.json().then(resolve).catch(reject);
                else reject({
                    status: response.status,
                    reason: response.statusText
                });
            })
            .catch(err=>{
                reject({
                    status: -1,
                    reason: "Network Error"
                });
            })
        })
    }

    export function login(token:string){
        let tempLoginHeaders = Object.assign(unauthorized,{
            'Authorization': 'Basic ' + token
        });
        return fetch(url+"logged",{
            headers: tempLoginHeaders,
            method: "GET"
        })
    }

    export function postCourseGradeModel(course_id: String, data: string){
        return fetch(url + "course/grade/"+course_id, {
            headers: authorized,
            method: "POST",
            body: data
        });
    }
}


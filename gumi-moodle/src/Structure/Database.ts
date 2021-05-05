import { Course, IUser } from "./DataModel.interface";

export namespace Database {
    //////////////
    //#region UTIL

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

    function handleThen<T>(response: Response, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) {
        if (response.ok) response.json().then(resolve).catch(reject);
        else reject({
            status: response.status,
            reason: response.statusText
        });
    }

    function handleCatch(reject: (reason?: any) => void) {
        reject({
            status: -1,
            reason: "Network Error"
        });
    }
    //#endregion UTIL
    /////////////////

    /////////////
    //#region GET

    export function getAllCourses(): Promise<Array<Course>> {
        return new Promise<Array<Course>>((resolve, reject) => {
            fetch(url + "courses", {
                headers: authorized,
                method: "GET"
            })
                .then(response => handleThen(response, resolve, reject))
                .catch(() => handleCatch(reject))
        })
    }

    export function getCourseDetails(userID: string, courseID: string) : Promise<Course> {
        return new Promise<Course>((resolve, reject) => {
            fetch(url + `courses/${userID}/${courseID}`, {
                headers: authorized,
                method: "GET"
            })
                .then(response => handleThen(response, resolve, reject))
                .catch(() => handleCatch(reject))
        })
    }


    export function getUserDetails(email: string, token?: string): Promise<IUser> {
        const tempLoginHeaders = token === undefined
            ? authorized
            : Object.assign(unauthorized, { 'Authorization': 'Basic ' + token });

        return new Promise<IUser>((resolve, reject) => {
            fetch(url + "user/" + email, {
                headers: tempLoginHeaders,
                method: "GET"
            })
                .then(response => handleThen(response, resolve, reject))
                .catch(() => handleCatch(reject));
        })
    }

    //#endregion GET
    ////////////////

    //////////////
    //#region POST

    //alias
    export const register = postUser;
    export function postUser(data: string) {
        return fetch(url + "user", {
            headers: unauthorized,
            method: "POST",
            body: data
        });
    }

    export function postCourse(data: string) {
        return fetch(url + "course", {
            headers: authorized,
            method: "POST",
            body: data
        })
    }

    export function postCourseGradeModel(course_id: string, data: string) {
        console.log(data);
        return fetch(url + "grades/" + course_id, {
            headers: authorized,
            method: "POST",
            body: data
        });
    }

    export function postStudentPoints(course_id: string, grade_id: string, student_id: string, points:number) {
        return fetch(url + "grade/" + course_id+'/'+grade_id+'/'+student_id, {
            headers: authorized,
            method: "POST",
            body: JSON.parse(JSON.stringify(points))
        });
    }

    //#endregion POST
    /////////////////
}


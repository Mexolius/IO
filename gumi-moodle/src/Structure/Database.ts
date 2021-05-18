import { Course, Grade, IUser } from "./DataModel.interface";

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

    function sortGrades(grades: Array<Grade>): Array<Grade>{
        if(grades.length!==0){
            grades.forEach(g=>g.children=[])
            const grouped_grades = groupGrades(grades);
            grouped_grades[0].map(g=>findChildrenGrades(g,grouped_grades));
            return grouped_grades[0];
        }
        else return [];

    }

    function groupGrades(grades: Array<Grade>) : Array<Array<Grade>> {
        return grades.reduce(function(memo:Array<Array<Grade>>, x) {
          if (!memo[x.level]) { memo[x.level] = []; }
          memo[x.level].push(x);
          return memo;
        }, []);
      }
      

    function findChildrenGrades(parent: Grade, children: Array<Array<Grade>>){
        if(!parent.isLeaf){
            const potential_children = children[parent.level+1];
            const actual_children = potential_children.filter(child=>child.parentID===parent._id);
            parent.children.push(...actual_children);
            parent.children.map(child=>findChildrenGrades(child,children));
        }
        
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

    
    export function getMyCourses(): Promise<Array<Course>> {
        const user = localStorage.getItem("userID"), roles = localStorage.getItem('userRoles');

        return new Promise<Array<Course>>((resolve, reject) => {
            if(user!=null && roles!=null){
                const endpoint = roles.includes("TEACHER")?"of-teacher":"of-student";
                fetch(url + `courses/${endpoint}/${user}`, {
                headers: authorized,
                method: "GET"
            })
                .then(response => handleThen(response, resolve, reject))
                .catch(() => handleCatch(reject));
            }
            else{
                reject({
                    status: 401,
                    reason: "User not logged in"
                });
            }
            
        })
    }

    export function getCourseDetails(userID: string, courseID: string) : Promise<Course> {
        return new Promise<Course>((resolve, reject) => {
            fetch(url + `courses/${userID}/${courseID}`, {
                headers: authorized,
                method: "GET"
            })
                .then(response => {
                    console.log(response)
                    if(response.ok){
                        response.json().then(data=>{
                            console.log(data);
                            data.grades = sortGrades(data.grades);
                            console.log(data);
                            resolve(data)
                        })
                        .catch(reject)
                    }
                    else reject({
                        status: response.status,
                        reason: response.statusText
                    });
                })
                .catch(() => handleCatch(reject))
        })
    }

    export function getGradesLength(userID: string, courseID: string) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(url + `courses/${userID}/${courseID}`, {
                headers: authorized,
                method: "GET"
            })
                .then(response => {
                    console.log(response)
                    if(response.ok){
                        response.json().then(data=>{
                            console.log(data);
                        //    data.grades = sortGrades(data.grades);
                            console.log(data);
                            resolve(data.grades.length)
                        })
                        .catch(reject)
                    }
                    else reject({
                        status: response.status,
                        reason: response.statusText
                    });
                })
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
        return fetch(url + "register", {
            headers: unauthorized,
            method: "POST",
            body: data
        });
    }

    export function postCourse(data: string) {
        return fetch(url + "course", {
            headers: authorized,
            method: "POST",
            body: JSON.parse(JSON.stringify(data))
        })
    }

    export function postCourseGradeModel(course_id: string, data: string) {
        console.log(data);
        return fetch(url + "grade/" + course_id, {
            headers: authorized,
            method: "POST",
            body: JSON.parse(JSON.stringify(data))
        });
    }

    export function postStudentPoints(course_id: string, grade_id: string, student_id: string, points:number) {
        return fetch(url + `grade/${course_id}/${grade_id}/${student_id}`, {
            headers: authorized,
            method: "POST",
            body: JSON.parse(JSON.stringify(points))
        });
    }

    export function enrollUser(course_id: string) {
        return fetch(url + "course/enroll/" + course_id, {
            headers: authorized,
            method: "POST",
            body: localStorage.getItem('userID')!
        });
    }

    //#endregion POST
    /////////////////
}


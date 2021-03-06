import { Course, Grade, GraphData, IUser, Notification } from "./DataModel.interface";

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

    const aggregates = new Map(
        [
            ["SUM", (a: number, b: number) => a + b],
            ["MAX", (a: number, b: number) => Math.max(a, b)],
        ]
    )

    function aggregateGrade(g: Grade, id: string): number {
        if (g.isLeaf) return g.studentPoints[id] ?? 0;
        const aggrFunc = aggregates.get(g.aggregation) ?? aggregates.get('SUM')!
        const results = g.children.map(x => aggregateGrade(x, id)).reduce(aggrFunc, 0);
        g.studentPoints[id] = results;
        return results;
    }

    function sortGrades(grades: Array<Grade>): Array<Grade> {
        //console.log(grades);
        if (grades.length !== 0) {
            grades.forEach(g => g.children = [])
            const grouped_grades = groupGrades(grades);
            grouped_grades[0].map(g => findChildrenGrades(g, grouped_grades));
            const id = localStorage.getItem("userID")!;
            grouped_grades[0].forEach(x => aggregateGrade(x, id));
            return grouped_grades[0];
        }
        else return [];

    }

    function groupGrades(grades: Array<Grade>): Array<Array<Grade>> {
        return grades.reduce(function (memo: Array<Array<Grade>>, x) {
            if (!memo[x.level]) { memo[x.level] = []; }
            memo[x.level].push(x);
            return memo;
        }, []);
    }


    function findChildrenGrades(parent: Grade, children: Array<Array<Grade>>) {
        //console.log(parent);
        if (!parent.isLeaf) {
            const potential_children = children[parent.level + 1] ?? [];
            const actual_children = potential_children.filter(child => child.parentID === parent._id);
            parent.children.push(...actual_children);
            parent.children.map(child => findChildrenGrades(child, children));
        }

    }
    //#endregion UTIL
    /////////////////

    /////////////
    //#region GET

    export function getGraph(courseID:string) : Promise<Array<GraphData>>{
        return new Promise<Array<GraphData>>((resolve,reject)=>{
            fetch(url + `histogram/grades/${courseID}/${localStorage.getItem('userID')}`, {
                headers: authorized,
                method: "GET"
            })
            .then(response=>handleThen(response,resolve,reject))
            .catch(() => handleCatch(reject));
        })
    }

    export function getNotifications() : Promise<Array<Notification>>{
        return new Promise<Array<Notification>>((resolve,reject)=>{
            fetch(url + `notifications/user/${localStorage.getItem('userID')}`, {
                headers: authorized,
                method: "GET"
            })
            .then(response=>handleThen(response,resolve,reject))
            .catch(() => handleCatch(reject));
        });
    }

    export function getExport(format: string, course_id:string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fetch(url + `export/course/${format}/${course_id}`, {
                headers: authorized,
                method: "GET"
            })
                .then(x=>{
                    window.open(x.url)
                    resolve(x)
                })
                .catch(() => handleCatch(reject))
        })
    }


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
            if (user != null && roles != null) {
                const endpoint = roles.includes("TEACHER") ? "of-teacher" : "of-student";
                fetch(url + `courses/${endpoint}/${user}`, {
                    headers: authorized,
                    method: "GET"
                })
                    .then(response => handleThen(response, resolve, reject))
                    .catch(() => handleCatch(reject));
            }
            else {
                reject({
                    status: 401,
                    reason: "User not logged in"
                });
            }

        })
    }

    export function getCourseDetails(userID: string, courseID: string): Promise<Course> {
        return new Promise<Course>((resolve, reject) => {
            console.log(url + `courses/${userID}/${courseID}`)
            fetch(url + `courses/${userID}/${courseID}`, {
                headers: authorized,
                method: "GET"
            })
                .then(response => {
                    //console.log(response)
                    if (response.ok) {
                        response.json().then(data => {
                            //console.log(data);
                            data.grades = sortGrades(data.grades);
                            //console.log(data);
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

    export function getGradesLength(userID: string, courseID: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            fetch(url + `courses/${userID}/${courseID}`, {
                headers: authorized,
                method: "GET"
            })
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        response.json().then(data => {
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


    export function postCourseGradeModels(course_id: string, data: string) {
        console.log(data);
        return fetch(url + "grades/" + course_id, {
            headers: authorized,
            method: "POST",
            body: JSON.parse(JSON.stringify(data))
        });
    }

    export function updateCourseGradeModel(course_id: string, grade_id: string, data: string) {
        console.log(data);
        return fetch(url + `grade/${course_id}/${grade_id}`, {
            headers: authorized,
            method: "POST",
            body: data
        });
    }

    export function postStudentPoints(course_id: string, grade_id: string, student_id: string, points:number) {
        return fetch(url + `grade/${course_id}/${grade_id}/${student_id}`, {
            headers: authorized,
            method: "POST",
            body: JSON.parse(JSON.stringify(points))
        });
    }


    export function enrollUser(user: string, course_id: string) {
        return fetch(url + "course/enroll-by-email/" + course_id, {
            headers: authorized,
            method: "POST",
            body: user
        });
    }

    export function enrollMe(course_id: string) {
        return fetch(url + "course/enroll-by-id/" + course_id, {
            headers: authorized,
            method: "POST",
            body: localStorage.getItem('userID')!
        });
    }

    //#endregion POST
    /////////////////
}


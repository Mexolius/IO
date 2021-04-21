export namespace Database {

    const url = "http://localhost:8080/";
    const authorized = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + localStorage.getItem('authData'),
    }

    const non_authorized = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
    }

    export function getCourses() {
        return fetch(url + "courses", {
            headers: authorized,
            method: "GET"
        });
    }

    export function getUserDetails(email: string){
        return fetch(url + "user/"+email, {
            headers: authorized,
            method: "GET"
        });
    }
}


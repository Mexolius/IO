export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: Array<string>,
}


export interface Grade {
    _id: string,
    name: string,
    maxPoints: number,
    aggregation: string,
    studentPoints: {[key: string]:number}
    thresholds: Array<number>,
    parentID: string,
    level: number
    children: Array<Grade>,
    isLeaf: boolean
}

interface Instructor{
    firstName:string,
    lastName:string,
    _id:string,
}

export interface StudentCourse{

}

export interface TeachaerCourse{

}

export interface Course extends CourseData {
    _id: string,
    grades: Array<Grade>,
}

export interface ApiRequestState<DataType>{
    status: number,
    data: DataType,
}

export interface CourseData {
    name: string,
    description: string,
    studentLimit: number,
    students: Array<String>,
    teachers: Array<Instructor>
    isEnrolled: boolean
}
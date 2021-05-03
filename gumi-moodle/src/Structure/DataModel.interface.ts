export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: Array<string>,
}

export interface Grade {
    points: number,
    name: string
    children: Array<Grade>
}

export interface StudentCourse{

}

export interface TeachaerCourse{

}

export interface Course extends CourseData {
    _id: string,
    gradeModel: Array<Grade>,
}

export interface ApiRequestState<DataType>{
    status: number,
    data: DataType
}

export interface CourseData {
    name: string,
    description: string,
    studentLimit: number,
    students: Array<String>,
    teachers: Array<String>
}
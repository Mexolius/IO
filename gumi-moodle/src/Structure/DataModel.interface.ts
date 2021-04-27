
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

export interface CourseData {
    _id: string,
    gradeModel: Array<Grade>,
    name: string,
    description: string,
    studentsLimit: number,
    students: any,
    teachers: Array<String>
}

export interface ApiRequestState<DataType>{
    status: number,
    data: DataType
}
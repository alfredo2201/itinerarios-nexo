export type Advertisement = {
    _id?:string,
    companyName:string,
    fileName:string,
    URL?:string;
    repetitions:number,
    expiration:Date,
    format:string,
    status:string,
    createdAt?:Date,
    updatedAt?:Date
}
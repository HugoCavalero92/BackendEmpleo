export interface JobI{
    _id?: string;
    title?: string;
    description?: string;
    date?: string;
    author?: Author;
}

export interface Author{
    name?: string;
    email?: string;
    uid?: string;
}

export interface JobProps{
    job: JobI;
}
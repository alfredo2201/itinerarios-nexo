export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
}
export type UserProfile = {
    userName: string;
    email: string;
}

export type User = {
    UUID?: string;
    email: string;
    userName: string;
    password?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
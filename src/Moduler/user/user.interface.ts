export interface TpasswordHistory {
    password: string;
}

export interface Tuser {
    username: string;
    email: string;
    password: string;
    passwordHistory?: TpasswordHistory[];
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Tlogin {
    username: string;
    password: string;
}

export interface TchangePassword {
    currentPassword: string;
    newPassword: string;
}
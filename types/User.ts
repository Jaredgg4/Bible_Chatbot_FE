export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    notes: Note[];
}

export interface Note {
    id: string;
    title: string;
    content: string;
}
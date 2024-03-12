export interface IUser {
    id: number;
    email: string;
    password: string;
    key: string;
    activity: boolean;
    name: string;
    telephone: string;
    roles_id: number;
    company_id: number;
    otp?: string;
}
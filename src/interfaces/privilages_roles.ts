export interface IPrivilegesRoles {
    roles_id: number;
    privileges_id: number;
    activity: boolean;
    roles_name: string;
    privileges_name: string;
     app_id: number;
}

export interface IPrivilages {
    key: string;
    route: string;
    value: IPrivilegesRoles[];
}
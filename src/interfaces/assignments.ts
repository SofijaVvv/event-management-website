import {Details} from "./events";


export interface AssignmentsDetails {
    id: number,
    description: string,
    status: number,
    priority: Details,
    user: Details,
    event_id: number,
    created_date: Date,
    end_date: Date,
    date: string

}

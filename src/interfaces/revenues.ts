import {Details} from "./events";

export interface RevenuesDetails {
    id: number;
    type_of_revenue: Details;
    event_id: number;
    user: Details;
    amount: number;
    description: string;
    quantity: number;
    unit: Details;
}

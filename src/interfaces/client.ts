import {Details} from "./events";

export interface IClient {
    id: number;
    name: string;
    address: string;
    city: string;
    phone: string;
    pdvnumber: string;
    pib: string;
    email: string;
    type_of_client: Details;
    bank_account: string;
    note: string;
}
import database from "../repository /db.js";
import {IUser} from "../interfaces/user";
import {Details} from "../interfaces/events";


export async function getSharedUsers():Promise<IUser[]>{
    return database('user')
        .select(
            'user.id',
            'user.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getLocations():Promise<Details[]>{
    return database('location')
        .select(
            'location.id',
            'location.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getEventTypes():Promise<Details[]>{
    return database('type_of_events')
        .select(
            'type_of_events.id',
            'type_of_events.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getEventStatuses():Promise<Details[]>{
    return database('event_status')
        .select(
            'event_status.id',
            'event_status.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getClients():Promise<Details[]>{
    return database('client')
        .select(
            'client.id',
            'client.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getTypeOfClients():Promise<Details[]>{
    return database('type_of_client')
        .select(
            'type_of_client.id',
            'type_of_client.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getRevenuesTypes():Promise<Details[]>{
    return database('type_of_revenues')
        .select(
            'type_of_revenues.id',
            'type_of_revenues.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getUnits():Promise<Details[]>{
    return database('units')
        .select(
            'units.id',
            'units.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}

export async function getCostsType():Promise<Details[]>{
    return database('type_of_costs')
        .select(
            'type_of_costs.id',
            'type_of_costs.name',
        )
        .orderBy([{ column : "name",order: "asc"}])
        .then((rows: any) => {
            return (rows);
        })
}



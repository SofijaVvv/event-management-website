import database from "../repository /db";
import {IUser} from "../interfaces/user";
import {Details} from "../interfaces/events";
import {exportAssignmentsExcel, exportCostExcel, exportEventsExcel, exportScheduleExcel} from "./excel_services";
import {eventDetails} from "./event_services";
import {getAssignments} from "./assignment_services";
import {getSchedules} from "./schedule_services";
import {getCosts} from "./costs_services";
import {getEventCosts} from "./event_costs_services";


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


export async function updateShared(sharedType: string, data: Details,):Promise<any>{
    let table = '';
    switch (sharedType) {
        case 'Location':
            table = 'location';
            break;
        case 'Event Type':
            table = 'type_of_events';
            break;
        case 'Event Status':
            table = 'event_status';
            break;
        case 'Client Type':
            table = 'type_of_client';
            break;
        case 'Revenue Type':
            table = 'type_of_revenues';
            break;
        case 'Unit Type':
            table = 'units';
            break;
        case 'Expense Type':
            table = 'type_of_costs';
            break;
    }

    if (data.id === 0) {
        return database(table).insert(data)
            .then((rows: any) => {
                return {error:false, message: rows[0].toString()};
            })
    } else {
        return database(table).where({id: data.id}).update(data)
            .then((rows: any) => {
                return {error:false, message: data.id.toString()};
            })
    }
}


export async function eventsToExcel(eventId: number, fromDate: string, toDate: string, language: string):Promise<any>{
    const result = await eventDetails(eventId,fromDate,toDate);
    return exportEventsExcel(result, language, fromDate, toDate);
}

export async function assignmentsToExcel(eventId: number, fromDate: string, toDate: string, language: string):Promise<any>{
    const result = await getAssignments(eventId,fromDate,toDate);
    return exportAssignmentsExcel(result, language, fromDate, toDate);
}

export async function scheduleToExcel(eventId: number, fromDate: string, toDate: string, language: string):Promise<any>{
    const result = await getSchedules(eventId,fromDate,toDate);
    return exportScheduleExcel(result, language, fromDate, toDate);
}

export async function costToExcel(eventId: number, fromDate: string, toDate: string, language: string):Promise<any>{
    const result = await getCosts(fromDate,toDate);
    const result1 = await getEventCosts(eventId,fromDate,toDate);
    result.push(...result1);

    return exportCostExcel(result, language, fromDate, toDate);
}


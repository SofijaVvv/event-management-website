import database from "../repository /db.js";
import {IEvents} from "../interfaces/events.js";
import {EventDetails} from "../interfaces/events.js";

import * as moment from 'moment';

export async function addEvent(newEvent:EventDetails) {
    try {

        const dataForInsert : IEvents = {
            id: newEvent.id,
            date: newEvent.date.substring(0, 10),
            time: newEvent.time.name,
            client_id: newEvent.client.id,
            type_of_event_id: newEvent.type_of_event.id,
            status_event_id: newEvent.status_event.id,
            location_id: newEvent.location.id,
            event_rating: newEvent.event_rating,
            user_id: newEvent.user.id,
            description: newEvent.description,
            number_of_participants: newEvent.number_of_participants
        }

        if (newEvent.id) {
            await database("events")
                .where("id", newEvent.id)
                .update(dataForInsert);
            return ({error: false, message: dataForInsert})
        } else {
            const insertedIds = await database("events")
                .insert(dataForInsert);
            dataForInsert.id= insertedIds[0];
            return ({error: false, message: dataForInsert})
        }

    } catch (error) {
        console.error('Greška prilikom dodavanja dogadjaja:', error);
        return { error: false, message: 'Error in inserting new event.' }
    }
}






export async function calendar(year: number, month: number, status = 1) {


    const firstDayOfMonth = moment.parseZone(`${year}-${month}-01`);

    let lastDayOfMonth = moment.parseZone(`${year}-${month}-01`).endOf('month');

    const numDays = lastDayOfMonth.date();


    const calendar: any[][] = [];
    for (let i = 0; i < 6; i++) {
        calendar[i] = [];

    }

    const weekday = firstDayOfMonth.day();
    if (weekday > 0) {
        for (let i = 1; i < weekday; i++) {
            calendar[0].push({});
        }
    } else {
        for (let i = 0; i < 6; i++) {
            calendar[0].push({});
        }
    }
    let calRow = 0
    let lastDay = 0;
    for (let day = 1; day <= numDays; day++) {
        const month_ext = month.toString().padStart(2, '0');
        const day_ext = day.toString().padStart(2, '0');

        const date = moment.parseZone(`${year}-${month_ext}-${day_ext}`);

        const events = await database('events')
            .where('date', '=', date.format('YYYY-MM-DD'))
            .andWhere('status_event_id', status);

        if (events.length) {
            calendar[calRow].push({
                date: day,
                number_of_events: events.length,
                weekday: date.day()
            });
        } else {
            calendar[calRow].push({
                date: day,
                number_of_events: 0,
                weekday: date.day()
            });
        }
        if (date.day() === 0) {
            calRow++;
        }
        lastDay = date.day();
    }
    if (lastDay < 6) {
        for (let i = lastDay; i < 6; i++) {
            calendar[calRow].push({});
        }
    }
    calendar.pop();
    return { calendar };
}

export async function eventDetails(event_id: number = 0, fromDate?: string, toDate?: string): Promise<EventDetails> {

    let query =  database.from('events as e')
        .join('client as c', 'e.client_id', '=', 'c.id')
        .join('type_of_events as t', 'e.type_of_event_id', '=', 't.id')
        .join('event_status as es', 'e.status_event_id', '=', 'es.id')
        .join('location as l', 'e.location_id', '=', 'l.id')
        .join('user as u', 'e.user_id', '=', 'u.id')
        .select(
            'e.id',
            'e.client_id',
            'c.name as client_name',
            'e.type_of_event_id',
            't.name as type_of_event_name',
            'e.status_event_id',
            'es.name as event_status_name',
            'e.location_id',
            'l.name as location_name',
            'e.user_id',
            'u.name as user_name',
            'e.description',
            'e.date',
            'e.time',
            'e.event_rating',
            'e.number_of_participants'
            )
        .orderBy('e.date', 'desc')
        if (event_id) {
            query = query.where('e.id', event_id);
        } else {
            query = query.whereBetween('date', [fromDate, toDate]);
        }
        return query.then(rows => {
            const result: EventDetails[] = [];
            for (let i = 0; i < rows.length; i++) {
                const event: EventDetails = {
                    id: rows[i].id,
                    client: {
                        id: rows[i].client_id,
                        name: rows[i].client_name
                    },
                    type_of_event: {
                        id: rows[i].type_of_event_id,
                        name: rows[i].type_of_event_name
                    },
                    status_event: {
                        id: rows[i].status_event_id,
                        name: rows[i].event_status_name
                    },
                    location: {
                        id: rows[i].location_id,
                        name: rows[i].location_name
                    },
                    user: {
                        id: rows[i].user_id,
                        name: rows[i].user_name
                    },
                    description: rows[i].description, date: rows[i].date  .toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    time: {id: parseInt(rows[i].time.substring(0, 2)), name: rows[i].time},
                    event_rating: rows[i].event_rating,
                    number_of_participants: rows[i].number_of_participants
                }
                if (event_id) {
                    return  event;
                }
                result.push(event);
            }
            return result;
        });
}









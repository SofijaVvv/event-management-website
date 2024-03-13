import database from "../repository /db.js";
import {ScheduleDetails} from "../interfaces/schedule.js";

export async function getSchedules( event_id: number = 0, fromDate: string, toDate:string) {

    let query = database('event_schedule as es')
        .join('user', 'es.user_id', '=', 'user.id')
        .join('events as e', 'es.events_id', '=', 'e.id')
        .select(
            'es.id',
            'es.description',
            'es.user_id',
            'user.name as user_name',
            'es.events_id',
            'es.start_time',
            'es.end_time',
            'e.date'
        )
        .orderBy([{ column : "id",order: "desc"}])

    if (event_id) {
        query = query.where('es.events_id', event_id);
    } else {
        query = query.whereBetween('e.date', [fromDate, toDate]);
    }
    return query.then(rows => {

        const result: ScheduleDetails[] = [];
        for (let i = 0; i < rows.length; i++) {
            const schedule: ScheduleDetails = {
                id: rows[i].id,
                date: rows[i].date.toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                description: rows[i].description,
                user: {
                    id: rows[i].user_id,
                    name: rows[i].user_name
                },
                event_id: rows[i].events_id,
                start_time: {id: parseInt(rows[i].start_time.substring(0, 2)), name: rows[i].start_time},
                end_time: {id: parseInt(rows[i].end_time.substring(0, 2)), name: rows[i].end_time}
            }
            result.push(schedule);
        }
        return result;
    });
}


export async function addSchedule(newSchedule: ScheduleDetails){

    const dataForInsert = {
        description: newSchedule.description,
        user_id: newSchedule.user.id,
        events_id: newSchedule.event_id,
        start_time: newSchedule.start_time.name,
        end_time: newSchedule.end_time.name
    }

    if (newSchedule.id){
        await database('event_schedule')
            .where('id', newSchedule.id)
            .update(dataForInsert);
        return ({error:false, message: newSchedule})
    } else  {
        const insertedIds = await database('event_schedule')
            .insert(dataForInsert);
        newSchedule.id = insertedIds[0];
        return ({error:false, message: newSchedule})
    }

}

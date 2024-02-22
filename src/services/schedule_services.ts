import database from "../repository /db.js";
import { ScheduleDetails} from "../interfaces/schedule.js";

export async function getSchedules( event_id: number = 0 )
{

    let query = database('event_schedule as es')
        .join('user', 'es.user_id', '=', 'user.id')
        .select(
            'es.id',
            'es.description',
            'es.user_id',
            'user.name as user_name',
            'es.events_id',
            'es.start_time',
            'es.end_time'
        )
        .orderBy([{ column : "id",order: "desc"}])

    if (event_id) {
        query = query.where('es.events_id', event_id);
    }
    return query.then(rows => {

        const result: ScheduleDetails[] = [];
        for (let i = 0; i < rows.length; i++) {
            const schedule: ScheduleDetails = {
                id: rows[i].id,
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

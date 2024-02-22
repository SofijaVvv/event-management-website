import database from "../repository /db.js";
import {AssignmentsDetails} from "../interfaces/assignments.js";
import * as moment from 'moment';


export async function getPriorities(){
    return database('priorities')
        .select()
        .orderBy([{ column : "id",order: "asc"}])
        .then(rows => {
            return rows;
        });

}


export async function getAssignments( event_id: number = 0 )
{

    let query = database('event_assignments as ea')
        .join('user', 'ea.user_id', '=', 'user.id')
        .join('events as e', 'ea.events_id', '=', 'e.id')
        .select(
            'ea.id',
            'ea.description',
            'ea.status',
            'ea.priority',
            'ea.user_id',
            'user.name as user_name',
            'ea.events_id',
            'ea.created_date',
            'ea.end_date',
            'e.id as event_id'
        )
        .orderBy([{ column : "id",order: "desc"}])

    if (event_id) {
        query = query.where('e.id', event_id);
    }
    return query.then(rows => {
        const priortyArray = ["", "Low", "Medium", "High", "Urgent"];
        const result: AssignmentsDetails[] = [];
        for (let i = 0; i < rows.length; i++) {
            const assignment: AssignmentsDetails = {
                id: rows[i].id,
                description: rows[i].description,
                status: rows[i].status,
                priority: {id: rows[i].priority, name: priortyArray[rows[i].priority]},
                user: {
                    id: rows[i].user_id,
                    name: rows[i].user_name
                },
                event_id: rows[i].event_id,
                created_date: rows[i].created_date.toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                end_date: rows[i].end_date //?
                    // rows[i].end_date.toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' })
                // : "",
            }
            result.push(assignment);
        }
        return result;
    });

}




export async function addAssignment(newAssignment: AssignmentsDetails){
    // try {
    const createdDate = moment.parseZone(newAssignment.created_date).toDate();
    const endDate = moment.parseZone(newAssignment.end_date).toDate();
   const dataForInsert = {
         id: newAssignment.id,
         description: newAssignment.description,
         status: newAssignment.status,
         priority: newAssignment.priority.id,
         user_id: newAssignment.user.id,
         events_id: newAssignment.event_id,
         created_date: createdDate,
         end_date: endDate
   }
   console.log(dataForInsert, "prije inserta")
   if (newAssignment.id){
       const createdDate = dataForInsert.created_date;
       delete dataForInsert.created_date;
       await database('event_assignments')
           .where('id', newAssignment.id)
           .update(dataForInsert);

         return ({error: false, message: newAssignment});
   } else {
       const insertedIds = await database('event_assignments')
           .insert(dataForInsert);
       newAssignment.status = Number(newAssignment.status);
       newAssignment.id= insertedIds[0];
       return ({error: false, message: newAssignment});
   // }
   //  } catch (error){
   //      return ({error: true, message: "Error adding assignment"});
   //  }
}
    }




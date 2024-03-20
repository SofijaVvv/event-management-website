import database from "../repository /db.js";
import {EventCostsDetails} from "../interfaces/costs.js";


export async function getEventCosts(event_id: number = 0, fromDate: string, toDate:string ){
    let query = database('event_costs as ec')
        .join('events as e', 'ec.event_id', '=', 'e.id')
        .join('user', 'ec.user_id', '=', 'user.id')
        .join('type_of_costs as toc', 'ec.type_of_costs_id', '=', 'toc.id')
        .join('client', 'ec.client_id', '=', 'client.id')
        .select(
            'ec.id',
            'e.date',
            'ec.type_of_costs_id',
            'toc.name as type_of_cost_name',
            'ec.event_id',
            'ec.user_id',
            'user.name as user_name',
            'ec.amount',
            'ec.description',
            'ec.client_id',
            'client.name as client_name'
        ).orderBy([{ column : "e.date",order: "desc"}])

    if (event_id) {
        query = query.where('ec.event_id', event_id);
    } else {
        query = query.whereBetween('e.date', [fromDate, toDate]);
    }
    return query.then(rows => {
        const result: EventCostsDetails[] = [];
        for (let i = 0; i < rows.length; i++) {
            const cost: EventCostsDetails = {
                id: rows[i].id,
                description: rows[i].description,
                user: {
                    id: rows[i].user_id,
                    name: rows[i].user_name
                },
                event_id: rows[i].event_id,
                amount: rows[i].amount,
                date: rows[i].date.toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                type_of_cost: {
                    id: rows[i].type_of_costs_id,
                    name: rows[i].type_of_cost_name
                },
                client: {
                    id: rows[i].client_id,
                    name: rows[i].client_name
                }
            }

            result.push(cost);
        }
        return result;
    });
}


export async function addEventCost(newCost: EventCostsDetails){
    const dataForInsert = {
        description: newCost.description,
        user_id: newCost.user.id,
        event_id: newCost.event_id,
        amount: newCost.amount,
        type_of_costs_id: newCost.type_of_cost.id,
        client_id: newCost.client.id
    }
    if (newCost.id){
        await database('event_costs')
            .where('id', newCost.id)
            .update(dataForInsert);
        return ({error:false, message: newCost})
    }
    else{
        let newID  = await database('event_costs').insert(dataForInsert);
        console.log(newID, "NEW ID")
        newCost.id = newID[0];
        return ({error:false, message: newCost})
    }
}





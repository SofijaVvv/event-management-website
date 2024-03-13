import database from "../repository /db.js";
import {CostsDetails, EventCostsDetails} from "../interfaces/costs";
import moment from 'moment';

export async function getCosts(fromDate: string, toDate:string){

    let  query = database('costs as c')
        .join('user', 'c.user_id', '=', 'user.id')
        .join('type_of_costs as toc', 'c.type_of_costs_id', '=', 'toc.id')
        .join('client', 'c.client_id', '=', 'client.id')
        .select(
            'c.id',
            'c.type_of_costs_id',
            'toc.name as type_of_cost_name',
            'c.user_id',
            'user.name as user_name',
            'c.amount',
            'c.description',
            'c.client_id',
            'client.name as client_name',
            'c.date'
        ).orderBy([{ column : "c.date",order: "desc"}])
    query = query.whereBetween('c.date', [fromDate, toDate]);
    return query.then(rows => {
        const result: EventCostsDetails[] = [];
        for (let i = 0; i < rows.length; i++) {
            const cost = {
                id: rows[i].id,
                description: rows[i].description,
                user: {
                    id: rows[i].user_id,
                    name: rows[i].user_name
                },
                amount: rows[i].amount,
                type_of_cost: {
                    id: rows[i].type_of_costs_id,
                    name: rows[i].type_of_cost_name
                },
                client: {
                    id: rows[i].client_id,
                    name: rows[i].client_name
                },
                date: rows[i].date.toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                event_id: null
            }
            result.push(cost);
        }
        return result;
    }
    );

}


export async function addOtherCost(newCost: CostsDetails){

    const dataForInsert = {
        description: newCost.description,
        user_id: newCost.user.id,
        date: moment.parseZone(newCost.date).format("YYYY-MM-DD"),
        amount: newCost.amount,
        type_of_costs_id: newCost.type_of_cost.id,
        client_id: newCost.client.id
    }
    if (newCost.id){
        await database('costs')
            .where('id', newCost.id)
            .update(dataForInsert);
        return ({error:false, message: newCost})
    }
    else{
        await database('costs').insert(dataForInsert);
        return ({error:false, message: newCost})
    }
}
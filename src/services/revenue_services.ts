import database from "../repository /db.js";
import {ScheduleDetails} from "../interfaces/schedule";
import {RevenuesAnalisysDetails, RevenuesDetails} from "../interfaces/revenues";


export async function getRevenues( event_id: number = 0, fromDate:string, toDate:string )
{
    let query = database('revenues as rev')
        .join('user', 'rev.user_id', '=', 'user.id')
        .join('type_of_revenues as tor', 'rev.type_of_revenues_id', '=', 'tor.id')
        .join('units as u', 'rev.unit_id', '=', 'u.id')
        .join('events as e', 'rev.events_id', '=', 'e.id')
        .select(
            'rev.id',
            'rev.type_of_revenues_id',
            'rev.events_id',
            'rev.user_id',
            'user.name as user_name',
            'rev.amount',
            'e.date',
            'rev.description',
            'rev.quantity',
            'rev.unit_id',
            'u.name as unit_name',
            'tor.name as type_of_revenue_name'

        ).orderBy([{ column : "id",order: "desc"}])

    if (event_id) {
        query = query.where('e.id', event_id);
    } else {
        query = query.whereBetween('e.date', [fromDate, toDate]);
    }
    return query.then(rows => {

        const result: RevenuesDetails[] = [];
        for (let i = 0; i < rows.length; i++) {
            const revenue: RevenuesDetails = {
                id: rows[i].id,
                description: rows[i].description,
                user: {
                    id: rows[i].user_id,
                    name: rows[i].user_name
                },
                event_id: rows[i].events_id,
                amount: rows[i].amount,
                date: rows[i].date.toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                type_of_revenue: {
                    id: rows[i].type_of_revenues_id,
                    name: rows[i].type_of_revenue_name
                },
                quantity: rows[i].quantity,
                unit: {
                    id: rows[i].unit_id,
                    name: rows[i].unit_name
                },
            }

            result.push(revenue);
        }
        return result;
    });

}

export async function addRevenue(newRevenues: RevenuesDetails){
    const dataForInsert = {
        user_id: newRevenues.user.id,
        events_id: newRevenues.event_id,
        amount: newRevenues.amount,
        type_of_revenues_id: newRevenues.type_of_revenue.id,
        quantity: newRevenues.quantity,
        unit_id: newRevenues.unit.id,
    }
    if (newRevenues.id){
        await database('revenues')
            .where('id', newRevenues.id)
            .update(dataForInsert);
        return ({error:false, message: newRevenues})
    } else  {
        const insertedIds = await database('revenues')
            .insert(dataForInsert);
        newRevenues.id = insertedIds[0];
        return ({error:false, message: newRevenues})
    }
}







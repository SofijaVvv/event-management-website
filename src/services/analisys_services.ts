import database from "../repository /db.js";
import {RevenuesAnalisysDetails} from "../interfaces/revenues";

import { Knex } from 'knex';




export async function getAnalisysData(startDate: string, endDate: string) {
    try {

        await database.transaction(async (trx: Knex.Transaction) => {
            await trx.raw('CREATE TEMPORARY TABLE temp_dates (date_column DATE)');

            await trx.raw(`
            INSERT INTO temp_dates (date_column)
            SELECT DATE_ADD(?, INTERVAL n DAY) AS date_column
            FROM (
                SELECT a.N + b.N * 10 + c.N * 100 AS n
                FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a
                CROSS JOIN (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) b
                CROSS JOIN (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) c
            ) numbers
            WHERE DATE_ADD(?, INTERVAL n DAY) BETWEEN ? AND ?
        `, [startDate, startDate, startDate, endDate]);
        });

        const result = await database.raw(`
          SELECT
          DATE_FORMAT(temp_dates.date_column, '%d.%m') as date,
          COALESCE(costs.total_cost, 0) as total_cost,
          COALESCE(revenues.total_revenue, 0) as total_revenue
            FROM temp_dates
            LEFT JOIN events
              ON temp_dates.date_column = events.date
            LEFT JOIN
            (
              SELECT event_id, SUM(amount) AS total_cost
              FROM event_costs
              GROUP BY event_id
            ) costs
              ON events.id = costs.event_id
            LEFT JOIN
            (
              SELECT events_id, SUM(amount * quantity) AS total_revenue
              FROM revenues
              GROUP BY events_id
            ) revenues
              ON events.id = revenues.events_id
            GROUP BY temp_dates.date_column
    `);
        await database.raw('DROP TEMPORARY TABLE IF EXISTS temp_dates');
        return {error: false, message: result[0]};
    } catch (error) {

        return {error: true, message: `Error in executing SQL query ${error}`};
    }
}

export async function numberOfEventsForPeriod(startDate: string, endDate: string){

    let numberOfEvents = await database('events')
        .count('id as number_of_events')
        .sum('number_of_participants as number_of_participants')
        .whereBetween('date', [startDate, endDate])

    let totalRevenues = await database('revenues as r')
        .sum(database.raw('(r.amount * r.quantity)') )
        .join('events as e', 'r.events_id', '=', 'e.id')
        .whereBetween('e.date', [startDate, endDate])

    let totalEventCosts = await database('event_costs as ec')
        .sum('ec.amount as total_events_cost')
        .join('events as e', 'ec.event_id', '=', 'e.id')
        .whereBetween('e.date', [startDate, endDate])

    let totalCosts = await database('costs as c')
        .sum('c.amount as total_cost')
        .whereBetween('c.date', [startDate, endDate])

    let tmp = {
        number_of_events: numberOfEvents[0].number_of_events ? numberOfEvents[0].number_of_events : 0,
        number_of_participants: numberOfEvents[0].number_of_participants ? numberOfEvents[0].number_of_participants : 0,
        total_revenue: totalRevenues[0]['sum((r.amount * r.quantity))'] ? totalRevenues[0]['sum((r.amount * r.quantity))'] : 0,
        total_events_cost: totalEventCosts[0].total_events_cost ? totalEventCosts[0].total_events_cost : 0,
        total_cost: totalCosts[0].total_cost ? totalCosts[0].total_cost : 0
    }
    return {error: false, message: tmp}
}

export async function getAnalisysRevenueData(fromDate: string, toDate: string) {
    let query = database('revenues as rev')
        .join('events as e', 'rev.events_id', '=', 'e.id')
        .join('client as c', 'e.client_id', '=', 'c.id')
        .select(
            'e.date',
            database.raw('sum(rev.amount * rev.quantity) as total_revenue'),
            'c.name as client_name'
        )
        .whereBetween('e.date', [fromDate, toDate])
        .groupBy('e.id')
        .orderBy('e.date', 'desc')

    return query.then(rows => {
        const result: RevenuesAnalisysDetails[] = [];
        for (let i = 0; i < rows.length; i++) {
            const revenue: RevenuesAnalisysDetails = {
                date: rows[i].date.toLocaleDateString('sr-Latn', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                client: rows[i].client_name,
                amount: rows[i].total_revenue
            }
            result.push(revenue);
        }
        return result;
    });
}
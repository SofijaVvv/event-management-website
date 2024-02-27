import database from "../repository /db.js";




export async function getAnalisysData(startDate: string, endDate: string) {
    try {
        console.log(startDate, endDate, "fromdate, todate")

        // Create temporary table
        await database.raw('CREATE TEMPORARY TABLE temp_dates (date_column DATE)');

        // Set start and end dates
        // const startDate = '2024-02-08';
        // const endDate = '2024-02-15';

        // Generate a series of dates within the specified range
        await database.raw(`
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

        // Your main query
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

        return {error: true, message: 'Error in executing SQL query'};
    } finally {
        // Close the database connection
        // await database.destroy();

    }
}

export async function numberOfEventsForPeriod(startDate: string, endDate: string){
    console.log(startDate, endDate, "fromdate, todate")


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


    console.log(numberOfEvents, totalRevenues[0]['sum((r.amount * r.quantity))'], totalCosts, "number of events, total revenues, total costs")

    let tmp = {
        number_of_events: numberOfEvents[0].number_of_events ? numberOfEvents[0].number_of_events : 0,
        number_of_participants: numberOfEvents[0].number_of_participants ? numberOfEvents[0].number_of_participants : 0,
        total_revenue: totalRevenues[0]['sum((r.amount * r.quantity))'] ? totalRevenues[0]['sum((r.amount * r.quantity))'] : 0,
        total_events_cost: totalEventCosts[0].total_events_cost ? totalEventCosts[0].total_events_cost : 0,
        total_cost: totalCosts[0].total_cost ? totalCosts[0].total_cost : 0
    }

    return {error: false, message: tmp}


}
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
      SELECT DATE_FORMAT(temp_dates.date_column, '%d.%m') as date, COALESCE(SUM(event_costs.amount), 0) as total_cost,
       COALESCE(sum(revenues.amount* revenues.quantity),0) as total_revenue
      FROM temp_dates
      LEFT JOIN events ON temp_dates.date_column = events.date
      LEFT JOIN event_costs on events.id = event_costs.event_id
      LEFT JOIN revenues on events.id = revenues.events_id
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
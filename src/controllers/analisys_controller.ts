import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {getAnalisysData, getAnalisysRevenueData, numberOfEventsForPeriod} from "../services/analisys_services";
import {exportAnalisysExcel} from "../services/excel_services";


const analisysrouter = express.Router()

analisysrouter.get("/analisys/:fromDate/:toDate", authenticate, async (_request, response) => {
    const {fromDate, toDate} = _request.params;
    await getAnalisysData(fromDate, toDate).then(rezultat => {
        const dates : string[] = rezultat.message.map((item: any) => item.date);
        const totalRevenues: number[] = rezultat.message.map((item: any) => item.total_revenue);
        const totalCosts: number[] = rezultat.message.map((item: any) => item.total_cost);
        rezultat.message = {
            dates: dates,
            totalRevenues: totalRevenues,
            totalCosts: totalCosts
        }
        response.json(rezultat)
    })
}
);

analisysrouter.get("/analisys/total/:fromDate/:toDate", authenticate, async (_request, response) => {
    const {fromDate, toDate} = _request.params;
    await numberOfEventsForPeriod(fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    })
} );

analisysrouter.get("/analisys/revenues/total/:fromDate/:toDate", authenticate, async (_request, response) => {
    const {fromDate, toDate} = _request.params;
    await getAnalisysRevenueData(fromDate, toDate).then(rezultat => {
        response.json(rezultat)
    })
} );

analisysrouter.get("/analisys/excel", authenticate, async (request, response) => {
    await exportAnalisysExcel().then(rezultat => {
        response.send(rezultat)
    });
});


export default analisysrouter;
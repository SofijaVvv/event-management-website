
import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {getAnalisysData} from "../services/analisys_services";

const analisysrouter = express.Router()

analisysrouter.get("/analisys/:fromdate/:todate", authenticate, async (_request, response) => {

    const {fromdate, todate} = _request.params;
    await getAnalisysData(fromdate, todate).then(rezultat => {
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


export default analisysrouter;
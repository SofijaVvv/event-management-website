import express = require("express");
import {authenticate} from "../middleware/auth_middleware";
import {addRevenue, editRevenue} from "../services/revenue_services";

const revenuerouter = express.Router()

revenuerouter.post("/revenue/add", authenticate, async (req, res) => {
    const podaciPrihoda = req.body;
    await addRevenue(podaciPrihoda, res);
    console.log(podaciPrihoda);

});

revenuerouter.post("/revenue/edit", authenticate, async (req, res) => {
    const podaciPrihoda = req.body;
    await editRevenue(podaciPrihoda, res);
    console.log(podaciPrihoda);

});

export default revenuerouter;
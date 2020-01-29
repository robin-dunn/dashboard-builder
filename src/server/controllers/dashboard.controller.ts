import * as express from "express"
import { Request, Response } from "express"
import * as fs from "fs";
import * as path from "path";
import IControllerBase from "../interfaces/IControllerBase.interface"

class DashboardController implements IControllerBase {
    public routeBase = "/api/dashboard";
    public router = express.Router({ strict: false });

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/", this.index);
    }

    index = (req: Request, res: Response) => {

        let json = fs.readFileSync(path.join(__dirname, "..\\data\\dashboard1.json"));

        const dashboard = JSON.parse(json as any);
        res.json(dashboard);
    }
};

export default DashboardController

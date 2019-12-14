import * as express from "express"
import { Request, Response } from "express"
import IControllerBase from "../interfaces/IControllerBase.interface"

class HomeController implements IControllerBase {
    public routeBase = "/";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/', this.index);
    }

    index = (req: Request, res: Response) => {
        res.render('home/index');
    }
};

export default HomeController

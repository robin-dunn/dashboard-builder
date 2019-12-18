import * as express from "express"
import { Request, Response } from "express"
import IControllerBase from "../interfaces/IControllerBase.interface"
import { IncomingForm } from "formidable";
const fs = require('fs');

class LayerController implements IControllerBase {
    public routeBase = "/api/layer";
    public router = express.Router({ strict: false });

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/", this.getLayers);
        this.router.post("/", this.postUpload);
    }

    getLayers = (req: Request, res: Response) => {
        res.json([]);
    }

    postUpload = (req: Request, res: Response) => {
        var form = new IncomingForm()

        form.on('file', (field, file) => {
    console.log('file', file.name);
        });

        form.on('end', () => {
            res.json({ end: "end"});
        });

        form.parse(req);
    }
};

export default LayerController

import * as express from "express"
import { Request, Response } from "express"
import IControllerBase from "../interfaces/IControllerBase.interface"
import { IncomingForm } from "formidable";
import FileImporter from "../framework/fileImporter";

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
        var form = new IncomingForm();
        form.keepExtensions = true;

        form.on('file', (field, file) => {
    console.log('file', file.name, file.path);

            FileImporter.importFile(file.path);
        });

        form.on('end', () => {
            res.json({ end: "end"});
        });

        form.parse(req);
    }
};

export default LayerController

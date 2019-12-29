import * as express from "express"
import { Request, Response } from "express"
import IControllerBase from "../interfaces/IControllerBase.interface"
import { IncomingForm } from "formidable";
import FileImporter from "../framework/fileImporter";
import { Layer } from "../dal/models/layer";

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

    getLayers = async (req: Request, res: Response) => {
        let layers = await Layer.findAll();
        console.log("GET LAYERS", layers);
        res.json(layers);
    }

    postUpload = async (req: Request, res: Response) => {
        var form = new IncomingForm();
        form.keepExtensions = true;

        let newLayer: Layer;

        form.on('file', async (field, file) => {
            newLayer = await FileImporter.importFile(file.path, "New Layer");
            if (newLayer) {
                res.status(201).json(newLayer);
            } else {
                res.status(400).json({ message: "bad request" })
            }
        });

        form.on('end', () => {
        });

        form.parse(req);
    }
};

export default LayerController

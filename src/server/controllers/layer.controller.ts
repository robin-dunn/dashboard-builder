import * as express from "express"
import { Request, Response } from "express"
import IControllerBase from "../interfaces/IControllerBase.interface"
import { IncomingForm } from "formidable";
import FileImporter from "../framework/fileImporter";
import { Layer } from "../dal/models/layer";
import { DAL } from "../dal/dal";

class LayerController implements IControllerBase {
    public routeBase = "/api/layer";
    public router = express.Router({ strict: false });

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/", this.getLayers);
        this.router.get("/geojson/:layerId", this.getLayerGeoJson);
        this.router.post("/", this.postCreateLayer);
        this.router.post("/upload", this.postUploadLayer);
        this.router.post("/pin", this.postPin);
    }

    getLayers = async (req: Request, res: Response) => {
        let layers = await Layer.findAll();
        res.json(layers);
    }

    getLayerGeoJson = async (req: Request, res: Response) => {
        let layerId = req.params.layerId;
        let layerGeoJson = await DAL.getLayerGeoJson(layerId);
        res.json(layerGeoJson);
    }

    postCreateLayer = async (req: Request, res: Response) => {
        let projectId =  parseInt(req.body.projectId);
        let newLayer = await DAL.createLayer("NEW LAYER", projectId, []);
        res.status(201).json(newLayer);
    }

    postUploadLayer = async (req: Request, res: Response) => {
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

    postPin = async (req: Request, res: Response) => {
        res.status(201).json({ lat: 1, lng: 2 });
    }
};

export default LayerController

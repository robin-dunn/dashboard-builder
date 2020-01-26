import * as path from "path";
import { CsvFileImporter } from "./csvFileImporter";
import { GeoJsonFileImporter } from "./geojsonFileImporter";
import { Layer } from "../dal/models/layer";

class FileImporter {

    public static async importFile(filePath:string, newLayerName:string, isSystemLayer:boolean, projectId?: number): Promise<Layer> {
        let fileExtension = path.extname(filePath).replace(/\./g, "").toLowerCase();

        let newLayer: Layer;

        return new Promise<Layer>(async function (resolve, reject) {
            switch (fileExtension) {
                case "csv":
                    newLayer = await CsvFileImporter.importFile(filePath, newLayerName, isSystemLayer, projectId);
                    break;
                case "json":
                case "geojson":
                    newLayer = await GeoJsonFileImporter.importFile(filePath, newLayerName, isSystemLayer, projectId);
                    break;
                default:
                    reject();
                    break;
            };

            resolve(newLayer);
        });
    }
};

export default FileImporter

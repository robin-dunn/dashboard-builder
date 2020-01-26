import * as path from "path";
import { CsvFileImporter } from "./csvFileImporter";
import { GeoJsonFileImporter } from "./geojsonFileImporter";
import { Layer } from "../dal/models/layer";

class FileImporter {

    public static async importFile(
        args: { filePath:string, isSystemLayer: boolean, projectId?: number, layerName?: string }): Promise<Layer> {
        let fileExtension = path.extname(args.filePath).replace(/\./g, "").toLowerCase();

        let newLayer: Layer;

        return new Promise<Layer>(async function (resolve, reject) {
            switch (fileExtension) {
                case "csv":
                    newLayer = await CsvFileImporter.importFile(args.filePath, args.layerName, args.isSystemLayer, args.projectId);
                    break;
                case "json":
                case "geojson":
                    newLayer = await GeoJsonFileImporter.importFile(args.filePath, args.layerName, args.isSystemLayer, args.projectId);
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

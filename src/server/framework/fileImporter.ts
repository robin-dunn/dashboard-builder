import * as path from "path";
import { CsvFileImporter } from "./csvFileImporter";
import { Layer } from "../dal/models/layer";

class FileImporter {

    public static async importFile(filePath:string, newLayerName:string): Promise<Layer> {
        let fileExtension = path.extname(filePath).replace(/\./g, "").toLowerCase();

        let newLayer: Layer;

        return new Promise<Layer>(async function (resolve, reject) {
            switch (fileExtension) {
                case "csv":
                    newLayer = await CsvFileImporter.importFile(filePath, newLayerName);
                    resolve(newLayer);
                    break;
                default:
                    reject();
                    break;
            };
        });
    }
};

export default FileImporter

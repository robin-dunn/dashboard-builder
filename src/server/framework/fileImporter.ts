import * as path from "path";
import { CsvFileImporter } from "./csvFileImporter";

class FileImporter {

    public static importFile(filePath:string, newLayerName:string) {
        let fileExtension = path.extname(filePath).replace(/\./g, "").toLowerCase();

        switch (fileExtension) {
             case "csv":
                CsvFileImporter.importFile(filePath, newLayerName);
                break;
            default:
                break;
        };
    }
};

export default FileImporter

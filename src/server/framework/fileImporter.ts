import * as path from "path";
import * as fs from "fs";
import * as csv from "fast-csv";
import { Layer } from "../dal/models/layer";

class FileImporter {

    public static importFile(filePath:string) {
        let fileExtension = path.extname(filePath).replace(/\./g, "").toLowerCase();

        switch (fileExtension) {
             case "csv":
                this.importCsvFile(filePath);
                break;
            default:
                break;
        };
    }

    public static async importCsvFile(filePath:string) {

        let newLayer = await Layer.create({ name: "NEW LAYER" });

        console.log("Created new layer", newLayer.id, newLayer.name);

        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('data', row => {
                console.log(row);
                // TODO: Use sequalize.query() to insert rows into the specific layer table.
            })
            .on("end", function () {
                console.log("File import complete!")
            })
            .on("error", function (error) {
                console.log(error)
            });
    }
};

export default FileImporter

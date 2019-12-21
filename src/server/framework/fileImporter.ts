import * as path from 'path';
import * as fs from 'fs';
import * as csv from 'fast-csv';

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

    public static importCsvFile(filePath:string) {
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('data', row => {
                console.log(row);
                // TODO: save data to database table.
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

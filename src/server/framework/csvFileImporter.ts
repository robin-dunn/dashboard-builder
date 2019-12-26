import * as fs from "fs";
import * as csv from "fast-csv";
import { DAL } from "../dal/dal";
import { QueryTypes } from 'sequelize';

export class CsvFileImporter {

    public static async importFile(filePath:string) {

        // TODO: handle CSV files with no column headers
        let columnNames = await this.getColumnNamesAsync(filePath);
        let latitudeColumnName = columnNames.find(propName => /latitude/gi.test(propName));
        let longitudeColumnName = columnNames.find(propName => /longitude/gi.test(propName));
        let sqlColumnNames = columnNames.filter(propName => propName !== latitudeColumnName && propName !== longitudeColumnName);
        let batch = [];

        let newLayer = await DAL.createLayer("NEW LAYER", sqlColumnNames);

        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true, trim: true }))
            .on('data', function(row) {
                row[latitudeColumnName] = parseFloat(row[latitudeColumnName]),
                row[longitudeColumnName] = parseFloat(row[longitudeColumnName]),
                batch.push(row);
            })
            .on("end", function () {
                CsvFileImporter.InsertRow(newLayer.id.toString(), batch[0], latitudeColumnName, longitudeColumnName);
                console.log("File import complete!")
            })
            .on("error", function (error) {
                console.log(error)
            });
    }

    static getColumnNamesAsync(filePath:string): Promise<string[]> {

        return new Promise<string[]>(function (resolve, reject) {

            let fileContent = "";
            let lines: string[] = [];
            let readStream = fs.createReadStream(filePath);

            readStream.on("data", function (dataChunk) {
                fileContent += dataChunk;
                lines = fileContent.split("\n").map(line => line.replace(/[\r]/g, ""));

                if (lines.length > 1) {
                    readStream.destroy();
                    let columnNames = lines.slice(0, 1)[0].split(",").map(colName => colName.trim());
                    resolve(columnNames);
                }
            });
        });
    }

    public static InsertRow(layerId:string, rowData, latitudeColumnName, longitudeColumnName) {
        /* NOTE: Creating the SQL string using concatenation is not ideal
        but Sequelize doesn't support dynamic table names yet. */

        let columnNames = Object.getOwnPropertyNames(rowData)
                            .map(colName => colName.trim())
                            .filter(propName => propName !== latitudeColumnName && propName !== longitudeColumnName);

        // The location column is a point created from latitude and longitude.
        let sqlInsert = `INSERT INTO Layer_${layerId} (${columnNames.concat(["location"]).map(colName => `"${colName}"`).join(",")}) `
                         + ` VALUES (${columnNames.map(colName => "?").join(",")},`
                            + ` ST_SetSRID(ST_MakePoint(?, ?), 4326))`;

        let replacements = columnNames.map(colName => rowData[colName])
                                    .concat([ rowData[latitudeColumnName], rowData[longitudeColumnName] ]);

        DAL.sequelize.query(sqlInsert, {
            replacements: replacements,
            type: QueryTypes.INSERT
        });
    }
}

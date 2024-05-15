import csv from 'csv-parser';
import fs from 'fs';
import { calculateBenford } from '../benfordAlgo/benfordFunctions/benfordlaw.js';


export const handleCSV = (req, res, cb) => {
  
  try {
    console.log('HANDLE CSV MIDDLEWARE')
    const results = [];
    let dataSet = [];
    let { columnname, separator } = req.body;

    fs.createReadStream(`backend/uploads/${req.file.filename}`)
        .pipe(csv({ separator }))
        .on('data', (data) => results.push(data))
        .on('end', () => {

          try {

            console.log("FROM HANDLE CSV")
            console.log(columnname)

            console.log("results[0]", results[0])

            if(`${columnname}` in results[0]){
              results.forEach((row, index) => {
                let cell = row[columnname]
                if(cell){
                  // console.log("cell", cell, "index", index)
                  if(cell.length > 0 && typeof Number(cell) === "number" && Number(cell) !== 0){
                    cell = parseFloat(cell.replace(/[^\d\.\-]/g, ""))
                    let cellTable = cell.toString().split("")
                    // console.log("cellTable", cellTable)
                    for(let i = 0 ; i < cellTable.length ; i++){
                      let number = Number(cellTable[i])
                      // console.log(number)
                      if(number >= 1 && number <= 9){
                        dataSet.push(number)
                        break;
                      }
                    }  
                  }
                }

              })

              const benfordizedData = calculateBenford(dataSet)

              cb(benfordizedData, dataSet, results, columnname, separator)

            } else {
              res.json({result: false, error: "Une erreur est survenue avec le fichier et la colonne indiquée"})
            }

          } catch (csvError1) {
            console.log("csvError1", csvError1)
            res.json({result: false, error: "Une erreur est survenue avec le fichier et la colonne indiquée"})
          }

        })

  } catch (csvError2) {
    console.log("csvError2", csvError2)
    res.json({result: false, error: "Une erreur est survenue avec le fichier et la colonne indiquée"})
  }
}
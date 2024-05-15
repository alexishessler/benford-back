import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { upload } from '../middlewares/uploadFileMiddleware.js';
import { handleCSV } from '../fileTypeFunctions/handleCSV.js';


// @desc     Upload a file
// @ruote    POST /api/upload-file
// @access   Public
const uploadFileController = asyncHandler(async (req, res) => {
 
    try {

        console.log('ROUTE uploadFileController')

        console.log('req.file', req.file)

        upload(req, res, err => {
            console.log("IM ERROR HERE 1 --> ", err)
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                console.log("IM ERROR HERE 2 INSTEAD --> ", err)
                return res.status(500).json(err)
            }

            if(req.file.mimetype === "text/csv"){
                handleCSV(req, res, (benfordizedData, dataSet, results, columnname, separator) => {
                    console.log("dataSet from uploadFileController", dataSet)
                    console.log("dataSet.length from uploadFileController", dataSet.length)
                    console.log("results.length from uploadFileController", results.length)
                    console.log('FROM UPLOAD FILE CONTROLLER')
                    console.log("benfordizedData from controller", benfordizedData)
                    return res.status(200).json({
                        result: true,
                        file: req.file,
                        dataSet,
                        benfordizedData,
                        keys: Object.keys(results[0]),
                        columnname, 
                        separator,
                        numberOfInitalResults: results.length
                    })
                })
            } 

            // handle xlsx

            // handle xls



        })


    } catch (err) {
        res.status(400)
        throw new Error(err)
        return;
    }
    
})


export {
    uploadFileController
}
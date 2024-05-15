import asyncHandler from 'express-async-handler';

// @desc     Test the API
// @ruote    GET /api/test
// @access   Public
const testController = asyncHandler(async (req, res) => {
 
    try {

        console.log('ROUTE testController')

        res.json({result: true, data: "API is running"})

    } catch (err) {
        res.status(400)
        throw new Error(err)
        return;
    }
    
})


export {
    testController
}
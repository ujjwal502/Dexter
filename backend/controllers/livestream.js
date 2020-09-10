const { errorHandler } = require('../helpers/dbErrorHandler');
const Stream=require('../models/livestream')



exports.addstreamdetails = async (req, res) => {
       try {
        const stream = await new Stream(req.body);
        console.log(req.body);
    
        await stream.save((err, stream) => {
            if (err) {
             return res.status(400).json({ err });
                     return res.status(400).json({
                        error: 'enter all fields'
                     });
                 }
                 res.status(200).json({ stream });
             });
         } catch (err) {
             console.error(err.message);
         }
     };



exports.getallstreams=async(req,res)=>{
    Stream.find().exec((err,streamdetails)=>{
        if (err) {
            return res.status(400).json({
                error: 'no streams'
            });
        }
        else{
        res.json({streamdetails});
        }
    })
}
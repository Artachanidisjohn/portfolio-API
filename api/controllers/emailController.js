
const emailService = require('../services/emailService');


async function sendEmailController(req,res,next){
 
    try{

        const result = emailService.sendEmail(req.body)

        res.status(200).json({message:'this is the result the emai sent',result})

    }
    catch(error){
        next(error);
    }

}


module.exports={
    sendEmailController
}
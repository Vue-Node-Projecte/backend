const crypto = require('crypto')
const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {userService} = require('../service')
module.exports={
    registration:async(req,res)=>{
        const {name, type, organizationId,email,password} = req.body;
        if(!name || !type || !organizationId || !email ||!password){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            const alreadyEmail = await userService.emailCheck(email)
            if(alreadyEmail != null){
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.ALREADY_ID))
            }
            const affiliation = await userService.createUser(name,type,organizationId,email,password)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SIGN_UP_SUCCESS,affiliation))
        }catch(err){
            console.log(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.SIGN_UP_FAIL))
        }
    },
    login:async(req,res)=>{
        const {email, password} = req.body;
        try{
            if(!email || !password){
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
            }
            console.log('email : ',email)
            const user = await userService.emailCheck(email)
            console.log(user)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SIGN_IN_SUCCESS,user))
        }catch(error){
            console.log(error)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.INTERNAL_SERVER_ERROR))
        }   
    }
}
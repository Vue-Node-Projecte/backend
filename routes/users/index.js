const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const {Users,Organizations}= require('../../models')

router.get('/login',async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        console.log('로그인에 필요한 값이 없습니다.')
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
    }

    //email,password 확인 없다면 err
    try{
        
    }catch(error){

    }
})

router.post('/register',async(req,res)=>{

})

module.exports= router;
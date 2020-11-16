const {Users,Organizations,Affiliations} = require('../models')

module.exports={
    emailCheck:async(email)=>{
        try{
            const alreadyEmail = await Users.findOne({
                where:{
                    email:email
                },
            })
            console.log('alreadyEmail : ',alreadyEmail)
            return alreadyEmail
        }catch(err){
            throw err
        }
    },
    createUser:async(name, type, organizationId ,email,password)=>{
        try{
            const user = await Users.create({name,type,email,password})
            const organization = await Organizations.findOne({where:{id:organizationId}})
            const affiliation = await Affiliations.create({UserId:user.dataValues.id,OrganizationId:organization.dataValues.id})
            return affiliation
        }catch(err){
            throw err
        }
    }
}
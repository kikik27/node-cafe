/** load express library */
const express = require(`express`)

/** load md5 library */ 
const md5 = require(`md5`)

/** load library jsonwebtoken */
const jwt = require(`jsonwebtoken`)

/** load model of admin */
const userModel = require(`../models/index`).user

/** create function to handle authenticating process */ 
const authenticate = async (request, response) => {
let dataLogin = {
username: request.body.username, 
password: md5(request.body.password)
}

/** check data username and password on admin's table */ 
let dataUser = await userModel.findOne({ where: dataLogin
})

/** if data admin exists */ 
if(dataUser){
/** set payload for generate token.
*	payload is must be string.
*	dataAdmin is object, so we must convert to string.
*/
let payload = JSON.stringify(dataUser)

/** define secret key as signature */ 
let secret = `mokleters`

/** generate token */
let token = jwt.sign(payload, secret)

/** define response */ 
return response.json({ success: true, logged: true,
message: `Authentication Successed`, token: token,
data: dataUser
})
}

/** if data admin is not exists */ 
return response.json({
success: false, 
logged: false,
message: `Authentication Failed. Invalid username or password`
})
}

/** export function to another file */ 
module.exports = { authenticate }



const authorize = (request, response, next) => {
    /** get "Authorization" value from request's header */ let headers = request.headers.authorization
    let tokenKey = headers && headers.split(" ")[1]

/** check nullable token */ if (tokenKey == null) {
return response.json({ success: false,
message: `Unauthorized User`
})
}

/** define secret Key (equals with secret key in authentication function) */
let secret = `mokleters`

/** verify token using jwt */ jwt.verify(tokenKey, secret, (error, user) => {
/** check if there is error */ if (error) {
return response.json({ success: false, message: `Invalid token`
})
}
})

/** if there is no problem, go on to controller */ next()
}
/** export function to another file */ 
module.exports = { authenticate, authorize }
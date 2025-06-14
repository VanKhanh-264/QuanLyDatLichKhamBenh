import { where } from 'sequelize'
import db from '../models/index'
import bcrypt from 'bcryptjs'
import { raw } from 'body-parser'
// import { useState } from 'react'


let handleUserLogin = (email, password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);

            if(isExist){
                //user is already exist    
                let user =await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email: email},
                    raw: true
                })
                //compare password
                if(user){
                    let check =await bcrypt.compareSync(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'OKE';
                        delete user.password;
                        userData.user = user
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`
                }
            }else{
                //return error  
                userData.errCode = 1;
                userData.errMessage = `Your's email is not exist in your system. Please try orther email!`;
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {
            
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where:{email: userEmail}
            })
            if(user) {
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    
}
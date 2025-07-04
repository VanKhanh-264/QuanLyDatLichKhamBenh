
import { where } from 'sequelize';
import db from '../models/index'
import bcrypt from 'bcryptjs'
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }

    })
}

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

let getAllUsers = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = '';
            if(userId === 'ALL'){
                users = db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            } else if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}
let createNewUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already exist, please try an other email'
                })
            }else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender:data.gender === '1' ? true : false,
                roleId: data.roleId
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise( async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: {id : userId}
        })

        if(!foundUser){
            resolve({
                errCode: 2,
                errMessage: `user isn't exist`
            })
        }

        await db.User.destroy({
            where: {id: userId}
        });
        
        resolve({
            errCode: 0,
            message: "user is deleted!"
        })
        
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }

            let user = await db.User.findOne({
                where : { id : data.id },
                raw: false
            })
            
            if(user){
                user.firstName= data.firstName,
                user.lastName= data.lastName,
                user.address= data.address

                await user.save(); 
                             
                resolve({
                    errCode: 0,
                    message: "Update user succeed!"
                });
            } else{
                resolve({
                    errCode: 1,
                    errMessage: "User's not found!"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,

}
const Customer = require("../models/customer.model");
const Restaurant = require("../models/restaurant.model");
const Deliveryman = require("../models/deliveryman.model");
const Salesperson = require("../models/salesperson.model");
const Developer = require("../models/developer.model");
const Sponsorship = require("../models/sponsorship.model");
const Log = require("../models/log.model");
const Thirdparty = require("../models/thirdparty.model");

exports.createUser = async (body, typeOfUser, sponsor) => {
    let userData
    switch (parseInt(typeOfUser)){
        case 1:
            userData = await Customer.createCustomer(body)
            break;
        case 2:
            userData = await Restaurant.createRestaurant(body)
            break;
        case 3:
            userData = await Deliveryman.createDeliveryman(body)
            break;
        case 4:
            userData = await Salesperson.createSalesperson(body)
            break;
        case 5:
            userData = await Developer.createDeveloper(body)
            break;
        case 6:
            userData = await Thirdparty.createThirdparty(body)
            break;
    }
    if(sponsor !== null){
        await sponsorUser(sponsor, userData.id, typeOfUser)
    }

    return userData
}

exports.updateUser = async (body, typeOfUser, uid) => {
    let updatedUser
    switch (parseInt(typeOfUser)){
        case 1:
            updatedUser = await Customer.updateCustomer(body,uid)
            break;
        case 2:
            updatedUser = await Restaurant.updateRestaurant(body,uid)
            break;
        case 3:
            updatedUser = await Deliveryman.updateDeliveryman(body,uid)
            break;
        case 4:
            updatedUser = await Salesperson.updateSalesperson(body,uid)
            break;
        case 5:
            updatedUser = await Developer.updateDeveloper(body,uid)
            break;
    }
    return updatedUser
}

exports.deleteUser = (uid, typeOfUser) => {
    switch (parseInt(typeOfUser)){
        case 1:
            Customer.deleteCustomer(uid)
            break;
        case 2:
            Restaurant.deleteRestaurant(uid)
            break;
        case 3:
            Deliveryman.deleteDeliveryman(uid)
            break;
        case 4:
            Salesperson.deleteSalesperson(uid)
            break;
        case 5:
            Developer.deleteDeveloper(uid)
            break;
    }
} 

exports.getAllLog = async () => {
    let response = await Log.getAllLog()
    return response
}

exports.deleteLog = async (lid) => {
    let response = await Log.deleteLog(lid)
    return response
}

exports.getUser = async (uid, typeOfUser) => {
    let userData
    switch (parseInt(typeOfUser)){
        case 1:
            userData = await Customer.getCustomer(uid)
            break;
        case 2:
            userData = await Restaurant.getRestaurant(uid)
            break;
        case 3:
            userData = await Deliveryman.getDeliveryman(uid)
            break;
        case 4:
            userData = await Salesperson.getSalesperson(uid)
            break;
        case 5:
            userData = await Developer.getDeveloper(uid)
            break;
    }
    return userData[0].dataValues
}

exports.getUserbyEmail = async (email, typeOfUser) => {
    let userData
    switch (parseInt(typeOfUser)){
        case 1:
            userData = await Customer.getCustomerbyEmail(email)
            break;
        case 2:
            userData = await Restaurant.getRestaurantbyEmail(email)
            break;
        case 3:
            userData = await Deliveryman.getDeliverymanbyEmail(email)
            break;
    }
    return userData
}

exports.getAllUserByType = async (typeOfUser) => {
    let usersData
    switch (parseInt(typeOfUser)){
        case 1:
            usersData = await Customer.getAllCustomer()
            break;
        case 2:
            usersData = await Restaurant.getAllRestaurant()
            break;
        case 3:
            usersData = await Deliveryman.getAllDeliveryman()
            break;
        case 4:
            usersData = await Salesperson.getAllSalesperson()
            break;
        case 5:
            usersData = await Developer.getAllDeveloper()
            break;
    }

    return usersData
}

exports.getAllUser = async () => {
    let usersData = []
    let temp

    temp = await Customer.getAllCustomer()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Restaurant.getAllRestaurant()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Deliveryman.getAllDeliveryman()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Salesperson.getAllSalesperson()
    temp.forEach(elem => {
        usersData.push(elem)
    })
    temp = await Developer.getAllDeveloper()
    temp.forEach(elem => {
        usersData.push(elem)
    })

    return usersData
}

exports.createThirdPartyUser = async () => {

}

 async function sponsorUser(sponsor, sponsored, role){
    let data = {
        sponsor: sponsor,
        sponsored: sponsored,
        status: role
    }
    return response = await Sponsorship.createSponsorship(data)
}

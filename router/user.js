const express = require('express')
const router = express.Router()
const UserController = require("../controller/user.controller")
const RoleController = require('../controller/role.controller')

router.get('/stat', function (req, res)
{
        UserController.getStats(req.params.id).then( (data) => {
            res.json(data)
        })
})

router.get('/log', function (req, res)
{
    UserController.getAllLog().then( (logData) => {
        res.json(logData)
    })
})

router.get('/', function (req, res)
{
    UserController.getAllUser().then( (userData) => {
        res.json(userData)
    })
})

router.get('/:type', function (req, res)
{
    UserController.getAllUserByType(req.params.type).then( (usersData) => {
        res.json(usersData)
    })
})

router.get('/:type/:id', function (req, res)
{
    UserController.getUser(req.params.id, req.params.type).then( (userData) => {
        res.json(userData)
    })
})

router.get('/email/:type/:email', function (req, res)
{
    UserController.getUserbyEmail(req.params.email, req.params.type).then( (userData) => {
        res.json(userData)
    })
})

router.post('/create/:type', function (req, res)
{
    UserController.createUser(req.body, req.params.type, null).then( (user) => {
        res.status(201).json(user)
    })
})

router.post('/create/:type/:sponsor', function (req, res)
{
    UserController.createUser(req.body, req.params.type, req.params.sponsor).then( (user) => {
        res.status(201).json(user)
    })
})

router.put('/:type/:id', function (req, res)
{
    UserController.updateUser(req.body, req.params.type ,req.params.id).then( (user) => {
        res.status(200).json(user)
    })
})

router.delete('/log/:id', function (req, res)
{
    if(req.body.roleToken === 5){
        UserController.deleteLog(req.params.id)
        res.status(200).send('you deleted a log')
    }
    else{
        res.status(403).send('Unauthorized call')
    }
})

router.delete('/:type/:id', function (req, res)
{
    if(req.body.roleToken === 5 || req.body.roleToken === 1) {
        UserController.deleteUser(req.params.id, req.params.type)
        res.status(200).send('you deleted a user')
    }
    else{
        res.status(403).send('Unauthorized call')
    }
})



module.exports = router;
const express = require('express')
const router = new express.Router()
const userController = require('../controller/users.controller')
const opController = require('../controller/operation.controller')

//user routes
router.get('', userController.register)
router.post('', userController.registerPost)
router.get('/login', userController.login)
router.post('/login', userController.loginPost)
router.get('/ShowAllUserAccount', userController.ShowAllUserAccount)
router.get('/single/:id', userController.showSingleAccount)
router.get('/edit/:id', userController.editUserAccount)
router.post('/edit/:id', userController.editAccountData)
router.get('/delete/:id', userController.deleteUserAccount)


//operation routes



router.get('*', (req,res)=>{res.send('404')})

module.exports = router
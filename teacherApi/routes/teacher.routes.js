const express = require('express')
const router = new express.Router()

const teacherModel = require('../models/teacher.model')

router.post('/add', (req, res) => {
    let me = new teacherModel(req.body)
    me.save().then(
        () => res.send('done')
    )
        .catch((e) => res.send(e.message))
})
router.post('/register', async (req, res) => {
    try {
        me = new teacherModel(req.body)
        await me.save()
        res.send('inserted')
    }
    catch (e) {
        res.send(e.message)
    }
})
router.get('/all', async (req, res) => {
    try {
        const data = await teacherModel.find()
        res.send(data)
    }
    catch (e) {
        res.send(e.message)
    }
})
router.get('/all/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const data = await teacherModel.findById(_id)
        if (!data) res.send('not found')
        res.send(data)
    }
    catch (e) {
        res.send(e.message)
    }
})
router.delete('/all/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const data = await teacherModel.findByIdAndDelete(_id)
        if (!data) res.send('user not found')
        res.send('deleted')
    }
    catch (e) {
        res.send(e.message)
    }
})
router.post("/edit/:id", async (req, res) => {
    let newData = req.body;
    const _id = req.params.id
    try {
             await teacherModel.findByIdAndUpdate( _id, 
             { name: newData.name, salary: newData.salary ,gender:newData.gender },(e,result)=>{
                if(e)  res.send('teacher not found')
                else   res.send('updated');
             });     
} catch (e) {
        res.send(e.message)
    }
});
module.exports = router
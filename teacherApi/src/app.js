const express= require('express')
require('../db/db')
const teacherRoutes =  require('../routes/teacher.routes')
const app = express()
app.use(express.json())
app.use(teacherRoutes)
module.exports=app
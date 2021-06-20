const mongoose = require('mongoose')
const validator = require('validator')

const Teacher = mongoose.model('Teacher', {
    name:{
        type:String,
        trim:true,
        lowercase:true,
        unique:[true, 'used before'],
        required:[true, 'name is required']
    },
    salary:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    gender:{
        type:String,
        trim:true,
        enum:['male', 'female']
    },
    status:{
        type:Boolean,
        default:false
    },
    class:[
        {
            subject:{ type:String}
        }
    ]
})
module.exports=Teacher
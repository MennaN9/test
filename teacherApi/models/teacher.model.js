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
        max:[5000,'max salary must be 5000'],
        validate(value){
            if(value<0) throw new Error('salary must be positive number')
        }
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
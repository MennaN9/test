const dbConnection = require('../db/db')
const { ObjectID } = require('mongodb')

addNewOpView = (req, res)=>{
    res.render('operations/addOp')
}
addNewOpPOST = (req,res)=>{
    data = req.body
    dbConnection(db => {
        if(!db) return console.log('database error')
        db.collection('user').insertOne(data, (e, result)=>{
            if(e) console.log(e)
            else console.log(result)
        })
    })
    res.redirect('/')
}

//edit todo's title or status
// app.patch('/api/todos/:userId/:todoId', (req, res) => {
//     const user = db.get('users').find({ id: req.params.userId }).value();
//     if (user && user["loggedIn"]) {
//         const todo = db.get('users').find({ id: req.params.userId })
//             .get('todos').find({ id: req.params.todoId }).value();
//         if (todo) {
//             const { title, status, ...x } = req.body;
//             if (Object.keys(x).length > 0) {
//                 res.send("invalid attributs");
//                 res.statusCode = 442;
//                 return;
//             }
//             if (title) {
//                 db.get('users').find({ id: req.params.userId })
//                     .get('todos')
//                     .find({ id: req.params.todoId })
//                     .assign({ title: title })
//                     .write()
//             }
//             if (status) {
//                 db.get('users').find({ id: req.params.userId })
//                     .get('todos')
//                     .find({ id: req.params.todoId })
//                     .assign({ status: status })
//                     .write()
//             }
//             res.send("Todo updated succussfully");
//             res.statusCode = 200;
//         } else {
//             res.send("Todo not existed");
//             res.statusCode = 404;
//             return;
//         }
//     } else {
//         res.send("user not exsit");
//         res.statusCode = 404;
//     }
// });
const showAllOp = (req, res)=>{
    allTasks = taskHelper.readData()
    data = {
        pageTitle: 'all Tasks',
        tasks: allTasks,
        tasksLen: (allTasks.length==0?true:false)
    }
    res.render('all', data)
}

const showSingleOp = (req, res)=>{
    let data = {
        pageTitle: 'single Task',
        status: true
    }
    const id = req.params.id
    const allTasks = taskHelper.readData()
    let record = allTasks.find(task=> task.id == id )
    if(!record) data.status=false
    else data.myData=record
    res.render('single', data)
}
const deleteOp = (req, res)=>{
    const id = req.params.id
    const allTasks = taskHelper.readData()
    let record = allTasks.findIndex(task=> task.id == id )
    if(record!=-1) {
        allTasks.splice(record,1)
        taskHelper.writeData(allTasks)
    }

    res.redirect('/')
}
editOp= (req,res) => {
    let id = req.params.id;
    dbConnection((db) => {
      db.collection("user").findOne({ _id: new ObjectID(id) }, (err, user) => {
        res.render("users/edit", user);
      });
    });
  };
  editOpData= (req, res) => {
    let id = req.params.id;
    let newData = req.body;
    dbConnection((db) => {
      db.collection("user")
        .updateOne(
          { _id: new ObjectID(id) },
          { $set: { name: newData.name, password: newData.password } }
        )
        .then((user) => {
          res.redirect("/ShowAllUserAccount");
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
module.exports={ addTask, editTask, showAll, showSingle, deleteTask }
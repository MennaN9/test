const dbConnection = require('../db/db')
const { ObjectID } = require('mongodb')

//register view form
register = (req, res) => {
    res.render('users/register')
}
//register 
registerPost = (req, res) => {
    data = req.body
    dbConnection(db => {
        if (!db) return console.log('database error')
        db.collection('user').insertOne(data, (e, result) => {
        })
    })
    res.redirect('/login')
}

login = (req, res) => {
    res.render('users/login')
}
// loginPost = (req,res)=>{
//     if(req.session.page_views && req.session.user){
//         req.session.page_views++;
//         res.redirect('/myAccount')
//      } else {
//         req.session.page_views = 1;
//         res.redirect('/register')
// }
loginPost = (req, res) => {
    data = req.body
    dbConnection(db => {
        if (!db) return console.log('dataBase Login Error')
        db.collection('user').findOne({ name: data.name, password: data.password }, (error, result) => {
            if (result == null) {
                res.send("Invalid Data")
            } else {
                res.redirect("/ShowAllUserAccount")
            }
        })
    })
}
 ShowAllUserAccount = (req, res) => {
    dbConnection(db => {
        if (!db) return console.log('dataBase Show Error')

        db.collection('user').find().toArray((err, result) => {
            if (err) console.log(err)
            res.render('users/myAccount', data = { user: result })
        })
    })
}
showSingleAccount = (req, res) => {
    let id = req.params.id;
    dbConnection((db) => {
      db.collection("user").findOne({ _id: new ObjectID(id) }, (err, user) => {
        res.render("users/single", { user });
      });
    });
  };
  
  deleteUserAccount = (req, res) => {
    let id = req.params.id;
    dbConnection((db) => {
      db.collection("user")
        .deleteOne({ _id: new ObjectID(id) })
        .then((data) => {
          res.redirect("/ShowAllUserAccount");
        })
        .catch((e) => {});
    });
  };
  
  editUserAccount= (req,res) => {
    let id = req.params.id;
    dbConnection((db) => {
      db.collection("user").findOne({ _id: new ObjectID(id) }, (err, user) => {
        res.render("users/edit", user);
      });
    });
  };
  editAccountData= (req, res) => {
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
module.exports = {
    register,
    registerPost,
    loginPost,
    login,
    ShowAllUserAccount,
    showSingleAccount,
    deleteUserAccount,
    editUserAccount,
    editAccountData
}
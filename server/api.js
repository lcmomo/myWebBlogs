const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => {}


// router.post('/user/login', (req, res) => {
//   const {name, passwd} = req.body
//   console.log(req.body)
//   db.User.findOne({name}, 'pwd', (err, doc) => {
//     switch (true) {
//       case !!err:
//         console.log(err)
//         break
//       case !doc:
//         res.send({state: 0, msg: '账号不存在'})
//         break
//       case doc.passwd === passwd:
//         res.send({state: 1, msg: '登陆成功'})
//         break
//       case doc.passwd !== passwd:
//         res.send({state: 2, msg: '密码错误'})
//         break
//       default :
//         res.send({state: 3, msg: '未知错误'})
//     }
//   })
// })


router.post('/user/check',(req,res)=>{
    let {username}=req.body;
    console.log(username)
    db.User.findOne({username},(err,doc)=>{
        console.log(doc);
        if(!doc){
            res.send({msg:'success'})
        }else{
            res.send({msg:'用户名已存在'})
        }
    })
})
router.post('/user/setup',(req,res)=>{
    let user=req.body;
    console.log(user)
    new db.User(req.body).save((err,doc)=>{
        if(err){
            res.send({state:0,msg:"创建失败"})
        }
        res.send({state:1,msg:'创建成功，登陆中',data:user})
    });
    
    
})


module.exports = router
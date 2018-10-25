const fs=require('fs')
const path=require('path')
const express=require('express')
const favicon=require('serve-favicon')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const resolve=file=>path.resolve(__dirname,file)
const db=require('./db')

const api = require('./api')
const app=express()

app.set('port',(process.env.port||3000))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(api)


// app.listen(app.get('port'), function () {
//   console.log('Visit http://localhost:' + app.get('port'))
// })



   // var doc1= new db.User({"name":'llc','passwd':'1234'})
   // console.log(doc1.passwd);
   // doc1.save((err,doc)=>{
   //  if(err){
   //      console.log(err);
   //  }else{
   //      console.log("insert finish");
   //  }

   //})
// app.get('*',(req,res)=>{
//     res.send('2334');
// })

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,\'Origin\',Accept,X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('X-Powered-By', ' 3.2.1');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });

app.post('/user/login', (req, res) => {
 
  const {username, passwd} = req.body
  db.User.findOne({username}, 'passwd', (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:{
        //new db.User(req.body).save();
        res.send({state: 0, msg: '用户名不存在,，请注册'})
         break;
        }
        
       
      case doc.passwd === passwd:
        res.send({state: 1, msg: '登陆成功',data:req.body})
        break
      case doc.passwd !== passwd:
        res.send({state: 2, msg: '密码错误'})
        break
      default :
        res.send({state: 3, msg: '未知错误'})
    }
  })
})


app.listen(app.get('port'),()=>{
    console.log('Visit http://localhost:' + app.get('port'))
})
   


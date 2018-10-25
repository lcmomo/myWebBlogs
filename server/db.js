const mongoose = require('mongoose')
const init=require('./init.json')
const Schema=mongoose.Schema

const userSchema=new Schema({
    username:String,
    passwd:String,
    istrust:Boolean
})

const dailySchema=new Schema({
    dailyTitle:String,
    dailyBody:String,
    dailyTime:Date,
    dailyLike:{
        count:Number,
        userList:[{username:String}]
    },
    dailyComment:{
        count:Number,
         userList:[{username:String,content:String,commentTime:Date
        }]
    }
})

const moodSchema=new Schema({
    moodTitle:String,
    moodBody:String,
    moodTime:Date,
    moodLike:{
        count:Number,
        userList:[{username:String}]
    },
    moodComment:{
        count:Number,

        userList:[{username:String,content:String,commentTime:Date
            
        }]
    }
})

const leavewordsSchema=new Schema({ 
    username:String,
    content:String,
    leavewordsTime:Date,
    replay:[{
        username:String,
        content:String,
        replayTime:Date
    }]
})


const booksSchema=new Schema({
    bookName:String,
    author:String,
    discript:String,
    bookUrl:String,
    bookImgUrl:String,
})

const musicSchema=new Schema({
    musicName:String,
    singerName:String,
    discript:String,
    musicUrl:String,
    musicImgUrl:String,
})




const Models={
    User:mongoose.model('User',userSchema),
    Daily:mongoose.model('Daily',dailySchema),
    Mood:mongoose.model('Mood',moodSchema),
    Leavewords:mongoose.model('Leavewords',leavewordsSchema),
    Book:mongoose.model("Book",booksSchema),
    Music:mongoose.model("Music",musicSchema),
    initialized: false
}

const initialize=function(){
    Models.Daily.find({username:'l'},(err,doc)=>{
        if(err){
            console.log(err);
        }else if(!doc.length){
            console.log("Database opens for the first time...");
            Promise.all(init.map(item=>new Models[item.type](item).save()))
            .then(()=>console.log('initialize successfully'))
            .catch(() => console.log('Something went wrong during initializing.'))
        }else {
            Models.initialized = true
            console.log("in");
            }
    })
}
mongoose.connect('mongodb://127.0.0.1/CMS2')
const db=mongoose.connection

db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
 // initialize();
  
})


module.exports = Models
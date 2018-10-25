一、mongoose操作mongodb:
步骤:
1. 引入mongoose 模块
    const mongoose = require('mongoose')
2. 连接数据库
    mongoose.connect('mongodb://127.0.0.1/CMS2',(err)=>{})

    mongoose.connect("mongodb://u1:123456@localhost/db1", function(err){})
3. 定义 Schema：
    var Schema = mongoose.Schema;
    var mySchema = new Schema({
      title:  String,
      author: String,
      body:   String,
      comments: [{ body: String, date: Date }],
      date: { type: Date, default: Date.now },
      hidden: Boolean,
      meta: {
        votes: Number,
        favs:  Number
      }
    });

    mySchema.add({key:value});//添加字段

    设置时间戳：
            var UserSchema = new Schema(
          {...},
          { timestamps: true }
        );

4.创建Model：
    var MyModel = mongoose.model('MyModel', mySchema);


            一定要将model()方法的第一个参数和其返回值设置为相同的值，否则会出现不可预知的结果

        　　Mongoose会将集合名称设置为模型名称的小写版。如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变；如果模型名称为"MyModel"，则集合名称为"mymodels"；如果模型名称为"Model1"，则集合名称为"model1"
5.实例化文档对象：
     var doc1 = new MyModel({ size: 'small' });
6.文档保存：
         doc1.save(function (err,doc) {
                //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
                  console.log(doc);
                })

7.文档新增：

     var schema = new mongoose.Schema({ age:Number, name: String});        
            var temp = mongoose.model('temp', schema);
            //使用链式写法    
            new temp({age:10,name:'save'}).save(function(err,doc){
                //[ { _id: 59720bc0d2b1125cbcd60b3f, age: 10, name: 'save', __v: 0 } ]
                console.log(doc);        
            }); 

    （2）Model.create(doc(s), [callback])：

        var schema = new mongoose.Schema({ age:Number, name: String});        
        var temp = mongoose.model('temp', schema);   
        temp.create({name:"xiaowang"},{name:"xiaoli"},function(err,doc1,doc2){
            //{ __v: 0, name: 'xiaowang', _id: 59720d83ad8a953f5cd04664 }
            console.log(doc1); 
            //{ __v: 0, name: 'xiaoli', _id: 59720d83ad8a953f5cd04665 }
            console.log(doc2); 
        });  

    （3）Model.insertMany(doc(s), [options], [callback])：
        var schema = new mongoose.Schema({ age:Number, name: String});        
            var temp = mongoose.model('temp', schema);   
            temp.insertMany([{name:"a"},{name:"b"}],function(err,docs){
                //[ { __v: 0, name: 'a', _id: 59720ea1bbf5792af824b30c },
                //{ __v: 0, name: 'b', _id: 59720ea1bbf5792af824b30d } ]
                console.log(docs); 
            });                    

8.文档查询：
    find()
    findById()
    findOne()

    (1)Model.find(conditions, [projection], [options], [callback])
    第一个参数表示查询条件，第二个参数用于控制返回的字段，第三个参数用于配置查询参数，第四个参数是回调函数，回调函数的形式为function(err,docs){}
        
        temp.find(function(err,docs){
            //[ { _id: 5971f93be6f98ec60e3dc86c, name: 'huochai', age: 27 },
            //{ _id: 5971f93be6f98ec60e3dc86d, name: 'wang', age: 18 },
            //{ _id: 5971f93be6f98ec60e3dc86e, name: 'huo', age: 30 },
            //{ _id: 5971f93be6f98ec60e3dc86f, name: 'li', age: 12 } ]
            console.log(docs);
        })

    (2)Model.findById(id, [projection], [options], [callback]):

    只输出name字段
        temp.findById(aIDArr[0],{name:1,_id:0},function(err,doc){
                //{  name: 'huochai'}
                console.log(doc);
            })            
        　　或者写成下面这种形式

            temp.findById(aIDArr[0],{name:1,_id:0}).exec(function(err,doc){
                //{  name: 'huochai'}
                console.log(doc);
            })


            输出最少的字段

            temp.findById(aIDArr[0],{lean:true},function(err,doc){
                //{ _id: 5971f93be6f98ec60e3dc86c }
                console.log(doc);
            })   
            temp.findById(aIDArr[0],{lean:true}).exec(function(err,doc){
                //{ _id: 5971f93be6f98ec60e3dc86c }
                console.log(doc);
            }) 

        (3)  Model.findOne([conditions], [projection], [options], [callback]):
        该方法返回查找到的所有实例的第一个:
        找出age>20的文档中的第一个文档，且输出包含name字段在内的最短字段

            复制代码
            temp.findOne({age:{$gt : 20}},"name",{lean:true},function(err,doc){
                //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai' }
                console.log(doc);
            })   
            temp.findOne({age:{$gt : 20}},"name").lean().exec(function(err,doc){
                //{ _id: 5971f93be6f98ec60e3dc86c, name: 'huochai' }
                console.log(doc);
            }) 


            常用的查询条件 


        $or　　　　或关系
        $nor　　　 或关系取反
        $gt　　　　大于
        $gte　　　 大于等于
        $lt　　　　小于
        $lte　　　 小于等于
        $ne　　　　不等于
        $in　　　　在多个值范围内
        $nin　　　 不在多个值范围内
        $all　　　 匹配数组中多个值
        $regex　　 正则，用于模糊查询
        $size　　　匹配数组大小
        $maxDistance　范围查询，距离（基于LBS）
        $mod　　　　取模运算
        $near　　　 邻域查询，查询附近的位置（基于LBS）
        $exists　　 字段是否存在
        $elemMatch　匹配内数组内的元素
        $within　　　范围查询（基于LBS）
        $box　　　　 范围查询，矩形范围（基于LBS）
        $center　　　范围醒询，圆形范围（基于LBS）
        $centerSphere　范围查询，球形范围（基于LBS）
        $slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素 

        （4）【$where】它可以使用任意的JavaScript作为查询的一部分，包含JavaScript表达式的字符串或者JavaScript函数：

        　使用字符串

        temp.find({$where:"this.x == this.y"},function(err,docs){
            //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
            //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
            console.log(docs);
        }) 

        　使用函数


            temp.find({$where:function(){
                    return obj.x !== obj.y;
                }},function(err,docs){
                //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
                //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 } ]
                console.log(docs);
            }) 


9.文档更新：
            (1)update()
                updateMany()
                find() + save()
                updateOne()
                findOne() + save()
                findByIdAndUpdate()
                fingOneAndUpdate()

        (2)Model.update(conditions, doc, [options], [callback])
        第一个参数conditions为查询条件，第二个参数doc为需要修改的数据，第三个参数options为控制选项，第四个参数是回调函数

        options有如下选项


       safe (boolean)： 默认为true。安全模式。
    　　upsert (boolean)： 默认为false。如果不存在则创建新记录。
    　　multi (boolean)： 默认为false。是否更新多个查询记录。
    　　runValidators： 如果值为true，执行Validation验证。
    　　setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
    　　strict (boolean)： 以strict模式进行更新。
    　　overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。

        如果设置options里的upsert参数为true，若没有符合查询条件的文档，mongo将会综合第一第二个参数向集合插入一个新的文档

        temp.update({age:100},{name: "hundred"},{upsert:true},function(err,raw){
            //{ n: 1, nModified: 0,upserted: [ { index: 0, _id: 5972c202d46b621fca7fc8c7 } ], ok: 1 }
            console.log(raw);
        })

        　[注意]update()方法中的回调函数不能省略，否则数据不会被更新。如果回调函数里并没有什么有用的信息，则可以使用exec()简化代码

            temp.update({name:/aa/},{age: 0},{upsert:true}).exec();

    (3)Model.updateMany(conditions, doc, [options], [callback]):
        updateMany()与update()方法唯一的区别就是默认更新多个文档，即使设置{multi:false}也无法只更新第一个文档

    (4)如果需要更新的操作比较复杂，可以使用find()+save()方法来处理，比如找到年龄小于30岁的数据，名字后面添加'30'字符:
        temp.find({age:{$lt:20}},function(err,docs){
        //[ { _id: 5971f93be6f98ec60e3dc86d, name: 'wang', age: 10 },
        //{ _id: 5971f93be6f98ec60e3dc86f, name: 'li', age: 12 }]
        console.log(docs);
        docs.forEach(function(item,index,arr){
            item.name += '30';
            item.save();
        })
        //[ { _id: 5971f93be6f98ec60e3dc86d, name: 'wang30', age: 10 },
        // { _id: 5971f93be6f98ec60e3dc86f, name: 'li30', age: 12 }]
        console.log(docs);
        });

    (5)updateOne()方法只能更新找到的第一条数据，即使设置{multi:true}也无法同时更新多个文档

    　　将数据库中名字中带有'huo'的数据，年龄变为60岁

            temp.updateOne({name:/huo/},{age:60},function(err,raw){
                //{ n: 1, nModified: 1, ok: 1 }
                console.log(raw);
            });
    (6)findOne() + save()

    　　如果需要更新的操作比较复杂，可以使用findOne()+save()方法来处理，比如找到名字为'huochai'的数据，年龄加100岁
    (7)【findOneAndUpdate()】

        　　fineOneAndUpdate()方法的第四个参数回调函数的形式如下function(err,doc){}

        Model.findOneAndUpdate([conditions], [update], [options], [callback])
        【findByIdAndUpdate】

        　　 fineByIdAndUpdate()方法的第四个参数回调函数的形式如下function(err,doc){}

        Model.findOneAndUpdate([conditions], [update], [options], [callback])


10. 文档删除:

        remove()
        findOneAndRemove()
        findByIdAndRemove()
    (1)
    remove有两种形式，一种是文档的remove()方法，一种是Model的remove()方法:
    [注意]remove()方法中的回调函数不能省略，否则数据不会被删除。当然，可以使用exec()方法来简写代码
        temp.remove({name:/30/}).exec()
        1)model:model.remove(conditions, [callback]):

        2)文档的remove方法:document.remove([callback])

        [注意]文档的remove()方法的回调函数参数可以省略

    (2)Model.findOneAndRemove(conditions, [options], [callback])
    现在删除第一个年龄小于20的数据

        temp.findOneAndRemove({age:{$lt:20}},function(err,doc){
            //{ _id: 5972d3f3e6f98ec60e3dc873, name: 'wang', age: 18 }
            console.log(doc);
        })

        回调函数不能省略，否则数据不会被删除。当然，可以使用exec()方法来简写代码

        temp.findOneAndRemove({age:{$lt:20}}).exec()

    (3) Model.findByIdAndRemove(id, [options], [callback])
        var aIDArr = [];
        temp.find(function(err,docs){
            docs.forEach(function(item,index,arr){
                aIDArr.push(item._id);
            })
            temp.findByIdAndRemove(aIDArr[0]).exec()            
        })


11.前后钩子：
    （1）前后钩子即pre()和post()方法，又称为中间件，是在执行某些操作时可以执行的函数。中间件在schema上指定，类似于静态方法或实例方法等

　　可以在数据库执行下列操作时，设置前后钩子


            init
            validate
            save
            remove
            count
            find
            findOne
            findOneAndRemove
            findOneAndUpdate
            insertMany
            update

                （2）var schema = new mongoose.Schema({ age:Number, name: String,x:Number,y:Number});  
                    schema.pre('find',function(next){
                        console.log('我是pre方法1');
                        next();
                    });
                    schema.pre('find',function(next){
                        console.log('我是pre方法2');
                        next();
                    });  
                    var temp = mongoose.model('temp', schema);
                    temp.find(function(err,docs){
                        console.log(docs[0]);
                    })    
                    /*
                    我是pre方法1
                    我是pre方法2
                    { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 }
                    */

                （2）　post()方法并不是在执行某些操作后再去执行的方法，而在执行某些操作前最后执行的方法，post()方法里不可以使用next()

                            var schema = new mongoose.Schema({ age:Number, name: String,x:Number,y:Number});  
                            schema.post('find',function(docs){
                                console.log('我是post方法1');
                            });
                            schema.post('find',function(docs){
                                console.log('我是post方法2');
                            });
                            var temp = mongoose.model('temp', schema);
                            temp.find(function(err,docs){
                                console.log(docs[0]);
                            }) 
                            /*
                            我是post方法1
                            我是post方法2
                            { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 }


12.查询后处理

            sort     排序
            skip     跳过
            limit    限制
            select   显示字段
            exect    执行
            count    计数
            distinct 去重

    (1)按x从小到大，age从大到小排列


            temp.find().sort("x -age").exec(function(err,docs){
                //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
                //{  _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
                //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 },
                //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
                console.log(docs);
            }); 

    (2)skip()
                temp.find().skip(1).exec(function(err,docs){
            //[ { _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 },
            //{ _id: 5972ed35e6f98ec60e3dc888, name: 'huo', age: 30, x: 2, y: 1 },
            //{ _id: 5972ed35e6f98ec60e3dc889, name: 'li', age: 20, x: 2, y: 2 } ]
            console.log(docs);
        }); 

    (3)limit()
                temp.find().limit(2).exec(function(err,docs){
            //[ { _id: 5972ed35e6f98ec60e3dc886,name: 'huochai',age: 27,x: 1,y: 2 },
            //{ _id: 5972ed35e6f98ec60e3dc887,name: 'wang',age: 18,x: 1,y: 1 } ]
            console.log(docs);
        }); 

    (4)select() 显示name、age字段，不显示_id字段

                    temp.find().select({name:1, age:1, _id:0}).exec(function(err,docs){
            //[ { name: 'huochai', age: 27 },{ name: 'wang', age: 18 },{ name: 'huo', age: 30 },{ name: 'li', age: 20 } ]
            console.log(docs);
        }); 

    (5)组合：
            下面将以上方法结合起来使用，跳过第1个后，只显示2个数据，按照age由大到小排序，且不显示_id字段

        temp.find().skip(1).limit(2).sort("-age").select("-_id").exec(function(err,docs){
            //[ { name: 'huochai', age: 27, x: 1, y: 2 },
            //{ name: 'li', age: 20, x: 2, y: 2 } ]
            console.log(docs);
        }); 
    （6）count()
    　显示集合temps中的文档数量

        temp.find().count(function(err,count){
            console.log(count);//4
        }); 

    (7) distinct()
    返回集合temps中的x的值

        temp.find().distinct('x',function(err,distinct){
            console.log(distinct);//[ 1, 2 ]
        }); 
13 文档验证:
        required: 数据必须填写
        default: 默认值
        validate: 自定义匹配
        min: 最小值(只适用于数字)
        max: 最大值(只适用于数字)
        match: 正则匹配(只适用于字符串)
        enum:  枚举匹配(只适用于字符串)

    (1)match
        将name的match设置为必须存在'a'字符。如果name不存在'a'，文档将不被保存，且出现错误提
        var schema = new mongoose.Schema({ age:Number, name:{type:String,match:/a/},x:Number,y:Number});  
        var temp = mongoose.model('temp', schema);
        new temp({name:'bbb'}).save(function(err,doc){
            //Path `name` is invalid (bbb).
            console.log(err.errors['name'].message);
        }); 

    （2）enum
        将name的枚举取值设置为['a','b','c']，如果name不在枚举范围内取值，文档将不被保存，且出现错误提示
            var schema = new mongoose.Schema({ age:Number, name:{type:String,enum:['a','b','c']},x:Number,y:Number});  
            var temp = mongoose.model('temp', schema);
            new temp({name:'bbb'}).save(function(err,doc){
                //`bbb` is not a valid enum value for path `name`.
                console.log(err.errors['name'].message);

            }); 
    （3）validate
        validate实际上是一个函数，函数的参数代表当前字段，返回true表示通过验证，返回false表示未通过验证。利用validate可以自定义任何条件。比如，定义名字name的长度必须在4个字符以上
            var validateLength = function(arg){
                if(arg.length > 4){
                    return true;
                }
                return false;
            };
            var schema = new mongoose.Schema({ name:{type:String,validate:validateLength}, age:Number,x:Number,y:Number});  
            var temp = mongoose.model('temp', schema);
            new temp({name:'abc'}).save(function(err,doc){
                //Validator failed for path `name` with value `abc`
                console.log(err.errors['name'].message);
            }); 

14 联表操作





     








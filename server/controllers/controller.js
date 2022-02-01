const model = require('../models/modelSchema');

exports.create = (req,res)=>{
    const { name, age, gender,scholarship, work, partner, salary } = req.body;
    if( !name || !age || !gender || !scholarship || !work || !partner || !salary ){
        return res.status(422).json({error: "Please fill required fileds"});
    }
    const user = new model({name, age, gender,scholarship, work, partner, salary});
    user.save()
    .then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.status(500).json({"error":err.message});
        console.log(err);
    });
};

exports.find = (req,res)=>{
    model.find().sort({"_id":-1})
    .then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).json({"error":err.message});
        console.log(err);
    })
};

exports.delete = (req,res)=>{
    if(req.query.id){
        model.findByIdAndRemove(req.query.id)
        .then((post)=>{
            res.status(201).json(post);
        }).catch((err)=>{
            res.status(500).json({"error":err.message});
            console.log(err);
        });
    }else{
        res.status(400).json({"Error":"Query is incomplete"});
    }  
};

exports.update = (req,res)=>{
    if(req.query.id){
        model.findByIdAndUpdate(req.query.id,req.body)
        .then((post)=>{
            res.status(201).json(post);
        }).catch((err)=>{
            res.status(500).json({"error":err.message});
            console.log(err);
        });
    }else{
        res.status(400).json({"Error":"Query is incomplete"});
    }  
};

exports.analysis = (req,res)=>{
    if(req.query.field){
        const F = req.query.field;
        model.aggregate([
            {
                "$group":{
                    "_id":{f:"$"+F,"gender":"$gender"},
                    "count":{"$sum":1}
                }
            },{
                "$sort":{"_id":1}
            },{
                "$project":{
                        _id:0,
                        gender:"$_id.gender",
                        count:"$count"
                }
            }
        ])
        .then((data)=>{
            var lst= [];
            var arr = {};
            data.map((value, index) => {
                arr.name=Math.floor(index/2+1);
                if(value.gender==2)
                    arr.male=value.count;
                else
                    arr.female=value.count;
                if(index%2!=0){
                    lst.push(arr);
                    arr = {}
                }
            })
            res.status(201).json(lst);
        }).catch((err)=>{
            res.status(500).json({"error":err.message});
        });
    }else{
        model.aggregate([
            {"$group":{
                "_id":{"gender":"$gender"},
                "count":{"$sum":1}
            }}
            ,{
                "$sort":{"_id":1}
            },{
                "$project":{
                        _id:0,
                        name:"$_id.gender",
                        count:"$count"
                }
            }
        ])
        .then((data)=>{
            var lst= [];
            var arr = {};
            data.map((value, index) => {
                arr.name=value.name;
                if(value.name == 2)
                    arr.male = value.count;
                else
                    arr.female = value.count;
                lst.push(arr);
                arr = {}
            })
            
            res.status(201).json(lst);
        }).catch((err)=>{
            res.status(500).json({"error":err.message});
        });    }  
}
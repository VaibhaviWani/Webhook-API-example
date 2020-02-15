const express=require("express");
const bodyParser=require('body-parser');
const MongoClient=require("./database/connection");
const app=express();
const WebHookModel=require("./database/webhook.model");


MongoClient().then(()=>
{
    console.log("connected !");
})
.catch(console.log)

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get("/",(req,res)=>
{
    res.send("Welcome to hands on Demo of Webhook");

})

app.get("/api/webhook",(req,res)=>{

    WebHookModel
    .find()
    .then((wh)=>{
        res.json({
            flag: true,
            data: wh,
            message: "Data Successfully fetched !"
        });
    })
    .catch(e=>{
        res.json({
            flag:false,
            data: null,
            message: e.message
        });
    });
});

app.post("/api/webhook",(req,res)=>{

    let body=req.body;

    WebHookModel
    .create(body)
    .then((wh)=>{
        res.json({
            flag: true,
            data: wh,
            message: "Data Successfully created !"
        });
    })
    .catch(e=>{
        res.json({
            flag:false,
            data: null,
            message: e.message
        });
    });

});

app.put("/api/webhook/:id",(req,res)=>{

    let body=req.body;

    WebHookModel
    .findByIdAndUpdate(req.params.id,body)
    .then((wh)=>{
        res.json({
            flag: true,
            data: wh,
            message: "Data Successfully created !"
        });
    })
    .catch(e=>{
        res.json({
            flag:false,
            data: null,
            message: e.message
        });
    });

});

app.delete("/api/webhook/:id",(req,res)=>
{
    WebHookModel.findOneAndRemove(req.params.id,function(err,wh)
    {
        if(err)
        {
            res.json({
                flag:false,
                data:null,
                message: err.message
            })
        }
        else
        {
            res.json({
                flag:true,
                data:wh,
                message:"Successfully Deleted !!"
            })
        }
    })
})

app.listen(3000);
// .then((wh)=>
// {

//         res.json({

//             flag: true,
//             data: wh,
//             message: "successfully Updated !!"
//         });
// })

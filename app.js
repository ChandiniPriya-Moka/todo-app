const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=8000;
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://chandinipriyamoka0327:XgE8yzbnDJgbtU25@todoapp.na4h8tg.mongodb.net/todo");
const trySchema=new mongoose.Schema({
      name:String
});
const Item=mongoose.model("Task",trySchema);
const todo=new Item({name:"python"});
// todo.save()
app.get('/',(_,res)=>{
    Item.find({})
    .then(foundItems=>{
        res.render("list",{ejes:foundItems});
    })
    .catch(err=>{
        console.log(err);
         res.status(500).send("something went wrong");
    })
    
});
app.post('/',(req,res)=>{
    const ItemName=req.body.ele1;
    const todo=new Item ({name:ItemName})
    todo.save();
    res.redirect('/');
});
app.post('/delete',async(req,res)=>{
 const checked=req.body.checkbox1;
 try{
    await Item.findByIdAndDelete(checked);
    console.log("deleted Item with Id",checked);
    res.redirect('/');
 }
 catch(err){
    console.error("error deleting item",err);
res.status(500).send("error deleting item");
 };
});
app.listen(port,()=>{
    console.log('server started at port http://localhost:8000');
 });
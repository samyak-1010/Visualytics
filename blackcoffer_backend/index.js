const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const cors=require('cors');
const app = express();
const port = process.env.PORT||3000;

app.use(bodyParser.json());
app.use(cors(process.env.FRONTEND_URL));
// MongoDB connection
mongoose.connect(process.env.DATAbASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema definition
const dataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('Data', dataSchema, 'data');

// API route
app.post('/get-data', async (req, res) => {
  try {
    const payload=req.body?.callingFilter;
    if(payload){
      console.log("I am inside");
      try{
         const obj=JSON.parse(payload);
         if(Object.keys(obj)[0]=="end_year"){
           obj["end_year"]=Number(obj["end_year"]);
         }
          const data = await Data.find(obj);
          return res.status(200).json({message:data});
      } 
      catch (err) {
         return res.status(500).send(err);
      }
    }
    console.log("i am outsdide");
    const data = await Data.find();
        return res.status(200).json({message:data});
    }catch (err) {
      return res.status(500).send(err);
  }
});
app.get("/get-by-country",async (req,res)=>{
  try{
    console.log("i am here")
  const data=await Data.aggregate([
    {
      $group:{
        _id:"$country",
        averageIntensity:{$avg:"$intensity"},
        averageRelevance:{$avg:"$relevance"},
        averagelikelihood:{$avg:"$likelihood"}
      }
    }
  ]);
  return res.status(200).json({
    success:true,
    message:data
  })
  }
  catch(err){
    return res.status(400).json({success:false,message:err.message});
  }

})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

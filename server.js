import express from 'express'
import mongoose from 'mongoose'
import { getOriginalUrl, shortUrl } from './Controllers/url.js';
const app= express();
app.use(express.urlencoded({extended:true}))

//connecting to db
mongoose.connect(
  "mongodb+srv://harshdeepsinghsaini2023:ikaj3pGwd9LjFIhx@cluster0.rtdku.mongodb.net/",
  {
    dbName: "NodeJs_Mastery_Course"
  }
).then(()=>console.log('mongoDB server is connected.. !!')).catch((err)=>console.log(err));


//rendering the ejs file
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null }); // Reset shortUrl to null
});


//shortening the url logic
app.post("/short", shortUrl);

// redirect to original url using short code usingdynamic routing 
app.get('/:shortCode',getOriginalUrl)

const port = 2000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
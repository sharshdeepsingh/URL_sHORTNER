import { Url } from "../Models/Url.js"
import shortid from "shortid"


export const shortUrl= async (req,res)=>{
const longUrl=req.body.longUrl
const shortCode=shortid.generate();
const shortUrl=`http://localhost:2000/${shortCode}`

//save to database

const newUrl= new Url({shortCode,longUrl})
await newUrl.save();

console.log("short url= ",newUrl);

res.render("index.ejs",{shortUrl})
}

export const getOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params; // ✅ Corrected Destructuring

    const urlEntry = await Url.findOne({ shortCode }); // ✅ Correct DB Query

    if (!urlEntry) {
      return res.status(404).json({ message: "Short URL NOT FOUND" });
    }

    res.redirect(urlEntry.longUrl); // ✅ Correct Variable Name
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

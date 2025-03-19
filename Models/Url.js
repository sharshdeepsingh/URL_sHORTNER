import mongoose from 'mongoose'

const Short= mongoose.Schema(
    {
       shortCode: String,
       longUrl:String
    }
)

export const Url= mongoose.model("Url",Short)
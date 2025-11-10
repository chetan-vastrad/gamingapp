import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        phone:{type:Number, required:true,unique:true},
        password:{type:String, required:true},
        walletBalance:{type:Number, default:0},
        lastPlayDate:{type:Date},
        role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user"  
    },
        lastPlayedNumber:{type:Number},
        createdAt:{type:Date, default:Date.now}
},
);

const  User =  mongoose.model("User", userSchema);
export default User;

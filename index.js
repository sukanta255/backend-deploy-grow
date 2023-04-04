const express = require("express")
const {connection} = require("./configs/db")
require("dotenv").config();
const {userRouter} = require("./routes/User.route");
const cors = require("cors");


const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter);
app.listen(process.env.port,async()=>{
    try{
        await connection 
        console.log("Connected to DB")

    }catch(err){
        console.log(err)
    }
    console.log(`Running at port ${process.env.port}`);
})
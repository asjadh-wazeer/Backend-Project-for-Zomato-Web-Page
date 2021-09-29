import express from "express";
import cors from "cors";
import helmet from "helmet";
const zomato=express();


zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));


zomato.use(helmet());
zomato.use(cors());

//Setup our route route
zomato.get("/",(req,res)=>{
    res.json ({message:"Setup sucess"})
});

zomato.listen(4000, ()=> console.log("Server is up and running"));
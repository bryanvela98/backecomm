import { Router } from "express";
import userModel from "../models/user.model";

const router = Router();

//Read User
router.get("/", async (req, res) => {
  try{
    let users = await userModel.find();
    res.send(result: "success", payload: users);
  }
    catch(err){
        console.log("Cannot get users with mongoose" +err);
    }
});
//Create New User

//Update User

//Delete User
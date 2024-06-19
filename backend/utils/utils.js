import bcrypt from "bcrypt";
import Pet from "../models/Pet.js";
import User from "../models/User.js";

export const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

export const updateAllPets = async() => {
    try{
        await Pet.updateMany({}, {$set: {status: "Available"}})
        console.log("Pets were successfully updated!")
    } catch(error) {
        throw new Error("Couldn't update the pets");
    } 
}

export const updateUserAdoptions = async(userId, postId, action) => {
    try {
      let updateQuery;
  
      if (action === 'add') {
          updateQuery = { $addToSet: { adoptions: postId } };
      } else if (action === 'remove') {
          updateQuery = { $pull: { adoptions: postId } };
      } else {
          throw new Error('Invalid action specified');
      }
  
      await User.findOneAndUpdate({ _id: userId }, updateQuery);
  
  } catch(error) {
      res.status(500).json({message: error.message});
    }
  }


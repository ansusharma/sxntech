import mongoose from 'mongoose';

// Create user schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    mobileno:{
        type: String,
        require: true,
    },
    usertype:{
      type: String,
      require: true,
      default:0
    }
} ,
  { timestamps: true }
);




const User = mongoose.model("users", UserSchema);

export default User;
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 6, max: 50 },
  email: { type: String, required: true, min: 6, max: 100 },
  password: { type: String, required: true, min: 6, max: 1024 },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", UserSchema);

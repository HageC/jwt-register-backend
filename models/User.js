import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 6, max: 50 },
  email: { type: String, required: true, min: 6, max: 100 },
  password: { type: String, required: true, min: 6, max: 1024 },
  date: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", UserSchema);

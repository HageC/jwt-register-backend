import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 6, max: 50, trim: true },
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

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const matching = await bcrypt.compare(enteredPassword, this.password);
  return matching;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", UserSchema);

import User from "../models/User.js";
import Joi from "joi";

const userValidation = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const valid = await userValidation.validateAsync({ name, email, password });

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const user = await User.create({ name, email, password });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { registerUser };

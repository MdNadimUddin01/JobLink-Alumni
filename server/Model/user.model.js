import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Alumni"],
    default: "Alumni",
  },
});

const UserModel = mongoose.model("UserSchema", userSchema);

export { UserModel };

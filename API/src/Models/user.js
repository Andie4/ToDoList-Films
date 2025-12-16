const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const MODELNAME = "user";

const Schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    password: { type: String, required: true },
    last_login_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// bycript permet de hasher le mot de passe
Schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// compare les mdp
Schema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;

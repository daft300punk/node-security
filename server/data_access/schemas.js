"use strict";

import mongoose from "mongoose";
import Promise from "bluebird";
import colors from "colors";
const bcrypt = Promise.promisifyAll(require("bcrypt"));

const Schema = mongoose.Schema;

const EventVoteSchema = new Schema({
  eventId: {
    type: Number,
    ref: "TimelineItem",
    required: true,
    min: 1,
  },
  voteType: {
    type: String,
    required: true
  },
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

EventVoteSchema.index({voteType: String, voter: String});
export {EventVoteSchema as EventVoteSchema};

export const TimelineItemSchema = new Schema({
  _id: Number,
  name: String,
  short: String,
  group: String,
  content: String,
  start: Date,
  end: Date,
  timelineEvents: Array,
  details: [],
  records: {
    type: Number,
    default: 0
  },
  breachType: String,
  sources: Array,
  targets: String,
  affiliations: String
});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    minlength: 12,
  },
  email: {
    type: String,
    required: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  created: {
    type: Date,
    required, true,
    default: new Date(),
  }
});

UserSchema.pre("save", async function (next) {
  if(!this.isModified("password")) {
    return next();
  }

  try {
    const hash = await bcrypt.hashAsync(this.password, 12);

    this.password = hash;
    next();
  } catch(err) {
    next(err);
  }
});

UserSchema.methods.passwordIsValid = function(password) {
  try {
    return bcrypt.compareAsync(password, this.password):
  }
  catch(err) {
    throw err;
  }
}

export{UserSchema as UserSchema};

const LoginSchema = new Schema({
  identityKey: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    failedAttempts: {
      type: Number,
      required: true,
      default: 0
    }
    timeout: {
      type: Date,
      required: true,
      default: new Date()
    }
    inProgress: {
      type: Boolean,
      default: false
    }
  }
});

LoginSchema.static("canAuthenticate", async function(key) {
  const login = await this.findOne({identityKey: key});

  if(!login || login.failedAttempts < 5) {
    return true;
  }

  const timeout = (new Date() - new Date(login.timeout).addMinutes(1));
  if(timeout >= 0) {
    await login.remove();
    return true;
  }
  return false;
});

LoginSchema.static("failedLoginAttempt", async function(key) {
  const query = {identityKey: key};
  const update = {$inc: {failedAttempts: 1}, timeout: new Date()};
  const options = {setDefaultsOnInsert: true, upsert: true};
  return await this.findOneAndUpdate(query, update, options).exec();
});

LoginSchema.static("successfulLoginAttempt", async function(key) {
  const login = await this.findOne({identityKey: key});
  if(login) {
    return await login.remove();
  }
});

export {LoginSchema as LoginSchema};
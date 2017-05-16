"use strict";

import {TimelineItemSchema, UserSchema, EventVoteSchema, LoginSchema} from "./schemas";
import connectionProvider from "./connectionProvider";
import {serverSettings} from "../settings";

export getUserModel = async function() {
  try {
    const conn = await connectionProvider(serverSettings.serverURL, serverSettings.database);
    return conn.model("User", UserSchema);
  } catch(err) {
    throw err;
  }
};

export const getTimelineItemModel = async function() {
  try {
    const conn = await connectionProvider(serverSettings.serverURL, serverSettings.database);
    return conn.model("TimelineItem", TimelineItemSchema);
  } catch(err) {
    throw err;
  }
}

export const getEventVoteModel = async function() {
  try {
    const conn = await connectionProvider(serverSettings.serverURL, serverSettings.database);
    return conn.model("EventVote", EventVoteSchema);
  } catch(err) {
    throw err;
  }
};

export const getLoginsModel = async function() {
  try {
    const conn = await connectionProvider(serverSettings.serverURL, serverSettings.database);
    return conn.model("Logins", LoginSchema);
  } catch(err) {
    throw err;
  }
}
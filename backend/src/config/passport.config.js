import dotenv from "dotenv";
dotenv.config({ quiet: true });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { createUser } from "../repository/user.repository.js";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          user = await createUser({
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            googleId: profile.id,
            avatar: profile.photos?.[0]?.value || "",
            isVerified: true,
          });
        }

        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

export default passport;

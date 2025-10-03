/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { AuthProvider, Role } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import { envVars } from './env';

// google strategy
passport.use(new GoogleStrategy({
  clientID: envVars.GOOGLE_CLIENT_ID,
  clientSecret: envVars.GOOGLE_CLIENT_SECRET,
  callbackURL: envVars.GOOGLE_CALLBACK_URL
},
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
      const email = profile.emails?.[0].value;

      if (!email) {
        return done(null, false, { message: "No email found." })
      }

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          email,
          name: profile.displayName,
          profilePhoto: profile.photos?.[0].value,
          isVerified: profile.emails?.[0].verified,
          role: Role.USER,
          auths: [{ provider: AuthProvider.GOOGLE, providerId: profile.id }],
        })
      }

      return done(null, user,)

    } catch (error: any) {
      console.log("Google Strategy Error:", error);
      return done(error);
    }
  }
));

// serialize user session
passport.serializeUser((user: Express.User | any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
})

// deserialize user session
passport.deserializeUser(async (id: any, done: (err: any, user?: Express.User | false | null) => void) => {
  try {
    const user = await User.findById(id);

    done(null, user);

  } catch (error) {
    console.log(error);
    done(error);
  }
})
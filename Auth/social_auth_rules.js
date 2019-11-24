const passport = require('passport');
const config = require('../config/dbConfig');
const userModel = require('../Models/chatapp_model');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = ()=>{

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        let findId = userModel.findById(id, (err,user)=>{
            if(err) return console.log('error when deserialize user');
            else{
                done(null, user);
            }
        });
    });

    let authProcessor = async (accessToken, refreshToken, profile, done)=>{
        //find a user in the local db using profile.id
        let findOne = await userModel.findOne({'profileId':profile.id});
        
        //if the user is found return user data using done
        //if the use is not foudn create one and then return
        if(findOne) done(null, findOne);
        else{
            var NewUser = new userModel({
                profileId: profile.id,
                fullName: profile.displayName,
                profilePic: profile.photos[0].value || ''
            });

            NewUser.save(err=>{
                if(err) return console.log('create new user err!');
                else {
                    done(null, NewUser);
                }
            })
        }

    }

    passport.use(new FacebookStrategy(config.fb, authProcessor));
}
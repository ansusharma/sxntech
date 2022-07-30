// twilio
import dotenv from 'dotenv'
dotenv.config();
import { v4 as uuidv4 } from 'uuid';

import twilio from 'twilio';
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// create the twilioClient
const twilioClient = twilio(
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    { accountSid: process.env.TWILIO_ACCOUNT_SID }
);


export const findOrCreateRoom = async (roomName) => {
    try {
      // see if the room exists already. If it doesn't, this will throw
      // error 20404.
      await twilioClient.video.rooms(roomName).fetch();
    } catch (error) {
      // the room was not found, so create it
      if (error.code == 20404) {
        await twilioClient.video.rooms.create({
          uniqueName: roomName,
          type: "go",
        });
      } else {
        // let other errors bubble up
        throw error;
      }
    }
};


export const getAccessToken = (roomName) => {
    // create an access token
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      // generate a random unique identity for this participant
      { identity: uuidv4() }
    );
    // create a video grant for this specific room
    const videoGrant = new VideoGrant({
      room: roomName,
    });
  
    // add the video grant
    token.addGrant(videoGrant);
    // serialize the token and return it
    return token.toJwt();
  };
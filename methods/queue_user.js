import User from "../models/user.js";
import PairableUser from "../models/pairable_user.js";
import UserPair from "../models/user_pair.js";
import {findOrCreateRoom,getAccessToken} from "../methods/twilio.js";
import { v4 as uuidv4 } from 'uuid';

export const pair_user= async(userid,topic)=>{
    const thisuser = await User.findById({ _id: userid });
    const name = thisuser.name

    const user_query = await PairableUser.aggregate([
        {  
            $match :{ 
                topic: topic
            } 
        },
        {
            $sample: {
                size: 1 
            } 
        }
    ]);

    if(user_query.length){
        const front_user = user_query[0];
        const front_userid = front_user.userid
        const front_token  = front_user.token
        const roomName = front_user.roomName

        PairableUser.deleteOne({_id:front_user._id}, (err, obj)=>{
            if (err) throw err;
            console.log("1 document deleted");
        });

        // const token = getAccessToken(roomName);
        const token = "dummyToken_88v8rr8";

        const user_pair = new UserPair({
            commonTopic:topic,
            userid1:userid,
            token1:token,
            userid2:front_userid,
            token2:front_token,
            roomName:roomName
        });
        await user_pair.save();
        return [roomName,token];
    }
    else{
        const roomName = uuidv4();
        await findOrCreateRoom(roomName);
        const token = getAccessToken(roomName);
        // const token = "dummyToken_88fur79";
        const pruser = new PairableUser({
            userid,
            name,
            topic,
            roomName,
            token
        });
        await pruser.save();
        return [roomName,token];
    }
}


export const unpair_user = async(userid)=>{

    let query = {userid: userid};
    const pairable_arr = await PairableUser.find(query);
    
    pairable_arr.forEach((value, index, array)=>{
        PairableUser.deleteOne({_id:value._id}, (err, obj)=>{
            if (err) throw err;
            console.log("1 pairableUser document deleted");
        });
    });


    query = {$or:[ {userid1: userid } , { userid2: userid } ]};
    const userpair_arr = await UserPair.find(query);
    
    userpair_arr.forEach((value, index, array)=>{
        UserPair.deleteOne({_id:value._id}, (err, obj)=>{
            if (err) throw err;
            console.log("1 UserPair document deleted");
        });
    });

    return;
}
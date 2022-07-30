import User from "../models/user.js";
import UserPair from "../models/user_pair.js";
import PairableUser from "../models/pairable_user.js";
import {pair_user,unpair_user} from "../methods/queue_user.js"

// Handel user profile
export const activatevid = async (req, res) => {
    const { topic } = req.body;
    if (!topic ) {
        res.status(400).json({ 
            success:false, 
            message: "topic field is required",
            data:{isInConnectionProcess:false}
        });
        return;
    }

    const userID = req.userid;

    var query = {userid: userID } ;
    const pairableusr_arr = await PairableUser.find(query);
    if(pairableusr_arr.length){
        res.status(200).json({
            success:false,
            message:"You are already in waiting in queue",
            data:{isInConnectionProcess:true}
        });
        return;
    }

    var query = {$or:[ {userid1: userID} , { userid2: userID } ]};
    const userpair_arr = await UserPair.find(query);
    if(userpair_arr.length){
        res.status(200).json({
            success:false,
            message:"You are already paired",
            data:{isInConnectionProcess:true}
        });
        return;
    }

    const pair_user_res = await pair_user(userID,topic);

    res.status(200).json({
        success:true,
        message: "You are put in connection queue, wait for others to join.",
        data:{roomName:pair_user_res[0],token:pair_user_res[1],isInConnectionProcess:true}
    });
    return;
};


export const stopvid = async (req, res) => {
    const userID = req.userid;

    // find this user in Pairable section
    var query = {userid: userID} ;
    const pairableusr_arr = await PairableUser.find(query);
    
    // find this user in Paired section
    query = {$or:[ {userid1: userID} , { userid2: userID } ]};
    const userpair_arr = await UserPair.find(query);


    if(userpair_arr.length==0 && pairableusr_arr.length==0){
        res.status(200).json({
            success:false,
            message:"You are not in any Waiting stage",
            data:{isInConnectionProcess:false}
        });
        return;
    }

    await unpair_user(userID);

    res.status(200).json({
        success:true,
        message:"You are removed from Waiting stage",
        data:{isInConnectionProcess:false}
    });
    return;
};

export const vid_front_person = async (req, res) => {
    const userID = req.userid;

    var query = {$or:[ {userid1: userID} , { userid2: userID } ]};
    const userpair_arr = await UserPair.find(query);
    if(userpair_arr.length==0){
        res.status(200).json({
            success:false,
            message:"You are not in pair with anyone", 
        });
        return;
    }

    let second_user_id;
    const user_pair_obj = userpair_arr[0];

    if(user_pair_obj.userid1==userID){
        second_user_id=user_pair_obj.userid2;
    }
    else{
        second_user_id=user_pair_obj.userid1;
    }
    const second_user = await User.findById({ _id: second_user_id });
    if(!second_user){
        res.status(404).json({
            success:false,
            message:"User with whom you are paired not found"
        });
        return;
    }

    res.status(200).json({
        success:true,
        message:"User with whom you are paired is found",
        paired_user: {
            name: second_user.name,
        },
    });
    return;
};
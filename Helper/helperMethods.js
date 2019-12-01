
let crypto = require('crypto'); // it's use for generate unique information

//find a chatroom by a given name
let findChatroom = ((all_rooms, roomName)=>{
    
    let find = all_rooms.findIndex((rooms)=>{
        return rooms.roomName === roomName;
    });

    return find>-1? true: false;
});

//Create a function that generate a unique roomId
let createRoomId = ()=>{
    return crypto.randomBytes(24).toString('hex');
}

//find room by it's id
let findRoombyid = ((all_rooms, roomId)=>{
    return find = all_rooms.find((rooms)=>{
        return rooms.roomId === roomId;
    });
});

let addUserToRoom = ((all_rooms, data, socket)=>{
   
    //get the room object
    let getRoom = findRoombyid(all_rooms, data.roomId);
    if(getRoom !== undefined){
        
        //get the active user Id ( object id used in session )
        let userId = socket.request.session.passport.user;
        //check to see if the user already exist in the chat room
        let checkUser = getRoom.Alluser.findIndex((element)=>{
            return element.userId === userId;
        });

        //if the user already present in the room remove him first
        if(checkUser>-1){
            getRoom.Alluser.splice(checkUser, 1);
        }

        //push the user into the room's user array
        getRoom.Alluser.push({
            socketId : socket.id,
            userId,
            user: data.user,
            userPic: data.userPic
        });

        // join the room channel
        socket.join(data.roomId);

        // return the update room object
        return getRoom.Alluser;
    }

});

module.exports = {
    findChatroom,
    createRoomId,
    findRoombyid,
    addUserToRoom
}
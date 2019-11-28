
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

module.exports = {
    findChatroom,
    createRoomId,
    findRoombyid
}
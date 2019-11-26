'use strict'
let crypto = require('crypto'); // it's use for generate unique information

module.exports = (io,data) =>{

    let all_rooms = data.locals.chatrooms;

    io.of('/roomslist').on('connection', socket=>{
       
        // Listining getChatrooms event
        socket.on('getChatrooms', ()=>{
            socket.emit('chatRoomsList', JSON.stringify(all_rooms)); // trigger chatRoomsList
        });

        // Listining createNewRooms event
        socket.on('createNewRoom', (newChat_Room)=>{
            
            // check to see if a room with same title exists or not
            //if not then create one and broadcast to everyone
            if(!findChatroom(all_rooms, newChat_Room)){
                
                //create a new room and broadcast to all
                all_rooms.push({
                    roomName: newChat_Room,
                    roomId: createRoomId(),
                    users:[]
                });

                //Emit an update list to the creator
                socket.emit('chatRoomsList', JSON.stringify(all_rooms)); // trigger chatRoomsList event from server side
                
                //Emit and update list to the everyone who connected to the room
                socket.broadcast.emit('chatRoomsList', JSON.stringify(all_rooms));
            }
        });
    });

}



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